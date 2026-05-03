import React from 'react';
import ThemeToggle from './components/layout/ThemeToggle';
import BackgroundMusic from './components/ui/BackgroundMusic';
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import TechStack from './components/sections/TechStack';
import TechTalks from './components/sections/TechTalks';
import LabSection from './components/sections/LabSection';
import Footer from './components/layout/Footer';
import ScrollReveal from './components/anim/ScrollReveal';

const sections = [
  { id: 'hero', Component: Hero },
  { id: 'about', Component: About },
  { id: 'experience', Component: Experience },
  { id: 'tech-stack', Component: TechStack },
  { id: 'tech-talks', Component: TechTalks },
  { id: 'lab', Component: LabSection }
];

function App() {
  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-background dark:text-white min-h-screen overflow-x-hidden selection:bg-accent/30 selection:text-white transition-colors duration-500">
      <CustomCursor />
      <ScrollProgress />
      <ThemeToggle />
      <BackgroundMusic />
      <main>
        {sections.map(({ id, Component }) => (
          <ScrollReveal key={id}>
            <Component />
          </ScrollReveal>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
