import React from 'react';

/** Larguras de diálogo oferecidas pelo componente. */
export type UniModalSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do diálogo do Unootube.
 *
 * EXTENSÃO DECLARADA: nenhum dos dois arquivos de origem publica diálogo. A
 * forma foi derivada do que eles **de fato** publicam — a superfície elevada
 * `background/secondary`, o degrau `Elevation/High`, que o próprio quadro
 * `Elevation` (`106:3226`) descreve como "modal: diálogos e folhas", e a escala
 * tipográfica de onze degraus. Nenhum valor novo foi inventado.
 */
export interface UniModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controla a visibilidade. Fechado, o componente não renderiza nada.
   * @default true
   */
  open?: boolean;

  /** Chamado ao solicitar o fechamento: `ESC`, véu ou botão de fechar. */
  onClose?: () => void;

  /**
   * Título do diálogo. Quando informado, o cabeçalho é montado
   * automaticamente; para um cabeçalho próprio, omita e componha com
   * `Modal.Header`.
   */
  title?: React.ReactNode;

  /**
   * Largura da superfície: 320, 480 ou 640 pixels.
   * @default 'md'
   */
  size?: UniModalSize;

  /**
   * Desenha o véu atrás do diálogo.
   * @default true
   */
  withOverlay?: boolean;

  /**
   * Fecha ao acionar o véu.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Fecha ao pressionar `ESC`.
   * @default true
   */
  closeOnEscape?: boolean;

  /** Rótulo acessível do botão de fechar. @default 'Fechar' */
  closeLabel?: string;

  /**
   * Glifo do botão de fechar.
   *
   * Nenhum dos dois arquivos de origem desenha um "fechar" — as seis telas
   * publicadas não abrem camada nenhuma. O padrão é o caractere tipográfico
   * `✕` na própria família Roboto; esta prop existe para que um produto com
   * família vetorial própria injete a sua.
   */
  closeIcon?: React.ReactNode;

  /**
   * Tema aplicado ao nó raiz do diálogo. Como o diálogo costuma ser renderizado
   * fora da árvore da tela, ele nem sempre herda o `data-uni-theme` do
   * ancestral — informe o tema aqui quando for o caso.
   */
  theme?: 'light' | 'dark';

  /** Conteúdo. Componha com `Modal.Body` e `Modal.Footer`. */
  children?: React.ReactNode;

  /** Classe CSS adicional. */
  className?: string;
}

/** Propriedades do cabeçalho do diálogo. */
export interface UniModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Chamado ao acionar o botão de fechar. Sem ele, o botão não é renderizado. */
  onClose?: () => void;
  /** Rótulo acessível do botão de fechar. @default 'Fechar' */
  closeLabel?: string;
  /** Glifo do botão de fechar. Padrão: o caractere tipográfico `✕`. */
  closeIcon?: React.ReactNode;
  /** Título, renderizado em `Heading/H3`. */
  children?: React.ReactNode;
}

/** Propriedades do corpo do diálogo. */
export type UniModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

/** Propriedades do rodapé do diálogo. */
export type UniModalFooterProps = React.HTMLAttributes<HTMLDivElement>;
