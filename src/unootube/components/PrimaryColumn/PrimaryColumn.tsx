import React from 'react';
import type { UniPrimaryColumnProps } from './PrimaryColumn.types';
import './PrimaryColumn.css';

/**
 * Componente PrimaryColumn — Design System Unootube
 *
 * Reproduz o nó `Layout/PrimaryColumn` (`20:2992`). É um contêiner de
 * composição puro: define a largura de 664px, o recuo de 24px e o fundo
 * principal — todo o conteúdo vem por `children`.
 *
 * Os 664px não são arbitrários: são os 640px do reprodutor mais os 24px de
 * recuo à esquerda. A coluna existe para ancorar essa medida.
 */
export const PrimaryColumn = React.forwardRef<HTMLDivElement, UniPrimaryColumnProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-primary-column', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);

PrimaryColumn.displayName = 'PrimaryColumn';
