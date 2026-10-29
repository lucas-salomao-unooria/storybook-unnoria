import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Propriedades do componente Slider da Plataforma Unooria.
 *
 * Régua de um valor, com `<input type="range">` nativo por baixo. A API segue a
 * do `Slider` da Unoogaleria (`origin`, `ticks`, `formatValue`, `onChangeEnd`)
 * e acrescenta os rótulos VISÍVEIS das pontas (`minLabel` e `maxLabel`).
 *
 * Os atributos nativos vão para o invólucro (`<div>`); a `ref` aponta para o
 * `<input type="range">`, que é o elemento focável e o que o leitor de tela lê.
 */
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'children'> {
  /**
   * Valor controlado. Com ele, o componente só pede a troca por `onChange`.
   */
  value?: number;

  /**
   * Valor inicial em modo não controlado.
   * @default origin
   */
  defaultValue?: number;

  /**
   * Chamado a cada passo, enquanto a pessoa arrasta ou usa o teclado.
   */
  onChange?: (value: number) => void;

  /**
   * Chamado quando o gesto termina: ao soltar o ponteiro, ao soltar a tecla ou
   * ao tirar o foco. É o momento de gravar a escolha (um passo por gesto, não
   * um por pixel).
   */
  onChangeEnd?: (value: number) => void;

  /**
   * Valor mínimo.
   * @default 0
   */
  min?: number;

  /**
   * Valor máximo.
   * @default 100
   */
  max?: number;

  /**
   * Passo entre valores.
   * @default 1
   */
  step?: number;

  /**
   * Ponto de onde o preenchimento parte. Em 0 numa faixa de -100 a 100, o
   * preenchimento cresce a partir do centro; no mínimo, da esquerda.
   * @default min
   */
  origin?: number;

  /**
   * Nome acessível. Obrigatório: é o rótulo do campo e o que o leitor de tela
   * anuncia.
   */
  label: string;

  /**
   * Esconde o rótulo visualmente, mantendo-o para o leitor de tela.
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Mostra o valor formatado à direita do rótulo.
   * @default true
   */
  showValue?: boolean;

  /**
   * Rótulo visível da ponta mínima, abaixo da régua — como "Eixo em 0%
   * (proporcional)". Também descreve o campo (`aria-describedby`).
   */
  minLabel?: React.ReactNode;

  /**
   * Rótulo visível da ponta máxima, abaixo da régua — como "Eixo em 80%
   * (truncado)". Também descreve o campo (`aria-describedby`).
   */
  maxLabel?: React.ReactNode;

  /**
   * Marcas desenhadas sobre a trilha, nos valores informados. Não prendem o
   * valor: são referência visual.
   */
  ticks?: number[];

  /**
   * Desabilita o controle.
   * @default false
   */
  disabled?: boolean;

  /**
   * Formata o valor exibido e o `aria-valuetext` — por exemplo,
   * `(v) => \`Eixo em ${v}%\``. Sem ela, o número sai em pt-BR, com sinal
   * quando a origem não é o mínimo ("+12", "−5").
   */
  formatValue?: (value: number) => string;

  /**
   * Nome do campo em formulário.
   */
  name?: string;

  /**
   * Tema visual. Um ancestral com `data-theme="dark"` também escurece a régua.
   * @default 'light'
   */
  theme?: UnooriaTheme;
}
