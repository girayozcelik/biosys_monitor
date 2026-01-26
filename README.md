# Biosys Monitor (PoC)



A proof-of-concept project for **real-time ventilator telemetry monitoring** with a simple **predictive maintenance** layer.

The system streams simulated sensor data over WebSockets, visualizes it in a React dashboard, and applies a lightweight linear-regression model to detect potentially dangerous trends a few seconds in advance.



![Biosys Ekran Görüntüsü](docs/ss1.png)

---

## Features

- Real-time telemetry streaming (pressure, airflow, oxygen)
- Interactive charts with live updates
- Simple predictive analysis using NumPy (linear regression)
- Emergency Stop trigger when predicted values exceed safe thresholds
- Clean, modular frontend and backend separation

---

## Tech Stack

### Frontend
- React 18 (TypeScript)
- Redux Toolkit
- Recharts
- Vitest

### Backend
- Python
- FastAPI
- WebSockets
- NumPy
- Pytest

---

## Project Structure

```
.
├─ backend/         # FastAPI server, simulation, prediction logic
├─ frontend/        # React + TypeScript dashboard
└─ docs/            # Notes and assets
```

---

## Getting Started

### Requirements
- Node.js 18+
- Python 3.9+

---

### Backend Setup

```bash
cd backend

python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`.

---

## Running Tests

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

---

## Design Notes

- Telemetry data is **simulated** to keep the system deterministic and testable.
- Linear regression was chosen intentionally for clarity and transparency.
- Prediction window (~20 seconds) is a demo value and can be tuned.

---

## Possible Improvements

- Advanced anomaly detection (rolling statistics, ARIMA, LSTM)
- Data persistence (PostgreSQL / SQLite)
- Docker & Docker Compose setup
- Authentication and role-based access
- End-to-end tests for WebSocket flow

---

## License

MIT
