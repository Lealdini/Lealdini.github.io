import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Returns true when the OS-level "reduce motion" accessibility preference is on.
// Components should use this to disable or tone down decorative animations.
export const usePrefersReducedMotion = () => {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mql = window.matchMedia(QUERY);
    const handler = (e) => setPrefers(e.matches);
    // Safari < 14 only supports addListener
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
    mql.addListener(handler);
    return () => mql.removeListener(handler);
  }, []);

  return prefers;
};
