'use client';

import React from 'react';
import type { UglAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Iniciais do nome: a primeira letra da primeira palavra e a da última, por
 * code point (um nome que começa com letra acentuada ou emoji não é cortado).
 */
export const uglInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = Array.from(words[0])[0] ?? '';
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] ?? '' : '';
  return `${first}${last}`.toLocaleUpperCase('pt-BR');
};

/**
 * Componente Avatar — Design System Unoogaleria
 *
 * Retrato redondo de uma pessoa: pessoas reconhecidas na busca, contatos no
 * compartilhamento, rostos no painel de informações. O `name` é o texto
 * alternativo; sem retrato — ou quando ele falha ao carregar —, o avatar mostra
 * as iniciais em `text-accent` sobre `background-tertiary`, com o mesmo nome
 * acessível. `decorative` o tira da árvore de acessibilidade quando o nome já
 * está escrito ao lado.
 *
 * É de cliente só para lembrar que o retrato falhou e cair nas iniciais.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, UglAvatarProps>(
  (
    {
      src,
      name,
      size = 'md',
      ring = false,
      decorative = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const [failedSrc, setFailedSrc] = React.useState<string | null>(null);
    const showImage = Boolean(src) && failedSrc !== src;

    const classes = [
      'ugl-avatar',
      `ugl-avatar--${size}`,
      ring ? 'ugl-avatar--ring' : '',
      showImage ? '' : 'ugl-avatar--initials',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} data-ugl-theme={theme} className={classes} {...restProps}>
        {showImage ? (
          <img
            className="ugl-avatar__image"
            src={src}
            alt={decorative ? '' : name}
            loading="lazy"
            decoding="async"
            draggable={false}
            onError={() => setFailedSrc(src ?? null)}
          />
        ) : (
          <span
            className="ugl-avatar__initials"
            {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': name })}
          >
            {uglInitials(name)}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
