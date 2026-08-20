import React from 'react';
import { tikIcons } from '../Icon';
import type { TikTooltipProps } from './Tooltip.types';
import './Tooltip.css';

const bubble = tikIcons.calloutBubble;
const bubblePath = bubble.shapes[0].type === 'path' ? bubble.shapes[0].d : '';

/**
 * Componente Tooltip — Design System Tik Tooria
 *
 * Chamada "Tap to create a new video" do perfil (frame "Bubble", node 4:452).
 * O balão de 130×98,9 com rabicho inferior é o vetor literal do nó 4:453,
 * renderizado como fundo em SVG para que o rabicho acompanhe o contorno sem
 * recorte — a sombra `--tik-elevation-tooltip` é aplicada ao próprio caminho.
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TikTooltipProps>(
  ({ title, description, illustration, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      role="tooltip"
      className={['tik-tooltip', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <svg className="tik-tooltip__bubble" viewBox={bubble.viewBox} aria-hidden focusable="false">
        <path d={bubblePath} fill="var(--tik-color-surface-primary)" />
      </svg>

      <div className="tik-tooltip__content">
        {illustration && <span className="tik-tooltip__illustration">{illustration}</span>}
        <span className="tik-tooltip__title">{title}</span>
        {description && <span className="tik-tooltip__description">{description}</span>}
      </div>
    </div>
  )
);

Tooltip.displayName = 'Tooltip';
