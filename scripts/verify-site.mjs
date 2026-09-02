import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "index.html", "shop.html", "miroooo-x.html", "miroooo-x2.html", "miroooo-x1-heads.html", "cart.html", "about.html", "about-us.html", "faq.html",
  "contact.html", "delivery-returns.html", "warranty.html", "order-tracking.html", "privacy.html",
  "terms.html", "return-policy.html", "shipping-policy.html", "refund-policy.html", "cookies-policy.html",
  "404.html", "assets/site.css", "assets/site.js", "assets/microsoft-ads.js", "assets/klaviyo.js", "vercel.json", "sitemap.xml",
  "robots.txt", "llms.txt", "smile-coach.html", "assets/smile-coach.css", "assets/smile-coach.js",
  "smile-coach.webmanifest", "smile-coach-sw.js",
  "dentalcare-quiz.html", "assets/dentalcare-quiz.css", "assets/dentalcare-quiz.js",
  "assets/guides.css", "llms-full.txt", "guides/index.html", "guides/sonic-vs-oscillating-electric-toothbrush.html",
  "guides/how-often-replace-electric-toothbrush-head.html", "guides/electric-toothbrush-travel-guide.html",
  "guides/how-to-use-two-minute-toothbrush-timer.html"
];
const errors = [];

for (const file of required) {
  try { await access(resolve(root, file)); } catch { errors.push(`Missing required file: ${file}`); }
}

const newPages = [
  "index.html", "shop.html", "cart.html", "about.html", "about-us.html", "faq.html", "contact.html", "delivery-returns.html",
  "warranty.html", "order-tracking.html", "privacy.html", "terms.html", "return-policy.html",
  "shipping-policy.html", "refund-policy.html", "cookies-policy.html", "404.html"
];
const internalRoutes = new Set([
  "/", "/shop", "/products/miroooo-x", "/products/miroooo-x2", "/products/miroooo-x1-heads", "/products/miroooo-x2-heads", "/products/miroooo-x-heads", "/cart", "/about", "/about-us", "/faq", "/contact",
  "/delivery-returns", "/warranty", "/order-tracking", "/privacy", "/terms", "/return-policy",
  "/shipping-policy", "/refund-policy", "/cookies-policy", "/policies/privacy-policy",
  "/policies/return-policy", "/policies/shipping-policy", "/policies/refund-policy",
  "/policies/terms-of-service", "/policies/cookies-policy", "/pages/order-tracking",
  "/pages/contact-us", "/smile-coach", "/dentalcare-quiz", "/quiz"
  , "/guides", "/guides/sonic-vs-oscillating-electric-toothbrush",
  "/guides/how-often-replace-electric-toothbrush-head", "/guides/electric-toothbrush-travel-guide",
  "/guides/how-to-use-two-minute-toothbrush-timer"
]);
for (const file of newPages) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html lang="en-GB">/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes("/assets/site.css")) errors.push(`${file}: missing shared stylesheet`);
  if (!html.includes("/assets/site.js")) errors.push(`${file}: missing shared script`);
  if (!html.includes("https://www.clarity.ms/tag/") || !html.includes("ybadbatujm")) errors.push(`${file}: missing Microsoft Clarity snippet (ybadbatujm)`);
  if (/(?:go)brush|Miroooo\.nl|https?:\/\/miroooo\.com|hello@domain\.com/i.test(html)) errors.push(`${file}: inherited or placeholder brand reference`);
  if (file !== "404.html" && !html.includes("https://www.trymiroooo.com/")) errors.push(`${file}: missing trymiroooo.com canonical or metadata`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/assets/") || href === "/favicon.svg" || href === "/favicon.png" || href === "/site.webmanifest") continue;
    const pathname = new URL(href, "https://www.trymiroooo.com").pathname.replace(/\/$/, "") || "/";
    if (!internalRoutes.has(pathname)) errors.push(`${file}: unresolved internal link ${href}`);
  }
}

const homepage = await readFile(resolve(root, "index.html"), "utf8");
for (const marker of ["gb-hero", "gb-video-feature-section", "gb-story", "gb-coach-promo", "/smile-coach"]) {
  if (!homepage.includes(marker)) errors.push(`index.html: missing redesigned homepage marker ${marker}`);
}
if (!homepage.includes("Miroooo Electric Toothbrushes | Brush X1 &amp; X2 UK")) {
  errors.push("index.html: homepage title does not target the electric-toothbrush category");
}
if (homepage.includes("/assets/app/miroooo-smile-coach-lifestyle.png")) {
  errors.push("index.html: oversized Smile Coach PNG remains in page content");
}

const sharedScript = await readFile(resolve(root, "assets/site.js"), "utf8");
for (const marker of ["nav-link__flip", "mobile-panel__close", "service-strip", "data-drag-scroll"]) {
  if (!sharedScript.includes(marker)) errors.push(`assets/site.js: missing shared theme behaviour ${marker}`);
}

const coachPage = await readFile(resolve(root, "smile-coach.html"), "utf8");
for (const marker of [
  '<html lang="en-GB">',
  'rel="canonical" href="https://www.trymiroooo.com/smile-coach"',
  '/smile-coach.webmanifest',
  '/assets/smile-coach.css',
  '/assets/smile-coach.js',
  '/assets_ref/x/gallery/Miroooo_x_Silver-1.webp',
  '/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-silver-upright-grip.webp',
  'Guided two-minute sessions',
  '28-DAY SMILE RESET'
]) {
  if (!coachPage.includes(marker)) errors.push(`smile-coach.html: missing ${marker}`);
}
if (!coachPage.includes('"@type":"WebApplication"')) errors.push("smile-coach.html: missing WebApplication schema");

const coachScript = await readFile(resolve(root, "assets/smile-coach.js"), "utf8");
for (const marker of ["miroooo_smile_coach_v1", "SESSION_SECONDS = 120", "PLAN_DAYS = 28", "localStorage", "beforeinstallprompt", "serviceWorker"]) {
  if (!coachScript.includes(marker)) errors.push(`assets/smile-coach.js: missing ${marker}`);
}
if (/bluetooth|connected brush|pressure sensor|AI score/i.test(`${coachPage}\n${coachScript}`)) {
  errors.push("Smile Coach: unsupported connected-brush or sensor claim remains");
}

const microsoftAdsScript = await readFile(resolve(root, "assets/microsoft-ads.js"), "utf8");
for (const marker of ["211072489", "355060364", "shoppingUetq", "miroooo_attribution", "bat.bing.com/bat.js"]) {
  if (!microsoftAdsScript.includes(marker)) errors.push(`assets/microsoft-ads.js: missing ${marker}`);
}

const buildScript = await readFile(resolve(root, "scripts/build.mjs"), "utf8");
if (!buildScript.includes("/assets/microsoft-ads.js?v=20260901")) {
  errors.push("scripts/build.mjs: Microsoft Ads browser tracking is not injected into built pages");
}
if (!buildScript.includes('cp(resolve(root, "guides"), resolve(output, "guides"), { recursive: true })')) {
  errors.push("scripts/build.mjs: guide directory is not copied to the build output");
}
if (!buildScript.includes("/assets/klaviyo.js?v=20260901")) {
  errors.push("scripts/build.mjs: Klaviyo browser tracking is not injected into built pages");
}
if (!buildScript.includes("ybadbatujm")) {
  errors.push("scripts/build.mjs: Microsoft Clarity snippet (ybadbatujm) is not checked or injected into built pages");
}
for (const marker of [
  "https://static.klaviyo.com/onsite/js/TQtq2j/klaviyo.js?company_id=TQtq2j",
  "window.klaviyo=new Proxy",
  "window._klOnsite=window._klOnsite||[]"
]) {
  if (!buildScript.includes(marker)) errors.push(`scripts/build.mjs: supplied Klaviyo snippet is missing ${marker}`);
}

const klaviyoScript = await readFile(resolve(root, "assets/klaviyo.js"), "utf8");
for (const marker of ["Viewed Product", "Added to Cart", "Started Checkout", "_klOnsite"]) {
  if (!klaviyoScript.includes(marker)) errors.push(`assets/klaviyo.js: missing ${marker}`);
}

for (const file of [
  "lib/shopbase-orders.js",
  "lib/microsoft-ads.js",
  "api/webhooks/shopbase/orders-paid.js",
  "api/cron/reconcile-microsoft-purchases.js"
]) {
  try { await access(resolve(root, file)); } catch { errors.push(`Missing conversion tracking file: ${file}`); }
}

const sharedStyles = await readFile(resolve(root, "assets/site.css"), "utf8");
for (const marker of [".site-header--overlay", ".gb-hero", ".gb-product-tile", ".service-strip"]) {
  if (!sharedStyles.includes(marker)) errors.push(`assets/site.css: missing shared theme style ${marker}`);
}

const productShellStyles = await readFile(resolve(root, "assets/product-shell.css"), "utf8");
if (/position:\s*sticky[\s\S]{0,140}backdrop-filter:\s*blur\(18px\)/.test(productShellStyles)) {
  errors.push("assets/product-shell.css: intrusive sticky blurred product header override remains");
}
if (/background:\s*var\(--miroooo-green\)/.test(productShellStyles)) {
  errors.push("assets/product-shell.css: green announcement override remains");
}

const productPagesToCheck = [["miroooo-x.html", "/products/miroooo-x"], ["miroooo-x2.html", "/products/miroooo-x2"]];
try {
  await access(resolve(root, "miroooo-x1-heads.html"));
  productPagesToCheck.push(["miroooo-x1-heads.html", "/products/miroooo-x1-heads"]);
} catch (_) {}
try {
  await access(resolve(root, "miroooo-x2-heads.html"));
  productPagesToCheck.push(["miroooo-x2-heads.html", "/products/miroooo-x2-heads"]);
} catch (_) {}

for (const [file, route] of productPagesToCheck) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html[^>]+lang="en-GB"/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes(`rel="canonical" href="https://www.trymiroooo.com${route}"`)) errors.push(`${file}: incorrect canonical`);
  if (!html.includes("/assets/product-shell.css") || !html.includes("/assets/product-shell.js")) errors.push(`${file}: missing shared product shell`);
  if (!html.includes("https://www.clarity.ms/tag/") || !html.includes("ybadbatujm")) errors.push(`${file}: missing Microsoft Clarity snippet (ybadbatujm)`);
  if (/(?:go)brush|Miroooo\.nl|https?:\/\/miroooo\.com|hello@domain\.com|lang="nl"/i.test(html)) errors.push(`${file}: inherited store contamination remains`);
  if (/€|\bEUR\b/.test(html)) errors.push(`${file}: non-GBP currency remains`);
  if (/delivery tomorrow|Order within[^<]*(?:\d{1,2}:\d{2})/i.test(html)) errors.push(`${file}: unsupported urgency or delivery promise remains`);
  if (!/loading="lazy"/.test(html)) errors.push(`${file}: product gallery images are not lazy-loaded`);
}

const x1Page = await readFile(resolve(root, "miroooo-x.html"), "utf8");
if (x1Page.includes('preload="auto"')) errors.push("miroooo-x.html: non-critical videos still use preload=auto");
for (const [file, expectedTitle] of [
  ["miroooo-x.html", "Miroooo Brush X1 Sonic Electric Toothbrush"],
  ["miroooo-x2.html", "Miroooo Brush X2 Sonic Electric Toothbrush"],
  ["miroooo-x1-heads.html", "Miroooo X1 Replacement Brush Heads"],
  ["miroooo-x2-heads.html", "Miroooo X2 Replacement Brush Heads"]
]) {
  try {
    const html = await readFile(resolve(root, file), "utf8");
    if (!html.includes(expectedTitle)) errors.push(`${file}: missing descriptive search title or product name`);
  } catch (_) {}
}

const x2Page = await readFile(resolve(root, "miroooo-x2.html"), "utf8");
if (!x2Page.includes('id="main-price-display"') || !x2Page.includes('>£69</span>') || !x2Page.includes('"price":"69.00"')) {
  errors.push("miroooo-x2.html: visible X2 price and Product schema must agree at GBP 69");
}

const dentalCareQuiz = await readFile(resolve(root, "dentalcare-quiz.html"), "utf8");
const dentalCareQuizScript = await readFile(resolve(root, "assets/dentalcare-quiz.js"), "utf8");
for (const marker of [
  '<title>Dental Care Quiz | Find Your Toothbrush Routine | Miroooo</title>',
  'rel="canonical" href="https://www.trymiroooo.com/dentalcare-quiz"',
  '"@type": "WebApplication"',
  'quiz-health-note',
  'not a dental diagnosis'
]) {
  if (!dentalCareQuiz.includes(marker)) errors.push(`dentalcare-quiz.html: missing ${marker}`);
}
if (/Based on your diagnostic|Oral Health Diagnostic|Prescribed 28-Day|\d{2,3}% (?:Optimal|Comprehensive) Match|zero bleeding|prevent bleeding|tartar removal|clinic-grade sheen/i.test(`${dentalCareQuiz}\n${dentalCareQuizScript}`)) {
  errors.push("Dental Care Quiz: unsupported diagnostic, prescription, outcome, or fake-precision claim remains");
}

const guidePages = [
  ["guides/index.html", "/guides", "CollectionPage"],
  ["guides/sonic-vs-oscillating-electric-toothbrush.html", "/guides/sonic-vs-oscillating-electric-toothbrush", "Article"],
  ["guides/how-often-replace-electric-toothbrush-head.html", "/guides/how-often-replace-electric-toothbrush-head", "Article"],
  ["guides/electric-toothbrush-travel-guide.html", "/guides/electric-toothbrush-travel-guide", "Article"],
  ["guides/how-to-use-two-minute-toothbrush-timer.html", "/guides/how-to-use-two-minute-toothbrush-timer", "Article"]
];
for (const [file, route, schemaType] of guidePages) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html lang="en-GB">/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes(`rel="canonical" href="https://www.trymiroooo.com${route}"`)) errors.push(`${file}: incorrect canonical`);
  if (!html.includes("/assets/site.css") || !html.includes("/assets/guides.css") || !html.includes("/assets/site.js")) errors.push(`${file}: missing guide assets`);
  if (!html.includes(`\"@type\":\"${schemaType}\"`)) errors.push(`${file}: missing ${schemaType} schema`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/assets/") || href === "/favicon.png") continue;
    const pathname = new URL(href, "https://www.trymiroooo.com").pathname.replace(/\/$/, "") || "/";
    if (!internalRoutes.has(pathname)) errors.push(`${file}: unresolved internal link ${href}`);
  }
  if (schemaType === "Article" && (!html.includes("guide-sources") || !/https:\/\/(?:www\.)?(?:nhs\.uk|ada\.org|cochrane\.org|caa\.co\.uk|iata\.org)/.test(html))) {
    errors.push(`${file}: missing visible authoritative sources`);
  }
}

for (const file of ["index.html", "miroooo-x.html", "miroooo-x2.html", "miroooo-x1-heads.html", "miroooo-x2-heads.html", "smile-coach.html", "dentalcare-quiz.html", ...guidePages.map(([file]) => file)]) {
  const html = await readFile(resolve(root, file), "utf8");
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch (error) { errors.push(`${file}: malformed JSON-LD (${error.message})`); }
  }
  if (html.includes("https://trymiroooo.com")) errors.push(`${file}: non-www canonical host remains`);
}

const cartPage = await readFile(resolve(root, "cart.html"), "utf8");
if (!cartPage.includes('<meta name="robots" content="noindex,follow">')) errors.push("cart.html: cart must be noindex,follow");

const config = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8"));
if (config.cleanUrls !== true) errors.push("vercel.json: cleanUrls must remain enabled");
if (!config.outputDirectory || config.outputDirectory !== "public") errors.push("vercel.json: outputDirectory must be public");
if (!config.redirects?.some((rule) => rule.source === "/about" && rule.destination === "/about-us" && rule.permanent === true)) {
  errors.push("vercel.json: /about must permanently redirect to /about-us");
}

const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
for (const route of ["/shop", "/products/miroooo-x", "/products/miroooo-x2", "/products/miroooo-x1-heads", "/products/miroooo-x2-heads", "/dentalcare-quiz", "/smile-coach", "/guides", "/guides/sonic-vs-oscillating-electric-toothbrush", "/guides/how-often-replace-electric-toothbrush-head", "/guides/electric-toothbrush-travel-guide", "/guides/how-to-use-two-minute-toothbrush-timer", "/delivery-returns", "/privacy", "/terms"]) {
  if (!sitemap.includes(`<loc>https://www.trymiroooo.com${route}</loc>`)) errors.push(`sitemap.xml: missing ${route}`);
}
if (sitemap.includes("https://trymiroooo.com") || /<loc>https:\/\/www\.trymiroooo\.com\/(?:cart|about)<\/loc>/.test(sitemap)) errors.push("sitemap.xml: redirecting, non-canonical or noindex URL remains");

const robots = await readFile(resolve(root, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://www.trymiroooo.com/sitemap.xml")) errors.push("robots.txt: sitemap host does not match the canonical host");
const llms = await readFile(resolve(root, "llms.txt"), "utf8");
for (const marker of ["> Miroooo", "/smile-coach", "/guides", "/llms-full.txt"]) {
  if (!llms.includes(marker)) errors.push(`llms.txt: missing ${marker}`);
}

if (errors.length) {
  console.error(`Miroooo verification failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Miroooo verification passed: ${required.length} required files and ${newPages.length} storefront pages checked.`);
