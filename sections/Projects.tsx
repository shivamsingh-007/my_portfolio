
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import SplitText from '../components/SplitText';
import LightPillar from '../components/LightPillar';
import Carousel from '../components/Carousel';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const isSecurity = project.techStack.some((tag) => ['Cybersecurity', 'ML', 'CNN'].includes(tag));

  return (
    <motion.div 
      className="relative w-full h-full group"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 0.6 }}
          transition={{ duration: 0.3 }}
        />
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-500/0 rounded-2xl"
          whileHover={{ borderColor: "rgba(6, 182, 212, 0.5)" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        <motion.div 
          className="flex flex-wrap gap-2 mb-3"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {project.techStack.map((tech, i) => (
            <motion.span
              key={tech}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              className="px-2 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/50 border border-white/10 bg-white/5 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.h3 
          className="text-xl font-display font-black text-white uppercase tracking-tighter mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-slate-400 text-xs mb-4 line-clamp-2 leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white text-[9px] tracked-formal font-bold uppercase"
            whileHover={{ scale: 1.1, x: 5, color: "#06b6d4" }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={12} /> Repo
          </motion.a>
          <motion.a
            href="#"
            className="flex items-center gap-1 text-white text-[9px] tracked-formal font-bold uppercase"
            whileHover={{ scale: 1.1, x: 5, color: "#06b6d4" }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUpRight size={12} /> Demo
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <section id="projects" className="relative py-32 px-6 bg-[#020202]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="h-[2px] w-12 bg-white/40 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <span className="text-white/40 font-display text-[10px] tracked-formal font-black">Project Archive</span>
            <motion.div 
              className="h-[2px] w-12 bg-white/40 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none uppercase">
            <SplitText text="ENGINEERED" delay={0.1} /> <br />
            <span className="text-white/10">
              <SplitText text="SYSTEMS" delay={0.3} />
            </span>
          </h2>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Swipe through featured deployments across AI security, distributed systems, and applied intelligence.
          </p>
        </motion.div>

        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
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
          <Carousel
            projects={projects}
            baseWidth={300}
            autoplay={false}
            autoplayDelay={3000}
            pauseOnHover={false}
            loop={false}
            round={false}
          />
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.p 
            className="text-[10px] font-display tracked-formal text-white/30 uppercase"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Drag or Click to Navigate
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
