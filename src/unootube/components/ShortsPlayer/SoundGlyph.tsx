import React from 'react';

/**
 * Barras do glifo de som do reprodutor de Shorts.
 *
 * O arquivo não desenha este glifo como vetor: são **cinco retângulos**
 * posicionados dentro do quadro de 36px do botão de som (nodes `3:240` a
 * `3:244`), cada um com raio de 4px. As coordenadas abaixo são a conversão
 * direta dos `inset` percentuais do nó para o quadro de 36 — nenhuma foi
 * arredondada nem redistribuída em uma progressão calculada.
 *
 * Ficam aqui, e não no registro de ícones, porque o registro guarda caminhos
 * (`d`) e este glifo não tem caminho no arquivo. É o mesmo tratamento que o
 * `PlayerGlyphs` dá aos retângulos do selo HD.
 */
const BARS: { x: number; y: number; height: number }[] = [
  { x: 9, y: 15, height: 6 }, // 3:242
  { x: 13, y: 12, height: 12 }, // 3:241
  { x: 17, y: 8, height: 20 }, // 3:240
  { x: 21, y: 12, height: 12 }, // 3:244
  { x: 25, y: 15, height: 6 }, // 3:243
];

/**
 * Glifo de equalizador do botão de som (node `3:239`).
 *
 * Herda `currentColor` para que o mesmo glifo sirva ao botão sobre o vídeo
 * (branco) e a um eventual uso sobre superfície clara.
 */
export const SoundGlyph: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className,
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    {BARS.map((bar) => (
      <rect
        key={bar.x}
        x={bar.x}
        y={bar.y}
        width={2}
        height={bar.height}
        rx={1}
        fill="currentColor"
      />
    ))}
  </svg>
);

SoundGlyph.displayName = 'SoundGlyph';
