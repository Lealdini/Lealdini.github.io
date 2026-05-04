import React from 'react';

/**
 * Card com 3 variantes hierarquizadas — substitui o uso indistinto
 * de `glass` que vinha sendo aplicado em chips, cards e modals.
 *
 *  - flat      → fundo sólido sutil, sem sombra (cards de listagem)
 *  - elevated  → fundo + sombra leve, hover de borda (cards de feature)
 *  - outlined  → só borda, transparente (cards secundários)
 *
 * Adiciona um overlay accent opcional (`accent`) que aparece no hover
 * — referência Vercel/Linear.
 */

const base =
  'relative overflow-hidden transition-all duration-base ease-apple';

const variants = {
  flat: 'bg-surface-1 border border-border-subtle rounded-2xl',
  elevated:
    'bg-surface-1 border border-border-subtle rounded-2xl shadow-card hover:shadow-card-hover hover:border-border-default',
  outlined:
    'bg-transparent border border-border-default rounded-2xl hover:bg-primary/[0.02] hover:border-border-strong',
};

const Card = ({
  as: Tag = 'div',
  variant = 'elevated',
  accent = false,
  interactive = false,
  className = '',
  children,
  ...rest
}) => {
  const cls = `${base} ${variants[variant] || variants.elevated} ${interactive ? 'cursor-pointer' : ''} ${className}`;

  return (
    <Tag className={cls} {...rest}>
      {children}
      {accent && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-slow ease-apple group-hover:opacity-100"
        />
      )}
    </Tag>
  );
};

export default Card;
