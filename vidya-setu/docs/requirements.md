# Requirements – Vidya-Setu

## Functional Requirements

### FR1: Language Selection
- User can select from: English (en), Kannada (kn)
- App UI responds in the selected language
- Future: Hindi, Tamil, Telugu (14+ more via Bhashini)

### FR2: Topic Selection
- User selects a school subject topic from a predefined list
- Topics: Physics (Gravity, Light), Maths (Fractions), Biology (Photosynthesis, Human Body), Geography (Water Cycle)

### FR3: Question Input
- User can type a question about the selected topic (max 500 characters)
- Submit via button click or Enter key

### FR4: Knowledge Card Generation
- Backend sends question to Amazon Bedrock (Claude 3.5 Sonnet)
- Returns structured Knowledge Card containing:
  - Simple explanation (≤3 sentences)
  - Local Indian analogy
  - 1 interactive quiz question + correct answer

### FR5: Quiz Interaction
- User reads the quiz question and types their answer
- App checks answer and responds: correct ✅ or incorrect ❌
- Shows correct answer if wrong
- User can retry

### FR6: Offline Mode
- After each successful question, the Knowledge Card is saved to localStorage
- Max 3 cards saved at a time (FIFO rotation)
- When offline: app detects `navigator.onLine = false`, shows banner
- Offline: shows saved cards, disables new question input

### FR7: Multilingual Responses
- Backend prompt instructs Claude to respond in the user's selected language
- Optional: Bhashini API translates input/output for better accuracy

## Non-Functional Requirements

| NFR | Requirement |
|-----|------------|
| Performance | API response within 5 seconds (Bedrock latency) |
| Mobile | Works on devices with 1GB RAM, small screens (320px+) |
| Offline | App loads offline after first visit (PWA service worker) |
| Security | AWS credentials never exposed to frontend; use server-side only |
| Accessibility | Minimum 16px font size, high contrast colors |
| Availability | Backend deployed on cloud; 99% uptime target |

## Constraints

- **4-day build timeline** — MVP focuses on core tutoring loop
- **Beginner team** — code must be simple, modular, and well-commented
- **No full Bhashini integration in MVP** — simulated via Claude multilingual prompting
- **No voice in MVP** — text-only; voice is planned future work
- **No persistent database in MVP** — localStorage only; DynamoDB in future
