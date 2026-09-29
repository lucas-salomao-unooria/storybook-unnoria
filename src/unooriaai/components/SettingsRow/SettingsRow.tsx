import React from 'react';
import type { UaiSettingsRowProps } from './SettingsRow.types';
import './SettingsRow.css';

/**
 * Componente SettingsRow — Design System UnooriaAI
 *
 * Linha de rótulo e valor das telas de configuração: 400 × 48, padding
 * vertical de 12, rótulo em `body-sm` na cor primária e valor em `body-sm` na
 * cor de apoio (`--uai-text-soft-50`), alinhado à direita.
 */
export const SettingsRow = React.forwardRef<HTMLDivElement, UaiSettingsRowProps>(
  ({ label, value, block = false, theme, className = '', ...restProps }, ref) => {
    const classes = ['uai-settings-row', block ? 'uai-settings-row--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        <span className="uai-settings-row__label">{label}</span>
        {value !== undefined && value !== null && (
          <span className="uai-settings-row__value">{value}</span>
        )}
      </div>
    );
  }
);

SettingsRow.displayName = 'SettingsRow';
