from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, complaints, clusters, dashboard, insights

# Create DB tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="LocalHelp AI API")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["complaints"])
app.include_router(clusters.router, prefix="/api/clusters", tags=["clusters"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])

@app.get("/")
def read_root():
    return {"message": "Welcome to LocalHelp AI API"}
