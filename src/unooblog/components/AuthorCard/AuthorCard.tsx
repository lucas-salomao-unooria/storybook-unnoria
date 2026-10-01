'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { formatFollowers } from './formatFollowers';
import type { UblAuthorCardProps } from './AuthorCard.types';
import './AuthorCard.css';

/**
 * Componente AuthorCard — Design System Unooblog
 *
 * Cartão de autoria, sempre presente no blog. Na disposição `card`: avatar
 * grande, nome, cargo, seguidores ("1,2 mil seguidores"), bio e o botão
 * Seguir/Seguindo. Na `inline`: avatar médio, nome, cargo e botão em uma linha,
 * sem fundo, para cabeçalhos e listas.
 *
 * O botão de seguir é um alternador (`aria-pressed`): o texto muda entre
 * "Seguir" e "Seguindo", o glifo entre `follow` e `following`, e o nome do autor
 * o descreve (`aria-describedby`), de modo que "Seguir" nunca fica sem dono.
 * Com `href`, o nome é o alvo do cartão inteiro e o botão fica acima dele, sem
 * abrir o perfil. Marcado como Client Component porque repassa funções.
 */
export const AuthorCard = React.forwardRef<HTMLElement, UblAuthorCardProps>(
  (
    {
      name,
      role,
      bio,
      avatarSrc,
      followers,
      following = false,
      onToggleFollow,
      href,
      layout = 'card',
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const nameId = React.useId();
    const isCard = layout === 'card';
    const classes = [
      'ubl-author-card',
      `ubl-author-card--${layout}`,
      href ? 'ubl-author-card--interactive' : '',
      following ? 'ubl-author-card--following' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const heading = href ? (
      <a className="ubl-author-card__link" href={href}>
        {name}
      </a>
    ) : (
      name
    );

    const followButton = onToggleFollow && (
      <div className="ubl-author-card__follow">
        <Button
          variant={following ? 'secondary' : 'primary'}
          size="sm"
          iconStart={following ? 'following' : 'follow'}
          aria-pressed={following}
          aria-describedby={nameId}
          onClick={() => onToggleFollow(!following)}
        >
          {following ? 'Seguindo' : 'Seguir'}
        </Button>
      </div>
    );

    return (
      <article
        ref={ref}
        data-ubl-theme={theme}
        className={classes}
        aria-labelledby={nameId}
        {...restProps}
      >
        <div className="ubl-author-card__inner">
        <Avatar src={avatarSrc} name={name} size={isCard ? 'xl' : 'md'} alt="" />
        <div className="ubl-author-card__content">
          <div className="ubl-author-card__identity">
            <p id={nameId} className="ubl-author-card__name">
              {heading}
            </p>
            {role && <p className="ubl-author-card__role">{role}</p>}
            {isCard && typeof followers === 'number' && (
              <p className="ubl-author-card__followers">
                <Icon name="person" size="xs" tone="inherit" />
                {formatFollowers(followers)}
              </p>
            )}
          </div>
          {isCard && bio && <p className="ubl-author-card__bio">{bio}</p>}
          {isCard && followButton}
        </div>
        {!isCard && followButton}
        </div>
      </article>
    );
  }
);

AuthorCard.displayName = 'AuthorCard';
