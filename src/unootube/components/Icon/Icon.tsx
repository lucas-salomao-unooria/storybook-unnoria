import React from 'react';
import { uniIcons } from './IconPaths';
import type { UniIconProps } from './Icon.types';
import './Icon.css';

/** Deriva a razão largura/altura do `viewBox` literal do export. */
const aspectOf = (viewBox: string): number => {
  const [, , width, height] = viewBox.split(/\s+/).map(Number);
  return height > 0 ? width / height : 1;
};

/**
 * Componente Icon — Design System Unootube
 *
 * Renderiza os 52 glifos oficiais exportados dos dois arquivos Figma de origem.
 * Cada glifo preserva o `viewBox` original do export e o atributo `d` literal —
 * nenhum caminho foi desenhado à mão nem substituído por outra biblioteca.
 *
 * A prop `size` governa a **altura**; a largura é derivada da razão do
 * `viewBox`. Para os 45 glifos do arquivo original, todos 24×24, a razão é 1 e
 * o alvo continua quadrado. Para os sete glifos do arquivo de Shorts, que são
 * exportados no contorno justo do nó, é essa derivação que preserva a forma —
 * normalizar o `moreVertical` (3,26 × 16,28) para um quadrado o esticaria.
 *
 * O preenchimento herda `currentColor`, de modo que a prop `tone` e a cor do
 * elemento ancestral governem a cor do glifo. É assim que o mesmo vetor serve
 * ao texto primário da barra superior, ao secundário da barra do comentário e
 * ao cromo do reprodutor.
 */
export const Icon = React.forwardRef<SVGSVGElement, UniIconProps>(
  (
    { name, size = 'lg', tone = 'inherit', rotate, title, className = '', style, ...restProps },
    ref
  ) => {
    /*
     * `uniIcons` e não `uniIconRegistry`: o registro é declarado com `as const`
     * para que a documentação exiba os literais, o que estreita cada entrada ao
     * seu formato exato — e uma entrada de caminho único deixa de ter `shapes`.
     * A assinatura larga é a que permite ler os dois formatos de forma uniforme.
     */
    const definition = uniIcons[name];

    if (!definition) {
      return null;
    }

    const isNumericSize = typeof size === 'number';
    const aspect = aspectOf(definition.viewBox);

    const classes = [
      'uni-icon',
      isNumericSize ? '' : `uni-icon--size-${size}`,
      `uni-icon--tone-${tone}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const resolvedStyle: React.CSSProperties = {
      /*
       * A razão vai por variável CSS para que as classes de tamanho continuem
       * declarando só a altura: é o que mantém o alvo quadrado nos 45 glifos
       * originais sem nenhuma exceção no CSS.
       */
      ...({ '--uni-icon-aspect': aspect } as React.CSSProperties),
      ...(isNumericSize ? { height: size } : {}),
      ...(rotate ? { transform: `rotate(${rotate}deg)` } : {}),
      ...style,
    };

    const accessibilityProps = title
      ? { role: 'img', 'aria-label': title }
      : { 'aria-hidden': true, focusable: false as const };

    /*
     * O registro guarda glifos de caminho único (`d`, os 45 do arquivo
     * original) e glifos compostos (`shapes`, os do arquivo de Shorts, que
     * combinam vários caminhos ou são traçados em vez de preenchidos). A
     * normalização aqui evita que cada consumidor precise conhecer os dois
     * formatos.
     */
    const shapes = definition.shapes ?? (definition.d ? [{ d: definition.d }] : []);

    return (
      <svg
        ref={ref}
        data-uni-icon={name}
        className={classes}
        viewBox={definition.viewBox}
        style={resolvedStyle}
        xmlns="http://www.w3.org/2000/svg"
        {...accessibilityProps}
        {...restProps}
      >
        {title && <title>{title}</title>}
        {shapes.map((shape, index) => {
          const stroked = shape.strokeWidth != null;

          return (
            <path
              key={index}
              d={shape.d}
              fill={stroked ? 'none' : 'currentColor'}
              fillRule={shape.evenOdd ? 'evenodd' : undefined}
              clipRule={shape.evenOdd ? 'evenodd' : undefined}
              stroke={stroked ? 'currentColor' : undefined}
              strokeWidth={shape.strokeWidth}
              strokeLinecap={stroked ? 'round' : undefined}
              strokeLinejoin={stroked ? 'round' : undefined}
            />
          );
        })}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
