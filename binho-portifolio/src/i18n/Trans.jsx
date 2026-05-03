import React from 'react';
import { useLanguage } from './LanguageContext';

// Lightweight <Trans /> that mirrors react-i18next's Trans semantics.
// Translation strings can use placeholder tags like:
//   "Built apps for <1>Bank X</1> and powered <2>Service Y</2>."
// You then pass the React elements to render in their slots:
//   <Trans i18nKey="experience.card1_text"
//          components={[<span className="font-medium text-zinc-900" />,
//                       <strong className="font-medium text-zinc-900" />]} />
//
// Tag indices are 1-based to match the existing translations.js content.
// Components must NOT carry their own children — children come from the string.

const TAG_RE = /<(\d+)>([\s\S]*?)<\/\1>/g;

const renderParts = (raw, components) => {
  if (typeof raw !== 'string') return raw;
  if (!components || components.length === 0) return raw;

  const out = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  TAG_RE.lastIndex = 0;
  while ((match = TAG_RE.exec(raw)) !== null) {
    const [whole, indexStr, inner] = match;
    const idx = parseInt(indexStr, 10) - 1;

    if (match.index > lastIndex) {
      out.push(raw.slice(lastIndex, match.index));
    }

    const tpl = components[idx];
    if (React.isValidElement(tpl)) {
      out.push(React.cloneElement(tpl, { key: `t-${key++}` }, inner));
    } else {
      // Unknown index — render the inner text raw so nothing is lost.
      out.push(inner);
    }

    lastIndex = match.index + whole.length;
  }

  if (lastIndex < raw.length) {
    out.push(raw.slice(lastIndex));
  }

  return out;
};

const Trans = ({ i18nKey, components }) => {
  const { t } = useLanguage();
  const raw = t(i18nKey);
  return <>{renderParts(raw, components)}</>;
};

export default Trans;
