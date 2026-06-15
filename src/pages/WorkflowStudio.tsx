import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Play, Settings, Database, Server, Workflow, Sparkles, Network,
  Info, ShoppingBag, Eye, Star, Lock, Key, Link2, GitBranch, ArrowRight,
  ShieldAlert, RefreshCw, Layers, Sliders, AlertCircle, CheckCircle, Flame
} from 'lucide-react';
import { cn } from '../lib/utils';

// WORKFLOW STUDIO DATA
interface WorkflowNode {
  id: string;
  type: 'TRIGGER' | 'AGENT' | 'MCP' | 'LOOP';
  title: string;
  subtitle: string;
  x: number;
  y: number;
  status: 'NOMINAL' | 'IDLE' | 'ACTIVE';
}

const INITIAL_NODES: WorkflowNode[] = [
  { id: 'node-1', type: 'TRIGGER', title: "Repository Trigger Rule", subtitle: "Active push commit to master", x: 60, y: 120, status: 'NOMINAL' },
  { id: 'node-2', type: 'AGENT', title: "Security Engineer Agent", subtitle: "Audits target vulnerability trees", x: 260, y: 80, status: 'ACTIVE' },
  { id: 'node-3', type: 'AGENT', title: "Software Engineer Agent", subtitle: "Writes full-stack layouts", x: 260, y: 180, status: 'IDLE' },
  { id: 'node-4', type: 'MCP', title: "GitHub Integration", subtitle: "Create secure PR branch", x: 480, y: 125, status: 'IDLE' },
  { id: 'node-5', type: 'LOOP', title: "Linting Verification Checker", subtitle: "Repeats compile until flawless", x: 660, y: 125, status: 'IDLE' }
];

// MCP GATEWAY DATA
interface IntegrationConnector {
  id: string;
  name: string;
  category: 'DEVELOPMENT' | 'DATABASES' | 'AUTOMATION' | 'COMMUNICATION' | 'PRODUCTIVITY' | 'FINANCE' | 'CLOUD';
  status: 'CONNECTED' | 'DISCONNECTED';
  secretsConfigured: boolean;
  rateLimit: string;
  docsUrl: string;
}

const MCP_CONNECTORS: IntegrationConnector[] = [
  { id: 'github', name: "GitHub Repository Controller", category: 'DEVELOPMENT', status: 'CONNECTED', secretsConfigured: true, rateLimit: "5000req/hr", docsUrl: "/mcp/github" },
  { id: 'vercel', name: "Vercel Deployment Gateway", category: 'DEVELOPMENT', status: 'CONNECTED', secretsConfigured: true, rateLimit: "1200req/hr", docsUrl: "/mcp/vercel" },
  { id: 'supabase', name: "Supabase Database Client", category: 'DATABASES', status: 'DISCONNECTED', secretsConfigured: false, rateLimit: "2500req/hr", docsUrl: "/mcp/supabase" },
  { id: 'slack', name: "Slack Team Notifications", category: 'COMMUNICATION', status: 'CONNECTED', secretsConfigured: true, rateLimit: "1000req/hr", docsUrl: "/mcp/slack" },
  { id: 'stripe', name: "Stripe Billing Enclave", category: 'FINANCE', status: 'DISCONNECTED', secretsConfigured: false, rateLimit: "100req/min", docsUrl: "/mcp/stripe" },
  { id: 'gcp', name: "Google Cloud Engine Proxy", category: 'CLOUD', status: 'CONNECTED', secretsConfigured: true, rateLimit: "10000req/hr", docsUrl: "/mcp/gcp" },
  { id: 'n8n', name: "n8n Self-hosted Workflow Server", category: 'AUTOMATION', status: 'CONNECTED', secretsConfigured: true, rateLimit: "Unlimited", docsUrl: "/mcp/n8n" }
];

// MARKETPLACE DATA
interface MarketAsset {
  id: string;
  title: string;
  description: string;
  author: string;
  type: 'SKILL' | 'AGENT' | 'WORKFLOW' | 'MCP_CONNECTOR';
  downloads: string;
  rating: number;
  license: string;
}

const MARKETPLAYERS: MarketAsset[] = [
  { id: 'm-1', title: "Solidity Security Auditor Enclave", description: "Inject high-level static checking patterns direct to your smart contracts. Formulates detailed threat logs instantly.", author: "Security Council", type: 'AGENT', downloads: "4.8K", rating: 4.9, license: "Apache-2.0" },
  { id: 'm-2', title: "Fuzz Validation loop triggerer", description: "Automated loop workflow running compilation checks across 15 responsive viewports to verify boundary alignments.", author: "Vercel Core", type: 'WORKFLOW', downloads: "12.4K", rating: 4.8, license: "MIT" },
  { id: 'm-3', title: "PostgreSQL Advanced Indexer", description: "MCP integration allowing models to analyze queries, optimize primary keys, and index relational clusters.", author: "Supabase Engineers", type: 'MCP_CONNECTOR', downloads: "8.1K", rating: 5.0, license: "MIT" },
  { id: 'm-4', title: "Copywriter SEO Metadata generator", description: "Direct-action skill mapping relevant headings and head terms matching structural developer specs.", author: "Growth Labs", type: 'SKILL', downloads: "1.2K", rating: 4.5, license: "BSD-3" }
];

export default function WorkflowStudio() {
  const [activeSegment, setActiveSegment] = useState<'WORKFLOW' | 'MCP' | 'MARKETPLACE'>('WORKFLOW');
  
  // Workflow state controls
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [workflowActive, setWorkflowActive] = useState(false);

  // MCP filter states
  const [mcpFilter, setMcpFilter] = useState<string>('all');
  const [mcpSearch, setMcpSearch] = useState('');

  // Marketplace states
  const [marketType, setMarketType] = useState<string>('all');
  const [marketSearch, setMarketSearch] = useState('');

  // Node editing state simulation
  const handleTriggerNode = (id: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        const nextStatus = n.status === 'ACTIVE' ? 'IDLE' : 'ACTIVE';
        return { ...n, status: nextStatus };
      }
      return n;
    }));
  };

  const executePipelineWorkflow = () => {
    setWorkflowActive(true);
    // Mimic multi-agent dynamic workflow trigger transitions
    setNodes(prev => prev.map(n => n.type === 'TRIGGER' ? { ...n, status: 'ACTIVE' } : n));
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'node-2' ? { ...n, status: 'ACTIVE' } : n));
    }, 1200);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'node-3' ? { ...n, status: 'ACTIVE' } : n));
    }, 3200);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'node-4' ? { ...n, status: 'ACTIVE' } : n));
    }, 5500);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'node-5' ? { ...n, status: 'NOMINAL' } : n));
      setWorkflowActive(false);
    }, 8000);
  };

  const filteredMCP = MCP_CONNECTORS.filter(conn => {
    const matchesCat = mcpFilter === 'all' || conn.category === mcpFilter;
    const matchesQuery = conn.name.toLowerCase().includes(mcpSearch.toLowerCase()) || 
                          conn.category.toLowerCase().includes(mcpSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const filteredMarket = MARKETPLAYERS.filter(item => {
    const matchesType = marketType === 'all' || item.type === marketType;
    const matchesQuery = item.title.toLowerCase().includes(marketSearch.toLowerCase()) || 
                          item.description.toLowerCase().includes(marketSearch.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-8 scrollbar-hide pb-20 bg-[#020B0A] relative text-[#F2F5F4]">
      {/* Background radial matrix grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#12302A 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Header sections */}
      <div className="w-full max-w-6xl mx-auto mb-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#12302A] pb-6">
        <div>
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-2">// PIPELINE STUDIO & GATEWAY</span>
          <h1 className="text-3xl sm:text-4xl font-mono uppercase tracking-tight font-bold text-white mb-2">Workflow Studio</h1>
          <p className="text-[#93A8A1] text-xs sm:text-sm font-sans max-w-2xl leading-relaxed">
            Configure system-wide autonomous pipelines, connect to Vercel/GitHub/Supabase MCP enclaves via secure API Webhook channels, and marketplace elements.
          </p>
        </div>

        {/* Global actions */}
        <div className="mt-4 md:mt-0 flex gap-3 font-mono">
          <button 
            onClick={executePipelineWorkflow}
            disabled={workflowActive}
            className="w-full sm:w-auto px-4.5 py-2 hover:shadow-[0_0_12px_rgba(0,229,195,0.25)] bg-[#00E5C3] hover:bg-[#00CFAE] disabled:opacity-50 disabled:cursor-not-allowed text-[#02110E] transition-all rounded text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> {workflowActive ? 'Executing' : 'Run Studio'}
          </button>
        </div>
      </div>

      {/* Segment tab triggers */}
      <div className="w-full max-w-6xl mx-auto mb-8 border-b border-[#12302A] flex gap-1 bg-[#071311]/40 p-1 rounded-t-lg relative z-10 font-mono text-xs">
        <button
          onClick={() => setActiveSegment('WORKFLOW')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeSegment === 'WORKFLOW' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Workflow Studio Canvas
        </button>
        <button
          onClick={() => setActiveSegment('MCP')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeSegment === 'MCP' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          MCP Gateways & Auth
        </button>
        <button
          onClick={() => setActiveSegment('MARKETPLACE')}
          className={cn(
            "px-5 py-2.5 rounded-sm tracking-wider uppercase font-bold text-left cursor-pointer transition-colors",
            activeSegment === 'MARKETPLACE' ? "bg-[#00E5C3]/10 text-[#00E5C3] border-b border-[#00E5C3]" : "text-[#93A8A1] hover:text-white"
          )}
        >
          Marketplace Enclave
        </button>
      </div>

      {/* LAYOUT RENDERER */}
      <div className="w-full max-w-6xl mx-auto relative z-10 mb-12">
        <AnimatePresence mode="wait">
          
          {/* SEGMENT 1: WORKFLOW STUDIO CANVAS */}
          {activeSegment === 'WORKFLOW' && (
            <motion.div 
              key="workflow-studio-canvas"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4.5 rounded-xl shadow-md font-sans text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest font-bold mb-1">Visual Multi-Agent Chain Builder</h3>
                  <p className="text-[#93A8A1] font-sans text-xs">Establish triggers, assign specialist enclaves, link to active integration endpoints, and write persistent conditional logic loops.</p>
                </div>
                <div className="flex gap-2 font-mono text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#00E5C3]" /> Active execution</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#12302A]" /> Ready standby</span>
                </div>
              </div>

              {/* Graphical Visual Node Grid */}
              <div className="w-full border border-[#12302A] bg-[#020B0A] rounded-xl relative overflow-hidden min-h-[440px] shadow-inner p-8 flex flex-col justify-between">
                
                {/* Visual node alignment sandbox */}
                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ background: "linear-gradient(#12302A 1px, transparent 1px) 0 0/20px 20px, linear-gradient(90deg, #12302A 1px, transparent 1px) 0 0/20px 20px" }} />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-4 my-auto w-full">
                  {nodes.map((node, i) => (
                    <React.Fragment key={node.id}>
                      {/* Connection indicator */}
                      {i > 0 && (
                        <div className="hidden md:flex items-center justify-center text-[#526661] shrink-0">
                          <ArrowRight className="w-5 h-5 animate-pulse" />
                        </div>
                      )}
                      
                      {/* Node block */}
                      <div 
                        onClick={() => handleTriggerNode(node.id)}
                        className={cn(
                          "w-full md:w-[200px] border rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md",
                          node.status === 'ACTIVE' 
                            ? "bg-[#00E5C3]/10 border-[#00E5C3] shadow-[0_0_15px_rgba(0,229,195,0.15)] scale-[1.03]" 
                            : node.status === 'NOMINAL' 
                            ? "bg-[#01ffd4]/5 border-[#12302A] opacity-75" 
                            : "bg-[#071311] border-[#12302A] hover:border-[#93A8A1]/30"
                        )}
                      >
                        <div className="flex items-center justify-between font-mono text-[9px] text-[#526661] uppercase tracking-wider mb-2 font-bold border-b border-[#12302A]/40 pb-1">
                          <span>{node.type}</span>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            node.status === 'ACTIVE' ? "bg-[#ffd000] animate-ping" : "bg-[#526661]"
                          )} />
                        </div>
                        <h4 className="text-white font-mono text-[11px] uppercase tracking-tight font-semibold mb-1 truncate">{node.title}</h4>
                        <p className="text-[#93A8A1] text-[10px] font-sans leading-normal line-clamp-2">{node.subtitle}</p>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                {/* Footer specs inside grid */}
                <div className="relative z-10 border-t border-[#12302A]/40 pt-4 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono text-[#526661] gap-2">
                  <span>DEPLOYABLE WORKFLOW SPECS STATUS</span>
                  <div className="flex gap-4">
                    <span>Active Chained Nodes: 05</span>
                    <span>MCP Endpoints: v1.5 API Verified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEGMENT 2: MCP CONNECTOR GATEWAYS */}
          {activeSegment === 'MCP' && (
            <motion.div 
              key="mcp-gateways"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow-md">
                <h3 className="font-mono text-sm uppercase tracking-widest font-bold text-white mb-1">Decoupled Integration Gateway (500+ Endpoints)</h3>
                <p className="text-xs text-[#93A8A1] font-sans">Verify secret variables, authorize OAuth handshakes safely, and inspect live endpoint constraints.</p>
              </div>

              {/* Filtering mechanism */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-1.5 overflow-x-auto scrollbar-none font-mono text-xs w-full sm:w-auto">
                  {['all', 'DEVELOPMENT', 'DATABASES', 'COMMUNICATION', 'FINANCE', 'CLOUD'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setMcpFilter(cat)}
                      className={cn(
                        "px-3 py-1.5 border rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer",
                        mcpFilter === cat 
                          ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3]" 
                          : "border-[#12302A] text-[#93A8A1] bg-[#071311]/50 hover:border-[#93A8A1]/30"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center bg-[#071311] border border-[#12302A] rounded px-3 py-1.5 w-full sm:max-w-xs font-mono text-xs">
                  <Database className="w-4 h-4 text-[#526661] mr-2" />
                  <input 
                    type="text" 
                    value={mcpSearch}
                    onChange={(e) => setMcpSearch(e.target.value)}
                    placeholder="Search connectors..."
                    className="bg-transparent text-xs text-white outline-none w-full placeholder:text-[#526661] font-sans"
                  />
                </div>
              </div>

              {/* Connector list grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMCP.map((conn) => (
                  <div key={conn.id} className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between shadow-md min-h-[170px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2 mb-3 font-mono text-[9px] text-[#526661] uppercase tracking-widest font-bold">
                        <span>{conn.category}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            conn.status === 'CONNECTED' ? "bg-[#00E5C3]" : "bg-[#f43f5e]"
                          )} />
                          <span className="text-[10px] font-mono leading-none">{conn.status}</span>
                        </div>
                      </div>

                      <h4 className="font-mono text-xs uppercase font-bold text-white mb-2">{conn.name}</h4>
                      
                      <div className="flex flex-col gap-1 text-[11px] font-mono text-[#93A8A1] bg-[#020B0A] p-2 rounded border border-[#12302A]/50 mb-4">
                        <div className="flex items-center justify-between">
                          <span>API Secret Keys</span>
                          <span className={cn(
                            "text-[9px] uppercase font-bold",
                            conn.secretsConfigured ? "text-[#00E5C3]" : "text-[#526661]"
                          )}>
                            {conn.secretsConfigured ? 'MASKED' : 'MISSING'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Rate Limits</span>
                          <span>{conn.rateLimit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#12302A]/40 flex gap-2 font-mono text-[10px]">
                      <button className="flex-1 py-1.5 bg-[#020B0A] hover:bg-[#12302A]/20 text-white rounded border border-[#12302A] hover:border-[#93A8A1]/30 cursor-pointer uppercase font-bold transition-all text-[10px]">
                        Diagnostics
                      </button>
                      <button className="px-3.5 py-1.5 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] rounded font-bold transition-all cursor-pointer uppercase text-[10px]">
                        OAuth
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* SEGMENT 3: MARKETPLACE ENCLAVE */}
          {activeSegment === 'MARKETPLACE' && (
            <motion.div 
              key="marketplace-enclave"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#071311] border border-[#12302A] p-4 rounded-xl shadow-md">
                <h3 className="font-mono text-sm uppercase tracking-widest font-bold text-white mb-1">Shared Marketplace Enclave</h3>
                <p className="text-xs text-[#93A8A1] font-sans">Install decentralized workflow templates, pre-made agent skill rules, and specialized connectors built by core systems designers.</p>
              </div>

              {/* Filtering mechanism */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-1.5 overflow-x-auto scrollbar-none font-mono text-xs w-full sm:w-auto">
                  {['all', 'AGENT', 'WORKFLOW', 'MCP_CONNECTOR', 'SKILL'].map(t => (
                    <button
                      key={t}
                      onClick={() => setMarketType(t)}
                      className={cn(
                        "px-3 py-1.5 border rounded-full text-[10px] uppercase font-bold tracking-wider cursor-pointer",
                        marketType === t 
                          ? "bg-[#00E5C3]/10 border-[#00E5C3] text-[#00E5C3]" 
                          : "border-[#12302A] text-[#93A8A1] bg-[#071311]/50 hover:border-[#93A8A1]/30"
                      )}
                    >
                      {t.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="flex items-center bg-[#071311] border border-[#12302A] rounded px-3 py-1.5 w-full sm:max-w-xs font-mono text-xs">
                  <ShoppingBag className="w-4 h-4 text-[#526661] mr-2" />
                  <input 
                    type="text" 
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                    placeholder="Search assets..."
                    className="bg-transparent text-xs text-white outline-none w-full placeholder:text-[#526661] font-sans"
                  />
                </div>
              </div>

              {/* Marketplace items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredMarket.map((item) => (
                  <div key={item.id} className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between shadow-md min-h-[190px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#12302A]/40 pb-2 mb-3.5 font-mono text-[9px] text-[#526661] uppercase tracking-widest font-bold">
                        <span>{item.type.replace('_', ' ')}</span>
                        <div className="flex items-center gap-1.5 text-[#ffd000]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-[10px] font-mono leading-none">{item.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <h4 className="font-mono text-xs uppercase font-bold text-white mb-2 leading-snug">{item.title}</h4>
                      <p className="text-[#93A8A1] text-xs font-sans leading-relaxed leading-normal">{item.description}</p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#12302A]/40 flex items-center justify-between font-mono text-[10px] text-[#526661]">
                      <div className="flex gap-4">
                        <span>Downloads: {item.downloads}</span>
                        <span>License: {item.license}</span>
                      </div>
                      <button className="px-3.5 py-1.5 bg-[#00E5C3]/10 hover:bg-[#00E5C3]/25 border border-[#00E5C3] text-[#00E5C3] rounded font-bold uppercase transition-all cursor-pointer text-[10px]">
                        Install Skill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
