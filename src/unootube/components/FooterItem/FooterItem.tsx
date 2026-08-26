import React from 'react';
import type { UniFooterItemProps } from './FooterItem.types';
import './FooterItem.css';

/**
 * Componente FooterItem — Design System Unootube
 *
 * Reproduz o nó `Navigation/FooterItem` (`9:3231`), o link do rodapé da barra
 * lateral. É o único uso de Roboto **Bold 13** em todo o arquivo — um degrau
 * que a escala publica como Body/Small, mas em peso regular. O desvio está
 * registrado na estória do componente.
 */
export const FooterItem = React.forwardRef<HTMLAnchorElement, UniFooterItemProps>(
  ({ label, className = '', ...restProps }, ref) => (
    <a ref={ref} className={['uni-footer-item', className].filter(Boolean).join(' ')} {...restProps}>
      {label}
    </a>
  )
);

FooterItem.displayName = 'FooterItem';
