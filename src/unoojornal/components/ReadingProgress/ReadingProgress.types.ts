import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente ReadingProgress da Unoojornal.
 *
 * Dois modos, decididos pelas props: `value` (o produto calcula e informa o
 * progresso) ou `targetRef` (o componente lê a rolagem do elemento). Com os
 * dois, `value` vence.
 */
export interface UjnReadingProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'children'> {
  /**
   * Progresso de leitura, de 0 a 100. Valores fora do intervalo são limitados.
   * Quando informado, vale sobre `targetRef`.
   */
  value?: number;

  /**
   * Elemento rolável cuja posição de rolagem define o progresso: 0% no topo,
   * 100% quando o fim do conteúdo é alcançado. O componente escuta a rolagem
   * com um ouvinte passivo e o remove ao desmontar.
   */
  targetRef?: React.RefObject<HTMLElement | null>;

  /**
   * Nome acessível da barra (`aria-label`).
   * @default 'Progresso de leitura'
   */
  label?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-ujn-theme`.
   */
  theme?: UjnTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
