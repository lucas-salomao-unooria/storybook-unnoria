import React from 'react';
import type { WaPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System WhatsApp Mobile
 *
 * Contêiner de documentação que reproduz as medidas exatas dos frames do
 * arquivo Figma (411×823, Google Pixel 2 XL). Serve para apresentar telas
 * compostas nas estórias; não é um componente de produção.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, WaPhoneFrameProps>(
  ({ children, caption, scale = 1, bordered = true, className = '', style, ...restProps }, ref) => (
    <div
      ref={ref}
      className={[
        'wa-phoneframe',
        bordered ? 'wa-phoneframe--bordered' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...restProps}
    >
      <div
        className="wa-phoneframe__device"
        style={
          scale === 1
            ? undefined
            : { transform: `scale(${scale})`, marginBottom: `${823 * (scale - 1)}px` }
        }
      >
        {children}
      </div>
      {caption && <span className="wa-phoneframe__caption">{caption}</span>}
    </div>
  )
);

PhoneFrame.displayName = 'PhoneFrame';
