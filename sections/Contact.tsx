
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, ArrowRight, Code } from 'lucide-react';
import { PortfolioData } from '../types';
import SplitText from '../components/SplitText';

const Contact: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const socialIcons = [
    { Icon: Github, color: 'text-white', href: `https://github.com/${data.githubUsername}` },
    { Icon: Linkedin, color: 'text-blue-500', href: data.linkedin },
    { Icon: Code, color: 'text-orange-400', href: `https://leetcode.com/${data.leetcodeUsername}/` },
    { Icon: MessageSquare, color: 'text-green-500', href: '#' },
    { Icon: Mail, color: 'text-fuchsia-400', href: `mailto:${data.email}` },
  ];
  return (
    <section id="contact" className="py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-12 uppercase">
          <SplitText text="Let's" delay={0.1} /> <span className="text-cyan-400"><SplitText text="Sync" delay={0.3} /></span>.
        </h2>

        <div className="flex gap-12 overflow-hidden py-8 mb-16">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 items-center min-w-full"
          >
            {[...socialIcons, ...socialIcons, ...socialIcons].map((item, idx) => (
              <a key={idx} href={item.href} target="_blank" rel="noreferrer">
                <item.Icon size={56} className={`${item.color} opacity-20 hover:opacity-100 transition-opacity cursor-pointer`} />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="glass p-10 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6 font-display uppercase tracking-wider">Drop a Message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400" />
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400" />
              <textarea placeholder="How can we collaborate on AI, Cyber, or Blockchain?" rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-cyan-400"></textarea>
              <button className="w-full py-4 bg-cyan-400 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors uppercase tracking-widest">
                Transmit <ArrowRight size={20} />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed italic">
                "To become a high-impact engineer building technology that actually changes lives, not just ships features."
              </p>
              <div className="space-y-4">
                <a href={`mailto:${data.email}`} className="flex items-center gap-4 text-white group">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
                    <Mail className="text-cyan-300 group-hover:text-black" size={18} />
                  </div>
                  <span className="text-sm font-display tracking-wider">{data.email}</span>
                </a>
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white group">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-cyan-400 transition-colors">
                    <Linkedin className="text-cyan-300 group-hover:text-black" size={18} />
                  </div>
                  <span className="text-sm font-display tracking-wider">{data.linkedin.replace('https://www.linkedin.com/in/', '')}</span>
                </a>
              </div>
            </div>

            <div className="mt-12 glass p-6 rounded-2xl border border-white/5">
              <p className="text-xs text-cyan-300 uppercase tracking-widest mb-2 font-bold">Base Location</p>
              <p className="text-white font-display font-bold">Global Ready / Remote Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
