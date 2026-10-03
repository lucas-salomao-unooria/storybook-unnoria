import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Modos de layout da SideBar: colapsada (compacta com ícones) ou expandida com painel de apps (Figma #21592:856).
 */
export type SideBarLayout = 'collapsed' | 'expanded' | 'apps-panel';

/**
 * Temas suportados pelo componente SideBar.
 */
export type SideBarTheme = UnooriaTheme | 'light' | 'dark';

/**
 * Estrutura de um item de aplicativo para a gaveta lateral (Side Bar Apps / Variant2).
 */
export interface SideBarAppItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  badge?: React.ReactNode | number | string;
  active?: boolean;
}

/**
 * Estrutura de dados para declaração de itens de navegação da SideBar.
 */
export interface SideBarItemData {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode | number | string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>, item?: SideBarItemData) => void;
  href?: string;
  tooltip?: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export type SideBarItem = SideBarItemData;

/**
 * Propriedades do subcomponente SideBarItem (Button Sidebar do Figma #21592:599).
 */
export interface SideBarItemProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode | number | string;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  as?: React.ElementType;
  theme?: SideBarTheme;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Propriedades do componente principal SideBar.
 */
export interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
  items?: SideBarItemData[];
  topItems?: SideBarItemData[];
  bottomItems?: SideBarItemData[];
  appsItems?: SideBarAppItem[];
  /**
   * Exibe o botão de aplicativos ("Iniciativas") no topo da barra. Padrão
   * `true`. Passe `false` quando o produto não tem painel de aplicativos: o
   * botão, sozinho, abriria um painel vazio — um item de menu que não leva a
   * lugar nenhum. Com `false`, o painel também não abre, mesmo com `isAppsOpen`.
   */
  showApps?: boolean;
  /** Rótulo do botão de aplicativos. Padrão `"Iniciativas"`. */
  appsLabel?: React.ReactNode;
  /** Dica (tooltip) do botão de aplicativos. Padrão `"Iniciativas & Apps"`. */
  appsTooltip?: string;
  isAppsOpen?: boolean;
  onAppsToggle?: (isOpen: boolean) => void;
  showNaiAssistant?: boolean;
  onNaiClick?: () => void;
  activeId?: string;
  defaultActiveId?: string;
  onItemClick?: (id: string, item?: SideBarItemData) => void;
  theme?: SideBarTheme;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
