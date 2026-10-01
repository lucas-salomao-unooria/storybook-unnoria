import React from 'react';
import { Icon } from '../Icon';
import type { UblIconButtonProps } from './IconButton.types';
import './IconButton.css';

const ICON_SIZE = { sm: 'sm', md: 'md', lg: 'lg' } as const;

/** Maior contagem exibida por extenso no selo. */
const BADGE_MAX = 99;

/**
 * Componente IconButton — Design System Unooblog
 *
 * Botão circular só com glifo. O nome acessível é obrigatório (`label`) e também
 * vira a dica de ferramenta (`title`). Com `pressed`, o botão é de alternância
 * (`aria-pressed`): salvar o post, curtir, alternar o tema. Com `badge`, mostra uma
 * contagem num selo — que também entra no nome acessível, para não ser só visual.
 *
 * Server Component: só recebe props e renderiza.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, UblIconButtonProps>(
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
      'ubl-icon-button',
      `ubl-icon-button--${variant}`,
      `ubl-icon-button--${size}`,
      pressed ? 'ubl-icon-button--pressed' : '',
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
        data-ubl-theme={theme}
        className={classes}
        aria-label={accessibleName}
        aria-pressed={pressed === undefined ? undefined : pressed}
        title={title ?? label}
        {...restProps}
      >
        <Icon name={icon} size={ICON_SIZE[size]} tone="inherit" filled={pressed ? true : undefined} />
        {hasBadge && (
          <span className="ubl-icon-button__badge" aria-hidden="true">
            {badgeText}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
