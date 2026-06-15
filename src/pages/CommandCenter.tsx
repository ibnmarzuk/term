import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RotateCcw, Sliders, Shield, Zap,
  Cpu, Terminal as TerminalIcon, Search, ZoomIn, ZoomOut, Maximize2, Minimize2,
  Activity, Server, Database, Layers, CheckCircle2, AlertTriangle, RefreshCw, Star, ArrowRight, Lock, HelpCircle, DollarSign, Clock, Check
} from 'lucide-react';
import { cn } from '../lib/utils';
import WorkforceView from '../components/WorkforceView';
import TaskRegistry from '../components/TaskRegistry';
import MCPConnections from '../components/MCPConnections';
import { useLivePreview } from '../lib/LivePreviewContext';

// Agent Specification Interface
interface Agent {
  name: string;
  department: 'Product' | 'Design' | 'Engineering' | 'Quality Assurance' | 'Operations' | 'Cybersecurity' | 'Council';
  role: string;
  status: 'ACTIVE' | 'WAITING' | 'BLOCKED' | 'FAILED' | 'COMPLETED' | 'IDLE';
  capabilities: string[];
  skills: string[];
  tools: string[];
  memory: string[];
  performance: {
    successRate: number;
    failureRate: number;
    qualityScore: number;
    latencyAvg: string;
    costPerTask: string;
  };
}

// Supervisor Interface
interface Supervisor {
  name: string;
  department: string;
  agentCount: number;
  status: 'NOMINAL' | 'OCCUPIED' | 'STANDBY';
}

// Simulated Execution Log Line Interface
interface ExecutionEvent {
  id: string;
  timestamp: string;
  stepIndex: number;
  type: 'SYSTEM' | 'ROUTER_INTEL' | 'COUNCIL_VOTE' | 'SUPERVISOR' | 'AGENT_STATE' | 'HANDOFF' | 'INTEGRATION' | 'VALIDATION' | 'COMPLETE' | 'FAILURE' | 'RETRY';
  actor: string;
  status: 'INFO' | 'RUNNING' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
  costEstimate?: {
    llm: number;
    tool: number;
    compute: number;
  };
  details?: {
    confidence?: number;
    suggestedNextAgent?: string;
    requiredNextSkill?: string;
    taskResult?: string;
    planSteps?: string[];
    selectionReason?: string;
  };
}

// Specialized Agents Matrix
const AGENTS_DATABASE: Record<string, Agent> = {
  "Product Manager": {
    name: "Product Manager",
    department: "Product",
    role: "Strategist",
    status: 'IDLE',
    capabilities: ["PRD Writing", "Structural Assesment", "User Flow Mapping"],
    skills: ["Product Strategy", "User Persona Research", "Requirement Schema Analysis"],
    tools: ["Markdown Schema Spec", "Figma Workspace Sync", "Google Sheets API"],
    memory: ["Past SaaS PRDs", "Compliance templates", "Standard pricing workflow structures"],
    performance: { successRate: 98.8, failureRate: 1.2, qualityScore: 98, latencyAvg: "2.1s", costPerTask: "$0.02" }
  },
  "UI/UX Designer": {
    name: "UI/UX Designer",
    department: "Design",
    role: "Layout Architect",
    status: 'IDLE',
    capabilities: ["UI Design", "Figma Design", "Typography Pairing"],
    skills: ["Build Interface Layouts", "Create Interactive Mockups", "Visual Hierarchy Design"],
    tools: ["Figma Design", "Typography Theme Parser", "CSS Layout Engine"],
    memory: ["Past design components", "Inter and Space Grotesk layout tokens", "Tailwind styling presets"],
    performance: { successRate: 97.4, failureRate: 2.6, qualityScore: 97, latencyAvg: "3.5s", costPerTask: "$0.04" }
  },
  "Frontend Engineer": {
    name: "Frontend Engineer",
    department: "Engineering",
    role: "Component Builder",
    status: 'IDLE',
    capabilities: ["React", "Tailwind CSS", "TypeScript", "UI Implementation"],
    skills: ["Build Interface", "Create Components", "Fix Frontend Bugs", "Performance Profiling"],
    tools: ["Vite Compiler", "npm Utility", "Tailwind CSS Pipeline Engine"],
    memory: ["Previous UI builds", "Reusable React component maps", "Asset import resolution techniques"],
    performance: { successRate: 99.1, failureRate: 0.9, qualityScore: 99, latencyAvg: "3.2s", costPerTask: "$0.05" }
  },
  "Backend Engineer": {
    name: "Backend Engineer",
    department: "Engineering",
    role: "API Integrator",
    status: 'IDLE',
    capabilities: ["Node.js", "Express", "API Integration", "Database Schema Design"],
    skills: ["API Routing Setup", "Relational Database client connections", "Express proxy configuration"],
    tools: ["TypeScript tsx compiler", "REST API generators", "SQL builders"],
    memory: ["Previous SQL endpoints", "JWT secure structures", "Express dev-server integrations"],
    performance: { successRate: 98.2, failureRate: 1.8, qualityScore: 98, latencyAvg: "2.9s", costPerTask: "$0.04" }
  },
  "QA Engineer": {
    name: "QA Engineer",
    department: "Quality Assurance",
    role: "Code Verifier",
    status: 'IDLE',
    capabilities: ["Unit Testing", "Boundary Audits", "Fuzz Testing", "Integration Testing"],
    skills: ["Verify Codebase validity", "TypeScript compiler check", "Linter compliance verification"],
    tools: ["Node.js Ast Parser linter", "Jest/Vitest Frameworks"],
    memory: ["Known code exceptions", "Standard strict tsconfig rules", "Responsive element guidelines"],
    performance: { successRate: 99.7, failureRate: 0.3, qualityScore: 100, latencyAvg: "1.8s", costPerTask: "$0.01" }
  },
  "DevOps Engineer": {
    name: "DevOps Engineer",
    department: "Engineering",
    role: "Deployment Specialist",
    status: 'IDLE',
    capabilities: ["Cloud Hosting Setup", "CI/CD Automations", "Resource Provisioner"],
    skills: ["Production Bundling", "Build optimizations", "Port mappings (port 3000 mapping)"],
    tools: ["esbuild packagers", "Vercel integration flow API", "Docker virtualization tools"],
    memory: ["Server-side Node cold starts", "Nginx proxy rulesets", "Route redirect fallbacks"],
    performance: { successRate: 98.5, failureRate: 1.5, qualityScore: 98, latencyAvg: "2.4s", costPerTask: "$0.03" }
  },
  "Technical Writer": {
    name: "Technical Writer",
    department: "Operations",
    role: "Documentation Specialist",
    status: 'IDLE',
    capabilities: ["Documentation", "APIs README", "User Guides formulation"],
    skills: ["Architectural documentation", "API specifications", "Quickstart guides"],
    tools: ["Markdown formatters", "Typedocs API documentation generator"],
    memory: ["Technical glossary", "Standard git releases patterns", "Product specification sheets"],
    performance: { successRate: 96.4, failureRate: 3.6, qualityScore: 96, latencyAvg: "1.2s", costPerTask: "$0.01" }
  }
};

const TEAM_ROSTER = [
  "Product Manager",
  "UI/UX Designer",
  "Frontend Engineer",
  "Backend Engineer",
  "QA Engineer",
  "DevOps Engineer",
  "Technical Writer"
];

const COUNCIL_MEMBERS = [
  { name: "Strategy Agent", role: "Long-horizon goals alignment" },
  { name: "Risk Agent", role: "Safety boundary & API leak prevention" },
  { name: "Product Agent", role: "Market fit & PRD scope checker" },
  { name: "Architecture Agent", role: "Standard modular system design validation" },
  { name: "Operations Agent", role: "Compute capacity & server load" },
  { name: "Finance Agent", role: "LLM token balance & compute budget management" }
];

const SUPERVISORS: Supervisor[] = [
  { name: "Product Supervisor", department: "Product", agentCount: 1, status: "STANDBY" },
  { name: "Design Supervisor", department: "Design", agentCount: 1, status: "STANDBY" },
  { name: "Engineering Supervisor", department: "Engineering", agentCount: 4, status: "STANDBY" },
  { name: "Operations Supervisor", department: "Operations", agentCount: 1, status: "STANDBY" }
];

export default function CommandCenter() {
  const { startTask, updateProgress, addLog, completeTask } = useLivePreview();
  const [inputText, setInputText] = useState('');
  const [currentMissionStatus, setCurrentMissionStatus] = useState<'DRAFT' | 'PLANNED' | 'APPROVED' | 'RUNNING' | 'COMPLETED'>('DRAFT');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [timelineLogs, setTimelineLogs] = useState<ExecutionEvent[]>([]);
  
  // Dock height control
  const [dockHeight, setDockHeight] = useState(250);
  const [isDockExpanded, setIsDockExpanded] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2 | 5>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logFilter, setLogFilter] = useState<'ALL' | 'SYSTEM' | 'AGENT' | 'COUNCIL' | 'INTEGRATION'>('ALL');
  
  // Selection
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [viewMode, setViewMode] = useState<'MISSION' | 'WORKFORCE' | 'REGISTRY' | 'CONNECTIONS'>('MISSION');
  const [completedTasks, setCompletedTasks] = useState<{id: string; name: string; status: 'Completed' | 'Failed'; timestamp: string}[]>([]);
  const [connections, setConnections] = useState<Record<string, {name: string, status: 'READY' | 'DORMANT' | 'ERROR', lastChecked: string}>>({
    'GitHub': { name: 'GitHub', status: 'READY', lastChecked: 'Just now' },
    'Vercel': { name: 'Vercel', status: 'READY', lastChecked: 'Just now' },
    'Supabase': { name: 'Supabase', status: 'DORMANT', lastChecked: '1h ago' }
  });

  const toggleConnection = (name: string) => {
    setConnections(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        status: prev[name].status === 'READY' ? 'DORMANT' : 'READY',
        lastChecked: 'Just now'
      }
    }));
  };
  
  // Voting management
  const [isVoting, setIsVoting] = useState(false);
  const [councilVotes, setCouncilVotes] = useState<Record<string, boolean | null>>({});

  // Council mission queue
  interface QueuedMission {
    id: string;
    name: string;
    risk: 'Low' | 'High';
    status: 'Pending' | 'Approved';
  }
  const [missionQueue, setMissionQueue] = useState<QueuedMission[]>([]);

  // Simple risk assessment
  const assessRisk = (task: string): 'Low' | 'High' => {
    const highRiskKeywords = ['ai', 'arbitrage', 'proxy', 'auth', 'database'];
    return highRiskKeywords.some(keyword => task.toLowerCase().includes(keyword)) ? 'High' : 'Low';
  };

  // Dom references
  const isResizingRef = useRef(false);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  // Stats
  const [stats, setStats] = useState({
    cpuLoad: "4%",
    memoryUsage: "28.4 MB",
    systemLatency: "11ms"
  });

  // System status report on boot
  useEffect(() => {
    if (timelineLogs.length === 0) {
      setTimelineLogs([{
        id: 'init-cap-report',
        timestamp: getFormattedTime(),
        stepIndex: 0,
        type: 'SYSTEM',
        actor: 'Kernel Sentry',
        status: 'INFO',
        message: "Run a simulation or select a design template to initiate the Router Engine task allocation process. No agent compiles autonomously."
      }]);
    }
  }, []);

  // Calculate live dynamic costs based on the active step
  const getDynamicCost = () => {
    let llm = 0.0;
    let tool = 0.0;
    let compute = 0.0;

    const limit = Math.min(activeStepIndex, timelineLogs.length - 1);
    for (let i = 0; i <= limit; i++) {
      const e = timelineLogs[i];
      if (e?.costEstimate) {
        llm += e.costEstimate.llm;
        tool += e.costEstimate.tool;
        compute += e.costEstimate.compute;
      }
    }

    return {
      llm: Number(llm.toFixed(4)),
      tool: Number(tool.toFixed(4)),
      compute: Number(compute.toFixed(4)),
      total: Number((llm + tool + compute).toFixed(4))
    };
  };

  const currentCost = getDynamicCost();

  // Status computation for every agent in the roster at the current step index
  const getAgentStatus = (agentName: string): 'ACTIVE' | 'WAITING' | 'BLOCKED' | 'FAILED' | 'COMPLETED' | 'IDLE' => {
    if (!isExecuting || timelineLogs.length === 0) return 'IDLE';
    const activeEvent = timelineLogs[activeStepIndex];
    if (!activeEvent) return 'IDLE';

    // Helper logic to find the state
    const currentActor = activeEvent.actor;
    const currentStep = activeEvent.stepIndex;

    // Mapping steps to agent lifetimes
    // Product Manager acts on stepIndex 5 (Active) and completes on handoff (stepIndex 6)
    if (agentName === "Product Manager") {
      if (currentStep === 5) return 'ACTIVE';
      if (currentStep >= 6) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 5) return 'WAITING';
      return 'IDLE';
    }

    // UI/UX Designer: Step 8 (Active), Step >= 9 (Completed)
    if (agentName === "UI/UX Designer") {
      if (currentStep === 8) return 'ACTIVE';
      if (currentStep >= 9) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 8) return 'WAITING';
      return 'IDLE';
    }

    // Frontend Engineer: Step 11 is Active, Step 12 is Failed, Step 13 is Active (Retry), Step >= 14 is Completed
    if (agentName === "Frontend Engineer") {
      if (currentStep === 11 || currentStep === 13) return 'ACTIVE';
      if (currentStep === 12) return 'FAILED';
      if (currentStep >= 14) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 11) return 'WAITING';
      return 'IDLE';
    }

    // Backend Engineer: Step 16 is Active, Step 17 is Active, Step >= 18 is Completed
    if (agentName === "Backend Engineer") {
      if (currentStep === 16 || currentStep === 17) return 'ACTIVE';
      if (currentStep >= 18) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 16) return 'WAITING';
      return 'IDLE';
    }

    // QA Engineer: Step 20 is Active, Step >= 21 is Completed
    if (agentName === "QA Engineer") {
      if (currentStep === 20 || currentStep === 21) return 'ACTIVE';
      if (currentStep >= 21) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 20) return 'WAITING';
      return 'IDLE';
    }

    // DevOps Engineer: Step 23 is Active (Vercel MCP integration), Step >= 24 is Completed
    if (agentName === "DevOps Engineer") {
      if (currentStep === 23) return 'ACTIVE';
      if (currentStep >= 24) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 23) return 'WAITING';
      return 'IDLE';
    }

    // Technical Writer: Step 22 is Active, Step >= 23 is Completed
    if (agentName === "Technical Writer") {
      if (currentStep === 22) return 'ACTIVE';
      if (currentStep >= 23) return 'COMPLETED';
      if (currentStep > 0 && currentStep < 22) return 'WAITING';
      return 'IDLE';
    }

    return 'IDLE';
  };

  // Council votes computed state based on the current execution index
  const getCouncilVoteStatus = (memberName: string): 'PENDING' | 'VOTING' | 'APPROVED' => {
    if (!isExecuting || timelineLogs.length === 0) return 'PENDING';
    const activeEvent = timelineLogs[activeStepIndex];
    if (!activeEvent) return 'PENDING';

    const currentStep = activeEvent.stepIndex;
    
    // Step 2 is the Council voting sequence
    if (currentStep < 2) return 'PENDING';
    if (currentStep === 2) {
      // Stagger votes as progress goes on step index or sub-sequence
      // We'll simulate voting state
      return 'VOTING';
    }
    return 'APPROVED';
  };

  // Live metric adjustments
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isExecuting && isPlaying) {
      interval = setInterval(() => {
        setStats({
          cpuLoad: `${58 + Math.floor(Math.random() * 24)}%`,
          memoryUsage: `${64.2 + (Math.random() * 8).toFixed(1)} MB`,
          systemLatency: `${22 + Math.floor(Math.random() * 12)}ms`
        });
      }, 900);
    } else {
      setStats({
        cpuLoad: "3%",
        memoryUsage: "27.1 MB",
        systemLatency: "9ms"
      });
    }
    return () => clearInterval(interval);
  }, [isExecuting, isPlaying]);

  // Handle Drag splitter
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const offset = window.innerHeight - e.clientY;
    if (offset >= 100 && offset <= window.innerHeight - 150) {
      setDockHeight(offset);
    }
  };

  const handleDragEnd = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const getFormattedTime = (secondsOffset: number = 0) => {
    const d = new Date();
    d.setSeconds(d.getSeconds() + secondsOffset);
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}:${String(d.getUTCSeconds()).padStart(2, '0')}`;
  };

  // High Precision Simulation Sequence aligned with steps 1 to 24 rules
  const generateSequence = (taskName: string): ExecutionEvent[] => {
    const rawEvents: Omit<ExecutionEvent, 'id' | 'timestamp'>[] = [
      {
        stepIndex: 1,
        type: 'SYSTEM',
        actor: 'Kernel Sentry',
        status: 'INFO',
        message: `Task registration submitted: "${taskName}". Instantiating APEX Operating System memory pools.`,
        costEstimate: { llm: 0.0001, tool: 0.0000, compute: 0.0002 }
      },
      {
        stepIndex: 2,
        type: 'COUNCIL_VOTE',
        actor: 'Council Strategy Board',
        status: 'RUNNING',
        message: "High-Horizon Council vote requested. Strategy, Risk, Product, Architecture, Operations, and Finance agents analyzing alignment...",
        costEstimate: { llm: 0.0012, tool: 0.0000, compute: 0.0005 }
      },
      {
        stepIndex: 3,
        type: 'COUNCIL_VOTE',
        actor: 'Kernel Sentry',
        status: 'SUCCESS',
        message: "Strategy Council check passed: 6/6 Affirmative votes recorded. Allocation cleared.",
        costEstimate: { llm: 0.0004, tool: 0.0000, compute: 0.0001 }
      },
      {
        stepIndex: 4,
        type: 'ROUTER_INTEL',
        actor: 'Router Decision Engine',
        status: 'RUNNING',
        message: "Evaluating intent complexity, risk level, specific skills, and mapping operational dependencies.",
        costEstimate: { llm: 0.0018, tool: 0.0000, compute: 0.0004 }
      },
      {
        stepIndex: 5,
        type: 'ROUTER_INTEL',
        actor: 'Router Decision Engine',
        status: 'SUCCESS',
        message: "Router compilation finalized. Formulating specific Supervisor execution plan.",
        costEstimate: { llm: 0.0005, tool: 0.0000, compute: 0.0001 },
        details: {
          confidence: 99.1,
          planSteps: [
            "1. Product Supervisor allocation -> Product Manager requirements",
            "2. Design Supervisor delegation -> UI/UX Layout Typography rules",
            "3. Engineering Supervisor delegation -> Frontend compilation",
            "4. Engineering Supervisor delegation -> Backend sandboxed ports & APIs",
            "5. Quality Assurance Supervisor -> Strict safety boundary validation",
            "6. Engineering DevOps Node -> Live staging deployment"
          ]
        }
      },
      {
        stepIndex: 6,
        type: 'SUPERVISOR',
        actor: 'Product Supervisor',
        status: 'RUNNING',
        message: "Workflow directive acknowledged. Evaluating eligible candidate Product Manager.",
        costEstimate: { llm: 0.0003, tool: 0.0001, compute: 0.0002 },
        details: {
          selectionReason: "Highest Performance Rating in strategy mapping. Availability: 100%. Quality Rating: 98%"
        }
      },
      {
        stepIndex: 7,
        type: 'AGENT_STATE',
        actor: 'Product Manager',
        status: 'RUNNING',
        message: "Product Manager active inside isolated sandbox. Compiling specifications schema and strategic flows.",
        costEstimate: { llm: 0.0028, tool: 0.0005, compute: 0.0008 }
      },
      {
        stepIndex: 8,
        type: 'HANDOFF',
        actor: 'Product Manager',
        status: 'SUCCESS',
        message: "Completed. Requirements specifications generated successfully.",
        costEstimate: { llm: 0.0006, tool: 0.0000, compute: 0.0001 },
        details: {
          confidence: 98.0,
          suggestedNextAgent: "UI/UX Designer",
          requiredNextSkill: "Space Grotesk pairing layout design",
          taskResult: "PRD successfully stored at /workspace/prd-standards.md"
        }
      },
      {
        stepIndex: 9,
        type: 'SUPERVISOR',
        actor: 'Design Supervisor',
        status: 'RUNNING',
        message: "Received handoff. Sizing UI/UX layout compliance checklist and allocating Design Specialist.",
        costEstimate: { llm: 0.0003, tool: 0.0001, compute: 0.0002 },
        details: {
          selectionReason: "Assigned UI/UX Designer based on typography pairing specialization rules."
        }
      },
      {
        stepIndex: 10,
        type: 'AGENT_STATE',
        actor: 'UI/UX Designer',
        status: 'RUNNING',
        message: "Designing layout architecture. Selecting Inter font bindings and sizing premium element spacing metrics.",
        costEstimate: { llm: 0.0031, tool: 0.0008, compute: 0.0012 }
      },
      {
        stepIndex: 11,
        type: 'HANDOFF',
        actor: 'UI/UX Designer',
        status: 'SUCCESS',
        message: "Design definitions complete. Interface variables formatted.",
        costEstimate: { llm: 0.0005, tool: 0.0000, compute: 0.0001 },
        details: {
          confidence: 97.4,
          suggestedNextAgent: "Frontend Engineer",
          requiredNextSkill: "React layout rendering & Tailwind components",
          taskResult: "Layout specifications mapping exported to JSON: /workspace/typography-tokens.json"
        }
      },
      {
        stepIndex: 12,
        type: 'SUPERVISOR',
        actor: 'Engineering Supervisor',
        status: 'RUNNING',
        message: "Handoff payload approved. Delegating code tasks to active Frontend specialized systems.",
        costEstimate: { llm: 0.0004, tool: 0.0001, compute: 0.0002 },
        details: {
          selectionReason: "Target: Frontend Engineer. Performance score: 99.1%. Reusable Component database online."
        }
      },
      {
        stepIndex: 13,
        type: 'AGENT_STATE',
        actor: 'Frontend Engineer',
        status: 'RUNNING',
        message: "Assembling React layout modules and compiling styled Tailwind structures.",
        costEstimate: { llm: 0.0045, tool: 0.0015, compute: 0.0030 }
      },
      {
        stepIndex: 14,
        type: 'FAILURE',
        actor: 'Frontend Engineer',
        status: 'WARN',
        message: "Compiler Sentry Warning: Local absolute stylesheet references failed to resolve nested imports.",
        costEstimate: { llm: 0.0008, tool: 0.0002, compute: 0.0005 }
      },
      {
        stepIndex: 15,
        type: 'RETRY',
        actor: 'Frontend Engineer',
        status: 'RUNNING',
        message: "Running mitigation protocols. Re-bundling imports using dynamic relative paths inside sandbox.",
        costEstimate: { llm: 0.0025, tool: 0.0010, compute: 0.0020 }
      },
      {
        stepIndex: 16,
        type: 'HANDOFF',
        actor: 'Frontend Engineer',
        status: 'SUCCESS',
        message: "Frontend components successfully built first-pass without errors.",
        costEstimate: { llm: 0.0006, tool: 0.0000, compute: 0.0001 },
        details: {
          confidence: 99.1,
          suggestedNextAgent: "Backend Engineer",
          requiredNextSkill: "API route configurations",
          taskResult: "React interface file saved inside workspace: /src/components/MainPreview.tsx"
        }
      },
      {
        stepIndex: 17,
        type: 'SUPERVISOR',
        actor: 'Engineering Supervisor',
        status: 'RUNNING',
        message: "Mapping dynamic endpoints to Backend specialized worker thread.",
        costEstimate: { llm: 0.0003, tool: 0.0001, compute: 0.0002 }
      },
      {
        stepIndex: 18,
        type: 'AGENT_STATE',
        actor: 'Backend Engineer',
        status: 'RUNNING',
        message: "Setting up sandboxed Express proxy routes to isolate sensitive token parameters.",
        costEstimate: { llm: 0.0035, tool: 0.0012, compute: 0.0022 }
      },
      {
        stepIndex: 19,
        type: 'INTEGRATION',
        actor: 'Router Decision Engine',
        status: 'SUCCESS',
        message: "INTEGRATION PROXY ACTIVE: Activated GitHub MCP to secure codebase and prepare pull request.",
        costEstimate: { llm: 0.0001, tool: 0.0010, compute: 0.0005 }
      },
      {
        stepIndex: 20,
        type: 'HANDOFF',
        actor: 'Backend Engineer',
        status: 'SUCCESS',
        message: "API layer fully established. Directing task to Quality Assurance Supervisor.",
        costEstimate: { llm: 0.0005, tool: 0.0000, compute: 0.0001 },
        details: {
          confidence: 98.2,
          suggestedNextAgent: "QA Engineer",
          requiredNextSkill: "Linter validations & vulnerability scanner checks",
          taskResult: "Sovereign backend microservice listening on port 3000 boundary."
        }
      },
      {
        stepIndex: 21,
        type: 'SUPERVISOR',
        actor: 'Engineering Supervisor',
        status: 'RUNNING',
        message: "Instructing QA specialized system to start vulnerability and layout responsive testing.",
        costEstimate: { llm: 0.0003, tool: 0.0001, compute: 0.0002 }
      },
      {
        stepIndex: 22,
        type: 'AGENT_STATE',
        actor: 'QA Engineer',
        status: 'RUNNING',
        message: "Checking code logic via strict linters and compiling type checks with zero errors.",
        costEstimate: { llm: 0.0022, tool: 0.0008, compute: 0.0015 }
      },
      {
        stepIndex: 23,
        type: 'VALIDATION',
        actor: 'QA Checker',
        status: 'SUCCESS',
        message: "Code verification passed: 0 typescript compiler issues. Responsive styling meets rules.",
        costEstimate: { llm: 0.0004, tool: 0.0005, compute: 0.0005 }
      },
      {
        stepIndex: 24,
        type: 'SUPERVISOR',
        actor: 'Operations Supervisor',
        status: 'RUNNING',
        message: "Assigning deployment write task to DevOps and Documentation specialists.",
        costEstimate: { llm: 0.0003, tool: 0.0001, compute: 0.0002 }
      },
      {
        stepIndex: 25,
        type: 'AGENT_STATE',
        actor: 'Technical Writer',
        status: 'RUNNING',
        message: "Writing README system specs and production manuals.",
        costEstimate: { llm: 0.0018, tool: 0.0002, compute: 0.0005 }
      },
      {
        stepIndex: 26,
        type: 'INTEGRATION',
        actor: 'Router Decision Engine',
        status: 'SUCCESS',
        message: "INTEGRATION PROXY ACTIVE: Activated Vercel MCP for live sandboxed build packaging.",
        costEstimate: { llm: 0.0001, tool: 0.0015, compute: 0.0020 }
      },
      {
        stepIndex: 27,
        type: 'COMPLETE',
        actor: 'Kernel Sentry',
        status: 'SUCCESS',
        message: "Autonomous execution finished successfully. Deployment staging fully compiled.",
        costEstimate: { llm: 0.0005, tool: 0.0000, compute: 0.0002 },
        details: {
          confidence: 99.4,
          taskResult: "Sandbox environment is online on live port 3000 proxy link."
        }
      }
    ];

    return rawEvents.map((evt, idx) => ({
      ...evt,
      id: `evt-${idx}-${Date.now()}`,
      timestamp: getFormattedTime(idx * 2)
    }));
  };

  const handleStartSimulation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const task = inputText.trim() || "Build an AI Resume Analyzer SaaS";
    setInputText(task);
    
    const risk = assessRisk(task);
    const newMission: QueuedMission = { id: `m-${Date.now()}`, name: task, risk, status: 'Pending' };
    
    setMissionQueue(prev => [...prev, newMission]);

    if (risk === 'High') {
      setCurrentMissionStatus('PLANNED');
      setIsVoting(true);
      setCouncilVotes(Object.fromEntries(COUNCIL_MEMBERS.map(m => [m.name, null])));
    } else {
      // Auto-approve low risk
      proceedWithExecution(task);
    }
  };

  const proceedWithExecution = (taskName: string = inputText) => {
    setIsVoting(false);
    setIsExecuting(true);
    setActiveStepIndex(0);
    setIsPlaying(true);
    
    // Update queue status
    setMissionQueue(prev => prev.map(m => m.name === taskName ? {...m, status: 'Approved'} : m));
    
    const seq = generateSequence(taskName);
    setTimelineLogs(seq);
    startTask(`T-${Date.now()}`, "Processing...");
  };

  // Replay handler
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isExecuting && isPlaying) {
      if (activeStepIndex < timelineLogs.length - 1) {
        let stepDelay = 1400;
        const currentStep = timelineLogs[activeStepIndex];
        if (currentStep?.status === 'RUNNING') stepDelay = 1800;
        if (currentStep?.type === 'HANDOFF') stepDelay = 2000;
        if (currentStep?.type === 'COUNCIL_VOTE') stepDelay = 2200;

        timer = setTimeout(() => {
          const nextIdx = activeStepIndex + 1;
          setActiveStepIndex(nextIdx);

          // Dynamically adjust mission status
          const nextStep = timelineLogs[nextIdx];
          if (nextStep) {
            addLog(nextStep.message);
            updateProgress((nextIdx / timelineLogs.length) * 100, nextStep.status === 'RUNNING' ? 'Processing...' : nextStep.actor);
            if (nextStep.stepIndex >= 27) {
              setCurrentMissionStatus('COMPLETED');
              completeTask();
              // Save task
              setCompletedTasks(prev => [...prev, {
                id: `T-${Date.now()}`,
                name: inputText,
                status: 'Completed',
                timestamp: getFormattedTime()
              }]);
            } else if (nextStep.stepIndex >= 4) {
              setCurrentMissionStatus('RUNNING');
            } else if (nextStep.stepIndex >= 3) {
              setCurrentMissionStatus('APPROVED');
            } else if (nextStep.stepIndex >= 1) {
              setCurrentMissionStatus('PLANNED');
            }
          }
        }, stepDelay / playbackSpeed);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isExecuting, isPlaying, activeStepIndex, timelineLogs, playbackSpeed]);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [activeStepIndex, timelineLogs]);

  // Filters
  const getFilteredLogs = () => {
    const activeSlice = timelineLogs.slice(0, activeStepIndex + 1);
    if (logFilter === 'ALL') return activeSlice;
    if (logFilter === 'SYSTEM') return activeSlice.filter(l => l.type === 'SYSTEM' || l.type === 'COMPLETE' || l.type === 'FAILURE');
    if (logFilter === 'AGENT') return activeSlice.filter(l => l.type === 'AGENT_STATE' || l.type === 'HANDOFF');
    if (logFilter === 'COUNCIL') return activeSlice.filter(l => l.type === 'COUNCIL_VOTE');
    if (logFilter === 'INTEGRATION') return activeSlice.filter(l => l.type === 'INTEGRATION' || l.type === 'VALIDATION');
    return activeSlice;
  };

  const currentVisibleLogs = getFilteredLogs();

  const getActorBadgeStyles = (actor: string) => {
    const lower = actor.toLowerCase();
    if (lower.includes('router') || lower.includes('decision')) return 'border-[#00E5C3]/30 bg-[#00E5C3]/5 text-[#00E5C3]';
    if (lower.includes('supervisor')) return 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400';
    if (lower.includes('product')) return 'border-amber-500/30 bg-amber-500/5 text-amber-400';
    if (lower.includes('designer') || lower.includes('ui')) return 'border-pink-500/30 bg-pink-500/5 text-pink-400';
    if (lower.includes('frontend')) return 'border-blue-500/30 bg-blue-500/5 text-blue-400';
    if (lower.includes('backend')) return 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400';
    if (lower.includes('qa') || lower.includes('checker')) return 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400';
    if (lower.includes('writer')) return 'border-yellow-600/30 bg-yellow-600/5 text-yellow-500';
    return 'border-zinc-800 bg-zinc-950 text-zinc-400';
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'SYSTEM': return <Cpu className="w-3.5 h-3.5 text-zinc-400" />;
      case 'COUNCIL_VOTE': return <Shield className="w-3.5 h-3.5 text-[#00E5C3]" />;
      case 'ROUTER_INTEL': return <Zap className="w-3.5 h-3.5 text-[#00E5C3]" />;
      case 'SUPERVISOR': return <Layers className="w-3.5 h-3.5 text-cyan-400" />;
      case 'AGENT_STATE': return <Activity className="w-3.5 h-3.5 text-[#00E5C3]" />;
      case 'HANDOFF': return <ArrowRight className="w-3.5 h-3.5 text-pink-400" />;
      case 'INTEGRATION': return <Server className="w-3.5 h-3.5 text-indigo-400" />;
      case 'VALIDATION': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'COMPLETE': return <Star className="w-3.5 h-3.5 text-yellow-500" />;
      case 'FAILURE': return <AlertTriangle className="w-3.5 h-3.5 text-red-500 animate-pulse" />;
      case 'RETRY': return <RefreshCw className="w-3.5 h-3.5 text-yellow-500 animate-spin" />;
      default: return <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  // Determine MCP Statuses (Dormant vs Active)
  const isGitHubActive = isExecuting && timelineLogs[activeStepIndex]?.message.includes('GitHub MCP');
  const isVercelActive = isExecuting && timelineLogs[activeStepIndex]?.message.includes('Vercel MCP');

  return (
    <div className="flex flex-col h-screen bg-[#020706] text-[#EBEFE2] overflow-hidden select-none font-mono relative">
      {/* Visual Ambient grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#00E5C3_1px,transparent_1px),linear-gradient(to_bottom,#00E5C3_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(circle_at_top,rgba(0,229,195,0.1),transparent_75%)]" />

      {/* TOP: Observability Band */}
      <div className="h-10 border-b border-[#00E5C3]/10 bg-[#030B09] shrink-0 z-20 flex items-center justify-between px-6 text-[10px] text-zinc-500 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3] shadow-[0_0_8px_#00E5C3]" />
            <span className="font-bold text-white tracking-widest text-[10px]">APEX CORE v2.0</span>
          </div>
          <div className="h-4 w-[1px] bg-zinc-800" />
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">KERNEL STATE:</span>
            <span className="text-[#00E5C3] font-bold">{isExecuting ? 'ACTIVE' : 'STANDBY'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">MISSION STATE:</span>
            <span className={cn(
              "font-bold",
              currentMissionStatus === 'COMPLETED' ? "text-emerald-400" :
              currentMissionStatus === 'RUNNING' ? "text-yellow-400 animate-pulse" :
              currentMissionStatus === 'APPROVED' ? "text-cyan-400" : "text-zinc-400"
            )}>{currentMissionStatus}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">CPU LOAD:</span>
            <span className="text-neutral-300 font-sans">{stats.cpuLoad}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-600">COMPUTE MEM:</span>
            <span className="text-neutral-300 font-sans">{stats.memoryUsage}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[#00E5C3] font-bold">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SECURE CONTEXT BOUNDS</span>
        </div>
      </div>

      {/* ALERT BANNER */}
      {missionQueue.some(m => m.risk === 'High' && m.status === 'Pending') && !isVoting && (
        <div className="bg-red-950/30 border-b border-red-900/50 px-6 py-2 flex items-center justify-between z-10 animate-pulse">
          <div className="flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4" />
            Council Review Required for High-Risk Mission
          </div>
          <button onClick={() => setIsVoting(true)} className="px-3 py-1 bg-red-900 text-white rounded text-[10px] font-bold uppercase cursor-pointer hover:bg-red-800">
            Open Council Engine
          </button>
        </div>
      )}

      {/* EXECUTION READINESS BANNER */}
      <div className="bg-[#030B09] border-b border-[#00E5C3]/10 px-6 py-2 grid grid-cols-3 gap-6 text-[10px]">
        <div className="text-zinc-500">
          <span className="font-bold text-zinc-300 uppercase">System Limits:</span> Sandbox Port 3000 ● Autonomous Only
        </div>
        <div className="text-zinc-500">
          <span className="font-bold text-zinc-300 uppercase">MCP Active:</span> GitHub <span className="text-emerald-500">READY</span> ● Vercel <span className="text-emerald-500">READY</span> ● Supabase <span className="text-zinc-600">DORMANT</span>
        </div>
        <div className="text-zinc-500 flex items-center justify-between">
          <span className="flex items-center gap-1 font-bold text-amber-500 uppercase"><AlertTriangle className="w-3 h-3" /> Needs: Supabase Secret</span>
        </div>
      </div>

      {/* MAIN CONTAINER: TWO COLUMN LAYOUT */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {isVoting && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#040C0A] border border-[#00E5C3]/20 rounded-xl p-8 max-w-lg w-full shadow-2xl">
              <h2 className="text-lg font-bold text-white mb-1">High-Risk Mission Approval</h2>
              <p className="text-zinc-500 text-xs mb-6">// COUNCIL REVIEW REQUIRED</p>
              
              <div className="space-y-3 mb-8">
                {COUNCIL_MEMBERS.map(member => (
                  <div key={member.name} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-xs">
                    <div>
                      <div className="font-bold text-zinc-300">{member.name}</div>
                      <div className="text-[10px] text-zinc-600">{member.role}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                         onClick={() => setCouncilVotes(v => ({...v, [member.name]: true}))}
                         className={cn("px-3 py-1 rounded text-[10px] uppercase font-bold transition-all", councilVotes[member.name] === true ? "bg-emerald-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-emerald-800")}>Accept</button>
                      <button 
                         onClick={() => setCouncilVotes(v => ({...v, [member.name]: false}))}
                         className={cn("px-3 py-1 rounded text-[10px] uppercase font-bold transition-all", councilVotes[member.name] === false ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-red-800")}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-900">
                <button 
                  disabled={Object.values(councilVotes).some(v => v === null || v === false)}
                  onClick={proceedWithExecution}
                  className="px-6 py-2 bg-[#00E5C3] text-black font-bold text-xs rounded disabled:opacity-30 disabled:cursor-not-allowed">
                  Execute Mission
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {viewMode === 'REGISTRY' && (
           <div className="flex-1 p-6">
             <TaskRegistry tasks={completedTasks} />
           </div>
        )}

        {viewMode === 'CONNECTIONS' && (
           <div className="flex-1 p-6">
             <MCPConnections connections={connections} onToggle={toggleConnection} />
           </div>
        )}

        {/* LEFT PANEL: INPUT BAR + CORE TERMINAL EXECUTION FEED */}
        <div className={cn("flex-1 flex-col p-6 pb-2 min-w-0 pr-3", viewMode === 'MISSION' ? 'flex' : 'hidden')}>
          
          {/* Section Breadcrumbs & Mode Switcher */}
          <div className="mb-3.5 flex items-center justify-between">
            <div className="flex gap-4 items-center">
               <button 
                  onClick={() => setViewMode('MISSION')}
                  className={cn("text-[9px] tracking-[0.3em] font-bold uppercase transition-colors", viewMode === 'MISSION' ? 'text-[#00E5C3]' : 'text-zinc-600 hover:text-zinc-400')}
               >// MISSION TERMINAL</button>
               <button 
                  onClick={() => setViewMode('WORKFORCE')}
                  className={cn("text-[9px] tracking-[0.3em] font-bold uppercase transition-colors", viewMode === 'WORKFORCE' ? 'text-[#00E5C3]' : 'text-zinc-600 hover:text-zinc-400')}
               >// WORKFORCE</button>
               <button 
                  onClick={() => setViewMode('REGISTRY')}
                  className={cn("text-[9px] tracking-[0.3em] font-bold uppercase transition-colors", viewMode === 'REGISTRY' ? 'text-[#00E5C3]' : 'text-zinc-600 hover:text-zinc-400')}
               >// REGISTRY</button>
               <button 
                  onClick={() => setViewMode('CONNECTIONS')}
                  className={cn("text-[9px] tracking-[0.3em] font-bold uppercase transition-colors", viewMode === 'CONNECTIONS' ? 'text-[#00E5C3]' : 'text-zinc-600 hover:text-zinc-400')}
               >// CONNECTIONS</button>
            </div>
            {isExecuting && viewMode === 'MISSION' && (
              <div className="flex items-center gap-2 px-2.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
                <span className="text-[8px] text-zinc-300 uppercase tracking-widest">STEP {activeStepIndex + 1}/{timelineLogs.length}</span>
              </div>
            )}
          </div>

          {/* INPUT INTENT BAR */}
          <div className="bg-[#040C0A] border border-[#00E5C3]/10 rounded-lg p-3.5 mb-4 shadow-xl relative">
            <form onSubmit={handleStartSimulation} className="space-y-3">
              <div className="flex items-center justify-between text-[9px] text-zinc-500">
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider">
                  <TerminalIcon className="w-3 h-3 text-[#00E5C3]" />
                  Enter Mission Command Parameters
                </span>
                <span className="text-zinc-600 font-sans font-bold">// PORT: 3000 PROXY</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative flex items-center bg-[#010605] border border-zinc-800 rounded px-2.5 py-2 focus-within:border-[#00E5C3] transition-all">
                  <Search className="w-3.5 h-3.5 text-[#00E5C3]/40 mr-2 shrink-0" />
                  <input 
                    type="text"
                    disabled={isExecuting && isPlaying}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter human intent (e.g. «Build an AI Resume Analyzer SaaS»)"
                    className="bg-transparent text-xs text-white outline-none w-full placeholder:text-zinc-700"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isExecuting && isPlaying}
                  className="w-full sm:w-auto px-5 py-2 bg-[#00E5C3] hover:bg-[#00cfa1] disabled:opacity-30 text-black transition-all rounded font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" /> Deploy Workspace
                </button>
              </div>

              {/* Quick Template Picker */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[8px] text-zinc-600 uppercase tracking-wider font-bold">TEMPLATES:</span>
                {[
                  "Build an AI Resume Analyzer SaaS",
                  "Formulate Cross-Chain Arbitrage Swap Validator",
                  "Design High-Performance Real-Time Chart Widget"
                ].map((tpl) => (
                  <button
                    type="button"
                    key={tpl}
                    disabled={isExecuting && isPlaying}
                    onClick={() => {
                      setInputText(tpl);
                      setTimeout(() => {
                        setCurrentMissionStatus('PLANNED');
                        setIsExecuting(true);
                        setActiveStepIndex(0);
                        setIsPlaying(true);
                        setTimelineLogs(generateSequence(tpl));
                      }, 50);
                    }}
                    className="px-2 py-0.5 text-[8px] bg-black hover:bg-[#00E5C3]/10 border border-zinc-900 hover:border-[#00E5C3]/30 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {tpl.length > 30 ? `${tpl.slice(0, 30)}...` : tpl}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* LOGS TERMINAL FEED SCREEN */}
          <div className="flex-1 bg-[#010504] border border-zinc-800 rounded-lg flex flex-col overflow-hidden p-4 shadow-inner relative">
            {/* Filter Tab buttons */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 shrink-0 text-[9px]">
              <div className="flex gap-1.5">
                {(['ALL', 'SYSTEM', 'COUNCIL', 'AGENT', 'INTEGRATION'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLogFilter(tab)}
                    className={cn(
                      "px-2 py-0.5 rounded uppercase font-bold transition-all border",
                      logFilter === tab 
                        ? "bg-[#00E5C3]/10 text-[#00E5C3] border-[#00E5C3]/20" 
                        : "text-zinc-500 hover:text-white border-transparent bg-transparent"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-zinc-600 font-sans tracking-wide">
                {timelineLogs.length > 0 ? `${getFilteredLogs().length}/${timelineLogs.length} EVENTS STREAMED` : `SENTRY DORMANT`}
              </div>
            </div>

            {/* Scrollable Event Logs */}
            <div 
              ref={terminalScrollRef}
              className="flex-1 overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent select-text"
            >
              {timelineLogs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                  <TerminalIcon className="w-10 h-10 text-[#00E5C3]/15 mb-3.5 animate-pulse" />
                  <h4 className="text-white text-[11px] font-bold uppercase tracking-widest mb-1">Awaiting OS Directive</h4>
                  <p className="max-w-xs text-zinc-600 text-[10px] leading-relaxed">
                    No mission is actively running. Run a simulation or select a design template to initiate the Router Engine task allocation process. No agent compiles autonomously.
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {currentVisibleLogs.map((log) => {
                    const hasDetails = !!log.details;
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "p-2.5 rounded border text-[10px] leading-relaxed",
                          log.status === 'ERROR' ? "bg-red-950/20 border-red-900/30 text-red-300" :
                          log.status === 'WARN' ? "bg-yellow-950/25 border-yellow-800/30 text-yellow-300 animate-pulse" :
                          log.type === 'COMPLETE' ? "bg-[#00E5C3]/5 border-[#00E5C3]/30 text-[#00E5C3] shadow-[0_0_8px_rgba(0,229,195,0.04)]" :
                          "bg-[#040D0B]/40 border-zinc-900 text-zinc-300"
                        )}
                      >
                        {/* Event Title Line */}
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-1 mb-1.5 text-[9px]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-zinc-500">[{log.timestamp}]</span>
                            <span className={cn("px-1 rounded border text-[8px] font-bold uppercase", getActorBadgeStyles(log.actor))}>
                              {log.actor}
                            </span>
                            <span className="text-zinc-600 font-sans tracking-tight uppercase text-[8px]">
                              {log.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[8px] font-bold">
                            {getLogIcon(log.type)}
                            <span className={cn(
                              "uppercase",
                              log.status === 'SUCCESS' ? "text-emerald-400" :
                              log.status === 'ERROR' ? "text-red-400" :
                              log.status === 'WARN' ? "text-yellow-400" : "text-[#00E5C3]"
                            )}>{log.status}</span>
                          </div>
                        </div>

                        {/* Event description message */}
                        <p className="text-xs text-[#EAF0EB]">
                          {log.message}
                        </p>

                        {/* Details and nested report */}
                        {hasDetails && (
                          <div className="mt-2 text-[9.5px] bg-black/50 border border-zinc-900 rounded p-2 font-mono space-y-1.5">
                            {log.details?.selectionReason && (
                              <div>
                                <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider">SELECTION MOTIVATION</span>
                                <span className="text-zinc-300">{log.details.selectionReason}</span>
                              </div>
                            )}
                            {log.details?.taskResult && (
                              <div>
                                <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider">RESULT METADATA</span>
                                <span className="text-white font-semibold">{log.details.taskResult}</span>
                              </div>
                            )}
                            {log.details?.planSteps && (
                              <div>
                                <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider mb-1">DETERMINED DELEGATION MAP</span>
                                <div className="space-y-0.5 text-zinc-400 font-sans text-[10px]">
                                  {log.details.planSteps.map((step, sIdx) => (
                                    <div key={sIdx} className="flex items-center gap-1.5">
                                      <span className="w-1 h-1 rounded-full bg-[#00E5C3]" />
                                      <span>{step}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {(log.details?.confidence !== undefined || log.details?.suggestedNextAgent) && (
                              <div className="grid grid-cols-2 gap-2 border-t border-zinc-900 pt-1.5 mt-1 text-[9px]">
                                {log.details.confidence !== undefined && (
                                  <div>
                                    <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider">ROUTER CONFIDENCE WEIGHT</span>
                                    <span className="text-[#00E5C3] font-bold">{log.details.confidence}%</span>
                                  </div>
                                )}
                                {log.details.suggestedNextAgent && (
                                  <div>
                                    <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider">ROUTER EXPECTED COMPILER</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const found = AGENTS_DATABASE[log.details?.suggestedNextAgent || ''];
                                        if (found) setSelectedAgent(found);
                                      }}
                                      className="text-pink-400 font-bold hover:underline bg-transparent border-none outline-none cursor-pointer"
                                    >
                                      {log.details.suggestedNextAgent}
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                            {log.details?.requiredNextSkill && (
                              <div className="border-t border-zinc-900 pt-1">
                                <span className="text-zinc-600 block text-[7.5px] font-bold uppercase tracking-wider">SKILL REQUIREMENTS BOUNDARY</span>
                                <span className="text-zinc-400">{log.details.requiredNextSkill}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR PANEL: METRICS, STATUS, COUNCIL VOTE VESTIBULE */}
        <div className="w-80 border-l border-zinc-800 bg-[#030907] flex flex-col p-6 pl-3 overflow-y-auto shrink-0 select-none scrollbar-thin scrollbar-thumb-zinc-950 scrollbar-track-transparent">
          
          {/* DIVISION A: STEP 14 CONTINUOUS COST TRACKER */}
          <div className="mb-5 border-b border-zinc-800 pb-4">
            <span className="text-[9px] text-[#00E5C3] font-bold uppercase tracking-[0.2em] block mb-2">// COST INTELLIGENCE TRACKING</span>
            <div className="bg-[#040C0A] border border-zinc-800 rounded-md p-3 font-mono space-y-1.5">
              <div className="text-[9px] text-zinc-500 uppercase flex justify-between">
                <span>Core Compute Budget</span>
                <span className="text-white font-sans">$5.00 Limit</span>
              </div>
              <div className="border-t border-zinc-900 my-1 pt-1.5 space-y-1.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">LLM Input/Output:</span>
                  <span className="text-zinc-300 font-sans">${currentCost.llm}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">MCP tool call cost:</span>
                  <span className="text-zinc-300 font-sans">${currentCost.tool}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Storage / Compute resource:</span>
                  <span className="text-zinc-300 font-sans">${currentCost.compute}</span>
                </div>
              </div>
              <div className="border-t border-[#00E5C3]/10 pt-2 flex justify-between items-center text-xs">
                <span className="text-[#00E5C3] font-bold">TOTAL MISSION COST:</span>
                <span className="text-[#00E5C3] font-bold font-sans">${currentCost.total}</span>
              </div>
            </div>
          </div>
          
          {/* DIVISION A.5: COUNCIL QUEUE */}
          <div className="mb-5 border-b border-zinc-800 pb-4">
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.2em] block mb-2">// COUNCIL MISSION QUEUE</span>
            {missionQueue.length === 0 ? (
               <div className="text-[10px] text-zinc-600 italic">No missions currently queued for review.</div>
            ) : (
                <div className="space-y-2">
                    {missionQueue.map(m => (
                        <div key={m.id} className="bg-zinc-950 border border-zinc-900 rounded p-2 text-[10px] flex justify-between items-center">
                            <span className="truncate max-w-[120px] text-zinc-300">{m.name}</span>
                            <span className={cn("font-bold", m.risk === 'High' ? "text-red-400" : "text-emerald-400")}>{m.risk}</span>
                            <span className={cn("text-[8px] font-bold", m.status === 'Approved' ? "text-cyan-400" : "text-yellow-500")}>{m.status}</span>
                        </div>
                    ))}
                </div>
            )}
          </div>

          {/* DIVISION A.6: DIGITAL WORKFORCE KERNEL */}
          {viewMode === 'WORKFORCE' && (
             <div className="mb-5 border-b border-zinc-800 pb-4">
                <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.2em] block mb-2">// DIGITAL WORKFORCE KERNEL</span>
                <WorkforceView agents={AGENTS_DATABASE} compact={true} />
             </div>
          )}
          <div className="mb-5 border-b border-zinc-800 pb-4">
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-[0.2em] block mb-2">// HIGH-RISK COUNCIL ENVELOPE</span>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] mb-1.5">
                <span className="text-zinc-400">Consensus authorization:</span>
                <span className={cn(
                  "font-bold text-[9px] px-1 py-0.5 rounded",
                  currentMissionStatus === 'DRAFT' ? "bg-zinc-900 border border-zinc-800 text-zinc-500" :
                  currentMissionStatus === 'PLANNED' ? "bg-yellow-950 border border-yellow-800/40 text-yellow-500 animate-pulse" :
                  "bg-emerald-950 border border-emerald-800/40 text-emerald-400"
                )}>
                  {currentMissionStatus === 'DRAFT' ? 'Standby' : currentMissionStatus === 'PLANNED' ? 'Debating' : 'APPROVED'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[8.5px]">
                {COUNCIL_MEMBERS.map((member) => {
                  const stateStatus = getCouncilVoteStatus(member.name);
                  return (
                    <div 
                      key={member.name} 
                      className={cn(
                        "p-1.5 border rounded flex flex-col justify-between transition-colors duration-200",
                        stateStatus === 'APPROVED' ? "bg-[#00E5C3]/5 border-[#00E5C3]/25 text-white" :
                        stateStatus === 'VOTING' ? "bg-yellow-950/20 border-yellow-800/40 text-yellow-400 animate-pulse" :
                        "bg-zinc-950 border-zinc-900 text-zinc-600"
                      )}
                    >
                      <span className="font-bold tracking-tight">{member.name}</span>
                      <span className="text-[7.5px] mt-1 uppercase font-semibold">
                        {stateStatus === 'APPROVED' ? 'Approved ✓' : stateStatus === 'VOTING' ? 'Voting...' : 'Waiting'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DIVISION C: STEP 13 SPECIALIST STATUS PANEL */}
          <div className="flex-1 flex flex-col min-h-0">
            <span className="text-[9px] text-[#00E5C3] font-bold uppercase tracking-[0.2em] block mb-2">// DIVISION AGENTS STATUS</span>
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[9px]">
              {TEAM_ROSTER.map((agentName) => {
                const status = getAgentStatus(agentName);
                const agentData = AGENTS_DATABASE[agentName];

                return (
                  <div 
                    key={agentName}
                    onClick={() => { if(agentData) setSelectedAgent(agentData); }}
                    className={cn(
                      "p-2 border rounded flex items-center justify-between cursor-pointer transition-all duration-150 hover:bg-[#040C09]/80",
                      status === 'ACTIVE' ? "bg-[#00E5C3]/5 border-[#00E5C3]/30 shadow-[0_0_8px_rgba(0,229,195,0.05)]" :
                      status === 'COMPLETED' ? "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700" :
                      status === 'FAILED' ? "bg-red-950/20 border-red-900/40 text-red-400" :
                      "bg-zinc-950 border-zinc-900 text-zinc-600"
                    )}
                  >
                    <div>
                      <span className={cn(
                        "font-bold block text-[9.5px]",
                        status === 'ACTIVE' ? "text-[#00E5C3]" :
                        status === 'FAILED' ? "text-red-400" :
                        status === 'COMPLETED' ? "text-zinc-500 font-normal" : "text-zinc-400 font-sans"
                      )}>{agentName}</span>
                      <span className="text-[7.5px] font-sans text-zinc-500 block">
                        {status === 'ACTIVE' ? 'Active context execution' :
                         status === 'COMPLETED' ? 'Task delivered successfully' :
                         status === 'FAILED' ? 'Import compiler warning' :
                         status === 'WAITING' ? 'Awaiting prior handoff' : 'Standby idle'}
                      </span>
                    </div>

                    <span className={cn(
                      "text-[8px] font-bold px-1 py-0.5 rounded tracking-wider uppercase",
                      status === 'ACTIVE' ? "bg-[#00E5C3]/20 text-[#00E5C3] animate-pulse" :
                      status === 'COMPLETED' ? "bg-zinc-900 border-none text-zinc-600" :
                      status === 'FAILED' ? "bg-red-900/10 text-red-500 border border-red-900/30" :
                      "bg-zinc-900 text-zinc-500"
                    )}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM CONTROL PORT: TIMELINE REPLAY CONTROLLER */}
      <div 
        style={{ height: isDockCollapsed ? '34px' : isDockExpanded ? 'calc(100vh - 120px)' : `${dockHeight}px` }}
        className="border-t border-[#00E5C3]/15 bg-[#030907] flex flex-col relative shrink-0 transition-all duration-200 z-30 shadow-2xl"
      >
        {/* Resize Handler Spliter */}
        <div 
          onMouseDown={handleDragStart}
          className="absolute top-0 left-0 w-full h-1 cursor-ns-resize bg-[#00E5C3]/5 hover:bg-[#00E5C3]/35 transition-colors z-45" 
        />

        {/* Toolbar Header Row */}
        <div className="h-8.5 border-b border-zinc-900 flex items-center justify-between px-6 shrink-0 text-[10px] bg-[#040C0A]">
          <div className="flex items-center gap-4">
            <span className="font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#00E5C3]" />
              TIMELINE CONTROLS
            </span>

            {/* Dynamic Scrubber Playback System */}
            {timelineLogs.length > 0 && (
              <div className="flex items-center gap-2 bg-black border border-zinc-800 px-2 py-0.5 rounded">
                <button 
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 border-none bg-transparent hover:text-white text-[#00E5C3] cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setActiveStepIndex(0);
                    setIsPlaying(true);
                  }}
                  className="p-1 border-none bg-transparent hover:text-white text-zinc-500 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>

                <input 
                  type="range"
                  min={0}
                  max={timelineLogs.length - 1}
                  value={activeStepIndex}
                  onChange={(e) => {
                    setActiveStepIndex(Number(e.target.value));
                    setIsPlaying(false);
                  }}
                  className="w-24 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                  style={{ accentColor: '#00E5C3' }}
                />

                <select 
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value) as any)}
                  className="bg-transparent text-[8px] text-zinc-500 border-none outline-none cursor-pointer font-bold uppercase"
                >
                  <option value={0.5} className="bg-[#030907]">0.5x</option>
                  <option value={1} className="bg-[#030907]">1.0x</option>
                  <option value={2} className="bg-[#030907]">2.0x</option>
                  <option value={5} className="bg-[#030907]">5.0x</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 border-r border-zinc-900 pr-3 mr-1">
              <button 
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                className="p-1 border-none bg-transparent hover:text-white text-zinc-500 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="text-[8px] text-zinc-600 w-8 text-center font-bold">{Math.round(zoomLevel * 100)}%</span>
              <button 
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.5))}
                className="p-1 border-none bg-transparent hover:text-white text-zinc-500 cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>

            <button 
              type="button"
              onClick={() => {
                setIsDockExpanded(!isDockExpanded);
                setIsDockCollapsed(false);
              }}
              className="p-1 border-none bg-transparent hover:text-white text-zinc-500 cursor-pointer"
            >
              {isDockExpanded ? <Minimize2 className="w-3.5 h-3.5 text-[#00E5C3]" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button 
              type="button"
              onClick={() => {
                setIsDockCollapsed(!isDockCollapsed);
                setIsDockExpanded(false);
              }}
              className="p-1 border-none bg-transparent hover:text-white text-zinc-500 cursor-pointer uppercase font-bold text-[8.5px]"
            >
              {isDockCollapsed ? 'Expand Panel' : 'Minimize Panel'}
            </button>
          </div>
        </div>

        {/* Panel Main Container */}
        <div className="flex-1 overflow-hidden flex flex-col relative bg-[#010504]">
          {!isDockCollapsed && (
            <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full font-mono">
                
                {/* Left Panel Area: Supervisors status monitors */}
                <div className="md:col-span-8 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-2">// DEPARTMENT REGULATORY CONTROL TRACKS</span>
                    <div className="space-y-1.5">
                      {SUPERVISORS.map((sup) => {
                        const isSupervisorActive = isExecuting && timelineLogs[activeStepIndex]?.actor && (
                          timelineLogs[activeStepIndex].actor.includes(sup.department) || 
                          (AGENTS_DATABASE[timelineLogs[activeStepIndex].actor]?.department === sup.department)
                        );

                        return (
                          <div key={sup.name} className={cn(
                            "p-2 border rounded flex items-center justify-between text-[9px] transition-colors",
                            isSupervisorActive ? "border-[#00E5C3]/30 bg-[#00E5C3]/5 text-white" : "border-zinc-900 bg-black/40 text-zinc-400"
                          )}>
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                isSupervisorActive ? "bg-[#00E5C3] animate-pulse" : "bg-zinc-700"
                              )} />
                              <span className="font-bold">{sup.name}</span>
                              <span className="text-zinc-650">({sup.agentCount} specialized node workers)</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[8px] font-bold tracking-widest uppercase">
                                {isSupervisorActive ? 'Occupied' : 'NominalState'}
                              </span>
                              <div className="w-14 h-1 bg-zinc-900 rounded overflow-hidden">
                                <div 
                                  className={cn("h-full transition-all duration-300", isSupervisorActive ? "bg-[#00E5C3] w-full" : "bg-zinc-800 w-1/5")} 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Horizontal visual signaling pathway */}
                  <div className="border-t border-zinc-900 pt-2 text-[8.5px]">
                    <span className="text-zinc-500 uppercase font-bold text-[8.5px] block mb-1.5">// DYNAMIC INTER-AGENT ROUTING PATHWAY</span>
                    <div className="flex flex-wrap items-center gap-1.5 text-[8.5px]">
                      {TEAM_ROSTER.map((key, i) => {
                        const agentObj = AGENTS_DATABASE[key];
                        const isActiveInFeed = isExecuting && timelineLogs[activeStepIndex]?.actor === key;
                        const hasExecutedInFeed = isExecuting && timelineLogs.slice(0, activeStepIndex).some(l => l.actor === key);

                        return (
                          <React.Fragment key={key}>
                            {i > 0 && <span className="text-zinc-700 font-bold">&#8594;</span>}
                            <button
                              type="button"
                              onClick={() => { if(agentObj) setSelectedAgent(agentObj); }}
                              className={cn(
                                "px-2 py-0.5 rounded border transition-all cursor-pointer font-bold",
                                isActiveInFeed ? "border-[#00E5C3] bg-[#00E5C3]/10 text-white" :
                                hasExecutedInFeed ? "border-zinc-900 bg-zinc-950 text-zinc-500 line-through" : "border-zinc-900 bg-zinc-950 text-zinc-500"
                              )}
                            >
                              {key}
                            </button>
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Panel Area: System integration and state observers */}
                <div className="md:col-span-4 border-l border-zinc-900 pl-4 space-y-3.5 flex flex-col justify-between">
                  <div>
                    <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-2">// INTELLIGENT ROUTER METRIC ANALYSIS</span>
                    <div className="space-y-1.5 text-[9px] font-mono">
                      <div className="flex justify-between items-center bg-[#040C0A]/40 p-2 border border-zinc-900 rounded">
                        <span className="text-zinc-500">Intra-Node Handoff Speed:</span>
                        <span className="text-[#00E5C3] font-sans font-bold">14ms average</span>
                      </div>
                      <div className="flex justify-between items-center bg-[#040C0A]/40 p-2 border border-zinc-900 rounded">
                        <span className="text-zinc-500">Strict Dependency lock:</span>
                        <span className="text-white font-sans font-bold">Enforced (Stateful)</span>
                      </div>
                      <div className="flex justify-between items-center bg-[#040C0A]/40 p-2 border border-zinc-900 rounded">
                        <span className="text-zinc-500">Router Clearance rate:</span>
                        <span className="text-[#00E5C3] font-sans font-bold">99.4% Auth</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Integrations & Tool call logs */}
                  <div className="space-y-1">
                    <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-1">// DORMANT MCP COMPLIANCE REGISTRY</span>
                    <div className="grid grid-cols-2 gap-1 text-[8px] font-mono">
                      <div className={cn(
                        "p-1.5 border rounded flex justify-between items-center",
                        isGitHubActive ? "border-indigo-500/30 bg-indigo-500/5 text-indigo-400" : "border-zinc-900 text-zinc-500"
                      )}>
                        <span>GitHub MCP:</span>
                        <span className="font-bold">{isGitHubActive ? 'ACTIVE' : 'DORMANT'}</span>
                      </div>
                      <div className={cn(
                        "p-1.5 border rounded flex justify-between items-center",
                        isVercelActive ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-400" : "border-zinc-900 text-zinc-500"
                      )}>
                        <span>Vercel MCP:</span>
                        <span className="font-bold">{isVercelActive ? 'ACTIVE' : 'DORMANT'}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY: AGENT SPECIFICATIONS DRAWER */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#030907] border border-[#00E5C3]/20 rounded-xl max-w-lg w-full p-5 shadow-2xl relative select-text font-mono"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-zinc-800 pb-3 mb-4">
                <div>
                  <span className="text-[9px] text-[#00E5C3] uppercase tracking-wider font-bold block mb-1">DEPARTMENT SPEC: {selectedAgent.department}</span>
                  <h3 className="text-base font-bold text-white uppercase">{selectedAgent.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAgent(null)}
                  className="px-2 py-1 text-[9px] border border-zinc-800 hover:border-[#00e5c3]/40 rounded text-zinc-400 hover:text-white font-bold bg-transparent cursor-pointer"
                >
                  Close Specification
                </button>
              </div>

              {/* Specification stats grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-mono mb-4">
                <div className="bg-black/50 p-2 border border-zinc-900 rounded">
                  <span className="text-zinc-500 block">SUCCESS RATE</span>
                  <span className="text-emerald-400 font-bold font-sans text-xs">{selectedAgent.successRate}%</span>
                </div>
                <div className="bg-black/50 p-2 border border-zinc-900 rounded">
                  <span className="text-zinc-500 block">LATENCY EVAL</span>
                  <span className="text-white font-bold font-sans text-xs">{selectedAgent.latencyAvg}</span>
                </div>
                <div className="bg-black/50 p-2 border border-zinc-900 rounded">
                  <span className="text-zinc-500 block">HEALTH RATING</span>
                  <span className="text-[#00E5C3] font-bold font-sans text-xs">{selectedAgent.qualityScore}/100</span>
                </div>
              </div>

              {/* Detailed specification elements */}
              <div className="space-y-3.5 text-xs text-zinc-300">
                <div>
                  <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-1 font-mono">SPECIFIED CAPABILITIES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.capabilities.map((cap) => (
                      <span key={cap} className="px-2 py-0.5 bg-black border border-zinc-900 rounded font-sans text-[10px] text-zinc-350">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-1 font-mono">AUTHORIZED SKILLS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-[#00E5C3]/5 border border-[#00E5C3]/15 rounded font-sans text-[10px] text-[#00E5C3]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-1 font-mono">INTEGRATION SDK ACCESS & TOOLS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.tools.map((tool) => (
                      <span key={tool} className="px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded font-sans text-[10px] text-indigo-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[8.5px] text-zinc-500 uppercase tracking-wider block font-bold mb-1.5 font-mono">PERSISTENT MEMORY RECALL INDEX</span>
                  <div className="space-y-1 font-sans text-zinc-400 text-[10.5px] pl-2 border-l border-[#00E5C3]/10">
                    {selectedAgent.memory.map((mem) => (
                      <div key={mem} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C3]/40" />
                        <span>{mem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
