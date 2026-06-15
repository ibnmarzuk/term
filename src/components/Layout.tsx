import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Terminal from './Terminal';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isCommandCenter = location.pathname === '/command-center';

  return (
    <div className="flex h-screen overflow-hidden bg-[#000000] text-on-background font-sans select-none">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-hidden bg-[#050505]">
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
        {!isCommandCenter && <Terminal />}
      </div>
    </div>
  );
}
