import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  iconRight?: React.ReactNode;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ label, iconRight, ...rest }) => {
  return (
    <button className="neon-button" type="button" {...rest}>
      <span>{label}</span>
      {iconRight && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconRight}</span>}
    </button>
  );
};

