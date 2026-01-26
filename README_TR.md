# Biosys Monitor (PoC)

Bu proje, **gerçek zamanlı ventilatör telemetri izleme** ve basit bir **öngörücü bakım (predictive maintenance)** yaklaşımını göstermek amacıyla hazırlanmış bir **proof-of-concept (PoC)** çalışmasıdır.

Simüle edilmiş sensör verileri WebSocket üzerinden aktarılır, React tabanlı bir arayüzde görselleştirilir ve basit bir doğrusal regresyon modeliyle kısa vadeli riskli eğilimler tahmin edilir.

---

![Biosys Ekran Görüntüsü](docs/ss1.png)

## Özellikler

- Gerçek zamanlı sensör verisi akışı (basınç, hava akışı, oksijen)
- Canlı güncellenen interaktif grafikler
- NumPy tabanlı basit öngörücü analiz (linear regression)
- Kritik eşikler öngörüldüğünde Emergency Stop tetiklenmesi
- Modüler ve sade frontend / backend mimarisi

---

## Teknolojiler

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

## Proje Yapısı

```
.
├─ backend/         # FastAPI, simülasyon ve tahmin mantığı
├─ frontend/        # React + TypeScript arayüz
└─ docs/            # Notlar ve görseller
```

---

## Kurulum

### Gereksinimler
- Node.js 18+
- Python 3.9+

---

### Backend Çalıştırma

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

Backend varsayılan olarak `http://localhost:8000` adresinde çalışır.

---

### Frontend Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

---

## Testler

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

## Tasarım Notları

- Telemetri verileri **tamamen simüle edilmiştir**.
- Doğrusal regresyon, anlaşılabilir ve şeffaf olması için tercih edilmiştir.
- Tahmin süresi (~20 saniye) PoC için belirlenmiş örnek bir değerdir.

---

## Geliştirme Fikirleri

- Daha gelişmiş anomali tespiti
- Veri kalıcılığı (PostgreSQL / SQLite)
- Docker / Docker Compose
- Kimlik doğrulama ve yetkilendirme
- WebSocket akışı için uçtan uca testler

---

## Lisans

MIT
