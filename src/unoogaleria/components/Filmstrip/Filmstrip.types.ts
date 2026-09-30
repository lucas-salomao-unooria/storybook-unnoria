import React from 'react';
import type { UglMediaItem } from '../../media';
import type { UglTheme } from '../../tokens';

/**
 * Propriedades do componente Filmstrip da Unoogaleria.
 */
export interface UglFilmstripProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  /**
   * Mídias da tira, na mesma ordem do visualizador.
   */
  items: UglMediaItem[];

  /**
   * Índice da mídia aberta. A miniatura ativa fica mais larga, com contorno de
   * acento, e é centralizada na tira.
   */
  activeIndex: number;

  /**
   * Pedido de abrir outra mídia (toque, clique ou setas). A tira não guarda o
   * índice: quem decide é o visualizador.
   */
  onSelect: (index: number) => void;

  /**
   * Nome acessível da tira.
   * @default 'Miniaturas'
   */
  ariaLabel?: string;

  /**
   * Fuso de leitura das datas no nome acessível de cada miniatura.
   * @default 'America/Sao_Paulo'
   */
  timeZone?: string;

  /**
   * Força o tema visual. A tira é imersiva e invariante.
   */
  theme?: UglTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
