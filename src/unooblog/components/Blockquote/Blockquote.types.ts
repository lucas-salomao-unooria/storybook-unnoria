import type React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Variante da citação.
 * - 'quote': citação dentro do texto, com filete à esquerda
 * - 'pull': citação em destaque, centralizada e maior
 */
export type UblBlockquoteVariant = 'quote' | 'pull';

/**
 * Propriedades do componente Blockquote da Unooblog.
 */
export interface UblBlockquoteProps extends Omit<React.HTMLAttributes<HTMLElement>, 'cite'> {
  /**
   * Texto da citação, sem aspas.
   */
  children: React.ReactNode;

  /**
   * Quem disse, com o cargo ou a fonte ("Marina Vaz, designer de sistemas").
   * Aparece na legenda, depois de um travessão.
   */
  cite?: React.ReactNode;

  /**
   * Variante visual.
   * @default 'quote'
   */
  variant?: UblBlockquoteVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UblTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
