import React from 'react';
import type { TikHomeIndicatorProps } from './HomeIndicator.types';
import './HomeIndicator.css';

/**
 * Componente HomeIndicator — Design System Tik Tooria
 *
 * Faixa de 414×35 com a linha de 134×5 e raio total, na base de todas as telas
 * (frame "Bars / Home Indicator", node 4:1120). O fundo é transparente: a cor
 * da linha é o único valor que muda entre os dois contextos de superfície.
 */
export const HomeIndicator = React.forwardRef<HTMLDivElement, TikHomeIndicatorProps>(
  ({ surface = 'chrome', className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-homeindicator', `tik-homeindicator--${surface}`, className]
        .filter(Boolean)
        .join(' ')}
      data-tik-surface={surface}
      aria-hidden
      {...restProps}
    >
      <span className="tik-homeindicator__line" />
    </div>
  )
);

HomeIndicator.displayName = 'HomeIndicator';
