import React from 'react';

export const TradingChart: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at top, #1d2a3f, #020617)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 16,
          borderRadius: 8,
          border: '1px solid rgba(148, 163, 184, 0.3)',
          background:
            'repeating-linear-gradient(to right, rgba(30, 64, 175, 0.35) 0, rgba(30, 64, 175, 0.35) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(to top, rgba(30, 64, 175, 0.25) 0, rgba(30, 64, 175, 0.25) 1px, transparent 1px, transparent 24px)',
        }}
      >
        <div style={{ position: 'absolute', left: 16, top: 12, fontSize: 10, letterSpacing: 0.08, color: '#9ca3af' }}>
          LIVE MARKET FEED (MOCK)
        </div>
      </div>
    </div>
  );
};
