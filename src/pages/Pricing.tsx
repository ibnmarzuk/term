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
          <span className="text-[#00DCC4] text-[10px] font-mono uppercase tracking-widest block mb-2">// COMMERCE</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-white font-bold mb-4">
            Buy execution, not tokens.
          </h1>
          <p className="text-[#C5C1B9] text-sm leading-relaxed max-w-xl mx-auto">
            Choose a flat billing cycle that matches your delivery speed. No usage spikes, hidden server fees, or model rate limits.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-[#111] border border-[#222] rounded-full mt-8 font-mono text-[10px]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full transition-colors font-bold ${
                billingCycle === 'monthly' ? 'bg-[#00DCC4] text-black' : 'text-[#8B8680] hover:text-white'
              }`}
            >
              MONTHLY BILLING
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full transition-colors font-bold flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-[#00DCC4] text-black' : 'text-[#8B8680] hover:text-white'
              }`}
            >
              YEARLY SAVINGS <span className="bg-[#575ECF] text-white px-1.5 py-0.5 rounded text-[8px] tracking-wide">SAVE 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                plan.highlight
                  ? 'bg-[#0a0f10] border-[#00DCC4] shadow-[0_0_40px_rgba(0,220,196,0.1)]'
                  : 'bg-[#08080a] border-[#1b1b1c] hover:border-[#333]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-4 right-4 bg-[#00DCC4]/10 text-[#00DCC4] font-mono text-[8px] font-bold px-2 py-0.5 rounded border border-[#00DCC4]/20">
                  {plan.tag}
                </div>
              )}
              
              <div>
                {/* Header */}
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B8680] block mb-1">
                    {plan.name === 'Operator' ? plan.tag : ''}
                    {plan.name === 'Team Enclave' ? plan.tag : ''}
                    {plan.name === 'Pro Operations' ? 'PREMIUM RUNTIME' : ''}
                  </span>
                  <h3 className="font-mono text-base uppercase text-white font-bold">{plan.name}</h3>
                  <p className="text-[#8B8680] text-[11px] mt-2 leading-relaxed">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="border-y border-[#1b1b1c] py-6 mb-6 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-white">${plan.price}</span>
                  <span className="font-mono text-[10px] text-[#8B8680]">/ month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs text-[#C5C1B9]">
                      <ShieldCheck className="w-4 h-4 text-[#00DCC4] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-3 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-[#00DCC4] hover:bg-[#00DCC4]/90 text-black shadow-[0_0_20px_rgba(0,220,196,0.25)]'
                    : 'bg-transparent border border-[#454545] hover:border-white text-white'
                }`}
              >
                Launch {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Project Calculator Block */}
        <div className="bg-[#0c0c0f] border border-[#1b1b1d] p-8 sm:p-12 rounded-lg mb-16">
          <div className="text-center md:text-left mb-8 border-b border-[#1b1b1d] pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[#00DCC4] text-[9px] font-mono uppercase tracking-widest block mb-1">
                // SYSTEM RESOURCE RECOMMENDER
              </span>
              <h3 className="font-mono text-lg text-white font-bold uppercase">Estimated Execution Calculator</h3>
              <p className="text-[#8B8680] text-xs mt-1">
                Drag the indicator to match the number of production tasks you compile monthly.
              </p>
            </div>
            
            <div className="p-3 bg-[#111] border border-[#222] rounded flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00DCC4] animate-pulse" />
              <span className="font-mono text-[10px] text-white">
                RECOMMENDED: <strong className="text-[#00DCC4]">{getRecommendedPlan().toUpperCase()}</strong>
              </span>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto text-center">
            <div className="flex justify-between font-mono text-xs text-[#8B8680]">
              <span>MIN : 1 PROJECT</span>
              <span className="text-white text-sm font-bold">{estimatedExecutions} / MONTH PREFERRED</span>
              <span>MAX : 100+ PROJECTS</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="100"
              value={estimatedExecutions}
              onChange={(e) => setEstimatedExecutions(parseInt(e.target.value))}
              className="w-full accent-[#00DCC4] bg-[#111] border border-[#222] rounded-lg cursor-pointer py-1.5 px-1"
            />
            
            <p className="text-[11px] font-mono text-[#8B8680]">
              At {estimatedExecutions} project executions per month, we estimate a local time savings of roughly <strong className="text-white">{(estimatedExecutions * 4.5).toFixed(1)} hours</strong> of manual coding, formatting, and file auditing.
            </p>
          </div>
        </div>

      </motion.div>
    </PublicLayout>
  );
}
