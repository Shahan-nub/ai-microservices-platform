from fastapi import FastAPI

app = FastAPI(
    title="notification-service"
)

@app.get("/")
def root():
    return {
        "message":"notification running"
    }