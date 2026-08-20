import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades do estado vazio.
 */
export interface TikEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título, em Semibold 17 e `--tik-color-text-primary`.
   */
  title: React.ReactNode;

  /**
   * Descrição, em Regular 14 e `--tik-color-text-muted`.
   */
  description?: React.ReactNode;

  /**
   * Glifo da ilustração. O arquivo publica dois: `emptyInbox` (notificações) e
   * `emptyMessages` (mensagens diretas).
   */
  icon?: TikIconName;

  /**
   * Altura do glifo em pixels. O arquivo usa 68px em notificações e 61px em
   * mensagens.
   * @default 68
   */
  iconSize?: number;

  /**
   * Ação exibida abaixo da descrição. O arquivo não publica nenhuma; o slot é
   * uma extensão documentada.
   */
  action?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
