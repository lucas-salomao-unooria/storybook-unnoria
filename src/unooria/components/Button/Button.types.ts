import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';
export type UnooriaTheme = 'light' | 'dark';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variantes estéticas do botão */
  variant?: ButtonVariant;
  /** Tamanhos do botão (sm: 36px, md: 44px, lg: 52px) */
  size?: ButtonSize;
  /** Estado isolado forçado para documentação/testes */
  state?: ButtonState;
  /** Força o estado de Hover */
  isHovered?: boolean;
  /** Força o estado de Active (pressionado) */
  isActive?: boolean;
  /** Força o estado de Focus (foco de teclado) */
  isFocused?: boolean;
  /** Estado de desabilitado */
  isDisabled?: boolean;
  /** Estado de carregamento com spinner */
  isLoading?: boolean;
  /** Ícone exibido à esquerda do texto */
  leftIcon?: React.ReactNode;
  /** Ícone exibido à direita do texto */
  rightIcon?: React.ReactNode;
  /** Se verdadeiro, o botão ocupa 100% da largura do contêiner */
  fullWidth?: boolean;
  /** Tema visual do componente ('light' | 'dark') */
  theme?: UnooriaTheme;
  /** Conteúdo textual ou elementos React */
  children?: React.ReactNode;
}
