import { Activity } from 'lucide-react';
import { useLivePreview } from '../lib/LivePreviewContext';
import { Settings } from 'lucide-react';

export default function ExecutionLivePreview() {
  const { taskId, status, progress, logs } = useLivePreview();

  return (
    <aside className="w-80 h-full border-l border-[#27272a] bg-[#050505] flex flex-col shrink-0 z-40 p-4 font-mono text-xs">
      <div className="flex items-center gap-2 mb-4 text-[#00e59b]">
        <Activity className="w-4 h-4" />
        <span className="font-bold tracking-wider uppercase">Live Preview</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 text-[#a1a1aa] pr-1">
        
        {taskId ? (
          <>
            <div className="p-3 bg-[#18181b] rounded-md border border-[#27272a]">
              <div className="text-white mb-2 truncate">Task {taskId} - {status}</div>
              <div className="w-full h-1.5 bg-[#27272a] rounded overflow-hidden">
                <div 
                  className="h-full bg-[#00e59b] transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="text-xs space-y-3">
              {logs.map((log, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex gap-2">
                    <span className="text-[#71717a] shrink-0">[{log.timestamp}]</span>
                    <span className="text-wrap break-words">{log.message}</span>
                  </div>
                  {log.type === 'code' && log.payload && (
                    <div className="mt-1 bg-[#09090b] border border-[#27272a] p-2 rounded text-[#00e59b] font-mono text-[10px] overflow-x-auto whitespace-pre">
                      {log.payload}
                    </div>
                  )}
                  {log.type === 'wireframe' && log.payload && (
                    <div className="mt-1 bg-[#18181b] border border-[#27272a] border-dashed p-3 rounded flex items-center justify-center text-center opacity-80">
                      <span className="text-[#a1a1aa] uppercase tracking-widest text-[9px]">{log.payload}</span>
                    </div>
                  )}
                  {log.type === 'asset' && log.payload && (
                    <div className="mt-1 rounded overflow-hidden border border-[#27272a]">
                      <img src={log.payload} alt="Generated asset" className="w-full h-auto object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-[#71717a] h-full space-y-3">
             <Settings className="w-8 h-8 animate-spin-slow opacity-20" />
             <p>No active execution streams. Start a task to display live output.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
