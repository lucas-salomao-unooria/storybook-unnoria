'use client';

import React from 'react';
import type { UniTopMenuItemProps } from './TopMenuItem.types';
import './TopMenuItem.css';

/**
 * Componente TopMenuItem — Design System Unitube
 *
 * Reproduz o nó `Navigation/TopMenuItem` (`10:545`), a pílula de categoria da
 * barra de filtros da tela inicial e das abas do canal.
 *
 * O arquivo publica os dois estados com valores literais distintos, e não por
 * cálculo: ativo é branco puro com rótulo quase preto; inativo é a superfície
 * interativa com um contorno de **0,3px** — uma espessura fracionária que não
 * pode ser arredondada para 1px sem engrossar visivelmente a pílula.
 */
export const TopMenuItem = React.forwardRef<HTMLButtonElement, UniTopMenuItemProps>(
  ({ label, active = false, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={active}
      className={['uni-topmenu-item', active ? 'uni-topmenu-item--active' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {label}
    </button>
  )
);

TopMenuItem.displayName = 'TopMenuItem';
