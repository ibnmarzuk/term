import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HelpCircle, ArrowRight, Layers, MessageSquare, Sparkles } from 'lucide-react';
import PublicLayout from '../components/PublicLayout';

export default function Pricing() {
  const [estimatedExecutions, setEstimatedExecutions] = useState(15);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Operator',
      price: 0,
      desc: 'For solo developers exploring automated workspaces.',
      features: [
        '5 execution projects per month',
        'Direct access to Core 5 engines',
        'Text & URL brief ingestion',
        'Community support channels',
        'Ephemeral container execution'
      ],
      tag: 'FREE TRIAL',
      highlight: false
    },
    {
      name: 'Pro Operations',
      price: billingCycle === 'monthly' ? 29 : 24,
      desc: 'For builders shipping production-ready output regularly.',
      features: [
        'Unlimited execution projects',
        'Multi-modal input (PDF, DOC, Images)',
        'GitHub repository imports',
        'Priority pipeline priority queue',
        'Export all workspace ZIP bundles',
        'Direct support channels'
      ],
      tag: 'MOST POPULAR',
      highlight: true
    },
    {
      name: 'Team Enclave',
      price: billingCycle === 'monthly' ? 99 : 79,
      desc: 'For design studios and core startups shipping collaboratively.',
      features: [
        'All Pro Operations features included',
        '5 individual operator licenses included',
        'Shared group workspaces',
        'Private webhook & API endpoints',
        'Custom execution instructions',
        'Dedicated success coordinator'
      ],
      tag: 'ENTERPRISE LEVEL',
      highlight: false
    }
  ];

  // Logic to determine recommended plan from calculator
  const getRecommendedPlan = () => {
    if (estimatedExecutions <= 5) return 'Operator';
    if (estimatedExecutions <= 40) return 'Pro Operations';
    return 'Team Enclave';
  };

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <PublicLayout>
      <motion.div {...pageTransition} className="relative z-10 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pricing Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// COMMERCE</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6 font-mono">
            Buy execution, not tokens.
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Choose a flat billing cycle that matches your delivery speed. No usage spikes, hidden server fees, or model rate limits.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#071311] border border-[#12302A] rounded-full mt-8 font-mono text-[10px]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full transition-colors font-bold cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#00E5C3] text-[#02110E]' : 'text-[#93A8A1] hover:text-[#F2F5F4]'
              }`}
            >
              MONTHLY BILLING
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full transition-colors font-bold flex items-center gap-1.5 cursor-pointer ${
                billingCycle === 'yearly' ? 'bg-[#00E5C3] text-[#02110E]' : 'text-[#93A8A1] hover:text-[#F2F5F4]'
              }`}
            >
              YEARLY SAVINGS <span className="bg-[#00E5C3] text-[#02110E] px-1.5 py-0.5 rounded text-[8px] tracking-wide font-extrabold">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-[#071311] ${
                plan.highlight
                  ? 'border-[#00E5C3] shadow-[0_0_40px_rgba(0,229,195,0.1)]'
                  : 'border-[#12302A] hover:border-[#12302A]/80'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-4 right-4 bg-[#00E5C3]/10 text-[#00E5C3] font-mono text-[8px] font-bold px-2 py-0.5 rounded border border-[#00E5C3]/20">
                  {plan.tag}
                </div>
              )}
              
              <div>
                {/* Header */}
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#93A8A1] block mb-1">
                    {plan.name === 'Operator' ? plan.tag : ''}
                    {plan.name === 'Team Enclave' ? plan.tag : ''}
                    {plan.name === 'Pro Operations' ? 'PREMIUM RUNTIME' : ''}
                  </span>
                  <h3 className="font-mono text-base uppercase text-[#F2F5F4] font-bold">{plan.name}</h3>
                  <p className="text-[#93A8A1] text-[11px] mt-2 leading-relaxed font-sans font-normal">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="border-y border-[#12302A] py-6 mb-6 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-[#F2F5F4]">${plan.price}</span>
                  <span className="font-mono text-[10px] text-[#93A8A1]">/ month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-[#93A8A1] font-normal">
                      <ShieldCheck className="w-4 h-4 text-[#00E5C3] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  plan.highlight
                    ? 'bg-[#00E5C3] hover:bg-[#00CFAE] text-[#02110E] shadow-[0_0_20px_rgba(0,229,195,0.25)]'
                    : 'bg-transparent border border-[#12302A] hover:border-[#00CFAE] hover:text-[#00E5C3] text-[#F2F5F4]'
                }`}
              >
                Launch {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* System Resource Recommender Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// CALCULATOR</span>
          <h2 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            System Resource Recommender
          </h2>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Adjust the dynamic slider as a function of your estimated monthly production tasks. Our algorithm computes recommended resource enclaves and pipeline savings.
          </p>
        </div>

        {/* Dynamic Project Calculator Block */}
        <div className="bg-[#071311] border border-[#12302A] p-8 sm:p-12 rounded-lg mb-16">
          <div className="text-center mb-8 border-b border-[#12302A] pb-6 flex flex-col items-center justify-center gap-4">
            <div className="p-3 bg-[#020B0A] border border-[#12302A] rounded flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00E5C3] animate-pulse" />
              <span className="font-mono text-[10px] text-[#F2F5F4]">
                RECOMMENDED ENCLAVE: <strong className="text-[#00E5C3]">{getRecommendedPlan().toUpperCase()}</strong>
              </span>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto text-center">
            <div className="flex justify-between font-mono text-xs text-[#93A8A1]">
              <span>MIN : 1 PROJECT</span>
              <span className="text-[#F2F5F4] text-sm font-bold">{estimatedExecutions} / MONTH PREFERRED</span>
              <span>MAX : 100+ PROJECTS</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="100"
              value={estimatedExecutions}
              onChange={(e) => setEstimatedExecutions(parseInt(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-[#020B0A] border border-[#12302A] accent-[#00E5C3]"
            />
            
            <p className="text-[11px] font-mono text-[#93A8A1] font-normal">
              At {estimatedExecutions} project executions per month, we estimate a local time savings of roughly <strong className="text-[#F2F5F4]">{(estimatedExecutions * 4.5).toFixed(1)} hours</strong> of manual coding, formatting, and file auditing.
            </p>
          </div>
        </div>

      </motion.div>
    </PublicLayout>
  );
}
