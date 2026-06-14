import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function CommandCenter() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { num: "01", title: "Drop your input", desc: "Paste a bounty, URL, PDF, brief, or GitHub repo. Any form, any source." },
    { num: "02", title: "APEX analyzes", desc: "The 6-stage pipeline — ingest, research, strategy, code, content, audit — runs in parallel." },
    { num: "03", title: "Get a complete package", desc: "Tabs for every output: research report, strategy, technical plan, content pack, submission kit." },
    { num: "04", title: "Ship it", desc: "Copy, download, submit. Every artifact is structured for the destination, not the chat." }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] p-8 relative scrollbar-hide pb-20">
      
      {/* Top Tag */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[#00e59b] text-[10px] uppercase font-bold tracking-widest">
          // WORKFLOW
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-16 text-center">
        One input. Complete execution.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full mb-16 px-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col cursor-pointer group" onClick={() => setActiveStep(i + 1)}>
            <div className="flex items-center gap-2 mb-4">
              <span className={cn(
                "text-3xl font-black font-mono transition-colors",
                activeStep === (i + 1) ? "text-[#00e59b]" : "text-[#27272a] group-hover:text-[#00e59b]/50"
              )}>
                {step.num}
              </span>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[#27272a] ml-4" />
              )}
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
            <p className="text-[#a1a1aa] text-[13px] leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Terminal UI component Mock */}
      <div className="w-full max-w-4xl bg-[#0b0c10] border border-[#27272a] rounded-xl p-6">
        <div className="text-[#71717a] text-[11px] font-mono mb-4 flex items-center gap-2">
          $ apex.execute
        </div>
        <div className="flex flex-wrap gap-2">
          {['Ingest', 'Research', 'Strategy', 'Code', 'Content', 'Audit'].map((tab, i) => (
            <div 
              key={tab}
              className={cn(
                "flex-1 min-w-[120px] p-3 rounded-lg border border-[#27272a] flex justify-between items-end cursor-pointer transition-colors hover:border-[#3f3f46]",
                activeStep > (i * 4 / 6) && "bg-[#18181b]/50 border-primary/20",
                "bg-[#050505]"
              )}
              onClick={() => setActiveStep(Math.max(1, Math.ceil((i + 1) * 4 / 6)))}
            >
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] text-[#71717a] font-mono leading-none">0{i + 1}</span>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    activeStep > (i * 4 / 6) ? "bg-[#00e59b] shadow-[0_0_8px_rgba(0,229,155,0.6)]" : "bg-[#27272a]"
                  )} />
                </div>
                <span className="text-[13px] text-white font-medium">{tab}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
