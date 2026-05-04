import React from 'react';
import Container from './Container';

/**
 * Wrapper de seção com padding vertical consistente, anchor id
 * e suporte a aria-labelledby. Já injeta o Container interno.
 *
 * Props:
 *  - id, ariaLabel, ariaLabelledby
 *  - width: 'page' | 'narrow' | 'prose' (passa pra Container)
 *  - tight: boolean (usa section-tight)
 *  - bare: boolean (não injeta Container — usado quando precisa de full-bleed)
 */
const Section = ({
  id,
  ariaLabel,
  ariaLabelledby,
  width = 'page',
  tight = false,
  bare = false,
  className = '',
  innerClassName = '',
  children,
}) => {
  const padding = tight ? 'section-tight' : 'section';

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={`relative ${padding} ${className}`}
    >
      {bare ? (
        children
      ) : (
        <Container width={width} className={innerClassName}>
          {children}
        </Container>
      )}
    </section>
  );
};

export default Section;
