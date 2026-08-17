import cv2
import numpy as np
from PIL import Image, ImageFilter
import os

src_path = 'C:/Users/sahil/.gemini/antigravity/brain/ee9c779b-d6cc-4587-bef4-a7a2b60479a0/.user_uploaded/media_1786973724370.jpg'
orig = Image.open(src_path).convert('RGB')
w_orig, h_orig = orig.size

# We want 1:1 square. If width is 750, square height should be 750.
# Let's upscale to 1254x1254 to match the other gallery images (1254x1254)
target_dim = 1254
scale = target_dim / w_orig
new_w = target_dim
new_h = int(round(h_orig * scale)) # 836

img_scaled = orig.resize((new_w, new_h), Image.Resampling.LANCZOS)
img_arr = np.array(img_scaled).astype(np.float32)

# Top pad and bottom pad
total_pad = target_dim - new_h
top_pad = total_pad // 2
bot_pad = total_pad - top_pad

# Create canvas of size (target_dim, target_dim, 3)
canvas = np.zeros((target_dim, target_dim, 3), dtype=np.float32)

# Place image in vertical center
canvas[top_pad:top_pad+new_h, :, :] = img_arr

# Replicate gradient on top and bottom seamlessly
# For top: linearly extrapolate from top 30 rows
top_strip = img_arr[:30, :, :]
# Fit a smooth linear gradient for each column
for x in range(target_dim):
    col = top_strip[:, x, :]
    # slope
    slope = (col[0, :] - col[-1, :]) / 30.0
    for y in range(top_pad):
        dist = top_pad - y
        canvas[y, x, :] = col[0, :] + slope * min(dist * 0.5, 15.0)

# For bottom: linearly extrapolate from bottom 30 rows
bot_strip = img_arr[-30:, :, :]
for x in range(target_dim):
    col = bot_strip[:, x, :]
    slope = (col[-1, :] - col[0, :]) / 30.0
    for y in range(bot_pad):
        dist = y + 1
        canvas[top_pad + new_h + y, x, :] = col[-1, :] + slope * min(dist * 0.5, 15.0)

# Smooth the seams slightly
canvas_uint8 = np.clip(canvas, 0, 255).astype(np.uint8)
canvas_pil = Image.fromarray(canvas_uint8)

# Blur seam regions (around y=top_pad and y=top_pad+new_h)
blurred = canvas_pil.filter(ImageFilter.GaussianBlur(radius=3))
mask = Image.new('L', (target_dim, target_dim), 0)
mask_arr = np.array(mask)
mask_arr[max(0, top_pad-10):top_pad+10, :] = 255
mask_arr[top_pad+new_h-10:min(target_dim, top_pad+new_h+10), :] = 255
mask = Image.fromarray(mask_arr)
final_square = Image.composite(blurred, canvas_pil, mask)

# Save 1:1 gallery image
out_gallery = 'E:/1st YEAR DTU/New folder/gobrush-product-page/assets_ref/x/gallery/Silver-9.webp'
final_square.save(out_gallery, 'WEBP', quality=95)
print(f"Saved 1:1 square gallery image to {out_gallery}")

# Save original aspect ratio image for package contents section
out_section = 'E:/1st YEAR DTU/New folder/gobrush-product-page/assets_ref/x/miroooo-x-package-box.webp'
orig.save(out_section, 'WEBP', quality=95)
print(f"Saved original aspect ratio section image to {out_section}")
