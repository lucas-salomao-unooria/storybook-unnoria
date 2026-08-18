import React from 'react';

/**
 * Escala de tamanhos oficiais do TextField no Figma
 */
export type TextFieldSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Estados visuais suportados pelo TextField
 */
export type TextFieldState =
  | 'default'
  | 'active'
  | 'focus'
  | 'typing'
  | 'disabled'
  | 'error'
  | 'success';

/**
 * Propriedades do componente base TextField
 * Plataforma Unooria - Extraído do Figma (Node 6107:729 / Component Set 1124:707)
 */
export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Rótulo superior do campo (Top Label)
   */
  label?: React.ReactNode;

  /**
   * Se verdadeiro, exibe asterisco vermelho de obrigatoriedade (*)
   * @default false
   */
  required?: boolean;

  /**
   * Texto de ajuda ou orientação exibido abaixo do campo
   */
  helperText?: React.ReactNode;

  /**
   * Ícone ou botão de ajuda exibido ao lado do label (ex: 'help')
   */
  helperIcon?: boolean | string | React.ReactNode;

  /**
   * Mensagem de erro ou booleano para indicar estado de erro
   */
  error?: boolean | string;

  /**
   * Mensagem de sucesso ou booleano para indicar estado de sucesso
   */
  success?: boolean | string;

  /**
   * Escala de tamanho do campo:
   * - `xs`: 32px altura
   * - `sm`: 40px altura
   * - `md`: 48px altura (padrão oficial do Figma)
   * - `lg`: 56px altura
   * @default 'md'
   */
  size?: TextFieldSize;

  /**
   * Ícone exibido à esquerda (prefixo)
   */
  leftIcon?: string | React.ReactNode;

  /**
   * Ícone exibido à direita (sufixo)
   */
  rightIcon?: string | React.ReactNode;

  /**
   * Se verdadeiro, exibe botão de limpar o texto quando houver valor
   * @default false
   */
  clearable?: boolean;

  /**
   * Callback disparado ao clicar no botão de limpar
   */
  onClear?: () => void;

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais para o container externo
   */
  className?: string;

  /**
   * Estilos CSS inline para o container externo
   */
  style?: React.CSSProperties;

  /**
   * Classes CSS adicionais para o elemento <input>
   */
  inputClassName?: string;
}

/**
 * Propriedades do campo de senha PasswordInput
 * Component Set 6107:840 & 24618:26361
 */
export interface PasswordInputProps extends Omit<TextFieldProps, 'type' | 'rightIcon'> {
  /**
   * Se verdadeiro, exibe botão de alternar visibilidade da senha (olho)
   * @default true
   */
  showVisibilityToggle?: boolean;

  /**
   * Estado inicial de visibilidade da senha
   * @default false
   */
  defaultVisible?: boolean;

  /**
   * Callback disparado quando a visibilidade da senha é alternada
   */
  onVisibilityChange?: (visible: boolean) => void;
}

/**
 * Propriedades do campo de busca SearchInput
 * Component Set 6110:532
 */
export interface SearchInputProps extends TextFieldProps {
  /**
   * Callback disparado ao pressionar Enter ou clicar na lupa de busca
   */
  onSearch?: (value: string) => void;
}

/**
 * Propriedades do campo multilinha TextArea
 * Component Set 6110:467 & 16381:716
 */
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Rótulo superior do campo
   */
  label?: React.ReactNode;

  /**
   * Se verdadeiro, exibe asterisco vermelho de obrigatoriedade (*)
   * @default false
   */
  required?: boolean;

  /**
   * Texto de ajuda ou orientação exibido abaixo do campo
   */
  helperText?: React.ReactNode;

  /**
   * Ícone ou botão de ajuda exibido ao lado do label
   */
  helperIcon?: boolean | string | React.ReactNode;

  /**
   * Mensagem de erro ou booleano para indicar estado de erro
   */
  error?: boolean | string;

  /**
   * Mensagem de sucesso ou booleano para indicar estado de sucesso
   */
  success?: boolean | string;

  /**
   * Limite máximo de caracteres permitidos
   */
  maxLength?: number;

  /**
   * Se verdadeiro, exibe o contador dinâmico de caracteres
   * @default true quando maxLength estiver definido
   */
  showCounter?: boolean;

  /**
   * Se o campo permite redimensionamento vertical
   * @default 'vertical'
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';

  /**
   * Tema visual: 'light' ou 'dark'
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Classes CSS adicionais para o container externo
   */
  className?: string;

  /**
   * Estilos CSS inline para o container externo
   */
  style?: React.CSSProperties;

  /**
   * Classes CSS adicionais para o elemento <textarea>
   */
  textareaClassName?: string;
}
