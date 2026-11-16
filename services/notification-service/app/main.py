import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import Base, engine
from .routes import router

app = FastAPI(title="notification-service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    for attempt in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            print("Notification tables ready")
            return
        except Exception as exc:
            if attempt == 9:
                raise
            print("Database not ready for notification service:", exc)
            time.sleep(2)


app.include_router(router, prefix="/notify", tags=["notifications"])


@app.get("/")
def root():
    return {"message": "notification running"}
