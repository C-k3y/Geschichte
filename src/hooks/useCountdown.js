import { useEffect, useState } from 'react';

/**
 * useCountdown(targetIso)
 * ---------------------------------------------------------------------------
 * Ticks down to a target ISO date and returns whole days/hours/minutes/
 * seconds remaining, plus `isComplete`. Pulled out of the Countdown UI
 * component so the same timer logic can drive other future surfaces (e.g. a
 * banner, an email-gated modal) without duplicating the interval logic.
 */
export function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime();
  const [remaining, setRemaining] = useState(() => Math.max(target - Date.now(), 0));

  useEffect(() => {
    const tick = () => setRemaining(Math.max(target - Date.now(), 0));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds, isComplete: remaining <= 0 };
}
