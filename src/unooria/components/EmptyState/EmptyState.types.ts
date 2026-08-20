import React from 'react';
import type { ButtonVariant, ButtonSize } from '../Button';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes semânticas e contextuais suportadas pelo componente EmptyState
 */
export type EmptyStateVariant =
  | 'no-data'
  | 'no-results'
  | 'error'
  | 'permission'
  | 'success'
  | 'custom';

/**
 * Escala de tamanhos padronizada para o EmptyState
 * - sm: Compacto para cards, modais e containers reduzidos (ilustração 48px, tipografia compacta)
 * - md: Padrão para listas, tabelas e seções (ilustração 64px)
 * - lg: Amplo para páginas inteiras e áreas principais (ilustração 80px+)
 */
export type EmptyStateSize = 'sm' | 'md' | 'lg';

/**
 * Alinhamento horizontal do conteúdo
 */
export type EmptyStateAlign = 'center' | 'left';

/**
 * Estrutura de configuração declarativa para ações/botões do EmptyState
 */
export interface EmptyStateAction {
  /** Rótulo textual da ação */
  label: React.ReactNode;
  /** Função de callback disparada ao clicar na ação */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Ícone exibido junto ao rótulo do botão */
  icon?: React.ReactNode;
  /** Posição do ícone ('left' | 'right') */
  iconPosition?: 'left' | 'right';
  /** Variante visual do botão Unooria (primary, secondary, outline, ghost, danger) */
  variant?: ButtonVariant;
  /** Tamanho do botão */
  size?: ButtonSize;
  /** Se a ação está desabilitada */
  disabled?: boolean;
  /** Se a ação está em estado de carregamento */
  loading?: boolean;
  /** Texto exibido durante o carregamento */
  loadingText?: string;
  /** Link de destino quando a ação funciona como âncora */
  href?: string;
  /** Destino do link (ex: '_blank') */
  target?: string;
  /** Elemento polimórfico customizado */
  as?: React.ElementType;
  /** Classes CSS adicionais */
  className?: string;
  /** Estilos inline adicionais */
  style?: React.CSSProperties;
  /** Propriedades adicionais repassadas ao botão */
  [key: string]: unknown;
}

/**
 * Propriedades públicas do componente EmptyState
 */
export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Variante contextual do estado vazio.
   * Define a ilustração vetorial padrão e a paleta de cores correspondente.
   * @default 'no-data'
   */
  variant?: EmptyStateVariant;

  /**
   * Título principal que resume o motivo da ausência de dados.
   * @example "Nenhum resultado encontrado", "Você ainda não começou nenhum curso"
   */
  title?: React.ReactNode;

  /**
   * Texto descritivo complementar que orienta e sugere os próximos passos ao usuário.
   */
  description?: React.ReactNode;

  /**
   * Ícone ou ilustração visual a ser exibida acima do texto.
   * - `true` (padrão): Exibe a ilustração SVG vetorial padrão da variante selecionada.
   * - `false`: Oculta qualquer ícone ou ilustração.
   * - `React.ReactNode`: Renderiza um ícone ou ilustração SVG customizada.
   * @default true
   */
  icon?: boolean | React.ReactNode;

  /**
   * Ilustração customizada de maior dimensão (alias/substituto de alta prioridade para `icon`).
   */
  illustration?: React.ReactNode;

  /**
   * Escala de tamanho do componente.
   * @default 'md'
   */
  size?: EmptyStateSize;

  /**
   * Alinhamento horizontal do conteúdo.
   * @default 'center'
   */
  align?: EmptyStateAlign;

  /**
   * Tema visual da interface ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Ação primária em destaque (Filled/Primary).
   * Pode ser um objeto declarativo `EmptyStateAction` ou um nó React customizado.
   */
  primaryAction?: EmptyStateAction | React.ReactNode;

  /**
   * Ação secundária complementar (Subtle/Outline).
   * Pode ser um objeto declarativo `EmptyStateAction` ou um nó React customizado.
   */
  secondaryAction?: EmptyStateAction | React.ReactNode;

  /**
   * Se verdadeiro, exibe uma borda sutil e fundo adaptado em formato de card/container.
   * @default false
   */
  bordered?: boolean;

  /**
   * Se verdadeiro, remove os paddings externos padrão para encaixe perfeito em containers reduzidos.
   * @default false
   */
  compact?: boolean;

  /**
   * Se verdadeiro, expande o contêiner para 100% da largura disponível.
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Conteúdo flexível complementar ou nós filhos injetados no corpo do EmptyState.
   */
  children?: React.ReactNode;
}
