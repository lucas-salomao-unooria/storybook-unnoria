import React from 'react';
import type { WaIconName } from '../Icon';

/**
 * Propriedades do componente FilterChip do WhatsApp Mobile.
 */
export interface WaFilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo do filtro.
   */
  label: string;

  /**
   * Glifo exibido antes do rótulo.
   */
  icon?: WaIconName;

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
