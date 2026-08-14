import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Escala de tamanhos padronizada para o Checkbox
 * - sm: Caixa de 16px x 16px, texto 13px
 * - md: Caixa de 20px x 20px (Padrão Figma #25405:5873), texto 14px
 * - lg: Caixa de 24px x 24px, texto 16px
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Temas visuais suportados pelo Checkbox (Light e Dark)
 */
export type CheckboxTheme = UnooriaTheme;

/**
 * Posição do rótulo textual em relação à caixa de seleção
 */
export type CheckboxLabelPosition = 'right' | 'left';

/**
 * Direção de distribuição dos checkboxes dentro do CheckboxGroup
 */
export type CheckboxGroupDirection = 'vertical' | 'horizontal';

/**
 * Opção individual para renderização declarativa via prop options no CheckboxGroup
 */
export interface CheckboxOption {
  /** Rótulo textual ou elemento do item */
  label: React.ReactNode;
  /** Valor identificador do item */
  value: string;
  /** Desabilita o item individualmente */
  disabled?: boolean;
  /** Texto ou elemento de suporte explicativo */
  helperText?: React.ReactNode;
  /** ID personalizado para o input */
  id?: string;
  /** Classe CSS customizada para o item */
  className?: string;
}

/**
 * Propriedades públicas do componente Checkbox
 */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  /**
   * Estado de marcação (Modo Controlado)
   */
  checked?: boolean;

  /**
   * Estado de marcação inicial (Modo Não-Controlado)
   */
  defaultChecked?: boolean;

  /**
   * Estado indeterminado / misto (terceiro estado do checkbox)
   * Renderiza um traço horizontal no lugar do ícone de check e define aria-checked="mixed".
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Desabilita a interação com o checkbox
   * @default false
   */
  disabled?: boolean;

  /**
   * Alias de conveniência para disabled
   */
  isDisabled?: boolean;

  /**
   * Tamanho do componente
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Tema visual do componente (Light ou Dark)
   * @default 'light'
   */
  theme?: CheckboxTheme;

  /**
   * Rótulo principal exibido ao lado do checkbox
   */
  label?: React.ReactNode;

  /**
   * Posição do rótulo em relação à caixa de seleção
   * @default 'right'
   */
  labelPosition?: CheckboxLabelPosition;

  /**
   * Texto de suporte ou descrição exibido abaixo do rótulo
   */
  helperText?: React.ReactNode;

  /**
   * Indica estado de erro ou mensagem textual de erro
   */
  error?: boolean | string;

  /**
   * Valor do checkbox quando submetido em formulários
   */
  value?: string;

  /**
   * Nome do input no formulário
   */
  name?: string;

  /**
   * Identificador único do input
   */
  id?: string;

  /**
   * Callback disparado quando o estado do checkbox é alterado
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Referência para o elemento `<input type="checkbox">` nativo
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * Classe CSS customizada para o contêiner raiz
   */
  className?: string;

  /**
   * Estilos inline adicionais para o contêiner raiz
   */
  style?: React.CSSProperties;
}

/**
 * Propriedades públicas do componente CheckboxGroup
 */
export interface CheckboxGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /**
   * Rótulo/Título principal do grupo de opções (renderizado como `<legend>`)
   */
  label?: React.ReactNode;

  /**
   * Texto de suporte explicativo para o grupo
   */
  helperText?: React.ReactNode;

  /**
   * Mensagem de erro ou indicador de estado inválido do grupo
   */
  error?: boolean | string;

  /**
   * Direção de distribuição visual das opções
   * @default 'vertical'
   */
  direction?: CheckboxGroupDirection;

  /**
   * Tamanho padrão propagado para todos os checkboxes filhos
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Tema visual propagado para todos os checkboxes filhos
   * @default 'light'
   */
  theme?: CheckboxTheme;

  /**
   * Desabilita todas as opções do grupo
   * @default false
   */
  disabled?: boolean;

  /**
   * Indica se a seleção de ao menos um item é obrigatória
   * @default false
   */
  required?: boolean;

  /**
   * Nome compartilhado para o grupo de checkboxes
   */
  name?: string;

  /**
   * Lista declarativa de opções
   */
  options?: CheckboxOption[];

  /**
   * Valores selecionados (Modo Controlado)
   */
  value?: string[];

  /**
   * Valores selecionados inicialmente (Modo Não-Controlado)
   */
  defaultValue?: string[];

  /**
   * Callback disparado quando as opções selecionadas mudam
   */
  onChange?: (value: string[]) => void;

  /**
   * Checkboxes filhos customizados quando options não for utilizado
   */
  children?: React.ReactNode;

  /**
   * Classe CSS customizada para o grupo
   */
  className?: string;

  /**
   * Estilos inline adicionais para o grupo
   */
  style?: React.CSSProperties;
}
