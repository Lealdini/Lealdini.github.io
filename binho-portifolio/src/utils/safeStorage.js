// Safe localStorage wrapper.
// Browsers in private mode (Safari) or with quota exceeded throw on access;
// SSR-like environments don't have `window`. Failing silently is fine for
// non-critical UI prefs (theme, language).
const hasWindow = typeof window !== 'undefined';

export const safeStorage = {
  get(key) {
    if (!hasWindow) return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    if (!hasWindow) return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* noop */
    }
  },
  remove(key) {
    if (!hasWindow) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* noop */
    }
  },
};
