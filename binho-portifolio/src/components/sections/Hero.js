import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '../ui/ParallaxBackground';
import { useLanguage } from '../../i18n/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxBackground />

      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
          {/* TEXT BLOCK */}
          <div className="text-center md:text-left order-2 md:order-1">
            {/* Available chip */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <span className="relative inline-flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-accent" />
              </span>
              <span className="text-xs font-medium tracking-wide text-zinc-700 dark:text-zinc-200">
                {t('hero.available')}
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                {t('hero.download_cv')}
              </a>
            </motion.div>
          </div>

          {/* PORTRAIT */}
          <motion.div
            className="order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative group">
              {/* Soft accent halo */}
              <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-emerald-500/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/binho-512.webp 512w, /images/binho-768.webp 768w, /images/binho-1024.webp 1024w"
                  sizes="(max-width: 768px) 220px, 320px"
                />
                <img
                  src="/images/binho-768.jpg"
                  srcSet="/images/binho-512.jpg 512w, /images/binho-768.jpg 768w, /images/binho.jpg 1024w"
                  sizes="(max-width: 768px) 220px, 320px"
                  alt={t('hero.portrait_alt')}
                  width="320"
                  height="320"
                  loading="eager"
                  decoding="async"
                  className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] object-cover rounded-[2rem] grayscale contrast-110 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-zinc-200/60 dark:ring-white/10"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
