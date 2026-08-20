'use client';

import React from 'react';
import type { UniSubscribeButtonProps } from './SubscribeButton.types';
import './SubscribeButton.css';

/**
 * Componente SubscribeButton — Design System Unitube
 *
 * Reproduz o nó `Channel/Subscribes-Btn`, o único botão preenchido do arquivo.
 * Aparece com geometria idêntica no cabeçalho de canal (`17:2796`) e na
 * descrição do vídeo (`20:2989`): 116×36, recuo 10/16, raio de 2px e
 * preenchimento `#CC0000` — a primitiva `red/700`, e não o vermelho semântico
 * `red/500`.
 *
 * Declara `'use client'` porque expõe `aria-pressed` e recebe manipuladores de
 * evento do consumidor.
 */
export const SubscribeButton = React.forwardRef<HTMLButtonElement, UniSubscribeButtonProps>(
  (
    {
      label = 'Subscribes',
      subscribed = false,
      subscribedLabel = 'Subscribed',
      className = '',
      ...restProps
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={subscribed}
      className={[
        'uni-subscribe-button',
        subscribed ? 'uni-subscribe-button--subscribed' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {subscribed ? subscribedLabel : label}
    </button>
  )
);

SubscribeButton.displayName = 'SubscribeButton';
