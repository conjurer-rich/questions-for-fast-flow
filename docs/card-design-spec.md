# Better questions — companion card design specification

The physical set is five conversation cards, 85 × 55 mm (credit-card format), each with an embedded NFC tag that opens the matching page at `questions.richallen.info/<slug>`. This document carries the website's visual identity onto print. A printable HTML/CSS sheet implementing it is at `print/cards.html`.

## Identity in one line

A white card. The question alone, bold, uppercase, centred, in oxblood. A small brand line. Nothing else competes.

## Colour

| Token | Hex | CMYK (approx.) | Use |
| --- | --- | --- | --- |
| Card | `#FFFFFF` | — | Card stock. Use a bright white uncoated stock, 350–400 gsm, or a white PVC card. No printed background. |
| Oxblood | `#7F1D1D` | 25 / 95 / 85 / 30 (near Pantone 7421 C / 188 C) | The question, the numeral. Ask for a proof: this must read deep and matte, not bright red. |
| Ink | `#141311` | 70 / 65 / 65 / 85 | Brand line, back-face title. |
| Ink 3 | `#6B675F` | 50 / 45 / 50 / 15 | Category, URL, tap hint. |
| Paper (web only) | `#F5F3EE` | — | The site background. Not printed. |

Two inks (oxblood and black) on white stock. Greys are tints of black.

## Typography

| Role | Face | Size (print) | Notes |
| --- | --- | --- | --- |
| Question | Inter, weight 800, uppercase, tracking −0.5% | 12.5 pt (11 pt for three-line questions), leading 1.12 | Centred. Max 4 lines, max width 60 mm. |
| Number | Inter, weight 600, uppercase, tracking +16% | 6 pt | Oxblood. "No. 01" top-left. |
| Category | Inter, weight 600, uppercase, tracking +16% | 6 pt | Ink 3. Top-right, same baseline. |
| Brand line | Inter, weight 700, uppercase, tracking +14% | 5.5 pt | Ink. "Better questions × Rich Allen", bottom-left. |
| URL | Inter, weight 400 | 5.5 pt | Ink 3. Beneath the brand line. |
| Tap hint | Inter, weight 400 | 4.8 pt | Ink 3. Beneath the tap mark. |
| Back: title | Fraunces, italic, weight 400, tracking −3% | 20 pt | Ink. |
| Back: tagline | Fraunces, italic, weight 300 | 7.5 pt | Ink 2. "One of five better questions." |
| Back: metadata | Inter, weight 500, uppercase, tracking +16% | 5–5.5 pt | Ink 3. |

Fraunces and Inter are both open licences (SIL OFL) and can be supplied to the printer. Convert type to outlines in the final PDF.

## Layout (85 × 55 mm, landscape)

```
 ┌────────────────────────────────────────────┐  3 mm bleed on all sides
 │ NO. 01                                FLOW │  head row 4.5 mm from trim
 │                                            │
 │           WHERE DOES WORK                  │  question centred, max 60 mm wide,
 │           ACTUALLY WAIT?                   │  vertically centred in free space
 │                                            │
 │ BETTER QUESTIONS × RICH ALLEN   [QR]  ◉    │  foot row 4.5 mm from trim;
 │ questions.richallen.info/flow        tap   │  NFC centre 13 mm from right, 10 mm from bottom
 └────────────────────────────────────────────┘
```

Safe area is 4.5 mm from the trimmed edge on top and bottom, 5 mm on the sides. Nothing but the white stock touches the trim. Corner radius 3–4 mm.

### Front

- **Head.** Number top-left in oxblood, category top-right in grey, both tracked caps on one baseline.
- **Question.** The hero. Bold uppercase Inter, centred, oxblood. Let it breathe: the card should look almost empty apart from the question.
- **Foot.** Brand line and URL bottom-left; QR code and tap mark bottom-right.

### Back

The masthead, much reduced: ink rules at top and bottom, "Vol. I · Fast Flow Conference 2026" and "By Rich Allen" as tracked caps (the edition stamp is what makes the set a dated, collectible object), the title "Better questions" in italic Fraunces, "One of five better questions." beneath, and the site address at the foot. The back can also carry the NFC mark if the tag is read more reliably from that side.

### NFC tag position

- Use a 25 mm or smaller round NTAG213/215 inlay, or a card-format PVC card with the inlay embedded by the manufacturer.
- Centre the antenna at **13 mm from the right edge, 10 mm from the bottom edge** on the front, directly under the tap mark and clear of the QR code's quiet zone.
- Keep print free of metallic inks over the antenna area.
- The tap mark is the card glyph with three short arcs; it is drawn in `print/cards.html` and matches `public/favicon.svg`.

### QR fallback

- 10 × 10 mm, error correction level M, black on white, 1-module quiet zone minimum.
- Encode exactly the same URL as the NFC tag, with no tracking parameters, so analytics are not split (see README, "Analytics").
- `print/cards.html` carries the five codes as inline SVG (29 × 29 modules plus the quiet zone), generated with the `qrcode` npm package. Regenerate them if a URL ever changes.

## Encoding the tags

Write each tag with a single NDEF URI record:

| Card | URL |
| --- | --- |
| 01 Flow | `https://questions.richallen.info/flow` |
| 02 Teams | `https://questions.richallen.info/teams` |
| 03 AI | `https://questions.richallen.info/ai` |
| 04 Users | `https://questions.richallen.info/users` |
| 05 Decisions | `https://questions.richallen.info/decisions` |

Lock the tags after writing. Do not add query strings: the page URL alone identifies the question in analytics.

## Printing the sheet

`print/cards.html` renders all five fronts and a back at exact size with crop marks. Open it in Chrome from the repository (it uses the fonts in `public/fonts`), print to PDF at 100% scale with backgrounds enabled and no margins. The page is A4; each card is positioned at true 85 × 55 mm with 3 mm bleed. Untick "Show NFC inlay guide" before exporting.
