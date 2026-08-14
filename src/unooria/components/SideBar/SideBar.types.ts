import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Modos de layout da SideBar: colapsada (compacta com ícones) ou expandida (completa).
 */
export type SideBarLayout = 'collapsed' | 'expanded';

/**
 * Temas suportados pelo componente SideBar.
 */
export type SideBarTheme = UnooriaTheme | 'light' | 'dark';

/**
 * Variantes de cor do Badge integrado aos itens da SideBar.
 */
export type SideBarBadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'
  | 'info';

/**
 * Informações do perfil de usuário para exibição no cabeçalho ou rodapé.
 */
export interface SideBarUserProfile {
  /** Nome de exibição do usuário */
  name: string;
  /** E-mail ou identificador secundário */
  email?: string;
  /** Elemento JSX de avatar ou URL de imagem */
  avatar?: React.ReactNode | string;
  /** Cargo, tag ou descrição de função */
  role?: string;
  /** Callback opcional ao clicar no perfil */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Estrutura de dados para declaração de itens de navegação da SideBar.
 */
export interface SideBarItemData {
  /** Identificador único do item */
  id: string;
  /** Rótulo textual ou conteúdo do item */
  label: React.ReactNode;
  /** Ícone exibido à esquerda do rótulo */
  icon?: React.ReactNode;
  /** Contador numérico ou badge de notificação */
  badge?: React.ReactNode | number | string;
  /** Variante visual de cor do badge */
  badgeVariant?: SideBarBadgeVariant;
  /** Define se o item está selecionado / ativo */
  active?: boolean;
  /** Desabilita a interação com o item */
  disabled?: boolean;
  /** Callback executado ao clicar no item */
  onClick?: (e: React.MouseEvent<HTMLElement>, item?: SideBarItemData) => void;
  /** URL de destino caso o item funcione como link */
  href?: string;
  /** Alvo do link (ex: '_blank', '_self') */
  target?: string;
  /** Texto explicativo / tooltip exibido ao passar o mouse (especialmente no modo colapsado) */
  tooltip?: string;
  /** Elemento polimórfico para renderização (ex: 'a', 'button', Link) */
  as?: React.ElementType;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
  /** Rótulo de acessibilidade ARIA */
  ariaLabel?: string;
  /** Atributos arbitrários adicionais */
  [key: string]: any;
}

/**
 * Propriedades do subcomponente SideBarItem.
 */
export interface SideBarItemProps extends React.HTMLAttributes<HTMLElement> {
  /** Identificador único do item */
  id?: string;
  /** Rótulo ou conteúdo textual do item */
  label?: React.ReactNode;
  /** Ícone renderizado no item */
  icon?: React.ReactNode;
  /** Badge numérico ou de status */
  badge?: React.ReactNode | number | string;
  /** Variante visual do badge */
  badgeVariant?: SideBarBadgeVariant;
  /** Define se o item é o elemento ativo no momento */
  active?: boolean;
  /** Define se o item está desabilitado */
  disabled?: boolean;
  /** Sobrescreve o estado de colapso herdado do contexto */
  isCollapsed?: boolean;
  /** Callback acionado ao clicar no item */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** URL de navegação caso o item seja um link */
  href?: string;
  /** Alvo do link (ex: '_blank') */
  target?: string;
  /** Tooltip a ser exibido no hover (especialmente útil no modo colapsado) */
  tooltip?: string;
  /** Elemento HTML ou componente customizado (ex: 'button', 'a', Link) */
  as?: React.ElementType;
  /** Tema visual do item ('light' | 'dark') */
  theme?: SideBarTheme;
  /** Conteúdo filho customizado (caso não utilize a prop `label`) */
  children?: React.ReactNode;
  /** Classe CSS adicional */
  className?: string;
  /** Estilos inline adicionais */
  style?: React.CSSProperties;
  /** Propriedades extras arbitrárias */
  [key: string]: any;
}

/**
 * Propriedades do subcomponente SideBarSection.
 */
export interface SideBarSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Identificador da seção */
  id?: string;
  /** Título ou rótulo do grupo de navegação */
  title?: React.ReactNode;
  /** Lista declarativa de itens da seção */
  items?: SideBarItemData[];
  /** Permite recolher/expandir os itens desta seção individualmente */
  collapsible?: boolean;
  /** Estado inicial de recolhimento da seção individual */
  defaultCollapsed?: boolean;
  /** Filhos JSX do grupo (normalmente instâncias de SideBarItem) */
  children?: React.ReactNode;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
}

/**
 * Propriedades do subcomponente SideBarHeader.
 */
export interface SideBarHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Logo em imagem ou elemento React */
  logo?: React.ReactNode;
  /** Título da aplicação ou do produto */
  title?: React.ReactNode;
  /** Subtítulo descritivo ou versão */
  subtitle?: React.ReactNode;
  /** Perfil de usuário exibido no cabeçalho */
  user?: SideBarUserProfile;
  /** Exibe o botão de colapsar/expandir no cabeçalho */
  showToggleButton?: boolean;
  /** Elemento customizado para o botão de toggle */
  toggleButton?: React.ReactNode;
  /** Conteúdo customizado */
  children?: React.ReactNode;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
}

/**
 * Propriedades do subcomponente SideBarFooter.
 */
export interface SideBarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ações ou botões extras no rodapé (ex: Configurações, Ajuda, Sair) */
  actions?: React.ReactNode;
  /** Perfil de usuário exibido no rodapé */
  user?: SideBarUserProfile;
  /** Exibe o botão de colapsar/expandir no rodapé */
  showToggleButton?: boolean;
  /** Conteúdo customizado */
  children?: React.ReactNode;
  /** Classe CSS customizada */
  className?: string;
  /** Estilos inline customizados */
  style?: React.CSSProperties;
}

/**
 * Propriedades principais do componente SideBar da Plataforma Unooria.
 */
export interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Estado de expansão (controlado).
   * Se definido, o componente opera em modo controlado.
   */
  isExpanded?: boolean;

  /**
   * Estado inicial de expansão (não controlado).
   * @default true
   */
  defaultExpanded?: boolean;

  /**
   * Callback disparado quando o estado de expansão/colapso é alternado.
   */
  onToggleExpanded?: (isExpanded: boolean) => void;

  /**
   * Modo de layout direto ('collapsed' | 'expanded').
   * Alternativa semântica para `isExpanded`.
   */
  layout?: SideBarLayout;

  /**
   * Callback acionado na alteração de layout.
   */
  onLayoutChange?: (layout: SideBarLayout) => void;

  /**
   * Tema visual da SideBar ('light' | 'dark').
   * @default 'light'
   */
  theme?: SideBarTheme;

  /**
   * Largura da SideBar no estado expandido (em px ou string CSS).
   * @default 232
   */
  width?: number | string;

  /**
   * Largura da SideBar no estado colapsado (em px ou string CSS).
   * @default 44
   */
  collapsedWidth?: number | string;

  /**
   * Lista declarativa de seções e itens.
   */
  sections?: SideBarSectionProps[];

  /**
   * Lista declarativa direta de itens (caso não utilize seções).
   */
  items?: SideBarItemData[];

  /**
   * ID do item selecionado/ativo no momento.
   */
  activeItemId?: string;

  /**
   * Callback executado ao clicar em qualquer item gerenciado.
   */
  onItemClick?: (item: SideBarItemData, e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Cabeçalho customizado da SideBar (ou use o subcomponente `SideBarHeader`).
   */
  header?: React.ReactNode;

  /**
   * Rodapé customizado da SideBar (ou use o subcomponente `SideBarFooter`).
   */
  footer?: React.ReactNode;

  /**
   * Permite que a SideBar seja recolhida/expandida pelo usuário.
   * @default true
   */
  collapsible?: boolean;

  /**
   * Exibe o botão padrão de alternância de expansão/colapso.
   * @default true
   */
  showToggleButton?: boolean;

  /**
   * Posição do botão de alternância padrão.
   * @default 'header'
   */
  toggleButtonPosition?: 'header' | 'footer' | 'floating';

  /**
   * Rótulo de acessibilidade para a barra de navegação.
   * @default 'Navegação Principal'
   */
  ariaLabel?: string;

  /**
   * Conteúdo filho composto por subcomponentes (`SideBarHeader`, `SideBarSection`, `SideBarItem`, `SideBarFooter`).
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;

  /**
   * Estilos inline adicionais.
   */
  style?: React.CSSProperties;
}
