# Mukesh's Portfolio AI Backend (FastAPI + Gemini RAG)

This Python FastAPI service acts as the AI engine behind the **HireMukesh AI** chatbot. It retrieves context from a precomputed embedding database of Mukesh's resume, experience, skills, and projects, and uses the Gemini API to stream context-aware answers back to the user.

## Tech Stack
- **FastAPI**: Lightweight ASGI web framework for Python.
- **google-generativeai**: Gemini SDK.
- **uv**: Hyper-fast Python package installer and resolver.
- **Pydantic**: Data validation and settings management.

## Project Structure
```
backend/
├── app/
│   ├── main.py              # FastAPI entrypoint
│   ├── models.py            # Pydantic schema validation
│   ├── routes/
│   │   └── chat.py          # /chat SSE streaming route
│   └── rag/
│       ├── precompute_embeddings.py  # Embedding builder script
│       ├── retriever.py              # Cosine similarity matching
│       └── embeddings.json           # Cached JSON vector database
├── pyproject.toml           # Project dependencies
├── uv.lock                  # UV environment lockfile
└── .env.example             # Configuration variables
```

## Setup & Running Locally

1. **Prerequisites**:
   - Install Python 3.12+ (standard CPython).
   - Install `uv` via pip:
     ```bash
     python -m pip install uv
     ```

2. **Sync Virtual Environment**:
   Ensure you are in the `/backend` directory and run:
   ```bash
   python -m uv sync
   ```
   This will automatically create a `.venv` directory and download all pinned dependencies.

3. **Set Environment Variables**:
   Copy `.env.example` to `.env` and fill in your `GEMINI_API_KEY`:
   ```bash
   copy .env.example .env
   ```
   Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

4. **Precompute Embeddings**:
   Embed Mukesh's portfolio content chunks and output `embeddings.json` by running:
   ```bash
   python -m uv run app/rag/precompute_embeddings.py
   ```
   *(Ensure `GEMINI_API_KEY` is set in your terminal or `.env` file first).*

5. **Start Development Server**:
   ```bash
   python -m uv run uvicorn app.main:app --reload --port 8000
   ```
   The backend API will be available at `http://localhost:8000`. You can inspect interactive Swagger documentation at `http://localhost:8000/docs`.

## Deployment
This service is configured with standard CORS to accept requests from localhost and your production portfolio domain. It is ready to deploy to Render, Railway, or any Python cloud provider.
- **Start Command**: `python -m uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`
