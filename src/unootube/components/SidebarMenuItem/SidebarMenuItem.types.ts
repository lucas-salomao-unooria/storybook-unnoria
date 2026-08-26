import React from 'react';
import type { UniIconName } from '../Icon';

/**
 * Propriedades da linha de menu da barra lateral.
 *
 * Reproduz o nó `Navigation/SidebarMenuItem` (`8:126`): 224×40 com recuo
 * `8/8/8/24` e intervalo de 24px entre o glifo e o rótulo.
 */
export interface UniSidebarMenuItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /**
   * Glifo de contorno exibido à esquerda do rótulo.
   */
  icon?: UniIconName;

  /**
   * Glifo preenchido usado quando a linha está ativa. O arquivo publica a
   * versão preenchida de treze glifos justamente para marcar o item ativo — é a
   * forma canônica, e não uma mudança de cor.
   */
  activeIcon?: UniIconName;

  /**
   * Rótulo da linha.
   */
  menuLabel: React.ReactNode;

  /**
   * Marca a linha como ativa. Aplica `--uni-color-background-surface` ao fundo
   * e troca o glifo por `activeIcon`, quando informado.
   * @default false
   */
  active?: boolean;

  /**
   * Renderiza a linha como `<button>` em vez de `<a>`. Use quando a linha
   * dispara uma ação em vez de navegar.
   * @default false
   */
  asButton?: boolean;

  /**
   * Classe CSS adicional.
   */
  className?: string;
}
