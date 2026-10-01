'use client';

import React from 'react';
import { TopicChip } from '../TopicChip';
import type { UblTopicCloudProps } from './TopicCloud.types';
import './TopicCloud.css';

/**
 * Componente TopicCloud — Design System Unooblog
 *
 * Nuvem de tópicos: uma `<section>` nomeada (pelo título visível ou por
 * `ariaLabel`) com os `TopicChip` em fluxo, quebrando de linha conforme a
 * largura. O chip selecionado liga `aria-pressed` e mostra a contagem de posts
 * quando ela é informada. A lista é uma `<ul>`, de modo que o leitor de tela
 * anuncia a quantidade de tópicos.
 *
 * Marcado como Client Component porque repassa funções aos chips.
 */
export const TopicCloud = React.forwardRef<HTMLElement, UblTopicCloudProps>(
  (
    {
      topics,
      selectedId,
      onSelect,
      title,
      ariaLabel = 'Tópicos',
      headingLevel = 2,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const titleId = React.useId();
    const Heading = `h${headingLevel}` as 'h2' | 'h3';
    const classes = ['ubl-topic-cloud', className].filter(Boolean).join(' ');

    return (
      <section
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        {...restProps}
      >
        {title && (
          <Heading id={titleId} className="ubl-topic-cloud__title">
            {title}
          </Heading>
        )}
        <ul className="ubl-topic-cloud__list">
          {topics.map((topic) => (
            <li key={topic.id} className="ubl-topic-cloud__item">
              <TopicChip
                selected={topic.id === selectedId}
                count={topic.count}
                onClick={() => onSelect?.(topic.id)}
              >
                {topic.label}
              </TopicChip>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

TopicCloud.displayName = 'TopicCloud';
