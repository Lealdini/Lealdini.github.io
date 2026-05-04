import React from 'react';

/**
 * Container responsivo com larguras pré-definidas.
 *  - page    → 1280px (default)
 *  - narrow  → 768px
 *  - prose   → 672px
 */
const widthMap = {
  page: 'container-page',
  narrow: 'container-narrow',
  prose: 'container-prose',
};

const Container = ({ as: Tag = 'div', width = 'page', className = '', children, ...rest }) => {
  return (
    <Tag className={`${widthMap[width] || widthMap.page} ${className}`} {...rest}>
      {children}
    </Tag>
  );
};

export default Container;
