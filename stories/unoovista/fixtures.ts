/**
 * Conteúdo de demonstração das estórias do Unoovista.
 *
 * Tudo aqui é fictício e autocontido: os nomes de usuário são inventados e as
 * imagens são ilustrações SVG originais de `public/unoovista/`, desenhadas com a
 * paleta da Plataforma Unooria. Nenhuma estória depende de rede nem de
 * fotografias de terceiros. As imagens entram nos componentes por prop
 * (`src`, `avatarSrc`), nunca embutidas no pacote.
 */

const asset = (file: string) => `/unoovista/${file}.svg`;

/**
 * Avatares de demonstração. As chaves são identificadores estáveis das estórias;
 * o nome exibido de cada pessoa vem dos itens de demonstração abaixo.
 */
export const unvAvatars = {
  caioDev: asset("avatar-1"),
  marinaLuz: asset("avatar-2"),
  theoAndrade: asset("avatar-3"),
  daviNogueira: asset("avatar-4"),
  biaRaiz: asset("avatar-5"),
  lucasMar: asset("avatar-6"),
  rafaRondon: asset("avatar-7"),
  maxTavares: asset("avatar-8"),
  juliaReis: asset("avatar-9"),
  marianaSol: asset("avatar-10"),
  andreVale: asset("avatar-11"),
  paulaNeves: asset("avatar-12"),
};

/**
 * Ilustrações de publicações de demonstração (quadradas, 800 × 800).
 */
export const unvPhotos = {
  tokyo: asset("foto-noite"),
  mountains: asset("foto-montanhas"),
  desk: asset("foto-mesa"),
  turbines: asset("foto-turbinas"),
  road: asset("foto-estrada"),
  city: asset("foto-cidade"),
  coffee: asset("foto-cafe"),
  skate: asset("foto-skate"),
  forest: asset("foto-floresta"),
  street: asset("foto-rua"),
  portrait: asset("foto-retrato"),
  studio: asset("foto-estudio"),
};

/**
 * Quadros verticais (9:16) de demonstração para histórias e visualizador.
 */
export const unvStoryFrames = {
  aurora: asset("historia-1"),
  mar: asset("historia-2"),
  formas: asset("historia-3"),
};

/**
 * Itens de demonstração da bandeja de histórias do feed.
 */
export const unvStoryItems = [
  {
    id: "me",
    username: "Sua história",
    avatarSrc: unvAvatars.lucasMar,
    state: "unseen" as const,
  },
  {
    id: "marina.luz",
    username: "marina.luz",
    avatarSrc: unvAvatars.marinaLuz,
    state: "live" as const,
  },
  {
    id: "theo.andrade",
    username: "theo.andrade",
    avatarSrc: unvAvatars.theoAndrade,
    state: "unseen" as const,
  },
  {
    id: "davi.nogueira",
    username: "davi.nogueira",
    avatarSrc: unvAvatars.daviNogueira,
    state: "unseen" as const,
  },
  {
    id: "bia.raiz",
    username: "bia.raiz",
    avatarSrc: unvAvatars.biaRaiz,
    state: "unseen" as const,
  },
  {
    id: "rafa.rondon",
    username: "rafa.rondon",
    avatarSrc: unvAvatars.rafaRondon,
    state: "seen" as const,
  },
];

/**
 * Destaques do perfil de demonstração.
 */
export const unvHighlightItems = [
  { id: "new", username: "Novo", state: "add" as const },
  {
    id: "friends",
    username: "Amigos",
    avatarSrc: unvAvatars.biaRaiz,
    state: "seen" as const,
  },
  {
    id: "sport",
    username: "Esporte",
    avatarSrc: unvPhotos.skate,
    state: "seen" as const,
  },
  {
    id: "design",
    username: "Design",
    avatarSrc: unvPhotos.desk,
    state: "seen" as const,
  },
];

/**
 * Conversas de demonstração da caixa de mensagens.
 */
export const unvConversations = [
  {
    id: "caio_dev",
    username: "caio_dev",
    avatarSrc: unvAvatars.caioDev,
    message: "Tenha um ótimo dia, pessoal!",
    time: "agora",
    ring: "story" as const,
  },
  {
    id: "marina.luz",
    username: "marina.luz",
    avatarSrc: unvAvatars.marinaLuz,
    message: "Ouvi dizer que esse filme é bom, você...",
    time: "agora",
    ring: "none" as const,
  },
  {
    id: "rafa.rondon",
    username: "rafa.rondon",
    avatarSrc: unvAvatars.rafaRondon,
    message: "Nos vemos na próxima reunião!",
    time: "15 min",
    ring: "none" as const,
  },
  {
    id: "andre.vale",
    username: "andre.vale",
    avatarSrc: unvAvatars.andreVale,
    message: "Combinado, pode contar comigo!",
    time: "20 min",
    ring: "none" as const,
  },
  {
    id: "davi.nogueira",
    username: "davi.nogueira",
    avatarSrc: unvAvatars.daviNogueira,
    message: "O novo design ficou incrível, parab...",
    time: "1 min",
    ring: "none" as const,
  },
  {
    id: "max.tavares",
    username: "max.tavares",
    avatarSrc: unvAvatars.maxTavares,
    message: "Valeu, muito obrigado!",
    time: "2 h",
    ring: "none" as const,
  },
];

/**
 * Publicações de demonstração da grade do perfil.
 */
export const unvGridItems = [
  {
    id: "1",
    src: unvPhotos.forest,
    alt: "Floresta de pinheiros com raios de luz",
    type: "image" as const,
  },
  {
    id: "2",
    src: unvPhotos.mountains,
    alt: "Montanhas ao nascer do sol",
    type: "image" as const,
  },
  {
    id: "3",
    src: unvPhotos.turbines,
    alt: "Turbinas eólicas sobre colinas verdes",
    type: "image" as const,
  },
  {
    id: "4",
    src: unvPhotos.desk,
    alt: "Mesa de trabalho com laptop e caderno",
    type: "image" as const,
  },
  {
    id: "5",
    src: unvPhotos.skate,
    alt: "Manobra de skate no ar",
    type: "video" as const,
  },
  {
    id: "6",
    src: unvPhotos.studio,
    alt: "Estúdio fotográfico com câmera em tripé",
    type: "image" as const,
  },
  {
    id: "7",
    src: unvPhotos.city,
    alt: "Cidade ao entardecer",
    type: "image" as const,
  },
  {
    id: "8",
    src: unvPhotos.road,
    alt: "Estrada vazia ao pôr do sol",
    type: "image" as const,
  },
  {
    id: "9",
    src: unvPhotos.coffee,
    alt: "Café com desenho de coração e croissant",
    type: "image" as const,
  },
];

/**
 * Categorias de demonstração da tela de busca.
 */
export const unvSearchCategories = [
  "Para você",
  "Vídeos",
  "Viagem",
  "Arte",
  "Comida",
  "Música",
];

/*
 * ==========================================================================
 * Extensões
 * Conteúdo de demonstração da conversa aberta, da enquete, da seleção
 * múltipla e da história do grêmio.
 * ==========================================================================
 */

/**
 * A outra pessoa da conversa de demonstração.
 */
export const unvThreadContact = {
  username: "amara.gremio",
  avatarSrc: unvAvatars.marinaLuz,
  subtitle: "Ativa agora",
};

/**
 * Mensagens de demonstração da conversa aberta, já agrupadas em sequência.
 */
export const unvThreadMessages = [
  {
    id: "m1",
    direction: "incoming" as const,
    position: "first" as const,
    text: "Oi! Aqui é a Amara, do grêmio 👋",
  },
  {
    id: "m2",
    direction: "incoming" as const,
    position: "last" as const,
    text: "Vi que você montou as histórias da semana. Posso te fazer duas perguntas rápidas?",
  },
  {
    id: "m3",
    direction: "outgoing" as const,
    position: "first" as const,
    text: "Pode sim!",
  },
  {
    id: "m4",
    direction: "outgoing" as const,
    position: "last" as const,
    text: "Escolhi as três publicações agora há pouco.",
  },
];

/**
 * Opções de demonstração da enquete na conversa — nenhuma é "a certa".
 */
export const unvPollOptions = [
  { id: "foto", label: "A imagem era a mais bonita" },
  { id: "util", label: "A informação era útil para a turma" },
  { id: "curtidas", label: "Muita gente já tinha curtido" },
  { id: "confianca", label: "Eu confio em quem publicou" },
];

/**
 * Sequência de demonstração da figurinha de enquete (StoryPoll): uma pergunta
 * por segmento da história, sem gabarito — a figurinha devolve só o id.
 */
export const unvStoryPolls = [
  {
    id: "p1",
    question: "Como o app escolheu o que apareceu para você?",
    options: [
      { id: "a", label: "Pelo que eu curti antes" },
      { id: "b", label: "Por sorteio, a cada vez" },
      { id: "c", label: "Pelo horário em que abri" },
    ],
  },
  {
    id: "p2",
    question: "O que você faria para ver outros assuntos?",
    options: [
      { id: "a", label: "Buscar outros temas" },
      { id: "b", label: "Esperar o app mudar sozinho" },
    ],
  },
  {
    id: "p3",
    question: "Quem decide o que entra no seu feed?",
    options: [
      { id: "a", label: "Uma regra do app" },
      { id: "b", label: "A escola" },
      { id: "c", label: "Os colegas" },
      { id: "d", label: "Ninguém" },
    ],
  },
];

/**
 * Uma figurinha com alternativas LONGAS (quatro linhas na largura do celular):
 * é o caso que mostrou a curva do `radius-full` comendo o texto.
 */
export const unvStoryPollLonga = {
  question: "Como a sua curtida chegou até o servidor, longe da escola?",
  options: [
    { id: "a", label: "Viajou inteira, de uma vez só, direto do celular para o servidor, sem passar por nenhum equipamento." },
    { id: "b", label: "Foi dividida em pacotes numerados, que passaram por equipamentos diferentes e foram remontados no servidor." },
    { id: "c", label: "Ficou guardada só no celular, e o servidor adivinhou em qual projeto você votou." },
  ],
};

/**
 * Blocos de demonstração da seleção múltipla (quatro colunas, como na tela de
 * adicionar imagem).
 */
export const unvPickerItems = [
  ...unvGridItems,
  {
    id: "10",
    src: unvPhotos.street,
    alt: "Rua movimentada ao anoitecer",
    type: "image" as const,
  },
  {
    id: "11",
    src: unvPhotos.portrait,
    alt: "Retrato ilustrado de uma pessoa sorrindo",
    type: "image" as const,
  },
  {
    id: "12",
    src: unvPhotos.tokyo,
    alt: "Cidade à noite com prédios iluminados",
    type: "image" as const,
  },
];
