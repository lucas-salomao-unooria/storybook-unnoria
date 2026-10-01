import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Variantes da nota ao fim da matéria.
 * - 'contact': como falar com a redação ("Correções e cartas: sala 12…"), com o
 *   glifo de carta e o filete na cor de ação
 * - 'correction': erro corrigido depois da publicação, com o glifo de alerta e
 *   o filete na cor de atenção
 */
export type UjnCorrectionNoteVariant = 'contact' | 'correction';

/**
 * Propriedades do componente CorrectionNote da Unoojornal.
 */
export interface UjnCorrectionNoteProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Título da nota.
   * @default 'Correções e cartas'
   */
  title?: string;

  /**
   * Texto da nota ("Correções e cartas: sala 12, bloco B ou
   * redação@gazetadopatio.com.br").
   */
  children: React.ReactNode;

  /**
   * Rótulo da ação opcional ("Escrever à redação"). Sem ele, a nota não tem
   * botão.
   */
  actionLabel?: string;

  /**
   * Chamado ao acionar a ação. Sem ele, a ação não é exibida.
   */
  onAction?: () => void;

  /**
   * Variante da nota.
   * @default 'contact'
   */
  variant?: UjnCorrectionNoteVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
