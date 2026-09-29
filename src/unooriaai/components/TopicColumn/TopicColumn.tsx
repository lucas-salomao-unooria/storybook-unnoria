import React from 'react';
import type { UaiTopicColumnProps } from './TopicColumn.types';
import { Icon } from '../Icon';
import './TopicColumn.css';

/**
 * Componente TopicColumn — Design System UnooriaAI
 *
 * Uma das três colunas da tela vazia: ícone de 32px, título `heading-h3`
 * (Open Sans semibold) com 8px de intervalo, e abaixo a pilha de cartões.
 *
 * A coluna é um fluxo vertical único (cabeçalho, 16px, cartões), o que
 * sobrevive a títulos de outro comprimento.
 */
export const TopicColumn = React.forwardRef<HTMLElement, UaiTopicColumnProps>(
  ({ title, icon, iconNode, children, theme, className = '', ...restProps }, ref) => {
    const classes = ['uai-topic-column', className].filter(Boolean).join(' ');
    const glyph = iconNode ?? (icon ? <Icon name={icon} size={32} /> : null);

    return (
      <section ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        <div className="uai-topic-column__header">
          {glyph && (
            <span className="uai-topic-column__icon" aria-hidden={iconNode ? undefined : 'true'}>
              {glyph}
            </span>
          )}
          <h2 className="uai-topic-column__title">{title}</h2>
        </div>
        {children && <div className="uai-topic-column__items">{children}</div>}
      </section>
    );
  }
);

TopicColumn.displayName = 'TopicColumn';
