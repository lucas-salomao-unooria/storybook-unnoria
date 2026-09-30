import React from 'react';
import type { UglTheme } from '../../tokens';

/**
 * Variantes do deslizador.
 * - 'default': sobre as superfícies do tema (configurações, filtros de busca)
 * - 'immersive': sobre a superfície imersiva do editor, invariante entre temas
 */
export type UglSliderVariant = 'default' | 'immersive';

/**
 * Propriedades do componente Slider da Unoogaleria.
 *
 * Os atributos nativos vão para o invólucro (`<div>`); a `ref` aponta para o
 * `<input type="range">`, que é o elemento focável e o que o leitor de tela lê.
 */
export interface UglSliderProps
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
   * no duplo clique que volta à origem. É o momento de gravar um passo de
   * histórico.
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
   * Ponto de onde o preenchimento parte e para onde o duplo clique volta.
   * Ajustes de -100 a 100 usam 0: o preenchimento cresce a partir do centro.
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
   * @default false
   */
  showValue?: boolean;

  /**
   * Variante visual.
   * @default 'default'
   */
  variant?: UglSliderVariant;

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
   * Formata o valor exibido e o `aria-valuetext`. Sem ela, o valor sai em
   * pt-BR, com sinal quando a origem não é o mínimo ("+12", "−5").
   */
  formatValue?: (value: number) => string;

  /**
   * Nome do campo em formulário.
   */
  name?: string;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
