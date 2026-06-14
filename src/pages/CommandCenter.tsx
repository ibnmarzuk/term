import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, Zap, Cpu, Terminal as TerminalIcon, Search, AlertCircle, 
  CheckCircle2, Play, RefreshCw, Send, ShieldAlert, FileText, BarChart3, 
  Layers, Settings, ChevronRight, Scale
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface Message {
  sender: 'user' | 'apex';
  text: string;
}

interface CouncilVote {
  agent: string;
  role: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  comment: string;
}

export default function CommandCenter() {
  const [inputText, setInputText] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [latencyData, setLatencyData] = useState<{ time: number, value: number }[]>([]);
  const [utilizationData, setUtilizationData] = useState<{ time: number, value: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'CONSOLE' | 'COUNCIL' | 'ROUTER'>('CONSOLE');
  
  // Simulation States
  const [currentStage, setCurrentStage] = useState<'IDLE' | 'ROUTING' | 'COUNCIL_REVIEW' | 'EXECUTING' | 'VALIDATING' | 'FINISHING'>('IDLE');
  const [routerTasks, setRouterTasks] = useState<{ id: string, name: string, status: 'PENDING' | 'ACTIVE' | 'DONE' }[]>([]);
  const [councilVotes, setCouncilVotes] = useState<CouncilVote[]>([]);

  // Telemetry real-time updates
  useEffect(() => {
    const initialLatency = Array.from({ length: 20 }, (_, i) => ({ time: i, value: 45 + Math.random() * 10 }));
    const initialUtil = Array.from({ length: 20 }, (_, i) => ({ time: i, value: 60 + Math.random() * 20 }));
    
    setLatencyData(initialLatency);
    setUtilizationData(initialUtil);

    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: Date.now(), value: isExecuting ? 55 + Math.random() * 25 : 40 + Math.random() * 15 });
        return newData;
      });
      setUtilizationData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: Date.now(), value: isExecuting ? 82 + Math.random() * 10 : 58 + Math.random() * 12 });
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isExecuting]);

  const triggerMissionPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const missionText = inputText;
    setIsExecuting(true);
    setCurrentStage('ROUTING');
    setActiveTab('ROUTER');

    // Create tasks based on user search input
    setRouterTasks([
      { id: 't1', name: `Parse & Spec objectives for "${missionText}"`, status: 'ACTIVE' },
      { id: 't2', name: 'Strategic council verification checklist', status: 'PENDING' },
      { id: 't3', name: 'Sandbox environment instantiation', status: 'PENDING' },
      { id: 't4', name: 'Synthesizing output assets and secure handshakes', status: 'PENDING' }
    ]);

    // Set Council votes
    setCouncilVotes([
      { agent: "Risk Agent", role: "Sanitization & Drift Guard", status: 'APPROVED', comment: "Handshake stable. Zero security vulnerability detected inside public parameters." },
      { agent: "Strategy Agent", role: "Utility Fit Optimization", status: 'APPROVED', comment: "Fit score: 98.4%. Value extraction matches default operating scopes." },
      { agent: "Architecture Agent", role: "Sandbox Isolation Rules", status: 'PENDING', comment: "Analyzing dependency packages constraints." },
      { agent: "Finance Agent", role: "Resource Budgeting & Costs", status: 'PENDING', comment: "Projecting execution envelope limits." }
    ]);

    // Dispatch custom event to Terminal component below
    const event = new CustomEvent('apex-mission-trigger', {
      detail: { missionText }
    });
    window.dispatchEvent(event);

    // Stagger client UI visual steps
    setTimeout(() => {
      setRouterTasks(prev => prev.map((t, idx) => idx === 0 ? { ...t, status: 'DONE' } : idx === 1 ? { ...t, status: 'ACTIVE' } : t));
      setCurrentStage('COUNCIL_REVIEW');
      setActiveTab('COUNCIL');
      
      // Update council parameters live
      setCouncilVotes(prev => prev.map(v => v.agent === "Architecture Agent" ? { ...v, status: 'APPROVED', comment: "Authorized sandbox execution on mock isolated runtime." } : v));
    }, 2000);

    setTimeout(() => {
      setRouterTasks(prev => prev.map((t, idx) => idx === 1 ? { ...t, status: 'DONE' } : idx === 2 ? { ...t, status: 'ACTIVE' } : t));
      setCouncilVotes(prev => prev.map(v => v.agent === "Finance Agent" ? { ...v, status: 'APPROVED', comment: "Execution budget mapped. Output cost parameters optimal (nominal 1.2M tokens)." } : v));
      setCurrentStage('EXECUTING');
      setActiveTab('ROUTER');
    }, 4500);

    setTimeout(() => {
      setRouterTasks(prev => prev.map((t, idx) => idx === 2 ? { ...t, status: 'DONE' } : idx === 3 ? { ...t, status: 'ACTIVE' } : t));
      setCurrentStage('VALIDATING');
    }, 7000);

    setTimeout(() => {
      setRouterTasks(prev => prev.map(t => ({ ...t, status: 'DONE' })));
      setCurrentStage('FINISHING');
    }, 9500);

    setTimeout(() => {
      setCurrentStage('IDLE');
      setIsExecuting(false);
      setInputText('');
    }, 11000);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-4 sm:p-8 relative scrollbar-hide pb-20 bg-[#020B0A]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#12302A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Real-time System Performance Monitor Header */}
      <div className="w-full max-w-5xl mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 font-mono">
        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col gap-2 shadow-lg">
          <div className="flex items-center justify-between text-[#93A8A1] text-[11px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-[#00E5C3]" /> Active Agents</span>
            <span className="text-[#00E5C3] font-bold">12 units</span>
          </div>
          <div className="flex items-end gap-3 mt-1">
            <span className={cn("text-3xl sm:text-4xl font-bold leading-none text-[#F2F5F4]", isExecuting ? "text-[#00E5C3]" : "")}>
              {isExecuting ? '08' : '03'}
            </span>
            <span className="text-[#93A8A1] text-[11px] mb-1 font-sans">currently running</span>
          </div>
          <div className="flex gap-2 mt-2">
            {['engineering', 'design', 'product', 'marketing', 'operations'].map((type, idx) => (
              <div 
                key={type} 
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300", 
                  isExecuting || idx < 3 
                    ? "shadow-[0_0_8px_rgba(0,229,195,0.8)] bg-[#00E5C3]" 
                    : "bg-[#12302A]"
                )} 
              />
            ))}
          </div>
        </div>

        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-[#93A8A1] text-[11px] font-bold uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#00E5C3]" /> Pipeline Latency</span>
            <span className="text-[#00E5C3] font-bold">
              {Math.round(latencyData[latencyData.length - 1]?.value || 0)}ms
            </span>
          </div>
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <Line type="monotone" dataKey="value" stroke="#00E5C3" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-[#93A8A1] text-[11px] font-bold uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#00E5C3]" /> Resource Util</span>
            <span className="text-[#00E5C3] font-bold">
              {Math.round(utilizationData[utilizationData.length - 1]?.value || 0)}%
            </span>
          </div>
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationData}>
                <Line type="monotone" dataKey="value" stroke="#00CFAE" strokeWidth={1.5} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CommandCenter Header text */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10 px-4">
        <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// INTENT PIPELINE ENCLAVE</span>
        <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-5 leading-tight">
          AI Command Center
        </h1>
        <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
          APEX transforms human goals into sandbox executions. Supply a mission brief below to trigger the Router Engine, secure Strategic Council approvals, coordinate parallel specialist agents, and deliver modular packages.
        </p>
      </div>

      {/* Mission creator input */}
      <div className="w-full max-w-4xl bg-[#071311] border border-[#12302A] rounded-xl p-6 mb-10 relative z-10 shadow-xl">
        <form onSubmit={triggerMissionPipeline} className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#12302A] pb-3 mb-4">
            <TerminalIcon className="w-4 h-4 text-[#00E5C3]" />
            <span className="text-xs text-[#93A8A1] uppercase font-mono tracking-widest font-bold">New Mission Parameters</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full flex items-center bg-[#020B0A] border border-[#12302A] rounded px-3 py-1.5 focus-within:border-[#00E5C3] focus-within:shadow-[0_0_15px_rgba(0,229,195,0.08)] transition-all">
              <Search className="w-4 h-4 text-[#526661] mr-2 shrink-0" />
              <input 
                type="text"
                disabled={isExecuting}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your destination (e.g. 'Build a high performance voting module in Rust')"
                className="bg-transparent text-sm text-[#F2F5F4] outline-none w-full py-1 placeholder:text-[#526661] font-sans"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isExecuting || !inputText.trim()}
              className="w-full md:w-auto px-6 py-3 bg-[#00E5C3] hover:bg-[#00CFAE] disabled:opacity-50 disabled:cursor-not-allowed text-[#02110E] transition-all rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer hover:shadow-[0_0_20px_rgba(0,229,195,0.2)]"
            >
              {isExecuting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Executing Pipeline
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Trigger Mission
                </>
              )}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] font-mono text-[#93A8A1]">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C3]" /> Router active</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C3]" /> Council sync nominal</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#00E5C3]" /> Memory sandbox isolated</span>
          </div>
        </form>
      </div>

      {/* Main Execution Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* Navigation Sidebar panel */}
        <div className="md:col-span-3 flex flex-row md:flex-col gap-2 font-mono text-xs">
          <button 
            onClick={() => setActiveTab('CONSOLE')}
            className={cn(
              "flex-1 md:flex-none px-4 py-3 rounded text-left flex items-center justify-between border uppercase font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'CONSOLE' 
                ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3]" 
                : "bg-[#071311] border-[#12302A] text-[#93A8A1] hover:border-[#12302A]/80 hover:text-white"
            )}
          >
            <span>Overview</span>
            <Layers className="w-4 h-4 hidden md:block" />
          </button>
          
          <button 
            onClick={() => setActiveTab('ROUTER')}
            className={cn(
              "flex-1 md:flex-none px-4 py-3 rounded text-left flex items-center justify-between border uppercase font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'ROUTER' 
                ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3]" 
                : "bg-[#071311] border-[#12302A] text-[#93A8A1] hover:border-[#12302A]/80 hover:text-white"
            )}
          >
            <span className="flex items-center gap-1.5">
              {isExecuting && currentStage === 'ROUTING' && <RefreshCw className="w-3 h-3 animate-spin text-[#00E5C3]" />}
              Router Engine
            </span>
            <Settings className="w-4 h-4 hidden md:block" />
          </button>

          <button 
            onClick={() => setActiveTab('COUNCIL')}
            className={cn(
              "flex-1 md:flex-none px-4 py-3 rounded text-left flex items-center justify-between border uppercase font-bold tracking-wider transition-colors cursor-pointer",
              activeTab === 'COUNCIL' 
                ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3]" 
                : "bg-[#071311] border-[#12302A] text-[#93A8A1] hover:border-[#12302A]/80 hover:text-white"
            )}
          >
            <span className="flex items-center gap-1.5">
              {isExecuting && currentStage === 'COUNCIL_REVIEW' && <RefreshCw className="w-3 h-3 animate-spin text-[#00E5C3]" />}
              Council votes
            </span>
            <Scale className="w-4 h-4 hidden md:block" />
          </button>
        </div>

        {/* Dynamic Panel Panel Body */}
        <div className="md:col-span-9 bg-[#071311] border border-[#12302A] rounded-xl p-6 min-h-[300px] flex flex-col shadow-xl">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'CONSOLE' && (
              <motion.div 
                key="console-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col gap-5"
              >
                <div className="flex items-center justify-between border-b border-[#12302A]/60 pb-3">
                  <h3 className="font-mono text-xs text-[#F2F5F4] uppercase tracking-wider font-bold">Workspace Overview</h3>
                  <span className="text-[10px] text-outline font-mono uppercase font-semibold">PRD v1.5 Compliant</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#12302A] bg-[#020B0A] rounded p-4 flex flex-col gap-1.5 justify-between">
                    <div>
                      <h4 className="font-mono text-xs text-[#F2F5F4] uppercase font-bold tracking-wider">APEX Router</h4>
                      <p className="text-xs text-[#93A8A1] mt-1 font-sans">Translates high horizon intentions into specialized pipeline tasks, approving target resources dynamically.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('ROUTER')} 
                      className="text-[10px] text-[#00E5C3] font-mono hover:underline uppercase flex items-center gap-1 mt-3 text-left bg-transparent border-none cursor-pointer"
                    >
                      Inspect Router <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="border border-[#12302A] bg-[#020B0A] rounded p-4 flex flex-col gap-1.5 justify-between">
                    <div>
                      <h4 className="font-mono text-xs text-[#F2F5F4] uppercase font-bold tracking-wider">Council Board</h4>
                      <p className="text-xs text-[#93A8A1] mt-1 font-sans">Multi-agent executive consensus layer validating performance bounds, risk profiles, and code budgeting.</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('COUNCIL')} 
                      className="text-[10px] text-[#00E5C3] font-mono hover:underline uppercase flex items-center gap-1 mt-3 text-left bg-transparent border-none cursor-pointer"
                    >
                      Inspect Council <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-auto border border-[#12302A] rounded p-4 bg-[#020B0A]/30">
                  <span className="text-[9px] font-mono text-[#526661] uppercase tracking-widest block mb-2 font-bold">SYSTEM STATE STATUS</span>
                  <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono text-[#93A8A1]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3] flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 rounded-full bg-[#00E5C3]" />
                      </div>
                      <span>MCP Connectors: 500+ Nominal</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00E5C3]/10 border border-[#00E5C3] flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 rounded-full bg-[#00E5C3]" />
                      </div>
                      <span>Sandbox: Zero Data Retention</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ROUTER ENGINE TAB */}
            {activeTab === 'ROUTER' && (
              <motion.div 
                key="router-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#12302A]/60 pb-3">
                  <h3 className="font-mono text-xs text-[#F2F5F4] uppercase tracking-wider font-bold">Adaptive Routing Engine</h3>
                  <span className={cn(
                    "text-[10px] font-mono uppercase px-2 py-0.5 rounded tracking-wide",
                    isExecuting ? "bg-[#00E5C3]/10 text-[#00E5C3]" : "bg-[#12302A] text-outline"
                  )}>
                    {isExecuting ? 'Decoupling Stream' : 'Ready'}
                  </span>
                </div>

                {!isExecuting ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-[#12302A] rounded bg-[#020B0A]/40 min-h-[200px]">
                    <Layers className="w-8 h-8 text-[#526661] mb-3" />
                    <h4 className="font-mono text-xs text-[#F2F5F4] uppercase tracking-wider mb-1 font-bold">No Active Routings</h4>
                    <p className="text-xs text-[#93A8A1] max-w-xs font-sans">Trigger a mission objective in the inputs above to parse real-time workflows and visualize sub-tasks.</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-[#526661] uppercase tracking-widest font-bold">Subtask Orchestration Tree</span>
                    <div className="space-y-2.5">
                      {routerTasks.map((t, idx) => (
                        <div 
                          key={t.id} 
                          className={cn(
                            "p-3.5 rounded border font-mono text-[11px] flex items-center justify-between transition-colors",
                            t.status === 'ACTIVE' ? "bg-[#00E5C3]/5 border-[#00E5C3] text-white shadow-sm" :
                            t.status === 'DONE' ? "bg-[#12302A]/20 border-[#12302A]/60 text-[#93A8A1]/80" : "bg-transparent border-[#12302A] text-[#93A8A1]"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded border",
                              t.status === 'ACTIVE' ? "border-[#00E5C3] text-[#00E5C3]" : "border-[#12302A]"
                            )}>
                              0{idx + 1}
                            </span>
                            <span>{t.name}</span>
                          </div>
                          
                          <span>
                            {t.status === 'DONE' && <CheckCircle2 className="w-4 h-4 text-[#00E5C3]" />}
                            {t.status === 'ACTIVE' && <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00E5C3]" />}
                            {t.status === 'PENDING' && <span className="text-[9px] uppercase tracking-wide text-outline">Queue</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* COUNCIL ENGINE TAB */}
            {activeTab === 'COUNCIL' && (
              <motion.div 
                key="council-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between border-b border-[#12302A]/60 pb-3">
                  <h3 className="font-mono text-xs text-[#F2F5F4] uppercase tracking-wider font-bold">APEX Strategic Council</h3>
                  <span className="text-[10px] text-outline font-mono uppercase font-semibold">6-Agent Validation Matrix</span>
                </div>

                {!isExecuting ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-[#12302A] rounded bg-[#020B0A]/40 min-h-[200px]">
                    <Scale className="w-8 h-8 text-[#526661] mb-3" />
                    <h4 className="font-mono text-xs text-[#F2F5F4] uppercase tracking-wider mb-1 font-bold">Council Idle</h4>
                    <p className="text-xs text-[#93A8A1] max-w-xs font-sans">Consensus layers activate automatically when high-horizon missions are submitted to verify risk containment.</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-[#526661] uppercase tracking-widest font-bold">Consensus Votes</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {councilVotes.map((v, i) => (
                        <div key={i} className="border border-[#12302A] bg-[#020B0A] rounded p-3.5 flex flex-col justify-between gap-2 shadow-inner">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-mono text-xs text-[#F2F5F4] font-semibold">{v.agent}</h4>
                              <p className="text-[9px] text-outline font-mono">{v.role}</p>
                            </div>
                            
                            <span className={cn(
                              "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide",
                              v.status === 'APPROVED' ? "bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/20" : "bg-[#ffd000]/10 text-[#ffd000] border border-[#ffd000]/20 animate-pulse"
                            )}>
                              {v.status}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-[#93A8A1] font-sans leading-normal border-t border-[#12302A]/40 pt-2 italic">
                            "{v.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
