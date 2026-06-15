import { NavLink } from 'react-router-dom';
import { Terminal, LayoutDashboard, Folder, Bot, BrainCircuit, Radar, HardDrive, Settings, Box, Activity, Zap, Plus, Search, Cpu, Workflow, Database } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  
  return (
    <aside className="w-60 h-full border-r border-[#27272a] bg-[#050505] flex flex-col shrink-0 z-50">
      {/* Header */}
      <div className="p-5 flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-[#00e59b] rounded-sm flex items-center justify-center">
          <Zap className="w-4 h-4 text-black fill-black" />
        </div>
        <span className="font-bold tracking-tight text-[17px] text-white">APEX<span className="font-medium text-[#00e59b]">OS</span></span>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        {/* New Execution Action */}
        <NavLink to="/command-center" className="flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] text-[#00e59b] hover:bg-[#00e59b]/10 transition-colors w-full text-left font-medium mb-4">
          <Plus className="w-4 h-4" /> New Execution
        </NavLink>

        <NavLink to="/command-center" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Terminal className="w-4 h-4 shrink-0 text-[#00e59b]" /> APEX Terminal
        </NavLink>
        <NavLink to="/workspace" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Folder className="w-4 h-4 shrink-0" /> Projects
        </NavLink>
        <NavLink to="/agents" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Bot className="w-4 h-4 shrink-0" /> Agents
        </NavLink>
        <NavLink to="/mission-engine" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Workflow className="w-4 h-4 shrink-0" /> Mission Engine
        </NavLink>
        <NavLink to="/workflow-studio" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Cpu className="w-4 h-4 shrink-0" /> Workflow Studio
        </NavLink>
        <NavLink to="/tracking-board" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
          <Cpu className="w-4 h-4 shrink-0" /> Copilot
        </NavLink>
        
        <NavLink to="/brain" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
          isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
        )}>
           <Database className="w-4 h-4 shrink-0" /> Memory
        </NavLink>
        
        <div className="pt-4">
          <NavLink to="/artifacts" className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] transition-colors w-full text-left",
            isActive ? "bg-[#27272a]/50 text-white" : "text-[#a1a1aa] hover:bg-[#27272a]/30 hover:text-white"
          )}>
            <Settings className="w-4 h-4 shrink-0" /> Settings
          </NavLink>
        </div>

        {/* Section divider */}
        <div className="mt-8 mb-2 px-4">
          <div className="text-[9px] uppercase tracking-widest text-[#52525b] font-bold">
            // PROJECTS
          </div>
        </div>
        
      </nav>

      {/* User profile section */}
      <div className="p-4 border-t border-[#27272a]">
        <div className="flex flex-col gap-1 px-2">
          <p className="text-[12px] truncate text-[#a1a1aa]">{user || "user@apex.os"}</p>
          <button 
            onClick={() => logout()}
            className="text-[12px] text-white hover:text-[#00e59b] transition-colors text-left flex items-center gap-2"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
}
