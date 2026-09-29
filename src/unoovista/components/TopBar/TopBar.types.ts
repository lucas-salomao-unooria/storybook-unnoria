import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvIconName } from '../Icon';

/**
 * Variantes de superfície da barra superior.
 * - 'feed': fundo `--unv-color-background-secondary`, o da tela em camadas
 *   (feed, mensagens, busca)
 * - 'plain': fundo `--unv-color-background-primary`, para telas cuja primeira
 *   camada é um cartão branco (perfil, edição de perfil)
 */
export type UnvTopBarVariant = 'feed' | 'plain';

/**
 * Propriedades do componente TopBar do Unoovista.
 */
export interface UnvTopBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Conteúdo do slot inicial, antes do título (logotipo, voltar, câmera).
   */
  leading?: React.ReactNode;

  /**
   * Título grande, alinhado à esquerda. Aceita texto simples ou um nó
   * customizado, como o logotipo.
   */
  title?: React.ReactNode;

  /**
   * Conteúdo alinhado à direita. Para ações só de glifo, use `TopBar.Action`
   * (botão circular de 44px).
   */
  trailing?: React.ReactNode;

  /**
   * Variante de superfície da barra.
   * @default 'feed'
   */
  variant?: UnvTopBarVariant;

  /**
   * Reserva os 44px superiores ocupados pela barra de status do aparelho.
   * @default true
   */
  withStatusBarInset?: boolean;

  /**
   * Exibe um fio de 1px na base da barra. Por padrão a barra não tem fio: a
   * separação vem da mudança de superfície.
   * @default false
   */
  bordered?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner ancestral
   * por `data-unv-theme`.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}

/**
 * Propriedades do `TopBar.Action`, o botão circular de ação da barra.
 */
export interface UnvTopBarActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Glifo do registro de ícones do módulo.
   */
  icon: UnvIconName;

  /**
   * Nome acessível da ação. Obrigatório: o botão não tem texto visível.
   */
  label: string;

  /**
   * Exibe o ponto de novidades no canto do botão.
   * @default false
   */
  hasNotification?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o do contêiner.
   */
  theme?: UnvTheme;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
