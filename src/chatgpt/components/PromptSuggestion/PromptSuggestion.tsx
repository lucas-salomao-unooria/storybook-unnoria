import React from 'react';
import type { GptPromptSuggestionProps } from './PromptSuggestion.types';
import './PromptSuggestion.css';

/**
 * Componente PromptSuggestion — Design System ChatGPT
 *
 * Cartão de 280 × 48 com padding 4/8, raio 8 e texto Inter Regular de 14/20,
 * medido nas duas versões do quadro `New chat - V1 - A`: superfície
 * `color/gray/50` no tema claro e branco a 4% no escuro.
 *
 * O arquivo usa o mesmo cartão nas três colunas — acionável em `Examples`,
 * informativo em `Capabilities` e `Limitations` —, e é por isso que o elemento
 * raiz é escolhido por `as` em vez de fixado.
 */
export const PromptSuggestion = React.forwardRef<HTMLDivElement, GptPromptSuggestionProps>(
  (
    { children, as: Component = 'div', block = false, theme, className = '', ...restProps },
    ref
  ) => {
    const classes = [
      'gpt-prompt-suggestion',
      block ? 'gpt-prompt-suggestion--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        {children}
      </Component>
    );
  }
);

PromptSuggestion.displayName = 'PromptSuggestion';
