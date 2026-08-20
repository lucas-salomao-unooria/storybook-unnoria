import React from 'react';

/**
 * Um modo de captura da tira inferior da câmera.
 */
export interface TikCameraMode {
  /** Identificador do modo */
  id: string;
  /** Rótulo exibido em Bold 15 */
  label: React.ReactNode;
}

/**
 * Propriedades da tira de modos da câmera.
 */
export interface TikCameraModeStripProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Modos exibidos. O arquivo publica três: "60s", "15s" e "Templates".
   */
  modes: TikCameraMode[];

  /**
   * Identificador do modo ativo.
   */
  active?: string;

  /**
   * Acionado ao selecionar um modo.
   */
  onSelect?: (id: string) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
