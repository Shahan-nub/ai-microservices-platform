from fastapi import FastAPI

from .routes.chat_routes import router
from .db import engine
from .models import Base

import time


app = FastAPI()

app.include_router(
    router,
    prefix="/chat",
    tags=["chat"]
)

@app.get("/")
def root():
    return {
        "message":"chat running"
    }



@app.on_event("startup")
def startup():

    for _ in range(10):

        try:

            Base.metadata.create_all(
                bind=engine
            )

            print("Tables created")

            break

        except Exception as e:
            print(e)
            time.sleep(2)