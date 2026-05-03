import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const About = () => {
  const { t, language } = useLanguage();
  const [experience, setExperience] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Começo do trabalho: Janeiro de 2019
    const startDate = new Date('2019-01-01T00:00:00');
    
    const updateCounter = () => {
      const now = new Date();
      
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }
      if (hours < 0) {
        days--;
        hours += 24;
      }
      if (days < 0) {
        months--;
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setExperience({ years, months, days, hours, minutes, seconds });
    };

    updateCounter();
    const intervalId = setInterval(updateCounter, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <section id="code" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-sm font-bold tracking-widest text-accent uppercase mb-8">
            {t('about.section_title')}
          </h2>
          <p className="text-2xl md:text-4xl lg:text-5xl font-light text-zinc-700 dark:text-primary leading-snug md:leading-tight transition-colors duration-500">
            {language === 'pt' ? (
              <>
                Há exatos <span className="font-mono font-medium text-accent text-[0.85em] inline-block">
                  {experience.years} anos, {experience.months} meses, {experience.days} dias, {formatNumber(experience.hours)}:{formatNumber(experience.minutes)}:{formatNumber(experience.seconds)}
                </span> transformando café em aplicativos que milhões de pessoas usam. Já passei por lugares incríveis como <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">CI&T</span>, <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">IBM</span> e <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">Venturus</span>, sempre focado em fazer a galera do Android mais feliz com arquiteturas limpas e bem feitas.
              </>
            ) : (
              <>
                Exactly <span className="font-mono font-medium text-accent text-[0.85em] inline-block">
                  {experience.years} years, {experience.months} months, {experience.days} days, {formatNumber(experience.hours)}:{formatNumber(experience.minutes)}:{formatNumber(experience.seconds)}
                </span> turning coffee into apps used by millions. I've been through amazing places like <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">CI&T</span>, <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">IBM</span>, and <span className="font-semibold text-zinc-900 dark:text-white transition-colors duration-500">Venturus</span>, always focused on making Android devs happier with clean and well-crafted architectures.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;