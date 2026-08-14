import React from 'react';
import type { UnooriaTheme } from '../../tokens';

/**
 * Variantes visuais disponíveis para o componente Card.
 * - `default`: Fundo padrão com borda sutil e sombra leve.
 * - `elevated`: Sombra projetada elegante com blur suave (Elevation 1 / Elevation 3 do Figma).
 * - `outlined`: Foco no contorno bem definido com borda destacada e sem sombra.
 * - `interactive`: Comporta-se como elemento clicável, com efeitos táteis de hover/active e foco acessível.
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

/**
 * Orientação estrutural do Card.
 * - `vertical`: Imagem no topo e conteúdo empilhado verticalmente (padrão).
 * - `horizontal`: Imagem na lateral esquerda e conteúdo à direita (layout side-by-side).
 */
export type CardOrientation = 'vertical' | 'horizontal';

/**
 * Temas visuais suportados pelo Card.
 */
export type CardTheme = UnooriaTheme;

/**
 * Opções de raio de curvatura das bordas (border-radius).
 * Baseado nas especificações do Figma (16px / 24px).
 */
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number | string;

/**
 * Opções de espaçamento interno (padding) do Card ou de seu conteúdo.
 */
export type CardPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string;

/**
 * Tamanhos tipográficos para o CardTitle.
 */
export type CardTitleSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Tags HTML válidas para renderização semântica do CardTitle.
 */
export type CardTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'p';

/**
 * Propriedades do subcomponente CardHeader.
 */
export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Avatar, ícone ou elemento visual exibido à esquerda no cabeçalho.
   */
  avatar?: React.ReactNode;

  /**
   * Título principal do cabeçalho. Se for string, pode ser encapsulado com CardTitle.
   */
  title?: React.ReactNode;

  /**
   * Subtítulo ou texto secundário do cabeçalho.
   */
  subtitle?: React.ReactNode;

  /**
   * Elemento de ação posicionado à direita (ex: botão de opções "...", tag ou ícone).
   */
  action?: React.ReactNode;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo flexível customizado para o cabeçalho.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardTitle.
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Tag HTML semântica a ser renderizada.
   * @default 'h3'
   */
  as?: CardTitleAs;

  /**
   * Tamanho tipográfico do título.
   * @default 'md'
   */
  size?: CardTitleSize;

  /**
   * Limita o texto em número de linhas ou adiciona reticências (ellipsis).
   * @default false
   */
  truncate?: boolean | number;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo do título.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardDescription.
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Ícone opcional exibido à esquerda da descrição.
   */
  icon?: React.ReactNode;

  /**
   * Limita o texto em número de linhas ou adiciona reticências (ellipsis).
   * @default false
   */
  truncate?: boolean | number;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo textual ou elementos da descrição.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardMedia.
 * Imagem de capa, banner ou vídeo com suporte ao nó Figma #7740:1778.
 */
export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * URL da imagem ou fonte de mídia.
   */
  src?: string;

  /**
   * Texto alternativo da imagem para acessibilidade.
   * @default ''
   */
  alt?: string;

  /**
   * Altura fixa ou customizada da mídia (ex: 244px no padrão Figma).
   * @default 244
   */
  height?: number | string;

  /**
   * Proporção de aspecto da imagem (ex: '16/9', '4/3', '1/1', '244/160').
   */
  aspectRatio?: string;

  /**
   * Modo de ajuste da imagem dentro do container (object-fit).
   * @default 'cover'
   */
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

  /**
   * Posição do ponto focal da imagem (object-position).
   * @default 'center'
   */
  position?: 'top' | 'center' | 'bottom' | string;

  /**
   * Camada de sobreposição (overlay) visual sobre a imagem (ex: gradiente, play button).
   */
  overlay?: React.ReactNode;

  /**
   * Badge ou tag flutuante sobreposta na mídia (ex: "Novo", "Premium").
   */
  badge?: React.ReactNode;

  /**
   * Posição da badge flutuante.
   * @default 'top-left'
   */
  badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo customizado filho da mídia (ex: iframe de vídeo, canvas, elementos extras).
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardContent.
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Espaçamento interno (padding) do container de conteúdo.
   * @default 'md'
   */
  padding?: CardPadding;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo interno do corpo do Card.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardFooter.
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Alinhamento horizontal dos elementos no rodapé.
   * @default 'space-between'
   */
  align?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';

  /**
   * Direção do fluxo dos itens no rodapé.
   * @default 'row'
   */
  direction?: 'row' | 'column';

  /**
   * Exibe uma linha divisória sutil na parte superior do rodapé.
   * @default false
   */
  divider?: boolean;

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Conteúdo do rodapé (ex: botões de ação primário/secundário, links, metadados).
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardBadgeGroup.
 * Container flexível para agrupar tags e subtags de categorias.
 */
export interface CardBadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Espaçamento entre as badges.
   * @default 'xs'
   */
  gap?: 'xs' | 'sm' | 'md' | number | string;

  /**
   * Permite quebra automática de linha quando o espaço for insuficiente.
   * @default true
   */
  wrap?: boolean;

  /**
   * Alinhamento horizontal das badges.
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';

  /**
   * Classes CSS adicionais.
   */
  className?: string;

  /**
   * Badges, chips ou tags filhas.
   */
  children?: React.ReactNode;
}

/**
 * Propriedades do subcomponente CardProgress.
 * Indicador circular de progresso SVG de alta fidelidade visual (0 a 100%).
 */
export interface CardProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Valor percentual do progresso (entre 0 e 100).
   */
  value: number;

  /**
   * Diâmetro do círculo em pixels.
   * @default 48
   */
  size?: number;

  /**
   * Espessura da borda/linha do círculo em pixels.
   * @default 4
   */
  strokeWidth?: number;

  /**
   * Cor da trilha de fundo do anel de progresso.
   */
  trackColor?: string;

  /**
   * Cor da barra ativa de progresso.
   */
  progressColor?: string;

  /**
   * Exibe o rótulo de texto com a porcentagem ou label.
   * @default true
   */
  showLabel?: boolean;

  /**
   * Texto customizado para exibição (se omitido, exibe `${value}%`).
   */
  label?: React.ReactNode;

  /**
   * Posição do rótulo textual.
   * @default 'inside'
   */
  labelPosition?: 'inside' | 'right' | 'bottom' | 'none';

  /**
   * Rótulo descritivo ou subtítulo posicionado ao lado/abaixo do indicador.
   */
  helperText?: React.ReactNode;

  /**
   * Título para acessibilidade ou tooltip.
   */
  title?: string;

  /**
   * Classes CSS adicionais.
   */
  className?: string;
}

/**
 * Objeto de configuração para atalho de imagem no Card.
 */
export interface CardImageConfig {
  src: string;
  alt?: string;
  height?: number | string;
  aspectRatio?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  position?: 'top' | 'center' | 'bottom' | string;
  badge?: React.ReactNode;
}

/**
 * Objeto de configuração para atalho de progresso no Card.
 */
export interface CardProgressConfig {
  value: number;
  label?: React.ReactNode;
  showLabel?: boolean;
  color?: string;
  size?: number;
  helperText?: React.ReactNode;
}

/**
 * Objeto de configuração para botão de ação direta no Card.
 */
export interface CardActionConfig {
  label: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
}

/**
 * Propriedades completas do componente principal Card.
 * Suporta composição via Compound Components (Card.Header, Card.Media, etc.)
 * ou via atalhos diretos de props declarativas.
 */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'image' | 'progress'> {
  /**
   * Variante visual do Card.
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Orientação do layout (vertical ou horizontal).
   * @default 'vertical'
   */
  orientation?: CardOrientation;

  /**
   * Tema visual ('light' | 'dark').
   * Se omitido, herda automaticamente o tema do contexto global.
   * @default 'light'
   */
  theme?: CardTheme;

  /**
   * Raio de curvatura das bordas (border-radius).
   * Suporta: 'none' | 'sm' (12px) | 'md' (16px) | 'lg' (24px) | 'xl' (32px) | '2xl' | 'full' | número/string.
   * @default 'lg'
   */
  radius?: CardRadius;

  /**
   * Espaçamento interno padrão quando não utilizar subcomponentes com padding próprio.
   * @default 'none'
   */
  padding?: CardPadding;

  /**
   * Ativa comportamento e estilos de interatividade (hover elevado, cursor pointer, foco acessível).
   * É ativado automaticamente se a prop `onClick` for fornecida ou se `variant === 'interactive'`.
   * @default false
   */
  interactive?: boolean;

  /**
   * Define se o Card deve ocupar 100% da largura disponível do elemento pai.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Desabilita interações no Card e aplica opacidade reduzida.
   * @default false
   */
  disabled?: boolean;

  // ========================================================================
  // Atalhos Diretos de Props (Declarative Shorthands)
  // ========================================================================

  /**
   * Atalho para Avatar / Ícone de cabeçalho.
   */
  avatar?: React.ReactNode;

  /**
   * Atalho para título do Card.
   */
  title?: React.ReactNode;

  /**
   * Atalho para subtítulo do Card.
   */
  subtitle?: React.ReactNode;

  /**
   * Atalho para ação do cabeçalho (ex: botão de opções '...').
   */
  headerAction?: React.ReactNode;

  /**
   * Atalho para imagem de capa (string URL ou objeto de configuração CardImageConfig).
   */
  image?: string | CardImageConfig;

  /**
   * URL direta para mídia/imagem de capa.
   */
  mediaSrc?: string;

  /**
   * Texto alternativo para imagem de capa.
   */
  mediaAlt?: string;

  /**
   * Altura da mídia de capa (ex: 244px conforme especificação Figma).
   * @default 244
   */
  mediaHeight?: number | string;

  /**
   * Proporção de aspecto da mídia (ex: '16/9', '4/3').
   */
  mediaAspectRatio?: string;

  /**
   * Tag ou badge sobreposta à imagem de capa.
   */
  mediaBadge?: React.ReactNode;

  /**
   * Atalho para descrição ou texto principal.
   */
  description?: React.ReactNode;

  /**
   * Ícone exibido ao lado da descrição.
   */
  descriptionIcon?: React.ReactNode;

  /**
   * Lista de badges/tags a serem exibidas na área de subtags.
   */
  badges?: React.ReactNode[] | Array<{ label: string; variant?: string; color?: string }>;

  /**
   * Atalho para indicador circular de progresso (número percentual 0..100 ou CardProgressConfig).
   */
  progress?: number | CardProgressConfig;

  /**
   * Atalho para ação primária no rodapé.
   */
  primaryAction?: React.ReactNode | CardActionConfig;

  /**
   * Atalho para ação secundária no rodapé.
   */
  secondaryAction?: React.ReactNode | CardActionConfig;

  /**
   * Conteúdo customizado de rodapé.
   */
  footer?: React.ReactNode;

  /**
   * Elemento ou tag HTML para renderização polimórfica (ex: 'div', 'article', 'section', 'a', 'button').
   * @default 'div'
   */
  as?: React.ElementType;

  /**
   * Elementos filhos do Card (permite composição total com subcomponentes).
   */
  children?: React.ReactNode;
}
