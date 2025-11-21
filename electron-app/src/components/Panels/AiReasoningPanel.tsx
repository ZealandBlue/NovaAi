import React from 'react';

export const AiReasoningPanel: React.FC = () => {
  return (
    <section
      style={{
        flex: 1,
        borderRadius: 8,
        border: '1px solid #1e293b',
        background: 'linear-gradient(to bottom, #020617, #020617, #0b1120)',
        padding: 10,
        fontSize: 11,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600 }}>AI Reasoning</span>
        <span style={{ fontSize: 10, color: '#9ca3af' }}>EXPLAINABLE</span>
      </header>
      <div style={{ color: '#e5e7eb', lineHeight: 1.3 }}>
        Model currently running in <strong>simulation</strong> mode on 15m swings.
        Detected series of higher lows and volume expansion; biasing long with
        conservative position sizing due to elevated volatility.
      </div>
    </section>
  );
};
