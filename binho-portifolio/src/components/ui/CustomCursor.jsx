import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

const CustomCursor = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Use MotionValues so mouse moves don't trigger React re-renders.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      // SVG elements expose tagName as SVGAnimatedString in some browsers — guard it.
      const tag =
        t && typeof t.tagName === 'string' ? t.tagName.toLowerCase() : '';
      const isInteractive =
        tag === 'a' ||
        tag === 'button' ||
        (t && typeof t.closest === 'function' && (t.closest('a') || t.closest('button')));
      setIsHovering(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 2.5 : 1 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[99] hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(74, 222, 128, 0.1)' : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
