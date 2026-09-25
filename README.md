# GESCHICHTE — Wear Your Story

Landing page for the **Geschichte** line launch. Built with React + Vite + Tailwind CSS.
[![Live Site](https://img.shields.io/badge/visit-live%20site-gold?style=flat-square)](https://geschichte-gamma.vercel.app/)

## Design direction

Pulled straight from the reference teaser: near-black ground, a weathered
stone-textured serif for headlines, a champagne-gold script/stitch accent,
and a torn-seam motif ("every scar") that recurs as the section divider.
Full token list lives in `tailwind.config.js` (`ink`, `charcoal`, `stone`,
`bone`, `champagne`, `ash`, `seam`) and `src/index.css` (`.stone-fill`,
`.stitch-card`).

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
npm run lint
```

Requires Node 18+.

## Project structure

```
src/
  data/content.js        # ALL copy, nav links, product list, launch date live here
  hooks/useCountdown.js   # reusable countdown-timer logic
  components/
    Navbar.jsx
    Hero.jsx
    Countdown.jsx
    Manifesto.jsx
    CollectionPreview.jsx
    WaitlistForm.jsx
    WaitlistSection.jsx
    SeamDivider.jsx        # signature "crack/seam" divider
    GrainOverlay.jsx
    Footer.jsx
  App.jsx                  # composition root — order/remove/add sections here
  main.jsx
  index.css
```

## Built to extend

- **Copy & config is data-driven.** Everything editorial (headline strings,
  nav links, the launch date, product teasers, manifesto pillars) lives in
  `src/data/content.js`. Marketing changes rarely touch a component file.
- **The waitlist form is transport-agnostic.** `WaitlistForm` takes an
  `onSubmit(email)` prop and only cares about UI state (idle/loading/
  success/error). The mocked `submitToWaitlist` functions in `Hero.jsx` /
  `WaitlistSection.jsx` are the single place to wire up a real endpoint,
  e.g.:

  ```js
  async function submitToWaitlist(email) {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Could not join the waitlist.');
  }
  ```

- **Product teasers are array-driven and lock-aware.** Add a new object to
  `products` in `content.js` and a card renders automatically; flip
  `locked: false` once real imagery/pricing exists — no JSX changes needed.
  When real photography is ready, swap the gradient `<div>` in
  `CollectionPreview.jsx` for an `<img>` with the same aspect ratio.
- **Countdown is a standalone hook** (`useCountdown`) so a future banner,
  modal, or email template can reuse the same timer without duplicating
  interval logic.
- **Sections are independent components** composed in `App.jsx`. Reordering
  the launch, adding a lookbook/press section, or A/B-testing the hero is a
  matter of adding a file and one line in `App.jsx`.
- **Accessibility & motion floor:** visible focus rings (`:focus-visible`),
  `prefers-reduced-motion` respected globally, semantic form labelling, and
  `aria-live` on the countdown.

## Suggested next steps

- Wire `submitToWaitlist` to a real email provider (Klaviyo/Mailchimp) or a
  serverless function.
- Replace `CollectionPreview`'s gradient placeholders with real product
  photography once shot.
- Add analytics (e.g. Plausible/GA4) via a small `src/lib/analytics.js`
  module and call it from `WaitlistForm`'s success path.
- If the catalog grows past two teaser products, consider paginating
  `CollectionPreview` or fetching `products` from a CMS instead of the
  static `content.js` array.


