import React from 'react';
import type { UncMessageTagProps } from './MessageTag.types';
import './MessageTag.css';

/**
 * Componente MessageTag — Design System Unoochat
 *
 * Etiqueta de classificação presa a uma mensagem: pictograma mais rótulo, numa
 * cápsula neutra. Não tem variante de cor de propósito — quem distingue uma
 * etiqueta da outra é o rótulo e a forma do pictograma, para que a leitura não
 * dependa de enxergar cor.
 */
export const MessageTag = React.forwardRef<HTMLSpanElement, UncMessageTagProps>(
  ({ children, icon, className = '', ...restProps }, ref) => (
    <span
      ref={ref}
      className={['unc-messagetag', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {icon && (
        <span className="unc-messagetag__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="unc-messagetag__label">{children}</span>
    </span>
  )
);

MessageTag.displayName = 'MessageTag';
