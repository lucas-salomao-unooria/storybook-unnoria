import React from 'react';
import type { GptIconProps } from './Icon.types';
import { gptIcons } from './IconPaths';
import type { GptIconDefinition } from './IconPaths';
import './Icon.css';

/**
 * Componente Icon — Design System ChatGPT
 *
 * Desenha um dos treze vetores literais exportados da tela
 * `New chat - V1 - A` do Figma (`681:2796`). O `viewBox` de cada glifo é o do
 * nó de origem — 16, 24 ou 32 — e **não** foi normalizado; a prop `size`
 * governa a aresta do alvo quadrado renderizado.
 *
 * O preenchimento é `currentColor`, de modo que o mesmo vetor sirva ao texto
 * primário das linhas, ao branco sobre o botão de nova conversa e ao preto
 * translúcido do botão de enviar — os três casos do arquivo.
 */
export const Icon = React.forwardRef<SVGSVGElement, GptIconProps>(
  ({ name, size = 24, title, theme, className = '', ...restProps }, ref) => {
    const definition: GptIconDefinition = gptIcons[name];
    const classes = ['gpt-icon', className].filter(Boolean).join(' ');

    return (
      <svg
        ref={ref}
        data-gpt-theme={theme}
        className={classes}
        width={size}
        height={size}
        viewBox={definition.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={title ? 'img' : undefined}
        aria-hidden={title ? undefined : true}
        focusable="false"
        {...restProps}
      >
        {title && <title>{title}</title>}
        {definition.paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill="currentColor"
            fillRule={path.fillRule}
            clipRule={path.fillRule}
          />
        ))}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
