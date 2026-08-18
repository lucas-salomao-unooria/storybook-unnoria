import React from 'react';

/**
 * Estilo visual da aba: 'line' (indicador de linha inferior do Figma) ou 'pill' (estilo pílula)
 */
export type TabVariant = 'line' | 'pill';

/**
 * Escala visual da aba
 */
export type TabSize = 'sm' | 'md' | 'lg';

/**
 * Definição individual de uma aba no modo baseado em dados
 */
export interface TabItem {
  /**
   * Identificador único do valor da aba.
   */
  value: string | number;

  /**
   * Rótulo textual da aba.
   */
  label: React.ReactNode;

  /**
   * Nome do ícone Material Symbols opcional.
   */
  icon?: string;

  /**
   * Se exibe o ícone (Figma: Show icon).
   * @default true
   */
  showIcon?: boolean;

  /**
   * Conteúdo do badge / contador numérico (Figma: Exibir camadas).
   */
  badge?: React.ReactNode;

  /**
   * Se exibe o badge / contador.
   * @default true
   */
  showBadge?: boolean;

  /**
   * Se a aba está desabilitada para interação.
   * @default false
   */
  disabled?: boolean;

  /**
   * Painel de conteúdo associado à aba.
   */
  content?: React.ReactNode;
}

/**
 * Propriedades do componente mestre Tabs
 * Plataforma Unooria - Extraído do Figma (Node 12694:10183 / Component Set 12694:10195)
 */
export interface TabsProps {
  /**
   * Valor da aba ativa controlada externamente.
   */
  value?: string | number;

  /**
   * Valor da aba ativa padrão inicial (modo não controlado).
   */
  defaultValue?: string | number;

  /**
   * Callback disparado quando a aba ativa é alterada.
   */
  onChange?: (value: string | number) => void;

  /**
   * Lista de abas no modo baseado em dados.
   */
  items?: TabItem[];

  /**
   * Variante visual das abas.
   * @default 'line'
   */
  variant?: TabVariant;

  /**
   * Escala de tamanho das abas.
   * @default 'md'
   */
  size?: TabSize;

  /**
   * Se verdadeiro, as abas expandem igualmente para ocupar 100% da largura do container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Tema visual: 'light' (fundo claro) ou 'dark' (fundo escuro #22272A).
   * @default 'light'
   */
  theme?: 'light' | 'dark';

  /**
   * Filhos declarativos (Tabs.List, Tabs.Tab, Tabs.Panel).
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

/**
 * Propriedades do subcomponente individual Tab
 */
export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Valor identificador associado a esta aba.
   */
  value: string | number;

  /**
   * Rótulo principal da aba (opcional se passado via children).
   */
  label?: React.ReactNode;

  /**
   * Nome do ícone Material Symbols.
   */
  icon?: string;

  /**
   * Se exibe o ícone.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Contador ou badge (ex: 1, "Novo").
   */
  badge?: React.ReactNode;

  /**
   * Se exibe o badge.
   * @default true
   */
  showBadge?: boolean;

  /**
   * Se a aba está desabilitada.
   */
  disabled?: boolean;

  /**
   * Conteúdo interno opcional.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente TabList
 */
export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Se as abas ocupam 100% da largura.
   */
  fullWidth?: boolean;

  /**
   * Filhos (Tabs).
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente TabPanel
 */
export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor identificador correspondente à aba ativa para exibição deste painel.
   */
  value: string | number;

  /**
   * Conteúdo do painel.
   */
  children?: React.ReactNode;
}
