import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-14 border-b border-outline-variant flex items-center justify-between px-6 bg-surface-dim/80 backdrop-blur-sm z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-md hover:bg-surface-container-high transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4 text-on-surface" />
        </button>
        <div className="flex items-center gap-4 text-xs shrink-0 w-64">
          <span className="text-outline">Current Stage:</span>
          <span className="flex items-center gap-2 text-secondary font-mono text-[10px] uppercase font-bold tracking-widest truncate">
            <span className="w-2 h-2 shrink-0 rounded-full bg-secondary animate-pulse"></span>
            ROUTING
          </span>
        </div>
      </div>
      
    </header>
  );
}
