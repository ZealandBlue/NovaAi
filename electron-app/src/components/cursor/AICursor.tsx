import React, { useEffect, useMemo, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

type ActionKind = 'buy' | 'sell' | 'hold';

interface AICursorProps {
  path: Point[];
  action: ActionKind;
}

export const AICursor: React.FC<AICursorProps> = ({ path, action }) => {
  const [t, setT] = useState(0);
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    if (!path || path.length < 2) return;

    setT(0);
    const start = performance.now();

    let frame: number;
    const loop = (now: number) => {
      const elapsed = now - start;
      const duration = 2600;
      const nextT = Math.min(1, elapsed / duration);
      setT(nextT);
      if (nextT < 1) {
        frame = requestAnimationFrame(loop);
      } else {
        setRippleKey((k) => k + 1);
      }
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [path]);

  const position = useMemo(() => {
    if (!path || path.length === 0) return { x: 0.1, y: 0.8 };
    if (path.length === 1) return path[0];

    const scaled = t * (path.length - 1);
    const i = Math.floor(scaled);
    const localT = scaled - i;
    const a = path[i];
    const b = path[Math.min(i + 1, path.length - 1)];
    return {
      x: a.x + (b.x - a.x) * localT,
      y: a.y + (b.y - a.y) * localT,
    };
  }, [path, t]);

  const className =
    action === 'buy' ? 'ai-cursor-dot ai-cursor-dot--buy' : action === 'sell' ? 'ai-cursor-dot ai-cursor-dot--sell' : 'ai-cursor-dot ai-cursor-dot--hold';

  return (
    <div className="ai-cursor-layer">
      <div
        className={className}
        style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%` }}
      />
      <div
        key={rippleKey}
        className="ai-cursor-ripple"
        style={{ left: `${position.x * 100}%`, top: `${position.y * 100}%` }}
      />
    </div>
  );
};

