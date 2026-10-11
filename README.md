# Better questions

**Better questions for faster flow.** An interactive editorial site for a collection of conversation cards by [Rich Allen](https://richallen.info), hosted at <https://questions.richallen.info>.

Each physical card carries one question and an NFC tag that opens the matching page. The site is a static Astro build with no database, no authentication and no server runtime, deployed to Netlify.

| Question | URL |
| --- | --- |
| 01 Flow — Where does work actually wait? | `/flow` |
| 02 Teams — Are your teams organised around value or dependencies? | `/teams` |
| 03 AI — What happens when AI makes the wrong work faster? | `/ai` |
| 04 Users — Could you explain why every team exists? | `/users` |
| 05 Decisions — What evidence would justify changing your teams? | `/decisions` |

## Local development

Requires Node 22 (the version pinned for Netlify in `netlify.toml`).

```sh
npm install
npm run dev        # http://localhost:4321 with live reload
npm run build      # production build to dist/
npm run preview    # serve dist/ locally, as Netlify would
npm run check      # Astro + TypeScript type check
```

Copy `.env.example` to `.env` to set the optional contact email and analytics variables locally.

## Project layout

```
src/
  content/questions/*.md   one file per question (the content model)
  content.config.ts        schema for a question (validated at build time)
  layouts/BaseLayout.astro <head>, metadata, Open Graph, JSON-LD, analytics
  pages/index.astro        homepage
  pages/[slug].astro       question page template (one template for all questions)
  pages/404.astro
  components/              header, progress index, question index, exercise card,
                           share button, next question, about, contact, footer
  lib/site.ts              site-wide config: name, author, links, contact, analytics
  lib/questions.ts         ordered collection + prev/next helpers
  styles/global.css        design tokens, fonts, typography, motion
public/
  fonts/                   self-hosted Fraunces + Inter (SIL OFL)
  og/                      social sharing images (generated, committed)
  favicon.svg, *.png, favicon.ico, site.webmanifest, robots.txt
scripts/
  generate-images.mjs      renders OG images + icons with Playwright
  qa.mjs                   screenshots, link check, console-error check
docs/
  design-directions.md     the three visual directions and the rationale
  card-design-spec.md      print specification for the physical cards
print/
  cards.html               printable sheet of the five cards at 85 × 55 mm
```

## Adding a question

1. Create `src/content/questions/<slug>.md`. The slug becomes the URL (`/<slug>`) and should be short enough to fit on a card.
2. Fill in the frontmatter. The schema in `src/content.config.ts` is the reference; the build fails with a clear message if a field is missing or too long. Existing files are the best template.
3. Pick an `accent` from the five tokens, or add a new one in `global.css` (`--name`, plus a `[data-accent='name']` rule) and the schema enum. Check it against the paper colour for 4.5:1 contrast.
4. Run `npm run images` to generate its social image (needs Playwright's Chromium locally; set `CHROMIUM_PATH` to an existing Chrome binary if you don't want Playwright to download one).
5. `npm run build`. The homepage index, prev/next links, progress dots, sitemap and Netlify redirects all pick it up automatically. The "one of five" wording is derived from the number of published questions.

Set `draft: true` in the frontmatter to keep a question out of the build while writing it.

## Deployment to Netlify

`netlify.toml` holds the build configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

Create the site in Netlify from this repository ("Add new site → Import an existing project"), accept the detected settings, and deploy. Every push to the production branch redeploys; pull requests get deploy previews.

### Environment variables (optional)

Set these under *Site configuration → Environment variables* in Netlify. All are optional; the site ships with no analytics and a link to richallen.info as the contact route if nothing is set.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CONTACT_EMAIL` | Shows a "Start a conversation" mailto link in the contact section instead of a link to richallen.info. |
| `PUBLIC_ANALYTICS_PROVIDER` | `none` (default), `plausible`, `umami` or `goatcounter`. |
| `PUBLIC_ANALYTICS_ID` | Plausible: the site domain. Umami: the website id. GoatCounter: your code (the `xxx` in `xxx.goatcounter.com`). |
| `PUBLIC_ANALYTICS_HOST` | Self-hosted Plausible/Umami origin. Leave empty for the hosted service. |

Changing any variable requires a redeploy (they are read at build time).

### Custom domain: questions.richallen.info

The apex `richallen.info` is hosted on Squarespace and its DNS is managed in Cloudflare. Nothing below touches the apex record or the Squarespace site; only a new subdomain record is added.

**1. In Netlify**

1. *Domain management → Add a domain* → enter `questions.richallen.info` → *Add domain*. Choose "Yes, add domain" when asked whether you own it.
2. Netlify shows the target for a CNAME: `<your-site-name>.netlify.app`. Note it.
3. Leave the Netlify DNS option alone. The zone stays in Cloudflare.

**2. In Cloudflare (DNS → Records for richallen.info)**

Add one record:

| Type | Name | Target | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| CNAME | `questions` | `<your-site-name>.netlify.app` | **DNS only** (grey cloud) | Auto |

Set the proxy to *DNS only*. With the orange cloud on, Netlify cannot issue its Let's Encrypt certificate and you get redirect loops or certificate errors. If you later want Cloudflare's proxy in front, first let Netlify provision HTTPS, then set Cloudflare's SSL/TLS mode to *Full (strict)* before enabling the proxy. For this site there is no benefit to proxying; Netlify already serves from a CDN.

Do not change the existing `A`/`CNAME` records for `richallen.info` or `www`; those belong to Squarespace.

**3. Back in Netlify**

Within a few minutes of the record propagating, *Domain management → HTTPS* shows the certificate as provisioned. Then set `questions.richallen.info` as the *primary domain* so `<site>.netlify.app` redirects to it. Tick *Force HTTPS*.

**4. Verify**

```sh
curl -I https://questions.richallen.info/flow        # 200, HTML
curl -I https://questions.richallen.info/flow/       # 301 → /flow
curl -I https://questions.richallen.info/flow.html   # 301 → /flow
curl -s https://questions.richallen.info/sitemap-index.xml | head
```

### Publishing checklist

- [ ] Deploy preview reviewed on a phone
- [ ] Environment variables set (contact email, analytics) and redeployed
- [ ] Custom domain added, Cloudflare CNAME created as *DNS only*, HTTPS provisioned, primary domain set
- [ ] NFC tags written with `https://questions.richallen.info/<slug>` and locked (see `docs/card-design-spec.md`)
- [ ] Social preview checked by pasting a question URL into a chat client

## Analytics

The site supports three cookieless providers through configuration. In their default setup none of them sets cookies or stores personal data, so basic anonymous page-view measurement does not require a consent banner. Besides page views (one per question URL, which is how card interest is measured) the templates emit three custom events through `data-track` attributes: `question_next`/`question_prev`/`question_open` (navigation between questions, with the target slug), `outbound` (clicks on the three resource sites) and `contact`. Netlify's own server-side Analytics also works with no configuration, since it needs no script.

Do not add query parameters to the NFC/QR URLs. The path alone identifies the question, and keeping one URL per question keeps the counts whole.

## Accessibility and performance

Targets: WCAG 2.2 AA, Lighthouse ≥ 90 across the board. Measured locally on the production build with Lighthouse 13 (mobile emulation, simulated throttling):

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 99 | 100 | 100 | 100 |
| `/flow` | 99 | 100 | 100 | 100 |
| `/teams` | 99 | 100 | 100 | 100 |
| `/ai` | 99 | 100 | 100 | 100 |
| `/users` | 99 | 100 | 100 | 100 |
| `/decisions` | 99 | 100 | 100 | 100 |

Cumulative layout shift is 0 on every page (fonts are preloaded and metric-compatible fallbacks are declared). To reproduce: `npm run build && npm run preview`, then `npx lighthouse http://localhost:4321/flow`. `npm run qa` takes full-page screenshots at phone and desktop widths into `qa/`, checks every internal link, and fails on console errors.

Everything works without JavaScript. The only client-side scripts are the share/copy button (progressively enhanced from a mailto link), an arrow-key shortcut between questions, and the analytics snippet when enabled. Page transitions use native CSS view transitions where the browser supports them; all motion is disabled under `prefers-reduced-motion`.

## Fonts

Fraunces (optical-size axis, latin subset, roman and italic) and Inter (latin subset), both under the SIL Open Font License, self-hosted from `public/fonts` with licences alongside. Sourced from the `@fontsource-variable` packages.
