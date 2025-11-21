import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'express';
import { router as predictRouter } from './routes/predict';
import { router as tradeRouter } from './routes/trade';
import { router as parametersRouter } from './routes/parameters';
import { router as historyRouter } from './routes/history';
import { initDb } from './services/db';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use('/predict', predictRouter);
app.use('/trade', tradeRouter);
app.use('/parameters', parametersRouter);
app.use('/history', historyRouter);

const port = process.env.PORT || 4000;

async function start() {
  await initDb();
  app.listen(port, () => {
    console.log(`[backend-node] Listening on http://127.0.0.1:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start backend:', err);
  process.exit(1);
});
