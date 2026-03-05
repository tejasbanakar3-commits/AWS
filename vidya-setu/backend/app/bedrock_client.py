"""
bedrock_client.py
=================
Handles all communication with Amazon Bedrock (Claude 3.5 Sonnet).

Cost-saving features:
  - In-memory cache: same question = NO new API call (reuses saved answer)
  - max_tokens limited to 400 (saves ~33% cost)
  - Only called when user clicks "Ask" (no background/automatic calls)
  - Estimated cost per call: ~$0.003-0.005

With $10 budget you can safely make ~2,000+ unique API calls.
When MOCK_MODE=true, returns fake responses with zero API cost.
"""

import json
import os
import re
from dotenv import load_dotenv

load_dotenv()

MOCK_MODE = os.getenv("MOCK_MODE", "true").lower() == "true"
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

# ── In-memory response cache ─────────────────────────────────────────────────
# Key: normalized(language + topic + question) → Value: response dict
# Prevents paying for the same question twice in a session.
# Cleared when the server restarts (that's fine for a hackathon).
_cache: dict = {}
MAX_CACHE_SIZE = 50  # max 50 unique answers stored per session


def _cache_key(language: str, topic: str, question: str, student_name: str, student_age: int, student_grade: str) -> str:
    """Normalize the question and student details to catch variations."""
    normalized = re.sub(r'[^\w\s]', '', question.lower().strip())
    normalized = ' '.join(normalized.split())  # collapse extra spaces
    # Include student details in cache key so different students don't get the same generic answer
    s_name = str(student_name or "").lower()
    s_age = str(student_age or "")
    s_grade = str(student_grade or "").lower()
    return f"{language}|{topic}|{normalized}|{s_name}|{s_age}|{s_grade}"


def _get_from_cache(language: str, topic: str, question: str, student_name: str, student_age: int, student_grade: str):
    """Return cached response if it exists, otherwise None."""
    key = _cache_key(language, topic, question, student_name, student_age, student_grade)
    if key in _cache:
        print(f"💰 Cache HIT — saved an API call!")
        return _cache[key]
    return None


def _save_to_cache(language: str, topic: str, question: str, student_name: str, student_age: int, student_grade: str, response: dict):
    """Save response. If cache is full, drop the oldest entry (FIFO)."""
    if len(_cache) >= MAX_CACHE_SIZE:
        oldest_key = next(iter(_cache))
        del _cache[oldest_key]
    _cache[_cache_key(language, topic, question, student_name, student_age, student_grade)] = response


# ── Mock responses (used when MOCK_MODE=true — no API cost) ───────────────────
def _get_mock_response(language: str, student_name: str):
    name_prefix_en = f"Hello {student_name}! " if student_name else ""
    name_prefix_kn = f"ನಮಸ್ಕಾರ {student_name}! " if student_name else ""
    
    mock_en = {
        "answer": f"{name_prefix_en}Gravity is the natural force that pulls every object towards the centre of the Earth. All objects fall at the same speed if air resistance is ignored.",
        "analogy": "Imagine you are on your farm and throw a mango straight up. No matter how hard you throw, the mango always comes back down — that invisible force is gravity!",
        "quiz_question": "If you drop a heavy stone and a light leaf at the same time (no wind), which hits the ground first?",
        "quiz_answer": "They hit the ground at the same time! (Gravity pulls both equally; only air slows the leaf.)"
    }
    
    mock_kn = {
        "answer": f"{name_prefix_kn}ಗುರುತ್ವಾಕರ್ಷಣೆ ಎಂಬುದು ಭೂಮಿಯ ಮಧ್ಯಭಾಗದ ಕಡೆಗೆ ಎಲ್ಲ ವಸ್ತುಗಳನ್ನೂ ಎಳೆಯುವ ಶಕ್ತಿ. ಎಲ್ಲ ವಸ್ತುಗಳು ಒಂದೇ ವೇಗದಲ್ಲಿ ಬೀಳುತ್ತವೆ.",
        "analogy": "ನೀವು ತೋಟದಲ್ಲಿ ಮಾವಿನಕಾಯಿ ಮೇಲೆ ಎಸೆದರೆ, ಅದು ಯಾವಾಗಲೂ ಭೂಮಿಗೆ ಬೀಳುತ್ತದೆ — ಅದೇ ಗುರುತ್ವಾಕರ್ಷಣೆ!",
        "quiz_question": "ಭಾರವಾದ ಕಲ್ಲು ಮತ್ತು ಹಗುರವಾದ ಎಲೆಯನ್ನು ಏಕಕಾಲದಲ್ಲಿ ಬಿಟ್ಟರೆ, ಯಾವುದು ಮೊದಲು ಭೂಮಿಗೆ ತಲುಪುತ್ತದೆ?",
        "quiz_answer": "ಎರಡೂ ಒಂದೇ ಸಮಯದಲ್ಲಿ ತಲುಪುತ್ತವೆ! (ಗಾಳಿ ಮಾತ್ರ ಎಲೆಯನ್ನು ನಿಧಾನಗೊಳಿಸುತ್ತದೆ.)"
    }
    return mock_kn if language == "kn" else mock_en


def _build_prompt(language: str, topic: str, question: str, student_name: str, student_age: int, student_grade: str) -> str:
    """
    Concise prompt = fewer input tokens = lower cost.
    Each call uses ~200-250 input tokens.
    """
    student_context = ""
    if student_name and student_age and student_grade:
        student_context = f"\nYour student's name is {student_name}. They are {student_age} years old and in Class {student_grade}. Speak directly to them using their name."

    age_target = student_age if student_age else 10
    lang_instruction = (
        f"Respond in simple Kannada (ಕನ್ನಡ) a {age_target}-year-old would understand."
        if language == "kn"
        else f"Respond in simple English a {age_target}-year-old would understand."
    )

    return f"""You are Vidya-Setu, a friendly AI tutor for rural Indian students.
{student_context}

Topic: {topic}
Student question: {question}

Rules:
1. {lang_instruction}
2. Use a relatable analogy from rural Indian daily life (farming, cricket, rivers, animals).
3. Keep explanation to 2-3 sentences maximum.
4. Create ONE simple quiz question with a clear correct answer.

Reply ONLY with this exact JSON (no extra text before or after):
{{
  "answer": "simple 2-3 sentence explanation addressing the student",
  "analogy": "local Indian analogy, start with Imagine or Think of",
  "quiz_question": "one simple quiz question",
  "quiz_answer": "the correct answer"
}}"""


def call_bedrock(language: str, topic: str, question: str, student_name: str = None, student_age: int = None, student_grade: str = None) -> dict:
    """
    Get a Knowledge Card from Amazon Bedrock (Claude 3.5 Sonnet).

    Cost flow:
      1. If MOCK_MODE=true → return mock (free, no API call)
      2. If question was asked before → return cache (free, no API call)
      3. Otherwise → call Bedrock API (~$0.003-0.005 per call)
      4. If Bedrock fails → return mock (app never crashes)
    """

    # Step 1: Mock mode — zero cost
    if MOCK_MODE:
        return _get_mock_response(language, student_name)

    # Step 2: Cache hit — zero cost
    cached = _get_from_cache(language, topic, question, student_name, student_age, student_grade)
    if cached:
        return cached

    # Step 3: Real Bedrock API call
    try:
        import boto3

        client = boto3.client("bedrock-runtime", region_name=AWS_REGION)
        prompt = _build_prompt(language, topic, question, student_name, student_age, student_grade)

        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 400,       # ✅ 400 not 600 — saves ~33% output cost
            "temperature": 0.7,      # Slightly creative but still focused
            "messages": [
                {"role": "user", "content": prompt}
            ]
        })

        print(f"💸 Calling Bedrock... region={AWS_REGION} lang={language} topic={topic}")

        response = client.invoke_model(
            modelId="anthropic.claude-3-5-sonnet-20240620-v1:0",
            body=body,
            contentType="application/json",
            accept="application/json"
        )

        response_body = json.loads(response["body"].read())
        raw_text = response_body["content"][0]["text"].strip()

        # Extract JSON (Claude occasionally adds a short intro sentence before the JSON)
        json_match = re.search(r'\{.*\}', raw_text, re.DOTALL)
        if not json_match:
            raise ValueError(f"No JSON found in response: {raw_text[:200]}")

        result = json.loads(json_match.group())

        # Step 4: Save to cache so next identical question is free
        _save_to_cache(language, topic, question, result)
        print(f"✅ Bedrock success. Cache size: {len(_cache)}/{MAX_CACHE_SIZE}")

        return result

    except Exception as e:
        # Step 5: Graceful fallback — app never shows an error to student
        print(f"⚠️  Bedrock failed: {e}. Returning mock response.")
        lang_key = language if language in MOCK_RESPONSES else "en"
        return MOCK_RESPONSES[lang_key].copy()
