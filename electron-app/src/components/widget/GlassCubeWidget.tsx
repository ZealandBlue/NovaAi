import React, { useState } from 'react';
import { WidgetDockControls, CubeWidgetState } from './WidgetDockControls';
import { AICursor } from '../cursor/AICursor';

interface GlassCubeWidgetProps {
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  stopLoss?: number;
  takeProfit?: number;
}

export const GlassCubeWidget: React.FC<GlassCubeWidgetProps> = ({
  action,
  confidence,
  reasoning,
  stopLoss,
  takeProfit,
}) => {
  const [state, setState] = useState<CubeWidgetState>('floating');

  const containerClass =
    state === 'docked' ? 'cube-widget cube-widget-docked glass-surface neon-border' : state === 'minimized' ? 'cube-widget-minimized glass-subtle neon-border' : 'cube-widget glass-surface neon-border';

  if (state === 'minimized') {
    return (
      <div className={containerClass}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 4,
              background:
                'radial-gradient(circle at 20% 0%, rgba(56,189,248,0.8), rgba(8,47,73,0.95)), radial-gradient(circle at 80% 100%, rgba(147,51,234,0.95), transparent 60%)',
              boxShadow: '0 0 18px rgba(56,189,248,0.85)',
            }}
          />
          <span style={{ fontSize: 11, letterSpacing: 0.08, textTransform: 'uppercase', color: '#9ca3ff' }}>
            AI Widget Docked
          </span>
          <WidgetDockControls state={state} onChange={setState} />
        </div>
      </div>
    );
  }

  const cursorPath = [
    { x: 0.15, y: 0.76 },
    { x: 0.32, y: 0.54 },
    { x: 0.6, y: 0.42 },
    { x: 0.82, y: 0.3 },
  ];

  const actionLabel = action.toUpperCase();

  return (
    <div className={containerClass}>
      <div className="cube-widget-header">
        <div>
          <div className="cube-widget-title">AI Trading Widget</div>
          <div className="cube-widget-signal">
            {actionLabel} • {(confidence * 100).toFixed(0)}%
          </div>
        </div>
        <WidgetDockControls state={state} onChange={setState} />
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div className="cube-shell">
          <div className="cube-face cube-face--front" />
          <div className="cube-face cube-face--back" />
          <div className="cube-face cube-face--left" />
          <div className="cube-face cube-face--right" />
          <div className="cube-face cube-face--top" />
          <div className="cube-face cube-face--bottom" />
          <div className="cube-core" />
          <div className="cube-core-ring" />

          <div className="cube-node" style={{ top: '18%', left: '32%' }} />
          <div className="cube-node cube-node--cyan" style={{ top: '72%', left: '68%' }} />
          <div className="cube-node cube-node--magenta" style={{ top: '52%', left: '18%' }} />

          <AICursor path={cursorPath} action={action} />
        </div>

        <div className="cube-widget-metrics">
          <div>Reasoning</div>
          <div style={{ fontSize: 12, color: '#e5e7eb', lineHeight: 1.4 }}>{reasoning}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, fontSize: 11 }}>
            {typeof stopLoss === 'number' && (
              <span className="pill-stat">
                <span className="pill-dot" />
                SL {stopLoss.toFixed(2)}
              </span>
            )}
            {typeof takeProfit === 'number' && (
              <span className="pill-stat">
                <span className="pill-dot" />
                TP {takeProfit.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

