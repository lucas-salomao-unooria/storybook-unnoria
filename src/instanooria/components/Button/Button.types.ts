import React from 'react';
import type { InstaTheme } from '../../tokens';

/**
 * Variantes de botão do Instanooria.
 * - 'primary': fundo azul de ação (Log in, Follow)
 * - 'secondary': contorno neutro sobre fundo transparente (Edit Profile, Message)
 * - 'link': texto azul sem contêiner (Switch accounts, Forgot password?)
 * - 'facebook': ação social com o glifo do Facebook e texto azul
 */
export type InstaButtonVariant = 'primary' | 'secondary' | 'link' | 'facebook';

/**
 * Alturas oficiais de botão.
 * - 'sm': 30px (ações inline de perfil e notificações)
 * - 'md': 36px (ações em cartões e sheets)
 * - 'lg': 44px (ações principais das telas de autenticação)
 */
export type InstaButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Button do Instanooria.
 */
export interface InstaButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Variante visual do botão.
   * @default 'primary'
   */
  variant?: InstaButtonVariant;

  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: InstaButtonSize;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default false
   */
  block?: boolean;

  /**
   * Desabilita a interação. Na variante 'primary' aplica
   * `--insta-color-action-disabled`.
   * @default false
   */
  disabled?: boolean;

  /**
   * Ícone renderizado antes do rótulo.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Ícone renderizado após o rótulo.
   */
  trailingIcon?: React.ReactNode;

  /**
   * Tema visual usado para resolver as variáveis de cor.
   * @default 'light'
   */
  theme?: InstaTheme;

  /**
   * Elemento HTML raiz renderizado (permite usar o botão como âncora).
   * @default 'button'
   */
  as?: React.ElementType;

  /**
   * Conteúdo do botão.
   */
  children?: React.ReactNode;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
