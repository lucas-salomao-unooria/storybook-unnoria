import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do contêiner `WebSidebar` do Design System ChatGPT.
 *
 * Reproduz a instância `AIChatSidebar` (`Property=B`) da tela
 * `New chat - V1 - A`: coluna de 282px sem preenchimento, separada da conversa
 * por um fio de 1px, com as seções distribuídas entre o topo e a base.
 */
export interface GptWebSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Altura da coluna. O arquivo publica 1024px; use `'100%'` para ocupar a
   * altura do contêiner da aplicação.
   * @default 1024
   */
  height?: number | string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /** Conteúdo — normalmente duas `WebSidebar.Section`. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades da seção `WebSidebar.Section`.
 */
export interface GptWebSidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Desenha o fio de 1px no topo da seção. O arquivo o aplica apenas à seção
   * de rodapé.
   * @default false
   */
  bordered?: boolean;
}

/**
 * Propriedades do botão `WebSidebar.NewChat`.
 */
export interface GptWebSidebarNewChatProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Substitui o ícone `add` de 16px por um nó arbitrário.
   */
  iconNode?: React.ReactNode;
}
