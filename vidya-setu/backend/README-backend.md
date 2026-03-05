# Vidya-Setu Backend

FastAPI backend for the Vidya-Setu AI tutor application.
Managed with **[uv](https://docs.astral.sh/uv/)** – the fast Python package manager.

## Quick Start

```bash
# 1. Install uv (if not already installed)
#    Windows: winget install astral-sh.uv
#    Or: pip install uv

# 2. Install all dependencies (creates .venv automatically)
uv sync --dev

# 3. Set up environment variables
copy .env.example .env
# Then open .env in a text editor and fill in your AWS keys

# 4. Run the backend server (development mode with auto-reload)
uv run uvicorn app.main:app --reload --port 8000
```

The backend will be running at: **http://localhost:8000**

## Testing the API

Open your browser and go to: **http://localhost:8000/docs**

This shows you an interactive API explorer (Swagger UI) where you can test all endpoints.

### Test with curl:

```bash
curl -X POST http://localhost:8000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"language": "en", "topic": "Physics - Gravity", "question": "What is gravity?"}'
```

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/health` | Check if server is running |
| POST | `/api/ask` | Ask a question, get Knowledge Card |
| POST | `/api/quiz/submit` | Submit quiz answer |
| GET | `/docs` | Swagger API docs |

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description | Required? |
|----------|-------------|-----------|
| `AWS_ACCESS_KEY_ID` | AWS IAM key | Only for real Bedrock |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret | Only for real Bedrock |
| `AWS_REGION` | AWS region (e.g. `ap-south-1`) | Only for real Bedrock |
| `BHASHINI_API_KEY` | Bhashini API key | Optional |
| `MOCK_MODE` | `true` = use fake responses | Set to `false` for real AI |
| `FRONTEND_URL` | Your React app URL | Set in production |

## Project Structure

```
backend/
├── app/
│   ├── __init__.py          # Package marker
│   ├── main.py              # FastAPI app + endpoints
│   ├── schemas.py           # Data models (request/response)
│   ├── bedrock_client.py    # Amazon Bedrock (Claude 3.5) integration
│   └── bhashini_client.py   # Bhashini translation integration
├── tests/
│   └── test_api.py          # Automated tests
├── .env.example             # Template for environment variables
├── requirements.txt         # Python dependencies
└── README-backend.md        # This file
```
