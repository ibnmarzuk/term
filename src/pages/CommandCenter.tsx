import { Terminal as TerminalIcon, Network, Command, FileText, Folder, Check, Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';

const MOCK_DATA = [
  { time: '14:00', executions: 12 },
  { time: '14:05', executions: 18 },
  { time: '14:10', executions: 15 },
  { time: '14:15', executions: 24 },
  { time: '14:20', executions: 22 },
  { time: '14:25', executions: 35 },
  { time: '14:30', executions: 28 },
  { time: '14:35', executions: 42 },
  { time: '14:40', executions: 38 },
  { time: '14:45', executions: 50 },
  { time: '14:50', executions: 45 },
  { time: '14:55', executions: 60 },
  { time: '15:00', executions: 55 },
];

export default function CommandCenter() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col xl:flex-row gap-lg h-full p-8 relative">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(var(--color-outline-variant) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Center Column */}
      <div className="flex-1 flex flex-col gap-lg z-10 w-full max-w-3xl mx-auto xl:max-w-none">
        
        {/* Command Engine Input */}
        <div className="glass-panel p-md md:p-lg border border-outline-variant rounded-xl flex flex-col gap-lg relative overflow-hidden transition-colors focus-within:border-primary/50 shadow-2xl">
          <TerminalIcon className="absolute top-0 right-0 w-64 h-64 text-primary/5 translate-x-10 -translate-y-10 opacity-50 pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-4 py-8">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-on-surface">What are we executing today?</h1>
            <p className="text-on-surface-variant text-sm">Enter intent, link repository, or upload architecture to begin autonomous workflow.</p>
          </div>

          <div className="relative z-10 w-full group bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden focus-within:border-primary/50 transition-colors">
            <div className="p-4 flex gap-3 items-start">
               <div className="mt-1 text-primary opacity-60 shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
               </div>
               <textarea 
                 className="w-full h-20 bg-transparent border-none focus:ring-0 text-lg resize-none placeholder-outline py-1 focus:outline-none"
                 placeholder="Analyze our Vercel metrics, optimize the core-engine repository, and deploy a canary build to Railway..."
               ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-outline-variant bg-surface-dim/50 gap-4">
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-1.5 bg-surface-container-high border border-outline-variant rounded-md text-[11px] font-medium hover:bg-outline-variant transition-colors active:scale-95">
                  <span className="opacity-60 text-on-surface">GitHub</span>
                </button>
                <button className="flex-1 sm:flex-none items-center justify-center gap-1.5 px-3 py-1.5 bg-surface-container-high border border-outline-variant rounded-md text-[11px] font-medium hover:bg-outline-variant transition-colors active:scale-95">
                  <span className="opacity-60 text-on-surface">PDF/Doc</span>
                </button>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2 border-r border-outline-variant pr-4">
                  <span className="text-[10px] text-outline uppercase tracking-widest font-bold">Mode</span>
                  <select className="bg-transparent text-xs border-none focus:ring-0 p-0 text-primary font-medium focus:outline-none">
                    <option>Build & Deploy</option>
                    <option>Planning Only</option>
                    <option>Strategic Review</option>
                  </select>
                </div>
                <button className="bg-on-surface text-background font-semibold text-xs px-5 py-2 rounded-md hover:bg-on-surface-variant transition-colors w-full sm:w-auto active:scale-95">
                  Execute Command
                </button>
              </div>
            </div>
          </div>

          {/* WORKFLOW VISUALIZER PREVIEW */}
          <div className="flex justify-between items-center gap-2 sm:gap-6 px-2 sm:px-10 mt-8 mb-4">
             <div className="flex-1 h-px bg-outline-variant"></div>
             <div className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide shrink-0 pb-2">
                <div className="flex flex-col items-center gap-2 shrink-0">
                   <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center bg-surface-dim">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                   </div>
                   <span className="text-[10px] uppercase tracking-wider text-outline">Intent</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-40 shrink-0">
                   <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center bg-surface-dim">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                   </div>
                   <span className="text-[10px] uppercase tracking-wider text-outline">Routing</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-40 shrink-0">
                   <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center bg-surface-dim">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                   </div>
                   <span className="text-[10px] uppercase tracking-wider text-outline">Execution</span>
                </div>
                <div className="flex flex-col items-center gap-2 opacity-40 shrink-0">
                   <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center bg-surface-dim">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                   </div>
                   <span className="text-[10px] uppercase tracking-wider text-outline">Validation</span>
                </div>
             </div>
             <div className="flex-1 h-px bg-outline-variant"></div>
          </div>
        </div>
      </div>

      {/* Right Column / STATUS BAR */}
      <div className="w-full xl:w-72 border-t xl:border-t-0 xl:border-l border-outline-variant bg-surface-dim flex flex-col p-6 space-y-8 z-10 shrink-0">
        
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold">Active Workforce</h3>
          <div className="space-y-3">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="p-3 border border-outline-variant bg-surface-container rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-12 h-4 rounded" />
                  </div>
                  <Skeleton className="w-full h-1 rounded-full" />
                </div>
              ))
            ) : (
             <>
              <div className="p-3 border border-outline-variant bg-surface-container rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-on-surface">Agent LEO</span>
                  <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">Strategic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-outline-variant rounded-full overflow-hidden">
                     <div className="w-3/4 h-full bg-primary"></div>
                  </div>
                  <span className="text-[10px] text-outline">75%</span>
                </div>
              </div>

              <div className="p-3 border border-outline-variant bg-surface-container rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-on-surface">Agent ORION</span>
                  <span className="text-[9px] bg-secondary/10 text-secondary px-1.5 py-0.5 rounded border border-secondary/20">Executor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-outline-variant rounded-full overflow-hidden">
                     <div className="w-1/4 h-full bg-secondary"></div>
                  </div>
                  <span className="text-[10px] text-outline">25%</span>
                </div>
              </div>
             </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold">System Health</h3>
          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                   <Skeleton className="w-24 h-3" />
                   <Skeleton className="w-10 h-3" />
                </div>
              ))
            ) : (
             <>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Intelligence Confidence</span>
                <span className="text-xs font-mono text-on-surface">98.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Memory Recall Path</span>
                <span className="text-xs font-mono text-secondary">OPTIMAL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant">Handoff Success</span>
                <span className="text-xs font-mono text-on-surface">100%</span>
              </div>
             </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold flex justify-between">
            <span>Execution Velocity</span>
            <span className="text-primary font-mono lowercase">60/hr</span>
          </h3>
          <div className="h-16 w-full mt-2">
            {!loading ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_DATA}>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface-container-high)', border: '1px solid var(--color-outline-variant)', borderRadius: '8px', fontSize: '10px' }}
                    itemStyle={{ color: 'var(--color-primary)' }}
                    labelStyle={{ color: 'var(--color-on-surface-variant)' }}
                  />
                  <Line type="monotone" dataKey="executions" stroke="var(--color-primary)" strokeWidth={2} dot={false} isAnimationActive={true} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="w-full h-full rounded" />
            )}
          </div>
        </div>

        <div className="flex-1"></div>

        <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
           <div className="text-[10px] text-primary font-bold uppercase mb-1">Opportunity Radar</div>
           <p className="text-xs text-on-surface-variant leading-relaxed">
             3 new Bounties match your capability registry. 
           </p>
           <button className="mt-3 w-full py-1.5 bg-primary text-on-primary text-[10px] font-bold rounded hover:bg-primary/90 transition-colors uppercase active:scale-95">View Leads</button>
        </div>

        <button 
          onClick={() => toast.error('Critical Error: Pipeline connection lost in Router Engine. Agent ORION fallback initiated.')}
          className="text-[10px] text-error border border-error/20 bg-error/5 hover:bg-error/10 uppercase tracking-widest py-2 rounded-md transition-colors active:scale-95 mt-4"
        >
          [Simulate Critical Error]
        </button>

      </div>
    </div>
  );
}
