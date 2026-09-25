'use client';

import React from 'react';
import type { InstaDmPollProps } from './DmPoll.types';
import './DmPoll.css';

/**
 * Componente DmPoll — Design System Instanooria
 *
 * Enquete dentro da DM, como no app real: cartão com a pergunta e as opções em
 * pílulas, um toque por voto. Depois do voto, as opções travam e a confirmação
 * aparece numa região viva — sem contagem, sem porcentagem e sem gabarito: a
 * enquete devolve só o `id` escolhido.
 *
 * Cada opção é um botão com `aria-pressed` dentro de um `role="group"` nomeado
 * pela pergunta. Travadas, as opções usam `aria-disabled` (e não `disabled`)
 * para continuarem focáveis: o leitor de tela precisa achar qual foi a escolha.
 */
export const DmPoll = React.forwardRef<HTMLDivElement, InstaDmPollProps>(
  (
    {
      question,
      options,
      value,
      onVote,
      disabled = false,
      sentLabel = 'Resposta enviada ✓',
      theme = 'light',
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
        data-insta-theme={theme}
        className={['insta-dm-poll', hasVoted ? 'insta-dm-poll--voted' : '', className]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <p id={questionId} className="insta-dm-poll__question">
          {question}
        </p>

        <div role="group" aria-labelledby={questionId} className="insta-dm-poll__options">
          {options.map((option) => {
            const chosen = vote === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'insta-dm-poll__option',
                  chosen ? 'insta-dm-poll__option--chosen' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={chosen}
                aria-disabled={locked || undefined}
                onClick={() => handleVote(option.id)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <p role="status" className="insta-dm-poll__sent">
          {hasVoted ? sentLabel : null}
        </p>
      </div>
    );
  }
);

DmPoll.displayName = 'DmPoll';
