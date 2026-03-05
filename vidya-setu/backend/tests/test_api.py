"""
tests/test_api.py
==================
Basic automated tests for the Vidya-Setu backend API.

Make sure MOCK_MODE=true in your .env so tests don't need real AWS credentials.

Run with:
  uv run pytest tests/ -v
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """Backend should respond to health check."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


def test_ask_english_question():
    """Should return a valid Knowledge Card for an English question."""
    response = client.post("/api/ask", json={
        "language": "en",
        "topic": "Physics - Gravity",
        "question": "What is gravity?"
    })
    assert response.status_code == 200
    data = response.json()

    # Check all required fields are present
    assert "answer" in data
    assert "analogy" in data
    assert "quiz_question" in data
    assert "quiz_answer" in data
    assert data["language"] == "en"
    assert data["topic"] == "Physics - Gravity"

    # Check fields are not empty
    assert len(data["answer"]) > 10
    assert len(data["analogy"]) > 10
    assert len(data["quiz_question"]) > 5


def test_ask_kannada_question():
    """Should return a Knowledge Card for a Kannada language request."""
    response = client.post("/api/ask", json={
        "language": "kn",
        "topic": "Physics - Gravity",
        "question": "ಗುರುತ್ವಾಕರ್ಷಣೆ ಎಂದರೇನು?"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["language"] == "kn"
    assert len(data["answer"]) > 5


def test_empty_question_rejected():
    """Empty questions should return a 400 error."""
    response = client.post("/api/ask", json={
        "language": "en",
        "topic": "Physics - Gravity",
        "question": ""
    })
    assert response.status_code == 400


def test_quiz_correct_answer():
    """Quiz submission with correct answer should return is_correct=True."""
    response = client.post("/api/quiz/submit", json={
        "topic": "Gravity",
        "quiz_question": "In which direction does gravity pull?",
        "student_answer": "Towards the Earth downwards",
        "correct_answer": "Towards the Earth / downwards"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] == True


def test_quiz_wrong_answer():
    """Quiz submission with wrong answer should return is_correct=False."""
    response = client.post("/api/quiz/submit", json={
        "topic": "Gravity",
        "quiz_question": "In which direction does gravity pull?",
        "student_answer": "Sideways upward",
        "correct_answer": "Towards the Earth / downwards"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] == False
