
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronUp, Code } from 'lucide-react';

const icons = [
  { Icon: Github, href: 'https://github.com/shivamsingh-007', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/shivam-singh-a58364384', label: 'LinkedIn' },
  { Icon: Code, href: 'https://leetcode.com/shivamsingh-007/', label: 'LeetCode' },
  { Icon: Mail, href: 'mailto:shivam.singh.koyad007@gmail.com', label: 'Email' },
];

const DockItem: React.FC<{ Icon: any; href: string; mouseX: any; label?: string }> = ({ Icon, href, mouseX }) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() || { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ width, height }}
      className="flex items-center justify-center rounded-full glass border border-white/10 text-white/70 hover:text-orange-400 hover:border-orange-500/50 transition-colors"
    >
      <Icon size={24} />
    </motion.a>
  );
};

const FloatingDock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 h-16 px-4 pb-2 glass rounded-2xl border border-white/5 shadow-2xl"
      >
        {icons.map((item, idx) => (
          <DockItem key={idx} {...item} mouseX={mouseX} />
        ))}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center w-10 h-10 rounded-full glass border border-white/10 text-white/40 hover:text-white mb-2"
        >
          <ChevronUp size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default FloatingDock;
