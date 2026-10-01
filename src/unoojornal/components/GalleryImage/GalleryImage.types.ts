import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Proporção da imagem.
 * - '3:2': paisagem padrão da galeria
 * - '4:5': retrato
 * - '1:1': quadrada
 */
export type UjnGalleryImageAspectRatio = '3:2' | '4:5' | '1:1';

/**
 * Propriedades do componente GalleryImage da Unoojornal.
 */
export interface UjnGalleryImageProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Endereço da imagem (informado por prop, nunca embutido no pacote).
   */
  src: string;

  /**
   * Descrição da imagem para leitores de tela. Também é o nome do botão ou do
   * link quando a imagem abre algo.
   */
  alt: string;

  /**
   * Legenda visível, no `<figcaption>`.
   */
  caption: React.ReactNode;

  /**
   * Crédito da fotografia ("Foto: Equipe de imagem").
   */
  credit?: string;

  /**
   * Proporção da imagem.
   * @default '3:2'
   */
  aspectRatio?: UjnGalleryImageAspectRatio;

  /**
   * Endereço de destino. Com `href`, a imagem é um `<a>`.
   */
  href?: string;

  /**
   * Abrir a imagem (ampliar, por exemplo). Sem `href`, a imagem é um
   * `<button>` que chama esta função; com `href`, ela é chamada no clique.
   */
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
