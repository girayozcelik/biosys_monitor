import math
import random
from datetime import datetime
from app.core.config import settings
from app.schemas.sensor import SensorData
from app.services.ai_engine import AIEngine

class VentilatorSimulator:
    def __init__(self):
        self.time_step = 0.0
        self.drift_accumulated = 0.0
        self.is_emergency = False
        self.ai_engine = AIEngine()

    def reset(self):
        self.time_step = 0.0
        self.drift_accumulated = 0.0
        self.is_emergency = False
        self.ai_engine = AIEngine()

    def tick(self) -> dict:
        """Her çağrıldığında bir anlık veri üretir ve AI kontrolü yapar."""
        
        if self.is_emergency:
            return {"status": "STOPPED", "data": None, "prediction": None}

        self.time_step += 0.1
        
        # Filtre tıkanma simülasyonu (Drift)
        self.drift_accumulated += settings.DRIFT_FACTOR

        # Fiziksel Modelleme (Sinüs dalgası + Kirlilik)
        pressure = settings.PRESSURE_BASE + (10 * math.sin(self.time_step)) + self.drift_accumulated
        flow = settings.FLOW_BASE * math.cos(self.time_step)
        
        # Gürültü (Sensör hatası simülasyonu)
        noise = random.uniform(-1.0, 1.0)
        
        final_pressure = round(pressure + noise, 1)

        # Veriyi oluştur
        data = SensorData(
            timestamp=datetime.now().strftime("%H:%M:%S"),
            pressure=final_pressure,
            flow=round(flow + noise, 1),
            volume=round(450 + 20 * math.sin(self.time_step / 2), 0),
            oxygenLevel=98
        )

        # ---------------------------
        # AI ANALİZİ BURADA YAPILIYOR
        # ---------------------------
        self.ai_engine.add_reading(final_pressure)
        will_fail, predicted_val = self.ai_engine.predict_failure()

        if will_fail:
            self.is_emergency = True # Sistemi Kilitle
            return {
                "status": "WARNING", 
                "data": data, 
                "prediction": f"CRITICAL: Pressure projected to hit {predicted_val} cmH2O! Stopping..."
            }

        return {"status": "OK", "data": data, "prediction": None}