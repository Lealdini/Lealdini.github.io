import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion';

// Three tarot cards that rotate through the phone's screen, simulating a
// reading session. SVG only — no images, scales crisply at any DPI.
const cards = [
  {
    name: 'The Star',
    glyph: '✦',
    hue: 'from-indigo-500/30 via-purple-500/20 to-fuchsia-500/30',
    omen: 'Esperança, renovação, clareza interior.',
  },
  {
    name: 'The Moon',
    glyph: '☾',
    hue: 'from-violet-500/30 via-indigo-500/25 to-blue-500/30',
    omen: 'Intuição, mistério, navegar pelo desconhecido.',
  },
  {
    name: 'The Sun',
    glyph: '☼',
    hue: 'from-amber-500/30 via-orange-500/20 to-rose-500/25',
    omen: 'Vitalidade, sucesso, presença.',
  },
];

const Card = ({ name, glyph, hue, omen, active }) => (
  <motion.div
    aria-hidden={!active}
    className={`absolute inset-3 rounded-[1.4rem] flex flex-col items-center justify-between p-5 bg-gradient-to-br ${hue} backdrop-blur-md ring-1 ring-white/10`}
    initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
    animate={{
      opacity: active ? 1 : 0,
      scale: active ? 1 : 0.92,
      rotate: active ? 0 : -3,
    }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  >
    <span className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-mono">
      Oracle.Ai
    </span>
    <div className="flex flex-col items-center gap-2">
      <span className="text-6xl text-white/90 leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
        {glyph}
      </span>
      <span className="text-sm tracking-wide text-white/90 font-semibold">
        {name}
      </span>
    </div>
    <span className="text-[10px] text-white/70 leading-tight text-center max-w-[160px]">
      {omen}
    </span>
  </motion.div>
);

const PhoneMockup = ({ className = '' }) => {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % cards.length), 3500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      role="img"
      aria-label="Mockup de iPhone exibindo o app Oracle.Ai com cartas de tarô se alternando"
      className={`relative ${className}`}
    >
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-accent/10 via-transparent to-indigo-500/20 blur-2xl"
      />

      {/* Phone body */}
      <div className="relative w-[230px] h-[470px] rounded-[2.2rem] bg-zinc-900 ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] p-2.5">
        {/* Side button highlights */}
        <span aria-hidden="true" className="absolute -left-[2px] top-24 h-12 w-[3px] rounded-r bg-zinc-700/60" />
        <span aria-hidden="true" className="absolute -left-[2px] top-40 h-20 w-[3px] rounded-r bg-zinc-700/60" />
        <span aria-hidden="true" className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-l bg-zinc-700/60" />

        {/* Screen */}
        <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-zinc-950 to-black">
          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            className="absolute top-3 left-1/2 -translate-x-1/2 w-[88px] h-[26px] rounded-full bg-black ring-1 ring-white/5 z-20"
          />

          {/* Status bar */}
          <div className="absolute top-3 left-0 right-0 px-6 pt-1 flex items-center justify-between text-[10px] text-white/70 font-medium z-10 pointer-events-none">
            <span>9:41</span>
            <span className="opacity-0">.</span>
          </div>

          {/* Cards stack */}
          <div className="absolute inset-0 pt-12 pb-4">
            {cards.map((c, i) => (
              <Card key={c.name} {...c} active={!reduce ? i === index : i === 0} />
            ))}
          </div>

          {/* Home indicator */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/40"
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
