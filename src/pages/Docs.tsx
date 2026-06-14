import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, BookOpen, Key, Globe, Layers, ArrowUpRight, HelpCircle, CornerDownRight } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

export default function Docs() {
  const [activeDoc, setActiveDoc] = useState('getting-started');

  const docSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Terminal className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-mono text-white font-bold uppercase">// 1. Getting Started</h2>
          <p className="text-xs sm:text-sm text-[#C5C1B9] leading-relaxed">
            Welcome to the APEX OS Core Protocol Documentation. APEX OS executes parallel analytical and compilation tasks directly inside sandboxed container environments. To get started, you can input your project goals in the secure UI or call our compiler from client terminal nodes.
          </p>
          
          <div className="bg-[#0b0b0d] border border-[#1b1b1c] rounded p-5 font-mono text-[11px] text-[#C5C1B9] space-y-2">
            <p className="text-[#00DCC4] font-bold"># Step 1: Boot client sandbox and inspect tools</p>
            <p className="text-gray-500">$ apex login --token=YOUR_API_TOKEN</p>
            <p className="text-[#00DCC4]">$ apex execute --bounty="Create a clean authentication retention hook in React"</p>
            <p className="text-gray-500 mt-2">[INFO] Ingestion stage launched...</p>
            <p className="text-gray-500">[INFO] Synthesizing workspace structure...</p>
            <p className="text-emerald-400 font-bold">[SUCCESS] Package compiled in 14.5s. Download payload: /dist/pkg.zip</p>
          </div>

          <p className="text-xs sm:text-sm text-[#C5C1B9] leading-relaxed">
            By running instructions with the `execute` parameters, the platform invokes five distinct specialized engines to carry out research, generate detailed technical specifications, construct files, and audit variables against syntax targets.
          </p>
        </div>
      )
    },
    {
      id: 'configuration',
      title: 'Pipeline Parameters',
      icon: <Layers className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-mono text-white font-bold uppercase">// 2. Pipeline Parameters</h2>
          <p className="text-xs sm:text-sm text-[#C5C1B9] leading-relaxed">
            You can customize container build behavior by attaching configuration arguments or placing an `.apexignore` target declaration inside the root directory.
          </p>

          <div className="bg-[#0b0b0d] border border-[#1b1b1c] rounded p-5">
            <h4 className="font-mono text-xs text-white uppercase mb-4 tracking-wider">Example Apex Script Syntax</h4>
            <pre className="font-mono text-[11px] text-[#C5C1B9] leading-relaxed">
{`{
  "project": "APEX_OS_INTEGRATION",
  "engine_concurrency": 5,
  "sandboxing": {
    "node_version": "20.x",
    "ephemeral": true
  },
  "exclude_patterns": [
    "**/node_modules/**",
    "**/dist/**"
  ]
}`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: 'api-access',
      title: 'Core API Integration',
      icon: <Globe className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-mono text-white font-bold uppercase">// 3. Core API Integration</h2>
          <p className="text-xs sm:text-sm text-[#C5C1B9] leading-relaxed">
            Our private API routes let you execute jobs programmatically from continuous integration pipelines, allowing automatic code repairs, PR updates, and backlog sweeps to trigger automatically.
          </p>
          
          <div className="bg-[#0b0b0d] border border-[#1b1b1c] rounded p-5 font-mono text-[11px] text-[#C5C1B9]">
            <p className="text-amber-400 font-bold">POST https://api.apex.os/v1/execute</p>
            <p className="text-gray-500">Headers: Authorization: Bearer apex_secret_token_x99</p>
            <p className="text-gray-500">Payload: {"{ \"prompt\": \"Update Signup form styling in App.tsx\" }"}</p>
          </div>
        </div>
      )
    }
  ];

  const activeDocContent = docSections.find(d => d.id === activeDoc) || docSections[0];

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Docs Sidebar Selector */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8B8680] block mb-2">// PROTOCOL SECTIONS</span>
            <div className="space-y-1">
              {docSections.map((sect) => (
                <button
                  key={sect.id}
                  onClick={() => setActiveDoc(sect.id)}
                  className={`w-full text-left px-4 py-3 rounded border font-mono text-xs tracking-wider transition-all flex items-center gap-3 ${
                    activeDoc === sect.id
                      ? 'bg-[#111] border-[#00DCC4] text-[#00DCC4]'
                      : 'bg-transparent border-transparent text-[#8B8680] hover:bg-[#0c0c0c] hover:text-white'
                  }`}
                >
                  {sect.icon}
                  {sect.title}
                </button>
              ))}
            </div>
          </div>

          {/* Docs Body Content */}
          <div className="lg:col-span-9 bg-[#08080a] border border-[#1b1b1c] p-8 sm:p-10 rounded-lg min-h-[500px]">
            {activeDocContent.content}
          </div>

        </div>

      </motion.div>
    </PublicLayout>
  );
}
