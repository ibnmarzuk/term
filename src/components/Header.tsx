import { Share, Bot, Search, Command } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-14 border-b border-outline-variant flex items-center justify-between px-6 bg-surface-dim/80 backdrop-blur-sm z-10 shrink-0">
      <div className="flex items-center gap-4 text-xs shrink-0 w-64">
        <span className="text-outline">Current Stage:</span>
        <span className="flex items-center gap-2 text-secondary font-mono text-[10px] uppercase font-bold tracking-widest truncate">
          <span className="w-2 h-2 shrink-0 rounded-full bg-secondary animate-pulse"></span>
          ROUTING
        </span>
      </div>
      
      <div className="flex-1 max-w-xl mx-4 relative hidden sm:block">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-on-surface-variant" />
        </div>
        <input 
          type="text" 
          placeholder="Search agents, workflows, or logs..." 
          className="w-full bg-surface-container border border-outline-variant rounded-md py-1.5 pl-9 pr-12 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
          <kbd className="hidden sm:inline-flex items-center gap-1 bg-surface-container-high border border-outline-variant rounded px-1.5 text-[9px] font-mono text-outline font-medium">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0 w-64 justify-end">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full border border-background bg-primary/20 flex items-center justify-center text-[8px] text-primary font-bold z-30">L</div>
          <div className="w-6 h-6 rounded-full border border-background bg-secondary/20 flex items-center justify-center text-[8px] text-secondary font-bold z-20">O</div>
          <div className="w-6 h-6 rounded-full border border-background bg-tertiary/20 flex items-center justify-center text-[8px] text-tertiary font-bold z-10">L</div>
        </div>
        <button className="text-[11px] font-medium border border-outline-variant px-3 py-1 rounded-md hover:bg-surface-container-high active:scale-95 transition-all text-on-surface">Share</button>
      </div>
    </header>
  );
}
