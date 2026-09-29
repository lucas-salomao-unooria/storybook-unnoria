import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Estados visuais do `Input`.
 * - `default`: contorno `--uai-border-control`, espaço reservado em `--uai-text-soft-40`
 * - `focus`: contorno `--uai-border-brand`
 * - `error`: contorno `--uai-status-error`
 * - `disabled`: contorno `--uai-border-default` e texto em `--uai-text-soft-30`
 */
export type UaiInputState = 'default' | 'focus' | 'error' | 'disabled';

/**
 * Propriedades do componente `Input` do Design System UnooriaAI.
 */
export interface UaiInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'size'> {
  /**
   * Estado visual do campo. `focus` fixa o anel de foco para matrizes de
   * documentação; o anel também aparece naturalmente ao focar o campo.
   * `disabled` propaga o atributo nativo `disabled`.
   * @default 'default'
   */
  state?: UaiInputState;

  /**
   * Ocupa toda a largura disponível do contêiner. Quando `false`, mantém a
   * largura de 320px.
   * @default false
   */
  block?: boolean;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Classe CSS adicional aplicada ao contêiner do campo.
   */
  className?: string;
}
