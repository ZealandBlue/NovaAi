import React from 'react';

export type TradingMode = 'AUTONOMOUS' | 'SIMULATION' | 'LEARNING';

interface Props {
  mode: TradingMode;
  onChange: (mode: TradingMode) => void;
}

export const ModeToggle: React.FC<Props> = ({ mode, onChange }) => {
  const options: TradingMode[] = ['AUTONOMOUS', 'SIMULATION', 'LEARNING'];

  return (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: 999,
        background: '#020617',
        border: '1px solid #1e293b',
        padding: 2,
      }}
    >
      {options.map((opt) => {
        const active = mode === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              fontSize: 10,
              padding: '4px 10px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              letterSpacing: 0.08,
              textTransform: 'uppercase',
              background: active ? '#22c55e' : 'transparent',
              color: active ? '#020617' : '#e5e7eb',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};
