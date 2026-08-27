/**
 * Conteúdo de demonstração compartilhado pelas estórias do Design System
 * ChatGPT.
 *
 * Os textos reproduzem os rótulos das camadas do arquivo Figma
 * "ChatGPT UI Kit (AI Chat) (Community)" — tanto os da página
 * `🟡 Design system` quanto os das telas `New chat - V1 - A` da página
 * `🟪 ChatGPT UI Kit`, que é a única superfície do arquivo com camadas de
 * texto reais.
 */

const unsplash = (id: string, width = 200) =>
  `https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=80`;

/**
 * Fotografias de demonstração para os avatares.
 *
 * O arquivo de design usa apenas iniciais; as imagens são fotografias livres
 * do Unsplash, seguindo a mesma convenção já adotada pelas estórias das
 * outras seções.
 */
export const gptAvatars = {
  lucas: unsplash('photo-1494790108377-be9c29b29330'),
  ana: unsplash('photo-1507003211169-0a1dd7228f2d'),
  rafael: unsplash('photo-1500648767791-00dcc994a43e'),
};

/** Node IDs oficiais dos componentes na página `🟡 Design system`. */
export const gptFigmaNodes = {
  page: '609:5682',
  documentation: '1805:2822',
  button: '1805:2684',
  iconButton: '1805:2703',
  avatar: '1805:2712',
  badge: '1805:2723',
  tag: '1805:2730',
  toggle: '1805:2735',
  divider: '1805:2736',
  input: '1805:2747',
  chatInput: '1805:2748',
  searchInput: '1805:2752',
  navItem: '1805:2764',
  chatBubble: '1805:2771',
  gptCard: '1805:2772',
  settingsRow: '1805:2778',
  sidebar: '1805:2796',
  featureCard: '1805:2814',
  modal: '1805:2817',
  collectionPrimitiveColors: '1805:2518',
  collectionSemanticColors: '1805:2544',
  collectionSpacing: '1805:2568',
  collectionRadius: '1805:2588',
  collectionSizing: '1805:2599',
} as const;

/**
 * Node IDs da página `🟪 ChatGPT UI Kit` — a única superfície estruturada do
 * arquivo, com camadas de texto e vetores reais.
 *
 * A página `🟪 ChatGPT Web Client` (`665:2049`) **não** entra aqui: seus 6.124
 * nós são exclusivamente GROUP e VECTOR, sem uma única camada de texto. Ela é
 * referência de fluxo, não fonte de componente.
 */
export const gptWebClientNodes = {
  page: '0:1',
  screenLight: '681:2796',
  screenDark: '681:3246',
  sidebar: 'I681:2796;387056:452902',
  composer: 'I681:2796;387056:452901',
  logo: 'I681:2796;387056:452884',
} as const;

/** As três colunas da tela `New chat - V1 - A`, com o texto literal do arquivo. */
export const gptTopicColumns = [
  {
    icon: 'chats' as const,
    title: 'Examples',
    items: [
      '"Explain quantum computing in simple terms"',
      '"Got any creative ideas for a 10 year old\'s birthday?"',
      '"How do I make an HTTP request in Javascript?"',
    ],
  },
  {
    icon: 'stars' as const,
    title: 'Capabilities',
    items: [
      'Remembers what user said earlier in the conversation.',
      'Allows user to provide follow-up corrections.',
      'Trained to decline inappropriate requests.',
    ],
  },
  {
    icon: 'shieldWarning' as const,
    title: 'Limitations',
    items: [
      'May occasionally generate incorrect information.',
      'May occasionally produce harmful instructions or biased content.',
      'Limited knowledge of world and events after 2021.',
    ],
  },
] as const;

/** Histórico de conversas da barra lateral do cliente web. */
export const gptWebHistory = [
  'AI Chat Tool Ethics',
  'Al Chat Tool Impact Writing',
  'New chat',
] as const;

/** Ações do rodapé da barra lateral do cliente web, com o ícone de cada uma. */
export const gptWebFooterActions = [
  { icon: 'trash' as const, label: 'Clear conversations' },
  { icon: 'sun' as const, label: 'Light mode' },
  { icon: 'user' as const, label: 'My account' },
  { icon: 'arrowSquareOut' as const, label: 'Updates & FAQ' },
  { icon: 'signOut' as const, label: 'Log out' },
] as const;

/** Conversas listadas na barra lateral do arquivo. */
export const gptConversations = [
  'Chat conversation one',
  'AI research discussion',
  'Code review help',
  'Design system tokens',
  'Roteiro de onboarding',
] as const;

/** Troca de mensagens usada nas demonstrações de conversa. */
export const gptTranscript = [
  { role: 'user' as const, message: 'Hello, how can you help me?' },
  {
    role: 'assistant' as const,
    message: 'I can help you with many things! Feel free to ask me anything.',
  },
  { role: 'user' as const, message: 'Resuma as decisões desta thread em cinco linhas.' },
  {
    role: 'assistant' as const,
    message:
      'Claro. Consolidei as decisões por tema — tokens, componentes e temas — mantendo apenas o que foi confirmado na conversa.',
  },
] as const;

/** Sugestões de prompt exibidas como cápsulas `Tag`. */
export const gptPromptSuggestions = [
  'Brainstorm',
  'Create an image',
  'Search the web',
  'Write or code',
  'Research',
  'Think',
] as const;

/** Catálogo de GPTs da tela `Explore GPTs`. */
export const gptCatalog = [
  {
    initial: 'G',
    name: 'GPT Name',
    description: 'Short description of the GPT capabilities',
  },
  {
    initial: 'D',
    name: 'Data Analyst',
    description: 'Lê planilhas, gera gráficos e explica os achados',
  },
  {
    initial: 'W',
    name: 'Writing Coach',
    description: 'Revisa textos e sugere reescritas com tom consistente',
  },
  {
    initial: 'C',
    name: 'Code Copilot',
    description: 'Escreve, revisa e refatora código em vários idiomas',
  },
] as const;

/** Recursos apresentados em grade na tela de nova conversa. */
export const gptFeatures = [
  {
    title: 'Feature Title',
    description: 'Short description of the feature or capability',
  },
  {
    title: 'Create an image',
    description: 'Gera ilustrações e variações a partir de uma descrição',
  },
  {
    title: 'Search the web',
    description: 'Busca fontes atualizadas e cita o que encontrou',
  },
  {
    title: 'Write or code',
    description: 'Redige textos longos e blocos de código executáveis',
  },
] as const;

/** Linhas da tela de configurações. */
export const gptSettings = [
  { label: 'Setting label', value: 'Value' },
  { label: 'Theme', value: 'System' },
  { label: 'Language', value: 'Auto-detect' },
  { label: 'Spoken language', value: 'Auto-detect' },
  { label: 'Archived chats', value: 'Manage' },
] as const;

/** Itens do rodapé da barra lateral. */
export const gptSidebarFooter = ['My account', 'Updates & FAQ', 'Log out'] as const;
