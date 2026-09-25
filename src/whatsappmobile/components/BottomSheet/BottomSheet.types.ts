import React from 'react';

/**
 * Propriedades do componente BottomSheet do WhatsApp Mobile.
 *
 * Extensão: a folha inferior genérica ("Encaminhar para..."). O arquivo de
 * origem publica só a folha de anexos, de vocabulário fechado.
 */
export interface WaBottomSheetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
