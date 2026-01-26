
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const GhostCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isVisible]);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mousePos.x - 16, springConfig);
  const cursorY = useSpring(mousePos.y - 16, springConfig);

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-[var(--neon-cyan)] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[var(--neon-magenta)] rounded-full blur-[2px]" />
    </motion.div>
  );
};

export default GhostCursor;
