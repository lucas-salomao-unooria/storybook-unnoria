import React from 'react';
import { Icon } from '../Icon';
import type { UblBreadcrumbProps } from './Breadcrumb.types';
import './Breadcrumb.css';

/**
 * Componente Breadcrumb — Design System Unooblog
 *
 * Trilha de navegação: `<nav aria-label>` com uma lista ordenada. Cada item
 * antes do último é um link (`href`) ou um botão (só `onClick`), seguido de um
 * separador `chevronRight` decorativo (`aria-hidden`). O último item é a página
 * atual: texto sem link, com `aria-current="page"` e peso maior — o estado não
 * depende só da cor.
 *
 * Server Component: só recebe props e renderiza.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, UblBreadcrumbProps>(
  ({ items, ariaLabel = 'Trilha de navegação', theme, className = '', ...restProps }, ref) => {
    const classes = ['ubl-breadcrumb', className].filter(Boolean).join(' ');
    const lastIndex = items.length - 1;

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-ubl-theme={theme}
        className={classes}
        {...restProps}
      >
        <ol className="ubl-breadcrumb__list">
          {items.map((item, index) => {
            const isCurrent = index === lastIndex;

            return (
              <li key={`${index}-${item.label}`} className="ubl-breadcrumb__item">
                {isCurrent ? (
                  <span className="ubl-breadcrumb__current" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href !== undefined ? (
                  <a className="ubl-breadcrumb__link" href={item.href} onClick={item.onClick}>
                    {item.label}
                  </a>
                ) : item.onClick ? (
                  <button type="button" className="ubl-breadcrumb__link" onClick={item.onClick}>
                    {item.label}
                  </button>
                ) : (
                  <span className="ubl-breadcrumb__text">{item.label}</span>
                )}
                {!isCurrent && (
                  <span className="ubl-breadcrumb__separator" aria-hidden="true">
                    <Icon name="chevronRight" size="xs" tone="secondary" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
