import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCw, Archive, Plus, Cpu, Shield, Activity, HardDrive, 
  Users, Layers, Settings, ChevronRight, Lock, Database, Search, 
  Trash2, Filter, Network, BarChart2, CheckCircle2, AlertTriangle, HelpCircle, FileText
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useLivePreview } from '../lib/LivePreviewContext';

// MISSION ENGINE Interfaces & Data
interface MissionTask {
  id: string;
  name: string;
  assignedAgent: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  mcpResource?: string;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'PLANNED' | 'APPROVED' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
  tasks: MissionTask[];
  assignedSupervisor: string;
  latencyAvg: number;
  tokensConsumed: number;
  createdAt: string;
}

const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'MSN-2045',
    title: "Secure Cross-Chain Swap Validator",
    description: "Compile and audit Rust validation consensus layers. Conduct rigorous fuzz-testing within sandboxed container.",
    status: 'RUNNING',
    assignedSupervisor: "Engineering Supervisor",
    latencyAvg: 42,
    tokensConsumed: 480000,
    createdAt: "2026-06-14 08:30",
    tasks: [
      { id: 't1', name: "Scan GitHub security advisories and code trees", assignedAgent: "Security Engineer", status: 'COMPLETED' },
      { id: 't2', name: "Formulate validation consensus loops inside rust state", assignedAgent: "Software Engineer", status: 'RUNNING' },
      { id: 't3', name: "Conduct fuzz-testing validation checks", assignedAgent: "AI Tester", status: 'PENDING' },
      { id: 't4', name: "Compile output artifacts and size latency tolerances", assignedAgent: "QA Engineer", status: 'PENDING' },
    ]
  },
  {
    id: 'MSN-2046',
    title: "Interactive Core-OS Dashboard Module",
    description: "Create visual layout blocks, pair display typography, and optimize coordinate state managers.",
    status: 'PLANNED',
    assignedSupervisor: "Design Supervisor",
    latencyAvg: 12,
    tokensConsumed: 120000,
    createdAt: "2026-06-14 09:12",
    tasks: [
      { id: 't1', name: "Establish layout spacing variables and border radii in JSON", assignedAgent: "UI Designer", status: 'PENDING' },
      { id: 't2', name: "Perform responsive viewport contrast audits", assignedAgent: "Design QA", status: 'PENDING' }
    ]
  },
  {
    id: 'MSN-2043',
    title: "Venture Acquisition Outreach Loop",
    description: "Develop automated acquisition criteria documents and filter strategic fit lists in Google Sheets.",
    status: 'COMPLETED',
    assignedSupervisor: "Marketing Supervisor",
    latencyAvg: 18,
    tokensConsumed: 190000,
    createdAt: "2026-06-13 14:02",
    tasks: [
      { id: 't1', name: "Compose market position manifesto copy blocks", assignedAgent: "Copywriter", status: 'COMPLETED' },
      { id: 't2', name: "Map referral customer-acquisition models", assignedAgent: "Growth Agent", status: 'COMPLETED' }
    ]
  }
];

// SUPERVISOR AND AGENTS MATRIX
interface Supervisor {
  name: string;
  department: string;
  agentCount: number;
  status: 'NOMINAL' | 'OCCUPIED' | 'STANDBY';
  agents: { name: string; reputation: number; latency: string; health: number }[];
}

const INITIAL_SUPERVISORS: Supervisor[] = [
  {
    name: "Engineering Supervisor",
    department: "Engineering",
    agentCount: 8,
    status: "NOMINAL",
    agents: [
      { name: "Software Engineer", reputation: 99.4, latency: "12ms", health: 100 },
      { name: "Frontend Engineer", reputation: 98.1, latency: "8ms", health: 100 },
      { name: "Backend Engineer", reputation: 97.5, latency: "15ms", health: 98 },
      { name: "DevOps Agent", reputation: 100, latency: "40ms", health: 100 },
      { name: "Security Engineer", reputation: 99.9, latency: "10ms", health: 100 },
      { name: "QA Engineer", reputation: 96.8, latency: "25ms", health: 100 },
      { name: "AI Tester", reputation: 95.2, latency: "180ms", health: 92 },
    ]
  },
  {
    name: "Design Supervisor",
    department: "Design",
    agentCount: 5,
    status: "STANDBY",
    agents: [
      { name: "UI Designer", reputation: 98.8, latency: "5ms", health: 100 },
      { name: "UX Designer", reputation: 97.2, latency: "12ms", health: 100 },
      { name: "Graphic Designer", reputation: 99.0, latency: "9ms", health: 100 },
      { name: "Brand Designer", reputation: 95.4, latency: "15ms", health: 100 },
      { name: "Design QA", reputation: 98.2, latency: "14ms", health: 100 }
    ]
  },
  {
    name: "Product Supervisor",
    department: "Product",
    agentCount: 4,
    status: "NOMINAL",
    agents: [
      { name: "Product Manager", reputation: 99.1, latency: "50ms", health: 100 },
      { name: "Startup Strategy Agent", reputation: 98.5, latency: "220ms", health: 100 },
      { name: "Venture Builder Agent", reputation: 96.0, latency: "410ms", health: 95 },
      { name: "Requirements Analyst", reputation: 99.7, latency: "30ms", health: 100 }
    ]
  }
];

// MEMORY Interfaces
interface MemoryItem {
  layer: 'GLOBAL' | 'MISSION' | 'AGENT';
  title: string;
  snippet: string;
  source: string;
  score: number;
}

const INITIAL_MEMORY: MemoryItem[] = [
  { layer: 'GLOBAL', title: "APEX Sandbox Ruleset", snippet: "Strict port 3000 mapping; absolute paths starting with slash are isolated from physical root. Enforces secure, clean environment constraints.", source: "/rules/sandbox-policy.json", score: 99.2 },
  { layer: 'GLOBAL', title: "Corporate Design Guidelines", snippet: "High-contrast slate black layout, emerald secondary accents. Maximum visual hierarchy, 44px min button touch bounds, no emojis permitted.", source: "/branding/styleguide.css", score: 98.4 },
  { layer: 'MISSION', title: "Consensus Swapping Logic v1.2", snippet: "Resolved transient bottleneck in core transaction processing validation block during multi-threaded execution trials.", source: "MSN-2043/logs.json", score: 95.0 },
  { layer: 'AGENT', title: "Fuzz Tester Alignment Vector", snippet: "Learned strict evaluation criteria for boundary parsing. Sanitizes inputs and formats outputs into JSON parameters.", source: "AIS-Tester/metrics.opt", score: 92.6 }
];

// AUDIT LOGS Interfaces
interface AuditLog {
  timestamp: string;
  action: string;
  actor: string;
  role: string;
  ip: string;
}

const INITIAL_AUDITS: AuditLog[] = [
  { timestamp: "2026-06-14 10:14:22", action: "Authorized workflow initiation on MSN-2045", actor: "ibnmarzuk@apex.os", role: "Owner", ip: "172.18.0.4" },
  { timestamp: "2026-06-14 10:11:05", action: "Updated database constraints in sandbox", actor: "Engineering Supervisor", role: "Supervisor", ip: "127.0.0.1" },
  { timestamp: "2026-06-14 09:44:11", action: "Downloaded generated output design_tokens.json", actor: "ibnmarzuk@apex.os", role: "Owner", ip: "172.18.0.4" },
  { timestamp: "2026-06-14 08:30:00", action: "Triggered Multi-tenant RBAC environment synch", actor: "APEX Master Daemon", role: "Agent", ip: "localhost" }
];

export default function MissionEngine() {
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [supervisors, setSupervisors] = useState<Supervisor[]>(INITIAL_SUPERVISORS);
  const [activeTab, setActiveTab] = useState<'MISSIONS' | 'AGENTS' | 'MEMORY' | 'GOVERNANCE'>('MISSIONS');
  
  // Create Mission Dialog
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSupervisor, setNewSupervisor] = useState('Engineering Supervisor');

  // Memory states
  const [memorySearch, setMemorySearch] = useState('');
  const [memoryList, setMemoryList] = useState<MemoryItem[]>(INITIAL_MEMORY);

  // Enterprise / RBAC setup
  const [activeRole, setActiveRole] = useState<'Owner' | 'Admin' | 'Manager' | 'Operator' | 'Viewer' | 'Agent'>('Owner');
  const [activeTenant, setActiveTenant] = useState('Sovereign Hub Alpha');

  // Real-time chart telemetry
  const [telemetry, setTelemetry] = useState<{ time: string, latency: number, load: number }[]>([]);

  useEffect(() => {
    // Generate static historical performance data
    const initialTelemetry = Array.from({ length: 15 }, (_, i) => ({
      time: `${10 + i}:00`,
      latency: 35 + Math.round(Math.random() * 20),
      load: 50 + Math.round(Math.random() * 30)
    }));
    setTelemetry(initialTelemetry);

    // Live update telemetry mimicking production
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const sliced = prev.slice(1);
        const nextTime = new Date();
        const nextTimeString = `${String(nextTime.getHours()).padStart(2, '0')}:${String(nextTime.getMinutes()).padStart(2, '0')}`;
        return [...sliced, {
          time: nextTimeString,
          latency: 32 + Math.round(Math.random() * 25),
          load: 45 + Math.round(Math.random() * 40)
        }];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const { simulateTask } = useLivePreview();

  const handleCreateMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMsn: Mission = {
      id: `MSN-${Math.floor(2000 + Math.random() * 1000)}`,
      title: newTitle,
      description: newDesc,
      status: 'DRAFT',
      assignedSupervisor: newSupervisor,
      latencyAvg: 0,
      tokensConsumed: 0,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      tasks: [
        { id: 't1', name: "Parse input directives and target restrictions", assignedAgent: "Requirements Analyst", status: 'PENDING' },
        { id: 't2', name: "Audit workspace safety layers", assignedAgent: "Security Engineer", status: 'PENDING' }
      ]
    };

    setMissions([newMsn, ...missions]);
    setNewTitle('');
    setNewDesc('');
    setShowCreateDialog(false);
  };

  const handleToggleStatus = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'RUNNING' ? 'PAUSED' : 'RUNNING';
        if (nextStatus === 'RUNNING') {
          simulateTask(m.title);
        }
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleArchive = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, status: 'ARCHIVED' };
      }
      return m;
    }));
  };

  const filteredMemory = memoryList.filter(item => 
    item.title.toLowerCase().includes(memorySearch.toLowerCase()) || 
    item.snippet.toLowerCase().includes(memorySearch.toLowerCase()) ||
    item.layer.toLowerCase().includes(memorySearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-8 scrollbar-hide pb-20 bg-[#020B0A] relative text-[#F2F5F4]">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#12302A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Page Header */}
      <div className="w-full max-w-6xl mx-auto mb-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#12302A] pb-6">
        <div>
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-2">// MISSION CONTROL KERNEL v1.5</span>
          <h1 className="text-3xl sm:text-4xl font-mono uppercase tracking-tight font-bold text-white mb-2">APEX Mission Engine</h1>
          <p className="text-[#93A8A1] text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
            Main execution core of APEX. Manages multi-agent parallel runtimes, supervisor frameworks, persistent global/mission memory vaults, and multi-tenant RBAC compliance enclaves.
          </p>
        </div>

        {/* Tenant and RBAC Quick Config block */}
        <div className="mt-4 md:mt-0 flex gap-4 font-mono text-xs text-[#93A8A1]">
          <div className="bg-[#071311] border border-[#12302A] p-2.5 rounded flex flex-col gap-1 shadow-md">
            <span className="text-[9px] text-[#526661] uppercase tracking-widest font-bold">WORKSPACE TENANT</span>
            <select 
              value={activeTenant} 
              onChange={(e) => setActiveTenant(e.target.value)}
              className="bg-transparent text-[#00E5C3] outline-none font-bold border-none cursor-pointer"
            >
              <option value="Sovereign Hub Alpha" className="bg-[#020B0A]">Sovereign Hub Alpha</option>
              <option value="Sovereign Hub Beta" className="bg-[#020B0A]">Sovereign Hub Beta</option>
              <option value="Enterprise Secure Sector" className="bg-[#020B0A]">Enterprise Secure</option>
            </select>
          </div>

          <div className="bg-[#071311] border border-[#12302A] p-2.5 rounded flex flex-col gap-1 shadow-md">
            <span className="text-[9px] text-[#526661] uppercase tracking-widest font-bold">ACTIVE RBAC ROLE</span>
            <select 
              value={activeRole} 
              onChange={(e) => setActiveRole(e.target.value as any)}
              className="bg-transparent text-[#00E5C3] outline-none font-bold border-none cursor-pointer"
            >
              <option value="Owner" className="bg-[#020B0A]">Owner</option>
              <option value="Admin" className="bg-[#020B0A]">Admin</option>
              <option value="Manager" className="bg-[#020B0A]">Manager</option>
              <option value="Operator" className="bg-[#020B0A]">Operator</option>
              <option value="Viewer" className="bg-[#020B0A]">Viewer</option>
              <option value="Agent" className="bg-[#020B0A]">Agent</option>
            </select>
          </div>
        </div>
      </div>

      {/* REAL-TIME OVERVIEW PERFORMANCE CHART */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 relative z-10 font-mono">
        <div className="col-span-12 md:col-span-8 bg-[#071311] border border-[#12302A] p-5 rounded-xl shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[11px] uppercase tracking-widest text-[#93A8A1] font-bold">REAL-TIME SYSTEM OBSERVABILITY</span>
            <div className="flex gap-4 text-[10px] text-[#93A8A1]">
              <span className="flex items-center gap-1.5 font-sans"><span className="w-2 h-2 rounded bg-gradient-to-t from-[#00E5C3] to-[#01ffe4]" /> Pipeline Latency (ms)</span>
              <span className="flex items-center gap-1.5 font-sans"><span className="w-2 h-2 rounded bg-[#00CFAE]" /> Model Ingress Load (%)</span>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5C3" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00E5C3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#223a34" style={{ fontSize: '10px' }} />
                <YAxis stroke="#223a34" style={{ fontSize: '10px' }} />
                <Tooltip contentStyle={{ backgroundColor: '#071311', borderColor: '#12302A', color: '#F2F5F4', fontFamily: 'monospace', fontSize: '11px' }} />
                <Area type="monotone" dataKey="latency" stroke="#00E5C3" strokeWidth={1.5} fillOpacity={1} fill="url(#colorLatency)" />
                <Area type="monotone" dataKey="load" stroke="#00CFAE" strokeWidth={1} dot={false} strokeDasharray="3 3" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic summary block */}
        <div className="col-span-12 md:col-span-4 bg-[#071311] border border-[#12302A] p-5 rounded-xl shadow-lg flex flex-col justify-between">
          <h3 className="text-[11px] uppercase tracking-widest text-[#93A8A1] font-bold pb-2 border-b border-[#12302A]/80">System Telemetry</h3>
          <div className="space-y-4 my-2">
            <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2">
              <span className="text-xs text-[#93A8A1] font-sans font-normal">Active Pipeline</span>
              <span className="text-sm font-bold text-white">NOMINAL</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2">
              <span className="text-xs text-[#93A8A1] font-sans font-normal">Active Supervisor Enclaves</span>
              <span className="text-sm font-bold text-[#00E5C3]">03 Supervisors</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2">
              <span className="text-xs text-[#93A8A1] font-sans font-normal">Aggregated Memory Records</span>
              <span className="text-sm font-bold text-white">412 Units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#93A8A1] font-sans font-normal">Throughput Limits</span>
              <span className="text-sm font-bold text-[#00E5C3]">12.5M tokens/min</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 p-2 bg-[#020B0A] border border-[#12302A] rounded text-[9px] text-[#526661] font-bold">
            <Shield className="w-3.5 h-3.5 text-[#00E5C3]" /> Security clearance high-level synchronized.
          </div>
        </div>
      </div>

      {/* TABS SELECTOR SYSTEM */}
      <div className="w-full max-w-6xl mx-auto mb-8 border-b border-[#12302A] flex gap-1 bg-[#071311]/40 p-1 rounded-t-lg relative z-10 font-mono text-xs">
        <button
          onClick={() => setActiveTab('MISSIONS')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeTab === 'MISSIONS' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Mission Engine
        </button>
        <button
          onClick={() => setActiveTab('AGENTS')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeTab === 'AGENTS' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Agent Runtime & Supervisors
        </button>
        <button
          onClick={() => setActiveTab('MEMORY')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeTab === 'MEMORY' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Memory Vault
        </button>
        <button
          onClick={() => setActiveTab('GOVERNANCE')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeTab === 'GOVERNANCE' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Governance & Audits
        </button>
      </div>

      {/* PRIMARY VIEWS LAYOUT */}
      <div className="w-full max-w-6xl mx-auto relative z-10 mb-12">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: APEX MISSION ENGINE CONTROL */}
          {activeTab === 'MISSIONS' && (
            <motion.div 
              key="tab-missions" 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Mission Controls Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest font-bold text-white mb-1">Missions Directory</h3>
                  <p className="text-xs text-[#93A8A1] font-sans">Draft, plan, manage executions, and isolate bottlenecks for modular workflows.</p>
                </div>
                <button 
                  onClick={() => setShowCreateDialog(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] transition-all rounded font-mono text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_0_12px_rgba(0,229,195,0.2)]"
                >
                  <Plus className="w-4 h-4" /> Create Mission
                </button>
              </div>

              {/* Grid of Missions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {missions.map((m) => (
                  <div key={m.id} className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between shadow-md relative min-h-[340px]">
                    <div>
                      {/* Top metadata */}
                      <div className="flex items-center justify-between border-b border-[#12302A]/60 pb-3 mb-4 font-mono text-[10px]">
                        <span className="text-[#00E5C3] font-bold">{m.id}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-bold tracking-wide",
                            m.status === 'RUNNING' ? "bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/20" :
                            m.status === 'COMPLETED' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            m.status === 'PLANNED' ? "bg-[#ffd000]/10 text-[#ffd000] border border-[#ffd000]/20" : "bg-[#12302A] text-[#93A8A1]"
                          )}>
                            {m.status}
                          </span>
                        </div>
                      </div>

                      {/* Title & Desc */}
                      <h4 className="text-[#F2F5F4] text-sm font-mono uppercase tracking-tight font-bold mb-2">{m.title}</h4>
                      <p className="text-[#93A8A1] text-xs font-sans leading-relaxed mb-4">{m.description}</p>
                      
                      {/* Department supervisor */}
                      <div className="flex items-center gap-2 mb-4 bg-[#020B0A] p-2 rounded border border-[#12302A]/50">
                        <Users className="w-4 h-4 text-[#00E5C3]" />
                        <span className="text-[11px] font-mono text-[#93A8A1]">{m.assignedSupervisor}</span>
                      </div>

                      {/* Step Task monitoring */}
                      <div className="space-y-2 mt-4 pt-4 border-t border-[#12302A]/40">
                        <span className="text-[9px] font-mono text-[#526661] uppercase tracking-widest block font-bold">TASK EXECUTION MATRIX</span>
                        {m.tasks.map((task, idx) => (
                          <div key={task.id} className="flex items-center justify-between text-[11px] font-mono p-1 bg-[#020B0A]/10 rounded">
                            <span className="text-[#93A8A1] truncate max-w-[160px] flex items-center gap-1.5 font-sans text-xs">
                              <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                task.status === 'COMPLETED' ? "bg-[#00E5C3]" :
                                task.status === 'RUNNING' ? "bg-[#ffd000] animate-pulse" : "bg-[#223a34]"
                              )} />
                              {task.name}
                            </span>
                            <span className="text-[10px] text-outline text-[9px]">{task.assignedAgent}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Operational Actions */}
                    <div className="mt-6 pt-4 border-t border-[#12302A]/60 flex items-center justify-between font-mono text-[10px]">
                      <div className="flex gap-1">
                        {m.status !== 'COMPLETED' && m.status !== 'ARCHIVED' && (
                          <button 
                            onClick={() => handleToggleStatus(m.id)}
                            className="bg-transparent border-none p-1 text-[#00E5C3] hover:text-white cursor-pointer"
                            title={m.status === 'RUNNING' ? 'Pause Mission' : 'Resume Mission'}
                          >
                            {m.status === 'RUNNING' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                        )}
                        {m.status !== 'ARCHIVED' && (
                          <button 
                            onClick={() => handleArchive(m.id)}
                            className="bg-transparent border-none p-1 text-[#526661] hover:text-red-400 cursor-pointer"
                            title="Archive Mission"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="text-right text-[#526661]">
                        <span>{m.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: AGENT RUNTIME & SUPERVISOR FRAMEWORK */}
          {activeTab === 'AGENTS' && (
            <motion.div 
              key="tab-agents" 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow mb-6">
                <h3 className="text-sm font-mono uppercase tracking-widest font-bold text-white mb-1">Supervisor Orchestration Framework (PRD Section 3.3)</h3>
                <p className="text-xs text-[#93A8A1] font-sans">The APEX Router issues task mandates directly to Department Supervisors. Each supervisor manages their localized pool of specialized agents to optimize throughput and performance latency.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Expandable Department Supervisors list */}
                <div className="md:col-span-5 space-y-4">
                  <span className="text-[11px] font-mono text-[#93A8A1] uppercase tracking-widest block font-bold">DEPARTMENT SUPERVISORS</span>
                  
                  {supervisors.map((sup, idx) => (
                    <div key={idx} className="bg-[#071311] border border-[#12302A] rounded-xl p-4 flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-mono text-sm text-[#F2F5F4] font-bold">{sup.name}</h4>
                          <span className="text-[10px] font-mono text-outline">{sup.department} Enclave</span>
                        </div>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider",
                          sup.status === 'NOMINAL' ? "bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/20" : "bg-[#ffd000]/10 text-[#ffd000] border border-[#ffd000]/20"
                        )}>
                          {sup.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[11px] font-mono pt-3 border-t border-[#12302A]/40 text-[#93A8A1]">
                        <span>Manageable Pools: {sup.agentCount} Agents</span>
                        <span className="text-[#00E5C3] cursor-pointer hover:underline text-xs flex items-center">
                          Diagnostics <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-agents Live Telemetry Runtime metrics */}
                <div className="md:col-span-7 bg-[#071311] border border-[#12302A] rounded-xl p-5 shadow flex flex-col">
                  <span className="text-[11px] font-mono text-[#93A8A1] uppercase tracking-widest block font-bold mb-4">ACTIVE AGENT RUNTIME METRICS</span>
                  
                  <div className="flex-1 space-y-3.5 overflow-y-auto max-h-[360px] pr-2 scrollbar-none">
                    {supervisors[0].agents.map((agent, i) => (
                      <div key={i} className="bg-[#020B0A]/40 border border-[#12302A]/60 rounded p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-[#12302A]/20 border border-[#12302A] flex items-center justify-center text-[#00E5C3] shrink-0 font-mono text-xs font-bold leading-none">
                            {agent.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-mono text-xs text-white uppercase font-bold tracking-wide">{agent.name}</h4>
                            <span className="text-[9px] font-mono text-[#526661]">Reputation: {agent.reputation}%</span>
                          </div>
                        </div>

                        {/* Progress loader mapping health & performance metrics */}
                        <div className="w-full sm:w-auto flex items-center gap-4 text-[11px] font-mono text-[#93A8A1]">
                          <div className="flex flex-col gap-1 items-end min-w-[70px]">
                            <span className="text-[9px] uppercase font-bold text-[#526661]">Latency</span>
                            <span>{agent.latency}</span>
                          </div>
                          <div className="flex flex-col gap-1 items-end min-w-[70px]">
                            <span className="text-[9px] uppercase font-bold text-[#526661]">Node Integrity</span>
                            <span className="text-[#00E5C3] font-bold">{agent.health}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: AGENT SEMANTIC MEMORY VAULTS */}
          {activeTab === 'MEMORY' && (
            <motion.div 
              key="tab-memory" 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow mb-6">
                <h3 className="text-sm font-mono uppercase tracking-widest font-bold text-white mb-1">Persistent Node-Memory Vault</h3>
                <p className="text-xs text-[#93A8A1] font-sans">APEX separates context vectors into three cognitive storage planes: Global System rules, active Mission parameters, and historical Agent performance success/failure trends to preserve zero-inference lag.</p>
              </div>

              {/* Memory Search inputs */}
              <div className="flex items-center bg-[#071311] border border-[#12302A] rounded px-3.5 py-2.5 max-w-xl">
                <Search className="w-4 h-4 text-[#526661] mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={memorySearch}
                  onChange={(e) => setMemorySearch(e.target.value)}
                  placeholder="Query semantic memory graph layers..."
                  className="bg-transparent text-sm text-[#F2F5F4] outline-none w-full placeholder:text-[#526661] font-sans"
                />
              </div>

              {/* Memory Cards browser */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMemory.map((mem, i) => (
                  <div key={i} className="bg-[#071311] border border-[#12302A] rounded-xl p-5 shadow flex flex-col justify-between min-h-[160px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2 mb-3 font-mono text-[10px]">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[9px] uppercase font-bold",
                          mem.layer === 'GLOBAL' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          mem.layer === 'MISSION' ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-[#00E5C3]/10 text-[#00E5C3] border border-[#00E5C3]/20"
                        )}>
                          {mem.layer} MEMORY
                        </span>
                        <span className="text-[#526661]">Confidence Weight: {mem.score}%</span>
                      </div>
                      <h4 className="text-xs font-mono uppercase font-bold text-white mb-1.5">{mem.title}</h4>
                      <p className="text-[#93A8A1] text-xs font-sans leading-relaxed leading-normal">{mem.snippet}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#12302A]/40 font-mono text-[10px] text-[#526661] flex justify-between">
                      <span>Source: {mem.source}</span>
                      <span className="text-[#00E5C3] hover:underline cursor-pointer">Inject Node</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: GOVERNANCE, AUDITS, RBAC & ROLES */}
          {activeTab === 'GOVERNANCE' && (
            <motion.div 
              key="tab-governance" 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow mb-6">
                <h3 className="text-sm font-mono uppercase tracking-widest font-bold text-white mb-1">Enterprise RBAC Ledger</h3>
                <p className="text-xs text-[#93A8A1] font-sans">Immutable diagnostic records logs capturing all system workspace access, project compilations, and variable authorization toggles.</p>
              </div>

              {/* Roles matrix list panel */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
                <div className="bg-[#071311] border border-[#12302A] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#526661] uppercase tracking-widest block font-bold mb-2">SSO ENCLAVE STATUS</span>
                    <h4 className="font-mono text-sm text-[#F2F5F4] uppercase font-bold mb-1">Nominal Handshake</h4>
                    <p className="text-xs text-[#93A8A1] font-sans">Active directory synchronized via secure SAML endpoints.</p>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#00E5C3] shadow-[0_0_8px_rgba(0,229,195,0.6)] mt-4" />
                </div>

                <div className="bg-[#071311] border border-[#12302A] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#526661] uppercase tracking-widest block font-bold mb-2">TENANT ID</span>
                    <h4 className="font-mono text-sm text-[#00E5C3] font-bold">APEX-TEN-4589</h4>
                    <p className="text-xs text-[#93A8A1] font-sans">Sovereign partition hub isolating execution namespaces.</p>
                  </div>
                  <span className="text-[9px] font-mono text-[#526661] uppercase font-bold mt-4">Isolated sandbox ACTIVE</span>
                </div>

                <div className="md:col-span-2 bg-[#071311] border border-[#12302A] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#526661] uppercase tracking-widest block font-bold mb-2">COMPLIANCE STATS</span>
                    <div className="grid grid-cols-2 gap-4 mt-1 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#93A8A1] block font-sans">System Audits Pass</span>
                        <span className="text-[#00E5C3] font-bold text-sm">100%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#93A8A1] block font-sans">Active Safe Policies</span>
                        <span className="text-white font-bold text-sm">18 rules</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-[#526661] uppercase font-bold mt-4">HIPAA & SOC-2 Compliant bounds</span>
                </div>
              </div>

              {/* Audit history stream */}
              <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 shadow flex flex-col">
                <span className="text-[11px] font-mono text-[#93A8A1] uppercase tracking-widest block font-bold mb-3.5">SECURE SYSTEM AUDIT LEDGER</span>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#12302A] text-[#526661] uppercase text-[10px]">
                        <th className="py-2.5 px-3">Timestamp</th>
                        <th className="py-2.5 px-3">Authorized Actor</th>
                        <th className="py-2.5 px-3">RBAC Role</th>
                        <th className="py-2.5 px-3">Action Description</th>
                        <th className="py-2.5 px-3 text-right">Ingress Host IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#12302A]/40 text-[#93A8A1]">
                      {INITIAL_AUDITS.map((log, i) => (
                        <tr key={i} className="hover:bg-[#020B0A]/30">
                          <td className="py-3 px-3 scrollbar-hide shrink-0 whitespace-nowrap text-[11px]">{log.timestamp}</td>
                          <td className="py-3 px-3 font-semibold text-white">{log.actor}</td>
                          <td className="py-3 px-3">
                            <span className="px-1.5 py-0.5 rounded bg-[#12302A] text-[#00E5C3] text-[10px]">{log.role}</span>
                          </td>
                          <td className="py-3 px-3 font-sans text-xs text-white max-w-xs truncate">{log.action}</td>
                          <td className="py-3 px-3 text-right">{log.ip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* CREATE NEW MISSION MODAL DIALOG */}
      <AnimatePresence>
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#071311] border border-[#12302A] rounded-xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <h3 className="font-mono text-sm uppercase tracking-widest font-bold text-white border-b border-[#12302A] pb-3 mb-4">Instantiate New Mission</h3>
              
              <form onSubmit={handleCreateMission} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="font-mono text-[10px] uppercase text-[#526661] tracking-wide block mb-1.5 font-bold">Mission Title</label>
                  <input 
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Multi-threaded Anchor Validator"
                    className="w-full bg-[#020B0A] border border-[#12302A] rounded px-3 py-2 text-white outline-none focus:border-[#00E5C3]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase text-[#526661] tracking-wide block mb-1.5 font-bold">Description Brief</label>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe specific bounds, criteria, or target outputs..."
                    rows={3}
                    className="w-full bg-[#020B0A] border border-[#12302A] rounded px-3 py-2 text-white outline-none focus:border-[#00E5C3]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase text-[#526661] tracking-wide block mb-1.5 font-bold">Supervisor Enclave Allocation</label>
                  <select 
                    value={newSupervisor}
                    onChange={(e) => setNewSupervisor(e.target.value)}
                    className="w-full bg-[#020B0A] border border-[#12302A] rounded px-3 py-2 text-white outline-none focus:border-[#00E5C3] font-mono"
                  >
                    <option value="Engineering Supervisor">Engineering Supervisor</option>
                    <option value="Design Supervisor">Design Supervisor</option>
                    <option value="Product Supervisor">Product Supervisor</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#12302A]">
                  <button 
                    type="button"
                    onClick={() => setShowCreateDialog(false)}
                    className="px-4 py-2 border border-[#12302A] hover:border-[#93A8A1]/30 text-[#93A8A1] font-mono tracking-wider rounded uppercase text-[10px] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] font-mono tracking-wider rounded uppercase text-[10px] font-bold cursor-pointer hover:shadow-[0_0_12px_rgba(0,229,195,0.2)]"
                  >
                    Trigger Init
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
