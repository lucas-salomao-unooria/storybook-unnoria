import React from 'react';
import type {
  UniShortsActionRailItemProps,
  UniShortsActionRailProps,
} from './ShortsActionRail.types';
import './ShortsActionRail.css';

/**
 * Uma ação da trilha: glifo com rótulo abaixo.
 *
 * A forma do alvo — glifo solto ou botão circular — vem da variante declarada
 * pela trilha, e não de prop do item. É o que impede montar uma trilha com
 * metade das ações em cada forma.
 */
const ShortsActionRailItem = React.forwardRef<HTMLButtonElement, UniShortsActionRailItemProps>(
  ({ icon, label, active = false, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={[
        'uni-shorts-rail__item',
        active ? 'uni-shorts-rail__item--active' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-pressed={active || undefined}
      {...restProps}
    >
      <span className="uni-shorts-rail__glyph">{icon}</span>
      {label != null && <span className="uni-shorts-rail__label">{label}</span>}
    </button>
  )
);

ShortsActionRailItem.displayName = 'ShortsActionRail.Item';

/**
 * Componente ShortsActionRail — Design System Unootube
 *
 * Reproduz a coluna de ações do reprodutor de Shorts nas duas formas que o
 * arquivo "Free YouTube Shorts Mockups (Community)" publica: a trilha
 * sobreposta ao vídeo da tela móvel (`3:210`) e a coluna de botões circulares
 * ao lado do quadro na área de trabalho (`3:453`).
 *
 * Os `header` e `footer` existem porque o arquivo separa três blocos na mesma
 * coluna: o menu de reticências no topo, o grupo de ações no meio e o botão de
 * som na base — com intervalos diferentes entre eles. Modelá-los como slots
 * evita que o produto precise recriar a coluna inteira para trocar o botão de
 * som pela capa do áudio.
 */
const ShortsActionRailRoot = React.forwardRef<HTMLDivElement, UniShortsActionRailProps>(
  ({ variant = 'overlay', header, footer, children, className = '', ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-shorts-rail', `uni-shorts-rail--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      role="group"
      aria-label="Ações do vídeo"
      {...restProps}
    >
      {header != null && <div className="uni-shorts-rail__header">{header}</div>}
      <div className="uni-shorts-rail__actions">{children}</div>
      {footer != null && <div className="uni-shorts-rail__footer">{footer}</div>}
    </div>
  )
);

ShortsActionRailRoot.displayName = 'ShortsActionRail';

/**
 * Trilha de ações do Shorts, com o subcomponente `Item`.
 */
export const ShortsActionRail = Object.assign(ShortsActionRailRoot, {
  Item: ShortsActionRailItem,
});
