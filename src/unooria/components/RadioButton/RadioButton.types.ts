import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Escala de tamanhos disponíveis para o RadioButton
 * - sm: 16px de diâmetro (compacto / denso, dot de 10px)
 * - md: 20px de diâmetro (padrão Figma #25405:5873, dot de 14px)
 * - lg: 24px de diâmetro (destaque / touch friendly, dot de 16px)
 */
export type RadioButtonSize = 'sm' | 'md' | 'lg';

/**
 * Temas suportados pelo Design System Unooria
 */
export type RadioButtonTheme = UnooriaTheme;

/**
 * Estados visuais e interativos para testes e homologação
 */
export type RadioButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';

/**
 * Posicionamento do botão de rádio em relação ao texto ou modo sem texto
 * - 'left': Rádio à esquerda, rótulo textual à direita (padrão do Figma)
 * - 'right': Rótulo textual à esquerda, rádio alinhado à direita
 * - 'none': Sem texto visível, renderiza exclusivamente o controle circular
 */
export type RadioButtonBoxSide = 'left' | 'right' | 'none';

/**
 * Direção de alinhamento das opções no RadioGroup
 */
export type RadioGroupDirection = 'vertical' | 'horizontal';

/**
 * Estrutura de uma opção individual para uso direto no RadioGroup via prop `options`
 */
export interface RadioButtonOption {
  /** Valor único associado a esta opção */
  value: string | number;
  /** Rótulo textual ou elemento customizado exibido ao lado do rádio */
  label?: React.ReactNode;
  /** Texto descritivo de apoio exibido abaixo do rótulo */
  helperText?: React.ReactNode;
  /** Posicionamento individual do controle ('left' | 'right' | 'none') */
  boxSide?: RadioButtonBoxSide;
  /** Desabilita individualmente esta opção */
  disabled?: boolean;
  /** Identificador HTML único */
  id?: string;
  /** Mensagem ou estado de erro individual */
  error?: boolean | string;
  /** Classes CSS adicionais para o item */
  className?: string;
}

/**
 * Propriedades públicas do componente RadioButton individual
 */
export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /**
   * Valor único do radio button
   */
  value?: string | number;

  /**
   * Define se o radio button está selecionado (Modo Controlado)
   */
  checked?: boolean;

  /**
   * Define o estado inicial de seleção (Modo Não-Controlado)
   */
  defaultChecked?: boolean;

  /**
   * Desabilita a interação com o componente
   * @default false
   */
  disabled?: boolean;

  /**
   * Alias de compatibilidade para `disabled`
   */
  isDisabled?: boolean;

  /**
   * Posicionamento do controle em relação ao texto ('left' | 'right' | 'none')
   * - 'left': Rádio à esquerda, texto à direita (padrão)
   * - 'right': Texto à esquerda, rádio à direita
   * - 'none': Apenas o controle de rádio, sem texto visível
   * @default 'left'
   */
  boxSide?: RadioButtonBoxSide;

  /**
   * Rótulo principal exibido ao lado do botão de rádio
   */
  label?: React.ReactNode;

  /**
   * Texto de apoio ou instrução secundária exibida abaixo do rótulo
   */
  helperText?: React.ReactNode;

  /**
   * Estado de erro ou mensagem de validação
   */
  error?: boolean | string;

  /**
   * Tamanho do botão de rádio
   * @default 'md'
   */
  size?: RadioButtonSize;

  /**
   * Tema de cores da interface (Light ou Dark)
   * @default 'light'
   */
  theme?: RadioButtonTheme;

  /**
   * Nome do grupo de formulário (HTML `name`)
   */
  name?: string;

  /**
   * Identificador único HTML
   */
  id?: string;

  /**
   * Callback disparado quando o estado de seleção é alterado
   */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked?: boolean
  ) => void;

  /**
   * Estado visual forçado para fins de documentação e Storybook
   */
  state?: RadioButtonState;

  /**
   * Força o estado visual de hover (Storybook / testes)
   */
  isHovered?: boolean;

  /**
   * Força o estado visual de foco (Storybook / testes)
   */
  isFocused?: boolean;

  /**
   * Força o estado visual ativo/pressionado (Storybook / testes)
   */
  isActive?: boolean;

  /**
   * Rótulo de acessibilidade quando não houver `label` visível ou quando `boxSide="none"`
   */
  ariaLabel?: string;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos inline adicionais
   */
  style?: React.CSSProperties;

  /**
   * Conteúdo ou rótulo alternativo via children
   */
  children?: React.ReactNode;
}

/**
 * Propriedades públicas do componente RadioGroup
 */
export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> {
  /**
   * Lista declarativa de opções para renderização automática
   */
  options?: RadioButtonOption[];

  /**
   * Elementos filhos (ex: múltiplos `<RadioButton />`)
   */
  children?: React.ReactNode;

  /**
   * Valor selecionado atualmente no grupo (Modo Controlado)
   */
  value?: string | number;

  /**
   * Valor inicialmente selecionado no grupo (Modo Não-Controlado)
   */
  defaultValue?: string | number;

  /**
   * Callback disparado quando a seleção do grupo muda
   */
  onChange?: (value: string | number, event?: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Direção de layout das opções dentro do grupo
   * @default 'vertical'
   */
  direction?: RadioGroupDirection;

  /**
   * Posicionamento padrão do controle nos itens do grupo ('left' | 'right' | 'none')
   * @default 'left'
   */
  boxSide?: RadioButtonBoxSide;

  /**
   * Rótulo do grupo / título da seção (renderizado em `<legend>`)
   */
  label?: React.ReactNode;

  /**
   * Texto de apoio explicativo para o conjunto de opções
   */
  helperText?: React.ReactNode;

  /**
   * Estado ou mensagem de erro global do grupo
   */
  error?: boolean | string;

  /**
   * Desabilita todas as opções do grupo simultaneamente
   * @default false
   */
  disabled?: boolean;

  /**
   * Nome comum atribuído a todos os rádios pertencentes ao grupo
   */
  name?: string;

  /**
   * Tamanho padrão aplicado a todos os rádios filhos
   * @default 'md'
   */
  size?: RadioButtonSize;

  /**
   * Tema de cores aplicado ao grupo (Light ou Dark)
   * @default 'light'
   */
  theme?: RadioButtonTheme;

  /**
   * Obriga a seleção de uma opção no formulário
   */
  required?: boolean;

  /**
   * Identificador HTML único do grupo
   */
  id?: string;

  /**
   * Classes CSS adicionais
   */
  className?: string;

  /**
   * Estilos inline adicionais
   */
  style?: React.CSSProperties;
}

/**
 * Contexto compartilhado entre o RadioGroup e os RadioButtons filhos
 */
export interface RadioGroupContextValue {
  name?: string;
  value?: string | number;
  onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioButtonSize;
  theme?: RadioButtonTheme;
  boxSide?: RadioButtonBoxSide;
  disabled?: boolean;
  error?: boolean | string;
}
