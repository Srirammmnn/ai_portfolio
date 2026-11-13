export interface AIMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
}

export function generateHumanResponse(query: string): {
  text: string;
  suggestedPrompts: string[];
} {
  const q = query.toLowerCase().trim();

  // Greetings & Persona introduction
  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("who are you") ||
    q.includes("hey") ||
    q.startsWith("yo")
  ) {
    return {
      text: "Hey there! I'm Sriram's AI Digital Twin — powered by the architecture and knowledge from his real engineering work. I can walk you through his Multi-Agent LangGraph RAG systems, QLoRA fine-tuning workflows, FastAPI microservices, or evaluate how he fits your team. What would you like to explore first?",
      suggestedPrompts: [
        "Why should we hire Sriram?",
        "Explain his RAG architecture with LangGraph",
        "How did he achieve <200ms API latency?",
        "What was his role at ROR Technologies?",
      ],
    };
  }

  // Why Hire Sriram / Strengths / Fit
  if (
    q.includes("hire") ||
    q.includes("why you") ||
    q.includes("strengths") ||
    q.includes("fit") ||
    q.includes("candidate") ||
    q.includes("offer")
  ) {
    return {
      text: "Great question! Here is why Sriram stands out:\n\n1. Production-First Mindset: He doesn't just demo notebooks — he packages ML pipelines into Docker containers, writes rigorous Pytest suites, and exposes sub-200ms async FastAPI endpoints.\n2. True Agentic & RAG Depth: He implemented hybrid RRF retrieval (dense Qdrant + BM25 + cross-encoders) with HyDE, boosting precision by 31% while suppressing hallucinations.\n3. Measurable Impact: At ROR Technologies, his chatbot cut customer resolution time by ~40%, and his automated Celery/Redis retraining pipeline shaved 4 hours down to 45 minutes.\n4. Fast Learner: Certified Agentic Engineer (2025), AWS DevOps, and Coursera Deep Learning, maintaining an 8.4/10 GPA in his MCA at KCT.\n\nHe is ready to hit the ground running on day one.",
      suggestedPrompts: [
        "Tell me about his ROR Technologies internship",
        "Explain his Multi-Agent RAG project",
        "Is Sriram available for immediate roles?",
      ],
    };
  }

  // RAG / Multi-Agent / LangGraph
  if (
    q.includes("rag") ||
    q.includes("multi-agent") ||
    q.includes("langgraph") ||
    q.includes("langchain") ||
    q.includes("vector") ||
    q.includes("qdrant") ||
    q.includes("retrieval")
  ) {
    return {
      text: "Sriram's flagship project is the Enterprise Multi-Agent RAG Knowledge Assistant:\n\n• Orchestration: Built on LangGraph, using stateful graph checkpoints to route queries to specialized subagents without infinite execution loops.\n• Hybrid Retrieval: Fuses 1536-dim dense vector embeddings in Qdrant with BM25 sparse lexical search via Reciprocal Rank Fusion (RRF).\n• Hallucination Reduction: Employs HyDE (Hypothetical Document Embeddings) and ms-marco cross-encoder reranking, yielding a +31% precision boost verified on RAGAS metrics.\n• Production Delivery: Deployed via async FastAPI with Server-Sent Events (SSE) streaming, Redis caching, Docker containerization, and AWS hosting.",
      suggestedPrompts: [
        "How does he evaluate RAG hallucination?",
        "What was his LLM Fine-Tuning project?",
        "Can I see his code or contact him?",
      ],
    };
  }

  // Latency & FastAPI & Backend
  if (
    q.includes("latency") ||
    q.includes("fastapi") ||
    q.includes("backend") ||
    q.includes("sub-200ms") ||
    q.includes("api") ||
    q.includes("async") ||
    q.includes("redis")
  ) {
    return {
      text: "Latency is a core engineering priority for Sriram. During his time at ROR Technologies, he achieved sub-200ms inference latency through:\n\n1. Asynchronous I/O: Leveraging async FastAPI with uvloop and non-blocking Pydantic v2 serialization.\n2. Task Decoupling: Offloading heavy data preprocessing and model retraining to Celery worker queues backed by Redis.\n3. Connection Pooling & Caching: Caching frequent vector lookups in Redis and optimizing SQLAlchemy connection pools for high concurrent request volumes.\n4. Profiling: Monitoring endpoint bottlenecks with MLflow and latency tracking.",
      suggestedPrompts: [
        "What ML models did he train at ROR?",
        "Tell me about his churn prediction pipeline",
      ],
    };
  }

  // LLM Fine-Tuning / QLoRA / Llama
  if (
    q.includes("fine-tune") ||
    q.includes("fine tuning") ||
    q.includes("qlora") ||
    q.includes("llama") ||
    q.includes("peft") ||
    q.includes("vllm")
  ) {
    return {
      text: "In his Customer Support LLM Fine-Tuning project, Sriram fine-tuned Llama-3.1-8B using QLoRA:\n\n• Dataset: 150K+ historical customer support transcripts and domain documentation, cleaned and formatted into Alpaca instruction pairs.\n• Efficiency: Used 4-bit NormalFloat (NF4) quantization and injected Low-Rank Adaptation (LoRA) adapters (rank r=16, alpha=32) into key projection layers, allowing fine-tuning on a single consumer GPU.\n• Results: Achieved a 32% drop in incorrect responses over the base model, tracked with MLflow.\n• Serving: Packaged the model with vLLM PagedAttention for high-throughput, low-latency concurrent inference.",
      suggestedPrompts: [
        "Explain his Gym Retention automation project",
        "What certifications does Sriram hold?",
      ],
    };
  }

  // ROR Technologies Internship
  if (
    q.includes("ror") ||
    q.includes("intern") ||
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("job")
  ) {
    return {
      text: "Sriram served as an AI/ML Engineer Intern at ROR Technologies (Dec 2025 – Jun 2026, On-Site):\n\n• NLP Support Chatbot: Deployed an automated customer support bot with FastAPI & LangChain, slashing average query resolution time by ~40% for 500+ daily users.\n• Predictive Business Forecasting: Developed an XGBoost model on a 150K-row dataset, achieving an AUC-ROC of 0.91.\n• Pipeline Optimization: Automated data preprocessing and model retraining using Celery + Redis, cutting turnaround from 4 hours down to 45 minutes (~60% manual intervention cut).\n• Cloud CI/CD: Containerized applications with Docker and deployed to AWS EC2 across 3 business use cases with Pytest suites and MLflow.",
      suggestedPrompts: [
        "What was his AUC-ROC in churn prediction?",
        "Where did Sriram study?",
      ],
    };
  }

  // Vision / Hand Gesture Virtual Mouse
  if (
    q.includes("mouse") ||
    q.includes("vision") ||
    q.includes("opencv") ||
    q.includes("mediapipe") ||
    q.includes("gesture")
  ) {
    return {
      text: "The AI Virtual Mouse project is a real-time touch-free computer vision system:\n\n• Core Tech: Built with Python, OpenCV, and Google MediaPipe to track 21 3D hand landmarks at 60 FPS.\n• Latency & Smoothness: Implemented Kalman filter smoothing and exponential moving averages to eliminate hand tremor jitter with sub-15ms latency.\n• Action Modes: Translates finger pinch gestures into left click, right click, double click, drag-and-drop, and fluid page scrolling via PyAutoGUI.",
      suggestedPrompts: [
        "Tell me about the Gym Automation platform",
        "What programming languages does he know?",
      ],
    };
  }

  // Gym Automation / n8n
  if (
    q.includes("gym") ||
    q.includes("n8n") ||
    q.includes("whatsapp") ||
    q.includes("supabase")
  ) {
    return {
      text: "Sriram built the Gym Membership Retention Automation Platform:\n\n• React Dashboard: Real-time UI for member attendance, cohort health metrics, and automated campaign monitoring.\n• n8n Workflows: Automated inactivity detection triggers via Supabase webhooks, initiating personalized WhatsApp Business campaigns and email renewals.\n• Impact: Fully automated customer follow-ups and qualified leads using AI workflows.",
      suggestedPrompts: [
        "What is his education background?",
        "How do I contact Sriram?",
      ],
    };
  }

  // Churn Prediction / XGBoost
  if (
    q.includes("churn") ||
    q.includes("xgboost") ||
    q.includes("scikit") ||
    q.includes("optuna")
  ) {
    return {
      text: "For the Customer Churn Prediction ML System:\n\n• Problem: Predicting churn from complex structured tabular business data with an 85:15 severe class imbalance.\n• Approach: Engineered tenure/transaction interaction features, handled imbalance via SMOTE, and ran Bayesian hyperparameter search over 100+ trials with Optuna.\n• Benchmark: Achieved a 0.91 AUC-ROC with XGBoost outperforming Random Forest and Logistic Regression.\n• Production: Deployed as a monitored FastAPI microservice backed by 100% Pytest test coverage.",
      suggestedPrompts: [
        "What is Sriram's educational background?",
        "Can I download his resume?",
      ],
    };
  }

  // Education & Academics
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("mca") ||
    q.includes("bca") ||
    q.includes("kct") ||
    q.includes("psg")
  ) {
    return {
      text: "Sriram has a strong academic grounding in computer science:\n\n• MCA (Master of Computer Applications) — Kumaraguru College of Technology (KCT), Coimbatore (2024 – 2026). Cumulative GPA: 8.4 / 10.\n• BCA (Bachelor of Computer Applications) — PSG College of Arts and Science, Coimbatore (2021 – 2024). Cumulative GPA: 7.0 / 10.\n\nHis coursework spans Distributed Systems, Pattern Recognition, Advanced Data Structures, and Cloud Computing.",
      suggestedPrompts: [
        "What certifications does he hold?",
        "What are his personal interests?",
      ],
    };
  }

  // Certifications
  if (
    q.includes("cert") ||
    q.includes("license") ||
    q.includes("udemy") ||
    q.includes("coursera") ||
    q.includes("aws")
  ) {
    return {
      text: "Sriram holds 6 verified industry certifications:\n\n1. AI Coder: Vibe Coder to Agentic Engineer — Udemy (2025)\n2. Deep Learning & Reinforcement Learning — Coursera (2024)\n3. Generative AI Models & Platforms — IBM / Coursera (2024)\n4. Getting Started with DevOps on AWS — AWS Training (2024)\n5. Python Programming — GeeksforGeeks (2023)\n6. Prompt Engineering Basics — Coursera (2024)",
      suggestedPrompts: [
        "What are Sriram's contact details?",
        "Download Sriram's Resume",
      ],
    };
  }

  // Contact / Availability / Location
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("location") ||
    q.includes("reach") ||
    q.includes("available") ||
    q.includes("interview") ||
    q.includes("salary")
  ) {
    return {
      text: "Sriram is based in Coimbatore, Tamil Nadu, India, and is open to immediate full-time on-site, hybrid, or remote opportunities worldwide.\n\n• Email: sriramcr46@gmail.com\n• Phone / WhatsApp: +91-9345893491\n• GitHub: github.com/Srirammmnn\n• LinkedIn: linkedin.com/in/sriramm04\n• Live Portfolio: portfolio33my.netlify.app\n\nYou can click 'Download Resume' or use the Contact section below to connect directly!",
      suggestedPrompts: [
        "Download Sriram's Resume",
        "Explain his RAG architecture with LangGraph",
      ],
    };
  }

  // Fallback intelligent response
  return {
    text: `That's an interesting question regarding "${query}". Sriram specializes in bridging advanced AI research (such as Multi-Agent LangGraph workflows, hybrid RRF vector retrieval, and QLoRA fine-tuning) with resilient backend infrastructure (async FastAPI, Docker, Redis, Celery, and AWS EC2). Is there a specific project, architectural metric, or tech stack detail you'd like to dive into?`,
    suggestedPrompts: [
      "Explain his RAG architecture with LangGraph",
      "Why should we hire Sriram?",
      "How did he achieve <200ms latency?",
      "What was his role at ROR Technologies?",
    ],
  };
}
