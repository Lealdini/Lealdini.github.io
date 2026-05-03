import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { safeStorage } from '../../utils/safeStorage';

const STORAGE_KEY = 'theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = safeStorage.get(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Circular reveal when toggling theme — origin is the click coordinates,
// so the new palette "blooms" out from the button the user pressed.
// Falls back gracefully on browsers without the View Transitions API,
// or when the user opted into reduced motion.
const swapTheme = (e, applyChange) => {
  const supports = typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!supports || reduce) {
    applyChange();
    return;
  }

  const x = e?.clientX ?? window.innerWidth / 2;
  const y = e?.clientY ?? window.innerHeight / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  document.documentElement.style.setProperty('--vt-x', `${x}px`);
  document.documentElement.style.setProperty('--vt-y', `${y}px`);
  document.documentElement.style.setProperty('--vt-r', `${endRadius}px`);

  const transition = document.startViewTransition(() => {
    applyChange();
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    })
    .catch(() => { /* noop — fallback already applied */ });
};

const toggleStyles =
  'rotate-0 md:-rotate-90 text-zinc-800 dark:text-zinc-200 font-mono text-xs md:text-[10px] uppercase tracking-widest cursor-pointer select-none origin-center transition-colors duration-500 md:mb-2 md:mt-2 bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { language, toggleLanguage } = useLanguage();
  const isFirstRender = useRef(true);

  // Apply the persisted theme synchronously on first mount (no transition).
  // After that, every toggle goes through swapTheme() with a circular reveal.
  useEffect(() => {
    safeStorage.set(STORAGE_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    isFirstRender.current = false;
  }, [theme]);

  const setThemeAnimated = (e, next) => {
    if (next === theme) return;
    swapTheme(e, () => setTheme(next));
  };

  const isDark = theme === 'dark';
  const isPt = language === 'pt';

  const animFor = (active) => ({
    filter: active ? 'blur(0px)' : 'blur(2px)',
    opacity: active ? 1 : 0.4,
    scale: active ? 1.05 : 0.9,
  });

  return (
    <div
      role="toolbar"
      aria-label="Theme and language preferences"
      className="fixed z-50 flex items-center justify-center transition-all duration-500 rounded-full backdrop-blur-xl border shadow-lg
        bottom-6 left-1/2 -translate-x-1/2 flex-row gap-4 py-3 px-6
        bg-white/70 dark:bg-zinc-900/60 border-zinc-200/60 dark:border-white/10
        md:bottom-auto md:top-1/2 md:left-6 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:py-6 md:px-3"
    >
      {/* LANGUAGE TOGGLE */}
      <motion.button
        type="button"
        onClick={() => !isPt && toggleLanguage()}
        aria-pressed={isPt}
        aria-label="Português"
        animate={animFor(isPt)}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={toggleStyles}
      >
        pt
      </motion.button>

      <div className="bg-zinc-400/50 dark:bg-zinc-600/50 rounded-full transition-all duration-500 w-[1px] h-3 md:w-3 md:h-[1px]" />

      <motion.button
        type="button"
        onClick={() => isPt && toggleLanguage()}
        aria-pressed={!isPt}
        aria-label="English"
        animate={animFor(!isPt)}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={toggleStyles}
      >
        en
      </motion.button>

      {/* SEPARATOR BETWEEN LANG AND THEME */}
      <div className="bg-zinc-300 dark:bg-zinc-700 transition-all duration-500 w-[2px] h-5 md:w-5 md:h-[2px] mx-1 md:my-1" aria-hidden="true" />

      {/* THEME TOGGLE */}
      <motion.button
        type="button"
        onClick={(e) => setThemeAnimated(e, 'light')}
        aria-pressed={!isDark}
        aria-label="Light theme"
        animate={animFor(!isDark)}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={toggleStyles}
      >
        light
      </motion.button>

      <div className="bg-zinc-400/50 dark:bg-zinc-600/50 rounded-full transition-all duration-500 w-[1px] h-3 md:w-3 md:h-[1px]" />

      <motion.button
        type="button"
        onClick={(e) => setThemeAnimated(e, 'dark')}
        aria-pressed={isDark}
        aria-label="Dark theme"
        animate={animFor(isDark)}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={toggleStyles}
      >
        night
      </motion.button>
    </div>
  );
}
