import type React from 'react';
import type { UglIconName } from '../Icon';
import type { UglTheme } from '../../tokens';

/**
 * Um destino da navegação principal.
 */
export interface UglTabBarItem {
  /** Identificador único */
  id: string;
  /** Rótulo visível ("Biblioteca") */
  label: string;
  /** Glifo em repouso */
  icon: UglIconName;
  /** Glifo do destino ativo. Sem valor, o próprio `icon` preenchido. */
  iconActive?: UglIconName;
  /** Contagem de novidades. Zero ou ausente não mostra selo; acima de 99, "99+". */
  badge?: number;
}

/**
 * Propriedades do componente TabBar da Unoogaleria.
 */
export interface UglTabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Destinos, na ordem da barra.
   */
  items: UglTabBarItem[];

  /**
   * Destino ativo (recebe `aria-current="page"`).
   */
  activeId: string;

  /**
   * Toque num destino diferente do ativo.
   */
  onChange?: (id: string) => void;

  /**
   * Toque de novo no destino já ativo — o gesto de voltar à raiz da aba.
   */
  onReselect?: (id: string) => void;

  /**
   * Nome acessível da navegação.
   * @default 'Navegação principal'
   */
  ariaLabel?: string;

  /**
   * Absoluta na base do contêiner, sobre o conteúdo que corre por baixo
   * (passe `bottomInset` à `MediaGrid`). Extensão do contrato.
   * @default false
   */
  floating?: boolean;

  /**
   * Força o tema visual. Quando omitido, herda o tema do contêiner.
   */
  theme?: UglTheme;
}
