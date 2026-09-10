import { waitlistCopy } from '../data/content.js';
import WaitlistForm from './WaitlistForm.jsx';
import { useInView } from '../hooks/useInView.js';

/**
 * WaitlistSection
 * ---------------------------------------------------------------------------
 * Shown during the pre-launch countdown. Passes all copy down from content.js
 * so marketing can update everything from one file.
 *
 * `submitToWaitlist` has been moved into WaitlistForm itself, driven by the
 * VITE_FORMSPREE_ID environment variable. Swap to a real backend endpoint
 * by updating the fetch() URL inside WaitlistForm.jsx — nothing here changes.
 */
export default function WaitlistSection() {
  const [ref, inView] = useInView();

  return (
    <section id="waitlist" className="relative py-24 md:py-32 bg-charcoal">
      <div
        ref={ref}
        className={`mx-auto max-w-2xl px-6 md:px-10 text-center flex flex-col items-center
                    transition-all duration-700
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <p className="text-xs tracking-widest3 uppercase text-champagne">{waitlistCopy.eyebrow}</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-bone">{waitlistCopy.heading}</h2>
        <p className="mt-4 text-sm md:text-base text-ash max-w-md">{waitlistCopy.body}</p>

        <div className="mt-10 flex justify-center">
          <WaitlistForm
            ctaLabel={waitlistCopy.ctaLabel}
            successHeading={waitlistCopy.successHeading}
            successBody={waitlistCopy.successBody}
          />
        </div>
      </div>
    </section>
  );
}
