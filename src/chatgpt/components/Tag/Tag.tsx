import React from 'react';
import type { GptTagProps } from './Tag.types';
import './Tag.css';

/**
 * Componente Tag — Design System ChatGPT
 *
 * Réplica do conjunto `Tag` do Figma: cápsula de 33px com padding 8/16,
 * gap 6, raio 20 e rótulo Inter Regular de 14px, nos estados `Default`
 * (superfície translúcida de 4%) e `Selected` (superfície `bg/inverse`).
 */
export const Tag = React.forwardRef<HTMLButtonElement, GptTagProps>(
  (
    { selected = false, glyph, theme, children, className = '', type = 'button', ...restProps },
    ref
  ) => {
    const classes = [
      'gpt-tag',
      selected ? 'gpt-tag--selected' : 'gpt-tag--default',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        type={type}
        aria-pressed={selected}
        {...restProps}
      >
        {glyph && (
          <span className="gpt-tag__glyph" aria-hidden="true">
            {glyph}
          </span>
        )}
        <span className="gpt-tag__label">{children}</span>
      </button>
    );
  }
);

Tag.displayName = 'Tag';
