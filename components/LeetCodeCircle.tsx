import React from 'react';
import { motion } from 'framer-motion';

interface LeetCodeCircleProps {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal?: number;
  mediumTotal?: number;
  hardTotal?: number;
  loading?: boolean;
}

const LeetCodeCircle: React.FC<LeetCodeCircleProps> = ({
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  easyTotal = 828,
  mediumTotal = 1732,
  hardTotal = 758,
  loading = false,
}) => {
  // LeetCode exact implementation values
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke dash values exactly like LeetCode
  const calculateDash = (solved: number, total: number) => {
    const percentage = total > 0 ? (solved / total) : 0;
    const dashLength = circumference * percentage;
    const gapLength = circumference - dashLength;
    return { dashLength, gapLength };
  };

  const easy = calculateDash(easySolved, easyTotal);
  const medium = calculateDash(mediumSolved, mediumTotal);
  const hard = calculateDash(hardSolved, hardTotal);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
        style={{ width: 160, height: 160, aspectRatio: '1/1' }}
      >
        <div className="absolute left-1/2 top-1/2 h-[113%] w-[113%] -translate-x-1/2 -translate-y-[44%]">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 h-full w-full fill-transparent"
          >
            <defs>
              <clipPath id="bar-mask">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.3622 21.3622C5.54592 37.1784 5.54592 62.8216 21.3622 78.6378C21.9479 79.2236 21.9479 80.1734 21.3622 80.7591C20.7764 81.3449 19.8266 81.3449 19.2408 80.7591C2.25303 63.7713 2.25303 36.2287 19.2408 19.2409C36.2286 2.25305 63.7713 2.25305 80.7591 19.2409C97.7469 36.2287 97.7469 63.7713 80.7591 80.7591C80.1733 81.3449 79.2236 81.3449 78.6378 80.7591C78.052 80.1734 78.052 79.2236 78.6378 78.6378C94.454 62.8216 94.454 37.1784 78.6378 21.3622C62.8216 5.54594 37.1784 5.54594 21.3622 21.3622Z"
                />
              </clipPath>
            </defs>

            <g clipPath="url(#bar-mask)">
              {/* Easy - outer ring */}
              <g
                className="origin-center transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{ transform: 'rotate(225deg)', transformOrigin: 'center' }}
              >
                {/* Background */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: 'rgba(0, 255, 135, 0.2)',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDasharray: `${circumference} 0`,
                    strokeDashoffset: circumference / 4,
                  }}
                />
                {/* Progress */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: '#00ff87',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDashoffset: circumference / 4,
                  }}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{
                    strokeDasharray: loading
                      ? `0 ${circumference}`
                      : `${easy.dashLength} ${easy.gapLength}`,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                />
              </g>

              {/* Medium - middle ring */}
              <g
                className="origin-center transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{ transform: 'rotate(225deg)', transformOrigin: 'center' }}
              >
                {/* Background */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius - 7}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: 'rgba(255, 161, 22, 0.2)',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDasharray: `${circumference} 0`,
                    strokeDashoffset: circumference / 4,
                  }}
                />
                {/* Progress */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius - 7}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: '#ffa116',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDashoffset: circumference / 4,
                  }}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{
                    strokeDasharray: loading
                      ? `0 ${circumference}`
                      : `${medium.dashLength} ${medium.gapLength}`,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
                />
              </g>

              {/* Hard - inner ring */}
              <g
                className="origin-center transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{ transform: 'rotate(225deg)', transformOrigin: 'center' }}
              >
                {/* Background */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius - 14}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: 'rgba(255, 55, 95, 0.2)',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDasharray: `${circumference} 0`,
                    strokeDashoffset: circumference / 4,
                  }}
                />
                {/* Progress */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius - 14}
                  className="fill-transparent transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                  style={{
                    stroke: '#ff375f',
                    strokeWidth: 3,
                    strokeLinecap: 'round',
                    strokeDashoffset: circumference / 4,
                  }}
                  initial={{ strokeDasharray: `0 ${circumference}` }}
                  animate={{
                    strokeDasharray: loading
                      ? `0 ${circumference}`
                      : `${hard.dashLength} ${hard.gapLength}`,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
                />
              </g>
            </g>
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center pointer-events-none"
            >
              <div className="text-white mb-0.5">
                <span className="text-[30px] font-semibold leading-[32px]">
                  {loading ? '-' : totalSolved}
                </span>
                <span className="text-sm">/{easyTotal + mediumTotal + hardTotal}</span>
              </div>
              <div className="text-slate-500 text-xs">Solved</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 flex items-center gap-6 flex-wrap justify-center"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00ff87]" />
          <span className="text-slate-400 text-sm font-mono">
            Easy <span className="text-white font-semibold">{loading ? '-' : easySolved}</span>
            <span className="text-slate-600">/{easyTotal}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ffa116]" />
          <span className="text-slate-400 text-sm font-mono">
            Medium <span className="text-white font-semibold">{loading ? '-' : mediumSolved}</span>
            <span className="text-slate-600">/{mediumTotal}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff375f]" />
          <span className="text-slate-400 text-sm font-mono">
            Hard <span className="text-white font-semibold">{loading ? '-' : hardSolved}</span>
            <span className="text-slate-600">/{hardTotal}</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default LeetCodeCircle;
