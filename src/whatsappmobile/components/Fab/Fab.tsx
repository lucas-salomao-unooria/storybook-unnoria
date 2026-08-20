import React from 'react';
import { Icon } from '../Icon';
import type { WaFabProps, WaFabVariant } from './Fab.types';
import './Fab.css';

const DEFAULT_SIZES: Record<WaFabVariant, number> = {
  chat: 52,
  camera: 54,
  call: 54,
  mic: 43,
  edit: 41,
  endCall: 58,
};

/**
 * Componente Fab — Design System WhatsApp Mobile
 *
 * Botão de ação flutuante circular. Cada variante reproduz o diâmetro, a cor de
 * preenchimento e o glifo exportados do frame correspondente do Figma. O glifo
 * de microfone é composto pelos dois nós vetoriais originais (`micBody` e
 * `micStand`), posicionados nas coordenadas do arquivo.
 */
export const Fab = React.forwardRef<HTMLButtonElement, WaFabProps>(
  ({ variant = 'chat', size, label, className = '', style, ...restProps }, ref) => {
    const diameter = size ?? DEFAULT_SIZES[variant];
    const classes = ['wa-fab', `wa-fab--${variant}`, className].filter(Boolean).join(' ');

    const renderGlyph = () => {
      switch (variant) {
        case 'chat':
          return <Icon name="newChat" size={diameter} tone="onAccent" />;
        case 'camera':
          return <Icon name="cameraFilled" size={diameter * 0.7} tone="onAccent" flipX />;
        case 'call':
          return <Icon name="phoneAdd" size={diameter * 0.34} tone="onAccent" />;
        case 'mic':
          return (
            <span className="wa-fab__mic">
              <span className="wa-fab__mic-body">
                <Icon name="micBody" size={diameter} tone="onAccent" style={{ width: '100%', height: '100%' }} />
              </span>
              <span className="wa-fab__mic-stand">
                <Icon name="micStand" size={diameter} tone="onAccent" style={{ width: '100%', height: '100%' }} />
              </span>
            </span>
          );
        case 'edit':
          return <Icon name="pencil" size={diameter} tone="onAccent" />;
        case 'endCall':
          return <Icon name="phoneFilled" size={diameter * 0.49} tone="onAccent" rotate={-45} flipY />;
        default:
          return null;
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        aria-label={label}
        style={
          {
            ['--wa-fab-diameter' as string]: `${diameter}px`,
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      >
        <span className="wa-fab__glyph">{renderGlyph()}</span>
      </button>
    );
  }
);

Fab.displayName = 'Fab';
