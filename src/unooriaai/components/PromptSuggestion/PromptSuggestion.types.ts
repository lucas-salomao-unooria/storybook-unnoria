import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `PromptSuggestion` do Design System UnooriaAI.
 *
 * Cartão de 280 × 48 que preenche as três colunas da tela vazia — a sugestão
 * de prompt em "Exemplos" e as frases de "Capacidades" e "Limitações".
 */
export interface UaiPromptSuggestionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Texto do cartão.
   */
  children?: React.ReactNode;

  /**
   * Elemento raiz renderizado. Use `'button'` nas colunas acionáveis —
   * "Exemplos" — e mantenha `'div'` nas colunas informativas.
   * @default 'div'
   */
  as?: React.ElementType;

  /** Tipo do botão quando `as` renderiza um `button`. */
  type?: 'button' | 'submit' | 'reset';

  /** Desabilita a interação quando `as` renderiza um `button`. */
  disabled?: boolean;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém os 280px de
   * largura do cartão.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /** Classe CSS adicional. */
  className?: string;
}
