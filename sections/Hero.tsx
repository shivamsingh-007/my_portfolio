
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Shield, Terminal, Cpu, Sparkles } from 'lucide-react';
import { PortfolioData } from '../types';
import LightPillar from '../components/LightPillar';
import SplitText from '../components/SplitText';
import ProfileCard from '../components/ProfileCard';

const Hero: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section id="intro" className="relative min-h-screen overflow-hidden">
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.2}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-10 right-0 w-[360px] h-[360px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
          {/* Shivam Singh Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-display">
                SHIVAM SINGH
              </span>
            </h2>
            <motion.div
              animate={{
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="mt-2 h-1 w-32 mx-auto lg:mx-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
            />
          </motion.div>

          <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10">
            <Sparkles size={14} className="text-cyan-300" />
            <span className="text-[10px] tracked-formal font-bold text-white/60">SYSTEMS • SECURITY • AUTONOMY</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
              <SplitText text="Shivam" delay={0.2} />
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-400 font-serif italic">
              <SplitText text="Singh" delay={0.5} />
            </span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {data.bio}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[10px] font-cyber uppercase tracking-[0.35em]">
            <span className="px-4 py-2 glass border border-white/10 text-white/70 flex items-center gap-2">
              <Shield size={12} /> Integrity First
            </span>
            <span className="px-4 py-2 glass border border-white/10 text-white/50 flex items-center gap-2">
              <Terminal size={12} /> Systematic Execution
            </span>
            <span className="px-4 py-2 glass border border-white/10 text-white/60 flex items-center gap-2">
              <Cpu size={12} /> Secure Intelligence
            </span>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {data.skills.slice(0, 10).map((skill) => (
              <motion.li
                key={skill}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] font-cyber text-white/60 glass border border-white/10"
              >
                {skill}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right Side - Profile Card */}
        <div className="flex justify-center lg:justify-end">
          <ProfileCard
            name="Shivam Singh"
            title="Software Engineer"
            handle="shivamsingh007"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/anime-samurai.jpg"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => window.location.href = '#contact'}
            showIcon
            showBehindGlow
            behindGlowColor="rgba(125, 190, 255, 0.67)"
            customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
          />
        </div>
      </div>
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
