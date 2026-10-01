import React from 'react';
import type { UblIconName } from './IconGlyphs';
import type { UblTheme } from '../../tokens';

export type { UblIconName };

/**
 * Tamanhos nomeados da grade de ícones da Unooblog, nos degraus da escala de
 * ícones da Plataforma Unooria.
 * - 'xs': 16px (selos sobre a miniatura e ícones embutidos em campos)
 * - 'sm': 20px (linhas de lista e chips)
 * - 'md': 24px (padrão das barras e das ações)
 * - 'lg': 32px (destaques e estados vazios)
 */
export type UblIconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Tons semânticos aplicáveis ao glifo.
 * - 'primary': `--ubl-color-icon-primary`
 * - 'secondary': `--ubl-color-icon-secondary`
 * - 'accent': `--ubl-color-icon-accent`
 * - 'danger': `--ubl-color-text-danger`
 * - 'on-media': sempre branco, sobre fotografia
 *   (`--ubl-color-media-text`)
 * - 'inherit': herda a cor do elemento pai (`currentColor`)
 */
export type UblIconTone =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'on-media'
  | 'inherit';

/**
 * Propriedades do componente Icon da Unooblog.
 */
export interface UblIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /**
   * Nome do glifo no registro (`ublIcons`).
   */
  name: UblIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: UblIconSize | number;

  /**
   * Tom semântico aplicado à cor do glifo.
   * @default 'primary'
   */
  tone?: UblIconTone;

  /**
   * Força o tema visual do glifo. Quando omitido, herda o tema do contêiner
   * ancestral por `data-ubl-theme`.
   */
  theme?: UblTheme;

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
