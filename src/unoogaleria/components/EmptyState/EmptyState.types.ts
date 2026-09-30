import React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Variantes do estado vazio.
 * - 'default': sobre as superfícies do tema (biblioteca, álbuns, busca)
 * - 'immersive': sobre a superfície imersiva, invariante entre temas
 */
export type UglEmptyStateVariant = 'default' | 'immersive';

/**
 * Propriedades do componente EmptyState da Unoogaleria.
 */
export interface UglEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Glifo do registro, exibido em 48px dentro de um medalhão.
   */
  icon: UglIconName;

  /**
   * Título curto que nomeia o vazio ("Nenhum favorito ainda").
   */
  title: React.ReactNode;

  /**
   * Texto de apoio: o que aparece aqui e como preencher.
   */
  description?: React.ReactNode;

  /**
   * Ação que resolve o vazio — em geral um `Button`.
   */
  action?: React.ReactNode;

  /**
   * Nível do título no documento.
   * @default 2
   */
  headingLevel?: 2 | 3;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglEmptyStateVariant;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
