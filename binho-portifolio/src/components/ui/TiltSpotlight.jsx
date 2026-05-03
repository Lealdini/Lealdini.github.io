import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

/**
 * Card with two layered effects:
 *  1. Subtle 3D tilt that follows the cursor (perspective + rotateX/Y).
 *  2. A radial spotlight glow that tracks the cursor's local position.
 *
 * Both effects degrade to a static card when `prefers-reduced-motion` is on
 * or on touch devices (we never opt in for hover-only effects on mobile).
 *
 * Usage:
 *   <TiltSpotlight className="...">{children}</TiltSpotlight>
 */
const TiltSpotlight = ({ children, className = '', tiltMax = 6, glow = true, ...rest }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  // Normalized [-0.5, 0.5] cursor position relative to the card.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spotlight position in pixels (for radial-gradient).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // Glow opacity rises while the cursor is over the card.
  const glowOpacity = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });

  // y → rotateX (positive Y means rotate top forward = negative X rotation)
  const rotateX = useTransform(sy, (v) => (-v * tiltMax * 2).toFixed(2) + 'deg');
  const rotateY = useTransform(sx, (v) => (v * tiltMax * 2).toFixed(2) + 'deg');

  const handleMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    x.set(localX / rect.width - 0.5);
    y.set(localY / rect.height - 0.5);
    px.set(localX);
    py.set(localY);
  };

  const handleEnter = () => {
    if (prefersReducedMotion) return;
    glowOpacity.set(1);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  // Build the spotlight CSS — Framer's MotionValue → live CSS value.
  const background = useTransform(
    [px, py, glowOpacity],
    ([cx, cy, op]) =>
      `radial-gradient(280px circle at ${cx}px ${cy}px, rgba(74, 222, 128, ${0.18 * op}), transparent 60%)`
  );

  const inner = (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="relative w-full h-full"
    >
      {children}
      {glow && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background, opacity: glowOpacity }}
        />
      )}
    </motion.div>
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: 1000 }}
      {...rest}
    >
      {inner}
    </div>
  );
};

export default TiltSpotlight;
