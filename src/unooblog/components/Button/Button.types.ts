import React from 'react';
import type { UblIconName } from '../Icon';
import type { UblTheme } from '../../tokens';

/**
 * Variantes do botão.
 * - 'primary': preenchido no roxo de ação — a ação principal da tela
 * - 'secondary': contorno de controle sobre a superfície — ação alternativa
 * - 'ghost': só texto, sublinhado no hover — ações de apoio ("Ver todos")
 * - 'danger': preenchido no vermelho destrutivo — excluir e sair; o rótulo e o
 *   verbo dizem o que acontece, a cor não carrega o aviso sozinha
 */
export type UblButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

/**
 * Alturas do botão.
 * - 'sm': 32px (barras e cartões compactos)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 52px (ações de página inteira e de diálogos)
 */
export type UblButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades comuns ao botão e ao botão-link.
 */
export interface UblButtonBaseProps {
  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: UblButtonVariant;

  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: UblButtonSize;

  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Glifo antes do rótulo.
   */
  iconStart?: UblIconName;

  /**
   * Glifo depois do rótulo.
   */
  iconEnd?: UblIconName;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UblTheme;

  /**
   * Rótulo do botão.
   */
  children?: React.ReactNode;
}

/**
 * Botão nativo (`<button>`): sem `href`.
 */
export interface UblButtonAsButtonProps
  extends UblButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof UblButtonBaseProps> {
  /**
   * Tipo nativo. `'button'` evita que o botão dentro de um formulário envie
   * sem querer.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Sem `href` o componente é um `<button>`.
   */
  href?: undefined;
}

/**
 * Botão-link (`<a>`): com `href`.
 */
export interface UblButtonAsLinkProps
  extends UblButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof UblButtonBaseProps> {
  /**
   * Destino. Com `href` o componente é um `<a>` com o visual de botão.
   */
  href: string;

  /**
   * Link desabilitado: perde o `href` e ganha `aria-disabled`.
   * @default false
   */
  disabled?: boolean;
}

/**
 * Propriedades do componente Button da Unooblog: botão ou botão-link,
 * conforme haja `href`.
 */
export type UblButtonProps = UblButtonAsButtonProps | UblButtonAsLinkProps;
