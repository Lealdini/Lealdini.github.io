import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isDark = theme === 'dark';
  const isPt = language === 'pt';

  return (
    <div className="fixed z-50 flex items-center justify-center transition-all duration-500 rounded-full backdrop-blur-xl border shadow-lg
      bottom-6 left-1/2 -translate-x-1/2 flex-row gap-4 py-3 px-6
      bg-white/70 dark:bg-zinc-900/60 border-zinc-200/60 dark:border-white/10
      md:bottom-auto md:top-1/2 md:left-6 md:-translate-x-0 md:-translate-y-1/2 md:flex-col md:py-6 md:px-3"
    >
      {/* LANGUAGE TOGGLE */}
      <motion.span
        onClick={() => !isPt && toggleLanguage()}
        animate={{
          filter: !isPt ? 'blur(2px)' : 'blur(0px)',
          opacity: !isPt ? 0.4 : 1,
          scale: !isPt ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="rotate-0 md:-rotate-90 text-zinc-800 dark:text-zinc-200 font-mono text-xs md:text-[10px] uppercase tracking-widest cursor-pointer select-none origin-center transition-colors duration-500 md:mb-2 md:mt-2"
      >
        pt
      </motion.span>
      
      <div className="bg-zinc-400/50 dark:bg-zinc-600/50 rounded-full transition-all duration-500 w-[1px] h-3 md:w-3 md:h-[1px]" />
      
      <motion.span
        onClick={() => isPt && toggleLanguage()}
        animate={{
          filter: isPt ? 'blur(2px)' : 'blur(0px)',
          opacity: isPt ? 0.4 : 1,
          scale: isPt ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="rotate-0 md:-rotate-90 text-zinc-800 dark:text-zinc-200 font-mono text-xs md:text-[10px] uppercase tracking-widest cursor-pointer select-none origin-center transition-colors duration-500 md:mb-2 md:mt-2"
      >
        en
      </motion.span>

      {/* SEPARATOR BETWEEN LANG AND THEME */}
      <div className="bg-zinc-300 dark:bg-zinc-700 transition-all duration-500 w-[2px] h-5 md:w-5 md:h-[2px] mx-1 md:my-1" />

      {/* THEME TOGGLE */}
      <motion.span
        onClick={() => setTheme('light')}
        animate={{
          filter: isDark ? 'blur(2px)' : 'blur(0px)',
          opacity: isDark ? 0.4 : 1,
          scale: isDark ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="rotate-0 md:-rotate-90 text-zinc-800 dark:text-zinc-200 font-mono text-xs md:text-[10px] uppercase tracking-widest cursor-pointer select-none origin-center transition-colors duration-500 md:mb-2 md:mt-2"
      >
        light
      </motion.span>

      <div className="bg-zinc-400/50 dark:bg-zinc-600/50 rounded-full transition-all duration-500 w-[1px] h-3 md:w-3 md:h-[1px]" />

      <motion.span
        onClick={() => setTheme('dark')}
        animate={{
          filter: !isDark ? 'blur(2px)' : 'blur(0px)',
          opacity: !isDark ? 0.4 : 1,
          scale: !isDark ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="rotate-0 md:-rotate-90 text-zinc-800 dark:text-zinc-200 font-mono text-xs md:text-[10px] uppercase tracking-widest cursor-pointer select-none origin-center transition-colors duration-500 md:mb-2 md:mt-2"
      >
        night
      </motion.span>

    </div>
  );
}
