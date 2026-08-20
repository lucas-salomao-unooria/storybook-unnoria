import React from 'react';
import { Icon } from '../Icon';
import type { TikCameraToolProps, TikCameraToolRailProps } from './CameraToolRail.types';
import './CameraToolRail.css';

/**
 * Ferramenta da coluna da câmera — glifo de 24px sobre rótulo Bold 10.
 */
const CameraTool = React.forwardRef<HTMLButtonElement, TikCameraToolProps>(
  ({ icon, label, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      className={['tik-cameratool', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Icon name={icon} size="lg" tone="onImmersive" />
      <span className="tik-cameratool__label">{label}</span>
    </button>
  )
);

CameraTool.displayName = 'CameraToolRail.Item';

/**
 * Componente CameraToolRail — Design System Tik Tooria
 *
 * Coluna de 32×353 na borda direita da câmera (node 4:672), com as seis
 * ferramentas do arquivo: Flip, Speed, Beauty, Filters, Timer e Flash. O
 * conjunto é renderizado a 90% de opacidade, como no arquivo.
 */
const CameraToolRailRoot = React.forwardRef<HTMLDivElement, TikCameraToolRailProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['tik-cameratoolrail', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);

CameraToolRailRoot.displayName = 'CameraToolRail';

/**
 * Coluna de ferramentas com o subcomponente `CameraToolRail.Item`.
 */
export const CameraToolRail = Object.assign(CameraToolRailRoot, { Item: CameraTool });
