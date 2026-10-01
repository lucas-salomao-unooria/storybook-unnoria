'use client';

import React from 'react';
import type { UblAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Iniciais do nome: a primeira letra de cada uma das duas primeiras palavras,
 * por code point (um nome que começa com letra acentuada ou emoji não é cortado).
 */
export const ublInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0] ?? '')
    .join('')
    .toLocaleUpperCase('pt-BR');

/**
 * Componente Avatar — Design System Unooblog
 *
 * Retrato redondo de quem assina o post ou o comentário. Sem retrato — ou quando ele falha
 * ao carregar —, mostra as iniciais em `text-accent` sobre `background-subtle`,
 * com o mesmo nome acessível. `alt=""` o tira da árvore de acessibilidade
 * quando o nome já está escrito ao lado.
 *
 * É de cliente só para lembrar que o retrato falhou e cair nas iniciais.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, UblAvatarProps>(
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
      'ubl-avatar',
      isNumeric ? 'ubl-avatar--custom' : `ubl-avatar--${size}`,
      showImage ? '' : 'ubl-avatar--initials',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const customStyle = isNumeric
      ? ({ '--ubl-avatar-size': `${size}px`, ...style } as React.CSSProperties)
      : style;

    return (
      <span ref={ref} data-ubl-theme={theme} className={classes} style={customStyle} {...restProps}>
        {showImage ? (
          <img
            className="ubl-avatar__image"
            src={src}
            alt={accessibleName}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          <span
            className="ubl-avatar__initials"
            {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': accessibleName })}
          >
            {ublInitials(name)}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
