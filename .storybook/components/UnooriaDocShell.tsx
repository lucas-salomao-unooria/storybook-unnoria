import React from 'react';

export interface UnooriaDocShellProps {
  children: React.ReactNode;
  maxWidth?: string;
  backgroundColor?: string;
}

export const UnooriaDocShell: React.FC<UnooriaDocShellProps> = ({
  children,
  maxWidth = '1280px',
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <div
      style={{
        fontFamily: '"Open Sans", system-ui, -apple-system, sans-serif',
        color: '#22272A',
        maxWidth,
        margin: '0 auto',
        padding: '32px 24px',
        backgroundColor,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};
