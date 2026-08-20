import React from 'react';

/**
 * Descrição de um item do menu suspenso.
 */
export interface WaMenuItemData {
  /** Identificador único do item */
  id: string;
  /** Rótulo exibido */
  label: string;
  /** Desabilita o item */
  disabled?: boolean;
}

/**
 * Propriedades do componente Menu do WhatsApp Mobile.
 */
export interface WaMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Itens exibidos no menu.
   */
  items: WaMenuItemData[];

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
   * @default 190
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
