'use client';

import React from 'react';
import { TopMenuItem } from '../TopMenuItem';
import { TopMenuIcon } from '../TopMenuIcon';
import type { UniTopMenuBarProps } from './TopMenuBar.types';
import './TopMenuBar.css';

/**
 * Componente TopMenuBar — Design System Unitube
 *
 * Reproduz o nó `Top-Menu` (`13:1696`) da tela inicial: a faixa horizontal de
 * pílulas de categoria, delimitada por um fio de 1px acima e outro abaixo.
 *
 * No arquivo a lista transborda o quadro — são 28 pílulas em 1200px de largura
 * visível —, e o alvo de ícone à direita indica a continuação. Aqui a faixa
 * rola horizontalmente, com a barra de rolagem suprimida para preservar a
 * aparência do arquivo.
 */
export const TopMenuBar = React.forwardRef<HTMLDivElement, UniTopMenuBarProps>(
  (
    {
      options,
      activeId,
      onSelect,
      showOverflow = true,
      onOverflow,
      label = 'Categorias',
      className = '',
      ...restProps
    },
    ref
  ) => (
    <div
      ref={ref}
      role="toolbar"
      aria-label={label}
      className={['uni-topmenu-bar', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-topmenu-bar__track">
        {options.map((option) => (
          <TopMenuItem
            key={option.id}
            label={option.label}
            active={option.id === activeId}
            onClick={() => onSelect?.(option.id)}
          />
        ))}
      </div>
      {showOverflow && (
        <div className="uni-topmenu-bar__overflow">
          <TopMenuIcon onClick={onOverflow} />
        </div>
      )}
    </div>
  )
);

TopMenuBar.displayName = 'TopMenuBar';
