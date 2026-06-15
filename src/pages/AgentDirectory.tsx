import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, Shield, Activity, FileText, Layout, Paintbrush, TrendingUp, Search, 
  FileJson, Database, Cpu, Layers, Users, Settings, Network, BarChart, 
  UserCheck, Briefcase, Headphones, LineChart, BookOpen, Plus, Sparkles, Filter 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLivePreview } from '../lib/LivePreviewContext';
import { useTerminal } from '../lib/TerminalContext';

interface Agent {
  name: string;
  role: string;
  icon: React.ComponentType<any>;
  department: 'engineering' | 'design' | 'product' | 'marketing' | 'content' | 'data' | 'operations' | 'customer';
  expertise: string[];
  deliverables: string[];
  sample: string;
}

const COLOR_MAP: Record<string, string> = {
  engineering: '#00E5C3',
  design: '#c084fc',
  product: '#f472b6',
  marketing: '#fbbf24',
  content: '#00CFAE',
  data: '#818cf8',
  operations: '#fb7185',
  customer: '#facc15',
  default: '#93A8A1'
};

const DEPARTMENTS = [
  { id: 'all', name: 'All Departments' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'design', name: 'Design' },
  { id: 'product', name: 'Product' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'content', name: 'Content' },
  { id: 'data', name: 'Data Space' },
  { id: 'operations', name: 'Operations' },
  { id: 'customer', name: 'Customer Success' }
];

const AGENTS_LIST: Agent[] = [
  // Engineering Department
  {
    name: "Software Engineer",
    role: "Core runtime architecture and system integration",
    icon: Code,
    department: "engineering",
    expertise: ["TypeScript", "Rust", "Distributed State"],
    deliverables: ["Package bundler config", "Clean runtime wrappers", "Process architecture design"],
    sample: "Configuring container ports: isolated environment sandbox successfully initiated."
  },
  {
    name: "Frontend Engineer",
    role: "SaaS interface and visual layout execution",
    icon: Layout,
    department: "engineering",
    expertise: ["React 19", "Vite", "Tailwind CSS"],
    deliverables: ["Responsive layout files", "Optimized animation modules", "Visual system assets"],
    sample: "Compiling design tokens. Generated responsive grid blocks with smooth viewport adaptive bounds."
  },
  {
    name: "Backend Engineer",
    role: "Schema optimization and API gateway protocol",
    icon: Database,
    department: "engineering",
    expertise: ["Express.js", "Drizzle ORM", "Secure REST Handshakes"],
    deliverables: ["Database schemas", "Proxy route controllers", "Access control lists"],
    sample: "Schema migrator nominal. Connected isolated persistent DB tier with sub-millisecond connection speeds."
  },
  {
    name: "DevOps Engineer",
    role: "Decoupled pipeline deployment and CI/CD actions",
    icon: Settings,
    department: "engineering",
    expertise: ["Vercel CLI", "Docker", "Sovereign Clusters"],
    deliverables: ["CI/CD configuration files", "Server-start handlers", "Container ingress specs"],
    sample: "Decoupled ingress layers matched. Redirecting reverse-proxy protocols to secure, ephemeral Cloud gateways."
  },
  {
    name: "AI Engineer",
    role: "Gemini API modeling and cognitive parsing",
    icon: Cpu,
    department: "engineering",
    expertise: ["Google GenAI SDK", "Structured JSON generation", "Few-shot schemas"],
    deliverables: ["Intelligent prompt pipelines", "Execution router maps", "Latency log parsers"],
    sample: "Adaptive model routing triggered: response mapped to type-safe client parameters."
  },
  {
    name: "Security Engineer",
    role: "Isolated sandbox audit and sanitization lockouts",
    icon: Shield,
    department: "engineering",
    expertise: ["Injection defense", "Ephemeral sandbox audits", "Key masking"],
    deliverables: ["Vulnerability scans", "Environment handshake sanitizers", "Hand-off secure logs"],
    sample: "Sanitized input fields. Key strings masked to prevent context exposure to public browsers."
  },
  {
    name: "QA Engineer",
    role: "System-wide unit parsing and validation enclaves",
    icon: Activity,
    department: "engineering",
    expertise: ["TypeScript compile checks", "Endpoint mock testing", "Pipeline safety linting"],
    deliverables: ["Linter exception audits", "Test suite logs", "Performance regressions"],
    sample: "Validating directory schemas. Checking tsconfig rules for compile-ready production packages."
  },
  {
    name: "AI Tester",
    role: "Autonomous model output verification and edge case parser",
    icon: UserCheck,
    department: "engineering",
    expertise: ["Hallucination filters", "Boundary parsing", "Robust token checks"],
    deliverables: ["Synthesized payloads", "Model alignment logs", "Output accuracy ratios"],
    sample: "Running multi-turn mock inputs. Cognitive continuity verified across 10 virtual iterations."
  },

  // Design Department
  {
    name: "UI Designer",
    role: "Figma-standard spatial layouts and clean negative space",
    icon: Layout,
    department: "design",
    expertise: ["Modern micro-spacing", "High-contrast themes", "Bento grid rhythm"],
    deliverables: ["Color variables JSON", "Adaptive border tokens", "Interactive cards specs"],
    sample: "Typography scales paired. Set Space Grotesk display headers over high-contrast slate surfaces."
  },
  {
    name: "UX Designer",
    role: "User-flow optimization and cognitive load reduction",
    icon: Network,
    department: "design",
    expertise: ["User journeys", "Iframe responsive loops", "Input-action maps"],
    deliverables: ["Stepwise flow charts", "Interaction state cards", "User validation notes"],
    sample: "Proposal step counts reduced. Interactive workflow triggered in 3 minimal screen stages."
  },
  {
    name: "Graphic Designer",
    role: "Professional startup branding and minimal geometric layout",
    icon: Paintbrush,
    department: "design",
    expertise: ["SaaS wordmarks", "Vector SVG abstractions", "Clean display grids"],
    deliverables: ["Primary raw SVGs", "High-contrast visual assets", "Social layouts"],
    sample: "Generated secure intelligence abstract marks. Exported 100% scalable vector brand modules."
  },
  {
    name: "Brand Designer",
    role: "Corporate systems consistency and identity rules",
    icon: BookOpen,
    department: "design",
    expertise: ["Aesthetic styleguides", "Sovereign themes", "Motion timelines"],
    deliverables: ["Brand identity packages", "Asset layout rules", "SVG launcher icons"],
    sample: "Formulating cohesive space-tech guidelines. Synchronized color ranges across desktop and mobile structures."
  },
  {
    name: "Design QA",
    role: "Visual precision tracking and spacing audit",
    icon: Layers,
    department: "design",
    expertise: ["Pixel inspections", "Contrast standards", "Layout consistency"],
    deliverables: ["Contrast ratio audits", "Radius alignment logs", "Responsive screen diagnostics"],
    sample: "Inspecting padding constraints. Unified responsive grid gaps for ultra-wide screen density."
  },

  // Product Department
  {
    name: "Product Manager",
    role: "Vision-to-PRD breakdown and execution sequence planning",
    icon: Briefcase,
    department: "product",
    expertise: ["Product spec sheets", "Prerequisite mapping", "Orchestration trees"],
    deliverables: ["Detailed PRDs", "Feature list specs", "Functional step-trees"],
    sample: "Translating loose objectives. Segmented mission parameters to decouple strategic dependencies."
  },
  {
    name: "Startup Strategist",
    role: "Venture validation and capital efficiency mapping",
    icon: TrendingUp,
    department: "product",
    expertise: ["Competitor matrixes", "Economic structures", "Market timing analytics"],
    deliverables: ["Validation scorecards", "Strategic options brief", "SaaS pricing blueprints"],
    sample: "Competitor overlaps mapped. Sized DeFi integration routes to locate prime economic arbitrage."
  },
  {
    name: "Requirements Analyst",
    role: "Constraint mapping and edge-case classification",
    icon: FileText,
    department: "product",
    expertise: ["Feature boundary checks", "Compliance blueprints", "Scope reduction rules"],
    deliverables: ["Minimal viable scope", "Dependency matrix logs", "Audit-ready requirements"],
    sample: "Analyzing potential system blocks. Refined MVP parameters to achieve 15-minute deployment timelines."
  },

  // Marketing Department
  {
    name: "Growth Agent",
    role: "Referral mechanics and customer-acquisition loops",
    icon: BarChart,
    department: "marketing",
    expertise: ["Self-sustaining loops", "Analytics setups", "Feature flags growth"],
    deliverables: ["Loop diagrams", "Custom analytics telemetry", "Call-to-action logs"],
    sample: "Engineered growth reward handshakes. Tracking custom activation triggers across protected signups."
  },
  {
    name: "SEO Specialist",
    role: "Content indexing and search visibility blueprints",
    icon: Search,
    department: "marketing",
    expertise: ["Sitemap structures", "Query-intent mapping", "Metadata variables"],
    deliverables: ["Sitemap XML plans", "Search keyword catalogs", "Core Web Vitals blueprints"],
    sample: "Structured metadata variables. Formulating localized head keywords for developer workspaces."
  },
  {
    name: "Social Media Manager",
    role: "Strategic launch scheduling and narrative delivery",
    icon: Users,
    department: "marketing",
    expertise: ["Interactive thread schemas", "Telemetry logs tracking", "Distribution grids"],
    deliverables: ["Narrative catalogs", "Scheduled release grids", "Engagement handbooks"],
    sample: "Launch thread structured. Delivery scheduled to coordinate with sovereign community windows."
  },

  // Content Department
  {
    name: "Content Creator",
    role: "Engaging technical narratives and startup positioning copy",
    icon: FileText,
    department: "content",
    expertise: ["Copy composition", "Visual storytelling", "Creative writing rules"],
    deliverables: ["Pitch draft files", "Announcement copy blocks", "SaaS marketing layouts"],
    sample: "Drafting corporate manifesto. Anchoring text blocks to convey speed, trust, and execution-first power."
  },
  {
    name: "Technical Writer",
    role: "Markdown setup manuals, README files, and API docs",
    icon: BookOpen,
    department: "content",
    expertise: ["Detailed API reference", "Copy-paste guides", "Instruction specs"],
    deliverables: ["Project READMEs", "System-setup manuals", "API payload handbooks"],
    sample: "README updated inside root. Formulating explicit step-by-step guidelines for ephemeral developer setups."
  },

  // Data Department
  {
    name: "Data Analyst",
    role: "Telemetry aggregation and pipeline throughput math",
    icon: LineChart,
    department: "data",
    expertise: ["Log calculations", "Anomaly pattern checks", "Recharts configuration"],
    deliverables: ["Visual chart tables", "Latency stats files", "Throughput analytics"],
    sample: "Processing 10,000 telemetry packets. Sized latency deviations at +0.02ms across Router enclaves."
  },

  // Operations Department
  {
    name: "Automation Agent",
    role: "Trigger-based background workers and MCP event handlers",
    icon: Sparkles,
    department: "operations",
    expertise: ["Scheduled event loops", "Chaining algorithms", "Event-based systems"],
    deliverables: ["Event rules files", "Workflow connection scripts", "Background daemon templates"],
    sample: "Monitoring background tasks. Action triggered instantly on target repository commit notification."
  },

  // Customer Department
  {
    name: "Support Agent",
    role: "Self-healing documentation search and error resolution guide",
    icon: Headphones,
    department: "customer",
    expertise: ["Knowledgebase matching", "Error log parsing", "Diagnostics"],
    deliverables: ["Self-service diagnostics", "Error catalog matches", "Continuity transcripts"],
    sample: "Error log parsed: trace matched to missing API environment variable. Directing user to settings."
  }
];

export default function AgentDirectory() {
  const navigate = useNavigate();
  const { simulateTask } = useLivePreview();
  const { collapsed } = useTerminal();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [deployModal, setDeployModal] = useState<Agent | null>(null);

  const filteredAgents = AGENTS_LIST.filter(agent => {
    const matchesDept = selectedDept === 'all' || agent.department === selectedDept;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const getDeptColor = (dept: string) => COLOR_MAP[dept] || COLOR_MAP.default;

  return (
    <div className={cn("flex flex-col h-full overflow-y-auto p-4 sm:p-8 scrollbar-hide bg-[#020B0A] relative", collapsed ? "pb-8" : "pb-64")}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#12302A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header section */}
      <div className="text-center max-w-4xl mx-auto mb-12 relative z-10">
        <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// AGENT REGISTRY</span>
        <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
          Agent Ecosystem
        </h1>
        <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal mb-8">
          Deploy specialized parallel units across 8 core departments. Each agent communicates through type-safe schema Handshakes, executing sandboxed instructions matching PRD v1.5 standards.
        </p>

        {/* Search controls inside header */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto bg-[#071311] border border-[#12302A] p-2.5 rounded-lg">
          <div className="flex items-center gap-2 flex-1 w-full px-3">
            <Search className="w-4 h-4 text-[#93A8A1]" />
            <input 
              type="text" 
              placeholder="Search agents, specifications, or competencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-[#F2F5F4] outline-none w-full placeholder:text-[#526661] font-sans"
            />
          </div>
          <button 
            onClick={() => setDeployModal(AGENTS_LIST[0])}
            className="w-full sm:w-auto px-5 py-2 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] transition-all rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 font-bold cursor-pointer hover:shadow-[0_0_15px_rgba(0,229,195,0.2)]">
            <Plus className="w-3.5 h-3.5" /> Deploy Agent
          </button>
        </div>
      </div>

      {/* Departments Filter Bar */}
      <div className="w-full max-w-6xl mx-auto mb-10 overflow-x-auto scrollbar-hide py-2 border-b border-[#12302A] flex gap-1.5 whitespace-nowrap relative z-10">
        {DEPARTMENTS.map(dept => (
          <button
            key={dept.id}
            onClick={() => setSelectedDept(dept.id)}
            className={cn(
              "px-4 py-2 border rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-250 cursor-pointer",
              selectedDept === dept.id 
                ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3] shadow-[0_0_12px_rgba(0,229,195,0.1)]" 
                : "border-[#12302A] text-[#93A8A1] bg-[#071311]/20 hover:border-[#93A8A1]/30 hover:text-white"
            )}
          >
            {dept.name}
          </button>
        ))}
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full relative z-10 pb-16">
        {filteredAgents.length === 0 ? (
          <div className="col-span-full py-16 border border-dashed border-[#12302A] rounded-xl flex flex-col items-center justify-center text-center bg-[#071311]/20">
            <Filter className="w-10 h-10 text-[#526661] mb-4" />
            <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-1 font-bold">No Agents Matched</h3>
            <p className="text-[#93A8A1] text-xs max-w-xs leading-relaxed font-sans">
              Adjust your department filter or clarify search parameters to match active APEX enclaves.
            </p>
          </div>
        ) : (
          filteredAgents.map((agent, i) => {
            const AgentIcon = agent.icon;
            const deptColor = getDeptColor(agent.department);
            return (
              <div 
                key={`${agent.name}-${i}`}
                className="bg-[#071311] border border-[#12302A] hover:border-[var(--card-glow-color)] p-6 rounded-xl flex flex-col group transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                style={{ ['--card-glow-color' as any]: deptColor }}
              >
                {/* Header info */}
                <div className="flex items-start gap-4 mb-5">
                  <div 
                    className="w-10 h-10 rounded border flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
                    style={{ borderColor: `${deptColor}30`, backgroundColor: `${deptColor}05`, color: deptColor }}
                  >
                    <AgentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[#F2F5F4] font-mono text-xs uppercase tracking-wider font-bold mb-1 leading-tight">{agent.name}</h3>
                    <span 
                      className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
                      style={{ color: deptColor, backgroundColor: `${deptColor}10`, border: `1px solid ${deptColor}20` }}
                    >
                      {agent.department}
                    </span>
                    <p className="text-[#93A8A1] text-xs font-sans mt-3 leading-relaxed leading-normal">{agent.role}</p>
                  </div>
                </div>

                {/* Competencies */}
                <div className="mb-5 border-t border-[#12302A]/50 pt-4">
                  <span className="text-[9px] font-mono text-[#526661] uppercase tracking-widest block mb-2 font-bold">COMPETENCIES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.expertise.map((exp, expIdx) => (
                      <span 
                        key={expIdx}
                        className="px-2 py-0.5 rounded bg-[#020B0A] text-[10px] font-mono border border-[#12302A] text-[#93A8A1]"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div className="mb-5 border-t border-[#12302A]/50 pt-4">
                  <span className="text-[9px] font-mono text-[#526661] uppercase tracking-widest block mb-2 font-bold">DELIVERABLES</span>
                  <ul className="text-xs text-[#93A8A1] space-y-1.5">
                    {agent.deliverables.map((item, delIdx) => (
                      <li key={delIdx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: deptColor }} />
                        <span className="font-sans text-[11px] font-normal leading-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Command Feedback */}
                <div className="mt-auto pt-4 border-t border-[#12302A]/50 flex flex-col gap-1.5">
                  <span className="text-[9px] font-mono text-[#526661] uppercase tracking-widest block font-bold">ROUTER FEEDBACK</span>
                  <p className="text-[11px] font-mono text-[#F2F5F4] italic leading-normal bg-[#020B0A] p-2.5 rounded border border-[#12302A]/60 mb-3">
                    &gt; "{agent.sample}"
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setDeployModal(agent); }}
                    className="mt-2 w-full py-2 bg-[#12302A] hover:bg-[#00E5C3] hover:text-black transition-colors rounded text-[10px] font-bold uppercase tracking-wider text-[#00E5C3]">
                    Deploy Unit
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {deployModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#05110F] border border-[#00E5C3]/30 rounded-xl max-w-lg w-full flex flex-col shadow-2xl relative overflow-hidden">
            <div className="px-6 py-5 border-b border-[#00E5C3]/10 flex items-center gap-4">
              <deployModal.icon className="w-6 h-6 text-[#00E5C3]" />
              <div>
                <h3 className="font-mono text-[#F2F5F4] font-bold text-lg uppercase tracking-wider">Deploy Agent</h3>
                <p className="text-[#93A8A1] text-xs font-sans mt-1">Select configuration and priorities.</p>
              </div>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2 block">Selected Unit</label>
                <select className="w-full bg-[#020B0A] border border-[#12302A] rounded p-2 text-sm text-[#F2F5F4] outline-none">
                  {AGENTS_LIST.map(a => (
                     <option key={a.name} value={a.name} selected={a.name === deployModal.name}>{a.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2 block">Priority</label>
                <select className="w-full bg-[#020B0A] border border-[#12302A] rounded p-2 text-sm text-[#F2F5F4] outline-none">
                  <option value="CRITICAL">Critical Path (Immediate)</option>
                  <option value="HIGH">High Priority (Queue Next)</option>
                  <option value="STANDARD" selected>Standard (Backlog)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-[#00E5C3] mb-2 block">Memory Instructions</label>
                <textarea 
                  rows={4} 
                  placeholder="Inject initial context, variables, or specific directives..." 
                  className="w-full bg-[#020B0A] border border-[#12302A] rounded p-3 text-sm text-[#F2F5F4] outline-none resize-none placeholder:text-[#526661]"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-[#00E5C3]/10 bg-[#020B0A] flex justify-end gap-3">
              <button 
                onClick={() => setDeployModal(null)}
                className="px-4 py-2 border border-[#12302A] hover:bg-[#12302A] rounded font-mono text-xs uppercase tracking-wider text-[#93A8A1] transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  simulateTask(`Deploying ${deployModal.name}`);
                  setDeployModal(null);
                }}
                className="px-4 py-2 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] rounded font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_10px_rgba(0,229,195,0.2)]">
                Deploy Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
