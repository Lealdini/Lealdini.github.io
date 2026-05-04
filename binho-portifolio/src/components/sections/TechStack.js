import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';
import { skills } from '../../data/content';
import { useLanguage } from '../../i18n/LanguageContext';

const easeApple = [0.16, 1, 0.3, 1];

const TechStack = () => {
  const { t, language } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <Section id="tech-stack" width="narrow" ariaLabel={t('tech_stack.section_title')}>
      <div className="text-center mb-12 md:mb-14">
        <motion.h2
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: easeApple }}
        >
          {t('tech_stack.section_title')}
        </motion.h2>

        <motion.h3
          className="text-h2 md:text-h1 font-semibold text-primary tracking-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeApple }}
        >
          {t('tech_stack.title')}
        </motion.h3>

        <motion.p
          className="text-body-lg text-secondary max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeApple }}
        >
          {t('tech_stack.subtitle')}
        </motion.p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-2 md:gap-2.5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.04 } },
        }}
        role="tablist"
        aria-label={t('tech_stack.title')}
      >
        {skills.map((skill) => {
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <motion.button
              key={skill.name}
              type="button"
              onClick={() => setSelectedSkill(isSelected ? null : skill)}
              role="tab"
              aria-selected={isSelected}
              aria-controls="tech-stack-detail"
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeApple } },
              }}
              className={`min-h-[44px] px-5 py-2.5 rounded-pill font-medium text-small tracking-tight transition-all duration-base ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                isSelected
                  ? 'bg-accent text-white shadow-glow-soft border border-accent'
                  : 'bg-primary/[0.04] text-primary border border-border-default hover:bg-primary/[0.08] hover:border-border-strong'
              }`}
            >
              {skill.name}
            </motion.button>
          );
        })}
      </motion.div>

      <div id="tech-stack-detail" className="w-full flex justify-center mt-6">
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.3, ease: easeApple }}
              className="w-full overflow-hidden"
            >
              <div className="p-6 md:p-8 mt-2 rounded-2xl bg-surface-1 border border-accent/20 text-center shadow-card relative overflow-hidden">
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent" />
                <h4 className="text-h4 font-semibold text-primary mb-3 relative z-10">
                  {selectedSkill.name}
                </h4>
                <p className="text-body text-secondary leading-relaxed relative z-10">
                  {language === 'pt' ? selectedSkill.pt : selectedSkill.en}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default TechStack;
