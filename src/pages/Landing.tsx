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
      title: 'Define Objectives',
      desc: 'Input your project idea, brief, request, or specify an existing Git target repository.',
      terminalHeader: '$ apex.execute --source=https://bounty.org/issue-77',
      terminalOutput: [
        '[SYSTEM] Parsing incoming target instructions...',
        '[SYSTEM] Successfully extracted objective parameters.',
        '[SYSTEM] Target: Integrate robust multi-origin secure data pipeline.',
        '[INGEST_STAGE_NOMINAL]'
      ]
    },
    {
      id: '02',
      title: 'Parallel Synthesis',
      desc: 'Our multi-threaded engines analyze specifications, research trends, and design structures simultaneously.',
      terminalHeader: '$ apex.pipeline --monitor --active',
      terminalOutput: [
        '⚙️ [INTELLIGENCE ENGINE] Mapping industry standards...',
        '⚙️ [STRATEGY ENGINE] Formulating step-by-step modular plan...',
        '⚙️ [CODE ENGINE] Provisioning type-safe container runtimes...',
        '⚙️ [ANALYSIS_ACTIVE]'
      ]
    },
    {
      id: '03',
      title: 'Assemble Deliverables',
      desc: 'Get compiled source branches, precise technical manuals, strategy blueprints, and launch assets.',
      terminalHeader: '$ apex.generate --package=full_bundle_release_v1_0',
      terminalOutput: [
        '✨ Build ready: /dist/package.zip',
        '✨ Included: /build/architecture_blueprint.json',
        '✨ Included: /src/auth/secure_vault_handshake.tsx',
        '✨ Included: /tests/vault_handshake.test.ts'
      ]
    },
    {
      id: '04',
      title: 'Launch Instantly',
      desc: 'Deploy direct to your repository, download raw bundles, or hand-off key modules immediately.',
      terminalHeader: '$ apex.ship --destination=github-release',
      terminalOutput: [
        '🚀 Consolidating production-ready modules...',
        '🚀 Injecting codebases directly to deployment branch...',
        '🚀 Package successfully delivered.',
        '🚀 Execution completed in 18.2 seconds.'
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
        <section className="relative py-24 overflow-hidden border-b border-[#12302A]">
          {/* Subtle radar ambient circle in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5C3]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Version Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#071311] border border-[#12302A] rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00E5C3] animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#93A8A1]">Execution OS • v1.2 • Live</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-mono uppercase tracking-tight font-bold text-[#F2F5F4] max-w-4xl mx-auto leading-none mb-6">
              Your AI <span className="text-[#00E5C3] underline decoration-[#00E5C3]/30">Execution</span> Team.<br />
              <span className="text-[#93A8A1]">Not another chatbot.</span>
            </h1>

            {/* Subtext */}
            <div className="max-w-3xl mx-auto mb-10 text-center">
              <p className="text-[#93A8A1] text-sm sm:text-base md:text-lg leading-relaxed font-sans mb-3 font-normal">
                Transition from tedious back-and-forth prompt engineering to deterministic system delivery. APEX coordinates parallel execution engines to analyze inputs, construct specifications, compile clean code, and assemble finished packages.
              </p>
              <p className="text-xs sm:text-sm font-mono text-[#00E5C3] tracking-wider uppercase">
                // Ephemeral Isolated Sandbox Run • Zero Code Retention
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to={user ? "/command-center" : "/signup"} 
                className="w-full sm:w-auto px-8 py-3 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-[0_0_35px_rgba(0,229,195,0.3)] shadow-[0_0_15px_rgba(0,229,195,0.15)]"
              >
                Start Executing <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#how-it-works" 
                className="w-full sm:w-auto px-8 py-3 bg-transparent border border-[#12302A] hover:border-[#00CFAE] text-[#F2F5F4] hover:text-[#00E5C3] text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-colors duration-200 text-center"
              >
                See how it works
              </a>
            </div>

            {/* Badges/Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-[#12302A]">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#93A8A1]">
                <ShieldCheck className="w-4 h-4 text-[#00E5C3]" /> Paste any input
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#93A8A1]">
                <Cpu className="w-4 h-4 text-[#00E5C3]" /> 6-stage pipeline
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#93A8A1]">
                <Code2 className="w-4 h-4 text-[#00E5C3]" /> Submission-ready output
              </div>
            </div>
          </div>
        </section>


        {/* CAPABILITIES SECTION: One Platform, Five Engines */}
        <section className="py-24 border-b border-[#12302A] bg-[#020B0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// CAPABILITIES</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                One platform. Five engines.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Build fully-realized software, verified reports, and launch specifications through parallel, specialized engines operating in memory-isolated environments.
              </p>
            </div>

            {/* Grid of 5 engines plus 1 multi-modal feature card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <Search className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Research Engine</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  Market signals, competitor mapping, opportunity surfaces — every angle covered before you commit.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <Target className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Strategy Engine</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  Winning positioning, ranked priorities, and the sharpest path to victory for your specific input.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <Code2 className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Code Engine</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  PRDs, architecture, file trees, deployment plans. From idea to implementation in one pass.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <FileText className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Content Engine</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  READMEs, promotional threads, technical briefs, and pitch decks. Launch materials that ship with the build.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <Layers className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Multi-Modal Input</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  Text, URLs, PDFs, DOCX, images, GitHub repos. APEX ingests anything you point it at.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-[#071311] border border-[#12302A] hover:border-[#00E5C3]/40 hover:bg-[#071311] p-6 rounded transition-all duration-300 group">
                <div className="w-10 h-10 bg-[#00E5C3]/10 rounded border border-[#12302A] flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-6 font-semibold">
                  <Zap className="w-5 h-5 text-[#00E5C3]" />
                </div>
                <h3 className="text-[#F2F5F4] font-mono text-sm uppercase tracking-wider mb-2 font-semibold">Submission-Ready</h3>
                <p className="text-[#93A8A1] text-xs leading-relaxed">
                  Every output is structured for the destination — hackathon, bounty, client, or launch.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* WORKFLOW PIPELINE: One input, complete execution */}
        <section id="how-it-works" className="py-24 border-b border-[#12302A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// WORKFLOW</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                One input. Complete execution.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Point our engines to a goal, brief, or repository. APEX coordinates parallel workers to analyze, draft, compile, and deliver production-ready packages instantly.
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
                        ? 'bg-[#071311] border-[#00E5C3] shadow-[0_0_15px_rgba(0,229,195,0.05)]' 
                        : 'bg-transparent border-[#12302A] hover:bg-[#071311] hover:border-[#12302A]'
                    }`}
                  >
                    <span className={`font-mono text-lg font-bold ${activeStep === idx ? 'text-[#00E5C3]' : 'text-[#93A8A1]'}`}>
                      {step.id}
                    </span>
                    <div>
                      <h3 className={`font-mono text-sm uppercase tracking-wider mb-1 font-semibold ${activeStep === idx ? 'text-[#F2F5F4]' : 'text-[#93A8A1]'}`}>
                        {step.title}
                      </h3>
                      <p className="text-[#93A8A1] text-xs font-sans leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right hand dynamic simulator */}
              <div className="lg:col-span-7 bg-[#071311] border border-[#12302A] rounded-md p-6 font-mono text-[11px] h-72 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <div>
                  <div className="flex items-center justify-between border-b border-[#12302A] pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00E5C3]/30" />
                    </div>
                    <span className="text-[10px] text-[#93A8A1]">TERMINAL VIEW : SESSION 509</span>
                  </div>

                  <p className="text-[#00E5C3] mb-3 select-none flex items-center gap-1.5 font-bold">
                    <span className="text-[#93A8A1] text-[9px]">apex_user_node</span>
                    {workflowSteps[activeStep].terminalHeader}
                  </p>

                  <div className="space-y-1.5 text-[#93A8A1]">
                    <AnimatePresence mode="popLayout">
                      {workflowSteps[activeStep].terminalOutput.map((outLine, oIdx) => (
                        <motion.p
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: oIdx * 0.1 }}
                          key={outLine}
                          className="flex items-center gap-1.5 text-xs text-[#93A8A1]"
                        >
                          <CornerDownRight className="w-3 h-3 text-[#00E5C3] flex-shrink-0" />
                          <span>{outLine}</span>
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t border-[#12302A] pt-3 flex items-center justify-between text-[#93A8A1] text-[10px]">
                  <span>PIPELINE POSITION: 0{activeStep + 1} / 04</span>
                  <span className="animate-pulse flex items-center gap-1 text-[#00E5C3] font-bold">
                    ● ACTIVE STREAM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* USE CASES SECTION: For builders who ship */}
        <section className="py-24 border-b border-[#12302A] bg-[#020B0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// USE CASES</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                For builders who ship.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Deploy, compile, and package your tasks inside secure workflows. From raw codebases to competitor maps, APEX delivers structured outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Case 1 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Win Bounties
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed">
                    Drop the bounty URL — get back research on similar wins, strategy, full implementation plan, and submission pitch.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Bounties API Ready
                </span>
              </div>

              {/* Case 2 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Launch Startups
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed">
                    Idea to PRD to deployment plan to launch thread in one execution. Skip weeks of pre-build workspace noise.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Ephemeral sandboxes
                </span>
              </div>

              {/* Case 3 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Ship Client Work
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed font-normal">
                    Paste a brief, generate the deliverable package the client expects: scope, architecture, manuals, hand-off.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Verified artifacts
                </span>
              </div>

              {/* Case 4 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Crush Hackathons
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed font-normal">
                    From theme to demo script in hours, not days. Judge-pack included.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Fast prototyping
                </span>
              </div>

              {/* Case 5 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Produce Content
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed font-normal">
                    Articles, promotional threads, READMEs, and technical guides — generated as part of every project automatically.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Text assets nominal
                </span>
              </div>

              {/* Case 6 */}
              <div className="p-6 bg-[#071311] border border-[#12302A] rounded flex flex-col justify-between group hover:border-[#00E5C3]/50 transition-colors">
                <div>
                  <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold group-hover:text-[#00E5C3] transition-colors">
                    Generate Code
                  </h3>
                  <p className="text-[#93A8A1] text-xs leading-relaxed font-normal">
                    Architecture, file trees, key modules, deployment. Start with structure, not a blank page.
                  </p>
                </div>
                <span className="mt-8 text-[10px] font-mono text-[#00E5C3] tracking-widest uppercase mb-1">
                  // Zero error compilation
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* PRICING CTAS: Buy execution, not tokens */}
        <section className="py-24 border-b border-[#12302A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// PRICING</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                Buy execution, not tokens.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Accelerate your engineering output with predictable, output-centric pricing. Access all core parallel engines with zero usage spikes, zero rate limits, and flat monthly billing.
              </p>
            </div>

            <div className="bg-[#071311] border border-[#12302A] rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center gap-8 hover:border-[#00E5C3]/40 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.4)] max-w-4xl mx-auto w-full">
              <div className="space-y-4 w-full text-center">
                <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block">// OPERATIONS</span>
                <h3 className="font-mono text-xl sm:text-3xl text-[#F2F5F4] font-bold uppercase tracking-tight">
                  APEX PRO OPERATIONS
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00E5C3]/10 text-[#00E5C3] text-[10px] font-mono rounded border border-[#12302A] tracking-wider uppercase mb-2">
                  ⚡ POPULAR: PRO ENGINE SUITE
                </div>
                <p className="text-[#93A8A1] text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                  Access our complete parallel suite of Research, Strategy, Code, and Asset modules. Every execution runs within a unique, isolated, and temporary sandbox enclave.
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center gap-4 border-t border-[#12302A]/60 pt-8 w-full max-w-md">
                <div className="text-3xl sm:text-5xl font-mono font-bold text-[#F2F5F4] tracking-tight">
                  $29<span className="text-sm text-[#93A8A1] font-normal">/mo</span>
                </div>
                <Link
                  to="/pricing"
                  className="px-8 py-3 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] font-mono text-xs font-bold rounded-sm uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,229,195,0.15)] hover:shadow-[0_0_25px_rgba(0,229,195,0.3)]"
                >
                  Configure Stack
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* TESTIMONIALS SECTION */}
        <section className="py-24 border-b border-[#12302A] bg-[#020B0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// SIGNAL</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                Shipped work, real builders.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Hear from the independent builders, design directors, and launch leads compiling deliverables with APEX workspaces every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#071311] border border-[#12302A] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#12302A]" />
                <p className="text-[#93A8A1] text-xs sm:text-sm italic leading-relaxed mb-6 font-sans font-normal">
                  "I dropped a bounty link, walked away, came back to a complete submission package. APEX shipped what would have taken me a weekend."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-[#F2F5F4] font-semibold">Independent bounty hunter</h4>
                  <p className="text-[10px] text-[#93A8A1] font-mono mt-0.5">@git_operator</p>
                </div>
              </div>

              <div className="bg-[#071311] border border-[#12302A] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#12302A]" />
                <p className="text-[#93A8A1] text-xs sm:text-sm italic leading-relaxed mb-6 font-sans font-normal">
                  "We use APEX for every client brief now. The research and strategy alone saves us a full discovery day per project."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-[#F2F5F4] font-semibold">Founder, design studio</h4>
                  <p className="text-[10px] text-[#93A8A1] font-mono mt-0.5">@design_studio</p>
                </div>
              </div>

              <div className="bg-[#071311] border border-[#12302A] p-6 rounded relative">
                <MessageSquare className="absolute right-6 top-6 w-8 h-8 text-[#12302A]" />
                <p className="text-[#93A8A1] text-xs sm:text-sm italic leading-relaxed mb-6 font-sans font-normal">
                  "First hackathon I've placed in. The judge pack APEX generated was tighter than anything I would have written."
                </p>
                <div>
                  <h4 className="font-mono text-xs text-[#F2F5F4] font-semibold">Hackathon winner</h4>
                  <p className="text-[10px] text-[#93A8A1] font-mono mt-0.5">@ship_stack</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ ACCORDION SECTION */}
        <section className="py-24 bg-[#020B0A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// FAQ</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                Common questions.
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Review critical parameters, sandbox lifecycles, and cryptographic standards of the APEX OS workspace.
              </p>
            </div>

            <div className="border border-[#12302A] rounded overflow-hidden">
              {faqs.map((faq, index) => {
                const isOpen = expandedFaq === index;
                return (
                  <div key={index} className="border-b border-[#12302A] last:border-0 bg-[#071311]">
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : index)}
                      className="w-full text-left p-6 flex justify-between items-center hover:bg-[#071311]/80 transition-colors focus:outline-none"
                    >
                      <span className="font-mono text-sm text-[#F2F5F4] font-medium pr-4">{faq.q}</span>
                      <span className="text-[#93A8A1]">
                        {isOpen ? <Minus className="w-4 h-4 text-[#00E5C3]" /> : <Plus className="w-4 h-4 text-[#00E5C3]" />}
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
                          <div className="p-6 pt-0 text-xs sm:text-sm text-[#93A8A1] border-t border-[#12302A] bg-[#020B0A] leading-relaxed font-sans font-normal">
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
        <section className="py-24 border-t border-[#12302A] bg-radial bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,195,0.05)_0%,rgba(0,0,0,0)_70%)] relative">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// COMMAND CENTER</span>
              <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
                Enter the command center
              </h2>
              <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
                Run your first execution within minutes. Experience the deterministic power of specialized parallel engines built to produce verified, deployment-ready software assets.
              </p>
            </div>
            
            <Link
              to={user ? "/command-center" : "/signup"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] text-xs font-mono font-bold rounded-sm tracking-widest uppercase transition-all duration-200 hover:shadow-[0_0_35px_rgba(0,229,195,0.3)] shadow-[0_0_15px_rgba(0,229,195,0.15)]"
            >
              Start Core execution <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </motion.div>
    </PublicLayout>
  );
}
