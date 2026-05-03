import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

test('renders without crashing and exposes interactive elements', () => {
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  const links = screen.getAllByRole('link');
  expect(links.length).toBeGreaterThan(0);
});
