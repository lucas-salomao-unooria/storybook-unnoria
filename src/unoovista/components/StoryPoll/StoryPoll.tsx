'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UnvStoryPollProps } from './StoryPoll.types';
import './StoryPoll.css';

/**
 * Componente StoryPoll — Design System Unoovista
 *
 * Figurinha de enquete sobre a mídia de uma história: um cartão flutuante
 * (`background-elevated` com `--unv-elevation-overlay`) com a pergunta e as
 * opções em cápsulas de largura total, um toque por voto. Depois do voto, as
 * opções travam, a votada ganha o preenchimento de ação e um sinal de
 * confirmação (não só a cor), e a confirmação aparece numa região viva — sem
 * contagem, sem porcentagem e sem gabarito: devolve só o `id` escolhido.
 *
 * Cada opção é um botão com `aria-pressed` dentro de um `role="group"` nomeado
 * pela pergunta. Travadas, as opções usam `aria-disabled` (e não `disabled`)
 * para continuarem focáveis: o leitor de tela precisa achar qual foi a escolha.
 *
 * Vai na camada `children` do `StoryViewer`, que deixa o toque passar e o
 * devolve a cada filho direto: a figurinha recebe o toque, a mídia em volta
 * continua avançando e voltando a história.
 */
export const StoryPoll = React.forwardRef<HTMLDivElement, UnvStoryPollProps>(
  (
    {
      question,
      options,
      value,
      onVote,
      disabled = false,
      sentLabel = 'Resposta enviada',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const questionId = React.useId();
    const isControlled = value !== undefined;
    const [internalVote, setInternalVote] = React.useState<string | null>(null);
    const vote = isControlled ? value : internalVote;
    const hasVoted = vote !== null;
    const locked = disabled || hasVoted;

    const handleVote = (id: string) => {
      if (locked) {
        return;
      }
      if (!isControlled) {
        setInternalVote(id);
      }
      onVote?.(id);
    };

    return (
      <div
        ref={ref}
        data-unv-theme={theme}
        className={['unv-story-poll', hasVoted ? 'unv-story-poll--voted' : '', className]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <p id={questionId} className="unv-story-poll__question">
          {question}
        </p>

        <div role="group" aria-labelledby={questionId} className="unv-story-poll__options">
          {options.map((option) => {
            const chosen = vote === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'unv-story-poll__option',
                  chosen ? 'unv-story-poll__option--chosen' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={chosen}
                aria-disabled={locked || undefined}
                onClick={() => handleVote(option.id)}
              >
                <span className="unv-story-poll__label">{option.label}</span>
                <span className="unv-story-poll__mark" aria-hidden="true">
                  {chosen ? <Icon name="check" size={16} tone="inherit" /> : null}
                </span>
              </button>
            );
          })}
        </div>

        <p role="status" className="unv-story-poll__sent">
          {hasVoted ? sentLabel : null}
        </p>
      </div>
    );
  }
);

StoryPoll.displayName = 'StoryPoll';
