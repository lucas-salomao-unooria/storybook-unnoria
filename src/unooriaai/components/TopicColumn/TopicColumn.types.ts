import React from 'react';
import type { UaiTheme } from '../../tokens';
import type { UaiIconName } from '../Icon';

/**
 * Propriedades do componente `TopicColumn` do Design System UnooriaAI.
 *
 * Cabeçalho e pilha de cartões das três colunas da tela vazia: "Exemplos"
 * (ícone `chats`), "Capacidades" (`stars`) e "Limitações" (`shieldWarning`).
 */
export interface UaiTopicColumnProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título da coluna, no degrau `heading-h3`.
   */
  title: React.ReactNode;

  /**
   * Ícone de 32px exibido acima do título. As três colunas usam `chats`,
   * `stars` e `shieldWarning`, nessa ordem.
   */
  icon?: UaiIconName;

  /**
   * Substitui o ícone do registro por um nó arbitrário.
   */
  iconNode?: React.ReactNode;

  /**
   * Cartões da coluna — normalmente três `PromptSuggestion`.
   */
  children?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /** Classe CSS adicional. */
  className?: string;
}
