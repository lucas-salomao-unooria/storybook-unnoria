/**
 * Registro de glifos do Design System Unoochat.
 *
 * A biblioteca é a da Plataforma Unooria: **Material Symbols Rounded**, peso
 * 300, sem preenchimento, grade normal — a mesma do quadro de ícones da
 * plataforma (`src/unooria`). Nada é desenhado à mão: cada entrada aponta para
 * o nome da ligadura da fonte (`ligature`), e o vocabulário do módulo é o
 * subconjunto do quadro que a mensageria usa.
 *
 * A fonte é **de ligadura**: sem `fonts/unoochat.css` (ou o Material Symbols
 * carregado pelo consumidor), o texto da ligadura aparece no lugar do glifo.
 *
 * O quadro de ícones da plataforma não publica `star`, `videocam`, `forward`,
 * `push_pin` nem `radio_button_*`. Os equivalentes que ele publica entram no
 * lugar:
 * `star_rate`, `video_call`, `reply` espelhado, `keep`, e o controle de rádio
 * é desenhado em CSS pelo componente `Radio`.
 */

/**
 * Definição de um glifo do registro.
 */
export interface UncIconDefinition {
  /** Nome da ligadura no Material Symbols Rounded */
  ligature: string;
  /** Usa o eixo `FILL` = 1 (glifo preenchido) */
  filled?: boolean;
  /** Espelha o glifo no eixo horizontal (ex.: `forward`, que é `reply` espelhado) */
  flipX?: boolean;
  /** Uso do glifo no produto */
  usage: string;
}

export const uncIcons = {
  camera: { ligature: 'photo_camera', usage: 'Atalho de câmera da barra de abas' },
  cameraFilled: { ligature: 'photo_camera', filled: true, usage: 'FAB de câmera do Status' },
  search: { ligature: 'search', usage: 'Busca da barra superior' },
  overflow: {
    ligature: 'more_horiz',
    usage: 'Menu de opções — horizontal; girado a 90° vira o menu vertical da barra superior',
  },
  back: { ligature: 'arrow_back', usage: 'Voltar' },
  videoCall: { ligature: 'video_call', usage: 'Chamada de vídeo' },
  videoCallLarge: { ligature: 'video_call', usage: 'Chamada de vídeo nos controles da chamada' },
  phone: { ligature: 'call', usage: 'Chamada de voz' },
  phoneFilled: { ligature: 'call', filled: true, usage: 'Chamada de voz preenchida' },
  phoneAdd: { ligature: 'add_call', usage: 'FAB de nova chamada' },
  callEnd: { ligature: 'call_end', usage: 'Botão de encerrar chamada' },
  lock: { ligature: 'lock', usage: 'Cadeado dos avisos de criptografia' },
  lockAlt: { ligature: 'lock', usage: 'Cadeado da tela de chamada' },
  emoji: { ligature: 'mood', usage: 'Emoji do compositor' },
  attach: { ligature: 'attach_file', usage: 'Anexo do compositor' },
  composerCamera: { ligature: 'photo_camera', usage: 'Câmera do compositor' },
  mic: { ligature: 'mic', usage: 'Microfone do compositor e da chamada' },
  soundUp: { ligature: 'volume_up', usage: 'Alto-falante da chamada' },
  newChat: { ligature: 'add_comment', usage: 'FAB de nova conversa' },
  pencil: { ligature: 'edit', usage: 'Editar status e rascunho' },
  callOut: { ligature: 'call_made', usage: 'Chamada efetuada' },
  callIn: { ligature: 'call_received', usage: 'Chamada recebida ou perdida' },
  tick: { ligature: 'check', usage: 'Confirmação simples (entregue, caixa marcada, opção votada)' },
  tickDouble: { ligature: 'done_all', usage: 'Confirmação de leitura no balão' },
  star: { ligature: 'star_rate', filled: true, usage: 'Mensagem favoritada' },
  filePdf: { ligature: 'picture_as_pdf', usage: 'Documento PDF' },
  forward: { ligature: 'reply', flipX: true, usage: 'Encaminhar' },
  pin: { ligature: 'keep', usage: 'Conversa fixada' },
  document: { ligature: 'description', usage: 'Ação de documento da folha de anexos' },
  gallery: { ligature: 'image', usage: 'Ação de galeria da folha de anexos' },
  audio: { ligature: 'headphones', usage: 'Ação de áudio da folha de anexos' },
  location: { ligature: 'location_on', usage: 'Ação de localização da folha de anexos' },
  contact: { ligature: 'person', usage: 'Ação de contato da folha de anexos' },
  poll: { ligature: 'ballot', usage: 'Ação de enquete' },
  settingsAccount: { ligature: 'key', usage: 'Configurações — conta' },
  settingsChats: { ligature: 'chat', usage: 'Configurações — conversas' },
  settingsNotifications: { ligature: 'notifications', usage: 'Configurações — notificações' },
  settingsStorage: { ligature: 'data_usage', usage: 'Configurações — armazenamento e dados' },
  settingsHelp: { ligature: 'help', usage: 'Configurações — ajuda' },
  settingsInvite: { ligature: 'group_add', usage: 'Configurações — convidar amigos' },
  qrCode: { ligature: 'qr_code_2', usage: 'Código QR do perfil' },
  sbAlert: { ligature: 'error', usage: 'Alerta na barra de status' },
  sbSilent: { ligature: 'notifications_off', usage: 'Silenciado (barra de status e conversa)' },
  sbAndroid: { ligature: 'android', usage: 'Indicador do sistema na barra de status' },
} as const satisfies Record<string, UncIconDefinition>;

/**
 * Nome de um glifo do registro.
 */
export type UncIconName = keyof typeof uncIcons;

/**
 * Lista dos nomes de glifo, na ordem do registro.
 */
export const uncIconNames = Object.keys(uncIcons) as UncIconName[];
