import React from 'react';
import type { UjnIconName } from './IconGlyphs';
import type { UjnTheme } from '../../tokens';

export type { UjnIconName };

/**
 * Tamanhos nomeados da grade de ícones da Unoojornal, nos degraus da escala de
 * ícones da Plataforma Unooria.
 * - 'xs': 16px (selos sobre a miniatura e ícones embutidos em campos)
 * - 'sm': 20px (linhas de lista e chips)
 * - 'md': 24px (padrão das barras e das ações)
 * - 'lg': 32px (destaques e estados vazios)
 */
export type UjnIconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Tons semânticos aplicáveis ao glifo.
 * - 'primary': `--ujn-color-icon-primary`
 * - 'secondary': `--ujn-color-icon-secondary`
 * - 'accent': `--ujn-color-icon-accent`
 * - 'danger': `--ujn-color-text-danger`
 * - 'on-media': sempre branco, sobre fotografia
 *   (`--ujn-color-media-text`)
 * - 'inherit': herda a cor do elemento pai (`currentColor`)
 */
export type UjnIconTone =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'on-media'
  | 'inherit';

/**
 * Propriedades do componente Icon da Unoojornal.
 */
export interface UjnIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /**
   * Nome do glifo no registro (`ujnIcons`).
   */
  name: UjnIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: UjnIconSize | number;

  /**
   * Tom semântico aplicado à cor do glifo.
   * @default 'primary'
   */
  tone?: UjnIconTone;

  /**
   * Força o tema visual do glifo. Quando omitido, herda o tema do contêiner
   * ancestral por `data-ujn-theme`.
   */
  theme?: UjnTheme;

  /**
   * Rotação em graus aplicada ao glifo.
   * @default 0
   */
  rotate?: number;

  /**
   * Espelha o glifo no eixo horizontal.
   * @default false
   */
  flipX?: boolean;

  /**
   * Espelha o glifo no eixo vertical.
   * @default false
   */
  flipY?: boolean;

  /**
   * Força o eixo `FILL` (glifo preenchido). Quando omitido, vale o do registro.
   */
  filled?: boolean;

  /**
   * Rótulo acessível. Quando informado, o glifo recebe `role="img"` e
   * `aria-label`; quando omitido, é tratado como decorativo (`aria-hidden`).
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
