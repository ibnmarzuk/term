import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Clock, CheckCircle2, AlertTriangle, Eye, X } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  status: 'Completed' | 'Failed' | 'Running';
  timestamp: string;
  logs?: any[];
  cost?: any;
}

interface TaskRegistryProps {
  tasks: Task[];
  onSelectTask?: (taskId: string) => void;
}

export default function TaskRegistry({ tasks, onSelectTask }: TaskRegistryProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTask(null);
  };

  return (
    <div className="space-y-3 p-6">
      <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">// PERSISTENT TASK REGISTRY</h2>
      {tasks.length === 0 ? (
        <div className="text-[10px] text-zinc-600 italic">No completed tasks.</div>
      ) : (
        <div className="space-y-2">
            {tasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => handleTaskClick(task)}
                  className="bg-[#040C0A] hover:bg-[#071512] transition-colors border border-zinc-800 hover:border-[#00E5C3]/30 rounded-lg p-3 flex justify-between items-center text-xs cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        {task.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500"/> : <AlertTriangle className="w-4 h-4 text-red-500"/>}
                        <div>
                            <div className="font-bold text-zinc-200 group-hover:text-[#00E5C3] transition-colors">{task.name}</div>
                            <div className="text-[9px] text-zinc-500">ID: {task.id}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                            <Clock className="w-3 h-3"/>
                            {task.timestamp}
                        </div>
                        <button className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#00E5C3]">
                            <Eye className="w-3 h-3" /> View
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#05110F] border border-[#00E5C3]/30 rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="px-6 py-5 border-b border-[#00E5C3]/10 flex items-center justify-between bg-[#020B0A]">
              <div>
                <h3 className="text-[#F2F5F4] font-bold text-lg">{selectedTask.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-[10px] uppercase tracking-widest text-[#93A8A1]">
                  <span>{selectedTask.id}</span>
                  <span>•</span>
                  <span>{selectedTask.timestamp}</span>
                  <span>•</span>
                  <span className={selectedTask.status === 'Completed' ? 'text-emerald-500' : 'text-red-500'}>
                    {selectedTask.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 bg-transparent hover:bg-white/5 rounded text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#00E5C3] mb-3">Task Output Summary</h4>
                <div className="bg-[#020B0A] border border-[#12302A] rounded p-4 text-xs text-[#F2F5F4] leading-relaxed">
                  {selectedTask.logs && selectedTask.logs.length > 0 ? (
                    <div>
                      {selectedTask.logs.filter((l: any) => l.type === 'VALIDATION' || l.type === 'COMPLETE').map((l: any, i: number) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <span className="text-[#00E5C3]">{l.actor}:</span> {l.message}
                        </div>
                      ))}
                      {selectedTask.logs.filter((l: any) => l.type === 'VALIDATION' || l.type === 'COMPLETE').length === 0 && (
                        <div className="text-zinc-500 italic">Task completed successfully.</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-zinc-500 italic">No output data available for this task.</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[#00E5C3] mb-3">Execution Log</h4>
                <div className="bg-[#020B0A] border border-[#12302A] rounded p-4 space-y-2">
                  {selectedTask.logs?.map((log: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-[10px]">
                      <span className="text-zinc-600 shrink-0">{log.timestamp}</span>
                      <span className={cn(
                        "shrink-0 font-bold",
                        log.type === 'SYSTEM' ? "text-blue-400" :
                        log.type === 'COUNCIL_VOTE' ? "text-purple-400" :
                        log.type === 'COMPLETE' ? "text-emerald-400" :
                        "text-[#00E5C3]"
                      )}>
                        [{log.actor}]
                      </span>
                      <span className="text-zinc-300 break-all">{log.message}</span>
                    </div>
                  ))}
                  {(!selectedTask.logs || selectedTask.logs.length === 0) && (
                    <div className="text-zinc-600 italic">No logs recorded.</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-[#00E5C3]/10 bg-[#020B0A] flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 border border-[#12302A] hover:bg-[#12302A] rounded font-mono text-xs uppercase tracking-wider text-[#93A8A1] transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
