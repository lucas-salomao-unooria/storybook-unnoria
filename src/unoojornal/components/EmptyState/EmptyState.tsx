import React from 'react';
import { Icon } from '../Icon';
import type { UjnEmptyStateProps } from './EmptyState.types';
import './EmptyState.css';

/**
 * Componente EmptyState — Design System Unoojornal
 *
 * O que a tela mostra quando não há o que mostrar: nenhuma matéria salva, busca
 * sem resultado, seção sem publicações. Glifo de 32px num medalhão circular em
 * `background-subtle`, título, texto de apoio e, quando houver, a ação que
 * resolve o vazio. O glifo é decorativo — quem informa é o título.
 *
 * Server Component: só recebe props e renderiza.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, UjnEmptyStateProps>(
  (
    { icon, title, description, action, headingLevel = 2, theme, className = '', ...restProps },
    ref
  ) => {
    const Heading = headingLevel === 3 ? 'h3' : 'h2';
    const classes = ['ujn-empty-state', className].filter(Boolean).join(' ');

    return (
      <div ref={ref} data-ujn-theme={theme} className={classes} {...restProps}>
        {icon && (
          <span className="ujn-empty-state__medallion" aria-hidden="true">
            <Icon name={icon} size="lg" tone="inherit" />
          </span>
        )}
        <Heading className="ujn-empty-state__title">{title}</Heading>
        {description && <p className="ujn-empty-state__description">{description}</p>}
        {action && <div className="ujn-empty-state__action">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
