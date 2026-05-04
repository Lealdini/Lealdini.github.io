import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

// Curtain that paints "Lealdini." letter-by-letter, then fades out and
// gets out of the user's way. Skipped entirely on reduced-motion or after
// first session (sessionStorage), so a returning user isn't gated again.
const NAME = 'Lealdini.';
const STORAGE_KEY = 'binho:boot-shown';

const BootIntro = () => {
  const reduce = usePrefersReducedMotion();
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (reduce) return false;
    try {
      return window.sessionStorage.getItem(STORAGE_KEY) !== '1';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return undefined;
    const total = NAME.length * 70 + 900; // approx end of last letter + breath
    const id = setTimeout(() => {
      try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* noop */ }
      setShow(false);
    }, total);
    return () => clearTimeout(id);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        >
          <span className="text-4xl md:text-6xl font-semibold tracking-tight text-primary flex">
            {NAME.split('').map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={ch === '.' ? 'text-accent' : ''}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootIntro;
