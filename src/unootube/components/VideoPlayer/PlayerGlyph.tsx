import React from 'react';
import {
  uniPlayerGlyphs,
  type UniPlayerGlyphDefinition,
  type UniPlayerGlyphName,
} from './PlayerGlyphs';

/**
 * Renderiza um glifo de controle do reprodutor a partir da geometria literal
 * lida do arquivo.
 *
 * O traço de 1px em preto a 10% é o que o arquivo declara em cada nó — é o que
 * mantém o glifo legível sobre quadros de vídeo claros, e por isso é
 * reproduzido em vez de descartado.
 */
export const PlayerGlyph: React.FC<{
  name: UniPlayerGlyphName;
  height: number;
  className?: string;
}> = ({ name, height, className }) => {
  /*
   * O registro é declarado com `as const` para preservar os valores literais
   * na documentação, o que faz o TypeScript estreitar cada entrada ao seu
   * formato exato. A anotação larga a assinatura de volta para a interface
   * comum, onde `rects`, `fill` e `transform` são opcionais.
   */
  const glyph: UniPlayerGlyphDefinition = uniPlayerGlyphs[name];
  const width = (glyph.width / glyph.height) * height;

  return (
    <svg
      className={['uni-player-glyph', className].filter(Boolean).join(' ')}
      width={width}
      height={height}
      viewBox={`0 0 ${glyph.width} ${glyph.height}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {glyph.rects?.map((rect, index) => (
        <rect
          key={`rect-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          rx={rect.rx}
          fill={rect.fill}
        />
      ))}
      {glyph.shapes.map((shape, index) => (
        <path
          key={`path-${index}`}
          d={shape.d}
          transform={shape.transform}
          className="uni-player-glyph__shape"
          fill={shape.fill ?? 'currentColor'}
          fillRule={shape.evenOdd ? 'evenodd' : undefined}
          clipRule={shape.evenOdd ? 'evenodd' : undefined}
        />
      ))}
    </svg>
  );
};

PlayerGlyph.displayName = 'PlayerGlyph';
