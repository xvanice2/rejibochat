from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain # 
from langchain.memory import ConversationEntityMemory #neudrzuje si celu pamat ale prechadza to a uklada do entit a sumarizuje. Cize nepamata si celu historiu ale iba nejake specificke casti (entity, ktre si uloiz) a na to pouziva language model
from langchain.memory.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE #
from pydantic import BaseModel

class Message(BaseModel):
    text: str

origins = [
    "http://localhost:3000",
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
API_KEY = os.getenv('OPENAI_API_KEY')


if os.getenv('OPENAI_API_KEY') is None or os.getenv('OPENAI_API_KEY') == '':
    print("OPENAI_API_KEY is not set. Please add your key to .env")
    exit(1)
else:
        print("API key set.")

llm = ChatOpenAI() #initializing language model
conversation = ConversationChain(
    llm=llm, # language model
    memory=ConversationEntityMemory(llm=llm),# memory
    prompt=ENTITY_MEMORY_CONVERSATION_TEMPLATE,
    verbose=False
)

print("Hello, I am ChatGPT Rejibo")

@app.get("/")
def read_root():
    return "Hello, I am ChatGPT Rejibo"

@app.post("/message")
async def index(message: Message):
    ai_response = conversation.predict(input=message.text)
    return ai_response

#Main method
if __name__=='__main__':
    #Server setup
    app.run(debug=False, host='0.0.0.0')