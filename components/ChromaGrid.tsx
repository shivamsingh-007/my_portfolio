
import React from 'react';
import { motion } from 'framer-motion';

interface ChromaGridProps {
  opacity?: number;
  count?: number;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({ opacity = 0.1, count = 144 }) => {
  return (
    <div className="absolute inset-0 -z-1 grid grid-cols-6 sm:grid-cols-12 gap-px pointer-events-none" style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            backgroundColor: [
              'rgba(0,245,255,0)', 
              'rgba(0,245,255,0.1)', 
              'rgba(255,0,255,0.05)', 
              'rgba(0,245,255,0)'
            ],
          }}
          transition={{
            duration: Math.random() * 7 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="w-full h-full border-[0.5px] border-white/5"
        />
      ))}
    </div>
  );
};

export default ChromaGrid;
