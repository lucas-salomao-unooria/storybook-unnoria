'use client';

/**
 * Tokens de Cores do Design System WhatsApp Mobile.
 *
 * Espelho TypeScript de `colors.css`. Os valores foram extraídos do arquivo
 * Figma "WhatsApp Clone - Dark mode (Community) - cópia"
 * (fileKey `MSEV2CgXr84WwOyMauIBy2`, página `0:1`), que define exclusivamente
 * o tema escuro.
 */

/**
 * Temas suportados pelo módulo. O arquivo de origem publica apenas `dark`.
 */
export type WaTheme = 'dark';

/**
 * Descrição de um token de cor com rastreabilidade até o Figma.
 */
export interface WaColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor hexadecimal ou funcional */
  value: string;
  /** Uso original no arquivo de design */
  usage: string;
  /** Node do Figma em que o valor foi lido */
  figmaNode?: string;
}

/**
 * Superfícies do produto.
 */
export const waSurfaceColors: Record<string, WaColorToken> = {
  base: {
    cssVar: '--wa-color-surface-base',
    value: '#090E12',
    usage: 'Base do documento nas telas Settings e Starred messages',
    figmaNode: '1:2691',
  },
  canvas: {
    cssVar: '--wa-color-surface-canvas',
    value: '#101D25',
    usage: 'Fundo das telas de listagem (Chats, Status, Calls, Settings)',
    figmaNode: '1:2024',
  },
  appbar: {
    cssVar: '--wa-color-surface-appbar',
    value: '#232D36',
    usage: 'Barra superior, sub app bar e campo de busca',
    figmaNode: '1:2136',
  },
  elevated: {
    cssVar: '--wa-color-surface-elevated',
    value: '#313C42',
    usage: 'Menu suspenso e FAB secundário de status',
    figmaNode: '1:2173',
  },
  dialog: {
    cssVar: '--wa-color-surface-dialog',
    value: '#364147',
    usage: 'Caixa de diálogo modal',
    figmaNode: '1:3504',
  },
  sheet: {
    cssVar: '--wa-color-surface-sheet',
    value: '#2D383E',
    usage: 'Folha de anexos, campo do compositor e chips de filtro',
    figmaNode: '1:3021',
  },
  dateChip: {
    cssVar: '--wa-color-surface-datechip',
    value: '#202B31',
    usage: 'Etiqueta de data da conversa',
    figmaNode: '1:3011',
  },
  notice: {
    cssVar: '--wa-color-surface-notice',
    value: '#1E2A31',
    usage: 'Aviso de criptografia ponta a ponta',
    figmaNode: '1:3014',
  },
  bubbleOut: {
    cssVar: '--wa-color-surface-bubble-out',
    value: '#054640',
    usage: 'Balão de mensagem enviada',
    figmaNode: '1:2931',
  },
  bubbleOutStrip: {
    cssVar: '--wa-color-surface-bubble-out-strip',
    value: '#043D36',
    usage: 'Faixa de documento dentro do balão enviado',
    figmaNode: '1:2933',
  },
  bubbleIn: {
    cssVar: '--wa-color-surface-bubble-in',
    value: '#232D36',
    usage: 'Balão de mensagem recebida (desvio: o arquivo não publica o frame)',
  },
  scrim: {
    cssVar: '--wa-color-scrim',
    value: 'rgba(0, 0, 0, 0.6)',
    usage: 'Véu atrás de diálogos modais',
    figmaNode: '1:3503',
  },
};

/**
 * Família de verde-água da marca. O arquivo comunitário usa onze verdes
 * ligeiramente distintos; todos são preservados como tokens nomeados.
 */
export const waAccentColors: Record<string, WaColorToken> = {
  accent: {
    cssVar: '--wa-color-accent',
    value: '#0CA996',
    usage: 'Aba ativa e selo de não lidas da barra principal',
    figmaNode: '1:2140',
  },
  accentStatus: {
    cssVar: '--wa-color-accent-status',
    value: '#189C87',
    usage: 'Rótulo da aba STATUS ativa',
    figmaNode: '1:151',
  },
  fab: {
    cssVar: '--wa-color-accent-fab',
    value: '#00B09C',
    usage: 'FAB de câmera (Status) e FAB de nova chamada',
    figmaNode: '1:165',
  },
  fabChat: {
    cssVar: '--wa-color-accent-fab-chat',
    value: '#04AD9C',
    usage: 'FAB de nova conversa',
    figmaNode: '1:2128',
  },
  fabMic: {
    cssVar: '--wa-color-accent-fab-mic',
    value: '#02AF9C',
    usage: 'FAB de microfone do compositor',
    figmaNode: '1:3031',
  },
  iconCall: {
    cssVar: '--wa-color-accent-icon-call',
    value: '#02AD9B',
    usage: 'Ícone de telefone nas linhas de chamada',
    figmaNode: '1:407',
  },
  iconVideo: {
    cssVar: '--wa-color-accent-icon-video',
    value: '#00B29C',
    usage: 'Ícone de vídeo nas linhas de chamada',
    figmaNode: '1:405',
  },
  control: {
    cssVar: '--wa-color-accent-control',
    value: '#05AD9C',
    usage: 'Radio selecionado do diálogo',
    figmaNode: '1:3510',
  },
  action: {
    cssVar: '--wa-color-accent-action',
    value: '#25AC9D',
    usage: 'Botões de texto do diálogo (CANCEL / OK)',
    figmaNode: '1:3516',
  },
  badge: {
    cssVar: '--wa-color-accent-badge',
    value: '#01A590',
    usage: 'Selo de não lidas na busca em conversas',
    figmaNode: '1:1916',
  },
  underline: {
    cssVar: '--wa-color-accent-underline',
    value: '#20A497',
    usage: 'Sublinhado do campo do compositor',
    figmaNode: '1:3022',
  },
  callOut: {
    cssVar: '--wa-color-accent-call-out',
    value: '#17B49F',
    usage: 'Seta de chamada efetuada',
    figmaNode: '1:504',
  },
};

/**
 * Severidades, estados e superfícies verdes da tela de chamada.
 */
export const waStatusColors: Record<string, WaColorToken> = {
  callIn: {
    cssVar: '--wa-color-danger-call-in',
    value: '#DF788B',
    usage: 'Seta de chamada recebida ou perdida',
    figmaNode: '1:504',
  },
  endCall: {
    cssVar: '--wa-color-danger-endcall',
    value: '#E91C43',
    usage: 'Botão de encerrar chamada',
    figmaNode: '1:4631',
  },
  battery: {
    cssVar: '--wa-color-warning-battery',
    value: '#FDD015',
    usage: 'Nível de bateria na barra de status',
    figmaNode: '1:2155',
  },
  callStatusBar: {
    cssVar: '--wa-color-call-statusbar',
    value: '#04453D',
    usage: 'Barra de status durante a chamada',
    figmaNode: '1:4596',
  },
  callSurface: {
    cssVar: '--wa-color-call-surface',
    value: '#054C44',
    usage: 'Cabeçalho e barra de controles da chamada',
    figmaNode: '1:4597',
  },
  callEncrypted: {
    cssVar: '--wa-color-call-text-encrypted',
    value: '#8DB5B4',
    usage: 'Aviso "End-to-end encrypted" da chamada',
    figmaNode: '1:4622',
  },
  callIcon: {
    cssVar: '--wa-color-call-icon',
    value: '#B8C8C7',
    usage: 'Ícones de alto-falante e microfone da chamada',
    figmaNode: '1:4627',
  },
  callIconMuted: {
    cssVar: '--wa-color-call-icon-muted',
    value: '#4B7F7B',
    usage: 'Ícone de vídeo desabilitado na chamada',
    figmaNode: '1:4629',
  },
};

/**
 * Cores de texto.
 */
export const waTextColors: Record<string, WaColorToken> = {
  primary: { cssVar: '--wa-color-text-primary', value: '#D3DAE0', usage: 'Nome de contato (21px)' },
  primaryAlt: {
    cssVar: '--wa-color-text-primary-alt',
    value: '#D4DCDF',
    usage: 'Nome de contato compacto (18,54px)',
  },
  title: { cssVar: '--wa-color-text-title', value: '#CFD6DC', usage: 'Título de sub app bar' },
  appbar: { cssVar: '--wa-color-text-appbar', value: '#9DA5AC', usage: 'Marca e abas inativas' },
  secondary: {
    cssVar: '--wa-color-text-secondary',
    value: '#868F94',
    usage: 'Horário das conversas',
  },
  meta: { cssVar: '--wa-color-text-meta', value: '#98A3A9', usage: 'Metadados de chamada' },
  metaAlt: {
    cssVar: '--wa-color-text-meta-alt',
    value: '#889397',
    usage: 'Metadados de atualização de status',
  },
  statusViewed: {
    cssVar: '--wa-color-text-status-viewed',
    value: '#DCDDE2',
    usage: 'Nome de status já visualizado',
  },
  statusOwn: {
    cssVar: '--wa-color-text-status-own',
    value: '#E3E8EE',
    usage: 'Título "My status"',
  },
  settings: {
    cssVar: '--wa-color-text-settings',
    value: '#C5CED3',
    usage: 'Título de linha de configuração',
  },
  settingsSub: {
    cssVar: '--wa-color-text-settings-sub',
    value: '#8A9295',
    usage: 'Descrição de linha de configuração',
  },
  profileStatus: {
    cssVar: '--wa-color-text-profile-status',
    value: '#939CA1',
    usage: 'Recado do perfil',
  },
  dialogTitle: {
    cssVar: '--wa-color-text-dialog-title',
    value: '#D7E0E5',
    usage: 'Título do diálogo',
  },
  dialogOption: {
    cssVar: '--wa-color-text-dialog-option',
    value: '#FBFEFF',
    usage: 'Opções do diálogo',
  },
  dialogCheck: {
    cssVar: '--wa-color-text-dialog-check',
    value: '#F9FFFF',
    usage: 'Rótulo de caixa de seleção',
  },
  menu: {
    cssVar: '--wa-color-text-menu',
    value: '#F9FFFF',
    usage: 'Item do menu suspenso',
    figmaNode: '1:2279',
  },
  placeholder: {
    cssVar: '--wa-color-text-placeholder',
    value: '#707980',
    usage: 'Placeholder do compositor',
  },
  dateChip: {
    cssVar: '--wa-color-text-datechip',
    value: '#9CA7AD',
    usage: 'Etiqueta de data da conversa',
  },
  notice: {
    cssVar: '--wa-color-text-notice',
    value: '#C7BE8A',
    usage: 'Aviso de criptografia',
  },
  bubble: { cssVar: '--wa-color-text-bubble', value: '#C3DDDC', usage: 'Texto do balão' },
  bubbleMeta: {
    cssVar: '--wa-color-text-bubble-meta',
    value: '#80B3AE',
    usage: 'Metadados do balão',
  },
  starred: { cssVar: '--wa-color-text-starred', value: '#D6DADD', usage: 'Nome em favoritas' },
  starredDate: {
    cssVar: '--wa-color-text-starred-date',
    value: '#8D9296',
    usage: 'Data em favoritas',
  },
  footnote: { cssVar: '--wa-color-text-footnote', value: '#899297', usage: 'Rodapé "from"' },
  brand: { cssVar: '--wa-color-text-brand', value: '#BBC4C9', usage: 'Assinatura FACEBOOK' },
  onAccent: {
    cssVar: '--wa-color-text-on-accent',
    value: '#232D36',
    usage: 'Numeral sobre o selo verde-água',
  },
  inverse: {
    cssVar: '--wa-color-text-inverse',
    value: '#F3FFFF',
    usage: 'Nome do contato na chamada',
  },
};

/**
 * Cores de ícones.
 */
export const waIconColors: Record<string, WaColorToken> = {
  appbar: { cssVar: '--wa-color-icon-appbar', value: '#FAFFFF', usage: 'Busca e menu' },
  camera: { cssVar: '--wa-color-icon-camera', value: '#9DA5AC', usage: 'Câmera da barra de abas' },
  back: { cssVar: '--wa-color-icon-back', value: '#9FA8B1', usage: 'Seta de voltar' },
  composerEmoji: {
    cssVar: '--wa-color-icon-composer-emoji',
    value: '#A6ABAF',
    usage: 'Emoji do compositor',
  },
  composerAttach: {
    cssVar: '--wa-color-icon-composer-attach',
    value: '#A7ACB0',
    usage: 'Clipe de anexo',
  },
  composerCamera: {
    cssVar: '--wa-color-icon-composer-camera',
    value: '#9FA5A9',
    usage: 'Câmera do compositor',
  },
  onAccent: {
    cssVar: '--wa-color-icon-on-accent',
    value: '#FFFFFD',
    usage: 'Glifos sobre FAB verde-água',
  },
  settings: { cssVar: '--wa-color-icon-settings', value: '#979CA2', usage: 'Ícones de ajustes' },
  settingsAlt: {
    cssVar: '--wa-color-icon-settings-alt',
    value: '#9CA4A7',
    usage: 'Ícone de conta',
  },
  settingsHelp: {
    cssVar: '--wa-color-icon-settings-help',
    value: '#95A0A6',
    usage: 'Ícone de ajuda',
  },
  settingsQr: { cssVar: '--wa-color-icon-settings-qr', value: '#DEE2E5', usage: 'QR Code' },
  tick: { cssVar: '--wa-color-icon-tick', value: '#82B4B3', usage: 'Confirmação de leitura' },
  star: { cssVar: '--wa-color-icon-star', value: '#5B8583', usage: 'Estrela de favorita' },
  forward: { cssVar: '--wa-color-icon-forward', value: '#DADBDD', usage: 'Encaminhar' },
  pin: { cssVar: '--wa-color-icon-pin', value: '#8F969E', usage: 'Conversa fixada' },
  statusBar: {
    cssVar: '--wa-color-statusbar-fg',
    value: '#B5B5B5',
    usage: 'Glifos da barra de status',
  },
};

/**
 * Bordas, divisores e anéis.
 */
export const waBorderColors: Record<string, WaColorToken> = {
  divider: {
    cssVar: '--wa-color-border-divider',
    value: '#18252D',
    usage: 'Divisor entre linhas de lista',
    figmaNode: '1:2027',
  },
  dialog: {
    cssVar: '--wa-color-border-dialog',
    value: '#4D585E',
    usage: 'Divisor interno do diálogo',
    figmaNode: '1:3506',
  },
  control: {
    cssVar: '--wa-color-border-control',
    value: '#A5B0B6',
    usage: 'Contorno de caixa de seleção',
    figmaNode: '1:3515',
  },
  statusRing: {
    cssVar: '--wa-color-border-status-ring',
    value: '#C4C4C4',
    usage: 'Anel do avatar de status',
    figmaNode: '1:33',
  },
};

/**
 * Cores das ações da folha de anexos.
 */
export const waAttachmentColors: Record<string, WaColorToken> = {
  document: {
    cssVar: '--wa-color-attach-document',
    value: '#5F66CE',
    usage: 'Ação Document',
    figmaNode: '1:3943',
  },
  camera: {
    cssVar: '--wa-color-attach-camera',
    value: '#EC407A',
    usage: 'Ação Camera',
    figmaNode: '1:3943',
  },
  gallery: {
    cssVar: '--wa-color-attach-gallery',
    value: '#BF57CF',
    usage: 'Ação Gallery',
    figmaNode: '1:3943',
  },
  audio: {
    cssVar: '--wa-color-attach-audio',
    value: '#F78D0D',
    usage: 'Ação Audio',
    figmaNode: '1:3943',
  },
  location: {
    cssVar: '--wa-color-attach-location',
    value: '#019D54',
    usage: 'Ação Location',
    figmaNode: '1:3943',
  },
  contact: {
    cssVar: '--wa-color-attach-contact',
    value: '#0EAAF4',
    usage: 'Ação Contact',
    figmaNode: '1:3943',
  },
};

/**
 * Objeto consolidado com todos os grupos de cor do WhatsApp Mobile.
 */
export const waColorTokens = {
  surface: waSurfaceColors,
  accent: waAccentColors,
  status: waStatusColors,
  text: waTextColors,
  icon: waIconColors,
  border: waBorderColors,
  attachment: waAttachmentColors,
};

export default waColorTokens;
