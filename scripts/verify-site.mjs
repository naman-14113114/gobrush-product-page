import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "index.html", "shop.html", "miroooo-x.html", "miroooo-x2.html", "about.html", "faq.html",
  "contact.html", "delivery-returns.html", "warranty.html", "order-tracking.html", "privacy.html",
  "terms.html", "404.html", "assets/site.css", "assets/site.js", "vercel.json", "sitemap.xml",
  "robots.txt", "llms.txt"
];
const errors = [];

for (const file of required) {
  try { await access(resolve(root, file)); } catch { errors.push(`Missing required file: ${file}`); }
}

const newPages = ["index.html", "shop.html", "about.html", "faq.html", "contact.html", "delivery-returns.html", "warranty.html", "order-tracking.html", "privacy.html", "terms.html", "404.html"];
const internalRoutes = new Set([
  "/", "/shop", "/products/miroooo-x", "/products/miroooo-x2", "/about", "/faq", "/contact",
  "/delivery-returns", "/warranty", "/order-tracking", "/privacy", "/terms"
]);
for (const file of newPages) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html lang="en-GB">/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes("/assets/site.css")) errors.push(`${file}: missing shared stylesheet`);
  if (!html.includes("/assets/site.js")) errors.push(`${file}: missing shared script`);
  if (/(?:go)brush|Miroooo\.nl|miroooo\.com|hello@domain\.com/i.test(html)) errors.push(`${file}: inherited or placeholder brand reference`);
  if (file !== "404.html" && !html.includes("https://miroooo.co/")) errors.push(`${file}: missing miroooo.co canonical or metadata`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/assets/") || href === "/favicon.svg" || href === "/site.webmanifest") continue;
    const pathname = new URL(href, "https://miroooo.co").pathname.replace(/\/$/, "") || "/";
    if (!internalRoutes.has(pathname)) errors.push(`${file}: unresolved internal link ${href}`);
  }
}

for (const [file, route] of [["miroooo-x.html", "/products/miroooo-x"], ["miroooo-x2.html", "/products/miroooo-x2"]]) {
  const html = await readFile(resolve(root, file), "utf8");
  if (!/<html[^>]+lang="en-GB"/.test(html)) errors.push(`${file}: missing en-GB language`);
  if (!html.includes(`rel="canonical" href="https://miroooo.co${route}"`)) errors.push(`${file}: incorrect canonical`);
  if (!html.includes("/assets/product-shell.css") || !html.includes("/assets/product-shell.js")) errors.push(`${file}: missing shared product shell`);
  if (/(?:go)brush|Miroooo\.nl|miroooo\.com|hello@domain\.com|lang="nl"/i.test(html)) errors.push(`${file}: inherited store contamination remains`);
  if (/€|\bEUR\b/.test(html)) errors.push(`${file}: non-GBP currency remains`);
  if (/delivery tomorrow|Order within[^<]*(?:\d{1,2}:\d{2})/i.test(html)) errors.push(`${file}: unsupported urgency or delivery promise remains`);
}

const config = JSON.parse(await readFile(resolve(root, "vercel.json"), "utf8"));
const routes = new Set((config.rewrites || []).map((route) => route.source));
for (const route of ["/products/miroooo-x", "/products/miroooo-x2"]) {
  if (!routes.has(route)) errors.push(`vercel.json: missing product rewrite ${route}`);
}

const sitemap = await readFile(resolve(root, "sitemap.xml"), "utf8");
for (const route of ["/shop", "/products/miroooo-x", "/products/miroooo-x2", "/delivery-returns", "/privacy", "/terms"]) {
  if (!sitemap.includes(`https://miroooo.co${route}`)) errors.push(`sitemap.xml: missing ${route}`);
}

if (errors.length) {
  console.error(`Miroooo verification failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Miroooo verification passed: ${required.length} required files and ${newPages.length} storefront pages checked.`);
