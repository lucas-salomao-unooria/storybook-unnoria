import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Descrição de uma aba do perfil.
 */
export interface TikProfileTab {
  /** Identificador da aba */
  id: string;
  /** Glifo da aba */
  icon: TikIconName;
  /** Rótulo acessível */
  label: string;
  /**
   * Aba indisponível — no arquivo, a de curtidas ocultas, pintada em
   * `--tik-color-icon-tab-disabled`.
   */
  disabled?: boolean;
}

/**
 * Propriedades da faixa de abas do perfil.
 */
export interface TikProfileTabsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Abas exibidas. O arquivo publica duas: grade de publicações e curtidas
   * ocultas.
   */
  tabs: TikProfileTab[];

  /**
   * Identificador da aba ativa.
   */
  active?: string;

  /**
   * Acionado ao selecionar uma aba.
   */
  onSelect?: (id: string) => void;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
