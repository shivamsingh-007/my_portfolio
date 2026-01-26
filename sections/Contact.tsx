
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, ArrowRight, Code } from 'lucide-react';

const socialIcons = [
  { Icon: Github, color: 'text-white', href: 'https://github.com/shivamsingh-007' },
  { Icon: Linkedin, color: 'text-blue-500', href: 'https://www.linkedin.com/in/shivam-singh-a58364384' },
  { Icon: Code, color: 'text-orange-400', href: 'https://leetcode.com/shivamsingh-007/' },
  { Icon: MessageSquare, color: 'text-green-500', href: '#' },
  { Icon: Mail, color: 'text-fuchsia-400', href: 'mailto:shivam.singh.koyad007@gmail.com' },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-12 uppercase">Let's <span className="text-orange-500">Sync</span>.</h2>
        
        {/* Logo Loop Marquee */}
        <div className="flex gap-12 overflow-hidden py-10 mb-20">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 items-center min-w-full"
          >
            {[...socialIcons, ...socialIcons, ...socialIcons].map((item, idx) => (
              <a key={idx} href={item.href} target="_blank" rel="noreferrer">
                <item.Icon size={64} className={`${item.color} opacity-20 hover:opacity-100 transition-opacity cursor-pointer`} />
              </a>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="glass p-10 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6 font-display uppercase tracking-wider">Drop a Message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-orange-500" />
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-orange-500" />
              <textarea placeholder="How can we collaborate on AI, Cyber, or Blockchain?" rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-orange-500"></textarea>
              <button className="w-full py-4 bg-orange-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-400 transition-colors uppercase tracking-widest">
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
                <div className="flex items-center gap-4 text-white group cursor-pointer">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <Mail className="text-orange-400 group-hover:text-black" size={18} />
                  </div>
                  <span className="text-sm font-display tracking-wider">shivam.singh.koyad007@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-white group cursor-pointer">
                   <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <Linkedin className="text-orange-400 group-hover:text-black" size={18} />
                  </div>
                  <span className="text-sm font-display tracking-wider">shivam-singh-a58364384</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 glass p-6 rounded-2xl border border-white/5">
               <p className="text-xs text-orange-500 uppercase tracking-widest mb-2 font-bold">Base Location</p>
               <p className="text-white font-display font-bold">Global Ready / Remote Engineering</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
