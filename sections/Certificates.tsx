
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Certificate } from '../types';
import SplitText from '../components/SplitText';

const Certificates: React.FC<{ certificates: Certificate[] }> = ({ certificates }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <section id="certs" className="py-28 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <Award className="mx-auto text-cyan-400 mb-4" size={32} />
        <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase tracking-widest">
          <SplitText text="Credentials" delay={0.1} />
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="relative h-[420px] md:h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 glass rounded-[2rem] overflow-hidden border border-white/10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative">
                <img
                  src={certificates[index].imageUrl}
                  alt={certificates[index].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-cyan-400 text-xs font-display tracking-widest uppercase mb-2">
                  {certificates[index].issuer}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  {certificates[index].title}
                </h3>
                <p className="text-gray-500 mb-8">{certificates[index].date}</p>
                <a
                  href={certificates[index].link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit px-6 py-2 glass border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  Verify Certificate
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button onClick={prev} className="p-3 glass rounded-full hover:border-cyan-500/50">
            <ChevronLeft />
          </button>
          <button onClick={next} className="p-3 glass rounded-full hover:border-cyan-500/50">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
