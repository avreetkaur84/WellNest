# 🌿 WellNest: Your Emotion-Aware AI Companion

> "Sometimes you don't want to explain everything. You just want to be understood."

**WellNest** is an AI-powered journaling and mental wellness application that provides users with a deeply personal and emotionally intelligent experience. Designed to support emotional health in a private and low-effort way, it connects daily journaling with context-aware AI conversations — so users can be heard without having to re-explain their stories.

---

## 💡 Problem Statement

In a world filled with noise, people are craving a space where they can:
- Be honest without being judged
- Be understood without repeating themselves
- Feel better without always having the energy to explain

But journaling is passive and chatbots are cold.  
**WellNest bridges this gap.**

---

## 🎯 Core Features

### 🖋️ Intelligent Journaling
- Write daily journal entries with an intuitive and minimal UI.
- Optional mood tagging (e.g. 😞 😄 😠 😌).
- Journals are encrypted and stored securely.

### 🧠 AI Emotion Analysis (NLP Module)
- Automatically analyzes tone, emotion, and intent using pre-trained transformer models.
- Summarizes the day and updates emotional profile.
- Detects emotional patterns and stress triggers.

### 🤖 Contextual Chat Companion
- AI chatbot that *remembers* you.
- When users want to talk, it draws context from recent journals to provide:
  - Empathetic responses
  - Motivational talk
  - Calm and supportive replies (based on emotional state)

### 📊 Mental Health Dashboard
- Mood graphs over time
- Emotion streaks
- Most used thoughts/words
- Reflective quotes tailored to emotional patterns

### 🧘‍♀️ Wellness Add-ons (Optional)
- Guided meditations (audio/text)
- Daily affirmations
- Anonymous community venting board

---

## 🔐 Privacy First

- Journals are **end-to-end encrypted**.
- No third-party storage without consent.
- User can choose between:
  - Local-only mode (data never leaves device)
  - Cloud sync with encryption and hashed access tokens

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React + Tailwind CSS           |
| Backend      | Spring Boot (Java) + JWT Auth  |
| Database     | PostgreSQL + AES Encrypted Columns |
| AI/NLP       | HuggingFace Transformers (`bert`, `distilbert`, `emotion-bert`) |
| AI Chat      | GPT / LangChain + Vector Search (FAISS / Pinecone) |
| Auth         | JWT + Bcrypt Password Hashing  |
| DevOps       | Docker + GitHub Actions (CI/CD)|
| Hosting      | Vercel (Frontend) + Render/EC2 (Backend) |

---

## 🧩 Architecture Overview

```

\[User]
↓
\[React Frontend] —— JWT —→ \[Spring Boot Backend]
↓                          ↓
\[Journal UI]             \[API for Journals, Emotion]
↓        ↓
\[PostgreSQL]  \[NLP + Chatbot Service]
↘      ↙
\[Emotion Memory + Dashboard]

```

---

## 📅 Project Milestones

| Phase | Feature                           | Timeline  |
|-------|-----------------------------------|-----------|
| 1     | Journaling UI + Auth              | Aug 1–10  |
| 2     | Backend + Encrypted Journal APIs  | Aug 11–17 |
| 3     | NLP Emotion Detection Integration | Aug 18–25 |
| 4     | AI Chat Companion + Memory        | Aug 26–Sep 5 |
| 5     | Dashboard & Insights              | Sep 6–10  |
| 6     | Polishing + Deployment            | Sep 11–15 |

---

## 🤝 Contribution

This is a solo-founder journey — but open to collaboration with like-minded developers, writers, and mental health professionals.

---

## 🧠 Inspiration

Built out of real conversations, observations, and a deep desire to solve **emotional fatigue** in our generation.  
Aimed at students, professionals, and anyone silently struggling.

---

## 🔖 License

MIT License. You own your data. Always.

---

> "WellNest is not an app. It’s your story, listened to."

```

Can add the proper facial features, can appear to be a proper human with whom yoiu are talking to.