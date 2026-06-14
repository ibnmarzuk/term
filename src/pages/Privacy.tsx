import React from 'react';
import { motion } from 'motion/react';
import PublicLayout from '../components/PublicLayout';

export default function Privacy() {
  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold mb-8">// Privacy Policy</h1>
        <p className="text-[#8B8680] text-xs font-mono mb-8">LAST REVISION DATE: June 14, 2026</p>
        
        <div className="space-y-6 text-xs sm:text-sm text-[#C5C1B9] leading-relaxed font-sans">
          <p>
            Your privacy is a core technical invariant. At APEX OS, we engineer our pipelines under the assumption that user specifications, corporate data, and compiled repositories represent critical secrets.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">1. Non-Retention Policy</h3>
          <p>
            All custom inputs (brief documents, PDFs, raw instructions, or Git repositories) are loaded in memory-confined isolated enclaves. Upon pipeline completion and download bundle generation, these sandboxed runtimes are destroyed. No trace of your source materials survives on our infrastructure.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">2. Key Analytics and Diagnostics</h3>
          <p>
            We compile basic telemetry metadata (such as task durations, bandwidth spent, and engine outputs code completeness) purely to audit scaling capabilities and security profiles across the cluster. We never capture code strings or input parameters in these logs.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">3. Local Secure Operations</h3>
          <p>
            All secure credentials, sessions, and ID details are retained locally inside your client browser storage (`localStorage`) using standard origin sandboxing. They are never transmitted, leased, or routed through central indexing databases.
          </p>
        </div>
      </motion.div>
    </PublicLayout>
  );
}
