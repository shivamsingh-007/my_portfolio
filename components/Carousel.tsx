import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Project } from '../types';
import { Github, ArrowUpRight } from 'lucide-react';

interface CarouselProps {
  projects: Project[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  projects,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isPaused, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1));
    }
  };

  const handlePrev = () => {
    setDirection(-1);
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const project = projects[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={!loop && currentIndex === 0}
        className="absolute left-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        disabled={!loop && currentIndex === projects.length - 1}
        className="absolute right-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Carousel Content */}
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full max-w-2xl"
            style={{ cursor: 'grab' }}
          >
            <div 
              className="relative mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl"
              style={{ 
                width: baseWidth, 
                height: 400,
                borderRadius: round ? '24px' : '12px'
              }}
            >
              {/* Project Image */}
              <div className="absolute inset-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/50 border border-white/10 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter mb-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-xs mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white text-[9px] tracked-formal font-bold hover:underline uppercase"
                  >
                    <Github size={12} /> Repo
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1 text-white text-[9px] tracked-formal font-bold hover:underline uppercase"
                  >
                    <ArrowUpRight size={12} /> Demo
                  </a>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fuchsia-400/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-fuchsia-400/30" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
