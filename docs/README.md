# 🫁 Biosys Predictive Ventilator Monitor

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_18-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688.svg)
![AI](https://img.shields.io/badge/AI-Linear_Regression-FF6F00.svg)
![Tests](https://img.shields.io/badge/tests-100%25_Coverage-success.svg)

A real-time, **AI-powered medical monitoring dashboard** designed for next-generation mechanical ventilators.  
The system continuously tracks **airway pressure, flow, and volume**, while running a **Predictive Maintenance Algorithm** to detect mechanical failures _before_ they reach a critical level.

![Dashboard Preview](docs/ss1.png)

---

## 🚀 Key Features

- **⚡ Real-Time Monitoring**  
  Sub-millisecond sensor data streaming via **WebSockets**.

- **🧠 AI Predictive Engine**  
  Detects abnormal pressure trends using **Linear Regression (NumPy)** to predict:
  - Filter clogging
  - Motor degradation  
    up to **20 seconds in advance**.

- **🛡️ Auto-Safety Protocol**  
  Automatically triggers an **Emergency Stop** when the AI predicts that a critical safety threshold will be exceeded.

- **🎨 Medical-Grade UI**  
  Clean, minimalist, iOS-style interface optimized for **high readability in clinical environments**.

- **🧪 Robust Engineering**
  - **Frontend:** Type-safe React + Redux Toolkit
  - **Backend:** Clean Architecture with FastAPI
  - **Testing:** Full unit test coverage for both UI and AI logic

---

## 🛠️ Tech Stack

| Component            | Technology            | Description                             |
| -------------------- | --------------------- | --------------------------------------- |
| **Frontend**         | React 18 + TypeScript | Component-based UI architecture         |
| **State Management** | Redux Toolkit         | Global state & emergency logic handling |
| **Charts**           | Recharts              | Oscilloscope-style real-time waveforms  |
| **Backend**          | Python FastAPI        | High-performance async WebSocket server |
| **AI / Math**        | NumPy                 | Mathematical modeling & trend analysis  |
| **Testing**          | Vitest & Pytest       | Full-stack testing suite                |

---

## 🏗️ Architecture

The project follows **Clean Architecture** principles to ensure scalability, testability, and separation of concerns.

```text
biosys-dashboard/
├── backend/               # Python AI Server
│   ├── app/
│   │   ├── core/          # Configuration & constants
│   │   ├── schemas/       # Pydantic models
│   │   ├── services/      # AI Engine & simulation logic
│   │   └── api/           # WebSocket routes
│   └── tests/             # Pytest suites
│
└── src/                   # React Frontend
    ├── components/        # Reusable UI components (StatCard, AlarmPanel)
    ├── hooks/             # Custom hooks (useSimulation)
    ├── store/             # Redux slices & global state
    └── test/              # Vitest test suites


🧠 How the AI Works (Predictive Maintenance)

1.Simulation
The backend simulates a ventilator motor accumulating dust and debris using a Drift Factor.

2.Data Collection
The AIEngine class maintains a sliding window of the last 30 pressure readings.

3.Linear Regression
Using np.polyfit, the algorithm calculates the pressure trend slope.

4.Prediction
The model projects pressure values 50 time-steps into the future.

5.Intervention
If Projected_Value > Safety_Threshold:

A PREDICTION_WARNING is sent to the frontend

The ventilator is automatically halted to prevent patient injury

📦 Installation & Setup
Prerequisites

Node.js v18+

Python v3.9+

1️⃣ Start the Backend (AI Server)

cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python3 -m uvicorn app.main:app --reload

📡 WebSocket server will be available at:
ws://127.0.0.1:8000/ws


2️⃣ Start the Frontend (Dashboard)

Open a new terminal:


# Install dependencies
npm install

# Run development server
npm run dev


✅ Running Tests

Verify the integrity of the AI engine and UI components.

Frontend Tests (Vitest)

npm run test


Backend Tests (Pytest)

cd backend
python3 -m pytest

🎯 Purpose

This project was developed as a Biosys Interview Case, demonstrating:

Real-time systems engineering

AI-assisted fault prediction

Medical safety-first design

Clean architecture & test-driven development
```
