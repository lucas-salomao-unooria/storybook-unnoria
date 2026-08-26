import React from 'react';
import type { UniAvatarProps } from './Avatar.types';
import './Avatar.css';

/**
 * Componente Avatar — Design System Unootube
 *
 * Reproduz o nó `Avatar/UserAvatar` (`7:58`): um quadrado com raio total
 * preenchido por bitmap. O arquivo instancia o mesmo componente em seis
 * diâmetros, todos preservados na prop `size`.
 *
 * Os retratos são bitmaps colados nos frames e não integram o pacote — devem
 * ser informados por `src`. Sem `src`, o componente exibe um substituto com
 * iniciais sobre `--uni-color-background-surface`, extensão necessária para que
 * o avatar nunca renderize um vazio quebrado.
 */
export const Avatar = React.forwardRef<HTMLSpanElement, UniAvatarProps>(
  ({ src, alt = '', size = 'xs', initials, className = '', style, ...restProps }, ref) => {
    const isNumericSize = typeof size === 'number';

    const classes = [
      'uni-avatar',
      isNumericSize ? '' : `uni-avatar--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        style={isNumericSize ? { width: size, height: size, ...style } : style}
        {...restProps}
      >
        {src ? (
          <img className="uni-avatar__image" src={src} alt={alt} />
        ) : (
          <span className="uni-avatar__initials" aria-hidden={!initials}>
            {initials}
          </span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
