import React from 'react';
import type { TikIconName } from '../Icon';

/**
 * Propriedades de um alvo da folha de compartilhamento.
 */
export interface TikShareActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Rótulo sob o disco, em Regular 11 e `--tik-color-text-action`. Quebra em
   * duas linhas quando necessário, como em "Not interested".
   */
  label: React.ReactNode;

  /**
   * Glifo exibido dentro do disco cinza de 47px.
   */
  icon?: TikIconName;

  /**
   * Conteúdo livre no lugar do disco — usado para os logotipos de terceiros,
   * que já trazem o próprio disco colorido.
   */
  media?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
