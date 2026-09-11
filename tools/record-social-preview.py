"""Capture the real homepage as a slow, looping social preview."""
from pathlib import Path
import math
import subprocess
import tempfile
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
out = root / 'public' / 'social'
out.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='iam-preview-') as temp:
    frames = Path(temp)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
        page.add_init_script("sessionStorage.setItem('iam_intensive_promo_seen_sep_2026','1')")
        page.goto('https://iamagency.su/', wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(2500)
        # Warm lazy-loaded images before recording.
        for y in range(0, 2800, 400):
            page.evaluate('(y) => window.scrollTo(0,y)', y)
            page.wait_for_timeout(200)
        page.evaluate('window.scrollTo(0,0)')
        page.wait_for_timeout(1000)
        page.screenshot(path=str(out / 'homepage-scroll-v1.png'))
        for i in range(360):
            # 24 seconds: pause, slow downward scroll, pause, return smoothly.
            t = i / 15
            if t < 2:
                y = 0
            elif t < 16:
                y = 2300 * (1 - math.cos(math.pi * (t-2)/14)) / 2
            elif t < 18:
                y = 2300
            else:
                y = 2300 * (1 + math.cos(math.pi * (t-18)/6)) / 2
            page.evaluate('(y) => window.scrollTo(0,y)', y)
            page.screenshot(path=str(frames / f'{i:04}.png'))
        browser.close()
    subprocess.run(['ffmpeg','-y','-framerate','15','-i',str(frames/'%04d.png'),'-c:v','libx264','-crf','25','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'homepage-scroll-v1.mp4')], check=True, capture_output=True)
    subprocess.run(['ffmpeg','-y','-i',str(out/'homepage-scroll-v1.mp4'),'-filter_complex','fps=8,scale=600:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=none','-loop','0',str(out/'homepage-scroll-v1.gif')], check=True, capture_output=True)
print([(f.name, f.stat().st_size) for f in out.glob('homepage-scroll-v1.*')])
