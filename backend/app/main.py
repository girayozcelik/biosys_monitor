from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import websocket
from app.core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Ayarları (Frontend'in bağlanabilmesi için)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websocket.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)