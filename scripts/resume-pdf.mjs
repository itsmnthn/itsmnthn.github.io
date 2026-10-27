// Prints the prerendered /resume page to public/itsmnthn-resume.pdf with headless Chrome.
// Usage: pnpm build && pnpm resume:pdf
import { execFile } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve(".output/public");
const output = resolve("public/itsmnthn-resume.pdf");
const chrome =
  process.env.CHROME_PATH ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(
    existsSync,
  );

if (!existsSync(join(root, "resume/index.html"))) {
  throw new Error("Missing .output/public/resume/index.html, run `pnpm build` first.");
}
if (!chrome) {
  throw new Error("Chrome not found, set CHROME_PATH.");
}

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };

const server = createServer((req, res) => {
  let file = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
});

server.listen(0, () => {
  const { port } = server.address();
  execFile(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${output}`,
      `http://localhost:${port}/resume/`,
    ],
    (error) => {
      server.close();
      if (error) throw error;
      console.log(`Wrote ${output}`);
    },
  );
});
