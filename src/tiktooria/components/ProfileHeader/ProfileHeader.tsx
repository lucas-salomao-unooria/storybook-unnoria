import React from 'react';
import { Avatar } from '../Avatar';
import { StatTile } from '../StatTile';
import type { TikProfileHeaderProps } from './ProfileHeader.types';
import './ProfileHeader.css';

/**
 * Componente ProfileHeader — Design System Tik Tooria
 *
 * Cabeçalho de 414×318 da tela "TikTok User" (node 4:477): fotografia de 96px,
 * identificador em Semibold 17, as três métricas, a faixa de ações e a
 * biografia. O fio inferior de 0,33px é a sombra `--tik-elevation-bar-bottom`.
 */
export const ProfileHeader = React.forwardRef<HTMLElement, TikProfileHeaderProps>(
  (
    {
      handle,
      avatarSrc,
      avatarAlt = '',
      stats = [],
      bio,
      actions,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['tik-profileheader', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Avatar size="xxl" src={avatarSrc} alt={avatarAlt} />
      <p className="tik-profileheader__handle">{handle}</p>

      {stats.length > 0 && (
        <div className="tik-profileheader__stats">
          {stats.map((stat, index) => (
            <StatTile key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      )}

      {actions && <div className="tik-profileheader__actions">{actions}</div>}
      {bio && <p className="tik-profileheader__bio">{bio}</p>}
    </header>
  )
);

ProfileHeader.displayName = 'ProfileHeader';
