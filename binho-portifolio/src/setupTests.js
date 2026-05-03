import '@testing-library/jest-dom';

// jsdom does not implement IntersectionObserver / matchMedia / scrollTo,
// which framer-motion's whileInView and useScroll rely on. Stub them.
if (typeof window !== 'undefined') {
  if (!window.IntersectionObserver) {
    window.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  }
  if (!window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  window.scrollTo = window.scrollTo || (() => {});
}
