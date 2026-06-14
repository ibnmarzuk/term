import { Bot, Search, Brain, Code, Palette, Settings, Database, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function AgentDirectory() {
  const agents = [
    { name: "Research Agent", role: "Data Mining", confidence: 98, status: "RUNNING", icon: Search, color: "primary", description: "Advanced pattern recognition and data synthesis specialist." },
    { name: "Software Engineer", role: "Fullstack", confidence: 96, status: "WAITING", icon: Code, color: "tertiary", description: "Full-stack autonomous developer specializing in modern TS frameworks." },
    { name: "Product Designer", role: "UI/UX", confidence: 94, status: "COMPLETED", icon: Palette, color: "secondary", description: "Systematic UI/UX architect with a focus on accessibility and motion." },
    { name: "AI Engineer", role: "LLMs", confidence: 99, status: "RUNNING", icon: Brain, color: "error", description: "Large Language Model fine-tuning and retrieval optimization expert." },
  ];

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
        <div>
          <div className="code-md label-caps text-primary mb-xs">NEURAL_NET_MAINFRAME</div>
          <h2 className="headline-lg text-on-surface tracking-tight">Agent Directory</h2>
          <p className="text-on-surface-variant body-sm max-w-lg mt-sm">Orchestrate your autonomous workflow with specialized AI entities. Monitor performance, confidence scores, and current execution states.</p>
        </div>
        <div className="flex gap-md">
          <button className="bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/20 px-lg py-sm rounded-lg flex items-center gap-sm transition-all body-sm">
            <Settings className="w-4 h-4" /> Filter
          </button>
          <button className="bg-primary-container text-white px-lg py-sm rounded-lg flex items-center gap-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 body-sm font-semibold">
            Deploy Agent
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
        {agents.map((agent, i) => (
          <motion.div 
            key={agent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-lg flex flex-col group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-lg">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-${agent.color} bg-${agent.color}/10 border border-${agent.color}/20`}>
                <agent.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-sm">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                  agent.status === 'RUNNING' ? 'bg-secondary/10 text-secondary border border-secondary/20' :
                  agent.status === 'WAITING' ? 'bg-tertiary/10 text-tertiary border border-tertiary/20' :
                  agent.status === 'COMPLETED' ? 'bg-primary/10 text-primary border border-primary/20' :
                  agent.status === 'ERROR' ? 'bg-error/10 text-error border border-error/20' :
                  'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                }`}>
                  {agent.status}
                </span>
                {agent.status === 'RUNNING' ? (
                  <div className={`w-2 h-2 rounded-full bg-secondary animate-pulse`} />
                ) : agent.status === 'ERROR' ? (
                  <div className={`w-2 h-2 rounded-full bg-error animate-pulse`} />
                ) : (
                  <div className={`w-2 h-2 rounded-full bg-outline-variant`} />
                )}
              </div>
            </div>
            
            <h3 className="title-md text-on-surface mb-xs group-hover:text-primary transition-colors flex items-center gap-2">
              {agent.name}
            </h3>
            <p className="text-on-surface-variant body-sm mb-lg">{agent.description}</p>
            
            <div className="space-y-md mt-auto">
              <div className="flex justify-between items-center">
                <span className="label-caps text-outline">CONFIDENCE</span>
                <span className={`title-md font-bold text-${agent.color}`}>{agent.confidence}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1 overflow-hidden">
                <div className={`bg-${agent.color} h-full rounded-full`} style={{ width: `${agent.confidence}%` }}></div>
              </div>
              
              <div className="pt-md border-t border-outline-variant/10 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-outline uppercase code-md">Specialization</span>
                  <span className="body-sm font-medium">{agent.role}</span>
                </div>
                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                  →
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-xl glass-panel rounded-xl overflow-hidden">
        <div className="bg-surface-container-highest px-lg py-sm flex items-center justify-between border-b border-outline-variant/10">
          <div className="flex gap-sm items-center">
            <Activity className="w-4 h-4 text-outline" />
            <span className="code-md text-[10px] text-outline">EXECUTION_LOG.SH</span>
          </div>
        </div>
        <div className="p-lg bg-surface-container-lowest code-md text-on-surface-variant space-y-xs opacity-80 h-48 overflow-y-auto">
          <p><span className="text-primary">root@apex_os:~$</span> initializing_neural_bridge...</p>
          <p><span className="text-secondary">[OK]</span> Research Agent connected via DataStream-V4</p>
          <p><span className="text-secondary">[OK]</span> AI Engineer processing fine-tuning request (Shard 242)</p>
          <p><span className="text-tertiary opacity-80">[WARN]</span> Latency spike detected in LLM inference gateway</p>
          <p><span className="text-primary">root@apex_os:~$</span> monitoring active agents... <span className="animate-pulse">_</span></p>
        </div>
      </div>
    </div>
  );
}
