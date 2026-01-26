
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { Certificate } from '../types';

const Certificates: React.FC<{ certificates: Certificate[] }> = ({ certificates }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % certificates.length);
  const prev = () => setIndex((prev) => (prev - 1 + certificates.length) % certificates.length);

  return (
    <section id="certs" className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <Award className="mx-auto text-cyan-400 mb-4" size={32} />
        <h2 className="text-4xl font-display font-black text-white">Credentials</h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="glass rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 border border-white/10"
          >
            <div className="aspect-video md:aspect-auto">
              <img 
                src={certificates[index].imageUrl} 
                alt={certificates[index].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-cyan-400 text-xs font-display tracking-widest uppercase mb-2">
                {certificates[index].issuer}
              </span>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                {certificates[index].title}
              </h3>
              <p className="text-gray-500 mb-8">{certificates[index].date}</p>
              <a 
                href={certificates[index].link} 
                target="_blank"
                className="inline-block w-fit px-6 py-2 glass border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all"
              >
                Verify Certificate
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
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
