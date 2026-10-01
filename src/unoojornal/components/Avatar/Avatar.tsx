'use client';

import React from 'react';
import type { UjnAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Iniciais do nome: a primeira letra de cada uma das duas primeiras palavras,
 * por code point (um nome que começa com letra acentuada ou emoji não é cortado).
 */
export const ujnInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? '')
    .join('')
    .toLocaleUpperCase('pt-BR');

/**
 * Componente Avatar — Design System Unoojornal
 *
 * Retrato redondo de quem assina a matéria. Sem retrato — ou quando ele falha
 * ao carregar —, mostra as iniciais em `text-accent` sobre `background-subtle`,
 * com o mesmo nome acessível. `alt=""` o tira da árvore de acessibilidade
 * quando o nome já está escrito ao lado.
 *
 * É de cliente só para lembrar que o retrato falhou e cair nas iniciais.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, UjnAvatarProps>(
  (
    { src, name, size = 'md', alt, theme, className = '', style, ...restProps },
    ref
  ) => {
    const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
    const showImage = Boolean(src) && failedSrc !== src;
    const accessibleName = alt ?? name;
    const decorative = accessibleName === '';

    const isNumeric = typeof size === 'number';
    const classes = [
      'ujn-avatar',
      isNumeric ? 'ujn-avatar--custom' : `ujn-avatar--${size}`,
      showImage ? '' : 'ujn-avatar--initials',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle = isNumeric
      ? ({ '--ujn-avatar-size': `${size}px`, ...style } as React.CSSProperties)
      : style;

    return (
      <span ref={ref} data-ujn-theme={theme} className={classes} style={customStyle} {...restProps}>
        {showImage ? (
          <img
            className="ujn-avatar__image"
            src={src}
            alt={accessibleName}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          <span
            className="ujn-avatar__initials"
            {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': accessibleName })}
          >
            {ujnInitials(name)}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
