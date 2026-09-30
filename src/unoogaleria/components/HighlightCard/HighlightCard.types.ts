import type React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Alturas do cartão.
 * - 'md': 220px — Meses e Anos da biblioteca
 * - 'lg': 320px — a memória em destaque de "Para você"
 */
export type UglHighlightCardSize = 'md' | 'lg';

/**
 * Uma capa extra do mosaico.
 */
export interface UglHighlightCardTile {
  /** Imagem */
  src: string;
  /** Texto alternativo */
  alt: string;
}

/**
 * Propriedades do componente HighlightCard da Unoogaleria.
 */
export interface UglHighlightCardProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title' | 'children'> {
  /**
   * Imagem de capa.
   */
  coverSrc: string;

  /**
   * Texto alternativo da capa. Com `onClick`, o cartão é um botão nomeado pelo
   * texto sobre a capa, e a imagem passa a decorativa.
   */
  coverAlt: string;

  /**
   * Título sobre a capa ("Viagem à Chapada", "Setembro").
   */
  title: string;

  /**
   * Linha sob o título ("12 a 15 de setembro").
   */
  subtitle?: string;

  /**
   * Linha acima do título ("Memória", "Há um ano").
   */
  eyebrow?: string;

  /**
   * Contagem já formatada, na cápsula do canto superior direito ("42 fotos").
   */
  count?: string;

  /**
   * Altura.
   * @default 'md'
   */
  size?: UglHighlightCardSize;

  /**
   * Até três capas extras, empilhadas à direita da principal.
   */
  mosaic?: UglHighlightCardTile[];

  /**
   * Toque no cartão. Sem `onClick`, o cartão é uma figura, não um botão.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
