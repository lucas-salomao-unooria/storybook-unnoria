import React from 'react';
import { uniShortsLogo } from './ShortsLogoVector';
import type { UniShortsLogoProps } from './ShortsLogo.types';
import './ShortsLogo.css';

/**
 * Componente ShortsLogo — Design System Unootube
 *
 * Reproduz as duas formas do raio publicadas pelo arquivo "Free YouTube Shorts
 * Mockups (Community)": o raio maciço vermelho da marca (`1:737`) e o raio em
 * contorno monocromático da navegação (`I1:241;13:110`).
 *
 * Não são a mesma forma em cores diferentes — são dois vetores distintos, e é
 * por isso que a prop se chama `variant` e não `tone`. O maciço nunca vira
 * ícone de navegação; o de contorno nunca é pintado de vermelho.
 *
 * A forma `mono` herda `currentColor`, de modo que a cor venha do ancestral —
 * é assim que ela serve à aba ativa (tinta primária) e à inativa (secundária)
 * sem duplicar vetor.
 *
 * ATENÇÃO: o raio do Shorts é marca registrada do Google LLC e está presente
 * por fidelidade ao arquivo comunitário. Um produto que publique a biblioteca
 * deve substituir `ShortsLogoVector.ts` pela própria marca, como já vale para
 * o `Logo`.
 */
export const ShortsLogo = React.forwardRef<SVGSVGElement, UniShortsLogoProps>(
  ({ variant = 'brand', size = 20, title, className = '', style, ...restProps }, ref) => {
    const definition = uniShortsLogo[variant];
    const [, , width, height] = definition.viewBox.split(/\s+/).map(Number);

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    return (
      <svg
        ref={ref}
        className={['uni-shorts-logo', `uni-shorts-logo--${variant}`, className]
          .filter(Boolean)
          .join(' ')}
        viewBox={definition.viewBox}
        height={size}
        width={(width / height) * size}
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        {definition.shapes.map((shape, index) => (
          <path key={index} d={shape.d} fill={shape.fill ?? 'currentColor'} />
        ))}
      </svg>
    );
  }
);

ShortsLogo.displayName = 'ShortsLogo';
