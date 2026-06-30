from fastapi import FastAPI

from .db import engine
from .models import Base
from .routes.auth_routes import router

app = FastAPI()

# @app.on_event("startup")
# def startup():
#     Base.metadata.create_all(bind=engine)


import time

@app.on_event("startup")
def startup():

    for i in range(10):

        try:
            Base.metadata.create_all(bind=engine)

            print("Tables created")

            break

        except Exception as e:

            print("DB not ready", e)

            time.sleep(2)

            
app.include_router(
    router,
    prefix="/auth",
    tags=["auth"]
)

@app.get("/")
def root():
    return {"message": "auth running"}