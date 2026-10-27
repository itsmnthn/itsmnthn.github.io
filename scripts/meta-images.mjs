// Renders the 1200x630 share images for /resume, /production-logs and every log into public/meta with headless Chrome.
// Not wired into any page: share images come from nuxt-og-image (app/components/OgImage), this is kept as a fallback.
// Usage: pnpm meta:images
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

const publicDir = resolve("public");
const logsDir = resolve("content/production-logs");
const outputDir = join(publicDir, "meta");
const chrome =
  process.env.CHROME_PATH ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(
    existsSync,
  );

if (!chrome) {
  throw new Error("Chrome not found, set CHROME_PATH.");
}

// the log card accents, only the uncommented part of the COLORS list
const colors = readFileSync(resolve("app/utils/colors.ts"), "utf8")
  .split("export const COLORS = [")[1]
  .split("/**")[0]
  .match(/#[0-9a-f]{6}/gi);

// same rule as app/utils/constants.ts
const now = new Date();
const yearsOfExperience = now.getFullYear() - 2017;

const asset = (name) => pathToFileURL(join(publicDir, name)).href;

const escape = (value) =>
  String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const hexToRgb = (hex) => [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16));

const hexToHue = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((value) => value / 255);
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  if (delta === 0) return 0;
  const hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return Math.round((hue * 60 + 360) % 360);
};

// same as getLogAccent in app/utils/production-logs.ts
const accentFor = (number) => colors[(Math.max(number, 1) - 1) % colors.length];

// frontmatter here is flat strings, booleans and one level of lists, which is all this needs
const readPost = (file) => {
  const [, frontmatter = ""] = readFileSync(join(logsDir, file), "utf8").split(/^---$/m);
  const data = {};
  let list;
  for (const line of frontmatter.split("\n")) {
    const item = line.match(/^ {2}- (.*)$/);
    if (item && list) {
      list.push(item[1].replace(/^"|"$/g, ""));
      continue;
    }
    const field = line.match(/^(\w+):\s*(.*)$/);
    if (!field) continue;
    list = undefined;
    const [, key, value] = field;
    if (value === "") data[key] = list = [];
    else data[key] = value === "true" ? true : value === "false" ? false : value.replace(/^"|"$/g, "");
  }
  // `1.who-am-i.md` is log 01 at /production-logs/who-am-i
  const [, number = "0", slug] = basename(file, ".md").match(/^(\d+)\.(.+)$/) ?? [null, "0", basename(file, ".md")];
  return { slug, number: Number(number), ...data };
};

const posts = readdirSync(logsDir)
  .filter((file) => file.endsWith(".md"))
  .map(readPost)
  .filter((post) => post.draft !== true && post.published !== false)
  .sort((a, b) => a.number - b.number)
  .map((post) => ({ ...post, accent: accentFor(post.number), number: String(post.number).padStart(2, "0") }));

const page = (body) => `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Pinyon+Script&family=Sora:wght@600;700;800&display=block" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: #e1e1df; font-family: Manrope, sans-serif; color: #18181b; padding: 24px; }
  .panel { position: relative; height: 100%; border-radius: 56px; border: 2px solid #ebebea; background: #f4f4f3; overflow: hidden; display: flex; }
  .copy { position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; padding: 56px 0 52px 64px; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .avatar { width: 64px; height: 64px; border-radius: 999px; border: 3px solid #fff; box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12); }
  .brand b { display: block; font-family: Sora, sans-serif; font-size: 22px; font-weight: 700; }
  .brand span { display: block; margin-top: 2px; font-size: 18px; color: #71717a; }
  h1 { font-family: Sora, sans-serif; font-weight: 800; letter-spacing: -0.03em; line-height: 1.06; color: #18181b; text-wrap: balance; }
  .lede { margin-top: 20px; font-size: 24px; line-height: 1.45; color: #52525b; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
  .footer { margin-top: auto; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 19px; font-weight: 600; color: #52525b; }
  .chip { border-radius: 999px; background: #fff; padding: 7px 16px; font-size: 17px; }
  .dark { background: #18181b; color: #fff; }
  .note { position: absolute; width: 300px; border-radius: 34px; border: 1px solid #f4f4f5; background: #fcfcfd; padding: 70px 18px 18px; box-shadow: 0 26px 50px rgba(15, 23, 42, 0.16); }
  .note .pin { position: absolute; left: 50%; top: -6px; width: 64px; height: 64px; transform: translateX(-50%); }
  .note .inner { border-radius: 22px; padding: 20px; min-height: 200px; }
  .note .number { font-family: "Pinyon Script", cursive; font-size: 44px; line-height: 0.92; }
  .note .title { margin-top: 10px; font-family: Sora, sans-serif; font-weight: 700; font-size: 22px; line-height: 1.2; letter-spacing: -0.02em; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4; overflow: hidden; }
  .note .meta { margin-top: 14px; font-size: 15px; color: #52525b; }
  .line { height: 12px; border-radius: 999px; background: #e4e4e7; margin-top: 12px; }
</style>
</head>
<body><div class="panel">${body}</div></body>
</html>`;

const brand = (subtitle) => `
  <div class="brand">
    <img class="avatar" src="${asset("itsmnthn-avatar-224.webp")}" alt="" />
    <div><b>itsmnthn.dev</b><span>${escape(subtitle)}</span></div>
  </div>`;

// the pinned note from the logs list, see app/components/production-log/PinCard.vue
const note = ({ accent, style, content }) => {
  const [r, g, b] = hexToRgb(accent);
  return `
  <div class="note" style="${style}">
    <img class="pin" src="${asset("push-pin.png")}" alt="" style="filter: hue-rotate(${hexToHue(accent)}deg) saturate(1.16) drop-shadow(0 6px 6px rgba(0,0,0,.24)) drop-shadow(0 0 11px rgba(${r},${g},${b},.55))" />
    <div style="border-radius: 23px; padding: 1.5px; background: linear-gradient(180deg, rgba(${r},${g},${b},.22), rgba(255,255,255,.98))">
      <div class="inner" style="background: linear-gradient(180deg, rgba(${r},${g},${b},.09), rgba(${r},${g},${b},.06) 52%, rgba(${r},${g},${b},.015)), #fcfcfd">
        ${content}
      </div>
    </div>
  </div>`;
};

const postNote = (post, style) =>
  note({
    accent: post.accent,
    style,
    content: `
      <p class="number" style="color: ${post.accent}">${post.number}</p>
      <p class="title">${escape(post.title)}</p>
      <p class="meta">${formatDate(post.date)}</p>`,
  });

const postImage = (post) =>
  page(`
  <div class="copy" style="padding-right: 40px">
    ${brand("The Production Log")}
    <h1 style="margin-top: 44px; font-size: ${post.title.length > 40 ? 54 : 62}px">${escape(post.title)}</h1>
    <p class="lede">${escape(post.description)}</p>
    <div class="footer">
      <span>${formatDate(post.date)}</span>
      ${(post.categories ?? []).map((tag) => `<span class="chip">${escape(tag)}</span>`).join("")}
    </div>
  </div>
  <div style="position: relative; width: 340px; flex-shrink: 0">
    ${note({
      accent: post.accent,
      style: "top: 140px; left: 20px; width: 224px; transform: rotate(6deg)",
      content: `
        <p class="number" style="color: ${post.accent}; font-size: 128px; height: 160px; display: flex; align-items: center; justify-content: center">${post.number}</p>`,
    })}
  </div>`);

const logsImage = () => {
  const latest = posts.slice(-2);
  const spots = [
    "top: 70px; right: 290px; width: 260px; transform: rotate(-5deg)",
    "top: 196px; right: 44px; width: 260px; transform: rotate(4deg)",
  ];
  return page(`
  <div class="copy" style="max-width: 600px">
    ${brand("Manthankumar Satani")}
    <h1 style="margin-top: 56px; font-size: 64px">The Production<br />Log</h1>
    <p class="lede">Notes from things I've actually built and shipped.</p>
    <div class="footer"><span class="chip dark">Read the logs &nbsp;↗</span></div>
  </div>
  ${latest.map((post, index) => postNote(post, spots[index])).join("")}`);
};

const resumeImage = () => {
  const logos = [
    ["moar-market-dark.svg", 24],
    ["hubble-exchange-dark.svg", 34],
    ["defidollar-dark.svg", 22],
    ["polygon-technology-dark.svg", 24],
  ];
  const sheetLines = [92, 70, 84, 60, 0, 88, 76, 64, 0, 80, 58];
  return page(`
  <div class="copy" style="max-width: 690px">
    ${brand("Resume")}
    <h1 style="margin-top: 44px; font-size: 60px">Manthankumar Satani</h1>
    <p class="lede" style="font-size: 27px; color: #3f3f46; font-weight: 600">Full-Stack Engineer &amp; Product Builder</p>
    <p class="lede" style="margin-top: 8px">${yearsOfExperience}+ years shipping DeFi, SaaS and developer tools.</p>
    <div class="footer" style="flex-wrap: nowrap; gap: 28px">
      ${logos.map(([file, height]) => `<img src="${asset(file)}" alt="" style="height: ${height}px; opacity: .8" />`).join("")}
    </div>
  </div>
  ${note({
    accent: "#5956e9",
    style: "top: 64px; right: 64px; width: 330px; transform: rotate(4deg)",
    content: `
      <p class="title" style="font-size: 24px">itsmnthn</p>
      <p class="meta" style="margin-top: 4px">Résumé · ${now.getFullYear()}</p>
      ${sheetLines.map((width) => (width ? `<div class="line" style="width: ${width}%"></div>` : `<div style="height: 14px"></div>`)).join("")}`,
  })}`);
};

const images = [
  ["resume.png", resumeImage()],
  ["production-logs.png", logsImage()],
  ...posts.map((post) => [`production-logs/${post.slug}.png`, postImage(post)]),
];

const workDir = mkdtempSync(join(tmpdir(), "meta-images-"));
mkdirSync(join(outputDir, "production-logs"), { recursive: true });

try {
  for (const [name, html] of images) {
    const htmlFile = join(workDir, `${name.replace("/", "-")}.html`);
    writeFileSync(htmlFile, html);
    await run(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=5000",
      `--screenshot=${join(outputDir, name)}`,
      pathToFileURL(htmlFile).href,
    ]);
    console.log(`public/meta/${name}`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
