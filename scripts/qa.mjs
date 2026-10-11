/**
 * QA: screenshots every page at phone and desktop widths, checks every
 * internal link resolves, and reports console errors. Expects a server
 * serving dist/ at BASE (default http://localhost:4321, i.e. `astro preview`).
 */
import { chromium, devices } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4321';
const pages = ['/', '/flow', '/teams', '/ai', '/users', '/decisions', '/404'];
mkdirSync('qa', { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const errors = [];
const checked = new Map();

async function check(url) {
  if (checked.has(url)) return checked.get(url);
  const res = await fetch(url, { method: 'GET', redirect: 'manual' });
  checked.set(url, res.status);
  return res.status;
}

for (const [name, ctxOpts] of [
  ['mobile', { ...devices['iPhone 13'] }],
  ['desktop', { viewport: { width: 1280, height: 900 } }],
]) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${name}] ${page.url()} console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`[${name}] ${page.url()} pageerror: ${e.message}`));
  for (const p of pages) {
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    if (!res || (res.status() !== 200 && !(p === '/404' && res.status() === 404))) errors.push(`${p} -> HTTP ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `qa/${name}${p === '/' ? '-home' : p.replace('/', '-')}.png`, fullPage: true });
    if (name === 'desktop') {
      const links = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
      for (const href of links) {
        if (!href || href.startsWith('#') || href.startsWith('mailto:')) continue;
        if (/^https?:/.test(href)) continue; // external: not reachable from this sandbox
        const status = await check(new URL(href, BASE).href);
        if (status !== 200) errors.push(`${p}: internal link ${href} -> ${status}`);
      }
    }
  }
  await ctx.close();
}
await browser.close();

console.log(`Checked ${checked.size} distinct internal URLs.`);
if (errors.length) { console.log('PROBLEMS:'); errors.forEach((e) => console.log(' -', e)); process.exitCode = 1; }
else console.log('No console errors; all internal links resolve.');
