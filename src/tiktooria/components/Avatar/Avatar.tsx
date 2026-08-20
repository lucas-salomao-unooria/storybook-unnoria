import React from 'react';
import { Icon } from '../Icon';
import type { TikAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System Tik Tooria
 *
 * Disco de raio total nos seis diâmetros do arquivo de design. Aceita
 * fotografia (`src`), glifo (`icon`) ou apenas cor de fundo (`background`), e
 * pode receber o anel branco de 1px do feed e o botão de seguir de 21px.
 *
 * As fotografias são bitmaps colados nos frames do Figma: foram exportadas para
 * `public/tiktooria/` e são informadas por prop, nunca embutidas no pacote.
 */
export const Avatar = React.forwardRef<HTMLDivElement, TikAvatarProps>(
  (
    {
      size = 'sm',
      src,
      alt = '',
      icon,
      background,
      ring = false,
      followable = false,
      followLabel = 'Seguir',
      onFollow,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => {
    const isNumericSize = typeof size === 'number';

    return (
      <div
        ref={ref}
        className={[
          'tik-avatar',
          isNumericSize ? '' : `tik-avatar--${size}`,
          ring ? 'tik-avatar--ring' : '',
          followable ? 'tik-avatar--followable' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...(isNumericSize ? { width: size, height: size } : {}),
          ...(background ? { background } : {}),
          ...style,
        }}
        {...restProps}
      >
        {src ? (
          <img className="tik-avatar__image" src={src} alt={alt} />
        ) : (
          icon && <span className="tik-avatar__icon">{icon}</span>
        )}

        {followable && (
          <button
            type="button"
            className="tik-avatar__follow"
            onClick={onFollow}
            aria-label={followLabel}
          >
            <Icon name="followPlus" size={21} />
          </button>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
