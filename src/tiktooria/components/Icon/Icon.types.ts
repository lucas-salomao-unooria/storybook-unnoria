import React from 'react';
import type { TikIconName } from './IconPaths';

export type { TikIconName };

/**
 * Tamanhos nomeados da grade de ícones do Tik Tooria. O valor governa a
 * **altura** do glifo; a largura é derivada do `viewBox` original, de modo que
 * a proporção do arquivo de design nunca seja distorcida.
 *
 * - 'xs': 12px (nota musical da legenda)
 * - 'sm': 16px (glifo de linha de configuração)
 * - 'md': 20px (glifo da barra de abas)
 * - 'lg': 24px (glifo da coluna da câmera)
 * - 'xl': 35px (glifo da trilha de ações do feed)
 */
export type TikIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tons semânticos aplicáveis ao glifo, resolvidos a partir dos tokens
 * `--tik-color-icon-*`, `--tik-color-text-*` e `--tik-color-brand-*`.
 *
 * Glifos assinalados como `multicolor` no registro (coração, comentário, seta
 * de compartilhamento, botão de seguir, selo verificado, bateria e as duas
 * ilustrações da câmera) ignoram esta prop: suas cores são literais do arquivo.
 */
export type TikIconTone =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tabInactive'
  | 'tabActive'
  | 'tabDisabled'
  | 'onImmersive'
  | 'onImmersiveMuted'
  | 'brand'
  | 'empty'
  | 'emptyAlt'
  | 'statusBar'
  | 'inherit';

/**
 * Propriedades do componente Icon do Tik Tooria.
 */
export interface TikIconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'ref'> {
  /**
   * Nome do glifo na biblioteca oficial exportada do Figma.
   */
  name: TikIconName;

  /**
   * Altura do glifo. Aceita um token nomeado ou um valor em pixels; a largura
   * é sempre derivada do `viewBox` para preservar a proporção.
   * @default 'md'
   */
  size?: TikIconSize | number;

  /**
   * Tom semântico aplicado ao preenchimento do glifo. Ignorado por glifos
   * multicoloridos.
   * @default 'default'
   */
  tone?: TikIconTone;

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
