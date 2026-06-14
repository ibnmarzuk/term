import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, ArrowRight, ShieldCheck, Cpu, Code2, Search, Target, FileText, 
  Layers, ChevronRight, MessageSquare, Plus, Minus, HelpCircle, CornerDownRight 
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import PublicLayout from '../components/PublicLayout';

export default function Landing() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);

  // Workflow steps implementation
  const workflowSteps = [
    {
      id: '01',
      title: 'Drop your input',
      desc: 'Paste a bounty, URL, PDF, brief, or GitHub repo. Any form, any source.',
      terminalHeader: '$ apex.execute --source=https://bounty.org/issue-77',
      terminalOutput: [
        '[SYSTEM] Ingesting request structure...',
        '[SYSTEM] Download of issue brief successful.',
        '[SYSTEM] Identified objective: Integrate OAuth token retention flow.',
        '[INGESTION_STAGE_NOMINAL]'
      ]
    },
    {
      id: '02',
      title: 'APEX analyzes',
      desc: 'The 6-stage pipeline — ingest, research, strategy, code, content, audit — runs in parallel.',
      terminalHeader: '$ apex.pipeline --monitor --active',
      terminalOutput: [
        '⚙️ [ENGINE 1] Extracting background guidelines...',
        '⚙️ [ENGINE 2] Scanning code directory path structures...',
        '⚙️ [ENGINE 3] Constructing modular strategy graph...',
        '⚙️ [ENGINE 4] Parallel processing in progress...'
      ]
    },
    {
      id: '03',
      title: 'Get a complete package',
      desc: 'Tabs for every output: research report, strategy, technical plan, content pack, submission kit.',
      terminalHeader: '$ apex.generate --package=full_bundle_release_v1_0',
      terminalOutput: [
        '✨ Build ready: /dist/package.zip',
        '✨ Included: /docs/specification.md',
        '✨ Included: /src/auth/token_persistence.tsx',
        '✨ Included: /tests/auth_persistence.test.ts'
      ]
    },
    {
      id: '04',
      title: 'Ship it',
      desc: 'Copy, download, submit. Every artifact is structured for the destination, not the chat.',
      terminalHeader: '$ apex.ship --destination=github-release',
      terminalOutput: [
        '🚀 Bundling production artifacts...',
        '🚀 Uploading payload to main branch...',
        '🚀 Submission package successfully deployed.',
        '🚀 Process completed in 18.2 seconds.'
      ]
    }
  ];

  // Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How is APEX OS different from ChatGPT or Claude?',
      a: 'Traditional LLM interfaces are chat-based and output recommendations or text segments that require you to manually copy, configure, paste, style, and test. APEX OS is an execution framework: it runs coordinate-level engines in parallel to assemble full, production-ready, structured directories, code suites, technical plans, and research documents, which you can download as finished zip bundles.'
    },
    {
      q: 'Does it actually write and compile executable code?',
      a: 'Yes. APEX compiles and lint-checks all created code structures using local sandboxed environments before packing the build. It works in major programming languages and integrates seamlessly with popular React/TypeScript configurations.'
    },
    {
      q: 'Can I integrate my existing codebase or custom repositories?',
      a: 'Indeed. Using our Pro or Team tiers, you can supply GitHub repository URLs, project folders, or specifications, and the APEX Multi-Modal and Code engines will parse the entire tree to provide contiguous edits that align with your existing conventions.'
    },
    {
      q: 'Is my data secure with APEX OS?',
      a: 'We respect corporate data safety mandates. All codebases, URLs, and inputs processed through APEX OS are run in ephemeral isolated containers that are destroyed immediately upon delivery. No data is stored or used for model fine-tuning.'
    }
  ];

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-20 overflow-hidden border-b border-[#1b1b1b]">
          {/* Subtle radar ambient circle in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00DCC4]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Version Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161616] border border-[#2a2a2a] rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00DCC4] animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5C1B9]">Execution OS • v1.2 • Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-mono uppercase tracking-tight font-bold text-white max-w-4xl mx-auto leading-none mb-6">
              Your AI <span className="text-[#00DCC4] underline decoration-[#00DCC4]/30">Execution</span> Team.<br />
              <span className="text-[#8B8680]">Not another chatbot.</span>
            </h1>

            {/* Subtext */}
            <p className="text-[#C5C1B9] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
              Hand APEX a bounty, brief, idea, or repo. Get back research, strategy, code, content, and a submission-ready package — finished work, not advice.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to={user ? "/command-center" : "/signup"} 
                className="w-full sm:w-auto px-8 py-3 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_35px_rgba(0,220,196,0.35)] shadow-[0_0_15px_rgba(0,220,196,0.15)]"
              >
                Start Executing <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#how-it-works" 
                className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#454545] hover:border-white text-white text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-colors duration-200 text-center"
              >
                See how it works
              </a>
            </div>

            {/* Badges/Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-[#1b1b1b]">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#8B8680]">
                <ShieldCheck className="w-4 h-4 text-[#00DCC4]" /> Paste any input
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#8B8680]">
                <Cpu className="w-4 h-4 text-[#00DCC4]" /> 6-stage pipeline
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#8B8680]">
                <Code2 className="w-4 h-4 text-[#00DCC4]" /> Submission-ready output
              </div>
            </div>
          </div>
        </section>


        {/* CAPABILITIES SECTION: One Platform, Five Engines */}
        <section className="py-20 border-b border-[#1b1b1b] bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// CAPABILITIES</span>
              <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold">
                One platform. Five engines.
              </h2>
              <p className="text-[#8B8680] text-xs sm:text-sm max-w-md mx-auto mt-3">
                APEX OS isn't a model wrapper. It's a coordinated execution stack that delivers complete outcomes.
              </p>
            </div>

            {/* Grid of 5 engines plus 1 multi-modal feature card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <Search className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Research Engine</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  Market signals, competitor mapping, opportunity surfaces — every angle covered before you commit.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <Target className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Strategy Engine</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  Winning positioning, ranked priorities, and the sharpest path to victory for your specific input.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <Code2 className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Code Engine</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  PRDs, architecture, file trees, deployment plans. From idea to implementation in one pass.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <FileText className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Content Engine</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  READMEs, threads, articles, docs, pitch decks. Launch materials that ship with the build.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <Layers className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Multi-Modal Input</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  Text, URLs, PDFs, DOCX, images, GitHub repos. APEX ingests anything you point it at.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-[#111111] border border-[#1b1b1b] hover:border-[#00DCC4]/40 hover:bg-[#151515] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00DCC4]/10 rounded border border-[#00DCC4]/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6">
                  <Zap className="w-5 h-5 text-[#00DCC4]" />
                </div>
                <h3 className="text-white font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Submission-Ready</h3>
                <p className="text-[#8B8680] text-xs leading-relaxed">
                  Every output is structured for the destination — hackathon, bounty, client, or launch.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* WORKFLOW PIPELINE: One input, complete execution */}
        <section id="how-it-works" className="py-20 border-b border-[#1b1b1b]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// WORKFLOW</span>
              <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold">
                One input. Complete execution.
              </h2>
              <p className="text-[#8B8680] text-xs sm:text-sm max-w-sm mx-auto mt-3">
                Select a stage below to dry-run the core APEX pipeline architecture.
              </p>
            </div>

            {/* Clickable steps block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left hand list */}
              <div className="space-y-4 lg:col-span-5">
                {workflowSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-6 rounded border transition-all duration-200 flex items-start gap-4 ${
                      activeStep === idx 
                        ? 'bg-[#111111] border-[#00DCC4] shadow-[0_0_15px_rgba(0,220,196,0.05)]' 
                        : 'bg-transparent border-[#1b1b1b] hover:bg-[#0c0c0c] hover:border-[#333]'
                    }`}
                  >
                    <span className={`font-mono text-lg font-bold ${activeStep === idx ? 'text-[#00DCC4]' : 'text-[#8B8680]'}`}>
                      {step.id}
                    </span>
                    <div>
                      <h3 className={`font-mono text-sm uppercase tracking-wider mb-1 font-semibold ${activeStep === idx ? 'text-white' : 'text-[#8B8680]'}`}>
                        {step.title}
                      </h3>
                      <p className="text-[#C5C1B9] text-xs font-sans leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right hand dynamic simulator */}
              <div className="lg:col-span-7 bg-[#0b0b0d] border border-[#1b1b1c] rounded-md p-6 font-mono text-[11px] h-72 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#1c1c1f] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/35" />
                    </div>
                    <span className="text-[10px] text-[#8B8680]">TERMINAL VIEW : SESSION 509</span>
                  </div>

                  <p className="text-[#00DCC4] mb-3 select-none flex items-center gap-1.5 font-bold">
                    <span className="text-[#8B8680] text-[9px]">apex_user_node</span>
                    {workflowSteps[activeStep].terminalHeader}
                  </p>

                  <div className="space-y-1.5 text-gray-400">
                    <AnimatePresence mode="popLayout">
                      {workflowSteps[activeStep].terminalOutput.map((outLine, oIdx) => (
                        <motion.p
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: oIdx * 0.1 }}
                          key={outLine}
                          className="flex items-center gap-1.5"
                        >
                          <CornerDownRight className="w-3 h-3 text-[#575ECF] flex-shrink-0" />
                          <span>{outLine}</span>
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t border-[#1c1c1f] pt-3 flex items-center justify-between text-[#8B8680] text-[10px]">
                  <span>PIPELINE POSITION: 0{activeStep + 1} / 04</span>
                  <span className="animate-pulse flex items-center gap-1 text-[#00DCC4] font-bold">
                    ● ACTIVE STREAM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* USE CASES SECTION: For builders who ship */}
        <section className="py-20 border-b border-[#1b1b1b] bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// USE CASES</span>
              <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold">
                For builders who ship.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Case 1 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Win Bounties
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    Drop the bounty URL — get back research on similar wins, strategy, full implementation plan, and submission pitch.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Bounties API Ready
                </span>
              </div>

              {/* Case 2 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Launch Startups
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    Idea to PRD to deployment plan to launch thread in one execution. Skip weeks of pre-build workspace noise.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Ephemeral sandboxes
                </span>
              </div>

              {/* Case 3 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Ship Client Work
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    Paste a brief, generate the deliverable package the client expects: scope, architecture, docs, hand-off.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Verified artifacts
                </span>
              </div>

              {/* Case 4 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Crush Hackathons
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    From theme to demo script in hours, not days. Judge-pack included.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Fast prototyping
                </span>
              </div>

              {/* Case 5 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Produce Content
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    Articles, threads, READMEs, documentation — generated as part of every project, not bolted on.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Text assets nominal
                </span>
              </div>

              {/* Case 6 */}
              <div className="p-6 bg-[#0c0c0d] border border-[#1b1b1b] rounded flex flex-col justify-between group hover:border-[#575ECF]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-white uppercase tracking-wider mb-2 font-bold group-hover:text-[#00DCC4] transition-colors">
                    Generate Code
                  </h3>
                  <p className="text-[#8B8680] text-xs leading-relaxed">
                    Architecture, file trees, key modules, deployment. Start with structure, not a blank page.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#575ECF] tracking-widest uppercase mb-1">
                  // Zero error compilation
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* PRICING CTAS: Buy execution, not tokens */}
        <section className="py-20 border-b border-[#1b1b1b]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// PRICING</span>
            <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold mb-4">
              Buy execution, not tokens.
            </h2>
            <p className="text-[#C5C1B9] text-xs sm:text-sm max-w-lg mx-auto mb-10 leading-relaxed">
              Transparent, flat fees for robust agent work. We absorb model parameters, latency spikes, and workspace load.
            </p>

            <div className="bg-[#0e0e11] border border-[#1c1c1f] rounded-lg p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between text-left gap-8 hover:border-[#00DCC4]/30 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#00DCC4]/10 text-[#00DCC4] text-[9px] font-mono rounded border border-[#00DCC4]/20">
                  ⚡ POPULAR: PRO ENGINE SUITE
                </div>
                <h3 className="font-mono text-lg text-white font-bold uppercase">APEX PRO OPERATIONS</h3>
                <p className="text-[#8B8680] text-xs max-w-sm">
                  Full parallel access to Research, Strategy, Code, Content, and Multi-modal modules. Fully isolated container pipelines.
                </p>
              </div>
              
              <div className="flex flex-col items-center md:items-end justify-center gap-3">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                  $29<span className="text-xs text-[#8B8680] font-normal">/mo</span>
                </div>
                <Link
                  to="/pricing"
                  className="px-6 py-2 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black font-mono text-xs font-bold rounded-sm uppercase tracking-wider transition-all duration-200"
                >
                  Configure Stack
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* TESTIMONIALS SECTION */}
        <section className="py-20 border-b border-[#1b1b1b] bg-[#080808]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// SIGNAL</span>
              <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold">
                Shipped work, real builders.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0e0e11] border border-[#1b1b1c] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#1c1c1f]" />
                <p className="text-[#C5C1B9] text-xs sm:text-sm italic leading-relaxed mb-6">
                  "I dropped a bounty link, walked away, came back to a complete submission package. APEX shipped what would have taken me a weekend."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-white font-semibold">Independent bounty hunter</h4>
                  <p className="text-[10px] text-[#8B8680] font-mono mt-0.5">@git_operator</p>
                </div>
              </div>

              <div className="bg-[#0e0e11] border border-[#1b1b1c] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#1c1c1f]" />
                <p className="text-[#C5C1B9] text-xs sm:text-sm italic leading-relaxed mb-6">
                  "We use APEX for every client brief now. The research and strategy alone saves us a full discovery day per project."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-white font-semibold">Founder, design studio</h4>
                  <p className="text-[10px] text-[#8B8680] font-mono mt-0.5">@design_studio</p>
                </div>
              </div>

              <div className="bg-[#0e0e11] border border-[#1b1b1c] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#1c1c1f]" />
                <p className="text-[#C5C1B9] text-xs sm:text-sm italic leading-relaxed mb-6">
                  "First hackathon I've placed in. The judge pack APEX generated was tighter than anything I would have written."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-white font-semibold">Hackathon winner</h4>
                  <p className="text-[10px] text-[#8B8680] font-mono mt-0.5">@ship_stack</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ ACCORDION SECTION */}
        <section className="py-20 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// FAQ</span>
              <h2 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold">
                Common questions.
              </h2>
            </div>

            <div className="border border-[#1b1b1b] rounded overflow-hidden">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div key={index} className="border-b border-[#1b1b1b] last:border-0 bg-[#0c0c0d]">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-[#111] transition-colors focus:outline-none"
                    >
                      <span className="font-mono text-sm text-white font-medium pr-4">{faq.q}</span>
                      <span className="text-[#8B8680]">
                        {isOpen ? <Minus className="w-4 h-4 text-[#00DCC4]" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 text-xs sm:text-sm text-[#C5C1B9] border-t border-[#1b1b1b] bg-[#09090b] leading-relaxed font-sans">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* FINAL HERO BANNER / READY TO ENTER THE COMMAND CENTER */}
        <section className="py-24 border-t border-[#1b1b1b] bg-radial bg-[radial-gradient(ellipse_at_bottom,rgba(0,220,196,0.05)_0%,rgba(0,0,0,0)_70%)] relative">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold leading-none mb-6">
              Enter the command center
            </h2>
            <p className="text-[#C5C1B9] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-10 font-sans">
              Connect your repositories, specify targets, launch parallel engines, and monitor results in real-time.
            </p>
            
            <Link
              to={user ? "/command-center" : "/signup"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-all duration-200 hover:shadow-[0_0_35px_rgba(0,220,196,0.35)] shadow-[0_0_15px_rgba(0,220,196,0.15)]"
            >
              Start Core execution <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </motion.div>
    </PublicLayout>
  );
}
