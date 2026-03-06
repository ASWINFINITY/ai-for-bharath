# LocalHelp AI - Setup Instructions

Welcome to the **LocalHelp AI** repository! Follow these step-by-step instructions to get the project running locally on your machine.

**Prerequisites:**
Before you start, make sure you have the following installed on your computer:
1. **Git** (to clone the code)
2. **Python** (version 3.8+ recommended)
3. **Node.js** (to run the React frontend)

---

## 🚀 1. Clone the Repository

Open a terminal and download the project to your computer:
```bash
git clone https://github.com/ASWINFINITY/ai-for-bharath.git
cd ai-for-bharath
```

---

## ⚙️ 2. Set up the Backend (Python & FastAPI)

Open a terminal in the `ai-for-bharath/backend` folder:
```bash
cd backend
```

Create and activate a virtual environment:
- **Windows:**
  ```bash
  python -m venv venv
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

Install the required Python packages:
```bash
pip install -r requirements.txt
```

Create an environment configuration file:
Create a `.env` file in the `backend` folder and add the database connection details. (Ask Aswin for the exact credentials, or use your own Supabase instance):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
DATABASE_URL=your_postgres_database_url
```

Start the backend API server:
```bash
uvicorn main:app --reload
```
*(The backend will now be running at http://localhost:8000)*

---

## 💻 3. Set up the Frontend (React & Vite)

Open a **new** terminal window (keep the backend running) and navigate to the `frontend` folder:
```bash
cd frontend
```

Install the required Node dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
*(The frontend will now be running at http://localhost:5173. Open this URL in your web browser to see the app!)*
