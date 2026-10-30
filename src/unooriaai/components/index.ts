/**
 * Registro global dos componentes do Design System UnooriaAI.
 *
 * Dois conjuntos convivem aqui, e as réguas de cada um são distintas — **um
 * componente nunca substitui o seu equivalente do outro conjunto**:
 * `SidebarRow` não é `NavItem`, `WebSidebar` não é `Sidebar`, `Composer` não é
 * `ChatInput` e `PlanTag` não é `Badge`. Consolidar qualquer um desses pares
 * apagaria uma medida real de layout.
 *
 * O primeiro conjunto reúne os primitivos de ação, os indicadores, os
 * controles de formulário, a navegação, a conversa e as superfícies
 * compostas. O segundo reúne o cliente web: ícone, logotipo, etiqueta de
 * plano, sugestões de comando, colunas de tópicos, barra lateral web e
 * compositor.
 */

export * from './Button';
export * from './IconButton';
export * from './Avatar';
export * from './Badge';
export * from './Tag';
export * from './Toggle';
export * from './Divider';
export * from './Input';
export * from './ChatInput';
export * from './SearchInput';
export * from './NavItem';
export * from './ChatBubble';
export * from './AssistantCard';
export * from './SettingsRow';
export * from './FeatureCard';
export * from './Modal';
export * from './Sidebar';

/* ----------------------------------------------------------------
 * Cliente web: ícone, marca, compositor e barra lateral
 * ---------------------------------------------------------------- */

export * from './Icon';
export * from './Logo';
export * from './PlanTag';
export * from './PromptSuggestion';
export * from './TopicColumn';
export * from './SidebarRow';
export * from './Composer';
export * from './WebSidebar';

/* ----------------------------------------------------------------
 * Extensões do módulo (sem par na estrutura de origem)
 * ---------------------------------------------------------------- */

export * from './ChoicePoll';
export * from './SessionDivider';
export * from './TypingIndicator';
