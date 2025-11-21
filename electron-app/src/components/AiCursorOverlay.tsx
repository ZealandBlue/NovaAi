import React, { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Props {
  path: Point[];
}

export const AiCursorOverlay: React.FC<Props> = ({ path }) => {
  const [position, setPosition] = useState<Point>({ x: 0.1, y: 0.8 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!path || path.length === 0) return;
    setStep(0);
    setPosition(path[0]);
  }, [path]);

  useEffect(() => {
    if (!path || path.length === 0) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % path.length;
        setPosition(path[next]);
        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [path]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 16,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '999px',
          background: '#38bdf8',
          boxShadow: '0 0 16px rgba(56,189,248,0.8)',
          transition: 'left 0.6s ease, top 0.6s ease',
        }}
      />
    </div>
  );
};
