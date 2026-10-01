import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Tamanho do texto da matéria.
 * - 'sm': corpo 16px / 24px (`body-md`)
 * - 'md': corpo 18px / 28px (`body-lg`) — o padrão
 * - 'lg': corpo 20px / 30px (`title-md`, no peso regular)
 */
export type UjnArticleBodyTextSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente ArticleBody da Unoojornal.
 */
export interface UjnArticleBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conteúdo da matéria: parágrafos (`<p>`), subtítulos (`<h2>`, `<h3>`),
   * listas (`<ul>`, `<ol>`), links (`<a>`) e os componentes `Figure`,
   * `PullQuote` e `CorrectionNote`.
   */
  children?: React.ReactNode;

  /**
   * Tamanho do texto corrido. Subtítulos e listas acompanham.
   * @default 'md'
   */
  textSize?: UjnArticleBodyTextSize;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
