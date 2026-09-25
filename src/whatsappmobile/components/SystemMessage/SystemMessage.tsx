import React from 'react';
import type { WaSystemMessageProps } from './SystemMessage.types';
import './SystemMessage.css';

/**
 * Componente SystemMessage — Design System WhatsApp Mobile
 *
 * Aviso de sistema centrado no fluxo da conversa, com a superfície e o texto da
 * etiqueta de data. Difere do `DateChip` em uma coisa só: quebra linha. A
 * etiqueta de data tem altura fixa de 27px, e um aviso de sistema tem uma frase.
 */
export const SystemMessage = React.forwardRef<HTMLParagraphElement, WaSystemMessageProps>(
  ({ children, className = '', ...restProps }, ref) => (
    <p
      ref={ref}
      className={['wa-systemmessage', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </p>
  )
);

SystemMessage.displayName = 'SystemMessage';
