import React from 'react';
import { tikSocialLogos } from './LogoVectors';
import type { TikLogoShape } from './LogoVectors';
import type { TikSocialLogoProps } from './SocialLogo.types';
import './SocialLogo.css';

const renderShape = (shape: TikLogoShape, index: number): React.ReactElement => {
  if (shape.type === 'circle') {
    return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.fill} />;
  }

  if (shape.type === 'ellipse') {
    return (
      <ellipse key={index} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} fill={shape.fill} />
    );
  }

  return (
    <path
      key={index}
      d={shape.d}
      fill={shape.fill}
      fillRule={shape.evenOdd ? 'evenodd' : undefined}
      clipRule={shape.evenOdd ? 'evenodd' : undefined}
    />
  );
};

/**
 * Componente SocialLogo — Design System Tik Tooria
 *
 * Os seis logotipos de terceiros presentes no arquivo de design: WhatsApp,
 * Messenger, Message, SMS, Instagram e Facebook. Todos são vetores literais do
 * Figma; nenhum foi redesenhado.
 *
 * A paleta destes logotipos é exclusiva da folha de compartilhamento e da tela
 * "Find friends" — é proibido reaproveitá-la em qualquer outro componente.
 */
export const SocialLogo = React.forwardRef<SVGSVGElement, TikSocialLogoProps>(
  ({ brand, size = 47, title, className = '', ...restProps }, ref) => {
    const definition = tikSocialLogos[brand];

    if (!definition) {
      return null;
    }

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        data-tik-logo={brand}
        className={['tik-sociallogo', className].filter(Boolean).join(' ')}
        viewBox={definition.viewBox}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}

        {definition.radialGradientId && (
          <defs>
            <radialGradient
              id={definition.radialGradientId}
              cx="0.3"
              cy="1.07"
              r="1.1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0" stopColor="var(--tik-color-social-instagram-start)" />
              <stop offset="0.1" stopColor="var(--tik-color-social-instagram-start)" />
              <stop offset="0.5" stopColor="var(--tik-color-social-instagram-mid)" />
              <stop offset="1" stopColor="var(--tik-color-social-instagram-end)" />
            </radialGradient>
          </defs>
        )}

        {definition.shapes.map(renderShape)}
      </svg>
    );
  }
);

SocialLogo.displayName = 'SocialLogo';
