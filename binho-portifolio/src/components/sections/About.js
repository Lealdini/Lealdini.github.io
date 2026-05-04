import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from '../ui/Section';
import { useLanguage } from '../../i18n/LanguageContext';
import Trans from '../../i18n/Trans';

const START_DATE = new Date('2019-01-01T00:00:00');

const computeDelta = (now) => {
  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) { minutes--; seconds += 60; }
  if (minutes < 0) { hours--; minutes += 60; }
  if (hours < 0) { days--; hours += 24; }
  if (days < 0) {
    months--;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }

  return { years, months, days, hours, minutes, seconds };
};

const pad = (n) => n.toString().padStart(2, '0');

const About = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  // Counter só roda quando a seção está visível — economiza CPU/bateria.
  const isInView = useInView(sectionRef, { margin: '-10% 0px' });

  const [exp, setExp] = useState(() => computeDelta(new Date()));

  useEffect(() => {
    if (!isInView) return undefined;
    const id = setInterval(() => setExp(computeDelta(new Date())), 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const counterLabel =
    language === 'pt'
      ? `${exp.years} anos, ${exp.months} meses, ${exp.days} dias, ${pad(exp.hours)}:${pad(exp.minutes)}:${pad(exp.seconds)}`
      : `${exp.years} years, ${exp.months} months, ${exp.days} days, ${pad(exp.hours)}:${pad(exp.minutes)}:${pad(exp.seconds)}`;

  const accentText = (
    <span
      className="font-mono font-medium text-accent text-[0.85em] inline-block tabular-nums"
      aria-live="polite"
    >
      {counterLabel}
    </span>
  );

  const boldName = <span className="font-semibold text-primary" />;

  return (
    <Section id="code" width="narrow" ariaLabel={t('about.section_title')}>
      <div ref={sectionRef} className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="eyebrow mb-6">
            {t('about.section_title')}
          </h2>
          <p className="text-h4 md:text-h2 font-light text-secondary leading-snug md:leading-tight">
            <span className="text-primary font-normal">
              {t('about.prefix')}
              {accentText}
              <Trans i18nKey="about.suffix" components={[boldName, boldName, boldName]} />
            </span>
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
