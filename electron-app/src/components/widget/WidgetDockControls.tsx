import React from 'react';

export type CubeWidgetState = 'floating' | 'docked' | 'minimized';

interface WidgetDockControlsProps {
  state: CubeWidgetState;
  onChange: (next: CubeWidgetState) => void;
}

export const WidgetDockControls: React.FC<WidgetDockControlsProps> = ({ state, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button
        type="button"
        onClick={() => onChange('floating')}
        style={circleStyle(state === 'floating')}
        title="Float on desktop"
      />
      <button
        type="button"
        onClick={() => onChange('docked')}
        style={circleStyle(state === 'docked')}
        title="Dock to edge"
      />
      <button
        type="button"
        onClick={() => onChange('minimized')}
        style={circleStyle(state === 'minimized')}
        title="Minimize widget"
      />
    </div>
  );
};

function circleStyle(active: boolean): React.CSSProperties {
  return {
    width: 9,
    height: 9,
    borderRadius: 999,
    border: '1px solid rgba(148,163,184,0.7)',
    background: active ? 'rgba(56,189,248,0.9)' : 'transparent',
    boxShadow: active ? '0 0 10px rgba(56,189,248,0.9)' : 'none',
    padding: 0,
    cursor: 'pointer',
  };
}

