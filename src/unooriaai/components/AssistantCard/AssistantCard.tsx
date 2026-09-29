import React from 'react';
import type { UaiAssistantCardProps } from './AssistantCard.types';
import { Avatar } from '../Avatar';
import './AssistantCard.css';

/**
 * Componente AssistantCard — Design System UnooriaAI
 *
 * Cartão de 320 × 64 com padding 12/16, gap 12, raio 12 e contorno
 * `--uai-fill-8`, composto por avatar circular de 40px em `--uai-bg-brand`,
 * nome em `Label/MD` e descrição em `Body/XS` em `--uai-text-soft-50`. É a
 * linha do catálogo de assistentes.
 */
export const AssistantCard = React.forwardRef<HTMLDivElement, UaiAssistantCardProps>(
  (
    {
      name,
      description,
      initial = 'A',
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

    const classes = ['uai-assistant-card', block ? 'uai-assistant-card--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as never} data-uai-theme={theme} className={classes} {...restProps}>
        <span className="uai-assistant-card__icon">
          {icon ?? <Avatar size="lg" tone="brand" initials={initial} />}
        </span>
        <span className="uai-assistant-card__content">
          <span className="uai-assistant-card__name">{name}</span>
          {description && <span className="uai-assistant-card__description">{description}</span>}
        </span>
      </Component>
    );
  }
);

AssistantCard.displayName = 'AssistantCard';
