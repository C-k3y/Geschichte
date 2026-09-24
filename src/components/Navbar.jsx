import { useEffect, useRef, useState } from 'react';
import { brand, navLinks, liveNavLinks } from '../data/content.js';
import CartButton from './CartButton.jsx';

/**
 * Navbar
 * ---------------------------------------------------------------------------
 * Pre-launch: standard anchor links + "Notify me" CTA → #waitlist
 * Post-launch: links update to include #shop, CTA becomes "Shop Now" → #shop
 * (the live shop lives on this same page — see src/components/Shop.jsx)
 *
 * Mobile sheet now uses a CSS max-height transition instead of a hard toggle,
 * so it slides in/out smoothly rather than snapping.
 */
export default function Navbar({ isLive }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile sheet on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const links = isLive ? liveNavLinks : navLinks;
  const ctaLabel = isLive ? 'Shop Now' : 'Notify me';
  const ctaHref = isLive ? '#shop' : '#waitlist';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-lg md:text-xl tracking-widest2 text-bone hover:text-champagne transition-colors"
        >
          {brand.name}
        </a>

        <ul className="hidden md:flex items-center gap-10 text-xs tracking-widest2 uppercase text-ash">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-champagne transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6">
          {isLive && <CartButton />}
          <a
            href={ctaHref}
            className="text-xs tracking-widest2 uppercase border border-champagne-muted
                       px-5 py-2.5 text-champagne hover:bg-champagne hover:text-ink transition-colors"
          >
            {ctaLabel}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
        >
          <span className={`h-px bg-bone transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px bg-bone transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`h-px bg-bone transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile sheet — smooth slide via max-height transition */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${open ? 'max-h-[30rem] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-ink border-t border-white/5 px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest2 uppercase text-bone hover:text-champagne transition-colors"
            >
              {link.label}
            </a>
          ))}
          {isLive && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-sm tracking-widest2 uppercase text-bone hover:text-champagne transition-colors"
            >
              <CartButton />
              My Collection
            </button>
          )}
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="text-sm tracking-widest2 uppercase text-champagne border border-champagne-muted px-5 py-3 text-center
                       hover:bg-champagne hover:text-ink transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
