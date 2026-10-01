import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Propriedades do componente EmptyState da Unooblog.
 */
export interface UblEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Glifo do registro, exibido em 32px dentro de um medalhão circular. Sem ele,
   * o medalhão não é renderizado. O glifo é decorativo: quem informa é o título.
   */
  icon?: UblIconName;

  /**
   * Título curto que nomeia o vazio ("Nenhum post salvo").
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
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
