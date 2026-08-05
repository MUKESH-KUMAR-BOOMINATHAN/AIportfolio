export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  tech: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "Prodapt Solutions Pvt. Ltd.",
    location: "Chennai, India",
    period: "Feb 2026 – June 2026",
    type: "Internship",
    description: [
      "Completed intensive corporate training in Python, SQL, OOP, and software engineering best practices as part of an FDE (Forward Deployed Engineer) track.",
      "Developed an LLM-powered Insurance Claims Investigation Platform (capstone project) using Python, FastAPI, LangGraph, ChromaDB, and SQLite to automate claim analysis and fraud investigation.",
      "Designed a multi-step LLM agent workflow using LangGraph, orchestrating claim intake, fraud detection, similar-claim retrieval, risk assessment, and explainable AI recommendation generation.",
      "Built a hybrid Retrieval-Augmented Generation (RAG) pipeline using Sentence Transformers embeddings stored in ChromaDB, combining semantic and keyword search for historical claim retrieval.",
      "Integrated a Scikit-learn fraud-risk prediction model (Random Forest with SHAP explainability) into the LLM workflow to support evidence-based, auditable claim decisions.",
      "Architected REST APIs (FastAPI, Pydantic, SQLAlchemy) to orchestrate LLM agent calls, claim CRUD operations, and investigation report generation, following Agile SDLC practices with Git version control."
    ],
    tech: ["Python", "FastAPI", "LangGraph", "ChromaDB", "SQLite", "Scikit-Learn"]
  },
  {
    role: "Web Development Intern",
    company: "CurrentEdge Systems Pvt. Ltd.",
    location: "Bangalore, India",
    period: "May 2025 – June 2025",
    type: "Internship",
    description: [
      "Developed backend modules using Node.js and Express.js for enterprise web applications.",
      "Engineered adaptive frontend interfaces and product views utilizing Next.js and Material UI for direct deployment to the live production environment.",
      "Architected and implemented REST APIs, performing comprehensive testing and validation using Postman.",
      "Utilized Git for version control within Agile workflows and deployed production-ready features directly to the live environment."
    ],
    tech: ["Node.js", "Express.js", "Next.js", "Material UI", "REST APIs", "Postman", "Git"]
  }
];
