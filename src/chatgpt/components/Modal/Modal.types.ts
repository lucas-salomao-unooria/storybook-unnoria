import React from 'react';
import type { GptTheme } from '../../tokens';

/**
 * Propriedades da superfície `Modal` do Design System ChatGPT.
 */
export interface GptModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Controla a visibilidade do diálogo. Quando `false`, nada é renderizado.
   * @default true
   */
  open?: boolean;

  /**
   * Chamado ao fechar o diálogo — por `ESC`, clique no scrim ou no botão de
   * fechar do cabeçalho padrão.
   */
  onClose?: () => void;

  /**
   * Título do cabeçalho padrão. Quando omitido, use `Modal.Header` para
   * compor um cabeçalho próprio.
   */
  title?: React.ReactNode;

  /**
   * Renderiza o scrim translúcido atrás da superfície.
   * @default true
   */
  withOverlay?: boolean;

  /**
   * Fecha o diálogo ao clicar no scrim.
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Fecha o diálogo ao pressionar `ESC`.
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Rótulo acessível do botão de fechar do cabeçalho padrão.
   * @default 'Fechar'
   */
  closeLabel?: string;

  /**
   * Tema usado para resolver as variáveis de cor. Quando omitido, o
   * componente herda o tema do contêiner ancestral.
   */
  theme?: GptTheme;

  /**
   * Conteúdo do diálogo.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional aplicada à superfície do diálogo.
   */
  className?: string;
}

/**
 * Propriedades do cabeçalho composto `Modal.Header`.
 */
export interface GptModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Chamado ao acionar o botão de fechar. Quando omitido, o botão não é
   * renderizado.
   */
  onClose?: () => void;

  /**
   * Rótulo acessível do botão de fechar.
   * @default 'Fechar'
   */
  closeLabel?: string;
}

/**
 * Propriedades do corpo composto `Modal.Body`.
 */
export interface GptModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Propriedades do rodapé composto `Modal.Footer`.
 */
export interface GptModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
