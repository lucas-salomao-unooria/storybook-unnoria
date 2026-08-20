import React from 'react';
import type { WaIconName } from './IconPaths';

export type { WaIconName };

/**
 * Tamanhos nomeados da grade de ícones do WhatsApp Mobile.
 * - 'xs': 13px (cadeado da chamada)
 * - 'sm': 17px (glifos da barra de status)
 * - 'md': 20px (câmera da barra de abas, compositor)
 * - 'lg': 25px (busca da barra superior)
 * - 'xl': 28px (controles da chamada)
 */
export type WaIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tons semânticos aplicáveis ao glifo, resolvidos a partir dos tokens
 * `--wa-color-icon-*` e `--wa-color-accent-*`.
 */
export type WaIconTone =
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
 * Propriedades do componente Icon do WhatsApp Mobile.
 */
export interface WaIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /**
   * Nome do glifo na biblioteca oficial exportada do Figma.
   */
  name: WaIconName;

  /**
   * Tamanho do ícone. Aceita um token nomeado ou um valor em pixels.
   * @default 'md'
   */
  size?: WaIconSize | number;

  /**
   * Tom semântico aplicado ao preenchimento do glifo.
   * @default 'appbar'
   */
  tone?: WaIconTone;

  /**
   * Rotação em graus aplicada ao glifo. Vários ícones do arquivo são
   * reaproveitados girados (ex.: `overflow` a 90°, `phone` a -127,81°).
   * @default 0
   */
  rotate?: number;

  /**
   * Espelha o glifo no eixo horizontal, como no export de `cameraFilled`.
   * @default false
   */
  flipX?: boolean;

  /**
   * Espelha o glifo no eixo vertical. O arquivo aplica `scaleY(-1)` ao glifo do
   * botão de encerrar chamada (node 1:4632), combinado com a rotação de -45°.
   * @default false
   */
  flipY?: boolean;

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
