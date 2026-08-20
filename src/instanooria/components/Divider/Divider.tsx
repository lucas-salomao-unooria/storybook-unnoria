import React from 'react';
import type { InstaDividerProps } from './Divider.types';
import './Divider.css';

/**
 * Componente Divider — Design System Instanooria
 *
 * Traço hairline de 0.33px que separa linhas de lista, seções do perfil e
 * blocos de notificações, reproduzindo a sombra `0 0.33px 0` do arquivo de design.
 */
export const Divider = React.forwardRef<HTMLDivElement, InstaDividerProps>(
  (
    {
      orientation = 'horizontal',
      weight = 'hairline',
      inset = 0,
      theme = 'light',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-divider',
      `insta-divider--${orientation}`,
      `insta-divider--${weight}`,
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
        data-insta-theme={theme}
        className={classes}
        style={{ ...insetStyle, ...style }}
        {...restProps}
      />
    );
  }
);

Divider.displayName = 'Divider';
