'use client';

import React from 'react';
import type { UnvGestureHintProps } from './GestureHint.types';
import './GestureHint.css';

/**
 * Componente GestureHint — Design System Unoovista
 *
 * A marca de toque que demonstra um gesto: um círculo com o tamanho do alvo de
 * toque do módulo (`--unv-touch-target`), véu roxo e contorno claro, seguido de
 * uma onda que se expande. Sobe, desliza ou pulsa e some.
 *
 * Sempre `aria-hidden`: é redundância visual de uma instrução que já está em
 * texto. Desligada com `prefers-reduced-motion` (WCAG 2.3.3).
 */
export const GestureHint = React.forwardRef<HTMLSpanElement, UnvGestureHintProps>(
  (
    {
      gesture = 'swipe-up',
      iterations = 1,
      onEnd,
      theme,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-gesture-hint', `unv-gesture-hint--${gesture}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        data-unv-theme={theme}
        className={classes}
        style={{ animationIterationCount: iterations, ...style }}
        onAnimationEnd={
          onEnd
            ? (event) => {
                // A onda (::after) termina junto: só o círculo avisa.
                if (!event.pseudoElement) onEnd();
              }
            : undefined
        }
        {...restProps}
        aria-hidden="true"
      />
    );
  }
);

GestureHint.displayName = 'GestureHint';
