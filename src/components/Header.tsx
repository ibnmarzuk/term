import { ArrowLeft, Bell, Hexagon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (location.pathname === '/command-center') {
      toast('Command Center Active', { description: 'You are at the root level.' });
      return;
    }
    
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/command-center');
    }
  };

  const handleNotifications = () => {
    toast('No new notifications', {
      description: 'All system parameters are optimal.',
      icon: <Bell className="w-4 h-4 text-[#00E5C3]" />
    });
  };

  return (
    <header className="h-14 border-b border-outline-variant flex items-center justify-between px-6 bg-surface-dim/80 backdrop-blur-sm z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={handleBack}
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
      
      <div className="flex items-center gap-4">
        <button 
          className="p-1.5 rounded-md hover:bg-surface-container-high transition-colors relative cursor-pointer"
          onClick={handleNotifications}
        >
          <Bell className="h-4 w-4 text-on-surface" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <div className="h-6 w-[1px] bg-outline-variant" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-sm bg-primary/20 border border-primary/40 flex items-center justify-center">
             <Hexagon className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase font-bold text-on-surface">SYS_ADMIN</span>
        </div>
      </div>
    </header>
  );
}
