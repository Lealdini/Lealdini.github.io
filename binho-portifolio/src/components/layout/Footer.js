import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import SmileyEasterEgg from '../anim/SmileyEasterEgg';
import { useLanguage } from '../../i18n/LanguageContext';

// Email is split at build time and only joined at runtime to slow down
// naive HTML scrapers. (Determined attackers will still find it; the goal
// is to keep it out of the easiest plain-text grabs.)
const EMAIL_USER = 'lealdinifabio';
const EMAIL_DOMAIN = 'gmail.com';
const getEmail = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;

const buildMailto = ({ name, email, message, subject }) => {
  const lines = [
    name ? `${name}` : '',
    email ? `<${email}>` : '',
    '',
    message || '',
  ].filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));
  const params = new URLSearchParams({
    subject: subject || '',
    body: lines.join('\n'),
  });
  return `mailto:${getEmail()}?${params.toString()}`;
};

const Footer = () => {
  const { t } = useLanguage();
  const email = useMemo(getEmail, []);

  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [opening, setOpening] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honeypot — only bots fill this; silently drop.
    if (form.website) return;

    const href = buildMailto({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      subject: t('footer.form_subject'),
    });

    setOpening(true);
    window.location.href = href;
    // Reset the "opening" hint after a short delay so it doesn't linger.
    setTimeout(() => setOpening(false), 4000);
  };

  return (
    <footer className="py-24 px-6 border-t border-zinc-200 dark:border-white/5 relative overflow-hidden mt-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-10 transition-colors duration-500">
            {t('footer.title_line1')}<br />{t('footer.title_line2')}
          </h2>

          <div className="max-w-md mx-auto mb-10 text-left">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <label htmlFor="contact-name" className="sr-only">{t('footer.form_name')}</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('footer.form_name')}
                required
                className="w-full px-6 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
              />
              <label htmlFor="contact-email" className="sr-only">{t('footer.form_email')}</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('footer.form_email')}
                required
                className="w-full px-6 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
              />
              <label htmlFor="contact-message" className="sr-only">{t('footer.form_message')}</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('footer.form_message')}
                required
                rows="4"
                className="w-full px-6 py-4 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-2xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
              ></textarea>
              {/* Honeypot — humans never see/fill this; bots usually do. */}
              <input
                type="text"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={handleChange}
                className="hidden"
              />
              <button
                type="submit"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-zinc-900 font-bold rounded-2xl hover:bg-emerald-400 transition-colors duration-300 w-full justify-center shadow-[0_0_20px_rgba(74,222,128,0.2)]"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                <span>{t('footer.form_send')}</span>
              </button>
              <p
                aria-live="polite"
                className={`text-sm text-center text-zinc-500 dark:text-zinc-400 transition-opacity duration-300 ${opening ? 'opacity-100' : 'opacity-0'}`}
              >
                {t('footer.form_opening')}
              </p>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`mailto:${email}`}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span>{email}</span>
            </a>

            <a
              href="https://www.linkedin.com/in/lealdini/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 glass rounded-full text-zinc-900 dark:text-white font-medium transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-5 h-5 group-hover:text-[#0A66C2] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <SmileyEasterEgg />

        <div className="mt-8 text-sm text-zinc-500 dark:text-secondary/60 font-light transition-colors duration-500">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
