import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "public");

if (!output.startsWith(`${root}\\`) && !output.startsWith(`${root}/`)) {
  throw new Error("Refusing to build outside the repository.");
}

const verification = spawnSync(process.execPath, [resolve(root, "scripts/verify-site.mjs")], {
  cwd: root,
  encoding: "utf8",
  stdio: "inherit"
});
if (verification.status !== 0) process.exit(verification.status || 1);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await mkdir(resolve(output, "products"), { recursive: true });

const rootEntries = await readdir(root, { withFileTypes: true });
for (const entry of rootEntries) {
  if (entry.isFile() && /\.(html|xml|txt|svg|webmanifest|png|ico|webp|json)$/.test(entry.name)) {
    await cp(resolve(root, entry.name), resolve(output, entry.name));
  }
}

await cp(resolve(root, "smile-coach-sw.js"), resolve(output, "smile-coach-sw.js"));

await cp(resolve(root, "miroooo-x.html"), resolve(output, "products", "miroooo-x.html"));
await cp(resolve(root, "miroooo-x2.html"), resolve(output, "products", "miroooo-x2.html"));
try {
  await cp(resolve(root, "miroooo-x2-heads.html"), resolve(output, "products", "miroooo-x2-heads.html"));
} catch (_) {}

const microsoftTrackingScript = '<script src="/assets/microsoft-ads.js?v=20260901" defer></script>';
const klaviyoOnsiteSnippet = `<script async type='text/javascript' src='https://static.klaviyo.com/onsite/js/TQtq2j/klaviyo.js?company_id=TQtq2j'></script>
  <script type="text/javascript">
  //Initialize Klaviyo object on page load
  !function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
  </script>`;
const klaviyoTrackingScript = '<script src="/assets/klaviyo.js?v=20260901" defer></script>';
const claritySnippet = `  <!-- Microsoft Clarity -->
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ybadbatujm");
  </script>`;
const outputHtmlFiles = [
  ...(await readdir(output)).filter((name) => name.endsWith(".html")).map((name) => resolve(output, name)),
  ...(await readdir(resolve(output, "products"))).filter((name) => name.endsWith(".html")).map((name) => resolve(output, "products", name))
];

for (const htmlFile of outputHtmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  let instrumentedHtml = html;
  if (!instrumentedHtml.includes("https://www.clarity.ms/tag/") || !instrumentedHtml.includes("ybadbatujm")) {
    instrumentedHtml = instrumentedHtml.replace("</head>", `${claritySnippet}\n</head>`);
  }
  if (!instrumentedHtml.includes("/assets/microsoft-ads.js")) {
    instrumentedHtml = instrumentedHtml.replace("</body>", `  ${microsoftTrackingScript}\n</body>`);
  }
  if (!instrumentedHtml.includes("static.klaviyo.com/onsite/js/TQtq2j/klaviyo.js?company_id=TQtq2j")) {
    instrumentedHtml = instrumentedHtml.replace("</body>", `  ${klaviyoOnsiteSnippet}\n</body>`);
  }
  if (!instrumentedHtml.includes("/assets/klaviyo.js")) {
    instrumentedHtml = instrumentedHtml.replace("</body>", `  ${klaviyoTrackingScript}\n</body>`);
  }
  if (instrumentedHtml !== html) {
    await writeFile(htmlFile, instrumentedHtml, "utf8");
  }
}

for (const directory of ["assets", "assets_ref", "gallery_orig"]) {
  await cp(resolve(root, directory), resolve(output, directory), { recursive: true });
}

console.log("Miroooo static storefront built in public/.");
