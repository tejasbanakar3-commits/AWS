# AI for Bharat Hackathon: Final Submission Checklist ✅

Before you record your demo video or submit your project post, ensure you have completed every item on this list!

## 1. Codebase & Repository 📁
- [ ] Ensure all code is pushed to your GitHub repository.
- [ ] Verify the repository is **PUBLIC**.
- [ ] Check that your root `README.md` is populated with the project description, tech stack, and setup instructions.
- [ ] **CRITICAL:** Ensure your `backend/.env` file is NOT pushed to GitHub (Check your `.gitignore`!).

## 2. The Application Prototype 🚀
- [ ] Test the English flow (Topic -> Question -> AI Output -> Quiz).
- [ ] Test the Kannada flow using the Language Toggle.
- [ ] Test the Quiz Answer Checker (try typing a correct answer and an incorrect answer).
- [ ] Test the **Offline Fallback** (Disconnect your Wi-Fi and verify the "Saved Cards" appear and the offline banner shows up).
- [ ] Confirm the UI looks beautiful, responsive, and mobile-friendly.

## 3. Demo Video 🎥
- [ ] **Length:** Keep it under 3 minutes (or whatever the hackathon rules specify).
- [ ] **Visuals:** Record your screen showing the app in action.
- [ ] **Audio:** Have a clear voiceover explaining *why* you built this (the rural education gap) and *how* it works.
- [ ] **Demo Flow:**
    1. Show asking a question in English.
    2. Show the "Local Analogy" highlighting Indian context.
    3. Toggle to Kannada to demonstrate localization.
    4. Turn off internet to show the Offline Mode working!
- [ ] Upload the video to YouTube (Unlisted or Public) or standard video host as required by the submission rules.

## 4. Submission Form / Devpost 📋
- [ ] **Project Name:** Vidya-Setu (or your chosen name)
- [ ] **Elevator Pitch:** "A localized, offline-capable AI teaching assistant for rural Indian students, powered by Amazon Bedrock."
- [ ] **Built With:** React, TypeScript, FastAPI, Python, Amazon Bedrock (Claude 3.5 Sonnet).
- [ ] **Link to GitHub repo.**
- [ ] **Link to Demo Video.**
- [ ] **(Optional) Link to Live Deployment** (if you managed to host it on Vercel/Render).

---

## Deployment Quick-Guide (Optional for Hackathon)

If you want judges to open a live link instead of running it locally:

**Frontend (Vercel):**
1. Push to GitHub.
2. Log into Vercel and import the repo.
3. Set the Root Directory to `frontend`.
4. Framework Preset: Vite.
5. Add Environment Variable: `VITE_API_URL` pointing to your deployed backend URL.
6. Deploy!

**Backend (Render / Railway):**
1. Push to GitHub.
2. Import the repo to Render as a "Web Service".
3. Root Directory: `backend`.
4. Environment: Python.
5. Build Command: `pip install -r requirements.txt` (Make sure to export `uv` deps to `requirements.txt` via `uv pip compile pyproject.toml -o requirements.txt`).
6. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Add Environment Variables: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION=us-east-1`, `MOCK_MODE=false`.
8. Deploy!
