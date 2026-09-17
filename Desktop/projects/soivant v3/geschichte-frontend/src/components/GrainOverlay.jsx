/**
 * GrainOverlay
 * ---------------------------------------------------------------------------
 * A fixed, pointer-events-none noise layer that gives the near-black
 * background the same worn, textured quality as the weathered type in the
 * reference poster, instead of a flat digital black. Kept as its own
 * component so it can be toggled per-section or dropped entirely if a future
 * redesign wants a cleaner ground.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-grain opacity-[0.05] mix-blend-overlay"
    />
  );
}
