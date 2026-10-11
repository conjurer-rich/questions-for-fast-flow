# Better questions — visual directions

Three directions were explored before implementation. Direction A was chosen and is implemented; B and C are recorded here so they can be revisited.

The brief for all three: editorial not corporate, mobile-first (most visitors arrive from an NFC tap), restrained motion, no stock imagery, no SaaS gradients, and a visual language that will also work on an 85 × 55 mm printed card.

---

## A. Contemporary editorial (chosen)

**Feel.** An independent print journal that happens to live on a phone. Warm paper, dark ink, one expressive serif doing the heavy lifting, and a quiet sans for everything functional.

**Palette.** Paper `#F3EDE2` with a lighter surface `#FAF6EE`; ink `#1B1915`; secondary ink `#4B463E`; rules `#D8CFBF`. Each question carries a single muted accent used sparingly for its numeral, card edge and small marks: teal (Flow), ochre (Teams), plum (AI), terracotta (Users), moss (Decisions). Accents are never used for body text and always pass 4.5:1 against paper where they carry text.

**Typography.** Fraunces Variable (soft axis) for questions, numerals and pull quotes, set large and tight; Inter Variable for body, labels and controls. Hierarchy comes from size, weight and spacing rather than colour. Numbers are tabular and presented as "01" through "05", echoing the physical set.

**Graphic elements.** A faint paper grain (SVG noise, no image request). Hairline rules. A short coloured "spine" on each card edge, suggesting a tab in a card index. No illustration.

**Why it wins.** It matches the author's stated preference, it is the most legible at phone widths, it gives the strongest typographic identity with the fewest assets, and it translates directly to print: the card is literally a cropped version of the page.

**Risks.** Warm paper palettes can look dated if the type is timid. Mitigated by scale: the question is the hero and sits at 40–72px.

---

## B. Ink on slate (recorded, not implemented)

**Feel.** A dark, cinematic reading room. Near-black slate backgrounds, cream type, the questions set in a high-contrast display serif with generous leading, and a single warm brass accent.

**Palette.** Slate `#15171A`, cream `#EFE9DC`, brass `#C8A24A`, mid-grey rules.

**Typography.** A sharp transitional serif (e.g. Newsreader or Playfair-like) for the questions; a humanist sans for body.

**Strengths.** Striking first impression when a phone lights up after an NFC tap. Strong differentiation from most consultancy sites.

**Why not now.** Dark themes read as "product" more than "publication", print translation is poor (heavy ink coverage on 85 × 55 mm cards), and long-form reading in dark mode is less comfortable for a two-minute article in daylight at a conference venue. Worth revisiting as an optional dark scheme later: the token system supports `prefers-color-scheme` without redesign.

---

## C. Field notes (recorded, not implemented)

**Feel.** A practitioner's notebook. Off-white grid paper, monospaced labels and numerals, hand-ruled underlines, a single highlighter-yellow accent, and diagrams drawn as simple inked lines.

**Palette.** Off-white `#F7F7F3`, graphite `#2A2A2A`, highlighter `#F2E55C`, faint grid `#E3E3DC`.

**Typography.** A geometric sans for questions, a monospace for numbers, categories and metadata, body in the same sans.

**Strengths.** Very "Fast Flow Toolkit": pragmatic, workshop-ready, feels like something you would pin to a wall. Strong fit for the practical exercises.

**Why not now.** It leans utilitarian and risks feeling like documentation rather than a publication. The monospace metadata motif is also harder to make elegant at small print sizes. Some of its ideas (numbered exercises, the "try this" card) are carried into Direction A.

---

## Decisions carried into implementation

- Question first, always. On every page the question is the largest element and is readable without scrolling on a 360px-wide phone.
- One accent per question, used for small marks only. The site remains two-colour (paper and ink) at a glance.
- Motion is limited to a short reveal on load, a cross-fade between pages (native CSS view transitions where supported) and hover/focus states. All of it is disabled under `prefers-reduced-motion`.
- No images are required to render any page; the only binary assets are three font files and the social sharing images.
