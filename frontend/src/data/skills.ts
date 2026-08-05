export interface SkillItem {
  label: string;
  percentage: number;
}

export const SKILLS: SkillItem[] = [
  { label: "LangGraph / CrewAI", percentage: 90 },
  { label: "Python / FastAPI", percentage: 85 },
  { label: "React / Next.js", percentage: 80 },
  { label: "RAG / Vector DBs", percentage: 85 },
  { label: "System Design", percentage: 75 }
];
