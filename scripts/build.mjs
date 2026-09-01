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

await cp(resolve(root, "miroooo-x.html"), resolve(output, "products", "miroooo-x.html"));
await cp(resolve(root, "miroooo-x2.html"), resolve(output, "products", "miroooo-x2.html"));
try {
  await cp(resolve(root, "miroooo-x2-heads.html"), resolve(output, "products", "miroooo-x2-heads.html"));
} catch (_) {}

const microsoftTrackingScript = '<script src="/assets/microsoft-ads.js?v=20260901" defer></script>';
const outputHtmlFiles = [
  ...(await readdir(output)).filter((name) => name.endsWith(".html")).map((name) => resolve(output, name)),
  ...(await readdir(resolve(output, "products"))).filter((name) => name.endsWith(".html")).map((name) => resolve(output, "products", name))
];

for (const htmlFile of outputHtmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  if (!html.includes("/assets/microsoft-ads.js")) {
    await writeFile(htmlFile, html.replace("</body>", `  ${microsoftTrackingScript}\n</body>`), "utf8");
  }
}

for (const directory of ["assets", "assets_ref", "gallery_orig"]) {
  await cp(resolve(root, directory), resolve(output, directory), { recursive: true });
}

console.log("Miroooo static storefront built in public/.");
