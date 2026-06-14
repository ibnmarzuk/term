import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cpu, Server, Network, Shield, ArrowRight } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

export default function About() {
  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  const values = [
    {
      icon: <Cpu className="w-5 h-5 text-[#00E5C3]" />,
      title: 'Verifiable Output',
      desc: 'All compiled code is lint-checked, parsed into abstract syntax trees, and verification tested inside sandbox runtimes prior to packaging.'
    },
    {
      icon: <Server className="w-5 h-5 text-[#00E5C3]" />,
      title: 'Ephemeral Enclaves',
      desc: 'Execution engines spin up unique isolated containers for every single run. No user code persists inside our environment beyond completion.'
    },
    {
      icon: <Network className="w-5 h-5 text-[#00E5C3]" />,
      title: 'Decoupled Operations',
      desc: 'Rather than running on a single sequential thread, APEX decouples research, strategy, code, content, and auditing into distinct parallel systems.'
    }
  ];

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// OUR MANIFESTO</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            The execution stack model.
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            APEX OS was conceptualized as a response to the limitations of conversational LLM chats. Conversational interfaces place the cognitive and developmental burden on humans. We believe AI should be a direct delivery arm: taking inputs and spitting out fully refined, compiled, and audited solutions that are ready to go live.
          </p>
        </div>

        {/* CSS Block Diagram representing APEX pipeline */}
        <div className="mb-24 bg-[#071311] border border-[#12302A] p-8 sm:p-10 rounded-lg text-center">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00E5C3] mb-8 font-bold">// ARCHITECTURE MAP v1.2</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center justify-center font-mono text-[11px] text-center">
            
            {/* Box 1 */}
            <div className="p-4 bg-[#071311] border border-[#12302A] rounded flex flex-col items-center justify-center min-h-[90px]">
              <span className="text-[#00E5C3] font-bold mb-1">01. INGEST</span>
              <span className="text-[9px] text-[#93A8A1]">Decouple & Tokenize</span>
            </div>

            <div className="hidden md:block text-[#00E5C3] font-bold">➔</div>

            {/* Box 2 */}
            <div className="p-4 bg-[#071311] border border-[#12302A] rounded flex flex-col items-center justify-center min-h-[90px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00E5C3]/5 animate-pulse" />
              <span className="text-[#F2F5F4] font-bold mb-1">// DYNAMICS</span>
              <span className="text-[9px] text-[#00E5C3]">5 Parallel Engines</span>
            </div>

            <div className="hidden md:block text-[#00E5C3] font-bold">➔</div>

            {/* Box 3 */}
            <div className="p-4 bg-[#071311] border border-[#12302A] rounded flex flex-col items-center justify-center min-h-[90px]">
              <span className="text-[#00E5C3] font-bold mb-1">03. BUNDLE</span>
              <span className="text-[9px] text-[#93A8A1]">Package & Lint Code</span>
            </div>

          </div>
        </div>

        {/* core values list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {values.map((v, i) => (
            <div key={i} className="border-t border-[#12302A] pt-8">
              <div className="mb-4">{v.icon}</div>
              <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-2 font-bold">{v.title}</h3>
              <p className="text-[#93A8A1] text-xs leading-relaxed font-sans font-normal">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Team banner */}
        <div className="border border-[#12302A] bg-[#071311] p-8 sm:p-12 rounded flex flex-col items-center justify-center gap-8 text-center">
          <div className="w-full max-w-3xl">
            <h3 className="font-mono text-sm text-[#F2F5F4] uppercase tracking-wider mb-4 font-semibold">Join the Core OS Movement</h3>
            <p className="text-[#93A8A1] text-sm leading-relaxed font-sans font-normal">
              We are an agile group of systems engineers, compilers, and machine intelligence specialists operating out of Zurich and San Francisco. Let us know if you want to support or construct our next isolated runtime architectures.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-2 bg-transparent border border-[#12302A] hover:border-[#00CFAE] hover:text-[#00E5C3] text-[#F2F5F4] font-mono text-xs font-bold rounded-sm uppercase tracking-wide transition-all"
          >
            Inquire registry
          </Link>
        </div>

      </motion.div>
    </PublicLayout>
  );
}
