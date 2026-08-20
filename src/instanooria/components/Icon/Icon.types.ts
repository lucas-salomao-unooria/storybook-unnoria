import React from 'react';
import type { InstaIconName } from './IconPaths';
import type { InstaTheme } from '../../tokens';

export type { InstaIconName };

/**
 * Tamanhos nomeados da grade de ícones do Instanooria.
 * - 'sm': 16px (ícones embutidos em campos e legendas)
 * - 'md': 24px (padrão de barras e ações de post)
 * - 'lg': 28px (destaques e estados vazios)
 */
export type InstaIconSize = 'sm' | 'md' | 'lg';

/**
 * Tons semânticos aplicáveis ao glifo.
 * - 'primary': `--insta-color-icon-primary`
 * - 'secondary': `--insta-color-icon-secondary`
 * - 'link': `--insta-color-action-primary`
 * - 'like': `--insta-color-brand-like`
 * - 'inverse': sempre branco, para uso sobre mídia
 * - 'inherit': herda a cor do elemento pai (`currentColor`)
 */
export type InstaIconTone = 'primary' | 'secondary' | 'link' | 'like' | 'inverse' | 'inherit';

/**
 * Propriedades do componente Icon do Instanooria.
 */
export interface InstaIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /**
   * Nome do glifo na biblioteca oficial exportada do Figma.
   */
  name: InstaIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: InstaIconSize | number;

  /**
   * Tom semântico aplicado ao preenchimento do glifo.
   * @default 'primary'
   */
  tone?: InstaIconTone;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Rótulo acessível. Quando informado, o SVG recebe `role="img"` e um `<title>`;
   * quando omitido, o ícone é tratado como decorativo (`aria-hidden`).
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
