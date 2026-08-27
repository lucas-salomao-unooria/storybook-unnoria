import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades do componente `PlanTag` do Design System ChatGPT.
 *
 * Reproduz a instância `Tag` (`Type=Default, State=Default`) que acompanha o
 * logotipo na tela `New chat - V1 - A` e anuncia o plano da conta.
 */
export interface GptPlanTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Nome do plano. O arquivo usa `Plus`.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
