import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { open, Database } from 'sqlite';

let db: Database | null = null;

export async function initDb() {
  if (db) return;

  const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'data', 'trades.db');

  const dir = path.dirname(dbPath);
  if (dbPath !== ':memory:' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT,
      side TEXT,
      size REAL,
      price REAL,
      mode TEXT,
      userAddress TEXT,
      status TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

interface TradeInput {
  symbol: string;
  side: string;
  size: number;
  price: number;
  mode: string;
  userAddress?: string;
  status: string;
}

export async function recordTrade(input: TradeInput) {
  if (!db) throw new Error('DB not initialized');
  const { symbol, side, size, price, mode, userAddress, status } = input;
  const result = await db.run(
    'INSERT INTO trades (symbol, side, size, price, mode, userAddress, status) VALUES (?,?,?,?,?,?,?)',
    symbol,
    side,
    size,
    price,
    mode,
    userAddress || null,
    status,
  );
  return { id: result.lastID, ...input };
}

export async function getRecentTrades(limit: number) {
  if (!db) throw new Error('DB not initialized');
  const rows = await db.all('SELECT * FROM trades ORDER BY createdAt DESC LIMIT ?', limit);
  return rows;
}
