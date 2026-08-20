import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Variantes de botão publicadas pelo arquivo de design.
 *
 * - `primary`: cápsula de 270×44 em `--tik-color-brand-button`, rótulo Bold 15
 *   branco (node 4:622, "Select photos").
 * - `outline`: 164×44 com contorno de 1px `#E3E3E4` e raio de 2px, rótulo
 *   Semibold 15 (node 4:495, "Edit profile").
 * - `floating`: cápsula branca de 178×52 com sombra de desfoque, rótulo
 *   Semibold 16 com tracking de -0,25px (node 4:803, "Use this sound").
 */
export type TikButtonVariant = 'primary' | 'outline' | 'floating';

/**
 * Propriedades do botão do Tik Tooria.
 */
export interface TikButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual.
   * @default 'outline'
   */
  variant?: TikButtonVariant;

  /**
   * Glifo exibido antes do rótulo.
   */
  icon?: TikIconName;

  /**
   * Aplica a largura fixa que o arquivo publica para a variante (270px em
   * `primary`, 164px em `outline`, 178px em `floating`). Quando falso, o botão
   * se ajusta ao conteúdo.
   * @default true
   */
  fixedWidth?: boolean;

  /**
   * Ocupa toda a largura disponível, ignorando `fixedWidth`.
   * @default false
   */
  block?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
