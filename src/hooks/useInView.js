import { useEffect, useRef, useState } from 'react';

/**
 * useInView(options?)
 * ---------------------------------------------------------------------------
 * Returns a [ref, inView] tuple. Once the attached element scrolls into the
 * viewport it fires once and unobserves — giving a clean "entrance" effect
 * without re-triggering on scroll back up.
 *
 * Usage:
 *   const [ref, inView] = useInView();
 *   <div ref={ref} className={inView ? 'opacity-100 ...' : 'opacity-0 ...'}>
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduced-motion: skip the animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px', ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}
