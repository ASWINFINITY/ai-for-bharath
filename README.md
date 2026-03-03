# LocalHelp AI 

AI-Powered Civic Intelligence Platform. This application enables local authorities and citizens to report, cluster, and manage civic issues in real-time.

## Features
- **Intelligent Clustering**: Groups similar nearby complaints into priority zones using NLP (sentence-transformers).
- **Signal Fusion AI**: Detects connected issues across categories (e.g. broken pipe + electricity) and flags them.
- **Authority Dashboard**: Real-time metrics on response times, high-risk zones, and civic hotspots.
- **Modern UI**: Built with React, Vite, Tailwind CSS with full Dark Mode support.

## Tech Stack
- Frontend: React, Vite, React Router, Tailwind CSS, Axios
- Backend: FastAPI, SQLAlchemy, SQLite (Development), PyJWT
- AI Layer: SentenceTransformers (all-MiniLM-L6-v2), Scikit-Learn

## Getting Started

### 1. Backend Setup

Open a terminal and navigate to the backend folder:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
```

Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the seed script to populate demo data (this also triggers the initial AI clustering):
```bash
python seed.py
```

Start the API Server:
```bash
uvicorn main:app --reload
```
The API runs at http://localhost:8000.

### 2. Frontend Setup

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The Frontend runs at http://localhost:5173.

## Usage
1. Open the frontend URL in your browser.
2. Toggle between Light Mode and Dark Mode using the header icon.
3. Browse the **Live Map** and **Authority Dashboard** to see the clustered demo data.
4. Use the **Report Issue** form to create a new complaint. Observe how it updates the Authority Dashboard stats instantly!
