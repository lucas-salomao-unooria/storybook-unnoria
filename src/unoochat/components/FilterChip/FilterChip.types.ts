import React from 'react';
import type { UncIconName } from '../Icon';

/**
 * Propriedades do componente FilterChip do Unoochat.
 */
export interface UncFilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo do filtro.
   */
  label: string;

  /**
   * Glifo exibido antes do rótulo.
   */
  icon?: UncIconName;

  /**
   * Indica se o filtro está aplicado.
   * @default false
   */
  selected?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
