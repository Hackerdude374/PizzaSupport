from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from transformers import pipeline
from prisma import Prisma
import redis
import tensorflow as tf

app = FastAPI()
db = Prisma()

redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Load GPT-4 model from Hugging Face
model_name = "gpt-4"
generator = pipeline('text-generation', model=model_name)

# Load TensorFlow sentiment analysis model
sentiment_model = tf.keras.models.load_model('path_to_saved_model')

class Query(BaseModel):
    question: str
    user_id: int = None

def analyze_sentiment(text):
    # Preprocess the text and predict sentiment (dummy implementation)
    processed_text = text.lower().strip()
    # Replace the following line with actual text preprocessing and prediction
    prediction = sentiment_model.predict([processed_text])
    return prediction

@app.post("/query/")
async def get_response(query: Query):
    cleaned_input = query.question.lower().strip()
    
    # Analyze sentiment
    sentiment = analyze_sentiment(cleaned_input)

    cached_response = redis_client.get(cleaned_input)
    if cached_response:
        return {"response": cached_response.decode('utf-8'), "sentiment": sentiment}
    
    response = generator(cleaned_input, max_length=100, num_return_sequences=1)
    redis_client.set(cleaned_input, response[0]['generated_text'])

    if query.user_id:
        await db.message.create({
            'data': {
                'content': response[0]['generated_text'],
                'userId': query.user_id
            }
        })
    
    return {"response": response[0]['generated_text'], "sentiment": sentiment}
