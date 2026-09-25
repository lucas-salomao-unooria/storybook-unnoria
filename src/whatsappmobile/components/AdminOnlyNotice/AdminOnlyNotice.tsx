import React from 'react';
import { Icon } from '../Icon';
import type { WaAdminOnlyNoticeProps } from './AdminOnlyNotice.types';
import './AdminOnlyNotice.css';

/**
 * Componente AdminOnlyNotice — Design System WhatsApp Mobile
 *
 * Barra que substitui o compositor quando a pessoa não pode escrever no grupo.
 * Não é um compositor desabilitado: não há campo, glifo nem microfone que
 * pareçam tocáveis — é texto, e o leitor de tela o lê como texto.
 */
export const AdminOnlyNotice = React.forwardRef<HTMLDivElement, WaAdminOnlyNoticeProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['wa-adminonlynotice', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Icon name="lock" size={14} tone="inherit" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
);

AdminOnlyNotice.displayName = 'AdminOnlyNotice';
