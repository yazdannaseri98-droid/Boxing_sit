#!/usr/bin/env node
"use strict";

// این اسکریپت موقع ساخت APK (توی GitHub Actions) اجرا می‌شه و چیزهایی که اپ الان از اینترنت می‌گیره رو داخل خود اپ می‌ذاره:
//   ۱) Tailwind: به‌جای کامپایل شدن توی گوشی (cdn.tailwindcss.com)، CSS آماده ساخته می‌شه → باز شدن سریع‌تر و سبک‌تر
//   ۲) React و ReactDOM: به‌جای unpkg.com، فایل‌هاش داخل اپ می‌ره
//   ۳) فونت‌ها (Vazirmatn، Oswald، Bebas Neue): به‌جای Google Fonts، داخل اپ می‌ره
// بعدش www/index.html طوری بازنویسی می‌شه که از همین فایل‌های داخلی استفاده کنه.
//
// ایمنی: هر بخش جدا ساخته و بررسی می‌شه. اگه بخشی شکست بخوره (نصب پکیج، ساخت CSS، بررسی نهایی...)
// همون بخش دست‌نخورده می‌مونه و اپ برای همون بخش مثل قبل از CDN استفاده می‌کنه. اسکریپت هیچ‌وقت ساخت APK رو خراب نمی‌کنه.

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const WWW = process.env.LOCALIZE_WWW || path.join(ROOT, "www");
const TOOLS = process.env.LOCALIZE_TOOLS || path.join(ROOT, ".localize-tools");

const PACKAGES = [
  "tailwindcss@3.4.17",
  "react@18.3.1",
  "react-dom@18.3.1",
  "@fontsource/vazirmatn",
  "@fontsource/oswald",
  "@fontsource/bebas-neue",
];

const FONTS = [
  { pkg: "@fontsource/vazirmatn", weights: [400, 500, 700, 900] },
  { pkg: "@fontsource/oswald", weights: [500, 600, 700] },
  { pkg: "@fontsource/bebas-neue", weights: [400] },
];

const log = (...args) => console.log("[localize]", ...args);

// ---------- بررسی CSS ساخته‌شده‌ی Tailwind ----------
// خروجی: لیست مشکل‌ها (خالی = سالمه)
function checkTailwindCss(css) {
  if (typeof css !== "string") return ["خروجی متن نیست"];
  const problems = [];
  if (css.length < 8000) problems.push("خیلی کوچیکه");
  for (const fragment of [".flex{display:flex}", ".rounded-2xl{", "box-sizing:border-box", ".text-\\[10px\\]{", ".gap-0\\.5{", ".min-w-0{"]) {
    if (!css.includes(fragment)) problems.push(`قطعه‌ی لازم پیدا نشد: ${fragment}`);
  }
  return problems;
}

// ---------- آماده‌سازی CSS فونت‌های fontsource ----------
// فقط زیرمجموعه‌های عربی/لاتین نگه داشته می‌شن، فقط woff2 (WebView اندروید پشتیبانی می‌کنه) و مسیرها به fonts/<نام>/ تغییر می‌کنن.
// خروجی: { css, files: [نام فایل‌هایی که باید کپی بشن] }
function transformFontFaceCss(css, dirName) {
  const blocks = [];
  const re = /(\/\*[^*]*\*\/)?\s*@font-face\s*\{[^}]*\}/g;
  let m;
  while ((m = re.exec(css))) blocks.push({ comment: m[1] || "", text: m[0].replace(/^\s*\/\*[^*]*\*\/\s*/, "") });

  const wanted = (b) => /(^|[^a-z])(arabic|latin)-\d+/i.test(b.comment) && !/latin-ext/i.test(b.comment);
  const anyComment = blocks.some((b) => b.comment);
  const selected = anyComment && blocks.some(wanted) ? blocks.filter(wanted) : blocks;

  const files = [];
  const out = [];
  for (const b of selected) {
    const urls = [...b.text.matchAll(/url\(\s*['"]?\.\/files\/([^)'"]+?\.woff2)['"]?\s*\)\s*format\(\s*['"]woff2['"]\s*\)/g)];
    if (urls.length === 0) continue;
    const name = urls[0][1];
    files.push(name);
    const fixed = b.text.replace(/src\s*:[^;]*;/, `src: url(fonts/${dirName}/${name}) format('woff2');`);
    out.push(fixed);
  }
  return { css: out.join("\n"), files };
}

// ---------- بازنویسی index.html ----------
const TAILWIND_TAG = /[ \t]*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/;
const REACT_TAG = /<script src="https:\/\/unpkg\.com\/react@18\/umd\/react\.production\.min\.js"><\/script>/;
const REACT_DOM_TAG = /<script src="https:\/\/unpkg\.com\/react-dom@18\/umd\/react-dom\.production\.min\.js"><\/script>/;

// فقط بخش‌هایی که خواسته شده (و تگ CDNشون توی فایل هست) عوض می‌شن. خروجی: { html, applied }
function rewriteIndexHtml(html, want) {
  let out = html;
  const applied = { tailwind: false, react: false, fonts: false };
  // اگه قبلاً داخلی شده باشه (مثلاً اسکریپت دوبار اجرا شد)، دوباره چیزی اضافه نمی‌کنیم
  if (want.tailwind) {
    if (out.includes('href="tailwind.css"')) applied.tailwind = true;
    else if (TAILWIND_TAG.test(out)) {
      out = out.replace(TAILWIND_TAG, '  <link rel="stylesheet" href="tailwind.css" />');
      applied.tailwind = true;
    }
  }
  if (want.react) {
    if (out.includes('src="vendor/react.production.min.js"')) applied.react = true;
    else if (REACT_TAG.test(out) && REACT_DOM_TAG.test(out)) {
      out = out.replace(REACT_TAG, '<script src="vendor/react.production.min.js"></script>');
      out = out.replace(REACT_DOM_TAG, '<script src="vendor/react-dom.production.min.js"></script>');
      applied.react = true;
    }
  }
  if (want.fonts) {
    if (out.includes('href="fonts.css"')) applied.fonts = true;
    else if (out.includes("</head>")) {
      out = out.replace("</head>", '  <link rel="stylesheet" href="fonts.css" />\n  <script>window.__LOCAL_FONTS__ = true;</script>\n</head>');
      applied.fonts = true;
    }
  }
  return { html: out, applied };
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// ---------- مراحل ----------
function installTools() {
  if (process.env.LOCALIZE_SKIP_INSTALL === "1") return;
  ensureDir(TOOLS);
  fs.writeFileSync(path.join(TOOLS, "package.json"), JSON.stringify({ name: "localize-tools", private: true, version: "1.0.0" }));
  execFileSync("npm", ["install", "--no-audit", "--no-fund", "--legacy-peer-deps", ...PACKAGES], { cwd: TOOLS, stdio: "inherit" });
}

function buildTailwind() {
  const pkgDir = path.join(TOOLS, "node_modules", "tailwindcss");
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const bin = typeof pkg.bin === "string" ? pkg.bin : pkg.bin.tailwindcss;
  const input = path.join(TOOLS, "tailwind-input.css");
  const output = path.join(TOOLS, "tailwind-output.css");
  fs.writeFileSync(input, "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n");
  execFileSync(process.execPath, [path.join(pkgDir, bin), "-i", input, "-o", output, "--content", path.join(WWW, "app.jsx"), "--minify"], {
    cwd: TOOLS,
    stdio: "inherit",
  });
  const css = fs.readFileSync(output, "utf8");
  const problems = checkTailwindCss(css);
  if (problems.length) throw new Error("CSS ساخته‌شده‌ی Tailwind سالم نیست: " + problems.join("؛ "));
  fs.writeFileSync(path.join(WWW, "tailwind.css"), css);
  log(`tailwind.css ساخته شد (${Math.round(css.length / 1024)}KB)`);
}

function vendorReact() {
  ensureDir(path.join(WWW, "vendor"));
  const files = [
    ["react", "umd/react.production.min.js", "react.production.min.js"],
    ["react-dom", "umd/react-dom.production.min.js", "react-dom.production.min.js"],
  ];
  for (const [pkg, from, to] of files) {
    const src = path.join(TOOLS, "node_modules", pkg, from);
    const body = fs.readFileSync(src, "utf8");
    if (body.length < 5000) throw new Error(`${pkg}: فایل خیلی کوچیکه`);
    fs.writeFileSync(path.join(WWW, "vendor", to), body);
  }
  log("React و ReactDOM داخل www/vendor کپی شدن");
}

function buildFonts() {
  const cssParts = [];
  let copied = 0;
  for (const { pkg, weights } of FONTS) {
    const dirName = pkg.split("/").pop();
    const pkgDir = path.join(TOOLS, "node_modules", pkg);
    for (const weight of weights) {
      const cssPath = path.join(pkgDir, `${weight}.css`);
      const { css, files } = transformFontFaceCss(fs.readFileSync(cssPath, "utf8"), dirName);
      if (!css || files.length === 0) throw new Error(`${pkg} ${weight}: فونتی پیدا نشد`);
      ensureDir(path.join(WWW, "fonts", dirName));
      for (const name of files) {
        fs.copyFileSync(path.join(pkgDir, "files", name), path.join(WWW, "fonts", dirName, name));
        copied++;
      }
      cssParts.push(css);
    }
  }
  if (cssParts.length === 0 || copied < 4) throw new Error("فونت‌ها کامل کپی نشدن");
  fs.writeFileSync(path.join(WWW, "fonts.css"), cssParts.join("\n") + "\n");
  log(`فونت‌ها آماده شدن (${copied} فایل)`);
}

function main() {
  const indexPath = path.join(WWW, "index.html");
  const want = { tailwind: false, react: false, fonts: false };

  try {
    installTools();
  } catch (err) {
    log("نصب ابزارها انجام نشد؛ همه‌چیز مثل قبل از CDN می‌مونه:", err.message);
    return;
  }

  for (const [name, fn] of [
    ["tailwind", buildTailwind],
    ["react", vendorReact],
    ["fonts", buildFonts],
  ]) {
    try {
      fn();
      want[name] = true;
    } catch (err) {
      log(`بخش ${name} انجام نشد (برای همین بخش از CDN استفاده می‌شه):`, err.message);
    }
  }

  const { html, applied } = rewriteIndexHtml(fs.readFileSync(indexPath, "utf8"), want);
  if (applied.tailwind || applied.react || applied.fonts) fs.writeFileSync(indexPath, html);

  // فایل منبع (app.jsx) موقع اجرا لازم نیست و فقط حجم APK رو بالا می‌بره
  try {
    const bundle = path.join(WWW, "app.js");
    if (fs.existsSync(bundle) && fs.statSync(bundle).size > 100000) fs.rmSync(path.join(WWW, "app.jsx"), { force: true });
  } catch {
    // مهم نیست
  }

  log(`نتیجه: tailwind=${applied.tailwind ? "داخلی" : "CDN"} react=${applied.react ? "داخلی" : "CDN"} fonts=${applied.fonts ? "داخلی" : "Google"}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    log("خطای پیش‌بینی‌نشده؛ هیچ تغییری اعمال نشد:", err.message);
  }
}

module.exports = { checkTailwindCss, transformFontFaceCss, rewriteIndexHtml };
