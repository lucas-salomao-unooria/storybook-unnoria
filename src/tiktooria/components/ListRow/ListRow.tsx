import React from 'react';
import { Icon } from '../Icon';
import type { TikListRowProps } from './ListRow.types';
import './ListRow.css';

/**
 * Componente ListRow — Design System Tik Tooria
 *
 * Linha de 414×76 da tela "Find friends" (node 4:198). Difere do `SettingsRow`
 * por acomodar um disco de 56px no lugar do glifo de 16px, o que eleva a altura
 * da linha e desloca o rótulo para 84px a partir da borda.
 */
export const ListRow = React.forwardRef<HTMLButtonElement, TikListRowProps>(
  ({ label, leading, showChevron = true, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-listrow', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {leading && <span className="tik-listrow__leading">{leading}</span>}
      <span className="tik-listrow__label">{label}</span>
      {showChevron && <Icon name="chevron" size={10.5} tone="default" />}
    </button>
  )
);

ListRow.displayName = 'ListRow';
