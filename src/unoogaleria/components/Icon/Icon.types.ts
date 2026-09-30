import React from 'react';
import type { UglIconName } from './IconGlyphs';
import type { UglTheme } from '../../tokens';

export type { UglIconName };

/**
 * Tamanhos nomeados da grade de ícones da Unoogaleria, nos degraus da escala de
 * ícones da Plataforma Unooria.
 * - 'xs': 16px (selos sobre a miniatura e ícones embutidos em campos)
 * - 'sm': 20px (linhas de lista e chips)
 * - 'md': 24px (padrão das barras e das ações)
 * - 'lg': 32px (controles do visualizador e do editor)
 * - 'xl': 48px (estados vazios e o botão central de reprodução)
 */
export type UglIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tons semânticos aplicáveis ao glifo.
 * - 'primary': `--ugl-color-icon-primary`
 * - 'secondary': `--ugl-color-icon-secondary`
 * - 'accent': `--ugl-color-icon-accent`
 * - 'danger': `--ugl-color-text-danger`
 * - 'favorite': `--ugl-color-brand-favorite`
 * - 'on-media': sempre branco, sobre mídia e sobre a superfície imersiva
 *   (`--ugl-color-immersive-text`)
 * - 'inherit': herda a cor do elemento pai (`currentColor`)
 */
export type UglIconTone =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'danger'
  | 'favorite'
  | 'on-media'
  | 'inherit';

/**
 * Propriedades do componente Icon da Unoogaleria.
 */
export interface UglIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /**
   * Nome do glifo no registro (`uglIcons`).
   */
  name: UglIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: UglIconSize | number;

  /**
   * Tom semântico aplicado à cor do glifo.
   * @default 'primary'
   */
  tone?: UglIconTone;

  /**
   * Força o tema visual do glifo. Quando omitido, herda o tema do contêiner
   * ancestral por `data-ugl-theme`.
   */
  theme?: UglTheme;

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
