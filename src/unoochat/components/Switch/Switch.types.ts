import React from 'react';

/**
 * Posição do texto (rótulo e descrição) em relação ao interruptor.
 */
export type UncSwitchLabelPosition = 'left' | 'right';

/**
 * Propriedades do componente Switch do Unoochat.
 *
 * Extensão: interruptor de dois estados, com rótulo e uma linha de descrição.
 * A API segue a do `Toggle` da Plataforma Unooria (`checked`,
 * `defaultChecked`, `onChange(checked, event)`, `label`, `description`,
 * `labelPosition`, `disabled`, `name`, `value`), trocando o `<input>` oculto
 * por um `<button role="switch">` visível — ver a estória.
 *
 * Os atributos nativos vão para o `<button>`, que é o elemento focável, o que
 * o leitor de tela lê e o que a `ref` aponta.
 */
export interface UncSwitchProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'value' | 'defaultChecked' | 'children' | 'type' | 'role'
> {
  /**
   * Estado ligado/desligado (modo controlado).
   */
  checked?: boolean;

  /**
   * Estado inicial (modo não controlado).
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Chamado com o novo estado a cada acionamento — clique, toque, Enter ou
   * Espaço. Em modo controlado, o componente só pede a troca.
   */
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Rótulo visível. Vira o nome acessível do interruptor; sem ele, informe
   * `aria-label` ou `aria-labelledby`.
   */
  label?: React.ReactNode;

  /**
   * Linha secundária abaixo do rótulo, como "Eixo vertical iniciando em 0%".
   * Ligada ao interruptor por `aria-describedby`.
   */
  description?: React.ReactNode;

  /**
   * Lado do texto em relação ao interruptor. `'left'` é a linha de
   * configuração clássica: texto à esquerda, interruptor encostado à direita.
   * @default 'right'
   */
  labelPosition?: UncSwitchLabelPosition;

  /**
   * Desabilita a interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Nome do campo em formulário. Com ele, um `<input type="hidden">` leva o
   * `value` quando o interruptor está ligado — a mesma regra de um checkbox.
   */
  name?: string;

  /**
   * Valor enviado no formulário quando ligado.
   * @default 'on'
   */
  value?: string;

  /**
   * Classe CSS adicional, aplicada ao invólucro.
   */
  className?: string;

  /**
   * Estilos inline, aplicados ao invólucro.
   */
  style?: React.CSSProperties;
}
