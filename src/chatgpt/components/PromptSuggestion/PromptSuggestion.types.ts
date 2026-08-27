import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `PromptSuggestion` do Design System ChatGPT.
 *
 * Reproduz o cartão de 280 × 48 que preenche as três colunas da tela
 * `New chat - V1 - A` — a sugestão de prompt em `Examples` e as frases de
 * `Capabilities` e `Limitations`.
 */
export interface GptPromptSuggestionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Texto do cartão.
   */
  children?: React.ReactNode;

  /**
   * Elemento raiz renderizado. Use `'button'` nas colunas acionáveis —
   * `Examples`, no arquivo — e mantenha `'div'` nas colunas informativas.
   * @default 'div'
   */
  as?: React.ElementType;

  /** Tipo do botão quando `as` renderiza um `button`. */
  type?: 'button' | 'submit' | 'reset';

  /** Desabilita a interação quando `as` renderiza um `button`. */
  disabled?: boolean;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém os 280px do
   * arquivo de design.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /** Classe CSS adicional. */
  className?: string;
}
