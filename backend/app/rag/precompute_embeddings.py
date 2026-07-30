import os
import json
import time
from typing import List, Dict
from google import genai
from google.genai import errors
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key:
    client = genai.Client(api_key=api_key)

PORTFOLIO_CHUNKS: List[Dict[str, str]] = [
    # Contact & Basic Info
    {
        "id": "contact_info",
        "category": "personal",
        "text": "Name: Mukesh Boominathan\nTitles: Software Engineer, AI Engineer, Full Stack Developer\nLocation: Chennai, Tamil Nadu, India\nEmail: mukeshkumarb107@gmail.com\nPhone: 8680834741\nLinkedIn: https://www.linkedin.com/in/mukesh-kumar-b-b57122270\nGitHub: https://github.com/MUKESH-KUMAR-BOOMINATHAN"
    },
    {
        "id": "career_objective",
        "category": "personal",
        "text": "Career Objective: A Computer Science graduate passionate about software engineering, AI engineering, full-stack development, and LLM applications. Mukesh Boominathan enjoys solving hard engineering problems, designing scalable systems, building AI-powered products, and continuously learning new technology. He is currently looking for Software Engineer, Full Stack Developer, AI Engineer, and Backend Developer roles."
    },
    # Education
    {
        "id": "education_srm",
        "category": "education",
        "text": "Education: Bachelor of Engineering (B.E.) in Computer Science and Engineering from SRM Valliammai Engineering College, Chennai, Tamil Nadu, India. Duration: October 2022 to May 2026. Cumulative Grade Point Average (CGPA): 8.32 / 10."
    },
    # Experience - Prodapt Solutions
    {
        "id": "experience_prodapt_overview",
        "category": "experience",
        "text": "Experience: Software Engineering Intern at Prodapt Solutions Pvt. Ltd., Chennai from February 2026 to June 2026. Role: Forward Deployed Engineer (FDE) track, completing intensive corporate training in Python, SQL, Object-Oriented Programming (OOP), and software engineering best practices."
    },
    {
        "id": "experience_prodapt_project",
        "category": "experience",
        "text": "Prodapt Capstone Project: Built an LLM-powered Insurance Claims Investigation Platform using Python, FastAPI, LangGraph, ChromaDB, and SQLite to automate claim analysis and fraud investigation. Designed a multi-step LangGraph agent workflow orchestrating claim intake, fraud detection, similar-claim retrieval, risk assessment, and explainable AI recommendation generation."
    },
    {
        "id": "experience_prodapt_rag",
        "category": "experience",
        "text": "Prodapt Experience: Built a hybrid RAG pipeline using Sentence Transformers embeddings in ChromaDB, combining semantic and keyword (BM25) search for historical claim retrieval. Integrated a Scikit-learn Random Forest fraud-risk model with SHAP (SHapley Additive exPlanations) explainability into the LLM workflow for evidence-based, auditable decisions."
    },
    {
        "id": "experience_prodapt_api",
        "category": "experience",
        "text": "Prodapt Experience: Architected REST APIs (FastAPI, Pydantic, SQLAlchemy) to orchestrate LLM agent calls, claim CRUD operations, and report generation, following Agile SDLC with Git."
    },
    # Experience - CurrentEdge Systems
    {
        "id": "experience_currentedge",
        "category": "experience",
        "text": "Experience: Web Development Intern at CurrentEdge Systems Pvt. Ltd., Bangalore from May 2025 to June 2025. Developed backend modules using Node.js and Express.js for enterprise web applications. Engineered adaptive frontend interfaces and product views using Next.js and Material UI, deployed directly to production. Architected and tested REST APIs using Postman and utilized Git within Agile workflows."
    },
    # Technical Skills
    {
        "id": "skills_languages",
        "category": "skills",
        "text": "Technical Skills - Programming Languages: Python, Java, JavaScript, TypeScript, C, SQL."
    },
    {
        "id": "skills_frontend",
        "category": "skills",
        "text": "Technical Skills - Frontend Frameworks & Libraries: React.js, Next.js, HTML5, CSS3, Tailwind CSS, Bootstrap, Material UI."
    },
    {
        "id": "skills_backend",
        "category": "skills",
        "text": "Technical Skills - Backend Frameworks & API Development: FastAPI, Node.js, Express.js, Django, REST APIs."
    },
    {
        "id": "skills_ai",
        "category": "skills",
        "text": "Technical Skills - AI Engineering & Agent Orchestration: Large Language Models (LLMs), LangGraph, CrewAI, Retrieval-Augmented Generation (RAG), ChromaDB, Prompt Engineering, Vector Databases, Semantic + Hybrid Search, Explainable AI."
    },
    {
        "id": "skills_databases",
        "category": "skills",
        "text": "Technical Skills - Databases: MongoDB, SQLite, MySQL, ChromaDB. Machine Learning: Scikit-learn, Pandas, NumPy."
    },
    {
        "id": "skills_tools",
        "category": "skills",
        "text": "Technical Skills - Tools & Platforms: Git, GitHub, VS Code, Postman, AWS (basics), Vercel. CS Fundamentals: Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Operating Systems (OS), Database Management Systems (DBMS), System Design, Debugging, Agile."
    },
    # Featured Projects
    {
        "id": "project_insurance",
        "category": "projects",
        "text": "Project 1: Insurance Claims Investigation Assistant. Stack: FastAPI, React, LangGraph, ChromaDB, SQLite, Python. Features: Multi-step LangGraph agent workflow (intake -> fraud detection -> similar-claim retrieval -> risk scoring -> explainable recommendations). Hybrid RAG (semantic + keyword search) over historical claims, Random Forest fraud model with SHAP explainability, and full REST API layer with Pydantic/SQLAlchemy."
    },
    {
        "id": "project_support",
        "category": "projects",
        "text": "Project 2: Multi-Agent Customer Support Platform. Stack: Python, FastAPI, LangGraph, CrewAI, ChromaDB. Features: Specialized agents for intent classification, policy retrieval (RAG), and automated decision-making. Context-aware, policy-grounded responses via RAG, and transparent, auditable reasoning traces."
    },
    {
        "id": "project_netflix",
        "category": "projects",
        "text": "Project 3: Netflix Clone. Stack: MERN (MongoDB, Express, React, Node.js). Features: Full-stack streaming platform with secure authentication, responsive content browsing UI, and REST APIs for authentication and content management."
    },
    # Beyond Tech - Achievements
    {
        "id": "achievement_emceeing",
        "category": "achievements",
        "text": "Achievements - Emceeing: Hosted university-level college day celebrations and Pongal festivals. Outstanding stage presence, communication skills, and crowd coordination for events with 2,000+ attendees."
    },
    {
        "id": "achievement_adzap",
        "category": "achievements",
        "text": "Achievements - Adzap: Won Second Prize in Adzap (competitive improvisational ad-pitching) at Techutsav, a national-level technical symposium. Demonstrates quick thinking, sales pitch improvisation, and creative communication."
    },
    {
        "id": "achievement_debate",
        "category": "achievements",
        "text": "Achievements - Debate: Represented and debated at SRM University's Milan (university-level intercollege cultural festival), demonstrating strong persuasive argumentation, research skills, and public speaking."
    },
    {
        "id": "achievement_script",
        "category": "achievements",
        "text": "Achievements - Script Writing: Won First Prize in Script Writing at SRM University's Milan intercollege cultural festival, demonstrating storytelling ability, narrative structure, and creative writing."
    },
    # Certifications
    {
        "id": "certification_ai",
        "category": "certifications",
        "text": "Certification: AI in IT Industry and its Future Prospects, awarded by SRM Valliammai Engineering College (VEC) in 2024."
    },
    {
        "id": "certification_mern",
        "category": "certifications",
        "text": "Certification: MERN Full Stack Beginner Guide, awarded by SRM Valliammai Engineering College (VEC) in 2025."
    }
]

def precompute():
    print(f"Loaded {len(PORTFOLIO_CHUNKS)} portfolio chunks to embed...")
    
    if not api_key or not client:
        print("ERROR: GEMINI_API_KEY environment variable is not set. Cannot embed.")
        return
        
    embedded_chunks = []
    
    for i, chunk in enumerate(PORTFOLIO_CHUNKS):
        print(f"Embedding chunk {i+1}/{len(PORTFOLIO_CHUNKS)}: {chunk['id']}...")
        try:
            # We call the gemini-genai client model endpoint
            response = client.models.embed_content(
                model="gemini-embedding-001",
                contents=chunk["text"]
            )
            
            # Extract floats list
            vector = response.embeddings[0].values
                
            embedded_chunks.append({
                "id": chunk["id"],
                "category": chunk["category"],
                "text": chunk["text"],
                "vector": vector
            })
            # Sleep slightly to respect rate limits
            time.sleep(0.5)
        except Exception as e:
            print(f"Error embedding chunk {chunk['id']}: {e}")
            
    # Write to embeddings.json
    output_path = os.path.join(os.path.dirname(__file__), "embeddings.json")
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(embedded_chunks, f, indent=2, ensure_ascii=False)
        print(f"Successfully wrote {len(embedded_chunks)} embedded chunks to {output_path}")
    except Exception as e:
        print(f"Failed to write embeddings to file: {e}")

if __name__ == "__main__":
    precompute()
