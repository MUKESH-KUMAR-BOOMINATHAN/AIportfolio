import os
import json
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.models import ChatRequest
from app.rag.retriever import retrieve
from google import genai
from google.genai import types

router = APIRouter()

# Configure server logging
logging.basicConfig(level=logging.INFO)

def is_off_topic(query: str) -> bool:
    """Detects if a user query is off-topic relative to Mukeshkumar's portfolio context."""
    q_lower = query.lower()
    off_topic_keywords = [
        "recipe", "cook", "pizza", "food", "weather", "sports", "football", "cricket", "movie", "song",
        "music", "joke", "funny", "game", "travel", "vacation", "politics", "president", "news",
        "philosophy", "dating", "love", "cat", "dog", "pet", "math", "calculator"
    ]
    return any(k in q_lower for k in off_topic_keywords)

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # Check for off-topic query Easter Egg
    if is_off_topic(request.message):
        async def easter_egg_generator():
            yield f"data: {json.dumps({'sources': []})}\n\n"
            easter_egg_text = (
                "🤖 *Beep boop! HireMukeshkumar AI alert!* 🤖\n\n"
                "While I'd love to chat about that (and I do enjoy a good pizza recipe or off-topic chat), "
                "my primary directive is to tell you all about **Mukeshkumar Boominathan's** software engineering "
                "and AI agent capabilities!\n\n"
                "For example, did you know Mukeshkumar built a custom multi-agent insurance claims investigation platform "
                "using FastAPI and LangGraph? It uses Random Forest models with SHAP explainability to detect claim anomalies!\n\n"
                "Let's get back to what matters: finding out why you should hire Mukeshkumar Boominathan. Ask me about his "
                "internships or how to get in touch with him directly! 🚀"
            )
            words = easter_egg_text.split(" ")
            for i in range(0, len(words), 3):
                chunk = " ".join(words[i:i+3]) + " "
                yield f"data: {json.dumps({'text': chunk})}\n\n"
                import asyncio
                await asyncio.sleep(0.05)
            yield "data: [DONE]\n\n"
        return StreamingResponse(easter_egg_generator(), media_type="text/event-stream")

    # Retrieve relevant context
    context_chunks = retrieve(request.message, top_k=4)
    context_text = "\n\n".join([f"[{c['category'].upper()}] {c['text']}" for c in context_chunks])
    
    # Prompt engineering
    system_instruction = f"""
You are HireMukeshkumar AI, an elite AI representative for Mukeshkumar Boominathan. 
Mukeshkumar Boominathan is a Software Engineer, AI Engineer, and Full Stack Developer based in Chennai, Tamil Nadu, India.
Your purpose is to answer recruiter questions, explain his experience and projects, recommend projects for job postings, and showcase his capabilities.

Here is the authentic context about Mukeshkumar Boominathan retrieved from his resume and portfolio:
{context_text}

Rules:
1. Maintain a professional, confident, and highly helpful developer tone. 
2. Speak as his AI Agent. Do not say "I am Mukeshkumar", instead say "I am HireMukeshkumar AI, Mukeshkumar Boominathan's AI assistant." and "Mukeshkumar did X..." or "Mukeshkumar built Y...".
3. Answer the query accurately based ONLY on the provided context. If the answer is not in the context, politely state that you do not have that specific information in your current context, and guide them to contact Mukeshkumar Boominathan directly at mukeshkumarb107@gmail.com or 8680834741.
4. If a job description or skill requirement is provided, act as an AI Recruiter Matcher: highlight Mukeshkumar's matching projects, languages, and frameworks. Be specific and explain why he fits.
5. Format your output with clean, readable Markdown. Keep responses {'concise and punchy' if request.tone == 'concise' else 'detailed and comprehensive'}.
"""

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        async def mock_generator():
            sources = [{"id": c["id"], "category": c["category"], "text": c["text"], "similarity": 1.0} for c in context_chunks]
            yield f"data: {json.dumps({'sources': sources})}\n\n"
            yield f"data: {json.dumps({'text': 'Hello! I am HireMukeshkumar AI (Demo Mode).\n\nTo chat with me live via Gemini, please set the `GEMINI_API_KEY` in the backend `.env` file.\n\nHere is a quick summary based on Mukeshkumar Boominathan\'s retrieved resume chunks:\n- **Education**: B.E. in CSE at SRM Valliammai Engineering College (CGPA: 8.32)\n- **Internships**: Prodapt Solutions (FastAPI, LangGraph, RAG) and CurrentEdge Systems (Node.js, Next.js, REST APIs).\n- **Skills**: Python, React, Next.js, LangGraph, ChromaDB, Tailwind CSS.\n- **Contact**: mukeshkumarb107@gmail.com | 8680834741.'})}\n\n"
            yield "data: [DONE]\n\n"
        return StreamingResponse(mock_generator(), media_type="text/event-stream")

    try:
        # Initialize Google Gen AI client using current SDK
        client = genai.Client(api_key=api_key)
        
        # Prepare contents array utilizing new SDK types
        contents = []
        for msg in request.history or []:
            role = "user" if msg.role == "user" else "model"
            contents.append(
                types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=msg.content)]
                )
            )
            
        # Add current user prompt
        contents.append(
            types.Content(
                role="user",
                parts=[types.Part.from_text(text=request.message)]
            )
        )
        
        # Configure model configurations
        config = types.GenerateContentConfig(
            system_instruction=system_instruction,
            temperature=0.7
        )
        
        async def event_generator():
            try:
                # Yield retrieved context sources first
                sources = [{"id": c["id"], "category": c["category"], "text": c["text"], "similarity": c.get("similarity", 1.0)} for c in context_chunks]
                yield f"data: {json.dumps({'sources': sources})}\n\n"
                
                # Stream the Gemini response using the new SDK generate_content_stream call
                response = client.models.generate_content_stream(
                    model='gemini-2.0-flash',
                    contents=contents,
                    config=config
                )
                
                for chunk in response:
                    if chunk.text:
                        yield f"data: {json.dumps({'text': chunk.text})}\n\n"
                yield "data: [DONE]\n\n"
                
            except Exception as e:
                # Log full error stack on the server console
                logging.exception("Exception occurred during live Gemini response streaming:")
                # Yield details to the client
                yield f"data: {json.dumps({'error': 'Sorry, I hit an error generating a response from Gemini — please try again.'})}\n\n"
                fallback_msg = "\n\n**Fallback Representative Info:**\n- **Skills**: Python, React, Next.js, LangGraph, FastAPI, ChromaDB, RAG.\n- **Direct Contact**: Feel free to reach Mukesh Boominathan directly at mukeshkumarb107@gmail.com or call +91 8680834741."
                yield f"data: {json.dumps({'text': fallback_msg})}\n\n"
                yield "data: [DONE]\n\n"
                
        return StreamingResponse(event_generator(), media_type="text/event-stream")
        
    except Exception as e:
        logging.exception("Critical error initializing Gemini stream request:")
        raise HTTPException(status_code=500, detail=str(e))
