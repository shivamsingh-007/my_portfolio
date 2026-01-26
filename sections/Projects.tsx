
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';
import { Project } from '../types';
import ChromaGrid from '../components/ChromaGrid';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isSecurity = project.techStack.includes('Cybersecurity') || project.techStack.includes('ML') || project.techStack.includes('CNN');

  return (
    <motion.div
      className="relative flex-shrink-0 w-[350px] md:w-[500px] h-[550px] rounded-[2rem] overflow-hidden glass border border-white/5 transition-all duration-500 mx-5 group"
    >
      <div className="absolute inset-0">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
      </div>

      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-20">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          </div>
          {isSecurity && (
            <div className="text-[8px] font-cyber text-white/40 uppercase tracking-[0.3em] mt-2 flex items-center gap-1">
              <Activity size={10} /> Operational State: Active
            </div>
          )}
        </div>
        <div className="text-[10px] font-display tracked-formal text-white/20 group-hover:text-white transition-colors">
          DATASET_V{project.id.slice(-2).padStart(2, '0')}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
        {isSecurity && (
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '92%' }}
                className="h-full bg-white/60"
              />
            </div>
            <span className="text-[10px] font-cyber font-bold text-white/60">INTEGRITY SCORE: 92%</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white group-hover:border-white/20 transition-all">
              {tech}
            </span>
          ))}
        </div>
        
        <h3 className="text-3xl font-display font-black text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 uppercase tracking-tighter">
          {project.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
          {project.description}
        </p>
        
        <div className="flex items-center gap-8 translate-y-2 opacity-60 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <a href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-white text-[10px] tracked-formal font-bold hover:underline transition-all uppercase">
            <Github size={16} /> Repository Access
          </a>
          <a href="#" className="flex items-center gap-2 text-white text-[10px] tracked-formal font-bold hover:underline transition-all uppercase">
            <ArrowUpRight size={16} /> Technical Demo
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-white/5 pointer-events-none" />
    </motion.div>
  );
};

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 35}%`]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#020202]">
        <ChromaGrid opacity={0.1} />
        
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

        <div className="px-6 mb-12 max-w-7xl mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[2px] w-12 bg-white/40 rounded-full" />
             <span className="text-white/40 font-display text-[10px] tracked-formal font-black">Project Archive</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter leading-none uppercase">
            TECHNICAL <br />
            <span className="text-white/10">SOLUTIONS</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex relative z-10">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
          <div className="flex-shrink-0 w-64" />
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 text-white/10 z-10">
          <span className="text-[10px] font-display tracked-formal uppercase font-cyber">Scroll to Cycle Nodes</span>
          <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress }} 
              className="absolute inset-0 bg-white/40 origin-left"
            />
          </div>
          <span className="text-[10px] font-mono">{Math.round(scrollYProgress.get() * 100)}% Index</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
