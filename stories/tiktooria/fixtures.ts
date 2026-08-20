/**
 * Conteúdo de demonstração compartilhado pelas estórias do Tik Tooria.
 *
 * Todos os bitmaps — quadros de vídeo, retratos, miniaturas, capa de álbum e
 * pré-visualização de câmera — foram exportados do arquivo Figma "TikTok UI
 * Screens (Community) - cópia" (fileKey `UIYCB87CQkpFwf1aWTBl1a`) e versionados
 * em `public/tiktooria/`. Nenhuma imagem é embutida no pacote: os componentes as
 * recebem por prop (`src`, `avatarSrc`, `coverSrc`).
 */

/** Quadro do vídeo da aba "For You" (node 4:1062) */
export const tikFeedForYou = '/tiktooria/feed-foryou.jpg';

/** Quadro do vídeo da aba "Following" (node 4:1145) */
export const tikFeedFollowing = '/tiktooria/feed-following.jpg';

/** Quadro do vídeo sob a folha de comentários (node 4:958) */
export const tikFeedComments = '/tiktooria/feed-comments.jpg';

/** Pré-visualização da câmera (node 4:670) */
export const tikCameraPreview = '/tiktooria/camera-preview.jpg';

/** Retrato do autor do vídeo "For You" (node 4:1086) */
export const tikAvatarCraig = '/tiktooria/avatar-craig.png';

/** Retrato do autor do vídeo "Following" (node 4:1169) */
export const tikAvatarKarennne = '/tiktooria/avatar-karennne.png';

/** Retrato de 96px do cabeçalho do perfil (node 4:481) */
export const tikAvatarJacob = '/tiktooria/avatar-jacob.png';

/** Capa do disco giratório (node 4:1067) */
export const tikDiscCover = '/tiktooria/disc-cover.png';

/** Capa do álbum na página de som (node 4:818) */
export const tikAlbumCover = '/tiktooria/album-cover.jpg';

/** Retratos dos oito comentários da folha (nodes 4:970 a 4:1032) */
export const tikCommentAvatars = [
  '/tiktooria/comment-avatar-1.png',
  '/tiktooria/comment-avatar-2.png',
  '/tiktooria/comment-avatar-3.png',
  '/tiktooria/comment-avatar-4.png',
  '/tiktooria/comment-avatar-5.png',
  '/tiktooria/comment-avatar-6.png',
  '/tiktooria/comment-avatar-7.png',
  '/tiktooria/comment-avatar-8.png',
];

/** Miniaturas de 137×182 da grade do perfil (node 4:447) */
export const tikThumbnails = [
  '/tiktooria/thumb-1.jpg',
  '/tiktooria/thumb-2.jpg',
  '/tiktooria/thumb-3.jpg',
  '/tiktooria/thumb-4.jpg',
];

/** Fotografias do carrossel de upload (node 4:629) */
export const tikPhotos = [
  '/tiktooria/photo-1.png',
  '/tiktooria/photo-2.jpg',
  '/tiktooria/photo-3.jpg',
  '/tiktooria/photo-4.png',
];

/** Comentários do frame "Comments" (node 4:964), com os textos originais */
export const tikComments = [
  {
    author: 'martini_rond',
    text: 'How neatly I write the date in my book',
    time: '22h',
    likes: '8098',
    repliesLabel: 'View replies (4)',
    avatarSrc: tikCommentAvatars[0],
  },
  {
    author: 'maxjacobson',
    text: 'Now that’s a skill very talented',
    time: '22h',
    likes: '8098',
    repliesLabel: 'View replies (1)',
    avatarSrc: tikCommentAvatars[1],
  },
  {
    author: 'zackjohn',
    text: 'Doing this would make me so anxious',
    time: '22h',
    likes: '8098',
    avatarSrc: tikCommentAvatars[5],
  },
  {
    author: 'kiero_d',
    text: 'Use that on r air forces to whiten them',
    time: '21h',
    likes: '8098',
    repliesLabel: 'View replies (9)',
    avatarSrc: tikCommentAvatars[2],
  },
  {
    author: 'mis_potter',
    text: 'Sjpuld’ve used that on his forces 😷😷',
    time: '13h',
    likes: '8098',
    repliesLabel: 'View replies (4)',
    verified: true,
    avatarSrc: tikCommentAvatars[3],
  },
  {
    author: 'karennne',
    text: 'No prressure',
    time: '22h',
    likes: '8098',
    repliesLabel: 'View replies (2)',
    avatarSrc: tikCommentAvatars[4],
  },
  {
    author: 'joshua_l',
    text: 'My OCD couldn’t do it',
    time: '15h',
    likes: '8098',
    avatarSrc: tikCommentAvatars[6],
  },
];

/** Seções da tela "Privacy and settings" (node 4:251), na ordem do arquivo */
export const tikSettingsSections = [
  {
    label: 'ACCOUNT',
    rows: [
      { label: 'Manage my account', icon: 'accountStroke' as const },
      { label: 'Privacy and safety', icon: 'lock' as const },
      { label: 'Content preferences', icon: 'camera' as const },
      { label: 'Balance', icon: 'wallet' as const },
      { label: 'Share profile', icon: 'share' as const },
      { label: 'TikCode', icon: 'qrCode' as const },
    ],
  },
  {
    label: 'GENERAL',
    rows: [
      { label: 'Push notifications', icon: 'bell' as const },
      { label: 'Language', icon: 'book' as const },
      { label: 'Digital Wellbeing', icon: 'umbrella' as const },
      { label: 'Accessibility', icon: 'accessibility' as const },
      { label: 'Data Saver', icon: 'drop' as const },
    ],
  },
  {
    label: 'SUPPORT',
    rows: [
      { label: 'Report a problem', icon: 'pen' as const },
      { label: 'Help Center', icon: 'question' as const },
    ],
  },
];

/** Linhas da tela "Edit profile" (node 4:359), com os valores do arquivo */
export const tikEditProfileRows = [
  { label: 'Name', value: 'Jacob West' },
  { label: 'Username', value: 'jacob_w' },
  { label: 'Bio', value: 'Add a bio to your profile' },
  { label: 'Instagram', value: 'Add Instagram to your profile' },
  { label: 'YouTube', value: 'Add YouTube to your profile' },
];

/** Ações da folha "Share to" (node 4:862), na ordem do arquivo */
export const tikShareActions = [
  { label: 'Report', icon: 'report' as const },
  { label: 'Not interested', icon: 'brokenHeart' as const },
  { label: 'Save video', icon: 'download' as const },
  { label: 'Duet', icon: 'duet' as const },
  { label: 'React', icon: 'react' as const },
  { label: 'Add to Favorites', icon: 'bookmarkMedium' as const },
];

/** Ferramentas da coluna da câmera (node 4:672), na ordem do arquivo */
export const tikCameraTools = [
  { label: 'Flip', icon: 'flip' as const },
  { label: 'Speed', icon: 'speed' as const },
  { label: 'Beauty', icon: 'magicPen' as const },
  { label: 'Filters', icon: 'filters' as const },
  { label: 'Timer', icon: 'timer' as const },
  { label: 'Flash', icon: 'flash' as const },
];

/** Modos de captura da câmera (node 4:664) */
export const tikCameraModes = [
  { id: '60s', label: '60s' },
  { id: '15s', label: '15s' },
  { id: 'templates', label: 'Templates' },
];

/** As três métricas do cabeçalho do perfil (node 4:479) */
export const tikProfileStats = [
  { value: '14', label: 'Following' },
  { value: '38', label: 'Followers' },
  { value: '91', label: 'Likes' },
];
