from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from model_stub import PatternModel
from rl_agent_stub import RLAgent

app = FastAPI(title="AI Trading ML Service")

model = PatternModel()
agent = RLAgent()


class PredictRequest(BaseModel):
    symbol: str
    timeframe: str
    mode: str
    parameters: Dict[str, Any] = {}


class CursorPoint(BaseModel):
    x: float
    y: float


class SuggestedTrade(BaseModel):
    side: str
    size: float
    stopLoss: float
    takeProfit: float


class PredictResponse(BaseModel):
    signal: str
    confidence: float
    reasoning: str
    cursorPath: List[CursorPoint]
    suggestedTrade: SuggestedTrade


@app.post("/predict", response_model=PredictResponse)
async def predict(req: PredictRequest):
    pattern_signal, confidence, explanation = model.predict(req.symbol, req.timeframe)
    action = agent.decide(pattern_signal, confidence, req.parameters)

    cursor_path = [
        CursorPoint(x=0.1, y=0.8),
        CursorPoint(x=0.3, y=0.5),
        CursorPoint(x=0.6, y=0.4),
        CursorPoint(x=0.8, y=0.3),
    ]

    suggested_trade = SuggestedTrade(
        side=action["side"],
        size=action["size"],
        stopLoss=action["stop_loss"],
        takeProfit=action["take_profit"],
    )

    return PredictResponse(
        signal=pattern_signal,
        confidence=confidence,
        reasoning=explanation,
        cursorPath=cursor_path,
        suggestedTrade=suggested_trade,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=5001)
