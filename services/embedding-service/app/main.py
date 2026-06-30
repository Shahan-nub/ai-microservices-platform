from fastapi import FastAPI

app = FastAPI(
    title="embedding-service"
)

@app.get("/")
def root():
    return {
        "message":"embedding running"
    }