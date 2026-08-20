import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Variantes de superfície da barra superior.
 * - 'feed': fundo `--insta-color-background-secondary` com divisor de barra (Feed, Mensagens)
 * - 'plain': fundo `--insta-color-background-primary` sem divisor (Perfil, Editar Perfil)
 */
export type InstaTopBarVariant = 'feed' | 'plain';

/**
 * Propriedades do componente TopBar do Instanooria.
 */
export interface InstaTopBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Conteúdo alinhado à esquerda (voltar, câmera, cancelar).
   */
  leading?: React.ReactNode;

  /**
   * Conteúdo central. Aceita texto simples ou um nó customizado como o logotipo.
   */
  title?: React.ReactNode;

  /**
   * Conteúdo alinhado à direita (IGTV, mensagens, menu, concluir).
   */
  trailing?: React.ReactNode;

  /**
   * Variante de superfície da barra.
   * @default 'feed'
   */
  variant?: InstaTopBarVariant;

  /**
   * Reserva os 44px superiores ocupados pela status bar do iPhone X.
   * @default true
   */
  withStatusBarInset?: boolean;

  /**
   * Exibe o divisor na base da barra.
   * @default true
   */
  bordered?: boolean;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
