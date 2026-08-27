/**
 * Registro global dos componentes do Design System ChatGPT.
 *
 * O bloco `🟡 Design system` espelha a ordem daquela página do Figma:
 * primitivos de ação, indicadores, controles de formulário, navegação,
 * conversa e superfícies compostas.
 *
 * O bloco `🟪 ChatGPT UI Kit` reúne os componentes derivados das duas telas
 * `New chat - V1 - A` (`681:2796` clara e `681:3246` escura) — a única
 * superfície estruturada do arquivo, com camadas de texto e vetores reais.
 * São réguas distintas das da página de design system e **não se substituem**:
 * `SidebarRow` não é `NavItem`, `WebSidebar` não é `Sidebar`, `Composer` não
 * é `ChatInput`.
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
export * from './GPTCard';
export * from './SettingsRow';
export * from './FeatureCard';
export * from './Modal';
export * from './Sidebar';

/* ----------------------------------------------------------------
 * Página `🟪 ChatGPT UI Kit` — telas `New chat - V1 - A`
 * ---------------------------------------------------------------- */

export * from './Icon';
export * from './Logo';
export * from './PlanTag';
export * from './PromptSuggestion';
export * from './TopicColumn';
export * from './SidebarRow';
export * from './Composer';
export * from './WebSidebar';
