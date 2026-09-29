import React from 'react';
import type { UnvDividerProps } from './Divider.types';
import './Divider.css';

/**
 * Componente Divider — Design System Unoovista
 *
 * Fio de 1px que separa linhas de lista, seções do perfil e blocos de
 * notificações. É o último recurso de separação: antes dele vêm a mudança de
 * superfície (camadas) e o espaço.
 */
export const Divider = React.forwardRef<HTMLDivElement, UnvDividerProps>(
  (
    {
      orientation = 'horizontal',
      weight = 'hairline',
      inset = 0,
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-divider',
      `unv-divider--${orientation}`,
      `unv-divider--${weight}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const insetStyle: React.CSSProperties =
      orientation === 'horizontal'
        ? { marginLeft: inset, width: inset ? `calc(100% - ${inset}px)` : undefined }
        : { marginTop: inset, height: inset ? `calc(100% - ${inset}px)` : undefined };

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        data-unv-theme={theme}
        className={classes}
        style={{ ...insetStyle, ...style }}
        {...restProps}
      />
    );
  }
);

Divider.displayName = 'Divider';
