/**
 * SeamDivider
 * ---------------------------------------------------------------------------
 * The page's recurring signature motif: a hand-drawn-feeling crack that runs
 * the width of the section, standing in for the "scar" language in the
 * brand's own copy. Every section boundary uses the same jagged line so the
 * seam reads as intentional structure, not a stock <hr>.
 *
 * `label` is optional micro-copy set into the crack, mirroring the small
 * caption text on the poster (e.g. "STORIES WOVEN. PURPOSE WORN.").
 */
export default function SeamDivider({ label, className = '' }) {
  return (
    <div className={`relative w-full select-none ${className}`} aria-hidden={label ? undefined : true}>
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-6 md:h-10"
      >
        <path
          d="M0 20 L120 18 L180 26 L240 14 L310 22 L400 10 L470 24 L560 16
             L640 28 L720 12 L810 20 L900 8 L980 24 L1060 14 L1140 22 L1200 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-champagne-muted/60"
        />
      </svg>
      {label && (
        <span
          className="absolute inset-x-0 -top-2 mx-auto w-fit px-4 bg-ink text-[10px] md:text-xs
                     tracking-widest2 text-ash uppercase"
        >
          {label}
        </span>
      )}
    </div>
  );
}
