# Agent notes — Irek's Apiary

Project conventions and working notes for AI coding agents. Keep this file short and practical.

## Stack

- React 18 + `react-router-dom` (lazy-loaded routes in `src/App.js`)
- `styled-components` with a theme in `src/styles/theme.js`
- `react-helmet-async` via `src/components/shared/SEO.js` for per-page SEO + JSON-LD
- Global cart via `src/context/CartContext.js` (`useCart()`); items have `id`, `name`, `size`, `price`, `image`, `pickup`
- Stripe Checkout through `src/utils/stripe.js` (cart items passed generically; `cancelUrl` currently hardcoded to `/nucs` — keep in mind for new products)

## Copy / voice guide

The site sells honey, nucs, and queens from a working Southern Tier apiary. All customer-facing copy must read as **plain, matter-of-fact product information**. Nothing else.

### Do

- Short declarative sentences. Facts and instructions only.
- State a thing once. If it's in a FAQ, don't repeat it in a disclaimer.
- Prefer neutral terms: "descendants" not "daughters"; "undisturbed period" not "no-peek window"; "workers chew through the candy plug" not "bees eat her out".
- Use numbered or labeled steps for instructions (e.g. Pickup Day cards, Introducing Your Queen steps). Keep each body to 1–2 sentences.
- Match an existing page's structure when adding a new product (see `src/components/Nucs/Nucs.js` as the canonical template for `src/components/Queens/Queens.js`).

### Don't

Do not write in any of the following registers. These are the exact patterns that have been rejected on this project — if you're about to type something in this shape, stop and rewrite.

- **Folksy / chatty asides.** No "we keep it simple", "from us to you", "grab a posca pen and do it yourself", "walk away", "drones cooperating", "worked these hills", "it's easier than it looks".
- **Sales rhetoric and competitor contrasts.** No "Whether you're requeening a struggling hive or starting a split…", no "You're not getting a Southern package queen shipped up to adapt on your dime".
- **Pseudo-poetic flourishes.** No "Open mating isn't the cleanest science, but it's honest", no "her whole family tree already lives here", no "a gene pool that has already proved it can make it in the Southern Tier".
- **Preachy imperatives and filler emphasis.** No "Don't check, don't peek, don't worry", no "No exceptions", no "Mating takes as long as it takes", no standalone "Nothing." as a one-word answer.
- **Redundant reassurance.** No "That's your confirmation. You don't need to see her to know she's there and working" — if the instruction is "look for fresh eggs and young larvae", that is the whole sentence.
- **Triple-adjective stacks as marketing.** "hardy, calm, Upstate-winter proven" reads like a brochure. Cut it or pick one.
- **Cross-selling links between product pages.** Product pages get their own top-nav tab; they do not cross-link to each other in body copy.

### Concrete before/after (from the Queens page pass)

These are real edits made on `src/components/Queens/Queens.js`. Use them as calibration.

- FAQ "Do you mark queens?"
  - Before: "No. We keep it simple and don't mark queens. If you want yours marked, grab a posca pen and do it yourself at introduction. It's easier than it looks."
  - After: "No. Queens are sold unmarked."
- Intro to the Introducing Your Queen section
  - Before: "The handoff is the easy part. Introduction is where most queens are lost, and it's almost always avoidable. A few notes from us to you."
  - After: "Most queen losses happen at introduction, not handoff. Follow these steps."
- Step title
  - Before: "Close the hive and walk away"
  - After: "Close the hive"
- Step body
  - Before: "After 7 days, look for fresh eggs and young larvae. That's your confirmation. You don't need to see her to know she's there and working."
  - After: "After 7 days, look for fresh eggs and young larvae."

When in doubt, ship the shorter version.

## Uppercase eyebrow labels

Small mono-font, uppercase, letter-spaced labels are used intentionally in three spots on each product page: the `Tag` above the product name, the `OptionLabel` above form controls (e.g. Quantity), and the `StoryTag` above the "Our / About" section heading. Everything else is sentence case. Do not introduce uppercase styling in body copy, buttons, FAQs, or step text.

## Images

- Product photography lives under `public/assets/<product>/` (e.g. `public/assets/queens/`, `public/assets/nucs/`).
- For HEIC source files from iPhone, convert iteratively with `sips`: start at max quality, measure, then downsize only if the file is too heavy. Typical target is ~1–1.5 MB per JPEG at quality 95 with longest side capped around 2500 px. Keep the original HEIC alongside the exported JPEG.
- Do not over-compress: user preference is high quality first, reduce only if actually too heavy.

## Adding a new product page

1. Create `src/components/<Product>/<Product>.js`, mirroring `Queens.js` / `Nucs.js` (hero grid with image gallery + purchase col, optional story section, pickup cards, intro/how-to steps, FAQ).
2. Add a lazy import and route in `src/App.js`.
3. Add a nav entry in `src/components/Layout/Header.js` (`NAV_LINKS`).
4. Add a footer link in `src/components/Layout/Footer.js` (`LINK_GROUPS` → "Shop").
5. Add a `<url>` entry in `public/sitemap.xml`.
6. Include `<SEO>` metadata plus `Product` and (if applicable) `FAQPage` JSON-LD.
7. Optionally add an entry to `src/config/heroes.js` for homepage hero rotation.
8. Update the homepage `<SEO>` description in `src/components/Home/Home.js` if the new product changes the one-line pitch.

## Before committing

- Run `ReadLints` on every file you edited.
- Do not create docs (`*.md`, READMEs) unless the user explicitly asks.
- Do not commit unless the user explicitly asks.
