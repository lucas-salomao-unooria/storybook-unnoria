import React from 'react';

/**
 * Propriedades da barra lateral do Unitube.
 *
 * Reproduz o nó `Navigation/Sidebar` (`8:114`): 240px de largura sobre
 * `--uni-color-background-secondary`, dividida em blocos separados por fios de
 * 1px em `--uni-color-border-subtle`.
 */
export interface UniSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Blocos da barra. Componha com `Sidebar.Section`, `SidebarMenuItem`,
   * `SidebarMenuTitle` e `Sidebar.Footer`.
   */
  children?: React.ReactNode;

  /**
   * Rótulo acessível da região de navegação.
   * @default 'Navegação principal'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades de um bloco da barra lateral.
 *
 * O arquivo separa os blocos por um fio de 1px com 224px de largura — mais
 * estreito que os 240px da barra —, o que produz o recuo visível à direita.
 */
export interface UniSidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Desenha o fio divisor ao final do bloco.
   * @default true
   */
  divider?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do rodapé da barra lateral.
 */
export interface UniSidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grupos de links. Cada elemento filho vira uma linha do rodapé.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
