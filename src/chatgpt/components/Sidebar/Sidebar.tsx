import React from 'react';
import type {
  GptSidebarFooterItemProps,
  GptSidebarNewChatButtonProps,
  GptSidebarProps,
  GptSidebarSectionLabelProps,
} from './Sidebar.types';
import { gptGlyphs } from '../../tokens';
import './Sidebar.css';

/**
 * Botão de nova conversa — superfície `bg/inverse` de largura total.
 */
const SidebarNewChatButton = React.forwardRef<HTMLButtonElement, GptSidebarNewChatButtonProps>(
  ({ glyph = gptGlyphs.plus, children = 'New chat', className = '', type = 'button', ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={['gpt-sidebar__new-chat', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="gpt-sidebar__new-chat-glyph" aria-hidden="true">
        {glyph}
      </span>
      <span>{children}</span>
    </button>
  )
);

SidebarNewChatButton.displayName = 'Sidebar.NewChatButton';

/**
 * Rótulo de agrupamento temporal das conversas ("Today", "Yesterday").
 */
const SidebarSectionLabel: React.FC<GptSidebarSectionLabelProps> = ({
  children,
  className = '',
  ...rest
}) => (
  <div className={['gpt-sidebar__section-label', className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
);

SidebarSectionLabel.displayName = 'Sidebar.SectionLabel';

/**
 * Espaçador elástico que empurra o rodapé para a base da barra.
 */
const SidebarSpacer: React.FC = () => <div className="gpt-sidebar__spacer" aria-hidden="true" />;

SidebarSpacer.displayName = 'Sidebar.Spacer';

/**
 * Item do rodapé da barra ("My account", "Updates & FAQ", "Log out").
 */
const SidebarFooterItem = React.forwardRef<HTMLButtonElement, GptSidebarFooterItemProps>(
  ({ as, children, className = '', type = 'button', ...rest }, ref) => {
    const Component = (as || 'button') as React.ElementType;
    return (
      <Component
        ref={ref as never}
        type={Component === 'button' ? type : undefined}
        className={['gpt-sidebar__footer-item', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

SidebarFooterItem.displayName = 'Sidebar.FooterItem';

interface SidebarComponent
  extends React.ForwardRefExoticComponent<GptSidebarProps & React.RefAttributes<HTMLElement>> {
  NewChatButton: typeof SidebarNewChatButton;
  SectionLabel: typeof SidebarSectionLabel;
  Spacer: typeof SidebarSpacer;
  FooterItem: typeof SidebarFooterItem;
}

/**
 * Componente Sidebar — Design System ChatGPT
 *
 * Réplica do componente `Sidebar` do Figma: coluna de 260px
 * (`size/sidebar`) com padding 12/8, gap 4 e superfície `bg/secondary`,
 * composta pelo botão de nova conversa, rótulos de seção, linhas de conversa
 * (`NavItem`), espaçador elástico e itens de rodapé.
 */
export const Sidebar = React.forwardRef<HTMLElement, GptSidebarProps>(
  ({ height = 800, theme, children, className = '', style, ...restProps }, ref) => (
    <nav
      ref={ref as never}
      data-gpt-theme={theme}
      className={['gpt-sidebar', className].filter(Boolean).join(' ')}
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
