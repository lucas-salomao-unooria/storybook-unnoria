/**
 * Conteúdo de demonstração compartilhado pelas estórias do Unitube.
 *
 * As miniaturas, retratos e capas do arquivo Figma são **bitmaps colados** nos
 * frames. Ao contrário do WhatsApp Mobile e do Tik Tooria, cujos bitmaps são
 * fotografias genéricas exportadas para `public/`, os quadros de vídeo deste
 * arquivo são renderizações tridimensionais de logotipos de terceiros —
 * YouTube, Instagram, TikTok, Netflix, Twitter, Spotify, Discord e Tesla. Essas
 * marcas não foram exportadas nem redistribuídas.
 *
 * Em seu lugar, as estórias usam pôsteres sintéticos gerados abaixo: gradientes
 * em SVG embutido, montados com a própria escada de neutros do Unitube. Eles
 * não imitam nenhuma marca — servem apenas para dar massa visual às
 * composições. O desvio está registrado nas estórias correspondentes.
 *
 * Em produto, todas as imagens entram por prop (`src`, `avatarSrc`,
 * `coverSrc`): nenhum bitmap integra o pacote.
 */

/** Codifica um SVG como `data:` URI utilizável em `src`. */
const toDataUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

/**
 * Gera um pôster sintético de 16:9 com um gradiente diagonal entre dois tons.
 *
 * O rótulo é desenhado em Roboto para que os cartões da grade fiquem
 * distinguíveis entre si na documentação.
 */
export const poster = (from: string, to: string, label: string): string =>
  toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#g)"/>
  <circle cx="320" cy="180" r="78" fill="rgba(255,255,255,0.10)"/>
  <path d="M296 140 L376 180 L296 220 Z" fill="rgba(255,255,255,0.55)"/>
  <text x="320" y="312" fill="rgba(255,255,255,0.62)" font-family="Roboto, Arial, sans-serif"
        font-size="26" font-weight="700" text-anchor="middle">${label}</text>
</svg>`);

/**
 * Gera um retrato sintético circularizável, com as iniciais do nome.
 */
export const portrait = (background: string, initials: string): string =>
  toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <rect width="160" height="160" fill="${background}"/>
  <text x="80" y="80" fill="rgba(255,255,255,0.86)" font-family="Roboto, Arial, sans-serif"
        font-size="58" font-weight="700" text-anchor="middle" dominant-baseline="central">${initials}</text>
</svg>`);

/**
 * Capa de canal sintética, na proporção 1200×192 do arquivo.
 */
export const channelCover: string = toDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="192" viewBox="0 0 1200 192">
  <defs>
    <linearGradient id="c" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1B2A44"/>
      <stop offset="0.5" stop-color="#3B2350"/>
      <stop offset="1" stop-color="#4A1D2C"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="192" fill="url(#c)"/>
  <circle cx="980" cy="60" r="140" fill="rgba(255,255,255,0.05)"/>
  <circle cx="240" cy="170" r="110" fill="rgba(255,255,255,0.04)"/>
</svg>`);

/**
 * Um vídeo de demonstração da grade inicial.
 */
export interface UniDemoVideo {
  id: string;
  videoTitle: string;
  channelName: string;
  metadata: string;
  duration: string;
  thumbnailSrc: string;
  avatarSrc: string;
}

/** Retratos dos canais de demonstração, indexados por nome. */
export const avatars = {
  jamesGouse: portrait('#3F5C8C', 'JG'),
  alanCooper: portrait('#7A4A6E', 'AC'),
  marcusLevin: portrait('#8C6B3F', 'ML'),
  alexisSears: portrait('#3F7A6B', 'AS'),
  jesicaLambert: portrait('#6B3F7A', 'JL'),
  annaWhite: portrait('#7A3F4A', 'AW'),
  skylarDias: portrait('#3F6B7A', 'SD'),
  currentUser: portrait('#5A4A8C', 'LS'),
};

/**
 * Oito vídeos de demonstração, com os textos literais do arquivo
 * ("Video title goes here", "15K Views · 1 week ago", duração "23:45").
 */
export const videos: UniDemoVideo[] = [
  { id: 'v1', videoTitle: 'Video title goes here', channelName: 'Channel Name', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#16273F', '#0D1726', 'Documentário'), avatarSrc: avatars.jamesGouse },
  { id: 'v2', videoTitle: 'Video title goes here', channelName: 'Alan Cooper', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#3D1B3A', '#1E0E1D', 'Entrevista'), avatarSrc: avatars.alanCooper },
  { id: 'v3', videoTitle: 'Video title goes here', channelName: 'Marcus Levin', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#12303A', '#09181D', 'Tutorial'), avatarSrc: avatars.marcusLevin },
  { id: 'v4', videoTitle: 'Video title goes here', channelName: 'Alexis Sears', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#3A1520', '#1D0B10', 'Podcast'), avatarSrc: avatars.alexisSears },
  { id: 'v5', videoTitle: 'Video title goes here', channelName: 'Jesica Lambert', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#152A3A', '#0B151D', 'Ao vivo'), avatarSrc: avatars.jesicaLambert },
  { id: 'v6', videoTitle: 'Video title goes here', channelName: 'Anna White', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#14331F', '#0A1A10', 'Música'), avatarSrc: avatars.annaWhite },
  { id: 'v7', videoTitle: 'Video title goes here', channelName: 'Skylar Dias', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#241B3F', '#120E1F', 'Games'), avatarSrc: avatars.skylarDias },
  { id: 'v8', videoTitle: 'Video title goes here', channelName: 'Channel Name', metadata: '15K Views · 1 week ago', duration: '23:45', thumbnailSrc: poster('#3A1616', '#1D0B0B', 'Notícias'), avatarSrc: avatars.jamesGouse },
];

/**
 * Sugestões da coluna secundária, com os textos literais do arquivo
 * ("Ep 6: Living to Serve | SEARCH ON", "1M views · 3 years ago").
 */
export const suggestions = videos.slice(0, 8).map((video, index) => ({
  id: `s${index + 1}`,
  videoTitle: 'Ep 6: Living to Serve | SEARCH ON',
  channelName: video.channelName,
  metadata: '1M views · 3 years ago',
  duration: '23:45',
  thumbnailSrc: video.thumbnailSrc,
}));

/**
 * Categorias da barra de filtros. O arquivo repete o rótulo "Item" nas 28
 * pílulas; aqui os rótulos são variados para que a barra fique legível como
 * demonstração.
 */
export const categories = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'live', label: 'Live' },
  { id: 'news', label: 'News' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'podcasts', label: 'Podcasts' },
  { id: 'design', label: 'Design' },
  { id: 'nature', label: 'Nature' },
  { id: 'travel', label: 'Travel' },
  { id: 'sports', label: 'Sports' },
  { id: 'learning', label: 'Learning' },
];

/**
 * Comentários da tela de vídeo, com os textos literais do arquivo.
 */
export const comments = [
  { id: 'c1', authorName: 'User Name', timestamp: '8 hours ago', commentText: 'Wow, world is full of different skills', likeCount: 3, dislikeCount: 3, avatarSrc: avatars.jamesGouse },
  { id: 'c2', authorName: 'Alan Cooper', timestamp: '4 days ago', commentText: 'Can you provide?', likeCount: 12, dislikeCount: 0, avatarSrc: avatars.alanCooper },
  { id: 'c3', authorName: 'Marcus Levin', timestamp: '1 week ago', commentText: 'On January 2, 2022', likeCount: 5, dislikeCount: 1, avatarSrc: avatars.marcusLevin },
  { id: 'c4', authorName: 'Anna White', timestamp: '2 weeks ago', commentText: 'This is exactly what I was looking for, thanks for sharing.', likeCount: 41, dislikeCount: 0, avatarSrc: avatars.annaWhite },
];

/**
 * Abas do cabeçalho de canal, com os rótulos do arquivo.
 */
export const channelTabs = [
  { id: 'home', label: 'HOME' },
  { id: 'videos', label: 'VIDEOS' },
  { id: 'playlists', label: 'PLAYLISTS' },
  { id: 'community', label: 'COMMUNITY' },
  { id: 'channels', label: 'CHANNELS' },
  { id: 'about', label: 'ABOUT' },
];

/** Pôster de demonstração do reprodutor. */
export const playerPoster = poster('#1B2A44', '#0C1422', 'Video Title');
