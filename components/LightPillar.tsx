import React from 'react';
import { motion } from 'framer-motion';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
  interactive?: boolean;
  mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  quality?: 'low' | 'medium' | 'high';
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1,
  rotationSpeed = 0.3,
  glowAmount = 0.002,
  pillarWidth = 3,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  pillarRotation = 25,
  interactive = false,
  mixBlendMode = 'screen',
  quality = 'high',
}) => {
  const pillarCount = quality === 'high' ? 16 : quality === 'medium' ? 12 : 8;
  
  const pillars = Array.from({ length: pillarCount }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 4 + Math.random() * 2,
    left: `${(100 / pillarCount) * i + (100 / pillarCount) / 2}%`,
    opacity: (0.15 + Math.random() * 0.25) * intensity,
    height: `${(40 + Math.random() * 60) * pillarHeight}%`,
    width: pillarWidth,
  }));

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0" 
      style={{ mixBlendMode }}
    >
      {pillars.map((pillar) => (
        <motion.div
          key={pillar.id}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            opacity: [0, pillar.opacity, pillar.opacity, 0],
            rotate: interactive ? [0, pillarRotation, -pillarRotation, 0] : 0,
          }}
          transition={{
            duration: pillar.duration,
            repeat: Infinity,
            delay: pillar.delay,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 origin-bottom"
          style={{
            left: pillar.left,
            height: pillar.height,
            width: `${pillar.width}px`,
            background: `linear-gradient(to top, ${bottomColor}, ${topColor}, transparent)`,
            boxShadow: `0 0 ${20 + glowAmount * 10000}px ${bottomColor}`,
            filter: `blur(${noiseIntensity * 2}px)`,
            transform: `translateX(-50%) rotate(${pillarRotation}deg)`,
            transformOrigin: 'bottom center',
          }}
        />
      ))}

      {/* Additional glow effects */}
      <motion.div
        animate={{
          opacity: [0.3 * intensity, 0.6 * intensity, 0.3 * intensity],
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4 / rotationSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full blur-[100px]"
        style={{ background: bottomColor, opacity: 0.1 * intensity }}
      />
      <motion.div
        animate={{
          opacity: [0.3 * intensity, 0.5 * intensity, 0.3 * intensity],
          scale: [1, 1.2, 1],
          rotate: [360, 0],
        }}
        transition={{
          duration: 5 / rotationSpeed,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full blur-[100px]"
        style={{ background: topColor, opacity: 0.1 * intensity }}
      />
    </div>
  );
};

export default LightPillar;
