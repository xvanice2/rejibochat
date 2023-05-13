from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
import os

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain # 
from langchain.memory import ConversationEntityMemory #neudrzuje si celu pamat ale prechadza to a uklada do entit a sumarizuje. Cize nepamata si celu historiu ale iba nejake specificke casti (entity, ktre si uloiz) a na to pouziva language model
from langchain.memory.prompt import ENTITY_MEMORY_CONVERSATION_TEMPLATE #

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
async def index():
    ai_response = conversation.predict(input="Ahoj")
    return ai_response

#Main method
if __name__=='__main__':
    #Server setup
    app.run(debug=False, host='0.0.0.0')