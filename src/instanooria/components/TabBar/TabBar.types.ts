import React from 'react';
import type { InstaTheme } from '../../tokens';
import type { InstaIconName } from '../Icon';

/**
 * Descrição de uma aba da barra de navegação inferior.
 */
export interface InstaTabItem {
  /** Identificador único da aba */
  id: string;
  /** Rótulo acessível da aba (não é exibido visualmente) */
  label: string;
  /** Glifo exibido no estado inativo */
  icon?: InstaIconName;
  /** Glifo exibido no estado ativo; quando ausente, reutiliza `icon` */
  activeIcon?: InstaIconName;
  /** URL do avatar, usada pela aba de perfil */
  avatarSrc?: string;
  /** Exibe o ponto vermelho de novidades sobre o glifo */
  hasNotification?: boolean;
}

/**
 * Propriedades do componente TabBar do Instanooria.
 */
export interface InstaTabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Abas exibidas na barra. O padrão reproduz as cinco abas do Figma.
   */
  items?: InstaTabItem[];

  /**
   * Identificador da aba ativa.
   */
  activeId?: string;

  /**
   * Callback disparado ao selecionar uma aba.
   */
  onChange?: (id: string, item: InstaTabItem, index: number) => void;

  /**
   * Reserva os 29px inferiores ocupados pelo home indicator do iPhone X.
   * @default true
   */
  withHomeIndicatorInset?: boolean;

  /**
   * Rótulo acessível da barra de navegação.
   * @default 'Navegação principal'
   */
  ariaLabel?: string;

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
