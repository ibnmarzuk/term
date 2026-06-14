import { Activity, Terminal as TerminalIcon, CircleDot, Cpu, Settings2, Eye, EyeOff, Download, Play, Pause, Rewind } from 'lucide-react';
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

const getAgentThemeForPrefix = (prefix: string) => {
  const p = prefix.toLowerCase();
  if (p.includes('research')) return 'var(--agent-research, var(--agent-default))';
  if (p.includes('design')) return 'var(--agent-design, var(--agent-default))';
  if (p.includes('engineering') || p.includes('code') || p.includes('dev')) return 'var(--agent-engineering, var(--agent-default))';
  if (p.includes('qa') || p.includes('validat')) return 'var(--agent-qa, var(--agent-default))';
  if (p.includes('content') || p.includes('writer')) return 'var(--agent-content, var(--agent-default))';
  if (p.includes('strategy') || p.includes('business')) return 'var(--agent-strategy, var(--agent-default))';
  if (p.includes('community')) return 'var(--agent-community, var(--agent-default))';
  if (p.includes('orion')) return 'var(--agent-orion, var(--agent-default))';
  return 'var(--agent-engineering, var(--agent-default))';
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
  const [visibleSeverities, setVisibleSeverities] = useState<Set<string>>(new Set(['info', 'success', 'warn', 'error']));
  const availableAgents = Array.from(new Set(INITIAL_LOGS.filter(l => l.stream === 'AGENT').map(l => l.prefix).concat(['AGENT VEX'])));
  const [visibleAgents, setVisibleAgents] = useState<Set<string>>(new Set(availableAgents));
  const [showConfig, setShowConfig] = useState(false);
  const [filterTab, setFilterTab] = useState<'STREAMS' | 'SEVERITY' | 'AGENTS'>('STREAMS');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Replay State
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayIndex, setReplayIndex] = useState(INITIAL_LOGS.length - 1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Sync replayIndex when logs add to keep it pegged to the end unless we are replaying
  useEffect(() => {
    if (!isReplaying && replayIndex >= logs.length - 2) {
      setReplayIndex(logs.length - 1);
    }
  }, [logs.length, isReplaying]);

  useEffect(() => {
    const errorTimer = setTimeout(() => {
      const errorLogs: LogEntry[] = [
        { id: '26', timestamp: '00:00:42', stream: 'ROUTER', prefix: 'ROUTER', message: 'ERROR: Pipeline connection lost in Router Engine.', status: 'error', latency: '1240ms' },
        { id: '27', timestamp: '00:00:43', stream: 'WORKFLOW', prefix: 'WORKFLOW', message: 'paused / recovering', status: 'warn' },
        { id: '28', timestamp: '00:00:44', stream: 'ROUTER', prefix: 'ROUTER', message: 're-evaluating execution path', status: 'warn' },
        { id: '29', timestamp: '00:00:45', stream: 'AGENT', prefix: 'AGENT ORION', message: 'fallback sequence initiated...', status: 'warn', latency: '24ms' },
        { id: '30', timestamp: '00:00:48', stream: 'AGENT', prefix: 'AGENT ORION', message: 'connection restored. resuming task execution.', status: 'success', latency: '3200ms' },
      ];
      
      let delay = 0;
      errorLogs.forEach((log) => {
        setTimeout(() => {
          setLogs(prev => [...prev, log]);
        }, delay);
        // Stagger logs
        delay += (log.stream === 'ROUTER' && log.status === 'error') ? 500 : 
                 (log.stream === 'AGENT' && log.status === 'success') ? 2000 : 1000;
      });

    }, 8000);

    return () => clearTimeout(errorTimer);
  }, []);

  useEffect(() => {
    if (scrollRef.current && (!isReplaying || replayIndex === logs.length - 1)) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, visibleStreams, replayIndex, isReplaying]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isReplaying) {
      interval = setInterval(() => {
        setReplayIndex(prev => {
          if (prev >= logs.length - 1) {
            setIsReplaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isReplaying, playbackSpeed, logs.length]);

  const filteredLogs = logs.slice(0, replayIndex + 1).filter(l => {
    if (!visibleStreams.has(l.stream)) return false;
    if (!visibleSeverities.has(l.status || 'info')) return false;
    if (l.stream === 'AGENT' && !visibleAgents.has(l.prefix)) return false;
    return true;
  });

  const toggleStream = (stream: StreamType) => {
    setVisibleStreams(prev => {
      const next = new Set(prev);
      if (next.has(stream)) next.delete(stream);
      else next.add(stream);
      return next;
    });
  };

  const toggleSeverity = (sev: string) => {
    setVisibleSeverities(prev => {
      const next = new Set(prev);
      if (next.has(sev)) next.delete(sev);
      else next.add(sev);
      return next;
    });
  };

  const toggleAgent = (agent: string) => {
    setVisibleAgents(prev => {
      const next = new Set(prev);
      if (next.has(agent)) next.delete(agent);
      else next.add(agent);
      return next;
    });
  };

  const toggleAll = () => {
    if (filterTab === 'STREAMS') {
      if (visibleStreams.size === Object.keys(STREAM_CONFIG).length) setVisibleStreams(new Set());
      else setVisibleStreams(new Set(Object.keys(STREAM_CONFIG) as StreamType[]));
    } else if (filterTab === 'SEVERITY') {
      if (visibleSeverities.size === 4) setVisibleSeverities(new Set());
      else setVisibleSeverities(new Set(['info', 'success', 'warn', 'error']));
    } else if (filterTab === 'AGENTS') {
      if (visibleAgents.size === availableAgents.length) setVisibleAgents(new Set());
      else setVisibleAgents(new Set(availableAgents));
    }
  };

  const exportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "execution_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success('Logs exported successfully');
  };

  const hasPipelineError = filteredLogs.some(l => l.status === 'error' && l.message.includes('Pipeline connection lost'));
  const hasRecovered = filteredLogs.some(l => l.prefix === 'AGENT ORION' && l.status === 'success' && l.message.includes('connection restored'));
  const isRecovering = hasPipelineError && !hasRecovered;

  // Compute currently active agents based on the feed history up to replayIndex
  const activeAgents = new Set<string>();
  filteredLogs.forEach((log) => {
    if (log.stream === 'AGENT') {
      if (log.status === 'success' || log.status === 'error' || log.message.includes('completed')) {
        activeAgents.delete(log.prefix);
      } else {
        activeAgents.add(log.prefix);
      }
    }
  });

  return (
    <motion.footer 
      animate={
        isRecovering 
          ? { boxShadow: ['inset 0 0 0px rgba(248,113,113,0)', 'inset 0 0 40px rgba(248,113,113,0.35)', 'inset 0 0 0px rgba(248,113,113,0)'] }
          : { boxShadow: 'inset 0 0 0px rgba(248,113,113,0)' }
      }
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="h-80 border-t border-outline-variant bg-[#0b0c10] flex flex-col font-mono text-[11px] shrink-0 self-end w-full relative z-40 selection:bg-primary/30 overflow-hidden"
    >
      <AnimatePresence>
        {isRecovering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#f87171] pointer-events-none z-20"
          />
        )}
      </AnimatePresence>
      {/* Header */}
      <div className="h-10 border-b border-outline-variant/50 flex flex-col md:flex-row items-start md:items-center justify-between px-4 bg-[#050505] overflow-x-auto scrollbar-hide py-2 md:py-0 min-shrink-0 relative">

        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-primary via-tertiary to-secondary opacity-20" />
        <div className="flex items-center gap-6 uppercase tracking-widest font-bold whitespace-nowrap">
          <div className="flex items-center gap-2 text-on-surface">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>APEX_OS TERMINAL</span>
            <span className="text-outline mx-2">|</span>
          </div>

          <div className="flex items-center gap-3">
            {isReplaying || replayIndex < logs.length - 1 ? (
              <div className="flex items-center gap-2 bg-[#18181b] px-2 py-0.5 rounded border border-outline-variant/30">
                <button onClick={() => setIsReplaying(!isReplaying)} className="text-primary hover:text-white transition-colors">
                  {isReplaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <input 
                  type="range" 
                  min="0" 
                  max={logs.length - 1} 
                  value={replayIndex} 
                  onChange={(e) => {
                    setReplayIndex(parseInt(e.target.value));
                    setIsReplaying(false);
                  }}
                  className="w-20 h-1 bg-[#3f3f46] rounded appearance-none cursor-pointer" 
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <select 
                  value={playbackSpeed} 
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-[9px] text-on-surface-variant outline-none ml-1 cursor-pointer"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={5}>5x</option>
                </select>
              </div>
            ) : (
              <button onClick={() => { setReplayIndex(0); setIsReplaying(true); setPlaybackSpeed(2); }} className="transition-colors hover:text-white cursor-pointer flex items-center gap-1 text-on-surface-variant text-[9px] mr-1">
                <Rewind className="w-3 h-3" /> REPLAY
              </button>
            )}

            <button 
              onClick={exportLogs}
              className="transition-colors hover:text-white cursor-pointer flex items-center gap-1 text-on-surface-variant text-[9px] mr-2"
            >
              <Download className="w-3.5 h-3.5" /> EXPORT
            </button>
            
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
        </div>
        <div className="hidden md:flex flex-col items-end gap-0.5 whitespace-nowrap ml-4">
           <span className="text-[9px] text-outline tracking-widest uppercase">Execution Core v1.0</span>
           <span className="text-[#10b981] flex items-center gap-1.5 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse" /> SYSTEM LIVE</span>
        </div>
      </div>
      
      {/* Heartbeat Monitoring Bar */}
      <div className="h-8 border-b border-outline-variant/30 flex items-center px-4 gap-4 bg-[#0a0a0b] shrink-0">
        <span className="text-[9px] text-outline tracking-widest uppercase font-bold flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#00E5C3]" />
          Active Processing
        </span>
        <div className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide py-1">
          {Array.from(activeAgents).length === 0 ? (
            <span className="text-[9px] text-outline/50 italic py-1">System idle</span>
          ) : (
            Array.from(activeAgents).map(agent => {
              const theme = getAgentThemeForPrefix(agent);
              return (
                <motion.div 
                  key={agent}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="px-2.5 py-0.5 rounded-full border bg-[#18181b] flex items-center gap-2 text-[9px] uppercase tracking-wider font-bold whitespace-nowrap shadow-sm"
                  style={{ borderColor: theme, color: theme, boxShadow: `0 0 10px -2px ${theme}` }}
                >
                  <motion.div 
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.95, 1.1, 0.95] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme, boxShadow: `0 0 8px ${theme}` }}
                  />
                  {agent}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Floating Control Panel */}
      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-12 left-4 z-50 glass-panel border border-outline-variant bg-[#0b0c10]/95 backdrop-blur-xl rounded-lg p-0 w-80 shadow-2xl flex flex-col"
          >
             <div className="flex justify-between items-center p-3 pb-0">
               <div className="flex gap-4">
                 <button 
                   onClick={() => setFilterTab('STREAMS')}
                   className={cn("text-[10px] uppercase font-bold tracking-widest pb-2 border-b-2 transition-colors", filterTab === 'STREAMS' ? "text-on-surface border-primary" : "text-outline border-transparent hover:text-on-surface-variant")}
                 >
                   Streams
                 </button>
                 <button 
                   onClick={() => setFilterTab('AGENTS')}
                   className={cn("text-[10px] uppercase font-bold tracking-widest pb-2 border-b-2 transition-colors", filterTab === 'AGENTS' ? "text-on-surface border-primary" : "text-outline border-transparent hover:text-on-surface-variant")}
                 >
                   Agents
                 </button>
                 <button 
                   onClick={() => setFilterTab('SEVERITY')}
                   className={cn("text-[10px] uppercase font-bold tracking-widest pb-2 border-b-2 transition-colors", filterTab === 'SEVERITY' ? "text-on-surface border-primary" : "text-outline border-transparent hover:text-on-surface-variant")}
                 >
                   Severity
                 </button>
               </div>
             </div>
             
             <div className="p-3">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[9px] uppercase font-medium text-outline tracking-wider">
                   {filterTab === 'STREAMS' ? 'Filter by Stream' : filterTab === 'AGENTS' ? 'Filter specific agents' : 'Filter by log level'}
                 </span>
                 <button onClick={toggleAll} className="text-[9px] uppercase text-outline hover:text-primary transition-colors">Toggle All</button>
               </div>
               
               <div className="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent">
                 {filterTab === 'STREAMS' && Object.entries(STREAM_CONFIG).map(([key, config]) => {
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
                 
                 {filterTab === 'AGENTS' && availableAgents.map(agent => {
                   const isVisible = visibleAgents.has(agent);
                   const agentThemeColor = getAgentThemeForPrefix(agent);
                   return (
                     <button 
                       key={agent}
                       onClick={() => toggleAgent(agent)}
                       className={cn(
                         "flex items-center justify-between p-2 rounded text-[10px] uppercase font-bold tracking-wider transition-colors border",
                         isVisible ? "bg-white/5 text-on-surface border-white/10" : "bg-transparent text-outline hover:bg-white/5 border-transparent hover:border-white/10"
                       )}
                     >
                       <span className="flex items-center gap-2" style={{ color: agentThemeColor }}>
                         {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                         {agent}
                       </span>
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isVisible ? agentThemeColor : 'transparent' }} />
                     </button>
                   );
                 })}
                 
                 {filterTab === 'SEVERITY' && [
                   { id: 'info', label: 'INFO', color: 'text-[#d4d4d8]', bg: '#d4d4d8' },
                   { id: 'success', label: 'SUCCESS', color: 'text-[#34d399]', bg: '#34d399' },
                   { id: 'warn', label: 'WARNING', color: 'text-[#fde047]', bg: '#fde047' },
                   { id: 'error', label: 'ERROR', color: 'text-[#f87171]', bg: '#f87171' },
                 ].map(sev => {
                   const isVisible = visibleSeverities.has(sev.id);
                   return (
                     <button 
                       key={sev.id}
                       onClick={() => toggleSeverity(sev.id)}
                       className={cn(
                         "flex items-center justify-between p-2 rounded text-[10px] uppercase font-bold tracking-wider transition-colors border",
                         isVisible ? "bg-white/5 text-on-surface border-white/10" : "bg-transparent text-outline hover:bg-white/5 border-transparent hover:border-white/10"
                       )}
                     >
                       <span className={cn("flex items-center gap-2", isVisible ? sev.color : "")}>
                         {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                         {sev.label}
                       </span>
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isVisible ? sev.bg : 'transparent' }} />
                     </button>
                   );
                 })}
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden relative">
        <AnimatePresence>
          {hasPipelineError && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute top-4 right-8 z-30 glass-panel border bg-[#0b0c10]/95 backdrop-blur-xl rounded-lg p-4 shadow-2xl w-64 max-w-full"
              style={{ borderColor: isRecovering ? '#eab308' : '#10b981' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Activity className={cn("w-4 h-4", isRecovering ? "text-[#eab308] animate-pulse" : "text-[#10b981]")} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface">System Health</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-outline">Engine Status</span>
                  <span className={cn("font-bold uppercase", isRecovering ? "text-[#f87171] animate-pulse" : "text-[#10b981]")}>
                    {isRecovering ? 'CRITICAL' : 'STABLE'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-outline">Active Agents</span>
                  <span className="font-bold text-on-surface">
                    {isRecovering ? 'ORION FALLBACK' : 'PRIMARY CLUSTER'}
                  </span>
                </div>
                {isRecovering && (
                  <div className="mt-3 pt-3 border-t border-outline-variant text-[9px] uppercase tracking-wider text-[#eab308] flex items-center justify-center gap-2">
                    <CircleDot className="w-3 h-3 animate-spin" />
                    Agent Recovery in progress...
                  </div>
                )}
                {hasRecovered && (
                  <div className="mt-3 pt-3 border-t border-outline-variant text-[9px] uppercase tracking-wider text-[#10b981] flex items-center justify-center gap-2">
                    <Settings2 className="w-3 h-3" />
                    Pipeline Restored
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heatmap Bar */}
        <div className="w-1.5 absolute right-0.5 top-2 bottom-2 flex flex-col gap-[1px] z-10 pointer-events-none opacity-60">
          {logs.map((log, i) => (
             <div 
               key={'heatmap-'+log.id} 
               className={cn(
                 "flex-1 rounded-full min-h-[1px]",
                 log.status === 'error' ? 'bg-[#f87171]' :
                 log.status === 'warn' ? 'bg-[#fde047]' : 
                 log.status === 'success' ? 'bg-[#34d399]' : 'bg-[#52525b]',
                 i > replayIndex && 'opacity-20'
               )}
             />
          ))}
        </div>

        {/* Log Content */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-1.5 text-[#a1a1aa] scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent pb-8 pr-4"
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
                <span 
                  className={cn(
                    "font-bold transition-all duration-300",
                    log.stream !== 'AGENT' && STREAM_CONFIG[log.stream].color,
                    log.status === 'error' && "!text-[#ef4444]",
                    log.status === 'warn' && "!text-[#eab308]"
                  )}
                  style={
                    log.stream === 'AGENT' && !log.status
                      ? { 
                          color: getAgentThemeForPrefix(log.prefix),
                          textShadow: activeAgents.has(log.prefix) ? `0 0 10px ${getAgentThemeForPrefix(log.prefix)}` : 'none'
                        } 
                      : undefined
                  }
                >
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
        {replayIndex === logs.length - 1 && (
          <div className="flex gap-4 px-2 py-1 items-center animate-pulse mt-2">
            <span className="text-primary opacity-50 shrink-0 w-20">WAITING</span>
            <span className="text-outline shrink-0 w-32 font-bold">[SYSTEM]</span>
            <span className="bg-[#52525b] w-2 h-3 border-b-2 border-primary" />
          </div>
        )}
      </div>
      </div>
    </motion.footer>
  );
}
