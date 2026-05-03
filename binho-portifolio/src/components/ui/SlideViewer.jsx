import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SlideViewer = ({ pdfUrl, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (pdfUrl) {
      window.addEventListener('keydown', handleKeyDown);
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
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de slides"
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
            className="relative w-[90%] md:w-full max-w-6xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar no iframe
          >
            {/* Visualizador para Desktop */}
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
              title="Visualizador de Slides PDF"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
              className="hidden md:block w-full h-full border-none"
            />
            
            {/* Fallback elegante para Mobile (Resolve o bug de zoom de PDF em iframes no iOS/Android) */}
            <div className="md:hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-emerald-500/10 dark:bg-accent/10 flex items-center justify-center text-emerald-600 dark:text-accent">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Apresentação</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm max-w-xs">
                Para a melhor experiência e leitura no seu celular, abra os slides no visualizador nativo.
              </p>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-500 dark:bg-accent hover:bg-emerald-600 dark:hover:bg-accent-hover text-white rounded-full font-medium transition-colors shadow-lg shadow-emerald-500/25 dark:shadow-accent/25"
              >
                Abrir PDF em Tela Cheia
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlideViewer;