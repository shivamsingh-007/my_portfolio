
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Code, Cpu, Award, Zap, MessageSquare, Settings } from 'lucide-react';

const navItems = [
  { name: 'Intro', path: '/', icon: <Terminal size={18} />, hash: '#intro' },
  { name: 'Projects', path: '/', icon: <Cpu size={18} />, hash: '#projects' },
  { name: 'Stats', path: '/', icon: <Zap size={18} />, hash: '#stats' },
  { name: 'Certs', path: '/', icon: <Award size={18} />, hash: '#certs' },
  { name: 'Admin', path: '/admin', icon: <Settings size={18} /> },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleScroll = (hash: string | undefined) => {
    if (!hash) return;
    const element = document.querySelector(hash);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Flowing Menu */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-cyan-500/30 transition-colors shadow-2xl"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.hash ? handleScroll(item.hash) : null}
              className="relative px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
            >
              <Link to={item.path} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </Link>
              <motion.div 
                className="absolute inset-0 bg-white/5 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="nav-glow"
              />
            </button>
          ))}
        </motion.div>
      </nav>

      {/* Mobile Bubble Menu Trigger */}
      <div className="md:hidden fixed top-6 right-6 z-[101]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full glass border border-white/20 shadow-xl"
        >
          {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Bubble Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 100, y: -100 }}
            animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{ scale: 0, opacity: 0, x: 100, y: -100 }}
            className="md:hidden fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => item.hash ? handleScroll(item.hash) : setIsOpen(false)}
                className="text-4xl font-display font-bold text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <Link to={item.path}>{item.name}</Link>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
