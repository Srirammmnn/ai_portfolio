import { motion } from "framer-motion";

// A flat, geometric node-graph portrait — an abstract "agent graph" silhouette
// standing in for a photo. It mirrors what Sriram actually builds (RAG / multi-agent
// graphs), which auto-traced photoreal portraits can't do cleanly (see lesson 01
// in the build guide), and gives the hero a signature that's specific to the subject.
const nodes = [
  { id: "n1", x: 200, y: 40, r: 10, pulse: 0 },
  { id: "n2", x: 130, y: 90, r: 7, pulse: 0.3 },
  { id: "n3", x: 270, y: 90, r: 7, pulse: 0.6 },
  { id: "n4", x: 90, y: 170, r: 6, pulse: 0.9 },
  { id: "n5", x: 200, y: 150, r: 9, pulse: 0.2 },
  { id: "n6", x: 310, y: 170, r: 6, pulse: 1.1 },
  { id: "n7", x: 140, y: 250, r: 6, pulse: 0.5 },
  { id: "n8", x: 200, y: 300, r: 8, pulse: 0.8 },
  { id: "n9", x: 260, y: 250, r: 6, pulse: 1.4 },
  { id: "n10", x: 200, y: 220, r: 5, pulse: 1.7 },
];

const edges: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n3"],
  ["n2", "n4"],
  ["n2", "n5"],
  ["n3", "n5"],
  ["n3", "n6"],
  ["n5", "n10"],
  ["n4", "n7"],
  ["n6", "n9"],
  ["n7", "n8"],
  ["n9", "n8"],
  ["n10", "n8"],
  ["n7", "n10"],
  ["n9", "n10"],
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

export default function AgentAvatar({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 340"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label="Abstract node-graph avatar representing an AI agent network"
      >
        <defs>
          <radialGradient id="haloGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7c86ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7c86ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#7c86ff" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="170" r="190" fill="url(#haloGrad)" />

        {edges.map(([a, b], i) => {
          const na = nodeMap[a];
          const nb = nodeMap[b];
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="url(#edgeGrad)"
              strokeWidth="1.4"
              strokeOpacity="0.45"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.45 }}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.05, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <g key={n.id}>
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r * 2.2}
              fill="#6ee7b7"
              opacity="0.12"
              animate={{ r: [n.r * 1.8, n.r * 2.6, n.r * 1.8] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: n.pulse,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={i % 3 === 0 ? "#6ee7b7" : "#e7eaf0"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
