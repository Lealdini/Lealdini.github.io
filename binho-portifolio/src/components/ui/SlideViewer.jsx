import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SlideViewer = ({ pdfUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (pdfUrl) {
      window.addEventListener('keydown', handleKeyDown);
      // Opcional: Impedir rolagem do body quando o modal estiver aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [pdfUrl, onClose]);

  return (
    <AnimatePresence>
      {pdfUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-white/20 dark:bg-black/20 backdrop-blur-3xl transition-colors duration-500"
          onClick={onClose}
        >
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-[60] p-3 rounded-full bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
            aria-label="Fechar visualizador"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Container do Visualizador (Quick Look) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no iframe
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`} // #toolbar=0 ajuda em alguns navegadores a ter um visual mais limpo
              title="Visualizador de Slides PDF"
              className="w-full h-full border-none rounded-3xl"
              style={{ display: 'block' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideViewer;