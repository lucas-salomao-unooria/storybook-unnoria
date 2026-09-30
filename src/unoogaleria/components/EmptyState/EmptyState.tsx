import React from 'react';
import { Icon } from '../Icon';
import type { UglEmptyStateProps } from './EmptyState.types';
import './EmptyState.css';

/**
 * Componente EmptyState — Design System Unoogaleria
 *
 * O que a tela mostra quando não há o que mostrar: álbum sem fotos, busca sem
 * resultado, lixeira vazia. Glifo de 48px num medalhão, título, texto de apoio
 * e, quando houver, a ação que resolve o vazio. O glifo é decorativo — quem
 * informa é o título.
 *
 * Server Component: só recebe props e renderiza.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, UglEmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      headingLevel = 2,
      variant = 'default',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const Heading = headingLevel === 3 ? 'h3' : 'h2';
    const classes = ['ugl-empty-state', `ugl-empty-state--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        <span className="ugl-empty-state__medallion" aria-hidden="true">
          <Icon name={icon} size="xl" tone="inherit" />
        </span>
        <Heading className="ugl-empty-state__title">{title}</Heading>
        {description && <p className="ugl-empty-state__description">{description}</p>}
        {action && <div className="ugl-empty-state__action">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
