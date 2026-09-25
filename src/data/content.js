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
  lineName: 'Geschichte',
  lineLabel: 'The Geschichte Line', //to be renamed as per the client's actual drop's name
  strapline: 'Stories woven. Purpose worn.',
  instagram: '@geschichte.co',
  instagramUrl: 'https://instagram.com/geschichte.co',
  // TODO(client): replace with the real WhatsApp Business number that
  // receives orders. Digits only — country code, no leading "+" or "0".
  // Example for a Kenyan number 0712 345 678 → '254712345678'.
  whatsappNumber: '254795432090',
  // TODO: update this to the real store URL only if/when the shop moves to
  // its own domain. The live shop itself no longer depends on this — it's
  // rendered in-page at #shop, so the site works today with no domain setup.
  storeUrl: 'https://geschichte.co/shop',
};

// ISO date the countdown targets. Change this one value to move the launch.
export const launchDate = '2026-09-25T18:00:00+03:00'; // East Africa Time (EAT, UTC+3){Official Launch date to 25th Sep}

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

// Sizes offered across the current drop. Shared across products for now —
// give an individual product its own `sizes` array later if a piece needs
// a different run (e.g. one-size accessories).
export const SIZES = ['S', 'M', 'L'];

// Product cards for both the "Shop the Drop" teaser (CollectionPreview) and
// the full live Shop. `locked: true` renders the pre-launch treatment on the
// teaser; the live Shop always renders products fully unlocked regardless
// of this flag, since it only appears once `isLive` is already true.
export const products = [
  {
    id: 'hoodie-geschichte',
    name: 'Geschichte Hoodie',
    detail: 'Heavyweight fleece · embroidered monogram · raw hem drawcord',
    alt: 'Geschichte Hoodie in heavyweight fleece — front view',
    image: '/Black_Hoodie-removebg-preview.png',
    swatch: 'from-[#211d16] via-[#171410] to-[#0b0a08]',
    // TODO(client): confirm real retail price. Whole units, no decimals —
    // formatPrice() below handles currency display.
    price: 1500,
    currency: 'KES',
    sizes: SIZES,
    locked: true,
    href: '#shop',
  },
  {
    id: 'sweatpant-geschichte',
    name: 'Geschichte Sweatpant',
    detail: 'Tapered fit · woven leather patch · deep side pockets',
    alt: 'Geschichte Sweatpant — tapered fit, woven leather patch detail',
    image: '/Black_Sweatpant-removebg-preview.png',
    swatch: 'from-[#1c1913] via-[#151209] to-[#0b0a08]',
    // TODO(client): confirm real retail price.
    price: 1200,
    currency: 'KES',
    sizes: SIZES,
    locked: true,
    href: '#shop',
  },
  {
    id: 'vest-hoodie-geschichte',
    name: 'Geschichte Vest Hoodie',
    detail: 'Sleeveless heavyweight fleece · brand monogram · relaxed drop shoulder',
    alt: 'Geschichte Vest Hoodie — sleeveless fleece, front view',
    image: '/Black_Fleece-removebg-preview.png',
    swatch: 'from-[#1f1b14] via-[#16130e] to-[#0b0a08]',
    // TODO(client): confirm real retail price.
    price: 1400,
    currency: 'KES',
    sizes: SIZES,
    locked: true,
    href: '#shop',
  },
  {
    id: 'wide-leg-geschichte',
    name: 'Geschichte Wide-Leg Pants',
    detail: 'Flared silhouette · elastic drawstring waist · brand monogram',
    alt: 'Geschichte Wide-Leg Pants — flared silhouette, front view',
    image: '/Black_Pants-removebg-preview.png',
    swatch: 'from-[#1a1712] via-[#141109] to-[#0b0a08]',
    // TODO(client): confirm real retail price.
    price: 1300,
    currency: 'KES',
    sizes: SIZES,
    locked: true,
    href: '#shop',
  },
  {
    id: 'tracksuit-set-geschichte',
    name: 'Geschichte Tracksuit Set',
    detail: 'Matching hoodie & jogger set · brand monogram · relaxed fit throughout',
    alt: 'Geschichte Tracksuit Set — matching hoodie and joggers, front view',
    image: '/full-black-set-removebg-preview.png',
    swatch: 'from-[#1a1a1f] via-[#121216] to-[#08080a]',
    badge: 'Set',
    // TODO(client): confirm real retail price — likely a bundle discount
    // versus buying the hoodie and a pair of joggers separately.
    price: 2500,
    currency: 'KES',
    sizes: SIZES,
    locked: true,
    href: '#shop',
  },
];

/**
 * Copy shown when the countdown hits zero. The Hero shifts from
 * "coming soon" mode to a "we're live" headline whose CTA scrolls straight
 * to the in-page Shop section (#shop) — no external domain required.
 */
export const liveCopy = {
  eyebrow: 'We are live',
  heading: 'Geschichte is here.',
  subheading: 'Stories woven. Purpose worn.',
  body: 'The wait is over. GESCHICHTE is now open — shop the collection and wear your story.',
  ctaLabel: 'Shop the collection',
  secondaryLabel: 'Follow us on Instagram',
};

// Copy for the full, functioning Shop section (src/components/Shop.jsx).
export const shopCopy = {
  eyebrow: 'We are live',
  heading: 'Shop the collection.',
  subheading: 'Stories woven. Purpose worn.',
  intro:
    "Pick a size, add it to your collection, and we'll confirm your order over WhatsApp.",
  // Kept honest and visible rather than hidden in fine print — orders are
  // manually confirmed for now while payment gets automated (M-Pesa first).
  paymentNote:
    'Orders are confirmed over WhatsApp for now — M-Pesa on request. Card and international payment options are coming soon.',
};

export const waitlistCopy = {
  eyebrow: 'Launching soon',
  heading: 'Be first through the door.',
  body: 'Join the list and get early access before its open to the public — plus one email, the day it drops.',
  ctaLabel: 'Notify me',
  successHeading: "You're on the list.",
  successBody: "We'll email you the moment we launch.",
};
