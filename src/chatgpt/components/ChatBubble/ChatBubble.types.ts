import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Papéis do conjunto `ChatBubble` do Figma (propriedade `Role`).
 * - `user`: cápsula translúcida de 4% com raio 16, sem avatar
 * - `assistant`: sem cápsula, com avatar de 24px em `bg/inverse`
 */
export type GptChatBubbleRole = 'user' | 'assistant';

/**
 * Propriedades do componente `ChatBubble` do Design System ChatGPT.
 */
export interface GptChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Papel do autor da mensagem.
   * @default 'user'
   */
  role?: GptChatBubbleRole;

  /**
   * Iniciais do avatar do assistente. O arquivo usa `AI`.
   * @default 'AI'
   */
  avatarInitials?: string;

  /**
   * Substitui o avatar padrão do assistente por um nó arbitrário.
   */
  avatar?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Conteúdo da mensagem.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
