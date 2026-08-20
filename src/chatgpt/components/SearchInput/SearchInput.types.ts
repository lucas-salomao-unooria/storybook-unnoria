import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `SearchInput` do Design System ChatGPT.
 *
 * Reproduz o componente `SearchInput` do Figma — o campo de busca de
 * conversas usado no topo da barra lateral.
 */
export interface GptSearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'size'> {
  /**
   * Glifo de busca renderizado antes do campo. O arquivo usa `⌕`
   * (`gptGlyphs.search`).
   */
  glyph?: React.ReactNode;

  /**
   * Ocupa toda a largura disponível. Quando `false`, mantém a largura de
   * 260px do arquivo de design.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
