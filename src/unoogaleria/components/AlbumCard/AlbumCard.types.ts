import type React from 'react';
import type { UglIconName } from '../Icon';
import type { UglAlbum } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Tamanhos do cartão.
 * - 'md': 160px de largura — prateleiras horizontais ("Meus álbuns")
 * - 'lg': ocupa a largura do contêiner — grades de duas colunas ("Ver tudo")
 */
export type UglAlbumCardSize = 'md' | 'lg';

/**
 * Propriedades do componente AlbumCard da Unoogaleria.
 */
export interface UglAlbumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /**
   * O álbum exibido.
   */
  album: UglAlbum;

  /**
   * Toque no cartão (abrir o álbum). Sem `onClick`, o cartão não é botão.
   */
  onClick?: (album: UglAlbum) => void;

  /**
   * Tamanho.
   * @default 'md'
   */
  size?: UglAlbumCardSize;

  /**
   * Glifo sobre a capa vazia. Álbuns protegidos nunca mostram a capa.
   * @default 'photo' ('lock' em álbum protegido)
   */
  placeholderIcon?: UglIconName;

  /**
   * Menu do álbum (um `IconButton` "Mais" com `aria-haspopup="menu"`), ao lado
   * do título — fora do botão principal, porque botão não aninha botão.
   */
  menu?: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
