import { createContext, useContext, useState, ReactNode, useRef } from 'react';

export type LogType = 'text' | 'code' | 'wireframe' | 'asset';

export interface TaskLog {
  timestamp: string;
  message: string;
  type?: LogType;
  payload?: string;
}

export interface LivePreviewState {
  taskId: string | null;
  status: string;
  progress: number;
  logs: TaskLog[];
  startTask: (id: string, status: string) => void;
  updateProgress: (progress: number, status: string) => void;
  addLog: (log: string, type?: LogType, payload?: string) => void;
  completeTask: () => void;
  simulateTask: (taskName: string) => void;
}

const LivePreviewContext = createContext<LivePreviewState | null>(null);

export function LivePreviewProvider({ children }: { children: ReactNode }) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Idle");
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<TaskLog[]>([]);
  
  const simulationRef = useRef<NodeJS.Timeout | null>(null);

  const startTask = (id: string, newStatus: string) => {
    if (simulationRef.current) clearInterval(simulationRef.current);
    setTaskId(id);
    setStatus(newStatus);
    setProgress(0);
    setLogs([{ timestamp: new Date().toLocaleTimeString(), message: "Initializing agent..." }]);
  };

  const updateProgress = (newProgress: number, newStatus: string) => {
    setProgress(newProgress);
    setStatus(newStatus);
  };

  const addLog = (message: string, type: LogType = 'text', payload?: string) => {
    setLogs((prev) => [...prev, { timestamp: new Date().toLocaleTimeString(), message, type, payload }]);
  };

  const completeTask = () => {
    if (simulationRef.current) clearInterval(simulationRef.current);
    setProgress(100);
    setStatus("Completed");
    addLog("Task successfully completed.");
    
    // Auto-clear after a few seconds
    setTimeout(() => {
      setTaskId(null);
    }, 5000);
  };

  const simulateTask = (taskName: string) => {
    startTask(`T-${Date.now().toString().slice(-4)}`, "Executing " + taskName);
    
    const mockSteps: { msg: string, type?: LogType, payload?: string }[] = [
      { msg: "Accessing secure registry...", type: 'text' },
      { msg: "Analyzing requirements...", type: 'text' },
      { msg: "Generating wireframe structure...", type: 'wireframe', payload: "Header | Nav | Hero Section | Features Grid | Footer" },
      { msg: "Building component layout...", type: 'code', payload: "export function App() {\n  return (\n    <main>\n      <h1>Core OS</h1>\n    </main>\n  );\n}" },
      { msg: "Synthesizing UI assets...", type: 'asset', payload: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
      { msg: "Compiling resources...", type: 'text' },
      { msg: "Deploying to staging environment...", type: 'text' }
    ];
    
    let currentStep = 0;
    
    simulationRef.current = setInterval(() => {
      if (currentStep < mockSteps.length) {
         const step = mockSteps[currentStep];
         addLog(step.msg, step.type, step.payload);
         updateProgress((currentStep / mockSteps.length) * 100, "Processing " + taskName);
         currentStep++;
      } else {
         completeTask();
      }
    }, 1500);
  };

  return (
    <LivePreviewContext.Provider value={{ taskId, status, progress, logs, startTask, updateProgress, addLog, completeTask, simulateTask }}>
      {children}
    </LivePreviewContext.Provider>
  );
}

export function useLivePreview() {
  const context = useContext(LivePreviewContext);
  if (!context) {
    throw new Error('useLivePreview must be used within a LivePreviewProvider');
  }
  return context;
}
