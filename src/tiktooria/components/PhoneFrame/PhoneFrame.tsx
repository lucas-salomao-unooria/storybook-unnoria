import React from 'react';
import type { TikPhoneFrameProps } from './PhoneFrame.types';
import './PhoneFrame.css';

/**
 * Componente PhoneFrame — Design System Tik Tooria
 *
 * Contêiner de **documentação** que reproduz o frame de 414×896 (iPhone XR/11)
 * usado pelas 15 telas do arquivo Figma. Não é um componente de produção: sua
 * função é dar às estórias o mesmo palco do arquivo de design, com a mesma
 * relação de aspecto e o mesmo recorte de conteúdo.
 */
export const PhoneFrame = React.forwardRef<HTMLDivElement, TikPhoneFrameProps>(
  ({ surface = 'chrome', label, scale = 1, className = '', children, style, ...restProps }, ref) => (
    <figure className="tik-phoneframe__wrapper" style={{ width: 414 * scale }}>
      <div
        ref={ref}
        className={['tik-phoneframe', `tik-phoneframe--${surface}`, className]
          .filter(Boolean)
          .join(' ')}
        data-tik-surface={surface}
        style={{ transform: scale === 1 ? undefined : `scale(${scale})`, ...style }}
        {...restProps}
      >
        {children}
      </div>
      {label && <figcaption className="tik-phoneframe__label">{label}</figcaption>}
    </figure>
  )
);

PhoneFrame.displayName = 'PhoneFrame';
