from pydantic import BaseModel, Field
from typing import Optional, List

class Message(BaseModel):
    role: str = Field(..., description="Role of the message author: 'user' or 'assistant'")
    content: str = Field(..., description="Content of the message")

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's question or prompt")
    history: Optional[List[Message]] = Field(default=[], description="Previous message history")
    tone: Optional[str] = Field(default="concise", description="Preferred response tone: 'concise' or 'detailed'")
