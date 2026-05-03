import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [exp, setExp] = useState(() => computeDelta(new Date()));

  useEffect(() => {
    const id = setInterval(() => setExp(computeDelta(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const counterLabel =
    language === 'pt'
      ? `${exp.years} anos, ${exp.months} meses, ${exp.days} dias, ${pad(exp.hours)}:${pad(exp.minutes)}:${pad(exp.seconds)}`
      : `${exp.years} years, ${exp.months} months, ${exp.days} days, ${pad(exp.hours)}:${pad(exp.minutes)}:${pad(exp.seconds)}`;

  // The middle of the sentence is a live counter; we wrap it in an aria-live
  // region so screen readers announce time updates politely.
  const accentText = (
    <span className="font-mono font-medium text-accent text-[0.85em] inline-block" aria-live="polite">
      {counterLabel}
    </span>
  );

  const boldName = <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500" />;

  return (
    <section id="code" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8">
            {t('about.section_title')}
          </h2>
          <p className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-700 dark:text-primary leading-snug md:leading-tight transition-colors duration-500">
            {t('about.prefix')}
            {accentText}
            <Trans i18nKey="about.suffix" components={[boldName, boldName, boldName]} />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
