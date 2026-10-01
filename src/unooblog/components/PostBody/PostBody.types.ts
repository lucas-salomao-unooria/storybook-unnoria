import type React from 'react';
import type { UblBlock, UblTextSize } from '../../content';
import type { UblTheme } from '../../tokens';

/**
 * Tamanho do texto do post.
 * - 'sm': corpo 16px / 24px (`body-lg`)
 * - 'md': corpo 18px / 28px (`prose`) — o padrão
 * - 'lg': corpo 20px / 30px (`lead`)
 */
export type UblPostBodyTextSize = UblTextSize;

/**
 * Propriedades do componente PostBody da Unooblog.
 */
export interface UblPostBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blocos do post, na ordem. Cada tipo vira o componente correspondente:
   * `paragraph` → `<p>`, `heading` → `<h2>`/`<h3>` com `id` e âncora,
   * `quote` → `Blockquote`, `code` → `CodeBlock`, `callout` → `Callout`,
   * `figure` → `Figure`, `list` → `<ul>`/`<ol>`.
   */
  blocks?: UblBlock[];

  /**
   * Conteúdo livre, renderizado depois dos blocos (ou no lugar deles):
   * parágrafos, subtítulos, listas, links e os componentes `Figure`,
   * `Blockquote`, `Callout` e `CodeBlock`.
   */
  children?: React.ReactNode;

  /**
   * Tamanho do texto corrido. Subtítulos e listas acompanham.
   * @default 'md'
   */
  textSize?: UblPostBodyTextSize;

  /**
   * Mostra a numeração nas linhas dos blocos de código.
   * @default false
   */
  codeLineNumbers?: boolean;

  /**
   * Prefixo do nome acessível da âncora dos subtítulos. O nome final é
   * "<prefixo> <texto do subtítulo>".
   * @default 'Link para a seção'
   */
  anchorLabel?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
