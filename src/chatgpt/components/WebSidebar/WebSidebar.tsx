import React from 'react';
import type {
  GptWebSidebarNewChatProps,
  GptWebSidebarProps,
  GptWebSidebarSectionProps,
} from './WebSidebar.types';
import { Icon } from '../Icon';
import './WebSidebar.css';

/**
 * Seção da barra lateral — padding 20 e intervalo 4 entre as linhas.
 */
const WebSidebarSection: React.FC<GptWebSidebarSectionProps> = ({
  bordered = false,
  children,
  className = '',
  ...restProps
}) => (
  <div
    className={[
      'gpt-web-sidebar__section',
      bordered ? 'gpt-web-sidebar__section--bordered' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...restProps}
  >
    {children}
  </div>
);

WebSidebarSection.displayName = 'WebSidebar.Section';

/**
 * Botão de nova conversa — 242 × 36 com raio 12.
 */
const WebSidebarNewChat = React.forwardRef<HTMLButtonElement, GptWebSidebarNewChatProps>(
  ({ iconNode, children = 'New chat', className = '', type = 'button', ...restProps }, ref) => (
    <button
      ref={ref}
      className={['gpt-web-sidebar__new-chat', className].filter(Boolean).join(' ')}
      type={type}
      {...restProps}
    >
      <span className="gpt-web-sidebar__new-chat-icon" aria-hidden={iconNode ? undefined : 'true'}>
        {iconNode ?? <Icon name="add" size={16} />}
      </span>
      <span>{children}</span>
    </button>
  )
);

WebSidebarNewChat.displayName = 'WebSidebar.NewChat';

interface WebSidebarComponent
  extends React.ForwardRefExoticComponent<
    GptWebSidebarProps & React.RefAttributes<HTMLElement>
  > {
  Section: typeof WebSidebarSection;
  NewChat: typeof WebSidebarNewChat;
}

const WebSidebarRoot = React.forwardRef<HTMLElement, GptWebSidebarProps>(
  ({ height = 1024, theme, children, className = '', style, ...restProps }, ref) => (
    <nav
      ref={ref}
      data-gpt-theme={theme}
      className={['gpt-web-sidebar', className].filter(Boolean).join(' ')}
      style={{ height, ...style }}
      {...restProps}
    >
      {children}
    </nav>
  )
);

WebSidebarRoot.displayName = 'WebSidebar';

/**
 * Componente WebSidebar — Design System ChatGPT
 *
 * Réplica da `AIChatSidebar` da tela `New chat - V1 - A`: 282px de largura,
 * seções com padding 20 e intervalo 4, distribuídas entre o topo e a base, e
 * fios de 1px à direita da coluna e acima da seção de rodapé.
 *
 * Não confundir com o `Sidebar`: aquele vem da página `🟡 Design system`, mede
 * 260px, tem superfície `bg/secondary` e usa `NavItem` de 36px. São duas
 * barras laterais distintas do mesmo arquivo.
 */
export const WebSidebar = Object.assign(WebSidebarRoot, {
  Section: WebSidebarSection,
  NewChat: WebSidebarNewChat,
}) as WebSidebarComponent;
