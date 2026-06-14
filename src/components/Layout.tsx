import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Terminal from './Terminal';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#000000] text-on-background font-sans select-none">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-hidden bg-[#050505]">
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
        <Terminal />
      </div>
    </div>
  );
}
