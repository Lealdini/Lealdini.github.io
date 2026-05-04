import React from 'react';

/**
 * Badge / Chip / Pill pequeno.
 * Variantes: default, accent, success, info, neutral
 * Tamanho: sm, md
 */

const base =
  'inline-flex items-center gap-1.5 font-medium transition-colors duration-base ease-apple';

const variants = {
  default: 'bg-primary/[0.06] text-secondary border border-border-default',
  accent: 'bg-accent-subtle text-accent border border-accent/30',
  neutral: 'bg-surface-2 text-secondary border border-border-subtle',
  outline: 'bg-transparent text-secondary border border-border-default',
};

const sizes = {
  sm: 'text-caption px-2.5 py-1 rounded-pill',
  md: 'text-small px-3 py-1.5 rounded-pill',
};

const Badge = ({ variant = 'default', size = 'sm', dot = false, className = '', children, ...rest }) => {
  const cls = `${base} ${variants[variant] || variants.default} ${sizes[size]} ${className}`;
  return (
    <span className={cls} {...rest}>
      {dot && (
        <span className="relative inline-flex w-1.5 h-1.5">
          <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
};

export default Badge;
