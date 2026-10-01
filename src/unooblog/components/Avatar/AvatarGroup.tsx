import React from 'react';
import { Avatar } from './Avatar';
import type { UblAvatarGroupProps } from './Avatar.types';
import './Avatar.css';

const NAMED_SIZE: Record<string, string> = {
  sm: 'var(--ubl-avatar-sm)',
  md: 'var(--ubl-avatar-md)',
  lg: 'var(--ubl-avatar-lg)',
  xl: 'var(--ubl-avatar-xl)',
};

/**
 * Componente AvatarGroup — Design System Unooblog
 *
 * Pilha de retratos sobrepostos (quem comenta, quem segue a série). Mostra até
 * `max` retratos e um contador "+N" para o resto. O grupo é um `role="group"`
 * com o nome de todas as pessoas, e os retratos individuais saem da árvore de
 * acessibilidade (`alt=""`) para o leitor de tela não repetir cada nome.
 *
 * Só recebe props e renderiza markup: é Server Component.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, UblAvatarGroupProps>(
  ({ avatars, max = 4, size = 'md', theme, className = '', style, ...restProps }, ref) => {
    const limit = Math.max(1, Math.floor(max));
    const visible = avatars.slice(0, limit);
    const hidden = avatars.length - visible.length;
    const diameter = typeof size === 'number' ? `${size}px` : NAMED_SIZE[size];
    const names = avatars.map((avatar) => avatar.name).join(', ');
    const label = restProps['aria-label'] ?? (names ? `Pessoas: ${names}` : undefined);

    return (
      <div
        ref={ref}
        role="group"
        data-ubl-theme={theme}
        className={['ubl-avatar-group', className].filter(Boolean).join(' ')}
        style={{ '--ubl-avatar-group-size': diameter, ...style } as React.CSSProperties}
        {...restProps}
        aria-label={label}
      >
        {visible.map((avatar, index) => (
          <Avatar
            key={`${avatar.name}-${index}`}
            className="ubl-avatar-group__item"
            name={avatar.name}
            src={avatar.src}
            alt=""
            size={size}
          />
        ))}
        {hidden > 0 && (
          <span className="ubl-avatar-group__more" aria-hidden="true">
            +{hidden}
          </span>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
