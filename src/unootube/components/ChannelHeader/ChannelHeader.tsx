'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { SubscribeButton } from '../SubscribeButton';
import type { UniChannelHeaderProps } from './ChannelHeader.types';
import './ChannelHeader.css';

/**
 * Componente ChannelHeader — Design System Unootube
 *
 * Reproduz o nó `Channel` (`17:2796`), o cabeçalho que abre a tela de canal.
 *
 * A barra de abas do arquivo **não** usa a pílula do `TopMenuItem`: usa apenas
 * o rótulo, e marca a aba ativa com um fio de 1px em `--uni-color-border-active`
 * na base — a única aparição desse padrão de sublinhado em todo o arquivo. Por
 * isso as abas são montadas aqui, e não compostas com `TopMenuItem`.
 *
 * O nome do canal usa Roboto **Regular** 24, o corpo do degrau Heading/H1, mas
 * sem o peso Bold que o degrau declara.
 */
export const ChannelHeader = React.forwardRef<HTMLElement, UniChannelHeaderProps>(
  (
    {
      coverSrc,
      coverAlt = '',
      avatarSrc,
      avatarInitials,
      channelName,
      subscriberCount,
      channelHandle,
      secondaryLine,
      showTabArrows = false,
      subscribed = false,
      onSubscribe,
      tabs = [],
      activeTabId,
      onSelectTab,
      showSearch = true,
      onSearch,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const tabsRef = React.useRef<HTMLDivElement | null>(null);

    /*
     * As setas rolam a faixa de verdade. O arquivo as desenha como decoração
     * sobre um quadro estático em que as abas já estão cortadas na aresta; sem
     * a rolagem, as abas além da borda ficariam inalcançáveis.
     */
    const scrollTabs = (direction: -1 | 1) => {
      const track = tabsRef.current;
      if (!track) return;
      track.scrollBy({ left: direction * Math.max(160, track.clientWidth * 0.6), behavior: 'smooth' });
    };

    return (
    <header
      ref={ref}
      className={['uni-channel-header', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-channel-header__cover">
        {coverSrc && (
          <img className="uni-channel-header__cover-image" src={coverSrc} alt={coverAlt} />
        )}
      </div>

      <div className="uni-channel-header__identity">
        <div className="uni-channel-header__avatar">
          <Avatar src={avatarSrc} initials={avatarInitials} size="2xl" alt="" />
        </div>

        <div className="uni-channel-header__names">
          <h1 className="uni-channel-header__name">{channelName}</h1>
          {channelHandle != null && (
            <span className="uni-channel-header__handle">{channelHandle}</span>
          )}
          {subscriberCount != null && (
            <span className="uni-channel-header__subscribers">{subscriberCount}</span>
          )}
          {secondaryLine != null && (
            <span className="uni-channel-header__secondary">{secondaryLine}</span>
          )}
        </div>

        <div className="uni-channel-header__action">
          <SubscribeButton subscribed={subscribed} onClick={onSubscribe} />
        </div>
      </div>

      {(tabs.length > 0 || showSearch) && (
        <div className="uni-channel-header__toolbar">
          {showTabArrows && tabs.length > 0 && (
            <button
              type="button"
              className="uni-channel-header__arrow"
              aria-label="Abas anteriores"
              onClick={() => scrollTabs(-1)}
            >
              <Icon name="arrowTop" size="lg" rotate={-90} />
            </button>
          )}

          <div
            ref={tabsRef}
            className="uni-channel-header__tabs"
            role="tablist"
            aria-label="Seções do canal"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTabId}
                className={[
                  'uni-channel-header__tab',
                  tab.id === activeTabId ? 'uni-channel-header__tab--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onSelectTab?.(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {showTabArrows && tabs.length > 0 && (
            <button
              type="button"
              className="uni-channel-header__arrow"
              aria-label="Próximas abas"
              onClick={() => scrollTabs(1)}
            >
              <Icon name="arrowTop" size="lg" rotate={90} />
            </button>
          )}

          {showSearch && (
            <button
              type="button"
              className="uni-channel-header__search"
              aria-label="Buscar neste canal"
              onClick={onSearch}
            >
              <Icon name="search" size="lg" tone="primary" />
            </button>
          )}
        </div>
      )}
    </header>
    );
  }
);

ChannelHeader.displayName = 'ChannelHeader';
