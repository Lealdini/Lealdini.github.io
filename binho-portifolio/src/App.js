import React, { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import ThemeToggle from './components/layout/ThemeToggle';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import BootIntro from './components/ui/BootIntro';
import SectionSkeleton from './components/ui/SectionSkeleton';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import TechStack from './components/sections/TechStack';
import Footer from './components/layout/Footer';
import ScrollReveal from './components/anim/ScrollReveal';
import { useLanguage } from './i18n/LanguageContext';

// Below-the-fold + non-essential chrome → code-split.
const TechTalks = lazy(() => import('./components/sections/TechTalks'));
const LabSection = lazy(() => import('./components/sections/LabSection'));
const BackgroundMusic = lazy(() => import('./components/ui/BackgroundMusic'));

const sections = [
  { id: 'hero', Component: Hero, lazy: false, reveal: false },
  { id: 'about', Component: About, lazy: false, reveal: true },
  { id: 'experience', Component: Experience, lazy: false, reveal: true },
  { id: 'tech-stack', Component: TechStack, lazy: false, reveal: true },
  { id: 'tech-talks', Component: TechTalks, lazy: true, reveal: true },
  { id: 'lab', Component: LabSection, lazy: true, reveal: true },
];

function App() {
  const { t } = useLanguage();

  return (
    <div className="bg-background text-primary min-h-screen overflow-x-hidden">
      {/* Skip link — escondido até foco */}
      <a href="#main" className="skip-link">
        {t('nav.skip_link')}
      </a>

      <BootIntro />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <ThemeToggle />
      <Suspense fallback={null}>
        <BackgroundMusic />
      </Suspense>

      <main id="main" tabIndex={-1} className="focus:outline-none">
        {sections.map(({ id, Component, lazy: isLazy, reveal }) => {
          const node = isLazy ? (
            <Suspense fallback={<SectionSkeleton />}>
              <Component />
            </Suspense>
          ) : (
            <Component />
          );
          return reveal ? (
            <ScrollReveal key={id}>{node}</ScrollReveal>
          ) : (
            <React.Fragment key={id}>{node}</React.Fragment>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}

export default App;
