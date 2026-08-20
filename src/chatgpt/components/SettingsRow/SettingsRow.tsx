import React from 'react';
import type { GptSettingsRowProps } from './SettingsRow.types';
import './SettingsRow.css';

/**
 * Componente SettingsRow — Design System ChatGPT
 *
 * Réplica do componente `SettingsRow` do Figma: linha de 400 × 48 com padding
 * vertical de 12, rótulo em `Body/SM` a 100% e valor em `Body/SM` a 50% de
 * opacidade, alinhado à direita.
 */
export const SettingsRow = React.forwardRef<HTMLDivElement, GptSettingsRowProps>(
  ({ label, value, block = false, theme, className = '', ...restProps }, ref) => {
    const classes = ['gpt-settings-row', block ? 'gpt-settings-row--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        <span className="gpt-settings-row__label">{label}</span>
        {value !== undefined && value !== null && (
          <span className="gpt-settings-row__value">{value}</span>
        )}
      </div>
    );
  }
);

SettingsRow.displayName = 'SettingsRow';
