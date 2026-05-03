import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import Trans from '../../i18n/Trans';
import TiltSpotlight from '../ui/TiltSpotlight';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const HighlightSpan = (
  <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500" />
);

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center md:text-left"
      >
        <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-4">
          {t('experience.section_title')}
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight transition-colors duration-500">
          {t('experience.title')}
        </h3>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Card 1 (Wide) */}
        <motion.div className="lg:col-span-2 h-full" variants={itemVariants}>
          <TiltSpotlight className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">
                {t('experience.card1_title')}
              </h4>
              <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
                <Trans i18nKey="experience.card1_text" components={[HighlightSpan, HighlightSpan]} />
              </p>
            </div>
          </TiltSpotlight>
        </motion.div>

        {/* Card 2 (Square) */}
        <motion.div className="h-full" variants={itemVariants}>
          <TiltSpotlight className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">
                {t('experience.card2_title')}
              </h4>
              <p className="text-zinc-600 dark:text-secondary font-light transition-colors duration-500">
                <Trans i18nKey="experience.card2_text" components={[HighlightSpan]} />
              </p>
            </div>
          </TiltSpotlight>
        </motion.div>

        {/* Card 3 (Wide) */}
        <motion.div className="lg:col-span-3 min-h-[250px] h-full" variants={itemVariants}>
          <TiltSpotlight className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 md:w-2/3">
              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">
                {t('experience.card3_title')}
              </h4>
              <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
                <Trans i18nKey="experience.card3_text" components={[HighlightSpan, HighlightSpan]} />
              </p>
            </div>
          </TiltSpotlight>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
