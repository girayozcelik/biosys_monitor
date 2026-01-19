import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.simulator import VentilatorSimulator
from app.schemas.sensor import WebSocketResponse

router = APIRouter()
simulator = VentilatorSimulator()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print(f"Client Connected: {websocket.client}")
    
    simulator.reset()
    
    try:
        while True:
    
            result = simulator.tick()
            
            status = result["status"]
            
           
            if status == "STOPPED":
                response = WebSocketResponse(
                    type="STOPPED",
                    message="System Halted by Predictive Maintenance Protocol."
                )
                await websocket.send_json(response.model_dump())
                # Döngüyü kırma, sadece bekle (Client )belki reset atar
                await asyncio.sleep(1)
                continue

            elif status == "WARNING":
                response = WebSocketResponse(
                    type="PREDICTION_WARNING",
                    payload=result["data"],
                    message=result["prediction"]
                )
                await websocket.send_json(response.model_dump())
            
            else:
                response = WebSocketResponse(
                    type="DATA",
                    payload=result["data"]
                )
                await websocket.send_json(response.model_dump())

            await asyncio.sleep(0.2)

    except WebSocketDisconnect:
        print("Client Disconnected")
    except Exception as e:
        print(f"Error: {e}")
        await websocket.close()