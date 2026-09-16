import { brand } from '../data/content.js';

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.3 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.3-3.8-8.5S9.5 5.8 12 3.5Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display tracking-widest2 text-sm text-bone">{brand.name}</p>

        <div className="flex items-center gap-6 text-ash text-sm">
          <a
            href="https://geschichte.co"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-champagne transition-colors"
          >
            <GlobeIcon className="w-4 h-4" />
            geschichte
          </a>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-champagne transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
            {brand.instagram}
          </a>
        </div>

        <p className="text-xs text-ash/70">
          &copy; {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
