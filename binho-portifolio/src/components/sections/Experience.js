import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const Experience = () => {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
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
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Card 1 (Largo) */}
        <motion.div 
          className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end lg:col-span-2 relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">{t('experience.card1_title')}</h4>
            <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
              {isPt ? (
                <>Criei apps para fazer a grana render em uma <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">gigante global do setor financeiro</span> e até conversei com bots no app do <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Banco Next/Bradesco</span>.</>
              ) : (
                <>Built apps to make money grow for a <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">global financial giant</span> and even chatted with bots on the <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Next/Bradesco Bank</span> app.</>
              )}
            </p>
          </div>
        </motion.div>

        {/* Card 2 (Quadrado) */}
        <motion.div 
          className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">{t('experience.card2_title')}</h4>
            <p className="text-zinc-600 dark:text-secondary font-light transition-colors duration-500">
              {isPt ? (
                <>Fiz parte do time que fez os apps do <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Burger King, Tim Hortons e Popeyes</span> chegarem no seu celular de forma rápida e deliciosa.</>
              ) : (
                <>Part of the team that brought <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Burger King, Tim Hortons, and Popeyes</span> apps to your phone quickly and deliciously.</>
              )}
            </p>
          </div>
        </motion.div>

        {/* Card 3 (Quadrado/Largo dependendo do breakpoint) */}
        <motion.div 
          className="glass glass-hover rounded-3xl p-8 flex flex-col justify-end lg:col-span-3 relative overflow-hidden group min-h-[250px]"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 md:w-2/3">
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">{t('experience.card3_title')}</h4>
            <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
              {isPt ? (
                <>Desenvolvi soluções bacanas para a <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Coca-Cola</span>, ajudei pessoas a parar de fumar com o app da <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">J&J (Nicorette)</span> e brinquei com maquininhas Android diferentonas.</>
              ) : (
                <>Developed cool solutions for <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Coca-Cola</span>, helped people quit smoking with the <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">J&J (Nicorette)</span> app, and played around with unique Android payment terminals.</>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
