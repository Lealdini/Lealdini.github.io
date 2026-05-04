import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Menu, X, Play, Pause } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const easeApple = [0.16, 1, 0.3, 1];

/**
 * Navbar minimalista com:
 *  - Auto-hide no scroll-down, auto-show no scroll-up.
 *  - Estado "transparent" no topo, "blur+border" depois do hero.
 *  - Desktop: links âncora inline + CTA contato à direita.
 *  - Mobile: logo à esquerda; à direita: botão de música compacto +
 *    hamburger que abre um drawer fullscreen com nav links e contato.
 *
 * Música no mobile é um botão compacto play/pause que dispara um custom
 * event `binho:toggle-music`. O componente BackgroundMusic escuta esse
 * evento e alterna o playback — assim mantemos um único <audio> no DOM.
 */
const Navbar = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const lastY = useRef(0);
  const drawerRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - lastY.current;
    if (y < 80) {
      setHidden(false);
      setScrolled(false);
    } else {
      setScrolled(true);
      if (Math.abs(delta) > 6 && !menuOpen) {
        setHidden(delta > 0);
      }
    }
    lastY.current = y;
  });

  // Sincroniza estado de música com BackgroundMusic via custom events.
  useEffect(() => {
    const handlePlaying = (e) => setMusicPlaying(Boolean(e.detail));
    window.addEventListener('binho:music-state', handlePlaying);
    return () => window.removeEventListener('binho:music-state', handlePlaying);
  }, []);

  // Trava o scroll do body enquanto o drawer estiver aberto + ESC fecha.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    // Foca no primeiro link do drawer
    setTimeout(() => {
      drawerRef.current?.querySelector('a, button')?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent('binho:toggle-music'));
  };

  const links = [
    { href: '#code', label: t('nav.about') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#tech-stack', label: t('nav.skills') },
    { href: '#tech-talks', label: t('nav.talks') },
    { href: '#lab', label: t('nav.lab') },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: easeApple }}
        className="fixed inset-x-0 top-0 z-40"
      >
        <nav
          aria-label="Navegação principal"
          className={`transition-all duration-base ease-apple ${
            scrolled || menuOpen
              ? 'bg-background/70 backdrop-blur-nav border-b border-border-subtle'
              : 'bg-transparent border-b border-transparent'
          }`}
        >
          <div className="container-page flex items-center justify-between h-16 md:h-18">
            <a
              href="#hero"
              className="font-semibold tracking-tight text-primary hover:text-accent transition-colors duration-base ease-apple text-body-lg"
            >
              Lealdini<span className="text-accent">.</span>
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-small font-medium text-secondary hover:text-primary transition-colors duration-base ease-apple rounded-lg hover:bg-primary/[0.04]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* DESKTOP CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-pill text-small font-medium bg-primary/[0.06] text-primary border border-border-default hover:bg-primary/[0.10] hover:border-border-strong transition-all duration-base ease-apple"
            >
              {t('nav.contact')}
            </a>

            {/* MOBILE CONTROLS — música compacta + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleMusic}
                aria-label={musicPlaying ? 'Pausar música' : 'Tocar música'}
                aria-pressed={musicPlaying}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/[0.06] text-primary border border-border-default hover:bg-primary/[0.10] transition-colors duration-base ease-apple"
              >
                {musicPlaying ? (
                  <Pause className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/[0.06] text-primary border border-border-default hover:bg-primary/[0.10] transition-colors duration-base ease-apple"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Fechar menu"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-30 md:hidden bg-background/80 backdrop-blur-md"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              ref={drawerRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeApple }}
              className="fixed inset-x-3 top-[4.5rem] z-40 md:hidden bg-surface-1 border border-border-default rounded-3xl shadow-elevated p-6"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: easeApple }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-3.5 px-4 rounded-xl text-h4 font-medium text-primary hover:bg-primary/[0.04] active:bg-primary/[0.08] transition-colors duration-base ease-apple"
                    >
                      <span>{link.label}</span>
                      <span aria-hidden="true" className="text-muted text-small">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-border-subtle">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center h-12 rounded-pill bg-accent text-white font-medium hover:bg-accent-hover transition-colors duration-base ease-apple shadow-glow-soft"
                >
                  {t('nav.contact')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
