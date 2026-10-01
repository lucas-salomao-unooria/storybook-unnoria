import type React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do `RichContent`, a tipografia do conteúdo já renderizado.
 *
 * O componente NÃO converte markdown e NÃO recebe HTML em texto: recebe os
 * elementos prontos em `children` (no hub, a saída do react-markdown) e só dá a
 * eles a tipografia da Plataforma Unooria.
 */
export interface RichContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** O conteúdo já renderizado: `h1`–`h4`, `p`, listas, `blockquote`, `code`, `pre`, tabelas, `hr`, links. */
  children?: React.ReactNode;

  /**
   * Elemento da raiz.
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article';

  /**
   * Tema visual.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}

/**
 * Propriedades do `RichContentTable`: a `<table>` dentro de uma faixa de
 * rolagem horizontal do `ScrollBar`. Feito para ser o componente de tabela do
 * react-markdown (`components={{ table: RichContentTable }}`), por isso aceita
 * e descarta o `node` que ele repassa.
 */
export interface RichContentTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** O nó da árvore que o react-markdown repassa. Descartado — não vai ao DOM. */
  node?: unknown;

  /**
   * Nome da faixa de rolagem (que é focável, para rolar pelo teclado).
   * @default 'Tabela'
   */
  scrollLabel?: string;
}
