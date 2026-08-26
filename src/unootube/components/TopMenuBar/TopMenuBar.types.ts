import React from 'react';

/**
 * Uma categoria da barra de filtros.
 */
export interface UniTopMenuOption {
  /** Identificador estável da categoria */
  id: string;
  /** Rótulo exibido na pílula */
  label: React.ReactNode;
}

/**
 * Propriedades da barra de filtros do topo.
 *
 * Reproduz o nó `Top-Menu` (`13:1696`) da tela inicial: 1200×58, com um fio de
 * 1px acima e outro abaixo da faixa de 56px que contém as pílulas.
 */
export interface UniTopMenuBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Categorias exibidas na barra.
   */
  options: UniTopMenuOption[];

  /**
   * Identificador da categoria selecionada.
   */
  activeId?: string;

  /**
   * Chamado ao selecionar uma categoria.
   */
  onSelect?: (id: string) => void;

  /**
   * Exibe o alvo de ícone que encerra a barra.
   * @default true
   */
  showOverflow?: boolean;

  /**
   * Chamado ao acionar o alvo de avanço.
   */
  onOverflow?: () => void;

  /**
   * Rótulo acessível da barra.
   * @default 'Categorias'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
