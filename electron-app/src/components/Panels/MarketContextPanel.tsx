import React from 'react';

export const MarketContextPanel: React.FC = () => {
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
        gap: 4,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 600 }}>Market Context</span>
        <span style={{ fontSize: 10, color: '#9ca3af' }}>MOCK DATA</span>
      </header>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#e5e7eb' }}>
        <span>BTC/USDT</span>
        <span style={{ color: '#22c55e' }}>$64,230 (+1.2%)</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af' }}>
        <span>Funding</span>
        <span>+0.021%</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af' }}>
        <span>24h Volume</span>
        <span>$12.4B</span>
      </div>
    </section>
  );
};
