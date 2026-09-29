import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do contêiner `WebSidebar` do Design System UnooriaAI.
 *
 * Coluna de 282px sem preenchimento, separada da conversa por um fio de 1px,
 * com as seções distribuídas entre o topo e a base.
 */
export interface UaiWebSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Altura da coluna. O padrão é 1024px; use `'100%'` para ocupar a altura do
   * contêiner da aplicação.
   * @default 1024
   */
  height?: number | string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /** Conteúdo — normalmente duas `WebSidebar.Section`. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades da seção `WebSidebar.Section`.
 */
export interface UaiWebSidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Desenha o fio de 1px no topo da seção. Use-o apenas na seção de rodapé.
   * @default false
   */
  bordered?: boolean;
}

/**
 * Propriedades do botão `WebSidebar.NewChat`.
 */
export interface UaiWebSidebarNewChatProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Substitui o ícone `add` de 16px por um nó arbitrário.
   */
  iconNode?: React.ReactNode;
}
