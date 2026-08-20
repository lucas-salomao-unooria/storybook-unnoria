import React from 'react';

/**
 * Propriedades do componente Dialog do WhatsApp Mobile.
 */
export interface WaDialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controla a visibilidade do diálogo e do véu.
   * @default true
   */
  open?: boolean;

  /**
   * Título exibido no topo do diálogo.
   */
  title?: React.ReactNode;

  /**
   * Corpo do diálogo, normalmente uma lista de `Radio`.
   */
  children?: React.ReactNode;

  /**
   * Conteúdo do rodapé, separado por um divisor. Normalmente combina um
   * `Checkbox` e dois `TextButton`.
   */
  footer?: React.ReactNode;

  /**
   * Callback disparado ao pressionar ESC ou ao tocar no véu.
   */
  onClose?: () => void;

  /**
   * Largura do diálogo em pixels.
   * @default 331
   */
  width?: number;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do rodapé do diálogo.
 */
export interface WaDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo alinhado à esquerda, como a caixa de seleção */
  children?: React.ReactNode;
  /** Ações alinhadas à direita */
  actions?: React.ReactNode;
}
