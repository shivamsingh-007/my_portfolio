
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Added Zap to the imports from lucide-react
import { Github, Code2, Flame, Award, Cpu, Globe, Database, Shield, RefreshCw, Zap } from 'lucide-react';
import ChromaGrid from '../components/ChromaGrid';

const StatCard = ({ icon: Icon, label, value, color, loading }: any) => (
  <motion.div
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
    className="glass p-8 rounded-[1.5rem] border border-white/5 flex items-center gap-8 transition-all group relative overflow-hidden"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/10 group-hover:border-${color}-500/50 transition-colors`}>
      <Icon size={24} className={`group-hover:text-${color}-400 transition-colors ${loading ? 'animate-pulse' : ''}`} />
    </div>
    <div>
      <p className="text-slate-500 text-[10px] tracked-formal mb-1 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-display font-black text-white">
        {loading ? (
          <span className="opacity-20 animate-pulse">---</span>
        ) : (
          value
        )}
      </p>
    </div>
  </motion.div>
);

const Stats: React.FC<{ github: string; leetcode: string }> = ({ github, leetcode }) => {
  const [githubData, setGithubData] = useState<any>(null);
  const [leetcodeData, setLeetcodeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch GitHub Stats
        const ghResponse = await fetch(`https://api.github.com/users/${github}`);
        const ghJson = await ghResponse.json();
        
        // Fetch LeetCode Stats (using a popular community API)
        const lcResponse = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcode}`);
        const lcJson = await lcResponse.json();

        setGithubData(ghJson);
        setLeetcodeData(lcJson);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [github, leetcode]);

  return (
    <section id="stats" className="relative py-32 px-6 overflow-hidden bg-[#020202]">
      <ChromaGrid opacity={0.1} />
      
      {/* Texture Layer */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-widest">Live Metrics</h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-8 bg-orange-500/30" />
            <p className="text-slate-500 font-display text-[10px] tracked-formal flex items-center gap-2">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Real-time Performance Synchronized
            </p>
            <div className="h-px w-8 bg-orange-500/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* GitHub Context */}
          <div className="space-y-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <Github size={20} className="text-white" />
                <h3 className="text-xl font-display font-black tracking-tight">GITHUB_PROTOCOL</h3>
              </div>
              <a 
                href={`https://github.com/${github}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-orange-400 hover:underline"
              >
                @{github}
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard 
                icon={Cpu} 
                label="Public Repos" 
                value={githubData?.public_repos || "0"} 
                color="orange" 
                loading={loading} 
              />
              <StatCard 
                icon={Globe} 
                label="Followers" 
                value={githubData?.followers || "0"} 
                color="cyan" 
                loading={loading} 
              />
              <StatCard 
                icon={Database} 
                label="Gists" 
                value={githubData?.public_gists || "0"} 
                color="white" 
                loading={loading} 
              />
              <StatCard 
                icon={Flame} 
                label="Profile Vitality" 
                value="Active" 
                color="red" 
                loading={loading} 
              />
            </div>

            <div className="glass p-6 rounded-[1.5rem] border border-white/5">
              <div className="flex justify-between items-center mb-6">
                 <p className="text-[10px] tracked-formal text-slate-500">Contribution Heatmap</p>
                 <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500/40" />)}
                 </div>
              </div>
              <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`h-4 rounded-[2px] ${Math.random() > 0.3 ? 'bg-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.2)]' : 'bg-white/5'}`} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* LeetCode Context */}
          <div className="space-y-10">
             <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-4">
                <Shield size={20} className="text-white" />
                <h3 className="text-xl font-display font-black tracking-tight">ALGORITHMIC_SHIELD</h3>
              </div>
              <a 
                href={`https://leetcode.com/${leetcode}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-fuchsia-400 hover:underline"
              >
                @{leetcode}
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard 
                icon={Award} 
                label="Total Solved" 
                value={leetcodeData?.totalSolved || "0"} 
                color="fuchsia" 
                loading={loading} 
              />
              <StatCard 
                icon={Code2} 
                label="Easy Resolved" 
                value={leetcodeData?.easySolved || "0"} 
                color="green" 
                loading={loading} 
              />
              <StatCard 
                icon={Zap} 
                label="Medium Resolved" 
                value={leetcodeData?.mediumSolved || "0"} 
                color="yellow" 
                loading={loading} 
              />
              <StatCard 
                icon={Shield} 
                label="Hard Resolved" 
                value={leetcodeData?.hardSolved || "0"} 
                color="red" 
                loading={loading} 
              />
            </div>

            <div className="glass p-6 rounded-[1.5rem] border border-white/5 h-[160px] flex flex-col">
              <p className="text-[10px] tracked-formal text-slate-500 mb-auto">Algorithm Mastery Index</p>
              <div className="flex items-end gap-3 h-full pb-2">
                {[
                  (leetcodeData?.easySolved / leetcodeData?.totalSolved) * 100 || 20,
                  (leetcodeData?.mediumSolved / leetcodeData?.totalSolved) * 100 || 40,
                  (leetcodeData?.hardSolved / leetcodeData?.totalSolved) * 100 || 10,
                  80, 60, 90, 45, 70, 55, 100
                ].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${Math.min(h, 100)}%` }}
                    className={`flex-1 bg-gradient-to-t ${i < 3 ? 'from-orange-500 to-fuchsia-500' : 'from-white/5 to-white/10'} rounded-t-[4px] relative group`}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-white">
                      {Math.round(h)}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;