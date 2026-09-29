import React from 'react';
import type { UaiTagProps } from './Tag.types';
import './Tag.css';

/**
 * Componente Tag — Design System UnooriaAI
 *
 * Cápsula selecionável de 36px com padding 8/16, gap 6, raio 20 e rótulo de
 * 14px, nos estados padrão (superfície translúcida `--uai-fill-4`) e
 * selecionado (superfície `--uai-bg-inverse`, exposta por `aria-pressed`).
 * Serve de sugestão de prompt na tela de nova conversa.
 */
export const Tag = React.forwardRef<HTMLButtonElement, UaiTagProps>(
  (
    { selected = false, glyph, theme, children, className = '', type = 'button', ...restProps },
    ref
  ) => {
    const classes = [
      'uai-tag',
      selected ? 'uai-tag--selected' : 'uai-tag--default',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        data-uai-theme={theme}
        className={classes}
        type={type}
        aria-pressed={selected}
        {...restProps}
      >
        {glyph && (
          <span className="uai-tag__glyph" aria-hidden="true">
            {glyph}
          </span>
        )}
        <span className="uai-tag__label">{children}</span>
      </button>
    );
  }
);

Tag.displayName = 'Tag';
