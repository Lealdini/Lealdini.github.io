import React from 'react';

// Replaces the generic Suspense spinner with a content-aware skeleton.
// Shape roughly matches a section header + a card grid so the layout
// doesn't visibly shift when the real content streams in.
const SectionSkeleton = () => (
  <section
    aria-busy="true"
    aria-live="polite"
    className="py-24 px-6 max-w-6xl mx-auto"
  >
    <span className="sr-only">Carregando seção…</span>

    <div className="text-center mb-16 space-y-4">
      <div className="shimmer-line h-3 w-32 mx-auto rounded-full bg-zinc-200/60 dark:bg-white/5" />
      <div className="shimmer-line h-10 w-72 mx-auto rounded-xl bg-zinc-200/60 dark:bg-white/5" />
      <div className="shimmer-line h-4 w-96 max-w-full mx-auto rounded-full bg-zinc-200/40 dark:bg-white/5" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="shimmer-line h-56 rounded-3xl bg-zinc-200/40 dark:bg-white/5" />
      <div className="shimmer-line h-56 rounded-3xl bg-zinc-200/40 dark:bg-white/5" />
    </div>
  </section>
);

export default SectionSkeleton;
