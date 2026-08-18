import React from 'react';
import {
  UnooriaIconSizeKey,
  UnooriaIconStrokeWeightKey,
} from '../../tokens/icons';

export type UnooriaIconSize =
  | '4xs'
  | '3xs'
  | 'xxs'
  | 'xs'
  | 's'
  | 'm'
  | 'l'
  | 'xl'
  | UnooriaIconSizeKey
  | number;

export type UnooriaIconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700;

export type UnooriaCustomIconName =
  | 'aprendizagem-nacional'
  | 'aprendizagem nacional'
  | 'Aprendizagem Nacional'
  | 'estante-virtual'
  | 'estante virtual'
  | 'Estante Virtual'
  | 'futuro-digital'
  | 'futuro digital'
  | 'Futuro Digital'
  | 'mundo-senai'
  | 'mundo senai'
  | 'Mundo Senai'
  | 'senai-play'
  | 'senai play'
  | 'Senai Play';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Nome do ícone no Material Symbols Rounded ou nome do ícone customizado do SENAI.
   * Exemplos: "search", "home", "settings", "mundo-senai", "terminal", etc.
   */
  name: string;

  /**
   * Tamanho do ícone baseado na escala oficial de tokens do Unooria.
   * Pode ser uma chave de token ('4xs', '3xs', 'xxs', 'xs', 's', 'm', 'l', 'xl') ou valor numérico em pixels.
   * @default 's' (24px)
   */
  size?: UnooriaIconSize;

  /**
   * Espessura da linha do ícone (font weight).
   * Padrão oficial do Unooria DS: 300 (Light).
   * @default 300
   */
  weight?: UnooriaIconWeight;

  /**
   * Define se o ícone deve ser preenchido (Fill = 1) ou apenas contorno (Fill = 0).
   * Padrão oficial do Unooria DS: false (0 - Off).
   * @default false
   */
  fill?: boolean | 0 | 1;

  /**
   * Ajuste de graduação / contraste (Grade).
   * @default 0
   */
  grade?: -25 | 0 | 200;

  /**
   * Optical Size (ajuste óptico de renderização em pixels).
   * @default 24
   */
  opticalSize?: number;

  /**
   * Cor do ícone. Se omitido, herda a cor do texto do elemento pai (`currentColor`).
   * Recomenda-se utilizar variáveis de tokens de cores do Unooria (ex: 'var(--unooria-color-brandnavy-600)', 'var(--unooria-color-neutral-950)', 'var(--unooria-color-info-500)'), hexadecimais ou nomes CSS.
   */
  color?: string;

  /**
   * Espessura de traço descritiva (Thin = 1px, Regular = 1.5px, Medium = 2px, Bold = 2.5px).
   */
  strokeWeight?: UnooriaIconStrokeWeightKey;

  /**
   * Se true, aplica uma animação suave e contínua de rotação em 360° (ideal para loaders).
   * @default false
   */
  spin?: boolean;

  /**
   * Rotação customizada em graus (ex: 90, 180, 270).
   */
  rotate?: number;

  /**
   * Rótulo de acessibilidade para leitores de tela.
   * Se fornecido, o ícone terá `role="img"` e `aria-label`.
   * Se omitido, o ícone terá `aria-hidden="true"` (decorativo).
   */
  'aria-label'?: string;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}
