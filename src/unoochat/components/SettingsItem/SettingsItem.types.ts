import React from 'react';
import type { UncIconName } from '../Icon';

/**
 * Propriedades do componente SettingsItem do Unoochat.
 */
export interface UncSettingsItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Glifo exibido à esquerda.
   */
  icon: UncIconName;

  /**
   * Título da linha.
   */
  title: string;

  /**
   * Descrição exibida abaixo do título.
   */
  description?: string;

  /**
   * Rotação aplicada ao glifo, usada por `settingsChats` (180°).
   * @default 0
   */
  iconRotate?: number;

  /**
   * Callback de ativação.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
