import React from 'react';

/**
 * Propriedades do componente BottomSheet do Unoochat.
 *
 * Extensão: a folha inferior genérica ("Encaminhar para..."). A folha de
 * anexos (`AttachmentSheet`) tem vocabulário fechado; esta tem conteúdo livre.
 */
export interface UncBottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controla a visibilidade da folha e do véu.
   * @default true
   */
  open?: boolean;
  /**
   * Título exibido sob o puxador. Vira o nome acessível da folha.
   */
  title?: React.ReactNode;
  /**
   * Corpo da folha, normalmente linhas de `ListItem`.
   */
  children?: React.ReactNode;
  /**
   * Ações do rodapé, normalmente um `Button`.
   */
  footer?: React.ReactNode;
  /**
   * Callback disparado ao pressionar ESC ou ao tocar no véu.
   */
  onClose?: () => void;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
