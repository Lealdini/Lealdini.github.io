import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import SmileyEasterEgg from '../anim/SmileyEasterEgg';
import { useLanguage } from '../../i18n/LanguageContext';

// LinkedIn icon — inline (lucide-react@1.14.0 não exporta o `Linkedin`)
const LinkedinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const easeApple = [0.16, 1, 0.3, 1];

// Email é montado em runtime para dificultar scrapers ingênuos.
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

// Input com label flutuante (Material 3 style).
const FloatingField = ({ id, name, type = 'text', label, value, onChange, required, autoComplete, multiline = false, rows = 4 }) => {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="relative">
      <Tag
        id={id}
        type={multiline ? undefined : type}
        name={name}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className={`peer w-full px-4 pt-6 pb-2 bg-surface-1 border border-border-default rounded-2xl text-primary text-body
          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30
          transition-all duration-base ease-apple resize-none placeholder:text-transparent`}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 text-caption text-muted transition-all duration-base ease-apple pointer-events-none
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-small peer-placeholder-shown:text-muted
          peer-focus:top-2 peer-focus:text-caption peer-focus:text-accent`}
      >
        {label}
      </label>
    </div>
  );
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
    if (form.website) return; // honeypot

    const href = buildMailto({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      subject: t('footer.form_subject'),
    });

    setOpening(true);
    window.location.href = href;
    setTimeout(() => setOpening(false), 4000);
  };

  return (
    <footer
      id="contact"
      aria-label="Contato"
      className="relative section-tight border-t border-border-subtle overflow-hidden"
    >
      <Container width="narrow" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeApple }}
          className="text-center"
        >
          <h2 className="eyebrow mb-4">
            {t('nav.contact') || 'Contato'}
          </h2>
          <h3 className="text-h2 md:text-h1 font-semibold text-primary tracking-tight mb-4">
            {t('footer.title_line1')}
            <br />
            <span className="text-secondary">{t('footer.title_line2')}</span>
          </h3>
          <p className="text-body-lg text-secondary max-w-xl mx-auto mb-10">
            {t('footer.subtitle') || ''}
          </p>

          <form onSubmit={handleSubmit} noValidate className="text-left flex flex-col gap-4 mb-10">
            <FloatingField
              id="contact-name"
              name="name"
              label={t('footer.form_name')}
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <FloatingField
              id="contact-email"
              name="email"
              type="email"
              label={t('footer.form_email')}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <FloatingField
              id="contact-message"
              name="message"
              label={t('footer.form_message')}
              value={form.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />
            {/* Honeypot — escondido pra humanos, atrai bots */}
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
            <Button type="submit" variant="primary" size="lg" pill className="w-full">
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>{t('footer.form_send')}</span>
            </Button>
            <p
              aria-live="polite"
              className={`text-small text-center text-muted transition-opacity duration-base ${
                opening ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {t('footer.form_opening')}
            </p>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button as="a" href={`mailto:${email}`} variant="secondary" size="md" pill className="w-full sm:w-auto">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>{email}</span>
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/lealdini/"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
              pill
              className="w-full sm:w-auto"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </motion.div>

        <SmileyEasterEgg />

        <div className="mt-12 text-center text-small text-muted">
          <p>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
