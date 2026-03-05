# Vidya-Setu – Bridge of Knowledge 🎓

**AI-powered educational tutor for rural Indian students**

Built for the **AI for Bharat Hackathon** by Team DreamAlpha.

---

## 🌟 What is Vidya-Setu?

Vidya-Setu helps rural Indian school students learn school subjects (Physics, Maths, Biology, Geography) in their **own language** (English or Kannada) using **culturally relevant examples** that connect to their daily lives.

### Key Features
- 🗣️ **Multilingual** — English & Kannada, with more languages in the roadmap
- 🤖 **AI-Powered** — Uses Amazon Bedrock (Claude 3.5 Sonnet) for smart explanations
- 🌾 **Local Analogies** — Explains concepts using farming, cricket, festivals, rivers
- 📵 **Offline-Ready** — Saves last 3 Knowledge Cards; works without internet
- 📱 **Mobile-First** — Works on cheap Android phones as a PWA
- 🧠 **Interactive Quiz** — Tests understanding after every explanation

---

## 🏗️ Architecture

```
Student (Phone Browser)
        ↓
React PWA Frontend   [Vercel]
        ↓  POST /api/ask
FastAPI Backend      [Render]
    ↓              ↓
Amazon Bedrock   Bhashini API
(Claude 3.5)     (NMT/ASR/TTS)
```

---

## 🚀 How to Run Locally

### Step 1: Start the Backend

```bash
cd vidya-setu/backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env: set MOCK_MODE=true (or add real AWS keys)
uvicorn app.main:app --reload --port 8000
```

Backend will run at: **http://localhost:8000**  
API docs: **http://localhost:8000/docs**

### Step 2: Start the Frontend

Open a new terminal:

```bash
cd vidya-setu/frontend
npm install
npm run dev
```

Frontend will run at: **http://localhost:5173**

### Step 3: Open in Browser

Go to **http://localhost:5173** — the app is ready!

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🌐 Live Demo | *(add after deployment)* |
| 🎬 Demo Video | *(add after recording)* |
| 📦 GitHub Repo | *(add your repo URL)* |

---

## 📁 Project Structure

```
vidya-setu/
├── frontend/         # React PWA (TypeScript + Vite)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Main pages
│   │   ├── services/     # API calls
│   │   └── hooks/        # Custom React hooks
│   └── public/           # Static assets + PWA manifest
│
├── backend/          # FastAPI backend (Python)
│   ├── app/
│   │   ├── main.py           # FastAPI app + endpoints
│   │   ├── schemas.py        # Data models
│   │   ├── bedrock_client.py # Amazon Bedrock integration
│   │   └── bhashini_client.py # Bhashini integration
│   └── tests/            # Automated tests
│
└── docs/             # Documentation
    ├── requirements.md
    ├── design.md
    ├── ppt-outline.md
    └── submission-checklist.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript (Vite), PWA |
| Backend | Python + FastAPI |
| AI/LLM | Amazon Bedrock (Claude 3.5 Sonnet) |
| Language | Bhashini API (NMT) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 👥 Team DreamAlpha

Built with ❤️ for rural India · AI for Bharat Hackathon 2024
