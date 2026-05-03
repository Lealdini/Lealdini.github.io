import React from 'react';
import { motion } from 'framer-motion';
import ParallaxBackground from '../ui/ParallaxBackground';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParallaxBackground />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Engenharia de precisão.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 dark:from-white to-zinc-400 dark:to-gray-500">
            Liderança que inspira.
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-2xl text-zinc-600 dark:text-secondary font-light mb-12 transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Fábio Lealdini. Senior Android Engineer & Tech Lead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a href="#code" className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-emerald-500/50 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <button className="relative px-8 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/20 rounded-full text-zinc-900 dark:text-white font-medium text-lg tracking-wide hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              Explore o Código
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
