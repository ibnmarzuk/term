import React from 'react';
import { cn } from '../lib/utils';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  status: 'Completed' | 'Failed' | 'Running';
  timestamp: string;
}

interface TaskRegistryProps {
  tasks: Task[];
}

export default function TaskRegistry({ tasks }: TaskRegistryProps) {
  return (
    <div className="space-y-3 p-6">
      <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">// PERSISTENT TASK REGISTRY</h2>
      {tasks.length === 0 ? (
        <div className="text-[10px] text-zinc-600 italic">No completed tasks.</div>
      ) : (
        <div className="space-y-2">
            {tasks.map(task => (
                <div key={task.id} className="bg-[#040C0A] border border-zinc-800 rounded-lg p-3 flex justify-between items-center text-xs">
                    <div className="flex items-center gap-3">
                        {task.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500"/> : <AlertTriangle className="w-4 h-4 text-red-500"/>}
                        <div>
                            <div className="font-bold text-zinc-200">{task.name}</div>
                            <div className="text-[9px] text-zinc-500">ID: {task.id}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <Clock className="w-3 h-3"/>
                        {task.timestamp}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
