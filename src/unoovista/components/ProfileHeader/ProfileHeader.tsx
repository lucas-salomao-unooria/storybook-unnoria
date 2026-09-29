'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import type { UnvProfileHeaderProps } from './ProfileHeader.types';
import './ProfileHeader.css';

/**
 * Componente ProfileHeader — Design System Unoovista
 *
 * Cabeçalho do perfil numa composição centralizada, em cartão de superfície
 * primária: avatar grande no topo (com anel quando há história), nome com selo
 * de conta oficial, biografia, site, três cartões-pílula de estatística lado a
 * lado e as ações em largura total.
 */
export const ProfileHeader = React.forwardRef<HTMLElement, UnvProfileHeaderProps>(
  (
    {
      avatarSrc,
      initials,
      avatarRing = 'story',
      avatarSize = 80,
      name,
      verified = false,
      bio,
      website,
      websiteHref,
      stats = [],
      onStatClick,
      actions,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['unv-profile-header', className].filter(Boolean).join(' ');

    return (
      <section ref={ref} data-unv-theme={theme} className={classes} {...restProps}>
        <Avatar
          src={avatarSrc}
          alt=""
          initials={initials}
          size={avatarSize}
          ring={avatarRing}
          theme={theme}
        />

        {(name || bio || website) && (
          <div className="unv-profile-header__bio">
            {name && (
              <div className="unv-profile-header__name-row">
                <p className="unv-profile-header__name">{name}</p>
                {verified && (
                  <Icon
                    name="verified"
                    size="sm"
                    tone="inherit"
                    title="Conta oficial"
                    className="unv-profile-header__verified"
                    theme={theme}
                  />
                )}
              </div>
            )}
            {bio && <p className="unv-profile-header__description">{bio}</p>}
            {website && (
              <a className="unv-profile-header__website" href={websiteHref ?? website}>
                {website}
              </a>
            )}
          </div>
        )}

        {stats.length > 0 && (
          <div className="unv-profile-header__stats">
            {stats.map((stat, index) => {
              const content = (
                <>
                  <span className="unv-profile-header__stat-value">{stat.value}</span>
                  <span className="unv-profile-header__stat-label">{stat.label}</span>
                </>
              );

              return onStatClick ? (
                <button
                  key={stat.id}
                  type="button"
                  className="unv-profile-header__stat unv-profile-header__stat--interactive"
                  onClick={() => onStatClick(stat, index)}
                >
                  {content}
                </button>
              ) : (
                <div key={stat.id} className="unv-profile-header__stat">
                  {content}
                </div>
              );
            })}
          </div>
        )}

        {actions && <div className="unv-profile-header__actions">{actions}</div>}
      </section>
    );
  }
);

ProfileHeader.displayName = 'ProfileHeader';
