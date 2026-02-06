
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Shield, Cpu, Zap } from 'lucide-react';
import SplitText from '../components/SplitText';

const roadmap = [
  { year: '2024', goal: 'Autonomous Intelligence Systems', icon: Cpu, status: 'Active Development' },
  { year: '2025', goal: 'Distributed Sovereignty Networks', icon: Shield, status: 'Research Phase' },
  { year: '2026', goal: 'Pioneer High-Impact Technologies', icon: Zap, status: 'Strategic Vision' },
];

const Ambitions: React.FC<{ text: string }> = ({ text }) => {
  return (
    <section id="ambitions" className="py-28 px-6 bg-[#020202]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Compass className="text-white/40 mb-6" size={40} />
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tighter">
              <SplitText text="STRATEGIC" delay={0.1} /> <br />
              <span className="text-white/20">
                <SplitText text="DIRECTION" delay={0.3} />
              </span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light italic border-l-2 border-white/20 pl-8">
              "{text}"
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />
            <motion.div
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-cyan-500/40 via-fuchsia-500/30 to-transparent -translate-x-1/2"
            />

            <div className="space-y-12">
              {roadmap.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`flex items-center gap-8 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-white/60 font-display font-bold block text-sm tracking-widest">{item.year}</span>
                    <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{item.goal}</h4>
                    <p className="text-white/20 text-xs uppercase tracking-widest mt-1">{item.status}</p>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center bg-[#0a0a0a] group hover:bg-white transition-all duration-300">
                    <item.icon size={20} className="text-white/60 group-hover:text-black" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ambitions;
