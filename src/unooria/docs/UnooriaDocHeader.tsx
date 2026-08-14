import React from 'react';

export interface UnooriaDocHeaderProps {
  category?: string;
  title: string;
  description: React.ReactNode;
  badgeBrand?: string;
  marginBottom?: string;
}

export const UnooriaDocHeader: React.FC<UnooriaDocHeaderProps> = ({
  category = 'Foundations',
  title,
  description,
  badgeBrand = 'Plataforma Unooria',
  marginBottom = '40px',
}) => {
  return (
    <header
      style={{
        marginBottom,
        borderBottom: '1px solid #E2E8F0',
        paddingBottom: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            background: '#22272A',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: '16px',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          {badgeBrand}
        </span>
        <span
          style={{
            background: '#E4E8E9',
            color: '#475157',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '12px',
          }}
        >
          {category}
        </span>
      </div>

      <h1
        style={{
          fontSize: '36px',
          fontWeight: 700,
          margin: '0 0 12px 0',
          color: '#22272A',
          letterSpacing: '-0.5px',
          lineHeight: '1.2',
        }}
      >
        {title}
      </h1>

      <p
        style={{
          fontSize: '16px',
          color: '#475157',
          margin: 0,
          lineHeight: '1.6',
          maxWidth: '850px',
        }}
      >
        {description}
      </p>
    </header>
  );
};
