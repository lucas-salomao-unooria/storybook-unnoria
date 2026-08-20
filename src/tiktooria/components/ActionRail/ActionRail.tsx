import React from 'react';
import { Icon } from '../Icon';
import type { TikActionRailItemProps, TikActionRailProps } from './ActionRail.types';
import './ActionRail.css';

/**
 * Item da trilha de ações — glifo de 35px sobre contador de 13px.
 *
 * O arquivo aplica 90% de opacidade ao conjunto e o estilo de efeito
 * "Text Drop" ao contador, para garantir legibilidade sobre o vídeo.
 */
const ActionRailItem = React.forwardRef<HTMLButtonElement, TikActionRailItemProps>(
  ({ icon, label, actionLabel, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-actionrail__item', className].filter(Boolean).join(' ')}
      aria-label={actionLabel}
      {...restProps}
    >
      <Icon name={icon} size="xl" tone="onImmersive" />
      {label !== undefined && <span className="tik-actionrail__label">{label}</span>}
    </button>
  )
);

ActionRailItem.displayName = 'ActionRail.Item';

/**
 * Componente ActionRail — Design System Tik Tooria
 *
 * Trilha vertical de 208px na borda direita do feed (node 4:1069), com
 * curtidas, comentários e compartilhamento. O espaçamento de 80px entre os
 * centros dos glifos reproduz as coordenadas absolutas do arquivo.
 */
const ActionRailRoot = React.forwardRef<HTMLDivElement, TikActionRailProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <div ref={ref} className={['tik-actionrail', className].filter(Boolean).join(' ')} {...restProps}>
      {children}
    </div>
  )
);

ActionRailRoot.displayName = 'ActionRail';

/**
 * Trilha de ações com o subcomponente `ActionRail.Item`.
 */
export const ActionRail = Object.assign(ActionRailRoot, { Item: ActionRailItem });
