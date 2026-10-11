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

const ACCENTS = { teal: '#1f5f6b', ochre: '#8a5a14', plum: '#5b4b8a', terracotta: '#a3391f', moss: '#3c6b45' };
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
  @font-face { font-family: 'Fraunces'; font-weight: 100 900; src: url('file://${root}/public/fonts/fraunces-soft.woff2') format('woff2-variations'); }
  @font-face { font-family: 'Fraunces'; font-style: italic; font-weight: 100 900; src: url('file://${root}/public/fonts/fraunces-italic.woff2') format('woff2-variations'); }
  @font-face { font-family: 'Inter'; font-weight: 100 900; src: url('file://${root}/public/fonts/inter.woff2') format('woff2-variations'); }
`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function card({ eyebrow, title, footer, accent, big = false }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontCss}
    html,body{margin:0;width:1200px;height:630px;background:#f3ede2;color:#1b1915;font-family:Inter,sans-serif}
    .c{position:relative;width:1200px;height:630px;padding:72px 84px 64px 100px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between}
    .spine{position:absolute;left:0;top:0;bottom:0;width:22px;background:${accent}}
    .eyebrow{font-size:28px;letter-spacing:.1em;text-transform:uppercase;color:#6e675c;font-weight:500}
    .eyebrow b{color:${accent};font-weight:600}
    .title{font-family:Fraunces,serif;font-variation-settings:'SOFT' 60;font-weight:400;font-size:${big ? 132 : 84}px;line-height:1.02;letter-spacing:-.025em;max-width:980px;text-wrap:balance}
    .title em{font-style:italic;font-weight:300}
    .foot{display:flex;justify-content:space-between;align-items:baseline;font-size:28px;color:#4b463e}
    .foot .brand{font-family:Fraunces,serif;font-variation-settings:'SOFT' 60;font-weight:500;color:#1b1915}
    .grain{position:absolute;inset:0;opacity:.35;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.07 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");pointer-events:none}
  </style></head><body><div class="c"><div class="grain"></div><div class="spine"></div>
    <div class="eyebrow">${eyebrow}</div>
    <div class="title">${title}</div>
    <div class="foot"><span class="brand">Better questions</span><span>${footer}</span></div>
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

await shot(
  card({ eyebrow: `A collection of questions by Rich Allen`, title: `Better <em>questions</em><br>for faster flow.`, footer: `questions.richallen.info`, accent: '#1b1915', big: true }),
  resolve(outDir, 'default.png'),
);
for (const q of questions) {
  await shot(
    card({ eyebrow: `Question <b>${pad(q.number)}</b> &nbsp;·&nbsp; ${esc(q.category)}`, title: esc(q.question), footer: `One of ${questions.length} better questions &nbsp;·&nbsp; questions.richallen.info/${q.slug}`, accent: ACCENTS[q.accent] }),
    resolve(outDir, `${q.slug}.png`),
  );
}

// Icons from favicon.svg
const svg = readFileSync(resolve(root, 'public/favicon.svg'), 'utf8');
const iconPage = await browser.newPage({ deviceScaleFactor: 1 });
async function icon(size, file, transparent = false) {
  await iconPage.setViewportSize({ width: size, height: size });
  await iconPage.setContent(`<!doctype html><style>html,body{margin:0;background:${transparent ? 'transparent' : '#f3ede2'}}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
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
