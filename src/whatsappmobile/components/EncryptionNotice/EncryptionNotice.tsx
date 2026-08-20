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
export const EncryptionNotice = React.forwardRef<HTMLDivElement, WaEncryptionNoticeProps>(
  ({ children = DEFAULT_TEXT, onClick, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-encryptionnotice', className].filter(Boolean).join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : 'note'}
      tabIndex={onClick ? 0 : undefined}
      {...restProps}
    >
      <span className="wa-encryptionnotice__icon">
        <Icon name="lock" size={12} tone="notice" />
      </span>
      <span className="wa-encryptionnotice__text">{children}</span>
    </div>
  )
);

EncryptionNotice.displayName = 'EncryptionNotice';
