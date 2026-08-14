import React from 'react';

export interface UnooriaDocSectionHeaderProps {
  title: string;
  description?: React.ReactNode;
  barColor?: string;
  actions?: React.ReactNode;
  marginBottom?: string;
}

export const UnooriaDocSectionHeader: React.FC<UnooriaDocSectionHeaderProps> = ({
  title,
  description,
  barColor = '#0066FF',
  actions,
  marginBottom = '20px',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            margin: '0 0 4px 0',
            color: '#22272A',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '22px',
              background: barColor,
              borderRadius: '4px',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: '#475157',
              margin: 0,
              lineHeight: '1.6',
            }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
};
