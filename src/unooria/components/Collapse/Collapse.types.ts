import React from 'react';

/**
 * Temas suportados pelo componente Collapse
 */
export type CollapseTheme = 'light' | 'dark';

/**
 * Variantes visuais do componente Collapse
 * - default: Borda sutil de 1px padrão com fundo neutro
 * - bordered: Borda destacada com cantos arredondados
 * - card: Estilo card com elevação sutil e espaçamento dedicado
 */
export type CollapseVariant = 'default' | 'bordered' | 'card';

/**
 * Tamanhos do componente Collapse
 */
export type CollapseSize = 'sm' | 'md' | 'lg';

/**
 * Variantes de estilo para o conteúdo interno (Body/Panel)
 * - text: Estilo padrão para blocos de texto corrido
 * - slot: Estilo com borda tracejada ou container reservado para inserção de componentes
 * - select: Estilo para seleção de itens interativos
 * - custom: Sem estilização embutida
 */
export type CollapseMediaVariant = 'text' | 'slot' | 'select' | 'custom';

/**
 * Configuração detalhada para a barra de progresso do Collapse
 */
export interface CollapseProgressConfig {
  /**
   * Valor numérico de 0 a 100
   */
  value: number;
  /**
   * Se true, renderiza o texto numérico percentual (ex: 80%)
   * @default true
   */
  showLabel?: boolean;
  /**
   * Cor customizada da barra indicadora de progresso
   * @default '#01B574'
   */
  color?: string;
  /**
   * Função para customização da exibição do rótulo
   */
  formatLabel?: (value: number) => React.ReactNode;
}

/**
 * Props para o subcomponente CollapseHeader
 */
export interface CollapseHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
  /**
   * Título principal exibido no cabeçalho
   */
  title?: React.ReactNode;
  /**
   * Nível do título no sumário da página. Ver `titleAs` em `CollapseProps`.
   * @default 'h4'
   */
  titleAs?: CollapseTitleProps['as'];
  /**
   * Subtítulo descritivo exibido abaixo do título
   */
  subtitle?: React.ReactNode;
  /**
   * Alias de subtitle (descrição adicional)
   */
  description?: React.ReactNode;
  /**
   * Ícone posicionado antes do título (leading icon)
   */
  leadingIcon?: React.ReactNode;
  /**
   * Ícone customizado de expansão/recolhimento ou render prop
   */
  icon?: React.ReactNode | ((state: { isOpen: boolean; disabled?: boolean }) => React.ReactNode);
  /**
   * Alias para icon
   */
  expandIcon?: React.ReactNode | ((state: { isOpen: boolean; disabled?: boolean }) => React.ReactNode);
  /**
   * Ação ou elemento extra posicionado à direita no cabeçalho
   */
  extra?: React.ReactNode;
  /**
   * Se o cabeçalho está desabilitado para interação
   */
  disabled?: boolean;
  /**
   * Se o collapse está aberto
   */
  isOpen?: boolean;
  /**
   * Callback de clique
   */
  onToggle?: (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Estilos CSS inline adicionais
   */
  style?: React.CSSProperties;
  /**
   * Conteúdo customizado filho
   */
  children?: React.ReactNode;
}

/**
 * Props para o subcomponente CollapseTitle
 */
export interface CollapseTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Tag HTML semântica
   * @default 'h4'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  /**
   * Tamanho tipográfico do título
   */
  size?: CollapseSize;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Conteúdo
   */
  children?: React.ReactNode;
}

/**
 * Props para o subcomponente CollapseSubtitle
 */
export interface CollapseSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Conteúdo
   */
  children?: React.ReactNode;
}

/**
 * Props para o subcomponente CollapseProgressBar
 */
export interface CollapseProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor do progresso de 0 a 100
   */
  value: number;
  /**
   * Cor da barra de progresso (indicador)
   * @default '#01B574'
   */
  color?: string;
  /**
   * Se o label percentual deve ser renderizado
   * @default true
   */
  showLabel?: boolean;
  /**
   * Rótulo customizado do progresso
   */
  label?: React.ReactNode;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Estilos inline adicionais
   */
  style?: React.CSSProperties;
}

/**
 * Props para o subcomponente CollapseBody / CollapsePanel
 */
export interface CollapsePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Se o painel está aberto
   */
  isOpen?: boolean;
  /**
   * Variante visual de layout do conteúdo de mídia
   * @default 'custom'
   */
  variant?: CollapseMediaVariant;
  /**
   * Espaçamento interno do corpo
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | string | number;
  /**
   * ID para vínculo ARIA com o cabeçalho
   */
  id?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;
  /**
   * Conteúdo interno do painel
   */
  children?: React.ReactNode;
}

/**
 * Alias de CollapsePanelProps
 */
export type CollapseBodyProps = CollapsePanelProps;

/**
 * Props para um item de Collapse dentro de grupos ou listas
 */
export interface CollapseItemProps {
  /**
   * Identificador único do item
   */
  id: string | number;
  /**
   * Título principal
   */
  title: React.ReactNode;
  /**
   * Subtítulo / descrição
   */
  subtitle?: React.ReactNode;
  /**
   * Alias de subtitle
   */
  description?: React.ReactNode;
  /**
   * Conteúdo do painel
   */
  content?: React.ReactNode;
  /**
   * Se o item está desabilitado
   */
  disabled?: boolean;
  /**
   * Se a barra de progresso está visível
   */
  showProgressBar?: boolean;
  /**
   * Valor numérico de progresso (0-100)
   */
  progress?: number | CollapseProgressConfig;
  /**
   * Se está aberto por padrão
   */
  defaultOpen?: boolean;
}

/**
 * Props principais do componente Collapse
 */
export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
  /**
   * Título exibido no cabeçalho (atalho declarativo)
   */
  title?: React.ReactNode;
  /**
   * Nível do título no sumário da página.
   *
   * O padrão é `h4`, e ele só está certo quando a sanfona vive debaixo de um
   * `h3`. Numa página que abre a seção com `h2` — uma lista de perguntas
   * frequentes, por exemplo — o padrão pula um nível, e verificador de
   * acessibilidade aponta. Compor à mão com `Collapse.Title as="h3"` resolvia,
   * ao custo de refazer a ligação `aria-expanded`/`aria-controls` que o atalho
   * declarativo já faz certo; por isso o nível passa a ser prop.
   *
   * Só vale quando `title` é texto: um `title` que já chega como elemento
   * manda em si mesmo.
   *
   * @default 'h4'
   */
  titleAs?: CollapseTitleProps['as'];
  /**
   * Subtítulo ou descrição exibida no cabeçalho (atalho declarativo)
   */
  subtitle?: React.ReactNode;
  /**
   * Alias de subtitle
   */
  description?: React.ReactNode;
  /**
   * Ícone posicionado antes do título (leading icon)
   */
  leadingIcon?: React.ReactNode;
  /**
   * Estado de abertura do Collapse (modo controlado)
   */
  isOpen?: boolean;
  /**
   * Estado de abertura inicial (modo não controlado)
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Callback disparado quando o estado de expansão é alternado
   */
  onToggle?: (isOpen: boolean, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  /**
   * Se o componente está desabilitado
   * @default false
   */
  disabled?: boolean;
  /**
   * Se a barra de progresso deve ser exibida
   * @default false
   */
  showProgressBar?: boolean;
  /**
   * Valor do progresso (0 a 100) ou objeto de configuração
   */
  progress?: number | CollapseProgressConfig;
  /**
   * Cor da barra de preenchimento do progresso
   * @default '#01B574'
   */
  progressColor?: string;
  /**
   * Ícone de expansão customizado ou render prop
   */
  icon?: React.ReactNode | ((state: { isOpen: boolean; disabled?: boolean }) => React.ReactNode);
  /**
   * Alias para icon
   */
  expandIcon?: React.ReactNode | ((state: { isOpen: boolean; disabled?: boolean }) => React.ReactNode);
  /**
   * Ação ou elemento extra exibido no cabeçalho
   */
  headerExtra?: React.ReactNode;
  /**
   * Tamanho do componente
   * @default 'md'
   */
  size?: CollapseSize;
  /**
   * Tema visual (Light ou Dark)
   * @default 'light'
   */
  theme?: CollapseTheme;
  /**
   * Variante visual do contêiner
   * @default 'default'
   */
  variant?: CollapseVariant;
  /**
   * Variante do corpo de mídia/conteúdo quando usado com props declarativas
   * @default 'custom'
   */
  mediaVariant?: CollapseMediaVariant;
  /**
   * ID único do contêiner para acessibilidade
   */
  id?: string;
  /**
   * ID específico do cabeçalho
   */
  headerId?: string;
  /**
   * ID específico da área de conteúdo (painel)
   */
  contentId?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Estilos CSS inline
   */
  style?: React.CSSProperties;
  /**
   * Conteúdo filho (corpo ou subcomponentes)
   */
  children?: React.ReactNode;
}
