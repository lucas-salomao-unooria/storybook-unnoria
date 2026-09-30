import React from 'react';
import type { UglTheme } from '../../tokens';
import type { UglAlbum, UglMediaItem, UglPerson } from '../../media';

/**
 * Variante visual do painel.
 * - 'default': texto do tema, para a folha comum
 * - 'immersive': texto claro invariante, para a folha imersiva do visualizador
 */
export type UglInfoPanelVariant = 'default' | 'immersive';

/**
 * Propriedades do componente InfoPanel da Unoogaleria.
 */
export interface UglInfoPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Mídia descrita pelo painel.
   */
  item: UglMediaItem;

  /**
   * Pessoas conhecidas. O painel mostra as de `item.people`, na ordem da mídia;
   * identificadores sem pessoa correspondente são ignorados.
   */
  people?: UglPerson[];

  /**
   * Álbuns conhecidos. O painel mostra os de `item.albumIds`.
   */
  albums?: UglAlbum[];

  /**
   * Legenda editada. Com ela, a legenda vira campo ("Adicionar uma legenda…"),
   * não controlado a partir de `item.description`, salvo no blur e no Enter —
   * e só quando o texto mudou. Sem ela, a legenda é só leitura.
   */
  onDescriptionChange?: (text: string) => void;

  /**
   * Toque no cartão do lugar. Sem ela, o cartão é só leitura.
   */
  onLocation?: (item: UglMediaItem) => void;

  /**
   * Fuso de leitura da data e da hora.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Texto de apoio do campo de legenda vazio.
   * @default 'Adicionar uma legenda…'
   */
  descriptionPlaceholder?: string;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglInfoPanelVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
