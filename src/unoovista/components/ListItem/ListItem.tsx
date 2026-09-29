'use client';

import React from 'react';
import type { UnvListItemProps } from './ListItem.types';
import './ListItem.css';

/**
 * Componente ListItem — Design System Unoovista
 *
 * Linha genérica de lista: avatar ou glifo à esquerda, título com subtítulo e
 * metadado, ação à direita. A linha `md` tem 64px (conversas e sugestões de
 * pessoas) e a `sm` tem 48px (menu lateral do perfil). É transparente, para
 * assentar em qualquer camada; sendo interativa, ganha o fundo `fill-field` no
 * hover, com raio de 12px, e o anel de foco de 2px.
 */
export const ListItem = React.forwardRef<HTMLElement, UnvListItemProps>(
  (
    {
      as,
      leading,
      title,
      subtitle,
      meta,
      trailing,
      size = 'md',
      bordered = false,
      onClick,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const isInteractive = Boolean(onClick);
    const Component = (as || (isInteractive ? 'button' : 'div')) as React.ElementType;

    const classes = [
      'unv-list-item',
      `unv-list-item--size-${size}`,
      bordered ? 'unv-list-item--bordered' : '',
      isInteractive ? 'unv-list-item--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as never}
        data-unv-theme={theme}
        className={classes}
        onClick={onClick}
        type={Component === 'button' ? 'button' : undefined}
        {...restProps}
      >
        {leading && <span className="unv-list-item__leading">{leading}</span>}

        <span className="unv-list-item__content">
          <span className="unv-list-item__title">{title}</span>
          {(subtitle || meta) && (
            <span className="unv-list-item__subtitle-row">
              {subtitle && <span className="unv-list-item__subtitle">{subtitle}</span>}
              {meta && <span className="unv-list-item__meta">{meta}</span>}
            </span>
          )}
        </span>

        {trailing && <span className="unv-list-item__trailing">{trailing}</span>}
      </Component>
    );
  }
);

ListItem.displayName = 'ListItem';
