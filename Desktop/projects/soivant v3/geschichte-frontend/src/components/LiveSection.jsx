import { brand, liveCopy } from '../data/content.js';
import { useInView } from '../hooks/useInView.js';

/**
 * LiveSection
 * ---------------------------------------------------------------------------
 * Shown in place of WaitlistSection once the countdown hits zero. Acts as a
 * gateway to the real store — directs visitors from the landing page to the
 * live backend.
 *
 * When the backend ships:
 *  1. Update `brand.storeUrl` in data/content.js to the real store URL
 *  2. The link below will automatically point to the right place
 */
export default function LiveSection() {
  const [ref, inView] = useInView();

  return (
    <section id="shop" className="relative py-24 md:py-36 bg-charcoal overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-champagne/[0.04] blur-[120px]" />
      </div>

      <div
        ref={ref}
        className={`relative mx-auto max-w-2xl px-6 md:px-10 text-center flex flex-col items-center
                    transition-all duration-700 ease-out
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Eyebrow with pulsing dot */}
        <p className="flex items-center gap-2 text-xs tracking-widest3 uppercase text-champagne">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-champagne" />
          </span>
          {liveCopy.eyebrow}
        </p>

        <h2 className="mt-6 font-display font-medium text-5xl md:text-6xl stone-fill leading-tight">
          {liveCopy.heading}
        </h2>

        <p className="mt-3 font-display italic text-champagne-bright text-lg md:text-xl">
          {liveCopy.subheading}
        </p>

        <p className="mt-6 text-sm md:text-base text-ash max-w-sm leading-relaxed">
          {liveCopy.body}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={brand.storeUrl}
            className="inline-block bg-champagne text-ink text-xs tracking-widest2 uppercase
                       font-medium px-10 py-4 hover:bg-champagne-bright transition-colors"
          >
            {liveCopy.ctaLabel}
          </a>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs tracking-widest2 uppercase text-champagne-muted
                       hover:text-champagne transition-colors"
          >
            {liveCopy.secondaryLabel}
          </a>
        </div>

        {/* Stitched decorative rule */}
        <div className="mt-14 flex items-center gap-4 w-full max-w-xs" aria-hidden="true">
          <span className="h-px flex-1 bg-champagne-muted/30" />
          <span className="font-display italic text-champagne-muted text-xs tracking-wide">
            Geschichte
          </span>
          <span className="h-px flex-1 bg-champagne-muted/30" />
        </div>
      </div>
    </section>
  );
}
