import React from 'react';

/**
 * Tamanhos suportados pelo Modal Unooria
 * - 'sm': 400px (diálogos curtos, confirmações rápidas)
 * - 'md': 617px (tamanho padrão oficial do Figma - Node #8909:60)
 * - 'lg': 800px (formulários complexos, tabelas ou fluxos em etapas)
 * - 'full': 95vw / tela quase cheia responsiva
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Temas suportados pelo Modal
 */
export type ModalTheme = 'light' | 'dark';

/**
 * Alinhamento dos botões no rodapé do Modal
 */
export type ModalFooterAlign = 'start' | 'center' | 'end' | 'space-between';

/**
 * Props do Cabeçalho do Modal (ModalHeader / Modal.Header)
 */
export interface ModalHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Título principal do modal (renderizado como ModalTitle se passado como string)
   */
  title?: React.ReactNode;
  /**
   * Descrição ou subtítulo complementar (renderizado como ModalDescription se string)
   */
  description?: React.ReactNode;
  /**
   * Alias para description
   */
  subtitle?: React.ReactNode;
  /**
   * Se verdadeiro, renderiza o botão de fechar (X) no cabeçalho
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Callback acionado ao clicar no botão de fechar do cabeçalho
   */
  onClose?: () => void;
  /**
   * Elemento ou ação personalizada à direita do cabeçalho
   */
  action?: React.ReactNode;
}

/**
 * Props do Título do Modal (ModalTitle / Modal.Title)
 */
export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Tag HTML semântica para renderizar o título
   * @default 'h2'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

/**
 * Props da Descrição/Subtítulo do Modal (ModalDescription / Modal.Description)
 */
export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Tag HTML para o elemento descritivo
   * @default 'p'
   */
  as?: 'p' | 'span' | 'div';
}

/**
 * Props do Corpo de Conteúdo do Modal (ModalBody / Modal.Body)
 */
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Espaçamento interno do corpo
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | string | number;
  /**
   * Se verdadeiro, habilita rolagem interna caso o conteúdo exceda a altura
   * @default true
   */
  scrollable?: boolean;
  /**
   * Altura máxima customizada para a área de conteúdo (ex: '60vh', '400px')
   */
  maxHeight?: string | number;
}

/**
 * Props do Rodapé com Ações do Modal (ModalFooter / Modal.Footer)
 */
export interface ModalFooterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Alinhamento dos botões de ação
   * @default 'end'
   */
  align?: ModalFooterAlign;
  /**
   * Espaçamento entre os botões de ação (padrão Figma: 16px)
   * @default '16px'
   */
  gap?: string | number;
  /**
   * Se verdadeiro, desenha uma borda divisória sutil acima do rodapé
   * @default false
   */
  divider?: boolean;
  /**
   * Botão ou ação primária declarativa
   */
  primaryAction?: React.ReactNode;
  /**
   * Botão ou ação secundária declarativa
   */
  secondaryAction?: React.ReactNode;
}

/**
 * Props do Botão de Fechamento do Modal (ModalCloseButton / Modal.CloseButton)
 */
export interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Rótulo de acessibilidade para leitores de tela
   * @default 'Fechar modal'
   */
  ariaLabel?: string;
  /**
   * Ícone customizado de fechar (substitui o X padrão)
   */
  icon?: React.ReactNode;
}

/**
 * Props Principais do Componente Modal (Modal)
 */
export interface ModalProps {
  /**
   * Controla a visibilidade do modal
   */
  isOpen: boolean;
  /**
   * Callback disparado quando o usuário solicita o fechamento (clique no overlay, ESC, ou botão fechar)
   */
  onClose: () => void;
  /**
   * Tamanho do Modal
   * - 'sm': 400px
   * - 'md': 617px (Padrão Figma #8909:60)
   * - 'lg': 800px
   * - 'full': 95vw / tela quase cheia
   * @default 'md'
   */
  size?: ModalSize;
  /**
   * Tema visual do modal
   * @default 'light'
   */
  theme?: ModalTheme;
  /**
   * Se verdadeiro, fechará o modal quando o usuário clicar na área de overlay externa
   * @default true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Se verdadeiro, fechará o modal quando a tecla ESC for pressionada
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Se verdadeiro, exibe o botão fechar (X) padrão no cabeçalho
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Se verdadeiro, bloqueia o scroll do `document.body` enquanto o modal estiver aberto
   * @default true
   */
  lockScroll?: boolean;
  /**
   * Se verdadeiro, mantém a navegação por teclado (Tab / Shift+Tab) confinada dentro do modal
   * @default true
   */
  trapFocus?: boolean;
  /**
   * Referência ao elemento que deve receber o foco inicial quando o modal abrir
   */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Referência ao elemento que deve recuperar o foco quando o modal fechar
   */
  finalFocusRef?: React.RefObject<HTMLElement>;
  /**
   * Elemento do DOM no qual o Portal do Modal deve ser renderizado
   * @default document.body
   */
  portalContainer?: HTMLElement | null;

  // ==========================================
  // Propriedades Declarativas / Shorthand
  // ==========================================
  /**
   * Título shorthand para renderização direta sem compound components
   */
  title?: React.ReactNode;
  /**
   * Subtítulo / Descrição shorthand para renderização direta
   */
  description?: React.ReactNode;
  /**
   * Alias para description
   */
  subtitle?: React.ReactNode;
  /**
   * Rodapé shorthand com ações ou botões
   */
  footer?: React.ReactNode;
  /**
   * Ação primária no rodapé (ex: Botão Confirmar/Salvar)
   */
  primaryAction?: React.ReactNode;
  /**
   * Ação secundária no rodapé (ex: Botão Cancelar)
   */
  secondaryAction?: React.ReactNode;
  /**
   * Alinhamento das ações no rodapé shorthand
   * @default 'end'
   */
  footerAlign?: ModalFooterAlign;

  // ==========================================
  // Estilização & Acessibilidade
  // ==========================================
  /**
   * Classes CSS adicionais para o container do modal
   */
  className?: string;
  /**
   * Classes CSS adicionais para o overlay de fundo
   */
  overlayClassName?: string;
  /**
   * Estilos CSS inline para o container do modal
   */
  style?: React.CSSProperties;
  /**
   * Estilos CSS inline para o overlay de fundo
   */
  overlayStyle?: React.CSSProperties;
  /**
   * Conteúdo do Modal (Compound Components ou corpo customizado)
   */
  children?: React.ReactNode;
  /**
   * Role de acessibilidade ARIA
   * @default 'dialog'
   */
  role?: 'dialog' | 'alertdialog';
  /**
   * Identificador do elemento que rotula o modal para acessibilidade
   */
  'aria-labelledby'?: string;
  /**
   * Identificador do elemento que descreve o conteúdo do modal para acessibilidade
   */
  'aria-describedby'?: string;
  /**
   * Rótulo de acessibilidade direto
   */
  'aria-label'?: string;
  /**
   * Identificador para testes automatizados
   */
  'data-testid'?: string;
}
