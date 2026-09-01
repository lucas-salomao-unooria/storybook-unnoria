import React from 'react';
import {
  UNI_LOGO_BADGE_PATH,
  UNI_LOGO_GLYPH_PATH,
  UNI_LOGO_VIEWBOX,
  UNI_LOGO_WORDMARK_PATHS,
} from './LogoVector';
import type { UniLogoProps } from './Logo.types';
import './Logo.css';

/** `viewBox` recortado da variante que exibe apenas o emblema. */
const BADGE_VIEWBOX = '0 0 28.5701 20';

/**
 * Componente Logo — Design System Unootube
 *
 * Lockup da marca Unooria: o emblema com a geometria literal do nó
 * `Brand/YoutubeLogo` (`2:88`), pintado com o azul `--uni-color-brand-logo`
 * (`#005CE6`), e o logotipo tipográfico “Unootube” contornado em Roboto Bold —
 * ver `LogoVector.ts`. O `viewBox` do lockup completo é 109,83 × 20.
 *
 * O logotipo tipográfico herda `currentColor` e resolve para
 * `--uni-color-text-primary`, de modo que acompanha o tema; só o emblema é
 * invariante. O desvio está registrado na estória do componente.
 */
export const Logo = React.forwardRef<SVGSVGElement, UniLogoProps>(
  ({ variant = 'full', height = 20, title = 'Unootube', className = '', style, ...restProps }, ref) => {
    const isBadge = variant === 'badge';
    const viewBox = isBadge ? BADGE_VIEWBOX : UNI_LOGO_VIEWBOX;
    const [, , viewWidth, viewHeight] = viewBox.split(' ').map(Number);

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        className={['uni-logo', className].filter(Boolean).join(' ')}
        viewBox={viewBox}
        style={{ height, width: (viewWidth / viewHeight) * height, ...style }}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        <path className="uni-logo__badge" d={UNI_LOGO_BADGE_PATH} />
        <path className="uni-logo__glyph" d={UNI_LOGO_GLYPH_PATH} />
        {!isBadge &&
          UNI_LOGO_WORDMARK_PATHS.map((d, index) => (
            <path key={index} className="uni-logo__wordmark" d={d} />
          ))}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
