import React from 'react';
import type { UnvIconName } from './IconGlyphs';
import type { UnvTheme } from '../../tokens';

export type { UnvIconName };

/**
 * Tamanhos nomeados da grade de ícones do Unoovista, nos degraus da escala de
 * ícones da Plataforma Unooria.
 * - 'sm': 16px (ícones embutidos em campos e legendas)
 * - 'md': 24px (padrão de barras e ações de publicação)
 * - 'lg': 32px (destaques e estados vazios)
 */
export type UnvIconSize = 'sm' | 'md' | 'lg';

/**
 * Tons semânticos aplicáveis ao glifo.
 * - 'primary': `--unv-color-icon-primary`
 * - 'secondary': `--unv-color-icon-secondary`
 * - 'link': `--unv-color-action-primary`
 * - 'like': `--unv-color-brand-like`
 * - 'inverse': sempre branco, para uso sobre mídia (`--unv-color-text-on-media`)
 * - 'inherit': herda a cor do elemento pai (`currentColor`)
 */
export type UnvIconTone = 'primary' | 'secondary' | 'link' | 'like' | 'inverse' | 'inherit';

/**
 * Propriedades do componente Icon do Unoovista.
 */
export interface UnvIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /**
   * Nome do glifo no registro (`unvIcons`).
   */
  name: UnvIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: UnvIconSize | number;

  /**
   * Tom semântico aplicado à cor do glifo.
   * @default 'primary'
   */
  tone?: UnvIconTone;

  /**
   * Força o tema visual do glifo. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

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
