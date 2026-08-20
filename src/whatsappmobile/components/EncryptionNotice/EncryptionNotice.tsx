'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { WaEncryptionNoticeProps } from './EncryptionNotice.types';
import './EncryptionNotice.css';

const DEFAULT_TEXT =
  'Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them. Tap to learn more.';

/**
 * Componente EncryptionNotice — Design System WhatsApp Mobile
 *
 * Aviso de criptografia ponta a ponta exibido no topo de toda conversa.
 * Reproduz o cartão de 347px com raio de 5px, o cadeado de 11×14px e o texto
 * de 14px na cor bege `--wa-color-text-notice`.
 */
export const EncryptionNotice = React.forwardRef<HTMLElement, WaEncryptionNoticeProps>(
  ({ children = DEFAULT_TEXT, onClick, className = '', ...restProps }, ref) => {
    const body = (
      <>
        <span className="wa-encryptionnotice__icon">
          <Icon name="lock" size={12} tone="notice" />
        </span>
        <span className="wa-encryptionnotice__text">{children}</span>
      </>
    );

    const classes = ['wa-encryptionnotice', className].filter(Boolean).join(' ');

    // Quando há `onClick` o aviso vira um <button> real, e não uma <div> com
    // `role="button"`: assim Enter e Espaço o acionam nativamente, sem depender
    // de um handler de teclado próprio.
    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={classes}
          onClick={onClick}
          {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {body}
        </button>
      );
    }

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={classes} role="note" {...restProps}>
        {body}
      </div>
    );
  }
);

EncryptionNotice.displayName = 'EncryptionNotice';
