
import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Stats from '../sections/Stats';
import Certificates from '../sections/Certificates';
import Ambitions from '../sections/Ambitions';
import Contact from '../sections/Contact';
import AuroraBackground from '../components/AuroraBackground';
import FloatingDock from '../components/FloatingDock';
import Navigation from '../components/Navigation';
import GhostCursor from '../components/GhostCursor';

const SideScrollIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-64 w-[2px] bg-white/5 z-50 rounded-full overflow-hidden hidden md:block">
      <motion.div 
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-fuchsia-500 origin-top"
        style={{ scaleY }}
      />
      <div className="absolute -left-8 top-0 h-full flex flex-col justify-between py-2 text-[8px] font-display text-white/20 tracking-tighter uppercase [writing-mode:vertical-lr]">
        <span>Start</span>
        <span>Progress</span>
        <span>End</span>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { data } = usePortfolio();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative">
      <GhostCursor />
      <AuroraBackground />
      <Navigation />
      <SideScrollIndicator />
      
      <main>
        <Hero data={data} />
        <Projects projects={data.projects} />
        <Stats github={data.githubUsername} leetcode={data.leetcodeUsername} />
        <Certificates certificates={data.certificates} />
        <Ambitions text={data.ambitions} />
        <Contact data={data} />
      </main>

      <FloatingDock />
      
      <footer className="py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} {data.name}. Engineered for the next decade.</p>
      </footer>
    </div>
  );
};

export default Home;
