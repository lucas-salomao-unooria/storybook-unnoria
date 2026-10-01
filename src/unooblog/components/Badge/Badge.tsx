import React from 'react';
import { Icon } from '../Icon';
import type { UblIconName } from '../Icon';
import type { UblBadgeProps, UblBadgeTone } from './Badge.types';
import './Badge.css';

/** Glifo de cada tom de status: a cor sozinha não pode carregar o estado. */
const TONE_ICON: Partial<Record<UblBadgeTone, UblIconName>> = {
  success: 'checkCircle',
  warning: 'warning',
  info: 'info',
};

/**
 * Componente Badge — Design System Unooblog
 *
 * Selo em cápsula para estado e contagem: "Novo", "Rascunho", "3 respostas".
 * Os tons de status (`success`, `warning`, `info`) usam o fundo translúcido de
 * `fill-*`, o contorno de `status-*` e um glifo — o texto fica em
 * `text-primary`, que passa de 4,5:1 sobre qualquer um deles nos dois temas.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Badge = React.forwardRef<HTMLSpanElement, UblBadgeProps>(
  ({ tone = 'neutral', size = 'md', icon, theme, className = '', children, ...restProps }, ref) => {
    const glyph = icon ?? TONE_ICON[tone];
    const classes = ['ubl-badge', `ubl-badge--${tone}`, `ubl-badge--${size}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} data-ubl-theme={theme} className={classes} {...restProps}>
        {glyph && <Icon name={glyph} size="xs" tone="inherit" className="ubl-badge__icon" />}
        <span className="ubl-badge__label">{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
