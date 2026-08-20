import React from 'react';
import type { GptCardProps } from './GPTCard.types';
import { Avatar } from '../Avatar';
import './GPTCard.css';

/**
 * Componente GPTCard — Design System ChatGPT
 *
 * Réplica do componente `GPTCard` do Figma: cartão de 320 × 64 com padding
 * 12/16, gap 12, raio 12 e contorno translúcido de 8%, composto por avatar
 * circular de 40px em `bg/brand`, nome em `Label/MD` e descrição em
 * `Body/XS` a 50% de opacidade.
 */
export const GPTCard = React.forwardRef<HTMLDivElement, GptCardProps>(
  (
    {
      name,
      description,
      initial = 'G',
      icon,
      as,
      block = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const Component = (as || 'div') as React.ElementType;

    const classes = ['gpt-card', block ? 'gpt-card--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as never} data-gpt-theme={theme} className={classes} {...restProps}>
        <span className="gpt-card__icon">
          {icon ?? <Avatar size="lg" tone="brand" initials={initial} />}
        </span>
        <span className="gpt-card__content">
          <span className="gpt-card__name">{name}</span>
          {description && <span className="gpt-card__description">{description}</span>}
        </span>
      </Component>
    );
  }
);

GPTCard.displayName = 'GPTCard';
