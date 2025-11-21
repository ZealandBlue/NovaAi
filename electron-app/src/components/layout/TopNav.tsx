import React from 'react';
import { WalletStatus } from './WalletStatus';

interface TopNavProps {
  onActivate?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onActivate }) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 20px 4px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background:
              'radial-gradient(circle at 20% 0%, rgba(56,189,248,0.85), rgba(8,47,73,0.95)), radial-gradient(circle at 80% 100%, rgba(147,51,234,0.98), transparent 60%)',
            boxShadow: '0 0 22px rgba(56,189,248,0.9)',
          }}
        />
        <div>
          <div style={{ fontSize: 11, letterSpacing: 0.18, textTransform: 'uppercase', color: '#9ca3ff' }}>
            BlockDAG
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>AI Trading Desktop</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <WalletStatus />
        <button
          type="button"
          onClick={onActivate}
          className="neon-button"
          style={{ fontSize: 11, paddingInline: 14 }}
        >
          <span>Activate AI Trader</span>
        </button>
      </div>
    </header>
  );
};

