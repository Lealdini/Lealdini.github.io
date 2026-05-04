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
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 0.9 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 border border-accent/60 rounded-full pointer-events-none z-[99] hidden md:block"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          backgroundColor: isHovering ? 'rgba(34, 197, 94, 0.10)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovering ? 'rgba(34, 197, 94, 0.9)' : 'rgba(34, 197, 94, 0.45)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
      />
    </>
  );
};

export default CustomCursor;
