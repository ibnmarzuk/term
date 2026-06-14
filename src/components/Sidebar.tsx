import { NavLink } from 'react-router-dom';
import { Terminal, LayoutDashboard, Folder, Bot, BrainCircuit, Radar, HardDrive, Settings, Box, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  return (
    <aside className="w-60 h-full border-r border-outline-variant bg-surface-dim flex flex-col shrink-0 z-50">
      <div className="p-6 flex items-center gap-2">
        <div className="w-6 h-6 bg-on-surface rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-background"></div>
        </div>
        <span className="font-semibold tracking-tight text-lg uppercase">Apex OS</span>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        <div className="text-[10px] uppercase tracking-widest text-outline px-3 mb-2 font-bold mt-2">System</div>
        <NavLink to="/command-center" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
          <Terminal className="w-4 h-4" /> Command Center
        </NavLink>
        <NavLink to="/agents" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
          <Bot className="w-4 h-4" /> Workforce Center
        </NavLink>
        <NavLink to="/tracking-board" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
          <Activity className="w-4 h-4" /> Tracking Board
        </NavLink>
        <NavLink to="/workspace" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
          <Folder className="w-4 h-4" /> Project Workspace
        </NavLink>
        
        <div className="mt-8 text-[10px] uppercase tracking-widest text-outline px-3 mb-2 font-bold block">Execution</div>
        <NavLink to="/artifacts" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
          <Box className="w-4 h-4" /> Artifact Studio
        </NavLink>
        <NavLink to="/brain" className={({ isActive }) => cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
          isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        )}>
           <BrainCircuit className="w-4 h-4" /> Knowledge Graph
        </NavLink>
        <NavLink to="/radar" className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left",
            isActive ? "bg-surface-container-high text-on-surface border border-outline-variant" : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          )}>
            <Radar className="w-4 h-4" /> Opportunity Radar
        </NavLink>
      </nav>

      <div className="p-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate text-on-surface">Project Apollo</p>
            <p className="text-[10px] text-outline truncate">Execution Stable</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
