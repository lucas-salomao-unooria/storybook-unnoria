import React from 'react';

/**
 * Propriedades de um destino da barra de abas móvel.
 */
export interface UniMobileTabBarItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /**
   * Glifo do destino. Componha com `Icon` ou `ShortsLogo` — a barra não escolhe
   * glifo por nome, para que um produto com biblioteca própria possa injetar a
   * dele.
   */
  icon: React.ReactNode;

  /** Rótulo exibido sob o glifo. */
  label: React.ReactNode;

  /**
   * Marca o destino como o atual. Declara `aria-current="page"`.
   * @default false
   */
  active?: boolean;

  /**
   * Endereço de destino. Com `href`, o item é um `<a>`; sem ele, um `<button>`.
   */
  href?: string;

  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades do botão central de criação.
 */
export interface UniMobileTabBarCreateProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /**
   * Rótulo acessível do botão.
   * @default 'Criar'
   */
  'aria-label'?: string;
  /** Classe CSS adicional. */
  className?: string;
}

/**
 * Propriedades da barra de abas móvel.
 */
export interface UniMobileTabBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Compõe com `MobileTabBar.Item` e `MobileTabBar.CreateButton`. */
  children: React.ReactNode;
  /** Classe CSS adicional. */
  className?: string;
}
