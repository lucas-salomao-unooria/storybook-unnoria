import React from 'react';
import type { UniIconName } from '../Icon';

/**
 * Propriedades do botão de ação do Unitube.
 *
 * Reproduz o nó `Action/Button` (`20:2758`): um alvo de 97×40 composto por um
 * quadro de ícone de 36×36 e um quadro de rótulo em Label/Large.
 */
export interface UniButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Glifo exibido antes do rótulo.
   */
  icon?: UniIconName;

  /**
   * Marca o botão como acionado — por exemplo, um vídeo já curtido. O arquivo
   * não publica este estado; ele é construído com a escada de realce da própria
   * marca e está registrado como desvio na estória.
   * @default false
   */
  pressed?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
