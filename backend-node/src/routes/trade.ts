import { Router } from 'express';
import { recordTrade } from '../services/db';
import { sendAutonomousTrade } from '../services/blockdagClient';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const { symbol, side, size, price, mode, userAddress } = body;

    if (typeof symbol !== 'string' || !symbol.trim()) {
      return res.status(400).json({ error: 'invalid_symbol' });
    }

    if (side !== 'buy' && side !== 'sell') {
      return res.status(400).json({ error: 'invalid_side' });
    }

    if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0) {
      return res.status(400).json({ error: 'invalid_size' });
    }

    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ error: 'invalid_price' });
    }

    const validModes = ['SIMULATION', 'AUTONOMOUS'];
    const tradeMode = typeof mode === 'string' && validModes.includes(mode) ? mode : 'SIMULATION';

    const tradeRecord = await recordTrade({
      symbol,
      side,
      size,
      price,
      mode: tradeMode,
      userAddress,
      status: tradeMode === 'AUTONOMOUS' ? 'pending' : 'simulated',
    });

    if (tradeMode === 'AUTONOMOUS') {
      const tx = await sendAutonomousTrade({ symbol, side, size, price, userAddress });
      return res.json({ status: 'submitted', txHash: tx.txHash, trade: tradeRecord });
    }

    return res.json({ status: 'simulated', trade: tradeRecord });
  } catch (err) {
    console.error('[trade] error', err);
    return res.status(500).json({ error: 'trade_failed' });
  }
});
