import React from 'react';
import { Icon } from '../Icon';
import type { UnvFloatingButtonProps } from './FloatingButton.types';
import './FloatingButton.css';

/**
 * Componente FloatingButton — Design System Unoovista
 *
 * Pílula flutuante de 44px, com glifo e rótulo, centralizada sobre a tela no
 * topo ou na base: o aviso de "novas publicações" que leva de volta ao início
 * do feed, por exemplo. É uma cápsula de rótulo, não um botão circular. Flutua
 * com a elevação de sobreposição do tema e, escondida, sai da ordem de foco e
 * da árvore de acessibilidade.
 */
export const FloatingButton = React.forwardRef<HTMLButtonElement, UnvFloatingButtonProps>(
  (
    {
      children,
      icon,
      variant = 'primary',
      placement = 'top',
      offset,
      hidden = false,
      theme,
      className = '',
      style,
      type = 'button',
      tabIndex,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unv-floating-button',
      `unv-floating-button--${variant}`,
      `unv-floating-button--${placement}`,
      hidden ? 'unv-floating-button--hidden' : '',
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
        data-unv-theme={theme}
        className={classes}
        style={resolvedStyle}
        {...restProps}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : tabIndex}
      >
        {icon && <Icon name={icon} size={20} tone="inherit" theme={theme} />}
        <span className="unv-floating-button__label">{children}</span>
      </button>
    );
  }
);

FloatingButton.displayName = 'FloatingButton';
