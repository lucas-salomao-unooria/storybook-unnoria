import React from 'react';
import type { GptTheme } from '../../tokens';
import type { GptIconName } from '../Icon';

/**
 * Propriedades do componente `TopicColumn` do Design System ChatGPT.
 *
 * Reproduz o cabeçalho das três colunas da tela `New chat - V1 - A`:
 * `Examples` (ícone `chats`), `Capabilities` (`stars`) e `Limitations`
 * (`shieldWarning`).
 */
export interface GptTopicColumnProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título da coluna, em `Heading/H3`.
   */
  title: React.ReactNode;

  /**
   * Ícone de 32px exibido acima do título. O arquivo usa `chats`, `stars` e
   * `shieldWarning`, nessa ordem.
   */
  icon?: GptIconName;

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
  theme?: GptTheme;

  /** Classe CSS adicional. */
  className?: string;
}
