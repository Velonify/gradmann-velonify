---
name: Gradmann 1864 Shop
description: Cool-light perfumery storefront in stamp navy with one signal red, set in upright Bodoni Moda and Hanken Grotesk.
colors:
  stamp-navy: "#0e2250"
  navy-soft: "#33446b"
  navy-muted: "#5b6a8c"
  cool-ground: "#f4f6fa"
  tile: "#e9edf4"
  hairline: "#d5dbe7"
  paper: "#ffffff"
  signal-red: "#c8381f"
  signal-red-deep: "#a82a14"
  stock-green: "#17794e"
  coral-on-navy: "#ff8b78"
typography:
  display:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(52px, 8.6vw, 96px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(34px, 5vw, 68px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Bodoni Moda', 'Didot', serif"
    fontSize: "clamp(26px, 3vw, 40px)"
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Hanken Grotesk', system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  card: "14px"
  panel: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 3.4vw, 48px)"
  section: "clamp(64px, 9vw, 130px)"
  grid-gap: "clamp(14px, 1.6vw, 24px)"
components:
  button-primary:
    backgroundColor: "{colors.stamp-navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-red}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.stamp-navy}"
    rounded: "{rounded.pill}"
    height: "52px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.stamp-navy}"
    rounded: "{rounded.pill}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.stamp-navy}"
    rounded: "{rounded.pill}"
    height: "40px"
  chip-selected:
    backgroundColor: "{colors.stamp-navy}"
    textColor: "{colors.paper}"
  product-card-media:
    backgroundColor: "{colors.tile}"
    rounded: "{rounded.card}"
  cart-drawer:
    backgroundColor: "{colors.paper}"
    width: "460px"
---

# Design System: Gradmann 1864 Shop

## Overview

**Creative North Star: "The Stamped Counter"**

A cool, pale shop floor on which one navy ink, the Gradmann stamp, does all the work. Text, buttons, selected states and the three drenched sections (Duftwochen, Vertrauen, footer) are that navy; the ground is a blue-tinged off-white; a single signal red appears only where action or money is involved (discount, progress, hover fill, count badge). Display type is upright Bodoni Moda, large and tightly tracked; everything functional is Hanken Grotesk.

The feel is a modern, luxurious house with a family tradition: generous section padding, big serif headlines, soft pill controls, and product photos that sit on tinted tiles as if printed on them. Density rises only in the collection page (sticky bar, facets, 3 to 4 column grid).

**Key Characteristics:**
- One ink (navy) plus one accent (red); red is rare and transactional.
- Navy-drenched sections alternate with the pale ground; no mid-tones between them.
- Pills for every interactive control; 14px radius for product tiles, larger radii for feature panels.
- Product photos are multiply-blended onto tinted tiles, so the white photo background disappears.
- Motion is eased, long and decelerating (one curve for everything), and respects reduced motion.

## Colors

A cool-paper palette where navy carries all ink and red is the only voice.

### Primary
- **Stamp Navy** (`stamp-navy`): headings, body-strong text, primary buttons, selected chips and checkboxes, focus ring, announcement bar, and the background of drenched sections and footer.

### Secondary
- **Signal Red** (`signal-red`): discount badges, free-shipping progress fill, cart count badge, primary-button hover wipe, hero headline emphasis word, wishlist-on state, marquee dots.
- **Signal Red Deep** (`signal-red-deep`): red as text (sale nav link, price discount, search match, hover link color) where the lighter red would be too weak.

### Tertiary
- **Stock Green** (`stock-green`): availability dot and the completed free-shipping bar only.
- **Coral on Navy** (`coral-on-navy`): the emphasis word and icons on navy backgrounds, where the signal red would lose contrast.

### Neutral
- **Cool Ground** (`cool-ground`): page background, drawer shipping strip, translucent header.
- **Tile** (`tile`): product-card media, thumbnails, search and cart image wells, search pill, hover fill for icon buttons.
- **Hairline** (`hairline`): all 1px dividers, input outlines, progress track.
- **Paper** (`paper`): drawers, mega menu, finder box, gallery stage, chips on ground.
- **Navy Soft** (`navy-soft`) body text; **Navy Muted** (`navy-muted`) meta, brand names, small labels.

### Named Rules
**The One Signal Rule.** Red marks action or price movement (discount, progress, count, hover fill). It is never decoration and never a section background.

**The Navy Drench Rule.** Emphasis sections are fully navy with white display type and coral accents; there is no gradient or half-navy treatment.

## Typography

**Display Font:** Bodoni Moda (with Didot, serif), upright, weight 400 to 500, never italic in use.
**Body Font:** Hanken Grotesk (with system-ui), weights 400 to 700.

**Character:** A high-contrast Didone for headlines against a friendly neutral grotesk for commerce. The serif speaks, the sans transacts.

### Hierarchy
- **Display** (400, clamp(52px, 8.6vw, 96px), 0.94, -0.035em): hero and collection H1; Duftwochen runs slightly larger/tighter (0.88, -0.04em).
- **Headline** (400, clamp(34px, 5vw, 68px), 1, -0.02em): section titles.
- **Title** (400, clamp(26px, 3vw, 40px), 1.05): trust items, drawer and finder titles (24 to 32px), mobile nav links (28px).
- **Body** (400, 16px, 1.55): copy at 14 to 17px; lede up to 20px, measure about 46 to 50ch.
- **Label** (700, 12px, 0.12 to 0.16em, uppercase): functional labels only (facet group heads, option names, brand name on a card, footer column heads). Prices use tabular numerals.

### Named Rules
**The Serif Speaks Rule.** Bodoni is for headlines, product names in features, and the brand wordmark. Prices, buttons, forms and UI copy are always Hanken Grotesk.

## Layout

Content sits in a 1440px container with a fluid gutter (16px to 48px). Sections breathe with 64px to 130px vertical padding. Grids: product grid 4 columns (3 at 1100px, 2 at 760px), collection grid 3 columns beside a 270px sticky facet column (becomes an off-canvas drawer at 1000px), 12-column bento for categories, 2-column splits (about 1.1 : 0.9) for hero, Duftwochen, trust and product detail. The header is sticky, translucent and shrinks on scroll; the collection bar sticks beneath it. Mobile: burger nav, rails at 62% column width, a sticky buy bar on the product page, and the quick-add button moves out of hover into the card.

## Elevation & Depth

Mostly tonal: tiles, paper and hairlines separate layers. Shadows are soft, navy-tinted and reserved for floating things.

### Shadow Vocabulary
- **Float** (`0 1px 2px rgba(14,34,80,.06), 0 12px 32px -12px rgba(14,34,80,.22)`): hero stage, finder box, toast, WhatsApp button.
- **Drawer edge** (`-30px 0 60px -30px rgba(14,34,80,.4)`): cart drawer and off-canvas facets.
- **Stack lift** (`0 30px 60px -20px rgba(0,0,0,.5)`): product cards stacked on the navy Duftwochen section.
- Backdrop blur (about 10 to 16px) on header, collection bar, sticky buy bar and search overlay.

### Named Rules
**The Soft Float Rule.** Shadows are long, low-opacity and navy-tinted; no offset or hard-edged shadows.

## Shapes

Pills (999px) for buttons, chips, selects, search field, badges and quantity steppers. Round (50%) for icon buttons and thumbnails in a stack. Product-card media 14px; image wells 8 to 10px; feature panels, bento and gift tiles 20 to 24px; hero stage 28px. Checkboxes 6px. Selected and outlined states use inset 1 to 1.5px rings rather than borders.

## Components

### Buttons
- **Shape:** full pill, 52px high (46 to 56px by context), 28px side padding, Hanken 600 at 15px.
- **Primary:** navy fill, white text; on hover a red layer wipes up from the bottom (450ms) and the button presses to 0.97 on active.
- **Ghost:** transparent with inset 1.5px navy ring; fills navy on hover.
- **Light:** white fill for use on navy; turns red on hover.
- **Arrow icons** nudge 4px right on hover.

### Chips
- White pill with inset hairline ring, 40px high; selected is navy fill, white text. Used for filters, categories, finder steps and active-filter tags.

### Cards / Containers
- **Product card:** 4:5 tile-tinted media (14px radius) with the photo inset about 9% and multiply-blended; the photo scales 1.07 on hover. Badges top-left (white, navy or red pills), wishlist circle top-right, full-width quick-add slides up on hover. Below: brand label, name 16px, meta, price 17px bold with struck-through UVP and red discount.
- **Bento / gift / promo tiles:** 20 to 24px radius, tinted or navy, big Bodoni title, round arrow button that rotates and turns red on hover.

### Inputs / Fields
- Pill fields with hairline ring; newsletter field is a 1.5px translucent-white outline on navy and turns solid white on focus. Selects are pill-shaped with a custom chevron. Checkboxes are 20px, 6px radius, filling navy with a drawn check. Caret color is the signal red.

### Navigation
- Centered wordmark with stamp that tilts on hover; 14.5px 600 links with an underline that draws in from the left; sale link in deep red; mega menu on paper with a tile-tinted featured product. Under 1000px: burger and a left slide-in panel with 28px Bodoni links, staggered in.

### Cart Drawer (signature)
- 460px right-hand panel on paper. A free-shipping strip on cool ground holds an 8px pill progress bar that fills red and turns green once the threshold is met. Line items have tile image wells, pill stepper, upsell row, and a bold total above a full-width primary button. Slides in over 600ms with a navy scrim.

### Sticky Buy Bar (signature)
- Product page only: translucent white bar fixed to the bottom with thumbnail, name, price and primary button; slides up once the main buy button leaves the viewport.

### Motion
- One curve, `cubic-bezier(.16, 1, .3, 1)`, for nearly every transition. Reveals: fade-and-rise (`rv`), clip-path wipes (`wipe`, 1.2s), and line-mask headline reveals where each line slides up from behind an overflow mask with staggered delays. Add-to-bag flies the product image to the cart icon (850ms), then the count badge pops. Marquee of brands pauses on hover. All of it collapses under `prefers-reduced-motion`.

## Do's and Don'ts

### Do:
- **Do** let navy carry text, buttons and emphasis sections; keep red to discounts, progress, counts and hover fills.
- **Do** multiply-blend product photos on `tile` (or a pale tint) so white photo backgrounds vanish.
- **Do** use pills for every interactive control and 14px for product-card media.
- **Do** write headlines in upright Bodoni at 400 with negative tracking; use tabular numerals for prices.
- **Do** use the single easing curve and honor reduced motion.

### Don't:
- **Don't** put red on large surfaces or use it as ornament.
- **Don't** set UI text, prices or buttons in Bodoni.
- **Don't** use hard offset shadows; shadows stay soft and navy-tinted.
- **Don't** introduce new radii for cards; extend from 14px (cards) and 20 to 24px (panels).
- **Don't** add other brand colors; the only off-palette value tolerated is the third-party WhatsApp green.
