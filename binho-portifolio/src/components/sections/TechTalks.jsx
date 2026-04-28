import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Presentation, Download, Eye } from 'lucide-react';
import SlideViewer from '../ui/SlideViewer';
import { talksData } from '../../data/content';

const TechTalks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePDF, setActivePDF] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4 transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Visão & Liderança
        </motion.h2>
        <motion.p 
          className="text-lg text-zinc-600 dark:text-gray-400 font-light max-w-3xl mx-auto transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
        >
          Apaixonado por formar e mentorar novos engenheiros, impulsionar a melhoria contínua de <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">UI/UX</span> e engajado em iniciativas <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">ESG</span> para construir um futuro sustentável na tecnologia.
        </motion.p>
      </div>

      <motion.div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {talksData.map((talk) => (
          <motion.div
            key={talk.id}
            variants={cardVariants}
            className="flex flex-col rounded-3xl overflow-hidden glass glass-hover cursor-pointer group"
            onClick={() => setActivePDF(talk.file)}
          >
            {/* Capa */}
            <div className={`h-48 bg-gradient-to-br ${talk.gradient} flex items-center justify-center relative`}>
              <Presentation className="w-16 h-16 text-zinc-900/50 dark:text-white/50 group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            {/* Conteúdo */}
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-xs font-bold tracking-widest text-accent uppercase mb-3 block">
                {talk.tag}
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-500">
                {talk.title}
              </h3>
              <p className="text-zinc-600 dark:text-gray-400 font-light mb-8 flex-grow transition-colors duration-500">
                {talk.description}
              </p>
              
              <div className="mt-auto flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePDF(talk.file);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  <span>Ver Slides</span>
                </button>
                <a 
                  href={talk.file}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full text-zinc-900 dark:text-white font-medium hover:bg-white/80 dark:hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Slide Viewer Modal */}
      <SlideViewer 
        pdfUrl={activePDF} 
        onClose={() => setActivePDF(null)} 
      />
    </section>
  );
};

export default TechTalks;