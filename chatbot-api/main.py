from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from anthropic import Anthropic
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import re

load_dotenv()


with open("system_prompt.txt", "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read()


def strip_markdown(text: str) -> str:
    text = re.sub(r'#{1,6}\s+', '', text)
    text = re.sub(r'\*{1,3}(.*?)\*{1,3}', r'\1', text)
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'[\U0001F000-\U0001FFFF\U00002600-\U000027BF]', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)
client = Anthropic()

class Message(BaseModel):
    message: str

@app.post("/chat")
async def chat(body: Message):
    response = client.messages.create(
        model="claude-haiku-4-5",
        max_tokens=500,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": body.message}]
    )
    reply = response.content[0].text
    return {"reply": strip_markdown(reply)}

@app.get("/health")
async def health():
    return {"status": "online"}