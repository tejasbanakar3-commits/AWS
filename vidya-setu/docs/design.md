# Design Document – Vidya-Setu

## 1. Problem Statement

Rural Indian school students face a "Learning Trilemma":
1. **Language barrier** — textbooks and digital content are in English
2. **No relatable context** — examples use urban scenarios (traffic, skyscrapers)
3. **No internet** — connectivity is intermittent in villages

Existing tutoring apps (Byju's, Khan Academy) require fast internet, English literacy, and expensive devices.

## 2. Solution Overview

**Vidya-Setu** is an AI tutor that:
- Teaches in the student's local language (Kannada, Hindi, etc.)
- Explains using culturally familiar analogies (farming, cricket, rivers)
- Works partially offline using saved Knowledge Cards
- Runs on any phone browser (no app install needed)

---

## 3. Architecture

### 3-Layer Model

```
┌─────────────────────────────────────────────┐
│  EDGE LAYER                                 │
│  React PWA (phone browser)                  │
│  - Offline caching (localStorage)           │
│  - Language selection                       │
│  - Question input + quiz interaction        │
└─────────────────┬───────────────────────────┘
                  │ HTTPS (POST /api/ask)
┌─────────────────▼───────────────────────────┐
│  BRIDGE LAYER                               │
│  FastAPI Backend (Render/EC2)               │
│  - Request validation                       │
│  - Bhashini integration (translation)       │
│  - Prompt engineering                       │
│  - Response formatting                      │
└─────────────────┬───────────────────────────┘
                  │ boto3 SDK
┌─────────────────▼───────────────────────────┐
│  BRAIN LAYER                                │
│  Amazon Bedrock – Claude 3.5 Sonnet         │
│  - Natural language understanding           │
│  - Culturally-aware explanation generation  │
│  - JSON-structured output                   │
└─────────────────────────────────────────────┘
```

### Data Flow

```
1. Student selects: language=kn, topic=Gravity, question="ಗುರುತ್ವ ಎಂದರೇನು?"
2. Frontend → POST /api/ask (JSON)
3. Backend: (optional) Bhashini translates "kn → en"
4. Backend: build prompt + call Bedrock (Claude 3.5)
5. Claude returns: { answer, analogy, quiz_question, quiz_answer }
6. Backend: (optional) Bhashini translates "en → kn"
7. Backend → Frontend: KnowledgeCard JSON
8. Frontend: display card, save to localStorage
9. Student answers quiz → POST /api/quiz/submit → is_correct + explanation
```

---

## 4. API Design

### POST /api/ask

**Request:**
```json
{
  "language": "kn",
  "topic": "Physics - Gravity",
  "question": "ಗುರುತ್ವಾಕರ್ಷಣೆ ಎಂದರೇನು?"
}
```

**Response:**
```json
{
  "language": "kn",
  "topic": "Physics - Gravity",
  "question": "ಗುರುತ್ವಾಕರ್ಷಣೆ ಎಂದರೇನು?",
  "answer": "ಗುರುತ್ವಾಕರ್ಷಣೆ ಎಂಬುದು ಭೂಮಿಯ ...",
  "analogy": "ನೀವು ಮಾವಿನಕಾಯಿ ಮೇಲೆ ಎಸೆದರೆ ...",
  "quiz_question": "ಕಲ್ಲು ಮತ್ತು ಎಲೆ...",
  "quiz_answer": "ಎರಡೂ ಒಂದೇ ಸಮಯದಲ್ಲಿ..."
}
```

---

## 5. Technology Choices

| Component | Choice | Reason |
|-----------|--------|--------|
| Frontend framework | React + TypeScript | Most widely supported; type safety |
| Build tool | Vite | Fast, modern, easy to configure |
| Styling | Vanilla CSS | No extra build complexity |
| Backend framework | FastAPI | Simple, fast, auto-generates API docs |
| LLM | Claude 3.5 Sonnet (Bedrock) | Best reasoning for structured JSON output |
| Translation | Bhashini | India-first, government-backed, supports 22 languages |
| Offline | localStorage | Zero setup, works on all browsers |
| Frontend deploy | Vercel | Free, instant deploys from GitHub |
| Backend deploy | Render | Free tier, Python-friendly, easy setup |

---

## 6. Future Roadmap

| Feature | Technology | Priority |
|---------|-----------|----------|
| Voice input | Bhashini ASR | High |
| Voice output | Bhashini TTS | High |
| 14+ Indian languages | Bhashini NMT | High |
| Full offline sync | WatermelonDB + S3 | Medium |
| Curriculum prediction | Amazon Step Functions | Medium |
| NCERT content database | DynamoDB + OpenSearch | Medium |
| Admin dashboard | React + API | Low |
| Student progress tracking | DynamoDB | Low |
