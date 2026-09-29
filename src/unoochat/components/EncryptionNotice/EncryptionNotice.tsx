'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UncEncryptionNoticeProps } from './EncryptionNotice.types';
import './EncryptionNotice.css';

const DEFAULT_TEXT =
  'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta. Ninguém de fora desta conversa, nem mesmo a Unooria, pode lê-las ou ouvi-las. Toque para saber mais.';

/**
 * Componente EncryptionNotice — Design System Unoochat
 *
 * Aviso de criptografia ponta a ponta exibido no topo de toda conversa. Cartão
 * de 347px com raio de 5px, cadeado de 11×14px e texto em
 * `--unc-font-label-sm-*` na cor `--unc-color-text-notice`.
 */
export const EncryptionNotice = React.forwardRef<HTMLElement, UncEncryptionNoticeProps>(
  ({ children = DEFAULT_TEXT, onClick, className = '', ...restProps }, ref) => {
    const body = (
      <>
        <span className="unc-encryptionnotice__icon">
          <Icon name="lock" size={14} tone="notice" />
        </span>
        <span className="unc-encryptionnotice__text">{children}</span>
      </>
    );

    const classes = ['unc-encryptionnotice', className].filter(Boolean).join(' ');

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
