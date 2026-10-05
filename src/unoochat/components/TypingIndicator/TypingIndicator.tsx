import React from 'react';
import type { UncTypingIndicatorProps } from './TypingIndicator.types';
import '../MessageBubble/MessageBubble.css';
import './TypingIndicator.css';

/**
 * Componente TypingIndicator — Design System Unoochat
 *
 * O balão de mensagem recebida (as classes e os tokens do `MessageBubble`
 * `direction="in"`) com três pontos que pulsam em sequência: "digitando…".
 * Com `sender`, o nome aparece no topo, como no balão de grupo, e
 * `senderTone` lhe dá o mesmo tom que a pessoa tem nas mensagens dela.
 *
 * É uma região viva educada (`role="status"`): os pontos são `aria-hidden` e o
 * leitor de tela lê o nome e a frase do `aria-label` ("digitando"). Com
 * `prefers-reduced-motion: reduce`, os pontos param e a frase aparece.
 * Server Component.
 */
export const TypingIndicator = React.forwardRef<HTMLDivElement, UncTypingIndicatorProps>(
  (
    {
      sender,
      senderTone,
      tail = true,
      'aria-label': ariaLabel = 'digitando',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = [
      'unc-messagebubble',
      'unc-messagebubble--in',
      'unc-typingindicator',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...restProps} ref={ref} role="status" aria-label={ariaLabel} className={classes}>
        {sender && (
          <span
            className={[
              'unc-messagebubble__sender',
              senderTone ? `unc-messagebubble__sender--tone-${senderTone}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {sender}
          </span>
        )}

        <span className="unc-typingindicator__body">
          <span className="unc-typingindicator__dots" aria-hidden="true">
            <span className="unc-typingindicator__dot" />
            <span className="unc-typingindicator__dot" />
            <span className="unc-typingindicator__dot" />
          </span>
          <span className="unc-typingindicator__label">{ariaLabel}</span>
        </span>

        {tail && <span className="unc-messagebubble__tail" />}
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';
