import React from 'react';
import type { UaiTheme } from '../../tokens';
import type { UaiIconName } from '../Icon';

/**
 * Propriedades do componente `SidebarRow` do Design System UnooriaAI.
 *
 * Linha de 242 × 48 da barra lateral do cliente web, usada tanto pelo
 * histórico de conversas quanto pelo rodapé de ações.
 */
export interface UaiSidebarRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Ícone de 24px à esquerda do rótulo. O histórico usa `chatText` e o
   * rodapé, `trash`, `sun`, `user`, `arrowSquareOut` e `signOut`.
   */
  icon?: UaiIconName;

  /**
   * Substitui o ícone do registro por um nó arbitrário.
   */
  iconNode?: React.ReactNode;

  /**
   * Marca a linha como a conversa aberta: aplica o realce `--uai-fill-8` e
   * `aria-current="page"`.
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
  theme?: UaiTheme;

  /** Rótulo da linha. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}
