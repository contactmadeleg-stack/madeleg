"""Bande-son synthétisée pour la vidéo « parcours courtier ».

Musique 120 BPM (Fa majeur) + effets sonores placés sur les repères exportés par la
scène (out/cues.json). Tout est généré ici, sans échantillon externe : aucun droit
à gérer. Sortie : out/soundtrack.wav (48 kHz, stéréo, 24 bits).

    python3 audio.py
"""
import json
from pathlib import Path

import numpy as np
from scipy import signal
from scipy.io import wavfile

ROOT = Path(__file__).resolve().parent
SR = 48000
DUR = 15.0
N = int(SR * DUR)
BPM = 120
BEAT = 60 / BPM
rng = np.random.default_rng(20261002)


# ----------------------------------------------------------------- outils DSP
def tt(d):
    return np.arange(int(round(d * SR))) / SR


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def butter(x, kind, f, order=2):
    if kind == "band":
        b, a = signal.butter(order, [f[0] / (SR / 2), f[1] / (SR / 2)], "band")
    else:
        b, a = signal.butter(order, f / (SR / 2), kind)
    return signal.lfilter(b, a, x)


def fade(x, a=0.002, r=0.01):
    n = len(x)
    na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    e = np.ones(n)
    if na > 0:
        e[:na] = np.linspace(0, 1, na) ** 2
    if nr > 0:
        e[n - nr:] *= np.linspace(1, 0, nr) ** 2
    return x * e


def svf_bp(x, fc, q):
    """Passe-bande à fréquence variable (SVF topologie préservée, Zavalishin)."""
    g = np.tan(np.pi * np.clip(fc, 20, SR * 0.45) / SR)
    k = 1.0 / q
    a1 = 1 / (1 + g * (g + k))
    a2 = g * a1
    a3 = g * a2
    y = np.empty_like(x)
    ic1 = ic2 = 0.0
    for i in range(len(x)):
        v3 = x[i] - ic2
        v1 = a1[i] * ic1 + a2[i] * v3
        v2 = ic2 + a2[i] * ic1 + a3[i] * v3
        ic1 = 2 * v1 - ic1
        ic2 = 2 * v2 - ic2
        y[i] = v1
    return y


class Bus:
    def __init__(self):
        self.buf = np.zeros((N + SR, 2))

    def add(self, x, t, gain=1.0, pan=0.0):
        """Ajoute un son mono (pan −1…1, loi à puissance constante) ou stéréo."""
        i = int(round(t * SR))
        if i >= N or len(x) == 0:
            return
        if x.ndim == 1:
            th = (pan + 1) * np.pi / 4
            x = np.stack([x * np.cos(th), x * np.sin(th)], axis=1)
        if i < 0:
            x, i = x[-i:], 0
        j = min(len(self.buf), i + len(x))
        self.buf[i:j] += x[: j - i] * gain


music, drums, sfx, verb_send = Bus(), Bus(), Bus(), Bus()


# --------------------------------------------------------------- instruments
def marimba(f, d=0.9, vel=1.0, bright=1.0):
    t = tt(d)
    y = (np.sin(2 * np.pi * f * t) * np.exp(-t / 0.42)
         + 0.32 * bright * np.sin(2 * np.pi * f * 3.932 * t) * np.exp(-t / 0.09)
         + 0.1 * bright * np.sin(2 * np.pi * f * 9.538 * t) * np.exp(-t / 0.03))
    mallet = butter(rng.standard_normal(len(t)), "band", (min(f * 2, 6000), min(f * 6, 16000))) * np.exp(-t / 0.004)
    return fade((y + 0.25 * mallet) * vel, 0.001, 0.05)


def bell(f, d=1.2, vel=1.0):
    t = tt(d)
    parts = [(1.0, 1.0, 0.7), (2.756, 0.45, 0.35), (5.404, 0.25, 0.18), (8.933, 0.12, 0.09)]
    y = sum(a * np.sin(2 * np.pi * f * r * t + r) * np.exp(-t / dd) for r, a, dd in parts)
    return fade(y * vel, 0.001, 0.08)


def saw_pad(freqs, d, fc=1400.0, detune=0.09, seed=0):
    """Pad additif (scie à bande limitée, trois voix désaccordées par note)."""
    t = tt(d)
    r = np.random.default_rng(seed)
    out = np.zeros((len(t), 2))
    for f in freqs:
        for c in (0, 1):
            for v in (-1, 0, 1):
                ff = f * 2 ** ((v * detune + r.uniform(-0.02, 0.02)) / 12)
                ph = r.uniform(0, 2 * np.pi)
                kmax = int(min(5000, fc * 3) / ff)
                k = np.arange(1, max(2, kmax))
                amp = (1 / k) / np.sqrt(1 + (k * ff / fc) ** 4)
                out[:, c] += (amp[None, :] * np.sin(2 * np.pi * ff * k[None, :] * t[:, None] + ph * k[None, :])).sum(1)
    return out / (len(freqs) * 3)


def kick(d=0.4, vel=1.0):
    t = tt(d)
    f = 54 + 120 * np.exp(-t / 0.028)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.13)
    knock = np.sin(2 * np.pi * 165 * t) * np.exp(-t / 0.025) * 0.35
    click = butter(rng.standard_normal(len(t)), "high", 1800) * np.exp(-t / 0.0015) * 0.3
    return fade(np.tanh(1.8 * (y + knock + click)) * vel, 0.0005, 0.03)


def clap(vel=1.0):
    t = tt(0.35)
    n = rng.standard_normal(len(t))
    e = np.zeros(len(t))
    for off in (0.0, 0.009, 0.019):
        tt_ = np.clip(t - off, 0, None)
        e += (t >= off) * np.exp(-tt_ / 0.006)
    e += 0.6 * np.exp(-np.clip(t - 0.02, 0, None) / 0.07) * (t >= 0.02)
    return fade(butter(n * e, "band", (900, 5200)) * vel, 0.0005, 0.04)


def hat(vel=1.0, open_=False):
    t = tt(0.3 if open_ else 0.08)
    n = butter(rng.standard_normal(len(t)), "high", 7000)
    return fade(n * np.exp(-t / (0.09 if open_ else 0.018)) * vel, 0.0005, 0.01)


def bass_note(f, d, vel=1.0):
    t = tt(d)
    y = 0.8 * np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2 * f * t) + 0.2 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t / 0.06)
    env = np.minimum(1, t / 0.006) * np.exp(-t / 0.3)
    return fade(np.tanh(2.2 * y) * env * vel * 0.8, 0.002, 0.03)


def noise_sweep(d, f0, f1, f2=None, q=1.3, curve=None):
    t = tt(d)
    p = t / d
    fc = f0 * (f1 / f0) ** p if f2 is None else np.where(p < 0.6, f0 * (f1 / f0) ** (p / 0.6), f1 * (f2 / f1) ** ((p - 0.6) / 0.4))
    y = svf_bp(rng.standard_normal(len(t)), fc, q)
    env = curve(p) if curve else np.sin(np.pi * np.clip(p, 0, 1)) ** 1.5
    return fade(y * env, 0.003, 0.02)


def place_stereo_move(bus, x, t, gain, p0, p1):
    """Effet mono dont la position stéréo glisse de p0 à p1."""
    n = len(x)
    pan = np.linspace(p0, p1, n)
    th = (pan + 1) * np.pi / 4
    bus.add(np.stack([x * np.cos(th), x * np.sin(th)], axis=1), t, gain)


# ----------------------------------------------------------------- effets
def sfx_whoosh(d=0.45, lo=250, hi=2600, end=600):
    body = noise_sweep(d, lo, hi, end, q=1.1)
    air = noise_sweep(d, 2000, 7000, 3000, q=0.9) * 0.35
    return body + air


def sfx_swish():
    return noise_sweep(0.26, 900, 4500, 2000, q=1.4)


def sfx_flip():
    t = tt(0.16)
    y = svf_bp(rng.standard_normal(len(t)), 1500 * (4 ** (t / 0.16)), 2.0) * np.exp(-t / 0.05)
    thup = np.sin(2 * np.pi * (180 - 300 * t) * t) * np.exp(-t / 0.02) * 0.6
    return fade(y + thup, 0.001, 0.02)


def sfx_stamp():
    t = tt(0.45)
    low = np.sin(2 * np.pi * np.cumsum(40 + 60 * np.exp(-t / 0.03)) / SR) * np.exp(-t / 0.12)
    slap = butter(rng.standard_normal(len(t)), "band", (300, 3500)) * np.exp(-t / 0.012)
    paper = butter(rng.standard_normal(len(t)), "high", 3000) * np.exp(-t / 0.03) * 0.3
    return fade(np.tanh(1.8 * (low + 0.9 * slap + paper)), 0.0005, 0.05)


def sfx_pop(f0=320, f1=1100):
    t = tt(0.12)
    f = f0 + (f1 - f0) * (1 - np.exp(-t / 0.018))
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.035)
    return fade(y, 0.001, 0.02)


def sfx_click():
    t = tt(0.05)
    n = butter(rng.standard_normal(len(t)), "high", 2500) * np.exp(-t / 0.0015)
    tone = np.sin(2 * np.pi * 1900 * t) * np.exp(-t / 0.008) * 0.6
    return fade(n + tone, 0.0003, 0.01)


def sfx_roll(d=0.6, n=16):
    out = np.zeros(int(d * SR) + SR // 10)
    times = d * (np.linspace(0, 1, n) ** 1.8)
    for k, ti in enumerate(times):
        c = sfx_click() * (0.55 + 0.45 * (1 - k / n))
        i = int(ti * SR)
        out[i:i + len(c)] += c[: len(out) - i]
    return out


def sfx_scribble(d=0.32):
    t = tt(d)
    n = butter(rng.standard_normal(len(t)), "band", (1800, 6500))
    strokes = np.abs(np.sin(2 * np.pi * 7.5 * t + 0.4 * np.sin(2 * np.pi * 3 * t))) ** 0.7
    return fade(n * strokes * (0.6 + 0.4 * rng.random()), 0.01, 0.04)


def sfx_keys():
    out = np.zeros(int(0.9 * SR))
    for k in range(11):
        f = rng.uniform(2200, 5200)
        t0 = rng.uniform(0, 0.32) if k else 0.0
        t = tt(rng.uniform(0.18, 0.45))
        y = sum(a * np.sin(2 * np.pi * f * r * t + rng.uniform(0, 6)) * np.exp(-t / (0.12 / r ** 0.5))
                for r, a in ((1, 1), (2.32, 0.5), (4.25, 0.3), (6.63, 0.15)))
        y = fade(y * rng.uniform(0.35, 1.0), 0.0005, 0.02)
        i = int(t0 * SR)
        out[i:i + len(y)] += y[: len(out) - i]
    return out * 0.4


def sfx_sparkle():
    out = np.zeros(int(0.9 * SR))
    for k, f in enumerate((mtof(101), mtof(105), mtof(108), mtof(113))):
        y = bell(f, 0.5, 0.5)
        i = int(k * 0.06 * SR)
        out[i:i + len(y)] += y[: len(out) - i]
    return out * 0.5


def sfx_notif():
    a = bell(mtof(84), 0.7, 0.8)
    b = bell(mtof(89), 0.9, 0.8)
    out = np.zeros(int(1.0 * SR))
    out[: len(a)] += a
    i = int(0.11 * SR)
    out[i:i + len(b)] += b[: len(out) - i]
    return out


def sfx_check():
    t = tt(0.18)
    f = 900 + 500 * (1 - np.exp(-t / 0.02))
    return fade(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.05), 0.001, 0.03)


def sfx_cork():
    t = tt(0.6)
    crack = butter(rng.standard_normal(len(t)), "band", (800, 9000)) * np.exp(-t / 0.002)
    tone = np.sin(2 * np.pi * np.cumsum(260 + 700 * np.exp(-t / 0.012)) / SR) * np.exp(-t / 0.05)
    thump = np.sin(2 * np.pi * 75 * t) * np.exp(-t / 0.06)
    hiss = butter(rng.standard_normal(len(t)), "high", 3500) * np.exp(-t / 0.18) * 0.25
    return fade(np.tanh(1.5 * (crack + 1.1 * tone + 0.8 * thump + hiss)), 0.0002, 0.06)


def sfx_fizz(d=2.0):
    out = np.zeros(int(d * SR))
    t_ = 0.0
    while t_ < d:
        rate = 420 * np.exp(-t_ / 0.5) + 25
        t_ += rng.exponential(1 / rate)
        f = rng.uniform(2500, 9000)
        tb = tt(0.012)
        y = np.sin(2 * np.pi * f * tb * (1 + 3 * tb)) * np.exp(-tb / 0.003) * rng.uniform(0.2, 1)
        i = int(t_ * SR)
        if i + len(y) < len(out):
            out[i:i + len(y)] += y
    return out * 0.18


def sfx_confetti(d=1.4):
    t = tt(d)
    n = butter(rng.standard_normal(len(t)), "band", (1500, 7000))
    grains = np.repeat(rng.random(len(t) // 240 + 1) ** 3, 240)[: len(t)]
    return fade(n * grains * np.exp(-t / 0.5), 0.002, 0.1) * 0.6


def sfx_crash(d=2.2):
    t = tt(d)
    n = butter(rng.standard_normal(len(t)), "high", 3500)
    metal = sum(np.sin(2 * np.pi * f * t + rng.uniform(0, 6)) for f in (3120, 4470, 5310, 6870, 8130)) * 0.06
    return fade((n + metal) * np.exp(-t / 0.7), 0.0005, 0.2)


def sfx_riser(d):
    t = tt(d)
    p = t / d
    noise = svf_bp(rng.standard_normal(len(t)), 250 * (28 ** p), 1.6) * (p ** 2.2)
    tone = np.sin(2 * np.pi * np.cumsum(mtof(53) * 2 ** (p * 1.5)) / SR) * (p ** 2) * 0.25
    return fade(noise + tone, 0.05, 0.004)


def sfx_shake(d=0.27):
    t = tt(d)
    n = butter(rng.standard_normal(len(t)), "band", (500, 3000))
    am = (0.5 + 0.5 * np.sin(2 * np.pi * 18 * t)) ** 2
    return fade(n * am * np.minimum(1, t / d * 1.4), 0.01, 0.02) * 0.5


def sfx_draw(d=0.65):
    return noise_sweep(d, 2500, 4200, 3000, q=2.5) * 0.4


# ------------------------------------------------------------------ musique
chords = [  # (début s, fin s, notes MIDI du pad, basse MIDI, arpège)
    (0.0, 2.0, [53, 57, 60, 64], 41, [65, 69, 72, 76, 72, 69]),     # Fmaj7
    (2.0, 4.0, [57, 60, 64, 67], 45, [69, 72, 76, 79, 76, 72]),     # Am7
    (4.0, 6.0, [58, 62, 65, 69], 46, [70, 74, 77, 81, 77, 74]),     # Bbmaj7
    (6.0, 8.0, [55, 60, 64, 67], 48, [67, 72, 76, 79, 76, 72]),     # C/G
    (8.0, 10.0, [57, 62, 65, 69], 50, [69, 74, 77, 81, 77, 74]),    # Dm7
    (10.0, 12.0, [58, 62, 65, 69], 46, [70, 74, 77, 82, 77, 74]),   # Bbmaj7
    (12.0, 13.0, [55, 60, 65, 70], 48, None),                        # C7sus4 (montée)
    (13.0, 15.5, [53, 57, 60, 64, 67], 41, [65, 69, 72, 76, 79, 76]),  # Fmaj9 (final)
]

for i, (a, b, notes, bass, arp) in enumerate(chords):
    d = b - a
    fc = 1300 if a < 12 else (900 if a < 13 else 2200)
    pad = saw_pad([mtof(n) for n in notes], d + 0.6, fc=fc, seed=i)
    env = np.minimum(1, tt(d + 0.6) / (0.9 if i == 0 else 0.08))[:, None]
    env *= np.clip((d + 0.6 - tt(d + 0.6)) / 0.6, 0, 1)[:, None]
    if a >= 12 and a < 13:  # filtre qui s'ouvre pendant la montée
        env *= np.linspace(0.5, 1.4, len(env))[:, None]
    music.add(pad * env, a, gain=0.5 if a < 1 else 0.34)

# arpège marimba : croches avec une double-croche d'ornement, à partir de l'étape 1
step = BEAT / 2
for a, b, notes, bass, arp in chords:
    if arp is None:
        continue
    k = 0
    t0 = max(a, 1.0)
    t_ = t0
    while t_ < min(b, 15.0) - 1e-6:
        if a >= 13 and t_ > 14.5 + 1e-6:
            break
        n = arp[k % len(arp)]
        vel = 0.55 if (k % 4 == 0) else 0.36
        pan = -0.35 if k % 2 == 0 else 0.35
        x = marimba(mtof(n), 0.7, vel)
        music.add(x, t_, gain=0.68, pan=pan)
        verb_send.add(x, t_, gain=0.3, pan=pan)
        t_ += step
        k += 1

# basse sur les contretemps, du début de l'étape 1 à la montée, puis le final
for a, b, notes, bass, arp in chords:
    if arp is None:
        continue
    t_ = max(a, 1.0) + BEAT / 2
    while t_ < min(b, 14.6):
        music.add(bass_note(mtof(bass), 0.32, 0.9), t_, gain=0.55)
        t_ += BEAT

# batterie : quatre temps de 1 s à 12 s, roulement de montée, retour au drop
bt = 1.0
while bt < 12.0 - 1e-6:
    drums.add(kick(), bt, gain=0.9)
    beat_in_bar = round((bt % 2.0) / BEAT)
    if beat_in_bar in (1, 3):
        drums.add(clap(), bt, gain=0.42, pan=0.05)
        verb_send.add(clap(), bt, gain=0.3)
    drums.add(hat(0.55), bt + BEAT / 2, gain=0.42, pan=0.3)
    drums.add(hat(0.25), bt + BEAT / 4, gain=0.24, pan=0.4)
    drums.add(hat(0.25), bt + 3 * BEAT / 4, gain=0.24, pan=0.4)
    bt += BEAT
roll = [12.0, 12.25, 12.5, 12.625, 12.75, 12.8125, 12.875, 12.9375]  # roulement qui accélère
for k, t_ in enumerate(roll):
    drums.add(clap(0.35 + 0.65 * k / (len(roll) - 1)), t_, gain=0.5)
    verb_send.add(clap(0.5), t_, gain=0.2)
bt = 13.0
while bt < 14.6:
    drums.add(kick(vel=1.0), bt, gain=1.0 if bt == 13.0 else 0.9)
    if round((bt - 13.0) / BEAT) in (1, 3):
        drums.add(clap(), bt, gain=0.45)
    drums.add(hat(0.6, open_=True), bt + BEAT / 2, gain=0.25, pan=0.3)
    bt += BEAT
drums.add(sfx_crash(), 13.0, gain=0.5, pan=-0.2)
verb_send.add(sfx_crash(), 13.0, gain=0.2)
# ponctuation finale
for n in (65, 69, 72, 77):
    music.add(marimba(mtof(n), 1.0, 0.7), 14.5, gain=0.5, pan=0.0)
music.add(saw_pad([mtof(n) for n in (53, 60, 65, 69, 72)], 0.6, fc=2500, seed=99) * np.linspace(1, 0, int(0.6 * SR))[:, None] ** 2, 14.5, gain=0.4)

# --------------------------------------------------------------- effets placés
cues = json.loads((ROOT / "out" / "cues.json").read_text())["cues"]
tick_notes = [77, 79, 81, 84, 86, 89, 91]
tick_i = 0
for c in cues:
    t, kind, v = c["t"], c["type"], c["v"]
    if kind == "tick":
        x = marimba(mtof(tick_notes[min(tick_i, 6)]), 0.4, 0.9, bright=1.4)
        sfx.add(x, t, gain=0.32 * v + 0.1, pan=-0.6 + 0.2 * tick_i)
        verb_send.add(x, t, gain=0.2)
        tick_i += 1
    elif kind == "check":
        sfx.add(sfx_check(), t, gain=0.16)
    elif kind == "draw":
        place_stereo_move(sfx, sfx_draw(), t, 0.22, -0.3, 0.3)
    elif kind == "whoosh":
        # direction stéréo selon la sortie à l'écran
        p0, p1 = (0.2, -0.8) if 3.6 < t < 4.0 else ((-0.2, 0.2) if t < 1 else (0.3, -0.3))
        place_stereo_move(sfx, sfx_whoosh(), t - 0.05, 0.42 * v, p0, p1)
    elif kind == "swish":
        p0, p1 = (0.8, 0.0) if 3.8 < t < 4.0 else (0.0, 0.0)
        place_stereo_move(sfx, sfx_swish(), t, 0.3 * v, p0, p1)
    elif kind == "roll":
        sfx.add(sfx_roll(0.55), t, gain=0.22 * v + 0.05, pan=-0.1)
    elif kind == "ding":
        x = bell(mtof(93), 1.2, 1.0)
        sfx.add(x, t, gain=0.22 * v, pan=0.25)
        verb_send.add(x, t, gain=0.3)
    elif kind == "flip":
        sfx.add(sfx_flip(), t, gain=0.4 * v)
    elif kind == "stamp":
        sfx.add(sfx_stamp(), t, gain=0.62 * v)
    elif kind == "pop":
        sfx.add(sfx_pop(300 + 80 * rng.random(), 1000 + 300 * rng.random()), t, gain=0.24 * v, pan=rng.uniform(-0.3, 0.3))
    elif kind == "click":
        sfx.add(sfx_click(), t, gain=0.5, pan=0.3)
    elif kind == "notif":
        x = sfx_notif()
        sfx.add(x, t, gain=0.24)
        verb_send.add(x, t, gain=0.3)
    elif kind == "scribble":
        sfx.add(sfx_scribble(), t, gain=0.3 * v, pan=0.15)
    elif kind == "pulse":
        for i, p in enumerate((-0.6, 0.0, 0.6)):
            sfx.add(sfx_pop(260, 640), t + i * 0.05, gain=0.16, pan=p)
    elif kind == "tickdown":
        for i, n in enumerate((84, 81, 77)):
            sfx.add(marimba(mtof(n), 0.35, 0.8, bright=1.3), t + i * 0.05, gain=0.22, pan=(-0.5, 0, 0.5)[i])
    elif kind == "rise":
        for i, n in enumerate((77, 81, 84, 89)):
            x = bell(mtof(n), 0.6, 0.5)
            sfx.add(x, t + i * 0.035, gain=0.14)
            verb_send.add(x, t + i * 0.035, gain=0.2)
    elif kind == "keys":
        sfx.add(sfx_keys(), t - 0.06, gain=0.55)
    elif kind == "sparkle":
        x = sfx_sparkle()
        sfx.add(x, t, gain=0.22, pan=0.2)
        verb_send.add(x, t, gain=0.35)
    elif kind == "riser":
        r = sfx_riser(13.0 - t)
        sfx.add(r, t, gain=0.6)
        verb_send.add(r, t, gain=0.15)
    elif kind == "shake":
        sfx.add(sfx_shake(), t, gain=0.4)
    elif kind == "cork":
        sfx.add(sfx_cork(), t, gain=0.8)
        verb_send.add(sfx_cork(), t, gain=0.3)
    elif kind == "confetti":
        place_stereo_move(sfx, sfx_confetti(), t, 0.3, -0.5, 0.5)
        sfx.add(np.stack([sfx_fizz(), sfx_fizz()], axis=1), t, gain=1.0)


# ----------------------------------------------------------------- mixage
def reverb_ir(rt60=1.1, d=1.6):
    t = tt(d)
    ir = rng.standard_normal((len(t), 2)) * np.exp(-6.9 * t / rt60)[:, None]
    for c in range(2):
        ir[:, c] = butter(ir[:, c], "low", 6000)
    ir[: int(0.012 * SR)] = 0
    return ir / np.sqrt((ir ** 2).sum(0, keepdims=True))


def sidechain(t_arr):
    """Pompage léger de la musique sur la grosse caisse."""
    g = np.ones(len(t_arr))
    for bt in list(np.arange(1.0, 12.0, BEAT)) + list(np.arange(13.0, 14.6, BEAT)):
        i = int(bt * SR)
        n = int(0.22 * SR)
        g[i:i + n] *= 1 - 0.35 * np.exp(-np.arange(n) / SR / 0.06)
    return g


ir = reverb_ir()
wet = np.stack([signal.fftconvolve(verb_send.buf[:, c], ir[:, c])[: len(verb_send.buf)] for c in range(2)], axis=1)
sc = sidechain(np.arange(len(music.buf)) / SR)[:, None]
music_b = butter(music.buf.T, "high", 150).T * 0.25 + butter(music.buf.T, "high", 40).T * 0.75
drums_b = butter(drums.buf.T, "high", 42, order=3).T
# la musique s'efface légèrement sous les effets (ducking)
from scipy.ndimage import uniform_filter1d
sfx_env = np.sqrt(uniform_filter1d((sfx.buf ** 2).sum(1), size=int(0.03 * SR)))
ref = np.percentile(sfx_env[sfx_env > 1e-4], 90) if (sfx_env > 1e-4).any() else 1.0
duck = np.empty_like(sfx_env)
cur, k_rel = 0.0, 1 - np.exp(-1 / (0.15 * SR))
for i, v in enumerate(np.clip(sfx_env / ref, 0, 1)):
    cur = v if v > cur else cur + (v - cur) * k_rel
    duck[i] = cur
duck = (1 - 0.3 * duck)[:, None]
mix = music_b * sc * duck * 0.9 + drums_b * 0.85 + sfx.buf * 1.2 + wet * 0.35
mix = butter(mix.T, "high", 32, order=3).T[:N]
for name, b in (("musique", music_b * sc * 0.9), ("batterie", drums_b * 0.85), ("effets", sfx.buf), ("réverbe", wet * 0.35)):
    r = np.sqrt((b[:N] ** 2).mean())
    print(f"  bus {name:9s} rms {20 * np.log10(r + 1e-12):6.1f} dB")


def limiter(x, ceiling=0.84, look=0.004, rel=0.09):
    """Limiteur crête à anticipation : le gain descend avant la crête, remonte lentement."""
    from scipy.ndimage import maximum_filter1d, minimum_filter1d, uniform_filter1d
    L = int(look * SR)
    a = maximum_filter1d(np.abs(x).max(1), size=2 * L + 1)
    target = np.minimum(1.0, ceiling / np.maximum(a, 1e-9))
    target = minimum_filter1d(target, size=2 * L + 1)
    g = np.empty_like(target)
    cur, k = 1.0, 1 - np.exp(-1 / (rel * SR))
    for i in range(len(target)):
        cur = target[i] if target[i] < cur else cur + (target[i] - cur) * k
        g[i] = cur
    g = uniform_filter1d(g, size=L + 1)
    return x * np.minimum(g, target)[:, None]


def lufs(x):
    """Sonie intégrée ITU-R BS.1770 (pondération K, portes absolue et relative)."""
    b1, a1 = signal.iirfilter(2, 1500 / (SR / 2), btype="highpass", ftype="butter")
    # filtres K de la norme (coefficients à 48 kHz)
    sb = [1.53512485958697, -2.69169618940638, 1.19839281085285]
    sa = [1.0, -1.69065929318241, 0.73248077421585]
    hb = [1.0, -2.0, 1.0]
    ha = [1.0, -1.99004745483398, 0.99007225036621]
    y = signal.lfilter(hb, ha, signal.lfilter(sb, sa, x, axis=0), axis=0)
    blk, hop = int(0.4 * SR), int(0.1 * SR)
    ms = np.array([(y[i:i + blk] ** 2).mean(0).sum() for i in range(0, len(y) - blk, hop)])
    lk = -0.691 + 10 * np.log10(ms + 1e-12)
    g1 = ms[lk > -70]
    rel = -0.691 + 10 * np.log10(g1.mean()) - 10
    g2 = g1[(-0.691 + 10 * np.log10(g1 + 1e-12)) > rel]
    return -0.691 + 10 * np.log10(g2.mean())


mix[-int(0.08 * SR):] *= np.linspace(1, 0, int(0.08 * SR))[:, None]
mix = mix / np.abs(mix).max() * 0.5
gain = 1.0
for _ in range(6):  # ajuste le gain d'entrée du limiteur jusqu'à -14 LUFS
    out_mix = limiter(mix * gain)
    L_ = lufs(out_mix)
    if abs(L_ + 14.0) < 0.1:
        break
    gain *= 10 ** ((-14.0 - L_) / 20)
print(f"sonie {L_:.2f} LUFS, crête {20 * np.log10(np.abs(out_mix).max()):.2f} dBFS, gain {20 * np.log10(gain):.1f} dB")
out = ROOT / "out" / "soundtrack.wav"
wavfile.write(out, SR, (np.clip(out_mix, -1, 1) * (2 ** 23 - 1)).astype(np.int32) << 8)
print(f"écrit : {out}")
