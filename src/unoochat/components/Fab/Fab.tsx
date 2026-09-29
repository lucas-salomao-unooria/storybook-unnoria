import React from 'react';
import { Icon } from '../Icon';
import type { UncFabProps, UncFabVariant } from './Fab.types';
import './Fab.css';

const DEFAULT_SIZES: Record<UncFabVariant, number> = {
  chat: 52,
  camera: 54,
  call: 54,
  mic: 43,
  edit: 41,
  endCall: 58,
};

/**
 * Componente Fab — Design System Unoochat
 *
 * Botão de ação flutuante circular. Cada variante define o diâmetro, a cor de
 * preenchimento e o glifo da biblioteca de ícones da Plataforma Unooria; o
 * glifo ocupa metade do diâmetro.
 */
export const Fab = React.forwardRef<HTMLButtonElement, UncFabProps>(
  ({ variant = 'chat', size, label, className = '', style, ...restProps }, ref) => {
    const diameter = size ?? DEFAULT_SIZES[variant];
    const classes = ['unc-fab', `unc-fab--${variant}`, className].filter(Boolean).join(' ');

    const renderGlyph = () => {
      const glyph = Math.round(diameter * 0.5);
      switch (variant) {
        case 'chat':
          return <Icon name="newChat" size={glyph} tone="onAccent" />;
        case 'camera':
          return <Icon name="cameraFilled" size={glyph} tone="onAccent" />;
        case 'call':
          return <Icon name="phoneAdd" size={glyph} tone="onAccent" />;
        case 'mic':
          return <Icon name="mic" size={Math.round(diameter * 0.55)} tone="onAccent" />;
        case 'edit':
          return <Icon name="pencil" size={Math.round(diameter * 0.5)} tone="inherit" />;
        case 'endCall':
          return <Icon name="callEnd" size={Math.round(diameter * 0.5)} tone="inherit" />;
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
            ['--unc-fab-diameter' as string]: `${diameter}px`,
            ...style,
          } as React.CSSProperties
        }
        {...restProps}
      >
        <span className="unc-fab__glyph">{renderGlyph()}</span>
      </button>
    );
  }
);

Fab.displayName = 'Fab';
