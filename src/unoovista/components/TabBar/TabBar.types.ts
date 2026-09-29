import React from 'react';
import type { UnvTheme } from '../../tokens';
import type { UnvIconName } from '../Icon';

/**
 * Descrição de uma aba da barra de navegação inferior.
 */
export interface UnvTabItem {
  /** Identificador único da aba */
  id: string;
  /** Nome acessível da aba; é também o texto visível da aba ativa, salvo `shortLabel` */
  label: string;
  /** Texto curto exibido na cápsula da aba ativa (ex.: "Criar" para "Criar publicação") */
  shortLabel?: string;
  /** Glifo exibido no estado inativo */
  icon?: UnvIconName;
  /** Glifo exibido no estado ativo; quando ausente, reutiliza `icon` */
  activeIcon?: UnvIconName;
  /** URL do avatar, usada pela aba de perfil (renderizado no lugar do glifo) */
  avatarSrc?: string;
  /** Exibe o ponto de novidades sobre o glifo e o anuncia por `aria-describedby` */
  hasNotification?: boolean;
}

/**
 * Propriedades do componente TabBar do Unoovista.
 */
export interface UnvTabBarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Abas exibidas na barra. O padrão traz as cinco abas do produto: Feed,
   * Buscar, Criar, Atividade e Perfil.
   */
  items?: UnvTabItem[];

  /**
   * Identificador da aba ativa.
   */
  activeId?: string;

  /**
   * Callback disparado ao selecionar uma aba.
   */
  onChange?: (id: string, item: UnvTabItem, index: number) => void;

  /**
   * Reserva, abaixo da doca, a área do indicador de início do aparelho (a doca
   * já flutua a `--unv-spacing-l` da borda; o recuo completa os 34px).
   * @default true
   */
  withHomeIndicatorInset?: boolean;

  /**
   * Rótulo acessível da barra de navegação.
   * @default 'Navegação principal'
   */
  ariaLabel?: string;

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
