from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
import os
from ultralytics import YOLO

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain # 
from langchain.memory import ConversationEntityMemory #neudrzuje si celu pamat ale prechadza to a uklada do entit a sumarizuje. Cize nepamata si celu historiu ale iba nejake specificke casti (entity, ktre si uloiz) a na to pouziva language model
from langchain.memory.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE #
from pydantic import BaseModel

# Load a model
# model = YOLO("yolov8n.pt")  # load a pretrained model
model = YOLO("yolov8n-cls.pt")  # load a pretrained model for classification


class Message(BaseModel):
    text: str



app = FastAPI()
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

@app.get("/predict")
async def predict(url: str):
    results = model(url)  # predict based on image url from query param

    if len(results) == 0:
        return {
            "message": "no objects detected"
        }

    result = results[0]  # get the first result
    named_results = []
    i = 0

    for name in result.names.values():
        named_results.append({
            "name": name,
            "confidence": result.probs[i].item()
        })
        i += 1

    # filter out results with confidence less than 0.5
    filtered_results = [r for r in named_results if r["confidence"] > 0.5]


    return {
        "message": "success",
        "results": filtered_results
    }

#Main method
if __name__=='__main__':
    #Server setup
    app.run(debug=False, host='0.0.0.0')