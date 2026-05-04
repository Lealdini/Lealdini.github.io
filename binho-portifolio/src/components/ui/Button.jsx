import React, { forwardRef } from 'react';

/**
 * Botão polimórfico (renderiza <button> ou <a>) com variantes.
 *
 * Variantes:
 *  - primary   → accent verde, peso visual alto (CTA principal)
 *  - secondary → branco-sobre-dark sólido
 *  - ghost     → glass sutil, transparente
 *  - outline   → borda + transparente
 *  - icon      → quadrado, ideal para ícones
 *
 * Tamanhos: sm (36px), md (44px touch target), lg (52px)
 *
 * Touch targets respeitam mínimo 44px (Apple HIG / Material).
 */

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-tight ' +
  'transition-all duration-base ease-apple ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:opacity-50 disabled:cursor-not-allowed select-none';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-glow-soft hover:shadow-glow-accent active:scale-[0.98]',
  secondary:
    // Cor inversa ao tema: em dark = branco/preto, em light = preto/branco.
    'bg-primary text-background hover:bg-primary/90 shadow-card hover:shadow-card-hover active:scale-[0.98]',
  ghost:
    'bg-primary/[0.06] text-primary border border-border-default hover:bg-primary/[0.10] hover:border-border-strong backdrop-blur-md active:scale-[0.98]',
  outline:
    'bg-transparent text-primary border border-border-default hover:bg-primary/[0.04] hover:border-border-strong active:scale-[0.98]',
  icon:
    'bg-primary/[0.06] text-primary border border-border-default hover:bg-primary/[0.10] hover:border-border-strong backdrop-blur-md',
};

const sizes = {
  sm: 'h-9 px-4 text-small rounded-lg',
  md: 'h-11 px-6 text-body rounded-xl',
  lg: 'h-13 px-7 text-body-lg rounded-2xl',
};

const iconSizes = {
  sm: 'h-9 w-9 rounded-lg',
  md: 'h-11 w-11 rounded-xl',
  lg: 'h-12 w-12 rounded-2xl',
};

const pillSizes = {
  sm: 'h-9 px-4 text-small rounded-pill',
  md: 'h-11 px-6 text-body rounded-pill',
  lg: 'h-13 px-7 text-body-lg rounded-pill',
};

const Button = forwardRef(
  (
    {
      as,
      variant = 'primary',
      size = 'md',
      pill = false,
      iconOnly = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const Tag = as || (rest.href ? 'a' : 'button');
    const isAnchor = Tag === 'a';

    const sizeClasses = iconOnly
      ? iconSizes[size]
      : pill
      ? pillSizes[size]
      : sizes[size];

    const cls = `${base} ${variants[variant] || variants.primary} ${sizeClasses} ${className}`;

    return (
      <Tag
        ref={ref}
        {...(!isAnchor && !rest.type ? { type: 'button' } : {})}
        className={cls}
        {...rest}
      >
        {children}
      </Tag>
    );
  }
);

Button.displayName = 'Button';
export default Button;
