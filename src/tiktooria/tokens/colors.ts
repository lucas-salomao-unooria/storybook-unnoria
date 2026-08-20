/**
 * Tokens de Cores do Design System Tik Tooria.
 *
 * Espelho TypeScript de `colors.css`. Os valores foram extraídos do arquivo
 * Figma "TikTok UI Screens (Community) - cópia" (fileKey
 * `UIYCB87CQkpFwf1aWTBl1a`, página `4:171`). O arquivo publica quatro
 * variáveis de cor; todo o restante foi lido do preenchimento literal do nó
 * indicado em `figmaNode`.
 */

/**
 * Contextos de superfície publicados pelo arquivo.
 *
 * - `chrome`: telas de lista, perfil e configurações, sobre branco.
 * - `immersive`: feed de vídeo, câmera e leitor de QR, sobre preto.
 *
 * Não são dois temas do mesmo componente: são dois contextos distintos, ambos
 * literais no arquivo. Ver o registro de desvios na estória de Cores.
 */
export type TikSurface = 'chrome' | 'immersive';

/**
 * Descrição de um token de cor com rastreabilidade até o Figma.
 */
export interface TikColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor hexadecimal ou funcional */
  value: string;
  /** Uso original no arquivo de design */
  usage: string;
  /** Node do Figma em que o valor foi lido */
  figmaNode?: string;
  /** Nome da variável publicada no arquivo, quando houver */
  figmaVariable?: string;
}

/**
 * As quatro variáveis de cor publicadas pelo arquivo de design.
 */
export const tikBrandColors: Record<string, TikColorToken> = {
  button: {
    cssVar: '--tik-color-brand-button',
    value: '#EA4359',
    usage: 'Botão primário, coração da trilha de ações e anel de gravação',
    figmaNode: '4:622',
    figmaVariable: 'Tik Tok Button',
  },
  pink: {
    cssVar: '--tik-color-brand-pink',
    value: '#E6436D',
    usage: 'Lóbulo esquerdo do botão de criação da barra de abas',
    figmaNode: '4:431',
    figmaVariable: 'Tik Tok Pink',
  },
  cyan: {
    cssVar: '--tik-color-brand-cyan',
    value: '#65D2E9',
    usage: 'Lóbulo direito do botão de criação da barra de abas',
    figmaNode: '4:432',
    figmaVariable: 'Tik Tok Light Blue',
  },
  dark: {
    cssVar: '--tik-color-brand-dark',
    value: '#161722',
    usage: 'Texto e ícone primários em todo o cromo claro',
    figmaNode: '4:200',
    figmaVariable: 'Tik Tok Dark',
  },
};

/**
 * Superfícies dos dois contextos.
 */
export const tikSurfaceColors: Record<string, TikColorToken> = {
  primary: {
    cssVar: '--tik-color-surface-primary',
    value: '#FFFFFF',
    usage: 'Fundo de tela, barras e linhas do cromo claro',
    figmaNode: '4:196',
  },
  sheet: {
    cssVar: '--tik-color-surface-sheet',
    value: '#F5F5F4',
    usage: 'Folha inferior de comentários e de compartilhamento',
    figmaNode: '4:860',
  },
  field: {
    cssVar: '--tik-color-surface-field',
    value: '#F1F1F2',
    usage: 'Campo de busca preenchido',
    figmaNode: '4:219',
  },
  action: {
    cssVar: '--tik-color-surface-action',
    value: '#E8E8E7',
    usage: 'Círculo de 47px das ações da folha de compartilhamento',
    figmaNode: '4:864',
  },
  immersive: {
    cssVar: '--tik-color-surface-immersive',
    value: '#000000',
    usage: 'Feed de vídeo, câmera e barra de abas imersiva',
    figmaNode: '4:663',
  },
  media: {
    cssVar: '--tik-color-surface-media',
    value: '#C4C4C4',
    usage: 'Reserva de mídia sob fotografia e miniatura',
    figmaNode: '4:215',
  },
  scrim: {
    cssVar: '--tik-color-scrim',
    value: 'rgba(0, 0, 0, 0.4)',
    usage: 'Véu do leitor de QR com recorte de 250px',
    figmaNode: '4:746',
  },
  scrimStrong: {
    cssVar: '--tik-color-scrim-strong',
    value: 'rgba(0, 0, 0, 0.6)',
    usage: 'Véu do seletor de foto e vídeo do perfil',
    figmaNode: '4:395',
  },
};

/**
 * Escada de texto.
 */
export const tikTextColors: Record<string, TikColorToken> = {
  primary: {
    cssVar: '--tik-color-text-primary',
    value: '#161722',
    usage: 'Rótulo de linha, texto de comentário e título de barra',
    figmaNode: '4:200',
  },
  secondary: {
    cssVar: '--tik-color-text-secondary',
    value: '#86878B',
    usage: 'Metadado, autor de comentário e rótulo de seção',
    figmaNode: '4:485',
  },
  tertiary: {
    cssVar: '--tik-color-text-tertiary',
    value: '#8A8B8F',
    usage: 'Rótulo inativo da barra de abas clara',
    figmaNode: '4:437',
  },
  muted: {
    cssVar: '--tik-color-text-muted',
    value: '#7C7D83',
    usage: 'Descrição de estado vazio',
    figmaNode: '4:570',
  },
  action: {
    cssVar: '--tik-color-text-action',
    value: '#4E4F57',
    usage: 'Rótulo das ações da folha de compartilhamento',
    figmaNode: '4:866',
  },
  callout: {
    cssVar: '--tik-color-text-callout',
    value: '#000000',
    usage: 'Chamada "Tap to create a new video"',
    figmaNode: '4:469',
  },
  statusBar: {
    cssVar: '--tik-color-text-statusbar',
    value: '#171717',
    usage: 'Relógio e glifos da barra de status sobre cromo claro',
    figmaNode: '4:250',
  },
  onImmersive: {
    cssVar: '--tik-color-text-on-immersive',
    value: '#FFFFFF',
    usage: 'Texto sobre superfície imersiva',
    figmaNode: '4:1064',
  },
  onImmersiveMuted: {
    cssVar: '--tik-color-text-on-immersive-muted',
    value: 'rgba(255, 255, 255, 0.6)',
    usage: 'Aba inativa do cabeçalho do feed',
    figmaNode: '4:1117',
  },
};

/**
 * Tons de ícone.
 */
export const tikIconColors: Record<string, TikColorToken> = {
  default: {
    cssVar: '--tik-color-icon-default',
    value: '#86878B',
    usage: 'Divisa, glifo de linha e coração de comentário',
    figmaNode: '4:201',
  },
  primary: {
    cssVar: '--tik-color-icon-primary',
    value: '#161722',
    usage: 'Glifo de barra superior, menu e ações da folha',
    figmaNode: '4:225',
  },
  tabInactive: {
    cssVar: '--tik-color-icon-tab-inactive',
    value: '#8A8B8F',
    usage: 'Glifo inativo da barra de abas clara',
    figmaNode: '4:436',
  },
  tabDisabled: {
    cssVar: '--tik-color-icon-tab-disabled',
    value: '#D7D7D9',
    usage: 'Aba de curtidas ocultas do perfil',
    figmaNode: '4:473',
  },
  empty: {
    cssVar: '--tik-color-icon-empty',
    value: '#B0B0B3',
    usage: 'Ilustração de estado vazio de notificações',
    figmaNode: '4:568',
  },
  emptyAlt: {
    cssVar: '--tik-color-icon-empty-alt',
    value: '#AFB0B3',
    usage: 'Ilustração de estado vazio de mensagens diretas',
    figmaNode: '4:533',
  },
  onImmersive: {
    cssVar: '--tik-color-icon-on-immersive',
    value: '#FBFBFB',
    usage: 'Camada inferior dos glifos da trilha de ações do feed',
    figmaNode: '4:1072',
  },
};

/**
 * Bordas, fios e divisores.
 */
export const tikBorderColors: Record<string, TikColorToken> = {
  outline: {
    cssVar: '--tik-color-border-outline',
    value: '#E3E3E4',
    usage: 'Contorno de 1px de botão e chip contornados',
    figmaNode: '4:495',
  },
  hairline: {
    cssVar: '--tik-color-border-hairline',
    value: '#D0D1D3',
    usage: 'Fio de 0,33px das barras e separador de seção',
    figmaNode: '4:330',
  },
  separator: {
    cssVar: '--tik-color-border-separator',
    value: '#DADBDB',
    usage: 'Separador interno da folha de compartilhamento',
    figmaNode: '4:928',
  },
  immersive: {
    cssVar: '--tik-color-border-immersive',
    value: '#262626',
    usage: 'Fio superior da barra de abas imersiva',
    figmaNode: '4:1098',
  },
  grid: {
    cssVar: '--tik-color-border-grid',
    value: '#FFFFFF',
    usage: 'Calha de 0,83px entre miniaturas da grade',
    figmaNode: '4:448',
  },
  tabActive: {
    cssVar: '--tik-color-border-tab-active',
    value: '#161722',
    usage: 'Sublinhado de 2px da aba ativa do perfil',
    figmaNode: '4:476',
  },
  statusBar: {
    cssVar: '--tik-color-border-statusbar',
    value: '#979797',
    usage: 'Contorno da cápsula de bateria da barra de status',
    figmaNode: '4:237',
  },
  indicatorLight: {
    cssVar: '--tik-color-indicator-light',
    value: '#060606',
    usage: 'Indicador de home sobre cromo claro',
    figmaNode: '4:229',
  },
  indicatorImmersive: {
    cssVar: '--tik-color-indicator-immersive',
    value: '#E9E9E9',
    usage: 'Indicador de home sobre superfície imersiva',
    figmaNode: '4:1122',
  },
};

/**
 * Paleta exclusiva dos logotipos de terceiros da folha de compartilhamento e
 * dos avatares de convite. É proibido reaproveitá-la em outro componente.
 */
export const tikSocialColors: Record<string, TikColorToken> = {
  whatsapp: {
    cssVar: '--tik-color-social-whatsapp',
    value: '#65D072',
    usage: 'Disco do logotipo do WhatsApp',
    figmaNode: '4:890',
  },
  messenger: {
    cssVar: '--tik-color-social-messenger',
    value: '#2D67F6',
    usage: 'Disco do logotipo do Messenger',
    figmaNode: '4:906',
  },
  sms: {
    cssVar: '--tik-color-social-sms',
    value: '#5FC87D',
    usage: 'Disco do logotipo de SMS',
    figmaNode: '4:918',
  },
  facebook: {
    cssVar: '--tik-color-social-facebook',
    value: '#3173F1',
    usage: 'Glifo do logotipo do Facebook',
    figmaNode: '4:217',
  },
  instagramStart: {
    cssVar: '--tik-color-social-instagram-start',
    value: '#FFDD55',
    usage: 'Primeira parada do gradiente radial do Instagram',
    figmaNode: '4:925',
  },
  instagramMid: {
    cssVar: '--tik-color-social-instagram-mid',
    value: '#FF543E',
    usage: 'Parada intermediária do gradiente radial do Instagram',
    figmaNode: '4:925',
  },
  instagramEnd: {
    cssVar: '--tik-color-social-instagram-end',
    value: '#C837AB',
    usage: 'Última parada do gradiente radial do Instagram',
    figmaNode: '4:925',
  },
  avatarInvite: {
    cssVar: '--tik-color-avatar-invite',
    value: '#ED7360',
    usage: 'Círculo de "Invite friends"',
    figmaNode: '4:202',
  },
  avatarContacts: {
    cssVar: '--tik-color-avatar-contacts',
    value: '#67DDA0',
    usage: 'Círculo de "Find contacts"',
    figmaNode: '4:208',
  },
};

/**
 * Acentos localizados que não pertencem a nenhuma família acima.
 */
export const tikAccentColors: Record<string, TikColorToken> = {
  heartShadow: {
    cssVar: '--tik-color-accent-heart-shadow',
    value: '#E44558',
    usage: 'Camada inferior do coração da trilha de ações',
    figmaNode: '4:849',
  },
  discNote: {
    cssVar: '--tik-color-accent-disc-note',
    value: '#DDBC43',
    usage: 'Nota musical do disco giratório',
    figmaNode: '4:1068',
  },
};

/**
 * Gradientes literais do arquivo, já traduzidos para CSS.
 */
export const tikGradients: Record<string, TikColorToken> = {
  disc: {
    cssVar: '--tik-gradient-disc',
    value: 'conic-gradient(from 0deg, #171717 45.36deg, #373736 138.24deg, #171717 226.08deg, #373736 316.8deg, #171717 360deg)',
    usage: 'Disco giratório de música — GRADIENT_ANGULAR de quatro paradas',
    figmaNode: '4:1067',
  },
  marquee: {
    cssVar: '--tik-gradient-marquee',
    value: 'linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 5.2083%, rgba(255,255,255,0.9) 95.833%, rgba(255,255,255,0) 100%)',
    usage: 'Esmaecimento das pontas do letreiro de música',
    figmaNode: '4:1092',
  },
  instagram: {
    cssVar: '--tik-gradient-instagram',
    value: 'radial-gradient(circle at 30% 107%, #FFDD55 0%, #FFDD55 10%, #FF543E 50%, #C837AB 100%)',
    usage: 'Disco do logotipo do Instagram — GRADIENT_RADIAL',
    figmaNode: '4:925',
  },
};

/**
 * Todos os tokens de cor do Tik Tooria em uma única lista, na ordem em que a
 * estória de Cores os apresenta.
 */
export const tikColorGroups = [
  { name: 'Marca', description: 'As quatro variáveis publicadas pelo arquivo', tokens: tikBrandColors },
  { name: 'Superfícies', description: 'Cromo claro e contexto imersivo', tokens: tikSurfaceColors },
  { name: 'Texto', description: 'Escada de hierarquia de leitura', tokens: tikTextColors },
  { name: 'Ícones', description: 'Tons aplicáveis aos glifos', tokens: tikIconColors },
  { name: 'Bordas e fios', description: 'Separação sem sombra', tokens: tikBorderColors },
  { name: 'Marcas de terceiros', description: 'Exclusivas da folha de compartilhamento', tokens: tikSocialColors },
  { name: 'Acentos localizados', description: 'Coração e disco', tokens: tikAccentColors },
  { name: 'Gradientes', description: 'Traduzidos literalmente do arquivo', tokens: tikGradients },
] as const;
