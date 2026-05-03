import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../data/content';
import { useLanguage } from '../../i18n/LanguageContext';

const TechStack = () => {
  const { t, language } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="tech-stack" className="py-24 px-6 relative max-w-4xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-sm font-bold tracking-widest text-accent uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {t('tech_stack.section_title')}
        </motion.h2>

        <motion.h3 
          className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t('tech_stack.title')}
        </motion.h3>
        
        <motion.p 
          className="text-lg text-zinc-600 dark:text-zinc-400 font-light transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('tech_stack.subtitle')}
        </motion.p>
      </div>

      <motion.div 
        className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05 }
          }
        }}
      >
        {skills.map((skill, index) => {
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <motion.button
              key={index}
              onClick={() => setSelectedSkill(isSelected ? null : skill)}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              className={`px-6 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
                isSelected 
                  ? 'bg-accent text-zinc-900 shadow-[0_0_20px_rgba(74,222,128,0.4)] border-accent' 
                  : 'glass text-zinc-800 dark:text-primary hover:border-accent/50 cursor-pointer'
              }`}
            >
              {skill.name}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {selectedSkill && (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden"
            >
              <div className="p-8 mt-4 rounded-3xl glass border border-accent/20 bg-white/50 dark:bg-white/5 text-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-500 relative z-10">
                  {selectedSkill.name}
                </h4>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light leading-relaxed transition-colors duration-500 relative z-10">
                  {language === 'pt' ? selectedSkill.pt : selectedSkill.en}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;