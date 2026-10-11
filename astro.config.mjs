// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Production URL. Canonical URLs always point at the production domain.
const SITE = 'https://questions.richallen.info';

/**
 * Writes dist/_redirects for Netlify so that a tag or QR code encoded with a
 * trailing slash or .html still lands on the one canonical URL per question.
 * Derived from the pages Astro actually built, so new questions are covered
 * automatically.
 * @returns {import('astro').AstroIntegration}
 */
function netlifyRedirects() {
  return {
    name: 'netlify-redirects',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const slugs = pages
          .map((p) => p.pathname.replace(/\/$/, ''))
          .filter((p) => p && p !== '404');
        const lines = [
          '# Generated at build time by astro.config.mjs — do not edit.',
          '/index.html  /  301',
          ...slugs.flatMap((s) => [`/${s}/  /${s}  301`, `/${s}.html  /${s}  301`]),
          '',
        ];
        await writeFile(fileURLToPath(new URL('_redirects', dir)), lines.join('\n'));
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  // Question pages are addressed as /flow, /teams, ... (no trailing slash)
  // so an NFC tag can carry the shortest possible URL. Netlify serves
  // /flow.html at /flow automatically.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    sitemap({ changefreq: 'monthly', priority: 0.7, lastmod: new Date() }),
    netlifyRedirects(),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  compressHTML: true,
});
