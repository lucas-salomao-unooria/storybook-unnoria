import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes de exibição e layout da BottomBar conforme o Figma (Node #3340:11320).
 * - `fixed`: Ancorada na base com largura total.
 * - `floating`: Barra flutuante tipo dock/pílula elevada com cantos arredondados, blur e sombra.
 * - `mobile-dock` / `menu-mob`: Dock mobile compacto (ícones apps + menu) com popover vertical expansível.
 * - `top-center`: Barra com botão central de ação proeminente elevado (+ / FAB integrado).
 */
export type BottomBarVariant = 'fixed' | 'floating' | 'mobile-dock' | 'top-center';

/**
 * Temas suportados pelo componente ('light' | 'dark').
 */
export type BottomBarTheme = UnooriaTheme;

/**
 * Item de menu para o popover mobile (Menu-Mob).
 */
export interface BottomBarMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  badge?: React.ReactNode | number | string;
  active?: boolean;
  disabled?: boolean;
}

/**
 * Estrutura de dados de um item de navegação da BottomBar.
 */
export interface BottomBarItemData {
  /** Identificador único do item */
  id: string;
  /** Rótulo de texto visível ou acessível do item */
  label: React.ReactNode;
  /** Ícone visual do item (SVG ou ReactNode) */
  icon?: React.ReactNode;
  /** Texto do Tooltip superior exibido no hover (com 4px de distância conforme Figma) */
  tooltip?: string;
  /** Badge de notificação ou contagem */
  badge?: React.ReactNode | string | number | boolean;
  /** Indica se o item está selecionado/ativo */
  active?: boolean;
  /** Indica se o item está desabilitado */
  disabled?: boolean;
  /** URL de destino caso o item funcione como link navegável */
  href?: string;
  /** Callback acionado ao clicar no item */
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;
  /** Componente ou elemento HTML customizado para renderização polimórfica */
  as?: React.ElementType;
  /** Rótulo acessível ARIA */
  ariaLabel?: string;
  /** Classes CSS adicionais para o item */
  className?: string;
  /** Estilos CSS inline adicionais para o item */
  style?: React.CSSProperties;
  /** Propriedades extras arbitrárias passadas ao elemento */
  [key: string]: unknown;
}

export type BottomBarItem = BottomBarItemData;

/**
 * Propriedades do subcomponente individual `BottomBarItem`.
 */
export interface BottomBarItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'id'> {
  id: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  tooltip?: string;
  badge?: React.ReactNode | string | number | boolean;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;
  as?: React.ElementType;
  theme?: BottomBarTheme;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Propriedades do botão de ação central (`BottomBarAction`).
 */
export interface BottomBarActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  theme?: BottomBarTheme;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  as?: React.ElementType;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Propriedades do componente principal `BottomBar`.
 */
export interface BottomBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items?: BottomBarItemData[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string, item?: BottomBarItemData) => void;
  variant?: BottomBarVariant;
  theme?: BottomBarTheme;
  maxWidth?: string | number;
  hasSafeArea?: boolean;
  action?: BottomBarActionProps | React.ReactNode;
  actionPosition?: 'center' | 'end';
  menuMobItems?: BottomBarMenuItem[];
  isMenuMobOpen?: boolean;
  onMenuMobToggle?: (isOpen: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
