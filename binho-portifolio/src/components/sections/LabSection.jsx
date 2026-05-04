import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Code2, Database, ExternalLink } from 'lucide-react';
import Section from '../ui/Section';
import Badge from '../ui/Badge';
import { useLanguage } from '../../i18n/LanguageContext';
import Trans from '../../i18n/Trans';

const easeApple = [0.16, 1, 0.3, 1];

const Bold = (
  <span className="font-semibold text-primary" />
);
const BoldStrong = (
  <strong className="font-medium text-primary" />
);

const LabSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <Section id="lab" width="page" ariaLabel={t('lab.section_title')}>
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeApple }}
        >
          {t('lab.section_title')}
        </motion.h2>
        <motion.h3
          className="text-h2 md:text-h1 font-semibold text-primary tracking-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeApple }}
        >
          {t('lab.title')}
        </motion.h3>
        <motion.p
          className="text-body-lg text-secondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeApple }}
        >
          <Trans i18nKey="lab.subtitle" components={[Bold]} />
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, ease: easeApple }}
        className="relative group rounded-3xl overflow-hidden"
      >
        {/* Border beam — linha animada single, mais elegante que gradient pulsante */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-40 group-hover:opacity-100 transition-opacity duration-slow ease-apple pointer-events-none"
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />

        <div className="relative w-full bg-surface-1 border border-border-subtle backdrop-blur-md rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-10 z-10">
          <div className="w-full md:flex-1 flex flex-col justify-center">
            <div className="inline-flex">
              <Badge variant="accent" size="md" className="mb-5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                {t('lab.highlight')}
              </Badge>
            </div>
            <h3 className="text-h3 md:text-h2 font-semibold text-primary mb-4 tracking-tight">
              {t('lab.project_title')}
            </h3>
            <p className="text-body-lg text-secondary leading-relaxed mb-8">
              <Trans i18nKey="lab.project_text" components={[BoldStrong, BoldStrong]} />
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Badge variant="default" size="md">
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                KMP
              </Badge>
              <Badge variant="default" size="md">
                <Database className="w-3.5 h-3.5" aria-hidden="true" />
                Gemini API
              </Badge>
              <Badge variant="default" size="md">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Compose Multiplatform
              </Badge>
            </div>
          </div>

          {/* Visual placeholder à direita — substitui screenshot quando disponível */}
          <div className="hidden md:flex md:w-[280px] flex-shrink-0 items-center justify-center">
            <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-accent/10 via-surface-2 to-info/5 border border-border-subtle flex items-center justify-center overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(34,197,94,0.6) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <ExternalLink className="w-12 h-12 text-accent/40 relative z-10" aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default LabSection;
