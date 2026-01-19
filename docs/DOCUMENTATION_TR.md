# YAZILIM TASARIM DOKÜMANI (YTD)

**Proje:** Biosys Biyovent Kestirimci Bakım Modülü
**Doküman No:** YTD-BIOSYS-2026-001
**Sürüm:** 1.0.0
**Tarih:** 19 Ocak 2026
**Tasnif:** HİZMETE ÖZEL

---

## 1. YÖNETİCİ ÖZETİ

Bu doküman, ventilatör cihazlarında kullanılmak üzere geliştirilen **Kestirimci Bakım (Predictive Maintenance)** yazılımının teknik mimarisini ve çalışma prensiplerini tanımlar. Sistem, sensör verilerini gerçek zamanlı analiz ederek olası donanım arızalarını (filtre tıkanıklığı, motor yorulması vb.) arıza gerçekleşmeden önce tespit etmek ve önleyici tedbir almak üzere tasarlanmıştır.

## 2. SİSTEM MİMARİSİ

Yazılım, güvenilirlik ve sürdürülebilirlik esas alınarak **Temiz Mimari (Clean Architecture)** prensiplerine göre yapılandırılmıştır.

### 2.1. Alt Sistemler

- **İnsan-Makine Arayüzü (HMI):** **React 18 ve TypeScript** kullanılarak, askeri ve medikal standartlara uygun, yüksek okunabilirlik sağlayan bir arayüz geliştirilmiştir. Durum yönetimi için **Redux Toolkit** kullanılarak deterministik bir veri akışı sağlanmıştır.
- **Veri İşleme Birimi (Backend):** **Python FastAPI** altyapısı üzerine kurulmuştur. Asenkron WebSocket mimarisi ile gecikmesiz (low-latency) veri iletimi sağlar.
- **Karar Destek Mekanizması (YZ):** **NumPy** kütüphanesi kullanılarak geliştirilen matematiksel model, anlık basınç verilerini işler.

## 3. ALGORİTMA MANTIĞI (KESTİRİMCİ BAKIM)

Sistem, "Kayan Pencere Trend Analizi" (Sliding Window Trend Analysis) yöntemini kullanmaktadır.

**Çalışma Prensibi:**

1.  **Veri Toplama:** Sistem, hava yolu basıncına ait son 30 örneklemi bellekte tutar.
2.  **Regresyon Analizi:** Veri kümesine Birinci Dereceden Doğrusal Regresyon uygulanarak eğim ($m$) hesaplanır.
3.  **Projeksiyon (Öngörü):** Hesaplanan eğim kullanılarak sistemin 50 döngü sonraki durumu tahmin edilir.
4.  **Karar Verme:**
    - EĞER `Tahmin_Değeri` > `Uyarı_Eşiği` İSE: Operatöre **ÖN UYARI** verilir.
    - EĞER `Tahmin_Değeri` > `Kritik_Eşik` İSE: Sistem **ACİL DURDURMA** protokolünü devreye alır.

## 4. GÜVENLİK VE HATA TOLERANSI PROTOKOLLERİ

Yaşam destek ünitesi simülasyonu olması sebebiyle "Fail-Safe" (Hata durumunda güvenli kalma) prensibi benimsenmiştir.

- **Watchdog (Gözcü) Mekanizması:** Haberleşme hattı sürekli izlenir; bağlantı kaybı durumunda görsel/işitsel ikaz verilir.
- **Otomatik Müdahale (Auto-Kill Switch):** YZ motoru kritik bir arıza öngördüğünde, operatör müdahalesini beklemeden sistemi güvenli moda alır ve kilitler.
- **Spam Koruması:** Alarm mekanizması, bellek taşmasını (Memory Leak) önlemek amacıyla "Dairesel Tampon" (Circular Buffer) yapısında sınırlandırılmıştır.

## 5. DOĞRULAMA VE GEÇERLEME (V&V)

Sistemin güvenilirliği aşağıdaki test süreçleri ile doğrulanmıştır:

- **Birim Testleri (Unit Tests):** YZ mantığı ve hesaplama doğruluğu **Pytest** ile %100 kapsama oranında test edilmiştir.
- **Entegrasyon Testleri:** Arayüz bileşenleri ve durum yönetimi **Vitest** ile doğrulanmıştır.
- **Yük Testi:** 20Hz veri akış hızında sistem kararlılığı onaylanmıştır.

---

**Hazırlayan:** Derviş Giray Özçelik
