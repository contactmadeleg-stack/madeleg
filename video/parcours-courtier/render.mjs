// Rendu image par image de index.html (Chromium headless) puis encodage ffmpeg.
//
//   node render.mjs --stills 0.5,1.2,3       images fixes + planche contact
//   node render.mjs --preview                30 i/s, demi-résolution, sans flou
//   node render.mjs                          final : 60 i/s, 1080×1920, flou de mouvement ×6
//
// Options : --fps N --samples N --shutter 0.5 --scale 1 --workers 4 --from S --to S --out fichier.mp4
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'out');
const PAGE_URL = pathToFileURL(path.join(ROOT, 'index.html')).href;
const CHROMIUM = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const argv = process.argv.slice(2);
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const v = argv[i + 1];
  return v === undefined || v.startsWith('--') ? true : v;
};
const preview = opt('preview', false) === true;
const stills = opt('stills', null);
const fps = Number(opt('fps', preview ? 30 : 60));
const samples = Number(opt('samples', preview ? 1 : 6));
const shutter = Number(opt('shutter', 0.5)); // fraction de la durée d'image (0.5 = 180°)
const scale = Number(opt('scale', preview ? 0.5 : 1));
const workers = Number(opt('workers', 4));
const query = opt('guides', false) === true ? '?guides=1' : '';

async function openPage() {
  const browser = await chromium.launch({
    executablePath: CHROMIUM,
    args: ['--allow-file-access-from-files', '--force-color-profile=srgb', '--font-render-hinting=none', '--disable-lcd-text', '--hide-scrollbars'],
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: scale });
  page.on('pageerror', (e) => console.error('[page]', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.error('[console]', m.text()); });
  await page.goto(PAGE_URL + query);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  const cdp = await page.context().newCDPSession(page);
  const shot = async (t) => {
    await page.evaluate((tt) => window.__video.render(tt), t);
    const r = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true });
    return Buffer.from(r.data, 'base64');
  };
  return { browser, page, shot };
}

function ffmpeg(args) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`ffmpeg a échoué (${r.status})`);
}

async function renderStills() {
  const times = String(stills).split(',').map(Number);
  const dir = path.join(OUT, 'stills');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const { browser, shot } = await openPage();
  const files = [];
  for (const t of times) {
    const f = path.join(dir, `t_${t.toFixed(2).padStart(5, '0')}.png`);
    fs.writeFileSync(f, await shot(t));
    files.push(f);
  }
  await browser.close();
  const sheet = path.join(OUT, 'contact.png');
  const r = spawnSync('montage', [...files, '-tile', `${Math.min(files.length, 5)}x`, '-geometry', '324x576+8+8', '-background', '#1a1a1a',
    '-fill', '#ffffff', '-pointsize', '18', '-title', '', sheet], { stdio: 'inherit' });
  if (r.status === 0) console.log(`planche : ${sheet}`);
  console.log(files.join('\n'));
}

async function renderVideo() {
  const meta = await (async () => {
    const { browser, page } = await openPage();
    const m = await page.evaluate(() => ({ duration: window.__video.duration, cues: window.__video.cues, T: window.__video.T }));
    await browser.close();
    return m;
  })();
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'cues.json'), JSON.stringify(meta, null, 1));

  const from = Number(opt('from', 0)), to = Number(opt('to', meta.duration));
  const first = Math.round(from * fps), last = Math.round(to * fps); // [first, last)
  const nFrames = last - first;
  const dir = path.join(OUT, 'frames');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const jobs = [];
  for (let k = 0; k < nFrames; k++) {
    for (let j = 0; j < samples; j++) {
      const tc = (first + k) / fps;
      const t = samples === 1 ? tc : tc + ((j + 0.5) / samples - 0.5) * (shutter / fps);
      jobs.push({ idx: k * samples + j, t: Math.min(meta.duration - 1e-4, Math.max(0, t)) });
    }
  }
  const t0 = Date.now();
  let done = 0;
  const chunk = Math.ceil(jobs.length / workers);
  await Promise.all(Array.from({ length: workers }, async (_, w) => {
    const mine = jobs.slice(w * chunk, (w + 1) * chunk);
    if (!mine.length) return;
    const { browser, shot } = await openPage();
    for (const job of mine) {
      fs.writeFileSync(path.join(dir, `${String(job.idx).padStart(6, '0')}.png`), await shot(job.t));
      done++;
      if (done % 200 === 0) {
        const el = (Date.now() - t0) / 1000;
        console.log(`${done}/${jobs.length} captures — ${el.toFixed(0)} s, reste ~${((jobs.length - done) * el / done).toFixed(0)} s`);
      }
    }
    await browser.close();
  }));
  console.log(`captures terminées en ${((Date.now() - t0) / 1000).toFixed(1)} s`);

  const outFile = path.resolve(ROOT, opt('out', path.join(OUT, preview ? 'preview.mp4' : 'video-muette.mp4')));
  const vf = [];
  if (samples > 1) vf.push(`tmix=frames=${samples}`, `select='eq(mod(n+1\\,${samples})\\,0)'`, `setpts=N/${fps}/TB`);
  vf.push('scale=out_color_matrix=bt709:out_range=tv', 'format=yuv420p');
  ffmpeg([
    '-framerate', String(fps * samples), '-i', path.join(dir, '%06d.png'),
    '-vf', vf.join(','), '-r', String(fps),
    '-c:v', 'libx264', '-preset', preview ? 'veryfast' : 'slow', '-crf', preview ? '20' : '12',
    '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-movflags', '+faststart', outFile,
  ]);
  console.log(`vidéo : ${outFile}`);
}

if (stills) await renderStills();
else await renderVideo();
