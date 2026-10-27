/**
 * Conteúdo de demonstração compartilhado pelas estórias do Design System
 * UnooriaAI.
 *
 * Todos os textos são fictícios, em português do Brasil, e descrevem o cliente
 * de conversa com IA da Plataforma Unooria. As imagens são ilustrações SVG
 * originais, geradas a partir da paleta da Unooria, em `public/unooriaai/`;
 * entram nos componentes por prop (`src`).
 */

const asset = (file: string) => `/unooriaai/${file}.svg`;

/**
 * Avatares de demonstração: formas geométricas sobre gradiente roxo e azul da
 * Unooria, sem rostos.
 */
export const uaiAvatars = {
  lucas: asset('avatar-lucas'),
  ana: asset('avatar-ana'),
  rafael: asset('avatar-rafael'),
};

/** As três colunas da tela de nova conversa. */
export const uaiTopicColumns = [
  {
    icon: 'chats' as const,
    title: 'Exemplos',
    items: [
      '"Explique como funciona a fotossíntese em poucas palavras"',
      '"Tem alguma ideia criativa para a festa de 10 anos do meu sobrinho?"',
      '"Como faço uma requisição HTTP em JavaScript?"',
    ],
  },
  {
    icon: 'stars' as const,
    title: 'Capacidades',
    items: [
      'Lembra o que a pessoa disse antes na conversa.',
      'Permite que a pessoa faça correções em seguida.',
      'Foi treinado para recusar pedidos inadequados.',
    ],
  },
  {
    icon: 'shieldWarning' as const,
    title: 'Limitações',
    items: [
      'Pode, às vezes, gerar informações incorretas.',
      'Pode, às vezes, produzir instruções nocivas ou conteúdo enviesado.',
      'Conhecimento limitado sobre fatos recentes.',
    ],
  },
] as const;

/** Histórico de conversas da barra lateral do cliente web. */
export const uaiWebHistory = [
  'Ética no uso de assistentes',
  'Impacto na escrita escolar',
  'Nova conversa',
] as const;

/** Ações do rodapé da barra lateral do cliente web, com o ícone de cada uma. */
export const uaiWebFooterActions = [
  { icon: 'trash' as const, label: 'Limpar conversas' },
  { icon: 'sun' as const, label: 'Alternar tema' },
  { icon: 'user' as const, label: 'Minha conta' },
  { icon: 'arrowSquareOut' as const, label: 'Novidades e ajuda' },
  { icon: 'signOut' as const, label: 'Sair' },
] as const;

/** Conversas listadas na barra lateral. */
export const uaiConversations = [
  'Conversa sobre o projeto',
  'Pesquisa sobre energia solar',
  'Revisão de código',
  'Tokens do sistema de design',
  'Roteiro de onboarding',
] as const;

/** Troca de mensagens usada nas demonstrações de conversa. */
export const uaiTranscript = [
  { role: 'user' as const, message: 'Olá, como você pode me ajudar?' },
  {
    role: 'assistant' as const,
    message: 'Posso ajudar com muitas coisas! Fique à vontade para perguntar o que quiser.',
  },
  { role: 'user' as const, message: 'Resuma as decisões desta conversa em cinco linhas.' },
  {
    role: 'assistant' as const,
    message:
      'Claro. Reuni as decisões por tema — tokens, componentes e temas — mantendo apenas o que foi confirmado na conversa.',
  },
] as const;

/** Sugestões de prompt exibidas como cápsulas `Tag`. */
export const uaiPromptSuggestions = [
  'Gerar ideias',
  'Criar uma imagem',
  'Pesquisar na web',
  'Escrever ou programar',
  'Pesquisar a fundo',
  'Raciocinar',
] as const;

/** Catálogo de assistentes da tela de exploração. */
export const uaiCatalog = [
  {
    initial: 'A',
    name: 'Nome do assistente',
    description: 'Descrição curta do que o assistente sabe fazer',
  },
  {
    initial: 'D',
    name: 'Analista de dados',
    description: 'Lê planilhas, gera gráficos e explica os achados',
  },
  {
    initial: 'R',
    name: 'Mentor de redação',
    description: 'Revisa textos e sugere reescritas com tom consistente',
  },
  {
    initial: 'P',
    name: 'Parceiro de código',
    description: 'Escreve, revisa e refatora código em várias linguagens',
  },
] as const;

/** Recursos apresentados em grade na tela de nova conversa. */
export const uaiFeatures = [
  {
    title: 'Título do recurso',
    description: 'Descrição curta do recurso ou da capacidade',
  },
  {
    title: 'Criar uma imagem',
    description: 'Gera ilustrações e variações a partir de uma descrição',
  },
  {
    title: 'Pesquisar na web',
    description: 'Busca fontes atualizadas e cita o que encontrou',
  },
  {
    title: 'Escrever ou programar',
    description: 'Redige textos longos e blocos de código executáveis',
  },
] as const;

/** Linhas da tela de configurações. */
export const uaiSettings = [
  { label: 'Notificações', value: 'Ativadas' },
  { label: 'Tema', value: 'Sistema' },
  { label: 'Idioma', value: 'Detectar automaticamente' },
  { label: 'Idioma falado', value: 'Detectar automaticamente' },
  { label: 'Conversas arquivadas', value: 'Gerenciar' },
] as const;

/** Itens do rodapé da barra lateral. */
export const uaiSidebarFooter = ['Minha conta', 'Novidades e ajuda', 'Sair'] as const;

/**
 * Enquete de escolha única que encerra uma resposta (`ChoicePoll`). Nenhuma
 * opção é marcada como "certa": quem corrige, se houver correção, é o servidor.
 */
export const uaiPollQuestion = 'Antes de compartilhar o alerta, o que você faria primeiro?';

/** Opções curtas da enquete de demonstração. */
export const uaiPollOptions = [
  { id: 'fonte', label: 'Procurar a fonte oficial do aviso' },
  { id: 'grupo', label: 'Mandar no grupo da turma' },
  { id: 'esperar', label: 'Esperar alguém confirmar' },
  { id: 'ignorar', label: 'Ignorar a mensagem' },
];

/** A mesma pergunta com opções em frases inteiras, de duas a três linhas. */
export const uaiPollQuestionLong =
  'A IA respondeu que uma tempestade forte deve atingir a cidade amanhã à tarde e sugeriu suspender as aulas. Qual destas atitudes deixa a decisão mais confiável?';

/** Opções longas, para conferir a quebra de linha e o alvo de toque. */
export const uaiPollOptionsLong = [
  {
    id: 'defesa-civil',
    label:
      'Conferir o alerta no site da Defesa Civil e no serviço de meteorologia antes de repassar qualquer orientação para a turma.',
  },
  {
    id: 'pedir-fontes',
    label:
      'Pedir à IA as fontes da previsão e checar se elas existem e se foram publicadas hoje, e não em outra data.',
  },
  {
    id: 'compartilhar',
    label:
      'Compartilhar a resposta da IA do jeito que veio, porque um aviso de tempestade é urgente e não dá tempo de conferir.',
  },
  {
    id: 'perguntar-de-novo',
    label: 'Fazer a mesma pergunta de novo até a IA dar uma resposta diferente.',
  },
];

/**
 * Separadores de sessão (`SessionDivider`): uma conversa contínua atravessada
 * por três sessões de estudantes diferentes, com o horário de cada uma.
 */
export const uaiSessionLabels = [
  'Sessão 1/3: Lucas (21h10)',
  'Sessão 2/3: Ana (23h45)',
  'Sessão 3/3: Rafael (07h05)',
] as const;

/** Um separador longo, para o caso de quebra de linha em tela estreita. */
export const uaiSessionLabelLong =
  'Sessão 2/3: Ana — retomada depois de uma pausa de 2 horas e 35 minutos (23h45)';
