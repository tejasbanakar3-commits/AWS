import os
import json
import re
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Load API keys from environment variable
chatbot_keys_str = os.getenv("CHATBOT_GROQ_KEYS", "")
CHATBOT_API_KEYS = [k.strip() for k in chatbot_keys_str.split(",") if k.strip()]

# Provide a fallback if not configured
if not CHATBOT_API_KEYS and os.getenv("GROQ_API_KEY"):
    CHATBOT_API_KEYS = [os.getenv("GROQ_API_KEY")]
CHATBOT_MODEL = "llama-3.1-8b-instant"

MOCK_RESPONSES = {
    "en": {
        "answer": "I'm sorry, the Chatbot API Key provided seems to be invalid or experiencing issues. Please check your configurations.",
        "analogy": "Imagine a safe with a broken key. No matter how much you want the knowledge inside, the door won't open until you get the right key!",
        "quiz_question": "What do we need to unlock the AI's brain?",
        "quiz_answer": "A valid API Key!"
    },
    "kn": {
        "answer": "ಕ್ಷಮಿಸಿ, ನೀವು ಒದಗಿಸಿದ Chatbot API ಕೀ ಅಮಾನ್ಯವಾಗಿದೆ ಅಥವಾ ತೊಂದರೆ ಅನುಭವಿಸುತ್ತಿದೆ.",
        "analogy": "ಒಡೆದ ಬೀಗದ ಕೀಯನ್ನು ಹೊಂದಿರುವ ಸೇಫ್ ಅನ್ನು ಊಹಿಸಿ. ಸರಿಯಾದ ಕೀ ಇಲ್ಲದೆ, ನಾವು ಜ್ಞಾನವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ!",
        "quiz_question": "AI ಮೆದುಳನ್ನು ಅನ್ಲಾಕ್ ಮಾಡಲು ನಮಗೆ ಏನು ಬೇಕು?",
        "quiz_answer": "ಮಾನ್ಯವಾದ API ಕೀ!"
    },
    "hi": {
        "answer": "क्षमा करें, प्रदान की गई चैटबॉट एपीआई कुंजी अमान्य प्रतीत होती है या समस्याओं का सामना कर रही है।",
        "analogy": "टूटी हुई चाबी वाली तिजोरी की कल्पना करें। आप अंदर का ज्ञान कितना भी चाहें, जब तक आपको सही चाबी नहीं मिल जाती, दरवाजा नहीं खुलेगा!",
        "quiz_question": "हमें AI के दिमाग को अनलॉक करने के लिए क्या चाहिए?",
        "quiz_answer": "एक वैध एपीआई कुंजी!"
    }
}

def ask_gemini(language: str, topic: str, question: str, student_name: str = None, student_age: int = None, student_grade: str = None) -> dict:
    if not CHATBOT_API_KEYS:
        print("⚠️ Warning: CHATBOT_API_KEYS is missing. Returning mock.")
        lang_key = language if language in MOCK_RESPONSES else "en"
        return MOCK_RESPONSES[lang_key].copy()

    student_context = ""
    if student_name and student_age and student_grade:
        student_context = f"\nYour student's name is {student_name}. They are {student_age} years old and in Class {student_grade}. Speak directly to them using their name."

    age_target = student_age if student_age else 10
    
    # User requested chatbot should always be in English
    lang_instruction = f"Respond in simple English a {age_target}-year-old would understand."

    prompt = f"""You are Vidya-Setu, a friendly AI tutor for rural Indian students.{student_context}

Topic: {topic}
Student question: {question}

Rules:
1. {lang_instruction}
2. CRITICAL: You MUST respond EXCLUSIVELY in pure English. Do NOT use Hindi, Hinglish, or any Indian languages (e.g., do not say "Namaste" or "Mai hai"). 
3. Always start your answer warmly with "Hi [Student Name]" and explicitly state that you are here to help them solve their learning problems.
4. Use a relatable analogy from rural Indian daily life (e.g., farming, cricket, rivers, animals) but explain it entirely in English.
5. Keep the core explanation straightforward and under 3-4 sentences.
6. Create ONE simple quiz question with a clear correct answer.

Reply ONLY with this exact JSON (no extra text before or after):
{{
  "answer": "Greeting + statement about solving their learning problem + short explanation (in pure English)",
  "analogy": "local Indian analogy explained entirely in English, start with Imagine or Think of",
  "quiz_question": "one simple quiz question",
  "quiz_answer": "the correct answer"
}}"""

    last_error = None
    for api_key in CHATBOT_API_KEYS:
        try:
            # We continue to use the function name ask_gemini to avoid refactoring main.py
            # But internally we power this with Groq via the OpenAI SDK wrapper.
            client = OpenAI(
                api_key=api_key,
                base_url="https://api.groq.com/openai/v1"
            )
            
            response = client.chat.completions.create(
                model=CHATBOT_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            raw_text = response.choices[0].message.content.strip()
            
            # Extract JSON robustly
            json_match = re.search(r'\{.*\}', raw_text, re.DOTALL)
            if json_match:
                return json.loads(json_match.group())
            return json.loads(raw_text)
            
        except Exception as e:
            print(f"⚠️ Chatbot API failed on key {api_key[:8]}... Error: {e}. Trying next...")
            last_error = e
            continue
            
    print(f"⚠️ All Chatbot API keys failed. Last error: {last_error}. Returning mock fallback response.")
    lang_key = language if language in MOCK_RESPONSES else "en"
    return MOCK_RESPONSES[lang_key].copy()
