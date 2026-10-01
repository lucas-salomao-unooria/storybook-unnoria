import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente PullQuote da Unoojornal.
 */
export interface UjnPullQuoteProps extends Omit<React.HTMLAttributes<HTMLElement>, 'cite'> {
  /**
   * Texto da citação, sem aspas.
   */
  children: React.ReactNode;

  /**
   * Quem disse, com o cargo ("Prof. Ivan Toledo, Orientador do Departamento de
   * Ciências"). Aparece na legenda, depois de um travessão.
   */
  cite?: React.ReactNode;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
