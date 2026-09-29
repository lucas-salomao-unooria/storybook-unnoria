import React from 'react';

/**
 * Propriedades do componente ForwardButton do Unoochat.
 *
 * Extensão: o atalho de encaminhar ao lado do balão, com o glifo `forward`.
 */
export interface UncForwardButtonProps
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
   * A cota acabou e esta mensagem ficou de fora: o botão esmaece como o
   * desabilitado, mas CONTINUA recebendo o toque e anuncia
   * `aria-disabled="true"`. É o estado de quando o toque precisa explicar a
   * recusa (o aviso de limite): `disabled` engole o clique, e a recusa ficaria
   * muda. Ignorado quando `selected` — a escolhida continua desfazível.
   * @default false
   */
  exhausted?: boolean;
  /**
   * Classe CSS adicional.
   */
  className?: string;
}
