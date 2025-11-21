from typing import Dict, Any


class RLAgent:
    """Stub for reinforcement learning trading agent."""

    def decide(self, signal: str, confidence: float, params: Dict[str, Any]) -> Dict[str, Any]:
        max_position = float(params.get("maxPositionSize", 0.5))
        size = max_position * confidence
        return {
            "side": "BUY" if signal == "LONG" else "SELL",
            "size": round(size, 4),
            "stop_loss": 0.98,
            "take_profit": 1.04,
        }
