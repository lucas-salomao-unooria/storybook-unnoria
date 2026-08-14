import React from 'react';

/**
 * Variantes visuais disponíveis para o Button
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Escala de tamanhos padronizada da Unooria
 * - sm: 36px de altura
 * - md: 44px de altura (padrão)
 * - lg: 52px de altura
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Estados interativos e de homologação visual suportados
 */
export type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

import type { UnooriaTheme } from '../../tokens';

export type ButtonTheme = UnooriaTheme;

/**
 * Propriedades públicas do componente Button
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual e nível hierárquico da ação */
  variant?: ButtonVariant;
  /** Tamanho do botão e escala tipográfica */
  size?: ButtonSize;
  /** Tema de cor da interface (Light ou Dark) */
  theme?: UnooriaTheme;
  /** Força um estado isolado para testes visuais e documentação */
  state?: ButtonState;
  /** Força o estado de hover */
  isHovered?: boolean;
  /** Força o estado ativo / pressionado */
  isActive?: boolean;
  /** Força o estado de foco */
  isFocused?: boolean;
  /** Desabilita o botão aplicando estilos e bloqueando interações */
  isDisabled?: boolean;
  /** Exibe indicador de carregamento animado (spinner) e bloqueia ações */
  isLoading?: boolean;
  /** Texto alternativo a ser exibido durante o estado de carregamento */
  loadingText?: string;
  /** Elemento ou ícone renderizado à esquerda do texto */
  leftIcon?: React.ReactNode;
  /** Elemento ou ícone renderizado à direita do texto */
  rightIcon?: React.ReactNode;
  /** Expande o botão para ocupar 100% da largura do contêiner */
  fullWidth?: boolean;
  /** Permite renderizar o botão como outro elemento React ou tag HTML (ex: 'a') */
  as?: React.ElementType;
  /** URL de destino quando renderizado como link */
  href?: string;
  /** Alvo de abertura quando renderizado como link */
  target?: string;
  /** Relação do link quando renderizado como link */
  rel?: string;
  /** Conteúdo interno ou rótulo textual do botão */
  children?: React.ReactNode;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
  /** Atributos arbitrários adicionais para renderização polimórfica */
  [key: string]: any;
}
