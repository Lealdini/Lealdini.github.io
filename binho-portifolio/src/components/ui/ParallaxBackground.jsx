import React, { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

/**
 * Background com 3 camadas (deep glow / mid SVG veins / floating symbols).
 * Otimizações aplicadas:
 *   - Partículas reduzidas (40 → 18 desktop, 0 mobile).
 *   - Símbolos reduzidos (7 → 4).
 *   - Detecção de mobile via media query (sem mousemove em touch).
 *   - prefers-reduced-motion respeitado em tudo.
 *   - pointer-events:none em todas as camadas.
 */
const ParallaxBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const mql = window.matchMedia('(min-width: 768px) and (hover: hover)');
    const apply = () => setIsDesktop(mql.matches);
    apply();
    if (mql.addEventListener) mql.addEventListener('change', apply);
    else mql.addListener(apply);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', apply);
      else mql.removeListener(apply);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const deepX = useTransform(smoothMouseX, [-1, 1], [12, -12]);
  const deepY = useTransform(smoothMouseY, [-1, 1], [12, -12]);
  const midX = useTransform(smoothMouseX, [-1, 1], [24, -24]);
  const midY = useTransform(smoothMouseY, [-1, 1], [24, -24]);
  const foreX = useTransform(smoothMouseX, [-1, 1], [48, -48]);
  const foreY = useTransform(smoothMouseY, [-1, 1], [48, -48]);

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop) return undefined;

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion, isDesktop]);

  // Partículas: 18 no desktop, 0 em mobile/reduced motion
  const particleCount = !prefersReducedMotion && isDesktop ? 18 : 0;
  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        size: Math.random() * 2.5 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.3 + 0.1,
      })),
    [particleCount]
  );

  // Símbolos: reduzidos para 4 (eram 7), e só no desktop
  const symbols = useMemo(
    () =>
      isDesktop
        ? [
            { text: '@Composable', left: '12%', top: '22%', rotate: -8, delay: 0 },
            { text: 'expect fun', left: '78%', top: '24%', rotate: 6, delay: 1.2 },
            { text: 'Modifier.fillMaxSize()', left: '20%', top: '72%', rotate: 12, delay: 0.5 },
            { text: 'Flow<T>', left: '72%', top: '70%', rotate: -6, delay: 1.8 },
          ]
        : [],
    [isDesktop]
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* DEEP — glow ambiente */}
      <motion.div className="absolute inset-0" style={{ x: deepX, y: deepY }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] bg-info/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-accent/[0.05] rounded-full blur-[120px]" />

        {/* Vinheta sutil top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-90" />

        {/* Partículas — só desktop */}
        {particles.length > 0 && (
          <div className="absolute inset-0">
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-accent blur-[1px]"
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
        )}
      </motion.div>

      {/* MID — circuito SVG (só desktop, performance) */}
      {isDesktop && (
        <motion.div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{ x: midX, y: midY }}
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="vein-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M 20% -10% C 25% 30%, 15% 60%, 30% 110% M 23% 40% C 40% 50%, 50% 40%, 60% 70% M 40% 45% C 45% 20%, 60% 10%, 75% 5%"
              stroke="url(#vein-grad)"
              strokeWidth="1"
              fill="none"
              className="opacity-50"
            />
            <path
              d="M 80% -10% C 75% 20%, 90% 50%, 70% 110% M 77% 30% C 60% 40%, 55% 60%, 40% 90%"
              stroke="url(#vein-grad)"
              strokeWidth="0.8"
              fill="none"
              className="opacity-40"
            />
          </svg>
        </motion.div>
      )}

      {/* FORE — símbolos flutuantes (só desktop) */}
      {symbols.length > 0 && (
        <motion.div className="absolute inset-0" style={{ x: foreX, y: foreY }}>
          {symbols.map((sym, i) => (
            <motion.div
              key={sym.text}
              aria-hidden="true"
              className="absolute font-mono text-accent/70 font-medium text-base lg:text-lg select-none"
              style={{ left: sym.left, top: sym.top, rotate: sym.rotate }}
              animate={
                prefersReducedMotion
                  ? { y: 0, opacity: 0.6 }
                  : { y: [0, -16, 0], opacity: [0.4, 0.8, 0.4] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 6 + i, repeat: Infinity, delay: sym.delay, ease: 'easeInOut' }
              }
            >
              {sym.text}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ParallaxBackground;
