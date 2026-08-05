export interface ProjectItem {
  title: string;
  category: "ai" | "fullstack";
  shortDesc: string;
  longDesc: string;
  stack: string[];
  metrics: string[];
  github: string;
  demo?: string;
  architectureFlow?: string[];
  challengeAndSolution: {
    challenge: string;
    solution: string;
  };
  image: string;
  year: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    title: "Insurance Claims Investigation Assistant",
    category: "ai",
    year: "2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shortDesc: "Multi-agent LangGraph platform automating fraud investigation, risk scoring, and hybrid RAG search over claim logs.",
    longDesc: "This advanced claims automation platform orchestrates multiple LLM agents inside a structured LangGraph state machine. Built as a capstone project for Prodapt Solutions, it replicates FDE workflows to intakes claims, detects anomalies, queries historical logs using hybrid keyword + vector indexing, and calculates explainable fraud scores using Random Forest classifiers and SHAP visualizations.",
    stack: ["FastAPI", "React.js", "LangGraph", "ChromaDB", "SQLite", "Python", "Sentence Transformers", "Scikit-Learn", "SHAP", "Pydantic"],
    metrics: ["100% auditable evidence-based reasoning", "Fast API orchestration <500ms latency", "Hybrid RAG semantic + BM25 keyword search"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/insurance-claims-agent",
    architectureFlow: [
      "1. Intake Node: Formulates claims structures and runs Pydantic schema validation.",
      "2. Fraud Detection: Triggers Scikit-Learn classifiers and SHAP values computation.",
      "3. Retrieval Node: Performs semantic hybrid search over ChromaDB historical logs.",
      "4. Risk Assessor: Synthesizes embeddings similarity matches and claims history.",
      "5. Recommendations: Formulates explainable advice logs and outputs formatted FastAPI reports."
    ],
    challengeAndSolution: {
      challenge: "Insurance claim adjusters and organizations struggle to trust black-box LLM suggestions, requiring clear evidence trails for claim denials.",
      solution: "Integrated Scikit-learn models coupled with SHAP values directly inside the LangGraph agent state. The generated output includes a JSON evidence log explaining exactly which variables contributed to the risk score."
    }
  },
  {
    title: "Multi-Agent Customer Support Platform",
    category: "ai",
    year: "2024",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shortDesc: "CrewAI and LangGraph multi-agent swarm handling intent classification, semantic policy search, and resolution logic.",
    longDesc: "An AI-powered customer support desk orchestrating specialized, cooperative agents. Powered by CrewAI and FastAPI, it routes incoming tickets, queries enterprise knowledge bases using Retrieval-Augmented Generation, and draft context-grounded email resolutions with complete reasoning traces.",
    stack: ["Python", "FastAPI", "LangGraph", "CrewAI", "ChromaDB", "Gemini API", "Vector Databases", "REST APIs"],
    metrics: ["Auto-routing tickets to correct specialized sub-agent", "Zero-hallucination guardrails via RAG policy verification", "Full auditability logs for developer inspect"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/multi-agent-support",
    architectureFlow: [
      "1. Intent Router Agent: Analyzes user query and routes to the policy agent.",
      "2. Policy Retriever (RAG): Queries ChromaDB for company policy rules.",
      "3. Decision Drafting Agent: Synthesizes policies to draft resolution suggestions.",
      "4. Quality Assurance Agent: Compares drafts against safety guardrails before finalizing."
    ],
    challengeAndSolution: {
      challenge: "Preventing generic LLM suggestions that violate company support policies.",
      solution: "Implemented an isolated RAG verification layer. Before the response agent writes the final ticket solution, the CrewAI QA Agent checks it against the raw policy chunks retrieved from ChromaDB, failing the draft if it diverges from policy."
    }
  },
  {
    title: "Netflix Cloud Streaming Clone",
    category: "fullstack",
    year: "2023",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    shortDesc: "MERN Stack streaming platform with secure authentication, content browsing databases, and responsive CSS UI.",
    longDesc: "A production-styled streaming media portal built on the MongoDB, Express, React, and Node (MERN) stack. It implements JWT token security, cookies authorization, REST API content management, and an adaptive styling design resembling Netflix, optimized for cross-browser responsive layouts.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "MUI", "JWT Auth", "REST APIs", "Git"],
    metrics: ["Fully-secure Cookie based token authentication", "Adaptive movie dashboard and content filter grids", "REST APIs managing movies CRUD"],
    github: "https://github.com/MUKESH-KUMAR-BOOMINATHAN/netflix-clone",
    challengeAndSolution: {
      challenge: "Building a fluid, media-heavy content page that behaves responsively across mobile, tablets, and wide-aspect monitors.",
      solution: "Created responsive grid controllers using React and styled components, combined with pre-cached media links to provide smooth animations and minimal layout shift during image loading."
    }
  }
];
