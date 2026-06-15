import React from 'react';
import { cn } from '../lib/utils';
import { Github, Server, Database, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface MCPConnection {
  name: string;
  status: 'READY' | 'DORMANT' | 'ERROR';
  lastChecked: string;
}

interface MCPConnectionsProps {
  connections: Record<string, MCPConnection>;
  onToggle: (name: string) => void;
}

export default function MCPConnections({ connections, onToggle }: MCPConnectionsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'GitHub': return <Github className="w-5 h-5" />;
      case 'Vercel': return <Server className="w-5 h-5" />;
      case 'Supabase': return <Database className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-3 p-6">
      <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">// MCP INTEGRATION CONNECTIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(connections).map(([name, conn]) => (
          <div key={name} className="bg-[#040C0A] border border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-40">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-zinc-900 rounded-lg text-zinc-300">
                    {getIcon(name)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{name}</h3>
                  <div className={cn("text-[10px] font-bold uppercase", conn.status === 'READY' ? 'text-emerald-500' : 'text-zinc-500')}>{conn.status}</div>
                </div>
            </div>
            
            <div className="text-[10px] text-zinc-500 mb-4">Last checked: {conn.lastChecked}</div>
            
            <button 
              onClick={() => onToggle(name)}
              className={cn(
                "w-full py-2 rounded text-[10px] uppercase font-bold transition-all flex items-center justify-center gap-1.5",
                conn.status === 'READY' ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300" : "bg-[#00E5C3] text-black hover:bg-[#00cfa1]"
              )}
            >
              <RefreshCw className="w-3 h-3"/>
              {conn.status === 'READY' ? 'Deactivate' : 'Activate Connection'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
