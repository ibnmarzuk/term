import { Activity, Terminal as TerminalIcon, CircleDot, Cpu, Settings2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

type StreamType = 'ROUTER' | 'COUNCIL' | 'AGENT' | 'WORKFLOW' | 'ARTIFACT' | 'INTEGRATION';

interface LogEntry {
  id: string;
  timestamp: string;
  stream: StreamType;
  prefix: string;
  message: string;
  status?: 'error' | 'success' | 'warn' | 'info';
  latency?: string;
}

const STREAM_CONFIG: Record<StreamType, { color: string, colorHex: string, label: string }> = {
  ROUTER: { color: 'text-primary', colorHex: 'var(--color-primary)', label: '1: ROUTER INTEL' },
  COUNCIL: { color: 'text-tertiary', colorHex: 'var(--color-tertiary)', label: '2: STRAT COUNCIL' },
  AGENT: { color: 'text-[#4F46E5]', colorHex: '#4F46E5', label: '3: AGENT EXEC' },
  WORKFLOW: { color: 'text-[#06B6D4]', colorHex: '#06B6D4', label: '4: WORKFLOW' },
  ARTIFACT: { color: 'text-secondary', colorHex: 'var(--color-secondary)', label: '5: ARTIFACT GEN' },
  INTEGRATION: { color: 'text-[#8B5CF6]', colorHex: '#8B5CF6', label: '6: INTEGRATION' }
};

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', timestamp: '00:00:01', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'idle → initializing' },
  { id: '2', timestamp: '00:00:02', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'initializing → routing' },
  { id: '3', timestamp: '00:00:03', stream: 'ROUTER', prefix: 'ROUTER', message: 'analyzing input' },
  { id: '4', timestamp: '00:00:04', stream: 'ROUTER', prefix: 'ROUTER', message: 'intent classified: BUILD' },
  { id: '5', timestamp: '00:00:05', stream: 'COUNCIL', prefix: 'CONTRARIAN', message: 'risk detected: missing auth layer', status: 'warn' },
  { id: '6', timestamp: '00:00:06', stream: 'ROUTER', prefix: 'ROUTER', message: 'breaking task into subtasks' },
  { id: '7', timestamp: '00:00:07', stream: 'ROUTER', prefix: 'ROUTER', message: 'assigning agents' },
  { id: '8', timestamp: '00:00:08', stream: 'ROUTER', prefix: 'ROUTER', message: 'confidence score: 92%' },
  { id: '9', timestamp: '00:00:09', stream: 'ROUTER', prefix: 'ROUTER', message: 'execution graph generated', status: 'success' },
  { id: '10', timestamp: '00:00:10', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'routing → executing_agents' },
  { id: '11', timestamp: '00:00:11', stream: 'AGENT', prefix: 'RESEARCH AGENT', message: 'collecting data...', latency: '12ms' },
  { id: '12', timestamp: '00:00:14', stream: 'AGENT', prefix: 'RESEARCH AGENT', message: 'Task ID: RE-991 | Progress: 100% | Status: completed', latency: '340ms' },
  { id: '13', timestamp: '00:00:15', stream: 'AGENT', prefix: 'DESIGN AGENT', message: 'generating UI system...', latency: '45ms' },
  { id: '14', timestamp: '00:00:18', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'executing_agents → generating_artifacts' },
  { id: '15', timestamp: '00:00:19', stream: 'ARTIFACT', prefix: 'ARTIFACT', message: 'creating file structure...' },
  { id: '16', timestamp: '00:00:20', stream: 'ARTIFACT', prefix: 'ARTIFACT', message: 'generating /src/components' },
  { id: '17', timestamp: '00:00:21', stream: 'ARTIFACT', prefix: 'ARTIFACT', message: 'artifact version 3 created', status: 'success' },
  { id: '18', timestamp: '00:00:22', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'generating_artifacts → syncing_github' },
  { id: '19', timestamp: '00:00:23', stream: 'INTEGRATION', prefix: 'GITHUB', message: 'connecting repository...' },
  { id: '20', timestamp: '00:00:25', stream: 'INTEGRATION', prefix: 'GITHUB', message: 'push successful', status: 'success' },
  { id: '21', timestamp: '00:00:26', stream: 'INTEGRATION', prefix: 'DEPLOYMENT', message: 'deploying to Vercel...' },
  { id: '22', timestamp: '00:00:30', stream: 'INTEGRATION', prefix: 'DEPLOYMENT', message: 'live URL generated', status: 'success' },
  { id: '23', timestamp: '00:00:31', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'syncing_github → validating' },
  { id: '24', timestamp: '00:00:33', stream: 'AGENT', prefix: 'QA AGENT', message: 'validating structure...', latency: '8ms' },
  { id: '25', timestamp: '00:00:35', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'validating → completed', status: 'success' },
];

export default function Terminal() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [visibleStreams, setVisibleStreams] = useState<Set<StreamType>>(new Set(Object.keys(STREAM_CONFIG) as StreamType[]));
  const [showConfig, setShowConfig] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, visibleStreams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const errorLog: LogEntry = {
        id: '26',
        timestamp: '00:00:42',
        stream: 'AGENT',
        prefix: 'AGENT VEX',
        message: 'Critical error during integration testing pipeline. Execution halted.',
        status: 'error',
        latency: '1240ms'
      };
      setLogs(prev => [...prev, errorLog]);
      toast.error('Critical Error in Agent Stream', {
        description: errorLog.message,
        duration: 8000,
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const filteredLogs = logs.filter(l => visibleStreams.has(l.stream));

  const toggleStream = (stream: StreamType) => {
    setVisibleStreams(prev => {
      const next = new Set(prev);
      if (next.has(stream)) {
        next.delete(stream);
      } else {
        next.add(stream);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (visibleStreams.size === Object.keys(STREAM_CONFIG).length) {
      setVisibleStreams(new Set());
    } else {
      setVisibleStreams(new Set(Object.keys(STREAM_CONFIG) as StreamType[]));
    }
  };

  return (
    <footer className="h-64 border-t border-outline-variant bg-[#0b0c10] flex flex-col font-mono text-[11px] shrink-0 self-end w-full relative z-40 selection:bg-primary/30">
      {/* Header */}
      <div className="h-10 border-b border-outline-variant/50 flex flex-col md:flex-row items-start md:items-center justify-between px-4 bg-[#050505] overflow-x-auto scrollbar-hide py-2 md:py-0 min-shrink-0 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-tertiary to-secondary opacity-20" />
        <div className="flex items-center gap-6 uppercase tracking-widest font-bold whitespace-nowrap">
          <div className="flex items-center gap-2 text-on-surface">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>APEX_OS TERMINAL</span>
            <span className="text-outline mx-2">|</span>
          </div>
          
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className={cn(
              "transition-colors hover:text-white cursor-pointer flex items-center gap-2", 
              showConfig || visibleStreams.size < Object.keys(STREAM_CONFIG).length ? "text-primary" : "text-on-surface-variant"
            )}
          >
            <Settings2 className="w-3.5 h-3.5" /> 
            {visibleStreams.size === Object.keys(STREAM_CONFIG).length ? 'ALL STREAMS VISIBLE' : `${visibleStreams.size}/6 STREAMS VISIBLE`}
          </button>
        </div>
        <div className="hidden md:flex flex-col items-end gap-0.5 whitespace-nowrap ml-4">
           <span className="text-[9px] text-outline tracking-widest uppercase">Execution Core v1.0</span>
           <span className="text-[#10b981] flex items-center gap-1.5 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" /> SYSTEM LIVE</span>
        </div>
      </div>
      
      {/* Floating Control Panel */}
      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-12 left-4 z-50 glass-panel border border-outline-variant bg-[#0b0c10]/95 backdrop-blur-xl rounded-lg p-4 w-72 shadow-2xl"
          >
             <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
               <span className="text-[10px] uppercase font-bold text-on-surface tracking-widest">Stream Visibility</span>
               <button onClick={toggleAll} className="text-[9px] uppercase text-outline hover:text-primary transition-colors">Toggle All</button>
             </div>
             <div className="flex flex-col gap-2">
               {Object.entries(STREAM_CONFIG).map(([key, config]) => {
                 const isVisible = visibleStreams.has(key as StreamType);
                 return (
                   <button 
                     key={key}
                     onClick={() => toggleStream(key as StreamType)}
                     className={cn(
                       "flex items-center justify-between p-2 rounded text-[10px] uppercase font-bold tracking-wider transition-colors border",
                       isVisible ? "bg-white/5 text-on-surface border-white/10" : "bg-transparent text-outline hover:bg-white/5 border-transparent hover:border-white/10"
                     )}
                   >
                     <span className={cn("flex items-center gap-2", isVisible ? config.color : "")}>
                       {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                       {config.label}
                     </span>
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isVisible ? config.colorHex : 'transparent' }} />
                   </button>
                 );
               })}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Log Content */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1.5 text-[#a1a1aa] scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent pb-8"
      >
        <AnimatePresence initial={false}>
          {filteredLogs.map((log) => (
            <motion.div 
              key={log.id} 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4 group hover:bg-white/5 px-2 py-0.5 rounded transition-colors"
            >
              <span className="text-[#52525b] shrink-0 w-20">[{log.timestamp}]</span>
              <div className="shrink-0 w-48 flex items-center gap-2">
                <span className={cn(
                  "font-bold",
                  STREAM_CONFIG[log.stream].color,
                  log.status === 'error' && "text-[#ef4444]",
                  log.status === 'warn' && "text-[#eab308]"
                )}>
                  [{log.prefix}]
                </span>
                {log.stream === 'AGENT' && log.latency && (
                  <span className="px-1 py-[1px] rounded bg-white/5 border border-white/10 text-[9px] text-[#a1a1aa] font-medium leading-none">
                    {log.latency}
                  </span>
                )}
              </div>
              <span className={cn(
                "flex-1 break-words leading-relaxed",
                log.status === 'error' ? "text-[#f87171]" :
                log.status === 'success' ? "text-[#34d399] font-medium pt-[1px]" :
                log.status === 'warn' ? "text-[#fde047]" : "text-[#d4d4d8]",
                log.stream === 'ROUTER' && log.status !== 'success' ? "text-[#e0e7ff]" : ""
              )}>
                {log.status === 'success' && log.stream !== 'ROUTER' && <span className="opacity-80">→ </span>}
                {log.message}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="flex gap-4 px-2 py-1 items-center animate-pulse mt-2">
          <span className="text-primary opacity-50 shrink-0 w-20">WAITING</span>
          <span className="text-outline shrink-0 w-32 font-bold">[SYSTEM]</span>
          <span className="bg-[#52525b] w-2 h-3 border-b-2 border-primary" />
        </div>
      </div>
    </footer>
  );
}
