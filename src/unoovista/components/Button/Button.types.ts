import React from 'react';
import type { UnvTheme } from '../../tokens';

/**
 * Variantes de botão do Unoovista.
 * - 'primary': cápsula em `--unv-color-action-primary` (Entrar, Seguir)
 * - 'secondary': cápsula com contorno `--unv-color-action-secondary-border` sobre fundo
 *   transparente (Editar perfil, Mensagem)
 * - 'link': texto em tom de link, sem contêiner (Trocar de conta, Esqueceu a senha?)
 * - 'social': ação em tom de link com glifo à esquerda, para continuar com
 *   outra conta (o glifo entra por `leadingIcon`, por exemplo `external`)
 */
export type UnvButtonVariant = 'primary' | 'secondary' | 'link' | 'social';

/**
 * Alturas oficiais de botão.
 * - 'sm': 30px (ações inline de perfil e notificações)
 * - 'md': 36px (ações em cartões e folhas)
 * - 'lg': 44px (ações principais das telas de autenticação)
 *
 * O alvo de toque é de 44px em todos: a área extra é invisível.
 */
export type UnvButtonSize = 'sm' | 'md' | 'lg';

/**
 * Propriedades do componente Button do Unoovista.
 */
export interface UnvButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  /**
   * Variante visual do botão.
   * @default 'primary'
   */
  variant?: UnvButtonVariant;

  /**
   * Altura do botão.
   * @default 'md'
   */
  size?: UnvButtonSize;

  /**
   * Ocupa toda a largura disponível do contêiner.
   * @default false
   */
  block?: boolean;

  /**
   * Desabilita a interação. Na variante 'primary' aplica
   * `--unv-color-action-disabled` com o rótulo em `--unv-color-text-secondary`,
   * que segue legível.
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
   * Força o tema visual do botão. Quando omitido, herda o tema do contêiner
   * ancestral por `data-unv-theme`.
   */
  theme?: UnvTheme;

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
