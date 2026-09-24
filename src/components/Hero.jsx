import { brand, launchDate, waitlistCopy, liveCopy } from '../data/content.js';
import Countdown from './Countdown.jsx';
import SeamDivider from './SeamDivider.jsx';

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Pre-launch mode (`isLive = false`): classic "Coming Soon" layout with
 * countdown and waitlist CTA.
 *
 * Post-launch mode (`isLive = true`): a full-bleed "We're Live" headline
 * whose CTA scrolls straight to the in-page Shop (#shop) — the shop lives
 * on this same page now, no external domain required.
 */
export default function Hero({ isLive }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* Oversized ghost monogram */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 font-display text-[38vw] leading-none
                   text-white/[0.025] select-none"
      >
        G
      </span>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 flex flex-col items-center text-center">
        <p className="animate-fadeUp text-xs md:text-sm tracking-widest3 uppercase text-ash">
          {brand.name}
        </p>
        <p
          className="animate-fadeUp mt-2 font-display italic text-champagne text-sm md:text-base"
          style={{ animationDelay: '90ms' }}
        >
          {brand.tagline}
        </p>

        {isLive ? (
          /* ---- LIVE STATE ---- */
          <>
            <h1
              className="animate-fadeUp mt-10 font-display font-medium text-[13vw] sm:text-7xl md:text-8xl
                         lg:text-[8rem] leading-[0.9] stone-fill"
              style={{ animationDelay: '160ms' }}
            >
              {liveCopy.heading.split(' ').slice(0, -1).join(' ')}
              <br />
              <span className="font-script italic normal-case text-champagne-bright inline-block -my-2 md:-my-4">
                {liveCopy.heading.split(' ').pop()}
              </span>
            </h1>

            <p
              className="animate-fadeUp mt-6 text-sm md:text-base text-ash max-w-sm leading-relaxed"
              style={{ animationDelay: '230ms' }}
            >
              {liveCopy.body}
            </p>

            <div
              className="animate-fadeUp mt-10 flex flex-col sm:flex-row items-center gap-4"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#shop"
                className="inline-block bg-champagne text-ink text-xs tracking-widest2 uppercase
                           font-medium px-10 py-4 hover:bg-champagne-bright transition-colors"
              >
                {liveCopy.ctaLabel}
              </a>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs tracking-widest2 uppercase text-champagne-muted hover:text-champagne transition-colors"
              >
                {liveCopy.secondaryLabel}
              </a>
            </div>
          </>
        ) : (
          /* ---- PRE-LAUNCH STATE ---- */
          <>
            <h1
              className="animate-fadeUp mt-10 font-display font-medium text-[15vw] sm:text-7xl md:text-8xl
                         lg:text-[8rem] leading-[0.9] stone-fill"
              style={{ animationDelay: '160ms' }}
            >
              Coming
              <br />
              <span className="font-script italic normal-case text-champagne-bright inline-block -my-2 md:-my-4">
                Soon
              </span>
            </h1>

            <div
              className="animate-fadeUp mt-8 md:mt-10 flex items-center gap-4 md:gap-6 w-full max-w-md"
              style={{ animationDelay: '230ms' }}
            >
              <span className="h-px flex-1 bg-champagne-muted/50" />
              <h2 className="font-display text-lg md:text-2xl tracking-wide text-bone whitespace-nowrap">
                {brand.lineLabel}
              </h2>
              <span className="h-px flex-1 bg-champagne-muted/50" />
            </div>

            <p
              className="animate-fadeUp mt-4 text-xs md:text-sm tracking-widest2 uppercase text-ash"
              style={{ animationDelay: '300ms' }}
            >
              {brand.strapline}
            </p>

            <div className="animate-fadeUp mt-12" style={{ animationDelay: '380ms' }}>
              <Countdown targetIso={launchDate} />
            </div>

            <div
              className="animate-fadeUp mt-12 flex flex-col items-center gap-3"
              style={{ animationDelay: '450ms' }}
            >
              <span className="text-[11px] tracking-widest2 uppercase text-ash">
                {waitlistCopy.eyebrow} · stay tuned
              </span>
              <a
                href="#waitlist"
                className="inline-block bg-champagne text-ink text-xs tracking-widest2 uppercase
                           font-medium px-8 py-3.5 hover:bg-champagne-bright transition-colors"
              >
                {waitlistCopy.ctaLabel}
              </a>
            </div>
          </>
        )}
      </div>

      <div className="mt-20 md:mt-28 px-6 md:px-10">
        <SeamDivider label={brand.strapline} />
      </div>
    </section>
  );
}
