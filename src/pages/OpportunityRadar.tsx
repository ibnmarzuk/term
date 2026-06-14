import { Rocket, Target, AlertTriangle, FileText, Download, Briefcase, TrendingUp, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export default function OpportunityRadar() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-xxl">
      
      {/* Hero Command */}
      <section className="relative w-full text-center mb-16 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#00E5C3] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] block mb-4">// TELEMETRY SCANNER</span>
          <h1 className="text-3xl sm:text-5xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold mb-6">
            Opportunity Radar
          </h1>
          <p className="text-[#93A8A1] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-normal">
            Real-time memory intelligence and algorithmic market-fit discovery. Query live ecosystem vectors, recall strategic assets, or initiate instant compiler submissions.
          </p>
        </div>
        
        <div className="relative z-10 max-w-2xl px-4 w-full mx-auto">
          <div className="bg-[#071311] rounded-sm px-6 py-4 flex items-center gap-4 w-full max-w-xl mx-auto border border-[#12302A] shadow-[0_0_20px_rgba(0,229,195,0.08)]">
            <Target className="w-5 h-5 text-[#00E5C3]" />
            <input 
              type="text" 
              className="bg-transparent border-none focus:ring-0 text-[#F2F5F4] w-full text-sm placeholder-[#93A8A1]/40 focus:outline-none font-mono"
              placeholder="Analyze current market vectors or recall assets..."
            />
            <span className="px-2 py-1 bg-[#020B0A] rounded border border-[#12302A] font-mono text-[10px] text-[#A1A1AA] flex-shrink-0 uppercase">
              CMD + K
            </span>
          </div>
        </div>
      </section>

      {/* Opportunity Radar Grid */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#12302A] gap-4">
          <div>
            <span className="text-[#00E5C3] text-[9px] font-mono uppercase tracking-[0.2em] block mb-1.5">// OPPORTUNITIES</span>
            <h3 className="text-xl sm:text-2xl font-mono uppercase tracking-tight text-[#F2F5F4] font-bold">Active Targets</h3>
            <p className="text-[#93A8A1] text-xs font-sans font-normal mt-0.5">AI-driven market signal analysis</p>
          </div>
          <button className="flex items-center gap-2 text-[#00E5C3] font-mono text-xs uppercase tracking-wider hover:text-[#00CFAE] transition-colors group cursor-pointer">
            SCAN LIVE FEED 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Primary Opportunity */}
          <div className="md:col-span-8 glass-panel rounded-xl p-lg flex flex-col justify-between group cursor-pointer hover:border-primary/50 hover:bg-surface-container-low transition-all">
            <div className="flex justify-between items-start mb-xl">
              <div className="flex gap-md">
                <div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="title-md font-bold text-on-surface">Web3 Hackathon: Hyperdrive</h4>
                  <p className="body-sm text-on-surface-variant">Global decentralized infrastructure challenge</p>
                </div>
              </div>
              <div className="text-right">
                <div className="display-lg text-primary leading-none mb-1 text-5xl">92%</div>
                <div className="label-caps text-[10px] text-on-surface-variant">FIT SCORE</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-sm mb-xl">
              <span className="bg-surface-container-highest px-md py-1 rounded-full text-[10px] label-caps">SOLANA</span>
              <span className="bg-surface-container-highest px-md py-1 rounded-full text-[10px] label-caps">ZERO KNOWLEDGE</span>
              <span className="bg-surface-container-highest px-md py-1 border border-secondary/20 text-secondary rounded-full text-[10px] label-caps">PRIZE: $250K</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface">A</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold text-on-surface">B</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">+12</div>
              </div>
              <button className="bg-primary-container text-on-primary-container px-lg py-sm rounded-lg label-caps text-[11px] hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary/20">
                INITIALIZE APPLICATION
              </button>
            </div>
          </div>

          {/* Secondary Opportunity */}
          <div className="md:col-span-4 glass-panel rounded-xl p-lg flex flex-col group hover:border-secondary/50 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-md">
              <Rocket className="w-6 h-6 text-secondary" />
              <div className="bg-secondary/10 text-secondary px-sm py-xs rounded code-md text-[10px]">PROB: 85%</div>
            </div>
            <h4 className="title-md text-on-surface font-bold mb-xs">AI Startup Grant</h4>
            <p className="body-sm text-on-surface-variant mb-lg">Next-gen compute initiative by Apex Labs.</p>
            
            <div className="mt-auto space-y-md">
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[85%]" />
              </div>
              <div className="flex justify-between text-[11px] label-caps text-on-surface-variant">
                <span>SUCCESS PROB</span>
                <span className="text-secondary border-b border-secondary/30">HIGH</span>
              </div>
            </div>
          </div>

          {/* Signals */}
          <div className="md:col-span-4 glass-panel rounded-xl p-md flex items-center gap-md hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/10">
            <div className="p-3 rounded-lg bg-tertiary/10 border border-tertiary/20">
              <TrendingUp className="w-5 h-5 text-tertiary" />
            </div>
            <div>
              <div className="label-caps text-[9px] text-on-surface-variant mb-0.5">MARKET SIGNAL</div>
              <div className="body-md font-medium text-on-surface leading-tight">Series A Tech Crunch</div>
            </div>
          </div>
          
          <div className="md:col-span-4 glass-panel rounded-xl p-md flex items-center gap-md hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/10">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="label-caps text-[9px] text-on-surface-variant mb-0.5">NEW RFP</div>
              <div className="body-md font-medium text-on-surface leading-tight">Gov-Cloud Expansion</div>
            </div>
          </div>

          <div className="md:col-span-4 glass-panel rounded-xl p-md flex items-center gap-md hover:bg-surface-container-low transition-colors cursor-pointer border border-error/20 bg-error/5">
            <div className="p-3 rounded-lg bg-error/10 border border-error/20">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div>
              <div className="label-caps text-[9px] text-error mb-0.5">HIGH ALERT</div>
              <div className="body-md font-medium text-error leading-tight">GPU Shortage Indicated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Memory Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        <div className="lg:col-span-1 flex flex-col gap-lg">
          <h3 className="headline-lg text-on-surface">Memory Bank</h3>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-sm space-y-xs">
            
            <div className="flex items-center justify-between p-md hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors group">
              <div className="flex items-center gap-md">
                <FileText className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <div>
                  <div className="body-sm font-medium text-on-surface">Knowledge Base</div>
                  <div className="text-[11px] text-on-surface-variant">1,240 Nodes Linked</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-md hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors group">
              <div className="flex items-center gap-md">
                <Settings className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <div>
                  <div className="body-sm font-medium text-on-surface">Writing Preferences</div>
                  <div className="text-[11px] text-on-surface-variant">Tone: Technical/Dry</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-md hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors group bg-primary/5">
              <div className="flex items-center gap-md">
                <Download className="w-5 h-5 text-primary" />
                <div>
                  <div className="body-sm font-medium text-primary">Brand Assets</div>
                  <div className="text-[11px] text-primary/70">SVGs, Palettes, Guidelines</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-lg">
           <h3 className="headline-lg text-on-surface hidden lg:block invisible">Recent</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-auto h-full">
              {[
                { name: "LOGO_GUIDE.PNG", bg: "from-primary/20", border: 'border-primary/20' },
                { name: "AGENT_LOG.XLS", bg: "from-secondary/20", border: 'border-secondary/20' },
                { name: "UI_TOKENS.JSON", bg: "from-tertiary/20", border: 'border-tertiary/20' },
                { name: "PITCH_DECK.PDF", bg: "from-on-surface-variant/20", border: 'border-outline-variant/20' }
              ].map((item, i) => (
                <div key={i} className={`aspect-square rounded-xl border ${item.border} p-md flex flex-col justify-end bg-gradient-to-t ${item.bg} to-transparent cursor-pointer hover:scale-105 transition-transform`}>
                   <span className="label-caps text-[9px] text-on-surface">{item.name}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      {/* Footer Stats */}
      <section className="border-t border-outline-variant/10 pt-xl mt-md grid grid-cols-2 md:grid-cols-4 gap-lg pb-12">
        <div>
          <div className="label-caps text-[10px] text-on-surface-variant mb-1">UPTIME</div>
          <div className="code-md text-primary">99.998%</div>
        </div>
        <div>
          <div className="label-caps text-[10px] text-on-surface-variant mb-1">MEMORY INDEX</div>
          <div className="code-md text-on-surface">14.2 TB</div>
        </div>
        <div>
          <div className="label-caps text-[10px] text-on-surface-variant mb-1">SYNC STATUS</div>
          <div className="code-md text-secondary">COMPLETE</div>
        </div>
        <div>
          <div className="label-caps text-[10px] text-on-surface-variant mb-1">KERNEL</div>
          <div className="code-md text-on-surface">v2.4.0-stable</div>
        </div>
      </section>

    </div>
  );
}
