import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { safeStorage } from '../../utils/safeStorage';

const STORAGE_KEY = 'theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const saved = safeStorage.get(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Circular reveal no toggle de tema
const swapTheme = (e, applyChange) => {
  const supports =
    typeof document !== 'undefined' &&
    typeof document.startViewTransition === 'function';
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  const transition = document.startViewTransition(() => {
    flushSync(() => {
      applyChange();
    });
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
    .catch(() => {
      /* fallback already applied */
    });
};

/**
 * Dock flutuante consolidada: tema (light/dark) + idioma (pt/en).
 *  - Mobile: bottom-center, horizontal (junto da BackgroundMusic via bottom-bar).
 *  - Desktop: left-center vertical.
 *  - Touch targets ≥40px no mobile.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const { language, toggleLanguage } = useLanguage();
  const isFirstRender = useRef(true);

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
    swapTheme(e, () => {
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      setTheme(next);
    });
  };

  const isDark = theme === 'dark';
  const isPt = language === 'pt';

  return (
    <div
      role="toolbar"
      aria-label="Preferências de tema e idioma"
      className="fixed z-40 flex items-center transition-all duration-slow ease-apple
        bottom-5 left-1/2 -translate-x-1/2 flex-row gap-1 p-1
        bg-surface-1/80 backdrop-blur-nav border border-border-default rounded-pill shadow-elevated
        md:bottom-auto md:top-1/2 md:left-5 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:gap-1 md:p-1"
    >
      {/* IDIOMA */}
      <div className="flex md:flex-col gap-0.5">
        <motion.button
          type="button"
          onClick={() => !isPt && toggleLanguage()}
          aria-pressed={isPt}
          aria-label="Português"
          whileTap={{ scale: 0.94 }}
          className={`min-w-[40px] min-h-[40px] px-3 rounded-full text-caption font-mono font-medium uppercase tracking-widest transition-colors duration-base ease-apple ${
            isPt
              ? 'bg-primary/[0.10] text-primary'
              : 'text-muted hover:text-secondary hover:bg-primary/[0.04]'
          }`}
        >
          pt
        </motion.button>
        <motion.button
          type="button"
          onClick={() => isPt && toggleLanguage()}
          aria-pressed={!isPt}
          aria-label="English"
          whileTap={{ scale: 0.94 }}
          className={`min-w-[40px] min-h-[40px] px-3 rounded-full text-caption font-mono font-medium uppercase tracking-widest transition-colors duration-base ease-apple ${
            !isPt
              ? 'bg-primary/[0.10] text-primary'
              : 'text-muted hover:text-secondary hover:bg-primary/[0.04]'
          }`}
        >
          en
        </motion.button>
      </div>

      <div
        className="bg-border-default rounded-full mx-1 md:mx-0 md:my-1 w-px h-5 md:w-5 md:h-px"
        aria-hidden="true"
      />

      {/* TEMA */}
      <div className="flex md:flex-col gap-0.5">
        <motion.button
          type="button"
          onClick={(e) => setThemeAnimated(e, 'light')}
          aria-pressed={!isDark}
          aria-label="Tema claro"
          whileTap={{ scale: 0.94 }}
          className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-colors duration-base ease-apple ${
            !isDark
              ? 'bg-primary/[0.10] text-primary'
              : 'text-muted hover:text-secondary hover:bg-primary/[0.04]'
          }`}
        >
          <Sun className="w-4 h-4" aria-hidden="true" />
        </motion.button>
        <motion.button
          type="button"
          onClick={(e) => setThemeAnimated(e, 'dark')}
          aria-pressed={isDark}
          aria-label="Tema escuro"
          whileTap={{ scale: 0.94 }}
          className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-colors duration-base ease-apple ${
            isDark
              ? 'bg-primary/[0.10] text-primary'
              : 'text-muted hover:text-secondary hover:bg-primary/[0.04]'
          }`}
        >
          <Moon className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  );
}
