import React from 'react';
import type {
  UaiSidebarFooterItemProps,
  UaiSidebarNewChatButtonProps,
  UaiSidebarProps,
  UaiSidebarSectionLabelProps,
} from './Sidebar.types';
import { Icon } from '../Icon';
import './Sidebar.css';

/**
 * Botão de nova conversa — superfície `--uai-bg-inverse` de largura total.
 */
const SidebarNewChatButton = React.forwardRef<HTMLButtonElement, UaiSidebarNewChatButtonProps>(
  (
    {
      glyph = <Icon name="add" size={16} />,
      children = 'Nova conversa',
      className = '',
      type = 'button',
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={['uai-sidebar__new-chat', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="uai-sidebar__new-chat-glyph" aria-hidden="true">
        {glyph}
      </span>
      <span>{children}</span>
    </button>
  )
);

SidebarNewChatButton.displayName = 'Sidebar.NewChatButton';

/**
 * Rótulo de agrupamento temporal das conversas ("Hoje", "Ontem").
 */
const SidebarSectionLabel: React.FC<UaiSidebarSectionLabelProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={['uai-sidebar__section-label', className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
);

SidebarSectionLabel.displayName = 'Sidebar.SectionLabel';

/**
 * Espaçador elástico que empurra o rodapé para a base da barra.
 */
const SidebarSpacer: React.FC = () => <div className="uai-sidebar__spacer" aria-hidden="true" />;

SidebarSpacer.displayName = 'Sidebar.Spacer';

/**
 * Item do rodapé da barra ("Minha conta", "Novidades e ajuda", "Sair").
 */
const SidebarFooterItem = React.forwardRef<HTMLButtonElement, UaiSidebarFooterItemProps>(
  ({ as, children, className = '', type = 'button', ...rest }, ref) => {
    const Component = (as || 'button') as React.ElementType;
    return (
      <Component
        ref={ref as never}
        type={Component === 'button' ? type : undefined}
        className={['uai-sidebar__footer-item', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

SidebarFooterItem.displayName = 'Sidebar.FooterItem';

interface SidebarComponent
  extends React.ForwardRefExoticComponent<UaiSidebarProps & React.RefAttributes<HTMLElement>> {
  NewChatButton: typeof SidebarNewChatButton;
  SectionLabel: typeof SidebarSectionLabel;
  Spacer: typeof SidebarSpacer;
  FooterItem: typeof SidebarFooterItem;
}

/**
 * Componente Sidebar — Design System UnooriaAI
 *
 * Coluna de 260px (`--uai-size-sidebar`) com padding 12/8, gap 4 e superfície
 * `--uai-bg-secondary`, composta pelo botão de nova conversa, rótulos de
 * seção, linhas de conversa (`NavItem`), espaçador elástico e itens de rodapé.
 */
export const Sidebar = React.forwardRef<HTMLElement, UaiSidebarProps>(
  ({ height = 800, theme, children, className = '', style, ...restProps }, ref) => (
    <nav
      ref={ref as never}
      data-uai-theme={theme}
      className={['uai-sidebar', className].filter(Boolean).join(' ')}
      style={{ height, ...style }}
      {...restProps}
    >
      {children}
    </nav>
  )
) as SidebarComponent;

Sidebar.displayName = 'Sidebar';
Sidebar.NewChatButton = SidebarNewChatButton;
Sidebar.SectionLabel = SidebarSectionLabel;
Sidebar.Spacer = SidebarSpacer;
Sidebar.FooterItem = SidebarFooterItem;
