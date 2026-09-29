import React from 'react';

/**
 * Variantes de barra superior.
 * - 'home': faixa de 69px com a marca "Unoochat", busca e menu
 * - 'page': faixa de 57px com seta de voltar e título de página
 */
export type UncTopBarVariant = 'home' | 'page';

/**
 * Propriedades do componente TopBar do Unoochat.
 */
export interface UncTopBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Título exibido na barra.
   */
  title: string;

  /**
   * Legenda opcional abaixo do título, como em "Adicionar participantes"
   * ou "626 contatos".
   */
  subtitle?: string;

  /**
   * Variante visual da barra.
   * @default 'home'
   */
  variant?: UncTopBarVariant;

  /**
   * Exibe a seta de voltar à esquerda. Padrão `true` na variante `page`.
   */
  showBack?: boolean;

  /**
   * Callback da seta de voltar.
   */
  onBack?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Exibe a ação de busca à direita.
   * @default true
   */
  showSearch?: boolean;

  /**
   * Callback da ação de busca.
   */
  onSearch?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Exibe o menu de opções à direita.
   * @default true
   */
  showMenu?: boolean;

  /**
   * Callback do menu de opções.
   */
  onMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Ações adicionais renderizadas antes de busca e menu.
   */
  actions?: React.ReactNode;

  /**
   * Conteúdo ancorado ao rodapé da barra, usado para encaixar o `TabBar`.
   */
  footer?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
