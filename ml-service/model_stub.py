from typing import Tuple


class PatternModel:
    """Stub for LSTM/Transformer-style swing trading model."""

    def predict(self, symbol: str, timeframe: str) -> Tuple[str, float, str]:
        signal = "LONG"
        confidence = 0.72
        reasoning = f"Detected higher-low structure on {symbol} {timeframe} with increasing volume."
        return signal, confidence, reasoning
