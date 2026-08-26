'use client';

import React from 'react';
import { Icon } from '../Icon';
import type { UniTopMenuIconProps } from './TopMenuIcon.types';
import './TopMenuIcon.css';

/**
 * Componente TopMenuIcon — Design System Unootube
 *
 * Reproduz o nó `Navigation/TopMenuIcon` (`10:665`), o alvo que fecha a barra
 * de filtros da tela inicial e permite avançar a lista de categorias.
 *
 * O recuo de 20px em um alvo de 56px deixa o glifo com 16px — é o único ponto
 * do arquivo em que um glifo de 24×24 é aplicado nesse tamanho fora da barra do
 * comentário.
 */
export const TopMenuIcon = React.forwardRef<HTMLButtonElement, UniTopMenuIconProps>(
  ({ icon = 'leftBottom', label = 'Avançar', className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={['uni-topmenu-icon', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Icon name={icon} size="sm" tone="primary" />
    </button>
  )
);

TopMenuIcon.displayName = 'TopMenuIcon';
