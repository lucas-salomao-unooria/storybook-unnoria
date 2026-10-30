import type React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do `TypingIndicator` do UnooriaAI: a fala do assistente que
 * ainda não chegou — o avatar e três pontos no lugar do texto.
 */
export interface UaiTypingIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Iniciais do avatar, como no `ChatBubble` do assistente.
   * @default 'IA'
   */
  avatarInitials?: string;

  /**
   * Nó customizado para o avatar (substitui as iniciais), como no `ChatBubble`.
   */
  avatar?: React.ReactNode;

  /**
   * Nome acessível da região (`role="status"`). É também o texto que aparece
   * ao lado dos pontos com `prefers-reduced-motion: reduce`, quando eles param.
   * @default 'digitando'
   */
  'aria-label'?: string;

  /**
   * Tema aplicado ao componente (`data-uai-theme`).
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
