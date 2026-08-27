import React from 'react';
import type { GptTheme } from '../../tokens';
import type { GptIconName } from './IconPaths';

export type { GptIconName } from './IconPaths';

/**
 * Tamanhos publicados pelo componente `Icon` do Figma (propriedade `Size`),
 * lidos das instâncias da tela `New chat - V1 - A`.
 * - `16`: alvos do compositor e o `+` do botão de nova conversa
 * - `24`: linhas da barra lateral
 * - `32`: cabeçalhos das colunas Examples · Capabilities · Limitations
 */
export type GptIconSize = 16 | 24 | 32;

/**
 * Propriedades do componente `Icon` do Design System ChatGPT.
 */
export interface GptIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  /**
   * Nome do ícone no registro `gptIcons`.
   */
  name: GptIconName;

  /**
   * Aresta do alvo quadrado, em pixels. Os três degraus publicados são
   * 16, 24 e 32; qualquer número é aceito para composições próprias.
   * @default 24
   */
  size?: GptIconSize | number;

  /**
   * Rótulo acessível. Quando informado, o ícone deixa de ser decorativo e
   * passa a expor `role="img"` com um `<title>`. Quando omitido, recebe
   * `aria-hidden` — que é o correto para um ícone ao lado de um rótulo.
   */
  title?: string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
