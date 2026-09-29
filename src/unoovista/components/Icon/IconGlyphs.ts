/**
 * Registro de glifos do Design System Unoovista.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (`src/unooria`, quadro `6024:2923`). Nada é desenhado à mão: cada
 * entrada aponta para o nome da ligadura da fonte (`ligature`), e todo nome
 * usado aqui existe no quadro.
 *
 * A fonte é **de ligadura**: sem `fonts/unoovista.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 *
 * Nomes de terceiros não entram: o vocabulário do módulo descreve a função
 * (`longVideo`, `qrCode`, `external`), não o produto que a inspirou.
 */

/**
 * Definição de um glifo do registro.
 */
export interface UnvIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const unvIcons = {
  home: { ligature: 'home', usage: 'Aba Início da doca de navegação.' },
  search: { ligature: 'search', usage: 'Aba Explorar da doca de navegação.' },
  searchFilled: { ligature: 'search', filled: true, usage: 'Aba Explorar em estado ativo.' },
  searchSmall: { ligature: 'search', usage: 'Lupa dentro do campo de busca (SearchField).' },
  add: { ligature: 'add_box', usage: 'Ação central de criar publicação.' },
  heart: { ligature: 'favorite', usage: 'Curtir uma publicação (estado padrão) e aba Atividade.' },
  heartFilled: {
    ligature: 'favorite',
    filled: true,
    usage: 'Publicação curtida e aba Atividade em estado ativo.',
  },
  camera: { ligature: 'photo_camera', usage: 'Abrir a câmera a partir da barra superior.' },
  cameraCircle: { ligature: 'add_a_photo', usage: 'Atalho de câmera dentro do compositor de story.' },
  longVideo: { ligature: 'theaters', usage: 'Acesso aos vídeos longos na barra superior.' },
  share: { ligature: 'share', usage: 'Compartilhar publicação.' },
  comment: { ligature: 'mode_comment', usage: 'Abrir a lista de comentários da publicação.' },
  bookmark: { ligature: 'bookmark', usage: 'Salvar publicação e item "Salvos" do menu de perfil.' },
  bookmarkFilled: {
    ligature: 'bookmark',
    filled: true,
    usage: 'Publicação salva (estado ativo do botão Salvar).',
  },
  more: { ligature: 'more_horiz', usage: 'Menu de opções da publicação e do story.' },
  verified: {
    ligature: 'verified',
    filled: true,
    usage: 'Selo de conta oficial ao lado do nome de usuário.',
  },
  back: { ligature: 'arrow_back', usage: 'Voltar para a tela anterior.' },
  close: { ligature: 'close', usage: 'Fechar visualizador de story ou transmissão ao vivo.' },
  chevronDown: { ligature: 'keyboard_arrow_down', usage: 'Alternar entre contas conectadas e alça da folha inferior.' },
  menu: { ligature: 'menu', usage: 'Abrir o menu lateral do perfil.' },
  lock: { ligature: 'lock', usage: 'Indicador de conta privada ao lado do nome.' },
  addChat: { ligature: 'add_comment', usage: 'Iniciar uma nova conversa na caixa de mensagens.' },
  plus: { ligature: 'add', usage: 'Criar um novo destaque no perfil.' },
  grid: { ligature: 'grid_view', usage: 'Aba de grade de publicações do perfil.' },
  tagged: { ligature: 'person_pin', usage: 'Aba de publicações em que o usuário foi marcado.' },
  video: { ligature: 'movie', usage: 'Indicador de publicação em vídeo na grade do perfil.' },
  archive: { ligature: 'archive', usage: 'Item "Arquivo" do menu lateral do perfil.' },
  activity: { ligature: 'history', usage: 'Item "Sua atividade" do menu lateral do perfil.' },
  qrCode: { ligature: 'qr_code_2', usage: 'Item "Meu código" do menu lateral do perfil.' },
  closeFriends: { ligature: 'stars', filled: true, usage: 'Item "Amigos próximos" do menu lateral do perfil.' },
  discover: { ligature: 'person_add', usage: 'Item "Descobrir pessoas" do menu lateral do perfil.' },
  external: { ligature: 'open_in_new', usage: 'Item que abre um serviço externo e login social.' },
  check: { ligature: 'check', usage: 'Confirmação simples (opção votada, item marcado).' },
  info: { ligature: 'info', usage: 'Faixa de dica em tom neutro (InlineHint).' },
  warning: { ligature: 'warning', usage: 'Faixa de dica em tom de atrito (InlineHint).' },
  error: { ligature: 'error', usage: 'Indicador de erro em campos de formulário.' },
  settings: { ligature: 'settings', usage: 'Item "Configurações" no rodapé do menu lateral.' },
  signalCellular: {
    ligature: 'signal_cellular_4_bar',
    usage: 'Intensidade do sinal móvel na barra de status do PhoneFrame (cromo de sistema).',
  },
  wifi: {
    ligature: 'signal_wifi_4_bar',
    usage: 'Conexão sem fio na barra de status do PhoneFrame (cromo de sistema).',
  },
  battery: {
    ligature: 'battery_full',
    usage: 'Nível de bateria na barra de status do PhoneFrame (cromo de sistema).',
  },
} as const satisfies Record<string, UnvIconDefinition>;

/**
 * Nomes de todos os glifos disponíveis.
 */
export type UnvIconName = keyof typeof unvIcons;

/**
 * Lista dos nomes, na ordem do registro.
 */
export const unvIconNames = Object.keys(unvIcons) as UnvIconName[];
