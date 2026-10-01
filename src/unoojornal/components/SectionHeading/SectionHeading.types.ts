import type React from 'react';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente SectionHeading da Unoojornal.
 */
export interface UjnSectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título da seção, à esquerda.
   */
  title: string;

  /**
   * Texto de apoio à direita ("12 matérias", "Edição 148"). Ignorado quando há
   * `actionLabel`.
   */
  meta?: React.ReactNode;

  /**
   * Rótulo da ação à direita ("Ver todas"), seguido de seta. Com `href` é um
   * `<a>`; com `onAction`, um `<button>`.
   */
  actionLabel?: string;

  /**
   * Endereço da ação.
   */
  href?: string;

  /**
   * Chamada da ação. Com `href`, é chamada no clique do link.
   */
  onAction?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Nível do título na hierarquia da página.
   * @default 'h2'
   */
  as?: 'h2' | 'h3';

  /**
   * Fio fino por baixo do cabeçalho.
   * @default false
   */
  rule?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;
}
