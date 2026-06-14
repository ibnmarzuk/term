import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Target, Code2, FileText, Layers, ShieldCheck, ArrowRight, Star, AlertCircle } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

export default function Features() {
  const [activeTab, setActiveTab] = useState('research');

  const engineDetails = [
    {
      id: 'research',
      icon: <Search className="w-5 h-5 text-[#00E5C3]" />,
      name: 'RESEARCH ENGINE',
      version: 'v2.1',
      stats: '3,800 tokens/sec',
      features: [
        'Real-time query grounding and competitor indexing.',
        'Market indicator evaluation and threat mitigation analysis.',
        'Structured tabular pricing and architecture grids.',
        'Automatic cross-reference of developer APIs.'
      ],
      desc: 'Retrieves current market data and performs real-time research grounding across the web, compiling information with references that go well beyond static training data.'
    },
    {
      id: 'strategy',
      icon: <Target className="w-5 h-5 text-[#00E5C3]" />,
      name: 'STRATEGY ENGINE',
      version: 'v1.4',
      stats: '1,200 paths/sec',
      features: [
        'Calculates threat models and opportunities.',
        'Generates actionable backlog items prioritized by effort vs impact.',
        'Suggests specific system structural adjustments.',
        'Extracts monetization tactics from current setups.'
      ],
      desc: 'Transforms insights from the Research Engine into fully mapped pathways of direct execution, providing prioritized tasks, design choices, and system models.'
    },
    {
      id: 'code',
      icon: <Code2 className="w-5 h-5 text-[#00E5C3]" />,
      name: 'CODE ENGINE',
      version: 'v3.0',
      stats: 'Zero-warn synthesis',
      features: [
        'Outputs TypeScript, ESM/CJS code structures, React styles.',
        'Conforms rigorously to clean architecture principles.',
        'Pre-checks files inside sandboxed Node environments.',
        'Includes unit tests in popular frameworks automatically.'
      ],
      desc: 'Builds beautiful, production-ready source code. Reusable, modular, and designed strictly under static typing conventions to enforce compilation reliability.'
    },
    {
      id: 'content',
      icon: <FileText className="w-5 h-5 text-[#00E5C3]" />,
      name: 'CONTENT ENGINE',
      version: 'v1.8',
      stats: '12,000 words/min',
      features: [
        'Creates human-friendly, highly structured reference manuals.',
        'Generates social media content sets (Twitter threads, newsletters).',
        'Crafts technical READMEs and setup scripts.',
        'Organizes marketing pitch outlines and product listings.'
      ],
      desc: 'Formulates beautiful, elegant copy, developer specifications, and press copy that is highly targeted and matches custom guidelines or developer styles.'
    },
    {
      id: 'multi-modal',
      icon: <Layers className="w-5 h-5 text-[#00E5C3]" />,
      name: 'MULTI-MODAL INPUT',
      version: 'v2.0',
      stats: '99.8% ingestion rate',
      features: [
        'Processes heavy PDF/HTML briefs instantly.',
        'Ingests images of design mocks to deduce front-end layouts.',
        'Reads raw file trees and full repository structures.',
        'Syncs with Google Workspace integrations.'
      ],
      desc: 'Ingests specifications, documents, codebases, wireframes, and raw telemetry data instantly without losing contextual accuracy over high-volume inputs.'
    }
  ];

  const currentTabDetails = engineDetails.find(e => e.id === activeTab) || engineDetails[0];

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// TECHNICAL SPECS</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            Engineered for pure delivery.
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            The APEX Core consists of five specialized systems working in lockstep. Each stage compiles its outputs for the next, wrapping up research, strategy, code, and content into unified deliverables.
          </p>
        </div>

        {/* Stateful Tabs layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Tab Selector Links */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#93A8A1] block mb-4">Select Core Engine</span>
            {engineDetails.map((engine) => (
              <button
                key={engine.id}
                onClick={() => setActiveTab(engine.id)}
                className={`w-full text-left px-5 py-4 rounded border transition-all flex items-center justify-between ${
                  activeTab === engine.id
                    ? 'bg-[#071311] border-[#00E5C3] text-[#F2F5F4] shadow-[0_0_15px_rgba(0,229,195,0.05)] font-bold'
                    : 'bg-transparent border-[#12302A] text-[#93A8A1] hover:bg-[#071311] hover:border-[#00CFAE]'
                }`}
              >
                <span className="font-mono text-xs tracking-wider flex items-center gap-3">
                  {engine.icon}
                  {engine.name}
                </span>
                <span className="font-mono text-[10px] text-[#00E5C3] font-bold">{engine.version}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="lg:col-span-8 bg-[#071311] border border-[#12302A] p-8 sm:p-10 rounded-lg min-h-[350px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Panel head */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#12302A] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-[#00E5C3]/10 rounded border border-[#12302A] text-[#00E5C3]">
                      {currentTabDetails.icon}
                    </span>
                    <div>
                      <h3 className="font-mono text-sm text-[#F2F5F4] font-bold">{currentTabDetails.name}</h3>
                      <p className="text-[10px] font-mono text-[#93A8A1] mt-0.5">Core Protocol Access: Active</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-[#00E5C3] block">PERFORMANCE RATE</span>
                    <span className="font-mono text-xs text-[#F2F5F4] font-bold">{currentTabDetails.stats}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#93A8A1] text-xs sm:text-sm leading-relaxed font-sans font-normal">
                  {currentTabDetails.desc}
                </p>

                {/* Features Checklist */}
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#93A8A1] block mb-3">Key Technical Targets</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#93A8A1]">
                    {currentTabDetails.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 font-normal">
                        <ShieldCheck className="w-4 h-4 text-[#00E5C3] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="border-t border-[#12302A] pt-6 mt-8 flex items-center justify-between text-[10px] font-mono text-[#93A8A1]">
              <span>STATUS: NOMINAL ENGINE TEMPERATURE</span>
              <span className="text-[#00E5C3] font-bold">// ENCLAVE READY</span>
            </div>
          </div>

        </div>

        {/* Global Pipeline Statistics Box */}
        <div className="bg-[#071311] border border-[#12302A] p-8 sm:p-12 rounded-lg text-center max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-2">
            <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// SECURE COMPILATION</span>
            <h2 className="text-xl sm:text-3xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
              Zero dependencies on third party visual chats.
            </h2>
            <p className="text-[#93A8A1] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-sans font-normal">
              Every build compiles internally, lints automatically, and submits. We isolate our compilers from third party outages or API latency spikes.
            </p>
          </div>
        </div>

      </motion.div>
    </PublicLayout>
  );
}
