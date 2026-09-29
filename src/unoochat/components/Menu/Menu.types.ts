import React from 'react';

/**
 * Descrição de um item do menu suspenso.
 */
export interface UncMenuItemData {
  /** Identificador único do item */
  id: string;
  /** Rótulo exibido */
  label: string;
  /** Desabilita o item */
  disabled?: boolean;
}

/**
 * Propriedades do componente Menu do Unoochat.
 */
export interface UncMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Itens exibidos no menu.
   */
  items: UncMenuItemData[];

  /**
   * Callback disparado ao escolher um item.
   */
  onSelect?: (id: string) => void;

  /**
   * Callback de fechamento, disparado ao pressionar ESC.
   */
  onClose?: () => void;

  /**
   * Largura do menu em pixels.
   * @default 240
   */
  width?: number;

  /**
   * Rótulo acessível do menu.
   * @default 'Mais opções'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
