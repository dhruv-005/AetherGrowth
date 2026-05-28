import contextlib
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import campaigns
from app.mcp_client.manager import mcp_manager

@contextlib.asynccontextmanager
async def app_lifespan(app: FastAPI):
    # Lifecycle startup sequence: Boot up all 4 background MCP microservices
    print("🚀 Initializing AetherGrowth Core OS Pipeline...")
    mcp_manager.launch_server("database-mcp")
    mcp_manager.launch_server("comms-mcp")
    mcp_manager.launch_server("analytics-mcp")
    mcp_manager.launch_server("ab-testing-mcp")
    yield
    # Lifecycle shutdown sequence: Safely terminate background sub-processes
    print("🛑 Shutting down system contexts...")
    mcp_manager.shutdown_all()

app = FastAPI(title="AetherGrowth Advanced Enterprise Backend", lifespan=app_lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(campaigns.router, prefix="/api")

@app.websocket("/ws/stream")
async def global_realtime_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        await websocket.send_json({"agent": "System Broker", "message": "Established real-time streaming pipeline context."})
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
