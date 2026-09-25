import React from 'react';
import type { WaMessageTagProps } from './MessageTag.types';
import './MessageTag.css';

/**
 * Componente MessageTag — Design System WhatsApp Mobile
 *
 * Etiqueta de classificação presa a uma mensagem: pictograma mais rótulo, numa
 * cápsula neutra. Não tem variante de cor de propósito — quem distingue uma
 * etiqueta da outra é o rótulo e a forma do pictograma, para que a leitura não
 * dependa de enxergar cor.
 */
export const MessageTag = React.forwardRef<HTMLSpanElement, WaMessageTagProps>(
  ({ children, icon, className = '', ...restProps }, ref) => (
    <span
      ref={ref}
      className={['wa-messagetag', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {icon && (
        <span className="wa-messagetag__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="wa-messagetag__label">{children}</span>
    </span>
  )
);

MessageTag.displayName = 'MessageTag';
