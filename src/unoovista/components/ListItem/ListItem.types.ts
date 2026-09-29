import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Alturas de linha de lista.
 * - 'sm': 48px, linha de uma só linha de texto (itens do menu lateral do perfil)
 * - 'md': 64px, linha com avatar, título e subtítulo (conversas, sugestões)
 */
export type UnvListItemSize = 'sm' | 'md';

/**
 * Propriedades do componente ListItem do Unoovista.
 */
export interface UnvListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
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
   * Metadado alinhado ao final do subtítulo (ex.: "· 15 min").
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
  size?: UnvListItemSize;

  /**
   * Exibe um fio de 1px na base da linha (e zera o raio de 12px, que faria o fio curvar).
   * @default false
   */
  bordered?: boolean;

  /**
   * Callback de clique. Quando informado, a linha vira um `<button>`, ganha o
   * fundo `fill-field` no hover e o anel de foco de 2px.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Elemento HTML raiz renderizado.
   * @default 'button' quando há `onClick`; 'div' caso contrário
   */
  as?: React.ElementType;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
