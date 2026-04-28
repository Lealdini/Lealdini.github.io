import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-10 bg-zinc-50/80 dark:bg-black/20 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 rounded-full py-8 px-2 shadow-sm transition-colors duration-500">
      
      <motion.span
        onClick={() => setTheme('light')}
        animate={{
          filter: isDark ? 'blur(2px)' : 'blur(0px)',
          opacity: isDark ? 0.4 : 1,
          scale: isDark ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="-rotate-90 text-zinc-900 dark:text-zinc-100 font-mono text-sm tracking-widest cursor-pointer select-none origin-center transition-colors duration-500"
      >
        light
      </motion.span>

      <div className="w-[1px] h-6 bg-zinc-400/50 dark:bg-zinc-600/50 rounded-full transition-colors duration-500" />

      <motion.span
        onClick={() => setTheme('dark')}
        animate={{
          filter: !isDark ? 'blur(2px)' : 'blur(0px)',
          opacity: !isDark ? 0.4 : 1,
          scale: !isDark ? 0.9 : 1.05,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="-rotate-90 text-zinc-900 dark:text-zinc-100 font-mono text-sm tracking-widest cursor-pointer select-none origin-center transition-colors duration-500"
      >
        night
      </motion.span>

    </div>
  );
}