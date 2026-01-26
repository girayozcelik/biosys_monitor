Biosys -  Ventilatör Monitörü (PoC)


✨ Proje Genel Bakış

Bu proje, Biosys için geliştirilmiş bir Kavram İspatı (PoC) çalışmasıdır ve yeni nesil bir ventilatör izleme paneli sunmaktadır. Sistem, olası cihaz arızalarını gerçekleşmeden önce tespit etmek için gerçek zamanlı veri görselleştirmesini Python tabanlı bir Yapay Zeka (AI) tahmin motoru ile birleştirir.

Sistem, ventilatör telemetri verilerini simüle eder ve kritik eşik aşımlarını 20 saniye önceden tahmin etmek için bir Lineer Regresyon modeli kullanır, böylece otomatik güvenlik protokollerini devreye sokar.

✨ Temel Özellikler

  - Gerçek Zamanlı İzleme: Basınç, hava akışı ve oksijen seviyelerinin anlık görselleştirilmesi için WebSocket üzerinden yüksek frekanslı veri akışı.
  - Yapay Zeka Tahmin Motoru: Telemetri trendlerini analiz ederek arızaları öngören, özel NumPy tabanlı Lineer Regresyon modeli.
  - Otomatik Güvenlik Protokolü: AI güven skoru kritik bir arıza öngördüğünde tetiklenen otomatik "Acil Durdurma" (Emergency Stop) sistemi.
  - İnteraktif Panel: Dinamik veri grafikleri için React 18 ve Recharts ile oluşturulmuştur.

🛠 Teknoloji Yığını (Tech Stack)

Frontend (Ön Yüz)

  - Framework: React 18 (TypeScript)
  - Durum Yönetimi: Redux Toolkit
  - Görselleştirme: Recharts
  - Test: Vitest

Backend (Arka Yüz)

  - API: Python FastAPI
  - Veri İşleme: NumPy (AI/Matematik işlemleri için)
  - Test: Pytest
  - İletişim: WebSockets

⚙️ Kurulum ve Başlangıç

Gereksinimler

  - Node.js v18+
  - Python v3.9+

1. Backend Kurulumu (FastAPI)

Backend, simülasyon mantığını ve AI tahmin motorunu yönetir.

# Backend klasörüne gidin
cd backend

# Sanal ortam (virtual environment) oluşturun
python -m venv venv

# Sanal ortamı aktif edin
# Windows için:
venv\Scripts\activate
# Mac/Linux için:
source venv/bin/activate

# Bağımlılıkları yükleyin
pip install -r requirements.txt

# Sunucuyu çalıştırın
uvicorn main:app --reload

2. Frontend Kurulumu (React)

Frontend, WebSocket akışını görselleştirir ve uyarıları görüntüler.

# Frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

🧪 Testleri Çalıştırma

Proje, hem tahmin algoritması hem de arayüz bileşenleri için birim testleri (unit tests) içerir.

Backend Testleri:

cd backend
pytest

Frontend Testleri:

cd frontend
npm run test

📸 Kullanım

1.  Hem Backend hem de Frontend sunucularını başlatın.
2.  Tarayıcınızda http://localhost:5173 adresini (veya terminalde gösterilen portu) açın.
3.  Telemetri akışını başlatmak için "Start Simulation" butonuna tıklayın.
4.  "Status" (Durum) göstergesini izleyin; AI tahminlerine göre Normal, Warning (Uyarı) veya Critical (Kritik) olarak değişecektir.
