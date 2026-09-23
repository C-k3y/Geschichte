/**
 * content.js
 * ---------------------------------------------------------------------------
 * Single source of truth for site copy, nav links, product teasers and
 * launch settings. Keeping this separate from the components means the
 * marketing/ops side of the business can update copy, swap the launch date,
 * or add a new pillar/product without touching JSX — and it's the natural
 * seam to later replace with a CMS (Sanity, Contentful) or a fetch() call
 * to a real backend without changing any component internals.
 */

export const brand = {
  name: 'GESCHICHTE',
  tagline: 'Wear your story.',
  lineName: 'Chapter One',
  lineLabel: 'Chapter One — The Debut Collection', // rename to your actual drop's name
  strapline: 'Stories woven. Purpose worn.',
  instagram: '@geschichte.co', // update to your real handle
  instagramUrl: 'https://instagram.com/geschichte.co',
  // TODO: update this to the real store URL when the backend ships
  storeUrl: 'https://geschichte.co/shop',
};

// ISO date the countdown targets. Change this one value to move the launch.
export const launchDate = '2026-09-25T18:00:00+03:00'; // East Africa Time (EAT, UTC+3){Will Officially launch on Friday 25th Sep 2026 at 6pm}

// Pre-launch nav (shown during countdown)
export const navLinks = [
  { label: 'The Line', href: '#manifesto' },
  { label: 'Collection', href: '#collection' },
  { label: 'Waitlist', href: '#waitlist' },
];

// Post-launch nav (shown once the countdown hits zero)
export const liveNavLinks = [
  { label: 'The Line', href: '#manifesto' },
  { label: 'Collection', href: '#collection' },
  { label: 'Shop', href: '#shop' },
];

// The three-line poster copy — "Every scar. Every lesson. Every victory." —
// expanded into a real manifesto grid. Order carries meaning here: it's a
// chronology (wound → meaning → outcome), so numbering the pillars is
// justified rather than decorative.
export const pillars = [
  {
    mark: 'I',
    title: 'Every scar.',
    body: 'Every piece starts from something lived-through, not a mood board. We stitch the mark first, then build the garment around it.',
  },
  {
    mark: 'II',
    title: 'Every lesson.',
    body: 'Construction details are earned, not decorative — heavyweight cotton, reinforced seams, a fit that holds up to the story it carries.',
  },
  {
    mark: 'III',
    title: 'Every victory.',
    body: 'The Geschichte monogram is worn quietly, on the chest and on the patch — proof kept close, not shouted.',
  },
];

// Product teaser cards for the "Collection" section. `locked: true` renders
// the pre-launch treatment; flip it to false (and add real imagery /
// pricing) once the drop goes live — no structural changes needed.
export const products = [
  {
    id: 'hoodie-geschichte',
    name: 'Geschichte Hoodie',
    detail: 'Heavyweight fleece · embroidered monogram · raw hem drawcord',
    alt: 'Geschichte Hoodie in heavyweight fleece — front view',
    swatch: 'from-[#211d16] via-[#171410] to-[#0b0a08]',
    locked: true,
    // TODO: add href pointing to individual product page when backend is ready
    href: '#',
  },
  {
    id: 'sweatpant-geschichte',
    name: 'Geschichte Sweatpant',
    detail: 'Tapered fit · woven leather patch · deep side pockets',
    alt: 'Geschichte Sweatpant — tapered fit, woven leather patch detail',
    swatch: 'from-[#1c1913] via-[#151209] to-[#0b0a08]',
    locked: true,
    href: '#',
  },
];

/**
 * Copy shown when the countdown hits zero. The page shifts from
 * "coming soon" mode to a live gateway that directs visitors to the store.
 * Swap `storeUrl` in `brand` above when the backend is deployed.
 */
export const liveCopy = {
  eyebrow: 'We are live',
  heading: 'Geschichte is here.',
  subheading: 'Stories woven. Purpose worn.',
  body: 'The wait is over. GESCHICHTE is now open — shop the collection and wear your story.',
  ctaLabel: 'Shop the collection',
  secondaryLabel: 'Follow us on Instagram',
};

export const waitlistCopy = {
  eyebrow: 'Launching soon',
  heading: 'Be first through the door.',
  body: 'Join the list and get early access before we open to the public — plus one email, the day it drops.',
  ctaLabel: 'Notify me',
  successHeading: "You're on the list.",
  successBody: "We'll email you the moment we launch.",
};
