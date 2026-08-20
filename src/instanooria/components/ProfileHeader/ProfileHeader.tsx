import React from 'react';
import { Avatar } from '../Avatar';
import type { InstaProfileHeaderProps } from './ProfileHeader.types';
import './ProfileHeader.css';

/**
 * Componente ProfileHeader — Design System Instanooria
 *
 * Bloco "Account Info" da tela de perfil: avatar de 80px com anel, as três
 * estatísticas (publicações, seguidores e seguindo), o nome em negrito, a
 * biografia com menções e o site, além da faixa de ações de largura total.
 */
export const ProfileHeader = React.forwardRef<HTMLElement, InstaProfileHeaderProps>(
  (
    {
      avatarSrc,
      initials,
      avatarRing = 'story',
      avatarSize = 80,
      name,
      bio,
      website,
      websiteHref,
      stats = [],
      onStatClick,
      actions,
      theme = 'light',
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['insta-profile-header', className].filter(Boolean).join(' ');

    return (
      <section ref={ref} data-insta-theme={theme} className={classes} {...restProps}>
        <div className="insta-profile-header__top">
          <Avatar
            src={avatarSrc}
            alt=""
            initials={initials}
            size={avatarSize}
            ring={avatarRing}
            theme={theme}
          />

          {stats.length > 0 && (
            <div className="insta-profile-header__stats">
              {stats.map((stat, index) => (
                <button
                  key={stat.id}
                  type="button"
                  className={[
                    'insta-profile-header__stat',
                    onStatClick ? 'insta-profile-header__stat--interactive' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={onStatClick ? () => onStatClick(stat, index) : undefined}
                  tabIndex={onStatClick ? 0 : -1}
                >
                  <span className="insta-profile-header__stat-value">{stat.value}</span>
                  <span className="insta-profile-header__stat-label">{stat.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {(name || bio || website) && (
          <div className="insta-profile-header__bio">
            {name && <p className="insta-profile-header__name">{name}</p>}
            {bio && <p className="insta-profile-header__description">{bio}</p>}
            {website && (
              <a className="insta-profile-header__website" href={websiteHref ?? website}>
                {website}
              </a>
            )}
          </div>
        )}

        {actions && <div className="insta-profile-header__actions">{actions}</div>}
      </section>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';
