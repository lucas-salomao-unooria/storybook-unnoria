import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades da coluna de ferramentas da câmera.
 */
export interface TikCameraToolRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades de uma ferramenta da coluna.
 */
export interface TikCameraToolProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo da ferramenta, exibido em 24px.
   */
  icon: TikIconName;

  /**
   * Rótulo sob o glifo, em Bold 10.
   */
  label: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
