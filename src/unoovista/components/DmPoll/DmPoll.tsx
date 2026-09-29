'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UnvDmPollProps } from './DmPoll.types';
import './DmPoll.css';

/**
 * Componente DmPoll — Design System Unoovista
 *
 * Enquete dentro da conversa: cartão com a pergunta e as opções em botões de
 * largura total, um toque por voto. Depois do voto, as opções travam, a votada
 * ganha o preenchimento de ação e um sinal de confirmação (não só a cor), e a
 * confirmação aparece numa região viva — sem contagem, sem porcentagem e sem
 * gabarito: a enquete devolve só o `id` escolhido.
 *
 * Cada opção é um botão com `aria-pressed` dentro de um `role="group"` nomeado
 * pela pergunta. Travadas, as opções usam `aria-disabled` (e não `disabled`)
 * para continuarem focáveis: o leitor de tela precisa achar qual foi a escolha.
 */
export const DmPoll = React.forwardRef<HTMLDivElement, UnvDmPollProps>(
  (
    {
      question,
      options,
      value,
      onVote,
      disabled = false,
      sentLabel = 'Resposta enviada ✓',
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
        className={['unv-dm-poll', hasVoted ? 'unv-dm-poll--voted' : '', className]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <p id={questionId} className="unv-dm-poll__question">
          {question}
        </p>

        <div role="group" aria-labelledby={questionId} className="unv-dm-poll__options">
          {options.map((option) => {
            const chosen = vote === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={[
                  'unv-dm-poll__option',
                  chosen ? 'unv-dm-poll__option--chosen' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={chosen}
                aria-disabled={locked || undefined}
                onClick={() => handleVote(option.id)}
              >
                <span className="unv-dm-poll__mark" aria-hidden="true">
                  {chosen ? <Icon name="check" size={16} tone="inherit" /> : null}
                </span>
                <span className="unv-dm-poll__label">{option.label}</span>
              </button>
            );
          })}
        </div>

        <p role="status" className="unv-dm-poll__sent">
          {hasVoted ? sentLabel : null}
        </p>
      </div>
    );
  }
);

DmPoll.displayName = 'DmPoll';
