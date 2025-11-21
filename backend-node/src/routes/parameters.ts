import { Router } from 'express';

export const router = Router();

let currentParameters = {
  mode: 'SIMULATION',
  maxPositionSize: 0.5,
  maxLeverage: 3,
  stopLossPct: 0.02,
  takeProfitPct: 0.04,
};

router.get('/', (_req, res) => {
  res.json(currentParameters);
});

router.post('/', (req, res) => {
  currentParameters = { ...currentParameters, ...(req.body || {}) };
  res.json(currentParameters);
});
