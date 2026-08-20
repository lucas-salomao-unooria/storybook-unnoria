'use client';

import React, { forwardRef } from 'react';
import { ScrollBarProps } from './ScrollBar.types';
import '../../tokens/scrollbar.css';
import './ScrollBar.css';

/**
 * Componente oficial de Barra de Rolagem (ScrollBar) do Unooria Design System.
 * Plataforma Unooria - Extraído do Figma (Node 6104:5351 / Component Set 6104:5258)
 *
 * Permite a navegação em conteúdos maiores que a tela ou container nos eixos vertical,
 * horizontal ou ambos, eliminando as barras padrão dos navegadores e garantindo contraste ideal.
 */
export const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  (
    {
      orientation = 'vertical',
      thickness = 'slim',
      autoHide = false,
      maxHeight,
      maxWidth,
      height,
      width,
      theme = 'light',
      onScroll,
      children,
      className = '',
      style,
      ...rest
    },
    ref
  ) => {
    // Classes de orientação
    const orientationClass =
      orientation === 'horizontal'
        ? 'unooria-scrollbar-container--horizontal'
        : orientation === 'both'
        ? 'unooria-scrollbar-container--both'
        : 'unooria-scrollbar-container--vertical';

    // Classes de espessura
    const thicknessClass =
      thickness === 'thick'
        ? 'unooria-scrollbar-container--thick'
        : thickness === 'regular'
        ? 'unooria-scrollbar-container--regular'
        : 'unooria-scrollbar-container--slim';

    // Classe de auto-hide
    const autoHideClass = autoHide ? 'unooria-scrollbar-container--auto-hide' : '';

    // Classe de tema
    const themeClass = theme === 'dark' ? 'unooria-scrollbar-container--theme-dark' : '';

    const combinedClassName = [
      'unooria-scrollbar-container',
      orientationClass,
      thicknessClass,
      autoHideClass,
      themeClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedStyle: React.CSSProperties = {
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      height: typeof height === 'number' ? `${height}px` : height,
      width: typeof width === 'number' ? `${width}px` : width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={combinedStyle}
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label="Área de rolagem"
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ScrollBar.displayName = 'ScrollBar';

export default ScrollBar;
