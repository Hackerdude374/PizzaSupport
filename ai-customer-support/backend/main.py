from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from transformers import pipeline
from prisma import Prisma

app = FastAPI()
db = Prisma()

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()

# Load the GPT-4 model from Hugging Face
model_name = "gpt-4"
generator = pipeline('text-generation', model=model_name)

class Query(BaseModel):
    question: str

@app.post("/query/")
async def get_response(query: Query):
    cleaned_input = query.question.lower().strip()
    response = generator(cleaned_input, max_length=100, num_return_sequences=1)
    return {"response": response[0]['generated_text']}
