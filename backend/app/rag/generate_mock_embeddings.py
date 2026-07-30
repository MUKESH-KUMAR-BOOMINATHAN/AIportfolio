import os
import json
import random
import sys

# Add backend directory to path so we can import from app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from app.rag.precompute_embeddings import PORTFOLIO_CHUNKS

def generate_mock():
    print(f"Generating mock embeddings for {len(PORTFOLIO_CHUNKS)} chunks...")
    embedded_chunks = []
    
    # Seed for reproducibility of mock vector scores
    random.seed(42)
    
    for chunk in PORTFOLIO_CHUNKS:
        # Generate 768 random floats
        vector = [random.uniform(-0.1, 0.1) for _ in range(768)]
        # L2 Normalize
        l2_norm = sum(x*x for x in vector) ** 0.5
        vector = [x / l2_norm for x in vector]
        
        embedded_chunks.append({
            "id": chunk["id"],
            "category": chunk["category"],
            "text": chunk["text"],
            "vector": vector
        })
        
    output_path = os.path.join(os.path.dirname(__file__), "embeddings.json")
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(embedded_chunks, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved mock embeddings of size 768 to {output_path}")
    except Exception as e:
        print(f"Error writing mock embeddings: {e}")

if __name__ == "__main__":
    generate_mock()
