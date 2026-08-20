import React from 'react';
import type { TikSeparatorProps } from './Separator.types';
import './Separator.css';

/**
 * Componente Separator — Design System Tik Tooria
 *
 * Fio de 382px que separa seções (nodes 4:269, 4:297, 4:360 e 4:928). A
 * espessura é fracionária no arquivo — 0,33px nas folhas e 0,66px entre seções
 * de configuração — e é reproduzida por `border-top`, não por altura de bloco,
 * para não somar pixel inteiro ao fluxo.
 */
export const Separator = React.forwardRef<HTMLHRElement, TikSeparatorProps>(
  ({ tone = 'hairline', inset = true, className = '', ...restProps }, ref) => (
    <hr
      ref={ref}
      className={[
        'tik-separator',
        `tik-separator--${tone}`,
        inset ? 'tik-separator--inset' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    />
  )
);

Separator.displayName = 'Separator';
