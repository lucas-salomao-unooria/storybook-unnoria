'use client';

import React from 'react';
import type { UaiChoicePollProps } from './ChoicePoll.types';
import './ChoicePoll.css';

/** Teclas que movem o foco entre as opções, como num grupo de rádios nativo. */
const PROXIMA = new Set(['ArrowDown', 'ArrowRight']);
const ANTERIOR = new Set(['ArrowUp', 'ArrowLeft']);

/**
 * Componente ChoicePoll — Design System UnooriaAI
 *
 * Enquete de escolha única: cartão com a pergunta e as opções em linhas de
 * largura total, que quebram em duas ou três linhas sem perder o alvo de
 * toque. Um toque (ou Enter/Espaço) vota. Depois do voto, as opções travam, a
 * votada ganha a superfície invertida e o ponto do rádio (não só a cor), e a
 * confirmação aparece numa região viva — sem contagem, sem porcentagem e sem
 * gabarito: a enquete devolve só o `id` escolhido.
 *
 * Semântica de grupo de rádios: `role="radiogroup"` nomeado pela pergunta e
 * cada opção com `role="radio"` e `aria-checked`. O foco é itinerante (um só
 * ponto de parada no Tab; as setas, Home e End movem entre as opções). Como o
 * voto é definitivo, as setas **só movem o foco** — quem vota é o toque, o
 * Enter ou o Espaço. Travadas, as opções usam `aria-disabled` (e não
 * `disabled`) para continuarem focáveis: o leitor de tela precisa achar qual
 * foi a escolha.
 */
export const ChoicePoll = React.forwardRef<HTMLDivElement, UaiChoicePollProps>(
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

    const optionRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const chosenIndex = options.findIndex((option) => option.id === vote);
    const lastIndex = options.length - 1;
    const tabStop =
      activeIndex !== null && activeIndex <= lastIndex
        ? activeIndex
        : chosenIndex >= 0
          ? chosenIndex
          : 0;

    const handleVote = (id: string, index: number) => {
      setActiveIndex(index);
      if (locked) {
        return;
      }
      if (!isControlled) {
        setInternalVote(id);
      }
      onVote?.(id);
    };

    const moveFocus = (index: number) => {
      setActiveIndex(index);
      optionRefs.current[index]?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (lastIndex < 0) {
        return;
      }
      if (PROXIMA.has(event.key)) {
        event.preventDefault();
        moveFocus(index === lastIndex ? 0 : index + 1);
      } else if (ANTERIOR.has(event.key)) {
        event.preventDefault();
        moveFocus(index === 0 ? lastIndex : index - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        moveFocus(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        moveFocus(lastIndex);
      }
    };

    return (
      <div
        ref={ref}
        data-uai-theme={theme}
        className={[
          'uai-choice-poll',
          hasVoted ? 'uai-choice-poll--voted' : '',
          locked ? 'uai-choice-poll--locked' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...restProps}
      >
        <div id={questionId} className="uai-choice-poll__question">
          {question}
        </div>

        <div role="radiogroup" aria-labelledby={questionId} className="uai-choice-poll__options">
          {options.map((option, index) => {
            const chosen = vote === option.id;

            return (
              <button
                key={option.id}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="radio"
                className={[
                  'uai-choice-poll__option',
                  chosen ? 'uai-choice-poll__option--chosen' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-checked={chosen}
                aria-disabled={locked || undefined}
                tabIndex={index === tabStop ? 0 : -1}
                onClick={() => handleVote(option.id, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="uai-choice-poll__mark" aria-hidden="true" />
                <span className="uai-choice-poll__label">{option.label}</span>
              </button>
            );
          })}
        </div>

        <p role="status" className="uai-choice-poll__sent">
          {hasVoted ? sentLabel : null}
        </p>
      </div>
    );
  }
);

ChoicePoll.displayName = 'ChoicePoll';
