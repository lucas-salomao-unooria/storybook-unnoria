import React from 'react';
import type {
  UaiWebSidebarNewChatProps,
  UaiWebSidebarProps,
  UaiWebSidebarSectionProps,
} from './WebSidebar.types';
import { Icon } from '../Icon';
import './WebSidebar.css';

/**
 * Seção da barra lateral — padding 20 e intervalo 4 entre as linhas.
 */
const WebSidebarSection: React.FC<UaiWebSidebarSectionProps> = ({
  bordered = false,
  children,
  className = '',
  ...restProps
}) => (
  <div
    className={[
      'uai-web-sidebar__section',
      bordered ? 'uai-web-sidebar__section--bordered' : '',
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
const WebSidebarNewChat = React.forwardRef<HTMLButtonElement, UaiWebSidebarNewChatProps>(
  ({ iconNode, children = 'Nova conversa', className = '', type = 'button', ...restProps }, ref) => (
    <button
      ref={ref}
      className={['uai-web-sidebar__new-chat', className].filter(Boolean).join(' ')}
      type={type}
      {...restProps}
    >
      <span className="uai-web-sidebar__new-chat-icon" aria-hidden={iconNode ? undefined : 'true'}>
        {iconNode ?? <Icon name="add" size={20} />}
      </span>
      <span>{children}</span>
    </button>
  )
);

WebSidebarNewChat.displayName = 'WebSidebar.NewChat';

interface WebSidebarComponent
  extends React.ForwardRefExoticComponent<
    UaiWebSidebarProps & React.RefAttributes<HTMLElement>
  > {
  Section: typeof WebSidebarSection;
  NewChat: typeof WebSidebarNewChat;
}

const WebSidebarRoot = React.forwardRef<HTMLElement, UaiWebSidebarProps>(
  ({ height = 1024, theme, children, className = '', style, ...restProps }, ref) => (
    <nav
      ref={ref}
      data-uai-theme={theme}
      className={['uai-web-sidebar', className].filter(Boolean).join(' ')}
      style={{ height, ...style }}
      {...restProps}
    >
      {children}
    </nav>
  )
);

WebSidebarRoot.displayName = 'WebSidebar';

/**
 * Componente WebSidebar — Design System UnooriaAI
 *
 * Barra lateral do cliente web: 282px de largura, seções com padding 20 e
 * intervalo 4, distribuídas entre o topo e a base, e fios de 1px à direita da
 * coluna e acima da seção de rodapé.
 *
 * Não confundir com o `Sidebar`: aquele mede 260px, tem superfície
 * `--uai-bg-secondary` e usa `NavItem` de 36px. São duas barras laterais
 * distintas do módulo.
 */
export const WebSidebar = Object.assign(WebSidebarRoot, {
  Section: WebSidebarSection,
  NewChat: WebSidebarNewChat,
}) as WebSidebarComponent;
