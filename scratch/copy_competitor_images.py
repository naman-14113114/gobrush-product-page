import os
from PIL import Image

src_files = {
    'suri': r'E:\1st YEAR DTU\New folder\miroooo_images\edited with miroooo\suri compare.png',
    'philips': r'E:\1st YEAR DTU\New folder\miroooo_images\edited with miroooo\philips compare.png',
    'oralb': r'E:\1st YEAR DTU\New folder\miroooo_images\edited with miroooo\oral B comapre.png'
}

dest_dir = r'E:\1st YEAR DTU\New folder\gobrush-product-page\assets_ref\x'
os.makedirs(dest_dir, exist_ok=True)

for key, src_path in src_files.items():
    im = Image.open(src_path)
    out_webp = os.path.join(dest_dir, f'compare-{key}.webp')
    out_png = os.path.join(dest_dir, f'compare-{key}.png')
    
    # Save as high quality transparent WebP
    im.save(out_webp, 'WEBP', quality=95)
    # Also save PNG
    im.save(out_png, 'PNG')
    print(f'Converted {key}: {out_webp} & {out_png}')
