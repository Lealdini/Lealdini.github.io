import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '../ui/ParallaxBackground';
import { useLanguage } from '../../i18n/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxBackground />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {t('hero.title1')}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 dark:from-white to-zinc-400 dark:to-gray-500">
            {t('hero.title2')}
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-zinc-600 dark:text-secondary font-light mb-12 transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a href="#code" className="inline-block relative group w-full sm:w-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-emerald-500/50 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <button className="relative px-8 py-4 w-full sm:w-auto bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/20 rounded-full text-zinc-900 dark:text-white font-medium text-lg tracking-wide hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              {t('hero.cta')}
            </button>
          </a>
          <a 
            href="/cv.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-4 w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors duration-300 text-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {t('hero.download_cv')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
