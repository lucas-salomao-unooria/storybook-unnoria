import React from 'react';
import type { UaiPromptSuggestionProps } from './PromptSuggestion.types';
import './PromptSuggestion.css';

/**
 * Componente PromptSuggestion — Design System UnooriaAI
 *
 * Cartão de 280 × 48 com padding 4/8, raio 8 e texto Open Sans de 14/20, sobre
 * a superfície `--uai-web-suggestion` de cada tema.
 *
 * O mesmo cartão serve às três colunas da tela vazia — acionável em "Exemplos",
 * informativo em "Capacidades" e "Limitações" —, e é por isso que o elemento
 * raiz é escolhido por `as` em vez de fixado.
 */
export const PromptSuggestion = React.forwardRef<HTMLDivElement, UaiPromptSuggestionProps>(
  (
    { children, as: Component = 'div', block = false, theme, className = '', ...restProps },
    ref
  ) => {
    const classes = [
      'uai-prompt-suggestion',
      block ? 'uai-prompt-suggestion--block' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        {children}
      </Component>
    );
  }
);

PromptSuggestion.displayName = 'PromptSuggestion';
