
import React, { useState } from 'react';
import { usePortfolio } from '../hooks/usePortfolio';
import { Save, Plus, Trash2, Home, LogOut, Code, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin: React.FC = () => {
  const { data, updateData } = usePortfolio();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'certs' | 'export'>('profile');
  const [copied, setCopied] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TIP: Change 'admin123' to a private password before deploying!
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Invalid Password');
  };

  const handleSave = () => {
    updateData(data);
    alert('Local configuration saved to browser storage.');
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Strategic Initiative',
      description: 'Describe the technical architecture and impact.',
      githubUrl: '#',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
      techStack: ['React', 'Node.js']
    };
    updateData({ ...data, projects: [...data.projects, newProject] });
  };

  const deleteProject = (id: string) => {
    if (confirm('Permanently decommission this project node?')) {
      updateData({ ...data, projects: data.projects.filter(p => p.id !== id) });
    }
  };

  const generateExportCode = () => {
    const code = `import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = ${JSON.stringify(data, null, 2)};`;
    return code;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
        <div className="glass p-10 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Code size={32} className="text-white/40" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 text-center">Central Command</h1>
          <p className="text-gray-500 text-xs text-center mb-8 uppercase tracking-[0.2em]">Restricted Authorization Required</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Authorization Key" 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all font-mono"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">
              Initialize Access
            </button>
            <Link to="/" className="block text-center text-gray-500 hover:text-white text-[10px] uppercase tracking-widest mt-4">Return to Public Interface</Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <div className="fixed top-0 bottom-0 left-0 w-64 bg-black border-r border-white/5 p-8 hidden lg:block z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Code size={16} className="text-white" />
          </div>
          <h2 className="text-sm font-display font-black text-white uppercase tracking-widest">Admin Panel</h2>
        </div>
        <nav className="space-y-2">
          {[
            { id: 'profile', label: 'Identity' },
            { id: 'projects', label: 'Project Registry' },
            { id: 'certs', label: 'Credentials' },
            { id: 'export', label: 'Production Export' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)} 
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest ${activeTab === tab.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-8 left-8 right-8 space-y-4">
           <Link to="/" className="flex items-center gap-3 text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"><Home size={14} /> Live Preview</Link>
           <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 text-red-500/60 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"><LogOut size={14} /> Terminate Session</button>
        </div>
      </div>

      <div className="lg:ml-64 p-8 lg:p-12 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-12">
          <div>
            <h1 className="text-4xl font-display font-black uppercase tracking-tighter">System Configuration</h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.3em] mt-2">Mode: Strategic Data Modification</p>
          </div>
          <button onClick={handleSave} className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all text-xs uppercase tracking-widest">
            <Save size={16} /> Save Local Changes
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Formal Designation</label>
                  <input value={data.title} onChange={(e) => updateData({...data, title: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Visual Asset (Profile URL)</label>
                  <input value={data.profilePic} onChange={(e) => updateData({...data, profilePic: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Github Identifier</label>
                  <input value={data.githubUsername} onChange={(e) => updateData({...data, githubUsername: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Contact Protocol (Email)</label>
                  <input value={data.email} onChange={(e) => updateData({...data, email: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Executive Bio</label>
                <textarea rows={4} value={data.bio} onChange={(e) => updateData({...data, bio: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Long-term Objectives</label>
                <textarea rows={4} value={data.ambitions} onChange={(e) => updateData({...data, ambitions: e.target.value})} className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-white/20" />
             </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={addProject} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all">
              <Plus size={16} /> Register New Project Node
            </button>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {data.projects.map((p, idx) => (
                <div key={p.id} className="glass p-8 rounded-3xl border border-white/10 relative group">
                  <button onClick={() => deleteProject(p.id)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Project Title</label>
                      <input value={p.title} onChange={(e) => {
                        const next = [...data.projects];
                        next[idx].title = e.target.value;
                        updateData({...data, projects: next});
                      }} className="w-full bg-transparent border-b border-white/5 pb-2 text-xl font-display font-bold outline-none focus:border-white/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Architecture Overview</label>
                      <textarea value={p.description} onChange={(e) => {
                        const next = [...data.projects];
                        next[idx].description = e.target.value;
                        updateData({...data, projects: next});
                      }} className="w-full bg-transparent text-gray-400 text-sm outline-none resize-none" rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Image Source</label>
                        <input value={p.imageUrl} onChange={(e) => {
                          const next = [...data.projects];
                          next[idx].imageUrl = e.target.value;
                          updateData({...data, projects: next});
                        }} className="w-full bg-white/5 p-3 rounded-xl text-[10px] outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Repository Link</label>
                        <input value={p.githubUrl} onChange={(e) => {
                          const next = [...data.projects];
                          next[idx].githubUrl = e.target.value;
                          updateData({...data, projects: next});
                        }} className="w-full bg-white/5 p-3 rounded-xl text-[10px] outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass p-10 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">Production Sync</h3>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Global Visibility Protocol</p>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Production Code</>}
                </button>
              </div>
              
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5 font-mono text-xs overflow-auto max-h-[500px] text-gray-400">
                <pre>{generateExportCode()}</pre>
              </div>
              
              <div className="mt-10 p-6 border-l-2 border-orange-500/40 bg-orange-500/5 rounded-r-2xl">
                <h4 className="text-orange-400 font-bold text-sm mb-2 uppercase tracking-widest">Deployment Steps:</h4>
                <ol className="text-gray-400 text-xs space-y-3 list-decimal ml-4">
                  <li>Edit your data in this panel to perfection.</li>
                  <li>Click <strong>"Copy Production Code"</strong> above.</li>
                  <li>Open the file <code>constants.ts</code> in your project folder.</li>
                  <li>Delete everything in that file and paste the copied code.</li>
                  <li>Push your changes to <strong>GitHub</strong>.</li>
                  <li><strong>Vercel</strong> will automatically redeploy the site with your new data!</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certs' && (
           <div className="glass p-10 rounded-3xl border border-white/10 animate-in fade-in duration-500">
              <p className="text-gray-500 font-display text-sm tracking-widest italic">Credential management layer under development. Use the Export tool to manually sync certificates for now.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
