/**
 * Conteúdo de demonstração compartilhado pelas estórias do WhatsApp Mobile.
 *
 * Todos os retratos, a textura de conversa e a fotografia de exemplo foram
 * exportados do arquivo Figma "WhatsApp Clone - Dark mode (Community) - cópia"
 * e versionados em `public/whatsappmobile/`.
 */

/** Retratos de contato exportados do frame "Chats Main Page" (nodes 1:2044+) */
export const waAvatars = [
  '/whatsappmobile/avatar-1.png',
  '/whatsappmobile/avatar-2.png',
  '/whatsappmobile/avatar-3.png',
  '/whatsappmobile/avatar-4.png',
  '/whatsappmobile/avatar-5.png',
  '/whatsappmobile/avatar-6.png',
  '/whatsappmobile/avatar-7.png',
  '/whatsappmobile/avatar-8.png',
  '/whatsappmobile/avatar-9.png',
  '/whatsappmobile/avatar-10.png',
];

/** Retrato de 64px usado no cabeçalho de conversa (node 1:3001) */
export const waAvatarJane = '/whatsappmobile/avatar-jane.png';

/** Textura de rabiscos do fundo da conversa (node 1:2974) */
export const waWallpaper = '/whatsappmobile/chat-wallpaper.jpg';

/** Fotografia anexada no frame "Picture sent" (node 1:4043) */
export const waSamplePhoto = '/whatsappmobile/sample-photo.jpg';

/** Retrato em tela cheia do frame "Voice call" (node 1:4630) */
export const waCallPortrait = '/whatsappmobile/call-portrait.png';

/** Linhas da lista de conversas, com os rótulos originais do arquivo */
export const waChats = [
  { id: 'c1', name: 'Jane Doe', time: '3:14 pm', avatarSrc: waAvatars[0], unread: 4 },
  { id: 'c2', name: 'John Doe', time: '3:14 pm', avatarSrc: waAvatars[1] },
  { id: 'c3', name: 'Jane Doe', time: '3:14 pm', avatarSrc: waAvatars[2] },
  { id: 'c4', name: 'John Doe', time: '3:14 pm', avatarSrc: waAvatars[3], muted: true },
  { id: 'c5', name: 'Jane Doe', time: '3:14 pm', avatarSrc: waAvatars[4] },
  { id: 'c6', name: 'John Doe', time: '3:14 pm', avatarSrc: waAvatars[5], compact: true },
  { id: 'c7', name: 'John Doe', time: '3:14 pm', avatarSrc: waAvatars[6] },
  { id: 'c8', name: 'Jane Doe', time: '3:14 pm', avatarSrc: waAvatars[7] },
  { id: 'c9', name: 'Jane Doe', time: '3:14 pm', avatarSrc: waAvatars[8] },
  { id: 'c10', name: 'John Doe', time: '3:14 pm', avatarSrc: waAvatars[9] },
];

/** Atualizações de status recentes e já visualizadas */
export const waStatusRecent = [
  { id: 's1', name: 'Jane Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[4] },
  { id: 's2', name: 'John Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[6] },
  { id: 's3', name: 'Jane Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[7] },
];

export const waStatusViewed = [
  { id: 'v1', name: 'John Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[1] },
  { id: 'v2', name: 'John Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[3] },
  { id: 'v3', name: 'Jane Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[8] },
  { id: 'v4', name: 'Jane Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[2] },
  { id: 'v5', name: 'John Doe', timestamp: '30 minutes ago', avatarSrc: waAvatars[9] },
];

/** Registros do histórico de chamadas */
export const waCalls = [
  {
    id: 'k1',
    name: 'Jane Doe',
    timestamp: 'Yesterday, 10:55 am',
    count: 3,
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: waAvatars[0],
  },
  {
    id: 'k2',
    name: 'Jane Doe',
    timestamp: 'Yesterday, 10:55 am',
    count: 3,
    direction: 'incoming' as const,
    kind: 'video' as const,
    avatarSrc: waAvatars[2],
  },
  {
    id: 'k3',
    name: 'Jane Doe',
    timestamp: 'Yesterday, 10:55 am',
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: waAvatars[4],
  },
  {
    id: 'k4',
    name: 'John Doe',
    timestamp: 'Yesterday, 10:55 am',
    count: 2,
    direction: 'incoming' as const,
    kind: 'voice' as const,
    avatarSrc: waAvatars[1],
  },
  {
    id: 'k5',
    name: 'John Doe',
    timestamp: 'Yesterday, 10:55 am',
    count: 3,
    direction: 'outgoing' as const,
    kind: 'voice' as const,
    avatarSrc: waAvatars[3],
  },
];

/** Itens do menu suspenso da barra superior (node 1:2277) */
export const waMenuItems = [
  { id: 'new-group', label: 'New group' },
  { id: 'new-broadcast', label: 'New broadcast' },
  { id: 'whatsapp-web', label: 'WhatsApp Web' },
  { id: 'starred', label: 'Starred messages' },
  { id: 'payments', label: 'Payments' },
  { id: 'settings', label: 'Settings' },
];

/** Linhas da tela Settings (node 1:2691) */
export const waSettings = [
  {
    id: 'account',
    icon: 'settingsAccount' as const,
    title: 'Account',
    description: 'Privacy, security, change number',
  },
  {
    id: 'chats',
    icon: 'settingsChats' as const,
    title: 'Chats',
    description: 'Theme, wallpapers, chat history',
    iconRotate: 180,
  },
  {
    id: 'notifications',
    icon: 'settingsNotifications' as const,
    title: 'Notifications',
    description: 'Message, group & call tones',
  },
  {
    id: 'storage',
    icon: 'settingsStorage' as const,
    title: 'Storage and data',
    description: 'Network usage, auto-download',
  },
  {
    id: 'help',
    icon: 'settingsHelp' as const,
    title: 'Help',
    description: 'Help centre, contact us, privacy policy',
  },
  {
    id: 'invite',
    icon: 'settingsInvite' as const,
    title: 'Invite a friend',
  },
];

/** Ações da folha de anexos (node 1:3943) */
export const waAttachmentActions = [
  { kind: 'document' as const, label: 'Document', icon: 'filePdf' as const },
  { kind: 'camera' as const, label: 'Camera', icon: 'cameraFilled' as const },
  { kind: 'gallery' as const, label: 'Gallery', icon: 'composerCamera' as const },
  { kind: 'audio' as const, label: 'Audio', icon: 'micBody' as const },
  { kind: 'location' as const, label: 'Location', icon: 'settingsStorage' as const },
  { kind: 'contact' as const, label: 'Contact', icon: 'settingsInvite' as const },
];

/** Abas da navegação primária (nodes 1:2140, 1:2141, 1:2142) */
export const waTabs = [
  { id: 'chats', label: 'CHATS', badge: 4 },
  { id: 'status', label: 'STATUS' },
  { id: 'calls', label: 'CALLS' },
];

/** Chips de filtro da busca em conversas (node 1:1916) */
export const waSearchFilters = [
  { id: 'photos', label: 'Photos' },
  { id: 'videos', label: 'Vidoes' },
  { id: 'links', label: 'Links' },
  { id: 'gifs', label: 'Gifs' },
  { id: 'audio', label: 'Audio' },
  { id: 'documents', label: 'Documents' },
];
