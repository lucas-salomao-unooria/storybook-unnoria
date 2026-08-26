import React from 'react';
import type { UniIconName } from './IconPaths';

export type { UniIconName };

/**
 * Tamanhos nomeados da grade de ícones do Unootube.
 *
 * O tamanho governa a **altura** do glifo; a largura é derivada da razão do
 * `viewBox`. Os cinco degraus são os que os dois arquivos de origem aplicam:
 *
 * - 'sm': 16px — glifo do menu superior (10:665) e da barra do comentário (24:2191)
 * - 'md': 20px — glifo de informação do reprodutor (18:1295)
 * - 'lg': 24px — barra superior, barra lateral e ações; nativo do arquivo original
 * - 'xl': 28px — barra de abas móvel do arquivo de Shorts (1:245)
 * - '2xl': 36px — trilha de ações do reprodutor de Shorts (3:216)
 */
export type UniIconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Tons semânticos aplicáveis ao glifo, resolvidos a partir dos tokens
 * `--uni-color-text-*`, `--uni-color-player-chrome` e `--uni-color-brand-*`.
 *
 * O arquivo pinta todos os glifos de branco puro no quadro de componentes, mas
 * as telas os aplicam em três cores distintas — texto primário na barra
 * superior e na barra lateral, secundário na barra do comentário e cromo do
 * reprodutor nos controles de vídeo. A prop existe para cobrir os três casos
 * sem duplicar vetor.
 */
export type UniIconTone =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'brand'
  | 'playerChrome'
  | 'inherit';

/**
 * Propriedades do componente Icon do Unootube.
 */
export interface UniIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /**
   * Nome do glifo na biblioteca oficial exportada do Figma.
   */
  name: UniIconName;

  /**
   * Altura do glifo. Aceita um token nomeado ou um valor em pixels. A largura é
   * derivada da razão do `viewBox`: quadrada nos 45 glifos do arquivo original,
   * literal nos sete do arquivo de Shorts.
   * @default 'lg'
   */
  size?: UniIconSize | number;

  /**
   * Rotação em graus aplicada ao glifo.
   *
   * O arquivo de Shorts reaproveita o mesmo polegar girado 180° para "não
   * curtir" (node 3:221). A prop existe para reproduzir isso sem duplicar
   * vetor com coordenadas reescritas.
   */
  rotate?: number;

  /**
   * Tom semântico aplicado ao preenchimento do glifo.
   * @default 'inherit'
   */
  tone?: UniIconTone;

  /**
   * Rótulo acessível. Quando informado, o SVG recebe `role="img"` e um
   * `<title>`; quando omitido, o ícone é tratado como decorativo
   * (`aria-hidden`).
   */
  title?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
