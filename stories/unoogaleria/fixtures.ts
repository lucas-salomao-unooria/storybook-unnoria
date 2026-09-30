/**
 * Conteúdo de demonstração das estórias da Unoogaleria.
 *
 * Tudo aqui é fictício e autocontido. As fotos são ilustrações SVG originais de
 * `public/unoogaleria/`, desenhadas só com a paleta da Plataforma Unooria; os
 * três vídeos foram gerados por síntese (gradientes e formas da mesma paleta) e
 * não contêm imagem de terceiros. Nada é embutido no pacote: tudo entra nos
 * componentes por prop (`src`, `videoSrc`, `avatarSrc`, `coverSrc`).
 *
 * As datas giram em torno de um "agora" FIXO (`uglDemoNow`), para que "Hoje",
 * "Ontem" e os dias restantes da lixeira sejam os mesmos em qualquer máquina e
 * em qualquer dia em que o teste rodar. Passe `now={uglDemoNow}` aos
 * componentes que falam de datas.
 */

import type { UglAlbum, UglMediaItem, UglPerson } from '../../src/unoogaleria/media';

/** Momento de referência das estórias: quarta-feira, 30/09/2026, 10:00 em São Paulo. */
export const uglDemoNow = '2026-09-30T10:00:00-03:00';

const foto = (slug: string) => `/unoogaleria/foto-${slug}.svg`;
const pessoa = (slug: string) => `/unoogaleria/pessoa-${slug}.svg`;

/**
 * Retratos das pessoas de demonstração (quadrados, 256 × 256).
 */
export const uglPeople: UglPerson[] = [
  { id: 'ana', name: 'Ana', avatarSrc: pessoa('ana') },
  { id: 'bruno', name: 'Bruno', avatarSrc: pessoa('bruno') },
  { id: 'carla', name: 'Carla', avatarSrc: pessoa('carla') },
  { id: 'diego', name: 'Diego', avatarSrc: pessoa('diego') },
  { id: 'elisa', name: 'Elisa', avatarSrc: pessoa('elisa') },
  { id: 'felipe', name: 'Felipe', avatarSrc: pessoa('felipe') },
];

/** Câmeras de demonstração, como aparecem no painel de informações. */
const CAMERA_TRASEIRA = 'Câmera traseira · 26 mm · ƒ/1,8';
const CAMERA_ULTRA = 'Câmera ultra-angular · 13 mm · ƒ/2,2';
const CAMERA_FRONTAL = 'Câmera frontal · 23 mm · ƒ/2,0';

/**
 * A biblioteca de demonstração: 22 fotos e 3 vídeos, do mais recente ao mais
 * antigo, espalhados por hoje, ontem, esta semana, este mês, agosto e 2025.
 */
export const uglMediaItems: UglMediaItem[] = [
  /* ---------------------------------------------------------------- Hoje */
  {
    id: 'm01',
    type: 'photo',
    src: foto('cafe-manha'),
    alt: 'Xícara de café e pão de queijo sobre a mesa de madeira',
    width: 1080,
    height: 1080,
    takenAt: '2026-09-30T08:12:00-03:00',
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_412_000,
    fileName: 'IMG_4102.HEIC',
    albumIds: ['receitas'],
    tags: ['café', 'comida', 'manhã'],
    subtypes: ['hdr'],
  },
  {
    id: 'm02',
    type: 'video',
    src: '/unoogaleria/capa-video-luzes.jpg',
    videoSrc: '/unoogaleria/video-luzes.mp4',
    alt: 'Lanternas de papel subindo no céu da festa junina',
    width: 540,
    height: 960,
    takenAt: '2026-09-30T07:40:00-03:00',
    duration: 6,
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 9_870_000,
    fileName: 'IMG_4101.MOV',
    favorite: true,
    tags: ['festa', 'noite', 'luzes'],
  },
  {
    id: 'm03',
    type: 'photo',
    src: foto('selfie-amigos'),
    alt: 'Três amigos sorrindo em uma selfie no parque',
    width: 900,
    height: 1200,
    takenAt: '2026-09-30T07:15:00-03:00',
    location: 'Parque Municipal, Belo Horizonte',
    camera: CAMERA_FRONTAL,
    sizeBytes: 1_980_000,
    fileName: 'IMG_4100.HEIC',
    people: ['ana', 'bruno', 'carla'],
    albumIds: ['familia'],
    subtypes: ['selfie'],
    tags: ['amigos', 'parque'],
  },
  {
    id: 'm04',
    type: 'photo',
    src: foto('gato-janela'),
    alt: 'Gato cinza dormindo no parapeito da janela',
    width: 900,
    height: 1200,
    takenAt: '2026-09-30T06:58:00-03:00',
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_105_000,
    fileName: 'IMG_4099.HEIC',
    favorite: true,
    tags: ['gato', 'animais', 'casa'],
    subtypes: ['live'],
  },

  /* ---------------------------------------------------------------- Ontem */
  {
    id: 'm05',
    type: 'video',
    src: '/unoogaleria/capa-video-mar.jpg',
    videoSrc: '/unoogaleria/video-mar.mp4',
    alt: 'Ondas do mar sob o sol do fim de tarde',
    width: 960,
    height: 540,
    takenAt: '2026-09-29T17:48:00-03:00',
    duration: 8,
    location: 'Praia do Forte, BA',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 14_200_000,
    fileName: 'IMG_4090.MOV',
    tags: ['praia', 'mar', 'pôr do sol'],
  },
  {
    id: 'm06',
    type: 'photo',
    src: foto('praia-por-do-sol'),
    alt: 'Pôr do sol na praia com o mar calmo',
    width: 1200,
    height: 900,
    takenAt: '2026-09-29T17:40:00-03:00',
    location: 'Praia do Forte, BA',
    camera: CAMERA_ULTRA,
    sizeBytes: 3_020_000,
    fileName: 'IMG_4089.HEIC',
    favorite: true,
    tags: ['praia', 'mar', 'pôr do sol', 'paisagem'],
    subtypes: ['hdr'],
  },

  /* ---------------------------------------------------------------- Domingo */
  {
    id: 'm07',
    type: 'photo',
    src: foto('bolo-aniversario'),
    alt: 'Bolo de aniversário com velas acesas',
    width: 1200,
    height: 900,
    takenAt: '2026-09-27T19:05:00-03:00',
    location: 'Salvador, BA',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_640_000,
    fileName: 'IMG_4071.HEIC',
    people: ['elisa'],
    albumIds: ['familia'],
    tags: ['aniversário', 'bolo', 'festa'],
    description: 'Os 12 anos da Elisa!',
  },
  {
    id: 'm08',
    type: 'video',
    src: '/unoogaleria/capa-video-nuvens.jpg',
    videoSrc: '/unoogaleria/video-nuvens.mp4',
    alt: 'Nuvens passando devagar sobre as colinas',
    width: 960,
    height: 540,
    takenAt: '2026-09-27T11:20:00-03:00',
    duration: 12,
    location: 'Salvador, BA',
    camera: CAMERA_ULTRA,
    sizeBytes: 21_500_000,
    fileName: 'IMG_4065.MOV',
    tags: ['nuvens', 'céu', 'paisagem'],
  },

  /* ---------------------------------------------------------- Sexta-feira */
  {
    id: 'm09',
    type: 'photo',
    src: foto('documento-recibo'),
    alt: 'Recibo da livraria fotografado sobre a mesa',
    width: 900,
    height: 1200,
    takenAt: '2026-09-25T16:12:00-03:00',
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 1_450_000,
    fileName: 'IMG_4046.HEIC',
    albumIds: ['escola'],
    tags: ['documento', 'recibo'],
  },
  {
    id: 'm10',
    type: 'photo',
    src: foto('aula-quadro'),
    alt: 'Quadro da sala de aula com a matéria de frações',
    width: 1200,
    height: 900,
    takenAt: '2026-09-25T10:31:00-03:00',
    location: 'Escola Estadual Tiradentes',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_880_000,
    fileName: 'IMG_4040.HEIC',
    albumIds: ['escola', 'turma-7b'],
    tags: ['escola', 'matemática', 'documento'],
  },
  {
    id: 'm11',
    type: 'photo',
    src: foto('captura-mapa'),
    alt: 'Captura de tela de um mapa com a rota até a escola',
    width: 780,
    height: 1688,
    takenAt: '2026-09-25T07:02:00-03:00',
    sizeBytes: 640_000,
    fileName: 'Captura de tela 2026-09-25.png',
    subtypes: ['screenshot'],
    tags: ['mapa', 'escola'],
  },

  /* ---------------------------------------------------------- 21 de setembro */
  {
    id: 'm12',
    type: 'photo',
    src: foto('cachoeira'),
    alt: 'Cachoeira caindo entre as pedras',
    width: 900,
    height: 1200,
    takenAt: '2026-09-21T11:18:00-03:00',
    location: 'Chapada dos Veadeiros, GO',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 3_310_000,
    fileName: 'IMG_4003.HEIC',
    favorite: true,
    albumIds: ['chapada'],
    tags: ['cachoeira', 'natureza', 'viagem', 'água'],
  },
  {
    id: 'm13',
    type: 'photo',
    src: foto('panorama-serra'),
    alt: 'Panorama da serra com o vale ao fundo',
    width: 2400,
    height: 800,
    takenAt: '2026-09-21T09:44:00-03:00',
    location: 'Chapada dos Veadeiros, GO',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 6_900_000,
    fileName: 'IMG_3998.HEIC',
    albumIds: ['chapada'],
    subtypes: ['panorama'],
    tags: ['montanha', 'paisagem', 'viagem'],
  },
  {
    id: 'm14',
    type: 'photo',
    src: foto('floresta-trilha'),
    alt: 'Trilha de terra no meio da floresta',
    width: 900,
    height: 1200,
    takenAt: '2026-09-21T08:30:00-03:00',
    location: 'Chapada dos Veadeiros, GO',
    camera: CAMERA_ULTRA,
    sizeBytes: 2_990_000,
    fileName: 'IMG_3990.HEIC',
    albumIds: ['chapada'],
    tags: ['floresta', 'natureza', 'trilha', 'viagem'],
  },

  /* ---------------------------------------------------------- 14 de setembro */
  {
    id: 'm15',
    type: 'photo',
    src: foto('cidade-noite'),
    alt: 'Prédios iluminados da cidade à noite',
    width: 900,
    height: 1200,
    takenAt: '2026-09-14T20:10:00-03:00',
    location: 'São Paulo, SP',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_760_000,
    fileName: 'IMG_3950.HEIC',
    tags: ['cidade', 'noite', 'prédios'],
  },
  {
    id: 'm16',
    type: 'photo',
    src: foto('rua-colorida'),
    alt: 'Rua de pedra com casarões coloridos',
    width: 900,
    height: 1200,
    takenAt: '2026-09-14T14:22:00-03:00',
    location: 'Ouro Preto, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 3_150_000,
    fileName: 'IMG_3941.HEIC',
    tags: ['cidade', 'rua', 'viagem', 'história'],
  },
  {
    id: 'm17',
    type: 'photo',
    src: foto('bicicleta'),
    alt: 'Bicicleta encostada em um muro com flores',
    width: 1200,
    height: 900,
    takenAt: '2026-09-14T10:05:00-03:00',
    location: 'Ouro Preto, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_540_000,
    fileName: 'IMG_3930.HEIC',
    tags: ['bicicleta', 'flores', 'rua'],
  },

  /* ---------------------------------------------------------- 2 de setembro */
  {
    id: 'm18',
    type: 'photo',
    src: foto('cachorro-parque'),
    alt: 'Cachorro correndo na grama do parque',
    width: 900,
    height: 1200,
    takenAt: '2026-09-02T16:40:00-03:00',
    location: 'Parque Municipal, Belo Horizonte',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_610_000,
    fileName: 'IMG_3820.HEIC',
    favorite: true,
    albumIds: ['familia'],
    tags: ['cachorro', 'animais', 'parque'],
    subtypes: ['burst'],
  },
  {
    id: 'm19',
    type: 'photo',
    src: foto('flores-jardim'),
    alt: 'Canteiro de flores no jardim',
    width: 1080,
    height: 1080,
    takenAt: '2026-09-02T09:15:00-03:00',
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_230_000,
    fileName: 'IMG_3812.HEIC',
    tags: ['flores', 'jardim', 'natureza'],
  },

  /* ---------------------------------------------------------------- Agosto */
  {
    id: 'm20',
    type: 'photo',
    src: foto('ponte-rio'),
    alt: 'Ponte sobre o rio ao entardecer',
    width: 1600,
    height: 900,
    takenAt: '2026-08-16T17:55:00-03:00',
    location: 'Florianópolis, SC',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 3_480_000,
    fileName: 'IMG_3601.HEIC',
    tags: ['ponte', 'rio', 'cidade', 'viagem'],
  },
  {
    id: 'm21',
    type: 'photo',
    src: foto('aviao-janela'),
    alt: 'Asa do avião vista da janela, acima das nuvens',
    width: 900,
    height: 1200,
    takenAt: '2026-08-15T06:30:00-03:00',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 1_870_000,
    fileName: 'IMG_3590.HEIC',
    tags: ['avião', 'nuvens', 'viagem'],
  },
  {
    id: 'm22',
    type: 'photo',
    src: foto('montanhas-lago'),
    alt: 'Montanhas refletidas em um lago',
    width: 1200,
    height: 900,
    takenAt: '2026-08-03T07:12:00-03:00',
    location: 'Campos do Jordão, SP',
    camera: CAMERA_ULTRA,
    sizeBytes: 3_720_000,
    fileName: 'IMG_3502.HEIC',
    favorite: true,
    tags: ['montanha', 'lago', 'paisagem'],
  },

  /* ---------------------------------------------------------------- 2025 */
  {
    id: 'm23',
    type: 'photo',
    src: foto('ceu-estrelado'),
    alt: 'Céu estrelado sobre uma barraca de acampamento',
    width: 900,
    height: 1200,
    takenAt: '2025-12-30T23:40:00-03:00',
    location: 'Serra da Canastra, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 4_100_000,
    fileName: 'IMG_2044.HEIC',
    tags: ['estrelas', 'noite', 'acampamento', 'natureza'],
  },
  {
    id: 'm24',
    type: 'photo',
    src: foto('prato-comida'),
    alt: 'Prato de arroz, feijão e salada',
    width: 1080,
    height: 1080,
    takenAt: '2025-12-24T20:15:00-03:00',
    location: 'Belo Horizonte, MG',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 2_050_000,
    fileName: 'IMG_2010.HEIC',
    albumIds: ['receitas'],
    tags: ['comida', 'almoço'],
  },
  {
    id: 'm25',
    type: 'photo',
    src: foto('carro-estrada'),
    alt: 'Carro na estrada que corta o campo',
    width: 1600,
    height: 900,
    takenAt: '2025-12-20T15:30:00-03:00',
    location: 'Rodovia BR-040',
    camera: CAMERA_TRASEIRA,
    sizeBytes: 3_060_000,
    fileName: 'IMG_1988.HEIC',
    tags: ['carro', 'estrada', 'viagem'],
  },
];

/**
 * Itens em Excluídos recentemente. O primeiro vence amanhã (aviso de prazo
 * curto); o segundo tem 25 dias pela frente.
 */
export const uglTrashItems: UglMediaItem[] = [
  {
    id: 't01',
    type: 'photo',
    src: foto('captura-conversa'),
    alt: 'Captura de tela de uma conversa sobre o trabalho em grupo',
    width: 780,
    height: 1688,
    takenAt: '2026-08-31T21:10:00-03:00',
    sizeBytes: 520_000,
    fileName: 'Captura de tela 2026-08-31.png',
    subtypes: ['screenshot'],
    deletedAt: '2026-09-01T09:00:00-03:00',
  },
  {
    id: 't02',
    type: 'photo',
    src: foto('cafe-manha'),
    alt: 'Xícara de café, foto repetida e tremida',
    width: 1080,
    height: 1080,
    takenAt: '2026-09-24T08:11:00-03:00',
    sizeBytes: 2_380_000,
    fileName: 'IMG_4030.HEIC',
    deletedAt: '2026-09-25T12:00:00-03:00',
  },
];

/**
 * Itens ocultos: fora da biblioteca, só no álbum protegido.
 */
export const uglHiddenItems: UglMediaItem[] = [
  {
    id: 'h01',
    type: 'photo',
    src: foto('retrato-ana'),
    alt: 'Retrato de Ana sorrindo com fundo lilás',
    width: 900,
    height: 1200,
    takenAt: '2026-09-10T15:00:00-03:00',
    camera: CAMERA_FRONTAL,
    sizeBytes: 1_760_000,
    fileName: 'IMG_3900.HEIC',
    people: ['ana'],
    hidden: true,
  },
];

/** Biblioteca inteira, com lixeira e ocultos — o que o `GalleryApp` recebe. */
export const uglAllItems: UglMediaItem[] = [...uglMediaItems, ...uglTrashItems, ...uglHiddenItems];

/** Só as fotos da biblioteca. */
export const uglPhotos = uglMediaItems.filter((item) => item.type === 'photo');

/** Só os vídeos da biblioteca. */
export const uglVideos = uglMediaItems.filter((item) => item.type === 'video');

/** Procura um item de demonstração pelo id (em qualquer lista). */
export const uglItemById = (id: string) => uglAllItems.find((item) => item.id === id)!;

const countOf = (albumId: string) =>
  uglMediaItems.filter((item) => item.albumIds?.includes(albumId)).length;

const coverOf = (albumId: string) => uglMediaItems.find((item) => item.albumIds?.includes(albumId));

const album = (id: string, title: string, kind: UglAlbum['kind'] = 'user'): UglAlbum => ({
  id,
  title,
  kind,
  count: countOf(id),
  coverSrc: coverOf(id)?.src,
  coverAlt: coverOf(id)?.alt,
});

/**
 * Álbuns criados pela pessoa, o compartilhado da turma e um vazio.
 */
export const uglAlbums: UglAlbum[] = [
  album('chapada', 'Viagem à Chapada'),
  album('familia', 'Família'),
  album('receitas', 'Receitas'),
  album('escola', 'Escola'),
  album('turma-7b', 'Turma 7B', 'shared'),
  { id: 'feira', title: 'Feira de ciências', kind: 'user', count: 0 },
];

/**
 * Álbuns gerados pela galeria (Recentes e Favoritos).
 */
export const uglSmartAlbums: UglAlbum[] = [
  {
    id: 'recentes',
    title: 'Recentes',
    kind: 'smart',
    count: uglMediaItems.length,
    coverSrc: uglMediaItems[0].src,
    coverAlt: uglMediaItems[0].alt,
  },
  {
    id: 'favoritos',
    title: 'Favoritos',
    kind: 'smart',
    count: uglMediaItems.filter((item) => item.favorite).length,
    coverSrc: uglMediaItems.find((item) => item.favorite)?.src,
    coverAlt: uglMediaItems.find((item) => item.favorite)?.alt,
  },
];

/**
 * Sugestões da busca: categorias de conteúdo.
 */
export const uglSearchCategories = [
  { id: 'animais', label: 'Animais', icon: 'pets' as const, query: 'animais' },
  { id: 'comida', label: 'Comida', icon: 'food' as const, query: 'comida' },
  { id: 'paisagem', label: 'Paisagens', icon: 'landscape' as const, query: 'paisagem' },
  { id: 'cidade', label: 'Cidades', icon: 'city' as const, query: 'cidade' },
  { id: 'natureza', label: 'Natureza', icon: 'nature' as const, query: 'natureza' },
  { id: 'viagem', label: 'Viagens', icon: 'travel' as const, query: 'viagem' },
  { id: 'aniversario', label: 'Aniversários', icon: 'birthday' as const, query: 'aniversário' },
  { id: 'documento', label: 'Documentos', icon: 'document' as const, query: 'documento' },
];

/** Lugares mais frequentes da biblioteca, para a busca. */
export const uglSearchPlaces = [
  'Chapada dos Veadeiros, GO',
  'Praia do Forte, BA',
  'Ouro Preto, MG',
  'Belo Horizonte, MG',
];
