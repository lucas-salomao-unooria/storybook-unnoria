import React from 'react';

/**
 * Propriedades da miniatura de vídeo.
 *
 * Reproduz o nó `Media/ThumbnailImage` (`11:997`): 276×155 com a cápsula de
 * duração ancorada a 4px da aresta inferior direita.
 */
export interface UniThumbnailImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Endereço da imagem. Os quadros de vídeo são bitmaps colados nos frames do
   * arquivo e não integram o pacote.
   */
  src?: string;

  /**
   * Texto alternativo da miniatura.
   * @default ''
   */
  alt?: string;

  /**
   * Duração exibida na cápsula. Quando omitida, a cápsula não é renderizada.
   */
  duration?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
