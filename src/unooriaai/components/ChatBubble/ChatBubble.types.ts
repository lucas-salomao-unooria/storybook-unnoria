import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Papéis do autor da mensagem.
 * - `user`: cápsula translúcida (`--uai-fill-4`) com raio 16, sem avatar
 * - `assistant`: sem cápsula, com avatar de 24px em `--uai-bg-inverse`
 */
export type UaiChatBubbleRole = 'user' | 'assistant';

/**
 * Propriedades do componente `ChatBubble` do Design System UnooriaAI.
 */
export interface UaiChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Papel do autor da mensagem.
   * @default 'user'
   */
  role?: UaiChatBubbleRole;

  /**
   * Iniciais do avatar do assistente.
   * @default 'IA'
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
  theme?: UaiTheme;

  /**
   * Conteúdo da mensagem.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
