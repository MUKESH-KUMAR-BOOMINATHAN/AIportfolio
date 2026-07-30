import os
import json
import math
import logging
from typing import List, Dict
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = None
if api_key:
    client = genai.Client(api_key=api_key)

EMBEDDINGS_FILE = os.path.join(os.path.dirname(__file__), "embeddings.json")
_embeddings_cache: List[Dict] = []

def load_embeddings() -> List[Dict]:
    """Loads and caches precomputed embeddings from JSON."""
    global _embeddings_cache
    if _embeddings_cache:
        return _embeddings_cache
        
    if not os.path.exists(EMBEDDINGS_FILE):
        logging.warning(f"Embeddings file {EMBEDDINGS_FILE} not found. RAG matching disabled.")
        return []
        
    try:
        with open(EMBEDDINGS_FILE, "r", encoding="utf-8") as f:
            _embeddings_cache = json.load(f)
        return _embeddings_cache
    except Exception:
        logging.exception("Error loading embeddings file")
        return []

def dot_product(v1: List[float], v2: List[float]) -> float:
    return sum(x * y for x, y in zip(v1, v2))

def norm(v: List[float]) -> float:
    return math.sqrt(sum(x * x for x in v))

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    n1 = norm(v1)
    n2 = norm(v2)
    if n1 == 0 or n2 == 0:
        return 0.0
    return dot_product(v1, v2) / (n1 * n2)

def retrieve(query: str, top_k: int = 4) -> List[Dict]:
    """
    Embeds the user query and retrieves top K chunks from precomputed embeddings 
    using cosine similarity under the new google-genai client.
    """
    chunks = load_embeddings()
    if not chunks:
        return []
        
    if not api_key or not client:
        logging.warning("GEMINI_API_KEY or Client not initialized. Returning first chunks.")
        return chunks[:top_k]
        
    try:
        # Get query embedding using genai Client
        response = client.models.embed_content(
            model="gemini-embedding-001",
            contents=query
        )
        
        query_vector = response.embeddings[0].values
            
        if not query_vector:
            logging.warning("Empty query vector returned from Gemini. Returning fallback.")
            return chunks[:top_k]
            
        # Calculate similarity scores
        scored_chunks = []
        for chunk in chunks:
            vector = chunk.get("vector")
            if not vector:
                continue
            sim = cosine_similarity(query_vector, vector)
            scored_chunks.append({
                "id": chunk["id"],
                "category": chunk["category"],
                "text": chunk["text"],
                "similarity": sim
            })
            
        # Sort in descending order of similarity
        scored_chunks.sort(key=lambda x: x["similarity"], reverse=True)
        return scored_chunks[:top_k]
        
    except Exception:
        logging.exception("Exception occurred in RAG retriever database query. Returning fallback.")
        return chunks[:top_k]
