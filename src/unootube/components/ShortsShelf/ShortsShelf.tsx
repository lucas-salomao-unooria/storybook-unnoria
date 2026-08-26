import React from 'react';
import { ShortsLogo } from '../ShortsLogo';
import type { UniShortsShelfProps } from './ShortsShelf.types';
import './ShortsShelf.css';

/**
 * Componente ShortsShelf — Design System Unootube
 *
 * Reproduz a prateleira de Shorts do arquivo "Free YouTube Shorts Mockups
 * (Community)", nas duas disposições que ele publica: a faixa de rolagem
 * horizontal da tela móvel (`1:129`) e a grade da área de trabalho (`1:735`).
 *
 * A prateleira não monta cartão nenhum: recebe os filhos por composição, para
 * que a mesma seção sirva à variante `overlay` no móvel e à `below` na área de
 * trabalho sem multiplicar props.
 *
 * A rolagem horizontal é real. O arquivo é um quadro estático com os cartões
 * cortados na aresta direita; sem rolagem, o conteúdo além da borda ficaria
 * inalcançável — o mesmo desvio já registrado para a barra lateral e a faixa
 * de filtros.
 */
export const ShortsShelf = React.forwardRef<HTMLElement, UniShortsShelfProps>(
  (
    {
      label = 'Shorts',
      showLogo = true,
      layout = 'row',
      columnWidth = 150,
      bordered = false,
      children,
      className = '',
      style,
      ...restProps
    },
    ref
  ) => (
    <section
      ref={ref}
      className={[
        'uni-shorts-shelf',
        `uni-shorts-shelf--${layout}`,
        bordered ? 'uni-shorts-shelf--bordered' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          '--uni-shorts-shelf-column': `${columnWidth}px`,
          ...style,
        } as React.CSSProperties
      }
      {...restProps}
    >
      {(label != null || showLogo) && (
        <div className="uni-shorts-shelf__header">
          {showLogo && <ShortsLogo variant="brand" size={20} />}
          {label != null && <h2 className="uni-shorts-shelf__label">{label}</h2>}
        </div>
      )}

      <div className="uni-shorts-shelf__track">{children}</div>
    </section>
  )
);

ShortsShelf.displayName = 'ShortsShelf';
