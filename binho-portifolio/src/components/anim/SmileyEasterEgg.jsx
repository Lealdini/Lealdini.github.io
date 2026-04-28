import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SmileyEasterEgg = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const gridSize = 20;
  const cols = 7;
  const rows = 7;
  const width = cols * gridSize;
  const height = rows * gridSize;

  const hLines = Array.from({ length: rows + 1 }).map((_, i) => i * gridSize);
  const vLines = Array.from({ length: cols + 1 }).map((_, i) => i * gridSize);

  // Coordenadas (x, y) dos quadrados que formam o sorriso
  const smileySquares = [
    { x: 1, y: 2 }, // Olho esquerdo
    { x: 5, y: 2 }, // Olho direito
    { x: 1, y: 4 }, // Canto do sorriso esq
    { x: 5, y: 4 }, // Canto do sorriso dir
    { x: 2, y: 5 }, // Base do sorriso
    { x: 3, y: 5 }, // Base do sorriso
    { x: 4, y: 5 }, // Base do sorriso
  ];

  return (
    <div 
      ref={ref} 
      className="flex justify-center items-center w-full my-12 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default"
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        
        {/* Linhas Horizontais */}
        {hLines.map((y, i) => (
          <motion.line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            className="stroke-black/10 dark:stroke-white/10 transition-colors duration-500"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}

        {/* Linhas Verticais */}
        {vLines.map((x, i) => (
          <motion.line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            className="stroke-black/10 dark:stroke-white/10 transition-colors duration-500"
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}
        
        {/* Quadrados do Smiley */}
        {smileySquares.map((sq, i) => (
          <motion.rect
            key={`sq-${i}`}
            x={sq.x * gridSize}
            y={sq.y * gridSize}
            width={gridSize}
            height={gridSize}
            className="fill-black dark:fill-white transition-colors duration-500"
            style={{ transformOrigin: `${sq.x * gridSize + gridSize / 2}px ${sq.y * gridSize + gridSize / 2}px` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 15,
              delay: 1.5 + (i * 0.1) // Stagger effect starts after grid animation
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default SmileyEasterEgg;