import { Router } from 'express';
import { getRecentTrades } from '../services/db';

export const router = Router();

router.get('/', async (_req, res) => {
  try {
    const trades = await getRecentTrades(100);
    res.json(trades);
  } catch (err) {
    console.error('[history] error', err);
    res.status(500).json({ error: 'history_failed' });
  }
});
