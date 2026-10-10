import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright";
const requireFromApp = createRequire(
  new URL("../packages/app/package.json", import.meta.url),
);
const { preview } = await import(
  pathToFileURL(requireFromApp.resolve("vite")).href
);

const root = fileURLToPath(new URL("../", import.meta.url));
const app = fileURLToPath(new URL("../packages/app/", import.meta.url));
const output = fileURLToPath(
  new URL("../packages/app/public/og-image.png", import.meta.url),
);
const build = spawnSync("npm", ["run", "build"], {
  cwd: root,
  stdio: "inherit",
});
if (build.error) throw build.error;
if (build.status !== 0) throw new Error("App build failed");

const server = await preview({
  root: app,
  preview: { host: "127.0.0.1", port: 4175, open: false },
});
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(server.resolvedUrls.local[0], { waitUntil: "networkidle" });
  await page.waitForFunction(() =>
    Boolean(document.querySelector("#markdown-output")?.value),
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output, animations: "disabled" });
  console.log(`Captured app screenshot: ${output} (1200 × 630)`);
} finally {
  await browser?.close();
  await new Promise((resolve, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : resolve())),
  );
}
