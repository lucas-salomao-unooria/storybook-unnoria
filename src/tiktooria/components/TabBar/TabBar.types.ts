import React from 'react';
import type { TikSurface } from '../../tokens/colors';
import type { TikIconName } from '../Icon';

/**
 * Propriedades da barra de abas inferior.
 */
export interface TikTabBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Contexto de superfície. `chrome` é branca com fio superior `#D0D1D3`;
   * `immersive` é preta com fio superior `#262626`. Ambas são literais do
   * arquivo (nodes 4:429 e 4:1098).
   * @default 'chrome'
   */
  surface?: TikSurface;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades de um item da barra de abas.
 */
export interface TikTabBarItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Rótulo do item, em Proxima Nova 10 com tracking de 0,15px.
   */
  label: React.ReactNode;

  /**
   * Glifo exibido no estado inativo.
   */
  icon: TikIconName;

  /**
   * Glifo exibido no estado ativo. Quando omitido, o item usa `icon` nos dois
   * estados, alterando apenas peso e cor do rótulo.
   */
  activeIcon?: TikIconName;

  /**
   * Estado selecionado. O rótulo passa a Semibold e perde a atenuação de 80%.
   * @default false
   */
  active?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do botão de criação da barra de abas.
 */
export interface TikCreateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Contexto de superfície. Sobre cromo claro o miolo é `--tik-color-brand-dark`
   * com o glifo branco; sobre superfície imersiva o miolo é branco com o glifo
   * escuro. Os dois estados existem literalmente no arquivo (nodes 4:430 e
   * 4:1099).
   * @default 'chrome'
   */
  surface?: TikSurface;

  /**
   * Rótulo acessível.
   * @default 'Criar'
   */
  label?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
