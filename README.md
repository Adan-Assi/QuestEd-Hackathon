# 🧭 QuestEd
🎓 A modern, AI-assisted learning platform built with React, Node.js, and OpenAI — turning lessons into immersive quests.


🏆 **First Place Winner – TAU Hackademia Hackathon**

📌 Note: 
This repository is a **personal mirror** of the original team project developed during our university hackathon.  
All credit to my amazing team, see the Team section for details.  

> This project represents an **MVP (Minimum Viable Product)** — some features showcased in the demo are not yet fully implemented in code, but were prototyped or simulated to illustrate core functionality.
---
## 👥 Team

| Name | Role |
|------|------|
| [Adan Assi](https://github.com/Adan-Assi) | Developer |
| [Rand Natour](https://github.com/natourand) | Developer |
| [Shaimaa Hoji](https://github.com/shaimahoji) | Developer |
| [Bassel Mohamd](https://github.com/B66el) | Developer |

---

## ⚡ Overview

**QuestEd** transforms middle school learning from *memorization* ➜ *motivation*.  
It brings education to life through **storytelling**, **AI**, and **game-based experiences**, creating emotional bonds between students and the lessons they learn.

> "Turning textbooks into quests, and students into heroes."

---

## 💡 The Challenge

Traditional classrooms often rely on passive memorization, leading to disengaged students and limited retention.  
QuestEd addresses this by making learning **interactive**, **personalized**, and **emotionally resonant**.

---

## 🚀 Our Solution

🎮 QuestEd turns academic material into an *interactive adventure*.  
Think *Duolingo meets RPG storytelling* — fun, adaptive, and student-centered.

- AI transforms subjects into playable quests  
- Students progress through narrative-driven missions  
- Teachers monitor performance in real time  

---

## 🔍 Features

| Feature | Description |
|--------|-------------|
| 🧠 AI Subject Generator | Converts curriculum into engaging game content |
| 📖 Story Mode | Narrative-driven lessons with branching paths |
| 🤖 AI Companion | Offers adaptive hints and emotional support |
| 🎯 Reward System | Gamified incentives to boost consistency |
| 🧑‍🏫 Teacher Dashboard | Classroom-safe monitoring and customization tools |

---

## ✨ Why It Works

- 🌍 **Cross-platform** — Accessible via web and mobile  
- 🪄 **Personalized learning** — AI adapts to each student’s pace  
- 🔁 **Continuous feedback loop** — Lessons evolve with progress  
- 💬 **Student-led design** — Learners shape their own journey  

---

## 🎯 Audience

Designed for **middle school students**, a pivotal age where curiosity and academic habits are formed.

---

## 🧪 Demo

📺 Watch our pitch and live demo:  
👉 [Hackathon Presentation + Demo (Canva)](https://www.canva.com/design/DAGoNCxyrLQ/OHZAcoKAyl1mcIsFc75cEg/view)


---

## 💼 Business Model

**Free for students.**  
Inclusive, accessible, and built to scale across classrooms.

> *Empowering curiosity. Redefining education.* 🌱

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MongoDB |
| AI | OpenAI API |
| Hosting | AWS + Vercel |


> 🧩 The root directory contains the React frontend, and the `ai-backend/` folder holds the Node.js + Express backend connected to OpenAI.

---
## 🧰 Getting Started

To run the project locally, follow these steps:

### ⚙️ Prerequisites

- Install [Node.js](https://nodejs.org/en) (make sure to select "Add to PATH" during setup)
- Install [VS Code](https://code.visualstudio.com/)
- Optional: Install Expo CLI for React Native support  
  ```bash
  npm install -g expo-cli
  ```

---

### 🧪 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adan-Assi/QuestEd-Hackathon.git
   cd QuestEd-Hackathon
   ```

2. **Create your `.env` file and add your API key**

   🔑 The project uses the OpenAI API. Create a `.env` file inside `ai-backend/` and add:
   ```env
   OPENAI_API_KEY=enter-your-key-here
   ```
   Replace `enter-your-key-here` with your actual OpenAI key.

   ⚠️ Do not commit your `.env` file — it is ignored by Git for security.

3. **Install dependencies for both frontend and backend**
   ```bash
   npm install --legacy-peer-deps
   cd ai-backend
   npm install
   cd ..
   ```

---

### 🚀 Running the App Locally

This project has **two parts** — a **frontend (React app)** and a **backend (AI server)**.  
You’ll need to run both at the same time, each in its own terminal.

#### 🖥️ Terminal 1 — Run the Backend
From the project root:
```bash
cd ai-backend
npm start
```
You should see:
```
✅ AI backend running on port 5000
```
Keep this terminal open — do **not** close or stop it.

---

#### 🌐 Terminal 2 — Run the Frontend
Open a **new terminal window/tab**, then:
```bash
cd QuestEd-Hackathon
npm start
```
After a few seconds, your browser should automatically open at:
```
http://localhost:3000
```
This will connect to the backend running on port **5000**.

---

### 💡 Tips

- If the browser doesn’t open automatically, visit [http://localhost:3000](http://localhost:3000) manually.
- If you see any “port already in use” errors, stop all running servers and restart them in order (backend first, frontend second).
- Press **Ctrl + C** in a terminal to stop the running process.

---

## 📦 Key Libraries Used

Install these if you're testing or extending features:

```bash
npm install axios
npm install react-beautiful-dnd --legacy-peer-deps
npm install framer-motion --legacy-peer-deps
npm install @iconify/react --legacy-peer-deps
npm install three --legacy-peer-deps
npm install html2canvas jspdf recharts --legacy-peer-deps
npm install eslint-plugin-jsx-a11y --save-dev --legacy-peer-deps
```

---

## 🎨 Styling Tools

- **Sass**
  ```bash
  npm install --save-dev sass
  ```
  Rename `.css` files to `.scss` to use Sass syntax.

- **TailwindCSS + NativeWind**
  ```bash
  npm install -D tailwindcss nativewind
  npx tailwindcss init
  ```
  Update `tailwind.config.js`:
  ```js
  module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```
  In `App.js`, import:
  ```js
  import "nativewind/tailwind.css";
  ```

---

## 🧱 UI & Navigation

- **Material UI for React Native**
  ```bash
  npm install react-native-paper
  ```
  Wrap your app in `PaperProvider`:
  ```js
  import { Provider as PaperProvider } from 'react-native-paper';

  export default function App() {
    return (
      <PaperProvider>
        {/* Your app goes here */}
      </PaperProvider>
    );
  }
  ```

- **React Navigation**
  ```bash
  npm install @react-navigation/native
  npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
  npm install @react-navigation/native-stack
  ```
---

## 🤝 Connect

- 💬 [LinkedIn](https://www.linkedin.com/in/adan-assi/)  
- 🐙 [GitHub Issues](https://github.com/Adan-Assi) for questions or collaborations  

---

### 📜 License:
For educational and portfolio purposes only.  
Original hackathon code © 2025 QuestEd Team.

---

⭐ Thank you for helping us redefine education!
