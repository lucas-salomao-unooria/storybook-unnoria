import React from 'react';
import type { UniIconName } from './IconPaths';

export type { UniIconName };

/**
 * Tamanhos nomeados da grade de ícones do Unitube.
 *
 * O arquivo desenha **todos** os 45 glifos em quadros de 24×24 e os aplica em
 * três tamanhos distintos, sempre por redimensionamento do quadro:
 *
 * - 'sm': 16px — glifo do menu superior (10:665) e da barra do comentário (24:2191)
 * - 'md': 20px — glifo de informação do reprodutor (18:1295)
 * - 'lg': 24px — tamanho nativo, usado na barra superior, na barra lateral e nas ações
 */
export type UniIconSize = 'sm' | 'md' | 'lg';

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
 * Propriedades do componente Icon do Unitube.
 */
export interface UniIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /**
   * Nome do glifo na biblioteca oficial exportada do Figma.
   */
  name: UniIconName;

  /**
   * Aresta do glifo. Aceita um token nomeado ou um valor em pixels. Como todos
   * os glifos do arquivo são 24×24, o alvo é sempre quadrado.
   * @default 'lg'
   */
  size?: UniIconSize | number;

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
