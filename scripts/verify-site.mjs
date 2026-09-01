import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "index.html", "shop.html", "miroooo-x.html", "miroooo-x2.html", "cart.html", "about.html", "about-us.html", "faq.html",
  "contact.html", "delivery-returns.html", "warranty.html", "order-tracking.html", "privacy.html",
  "terms.html", "return-policy.html", "shipping-policy.html", "refund-policy.html", "cookies-policy.html",
  "404.html", "assets/site.css", "assets/site.js", "assets/microsoft-ads.js", "assets/klaviyo.js", "vercel.json", "sitemap.xml",
  "robots.txt", "llms.txt"
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
  "/", "/shop", "/products/miroooo-x", "/products/miroooo-x2", "/products/miroooo-x2-heads", "/cart", "/about", "/about-us", "/faq", "/contact",
  "/delivery-returns", "/warranty", "/order-tracking", "/privacy", "/terms", "/return-policy",
  "/shipping-policy", "/refund-policy", "/cookies-policy", "/policies/privacy-policy",
  "/policies/return-policy", "/policies/shipping-policy", "/policies/refund-policy",
  "/policies/terms-of-service", "/policies/cookies-policy", "/pages/order-tracking",
  "/pages/contact-us"
]);
for (const file of newPages) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html lang="en-GB">/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes("/assets/site.css")) errors.push(`${file}: missing shared stylesheet`);
  if (!html.includes("/assets/site.js")) errors.push(`${file}: missing shared script`);
  if (/(?:go)brush|Miroooo\.nl|https?:\/\/miroooo\.com|hello@domain\.com/i.test(html)) errors.push(`${file}: inherited or placeholder brand reference`);
  if (file !== "404.html" && !html.includes("https://trymiroooo.com/")) errors.push(`${file}: missing trymiroooo.com canonical or metadata`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/assets/") || href === "/favicon.svg" || href === "/favicon.png" || href === "/site.webmanifest") continue;
    const pathname = new URL(href, "https://trymiroooo.com").pathname.replace(/\/$/, "") || "/";
    if (!internalRoutes.has(pathname)) errors.push(`${file}: unresolved internal link ${href}`);
  }
}

const homepage = await readFile(resolve(root, "index.html"), "utf8");
for (const marker of ["gb-hero", "gb-video-feature-section", "gb-story"]) {
  if (!homepage.includes(marker)) errors.push(`index.html: missing redesigned homepage marker ${marker}`);
}

const sharedScript = await readFile(resolve(root, "assets/site.js"), "utf8");
for (const marker of ["nav-link__flip", "mobile-panel__close", "service-strip", "data-drag-scroll"]) {
  if (!sharedScript.includes(marker)) errors.push(`assets/site.js: missing shared theme behaviour ${marker}`);
}

const microsoftAdsScript = await readFile(resolve(root, "assets/microsoft-ads.js"), "utf8");
for (const marker of ["211072489", "355060364", "shoppingUetq", "miroooo_attribution", "bat.bing.com/bat.js"]) {
  if (!microsoftAdsScript.includes(marker)) errors.push(`assets/microsoft-ads.js: missing ${marker}`);
}

const buildScript = await readFile(resolve(root, "scripts/build.mjs"), "utf8");
if (!buildScript.includes("/assets/microsoft-ads.js?v=20260901")) {
  errors.push("scripts/build.mjs: Microsoft Ads browser tracking is not injected into built pages");
}
if (!buildScript.includes("/assets/klaviyo.js?v=20260901")) {
  errors.push("scripts/build.mjs: Klaviyo browser tracking is not injected into built pages");
}

const klaviyoScript = await readFile(resolve(root, "assets/klaviyo.js"), "utf8");
for (const marker of ["TQtq2j", "Viewed Product", "Added to Cart", "Started Checkout", "data-miroooo-klaviyo"]) {
  if (!klaviyoScript.includes(marker)) errors.push(`assets/klaviyo.js: missing ${marker}`);
}
if (!klaviyoScript.includes("static.klaviyo.com/onsite/js/")) {
  errors.push("assets/klaviyo.js: missing current Klaviyo onsite loader");
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
  await access(resolve(root, "miroooo-x2-heads.html"));
  productPagesToCheck.push(["miroooo-x2-heads.html", "/products/miroooo-x2-heads"]);
} catch (_) {}

for (const [file, route] of productPagesToCheck) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html[^>]+lang="en-GB"/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes(`rel="canonical" href="https://trymiroooo.com${route}"`)) errors.push(`${file}: incorrect canonical`);
  if (!html.includes("/assets/product-shell.css") || !html.includes("/assets/product-shell.js")) errors.push(`${file}: missing shared product shell`);
  if (/(?:go)brush|Miroooo\.nl|https?:\/\/miroooo\.com|hello@domain\.com|lang="nl"/i.test(html)) errors.push(`${file}: inherited store contamination remains`);
  if (/€|\bEUR\b/.test(html)) errors.push(`${file}: non-GBP currency remains`);
  if (/delivery tomorrow|Order within[^<]*(?:\d{1,2}:\d{2})/i.test(html)) errors.push(`${file}: unsupported urgency or delivery promise remains`);
}

const config = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8"));
if (config.cleanUrls !== true) errors.push("vercel.json: cleanUrls must remain enabled");
if (!config.outputDirectory || config.outputDirectory !== "public") errors.push("vercel.json: outputDirectory must be public");

const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
for (const route of ["/shop", "/products/miroooo-x", "/products/miroooo-x2", "/products/miroooo-x2-heads", "/delivery-returns", "/privacy", "/terms", "/cart"]) {
  if (!sitemap.includes(`https://trymiroooo.com${route}`)) errors.push(`sitemap.xml: missing ${route}`);
}

if (errors.length) {
  console.error(`Miroooo verification failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Miroooo verification passed: ${required.length} required files and ${newPages.length} storefront pages checked.`);
