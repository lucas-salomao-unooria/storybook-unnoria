import React from 'react';
import type { GptTopicColumnProps } from './TopicColumn.types';
import { Icon } from '../Icon';
import './TopicColumn.css';

/**
 * Componente TopicColumn — Design System ChatGPT
 *
 * Réplica de uma das três colunas da tela `New chat - V1 - A`: ícone de 32px,
 * título `Heading/H3` (Inter Semi Bold 18/28) com 8px de intervalo, e abaixo a
 * pilha de cartões.
 *
 * No arquivo o cabeçalho ocupa 280 × 84 e os cartões são posicionados 100px
 * abaixo do topo da grade. Aqui a coluna é um fluxo vertical único, o que
 * preserva os intervalos medidos e sobrevive a títulos de outro comprimento.
 */
export const TopicColumn = React.forwardRef<HTMLElement, GptTopicColumnProps>(
  ({ title, icon, iconNode, children, theme, className = '', ...restProps }, ref) => {
    const classes = ['gpt-topic-column', className].filter(Boolean).join(' ');
    const glyph = iconNode ?? (icon ? <Icon name={icon} size={32} /> : null);

    return (
      <section ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        <div className="gpt-topic-column__header">
          {glyph && (
            <span className="gpt-topic-column__icon" aria-hidden={iconNode ? undefined : 'true'}>
              {glyph}
            </span>
          )}
          <h2 className="gpt-topic-column__title">{title}</h2>
        </div>
        {children && <div className="gpt-topic-column__items">{children}</div>}
      </section>
    );
  }
);

TopicColumn.displayName = 'TopicColumn';
