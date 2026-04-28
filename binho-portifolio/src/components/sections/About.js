import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="code" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8">
            O Processador
          </h2>
          <p className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-700 dark:text-primary leading-snug md:leading-tight transition-colors duration-500">
            7 anos construindo o mercado mobile. Da linha de código à liderança de squads de alto desempenho em empresas como <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">CI&T</span>, <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">IBM</span> e <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">Venturus</span>. Foco em arquitetura escalável e nativo (Kotlin/Java).
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
