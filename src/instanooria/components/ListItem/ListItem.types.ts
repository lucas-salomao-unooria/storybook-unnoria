import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Alturas oficiais de linha de lista.
 * - 'sm': 48px (itens do menu lateral do perfil)
 * - 'md': 72px (conversas da caixa de mensagens diretas)
 */
export type InstaListItemSize = 'sm' | 'md';

/**
 * Propriedades do componente ListItem do Instanooria.
 */
export interface InstaListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Conteúdo à esquerda (avatar ou glifo).
   */
  leading?: React.ReactNode;

  /**
   * Título da linha.
   */
  title: React.ReactNode;

  /**
   * Texto de apoio exibido abaixo do título.
   */
  subtitle?: React.ReactNode;

  /**
   * Metadado alinhado ao final do subtítulo (ex.: "· 15m").
   */
  meta?: React.ReactNode;

  /**
   * Conteúdo à direita (ação, miniatura ou glifo).
   */
  trailing?: React.ReactNode;

  /**
   * Altura da linha.
   * @default 'md'
   */
  size?: InstaListItemSize;

  /**
   * Exibe o divisor hairline na base da linha.
   * @default false
   */
  bordered?: boolean;

  /**
   * Callback de clique. Quando informado, a linha recebe semântica de botão.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Elemento HTML raiz renderizado.
   * @default 'li' quando dentro de uma lista; 'div' caso contrário
   */
  as?: React.ElementType;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
