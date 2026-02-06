
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Flame, Award, Cpu, Globe, Database, Shield, RefreshCw, Zap, AlertCircle } from 'lucide-react';
import ChromaGrid from '../components/ChromaGrid';
import SplitText from '../components/SplitText';
import LightPillar from '../components/LightPillar';
import LeetCodeCircle from '../components/LeetCodeCircle';
import { useLeetCodeData } from '../hooks/useLeetCodeData';

const StatCard = ({ icon: Icon, label, value, loading }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -4 }}
    className="glass p-6 rounded-[1.25rem] border border-white/5 flex items-center gap-6 transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/10">
      <Icon size={22} className={loading ? 'animate-pulse' : ''} />
    </div>
    <div>
      <p className="text-slate-500 text-[10px] tracked-formal mb-1 uppercase tracking-widest">{label}</p>
      <p className="text-3xl font-display font-black text-white">
        {loading ? <span className="opacity-20 animate-pulse">---</span> : value}
      </p>
    </div>
  </motion.div>
);

const Stats: React.FC<{ github: string; leetcode: string }> = ({ github, leetcode }) => {
  const [githubData, setGithubData] = useState<any>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  
  // Use the custom LeetCode hook for live data
  const { data: leetcodeData, loading: leetcodeLoading, error: leetcodeError, refetch } = useLeetCodeData(leetcode);

  useEffect(() => {
    const fetchGithubStats = async () => {
      setGithubLoading(true);
      try {
        const ghResponse = await fetch(`https://api.github.com/users/${github}`);
        const ghJson = await ghResponse.json();
        setGithubData(ghJson);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGithubStats();
  }, [github]);

  const isLoading = githubLoading || leetcodeLoading;

  return (
    <section id="stats" className="relative py-32 px-6 overflow-hidden bg-[#020202]">
      <LightPillar
        topColor="#00d9ff"
        bottomColor="#b026ff"
        intensity={1}
        rotationSpeed={0.4}
        glowAmount={0.003}
        pillarWidth={2.5}
        pillarHeight={0.35}
        noiseIntensity={0.6}
        pillarRotation={20}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
      <ChromaGrid opacity={0.05} />
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-display font-black text-white mb-4 uppercase tracking-widest">
            <SplitText text="Live Metrics" delay={0.1} />
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="h-px w-8 bg-cyan-500/30" />
            <p className="text-slate-500 font-display text-[10px] tracked-formal flex items-center gap-2">
              <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
              Real-time Performance Synchronized
            </p>
            <div className="h-px w-8 bg-fuchsia-500/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
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
                className="text-[10px] font-mono text-cyan-400 hover:underline"
              >
                @{github}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard icon={Cpu} label="Public Repos" value={githubData?.public_repos || '0'} loading={githubLoading} />
              <StatCard icon={Globe} label="Followers" value={githubData?.followers || '0'} loading={githubLoading} />
              <StatCard icon={Database} label="Gists" value={githubData?.public_gists || '0'} loading={githubLoading} />
              <StatCard icon={Flame} label="Profile Vitality" value="Active" loading={githubLoading} />
            </div>
          </div>

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

            {/* Circular LeetCode Diagram */}
            <div className="flex justify-center py-8">
              {leetcodeError ? (
                <div className="flex flex-col items-center gap-4 p-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 max-w-md">
                  <AlertCircle size={32} className="text-yellow-400" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-yellow-300 mb-2">
                      Live Data Unavailable
                    </p>
                    <p className="text-xs text-yellow-400/70 mb-4">
                      Multiple fetch methods failed. Please check your internet connection or verify your username.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={refetch}
                      className="px-4 py-2 text-xs font-mono text-white bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-colors flex items-center gap-2 border border-yellow-500/30"
                    >
                      <RefreshCw size={14} />
                      Retry
                    </button>
                    <a
                      href={`https://leetcode.com/${leetcode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-mono text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ) : (
                <LeetCodeCircle
                  totalSolved={leetcodeData?.totalSolved || 0}
                  easySolved={leetcodeData?.easySolved || 0}
                  mediumSolved={leetcodeData?.mediumSolved || 0}
                  hardSolved={leetcodeData?.hardSolved || 0}
                  easyTotal={leetcodeData?.easyTotal}
                  mediumTotal={leetcodeData?.mediumTotal}
                  hardTotal={leetcodeData?.hardTotal}
                  loading={leetcodeLoading}
                />
              )}
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard 
                icon={Award} 
                label="Acceptance" 
                value={leetcodeData?.acceptanceRate ? leetcodeData.acceptanceRate.toFixed(1) + '%' : 'N/A'} 
                loading={leetcodeLoading} 
              />
              <StatCard 
                icon={Flame} 
                label="Ranking" 
                value={leetcodeData?.ranking ? leetcodeData.ranking.toLocaleString() : 'N/A'} 
                loading={leetcodeLoading} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;