import React from 'react';
import type { UaiFeatureCardProps } from './FeatureCard.types';
import './FeatureCard.css';

/**
 * Componente FeatureCard — Design System UnooriaAI
 *
 * Cartão de 240 × 120 com padding 16, gap 8, raio 12 e contorno
 * `--uai-fill-8`, com título e descrição centralizados nos dois eixos.
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, UaiFeatureCardProps>(
  ({ title, description, as, block = false, theme, className = '', ...restProps }, ref) => {
    const Component = (as || 'div') as React.ElementType;

    const classes = ['uai-feature-card', block ? 'uai-feature-card--block' : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as never} data-uai-theme={theme} className={classes} {...restProps}>
        <span className="uai-feature-card__title">{title}</span>
        {description && <span className="uai-feature-card__description">{description}</span>}
      </Component>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';
