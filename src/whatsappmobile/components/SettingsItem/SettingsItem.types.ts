import React from 'react';
import type { WaIconName } from '../Icon';

/**
 * Propriedades do componente SettingsItem do WhatsApp Mobile.
 */
export interface WaSettingsItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Glifo exibido à esquerda.
   */
  icon: WaIconName;

  /**
   * Título da linha.
   */
  title: string;

  /**
   * Descrição exibida abaixo do título.
   */
  description?: string;

  /**
   * Rotação aplicada ao glifo, usada por `settingsChats` (180°) no arquivo.
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
