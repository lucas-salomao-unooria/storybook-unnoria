import React from 'react';
import type { UglListGroupProps } from './ListRow.types';
import './ListRow.css';

/**
 * Componente ListGroup — Design System Unoogaleria
 *
 * Cartão de lista agrupada que reúne `ListRow`: "Tipos de mídia",
 * "Utilitários". O cartão é `--ugl-color-background-primary` com raio de 12px,
 * pensado para a tela em `--ugl-color-background-secondary`. É uma lista de
 * verdade (`<ul role="list">` com um `<li>` por filho), nomeada pelo título
 * quando ele é texto — o `role` explícito mantém a semântica mesmo com
 * `list-style: none`.
 *
 * Server Component: só recebe props e renderiza.
 */
export const ListGroup = React.forwardRef<HTMLDivElement, UglListGroupProps>(
  (
    {
      title,
      headingLevel = 2,
      footer,
      inset = true,
      children,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const Heading = headingLevel === 3 ? 'h3' : 'h2';
    const items = React.Children.toArray(children).filter(Boolean);
    const classes = ['ugl-list-group', inset ? 'ugl-list-group--inset' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        {title && <Heading className="ugl-list-group__title">{title}</Heading>}
        <ul
          role="list"
          className="ugl-list-group__list"
          aria-label={typeof title === 'string' ? title : undefined}
        >
          {items.map((child, index) => (
            <li
              key={React.isValidElement(child) && child.key !== null ? child.key : index}
              className="ugl-list-group__item"
            >
              {child}
            </li>
          ))}
        </ul>
        {footer && <p className="ugl-list-group__footer">{footer}</p>}
      </div>
    );
  }
);

ListGroup.displayName = 'ListGroup';
