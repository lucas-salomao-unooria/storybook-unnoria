import React from 'react';
import type { UaiTheme } from '../../tokens';
import type { UaiIconName } from './IconGlyphs';

export type { UaiIconName } from './IconGlyphs';

/**
 * Tamanhos de uso corrente no módulo, em pixels.
 * - `16`: alvos do compositor e o `+` do botão de nova conversa
 * - `24`: linhas da barra lateral
 * - `32`: cabeçalhos das colunas de tópicos
 */
export type UaiIconSize = 16 | 24 | 32;

/**
 * Propriedades do componente `Icon` do Design System UnooriaAI.
 */
export interface UaiIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children' | 'title'> {
  /**
   * Nome do ícone no registro `uaiIcons`.
   */
  name: UaiIconName;

  /**
   * Aresta da caixa quadrada do glifo, em pixels. Os três degraus de uso são
   * 16, 24 e 32; qualquer número é aceito para composições próprias.
   * @default 24
   */
  size?: UaiIconSize | number;

  /**
   * Rótulo acessível. Quando informado, o ícone deixa de ser decorativo e
   * passa a expor `role="img"` com `aria-label`. Quando omitido, recebe
   * `aria-hidden` — que é o correto para um ícone ao lado de um rótulo.
   */
  title?: string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

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
   * Classe CSS adicional.
   */
  className?: string;
}
