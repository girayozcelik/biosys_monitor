import pytest
from app.services.ai_engine import AIEngine
from app.services.simulator import VentilatorSimulator
from app.core.config import settings

# --- AI ENGINE TESTLERİ ---

def test_ai_memory_management():
    """AI motoru, hafıza sınırını (Window Size) koruyor mu?"""
    ai = AIEngine()
    
    for i in range(settings.HISTORY_WINDOW + 5):
        ai.add_reading(i)  
    assert len(ai.history) == settings.HISTORY_WINDOW
    assert ai.history[-1] == settings.HISTORY_WINDOW + 4

def test_ai_prediction_safe():
    """Düz giden veride alarm vermemeli."""
    ai = AIEngine()
    
    for _ in range(settings.HISTORY_WINDOW):
        ai.add_reading(20.0)
        
    will_fail, _ = ai.predict_failure()
    assert will_fail is False

def test_ai_prediction_critical():
    """Hızla artan veride alarm vermeli."""
    ai = AIEngine()
    
    # Hızla artan basınç simülasyonu (10, 12, 14...)
    val = 10.0
    for _ in range(settings.HISTORY_WINDOW):
        ai.add_reading(val)
        val += 2.0 
        
    will_fail, predicted_val = ai.predict_failure()
    
    assert will_fail is True
    assert predicted_val > val

# --- SİMÜLATÖR TESTLERİ ---

def test_simulator_drift_logic():
    """Simülatör her adımda kirlilik (Drift) ekliyor mu?"""
    sim = VentilatorSimulator()
    
    # İlk drift değeri
    initial_drift = sim.drift_accumulated
    
    # Bir adım işlet
    sim.tick()
    
    # Yeni drift değeri artmış olmalı
    assert sim.drift_accumulated == initial_drift + settings.DRIFT_FACTOR

def test_simulator_emergency_stop():
    """Acil durum bayrağı kalkınca simülatör duruyor mu?"""
    sim = VentilatorSimulator()
    
    # Manuel olarak acil durumu tetikle
    sim.is_emergency = True
    
    result = sim.tick()
    
    assert result["status"] == "STOPPED"
    assert result["data"] is None