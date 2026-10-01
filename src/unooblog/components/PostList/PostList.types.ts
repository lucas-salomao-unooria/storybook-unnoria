import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Disposição da lista de posts.
 * - 'grid': cartões em colunas, que se reduzem pela largura do contêiner
 * - 'list': uma coluna só, para cartões horizontais ou compactos
 */
export type UblPostListLayout = 'grid' | 'list';

/**
 * Propriedades do componente PostList da Unooblog.
 */
export interface UblPostListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /**
   * Disposição da lista.
   * @default 'grid'
   */
  layout?: UblPostListLayout;

  /**
   * Máximo de colunas da grade, no contêiner largo (≥ 960px). No médio
   * (≥ 640px) a grade tem duas colunas; no compacto, uma.
   * @default 3
   */
  columns?: 2 | 3;

  /**
   * Nome da lista para o leitor de tela ("Posts recentes"). Obrigatório.
   */
  ariaLabel: string;

  /**
   * Os cartões de post. Cada filho entra em um `<li>`; fragmentos são
   * achatados, de modo que um `.map()` gera um item por cartão.
   */
  children: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
