import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import ParallaxBackground from '../ui/ParallaxBackground';
import Container from '../ui/Container';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

// Easing referência Apple/iOS
const easeApple = [0.16, 1, 0.3, 1];

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-label="Introdução"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 pb-12 md:py-24"
    >
      <ParallaxBackground />

      <Container className="relative z-10">
        {/*
          Mobile: ordem natural — chip → título → subtítulo → CTAs → portrait (last).
          Desktop (md+): grid 2 colunas com texto à esquerda e portrait à direita.
        */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_auto] gap-10 md:gap-16 items-center">
          {/* TEXT BLOCK */}
          <div className="text-center md:text-left order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeApple }}
              className="mb-5 md:mb-6 inline-flex"
            >
              <Badge variant="accent" size="md" dot>
                <span className="text-accent">{t('hero.available')}</span>
              </Badge>
            </motion.div>

            <motion.h1
              className="text-h1 md:text-display font-semibold text-primary leading-[1.05] tracking-tight mb-5 md:mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeApple }}
              style={{ textWrap: 'balance' }}
            >
              {t('hero.title1')}
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-primary to-muted">
                {t('hero.title2')}
              </span>
            </motion.h1>

            <motion.p
              className="text-body-lg md:text-lead text-secondary max-w-xl mx-auto md:mx-0 mb-8 md:mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeApple }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeApple }}
            >
              <Button
                href="#code"
                variant="primary"
                size="lg"
                pill
                className="group"
              >
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4 transition-transform duration-base ease-apple group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
              <Button
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                pill
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                {t('hero.download_cv')}
              </Button>
            </motion.div>

            {/* Indicador sutil removido */}
          </div>

          {/* PORTRAIT */}
          <motion.div
            className="order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeApple }}
          >
            <div className="relative group">
              {/* Halo sutil (só dark) */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-slow ease-apple"
              />
              {/* Borda accent que pulsa muito sutilmente */}
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-accent/10 opacity-60"
              />
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/binho-512.webp 512w, /images/binho-768.webp 768w, /images/binho-1024.webp 1024w"
                  sizes="(max-width: 768px) 200px, 320px"
                />
                <img
                  src="/images/binho-768.jpg"
                  srcSet="/images/binho-512.jpg 512w, /images/binho-768.jpg 768w, /images/binho.jpg 1024w"
                  sizes="(max-width: 768px) 200px, 320px"
                  alt={t('hero.portrait_alt')}
                  width="320"
                  height="320"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="relative w-[200px] h-[200px] md:w-[320px] md:h-[320px] object-cover rounded-[2rem] grayscale contrast-110 shadow-elevated ring-1 ring-border-default"
                />
              </picture>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
