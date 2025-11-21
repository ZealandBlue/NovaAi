import React from 'react';

export const WalletStatus: React.FC = () => {
  const connected = false;

  if (!connected) {
    return (
      <button type="button" className="neon-button" style={{ fontSize: 11, paddingInline: 14 }}>
        <span>Connect BlockDAG Wallet</span>
      </button>
    );
  }

  return (
    <div className="pill-stat">
      <span className="pill-dot" />
      <span>bdag:0x12...9af3</span>
      <span style={{ opacity: 0.7 }}>Tier II</span>
    </div>
  );
};

