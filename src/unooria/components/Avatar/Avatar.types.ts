import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Tamanhos disponíveis para o Avatar da Plataforma Unooria.
 * - xs: 32px
 * - sm: 40px
 * - md: 48px (Padrão)
 * - lg: 72px
 * - xl: 100px
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Variantes de formato geométrico do Avatar.
 * - circle: Formato circular perfeito (border-radius: 9999px)
 * - rounded: Cantos suavemente arredondados proporcionais ao tamanho
 * - square: Formato quadrado com leve chanfro
 */
export type AvatarVariant = 'circle' | 'square' | 'rounded';

/**
 * Status de disponibilidade/presença do usuário.
 * - online: Ponto verde (#01B574)
 * - offline: Ponto cinza (#A7B5B9)
 * - busy: Ponto vermelho (#F83B3B)
 * - away: Ponto âmbar (#F97607)
 * - none: Nenhum indicador de status exibido
 */
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

/**
 * Estados visuais e funcionais pré-definidos do Avatar conforme especificação do Figma.
 * - default: Avatar padrão
 * - notification: Avatar com badge de notificação no canto superior
 * - selected: Avatar selecionado com borda em gradiente Unooria
 * - default_remove: Avatar padrão com botão de remoção (X) no canto superior direito
 * - selected_remove: Avatar com borda em gradiente e botão de remoção ativo
 */
export type AvatarState =
  | 'default'
  | 'notification'
  | 'selected'
  | 'default_remove'
  | 'selected_remove';

/**
 * Alias de tema do Avatar para retrocompatibilidade e tipagem explícita.
 */
export type AvatarTheme = UnooriaTheme;

/**
 * Propriedades do componente Avatar da Plataforma Unooria.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL da imagem do avatar.
   */
  src?: string;

  /**
   * Fontes responsivas de imagem (srcset).
   */
  srcSet?: string;

  /**
   * Texto alternativo para acessibilidade da imagem.
   * Se não fornecido, utiliza o valor de `name` ou 'Avatar do usuário'.
   */
  alt?: string;

  /**
   * Nome completo ou de exibição do usuário.
   * Utilizado para gerar iniciais automáticas (ex: 'Lucas Salomão' -> 'LS')
   * quando `src` não for fornecido ou falhar no carregamento.
   */
  name?: string;

  /**
   * Ícone customizado (ReactNode/SVG) para renderização no centro do Avatar.
   */
  icon?: React.ReactNode;

  /**
   * Tamanho dimensional do Avatar.
   * Suporta: 'xs' (32px), 'sm' (40px), 'md' (48px), 'lg' (72px), 'xl' (100px).
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Formato geométrico do Avatar.
   * Suporta: 'circle' | 'square' | 'rounded'.
   * @default 'circle'
   */
  variant?: AvatarVariant;

  /**
   * Indicador de status de presença no canto inferior.
   * Suporta: 'online' | 'offline' | 'busy' | 'away' | 'none'.
   * @default 'none'
   */
  status?: AvatarStatus;

  /**
   * Estado visual/funcional do componente.
   * Suporta: 'default' | 'notification' | 'selected' | 'default_remove' | 'selected_remove'.
   * @default 'default'
   */
  state?: AvatarState;

  /**
   * Define explicitamente se o Avatar possui a borda com gradiente de seleção Unooria.
   * Se `true` ou se `state` for 'selected' / 'selected_remove', a borda em gradiente é ativada.
   * @default false
   */
  selected?: boolean;

  /**
   * Badge de notificação no canto superior direito.
   * Pode ser um booleano (para dot simples), um número, string ou ReactNode.
   */
  badge?: React.ReactNode | number | string | boolean;

  /**
   * Contador numérico para o badge de notificação.
   */
  badgeCount?: number;

  /**
   * Define se o botão de remoção (X) deve ser exibido no canto superior direito.
   * Ativado se `true` ou se `state` for 'default_remove' / 'selected_remove'.
   * @default false
   */
  isRemovable?: boolean;

  /**
   * Callback acionado ao clicar no botão de remoção (X).
   */
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Tema visual do Avatar ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Define se o avatar está desabilitado (reduz a opacidade e desativa cliques).
   * @default false
   */
  disabled?: boolean;

  /**
   * Elemento customizado de fallback caso a imagem falhe e não haja `name` ou `icon`.
   */
  fallback?: React.ReactNode;

  /**
   * Elemento HTML customizado para renderização polimórfica (ex: 'div', 'span', 'button', 'a').
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;

  /**
   * Callback acionado ao clicar no avatar (quando interativo).
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Opções de espaçamento e sobreposição do AvatarGroup.
 */
export type AvatarGroupSpacing = 'tight' | 'normal' | 'relaxed' | number;

/**
 * Propriedades do componente AvatarGroup da Plataforma Unooria.
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Elementos Avatar filhos a serem agrupados.
   */
  children?: React.ReactNode;

  /**
   * Quantidade máxima de avatares visíveis antes de exibir o indicador de excesso (+N).
   */
  max?: number;

  /**
   * Quantidade total de avatares caso seja maior do que os nós passados em `children`.
   */
  total?: number;

  /**
   * Tamanho padrão repassado a todos os avatares filhos do grupo (caso não especifiquem um `size` próprio).
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Formato geométrico repassado a todos os avatares filhos.
   * @default 'circle'
   */
  variant?: AvatarVariant;

  /**
   * Tema visual repassado aos avatares filhos ('light' | 'dark').
   * @default 'light'
   */
  theme?: UnooriaTheme;

  /**
   * Espaçamento / sobreposição entre os avatares.
   * - tight: Sobreposição mais densa
   * - normal: Sobreposição padrão Unooria
   * - relaxed: Sobreposição suave
   * - number: Distância em pixels
   * @default 'normal'
   */
  spacing?: AvatarGroupSpacing;

  /**
   * Callback acionado ao clicar no indicador de excesso (+N).
   */
  onExtraClick?: (e: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * Rótulo acessível (aria-label) para o indicador de excesso (+N).
   * @default 'Ver mais usuários'
   */
  extraAriaLabel?: string;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}
