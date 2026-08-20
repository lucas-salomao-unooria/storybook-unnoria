import React from 'react';

/**
 * Densidade da linha de lista, correspondente aos passos verticais medidos no
 * arquivo Figma.
 * - 'chat': 70px (frame "Chats Main Page", node 1:2026)
 * - 'status': 68px (frame "Status Main Page", node 1:6)
 * - 'call': 69px (frame "Calls Main Page", node 1:406)
 * - 'contact': 63px (frame "New group", node 1:1245)
 * - 'settings': 72px (frame "Settings", node 1:2691)
 */
export type WaListItemDensity = 'chat' | 'status' | 'call' | 'contact' | 'settings';

/**
 * Propriedades do componente ListItem do WhatsApp Mobile.
 */
export interface WaListItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
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
  density?: WaListItemDensity;

  /**
   * Desenha o divisor inferior em `--wa-color-border-divider`.
   * @default true
   */
  divider?: boolean;

  /**
   * Recuo esquerdo do divisor em pixels. No arquivo o divisor começa após o
   * avatar, alinhado ao título.
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
