#!/usr/bin/env bash
# Reconstruit la vidéo finale : images (60 i/s, flou de mouvement) → bande-son → mux.
# Prérequis : Node 20+, Python 3 (numpy, scipy), ffmpeg, Chromium pour Playwright.
set -euo pipefail
cd "$(dirname "$0")"

node render.mjs "$@"   # écrit out/video-muette.mp4 et out/cues.json
python3 audio.py       # lit out/cues.json, écrit out/soundtrack.wav
ffmpeg -hide_banner -loglevel error -y \
  -i out/video-muette.mp4 -i out/soundtrack.wav \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -ar 48000 -shortest \
  -movflags +faststart parcours-courtier-9x16.mp4
echo "vidéo finale : $(pwd)/parcours-courtier-9x16.mp4"
