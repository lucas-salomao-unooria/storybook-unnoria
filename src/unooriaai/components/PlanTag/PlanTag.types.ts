import React from 'react';
import type { UaiTheme } from '../../tokens';

/**
 * Propriedades do componente `PlanTag` do Design System UnooriaAI.
 *
 * A cápsula que acompanha o logotipo na tela de nova conversa e anuncia o
 * plano da conta.
 */
export interface UaiPlanTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: UaiTheme;

  /**
   * Nome do plano.
   * @default 'Pro'
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
