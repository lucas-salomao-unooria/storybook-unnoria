import React from 'react';

/**
 * Densidade da linha de lista, definida pelo passo vertical.
 * - 'chat': 70px (lista de conversas)
 * - 'status': 68px (aba Status)
 * - 'call': 69px (aba Chamadas)
 * - 'contact': 63px (seleção de contatos)
 * - 'settings': 72px (Ajustes)
 */
export type UncListItemDensity = 'chat' | 'status' | 'call' | 'contact' | 'settings';

/**
 * Propriedades do componente ListItem do Unoochat.
 */
export interface UncListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Conteúdo à esquerda, normalmente um `Avatar` ou um `Icon`.
   */
  leading?: React.ReactNode;

  /**
   * Título principal da linha.
   */
  title: React.ReactNode;

  /**
   * Linha secundária, exibida abaixo do título.
   */
  subtitle?: React.ReactNode;

  /**
   * Conteúdo alinhado ao topo da coluna direita, como o horário da conversa.
   */
  meta?: React.ReactNode;

  /**
   * Conteúdo alinhado à base da coluna direita, como selos e ícones de estado.
   */
  trailing?: React.ReactNode;

  /**
   * Densidade vertical da linha.
   * @default 'chat'
   */
  density?: UncListItemDensity;

  /**
   * Desenha o divisor inferior em `--unc-color-border-divider`.
   * @default true
   */
  divider?: boolean;

  /**
   * Recuo esquerdo do divisor em pixels. O divisor começa após o avatar,
   * alinhado ao título.
   * @default 71
   */
  dividerInset?: number;

  /**
   * Callback de ativação. Quando informado, a linha recebe semântica de botão.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Elemento HTML raiz renderizado.
   * @default 'li'
   */
  as?: React.ElementType;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
