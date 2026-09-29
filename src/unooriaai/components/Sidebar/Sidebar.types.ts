import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do contêiner `Sidebar` do Design System UnooriaAI.
 */
export interface UaiSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Altura da barra. O padrão é 800px; use `'100%'` para ocupar a altura do
   * contêiner da aplicação.
   * @default 800
   */
  height?: number | string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Conteúdo da barra — normalmente composto com os subcomponentes.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do botão `Sidebar.NewChatButton`.
 */
export interface UaiSidebarNewChatButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Glifo renderizado antes do rótulo. O padrão é o ícone `add` da biblioteca
   * da Plataforma Unooria, em 16px (`<Icon name="add" size={16} />`).
   */
  glyph?: React.ReactNode;
}

/**
 * Propriedades do rótulo de seção `Sidebar.SectionLabel`.
 */
export type UaiSidebarSectionLabelProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Propriedades do item de rodapé `Sidebar.FooterItem`.
 */
export interface UaiSidebarFooterItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Elemento raiz renderizado — permite usar o item como âncora.
   * @default 'button'
   */
  as?: React.ElementType;

  /**
   * URL de destino quando `as` renderiza uma âncora.
   */
  href?: string;

  /**
   * Alvo de navegação quando `as` renderiza uma âncora.
   */
  target?: React.HTMLAttributeAnchorTarget;

  /**
   * Relação do link quando `as` renderiza uma âncora.
   */
  rel?: string;
}
