import React from 'react';
import { Icon } from '../Icon';
import type { TikStatusBarProps } from './StatusBar.types';
import './StatusBar.css';

/**
 * Componente StatusBar — Design System Tik Tooria
 *
 * Barra de status do iPhone X de 414×44, presente nas 15 telas do arquivo
 * Figma. Reúne o relógio (SF Pro Text Semibold 15 com tracking de -0,3px), as
 * barras de sinal, o glifo de Wi-Fi e a cápsula de bateria — todos exportados
 * literalmente do arquivo (nodes 4:244, 4:240 e 4:232).
 */
export const StatusBar = React.forwardRef<HTMLDivElement, TikStatusBarProps>(
  ({ surface = 'chrome', time = '9:41', className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-statusbar', `tik-statusbar--${surface}`, className].filter(Boolean).join(' ')}
      data-tik-surface={surface}
      {...restProps}
    >
      <span className="tik-statusbar__clock">{time}</span>
      <span className="tik-statusbar__glyphs">
        <Icon name="mobileSignal" size={11} tone="inherit" />
        <Icon name="wifi" size={11} tone="inherit" />
        <Icon name="battery" size={11} />
      </span>
    </div>
  )
);

StatusBar.displayName = 'StatusBar';
