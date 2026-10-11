# Better questions — companion card design specification

The physical set is five conversation cards, 85 × 55 mm (credit-card format), each with an embedded NFC tag that opens the matching page at `questions.richallen.info/<slug>`. This document carries the website's visual identity onto print. A printable HTML/CSS sheet implementing it is at `print/cards.html`.

## Identity in one line

Warm paper, dark ink, one soft serif, one accent per question, used sparingly.

## Colour

| Token | Hex | CMYK (approx.) | Use |
| --- | --- | --- | --- |
| Paper | `#F3EDE2` | 3 / 5 / 11 / 0 | Card stock colour or full-bleed background. Prefer an uncoated natural/cream stock and print no background. |
| Ink | `#1B1915` | 70 / 65 / 65 / 80 | Question, wordmark, body text. |
| Ink 2 | `#4B463E` | 60 / 55 / 60 / 35 | Secondary text (URL, tap hint). |
| Ink 3 | `#6E675C` | 50 / 45 / 50 / 15 | Labels. |
| Teal (01 Flow) | `#1F5F6B` | 85 / 45 / 40 / 15 | Spine, numeral. |
| Ochre (02 Teams) | `#8A5A14` | 35 / 60 / 100 / 20 | Spine, numeral. |
| Plum (03 AI) | `#5B4B8A` | 70 / 70 / 15 / 5 | Spine, numeral. |
| Terracotta (04 Users) | `#A3391F` | 25 / 90 / 95 / 15 | Spine, numeral. |
| Moss (05 Decisions) | `#3C6B45` | 75 / 35 / 85 / 20 | Spine, numeral. |

CMYK values are starting points; ask the printer for a proof on the chosen stock. The accents are deliberately muted and should not be brightened for print.

## Typography

| Role | Face | Size (print) | Notes |
| --- | --- | --- | --- |
| Question | Fraunces, SOFT 60, weight 400 | 16–19 pt, leading 1.05 | Largest element. Left-aligned, ragged right, max 3 lines. Tighten tracking −2%. |
| Numeral | Fraunces, weight 300 | 22 pt | Accent colour. "01" through "05", tabular figures. |
| Category | Inter, weight 500, uppercase, tracking +8% | 6.5 pt | Ink 3. Sits beside the numeral. |
| Wordmark | Fraunces, SOFT 60, weight 500 | 8 pt | "Better questions", ink. |
| URL / fallback | Inter, weight 400 | 6.5 pt | Ink 2. `questions.richallen.info/flow`. |
| Tap hint | Inter, weight 400 | 6 pt | Ink 3. "Tap to explore" next to the NFC mark. |
| Author line | Inter, weight 500 | 6.5 pt | Ink 2. "A question from Rich Allen". |

Fraunces and Inter are both open licences (SIL OFL) and can be supplied to the printer. Convert type to outlines in the final PDF.

## Layout (85 × 55 mm, landscape)

```
 ┌─────────────────────────────────────────────┐  3 mm bleed on all sides
 │▌ 01 · FLOW                 Better questions │  spine 2.5 mm, full height, accent
 │▌                                            │
 │▌ Where does work                            │  question: left 8 mm, top 16 mm,
 │▌ actually wait?                             │  max width 56 mm
 │▌                                            │
 │▌                                  ◉ NFC     │  NFC tag centre: 14 mm from right,
 │▌ questions.richallen.info/flow   [QR]  tap  │  11 mm from bottom (see below)
 │▌ A question from Rich Allen                 │
 └─────────────────────────────────────────────┘
```

Safe area is 4 mm from the trimmed edge. Nothing except the spine and the background touches the trim.

### Front

- **Spine.** A 2.5 mm vertical bar on the left edge in the question's accent, running the full height and into the bleed. This is the same spine as on the web cards and the social images.
- **Header.** Numeral and category top-left; wordmark top-right, both on the same baseline, 6 mm from the top.
- **Question.** The hero. Set from the left margin, vertically centred in the remaining space.
- **Footer.** URL bottom-left with the author line beneath; QR code and the tap mark bottom-right.

### Back (optional)

A quieter face: the wordmark centred, "One of five better questions." beneath it in Fraunces italic 8 pt, and `questions.richallen.info` at the foot. The back can also carry the NFC mark if the tag is read more reliably from that side.

### NFC tag position

- Use a 25 mm or smaller round NTAG213/215 inlay, or a card-format PVC card with the inlay embedded by the manufacturer.
- Centre the antenna at **14 mm from the right edge, 11 mm from the bottom edge** on the front. This keeps it under the tap mark, away from the QR code's quiet zone (QR centre at 27 mm from the right) and clear of the metallic-free zone most phones need.
- Keep print free of metallic inks over the antenna area.
- The tap mark is the wordmark's card glyph with three short arcs; it is drawn in `print/cards.html` and in `public/favicon.svg`.

### QR fallback

- 11 × 11 mm, error correction level M, ink on paper, 1-module quiet zone minimum (the HTML sheet leaves 1.5 mm).
- Encode exactly the same URL as the NFC tag, with no tracking parameters, so analytics are not split (see README, "Analytics").

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

`print/cards.html` renders all five fronts (and backs) at exact size with crop marks. Open it in Chrome, print to PDF at 100% scale with backgrounds enabled and no margins. The page size is A4; each card is positioned at true 85 × 55 mm with 3 mm bleed. The sheet uses the same font files as the website (`public/fonts`), so it must be opened from the repository, not copied elsewhere on its own.
