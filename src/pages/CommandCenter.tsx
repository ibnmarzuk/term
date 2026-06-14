import { motion } from 'motion/react';
import { ArrowRight, Activity, Zap, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export default function CommandCenter() {
  const [activeStep, setActiveStep] = useState(1);
  const [latencyData, setLatencyData] = useState<{ time: number, value: number }[]>([]);
  const [utilizationData, setUtilizationData] = useState<{ time: number, value: number }[]>([]);

  useEffect(() => {
    // Generate initial flat data
    const initialLatency = Array.from({ length: 20 }, (_, i) => ({ time: i, value: 45 + Math.random() * 10 }));
    const initialUtil = Array.from({ length: 20 }, (_, i) => ({ time: i, value: 60 + Math.random() * 20 }));
    
    setLatencyData(initialLatency);
    setUtilizationData(initialUtil);

    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: Date.now(), value: 40 + Math.random() * 20 });
        return newData;
      });
      setUtilizationData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ time: Date.now(), value: 65 + Math.random() * 15 });
        return newData;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { num: "01", title: "Drop your input", desc: "Paste a bounty, URL, PDF, brief, or GitHub repo. Any form, any source." },
    { num: "02", title: "APEX analyzes", desc: "The 6-stage pipeline — ingest, research, strategy, code, content, audit — runs in parallel." },
    { num: "03", title: "Get a complete package", desc: "Tabs for every output: research report, strategy, technical plan, content pack, submission kit." },
    { num: "04", title: "Ship it", desc: "Copy, download, submit. Every artifact is structured for the destination, not the chat." }
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-16rem)] p-8 relative scrollbar-hide pb-20 bg-[#020B0A]">
      
      {/* Real-time System Performance Monitor Header */}
      <div className="w-full max-w-5xl mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[#93A8A1] text-[12px] font-mono uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-[#00E5C3]" /> ACTIVE AGENTS</span>
            <span className="text-[#00E5C3] font-bold">09</span>
          </div>
          <div className="flex items-end gap-3 mt-1">
            <span className="text-4xl font-bold font-mono text-[#F2F5F4] leading-none">9</span>
            <span className="text-[#93A8A1] text-[13px] mb-1">units online</span>
          </div>
          <div className="flex gap-2.5 mt-2">
             {['research', 'engineering', 'design', 'qa', 'strategy'].map(type => (
                <div key={type} className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,229,195,0.5)] bg-[#00E5C3]" />
             ))}
          </div>
        </div>

        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#93A8A1] text-[12px] font-mono uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-[#00E5C3]" /> PIPELINE LATENCY</span>
            <span className="text-[#00E5C3] font-bold">{Math.round(latencyData[latencyData.length - 1]?.value || 0)}ms</span>
          </div>
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <Line type="monotone" dataKey="value" stroke="#00E5C3" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#071311] border border-[#12302A] rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#93A8A1] text-[12px] font-mono uppercase tracking-widest mb-2">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-[#00E5C3]" /> RESOURCE UTIL</span>
            <span className="text-[#00E5C3] font-bold">{Math.round(utilizationData[utilizationData.length - 1]?.value || 0)}%</span>
          </div>
          <div className="h-10 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={utilizationData}>
                <Line type="monotone" dataKey="value" stroke="#00E5C3" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CommandCenter Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// WORKFLOW</span>
        <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
          One Input. <span className="text-[#00E5C3]">Complete</span> Execution.
        </h1>
        <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
          Interact with our coordinate-level parallel engines. Supply a single goal, brief, or repository to trigger isolated sandbox executions and generate live structural packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl w-full mb-16 px-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col cursor-pointer group" onClick={() => setActiveStep(i + 1)}>
            <div className="flex items-center gap-2 mb-4">
              <span className={cn(
                "text-3xl font-black font-mono transition-colors",
                activeStep === (i + 1) ? "text-[#00E5C3]" : "text-[#12302A] group-hover:text-[#00E5C3]/55"
              )}>
                {step.num}
              </span>
              {i < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[#12302A] ml-4 group-hover:translate-x-1 transition-transform" />
              )}
            </div>
            <h3 className="text-[#F2F5F4] font-semibold text-sm mb-2 font-mono uppercase">{step.title}</h3>
            <p className="text-[#93A8A1] text-[13px] leading-relaxed font-sans font-normal">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Terminal UI component Mock */}
      <div className="w-full max-w-4xl bg-[#071311] border border-[#12302A] rounded-xl p-6">
        <div className="text-[#93A8A1] text-[11px] font-mono mb-4 flex items-center gap-2">
          $ apex.execute
        </div>
        <div className="flex flex-wrap gap-2">
          {['Ingest', 'Research', 'Strategy', 'Code', 'Content', 'Audit'].map((tab, i) => (
            <div 
              key={tab}
              className={cn(
                "flex-1 min-w-[120px] p-3 rounded-lg border flex justify-between items-end cursor-pointer transition-colors hover:border-[#00CFAE]",
                activeStep > (i * 4 / 6) ? "bg-[#020B0A]/80 border-[#00E5C3]" : "bg-[#020B0A] border-[#12302A]"
              )}
              onClick={() => setActiveStep(Math.max(1, Math.ceil((i + 1) * 4 / 6)))}
            >
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center w-full font-mono">
                  <span className="text-[10px] text-[#93A8A1] leading-none">0{i + 1}</span>
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    activeStep > (i * 4 / 6) ? "bg-[#00E5C3] shadow-[0_0_10px_rgba(0,229,195,0.6)]" : "bg-[#12302A]"
                  )} />
                </div>
                <span className="text-[14px] text-[#F2F5F4] font-medium font-mono uppercase">{tab}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
