'use client';

import React from 'react';
import { Icon } from '../Icon';
import { Radio } from '../Radio';
import type { UncPollProps } from './Poll.types';
import './Poll.css';

/**
 * Componente Poll — Design System Unoochat
 *
 * Enquete da conversa: pergunta, opções de escolha única e o botão de votar,
 * separado por um divisor como a ação de um diálogo. Depois do voto, as opções
 * congelam e o botão vira a confirmação — sem contagem de votos: quem votou não
 * vê o que os outros escolheram.
 */
export const Poll = React.forwardRef<HTMLDivElement, UncPollProps>(
  (
    {
      question,
      hint,
      options,
      value = null,
      onChange,
      onVote,
      voted = false,
      voteLabel = 'Votar',
      votedLabel = 'Voto enviado',
      disabled = false,
      name,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const generatedName = React.useId();
    const questionId = React.useId();
    const groupName = name ?? generatedName;
    const frozen = disabled || voted;

    return (
      <div
        ref={ref}
        className={['unc-poll', voted ? 'unc-poll--voted' : '', className].filter(Boolean).join(' ')}
        {...restProps}
      >
        <p id={questionId} className="unc-poll__question">
          {question}
        </p>
        {hint && <p className="unc-poll__hint">{hint}</p>}

        <div role="radiogroup" aria-labelledby={questionId} className="unc-poll__options">
          {options.map((option) => (
            <Radio
              key={option.id}
              name={groupName}
              value={option.id}
              label={option.label}
              checked={value === option.id}
              disabled={frozen}
              onChange={() => onChange?.(option.id)}
              className="unc-poll__option"
            />
          ))}
        </div>

        {voted ? (
          <p className="unc-poll__voted">
            <Icon name="tick" size={13} tone="inherit" aria-hidden="true" />
            {votedLabel}
          </p>
        ) : (
          <button
            type="button"
            className="unc-poll__vote"
            onClick={onVote}
            disabled={disabled || !value}
          >
            {voteLabel}
          </button>
        )}
      </div>
    );
  }
);

Poll.displayName = 'Poll';
