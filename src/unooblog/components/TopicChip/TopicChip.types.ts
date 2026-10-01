import React from 'react';
import type { UblTheme } from '../../tokens';

/**
 * Tamanhos do chip.
 * - 'sm': 28px de altura (sobre cartões e em listas densas)
 * - 'md': 36px de altura (padrão); o alvo de toque cresce para 44px sem mudar o desenho
 */
export type UblTopicChipSize = 'sm' | 'md';

/**
 * Propriedades do componente TopicChip da Unooblog.
 *
 * O elemento depende das props: com `href` é um `<a>`, com `onClick` é um
 * `<button>` de alternância (`aria-pressed`) e sem nenhum dos dois é um
 * `<span>` informativo.
 */
export interface UblTopicChipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'onClick'> {
  /**
   * Nome do tópico.
   */
  children: React.ReactNode;

  /**
   * Tópico escolhido. No botão vira `aria-pressed`; no link, `aria-current`.
   * O chip escolhido ganha o roxo de ação e um glifo de marcação — o estado
   * nunca vive só na cor.
   * @default false
   */
  selected?: boolean;

  /**
   * Quantidade de posts do tópico, em texto de apoio depois do nome. Entra no
   * nome acessível ("Acessibilidade, 12 posts").
   */
  count?: number;

  /**
   * Destino. Com `href` o chip é um `<a>`.
   */
  href?: string;

  /**
   * Ação ao acionar. Com `onClick` (e sem `href`) o chip é um `<button>`.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Tamanho do chip.
   * @default 'md'
   */
  size?: UblTopicChipSize;

  /**
   * Chip inativo: não recebe foco nem clique.
   * @default false
   */
  disabled?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;
}
