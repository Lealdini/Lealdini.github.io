import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
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
          O Ecossistema
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight transition-colors duration-500">
          Impacto Global.
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
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">O Núcleo Financeiro</h4>
            <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
              Desenvolvimento de um aplicativo de investimentos para uma <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">gigante global do setor financeiro</span> e soluções com bot para <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Banco Next/Bradesco</span>.
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
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">Escala em Tempo Real</h4>
            <p className="text-zinc-600 dark:text-secondary font-light transition-colors duration-500">
              Aplicativos globais de Food Delivery: <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Burger King, Tim Hortons, Popeyes</span>.
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
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 transition-colors duration-500">Saúde & Varejo</h4>
            <p className="text-zinc-600 dark:text-secondary font-light text-lg transition-colors duration-500">
              Soluções integradas para <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">Coca-Cola</span> e <span className="text-zinc-900 dark:text-white font-medium transition-colors duration-500">J&J (App Nicorette)</span>, além de terminais de pagamento Android inovadores.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
