import React from 'react';
import type { UniIconName } from '../Icon';

/**
 * Propriedades do estado vazio do Unootube.
 *
 * EXTENSÃO DECLARADA: nenhum dos dois arquivos de origem publica estado vazio —
 * as seis telas estão todas cheias de conteúdo. A composição usa apenas degraus
 * publicados: `Heading/H3` no título, `Body/Medium` na descrição em
 * `text/secondary` e a calha de 16px.
 */
export interface UniEmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Glifo exibido acima do título, escolhido entre os 52 da biblioteca.
   * Ignorado quando `illustration` é informado.
   */
  iconName?: UniIconName;

  /**
   * Ilustração própria, no lugar do glifo. É um `ReactNode` em vez de um
   * caminho de imagem para que o produto injete a própria arte sem que a
   * biblioteca precise embutir bitmap nenhum.
   */
  illustration?: React.ReactNode;

  /** Título, em `Heading/H3`. */
  title: React.ReactNode;

  /** Descrição, em `Body/Medium` na tinta secundária. */
  description?: React.ReactNode;

  /**
   * Ação principal. Componha com `Button` ou `SubscribeButton`. Quando
   * omitida, nada é renderizado nessa faixa.
   */
  action?: React.ReactNode;

  /**
   * Reduz os espaçamentos, para estados vazios dentro de uma coluna ou de um
   * cartão em vez de uma página inteira.
   * @default false
   */
  compact?: boolean;

  /** Classe CSS adicional. */
  className?: string;
}
