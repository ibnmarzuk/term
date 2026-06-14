import { Play, Settings, Search, Palette, Code, CheckCircle, Download, FileJson } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';

export default function ProjectWorkspace() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen">
      {/* Project Header */}
      <section className="mb-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// PROJECT SUITE</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            Project Workspace
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal mb-8">
            Decoupled orchestrations for core enclaves. Build, review, and compile pipelines with real-time feedback loops and automated versioning structures.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <button className="px-5 py-2.5 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] transition-all rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,229,195,0.15)]">
              <Play className="w-4 h-4 fill-current" /> Execute Workflow
            </button>
            <button className="px-5 py-2.5 bg-[#071311] border border-[#12302A] hover:border-[#00CFAE] hover:text-[#00E5C3] transition-colors rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <Settings className="w-4 h-4" /> Config
            </button>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-lg border-b border-outline-variant mt-xl overflow-x-auto scrollbar-hide">
          <button className="pb-sm px-xs title-md text-sm text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent">Overview</button>
          <button className="pb-sm px-xs title-md text-sm text-primary border-b-2 border-primary">Project Workspace</button>
          <button className="pb-sm px-xs title-md text-sm text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent">Planning</button>
          <button className="pb-sm px-xs title-md text-sm text-on-surface-variant hover:text-on-surface transition-colors border-b-2 border-transparent">Development</button>
        </nav>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Execution Graph */}
        <div className="lg:col-span-8 glass-panel p-lg rounded-xl flex flex-col min-h-[320px]">
          <div className="flex justify-between items-center mb-xl">
            <h3 className="label-caps text-outline">EXECUTION GRAPH</h3>
            <span className="flex items-center gap-xs text-secondary label-caps text-[10px]">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              ACTIVE: PRODUCT_DESIGNER.EXEC
            </span>
          </div>
          
          <div className="relative flex items-center justify-between w-full px-lg py-xl flex-1">
            <div className="absolute h-[2px] bg-gradient-to-r from-secondary via-primary to-outline-variant left-[15%] right-[15%] top-1/2 -translate-y-1/2 opacity-20 z-0" />
            
            {loading ? (
               <>
                  <div className="relative z-10 flex flex-col items-center gap-sm"><Skeleton className="w-14 h-14 rounded-full" /><Skeleton className="w-16 h-3 mt-2" /><Skeleton className="w-24 h-4" /></div>
                  <div className="relative z-10 flex flex-col items-center gap-sm"><Skeleton className="w-20 h-20 rounded-full" /><Skeleton className="w-16 h-3 mt-2" /><Skeleton className="w-24 h-4" /></div>
                  <div className="relative z-10 flex flex-col items-center gap-sm"><Skeleton className="w-14 h-14 rounded-full" /><Skeleton className="w-16 h-3 mt-2" /><Skeleton className="w-24 h-4" /></div>
               </>
            ) : (
             <>
              <div className="relative z-10 flex flex-col items-center gap-sm">
                <div className="w-14 h-14 rounded-full bg-secondary/10 border-2 border-secondary flex items-center justify-center text-secondary shadow-[0_0_15px_rgba(78,222,163,0.2)]">
                  <Search className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="label-caps text-[10px] text-secondary">COMPLETED</p>
                  <p className="title-md text-sm text-on-surface">Research Agent</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-sm">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shadow-[0_0_30px_rgba(59,130,246,0.4)] relative">
                  <div className="absolute inset-[-4px] rounded-full border border-primary/50 animate-[ping_3s_ease-out_infinite]" />
                  <Palette className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="label-caps text-[10px] text-primary">RUNNING</p>
                  <p className="title-md text-sm text-on-surface">Product Designer</p>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-sm opacity-50 grayscale">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest border-2 border-outline-variant flex items-center justify-center text-on-surface-variant">
                  <Code className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="label-caps text-[10px] text-on-surface-variant">WAITING</p>
                  <p className="title-md text-sm text-on-surface">Software Engineer</p>
                </div>
              </div>
             </>
            )}
          </div>
          
          <div className="mt-auto pt-lg border-t border-outline-variant flex justify-between items-center text-xs text-on-surface-variant code-md">
            <span>Latency: 42ms</span>
            <span>Tokens: 1.2M</span>
          </div>
        </div>

        {/* Generated Assets */}
        <div className="lg:col-span-4 glass-panel p-lg rounded-xl flex flex-col gap-lg bg-surface-container-low/50">
          <h3 className="label-caps text-outline">GENERATED ASSETS</h3>
          <div className="flex flex-col gap-sm flex-1">
            {loading ? (
               Array(2).fill(0).map((_, i) => (
                 <div key={i} className="p-md bg-surface-container rounded-lg border border-outline-variant flex items-center gap-md">
                    <Skeleton className="w-5 h-5 rounded" />
                    <div className="flex-1 space-y-1.5"><Skeleton className="h-3 w-1/2" /><Skeleton className="h-2 w-1/3" /></div>
                 </div>
               ))
            ) : (
             <>
              <div className="group flex items-center justify-between p-md bg-surface-container rounded-lg border border-outline-variant hover:border-primary/40 transition-colors cursor-pointer active:scale-95">
                <div className="flex items-center gap-md">
                  <FileJson className="w-5 h-5 text-tertiary" />
                  <div className="flex flex-col">
                    <span className="title-md text-sm text-on-surface">design_tokens.json</span>
                    <span className="body-sm text-[11px] text-on-surface-variant">2.4 KB • Just now</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="group flex items-center justify-between p-md bg-surface-container rounded-lg border border-outline-variant hover:border-primary/40 transition-colors cursor-pointer active:scale-95">
                <div className="flex items-center gap-md">
                  <Code className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="title-md text-sm text-on-surface">MainLayout.tsx</span>
                    <span className="body-sm text-[11px] text-on-surface-variant">12.8 KB • 1m ago</span>
                  </div>
                </div>
                <Download className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
             </>
            )}

            <div className="mt-auto border-2 border-dashed border-outline-variant rounded-lg p-xl flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer group active:scale-[0.98]">
               <span className="label-caps text-on-surface-variant group-hover:text-primary transition-colors text-[10px]">DRAG ASSETS TO EXPORT</span>
            </div>
          </div>
        </div>
        
        {/* Code Preview */}
        <div className="lg:col-span-12 glass-panel rounded-xl overflow-hidden border border-outline-variant">
          <div className="bg-surface-container-highest px-lg py-sm flex items-center justify-between">
            <div className="flex items-center gap-md">
               <div className="flex gap-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-error/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-tertiary/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-secondary/80" />
               </div>
               <span className="code-md text-[10px] text-outline">root/nova-saas/package.json</span>
            </div>
          </div>
          <div className="p-lg bg-surface-container-lowest overflow-x-auto code-md text-sm leading-loose">
            {loading ? (
               <div className="space-y-4">
                 <Skeleton className="h-4 w-1/4" />
                 <Skeleton className="h-4 w-1/3" />
                 <Skeleton className="h-4 w-1/2" />
                 <Skeleton className="h-4 w-1/4" />
               </div>
            ) : (
               <pre className="text-on-surface">
<span className="text-tertiary">"name"</span>: <span className="text-secondary">"nova-saas"</span>,
<span className="text-tertiary">"version"</span>: <span className="text-secondary">"0.1.0"</span>,
<span className="text-tertiary">"private"</span>: <span className="text-primary">true</span>,
<span className="text-tertiary">"scripts"</span>: {'{'}
  <span className="text-tertiary">"dev"</span>: <span className="text-secondary">"next dev"</span>,
  <span className="text-tertiary">"build"</span>: <span className="text-secondary">"next build"</span>
{'}'},
<span className="text-tertiary">"dependencies"</span>: {'{'}
  <span className="text-tertiary">"framer-motion"</span>: <span className="text-secondary">"^10.12.16"</span>,
  <span className="text-tertiary">"lucide-react"</span>: <span className="text-secondary">"^0.244.0"</span>
{'}'}
               </pre>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
