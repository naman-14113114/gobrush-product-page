import json
import re

with open('translations.json', 'r', encoding='utf-8') as f:
    translations = json.load(f)

sorted_translations = sorted(translations.items(), key=lambda x: len(x[0]), reverse=True)

with open('scraped_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Translate Dutch strings
for nl, en in sorted_translations:
    html = html.replace(nl, en)

# Extra bullet & review & contact translations
translations_extra = [
    ('Poets tot <strong>60 dagen</strong><span> met slechts één keer opladen.</span>',
     'Brushes up to <strong>60 days</strong><span> on a single charge.</span>'),
    ('Poets tot <strong>60 dagen</strong><span> met slechts \u00e9\u00e9n keer opladen.</span>',
     'Brushes up to <strong>60 days</strong><span> on a single charge.</span>'),
    ('<span>Krachtige </span><strong>sonische reiniging</strong><span> voor een stralend en gezond gebit.</span>',
     '<span>Powerful </span><strong>sonic cleaning</strong><span> for a radiant and healthy smile.</span>'),
    ('Inclusief handig <strong>Travelcase</strong> voor onderweg t.w.v. €15,95.',
     'Includes convenient <strong>Travelcase</strong> worth €15.95.'),
    ('Inclusief handig <strong>Travelcase</strong> voor onderweg t.w.v. \u20ac15,95.',
     'Includes convenient <strong>Travelcase</strong> worth €15.95.'),
    ('33 Recensies', '33 Reviews'),
    ('Recensies', 'Reviews'),
    ('>Bundel<', '>Bundles<'),
    ('Heb je vragen?', 'Have questions?'),
    ('Neem gerust contact met ons op', 'Feel free to contact us'),
    ('placeholder="Naam"', 'placeholder="Name"'),
    ('placeholder="E-mail"', 'placeholder="Email"'),
    ('placeholder="Bericht"', 'placeholder="Message"'),
    ('Bericht verzenden', 'Send message'),
    ('Verzenden', 'Send'),
    ('Wat zit er in de verpakking?', 'Package contents'),
    ('GoBrush sonische tandenborstel in gekozen kleur', 'GoBrush sonic toothbrush in chosen color'),
    ('opzetborstels', 'brush heads'),
    ('magnetisch oplaaddock en USB-C oplaadkabel', 'magnetic charging dock and USB-C charging cable'),
    ('adapter niet inbegrepen', 'adapter not included'),
    ('Waarom de GoBrush?', 'Why the GoBrush?'),
    ('Tot 60 dagen poetsen met één oplaadbeurt', 'Up to 60 days of brushing on a single charge'),
    ('Geavanceerde sonische technologie met 40.000 trillingen per minuut', 'Advanced sonic technology with 40,000 vibrations per minute'),
    ('Inclusief luxe Travelcase voor onderweg', 'Includes luxury Travelcase on the go'),
    ('100% waterdicht (IPX7) – perfect onder de douche', '100% waterproof (IPX7) – perfect in the shower'),
    ('2 jaar garantie & 60 dagen bedenktijd', '2-year warranty & 60-day trial period')
]

for nl, en in translations_extra:
    html = html.replace(nl, en)

# 2. Local Stylesheets & Scripts
html = html.replace('//gobrush.nl/cdn/shop/t/6/assets/theme.css?v=24492219413562240901733490075', 'assets_ref/theme.css')
html = html.replace('//gobrush.nl/cdn/shop/t/6/assets/apps.css?v=155754260707641237201733490075', 'assets_ref/apps.css')
html = html.replace('//gobrush.nl/cdn/shop/t/6/assets/vendor.js?v=169599425471746764341733490075', 'assets_ref/vendor.js')
html = html.replace('//gobrush.nl/cdn/shop/t/6/assets/theme.js?v=59524088897036028331733490075', 'assets_ref/theme.js')

# 3. Protocol relative URLs to HTTPS
html = html.replace('src="//', 'src="https://')
html = html.replace('srcset="//', 'srcset="https://')
html = html.replace('data-src="//', 'data-src="https://')
html = html.replace('url("//', 'url("https://')

# 4. Insert Pure Looping Muted Gallery Video at top of product__media-list
gallery_video_html = """
<div id="product-media-video-item" class="product__media product__media--video card col-span-2 w-full relative overflow-hidden" data-media-type="video" style="grid-column: 1 / -1; width: 100%; min-width: 100%; flex: 0 0 100%; scroll-snap-align: start; border-radius: var(--card-radius, 1rem); background: #000; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 4px; pointer-events: none;">
  <div class="video-wrapper relative w-full overflow-hidden" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 520px; display: flex; align-items: center; justify-content: center; background: #000; border-radius: inherit;">
    <video
      id="gallery-featured-video"
      class="w-full h-full object-cover"
      src="https://miroooo-us.vercel.app/media/products/miroooo-electric-toothbrush-x2/videos/31-miroooo-electric-toothbrush-x2-demo-1.mp4"
      autoplay
      loop
      muted
      playsinline
      disablepictureinpicture
      controlslist="nodownload nofullscreen noremoteplayback"
      preload="auto"
      style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: inherit; pointer-events: none;"
    ></video>
  </div>
</div>
"""

video_thumb_html = """<button id="thumb-video-item" aria-current="true" aria-label="Go to video" class="product__thumbnail media media--square relative overflow-hidden is-active" data-media-type="video" type="button" style="border-radius: 8px;">
  <div style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; position: relative;">
    <img id="thumb-video-img" alt="Video thumbnail" src="https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-8.jpg?v=1734444578&width=200" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.6;" />
    <svg style="position: absolute; width: 18px; height: 18px; fill: white; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
  </div>
</button>"""

pattern_media_list = r'(<div\s+class="[^"]*product__media-list[^"]*"[^>]*>)'
html = re.sub(pattern_media_list, r'\1\n' + gallery_video_html, html, count=1)

pattern_thumb_list = r'(<media-dots\s+[^>]*class="[^"]*product__thumbnails-list[^"]*"[^>]*>)'
html = re.sub(pattern_thumb_list, r'\1\n' + video_thumb_html, html, count=1)

# 5. Section 1: "DISCOVER THE ULTIMATE IN ORAL HYGIENE" (Black Split Section)
miroooo_section_1_html = """
<!-- DISCOVER THE ULTIMATE IN ORAL HYGIENE Section (From Miroooo) -->
<div id="shopify-section-template--miroooo-discover-oral-hygiene" class="shopify-section" style="background: #000000; color: #ffffff; width: 100%; overflow: hidden; position: relative;">
  <div style="width: 100%; max-width: 1856px; margin: 0 auto;">
    <div class="oral-hygiene-grid" style="display: grid; grid-template-columns: 1fr; width: 100%; min-height: 600px; background: #000000; align-items: stretch;">
      
      <!-- Left Column: Typography & Feature Bullets -->
      <div class="oral-hygiene-content" style="display: flex; flex-direction: column; justify-content: center; padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 5vw, 6.5rem); background: #000000; color: #ffffff; z-index: 2; box-sizing: border-box;">
        <h2 style="font-family: var(--font-heading-family, 'Inter', serif); font-size: clamp(1.45rem, 2.6vw, 2.5rem); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.28; margin: 0 0 1.5rem 0; color: #ffffff; max-width: 540px; word-break: break-word;">
          DISCOVER THE ULTIMATE IN ORAL HYGIENE
        </h2>
        
        <div style="width: 100px; height: 1px; background: rgba(255, 255, 255, 0.35); margin: 0 0 2.25rem 0;"></div>
        
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.25rem; max-width: 580px;">
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>Award-Winning Design</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>10 X more plaque removal than normal toothbrushes</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>Luxury Travel Case</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>45% smaller than other electric toothbrushes</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>60 days of battery life with only 2 hours of charging</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>100% waterproof</span>
          </li>
          <li style="display: flex; align-items: center; gap: 0.85rem; font-size: clamp(0.92rem, 1.15vw, 1.15rem); color: rgba(255, 255, 255, 0.95); line-height: 1.45; font-weight: 400; letter-spacing: 0.01em;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; flex-shrink: 0;"></span>
            <span>Reduced noise level below 50 dB</span>
          </li>
        </ul>
      </div>

      <!-- Right Column: Demo Video -->
      <div class="oral-hygiene-media" style="position: relative; width: 100%; height: 100%; min-height: 480px; overflow: hidden; background: #000000;">
        <video
          id="oral-hygiene-video"
          class="w-full h-full object-cover"
          src="https://miroooo-us.vercel.app/media/products/miroooo-electric-toothbrush-x2/videos/33-miroooo-electric-toothbrush-x2-demo-3.mp4"
          autoplay
          loop
          muted
          playsinline
          disablepictureinpicture
          controlslist="nodownload nofullscreen noremoteplayback"
          preload="auto"
          style="width: 100%; height: 100%; min-height: 480px; object-fit: cover; display: block; background: #000000; pointer-events: none;"
        ></video>
      </div>

    </div>
  </div>
</div>
"""

# 6. Section 2: "Brush with Style & Precision" (ALL 4 POINTERS + Seamless #e6e6e6 background)
miroooo_section_2_html = """
<!-- BRUSH WITH STYLE & PRECISION Section (From Miroooo with ALL 4 Pointers) -->
<div id="shopify-section-template--miroooo-brush-style-precision" class="shopify-section" style="background: #e6e6e6; color: #171717; width: 100%; overflow: hidden; padding: clamp(4rem, 7vw, 7.5rem) 0; box-sizing: border-box;">
  <div style="max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px); box-sizing: border-box; width: 100%;">
    
    <!-- Section Header -->
    <div style="text-align: center; margin-bottom: clamp(3rem, 5.5vw, 5.5rem); width: 100%; display: flex; flex-direction: column; align-items: center;">
      <h2 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.85rem, 3.4vw, 3rem); font-weight: 600; color: #111111; margin: 0 0 0.75rem 0; letter-spacing: -0.01em; line-height: 1.25; text-align: center; width: 100%;">
        Brush with Style &amp; Precision
      </h2>
      <p style="font-family: 'GFS Didot', Georgia, serif; font-size: clamp(1.05rem, 1.3vw, 1.25rem); color: #555555; font-style: italic; margin: 0; text-align: center;">
        Your new smile starts right here
      </p>
    </div>

    <!-- 3-Column Grid: Left (2 Pointers) | Center (Hero Toothbrush) | Right (2 Pointers) -->
    <div class="style-precision-grid" style="display: grid; grid-template-columns: 1fr; gap: clamp(2rem, 3.5vw, 4rem); align-items: center; width: 100%; box-sizing: border-box;">
      
      <!-- Left Column: Pointers 1 & 2 -->
      <div class="style-col-left" style="display: flex; flex-direction: column; gap: clamp(2.5rem, 4.5vw, 4.5rem); text-align: center;">
        
        <!-- Pointer 1: Long-Lasting Performance -->
        <div class="style-feature-card" style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; transition: transform 0.3s ease;">
          <div style="width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.25rem;">
            <img src="https://e-assets.beeketing.net/10684/10684350/themes/17866971910e251e78ab.png" alt="Battery Charging" style="width: 52px; height: 52px; object-fit: contain;" />
          </div>
          <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.2rem, 1.55vw, 1.45rem); font-weight: 600; color: #111111; margin: 0;">
            Long-Lasting Performance
          </h3>
          <div style="font-family: var(--font-body-family, sans-serif); font-size: clamp(0.92rem, 1.08vw, 1.05rem); color: #444444; line-height: 1.65;">
            <p style="margin: 0;">Lasts 6-8 weeks on a single charge</p>
            <p style="margin: 0;">Wireless induction charging</p>
          </div>
        </div>

        <!-- Pointer 2: Professional & Effortless Brushing -->
        <div class="style-feature-card" style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; transition: transform 0.3s ease;">
          <div style="width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.25rem;">
            <img src="https://e-assets.beeketing.net/10684/10684350/themes/1786697231eb311edbde.png" alt="Sonic Waves" style="width: 52px; height: 52px; object-fit: contain;" />
          </div>
          <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.2rem, 1.55vw, 1.45rem); font-weight: 600; color: #111111; margin: 0;">
            Professional &amp; effortless brushing
          </h3>
          <div style="font-family: var(--font-body-family, sans-serif); font-size: clamp(0.92rem, 1.08vw, 1.05rem); color: #444444; line-height: 1.65;">
            <p style="margin: 0;">32,000 vibrations per minute</p>
            <p style="margin: 0;">3 advanced brushing modes</p>
            <p style="margin: 0;">Smart sensor technology</p>
          </div>
        </div>

      </div>

      <!-- Center Hero Toothbrush Image (Seamless #e6e6e6 Background) -->
      <div class="style-col-center" style="display: flex; justify-content: center; align-items: center; position: relative; width: 100%;">
        <div style="max-width: 340px; width: 100%; position: relative; display: flex; justify-content: center;">
          <img
            src="https://e-assets.beeketing.net/10684/10684350/themes/1786698100cbcfdd856d.png"
            alt="GoBrush Sonic Toothbrush"
            style="max-height: 600px; width: 100%; object-fit: contain; background: #e6e6e6; display: block;"
          />
        </div>
      </div>

      <!-- Right Column: Pointers 3 & 4 -->
      <div class="style-col-right" style="display: flex; flex-direction: column; gap: clamp(2.5rem, 4.5vw, 4.5rem); text-align: center;">
        
        <!-- Pointer 3: Premium Quality -->
        <div class="style-feature-card" style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; transition: transform 0.3s ease;">
          <div style="width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.25rem;">
            <img src="https://e-assets.beeketing.net/10684/10684350/themes/17866972695acbc5e011.png" alt="Premium Quality Badge" style="width: 52px; height: 52px; object-fit: contain;" />
          </div>
          <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.2rem, 1.55vw, 1.45rem); font-weight: 600; color: #111111; margin: 0;">
            Premium quality
          </h3>
          <div style="font-family: var(--font-body-family, sans-serif); font-size: clamp(0.92rem, 1.08vw, 1.05rem); color: #444444; line-height: 1.65;">
            <p style="margin: 0;">IPX-7 waterproof rated alloy casing</p>
            <p style="margin: 0;">Silent brushing at 50 DB</p>
          </div>
        </div>

        <!-- Pointer 4: Compact & Lightweight -->
        <div class="style-feature-card" style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; transition: transform 0.3s ease;">
          <div style="width: 58px; height: 58px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.25rem;">
            <img src="https://e-assets.beeketing.net/10684/10684350/themes/17866972585c5d9195cc.png" alt="Compact Lightweight" style="width: 52px; height: 52px; object-fit: contain;" />
          </div>
          <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.2rem, 1.55vw, 1.45rem); font-weight: 600; color: #111111; margin: 0;">
            Compact &amp; lightweight
          </h3>
          <div style="font-family: var(--font-body-family, sans-serif); font-size: clamp(0.92rem, 1.08vw, 1.05rem); color: #444444; line-height: 1.65;">
            <p style="margin: 0;">Travel-friendly at only 51 g</p>
            <p style="margin: 0;">45% smaller than regular electric toothbrushes</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>
"""

# 7. Section 3: "3 BRUSH FUNCTIONS, 1 EFFECTIVE TECHNOLOGY" (White Luxury Section)
miroooo_section_3_html = """
<!-- 3 BRUSH FUNCTIONS, 1 EFFECTIVE TECHNOLOGY Section (From Miroooo) -->
<div id="shopify-section-template--miroooo-brush-functions" class="shopify-section" style="background: #ffffff; color: #171717; width: 100%; overflow: hidden; padding: clamp(4.5rem, 7vw, 7.5rem) 0; box-sizing: border-box;">
  <div style="max-width: 1240px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 40px); box-sizing: border-box; width: 100%;">
    
    <!-- Section Header -->
    <div style="text-align: center; margin-bottom: clamp(3rem, 5.5vw, 5.5rem); width: 100%; display: flex; flex-direction: column; align-items: center;">
      <h2 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.75rem, 3.2vw, 2.75rem); font-weight: 600; color: #111111; margin: 0 0 1.25rem 0; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.3; text-align: center; width: 100%;">
        3 BRUSH FUNCTIONS, 1 EFFECTIVE TECHNOLOGY
      </h2>
      <p style="font-family: 'GFS Didot', Georgia, serif; font-size: clamp(1rem, 1.25vw, 1.2rem); color: #555555; max-width: 780px; margin: 0 auto; line-height: 1.65; text-align: center;">
        Our unique ultrasonic brushing method is complemented by three individual brushing functions, catering to every need, whether you seek a gentle or deep cleaning. The choice is yours!
      </p>
    </div>

    <!-- 3 Circular Thumbnails Row -->
    <div class="brush-functions-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(1.5rem, 4vw, 4.5rem); text-align: center; justify-items: center; width: 100%; box-sizing: border-box;">
      
      <!-- Function 1: STANDARD -->
      <div class="function-item" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
        <div style="width: clamp(140px, 18vw, 220px); height: clamp(140px, 18vw, 220px); border-radius: 50%; overflow: hidden; background: #f8f8f8; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
          <img src="https://e-assets.beeketing.net/10684/10684350/themes/17866902250f48175f95.png" alt="Standard Mode" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
        <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.1rem, 1.4vw, 1.35rem); font-weight: 600; color: #111111; letter-spacing: 0.08em; text-transform: uppercase; margin: 0;">
          STANDARD
        </h3>
      </div>

      <!-- Function 2: WHITENING -->
      <div class="function-item" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
        <div style="width: clamp(140px, 18vw, 220px); height: clamp(140px, 18vw, 220px); border-radius: 50%; overflow: hidden; background: #f8f8f8; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
          <img src="https://e-assets.beeketing.net/10684/10684350/themes/17866902414eb46921b5.png" alt="Whitening Mode" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
        <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.1rem, 1.4vw, 1.35rem); font-weight: 600; color: #111111; letter-spacing: 0.08em; text-transform: uppercase; margin: 0;">
          WHITENING
        </h3>
      </div>

      <!-- Function 3: DEEP CLEANSING -->
      <div class="function-item" style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
        <div style="width: clamp(140px, 18vw, 220px); height: clamp(140px, 18vw, 220px); border-radius: 50%; overflow: hidden; background: #f8f8f8; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); transition: transform 0.3s ease;">
          <img src="https://e-assets.beeketing.net/10684/10684350/themes/1786690254f165e32fdc.png" alt="Deep Cleansing Mode" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
        <h3 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.1rem, 1.4vw, 1.35rem); font-weight: 600; color: #111111; letter-spacing: 0.08em; text-transform: uppercase; margin: 0;">
          DEEP CLEANSING
        </h3>
      </div>

    </div>
  </div>
</div>
"""

# 8. Section 4: "LUXURIOUS PROFESSIONALISM" (Split Video & Text Section)
miroooo_section_4_html = """
<!-- LUXURIOUS PROFESSIONALISM Section (From Miroooo) -->
<div id="shopify-section-template--miroooo-luxurious-professionalism" class="shopify-section" style="background: #e6e6e6; color: #111111; width: 100%; overflow: hidden; position: relative;">
  <div style="width: 100%; max-width: 1856px; margin: 0 auto;">
    <div class="luxurious-grid" style="display: grid; grid-template-columns: 1fr; width: 100%; min-height: 560px; background: #e6e6e6; align-items: stretch;">
      
      <!-- Left Column: Video 2 -->
      <div class="luxurious-media" style="position: relative; width: 100%; height: 100%; min-height: 460px; overflow: hidden; background: #e6e6e6;">
        <video
          id="luxurious-video"
          class="w-full h-full object-cover"
          src="https://miroooo-us.vercel.app/media/products/miroooo-electric-toothbrush-x2/videos/32-miroooo-electric-toothbrush-x2-demo-2.mp4"
          autoplay
          loop
          muted
          playsinline
          disablepictureinpicture
          controlslist="nodownload nofullscreen noremoteplayback"
          preload="auto"
          style="width: 100%; height: 100%; min-height: 460px; object-fit: cover; display: block; background: #e6e6e6; pointer-events: none;"
        ></video>
      </div>

      <!-- Right Column: Content & Typography -->
      <div class="luxurious-content" style="display: flex; flex-direction: column; justify-content: center; padding: clamp(3rem, 6vw, 6rem) clamp(1.75rem, 5vw, 6.5rem); background: #e6e6e6; color: #111111; z-index: 2; box-sizing: border-box;">
        <h2 style="font-family: 'GFS Didot', 'Playfair Display', Georgia, serif; font-size: clamp(1.75rem, 3.2vw, 2.75rem); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.25; margin: 0 0 1.75rem 0; color: #111111; max-width: 540px; word-break: break-word;">
          LUXURIOUS PROFESSIONALISM
        </h2>
        
        <p style="font-family: 'GFS Didot', Georgia, serif; font-size: clamp(1rem, 1.25vw, 1.2rem); color: #333333; line-height: 1.75; margin: 0; max-width: 580px;">
          Uncover the exceptional qualities of a toothbrush carefully designed for daily professional and personalized dental care. Its gentle yet potent performance ensures optimal health for your teeth and gums, making it an intelligent companion for your active on-the-go lifestyle.
        </p>
      </div>

    </div>
  </div>
</div>
"""

# 9. Section 5: "Real customers, real reactions." (LuminPack Flickity Video Carousel with Full Peeking Flow)
miroshine_video_carousel_html = """
<!-- Real customers, real reactions. (From Miroshine) -->
<div id="shopify-section-template--miroshine-reels-container" class="shopify-section" style="background: #ffffff; padding: clamp(4rem, 6.5vw, 6.5rem) 0 clamp(4rem, 6.5vw, 6.5rem) 0; overflow: hidden; width: 100%;">
  
  <div style="max-width: 1200px; margin: 0 auto clamp(2.5rem, 4vw, 3.5rem) auto; text-align: center; padding: 0 20px;">
    <h2 style="font-family: var(--font-heading-family, 'Inter', -apple-system, sans-serif); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 400; color: #111111; letter-spacing: -0.03em; margin: 0; line-height: 1.15;">
      Real customers, real reactions.
    </h2>
  </div>

  <div class="miroshine-reels-carousel" id="miroshine-reels-slider" style="width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); overflow: hidden; position: relative;">
    
    <!-- Reel 1 -->
    <div class="reels-card-cell">
      <div class="reels-card-inner">
        <video
          class="reels-video"
          loop
          muted
          playsinline
          preload="auto"
          poster="https://miroshine.com/cdn/shop/files/preview_images/40f61341d6c64af28b645aba8fe50d61.thumbnail.0000000000.jpg?v=1777412073&width=1200"
          src="https://miroshine.com/cdn/shop/videos/c/vp/40f61341d6c64af28b645aba8fe50d61/40f61341d6c64af28b645aba8fe50d61.HD-1080p-7.2Mbps-82949597.mp4?v=0"
        ></video>
        <button class="reels-sound-btn" aria-label="Toggle sound" type="button"></button>
      </div>
    </div>

    <!-- Reel 2 -->
    <div class="reels-card-cell">
      <div class="reels-card-inner">
        <video
          class="reels-video"
          loop
          muted
          playsinline
          preload="auto"
          poster="https://miroshine.com/cdn/shop/files/preview_images/99d1230c3ad44fd6b66e3390b02c24d1.thumbnail.0000000000.jpg?v=1777412060&width=1200"
          src="https://miroshine.com/cdn/shop/videos/c/vp/99d1230c3ad44fd6b66e3390b02c24d1/99d1230c3ad44fd6b66e3390b02c24d1.HD-1080p-7.2Mbps-82949585.mp4?v=0"
        ></video>
        <button class="reels-sound-btn" aria-label="Toggle sound" type="button"></button>
      </div>
    </div>

    <!-- Reel 3 -->
    <div class="reels-card-cell">
      <div class="reels-card-inner">
        <video
          class="reels-video"
          loop
          muted
          playsinline
          preload="auto"
          poster="https://miroshine.com/cdn/shop/files/preview_images/f99a93c4ec014f56adaa0d2fed4dbbd7.thumbnail.0000000000.jpg?v=1777412056&width=1200"
          src="https://miroshine.com/cdn/shop/videos/c/vp/f99a93c4ec014f56adaa0d2fed4dbbd7/f99a93c4ec014f56adaa0d2fed4dbbd7.HD-1080p-7.2Mbps-82949593.mp4?v=0"
        ></video>
        <button class="reels-sound-btn" aria-label="Toggle sound" type="button"></button>
      </div>
    </div>

    <!-- Reel 4 -->
    <div class="reels-card-cell">
      <div class="reels-card-inner">
        <video
          class="reels-video"
          loop
          muted
          playsinline
          preload="auto"
          poster="https://miroshine.com/cdn/shop/files/preview_images/913f756c294245c6b21497169cea0bce.thumbnail.0000000000.jpg?v=1777410924&width=1200"
          src="https://miroshine.com/cdn/shop/videos/c/vp/913f756c294245c6b21497169cea0bce/913f756c294245c6b21497169cea0bce.HD-1080p-7.2Mbps-82948471.mp4?v=0"
        ></video>
        <button class="reels-sound-btn" aria-label="Toggle sound" type="button"></button>
      </div>
    </div>

    <!-- Reel 5 -->
    <div class="reels-card-cell">
      <div class="reels-card-inner">
        <video
          class="reels-video"
          loop
          muted
          playsinline
          preload="auto"
          poster="https://miroshine.com/cdn/shop/files/preview_images/29115406e2624cdc812543ecf58be9de.thumbnail.0000000000.jpg?v=1777412537&width=1200"
          src="https://miroshine.com/cdn/shop/videos/c/vp/29115406e2624cdc812543ecf58be9de/29115406e2624cdc812543ecf58be9de.HD-1080p-7.2Mbps-82950192.mp4?v=0"
        ></video>
        <button class="reels-sound-btn" aria-label="Toggle sound" type="button"></button>
      </div>
    </div>

  </div>
</div>
"""

# Assemble all extra luxury sections
all_extra_sections = (
    miroooo_section_1_html + '\n' +
    miroooo_section_2_html + '\n' +
    miroooo_section_3_html + '\n' +
    miroooo_section_4_html + '\n' +
    miroshine_video_carousel_html
)

overlay_section_pattern = r'(<div[^>]*id="shopify-section-template--24203751129433__image_with_text_overlay_tfKPyw"[^>]*>)'
if re.search(overlay_section_pattern, html):
    html = re.sub(overlay_section_pattern, all_extra_sections + r'\n\1', html, count=1)
    print("All sections + Miroshine video carousel inserted cleanly before banner overlay!")
else:
    print("WARNING: Could not find overlay section pattern!")

# 10. Add Custom CSS & JavaScript helpers
head_injections = """
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.min.css">
<style>
@media screen and (max-width: 1023px) {
  .product__media--video {
    aspect-ratio: 16/9 !important;
    max-height: calc(100vw * 9 / 16) !important;
    height: auto !important;
  }
  .product__media--video .video-wrapper {
    height: 100% !important;
  }
  .oral-hygiene-grid {
    grid-template-columns: 1fr !important;
  }
  .oral-hygiene-media {
    min-height: 340px !important;
    aspect-ratio: 16/9;
  }
  .oral-hygiene-media video {
    min-height: 340px !important;
    max-height: 460px !important;
  }
  .style-precision-grid {
    grid-template-columns: 1fr !important;
    gap: 3rem !important;
  }
  .style-col-center {
    order: -1;
    margin-bottom: 0.5rem;
  }
  .style-col-center img {
    max-height: 380px !important;
  }
  .brush-functions-grid {
    grid-template-columns: 1fr !important;
    gap: 2.5rem !important;
  }
  .luxurious-grid {
    grid-template-columns: 1fr !important;
  }
  .luxurious-media {
    min-height: 340px !important;
    aspect-ratio: 16/9;
  }
  .luxurious-media video {
    min-height: 340px !important;
    max-height: 460px !important;
  }
}
@media screen and (min-width: 1024px) {
  .product__media--video {
    aspect-ratio: 16/9;
    width: 100% !important;
    grid-column: 1 / -1 !important;
  }
  .oral-hygiene-grid {
    grid-template-columns: 1fr 1fr !important;
  }
  .oral-hygiene-media video {
    min-height: 600px !important;
    height: 100% !important;
  }
  .style-precision-grid {
    grid-template-columns: 1fr 1.2fr 1fr !important;
  }
  .luxurious-grid {
    grid-template-columns: 1fr 1fr !important;
  }
  .luxurious-media video {
    min-height: 600px !important;
    height: 100% !important;
  }
}

.style-feature-card:hover {
  transform: translateY(-4px);
}
.function-item:hover div {
  transform: scale(1.05);
}

/* Miroshine Video Carousel Reels Styling */
.miroshine-reels-carousel {
  position: relative;
  width: 100%;
}
.miroshine-reels-carousel .flickity-viewport {
  overflow: visible !important;
}
.reels-card-cell {
  width: 290px;
  margin: 0 10px;
  display: inline-block;
  cursor: grab;
}
.reels-card-cell:active {
  cursor: grabbing;
}
.reels-card-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  border-radius: 14px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, opacity 0.4s ease;
  transform: scale(0.92);
  opacity: 0.82;
}
.reels-card-cell.is-selected .reels-card-inner {
  transform: scale(1.03);
  opacity: 1;
  box-shadow: 0 16px 40px rgba(0,0,0,0.22);
}
.reels-card-inner:hover {
  transform: scale(1.02);
  opacity: 1;
}
.reels-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: inherit;
}
.reels-sound-btn {
  position: absolute;
  bottom: 14px;
  right: 14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  z-index: 10;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z'/%3E%3C/svg%3E");
  background-size: 55%;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.reels-sound-btn:hover {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.75);
}
.reels-sound-btn.is-unmuted {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z'/%3E%3C/svg%3E");
}
@media (max-width: 767px) {
  .reels-card-cell {
    width: 250px;
    margin: 0 6px;
  }
}

/* Variant Swatches Styling */
.swatches--variant .label-swatch {
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  border-radius: 8px;
  padding: 8px 16px;
  border: 1px solid rgba(0,0,0,0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.swatches--variant a.is-selected .label-swatch,
.swatches--variant a:hover .label-swatch {
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}
.product__media img {
  transition: opacity 0.3s ease;
}
</style>
<script>
document.documentElement.classList.replace('no-js', 'js');
window.theme = window.theme || {};
theme.routes = {
  shop_url: 'https://gobrush.nl',
  root_url: '/',
  cart_url: '/cart',
  cart_add_url: '/cart/add',
  cart_change_url: '/cart/change',
  cart_update_url: '/cart/update',
  search_url: '/search',
  predictive_search_url: '/search/suggest',
};
theme.variantStrings = {
  preOrder: "Pre-order",
  addToCart: "Add to cart",
  soldOut: "Sold out",
  unavailable: "Unavailable",
  addToBundle: "Add to bundle",
  backInStock: "Notify me when available",
};
</script>
"""

html = html.replace('</head>', head_injections + '\n</head>')

footer_injections = """
<script src="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.3.0/flickity.pkgd.min.js"></script>
<script>
const VARIANTS_DATA = {
  "Rose Gold": {
    title: "Miroooo X - Pink",
    price: "€89,00",
    images: [
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-1.jpg?v=1734444500",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-2.jpg?v=1734444500",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-6.jpg?v=1734444523",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-5.jpg?v=1734444523",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-9.jpg?v=1734444523",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-4.jpg?v=1734444523",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-7.jpg?v=1734444523",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/RoseGold-color-3.jpg?v=1734444523"
    ]
  },
  "Grey": {
    title: "Miroooo X - Grey",
    price: "€89,00",
    images: [
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-8.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-1.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-5.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-4.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-7.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-3.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-6.jpg?v=1734444578",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Grey-color-2.jpg?v=1734444578"
    ]
  },
  "Silver": {
    title: "Miroooo X - Silver",
    price: "€89,00",
    images: [
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone_bc23c130-0175-4280-a940-991c90ef5864.jpg?v=1734177610",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-2_bf1007db-6e2d-4d39-8848-6c2df6be0e02.jpg?v=1734444598",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-6_71ab7df0-b0d2-4f71-b535-3d711ef71788.jpg?v=1734444598",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-5_7f5d25e6-1fe0-4552-b1a7-669f132b7e71.jpg?v=1734444598",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-8_66074e3f-e5eb-4c51-917a-f4da5918f0b6.jpg?v=1734444598",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-4_4b2fd569-8d8a-47f0-ab85-56d936b236b8.jpg?v=1734444596",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-7_be75048c-94be-420a-8192-a50303ddfd6b.jpg?v=1734444596",
      "https://cdn.shopify.com/s/files/1/0810/6023/3561/files/Brushone-3_b25071aa-5726-4a76-8e72-406dc102f223.jpg?v=1734444596"
    ]
  }
};

function selectColorVariant(colorName) {
  const data = VARIANTS_DATA[colorName];
  if (!data) return;

  // 1. Update Title
  document.querySelectorAll('.product__title h1, .product-title, h1.product__title, .product__title').forEach(el => {
    if (el.tagName === 'H1') el.textContent = data.title;
    else {
      const h1 = el.querySelector('h1');
      if (h1) h1.textContent = data.title;
    }
  });

  // 2. Update Color Label
  document.querySelectorAll('.variant-picker .form__label span, .variant-picker label span, .variant-picker .form__label strong').forEach(el => {
    el.textContent = colorName;
  });

  // 3. Update Swatches Active state
  document.querySelectorAll('.swatches--variant a').forEach(a => {
    const title = (a.querySelector('label')?.getAttribute('title') || a.textContent || '').trim();
    if (title === colorName) {
      a.classList.add('is-selected');
      const radio = a.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    } else {
      a.classList.remove('is-selected');
      const radio = a.querySelector('input[type="radio"]');
      if (radio) radio.checked = false;
    }
  });

  // 4. Update Main Gallery Images
  const galleryImageMedia = document.querySelectorAll('.product__media-list .product__media:not(.product__media--video)');
  galleryImageMedia.forEach((mediaEl, idx) => {
    if (data.images[idx]) {
      const img = mediaEl.querySelector('img');
      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = data.images[idx] + '&width=1500';
          img.srcset = `${data.images[idx]}&width=550 550w, ${data.images[idx]}&width=1100 1100w, ${data.images[idx]}&width=1500 1500w`;
          img.style.opacity = '1';
        }, 150);
      }
    }
  });

  // 5. Update Thumbnails
  const thumbElements = document.querySelectorAll('.product__thumbnails-list .product__thumbnail:not([data-media-type="video"])');
  thumbElements.forEach((thumbEl, idx) => {
    if (data.images[idx]) {
      const img = thumbEl.querySelector('img');
      if (img) {
        img.src = data.images[idx] + '&width=200';
      }
    }
  });

  // Update video thumb background image
  const videoThumbImg = document.getElementById('thumb-video-img');
  if (videoThumbImg && data.images[0]) {
    videoThumbImg.src = data.images[0] + '&width=200';
  }

  // 6. Update Sticky Bar
  const stickyTitle = document.querySelector('.product-sticky-form__title, .product-sticky-form h3');
  if (stickyTitle) stickyTitle.textContent = data.title;
  const stickyImg = document.querySelector('.product-sticky-form__media img, .product-sticky-form img');
  if (stickyImg && data.images[0]) stickyImg.src = data.images[0] + '&width=200';
}

document.addEventListener('DOMContentLoaded', () => {
  // Magnet button effect
  document.querySelectorAll('[is="magnet-button"], button.button').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Setup Color Swatch Clicks
  document.querySelectorAll('.swatches--variant a, .variant-picker a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const colorName = (a.querySelector('label')?.getAttribute('title') || a.textContent || '').trim();
      if (colorName && VARIANTS_DATA[colorName]) {
        selectColorVariant(colorName);
      }
    });
  });

  // Set initial selected swatch (Grey)
  selectColorVariant("Grey");

  // Thumbnail click smooth scrolling
  const allThumbnails = document.querySelectorAll('.product__thumbnails-list .product__thumbnail');
  const allMediaItems = document.querySelectorAll('.product__media-list .product__media');
  allThumbnails.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => {
      allThumbnails.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
      if (allMediaItems[idx]) {
        allMediaItems[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    });
  });

  // Sticky Buy Bar scroll trigger
  const stickyBar = document.querySelector('.product-sticky-form__card');
  const mainBuyBtn = document.querySelector('.product-form__submit');
  if (stickyBar && mainBuyBtn) {
    const checkScroll = () => {
      const rect = mainBuyBtn.getBoundingClientRect();
      if (rect.bottom < 0) {
        stickyBar.classList.remove('opacity-0', 'invisible');
        stickyBar.classList.add('opacity-100', 'visible');
        stickyBar.style.transform = 'translateY(0)';
      } else {
        stickyBar.classList.add('opacity-0', 'invisible');
        stickyBar.classList.remove('opacity-100', 'visible');
        stickyBar.style.transform = 'translateY(100%)';
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Cart Drawer open/close
  const cartDrawer = document.getElementById('CartDrawer');
  const openCartBtns = document.querySelectorAll('a[href="/cart"], button[aria-controls="CartDrawer"], .product-form__submit, [name="add"]');
  const closeCartBtns = document.querySelectorAll('.cart-drawer__close, #CartDrawer [is="drawer-close-button"], #CartDrawer .drawer__close, .drawer__overlay');
  
  openCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cartDrawer) {
        cartDrawer.setAttribute('open', 'true');
        cartDrawer.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  closeCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (cartDrawer) {
        cartDrawer.removeAttribute('open');
        cartDrawer.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // Autoplay hero & section videos
  const autoVideos = [
    document.getElementById('gallery-featured-video'),
    document.getElementById('oral-hygiene-video'),
    document.getElementById('luxurious-video')
  ];
  autoVideos.forEach(v => {
    if (v) {
      v.muted = true;
      const play = () => { if (v.paused) v.play().catch(() => {}); };
      play();
      document.addEventListener('touchstart', play, { once: true, passive: true });
      document.addEventListener('click', play, { once: true, passive: true });
    }
  });

  // Initialize Miroshine Flickity Reels Carousel
  const reelsElem = document.getElementById('miroshine-reels-slider');
  if (reelsElem && typeof Flickity !== 'undefined') {
    const flkty = new Flickity(reelsElem, {
      cellAlign: 'center',
      autoPlay: 5000,
      draggable: true,
      contain: false,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      pauseAutoPlayOnHover: true,
      selectedAttraction: 0.025,
      friction: 0.28
    });

    const reelCells = reelsElem.querySelectorAll('.reels-card-cell');
    const reelVideos = reelsElem.querySelectorAll('.reels-video');

    function syncVideoPlayback() {
      const activeIdx = flkty.selectedIndex;
      reelVideos.forEach((vid, i) => {
        if (i === activeIdx) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }

    syncVideoPlayback();

    flkty.on('change', () => {
      syncVideoPlayback();
    });

    reelCells.forEach((cell, idx) => {
      const soundBtn = cell.querySelector('.reels-sound-btn');
      const vid = cell.querySelector('.reels-video');

      if (soundBtn && vid) {
        soundBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          vid.muted = !vid.muted;
          soundBtn.classList.toggle('is-unmuted', !vid.muted);
        });
      }

      cell.addEventListener('click', () => {
        flkty.select(idx);
      });
    });
  }
});
</script>
"""

html = html.replace('</body>', footer_injections + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html fully updated with live variant switching for Rose Gold, Grey, and Silver!")
