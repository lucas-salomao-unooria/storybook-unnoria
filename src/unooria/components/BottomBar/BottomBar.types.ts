import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes de exibição e layout da BottomBar.
 * - `fixed`: Ancorada na base com largura total, linha divisória superior sutil.
 * - `floating`: Barra flutuante tipo dock/pílula elevada com cantos arredondados, blur e sombra.
 * - `top-center`: Barra com botão central de ação proeminente elevado (+ / FAB integrado).
 */
export type BottomBarVariant = 'fixed' | 'floating' | 'top-center';

/**
 * Temas suportados pelo componente ('light' | 'dark').
 */
export type BottomBarTheme = UnooriaTheme;

/**
 * Estrutura de dados de um item de navegação da BottomBar.
 */
export interface BottomBarItemData {
  /**
   * Identificador único do item.
   */
  id: string;

  /**
   * Rótulo de texto visível ou acessível do item.
   */
  label: React.ReactNode;

  /**
   * Ícone visual do item (SVG ou ReactNode).
   */
  icon?: React.ReactNode;

  /**
   * Badge de notificação ou status exibido sobre o ícone/item.
   * Pode ser um número, texto (ex: "Novo", "99+"), boolean (dot) ou ReactNode.
   */
  badge?: React.ReactNode | string | number | boolean;

  /**
   * Indica se o item está selecionado/ativo.
   */
  active?: boolean;

  /**
   * Indica se o item está desabilitado.
   */
  disabled?: boolean;

  /**
   * URL de destino caso o item funcione como link navegável.
   */
  href?: string;

  /**
   * Callback acionado ao clicar no item.
   */
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Componente ou elemento HTML customizado para renderização polimórfica (ex: 'a', 'button', Next Link).
   */
  as?: React.ElementType;

  /**
   * Rótulo acessível ARIA caso o label visual seja customizado ou oculto.
   */
  ariaLabel?: string;

  /**
   * Classes CSS adicionais para o item.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais para o item.
   */
  style?: React.CSSProperties;

  /**
   * Propriedades extras arbitrárias passadas ao elemento.
   */
  [key: string]: any;
}

/**
 * Alias de compatibilidade para BottomBarItemData.
 */
export type BottomBarItem = BottomBarItemData;

/**
 * Propriedades do subcomponente individual `BottomBarItem`.
 */
export interface BottomBarItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick' | 'id'> {
  /**
   * Identificador único do item.
   */
  id: string;

  /**
   * Rótulo de texto do item.
   */
  label?: React.ReactNode;

  /**
   * Ícone exibido acima do rótulo.
   */
  icon?: React.ReactNode;

  /**
   * Badge ou marcador numérico de notificações.
   */
  badge?: React.ReactNode | string | number | boolean;

  /**
   * Se o item está ativo / selecionado.
   */
  active?: boolean;

  /**
   * Se o item está desabilitado para interação.
   */
  disabled?: boolean;

  /**
   * URL de destino caso funcione como link.
   */
  href?: string;

  /**
   * Se o rótulo de texto deve ser exibido.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Tema visual herdado da barra ou configurado localmente.
   */
  theme?: BottomBarTheme;

  /**
   * Callback disparado ao selecionar o item.
   */
  onClick?: (id: string, e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Elemento polimórfico para renderização (ex: 'button', 'a', Link).
   */
  as?: React.ElementType;

  /**
   * Rótulo acessível ARIA.
   */
  ariaLabel?: string;

  /**
   * Conteúdo filho customizado (caso não queira usar icon/label padrões).
   */
  children?: React.ReactNode;
}

/**
 * Variantes de cor e destaque para o botão de ação central (`BottomBarAction`).
 */
export type BottomBarActionVariant = 'primary' | 'secondary' | 'gradient' | 'danger';

/**
 * Propriedades do botão central de ação proeminente (`BottomBarAction`).
 */
export interface BottomBarActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Ícone exibido no botão central (padrão: ícone de soma / adição '+').
   */
  icon?: React.ReactNode;

  /**
   * Rótulo acessível ou tooltip do botão.
   * @default 'Ação rápida'
   */
  label?: string;

  /**
   * Variante visual do botão de ação.
   * @default 'primary'
   */
  variant?: BottomBarActionVariant;

  /**
   * Tamanho do botão central.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Tema visual ('light' | 'dark').
   */
  theme?: BottomBarTheme;

  /**
   * Se o botão está desabilitado.
   */
  disabled?: boolean;

  /**
   * Callback de clique do botão de ação.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Elemento polimórfico customizado (ex: 'button', 'a', Link).
   */
  as?: React.ElementType;

  /**
   * URL de destino caso funcione como link.
   */
  href?: string;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}

export interface BottomBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onSelect'> {
  /**
   * Variante de layout da BottomBar.
   * - `fixed`: Fixa/ancorada na base da tela com borda superior e fundo sólido/translúcido.
   * - `floating`: Estilo flutuante (dock) com cantos arredondados, blur e elevação.
   * - `top-center`: Barra com botão central de ação elevado (+ / FAB central).
   * @default 'fixed'
   */
  variant?: BottomBarVariant;

  /**
   * Tema visual do componente ('light' | 'dark').
   * @default 'light'
   */
  theme?: BottomBarTheme;

  /**
   * Lista declarativa de itens de navegação.
   */
  items?: BottomBarItemData[];

  /**
   * ID do item selecionado no modo controlado.
   */
  activeId?: string;

  /**
   * ID do item inicialmente selecionado no modo não-controlado.
   */
  defaultActiveId?: string;

  /**
   * Callback acionado sempre que um item for selecionado.
   */
  onChange?: (id: string) => void;

  /**
   * Alias para `onChange`.
   */
  onSelect?: (id: string) => void;

  /**
   * Botão de ação central para a variante `top-center` ou customização.
   * Pode ser um elemento ReactNode ou o objeto com as props do `BottomBarActionProps`.
   */
  centerAction?: React.ReactNode | BottomBarActionProps;

  /**
   * Se deve fixar a barra automaticamente no rodapé do viewport (`position: fixed; bottom: 0`).
   * Se `false`, o componente se comporta de forma relativa/fluida dentro do container pai.
   * @default false
   */
  fixedToBottom?: boolean;

  /**
   * Se deve exibir os textos/labels dos itens.
   * Quando `false`, apenas os ícones são exibidos com badges.
   * @default true
   */
  showLabels?: boolean;

  /**
   * Se deve aplicar espaçamento inferior para safe-area de dispositivos móveis (iPhone/Android notch/home indicator).
   * @default true
   */
  safeArea?: boolean;

  /**
   * Largura máxima para a barra flutuante ou contida (ex: '560px', '100%').
   */
  maxWidth?: string | number;

  /**
   * Rótulo de acessibilidade ARIA para a tag `<nav>`.
   * @default 'Navegação inferior'
   */
  ariaLabel?: string;

  /**
   * Filhos para renderização componível através de `<BottomBarItem>` e `<BottomBarAction>`.
   */
  children?: React.ReactNode;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Estilos CSS inline adicionais.
   */
  style?: React.CSSProperties;
}
