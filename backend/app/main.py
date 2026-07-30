import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat
from dotenv import load_dotenv

# Pre-load environment configuration
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Critical Startup Check: Validate that the Gemini API key is loaded
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or not api_key.strip():
        raise RuntimeError(
            "\n========================================================================\n"
            "CRITICAL STARTUP ERROR:\n"
            "The environment variable 'GEMINI_API_KEY' is missing or empty.\n"
            "Please configure the key in your backend/.env file before running.\n"
            "You can acquire a free tier key at: https://aistudio.google.com/\n"
            "========================================================================"
        )
    print("[Startup Check] GEMINI_API_KEY is successfully loaded.")
    yield

app = FastAPI(
    title="Mukesh Boominathan Portfolio AI Backend",
    description="FastAPI service serving HireMukesh AI with static RAG using the new google-genai SDK",
    version="1.1.0",
    lifespan=lifespan
)

# CORS configuration to accept requests from localhost and production frontend domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://mukesh-portfolio.vercel.app",
        "https://mukesh-portfolio-git-main-mukesh-kumar-boominathans-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat.router, prefix="/api", tags=["Chat"])

@app.get("/")
def read_root():
    return {
        "message": "Mukesh's AI Portfolio Backend API is online.",
        "docs_url": "/docs",
        "status": "active"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
