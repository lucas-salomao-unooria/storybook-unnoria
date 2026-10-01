import React from 'react';
import type { UjnIconName } from '../Icon';
import type { UjnTheme } from '../../tokens';

/**
 * Variantes do botão (quadro `5:37`, estrutura herdada).
 * - 'primary': preenchido no roxo de ação — a ação principal da tela
 * - 'secondary': contorno sobre a superfície — ação alternativa
 * - 'ghost': só texto, sublinhado no hover — ações de apoio ("Ver todas")
 */
export type UjnButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Alturas do botão.
 * - 'sm': 32px (barras e cartões compactos)
 * - 'md': 44px (padrão, alvo mínimo de toque)
 * - 'lg': 52px (ações de página inteira e de diálogos)
 */
export type UjnButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades comuns ao botão e ao botão-link.
 */
export interface UjnButtonBaseProps {
  /**
   * Variante visual.
   * @default 'primary'
   */
  variant?: UjnButtonVariant;

  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: UjnButtonSize;

  /**
   * Ocupa toda a largura do contêiner.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Glifo antes do rótulo.
   */
  iconStart?: UjnIconName;

  /**
   * Glifo depois do rótulo.
   */
  iconEnd?: UjnIconName;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UjnTheme;

  /**
   * Rótulo do botão.
   */
  children?: React.ReactNode;
}

/**
 * Botão nativo (`<button>`): sem `href`.
 */
export interface UjnButtonAsButtonProps
  extends UjnButtonBaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof UjnButtonBaseProps> {
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
export interface UjnButtonAsLinkProps
  extends UjnButtonBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof UjnButtonBaseProps> {
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
 * Propriedades do componente Button da Unoojornal: botão ou botão-link,
 * conforme haja `href`.
 */
export type UjnButtonProps = UjnButtonAsButtonProps | UjnButtonAsLinkProps;
