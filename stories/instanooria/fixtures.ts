/**
 * Conteúdo de demonstração das estórias do Instanooria.
 *
 * Os nomes de usuário reproduzem os do arquivo Figma "Instagram UI Screens
 * (Community)"; as imagens são fotografias livres do Unsplash, seguindo a mesma
 * convenção já adotada pelas estórias da Plataforma Unooria.
 */

const unsplash = (id: string, width = 200) =>
  `https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=80`;

/**
 * Avatares de demonstração indexados por nome de usuário.
 */
export const instaAvatars = {
  joshua_l: unsplash('photo-1507003211169-0a1dd7228f2d'),
  karennne: unsplash('photo-1494790108377-be9c29b29330'),
  zackjohn: unsplash('photo-1500648767791-00dcc994a43e'),
  kieron_d: unsplash('photo-1506794778202-cad84cf45f1d'),
  craig_love: unsplash('photo-1519085360753-af0119f7cbe7'),
  jacob_w: unsplash('photo-1472099645785-5658abf4ff4e'),
  martini_rond: unsplash('photo-1492562080023-ab3db95bfbce'),
  maxjacobson: unsplash('photo-1531427186611-ecfd6d936c79'),
  jamie_franco: unsplash('photo-1544005313-94ddf0286df2'),
  m_humphrey: unsplash('photo-1534528741775-53994a69daeb'),
  andrewww_: unsplash('photo-1463453091185-61582044d556'),
  mis_potter: unsplash('photo-1524504388940-b1c1722653e1'),
};

/**
 * Fotografias de publicações de demonstração.
 */
export const instaPhotos = {
  tokyo: unsplash('photo-1540959733332-eab4deabeeaf', 800),
  mountains: unsplash('photo-1506905925346-21bda4d32df4', 600),
  desk: unsplash('photo-1498050108023-c5249f4df085', 600),
  turbines: unsplash('photo-1466611653911-95081537e5b7', 600),
  road: unsplash('photo-1469474968028-56623f02e42e', 600),
  city: unsplash('photo-1444723121867-7a241cacace9', 600),
  coffee: unsplash('photo-1495474472287-4d71bcdd2085', 600),
  skate: unsplash('photo-1520045892732-304bc3ac5d8e', 600),
  forest: unsplash('photo-1441974231531-c6227db76b6e', 600),
  street: unsplash('photo-1449824913935-59a10b8d2000', 600),
  portrait: unsplash('photo-1524504388940-b1c1722653e1', 600),
  studio: unsplash('photo-1516035069371-29a1b244cc32', 600),
};

/**
 * Itens de demonstração da bandeja de stories do Feed.
 */
export const instaStoryItems = [
  { id: 'me', username: 'Seu story', avatarSrc: instaAvatars.jacob_w, state: 'unseen' as const },
  {
    id: 'karennne',
    username: 'karennne',
    avatarSrc: instaAvatars.karennne,
    state: 'live' as const,
  },
  {
    id: 'zackjohn',
    username: 'zackjohn',
    avatarSrc: instaAvatars.zackjohn,
    state: 'unseen' as const,
  },
  {
    id: 'kieron_d',
    username: 'kieron_d',
    avatarSrc: instaAvatars.kieron_d,
    state: 'unseen' as const,
  },
  {
    id: 'craig_love',
    username: 'craig_love',
    avatarSrc: instaAvatars.craig_love,
    state: 'unseen' as const,
  },
  {
    id: 'martini_rond',
    username: 'martini_rond',
    avatarSrc: instaAvatars.martini_rond,
    state: 'seen' as const,
  },
];

/**
 * Destaques do perfil de demonstração.
 */
export const instaHighlightItems = [
  { id: 'new', username: 'Novo', state: 'add' as const },
  {
    id: 'friends',
    username: 'Amigos',
    avatarSrc: instaAvatars.craig_love,
    state: 'seen' as const,
  },
  { id: 'sport', username: 'Esporte', avatarSrc: instaPhotos.skate, state: 'seen' as const },
  { id: 'design', username: 'Design', avatarSrc: instaPhotos.desk, state: 'seen' as const },
];

/**
 * Conversas de demonstração da caixa de mensagens diretas.
 */
export const instaConversations = [
  {
    id: 'joshua_l',
    username: 'joshua_l',
    avatarSrc: instaAvatars.joshua_l,
    message: 'Tenha um ótimo dia, cara!',
    time: 'agora',
    ring: 'story' as const,
  },
  {
    id: 'karennne',
    username: 'karennne',
    avatarSrc: instaAvatars.karennne,
    message: 'Ouvi dizer que esse filme é bom, você...',
    time: 'agora',
    ring: 'none' as const,
  },
  {
    id: 'martini_rond',
    username: 'martini_rond',
    avatarSrc: instaAvatars.martini_rond,
    message: 'Nos vemos na próxima reunião!',
    time: '15m',
    ring: 'none' as const,
  },
  {
    id: 'andrewww_',
    username: 'andrewww_',
    avatarSrc: instaAvatars.andrewww_,
    message: 'Combinado 😄😄😄',
    time: '20m',
    ring: 'none' as const,
  },
  {
    id: 'kiero_d',
    username: 'kiero_d',
    avatarSrc: instaAvatars.kieron_d,
    message: 'O novo design ficou incrível, parab...',
    time: '1m',
    ring: 'none' as const,
  },
  {
    id: 'maxjacobson',
    username: 'maxjacobson',
    avatarSrc: instaAvatars.maxjacobson,
    message: 'Obrigado, cara!',
    time: '2h',
    ring: 'none' as const,
  },
];

/**
 * Publicações de demonstração da grade do perfil.
 */
export const instaGridItems = [
  { id: '1', src: instaPhotos.forest, alt: 'Floresta ao amanhecer', type: 'image' as const },
  { id: '2', src: instaPhotos.mountains, alt: 'Montanhas', type: 'image' as const },
  { id: '3', src: instaPhotos.turbines, alt: 'Turbinas eólicas', type: 'image' as const },
  { id: '4', src: instaPhotos.desk, alt: 'Estação de trabalho', type: 'image' as const },
  { id: '5', src: instaPhotos.skate, alt: 'Manobra de skate', type: 'video' as const },
  { id: '6', src: instaPhotos.studio, alt: 'Estúdio fotográfico', type: 'image' as const },
  { id: '7', src: instaPhotos.city, alt: 'Cidade ao entardecer', type: 'image' as const },
  { id: '8', src: instaPhotos.road, alt: 'Estrada vazia', type: 'image' as const },
  { id: '9', src: instaPhotos.coffee, alt: 'Café da manhã', type: 'image' as const },
];

/**
 * Categorias de demonstração da tela Buscar.
 */
export const instaSearchCategories = ['IGTV', 'Loja', 'Estilo', 'Esportes', 'Automóveis', 'Viagem'];

/*
 * ==========================================================================
 * Extensões da missão "A Seleção" (25/09/2026)
 * Conteúdo de demonstração das peças que o arquivo de origem não publica:
 * a conversa de DM aberta, a enquete, a seleção múltipla e o Story do grêmio.
 * ==========================================================================
 */

/**
 * A outra pessoa da conversa de demonstração.
 */
export const instaThreadContact = {
  username: 'amara.gremio',
  avatarSrc: instaAvatars.karennne,
  subtitle: 'Ativa agora',
};

/**
 * Mensagens de demonstração do DirectThread, já agrupadas como no app real.
 */
export const instaThreadMessages = [
  {
    id: 'm1',
    direction: 'incoming' as const,
    position: 'first' as const,
    text: 'Oi! Aqui é a Amara, do grêmio 👋',
  },
  {
    id: 'm2',
    direction: 'incoming' as const,
    position: 'last' as const,
    text: 'Vi que você montou os Stories da semana. Posso te fazer duas perguntas rápidas?',
  },
  {
    id: 'm3',
    direction: 'outgoing' as const,
    position: 'first' as const,
    text: 'Pode sim!',
  },
  {
    id: 'm4',
    direction: 'outgoing' as const,
    position: 'last' as const,
    text: 'Escolhi os três posts agora há pouco.',
  },
];

/**
 * Opções de demonstração da enquete na DM — nenhuma é "a certa".
 */
export const instaPollOptions = [
  { id: 'foto', label: 'A foto era a mais bonita' },
  { id: 'util', label: 'A informação era útil para a turma' },
  { id: 'curtidas', label: 'Muita gente já tinha curtido' },
  { id: 'confianca', label: 'Eu confio em quem postou' },
];

/**
 * Blocos de demonstração da seleção múltipla (quatro colunas, como na tela de
 * adicionar imagem).
 */
export const instaPickerItems = [
  ...instaGridItems,
  { id: '10', src: instaPhotos.street, alt: 'Rua movimentada', type: 'image' as const },
  { id: '11', src: instaPhotos.portrait, alt: 'Retrato ao ar livre', type: 'image' as const },
  { id: '12', src: instaPhotos.tokyo, alt: 'Cruzamento em Tóquio', type: 'image' as const },
];
