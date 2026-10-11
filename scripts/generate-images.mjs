/**
 * Generates social sharing images (1200×630) for the homepage and every
 * question, plus PNG application icons and favicon.ico from favicon.svg.
 *
 * Run locally with `npm run images`; the output is committed so Netlify does
 * not need a browser at build time. Re-run whenever a question's wording or
 * accent changes.
 */
import { chromium } from 'playwright';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = resolve(root, 'src/content/questions');
const outDir = resolve(root, 'public/og');
mkdirSync(outDir, { recursive: true });

const pad = (n) => String(n).padStart(2, '0');

// Minimal frontmatter reader: enough for the scalar fields we need.
function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
  }
  return out;
}

const questions = readdirSync(contentDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(readFileSync(resolve(contentDir, f), 'utf8')) }))
  .filter((q) => q.draft !== 'true')
  .sort((a, b) => Number(a.number) - Number(b.number));

const fontCss = `
  @font-face { font-family: 'Fraunces'; font-weight: 100 900; src: url('file://${root}/public/fonts/fraunces.woff2') format('woff2-variations'); }
  @font-face { font-family: 'Fraunces'; font-style: italic; font-weight: 100 900; src: url('file://${root}/public/fonts/fraunces-italic.woff2') format('woff2-variations'); }
  @font-face { font-family: 'Inter'; font-weight: 100 900; src: url('file://${root}/public/fonts/inter.woff2') format('woff2-variations'); }
`;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const base = `${fontCss}
  html,body{margin:0;width:1200px;height:630px;background:#f5f3ee;color:#141311;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
  .meta{font-size:22px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:#6b675f}
  .meta b{color:#7f1d1d}
`;

// Homepage image: the masthead.
function masthead() {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
    .c{position:relative;width:1200px;height:630px;padding:64px 90px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between}
    .row{display:flex;justify-content:space-between;padding-bottom:18px;border-bottom:2px solid #141311;font-size:19px;white-space:nowrap}
    .title{font-family:Fraunces,serif;font-style:italic;font-weight:400;font-size:168px;line-height:.95;letter-spacing:-.035em;text-align:center;margin:0}
    .tag{font-family:Fraunces,serif;font-style:italic;font-size:34px;text-align:center;color:#3d3a35;margin-top:10px}
    .nav{display:flex;justify-content:center;gap:0 34px;padding-top:18px;border-top:2px solid #141311}
  </style></head><body><div class="c">
    <div class="row meta"><span>Vol. I · Five questions</span><span>First edition · October 2026</span><span>By Rich Allen</span></div>
    <div><div class="title">Better questions</div><div class="tag">Better questions for faster flow.</div></div>
    <div class="nav meta">${questions.map((q) => `<span><b>${pad(q.number)}</b> ${esc(q.category)}</span>`).join('')}</div>
  </div></body></html>`;
}

// Question image: the card object on the page.
function card(q) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
    .c{position:relative;width:1200px;height:630px;box-sizing:border-box;display:grid;grid-template-columns:1fr auto;align-items:center;gap:70px;padding:60px 90px}
    .card{width:560px;height:362px;background:#fff;border-radius:26px;box-shadow:0 2px 2px rgba(20,19,17,.04),0 30px 60px -30px rgba(20,19,17,.35);display:grid;grid-template-rows:auto 1fr auto;padding:34px 40px;box-sizing:border-box;text-align:center}
    .card .meta{display:flex;justify-content:space-between;font-size:16px}
    .card .q{align-self:center;font-weight:800;font-size:40px;line-height:1.1;text-transform:uppercase;color:#7f1d1d;letter-spacing:-.005em;text-wrap:balance;max-width:22ch;margin:0 auto}
    .card .brand{font-size:14px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:#141311}
    .side{display:flex;flex-direction:column;gap:22px}
    .side .title{font-family:Fraunces,serif;font-style:italic;font-size:76px;line-height:.95;letter-spacing:-.03em}
    .side .sub{font-family:Fraunces,serif;font-style:italic;font-size:28px;color:#3d3a35}
    .side .url{font-size:20px;letter-spacing:.06em;color:#6b675f}
  </style></head><body><div class="c">
    <div class="side">
      <div class="meta"><b>No. ${pad(q.number)}</b> · ${esc(q.category)}</div>
      <div class="title">Better questions</div>
      <div class="sub">One of ${questions.length} better questions.</div>
      <div class="url">questions.richallen.info/${q.slug}</div>
    </div>
    <div class="card">
      <div class="meta"><span><b>No. ${pad(q.number)}</b></span><span>${esc(q.category)}</span></div>
      <div class="q">${esc(q.question)}</div>
      <div class="brand">Better questions × Rich Allen</div>
    </div>
  </div></body></html>`;
}

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

async function shot(html, file) {
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, type: 'png' });
  console.log('wrote', file.replace(root + '/', ''));
}

await shot(masthead(), resolve(outDir, 'default.png'));
for (const q of questions) {
  await shot(card(q), resolve(outDir, `${q.slug}.png`));
}

// Icons from favicon.svg
const svg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8');
const iconPage = await browser.newPage({ deviceScaleFactor: 1 });
async function icon(size, file, transparent = false) {
  await iconPage.setViewportSize({ width: size, height: size });
  await iconPage.setContent(`<!doctype html><style>html,body{margin:0;background:${transparent ? 'transparent' : '#f5f3ee'}}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  const buf = await iconPage.screenshot({ path: file, type: 'png', omitBackground: transparent });
  console.log('wrote', file.replace(root + '/', ''));
  return buf;
}
await icon(180, resolve(root, 'public/apple-touch-icon.png'));
await icon(192, resolve(root, 'public/icon-192.png'));
await icon(512, resolve(root, 'public/icon-512.png'));
const png32 = await icon(32, resolve(root, 'public/favicon-32.png'));

// favicon.ico: an ICO container around the 32×32 PNG (valid in all modern browsers).
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(resolve(root, 'public/favicon.ico'), Buffer.concat([header, png32]));
console.log('wrote public/favicon.ico');

await browser.close();
