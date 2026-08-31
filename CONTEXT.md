# gobrush-product-page Context

Append-only memory for the `gobrush-product-page` repository. Do not delete or shorten old entries; add corrections as new entries.

## 2026-08-17 09:03:36 +05:30 - Read-only whole-repo memory update for new Miroooo storefront

- Workspace: `E:\1st YEAR DTU\New folder`.
- Repository: `E:\1st YEAR DTU\New folder\gobrush-product-page`.
- Intended public domain from repository docs and metadata: `https://trymiroooo.com`.
- Branch and upstream before task-specific reads: `main`, upstream `origin/main`.
- HEAD before memory write: `ba47704feed4445bbdc3e8882dc59e5f3408e0b7`.
- Upstream state after `git fetch --all --prune`: aligned with `origin/main`, ahead/behind `0/0`.
- Latest commit: `ba47704 Redesign Miroooo storefront around product-first theme (#4)`, committed 2026-08-17 00:08:43 +05:30 by GitHub, co-authored by `naman <namananya5@gmail.com>`.
- Remotes inspected: `origin` fetch/push at `https://github.com/naman-14113114/gobrush-product-page.git`.
- User request: update Codex memory for the whole folder, especially this newly created `gobrush-product-page` repo; understand its whole code and know where to start next time; strictly no code changes.
- Practical scope: read-only orientation, repository-state reconciliation, route/code/product/design understanding, and append-only context documentation. Storefront source, assets, route behavior, checkout URLs, deployment files, Git history, and production settings were protected.
- Governing instructions read first: workspace `AGENTS.md` and workspace `CONTEXT.md` in full. No repository-local `AGENTS.md` existed in this repo at the time of this entry, and no repository-local `CONTEXT.md` existed before this file was created for memory.
- Product/design docs read: `README.md`, `PRODUCT.md`, `DESIGN.md`, and `DESIGN.json`.
- Repository type: static Miroooo UK electric-toothbrush storefront. Source pages live as root static HTML files; `scripts/build.mjs` verifies and copies them into `public/`, including product pages under `public/products/`.
- Package facts: `package.json` names the project `miroooo-storefront`, version `1.0.0`, private, with scripts `npm run build` and `npm run verify`; Node engine is `>=20`.
- Hosting config: `vercel.json` enables clean URLs, disables trailing slash, sets `outputDirectory` to `public`, redirects `/miroooo-x` and `/miroooo-x2` to `/products/miroooo-x` and `/products/miroooo-x2`, rewrites old policy paths, adds security headers, and applies immutable cache headers for image/font assets.
- Brand truth from docs: Miroooo is a precise, calm, quietly premium UK oral-care storefront for `Brush X` and `Brush X2`; tone should be natural UK English, assured, restrained, and non-medical.
- Visual direction from docs: "The Quiet Instrument"; instrument black, graphite, soft silver, porcelain, mineral grey, with signal green reserved for true states. Premium feel should come from aluminium, contrast, proportion, product imagery, and disciplined spacing, not gold, generic teal dental styling, purple AI gradients, or clutter.
- Accessibility/product constraints from docs: WCAG 2.2 AA intent, semantic HTML, keyboard/focus states, reduced-motion support, alt text, 44px touch targets, and no color-only signalling.
- Strong content constraints from docs: do not include inherited source-store identity, Dutch copy, placeholder domains, broken Shopify residue, fabricated reviews, medical claims, dentist endorsements, fake tests, scarcity, urgency, or unsupported claims.
- Important current implementation note: the latest CSS has shifted the visible storefront to a square-edged graphite/product-first system even though older design docs mention larger rounded radii. Preserve current rendered direction unless the user explicitly requests a redesign.

## Route And File Map

- Root source pages inspected: `index.html`, `shop.html`, `miroooo-x.html`, `miroooo-x2.html`, `about.html`, `faq.html`, `contact.html`, `delivery-returns.html`, `warranty.html`, `order-tracking.html`, `privacy.html`, `terms.html`, and `404.html`.
- Generated/static output inspected by file list: `public/` mirrors the static site and includes `public/products/miroooo-x.html` and `public/products/miroooo-x2.html`.
- Shared source assets inspected: `assets/site.css`, `assets/site.js`, `assets/product-shell.css`, and `assets/product-shell.js`.
- Build/verification scripts inspected: `scripts/build.mjs` and `scripts/verify-site.mjs`.
- Discovery/support files inspected: `robots.txt`, `sitemap.xml`, `llms.txt`, `site.webmanifest`, `favicon.svg`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`, `vercel.json`, and `package.json`.
- Asset/reference folders inventoried: `assets/`, `assets_ref/`, `gallery_orig/`, and `public/`. `assets_ref/` contains Shopify/reference CSS/JS and many product images/videos used by the exported product pages.
- Main public routes from docs and sitemap: `/`, `/shop`, `/products/miroooo-x`, `/products/miroooo-x2`, `/about`, `/faq`, `/contact`, `/delivery-returns`, `/warranty`, `/order-tracking`, `/privacy`, and `/terms`.

## Current Static Page Understanding

- `index.html`: homepage title `Miroooo | Sonic electric toothbrushes`, canonical `https://trymiroooo.com/`, overlay header, hero copy `Precision. Without the noise.`, product-first imagery, range links to `Brush X` and `Brush X2`, visible prices `GBP 59` and `GBP 79`, story and service sections.
- `shop.html`: product comparison page for X and X2 with current visible prices `GBP 59` compare `GBP 119` for X and `GBP 79` compare `GBP 159` for X2. Comparison states X is the lighter simpler option with 60+ days, 51g, three modes, travel case and USB-C; X2 adds up to 90 days, pressure-sensor ring, 45-degree sweep guidance, IPX7, travel case and USB-C.
- `about.html`: brand story route with `The quiet instrument.`, focused on useful design, hand feel, routine fit, and a restrained Miroooo design language.
- `faq.html`: FAQPage schema route. Key promises include 1-3 business days processing, 3-10 business days tracked transit, 90-day home trial, two-product range difference, and support via `support@trymiroooo.com`.
- `contact.html`: support route for order help, returns, product questions, and links to order tracking, policies, and FAQs.
- `delivery-returns.html`: delivery/returns policy route, last updated 16 Aug 2026, with 1-3 business days processing, 3-10 business days tracked transit, 90-day home trial, inspection/refund language, and damaged/faulty item guidance.
- `warranty.html`: two-year limited warranty route, last updated 16 Aug 2026, covering manufacturing faults and exclusions.
- `order-tracking.html`: self-service styled form but no real tracking lookup. Form submission displays a message instructing shoppers to use the live dispatch email or contact support.
- `privacy.html`: privacy policy route covering data collection/use/sharing/retention/access/contact; operator/address are described as identified in order documentation.
- `terms.html`: terms route covering contract formation, images/finishes/claims, connected policies, and access/limits.
- `404.html`: noindex page with `That page has moved.` and buttons to shop/home.

## Shared Frontend Code Understanding

- `assets/site.js` injects the common header and footer into pages with `data-site-header` and `data-site-footer`.
- Header behavior: announcement bar says `Free tracked UK delivery` and `90-day home trial`; desktop nav includes Shop, Brush X2, Contact, FAQ, Track order, and bag icon; mobile nav opens a full overlay panel and supports Escape/resize close handling.
- Footer behavior: service strip says Customer support, Tracked UK delivery, 90-day home trial, and Two-year warranty; footer columns cover Shop, Help, and Miroooo.
- Attribution behavior: query keys `msclkid`, `gclid`, `fbclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content` are stored in sessionStorage and appended to links marked `data-product-link`.
- Interaction behavior: adds reveal animations via IntersectionObserver, respects reduced motion, marks `body.is-ready` on the next animation frame, and implements pointer-drag horizontal scroll for `data-drag-scroll` sections.
- `assets/site.css` is the main storefront system. It contains older rounded-system rules plus later `Miroooo graphite storefront system` overrides; the effective current system uses a dark graphite/porcelain palette, square radii, product-forward sections, responsive header/mobile drawer, homepage hero/range/story sections, forms, policy pages, and reduced-motion handling.
- `assets/product-shell.js` patches exported product pages at runtime. It sets `lang=en-GB`, adds a skip link, rewrites announcement/nav/footer text, maps inherited old links to the static Miroooo routes, rewrites account links to `/order-tracking`, appends attribution to Buudy checkout links, and adds a robust fixed cart-drawer close button.
- `assets/product-shell.css` contains product-page shell patches including skip link, announcement override, cart close styling, and replacement product footer styling.

## Product Page Understanding

- `miroooo-x.html` and `miroooo-x2.html` are exported product pages that still include Shopify-style shell markup, `assets_ref/theme.css`, `assets_ref/apps.css`, `assets_ref/vendor.js`, `assets_ref/theme.js`, Flickity CDN usage, cart drawer markup, and local product-shell CSS/JS patches.
- Both product pages use a custom buy-box/cart-drawer flow and redirect final checkout to `https://buudy.com/pages/add-to-cart` with product, variant, quantity, source, and preserved attribution parameters.
- Both product pages show a custom cart drawer populated with selected bundle rows and gift rows before external checkout. The external checkout URL sends one variant ID and a quantity equal to the selected bundle count; it does not send separate line items for each color shown in the drawer.
- Both product pages include sticky buy bars, thumbnail/gallery behavior, video/reel behavior with autoplay/pause logic, sound toggles, bundle tier cards, gift unlock UI, reviews/comparison sections, and FAQ accordions.
- Current `Brush X` public route: `/products/miroooo-x`, source file `miroooo-x.html`, title `Brush X - Miroooo`, canonical `https://trymiroooo.com/products/miroooo-x`, visible H1 `Brush X - Pink`.
- Current `Brush X` offer details observed: primary visible price `GBP 59`, compare price `GBP 119`, product ID for Buudy checkout `1000000675113473`, color variants Pink `1000020700958562`, Grey `1000020700958564`, Silver `1000020700958563`, checkout source `miroooo`.
- Current `Brush X` bundle behavior observed: Buy 2 is the default/Most Popular tier; Buy 3 is Best Value. Gift unlock labels include Travel Case always, 2x Brush Heads at Buy 2, and Charging Dock at Buy 3.
- Current `Brush X` content notes: features mention 60+ days battery, free travel case, lightweight 51 grams, and routine elevation. Trust badges include `2-Year Warranty`, `60-Day Trial`, and `Free Tracked Shipping`, which is inconsistent with the wider site's 90-day home trial wording.
- Current `Brush X2` public route: `/products/miroooo-x2`, source file `miroooo-x2.html`, title `Brush X2 - Miroooo`, canonical `https://trymiroooo.com/products/miroooo-x2`, visible H1 `Brush X2 Grey`.
- Current `Brush X2` offer details observed: primary visible price `GBP 69`, compare price `GBP 139`, product ID for PlusBase checkout `1000000675072187`, effective variant IDs from `VARIANTS_DATA` Pink `1000020700182882`, Grey `1000020700182883`, Silver `1000020700182884`, checkout source `miroooo-x2`.
- Current `Brush X2` bundle behavior observed: Buy 2 is default/Most Popular; Buy 3 shows `GBP 199.00` against `GBP 477.00`. X2 color choice is driven through bundle-row swatches rather than a separate top selector.
- Current `Brush X2` content notes: features mention up to 90 days battery, 45-degree sweep sonic cleaning, and travel case value. Trust badges include `90-Day Trial`.
- Current product-page residues/risks to preserve unless asked to clean: raw product HTML still contains inherited Shopify/exported markup and some old/internal route references that product-shell rewrites at runtime; `miroooo-x.html` contains `1x luxe verpakking`; `miroooo-x.html` has `VALUE OF FREE GIFTS FOR TODAY ONLY`; X product page uses `60-Day Trial` while the site footer/policies use 90-day trial; X2 has an internal mismatch between `TIERS.variants` color labels and `VARIANTS_DATA`, though checkout uses `VARIANTS_DATA[firstColor].variantId`.

## Verification And Checks

- Commands run for this repository before memory write: `git status --short --branch`, sanitized `git remote -v`, `git fetch --all --prune`, `git rev-parse HEAD`, `git rev-parse --abbrev-ref --symbolic-full-name @{upstream}`, `git rev-list --left-right --count HEAD...@{upstream}`, `git log -1 --format=fuller`, `git log --oneline --decorate -8`, `git show --stat --oneline --name-status --summary HEAD`, `git diff --stat`, `git diff --cached --stat`, `git ls-files --others --exclude-standard`, `rg --files`, targeted `Get-Content` reads, and `npm run verify`.
- Verification result: `npm run verify` passed with `Miroooo verification passed: 19 required files and 11 storefront pages checked.`
- No browser screenshot, production check, Vercel deployment inspection, external Buudy checkout, payment, order, analytics, or ad-platform test was run because the user requested memory/context only and no code change.
- Files changed by this task: this new append-only `CONTEXT.md` only inside the repository, plus the workspace root `CONTEXT.md` pointer entry. No app/source/style/script/asset/config route file was changed.
- Git state before creating this context file: clean `## main...origin/main`.
- Expected Git state after creating this context file: `CONTEXT.md` untracked/modified as a documentation-only memory file; source remains untouched.
- Commit/push/deployment actions: none. No commit, push, branch, pull request, pull, merge, rebase, stash, reset, Vercel deployment, production promotion, domain/alias/environment change, checkout, payment, or order occurred.
- Mistakes/corrections during this memory task: no storefront implementation mistake occurred. The only scope-sensitive correction was treating the user's "strictly no change in code" as allowing required append-only context/memory documentation while leaving application code untouched.
- Remaining uncertainty/follow-up: before future edits, re-run state reconciliation because the user and collaborators often update GitHub/Antigravity. Also confirm whether future cleanup should address product-page residues such as X `60-Day Trial` versus site `90-day`, `TODAY ONLY` gift copy, `1x luxe verpakking`, inherited Shopify route residue, and X2 variant-label mismatch.

## 2026-08-30 07:58:00 +05:30 - Added Competitor Comparison Section below Reviews in Brush X2

- User request: Add comparison with competitors section below reviews section in X2 (`miroooo-x2.html`), matching exact layout, structure, and design from X1 (`miroooo-x.html`), updating data/image to X2 specs (90 Days battery, upright silver flagship image, price £69 with £99 strikethrough for today only), and keeping all competitor data/images intact across desktop and mobile.
- Changes made:
  - Added `#shopify-section-template--miroooo-comparison` directly below the reviews container and above Package Contents in `miroooo-x2.html`.
  - Configured Winner column for `Brush X2` with image `/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp`.
  - Set specs: 90 Days battery life, ultra-lightweight unibody, travel case, wall-mounted storage, dental care app, aluminium alloy body, 2x DuPont heads, whisper quiet (<50dB), risk-free home trial, free tracked delivery.
  - Set image to sit flush/colinear directly on the green bottom border line of the column.
  - Added "Wall-Mounted Storage" row (X2: ✓, Oral-B: ✗, Philips: ✗, Suri: ✓).
  - Added "Dental Care App" row (X2: ✓, Oral-B: ✗, Philips: ✗, Suri: ✗).
  - Fixed Suri 2.0 price to £85 (was £95) on desktop and mobile.
  - Set pricing: £69 with £99 strikethrough and "(for today only)".
  - Built static storefront with `npm run build` and ran `npm run verify` (25 files / 17 pages checked, 0 errors).

## 2026-08-30 08:35:00 +05:30 - Updated Brush X2 Warranty to 3 Years (Preserving 2 Years for X)

- User request: On X2 page if using 2 year warranty anywhere make it 3 (in reviews, FAQs, footer, badges, etc.) while keeping 2 year for X only.
- Changes made:
  - Updated hero trust badges strip on `miroooo-x2.html` to `3-Year Warranty`.
  - Updated FAQ 5 on `miroooo-x2.html` to `three-year limited warranty`.
  - Updated footer service strip on `miroooo-x2.html` to `Three-year warranty`.
  - Kept Brush X with 2-year warranty across all X-specific touchpoints (`miroooo-x.html`, comparison tables, and `shop.html`).
  - Synced `shop.html` and `warranty.html` to reflect 3 years for X2 and 2 years for X.
  - Built static storefront with `npm run build` and ran `npm run verify` (25 files / 17 pages checked, 0 errors).

## 2026-08-31 23:25:00 +05:30 - Renamed Brush X / Miroooo X to Brush X1

- User request: Change name of Brush X or Miroooo X wherever used on website (including reviews, comparisons, navigation, FAQs, titles, metadata, cart) to Brush X1. Keep all images, videos, layout, and Brush X2 / 2x Brush X2 Heads completely intact.
- Changes made:
  - Updated all user-facing names, alt text, JS data, schema, and titles in `miroooo-x.html` to `Brush X1`.
  - Updated comparison table headers, navigation dropdowns, mobile drawer, and FAQ text in `miroooo-x2.html` and `miroooo-x2-heads.html` to `Brush X1`.
  - Updated meta tags, hero shop buttons, feature copy, and finish cards in `index.html` and `shop.html` to `Brush X1`.
  - Updated cart configuration, empty state, and bundle items in `cart.html` and `assets/site.js` to `Brush X1`.
  - Updated reviews datasets and review generator in `assets_ref/miroooo-reviews.js` and `assets_ref/miroooo-x2-reviews.js` to `Brush X1`.
  - Updated API fallback name and email notification subject in `api/reviews/submit.js` to `Brush X1`.
  - Kept `Brush X2`, `Miroooo X2`, and `2x Brush X2 Heads` completely intact.
  - Preserved all routing URLs (`/products/miroooo-x`), physical file names (`miroooo-x.html`), media paths (`/assets_ref/x/...`), and PlusBase checkout parameters (`source: "miroooo"`).
  - Built static storefront with `npm run build` (`Miroooo verification passed: 25 required files and 17 storefront pages checked`).


