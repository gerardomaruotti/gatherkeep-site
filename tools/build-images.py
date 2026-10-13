#!/usr/bin/env python3
"""Regenerate derived images from the framed screenshots and icons in assets/.

Requires Pillow with WebP and AVIF support (pip install pillow).
Run from the repository root: python3 tools/build-images.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ASSETS = Path(__file__).resolve().parent.parent / "assets"
SHOTS = ["library", "capture", "filter", "markdown", "voice"]
WIDTHS = [400, 800]
FONT_DIR = Path("/usr/share/fonts/truetype/macos")

COPY = {
    "en": ("Keep what matters.", "Find it later.", "Links, notes, photos, files, and voice notes.", "Beta interest list open  ·  iPhone & iPad"),
    "it": ("Tieni ciò che conta.", "Ritrovalo.", "Link, note, foto, file e note vocali.", "Lista di interesse per la beta  ·  iPhone e iPad"),
}


def font(weight, size):
    return ImageFont.truetype(str(FONT_DIR / f"Inter-{weight}.ttf"), size)


def build_screenshots():
    for name in SHOTS:
        src = Image.open(ASSETS / f"{name}-framed.png").convert("RGBA")
        for width in WIDTHS:
            height = round(src.height * width / src.width)
            img = src.resize((width, height), Image.LANCZOS)
            img.save(ASSETS / f"{name}-{width}.avif", quality=55, speed=2)
            img.save(ASSETS / f"{name}-{width}.webp", quality=82, method=6)
            img.quantize(256, method=Image.FASTOCTREE, dither=Image.FLOYDSTEINBERG).save(
                ASSETS / f"{name}-{width}.png", optimize=True
            )


def build_touch_icon():
    icon = Image.open(ASSETS / "gatherkeep-icon.png").convert("RGBA")
    size = 180
    top, bottom = icon.getpixel((30, 70))[:3], icon.getpixel((30, 190))[:3]
    bg = Image.new("RGB", (size, size))
    draw = ImageDraw.Draw(bg)
    for y in range(size):
        t = y / (size - 1)
        draw.line([(0, y), (size, y)], fill=tuple(round(a + (b - a) * t) for a, b in zip(top, bottom)))
    scaled = round(size * 1.1)
    icon = icon.resize((scaled, scaled), Image.LANCZOS)
    offset = (size - scaled) // 2
    bg.paste(icon, (offset, offset), icon)
    bg.save(ASSETS / "apple-touch-icon.png", optimize=True)


def build_og(lang):
    w, h = 1200, 630
    line1, line2, sub, foot = COPY[lang]
    canvas = Image.new("RGB", (w, h), (255, 244, 235))
    glow = Image.new("RGB", (w, h), (255, 244, 235))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((660, 40, 1260, 640), fill=(255, 211, 181))
    glow = glow.filter(__import__("PIL.ImageFilter", fromlist=["x"]).GaussianBlur(90))
    canvas.paste(glow)
    draw = ImageDraw.Draw(canvas)

    icon = Image.open(ASSETS / "gatherkeep-icon.png").convert("RGBA").resize((88, 88), Image.LANCZOS)
    canvas.paste(icon, (80, 80), icon)
    draw.text((184, 124), "Gatherkeep", font=font("Bold", 44), fill=(24, 25, 27), anchor="lm")

    draw.text((80, 262), line1, font=font("Bold", 58), fill=(24, 25, 27), anchor="ls")
    draw.text((80, 330), line2, font=font("Bold", 58), fill=(240, 96, 0), anchor="ls")
    draw.text((80, 400), sub, font=font("Medium", 26), fill=(98, 101, 106), anchor="ls")
    draw.text((80, 548), foot, font=font("SemiBold", 24), fill=(163, 67, 0), anchor="ls")
    for text, fnt in [(line1, font("Bold", 58)), (sub, font("Medium", 26)), (foot, font("SemiBold", 24))]:
        assert draw.textlength(text, font=fnt) < 580, text

    for name, x, y, width, _ in [("filter", 690, 170, 290, 0), ("library", 850, 70, 330, 0)]:
        shot = Image.open(ASSETS / f"{name}-framed.png").convert("RGBA")
        shot = shot.resize((width, round(shot.height * width / shot.width)), Image.LANCZOS)
        shadow = Image.new("RGBA", shot.size, (0, 0, 0, 0))
        shadow.putalpha(shot.getchannel("A").point(lambda a: a * 90 // 255))
        shadow = shadow.filter(__import__("PIL.ImageFilter", fromlist=["x"]).GaussianBlur(18))
        canvas.paste(shadow, (x, y + 18), shadow)
        canvas.paste(shot, (x, y), shot)
    canvas.save(ASSETS / f"og-{lang}.png", optimize=True)


if __name__ == "__main__":
    build_screenshots()
    build_touch_icon()
    for lang in COPY:
        build_og(lang)
