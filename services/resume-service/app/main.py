from fastapi import FastAPI

from .db import engine
from .models import Base

from .routes.resume_routes import (
    router
)

from fastapi.middleware.cors import CORSMiddleware

import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():

    for _ in range(10):

        try:

            Base.metadata.create_all(
                bind=engine
            )

            print(
                "Tables created"
            )

            break

        except Exception:

            time.sleep(2)

app.include_router(

    router,

    prefix="/resume",

    tags=["resume"]
)

@app.get("/")
def root():

    return {
        "message":
        "resume service running"
    }