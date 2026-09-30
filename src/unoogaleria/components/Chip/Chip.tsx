import React from 'react';
import { Icon } from '../Icon';
import type { UglChipProps } from './Chip.types';
import './Chip.css';

const ICON_SIZE = { sm: 'xs', md: 'sm' } as const;

/**
 * Componente Chip — Design System Unoogaleria
 *
 * Pílula de filtro ou de sugestão: "Favoritos", "Vídeos", "Animais". Com
 * `selected` definido é um botão de alternância (`aria-pressed`) e, ligado,
 * ganha o preenchimento de ação e o glifo `check` quando não tem glifo próprio
 * — a pista não depende só de cor. Sem `selected` é um botão comum.
 *
 * Server Component: só recebe props e renderiza. `type="button"` é o padrão.
 */
export const Chip = React.forwardRef<HTMLButtonElement, UglChipProps>(
  (
    {
      label,
      icon,
      selected,
      size = 'md',
      variant = 'filled',
      trailing,
      disabled = false,
      theme,
      type = 'button',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isSelected = selected === true;
    const leadingIcon = icon ?? (isSelected ? 'check' : undefined);

    const classes = [
      'ugl-chip',
      `ugl-chip--${size}`,
      `ugl-chip--${variant}`,
      isSelected ? 'ugl-chip--selected' : '',
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
        disabled={disabled}
        aria-pressed={selected === undefined ? undefined : selected}
        {...restProps}
      >
        {leadingIcon && <Icon name={leadingIcon} size={ICON_SIZE[size]} tone="inherit" />}
        <span className="ugl-chip__label">{label}</span>
        {trailing !== undefined && trailing !== null && (
          <span className="ugl-chip__trailing">{trailing}</span>
        )}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
