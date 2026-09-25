import React from 'react';

/**
 * Propriedades do componente ForwardButton do WhatsApp Mobile.
 *
 * Extensão: o atalho de encaminhar ao lado do balão existe no app real, mas o
 * arquivo de origem não o publica — só o glifo `forward`.
 */
export interface WaForwardButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  /**
   * Nome acessível do botão, como "Encaminhar mensagem de Pedro". Obrigatório:
   * o botão é só um glifo.
   */
  label: string;
  /**
   * A mensagem já foi escolhida: o glifo vira o tique e o botão anuncia
   * `aria-pressed="true"`.
   * @default false
   */
  selected?: boolean;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
