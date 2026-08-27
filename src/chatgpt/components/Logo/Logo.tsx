import React from 'react';
import type { GptLogoProps } from './Logo.types';
import { GPT_LOGO_GAP, gptLogoMark, gptLogoWordmark } from './LogoVector';
import './Logo.css';

/** Largura total da composição horizontal no arquivo — 220px. */
const HORIZONTAL_WIDTH = gptLogoMark.width + GPT_LOGO_GAP + gptLogoWordmark.width;

/**
 * Componente Logo — Design System ChatGPT
 *
 * Reproduz a instância `ChatGPTLogo` do quadro `New chat - V1 - A`: a marca de
 * 64,39 × 64 e o wordmark de 139,51 × 24, separados por 16,1px e centrados na
 * altura da marca. Os dois vetores são o export literal do arquivo e usam
 * `currentColor`, que é o que faz o logotipo virar branco no tema escuro sem
 * um segundo ativo.
 *
 * MARCA REGISTRADA — ver a nota em `LogoVector.ts`.
 */
export const Logo = React.forwardRef<SVGSVGElement, GptLogoProps>(
  (
    {
      variant = 'horizontal',
      height = 64,
      title = 'ChatGPT',
      decorative = false,
      theme,
      className = '',
      ...restProps
    },
    ref
  ) => {
    const classes = ['gpt-logo', `gpt-logo--${variant}`, className].filter(Boolean).join(' ');
    const label = decorative ? undefined : title;

    const geometry =
      variant === 'mark'
        ? { viewBox: gptLogoMark.viewBox, ratio: gptLogoMark.width / gptLogoMark.height }
        : variant === 'wordmark'
          ? {
              viewBox: gptLogoWordmark.viewBox,
              ratio: gptLogoWordmark.width / gptLogoWordmark.height,
            }
          : {
              viewBox: `0 0 ${HORIZONTAL_WIDTH} ${gptLogoMark.height}`,
              ratio: HORIZONTAL_WIDTH / gptLogoMark.height,
            };

    return (
      <svg
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        width={height * geometry.ratio}
        height={height}
        viewBox={geometry.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={label ? 'img' : undefined}
        aria-hidden={label ? undefined : true}
        focusable="false"
        {...restProps}
      >
        {label && <title>{label}</title>}

        {variant !== 'wordmark' && (
          <path d={gptLogoMark.path} fill="currentColor" />
        )}

        {variant !== 'mark' && (
          <g
            transform={
              variant === 'horizontal'
                ? `translate(${gptLogoMark.width + GPT_LOGO_GAP}, ${
                    (gptLogoMark.height - gptLogoWordmark.height) / 2
                  })`
                : undefined
            }
          >
            {gptLogoWordmark.paths.map((d, index) => (
              <path key={index} d={d} fill="currentColor" />
            ))}
          </g>
        )}
      </svg>
    );
  }
);

Logo.displayName = 'Logo';
