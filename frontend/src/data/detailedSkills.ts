export interface SkillCategory {
  title: string;
  skills: string[];
}

export const DETAILED_SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "C"]
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "HTML5", "CSS3", "Bootstrap", "Material UI"]
  },
  {
    title: "Backend & APIs",
    skills: ["FastAPI", "Node.js", "Express.js", "Django", "REST APIs"]
  },
  {
    title: "AI Engineering",
    skills: ["LLMs", "LangGraph", "CrewAI", "RAG", "ChromaDB", "Prompt Engineering", "LLM Agent Orchestration"]
  },
  {
    title: "Databases",
    skills: ["MongoDB", "SQLite"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Postman", "AWS (Basics)"]
  }
];
