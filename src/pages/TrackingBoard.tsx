import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitCommit, AlertTriangle, CheckCircle2, Clock, Activity, Target, Shield, Zap, Search, Code, User, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '../components/Skeleton';
import { cn } from '../lib/utils';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDroppable } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLivePreview } from '../lib/LivePreviewContext';
import { useTerminal } from '../lib/TerminalContext';

interface TaskNode {
  id: string;
  name: string;
  agent: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'BLOCKED' | 'PENDING';
  x: number;
  y: number;
  timeEstimate?: string;
  bottleneck?: boolean;
}

const INITIAL_NODES: TaskNode[] = [
  { id: '1', name: 'Strategic Planning', agent: 'Agent LEO', status: 'COMPLETED', x: 10, y: 50 },
  { id: '2', name: 'Architecture Review', agent: 'System', status: 'COMPLETED', x: 30, y: 50 },
  { id: '3', name: 'Schema Design', agent: 'Agent DRACO', status: 'COMPLETED', x: 50, y: 30 },
  { id: '4', name: 'API Implementation', agent: 'Agent ORION', status: 'IN_PROGRESS', x: 50, y: 70, timeEstimate: 'Est. 12m' },
  { id: '5', name: 'Frontend Scaffolding', agent: 'Agent LYRA', status: 'PENDING', x: 70, y: 30 },
  { id: '6', name: 'Integration Testing', agent: 'Agent VEX', status: 'BLOCKED', x: 70, y: 70, bottleneck: true },
  { id: '7', name: 'Deployment Prep', agent: 'Agent LEO', status: 'PENDING', x: 90, y: 50 },
];

const SortableTaskItem: React.FC<{ node: TaskNode, isOverlay?: boolean }> = ({ node, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: node.id, data: node });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className={cn(
        "p-3 rounded-lg border cursor-grab active:cursor-grabbing flex flex-col gap-2 relative bg-surface-container-high transition-colors hover:border-outline-variant",
        isOverlay ? "shadow-2xl scale-105 border-primary/50 rotate-3 z-50" : "border-outline",
        node.status === 'COMPLETED' ? "border-secondary/30 bg-secondary/5" :
        node.status === 'IN_PROGRESS' ? "border-primary/30 bg-primary/5" :
        node.status === 'BLOCKED' ? "border-error/30 bg-error/5" : ""
      )}
    >
       <div className="flex justify-between items-start">
         <span className={cn("text-xs font-semibold", node.status === 'COMPLETED' ? "text-on-surface-variant line-through" : "text-on-surface")}>{node.name}</span>
         {node.timeEstimate && <span className="text-[9px] text-primary bg-primary/10 px-1 py-0.5 rounded">{node.timeEstimate}</span>}
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-mono mt-1">
         <User className="w-3 h-3" /> {node.agent}
      </div>
    </div>
  );
}

function KanbanColumn({ id, title, nodes }: { id: string, title: string, nodes: TaskNode[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className={cn("glass-card p-4 rounded-xl flex flex-col gap-3 min-h-[300px] border transition-colors", isOver ? "border-primary/50 bg-primary/5" : "border-transparent")}>
      <div className="flex items-center justify-between mb-2">
         <h4 className="text-xs font-bold uppercase tracking-wider text-outline">{title}</h4>
         <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">{nodes.length}</span>
      </div>
      <div ref={setNodeRef} className="flex-1 flex flex-col gap-2">
        <SortableContext items={nodes.map(n => n.id)} strategy={verticalListSortingStrategy}>
          {nodes.map(node => <SortableTaskItem key={node.id} node={node} />)}
        </SortableContext>
      </div>
    </div>
  );
}

export default function TrackingBoard() {
  const navigate = useNavigate();
  const { simulateTask } = useLivePreview();
  const { collapsed } = useTerminal();
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<TaskNode[]>(INITIAL_NODES);
  const [activeTask, setActiveTask] = useState<TaskNode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const edges = [
    ['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '6'], ['5', '7'], ['6', '7']
  ];

  const bottlenecks = [
    { id: 'b1', task: 'Integration Testing', reason: 'Waiting on API Implementation to clear schema validations.', agent: 'Agent VEX', severity: 'HIGH' },
    { id: 'b2', task: 'Resource Allocation', reason: 'High memory usage on Node 04 throttling build processes.', agent: 'System', severity: 'MEDIUM' }
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = nodes.find(n => n.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    // Dropped on a column
    let newStatus = over.id as TaskNode['status'];
    
    // If dropped on another item, find that item's status
    const overItem = nodes.find(n => n.id === over.id);
    if (overItem) {
      newStatus = overItem.status;
    }

    if (['PENDING', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED'].includes(newStatus as string)) {
      setNodes(prev => prev.map(node => node.id === active.id ? { ...node, status: newStatus } : node));
    }
  };

  return (
    <div className={cn("flex flex-col xl:flex-row gap-8 h-full p-8 overflow-y-auto relative transition-all duration-300", collapsed ? "pb-8" : "pb-64")}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25" style={{ backgroundImage: 'radial-gradient(var(--color-outline-variant) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="flex-1 flex flex-col gap-8 z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// WORKFLOW TELEMETRY</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            Tracking Board
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Monitor autonomous orchestrations, task states, resource metrics, and process blocks. Reorganize pipelines dynamically in real-time.
          </p>
        </div>

        {/* Workflow Graph View */}
        <div className="glass-panel p-6 border border-outline-variant rounded-xl flex flex-col gap-6 bg-surface-container relative min-h-[400px]">
          <div className="flex justify-between items-center z-20">
            <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold flex items-center gap-2">
               <GitCommit className="w-4 h-4" /> Live Execution Graph
            </h3>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] text-on-surface-variant uppercase"><div className="w-2 h-2 rounded-full bg-secondary"></div> Completed</span>
              <span className="flex items-center gap-1.5 text-[10px] text-on-surface-variant uppercase"><div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div> Running</span>
              <span className="flex items-center gap-1.5 text-[10px] text-on-surface-variant uppercase"><div className="w-2 h-2 rounded-full bg-error"></div> Blocked</span>
            </div>
          </div>
          
          <div className="flex-1 relative w-full mt-4">
             {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-4">
                      <Skeleton className="w-24 h-24 rounded-full" />
                      <Skeleton className="w-48 h-4" />
                   </div>
                </div>
             ) : (
                <>
                  {/* SVG Edges */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {edges.map(([a, b], idx) => {
                      const nodeA = nodes.find(n => n.id === a)!;
                      const nodeB = nodes.find(n => n.id === b)!;
                      return (
                        <motion.line
                          key={`edge-${idx}`}
                          x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
                          x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                          stroke="var(--color-outline-variant)"
                          strokeWidth="2"
                          strokeDasharray={nodeB.status === 'PENDING' ? '4 4' : '0'}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      );
                    })}
                  </svg>

                  {/* DOM Nodes */}
                  {nodes.map((node, i) => (
                    <motion.div
                      key={node.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group z-10"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: i * 0.1 }}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 relative",
                        node.status === 'COMPLETED' ? "bg-secondary/10 border-secondary text-secondary" :
                        node.status === 'IN_PROGRESS' ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]" :
                        node.status === 'BLOCKED' ? "bg-error/10 border-error text-error shadow-[0_0_20px_rgba(239,68,68,0.2)]" :
                        "bg-surface-container-high border-outline text-outline"
                      )}>
                        {node.status === 'COMPLETED' && <CheckCircle2 className="w-5 h-5" />}
                        {node.status === 'IN_PROGRESS' && <Activity className="w-5 h-5" />}
                        {node.status === 'BLOCKED' && <AlertTriangle className="w-5 h-5" />}
                        {node.status === 'PENDING' && <Clock className="w-5 h-5" />}
                      </div>
                      
                      <div className="absolute top-14 w-32 text-center pointer-events-none">
                         <p className="text-xs font-semibold text-on-surface truncate">{node.name}</p>
                         <p className="text-[10px] text-on-surface-variant font-mono mt-0.5">{node.agent}</p>
                         {node.timeEstimate && <p className="text-[9px] text-primary mt-1 label-caps">{node.timeEstimate}</p>}
                      </div>
                    </motion.div>
                  ))}
                </>
             )}
          </div>
        </div>

        {/* Workflow Stages Kanban Board */}
        <div>
           <div className="flex items-center gap-3 mb-6 mt-4">
              <Code className="w-5 h-5 text-on-surface" />
              <h3 className="text-sm font-bold tracking-wide uppercase text-on-surface">Workflow Stages</h3>
           </div>
           
           <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <KanbanColumn id="PENDING" title="Pending" nodes={nodes.filter(n => n.status === 'PENDING')} />
                 <KanbanColumn id="IN_PROGRESS" title="In Progress" nodes={nodes.filter(n => n.status === 'IN_PROGRESS')} />
                 <KanbanColumn id="BLOCKED" title="Blocked" nodes={nodes.filter(n => n.status === 'BLOCKED')} />
                 <KanbanColumn id="COMPLETED" title="Completed" nodes={nodes.filter(n => n.status === 'COMPLETED')} />
              </div>
              <DragOverlay>
                 {activeTask ? <SortableTaskItem node={activeTask} isOverlay /> : null}
              </DragOverlay>
           </DndContext>
        </div>
      </div>

      <div className="w-full xl:w-96 flex flex-col gap-6 z-10 shrink-0">
         <div className="glass-panel p-6 border border-outline-variant rounded-xl flex-1 flex flex-col bg-surface-container shadow-2xl">
            <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold mb-6 flex items-center justify-between">
              Bottleneck Analysis
              <span className="bg-error/10 text-error px-2 py-0.5 rounded flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {bottlenecks.length} Blockers</span>
            </h3>

            <div className="flex-1 space-y-4">
               {loading ? (
                  Array(2).fill(0).map((_, i) => (
                     <div key={i} className="p-4 rounded-lg border border-outline-variant bg-surface-container-high space-y-3">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />
                     </div>
                  ))
               ) : (
                  bottlenecks.map(b => (
                     <div key={b.id} className="p-4 rounded-lg border border-error/50 bg-error/5 cursor-pointer hover:bg-error/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-sm font-bold text-on-surface flex items-center gap-2">
                              {b.task}
                           </h4>
                           <span className={cn(
                              "text-[9px] uppercase font-bold px-1.5 py-0.5 rounded",
                              b.severity === 'HIGH' ? "bg-error/20 text-error border border-error/30" : "bg-tertiary/20 text-tertiary border border-tertiary/30"
                           )}>
                              P1_Critical
                           </span>
                        </div>
                        <p className="text-xs text-outline mb-3">{b.reason}</p>
                        <div className="flex items-center justify-between border-t border-error/10 pt-3">
                           <span className="text-[10px] text-on-surface-variant font-mono">Owner: {b.agent}</span>
                           <button onClick={() => simulateTask('Intervene: ' + b.agent)} className="text-[10px] cursor-pointer bg-background text-on-surface px-2 py-1 rounded border border-outline-variant hover:border-error transition-colors active:scale-95">Intervene</button>
                        </div>
                     </div>
                  ))
               )}
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant">
               <h3 className="text-[10px] uppercase tracking-widest text-outline font-bold mb-4">Execution Velocity</h3>
               <div className="flex items-end gap-2 h-16">
                 {[40, 60, 55, 80, 45, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 bg-surface-container-highest rounded-t group relative">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         transition={{ duration: 1, delay: i * 0.1 }}
                         className="absolute bottom-0 w-full bg-primary/40 group-hover:bg-primary transition-colors rounded-t"
                       />
                    </div>
                 ))}
               </div>
               <div className="flex justify-between mt-2 text-[10px] text-outline font-mono">
                 <span>-7h</span>
                 <span>Now</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
