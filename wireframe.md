# **`Frontend Wireframe Breakdown (React + Tailwind)`**

> Here’s a section-by-section layout with detailed component structure, page layout, and interaction logic.

---

## 1. 🏠 **Home / Landing Page** (Optional - for future public version)

**Route:** `/`
**Purpose:** Intro to WellNest (for new visitors or marketing)

### Sections:

* ✅ Hero Section – App tagline, CTA
* ✅ Features Overview – Cards showing key features (Journaling, Emotion Analysis, Companion, Dashboard)
* ✅ Testimonials (fake/placeholder for now)
* ✅ Footer – Privacy, Terms, Contact

> **CTA:** “Start Journaling” → `/journal`

---

## 2. 🔐 **Authentication Pages**

### A. **Login Page**

**Route:** `/login`
**Components:**

* Email & Password Fields
* Login Button
* Forgot Password Link
* Switch to Signup

### B. **Signup Page**

**Route:** `/signup`
**Components:**

* Name, Email, Password, Confirm Password
* Toggle for `Local-Only Mode` or `Cloud Sync`

💡 Use `React Hook Form + Yup` for validation.

---

## 3. 🖋️ **Journal Entry Page**

**Route:** `/journal`
**Core UX:** Lightweight, calm design — focus on writing.

### Components:

* 📅 Date Display (`Today`, or user can pick past date)
* 🧠 Mood Selector (5 emoji chips: 😞 😐 😌 😄 😠)
* 📝 Rich Text Editor or Markdown Textarea
* 💾 Save Entry Button (auto-save on blur/interval optional)
* 🔒 "Private & Encrypted" badge/message
* Sidebar Button: View Past Journals → `/journal/history`

---

## 4. 📚 **Journal History Viewer**

**Route:** `/journal/history`

### Components:

* 🗂️ Calendar or Date List Picker
* Preview cards of past entries (date, mood, short summary)
* Search bar to filter entries by emotion/word
* Click to expand → opens modal or redirects to `/journal/:id`

---

## 5. 🧠 **AI Emotion Summary Page**

**Route:** `/emotion-summary`

### Components:

* Latest Journal Analysis Block:

  * Detected Emotion: 😔 Sadness
  * Tone: Anxious, Overwhelmed
  * Summary: “You seem to be feeling drained lately...”
* ⚠️ Trigger Word Alerts (e.g. "I give up", "useless", etc.)
* ✨ Suggested Reflection Prompts
* Past Emotional Trends Preview

---

## 6. 🤖 **AI Chat Companion**

**Route:** `/companion`

### Layout (2-column chat view):

| Left Panel          | Right Panel             |
| ------------------- | ----------------------- |
| Chat History        | Chat window             |
| Suggested Prompts:  | - Context-aware replies |
| - “I’m feeling low” | - GPT response          |
| - “Motivate me”     | - Typing animation      |

### Features:

* 🧠 Pulls context from last 3–5 journals
* 🔄 Clear Chat, Start New
* 🌙 Dark Mode Toggle (optional aesthetic touch)

---

## 7. 📊 **Mental Health Dashboard**

**Route:** `/dashboard`

### Sections:

* 📈 Mood Graph (calendar heatmap or line chart)
* 🔁 Emotion Streaks (e.g. 3 days calm, 5 days low)
* 🧠 Most Used Words Cloud (positive/negative)
* 📌 Emotion Timeline (with journal tags)

Use `Recharts` or `Chart.js` with Tailwind integration.

---

## 8. 🧘‍♀️ **Wellness Add-ons Page**

**Route:** `/wellness`

### Tabs/Sections:

* **🧘 Meditations** – Scrollable list of guided meditations (playable audio)
* **💬 Affirmations** – Daily rotating cards (“You are enough.”)
* **🫂 Venting Board** – Anonymous posts, comment anonymously

---

## 9. 🛠️ **Settings Page**

**Route:** `/settings`

### Options:

* 🧾 Profile Info
* 🛡️ Privacy Mode Toggle (Local/Cloud)
* 🗝️ Reset Password / Change Password
* 📤 Export Journals (JSON/PDF)
* 🧹 Delete Account

---

## 10. ⚙️ **Reusable UI Components (Atomic Design)**

> Use these across pages for consistency:

* `MoodChip.tsx` – Mood emoji + label
* `JournalCard.tsx` – Preview of an entry
* `EmotionTag.tsx` – Colored badges for tone/emotion
* `ChatBubble.tsx` – Left/right styled message bubbles
* `InsightCard.tsx` – Dashboard metrics
* `ToggleSwitch.tsx` – Settings toggles

---

## 🎨 Design Language Suggestions

* **Typography:** Calm fonts like Inter or Open Sans
* **Colors:** Soft blue, lavender, light gray backgrounds
* **Motion:** Subtle fade/slide-in transitions
* **Icons:** `Lucide` or `Heroicons` with emotion variants

---

## 📁 Suggested Folder Structure

```
src/
├── components/
│   ├── Auth/
│   ├── Journal/
│   ├── Dashboard/
│   ├── Companion/
│   ├── Wellness/
│   ├── UI/
│   └── Layout/
├── pages/
│   ├── login.tsx
│   ├── signup.tsx
│   ├── journal/
│   │   ├── index.tsx
│   │   └── history.tsx
│   ├── companion.tsx
│   ├── dashboard.tsx
│   ├── wellness.tsx
│   └── settings.tsx
├── hooks/
├── context/
├── services/  (API calls)
├── utils/
└── assets/
```

---

## ✅ Kickstart Order (Dev Tip)

Start by building these in this order:

1. `Auth` (login/signup)
2. `Journal Entry`
3. `Journal History`
4. `Emotion Summary`
5. `Dashboard`
6. `Companion Chat`
7. `Wellness`
8. `Settings`

---



