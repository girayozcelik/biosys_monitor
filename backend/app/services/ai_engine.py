import numpy as np
from app.core.config import settings

class AIEngine:
    def __init__(self):
        self.history = []

    def add_reading(self, value: float):
        """Yeni gelen veriyi hafızaya atar."""
        self.history.append(value)
        # Hafıza dolarsa en eskiyi sil (Sliding Window)
        if len(self.history) > settings.HISTORY_WINDOW:
            self.history.pop(0)

    def predict_failure(self) -> tuple[bool, float]:
        """
        Lineer Regresyon ile trend analizi yapar.
        Return: (Bozulacak mı?, Tahmin edilen değer)
        """
        if len(self.history) < settings.HISTORY_WINDOW:
            return False, 0.0

        # X ekseni (Zaman) ve Y ekseni (Basınç değerleri)
        x = np.arange(len(self.history))
        y = np.array(self.history)
        slope, intercept = np.polyfit(x, y, 1)

        # Gelecek tahmini.
        future_index = len(self.history) + settings.PREDICTION_HORIZON
        predicted_value = (slope * future_index) + intercept

        # Eşik değeri geçiyor mu?
        if predicted_value > settings.FAILURE_THRESHOLD:
            return True, round(predicted_value, 2)
        
        return False, round(predicted_value, 2)