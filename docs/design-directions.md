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
- No images are required to render any page; the only binary assets are three font files, the social sharing images and one small author portrait (the same headshot as richallen.info, shown beside the byline in "About the author" so a card reader can match the page to the person they met).

---

## Refinement after reference review

Three references were supplied after the first build: a We're Not Really Strangers × Valentino conversation card (the question alone, bold uppercase sans in one deep red, centred on a white rounded card with a small brand line); the *Inkwell* journal template (a masthead with hairline rules, tracked-caps metadata rows, an italic serif display face and a serif body); and a Swiss-typography page (monochrome, numbered, confident type at scale). Direction A was refined accordingly rather than replaced:

- **Palette.** The five per-question accents were set aside for near-monochrome off-white (`#F5F3EE`) and ink (`#141311`) with one oxblood accent (`#7F1D1D`, 9:1 on paper, 10:1 on white). Questions are distinguished by number and category, not colour. The per-accent version remains in git history if it is ever wanted back.
- **Two registers.** The *card* is a white rounded object with the question set in Inter 800, uppercase, centred, in oxblood, with "No. 01 · Flow" above and "Better questions × Rich Allen" below. It appears wherever a question is offered: the homepage index, the practical exercise, "next question", the social image and print. The *journal* is everything around it: Fraunces italic for the masthead and the question headline, Fraunces roman (optical sizing on) for body text, Inter tracked caps for metadata.
- **Masthead.** The homepage opens like a journal: a metadata row (volume, edition, author), an ink rule, the title at up to 8rem in italic, the tagline, and a question nav with middle dots between entries. Question pages carry a one-row version.
- **Rules.** Structural rules are ink, minor rules are grey. The paper grain was removed; the references are flat.
- **Fonts.** Fraunces switched from the soft-axis file to the optical-size file so the same family serves display and text sizes (two files, roman and italic). Inter is unchanged. Total font payload is about 197 KB.
