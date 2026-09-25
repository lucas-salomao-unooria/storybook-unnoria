import React from 'react';
import { Icon } from '../Icon';
import type { InstaFloatingButtonProps } from './FloatingButton.types';
import './FloatingButton.css';

/**
 * Componente FloatingButton — Design System Instanooria
 *
 * A pílula flutuante do app real (a de "Novas publicações"): glifo e rótulo
 * numa cápsula de 32px, centralizada sobre a tela. O Instagram não tem FAB
 * circular. A medida é a da pílula "Select multiple" da tela de adicionar
 * imagem (`0:3218`, 153 × 32px), a única pílula flutuante que o arquivo
 * publica; a variante neutra reproduz a superfície dela, a primária usa o azul
 * de ação do `Button`.
 */
export const FloatingButton = React.forwardRef<HTMLButtonElement, InstaFloatingButtonProps>(
  (
    {
      children,
      icon,
      variant = 'primary',
      placement = 'top',
      offset,
      hidden = false,
      theme = 'light',
      className = '',
      style,
      type = 'button',
      tabIndex,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'insta-floating-button',
      `insta-floating-button--${variant}`,
      `insta-floating-button--${placement}`,
      hidden ? 'insta-floating-button--hidden' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle: React.CSSProperties = {
      ...(offset !== undefined ? { [placement]: offset } : {}),
      ...style,
    };

    return (
      <button
        ref={ref}
        type={type}
        data-insta-theme={theme}
        className={classes}
        style={resolvedStyle}
        {...restProps}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : tabIndex}
      >
        {icon && <Icon name={icon} size="sm" tone="inherit" theme={theme} />}
        <span className="insta-floating-button__label">{children}</span>
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';
