import React from 'react';

const MOCK_TRADES = [
  { id: 1, side: 'BUY', size: 0.25, price: 64000, mode: 'SIM', ts: '19:31:04' },
  { id: 2, side: 'SELL', size: 0.10, price: 64210, mode: 'SIM', ts: '19:42:18' },
];

export const TradeHistoryPanel: React.FC = () => {
  return (
    <section
      style={{
        flex: 1,
        borderRadius: 8,
        border: '1px solid #1e293b',
        background: '#020617',
        padding: 10,
        fontSize: 11,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 600 }}>Trade History</span>
        <span style={{ fontSize: 10, color: '#9ca3af' }}>LOCAL CACHE</span>
      </header>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {MOCK_TRADES.map((t) => (
          <div
            key={t.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '3px 0',
              borderBottom: '1px solid rgba(15,23,42,0.9)',
            }}
          >
            <span style={{ color: t.side === 'BUY' ? '#22c55e' : '#ef4444' }}>{t.side}</span>
            <span>{t.size.toFixed(2)} BTC</span>
            <span>${t.price.toLocaleString()}</span>
            <span style={{ fontSize: 10, color: '#9ca3af' }}>{t.mode}</span>
            <span style={{ fontSize: 10, color: '#9ca3af' }}>{t.ts}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
