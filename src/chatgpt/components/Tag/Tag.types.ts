import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `Tag` do Design System ChatGPT.
 *
 * Reproduz o conjunto `Tag` do Figma (propriedade `State`: `Default` e
 * `Selected`), usado como sugestão de prompt na tela de nova conversa.
 */
export interface GptTagProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Estado de seleção. `true` corresponde à variante `State=Selected`.
   * @default false
   */
  selected?: boolean;

  /**
   * Glifo renderizado antes do rótulo. O arquivo usa `✦`
   * (`gptGlyphs.sparkle`).
   */
  glyph?: React.ReactNode;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Rótulo da cápsula.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
