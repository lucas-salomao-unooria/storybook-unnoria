import React from 'react';
import type { UncIconName } from './IconGlyphs';

export type { UncIconName };

/**
 * Tamanhos nomeados da grade de ícones do Unoochat, nos degraus da escala de
 * ícones da Plataforma Unooria.
 * - 'xs': 16px
 * - 'sm': 18px
 * - 'md': 20px
 * - 'lg': 24px (busca da barra superior)
 * - 'xl': 32px
 */
export type UncIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tons semânticos aplicáveis ao glifo, resolvidos a partir dos tokens
 * `--unc-color-icon-*` e `--unc-color-accent*`.
 */
export type UncIconTone =
  | 'appbar'
  | 'camera'
  | 'back'
  | 'composerEmoji'
  | 'composerAttach'
  | 'composerCamera'
  | 'onAccent'
  | 'accent'
  | 'settings'
  | 'settingsHelp'
  | 'settingsQr'
  | 'tick'
  | 'star'
  | 'forward'
  | 'pin'
  | 'callIcon'
  | 'callIconMuted'
  | 'callOut'
  | 'callIn'
  | 'statusBar'
  | 'notice'
  | 'ring'
  | 'inherit';

/**
 * Propriedades do componente Icon do Unoochat.
 */
export interface UncIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'title'> {
  /**
   * Nome do glifo no registro (`uncIcons`).
   */
  name: UncIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: UncIconSize | number;

  /**
   * Tom semântico aplicado à cor do glifo.
   * @default 'appbar'
   */
  tone?: UncIconTone;

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
   * Força o eixo `FILL` do glifo. Quando omitido, vale o padrão do registro.
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
