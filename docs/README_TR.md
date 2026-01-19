# 🫁 Biosys Kestirimci Ventilatör Monitörü

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_18-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688.svg)
![AI](https://img.shields.io/badge/AI-Linear_Regression-FF6F00.svg)
![Tests](https://img.shields.io/badge/tests-100%25_Coverage-success.svg)

Yeni nesil mekanik ventilatörler için tasarlanmış, **Yapay Zeka destekli, gerçek zamanlı medikal izleme paneli**.  
Sistem, hava yolu **basıncını, akışını ve hacmini** sürekli izlerken, mekanik arızaları kritik seviyeye ulaşmadan *önce* tespit eden bir **Kestirimci Bakım Algoritması** çalıştırır.

![Panel Önizlemesi](docs/ss1.png)

---

## 🚀 Temel Özellikler

- **⚡ Gerçek Zamanlı İzleme** **WebSockets** üzerinden milisaniye altı sensör verisi akışı.

- **🧠 YZ Kestirimci Motor** Aşağıdaki durumları **20 saniye önceden** tahmin etmek için **Lineer Regresyon (NumPy)** kullanarak anormal basınç trendlerini tespit eder:
  - Filtre tıkanıklığı  
  - Motor yıpranması/bozulması

- **🛡️ Otomatik Güvenlik Protokolü** Yapay zeka kritik bir güvenlik eşiğinin aşılacağını öngördüğünde otomatik olarak **Acil Durdurma** tetikler.

- **🎨 Medikal Sınıf Arayüz** Klinik ortamlarda **yüksek okunabilirlik** için optimize edilmiş, temiz, minimalist, iOS tarzı arayüz.

- **🧪 Sağlam Mühendislik** - **Frontend:** Tip güvenli React + Redux Toolkit  
  - **Backend:** FastAPI ile Temiz Mimari (Clean Architecture)  
  - **Test:** Hem UI hem de YZ mantığı için tam birim testi (Unit Test) kapsamı  

---

## 🛠️ Teknoloji Yığını

| Bileşen | Teknoloji | Açıklama |
|--------|------------|------------|
| **Frontend** | React 18 + TypeScript | Bileşen tabanlı UI mimarisi |
| **State Yönetimi** | Redux Toolkit | Global durum & acil durum lojistiği |
| **Grafikler** | Recharts | Osiloskop tarzı gerçek zamanlı dalga formları |
| **Backend** | Python FastAPI | Yüksek performanslı asenkron WebSocket sunucusu |
| **YZ / Mat.** | NumPy | Matematiksel modelleme & trend analizi |
| **Test** | Vitest & Pytest | Full-stack test süiti |

---

## 🏗️ Mimari

Proje, ölçeklenebilirlik, test edilebilirlik ve sorumlulukların ayrılmasını (separation of concerns) sağlamak için **Temiz Mimari** prensiplerini takip eder.

```text
biosys-dashboard/
├── backend/               # Python YZ Sunucusu
│   ├── app/
│   │   ├── core/          # Konfigürasyon & sabitler
│   │   ├── schemas/       # Pydantic modelleri
│   │   ├── services/      # YZ Motoru & simülasyon mantığı
│   │   └── api/           # WebSocket rotaları
│   └── tests/             # Pytest dosyaları
│
└── src/                   # React Frontend
    ├── components/        # Tekrar kullanılabilir UI bileşenleri
    ├── hooks/             # Özel hook'lar (useSimulation)
    ├── store/             # Redux slice'ları & global state
    └── test/              # Vitest test dosyaları


    🧠 Yapay Zeka Nasıl Çalışır? (Kestirimci Bakım)
Simülasyon Backend, bir Sapma Faktörü (Drift Factor) kullanarak toz ve kir biriktiren bir ventilatör motorunu simüle eder.

Veri Toplama AIEngine sınıfı, son 30 basınç okumasından oluşan kayan bir pencere (sliding window) tutar.

Lineer Regresyon np.polyfit kullanarak algoritma, basınç trendinin eğimini hesaplar.

Tahmin (Projeksiyon) Model, basınç değerlerini gelecekteki 50 zaman adımı için projelendirir.

Müdahale Eğer Tahmini_Değer > Güvenlik_Eşiği ise:

Frontend'e bir PREDICTION_WARNING gönderilir.

Hasta yaralanmasını önlemek için ventilatör otomatik olarak durdurulur.



📦 Kurulum ve Ayarlar
Gereksinimler
Node.js v18+

Python v3.9+

1️⃣ Backend'i Başlat (YZ Sunucusu)

cd backend

# Sanal ortam oluştur
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Bağımlılıkları yükle
pip install -r requirements.txt

# Sunucuyu çalıştır
python3 -m uvicorn app.main:app --reload


📡 WebSocket sunucusu şu adreste aktif olacaktır: ws://127.0.0.1:8000/ws

2️⃣ Frontend'i Başlat (Panel)
Yeni bir terminal açın:

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu çalıştır
npm run dev

✅ Testleri Çalıştırma
YZ motorunun ve arayüz bileşenlerinin bütünlüğünü doğrulayın.

Frontend Testleri (Vitest)

npm run test

Backend Testleri (Pytest)

cd backend
python3 -m pytest

🎯 Amaç
Bu proje, aşağıdakileri gösteren bir Biosys Mülakat Çalışması olarak geliştirilmiştir:

Gerçek zamanlı sistem mühendisliği

YZ destekli hata tahmini

Önce güvenlik (Safety-first) medikal tasarım prensibi

Temiz mimari ve test güdümlü geliştirme (TDD)