import React, { Suspense, lazy } from 'react';
import ThemeToggle from './components/layout/ThemeToggle';
import BackgroundMusic from './components/ui/BackgroundMusic';
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

// Below-the-fold sections — code-split so the initial bundle only carries
// what's painted in the first viewport.
const TechTalks = lazy(() => import('./components/sections/TechTalks'));
const LabSection = lazy(() => import('./components/sections/LabSection'));

const sections = [
  { id: 'hero', Component: Hero, lazy: false },
  { id: 'about', Component: About, lazy: false },
  { id: 'experience', Component: Experience, lazy: false },
  { id: 'tech-stack', Component: TechStack, lazy: false },
  { id: 'tech-talks', Component: TechTalks, lazy: true },
  { id: 'lab', Component: LabSection, lazy: true },
];

function App() {
  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-background dark:text-white min-h-screen overflow-x-hidden selection:bg-accent/30 selection:text-white transition-colors duration-500">
      <BootIntro />
      <CustomCursor />
      <ScrollProgress />
      <ThemeToggle />
      <BackgroundMusic />
      <main>
        {sections.map(({ id, Component, lazy: isLazy }) => (
          <ScrollReveal key={id}>
            {isLazy ? (
              <Suspense fallback={<SectionSkeleton />}>
                <Component />
              </Suspense>
            ) : (
              <Component />
            )}
          </ScrollReveal>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
