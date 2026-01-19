from pydantic import BaseModel
from typing import Optional

class SensorData(BaseModel):
    timestamp: str
    pressure: float
    flow: float
    volume: float
    oxygenLevel: int

class WebSocketResponse(BaseModel):
    type: str  # "DATA", "WARNING", "STOPPED"
    payload: Optional[SensorData] = None
    message: Optional[str] = None