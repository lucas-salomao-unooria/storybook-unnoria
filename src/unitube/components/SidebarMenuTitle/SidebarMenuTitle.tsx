import React from 'react';
import type { UniSidebarMenuTitleProps } from './SidebarMenuTitle.types';
import './SidebarMenuTitle.css';

/**
 * Componente SidebarMenuTitle — Design System Unitube
 *
 * Reproduz o nó `Navigation/SidebarMenuTitle` (`9:1933`), o rótulo que abre
 * cada bloco temático da barra lateral.
 *
 * O arquivo escreve o texto já em caixa alta. Aqui a transformação é feita por
 * CSS (`text-transform`), para que o conteúdo entregue ao leitor de tela seja o
 * texto natural, e não uma sequência de letras maiúsculas.
 */
export const SidebarMenuTitle = React.forwardRef<HTMLHeadingElement, UniSidebarMenuTitleProps>(
  ({ title, className = '', ...restProps }, ref) => (
    <h2
      ref={ref}
      className={['uni-sidebar-title', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {title}
    </h2>
  )
);

SidebarMenuTitle.displayName = 'SidebarMenuTitle';
