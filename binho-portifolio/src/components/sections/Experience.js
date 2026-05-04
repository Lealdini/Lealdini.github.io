import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Users, Sparkles } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import { useLanguage } from '../../i18n/LanguageContext';
import Trans from '../../i18n/Trans';

const easeApple = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeApple } },
};

const HighlightSpan = (
  <span className="text-primary font-medium" />
);

const Experience = () => {
  const { t } = useLanguage();

  return (
    <Section id="experience" width="page" ariaLabel={t('experience.section_title')}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: easeApple }}
        className="mb-12 md:mb-16 text-center md:text-left"
      >
        <h2 className="eyebrow mb-4">{t('experience.section_title')}</h2>
        <h3 className="text-h2 md:text-h1 font-semibold text-primary tracking-tight max-w-3xl">
          {t('experience.title')}
        </h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Card 1 — wide (cobre 2 colunas no desktop) */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Card variant="elevated" className="group h-full p-7 md:p-8 flex flex-col justify-between min-h-[260px]">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-subtle text-accent border border-accent/20">
                <Smartphone className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="eyebrow text-muted">01</span>
            </div>
            <div>
              <h4 className="text-h4 md:text-h3 font-semibold text-primary mb-3">
                {t('experience.card1_title')}
              </h4>
              <p className="text-body md:text-body-lg text-secondary leading-relaxed">
                <Trans i18nKey="experience.card1_text" components={[HighlightSpan, HighlightSpan]} />
              </p>
            </div>
            {/* Hover overlay accent — sutil */}
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-slow ease-apple group-hover:opacity-100" />
          </Card>
        </motion.div>

        {/* Card 2 — square */}
        <motion.div variants={itemVariants}>
          <Card variant="elevated" className="group h-full p-7 md:p-8 flex flex-col justify-between min-h-[260px]">
            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-info/10 text-info border border-info/20">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="eyebrow text-muted">02</span>
            </div>
            <div>
              <h4 className="text-h4 font-semibold text-primary mb-3">
                {t('experience.card2_title')}
              </h4>
              <p className="text-body text-secondary leading-relaxed">
                <Trans i18nKey="experience.card2_text" components={[HighlightSpan]} />
              </p>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-info/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-slow ease-apple group-hover:opacity-100" />
          </Card>
        </motion.div>

        {/* Card 3 — full width */}
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <Card variant="elevated" className="group h-full p-7 md:p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-subtle text-accent border border-accent/20">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="eyebrow text-muted">03</span>
            </div>
            <div className="md:max-w-3xl">
              <h4 className="text-h4 md:text-h3 font-semibold text-primary mb-3">
                {t('experience.card3_title')}
              </h4>
              <p className="text-body md:text-body-lg text-secondary leading-relaxed">
                <Trans i18nKey="experience.card3_text" components={[HighlightSpan, HighlightSpan]} />
              </p>
            </div>
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-accent/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-slow ease-apple group-hover:opacity-100" />
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Experience;
