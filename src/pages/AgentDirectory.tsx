import { motion } from 'motion/react';
import { Network, LayoutTemplate, PenTool, Code, FileText, Type, BarChart, TrendingUp, Users, Plus } from 'lucide-react';

export default function AgentDirectory() {
  const agents = [
    {
      name: "Research Analyst",
      role: "Market & landscape intelligence",
      icon: Network,
      type: "research",
      expertise: ["Competitive analysis", "Market sizing", "Trend mapping"],
      deliverables: ["Research brief", "Competitor matrix", "Opportunity map"],
      sample: `"Researched 12 voting dApps, identified 3 unmet UX patterns, sized the Solana DAO market at 4.2k active treasuries."`
    },
    {
      name: "Product Designer",
      role: "UX flows and interaction design",
      icon: LayoutTemplate,
      type: "design",
      expertise: ["User flows", "IA", "Interaction patterns"],
      deliverables: ["Flow diagrams", "Wireframes", "Component specs"],
      sample: `"Mapped a 3-step proposal flow with a single-screen voting modal."`
    },
    {
      name: "Graphic Designer",
      role: "Visual identity and brand assets",
      icon: PenTool,
      type: "design",
      expertise: ["Logo systems", "Color & type", "Marketing visuals"],
      deliverables: ["Logo lockups", "Color tokens", "Social cards"],
      sample: `"Built a 5-color minimal palette with a wordmark and 3 social templates."`
    },
    {
      name: "Software Engineer",
      role: "Code generation & architecture",
      icon: Code,
      type: "engineering",
      expertise: ["Full-stack TS", "Smart contracts", "DevOps"],
      deliverables: ["File tree", "Source files", "Deployment notes"],
      sample: `"Shipped a Next.js + Anchor scaffold with 27 files and a one-click Vercel config."`
    },
    {
      name: "Technical Writer",
      role: "READMEs, API docs, developer onboarding",
      icon: FileText,
      type: "content",
      expertise: ["Dev docs", "Tutorials", "Reference"],
      deliverables: ["README", "Setup guide", "API reference"],
      sample: `"Drafted a 5-minute quickstart with copy-paste env setup."`
    },
    {
      name: "Content Writer",
      role: "Long-form & narrative content",
      icon: Type,
      type: "content",
      expertise: ["Articles", "Launch threads", "Pitch copy"],
      deliverables: ["Launch thread", "Article", "Submission pitch"],
      sample: `"Wrote an 8-tweet launch thread and a 300-word feature article."`
    },
    {
      name: "Business Developer",
      role: "Partnerships & revenue surfaces",
      icon: BarChart,
      type: "strategy",
      expertise: ["Partnership mapping", "Outreach"],
      deliverables: ["Partner list", "Outreach drafts"],
      sample: `"Identified 5 potential integration partners in the DeFi space."`
    },
    {
      name: "Growth Strategist",
      role: "Positioning & GTM",
      icon: TrendingUp,
      type: "strategy",
      expertise: ["Positioning", "Acquisition loops", "Metrics"],
      deliverables: ["Positioning brief", "GTM plan", "Metrics"],
      sample: `"Designed a referral loop projecting a 15% WoW growth rate."`
    },
    {
      name: "Community Manager",
      role: "Community ops & engagement",
      icon: Users,
      type: "community",
      expertise: ["Discord/X strategy", "Programs"],
      deliverables: ["Comms calendar", "Engagement playbook"],
      sample: `"Drafted a 4-week engagement plan for managing beta tester feedback."`
    }
  ];

  const getAgentColor = (type: string) => `var(--agent-${type}, var(--agent-default))`;

  return (
    <div className="flex flex-col h-full overflow-y-auto p-8 scrollbar-hide pb-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
           <div className="flex items-center gap-2 mb-4">
             <span className="text-[#00e59b] text-[10px] uppercase font-bold tracking-widest">// WORKFORCE</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">ACTIVE AGENTS (9)</h1>
           <p className="text-[#a1a1aa] text-[13px]">Configure, monitor, and deploy your specialized workforce.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#27272a] hover:bg-[#3f3f46] text-white transition-colors rounded-md text-[13px] font-medium w-fit border border-[#3f3f46]">
          <Plus className="w-4 h-4" /> Deploy New Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {agents.map((agent, i) => (
          <div 
            key={agent.name}
            className="bg-[#0b0c10] border border-[#27272a] rounded-xl p-5 flex flex-col group transition-all duration-300 hover:border-[var(--hover-border-color)]"
            style={{ 
              ['--hover-border-color' as any]: getAgentColor(agent.type) 
            }}
          >
            {/* Header Content */}
            <div className="flex items-start gap-4 mb-6">
              <div 
                className="w-10 h-10 rounded-md bg-[#050505] border flex items-center justify-center shrink-0 transition-colors"
                style={{ 
                  borderColor: 'var(--hover-border-color)',
                  color: 'var(--hover-border-color)' 
                }}
              >
                <agent.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col pt-1">
                <h3 className="text-white font-semibold text-[15px] leading-tight">
                  {agent.name}
                </h3>
                <p className="text-[#a1a1aa] text-[13px] mt-1">
                  {agent.role}
                </p>
              </div>
            </div>
            
            {/* Expertise */}
            <div className="mb-6">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] mb-3">
                EXPERTISE
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.expertise.map((exp, j) => (
                  <span 
                    key={j} 
                    className="px-2 py-1.5 rounded text-[11px] font-medium bg-[#18181b] border border-[#27272a]"
                    style={{ color: 'var(--hover-border-color)' }}
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] mb-3">
                DELIVERABLES
              </div>
              <ul className="text-[13px] text-[#e4e4e7] space-y-2">
                {agent.deliverables.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 before:content-['•']" style={{ ['--tw-content' as any]: '"•"', color: 'var(--hover-border-color)' }}>
                    <span className="text-[#e4e4e7]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample */}
            <div className="mt-auto pt-4 border-t border-[#27272a]">
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#71717a] mb-3">
                SAMPLE
              </div>
              <p className="text-[13px] text-[#a1a1aa] italic leading-relaxed">
                {agent.sample}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
