import React from 'react';
import { Icon } from '../Icon';
import type { UjnIconButtonProps } from './IconButton.types';
import './IconButton.css';

const ICON_SIZE = { sm: 'sm', md: 'md', lg: 'lg' } as const;

/** Maior contagem exibida por extenso no selo. */
const BADGE_MAX = 99;

/**
 * Componente IconButton — Design System Unoojornal
 *
 * Botão quadrado só com glifo. O nome acessível é obrigatório (`label`) e também
 * vira a dica de ferramenta (`title`). Com `pressed`, o botão é de alternância
 * (`aria-pressed`): salvar a matéria, alternar o tema. Com `badge`, mostra uma
 * contagem num selo — que também entra no nome acessível, para não ser só visual.
 *
 * Server Component: só recebe props e renderiza.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, UjnIconButtonProps>(
  (
    {
      icon,
      label,
      variant = 'ghost',
      size = 'md',
      pressed,
      badge,
      theme,
      type = 'button',
      className = '',
      title,
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'ujn-icon-button',
      `ujn-icon-button--${variant}`,
      `ujn-icon-button--${size}`,
      pressed ? 'ujn-icon-button--pressed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const hasBadge = typeof badge === 'number' && badge > 0;
    const badgeText = hasBadge ? (badge > BADGE_MAX ? `${BADGE_MAX}+` : String(badge)) : '';
    const accessibleName = hasBadge ? `${label}, ${badge}` : label;

    return (
      <button
        ref={ref}
        type={type}
        data-ujn-theme={theme}
        className={classes}
        aria-label={accessibleName}
        aria-pressed={pressed === undefined ? undefined : pressed}
        title={title ?? label}
        {...restProps}
      >
        <Icon name={icon} size={ICON_SIZE[size]} tone="inherit" filled={pressed ? true : undefined} />
        {hasBadge && (
          <span className="ujn-icon-button__badge" aria-hidden="true">
            {badgeText}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
