import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Propriedades do componente EmptyState da Unoojornal.
 */
export interface UjnEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Glifo do registro, exibido em 32px dentro de um medalhão circular. Sem ele,
   * o medalhão não é renderizado. O glifo é decorativo: quem informa é o título.
   */
  icon?: UjnIconName;

  /**
   * Título curto que nomeia o vazio ("Nenhuma matéria salva").
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
  theme?: UjnTheme;
}
