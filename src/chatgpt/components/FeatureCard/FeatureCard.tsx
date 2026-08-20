import React from 'react';
import type { GptFeatureCardProps } from './FeatureCard.types';
import './FeatureCard.css';

/**
 * Componente FeatureCard — Design System ChatGPT
 *
 * Réplica do componente `FeatureCard` do Figma: cartão de 240 × 120 com
 * padding 16, gap 8, raio 12 e contorno translúcido de 8%, com título e
 * descrição centralizados nos dois eixos.
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, GptFeatureCardProps>(
  ({ title, description, as, block = false, theme, className = '', ...restProps }, ref) => {
    const Component = (as || 'div') as React.ElementType;

    const classes = ['gpt-feature-card', block ? 'gpt-feature-card--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as never} data-gpt-theme={theme} className={classes} {...restProps}>
        <span className="gpt-feature-card__title">{title}</span>
        {description && <span className="gpt-feature-card__description">{description}</span>}
      </Component>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';
