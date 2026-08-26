import React from 'react';
import type { UniSecondaryColumnProps } from './SecondaryColumn.types';
import './SecondaryColumn.css';

/**
 * Componente SecondaryColumn — Design System Unootube
 *
 * Reproduz o nó `Layout/SecondaryColumn` (`20:2996`), a coluna de sugestões da
 * tela de vídeo.
 *
 * O recuo é assimétrico — `24/24/0/0` —, sem folga inferior: a pilha de
 * sugestões do arquivo tem 1530px de altura contra os 968px visíveis, ou seja,
 * é deliberadamente cortada pela aresta do quadro.
 */
export const SecondaryColumn = React.forwardRef<HTMLDivElement, UniSecondaryColumnProps>(
  ({ header, className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-secondary-column', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {header != null && <div className="uni-secondary-column__header">{header}</div>}
      <div className="uni-secondary-column__list">{children}</div>
    </div>
  )
);

SecondaryColumn.displayName = 'SecondaryColumn';
