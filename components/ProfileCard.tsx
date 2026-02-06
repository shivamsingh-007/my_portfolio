/* eslint-disable react/no-unknown-property */
'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  showIcon?: boolean;
  showBehindGlow?: boolean;
  behindGlowColor?: string;
  customInnerGradient?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = false,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  showIcon = true,
  showBehindGlow = true,
  behindGlowColor = 'rgba(125, 190, 255, 0.67)',
  customInnerGradient = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)'
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || (window.innerWidth < 768 && !enableMobileTilt)) return;
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = ((y - centerY) / centerY) * -10;
      const tiltY = ((x - centerX) / centerX) * 10;
      
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Behind Glow */}
      {showBehindGlow && (
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl opacity-60"
          style={{ background: behindGlowColor }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative glass-premium backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Inner Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: customInnerGradient }}
        />

        {/* Avatar Section */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            {/* Status Indicator */}
            <motion.div 
              className="absolute -top-2 -right-2 z-20"
              animate={{
                y: [0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="relative flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-2 border-white"></span>
              </span>
            </motion.div>

            {/* Avatar with Glow */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 blur-lg opacity-50"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="relative w-full h-[500px] rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Vignette overlay for depth */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 z-10 pointer-events-none" />
                
                {/* Main image */}
                <img
                  src={avatarUrl || "/anime-samurai.jpg"}
                  alt={name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'contrast(1.15) saturate(1.1)',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="bg" x1="0%25" y1="0%25" x2="0%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23F5DEB3;stop-opacity:1" /%3E%3Cstop offset="60%25" style="stop-color:%23FFA566;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23FF6B35;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23bg)" width="400" height="300"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="20" fill="%23000" text-anchor="middle"%3EAnime Samurai%3C/text%3E%3C/svg%3E';
                  }}
                />
                
                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>

          {/* SHIVAM SINGH 007 Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-center"
          >
            <h2 className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 font-display">
              SHIVAM SINGH
            </h2>
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-2 text-2xl font-bold tracking-[0.5em] text-cyan-400"
            >
              007
            </motion.div>
          </motion.div>

          {/* User Info */}
          {showUserInfo && (
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-slate-300 text-sm mt-1">{title}</p>
              <p className="text-cyan-400 text-xs mt-1">@{handle}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-green-300 text-xs font-medium">{status}</span>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -10, 0],
            y: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ProfileCard;
