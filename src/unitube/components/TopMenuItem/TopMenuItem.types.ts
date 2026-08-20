import React from 'react';

/**
 * Propriedades da pílula de filtro do menu superior.
 *
 * Reproduz o nó `Navigation/TopMenuItem` (`10:545`): pílula de 32px de altura
 * com recuo `8/12` e raio de 32px, dentro de um alvo de 56px.
 */
export interface UniTopMenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Rótulo da pílula.
   */
  label: React.ReactNode;

  /**
   * Marca a pílula como selecionada.
   *
   * O arquivo inverte completamente a pílula no estado ativo: fundo branco e
   * rótulo em `--uni-color-text-inverse`, sem contorno. No estado inativo o
   * fundo é `--uni-color-background-surface` com um contorno de 0,3px em
   * `--uni-color-border-active`.
   * @default false
   */
  active?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
