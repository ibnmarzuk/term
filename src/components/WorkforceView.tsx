import React from 'react';
import { cn } from '../lib/utils';
import { UserCircle, Shield, Activity, DollarSign } from 'lucide-react';

interface Agent {
  name: string;
  department: 'Product' | 'Design' | 'Engineering' | 'Quality Assurance' | 'Operations' | 'Cybersecurity' | 'Council';
  role: string;
  status: 'ACTIVE' | 'WAITING' | 'BLOCKED' | 'FAILED' | 'COMPLETED' | 'IDLE';
  performance: {
    successRate: number;
    failureRate: number;
    qualityScore: number;
    latencyAvg: string;
    costPerTask: string;
  };
}

interface WorkforceViewProps {
  agents: Record<string, Agent>;
  compact?: boolean;
}

export default function WorkforceView({ agents, compact = false }: WorkforceViewProps) {
  const departments = Array.from(new Set(Object.values(agents).map(a => a.department)));

  return (
    <div className={cn("grid gap-6", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6")}>
      {departments.map(dept => (
        <div key={dept} className="bg-[#040C0A] border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">{dept}</h3>
            <div className="space-y-4">
              {Object.values(agents).filter(a => a.department === dept).map(agent => (
                <div key={agent.name} className="bg-zinc-950 border border-zinc-900 rounded-lg p-3 grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center">
                     <span className="font-bold text-sm text-zinc-200">{agent.name}</span>
                     <span className={cn(
                        "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                        agent.status === 'ACTIVE' ? 'bg-emerald-900 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                     )}>{agent.status}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500">{agent.role}</div>
                  {!compact && (
                    <div className="flex gap-4 pt-1 text-[9px] text-zinc-400">
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-[#00E5C3]"/> {agent.performance.successRate}%</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-amber-500"/> {agent.performance.costPerTask}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-cyan-500"/> {agent.performance.qualityScore}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
        </div>
      ))}
    </div>
  );
}
