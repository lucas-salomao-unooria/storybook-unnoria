import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Estados do conjunto `Input` do Figma (propriedade `State`).
 * - `default`: contorno `border/default`, placeholder a 40%
 * - `focus`: contorno `border/brand`
 * - `error`: contorno `status/error`
 * - `disabled`: contorno a 50% e texto a 30%
 */
export type GptInputState = 'default' | 'focus' | 'error' | 'disabled';

/**
 * Propriedades do componente `Input` do Design System ChatGPT.
 */
export interface GptInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'size'> {
  /**
   * Estado visual do campo. `focus` fixa o anel de foco para matrizes de
   * documentação; o anel também aparece naturalmente ao focar o campo.
   * `disabled` propaga o atributo nativo `disabled`.
   * @default 'default'
   */
  state?: GptInputState;

  /**
   * Ocupa toda a largura disponível do contêiner. Quando `false`, mantém a
   * largura de 320px do arquivo de design.
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
