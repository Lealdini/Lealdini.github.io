import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Code2, Database, BrainCircuit } from 'lucide-react';

const LabSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          R&D Lab
        </motion.h2>
        <motion.p 
          className="text-lg text-zinc-600 dark:text-gray-400 font-light max-w-3xl mx-auto transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
        >
          Explorando a fronteira entre <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">Inteligência Artificial</span> e <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">Engenharia de Software</span>.
        </motion.p>
      </div>

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative group rounded-[2rem] p-[1px] overflow-hidden"
      >
        {/* Border beam effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent -translate-x-full group-hover:animate-border-beam opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative w-full glass bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 transition-colors duration-500 z-10">
          
          <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-64 bg-gradient-to-br from-indigo-500/20 to-purple-900/20 rounded-3xl flex items-center justify-center border border-indigo-500/10">
             <BrainCircuit className="w-24 h-24 text-indigo-500/50 dark:text-indigo-400/50" />
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Destaque
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-500">
              Oracle.Ai
            </h3>
            <p className="text-zinc-600 dark:text-gray-400 font-light text-lg mb-8 transition-colors duration-500 leading-relaxed">
              Um aplicativo construído com <strong className="font-medium text-zinc-900 dark:text-white transition-colors duration-500">Kotlin Multiplatform (KMP)</strong> que se integra nativamente à <strong className="font-medium text-zinc-900 dark:text-white transition-colors duration-500">API do Gemini</strong>. O Oracle.Ai oferece leituras de Tarot personalizadas, unindo misticismo e inteligência artificial generativa em uma interface fluida, moderna e responsiva.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-auto">
              <span className="px-5 py-2.5 text-sm bg-zinc-200/50 dark:bg-white/5 text-zinc-800 dark:text-gray-200 rounded-full border border-zinc-300/50 dark:border-white/10 flex items-center gap-2 transition-colors duration-500 font-medium hover:bg-zinc-300/50 dark:hover:bg-white/10">
                <Code2 className="w-4 h-4" /> KMP
              </span>
              <span className="px-5 py-2.5 text-sm bg-zinc-200/50 dark:bg-white/5 text-zinc-800 dark:text-gray-200 rounded-full border border-zinc-300/50 dark:border-white/10 flex items-center gap-2 transition-colors duration-500 font-medium hover:bg-zinc-300/50 dark:hover:bg-white/10">
                <Database className="w-4 h-4" /> Gemini API
              </span>
            </div>
          </div>
          
        </div>
      </motion.div>
    </section>
  );
};

export default LabSection;