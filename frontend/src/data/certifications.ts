export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export const CERTIFICATIONS: CertificateItem[] = [
  {
    title: "AI in IT Industry and its Future Prospects",
    issuer: "SRM VEC",
    year: "2024",
    description: "Participated in an industry-guided seminar focusing on LLMs scaling vectors, cloud-compute trends, and vector database structures utilized in modern enterprise workflows."
  },
  {
    title: "MERN Full Stack Beginner Guide",
    issuer: "SRM VEC",
    year: "2025",
    description: "Completed intensive technical coursework covering MongoDB collections indexing, Express.js server frameworks, React client-side hooks, and Node.js REST API modules."
  }
];
