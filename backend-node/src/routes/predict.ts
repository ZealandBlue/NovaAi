import { Router } from 'express';
import { callMlService } from '../services/mlClient';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};

    const symbol = typeof body.symbol === 'string' && body.symbol.trim() ? body.symbol : 'BTCUSDT';
    const timeframe = typeof body.timeframe === 'string' && body.timeframe.trim() ? body.timeframe : '15m';
    const mode = typeof body.mode === 'string' && body.mode.trim() ? body.mode : 'SIMULATION';
    const parameters = typeof body.parameters === 'object' && body.parameters !== null ? body.parameters : {};

    const raw = await callMlService({
      symbol,
      timeframe,
      mode,
      parameters,
    });

    const rawAction = typeof raw.action === 'string' ? raw.action.toLowerCase() : raw.signal?.toLowerCase?.();
    const allowedActions = ['buy', 'sell', 'hold'];
    const action = allowedActions.includes(rawAction) ? rawAction : 'hold';

    const confidenceNum = Number(raw.confidence);
    const confidence = Number.isFinite(confidenceNum)
      ? Math.min(Math.max(confidenceNum, 0), 1)
      : 0;

    const reasoning = typeof raw.reasoning === 'string' && raw.reasoning.trim()
      ? raw.reasoning
      : 'No reasoning provided';

    const cursorPath = Array.isArray(raw.cursorPath)
      ? raw.cursorPath.slice(0, 100)
      : [];

    const normalized = {
      action,
      confidence,
      reasoning,
      cursorPath,
      suggestedTrade: raw.suggestedTrade || null,
      timestamp: Date.now(),
      modelVersion: typeof raw.modelVersion === 'string' ? raw.modelVersion : 'v1',
    };

    res.json(normalized);
  } catch (err) {
    console.error('[predict] error', err);
    res.status(500).json({ error: 'prediction_failed' });
  }
});
