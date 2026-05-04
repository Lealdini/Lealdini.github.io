import React, { useRef, useState, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
import { Presentation, Download, Eye } from 'lucide-react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useLanguage } from '../../i18n/LanguageContext';
import Trans from '../../i18n/Trans';

const SlideViewer = lazy(() => import('../ui/SlideViewer'));

const easeApple = [0.16, 1, 0.3, 1];

const Bold = (
  <span className="font-semibold text-primary" />
);

const TechTalks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activePDF, setActivePDF] = useState(null);
  const { t } = useLanguage();

  const talksData = [
    {
      id: 1,
      tag: t('tech_talks.talk1_tag'),
      title: t('tech_talks.talk1_title'),
      description: t('tech_talks.talk1_desc'),
      file: '/apresentacoes/falando_com_maquina.pdf',
      gradient: 'from-accent/30 via-accent/10 to-transparent',
    },
    {
      id: 2,
      tag: t('tech_talks.talk2_tag'),
      title: t('tech_talks.talk2_title'),
      description: t('tech_talks.talk2_desc'),
      file: '/apresentacoes/ai_verge.pdf',
      gradient: 'from-info/30 via-info/10 to-transparent',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeApple } },
  };

  return (
    <Section id="tech-talks" width="page" ariaLabel={t('tech_talks.title')}>
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeApple }}
        >
          {t('tech_talks.tag') || 'Tech Talks'}
        </motion.h2>
        <motion.h3
          className="text-h2 md:text-h1 font-semibold text-primary tracking-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeApple }}
        >
          {t('tech_talks.title')}
        </motion.h3>
        <motion.p
          className="text-body-lg text-secondary max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeApple }}
        >
          <Trans i18nKey="tech_talks.subtitle" components={[Bold, Bold]} />
        </motion.p>
      </div>

      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {talksData.map((talk) => (
          <motion.div key={talk.id} variants={cardVariants}>
            <Card
              variant="elevated"
              interactive
              className="group flex flex-col overflow-hidden h-full"
              onClick={() => setActivePDF(talk.file)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActivePDF(talk.file);
                }
              }}
            >
              {/* Capa */}
              <div
                className={`h-44 md:h-48 bg-gradient-to-br ${talk.gradient} flex items-center justify-center relative overflow-hidden border-b border-border-subtle`}
              >
                {/* Padrão sutil de pontos */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <Presentation
                  className="w-14 h-14 text-primary/70 group-hover:scale-110 transition-transform duration-slow ease-apple relative z-10"
                  aria-hidden="true"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <span className="eyebrow mb-3 block">{talk.tag}</span>
                <h4 className="text-h4 font-semibold text-primary mb-3 leading-tight">
                  {talk.title}
                </h4>
                <p className="text-body text-secondary leading-relaxed mb-6 flex-grow">
                  {talk.description}
                </p>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="secondary"
                    size="md"
                    pill
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePDF(talk.file);
                    }}
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>{t('tech_talks.read_slides')}</span>
                  </Button>
                  <Button
                    as="a"
                    href={talk.file}
                    download
                    variant="ghost"
                    size="md"
                    pill
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>{t('tech_talks.download_pdf')}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {activePDF && (
        <Suspense fallback={null}>
          <SlideViewer pdfUrl={activePDF} onClose={() => setActivePDF(null)} />
        </Suspense>
      )}
    </Section>
  );
};

export default TechTalks;
