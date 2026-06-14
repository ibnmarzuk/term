import { BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

export default function IntelligenceBrain() {
  const nodes = [
    { id: 1, name: "Strategic Council", x: 50, y: 30, color: "primary" },
    { id: 2, name: "Contrarian", x: 20, y: 20, color: "tertiary" },
    { id: 3, name: "Executor", x: 80, y: 40, color: "secondary" },
    { id: 4, name: "Router Engine", x: 50, y: 55, color: "on-surface" },
    { id: 5, name: "Memory Engine", x: 30, y: 70, color: "outline-variant" },
    { id: 6, name: "Knowledge Graph", x: 70, y: 75, color: "primary-container" },
  ];

  const edges = [
    [1, 2], [1, 3], [1, 4], [4, 5], [4, 6]
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-lg">
        <h2 className="headline-lg text-on-surface mb-xs flex items-center gap-sm">
          <BrainCircuit className="w-8 h-8 text-primary" />
          Intelligence Brain
        </h2>
        <p className="body-sm text-on-surface-variant">Visualizing agent relationships and routing pathways.</p>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border-primary/10 relative overflow-hidden flex items-center justify-center min-h-[500px]">
        
        {/* Canvas background grid */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative w-full max-w-4xl aspect-[16/9] z-10">
          {/* Draw edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map(([a, b], idx) => {
              const nodeA = nodes.find(n => n.id === a)!;
              const nodeB = nodes.find(n => n.id === b)!;
              return (
                <motion.line
                  key={`edge-${idx}`}
                  x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
                  x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Draw nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-sm cursor-pointer group`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: i * 0.1 + 0.5 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-${node.color}/10 border border-${node.color}/30 flex items-center justify-center text-${node.color} group-hover:scale-110 group-hover:bg-${node.color}/20 transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                <BrainCircuit className="w-5 h-5" />
              </div>
              <span className="label-caps text-[9px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-white/5">{node.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
