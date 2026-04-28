import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import SmileyEasterEgg from '../anim/SmileyEasterEgg';

const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-zinc-200 dark:border-white/5 relative overflow-hidden mt-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-10 transition-colors duration-500">
            Pronto para escalar<br />o próximo projeto?
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:lealdinifabio@gmail.com"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              <span>lealdinifabio@gmail.com</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/lealdini/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 glass rounded-full text-zinc-900 dark:text-white font-medium transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
        
        <SmileyEasterEgg />

        <div className="mt-8 text-sm text-zinc-500 dark:text-secondary/60 font-light transition-colors duration-500">
          <p>© {new Date().getFullYear()} Fábio Lealdini. Construído com React, Tailwind CSS e Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
