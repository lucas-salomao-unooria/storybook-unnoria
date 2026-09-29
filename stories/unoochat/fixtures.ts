/**
 * Conteúdo de demonstração compartilhado pelas estórias do Unoochat.
 *
 * Os retratos, a textura de conversa e a fotografia de exemplo são ilustrações
 * geradas a partir da paleta da Plataforma Unooria e versionadas em
 * `public/unoochat/`. Nenhuma imagem é embutida no pacote: todas entram por
 * prop (`src`, `avatarSrc`, `portraitSrc`).
 */

/** Retratos ilustrados de contato */
export const uncAvatars = [
  '/unoochat/avatar-1.svg',
  '/unoochat/avatar-2.svg',
  '/unoochat/avatar-3.svg',
  '/unoochat/avatar-4.svg',
  '/unoochat/avatar-5.svg',
  '/unoochat/avatar-6.svg',
  '/unoochat/avatar-7.svg',
  '/unoochat/avatar-8.svg',
  '/unoochat/avatar-9.svg',
  '/unoochat/avatar-10.svg',
];

/** Retrato usado no cabeçalho de conversa */
export const uncAvatarPrincipal = '/unoochat/avatar-lider.svg';

/** Ladrilhos de 320px da textura do fundo da conversa, um por tema */
export const uncWallpaperLight = '/unoochat/chat-wallpaper-light.svg';
export const uncWallpaperDark = '/unoochat/chat-wallpaper-dark.svg';

/** Textura do tema claro, o padrão das estórias */
export const uncWallpaper = uncWallpaperLight;

/** Textura correspondente a um tema */
export const uncWallpaperFor = (theme: 'light' | 'dark') =>
  theme === 'dark' ? uncWallpaperDark : uncWallpaperLight;

/** Fotografia ilustrada anexada a uma mensagem */
export const uncSamplePhoto = '/unoochat/sample-photo.svg';

/** Retrato em tela cheia da tela de chamada */
export const uncCallPortrait = '/unoochat/call-portrait.svg';

/** Linhas da lista de conversas */
export const uncChats = [
  { id: 'c1', name: 'Amara Lima', time: '15:14', avatarSrc: uncAvatars[0], unread: 4 },
  { id: 'c2', name: 'Bruno Reis', time: '15:14', avatarSrc: uncAvatars[1] },
  { id: 'c3', name: 'Carla Nogueira', time: '15:14', avatarSrc: uncAvatars[2] },
  { id: 'c4', name: 'Davi Moraes', time: '15:14', avatarSrc: uncAvatars[3], muted: true },
  { id: 'c5', name: 'Elisa Prado', time: '15:14', avatarSrc: uncAvatars[4] },
  { id: 'c6', name: 'Fábio Teixeira', time: '15:14', avatarSrc: uncAvatars[5], compact: true },
  { id: 'c7', name: 'Gabi Duarte', time: '15:14', avatarSrc: uncAvatars[6] },
  { id: 'c8', name: 'Helena Vaz', time: '15:14', avatarSrc: uncAvatars[7] },
  { id: 'c9', name: 'Ícaro Santos', time: '15:14', avatarSrc: uncAvatars[8] },
  { id: 'c10', name: 'Júlia Ramos', time: '15:14', avatarSrc: uncAvatars[9] },
];

/** Atualizações de status recentes e já visualizadas */
export const uncStatusRecent = [
  { id: 's1', name: 'Elisa Prado', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[4] },
  { id: 's2', name: 'Gabi Duarte', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[6] },
  { id: 's3', name: 'Helena Vaz', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[7] },
];

export const uncStatusViewed = [
  { id: 'v1', name: 'Bruno Reis', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[1] },
  { id: 'v2', name: 'Davi Moraes', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[3] },
  { id: 'v3', name: 'Ícaro Santos', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[8] },
  { id: 'v4', name: 'Carla Nogueira', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[2] },
  { id: 'v5', name: 'Júlia Ramos', timestamp: 'há 30 minutos', avatarSrc: uncAvatars[9] },
];

/** Registros do histórico de chamadas */
export const uncCalls = [
  {
    id: 'k1',
    name: 'Amara Lima',
    timestamp: 'Ontem, 10:55',
    count: 3,
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: uncAvatars[0],
  },
  {
    id: 'k2',
    name: 'Carla Nogueira',
    timestamp: 'Ontem, 10:55',
    count: 3,
    direction: 'incoming' as const,
    kind: 'video' as const,
    avatarSrc: uncAvatars[2],
  },
  {
    id: 'k3',
    name: 'Elisa Prado',
    timestamp: 'Ontem, 10:55',
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: uncAvatars[4],
  },
  {
    id: 'k4',
    name: 'Bruno Reis',
    timestamp: 'Ontem, 10:55',
    count: 2,
    direction: 'incoming' as const,
    kind: 'voice' as const,
    avatarSrc: uncAvatars[1],
  },
  {
    id: 'k5',
    name: 'Davi Moraes',
    timestamp: 'Ontem, 10:55',
    count: 3,
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: uncAvatars[3],
  },
];

/** Itens do menu suspenso da barra superior */
export const uncMenuItems = [
  { id: 'new-group', label: 'Novo grupo' },
  { id: 'new-broadcast', label: 'Nova transmissão' },
  { id: 'devices', label: 'Aparelhos conectados' },
  { id: 'starred', label: 'Mensagens favoritadas' },
  { id: 'help', label: 'Ajuda' },
  { id: 'settings', label: 'Configurações' },
];

/** Linhas da tela de configurações */
export const uncSettings = [
  {
    id: 'account',
    icon: 'settingsAccount' as const,
    title: 'Conta',
    description: 'Privacidade, segurança, trocar número',
  },
  {
    id: 'chats',
    icon: 'settingsChats' as const,
    title: 'Conversas',
    description: 'Tema, papel de parede, histórico',
  },
  {
    id: 'notifications',
    icon: 'settingsNotifications' as const,
    title: 'Notificações',
    description: 'Sons de mensagens, grupos e chamadas',
  },
  {
    id: 'storage',
    icon: 'settingsStorage' as const,
    title: 'Armazenamento e dados',
    description: 'Uso de rede, download automático',
  },
  {
    id: 'help',
    icon: 'settingsHelp' as const,
    title: 'Ajuda',
    description: 'Central de ajuda, fale conosco, política de privacidade',
  },
  {
    id: 'invite',
    icon: 'settingsInvite' as const,
    title: 'Convidar um amigo',
  },
];

/** Ações da folha de anexos */
export const uncAttachmentActions = [
  { kind: 'document' as const, label: 'Documento', icon: 'document' as const },
  { kind: 'camera' as const, label: 'Câmera', icon: 'cameraFilled' as const },
  { kind: 'gallery' as const, label: 'Galeria', icon: 'gallery' as const },
  { kind: 'audio' as const, label: 'Áudio', icon: 'audio' as const },
  { kind: 'location' as const, label: 'Localização', icon: 'location' as const },
  { kind: 'contact' as const, label: 'Contato', icon: 'contact' as const },
];

/** Abas da navegação primária */
export const uncTabs = [
  { id: 'chats', label: 'CONVERSAS', badge: 4 },
  { id: 'status', label: 'STATUS' },
  { id: 'calls', label: 'CHAMADAS' },
];

/** Chips de filtro da busca em conversas */
export const uncSearchFilters = [
  { id: 'photos', label: 'Fotos' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'links', label: 'Links' },
  { id: 'gifs', label: 'GIFs' },
  { id: 'audio', label: 'Áudios' },
  { id: 'documents', label: 'Documentos' },
];
