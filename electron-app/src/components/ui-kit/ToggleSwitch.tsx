import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#e5e7eb',
        fontSize: 12,
      }}
    >
      <span
        style={{
          position: 'relative',
          width: 34,
          height: 18,
          borderRadius: 999,
          padding: 2,
          background: checked
            ? 'linear-gradient(135deg, rgba(34,197,94,0.9), rgba(16,185,129,0.9))'
            : 'rgba(15,23,42,0.9)',
          border: '1px solid rgba(148,163,184,0.6)',
          boxShadow: checked
            ? '0 0 14px rgba(34,197,94,0.9)'
            : '0 0 10px rgba(15,23,42,0.9)',
          transition: 'background 0.18s ease, box-shadow 0.18s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 16 : 2,
            width: 14,
            height: 14,
            borderRadius: 999,
            background: '#0f172a',
            boxShadow: '0 0 8px rgba(15,23,42,0.9)',
            transition: 'left 0.18s ease',
          }}
        />
      </span>
      {label && <span style={{ opacity: 0.9 }}>{label}</span>}
    </button>
  );
};

