/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────────────────────
      // Cores via CSS variables. As variáveis vivem em src/index.css
      // (:root para light, .dark para dark) — assim cada utilitário do
      // Tailwind (bg-background, text-primary, border-primary/[0.1])
      // se adapta automaticamente ao tema atual.
      // ─────────────────────────────────────────────────────────────
      colors: {
        // Surfaces
        background: 'rgb(var(--bg) / <alpha-value>)',
        'surface-1': 'rgb(var(--surface-1) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        'surface-3': 'rgb(var(--surface-3) / <alpha-value>)',

        // Text
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',

        // Borders semânticos — derivados de primary com alpha fixa
        'border-subtle': 'rgb(var(--primary) / 0.06)',
        'border-default': 'rgb(var(--primary) / 0.10)',
        'border-strong': 'rgb(var(--primary) / 0.16)',

        // Brand
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          subtle: 'rgb(var(--accent) / 0.10)',
          ring: 'rgb(var(--accent) / 0.40)',
        },

        // Acentos contextuais
        info: 'rgb(var(--info) / <alpha-value>)',
        warn: '#F59E0B',
        danger: '#EF4444',

        // Compat — alguns componentes ainda referenciam estes
        card: 'rgb(var(--primary) / 0.05)',
        surface: 'rgb(var(--surface-3) / <alpha-value>)',
      },

      // ─────────────────────────────────────────────────────────────
      // Tipografia: Inter Variable + escala calibrada (Apple-like)
      // ─────────────────────────────────────────────────────────────
      fontFamily: {
        sans: [
          '"Inter Variable"',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'small': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'lead': ['1.25rem', { lineHeight: '1.55', letterSpacing: '-0.01em' }],
        'h4': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        'h3': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'h2': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'h1': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
      },

      borderRadius: {
        'pill': '9999px',
      },

      // ─────────────────────────────────────────────────────────────
      // Sombras — usam CSS var de cor (preta nos dois modos)
      // ─────────────────────────────────────────────────────────────
      boxShadow: {
        'glow-accent':
          '0 0 0 1px rgb(var(--accent) / 0.20), 0 8px 32px -8px rgb(var(--accent) / 0.40)',
        'glow-soft': '0 0 24px -4px rgb(var(--accent) / 0.25)',
        'elevated':
          '0 10px 40px -12px rgb(var(--shadow-color) / 0.30), 0 2px 8px -2px rgb(var(--shadow-color) / 0.20)',
        'card':
          '0 1px 2px rgb(var(--shadow-color) / 0.10), 0 4px 12px -4px rgb(var(--shadow-color) / 0.15)',
        'card-hover':
          '0 1px 2px rgb(var(--shadow-color) / 0.10), 0 12px 32px -8px rgb(var(--shadow-color) / 0.25)',
        'inset-border': 'inset 0 0 0 1px rgb(var(--primary) / 0.08)',
      },

      // ─────────────────────────────────────────────────────────────
      // Easings + durations canônicos
      // ─────────────────────────────────────────────────────────────
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
        'standard': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'quick': '150ms',
        'base': '250ms',
        'slow': '400ms',
        'intro': '700ms',
      },

      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-beam': 'borderBeam 3s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        borderBeam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      backdropBlur: {
        'xs': '4px',
        'nav': '20px',
      },
    },
  },
  plugins: [],
};
