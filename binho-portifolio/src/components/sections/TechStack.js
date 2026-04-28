import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/content';

const TechStack = () => {
  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-sm font-bold tracking-widest text-accent uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Especificações Técnicas
        </motion.h2>
      </div>

      <motion.div 
        className="flex flex-wrap justify-center gap-4 md:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
            }}
            className="px-6 py-3 glass rounded-full text-zinc-800 dark:text-primary font-medium tracking-wide hover:border-accent/50 transition-all duration-300 cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;
