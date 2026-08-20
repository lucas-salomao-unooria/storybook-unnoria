import React from 'react';
import type { TikStatTileProps } from './StatTile.types';
import './StatTile.css';

/**
 * Componente StatTile — Design System Tik Tooria
 *
 * Par valor/rótulo das métricas do perfil (nodes 4:483, 4:486 e 4:489). O valor
 * usa Bold 17 em `--tik-color-text-primary` e o rótulo Regular 13 em
 * `--tik-color-text-secondary`, com 25px entre as linhas de base — o mesmo
 * intervalo do arquivo.
 */
export const StatTile = React.forwardRef<HTMLDivElement, TikStatTileProps>(
  ({ value, label, className = '', ...restProps }, ref) => (
    <div ref={ref} className={['tik-stattile', className].filter(Boolean).join(' ')} {...restProps}>
      <span className="tik-stattile__value">{value}</span>
      <span className="tik-stattile__label">{label}</span>
    </div>
  )
);

StatTile.displayName = 'StatTile';
