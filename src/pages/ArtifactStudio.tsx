import { Box, CornerUpLeft, Copy, Eye, Download, History, CheckCircle2, Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton } from '../components/Skeleton';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { useTerminal } from '../lib/TerminalContext';

interface Artifact {
  id: string;
  name: string;
  type: string;
  status: string;
  updatedAt: string;
  author: string;
  size: string;
  version: string;
}

const INITIAL_ARTIFACTS: Artifact[] = [
  { id: '1', name: 'core-router.ts', type: 'TypeScript', status: 'Stable', updatedAt: '2m ago', author: 'Agent ORION', size: '12.4 KB', version: 'v1.4.2' },
  { id: '2', name: 'auth-middleware.ts', type: 'TypeScript', status: 'Reviewing', updatedAt: '15m ago', author: 'Agent LEO', size: '4.2 KB', version: 'v1.1.0' },
  { id: '3', name: 'design-tokens.json', type: 'JSON', status: 'Stable', updatedAt: '1h ago', author: 'Agent LYRA', size: '1.8 KB', version: 'v2.0.1' },
  { id: '4', name: 'api-spec.yaml', type: 'YAML', status: 'Updating', updatedAt: '2h ago', author: 'System', size: '8.1 KB', version: 'v3.1.0' },
  { id: '5', name: 'database-schema.sql', type: 'SQL', status: 'Stable', updatedAt: '5h ago', author: 'Agent DRACO', size: '24.5 KB', version: 'v1.8.4' },
  { id: '6', name: 'Button.tsx', type: 'React', status: 'Stable', updatedAt: '1d ago', author: 'Agent LYRA', size: '3.2 KB', version: 'v1.0.5' },
];

export default function ArtifactStudio() {
  const { collapsed } = useTerminal();
  const [loading, setLoading] = useState(true);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);
  const [newModal, setNewModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('TypeScript');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleCreate = () => {
    if (!newName.trim()) return toast.error('Name required');
    const newArtifact: Artifact = {
      id: Date.now().toString(),
      name: newName,
      type: newType,
      status: 'Stable',
      updatedAt: 'Just now',
      author: 'User',
      size: '0 KB',
      version: 'v1.0.0'
    };
    setArtifacts(prev => [newArtifact, ...prev]);
    toast.success('Artifact created');
    setNewModal(false);
    setNewName('');
    setNewType('TypeScript');
  };

  return (
    <div className={cn("flex flex-col h-full relative transition-all duration-300", collapsed ? "pb-8" : "pb-64")}>
      <div className="p-8 pb-4">
        
        {/* Artifact Studio Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// ARTIFACTS</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            Artifact Studio
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal mb-8">
            Manage, version, and deploy generated templates, secure configurations, and type-safe code modules. Monitor changes, revert enclaves, and export assets instantly.
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <button className="px-5 py-2.5 bg-[#071311] border border-[#12302A] hover:border-[#00CFAE] hover:text-[#00E5C3] transition-colors rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer">
              <Download className="w-4 h-4" /> Export All
            </button>
            <button onClick={() => setNewModal(true)} className="px-5 py-2.5 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] transition-all rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,229,195,0.15)]">
              <Code className="w-4 h-4" /> New Artifact
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
               <div key={`skel-${i}`} className="glass-card rounded-xl p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                     <Skeleton className="h-3 w-full" />
                     <Skeleton className="h-3 w-4/5" />
                  </div>
               </div>
            ))
          ) : (
            artifacts.map(artifact => (
              <motion.div 
                key={artifact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "glass-card rounded-xl p-5 flex flex-col cursor-pointer group",
                  selectedArtifact?.id === artifact.id ? "border-primary shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-primary" : ""
                )}
                onClick={() => setSelectedArtifact(artifact)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                      {artifact.type === 'TypeScript' || artifact.type === 'React' ? <Code className="w-5 h-5" /> : <Box className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold truncate max-w-[150px]">{artifact.name}</h3>
                      <p className="text-xs text-on-surface-variant">{artifact.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] label-caps bg-surface-container-high px-2 py-1 rounded text-on-surface-variant/80 border border-outline-variant">
                    {artifact.version}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant">
                   <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-[8px] font-bold text-on-surface">
                        {artifact.author.charAt(6)}
                      </div>
                      <span className="text-xs text-on-surface-variant">{artifact.updatedAt}</span>
                   </div>
                   <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant hover:text-on-surface transition-colors">
                       <Eye className="w-3.5 h-3.5" />
                     </button>
                     <button className="p-1.5 hover:bg-surface-container-high rounded text-on-surface-variant hover:text-on-surface transition-colors">
                        <Download className="w-3.5 h-3.5" />
                     </button>
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedArtifact && !loading && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-0 right-0 h-full w-full md:w-[600px] bg-background border-l border-outline-variant shadow-2xl flex flex-col z-40 overflow-hidden"
          >
             <div className="h-14 border-b border-outline-variant flex items-center justify-between px-6 bg-surface-dim/80 backdrop-blur-sm z-10 shrink-0">
               <div className="flex items-center gap-3">
                 <button onClick={() => setSelectedArtifact(null)} className="p-1 hover:bg-surface-container rounded-md mr-1 text-on-surface-variant hover:text-on-surface transition-colors active:scale-95">
                   <CornerUpLeft className="w-4 h-4" />
                 </button>
                 <span className="font-semibold text-sm">{selectedArtifact.name}</span>
                 <span className="text-[10px] label-caps bg-secondary/10 text-secondary px-2 py-0.5 rounded border border-secondary/20">{selectedArtifact.status}</span>
               </div>
               <div className="flex items-center gap-2">
                 <button className="text-[11px] font-medium border border-outline-variant px-3 py-1 rounded-md hover:bg-surface-container-high transition-colors flex items-center gap-1.5 active:scale-95">
                   <History className="w-3 h-3" /> Restore Snapshot
                 </button>
               </div>
             </div>

             <div className="flex-1 overflow-y-auto w-full flex flex-col">
               <div className="p-6 border-b border-outline-variant bg-surface-container-low">
                 <div className="flex gap-8 mb-6">
                   <div className="flex flex-col gap-1">
                     <span className="text-[10px] label-caps text-on-surface-variant">Author</span>
                     <span className="text-xs font-medium text-on-surface">{selectedArtifact.author}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <span className="text-[10px] label-caps text-on-surface-variant">Size</span>
                     <span className="text-xs font-medium text-on-surface">{selectedArtifact.size}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <span className="text-[10px] label-caps text-on-surface-variant">Format</span>
                     <span className="text-xs font-medium text-on-surface">{selectedArtifact.type}</span>
                   </div>
                 </div>

                 <div className="text-xs flex items-center gap-2 mb-2 p-2 bg-primary/10 border border-primary/20 text-primary rounded-md">
                   <CheckCircle2 className="w-4 h-4" />
                   Validation complete. Found 0 type errors, 0 lint warnings.
                 </div>
               </div>

               <div className="bg-surface-dim flex-1 flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface-container-highest/30">
                    <span className="text-[10px] label-caps text-on-surface-variant">Diff Viewer (v1.4.1 → v1.4.2)</span>
                    <div className="flex gap-2">
                      <button className="text-on-surface-variant hover:text-on-surface p-1 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-on-surface-variant custom-scrollbar flex-1 whitespace-pre">
                    <div className="text-outline/50 mb-2">@@ -15,7 +15,7 @@</div>
                    <div className="line-through text-outline/80 bg-error/5 pl-2 border-l-2 border-error/50">  export function initializeRouter(config: RouteConfig) {'{'}</div>
                    <div className="line-through text-outline/80 bg-error/5 pl-2 border-l-2 border-error/50">    const router = new SimpleRouter(config);</div>
                    <div className="pl-2 border-l-2 border-transparent">    // Refactored to handle dynamic agent routing</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">  export async function initializeRouter(config: RouteConfig, context: AgentContext) {'{'}</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">    const router = new StructuralRouter(config, context);</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">    await router.warmup();</div>
                    <div className="pl-2 border-l-2 border-transparent">    return router;</div>
                    <div className="pl-2 border-l-2 border-transparent">  {'}'}</div>
                    <div className="text-outline/50 mt-2 mb-2">@@ -42,4 +42,6 @@</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">  export type RouteContext = {'{'}</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">    agentId: string;</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">    memoryRef: string | null;</div>
                    <div className="text-secondary bg-secondary/5 pl-2 border-l-2 border-secondary/50">  {'}'}</div>
                  </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {newModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#05110F] border border-[#00E5C3]/30 rounded-xl max-w-sm w-full flex flex-col shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#00E5C3]/10">
              <h3 className="font-mono text-[#F2F5F4] font-bold text-lg uppercase tracking-wider">New Artifact</h3>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2 block">Artifact Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  className="w-full bg-[#020B0A] border border-[#12302A] rounded p-2 text-sm text-[#F2F5F4] outline-none"
                  placeholder="e.g. settings-drawer.tsx"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2 block">Artifact Type</label>
                <select 
                  value={newType} 
                  onChange={e => setNewType(e.target.value)}
                  className="w-full bg-[#020B0A] border border-[#12302A] rounded p-2 text-sm text-[#F2F5F4] outline-none"
                >
                  <option value="TypeScript">TypeScript</option>
                  <option value="React">React</option>
                  <option value="JSON">JSON</option>
                  <option value="YAML">YAML</option>
                  <option value="SQL">SQL</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#00E5C3]/10 bg-[#020B0A] flex justify-end gap-3">
              <button onClick={() => setNewModal(false)} className="px-4 py-2 border border-[#12302A] hover:bg-[#12302A] rounded font-mono text-xs uppercase tracking-wider text-[#93A8A1] transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] rounded font-mono text-xs font-bold uppercase tracking-wider cursor-pointer">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
