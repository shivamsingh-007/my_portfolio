import React, { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface StackProps {
  cards: React.ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
}

const Stack: React.FC<StackProps> = ({
  cards,
  randomRotation = false,
  sensitivity = 200,
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
}) => {
  const [stack, setStack] = useState(cards.map((_, i) => i));
  const [isDragging, setIsDragging] = useState(false);

  const sendToBack = (index: number) => {
    setStack((prev) => {
      const newStack = [...prev];
      const removed = newStack.splice(index, 1);
      return [...newStack, ...removed];
    });
  };

  const handleDragEnd = (event: any, info: PanInfo, index: number) => {
    setIsDragging(false);
    const threshold = sensitivity;
    if (Math.abs(info.offset.x) > threshold || Math.abs(info.offset.y) > threshold) {
      sendToBack(index);
    }
  };

  return (
    <div className="relative w-full h-full">
      {stack.map((cardIndex, i) => {
        const isTop = i === stack.length - 1;
        const rotation = randomRotation ? (Math.random() - 0.5) * 10 : 0;
        
        return (
          <motion.div
            key={cardIndex}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              zIndex: i,
              rotate: rotation,
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: isTop ? 1 : 0.95 - (stack.length - i - 1) * 0.05,
              y: isTop ? 0 : -(stack.length - i - 1) * 8,
              opacity: 1,
            }}
            drag={isTop}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, info) => handleDragEnd(e, info, i)}
            onClick={() => {
              if (sendToBackOnClick && !isDragging) {
                sendToBack(i);
              }
            }}
            whileHover={isTop ? { scale: 1.02 } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-black">
              {cards[cardIndex]}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Stack;
