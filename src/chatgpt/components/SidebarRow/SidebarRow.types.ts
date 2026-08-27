import React from 'react';
import type { GptTheme } from '../../tokens';
import type { GptIconName } from '../Icon';

/**
 * Propriedades do componente `SidebarRow` do Design System ChatGPT.
 *
 * Reproduz a instância `Frame` (`State=Default, Vertical=False`) da barra
 * lateral da tela `New chat - V1 - A` — a linha de 242 × 48 usada tanto pelo
 * histórico de conversas quanto pelo rodapé de ações.
 */
export interface GptSidebarRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Ícone de 24px à esquerda do rótulo. O arquivo usa `chatText` no
   * histórico e `trash`, `sun`, `user`, `arrowSquareOut` e `signOut` no
   * rodapé.
   */
  icon?: GptIconName;

  /**
   * Substitui o ícone do registro por um nó arbitrário.
   */
  iconNode?: React.ReactNode;

  /**
   * Marca a linha como a conversa aberta. O arquivo não publica este estado;
   * ver o registro de desvios da estória.
   * @default false
   */
  active?: boolean;

  /**
   * Elemento raiz renderizado — permite usar a linha como âncora.
   * @default 'button'
   */
  as?: React.ElementType;

  /** URL de destino quando `as` renderiza uma âncora. */
  href?: string;

  /** Alvo de navegação quando `as` renderiza uma âncora. */
  target?: React.HTMLAttributeAnchorTarget;

  /** Relação do link quando `as` renderiza uma âncora. */
  rel?: string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /** Rótulo da linha. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
