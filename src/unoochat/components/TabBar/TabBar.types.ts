import React from 'react';

/**
 * Tom aplicado ao rótulo e ao indicador da aba ativa.
 * - 'accent': `--unc-color-accent`.
 */
export type UncTabBarTone = 'accent';

/**
 * Descrição de uma aba.
 */
export interface UncTabBarItem {
  /** Identificador único da aba */
  id: string;
  /** Rótulo exibido em caixa alta */
  label: string;
  /** Quantidade de não lidas exibida em um selo ao lado do rótulo */
  badge?: number;
}

/**
 * Propriedades do componente TabBar do Unoochat.
 */
export interface UncTabBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Abas exibidas na barra.
   */
  items: UncTabBarItem[];

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
  tone?: UncTabBarTone;

  /**
   * Resolve o `id` do painel controlado por cada aba, alimentando
   * `aria-controls`. Informe apenas quando o consumidor realmente renderiza um
   * elemento com `role="tabpanel"` e o `id` correspondente — sem isso a
   * referência ARIA apontaria para um elemento inexistente.
   */
  panelId?: (id: string) => string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
