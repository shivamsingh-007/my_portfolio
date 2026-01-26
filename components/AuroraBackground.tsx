
import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#020202]">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: ['-25%', '15%', '-25%'],
          y: ['-15%', '25%', '-15%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] rounded-full bg-cyan-600/10 blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.1, 0.25, 0.1],
          x: ['25%', '-15%', '25%'],
          y: ['25%', '-15%', '25%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-full bg-fuchsia-700/10 blur-[140px]"
      />
      
      {/* Dark Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
};

export default AuroraBackground;
