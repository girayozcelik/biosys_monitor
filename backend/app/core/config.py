from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Biosys Predictive Monitor"
    
    # Simülasyon Sabitleri
    PRESSURE_BASE: float = 20.0
    FLOW_BASE: float = 40.0
    
    # Hata Senaryosu (Drift)
    DRIFT_FACTOR: float = 0.05  # Her saniye eklenen kirlilik
    
    # Yapay Zeka (AI) Ayarları
    HISTORY_WINDOW: int = 30    # AI son 30 veriye bakacak
    PREDICTION_HORIZON: int = 50 # 50 adım sonrasını tahmin et
    FAILURE_THRESHOLD: float = 35.0 # Bu değeri geçerse sistemi durdur

settings = Settings()