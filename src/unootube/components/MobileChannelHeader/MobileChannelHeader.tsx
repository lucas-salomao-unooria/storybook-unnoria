import React from 'react';
import { Avatar } from '../Avatar';
import type { UniMobileChannelHeaderProps } from './MobileChannelHeader.types';
import './MobileChannelHeader.css';

/**
 * Componente MobileChannelHeader — Design System Unootube
 *
 * Reproduz o bloco de identidade do canal nas telas móveis do arquivo "Free
 * YouTube Shorts Mockups (Community)" (`16:1080`): retrato de 77px, nome em
 * Roboto Regular 26, contagem de inscritos em 14 e a chamada de inscrição.
 *
 * A chamada de inscrição **não é um botão preenchido**: o arquivo a desenha
 * como texto vermelho puro (`16:1087`), diferente tanto do `SubscribeButton` da
 * área de trabalho (`#CC0000` sólido) quanto do botão do reprodutor de Shorts
 * (`#FF0000` sólido). São três alvos distintos no mesmo produto, e nenhum foi
 * consolidado.
 *
 * O componente não desenha o cromo: componha com `MobileHeader` acima dele,
 * como o arquivo faz.
 */
export const MobileChannelHeader = React.forwardRef<HTMLElement, UniMobileChannelHeaderProps>(
  (
    {
      avatarSrc,
      avatarInitials,
      channelName,
      subscriberCount,
      showSubscribe = true,
      subscribed = false,
      subscribeLabel = 'Subscribe',
      subscribedLabel = 'Subscribed',
      onSubscribe,
      sectionLabel,
      className = '',
      ...restProps
    },
    ref
  ) => (
    <header
      ref={ref}
      className={['uni-mobile-channel-header', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <div className="uni-mobile-channel-header__identity">
        <Avatar
          className="uni-mobile-channel-header__avatar"
          src={avatarSrc}
          initials={avatarInitials}
          size={77}
          alt=""
        />

        <div className="uni-mobile-channel-header__names">
          <h1 className="uni-mobile-channel-header__name">{channelName}</h1>
          {subscriberCount != null && (
            <span className="uni-mobile-channel-header__count">{subscriberCount}</span>
          )}
          {showSubscribe && (
            <button
              type="button"
              className={[
                'uni-mobile-channel-header__subscribe',
                subscribed ? 'uni-mobile-channel-header__subscribe--subscribed' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={subscribed}
              onClick={onSubscribe}
            >
              {subscribed ? subscribedLabel : subscribeLabel}
            </button>
          )}
        </div>
      </div>

      {sectionLabel != null && (
        <h2 className="uni-mobile-channel-header__section">{sectionLabel}</h2>
      )}
    </header>
  )
);

MobileChannelHeader.displayName = 'MobileChannelHeader';
