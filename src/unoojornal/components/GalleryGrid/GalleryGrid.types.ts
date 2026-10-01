import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente GalleryGrid da Unoojornal.
 */
export interface UjnGalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Colunas no contêiner largo (≥ 960px). No médio (≥ 640px) a grade tem duas
   * colunas; no compacto, duas a partir de 400px e uma abaixo disso.
   * @default 4
   */
  columns?: 2 | 3 | 4;

  /**
   * As imagens: um `GalleryImage` por célula.
   */
  children: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
