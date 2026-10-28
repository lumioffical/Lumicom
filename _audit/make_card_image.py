# -*- coding: utf-8 -*-
# Prepare Morrow Coffee card image: crop 16:9 (2400x1350), mild warm grade, optimized JPG
import sys
from PIL import Image, ImageEnhance
sys.stdout.reconfigure(encoding='utf-8')

src = Image.open(r'D:\PROJECT\Lumicom\_audit\morrow-original.jpg').convert('RGB')
w, h = src.size
print('source:', w, 'x', h)

# center-crop to 16:9, biased slightly downward (lamps + seating)
target_ratio = 2400 / 1350
cur_ratio = w / h
if cur_ratio > target_ratio:
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    box = (left, 0, left + new_w, h)
else:
    new_h = int(w / target_ratio)
    top = min(int((h - new_h) * 0.62), h - new_h)
    box = (0, top, w, top + new_h)
img = src.crop(box)
print('crop:', box)

img = img.resize((2400, 1350), Image.LANCZOS)

# gentle grade: slight brightness/contrast/colour warmth to blend with Morrow warm palette
img = ImageEnhance.Brightness(img).enhance(1.04)
img = ImageEnhance.Color(img).enhance(1.05)
img = ImageEnhance.Contrast(img).enhance(1.03)

out = r'D:\PROJECT\Lumicom\02-morrow-coffee\images\cafe-lounge-copper-lamp.jpg'
img.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
import os
print('saved:', out, os.path.getsize(out), 'bytes')

# also produce a smaller preview to eyeball the result
prev = img.copy()
prev.thumbnail((960, 960), Image.LANCZOS)
prev.save(r'D:\PROJECT\Lumicom\_audit\morrow-card-preview.jpg', 'JPEG', quality=85, optimize=True)
print('preview saved')
