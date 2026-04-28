import React from 'react';
import ThemeToggle from './components/layout/ThemeToggle';
import ScrollProgress from './components/ui/ScrollProgress';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import TechStack from './components/sections/TechStack';
import TechTalks from './components/sections/TechTalks';
import LabSection from './components/sections/LabSection';
import Footer from './components/layout/Footer';
import ScrollReveal from './components/anim/ScrollReveal';

function App() {
  return (
    <div className="bg-zinc-50 text-zinc-900 dark:bg-background dark:text-white min-h-screen overflow-x-hidden selection:bg-accent/30 selection:text-white transition-colors duration-500">
      <ScrollProgress />
      <ThemeToggle />
      <ScrollReveal><Hero /></ScrollReveal>
      <ScrollReveal><About /></ScrollReveal>
      <ScrollReveal><Experience /></ScrollReveal>
      <ScrollReveal><TechStack /></ScrollReveal>
      <ScrollReveal><TechTalks /></ScrollReveal>
      <ScrollReveal><LabSection /></ScrollReveal>
      <Footer />
    </div>
  );
}

export default App;
