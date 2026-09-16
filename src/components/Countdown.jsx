import { useCountdown } from '../hooks/useCountdown.js';

const UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hrs' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
];

/**
 * Countdown
 * ---------------------------------------------------------------------------
 * Renders the time remaining to `targetIso` as four stitched-patch digit
 * blocks. Falls back to a quiet "live now" state once the timer completes,
 * rather than showing negative numbers or freezing at zero.
 */
export default function Countdown({ targetIso }) {
  const time = useCountdown(targetIso);

  if (time.isComplete) {
    return (
      <p className="font-display italic text-champagne-bright text-lg tracking-wide">
        GESCHICHTE is live.
      </p>
    );
  }

  return (
    <div className="flex gap-3 md:gap-4" role="timer" aria-live="polite" aria-atomic="true">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="stitch-card w-16 md:w-20 py-3 md:py-4 flex flex-col items-center gap-1"
        >
          <span className="font-display text-2xl md:text-3xl text-bone tabular-nums">
            {String(time[unit.key]).padStart(2, '0')}
          </span>
          <span className="text-[10px] tracking-widest2 uppercase text-ash">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
