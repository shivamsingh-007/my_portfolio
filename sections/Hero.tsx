
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, Terminal, Shield } from 'lucide-react';
import { PortfolioData } from '../types';
import ThreeScene from '../components/ThreeScene';

const Hero: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <section id="intro" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <ThreeScene />
      
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-3">
             <div className="h-px w-12 bg-white/30" />
             <span className="text-white/60 font-display tracked-formal text-[10px] font-bold">
               ENGINEERING PRINCIPLES • SYSTEMS INTEGRITY
             </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-display font-black mb-8 leading-[0.85] tracking-tighter">
            <span className="text-white">SHIVAM</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-white to-slate-500 italic">SINGH</span>
          </h1>

          <div className="space-y-4 mb-12">
            <p className="text-slate-400 text-lg md:text-xl max-w-lg text-formal font-medium leading-relaxed">
              {data.bio}
            </p>
            <div className="flex flex-col gap-2 border-l-2 border-white/10 pl-6 py-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-bold flex items-center gap-2 font-cyber"><Layers size={12}/> Methodology over impulse</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold flex items-center gap-2 font-cyber"><Terminal size={12}/> Systematic execution</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold flex items-center gap-2 font-cyber"><Shield size={12}/> Operational Rigor</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-white text-black font-bold rounded-full hover:shadow-[0_10px_40px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
            >
              Technical Documentation
            </motion.a>
            <motion.a 
              href={`mailto:${data.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 glass-premium text-white font-bold rounded-full hover:border-white/50 transition-all"
            >
              Professional Inquiry
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full max-w-[550px] aspect-[4/3] mx-auto">
             <div className="absolute -top-10 -right-10 w-24 h-24 border-t-2 border-r-2 border-white/10 rounded-tr-3xl" />
             <div className="absolute -bottom-10 -left-10 w-24 h-24 border-b-2 border-l-2 border-white/10 rounded-bl-3xl" />
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 rounded-3xl blur-[80px]" />
             
             <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden glass border border-white/10 group bg-[#0a0a0a]">
                <img 
                  src={data.profilePic} 
                  alt={data.name}
                  className="w-full h-full object-cover transition-opacity duration-700 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white/60 font-display font-bold text-xs tracked-formal">AUTHENTICATION: {data.name.toUpperCase().replace(' ', '_')}</p>
                  <p className="text-white text-[10px] font-medium mt-1 uppercase font-cyber tracking-[0.4em] opacity-80">Designation: Strategic Systems Architect</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-display tracked-formal uppercase tracking-[0.5em]">Scroll to Navigate</span>
        <ArrowDown size={14} className="text-white/40" />
      </motion.div>
    </section>
  );
};

export default Hero;
