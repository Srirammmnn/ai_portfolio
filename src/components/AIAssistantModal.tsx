import { useState, useEffect, useRef } from "react";
import { soundManager } from "../utils/audio";
import { speechEngine } from "../utils/speech";
import { generateHumanResponse, type AIMessage } from "../utils/aiBrain";
import confetti from "canvas-confetti";
import {
  MessageSquare,
  X,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  RotateCcw,
} from "lucide-react";

interface AIAssistantModalProps {
  resumeUrl: string;
}

export default function AIAssistantModal({ resumeUrl }: AIAssistantModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "intro-1",
      sender: "ai",
      text: "Hello! I'm Sriram's AI Digital Twin. I can answer technical questions about his Multi-Agent LangGraph RAG systems, QLoRA LLM fine-tuning, sub-200ms FastAPI backends, or evaluate his fit for your open roles. What would you like to know?",
      timestamp: "Just now",
      suggestedPrompts: [
        "Why should we hire Sriram?",
        "Explain his RAG architecture with LangGraph",
        "How did he achieve <200ms latency?",
        "What was his role at ROR Technologies?",
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = speechEngine.subscribeState((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isTyping) return;

    soundManager.playClick();
    setInputQuery("");

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate realistic AI reasoning pause
    await new Promise((r) => setTimeout(r, 600));

    const { text: fullResponse, suggestedPrompts } = generateHumanResponse(query);

    const aiMsgId = `ai-${Date.now()}`;
    const initialAiMsg: AIMessage = {
      id: aiMsgId,
      sender: "ai",
      text: "",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedPrompts,
    };

    setMessages((prev) => [...prev, initialAiMsg]);

    // Stream characters token by token for realistic human/LLM effect
    let streamed = "";
    for (let i = 0; i < fullResponse.length; i++) {
      streamed += fullResponse[i];
      if (i % 3 === 0 || i === fullResponse.length - 1) {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMsgId ? { ...m, text: streamed } : m))
        );
        await new Promise((r) => setTimeout(r, 8));
      }
    }

    setIsTyping(false);
    soundManager.playSuccess();

    // If voice enabled, speak the realistic AI response
    if (voiceEnabled) {
      speechEngine.speak(fullResponse);
    }

    // Special trigger for download resume query
    if (query.toLowerCase().includes("resume") || query.toLowerCase().includes("cv")) {
      try {
        confetti({ particleCount: 40 });
      } catch {}
      const a = document.createElement("a");
      a.href = resumeUrl;
      a.download = "Sriram_Resume.pdf";
      a.click();
    }
  };

  const handleToggleVoice = () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    speechEngine.enabled = next;
    soundManager.playClick();
    if (!next) {
      speechEngine.stop();
    } else {
      speechEngine.speak("Voice output enabled. I will read my answers to you.");
    }
  };

  const handleResetChat = () => {
    speechEngine.stop();
    soundManager.playClick();
    setMessages([
      {
        id: "intro-reset",
        sender: "ai",
        text: "Conversation reset. Feel free to ask anything about Sriram's engineering career, systems shipped, or skills!",
        timestamp: "Just now",
        suggestedPrompts: [
          "Explain his RAG architecture with LangGraph",
          "Why should we hire Sriram?",
          "What was his role at ROR Technologies?",
        ],
      },
    ]);
  };

  return (
    <aside aria-label="AI Assistant" className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            soundManager.playClick();
            setIsOpen(true);
          }}
          className="group relative flex items-center gap-3 rounded-full border border-[var(--signal)]/40 bg-slate-950/90 px-4 py-3 shadow-[0_0_25px_var(--signal-glow)] backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
        >
          {/* Animated Glowing Ring */}
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--signal)] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--signal)]" />
          </span>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 font-display text-xs font-bold text-white">
              <Sparkles size={13} className="text-[var(--signal)]" />
              <span>Talk to Sriram's AI</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">
              Human-Like Neural Persona
            </span>
          </div>

          <div className="rounded-full bg-[var(--signal)] p-1.5 text-slate-950 group-hover:rotate-12 transition-transform">
            <MessageSquare size={14} />
          </div>
        </button>
      )}

      {/* Expanded Interactive AI Window */}
      {isOpen && (
        <div className="relative flex h-[580px] w-[92vw] sm:w-[440px] flex-col rounded-3xl border border-[var(--border)] bg-slate-950/95 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-slate-900/70 px-5 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--signal)] to-purple-600 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-[var(--signal)]">
                  <Bot size={18} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-xs font-bold text-white">
                    Sriram M <span className="text-[var(--signal)]">AI Persona</span>
                  </h3>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                  {isSpeaking ? (
                    <span className="text-[var(--signal)] animate-pulse flex items-center gap-1">
                      <Volume2 size={11} /> Speaking answer...
                    </span>
                  ) : (
                    <span>LangGraph Swarm & RAG Powered</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header controls: Voice, Reset, Close */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleVoice}
                className={`p-1.5 rounded-lg border transition-all ${
                  voiceEnabled
                    ? "border-[var(--signal)] bg-[var(--signal)]/20 text-[var(--signal)]"
                    : "border-slate-800 text-slate-400 hover:text-white"
                }`}
                title={voiceEnabled ? "Voice Enabled (Reading answers)" : "Enable Voice (Audio Speech)"}
              >
                {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>

              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  speechEngine.stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Minimize Chat"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-body text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {m.sender === "ai" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--signal)]/20 text-[var(--signal)] text-[10px] font-mono">
                      AI
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-3.5 leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-[var(--signal)] to-amber-500 text-slate-950 font-medium rounded-br-none shadow-md"
                        : "bg-slate-900/90 text-slate-200 border border-[var(--border)] rounded-bl-none shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.text}</div>
                  </div>

                  {m.sender === "user" && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-400 text-[10px]">
                      <User size={12} />
                    </div>
                  )}
                </div>

                <span className="font-mono text-[9px] text-slate-600 mt-1 px-8">
                  {m.timestamp}
                </span>

                {/* Suggested prompts on latest AI message */}
                {m.sender === "ai" && m.suggestedPrompts && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 pl-8">
                    {m.suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="rounded-full border border-slate-800 bg-slate-900/70 px-2.5 py-1 font-mono text-[10px] text-slate-300 hover:border-[var(--signal)] hover:text-[var(--signal)] transition-all active:scale-95 text-left"
                      >
                        {prompt} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 pl-2 text-slate-400 font-mono text-[11px]">
                <span className="flex h-2 w-2 rounded-full bg-[var(--signal)] animate-bounce" />
                <span className="flex h-2 w-2 rounded-full bg-[var(--signal)] animate-bounce [animation-delay:0.2s]" />
                <span className="flex h-2 w-2 rounded-full bg-[var(--signal)] animate-bounce [animation-delay:0.4s]" />
                <span className="text-slate-500 text-[10px] ml-1">Sriram AI is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="border-t border-[var(--border)] bg-slate-900/70 p-3 backdrop-blur-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask Sriram's AI anything..."
                className="flex-1 rounded-xl border border-[var(--border)] bg-slate-950/80 px-3.5 py-2 font-mono text-xs text-white placeholder-slate-500 focus:border-[var(--signal)] focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--signal)] to-amber-500 text-slate-950 transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </form>

            <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-slate-500 px-1">
              <span>Natural conversational AI twin</span>
              <span className="text-[var(--signal)]">Voice & RAG enabled</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
