import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  // Use MotionValues to bypass React render cycle for high-frequency events like mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add smooth spring physics
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Calculate transform values for each layer
  const deepX = useTransform(smoothMouseX, [-1, 1], [15, -15]);
  const deepY = useTransform(smoothMouseY, [-1, 1], [15, -15]);
  
  const midX = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const midY = useTransform(smoothMouseY, [-1, 1], [30, -30]);
  
  const foreX = useTransform(smoothMouseX, [-1, 1], [60, -60]);
  const foreY = useTransform(smoothMouseY, [-1, 1], [60, -60]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to range [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate particles ONLY ONCE to prevent flickering on re-renders
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 15 + 10}s`,
    opacity: Math.random() * 0.4 + 0.1,
  })), []);

  const symbols = useMemo(() => [
    { text: "@Composable", left: "12%", top: "25%", rotate: -10, delay: 0 },
    { text: "expect fun", left: "75%", top: "20%", rotate: 8, delay: 1.2 },
    { text: "actual class", left: "80%", top: "65%", rotate: -5, delay: 2.1 },
    { text: "Modifier.fillMaxSize()", left: "18%", top: "75%", rotate: 15, delay: 0.5 },
    { text: "{ ... }", left: "50%", top: "15%", rotate: 0, delay: 1.8 },
    { text: "Flow<T>", left: "45%", top: "85%", rotate: -8, delay: 2.6 },
    { text: "KMP", left: "65%", top: "50%", rotate: 12, delay: 0.9 },
  ], []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-50 dark:bg-background pointer-events-none transition-colors duration-500">
      {/* 1. DEEP BACKGROUND: Mist, Cosmology Glow & Particles */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: deepX, y: deepY }}
      >
        {/* Core cosmology/mist glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/10 dark:bg-accent/5 rounded-full blur-[150px] transition-colors duration-500"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-500/10 dark:bg-emerald-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen transition-colors duration-500"></div>
        
        {/* Misty overlay / Noise */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-transparent to-zinc-50 dark:from-background dark:via-transparent dark:to-background opacity-90 transition-colors duration-500"></div>

        {/* Particles */}
        <div className="absolute inset-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-emerald-600 dark:bg-accent blur-[1px] transition-colors duration-500"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* 2. MIDGROUND: Translucent 3D circuit-board leaf veins */}
      <motion.div 
        className="absolute inset-0 opacity-30 dark:opacity-40 dark:mix-blend-screen transition-opacity duration-500"
        style={{ x: midX, y: midY }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="vein-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4ade80" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow-vein" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Main vertical branching, simulating circuit veins reaching out */}
          <path d="M 20% -10% C 25% 30%, 15% 60%, 30% 110% M 23% 40% C 40% 50%, 50% 40%, 60% 70% M 40% 45% C 45% 20%, 60% 10%, 75% 5%" 
                stroke="url(#vein-grad)" strokeWidth="1.5" fill="none" filter="url(#glow-vein)" className="opacity-50" />
          <path d="M 80% -10% C 75% 20%, 90% 50%, 70% 110% M 77% 30% C 60% 40%, 55% 60%, 40% 90% M 60% 35% C 65% 50%, 80% 60%, 95% 55%" 
                stroke="url(#vein-grad)" strokeWidth="1" fill="none" filter="url(#glow-vein)" className="opacity-40" />
          <path d="M -10% 50% C 20% 45%, 40% 60%, 110% 50%" 
                stroke="url(#vein-grad)" strokeWidth="0.5" fill="none" filter="url(#glow-vein)" className="opacity-30" />
        </svg>
      </motion.div>

      {/* 3. FOREGROUND: Sharp, floating KMP/Compose Symbols */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: foreX, y: foreY }}
      >
        {symbols.map((sym, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-emerald-700 dark:text-accent font-bold text-lg md:text-xl drop-shadow-[0_0_10px_rgba(4,120,87,0.3)] dark:drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] select-none transition-colors duration-500"
            style={{ left: sym.left, top: sym.top, rotate: sym.rotate }}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: sym.delay,
              ease: "easeInOut"
            }}
          >
            {sym.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;