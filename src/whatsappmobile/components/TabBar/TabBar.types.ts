import React from 'react';

/**
 * Tom aplicado ao rótulo e ao indicador da aba ativa.
 * - 'accent': `--wa-color-accent` (#0CA996), usado na aba CHATS (node 1:2140)
 * - 'accentStatus': `--wa-color-accent-status` (#189C87), usado na aba STATUS
 *   (node 1:151). Divergência do próprio arquivo de origem, preservada.
 */
export type WaTabBarTone = 'accent' | 'accentStatus';

/**
 * Descrição de uma aba.
 */
export interface WaTabBarItem {
  /** Identificador único da aba */
  id: string;
  /** Rótulo exibido em caixa alta */
  label: string;
  /** Quantidade de não lidas exibida em um selo ao lado do rótulo */
  badge?: number;
}

/**
 * Propriedades do componente TabBar do WhatsApp Mobile.
 */
export interface WaTabBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Abas exibidas na barra.
   */
  items: WaTabBarItem[];

  /**
   * Identificador da aba ativa.
   */
  activeId: string;

  /**
   * Callback disparado ao selecionar uma aba.
   */
  onChange?: (id: string) => void;

  /**
   * Exibe o atalho de câmera à esquerda das abas.
   * @default true
   */
  showCamera?: boolean;

  /**
   * Callback do atalho de câmera.
   */
  onCamera?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Tom aplicado ao rótulo e ao indicador da aba ativa.
   * @default 'accent'
   */
  tone?: WaTabBarTone;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
