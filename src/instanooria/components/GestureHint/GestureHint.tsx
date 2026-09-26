'use client';

import React from 'react';
import type { InstaGestureHintProps } from './GestureHint.types';
import './GestureHint.css';

/**
 * Componente GestureHint — Design System Instanooria
 *
 * A marca de toque que demonstra um gesto: um círculo translúcido de 44px (o
 * alvo de toque do arquivo, `--insta-touch-target`) com contorno branco, que
 * sobe, desliza ou pulsa e some. Extensão sem quadro no arquivo de origem.
 *
 * Sempre `aria-hidden`: é redundância visual de uma instrução que já está em
 * texto. Desligada com `prefers-reduced-motion` (WCAG 2.3.3).
 */
export const GestureHint = React.forwardRef<HTMLSpanElement, InstaGestureHintProps>(
  (
    {
      gesture = 'swipe-up',
      iterations = 1,
      onEnd,
      theme = 'light',
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-gesture-hint', `insta-gesture-hint--${gesture}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        data-insta-theme={theme}
        className={classes}
        style={{ animationIterationCount: iterations, ...style }}
        onAnimationEnd={onEnd ? () => onEnd() : undefined}
        {...restProps}
        aria-hidden="true"
      />
    );
  }
);

GestureHint.displayName = 'GestureHint';
