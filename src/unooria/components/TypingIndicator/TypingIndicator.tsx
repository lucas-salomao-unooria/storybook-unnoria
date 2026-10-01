import React, { forwardRef } from 'react';
import type { TypingIndicatorProps } from './TypingIndicator.types';
import './TypingIndicator.css';

/**
 * TypingIndicator — "o agente está escrevendo" (Plataforma Unooria).
 *
 * Três pontos que pulsam em sequência, dentro de `role="status"` (região viva
 * educada): o leitor de tela anuncia a frase UMA vez, quando o indicador
 * aparece — os pontos são `aria-hidden` e a animação não gera anúncio.
 *
 * Com `prefers-reduced-motion: reduce`, os pontos param e a frase aparece.
 * Server Component.
 */
export const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(
  (
    {
      label = 'O agente de IA do professor está escrevendo',
      showLabel = false,
      theme = 'light',
      className = '',
      ...rest
    },
    ref
  ) => {
    const classes = [
      'unooria-typing-indicator',
      showLabel ? 'unooria-typing-indicator--with-label' : '',
      theme === 'dark' ? 'unooria-typing-indicator--theme-dark' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div {...rest} ref={ref} role="status" className={classes}>
        <span className="unooria-typing-indicator__dots" aria-hidden="true">
          <span className="unooria-typing-indicator__dot" />
          <span className="unooria-typing-indicator__dot" />
          <span className="unooria-typing-indicator__dot" />
        </span>
        <span className="unooria-typing-indicator__label">{label}</span>
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';

export default TypingIndicator;
