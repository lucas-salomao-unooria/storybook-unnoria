import React from 'react';
import type { UaiAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System UnooriaAI
 *
 * Avatar circular em quatro tamanhos (`sm` 24, `md` 32, `lg` 40, `xl` 48),
 * com iniciais ou fotografia. O tom `brand` usa a superfície de marca
 * (`--uai-bg-brand`) e o tom `inverse` a superfície de maior contraste
 * (`--uai-bg-inverse`), usado pelo avatar do assistente dentro do
 * `ChatBubble`. Iniciais sempre em `--uai-text-inverse`.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, UaiAvatarProps>(
  (
    {
      size = 'md',
      initials = 'U',
      src,
      alt = '',
      tone = 'brand',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['uai-avatar', `uai-avatar--${size}`, `uai-avatar--${tone}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} data-uai-theme={theme} className={classes} {...restProps}>
        {src ? (
          <img className="uai-avatar__image" src={src} alt={alt} />
        ) : (
          <span className="uai-avatar__initials" aria-hidden={alt ? undefined : true}>
            {initials}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
