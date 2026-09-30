import React from 'react';
import { Icon } from '../Icon';
import type { UglIconButtonProps } from './IconButton.types';
import './IconButton.css';

const ICON_SIZE = { sm: 'sm', md: 'md', lg: 'lg' } as const;

/**
 * Componente IconButton — Design System Unoogaleria
 *
 * Botão quadrado só com glifo. O nome acessível é obrigatório (`label`) e também
 * vira a dica de ferramenta (`title`). Com `pressed`, o botão é de alternância
 * (`aria-pressed`): favoritar, som ligado, painel de informações aberto.
 *
 * Server Component: só recebe props e renderiza.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, UglIconButtonProps>(
  (
    {
      icon,
      label,
      variant = 'plain',
      size = 'md',
      pressed,
      filled,
      pressedTone,
      theme,
      type = 'button',
      className = '',
      title,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'ugl-icon-button',
      `ugl-icon-button--${variant}`,
      `ugl-icon-button--${size}`,
      pressed && pressedTone ? `ugl-icon-button--pressed-${pressedTone}` : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        data-ugl-theme={theme}
        className={classes}
        aria-label={label}
        aria-pressed={pressed === undefined ? undefined : pressed}
        title={title ?? label}
        {...restProps}
      >
        <Icon name={icon} size={ICON_SIZE[size]} tone="inherit" filled={filled ?? (pressed ? true : undefined)} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
