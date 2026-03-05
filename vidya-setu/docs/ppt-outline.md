# Vidya-Setu: Bridge of Knowledge 🌉
## Hackathon Pitch & Presentation Outline

### Slide 1: Title Slide
*   **App Name:** Vidya-Setu
*   **Tagline:** Bridge of Knowledge – Learn, Grow, Succeed.
*   **Your Name / Team Name**
*   **Visual:** Logo (🎓) and a clean, warm background.

### Slide 2: The Problem 🚨
*   **Target Audience:** Rural Indian students (ages 10-14).
*   **The Issue:** High-quality, personalized tutoring is expensive and inaccessible.
*   **The Language Barrier:** Most AI tools are English-first and use complex, Western-centric analogies that rural students can't relate to.
*   **The Internet Barrier:** Rural areas suffer from intermittent internet connectivity.

### Slide 3: The Solution 💡
*   **Vidya-Setu:** A localized, AI-powered digital teaching assistant.
*   **How it works:** Students ask simple questions and get age-appropriate explanations.
*   **Key Differentiator:** We generate "Local Analogies" (using farming, local sports, village life) to explain complex topics.

### Slide 4: Key Features ✨
*   **Bilingual Support:** Seamless toggling between English and Kannada.
*   **Contextual AI (Amazon Bedrock):** Powered by Claude 3.5 Sonnet for safe, structured, JSON-formatted educational responses.
*   **Interactive Quizzes:** Auto-generated self-tests to check reading comprehension.
*   **Offline First (PWA):** Saves the student's learning history locally. If the internet drops, they can still study their saved Knowledge Cards! 

### Slide 5: The Architecture & Cost Efficiency ⚙️
*   **Frontend:** React + Vite, styled with Tailwind principles, PWA configured.
*   **Backend:** FastAPI (Python), Boto3 Bedrock Client.
*   **Cost Optimization:**
    *   **In-Memory LRU Caching:** Duplicate questions cost $0.00.
    *   **Concise Prompts & Max Tokens:** Reduced token usage by 33%, keeping per-query cost under $0.004. ($10 budget = ~2,500 questions).
    *   **Mock Fallback System:** Graceful degradation if AWS quotas or billing fails.

### Slide 6: Live Demo 🚀
*   *Action:* Switch to browser (`http://localhost:5173`).
*   *Flow:*
    1. Select topic: "Physics - Gravity".
    2. Type question: "What is gravity?".
    3. Show the Age-Appropriate Explanation.
    4. Highlight the Local Analogy (e.g., throwing a mango).
    5. Test the interactive correct/incorrect Quiz feature.
    6. *Bonus:* Turn off Wi-Fi (or simulate offline via DevTools) to show the Offline Banner and Saved Cards feature.

### Slide 7: Future Scope & Impact 🌍
*   **Phase 2:** Integrate Bhashini NMT for 22+ official Indian languages.
*   **Phase 3:** Voice-to-Text (speech recognition) for students who cannot type well.
*   **Impact:** Democratizing quality education for millions of deep-rural students using heavily cost-optimized GenAI models.

### Slide 8: Thank You! 🙏
*   **Call to Action:** Scan QR code to try the demo! (If deployed).
*   **Q&A**
