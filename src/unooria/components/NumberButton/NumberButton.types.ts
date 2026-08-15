import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Escala de tamanhos suportada pelo NumberButton conforme o Figma (Node #14662:399)
 * - 'lg': Title-L Bold (20px / 30px / 700)
 * - 'md': Body-M Bold (18px / 28px / 700)
 * - 'sm': Body-S Bold (16px / 24px / 700)
 * - 'xs': Body-XS Bold (14px / 20px / 700)
 */
export type NumberButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Temas visuais suportados pelo NumberButton
 */
export type NumberButtonTheme = UnooriaTheme;

/**
 * Estados visuais suportados para homologação e inspeção (Figma: State)
 */
export type NumberButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disable' | 'disabled';

/**
 * Propriedades públicas do componente NumberButton (Stepper Numérico)
 * Baseado nas especificações oficiais do Figma (nó #14662:399 / Component Set #14662:31020)
 */
export interface NumberButtonProps {
  /**
   * Valor numérico em modo controlado.
   */
  value?: number;

  /**
   * Valor numérico inicial em modo não controlado.
   * @default 0
   */
  defaultValue?: number;

  /**
   * Valor mínimo permitido no stepper.
   * @default -Infinity
   */
  min?: number;

  /**
   * Valor máximo permitido no stepper.
   * @default Infinity
   */
  max?: number;

  /**
   * Passo de incremento e decremento numérico ao acionar os botões ou setas do teclado.
   * @default 1
   */
  step?: number;

  /**
   * Callback disparado sempre que o valor numérico é alterado com sucesso.
   */
  onChange?: (value: number) => void;

  /**
   * Desabilita a interação com o componente e aplica estilo visual desabilitado (Figma: State=Disable).
   * @default false
   */
  disabled?: boolean;

  /**
   * Alias de compatibilidade para `disabled`.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Define o componente como somente leitura.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Tamanho visual do componente e escala tipográfica conforme Figma.
   * - 'lg': Title-L Bold (20px)
   * - 'md': Body-M Bold (18px)
   * - 'sm': Body-S Bold (16px)
   * - 'xs': Body-XS Bold (14px)
   * @default 'md'
   */
  size?: NumberButtonSize;

  /**
   * Alias de compatibilidade para `size` (Figma: Tamanho).
   */
  tamanho?: NumberButtonSize;

  /**
   * Tema de cor da interface (Light ou Dark).
   * @default 'light'
   */
  theme?: NumberButtonTheme;

  /**
   * Quantidade de dígitos para preenchimento com zeros à esquerda (ex: padLength=3 exibe "000", "007").
   * Ideal para reproduzir fielmente a tipografia "000" do Figma.
   */
  padLength?: number;

  /**
   * Função customizada de formatação visual do número exibido.
   */
  formatValue?: (value: number) => string | number;

  /**
   * Função customizada de parsing para converter o texto digitado pelo usuário em número.
   */
  parseValue?: (text: string) => number;

  /**
   * Permite que o usuário digite o número diretamente no campo central via teclado.
   * @default true
   */
  allowInput?: boolean;

  /**
   * Elemento ou texto exibido antes do valor central (ex: prefixo 'R$').
   */
  prefix?: React.ReactNode;

  /**
   * Elemento ou texto exibido depois do valor central (ex: sufixo 'kg', 'un').
   */
  suffix?: React.ReactNode;

  /**
   * Quantidade de casas decimais fixas para arredondamento (precisão matemática).
   */
  precision?: number;

  /**
   * Nome do campo para envio em formulários HTML.
   */
  name?: string;

  /**
   * Identificador HTML exclusivo do componente.
   */
  id?: string;

  /**
   * Rótulo de acessibilidade para leitores de tela no componente como um todo.
   * @default 'Controle de valor numérico'
   */
  ariaLabel?: string;

  /**
   * Rótulo de acessibilidade para o botão de decremento (-).
   * @default 'Diminuir valor'
   */
  ariaLabelDecrement?: string;

  /**
   * Rótulo de acessibilidade para o botão de incremento (+).
   * @default 'Aumentar valor'
   */
  ariaLabelIncrement?: string;

  /**
   * Força um estado visual específico para documentação e testes visuais no Storybook.
   * @default 'default'
   */
  state?: NumberButtonState;

  /**
   * Força o estado visual de hover nos botões interativos (- / +).
   * @default false
   */
  isHovered?: boolean;

  /**
   * Força o estado visual ativo (pressionado).
   * @default false
   */
  isActive?: boolean;

  /**
   * Força o estado visual de foco no componente.
   * @default false
   */
  isFocused?: boolean;

  /**
   * Foca o elemento automaticamente quando renderizado.
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Callback executado quando o elemento recebe foco.
   */
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLDivElement>) => void;

  /**
   * Callback executado quando o elemento perde o foco.
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLDivElement>) => void;

  /**
   * Callback executado em eventos de teclado.
   */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => void;

  /**
   * Classe CSS customizada para o contêiner principal.
   */
  className?: string;

  /**
   * Estilos CSS inline customizados para o contêiner principal.
   */
  style?: React.CSSProperties;
}
