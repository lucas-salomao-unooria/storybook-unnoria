import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades da trilha vertical de ações do feed.
 */
export interface TikActionRailProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades de um item da trilha de ações.
 */
export interface TikActionRailItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo da ação. Coração, comentário e seta de compartilhamento são
   * multicoloridos no arquivo e ignoram o tom aplicado.
   */
  icon: TikIconName;

  /**
   * Contador ou rótulo exibido sob o glifo, em Semibold 13.
   */
  label?: React.ReactNode;

  /**
   * Rótulo acessível da ação, quando `label` é apenas um número.
   */
  actionLabel?: string;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
