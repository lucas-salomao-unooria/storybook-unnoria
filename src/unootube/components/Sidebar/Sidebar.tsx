import React from 'react';
import type {
  UniSidebarFooterProps,
  UniSidebarProps,
  UniSidebarSectionProps,
} from './Sidebar.types';
import './Sidebar.css';

/**
 * Bloco temático da barra lateral.
 *
 * O arquivo agrupa as linhas em seis blocos e os separa por um fio de 1px com
 * 224px de largura — deliberadamente mais estreito que os 240px da barra, o que
 * deixa uma folga à direita do divisor.
 */
const SidebarSection = React.forwardRef<HTMLDivElement, UniSidebarSectionProps>(
  ({ divider = true, className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={[
        'uni-sidebar__section',
        divider ? 'uni-sidebar__section--divided' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);
SidebarSection.displayName = 'Sidebar.Section';

/**
 * Rodapé da barra lateral, com os grupos de links institucionais.
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, UniSidebarFooterProps>(
  ({ className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-sidebar__footer', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);
SidebarFooter.displayName = 'Sidebar.Footer';

/**
 * Linha de links do rodapé, que quebra em várias linhas conforme a largura.
 */
const SidebarFooterRow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...restProps }, ref) => (
    <div
      ref={ref}
      className={['uni-sidebar__footer-row', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </div>
  )
);
SidebarFooterRow.displayName = 'Sidebar.FooterRow';

/**
 * Componente Sidebar — Design System Unootube
 *
 * Reproduz o nó `Navigation/Sidebar` (`8:114`). É um contêiner de composição:
 * o arquivo o monta com 25 instâncias de `SidebarMenuItem`, 2 de
 * `SidebarMenuTitle` e um rodapé de links, distribuídos em seis blocos.
 *
 * Como a barra do arquivo tem 1395px de altura contra os 968px visíveis da
 * tela, ela rola verticalmente — comportamento reproduzido aqui com
 * `overflow-y: auto`.
 */
const SidebarRoot = React.forwardRef<HTMLElement, UniSidebarProps>(
  ({ label = 'Navegação principal', className = '', children, ...restProps }, ref) => (
    <nav
      ref={ref}
      aria-label={label}
      className={['uni-sidebar', className].filter(Boolean).join(' ')}
      {...restProps}
    >
      {children}
    </nav>
  )
);
SidebarRoot.displayName = 'Sidebar';

/**
 * Barra lateral com os subcomponentes de composição acoplados.
 */
export const Sidebar = Object.assign(SidebarRoot, {
  Section: SidebarSection,
  Footer: SidebarFooter,
  FooterRow: SidebarFooterRow,
});
