"""Render the 15-second portfolio reel with Pillow and FFmpeg."""

from pathlib import Path
from math import cos, pi, sin
import subprocess

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
W, H, FPS = 1280, 720, 30
BLACK, WHITE, LIME = "#0b1213", "#f5f5ee", "#b9f451"
BOLD = ROOT / "src/fonts/Acorn-Bold.woff2"
REGULAR = ROOT / "src/fonts/Acorn-Regular.woff2"


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size)


def ease(x):
    x = max(0, min(1, x))
    return 1 - (1 - x) ** 3


def fit(path, size):
    return ImageOps.fit(Image.open(ROOT / "public" / path).convert("RGB"), size, Image.Resampling.LANCZOS)


def card(path, size, label):
    w, h = size
    image = Image.new("RGBA", (w + 24, h + 66), "#f5f5ee")
    image.paste(fit(path, size), (12, 12))
    ImageDraw.Draw(image).text((15, h + 30), label, font=font(16, True), fill="#123329")
    return image


AOUN = card("projects/aoun.png", (670, 420), "AOUN  /  PRODUCT EXPERIENCE")
NAQI = card("projects/naqi-01-home.png", (555, 312), "NAQI  /  PRIVATE BY DESIGN")
MALABJI = card("apps/malabji-1.png", (555, 312), "MALABJI  /  PLAY, SIMPLIFIED")
TILES = [
    fit("projects/kashaf-alkulify.png", (600, 338)),
    fit("projects/gift.png", (600, 338)),
    fit("projects/pastehtml.png", (600, 338)),
    fit("apps/eecommittee-2.png", (600, 338)),
]


def label(draw, text, xy, fill=WHITE, size=15):
    draw.text(xy, text, font=font(size, True), fill=fill, stroke_width=0)


def paste_alpha(base, overlay, xy, alpha=1):
    if alpha < 1:
        overlay = overlay.copy()
        overlay.putalpha(overlay.getchannel("A").point(lambda v: round(v * alpha)))
    base.paste(overlay, xy, overlay)


def opener(t):
    frame = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(frame)
    for n in range(28):
        x = n * 58 - 150 + int(t * 15)
        d.line((x, 0, x, H), fill="#17302c", width=1)
    for n in range(16):
        y = n * 54 - 70
        d.line((0, y, W, y), fill="#17302c", width=1)
    for r in (175, 245, 320):
        radius = r + t * 32
        d.ellipse((640-radius, 365-radius, 640+radius, 365+radius), outline="#356f58", width=2)
    for n in range(24):
        angle = 2 * pi * n / 24 + t * .5
        x = 640 + cos(angle) * 270
        y = 365 + sin(angle) * 270
        d.ellipse((x-2, y-2, x+2, y+2), fill=LIME)
    label(d, "MOTION / 001", (555, 150), LIME)
    for index, word in enumerate(("THINK.", "BUILD.", "MOVE.")):
        enter = ease((t - index * .28) / .5)
        if not enter:
            continue
        y = 194 + index * 125 + int((1 - enter) * 80)
        d.text((640, y), word, font=font(139, True), anchor="mt", fill=WHITE if index != 1 else "#98b5ad")
    if t > .85:
        label(d, "FROM FIRST THOUGHT TO THE FINAL FRAME", (446, 620), "#b9d8cc")
    return frame


def aoun(t):
    frame = Image.new("RGB", (W, H), "#d8faf0")
    d = ImageDraw.Draw(frame)
    d.text((-55, 46), "01", font=font(510, True), fill="#b9f0dc")
    move = ease(t / .75)
    label(d, "01 / PRODUCT DESIGN", (90, 245), "#195549")
    d.text((78 - int((1-move)*110), 273), "AOUN.", font=font(114, True), fill="#08231e")
    d.text((90, 410), "Clarity for the most", font=font(32, True), fill="#174d41")
    d.text((90, 452), "complex ideas.", font=font(32, True), fill="#174d41")
    d.line((90, 530, 182, 530), fill="#0d846d", width=3)
    label(d, "RESEARCH / INTERFACE / EXPERIENCE", (90, 552), "#3d7067", 13)
    shot = AOUN.rotate(7, expand=True, resample=Image.Resampling.BICUBIC)
    x = 595 + int((1-move)*720) - int(t*14)
    paste_alpha(frame, shot, (x, 140))
    return frame


def duo(t):
    frame = Image.new("RGB", (W, H), "#ee795c")
    d = ImageDraw.Draw(frame)
    d.text((55, 58), "MAKE IT", font=font(150, True), fill="#102b27")
    d.text((55, 200), "MATTER.", font=font(150, True), fill="#102b27")
    left = NAQI.rotate(11, expand=True, resample=Image.Resampling.BICUBIC)
    right = MALABJI.rotate(-10, expand=True, resample=Image.Resampling.BICUBIC)
    paste_alpha(frame, left, (-35 + int(ease(t/.75)*120), 330 - int(ease(t/.75)*90)))
    paste_alpha(frame, right, (700 + int((1-ease((t-.25)/.75))*520), 130))
    label(ImageDraw.Draw(frame), "02 / DIGITAL PRODUCTS WITH A PULSE", (866, 653), "#102f29", 12)
    return frame


def mosaic(t):
    frame = Image.new("RGB", (W, H), "#121d25")
    drift = int(ease(t/3) * 48)
    for i, tile in enumerate(TILES):
        x = -25 + (i % 2) * 650
        y = -80 + (i // 2) * 400 + (drift if i % 2 else -drift)
        frame.paste(tile, (x, y))
    shade = Image.new("RGBA", (W, H), (5, 18, 18, 177))
    frame = Image.alpha_composite(frame.convert("RGBA"), shade).convert("RGB")
    d = ImageDraw.Draw(frame)
    label(d, "03 / SELECTED PROJECTS", (527, 186), LIME, 15)
    d.text((640, 255), "CURIOUS", font=font(128, True), anchor="mt", fill=WHITE)
    d.text((640, 386), "BY DESIGN.", font=font(115, True), anchor="mt", fill=WHITE)
    label(d, "WEB  /  MOBILE  /  AI  /  EVERYTHING BETWEEN", (422, 588), WHITE, 15)
    return frame


def finale(t):
    frame = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(frame)
    for r in (130, 220, 310):
        radius = r * ease(t/1.6)
        d.ellipse((640-radius, 355-radius, 640+radius, 355+radius), outline="#6ba977", width=2)
    label(d, "THE NEXT FRAME STARTS HERE", (499, 161), LIME)
    d.text((640, 231), "HAITHAM", font=font(160, True), anchor="mt", fill=WHITE)
    d.text((640, 385), "ASSOLI.", font=font(169, True), anchor="mt", fill=WHITE)
    d.line((586, 588, 694, 588), fill=LIME, width=3)
    label(d, "IMAGINE.  MAKE.  SHIP.", (530, 614), WHITE)
    return frame


SCENES = (opener, aoun, duo, mosaic, finale)


def render(t):
    index = min(int(t // 3), 4)
    local = t - index * 3
    frame = SCENES[index](local)
    if index and local < .22:
        frame = Image.blend(SCENES[index - 1](3), frame, ease(local/.22))
    d = ImageDraw.Draw(frame)
    rail = "#173b34" if index == 1 else WHITE
    label(d, "HAITHAM ASSOLI  /  SELECTED WORK", (42, 36), rail, 12)
    label(d, "PORTFOLIO FILM  /  VOL. 01", (42, 671), rail, 12)
    label(d, "AMMAN, JORDAN", (1115, 671), rail, 12)
    d.rectangle((0, H-5, int(W*(t/15)), H), fill=LIME)
    return frame


def main():
    output = ROOT / "public" / "showreel.mp4"
    command = [
        "ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264",
        "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output),
    ]
    with subprocess.Popen(command, stdin=subprocess.PIPE) as process:
        assert process.stdin
        for n in range(15 * FPS):
            process.stdin.write(render(n / FPS).tobytes())
        process.stdin.close()
        assert process.wait() == 0
    assert output.stat().st_size > 0


if __name__ == "__main__":
    main()
