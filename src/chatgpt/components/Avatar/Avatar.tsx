import React from 'react';
import type { GptAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System ChatGPT
 *
 * Réplica do conjunto `Avatar` do Figma: quatro tamanhos circulares
 * (`SM` 24, `MD` 32, `LG` 40, `XL` 48) com superfície `bg/brand` e iniciais
 * em `text/inverse`, mais o tom `inverse` usado pelo avatar do assistente
 * dentro do `ChatBubble`.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, GptAvatarProps>(
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
    const classes = ['gpt-avatar', `gpt-avatar--${size}`, `gpt-avatar--${tone}`, className]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} data-gpt-theme={theme} className={classes} {...restProps}>
        {src ? (
          <img className="gpt-avatar__image" src={src} alt={alt} />
        ) : (
          <span className="gpt-avatar__initials" aria-hidden={alt ? undefined : true}>
            {initials}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
