import React from 'react';
import type { UncPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System Unoochat
 *
 * Contêiner de documentação com as medidas de tela do módulo (411×823). Serve
 * para apresentar telas compostas nas estórias; não é um componente de
 * produção.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, UncPhoneFrameProps>(
  ({ children, caption, scale = 1, bordered = true, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={[
        'unc-phoneframe',
        bordered ? 'unc-phoneframe--bordered' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...restProps}
    >
      <div
        className="unc-phoneframe__device"
        style={
          scale === 1
            ? undefined
            : { transform: `scale(${scale})`, marginBottom: `${823 * (scale - 1)}px` }
        }
      >
        {children}
      </div>
      {caption && <span className="unc-phoneframe__caption">{caption}</span>}
    </div>
  )
);

PhoneFrame.displayName = 'PhoneFrame';
