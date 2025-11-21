import React from 'react';
import { TopNav } from './TopNav';
import { GlassCubeWidget } from '../widget/GlassCubeWidget';
import { TradingChart } from '../TradingChart';
import { AiReasoningPanel } from '../Panels/AiReasoningPanel';
import { MarketContextPanel } from '../Panels/MarketContextPanel';
import { TradeHistoryPanel } from '../Panels/TradeHistoryPanel';
import { GlassCard } from '../ui-kit/GlassCard';

export const Homepage: React.FC = () => {
  const reasoning = 'Detected bullish reversal with strengthening BlockDAG inflows and positive funding skew.';

  return (
    <div className="page-shell dag-bg">
      <TopNav />
      <main className="page-main">
        <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,3fr) minmax(0,2.5fr)', gap: 18, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 600, marginBottom: 10 }}>
              Autonomous AI Trader for <span style={{ color: '#38bdf8' }}>BlockDAG</span>.
            </div>
            <div style={{ maxWidth: 520, fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
              A local-first AI trading cockpit combining sequence models, reinforcement learning, and on-chain BlockDAG
              execution. Visualise the model&apos;s intent in real-time through the glass cube widget and AI cursor.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button type="button" className="neon-button">
                <span>Activate AI Trader</span>
              </button>
              <button
                type="button"
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(148,163,184,0.6)',
                  background: 'rgba(15,23,42,0.85)',
                  color: '#e5e7eb',
                  fontSize: 12,
                }}
              >
                Visualization Mode
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, fontSize: 11, color: '#9ca3af' }}>
              <span>• LSTM + Transformer hybrid</span>
              <span>• Reinforcement learning layer</span>
              <span>• On-chain signal anchoring</span>
            </div>
          </div>

          <div style={{ position: 'relative', height: 260 }}>
            <div
              style={{
                position: 'absolute',
                right: 10,
                top: 0,
                width: 230,
                height: 230,
                borderRadius: '999px',
                background:
                  'radial-gradient(circle at 20% 0%, rgba(56,189,248,0.9), rgba(8,47,73,1)), radial-gradient(circle at 80% 100%, rgba(147,51,234,0.95), transparent 60%)',
                boxShadow:
                  '0 0 80px rgba(56,189,248,0.9), 0 0 120px rgba(129,140,248,0.9), 0 0 140px rgba(56,189,248,1)',
                filter: 'blur(0.2px)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 10,
                width: 260,
                height: 260,
                borderRadius: '999px',
                border: '1px dashed rgba(148,163,184,0.45)',
                boxShadow: '0 0 40px rgba(15,23,42,0.9)',
                mixBlendMode: 'screen',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 24,
                top: 30,
              }}
            >
              <GlassCubeWidget
                action="buy"
                confidence={0.87}
                reasoning={reasoning}
                stopLoss={1.22}
                takeProfit={1.45}
              />
            </div>
          </div>
        </section>

        <section className="page-grid">
          <GlassCard>
            <div style={{ height: '100%', position: 'relative' }}>
              <TradingChart />
            </div>
          </GlassCard>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <GlassCard>
              <AiReasoningPanel />
            </GlassCard>
            <GlassCard>
              <MarketContextPanel />
            </GlassCard>
            <GlassCard>
              <TradeHistoryPanel />
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
};

