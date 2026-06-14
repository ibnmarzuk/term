import React from 'react';
import { motion } from 'motion/react';
import PublicLayout from '../components/PublicLayout';

export default function Terms() {
  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-4xl font-mono uppercase tracking-tight text-white font-bold mb-8">// Terms of Service</h1>
        <p className="text-[#8B8680] text-xs font-mono mb-8">LAST REVISION DATE: June 14, 2026</p>
        
        <div className="space-y-6 text-xs sm:text-sm text-[#C5C1B9] leading-relaxed font-sans">
          <p>
            Welcome to APEX OS ("We", "Us", or "Our"). By accessing or initializing execution tasks inside this platform, you agree to comply with and be bound by these Terms of Service.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">1. Accounts and Core ID Initialization</h3>
          <p>
            You are responsible for protecting the credentials used to initialize your secure Operator ID. Any execution pipelines launched under your account are assumed to be authorized operations on your behalf.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">2. Permitted Pipeline Usage</h3>
          <p>
            You may not use our cloud compilation sandboxes or parallel engines to assemble software designed to compromise or disrupt secondary servers, networks, or connected directories.
          </p>

          <h3 className="font-mono text-sm text-white uppercase tracking-wider font-semibold pt-4">3. Ephemeral Sandbox Enclaves</h3>
          <p>
            The user retains full, unrestricted ownership over all synthesized code modules, directory zip exports, and text summaries compiled inside APEX OS containers. We do not inspect, retain, or fine-tune models on your private payloads.
          </p>
        </div>
      </motion.div>
    </PublicLayout>
  );
}
