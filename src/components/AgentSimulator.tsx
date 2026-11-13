import { useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../utils/audio";
import { generateHumanResponse } from "../utils/aiBrain";
import {
  Terminal,
  Play,
  CheckCircle2,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  RotateCcw,
} from "lucide-react";

interface PipelineStep {
  name: string;
  agent: string;
  icon: typeof Terminal;
  detail: string;
  duration: number;
}

const PRESET_QUERIES = [
  {
    label: "RAG Architecture",
    query: "Explain Sriram's hybrid RAG search with HyDE and Cross-Encoder reranking.",
    response:
      "Enterprise Multi-Agent RAG Architecture:\n• Ingests user query & runs HyDE (Hypothetical Document Embeddings) generation.\n• Parallel Hybrid Search: Qdrant Dense Vector Embeddings (1536-dim) + BM25 lexical keyword search.\n• Reciprocal Rank Fusion (RRF) merges candidate lists; Cross-Encoder (ms-marco-MiniLM-L-6-v2) executes precision reranking.\n• Yielded +31% retrieval precision boost and reduced hallucination rates evaluated via RAGAS metrics.",
  },
  {
    label: "FastAPI Latency",
    query: "How did Sriram achieve sub-200ms ML inference latency at ROR Technologies?",
    response:
      "Production Inference Optimization at ROR Technologies:\n• Implemented asynchronous FastAPI endpoints with non-blocking event loops and Pydantic v2 validation.\n• Decoupled heavy background tasks using Celery worker nodes backed by Redis queues (reduced pipeline time 4h → 45m).\n• Implemented in-memory response caching and optimized SQLAlchemy connection pooling for concurrent throughput with <200ms latency.",
  },
  {
    label: "LLM Fine-Tuning",
    query: "What was the methodology for fine-tuning Llama-3.1-8B with QLoRA?",
    response:
      "Llama-3.1-8B QLoRA Fine-Tuning Pipeline:\n• Trained on 150K+ historical customer support logs & domain docs.\n• Applied 4-bit NormalFloat (NF4) quantization with LoRA rank r=16, alpha=32 on target projection layers.\n• Tracked experiments with MLflow and validated 32% reduction in incorrect responses.\n• Packaged for low-latency production inference serving using vLLM PagedAttention engine.",
  },
];

export default function AgentSimulator() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customQuery, setCustomQuery] = useState(PRESET_QUERIES[0].query);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [outputStream, setOutputStream] = useState<string>("");
  const [activeTelemetry, setActiveTelemetry] = useState<{
    latency: number;
    ragasScore: number;
    tokens: number;
    agentsActive: number;
  } | null>(null);

  const steps: PipelineStep[] = [
    {
      name: "Autonomous Query Router",
      agent: "RouterAgent",
      icon: Cpu,
      detail: "Decomposing query semantics & dispatching task to specialized subagents",
      duration: 650,
    },
    {
      name: "Hybrid RRF Retrieval",
      agent: "RetrieverAgent",
      icon: Database,
      detail: "Querying Qdrant (dense) + BM25 (sparse) with cross-encoder reranking",
      duration: 800,
    },
    {
      name: "MCP Tool Execution",
      agent: "ToolCallerAgent",
      icon: Zap,
      detail: "Invoking Model Context Protocol tools & validating structured JSON output",
      duration: 700,
    },
    {
      name: "RAGAS Guardrails & Faithfulness",
      agent: "EvaluatorAgent",
      icon: ShieldCheck,
      detail: "Evaluating context relevancy, groundness, and zero-hallucination compliance",
      duration: 600,
    },
  ];

  const handleSelectPreset = (idx: number) => {
    soundManager.playClick();
    setSelectedPreset(idx);
    setCustomQuery(PRESET_QUERIES[idx].query);
    setOutputStream("");
    setCurrentStepIndex(-1);
    setActiveTelemetry(null);
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutputStream("");
    setCurrentStepIndex(0);
    soundManager.playClick();

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i);
      soundManager.playPulse();
      await new Promise((r) => setTimeout(r, steps[i].duration));
    }

    // Finished steps, now stream response
    setCurrentStepIndex(steps.length);
    soundManager.playSuccess();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#00f5d4", "#8b5cf6", "#38bdf8"],
      });
    } catch {}

    const isPreset = customQuery.trim() === PRESET_QUERIES[selectedPreset].query.trim();
    const fullResponse = isPreset
      ? PRESET_QUERIES[selectedPreset].response
      : generateHumanResponse(customQuery).text;

    let accumulated = "";
    for (let charIndex = 0; charIndex < fullResponse.length; charIndex++) {
      accumulated += fullResponse[charIndex];
      setOutputStream(accumulated);
      if (charIndex % 4 === 0) {
        await new Promise((r) => setTimeout(r, 12));
      }
    }

    setActiveTelemetry({
      latency: 168,
      ragasScore: 98.6,
      tokens: 384,
      agentsActive: 4,
    });
    setIsRunning(false);
  };

  const resetSimulation = () => {
    soundManager.playClick();
    setIsRunning(false);
    setCurrentStepIndex(-1);
    setOutputStream("");
    setActiveTelemetry(null);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--signal)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--pulse)]/10 blur-3xl" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--signal)] font-semibold">
              Live Agentic RAG Playground
            </span>
          </div>
          <h3 className="font-display mt-1 text-2xl font-bold tracking-tight text-white">
            Interactive Multi-Agent Orchestrator
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Experience Sriram's autonomous LangGraph + FastAPI architecture in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentStepIndex >= 0 && (
            <button
              onClick={resetSimulation}
              disabled={isRunning}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-slate-800/60 px-3 py-1.5 font-mono text-xs text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RotateCcw size={13} />
              Reset
            </button>
          )}

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--signal)] to-amber-500 px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(244,63,94,0.3)] disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                Executing Swarm...
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" />
                Execute Agent Pipeline
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Query Selector */}
      <div className="mt-6">
        <p className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider mb-2">
          Select Test Query or Topic:
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={preset.label}
              onClick={() => handleSelectPreset(idx)}
              disabled={isRunning}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-all ${
                selectedPreset === idx
                  ? "bg-[var(--signal)]/15 border border-[var(--signal)] text-[var(--signal)] shadow-sm font-medium"
                  : "bg-slate-900/60 border border-[var(--border)] text-slate-400 hover:text-slate-200"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="mt-3 relative">
          <input
            type="text"
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-xl border border-[var(--border)] bg-slate-950/80 px-4 py-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:border-[var(--signal)] focus:outline-none focus:ring-1 focus:ring-[var(--signal)]"
            placeholder="Enter custom query..."
          />
        </div>
      </div>

      {/* Visual Pipeline Graph */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = currentStepIndex === idx;
          const isDone = currentStepIndex > idx;

          return (
            <div
              key={step.name}
              className={`relative rounded-xl border p-4 transition-all duration-300 ${
                isActive
                  ? "border-[var(--signal)] bg-[var(--signal)]/10 shadow-[0_0_15px_rgba(0,245,212,0.2)] scale-[1.02]"
                  : isDone
                  ? "border-emerald-500/40 bg-emerald-950/20"
                  : "border-[var(--border)] bg-slate-900/40 opacity-70"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive
                        ? "bg-[var(--signal)] text-slate-950"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <StepIcon size={16} />
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-dim)]">Step 0{idx + 1}</span>
                </div>
                {isDone ? (
                  <CheckCircle2 size={16} className="text-emerald-400" />
                ) : isActive ? (
                  <span className="flex h-2 w-2 rounded-full bg-[var(--signal)] animate-ping" />
                ) : null}
              </div>

              <h4 className="font-display font-semibold text-xs mt-3 text-slate-200">{step.name}</h4>
              <p className="font-mono text-[10px] text-[var(--signal)] mt-0.5">@{step.agent}</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">{step.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Terminal Output & Telemetry Strip */}
      {(currentStepIndex >= steps.length || outputStream) && (
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-slate-950 p-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-400 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-slate-400 font-mono">agent_stream.py :: langgraph_executor</span>
            </div>
            {activeTelemetry && (
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-emerald-400">⚡ Latency: {activeTelemetry.latency}ms</span>
                <span className="text-[var(--signal)]">🎯 RAGAS: {activeTelemetry.ragasScore}%</span>
                <span className="text-purple-400">📊 Tokens: {activeTelemetry.tokens}</span>
              </div>
            )}
          </div>

          <pre className="whitespace-pre-wrap font-mono text-slate-300 leading-relaxed text-xs">
            {outputStream}
            {isRunning && <span className="inline-block w-2 h-4 bg-[var(--signal)] ml-1 animate-pulse" />}
          </pre>
        </div>
      )}
    </div>
  );
}
