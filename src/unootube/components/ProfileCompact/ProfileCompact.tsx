'use client';

import React from 'react';
import { Avatar } from '../Avatar';
import type { UniProfileCompactProps } from './ProfileCompact.types';
import './ProfileCompact.css';

/**
 * Componente ProfileCompact — Design System Unootube
 *
 * Reproduz o nó `Navigation/ProfileCompact` (`7:87`): avatar de 32px em um alvo
 * de 60×40 com recuo lateral de 14px. É o único ponto do arquivo em que o
 * avatar de 32px aparece.
 */
export const ProfileCompact = React.forwardRef<HTMLButtonElement, UniProfileCompactProps>(
  ({ src, alt = 'Perfil', initials, className = '', ...restProps }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={alt}
      className={['uni-profile-compact', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      <Avatar src={src} alt={src ? alt : ''} initials={initials} size="sm" />
    </button>
  )
);

ProfileCompact.displayName = 'ProfileCompact';
