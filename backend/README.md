# Mindflare Backend 🐍

The core API for the MindflareAI platform. Built with Python 3.11, Flask, and MongoDB Atlas.

## 🚀 Core Features

- **Auth Engine**: Native registration, login, and JWT session handling using MongoDB as a single source of truth.
- **RAG Pipelines**: Advanced Retrieval-Augmented Generation for multiple knowledge bases.
- **Ingestion Tools**: Support for PDFs, websites, and GitHub repositories with automated vectorization.
- **Admin API**: Programmatic management of applications, knowledge bases, and user settings.
- **Analytics**: Comprehensive tracking of chat usage, KB efficiency, and system performance.
- **Voice Integration**: ElevenLabs support for text-to-speech interaction.

---

## 🏗️ Technical Implementation

### Prerequisites
- Python 3.11+
- Virtualenv or Conda
- MongoDB Atlas account (free tier is fine)

### Setup & Installation

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements-render.txt
   ```

3. Environment Setup:
   Create a `.env` file with the following variables:
   ```env
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=...
   OPENROUTER_API_KEY=...
   GROQ_API_KEY=...
   ENCRYPTION_KEY=...
   ELEVENLABS_API_KEY=...
   GITHUB_CLIENT_ID=...
   GITHUB_CLIENT_SECRET=...
   FRONTEND_URL=https://mindflareai.vercel.app
   REDIS_URL=...
   GEMINI_API_KEY=...
   FIRECRAWL_API_KEY=...
   ```

4. Run the server:
   ```bash
   gunicorn app:app --bind 0.0.0.0:5000 --workers 2 --timeout 120
   ```

---

## 🛠️ Tech Stack

| Tool | Usage |
|------|-------|
| **Flask** | Lightweight web framework. |
| **PyMongo** | MongoDB driver with SRV support. |
| **LangChain** | Core RAG and LLM orchestration logic. |
| **PyJWT** | Authentication token generation and validation. |
| **Werkzeug** | Password hashing (bcrypt-based). |
| **Gunicorn** | Production WSGI server. |

---

## 📁 Structure

```bash
backend/
├── app.py              # Application entry point
├── database.py         # MongoDB connection and schema
├── auth.py             # Auth middlewares and JWT logic
├── auth_routes.py      # Registration/Login handlers
├── applications.py     # App management routes
├── knowledge_base.py   # RAG and ingestion routes
├── chat.py             # Chat and orchestration logic
└── requirements-render.txt # Production dependencies
```

---

## 📄 Deployment

The backend is deployed on **Render** with a production API URL: `https://mindflare-api.onrender.com`.


