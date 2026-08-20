/**
 * Registro de Glifos do Design System Unitube.
 *
 * IMPORTANTE: todo o dado vetorial abaixo foi copiado **literalmente** dos
 * exports SVG do arquivo Figma "YouTube UI Clone Design (Community)" (fileKey
 * `HcbrbLtDZ1rMEvSjoXpA5c`, página `Component` — `7:182`). Nenhum caminho foi
 * desenhado à mão, aproximado ou substituído por outra biblioteca de ícones. O
 * `viewBox` original é preservado — todos os 45 glifos do arquivo são 24×24.
 *
 * Para adicionar um glifo novo: exporte o SVG do Figma, copie o atributo `d`
 * sem edição e registre `figmaName`, `figmaNode`, `viewBox` e `usage`.
 *
 * Convenção de cor: o arquivo pinta **todos** os glifos de branco puro
 * (`fill="white"`), o que os torna monocromáticos. O preenchimento literal foi
 * removido do registro para que cada caminho herde `currentColor` e responda à
 * prop `tone` — é a única forma de o mesmo glifo servir ao texto primário
 * (#FFFFFF), ao secundário (#AAAAAA) e ao cromo do reprodutor (#EAEAEA), como
 * as telas do arquivo demonstram.
 */

/**
 * Definição de um glifo do Unitube.
 */
export interface UniIconDefinition {
  /** Nome da camada correspondente no Figma */
  figmaName: string;
  /** Node do Figma de origem */
  figmaNode: string;
  /** `viewBox` literal do export */
  viewBox: string;
  /** Atributo `d` literal do export */
  d: string;
  /** Onde o arquivo usa este glifo */
  usage: string;
  /** Grupo do glifo no arquivo, usado pela estória de Fundamentos */
  group: 'navegacao' | 'menu' | 'menuPreenchido' | 'acao';
  /**
   * Nome do glifo de contorno equivalente, quando este for a versão
   * preenchida. Tipado como `string` — e não como `UniIconName` — porque
   * `UniIconName` é derivado do próprio registro, o que criaria referência
   * circular no compilador.
   */
  outlineOf?: string;
}

/**
 * Registro completo dos 45 glifos publicados pelo arquivo.
 */
export const uniIconRegistry = {
  /* ----------------------------------------------------
   * Barra superior — frame `Navigations-Icons` (7:184)
   * ---------------------------------------------------- */
  hamburger: {
    figmaName: 'Icon/Hamburger',
    figmaNode: '2:115',
    viewBox: '0 0 24 24',
    d: 'M21 6H3V5H21V6ZM21 11H3V12H21V11ZM21 17H3V18H21V17Z',
    usage: 'Alterna a barra lateral, à esquerda do logotipo',
    group: 'navegacao',
  },
  search: {
    figmaName: 'Icon/Search',
    figmaNode: '2:93',
    viewBox: '0 0 24 24',
    d: 'M20.87 20.17L15.28 14.58C16.35 13.35 17 11.75 17 10C17 6.13 13.87 3 10 3C6.13 3 3 6.13 3 10C3 13.87 6.13 17 10 17C11.75 17 13.35 16.35 14.58 15.29L20.17 20.88L20.87 20.17ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16Z',
    usage: 'Botão de busca da barra superior e da barra do canal',
    group: 'navegacao',
  },
  mic: {
    figmaName: 'Icon/Mic',
    figmaNode: '2:89',
    viewBox: '0 0 24 24',
    d: 'M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z',
    usage: 'Busca por voz, no botão circular ao lado do campo',
    group: 'navegacao',
  },
  create: {
    figmaName: 'Icon/Create',
    figmaNode: '2:90',
    viewBox: '0 0 24 24',
    d: 'M14 13H11V16H9V13H6V11H9V8H11V11H14V13ZM17 6H3V18H17V11.61L21 13.44V8.56L17 10.39V6ZM18 5V8.83L22 7V15L18 13.17V19H2V5H18Z',
    usage: 'Criar vídeo, no perfil expandido',
    group: 'navegacao',
  },
  apps: {
    figmaName: 'Icon/Apps',
    figmaNode: '2:91',
    viewBox: '0 0 24 24',
    d: 'M16 4V8H20V4H16ZM19 7H17V5H19V7ZM16 10V14H20V10H16ZM19 13H17V11H19V13ZM10 4V8H14V4H10ZM13 7H11V5H13V7ZM10 10V14H14V10H10ZM13 13H11V11H13V13ZM16 16V20H20V16H16ZM19 19H17V17H19V19ZM10 16V20H14V16H10ZM13 19H11V17H13V19ZM4 4V8H8V4H4ZM7 7H5V5H7V7ZM4 10V14H8V10H4ZM7 13H5V11H7V13ZM4 16V20H8V16H4ZM7 19H5V17H7V19Z',
    usage: 'Grade de aplicativos, no perfil expandido',
    group: 'navegacao',
  },
  notifications: {
    figmaName: 'Icon/Notifications',
    figmaNode: '2:92',
    viewBox: '0 0 24 24',
    d: 'M10 20H14C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20ZM20 17.35V19H4V17.35L6 15.47V10.32C6 7.40001 7.56 5.10001 10 4.34001V3.96001C10 2.54001 11.49 1.46001 12.99 2.20001C13.64 2.52001 14 3.23001 14 3.96001V4.35001C16.44 5.10001 18 7.41001 18 10.33V15.48L20 17.35ZM19 17.77L17 15.89V10.42C17 7.95001 15.81 6.06001 13.87 5.32001C12.61 4.79001 11.23 4.82001 10.03 5.35001C8.15 6.11001 7 7.99001 7 10.42V15.89L5 17.77V18H19V17.77Z',
    usage: 'Notificações, no perfil expandido',
    group: 'navegacao',
  },
  leftBottom: {
    figmaName: 'Icon/LeftBottom',
    figmaNode: '10:660',
    viewBox: '0 0 24 24',
    d: 'M7.45499 18.975L14.43 12L7.45499 5.02501L8.51999 3.96001L16.545 12L8.51999 20.025L7.45499 18.975Z',
    usage: 'Avanço da barra de filtros, no alvo de ícone do menu superior',
    group: 'navegacao',
  },

  /* ----------------------------------------------------
   * Barra lateral, contorno — frame `Sidebar-Icons` (7:185)
   * ---------------------------------------------------- */
  home: {
    figmaName: 'Icon/Home',
    figmaNode: '3:129',
    viewBox: '0 0 24 24',
    d: 'M12 4.33L19 10.45V20H15V14H9V20H5V10.45L12 4.33ZM12 3L4 10V21H10V15H14V21H20V10L12 3Z',
    usage: 'Início, primeira linha da barra lateral',
    group: 'menu',
  },
  explore: {
    figmaName: 'Icon/Explore',
    figmaNode: '2:95',
    viewBox: '0 0 24 24',
    d: 'M9.8 9.8L5.97 18.03L14.2 14.2L18.03 5.97L9.8 9.8ZM13.08 12.77C12.87 13.06 12.57 13.25 12.22 13.31C12.15 13.32 12.07 13.33 12 13.33C11.72 13.33 11.46 13.25 11.23 13.08C10.94 12.87 10.75 12.57 10.69 12.22C10.63 11.87 10.71 11.51 10.92 11.23C11.13 10.94 11.43 10.75 11.78 10.69C12.13 10.63 12.48 10.71 12.77 10.92C13.06 11.13 13.25 11.43 13.31 11.78C13.37 12.13 13.29 12.48 13.08 12.77ZM12 3C16.96 3 21 7.04 21 12C21 16.96 16.96 21 12 21C7.04 21 3 16.96 3 12C3 7.04 7.04 3 12 3ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z',
    usage: 'Explorar, segunda linha da barra lateral',
    group: 'menu',
  },
  subscriptions: {
    figmaName: 'Icon/Subscriptions',
    figmaNode: '2:96',
    viewBox: '0 0 24 24',
    d: 'M10 18V12L15 15L10 18ZM17 3H7V4H17V3ZM20 6H4V7H20V6ZM22 9H2V21H22V9ZM3 10H21V20H3V10Z',
    usage: 'Inscrições, terceira linha da barra lateral',
    group: 'menu',
  },
  library: {
    figmaName: 'Icon/Library',
    figmaNode: '2:97',
    viewBox: '0 0 24 24',
    d: 'M11 7L17 10.5L11 14V7ZM18 20H4V6H3V21H18V20ZM21 18H6V3H21V18ZM7 17H20V4H7V17Z',
    usage: 'Biblioteca, segundo bloco da barra lateral',
    group: 'menu',
  },
  history: {
    figmaName: 'Icon/History',
    figmaNode: '2:98',
    viewBox: '0 0 24 24',
    d: 'M14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM22 12C22 17.51 17.51 22 12 22C6.49002 22 2.00002 17.51 2.00002 12H3.00002C3.00002 16.96 7.04002 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C8.81002 3 5.92002 4.64 4.28002 7.38C4.17002 7.56 4.06002 7.75 3.97002 7.94C3.96002 7.96 3.95002 7.98 3.94002 8H8.00002V9H1.96002V3H2.96002V7.74C3.00002 7.65 3.03002 7.57 3.07002 7.49C3.18002 7.27 3.30002 7.07 3.42002 6.86C5.22002 3.86 8.51002 2 12 2C17.51 2 22 6.49 22 12Z',
    usage: 'Histórico, segundo bloco da barra lateral',
    group: 'menu',
  },
  yourVideos: {
    figmaName: 'Icon/YourVideos',
    figmaNode: '2:99',
    viewBox: '0 0 24 24',
    d: 'M10 8L16 12L10 16V8ZM21 3V21H3V3H21ZM20 4H4V20H20V4Z',
    usage: 'Seus vídeos, segundo bloco da barra lateral',
    group: 'menu',
  },
  watchLater: {
    figmaName: 'Icon/WatchLater',
    figmaNode: '2:100',
    viewBox: '0 0 24 24',
    d: 'M14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2Z',
    usage: 'Assistir mais tarde, segundo bloco da barra lateral',
    group: 'menu',
  },
  likedOutline: {
    figmaName: 'Icon/LikedOutline',
    figmaNode: '2:101',
    viewBox: '0 0 24 24',
    d: 'M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z',
    usage: 'Vídeos curtidos na barra lateral e curtida na barra do comentário',
    group: 'menu',
  },
  arrowBottom: {
    figmaName: 'Icon/ArrowBottom',
    figmaNode: '2:102',
    viewBox: '0 0 24 24',
    d: 'M12 15.7L5.59998 9.40001L6.29998 8.70001L11.9 14.3L17.5 8.70001L18.2 9.40001L12 15.7Z',
    usage: 'Expandir seção da barra lateral ("Show More")',
    group: 'menu',
  },
  premium: {
    figmaName: 'Icon/Premium',
    figmaNode: '2:103',
    viewBox: '0 0 24 24',
    d: 'M9.99997 9.35L15 12L9.99997 14.65V9.35ZM12 6C9.47421 5.95085 6.94808 6.07782 4.43997 6.38C4.18719 6.4509 3.9569 6.58564 3.77126 6.77129C3.58562 6.95693 3.45087 7.18722 3.37997 7.44C3.11208 8.94492 2.98487 10.4715 2.99997 12C2.98487 13.5285 3.11208 15.0551 3.37997 16.56C3.45087 16.8128 3.58562 17.0431 3.77126 17.2287C3.9569 17.4144 4.18719 17.5491 4.43997 17.62C6.94808 17.9222 9.47421 18.0492 12 18C14.5257 18.0492 17.0519 17.9222 19.56 17.62C19.8128 17.5491 20.043 17.4144 20.2287 17.2287C20.4143 17.0431 20.5491 16.8128 20.62 16.56C20.8879 15.0551 21.0151 13.5285 21 12C21.0151 10.4715 20.8879 8.94492 20.62 7.44C20.5491 7.18722 20.4143 6.95693 20.2287 6.77129C20.043 6.58564 19.8128 6.4509 19.56 6.38C17.0519 6.07782 14.5257 5.95085 12 6ZM12 5C12 5 18.25 5 19.81 5.42C20.2341 5.53436 20.6208 5.75801 20.9314 6.06861C21.242 6.37921 21.4656 6.76589 21.58 7.19C21.8696 8.77673 22.0102 10.3871 22 12C22.0102 13.6129 21.8696 15.2233 21.58 16.81C21.4656 17.2341 21.242 17.6208 20.9314 17.9314C20.6208 18.242 20.2341 18.4656 19.81 18.58C18.25 19 12 19 12 19C12 19 5.74997 19 4.18997 18.58C3.76586 18.4656 3.37919 18.242 3.06858 17.9314C2.75798 17.6208 2.53433 17.2341 2.41997 16.81C2.13033 15.2233 1.98972 13.6129 1.99997 12C1.98972 10.3871 2.13033 8.77673 2.41997 7.19C2.53433 6.76589 2.75798 6.37921 3.06858 6.06861C3.37919 5.75801 3.76586 5.53436 4.18997 5.42C5.74997 5 12 5 12 5Z',
    usage: 'Unitube Premium, bloco "More from" da barra lateral',
    group: 'menu',
  },
  gaming: {
    figmaName: 'Icon/Gaming',
    figmaNode: '2:104',
    viewBox: '0 0 24 24',
    d: 'M10 12H8V14H6V12H4V10H6V8H8V10H10V12ZM17 12.5C17 11.67 16.33 11 15.5 11C14.67 11 14 11.67 14 12.5C14 13.33 14.67 14 15.5 14C16.33 14 17 13.33 17 12.5ZM20 9.5C20 8.67 19.33 8 18.5 8C17.67 8 17 8.67 17 9.5C17 10.33 17.67 11 18.5 11C19.33 11 20 10.33 20 9.5ZM16.97 5.15L12.47 7.68L11.98 7.95L11.49 7.68L6.99 5.15L3 7.39V13.82L11.98 18.86L20.96 13.82V7.39L16.97 5.15ZM16.97 4L21.96 6.8V14.4L11.98 20L2 14.4V6.8L6.99 4L11.98 6.8L16.97 4Z',
    usage: 'Jogos, bloco "More from" da barra lateral',
    group: 'menu',
  },
  live: {
    figmaName: 'Icon/Live',
    figmaNode: '2:105',
    viewBox: '0 0 24 24',
    d: 'M14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12ZM8.48 8.45001L7.77 7.75001C6.68 8.83001 6 10.34 6 12C6 13.66 6.68 15.17 7.77 16.25L8.48 15.54C7.57 14.64 7 13.39 7 12C7 10.61 7.57 9.36001 8.48 8.45001ZM16.23 7.75001L15.52 8.46001C16.43 9.36001 17 10.61 17 12C17 13.39 16.43 14.64 15.52 15.55L16.23 16.26C17.32 15.17 18 13.66 18 12C18 10.34 17.32 8.83001 16.23 7.75001ZM5.65 5.63001L4.95 4.92001C3.13 6.73001 2 9.24001 2 12C2 14.76 3.13 17.27 4.95 19.08L5.66 18.37C4.02 16.74 3 14.49 3 12C3 9.51001 4.02 7.26001 5.65 5.63001ZM19.05 4.92001L18.34 5.63001C19.98 7.26001 21 9.51001 21 12C21 14.49 19.98 16.74 18.35 18.37L19.06 19.08C20.87 17.27 22 14.76 22 12C22 9.24001 20.87 6.73001 19.05 4.92001Z',
    usage: 'Ao vivo, bloco "More from" da barra lateral',
    group: 'menu',
  },
  sports: {
    figmaName: 'Icon/Sports',
    figmaNode: '2:106',
    viewBox: '0 0 24 24',
    d: 'M17 3V5V6V10V10.51L16.99 10.97C16.94 13.1 15.66 14.94 13.74 15.67H13.72L13.66 15.69L13 15.95V16.65V19V20H14V21H15H10V20H11V19V16.65V15.95L10.34 15.71L10.26 15.68H10.25C8.33 14.95 7.05 13.11 7 10.98V10.51V10V6V5V3H17ZM18 2H6V5H4V6V10V11H6.01C6.07 13.53 7.63 15.78 9.97 16.64C9.98 16.64 9.99 16.64 10 16.65V19H9V20H8V22H16V20H15V19H14V16.65C14.01 16.65 14.02 16.65 14.03 16.64C16.36 15.78 17.93 13.54 17.99 11H20V10V6V5H18V2ZM18 10V6H19V10H18ZM5 10V6H6V10H5Z',
    usage: 'Esportes, bloco "More from" da barra lateral',
    group: 'menu',
  },
  settings: {
    figmaName: 'Icon/Settings',
    figmaNode: '2:107',
    viewBox: '0 0 24 24',
    d: 'M12 9C13.65 9 15 10.35 15 12C15 13.65 13.65 15 12 15C10.35 15 9.00003 13.65 9.00003 12C9.00003 10.35 10.35 9 12 9ZM12 8C9.79003 8 8.00003 9.79 8.00003 12C8.00003 14.21 9.79003 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM13.22 3L13.77 5.2L13.9 5.71L14.4 5.89C15.01 6.12 15.59 6.45 16.12 6.87L16.52 7.19L17.02 7.05L19.19 6.43L20.41 8.54L18.78 10.13L18.41 10.49L18.49 11C18.54 11.32 18.57 11.64 18.57 11.98C18.57 12.32 18.54 12.64 18.49 12.96L18.41 13.47L18.78 13.83L20.41 15.42L19.19 17.53L17.02 16.91L16.52 16.77L16.12 17.09C15.59 17.52 15.01 17.85 14.4 18.07L13.9 18.25L13.77 18.76L13.22 21H10.78L10.23 18.8L10.1 18.29L9.60003 18.11C9.00003 17.88 8.42003 17.55 7.88003 17.12L7.48003 16.8L6.98003 16.94L4.81003 17.56L3.60003 15.44L5.23003 13.85L5.60003 13.49L5.52003 12.98C5.47003 12.66 5.44003 12.33 5.44003 12C5.44003 11.67 5.47003 11.34 5.52003 11.02L5.60003 10.51L5.23003 10.15L3.60003 8.56L4.82003 6.45L6.99003 7.07L7.49003 7.21L7.89003 6.89C8.42003 6.45 9.00003 6.12 9.61003 5.9L10.11 5.72L10.24 5.21L10.78 3H13.22ZM14 2H10L9.26003 4.96C8.53003 5.23 7.86003 5.62 7.26003 6.1L4.34003 5.27L2.34003 8.73L4.53003 10.86C4.47003 11.23 4.44003 11.61 4.44003 12C4.44003 12.39 4.47003 12.77 4.53003 13.14L2.34003 15.27L4.34003 18.73L7.26003 17.9C7.86003 18.38 8.53003 18.77 9.26003 19.04L10 22H14L14.74 19.04C15.47 18.77 16.14 18.38 16.74 17.9L19.66 18.73L21.66 15.27L19.47 13.14C19.53 12.77 19.56 12.39 19.56 12C19.56 11.61 19.53 11.23 19.47 10.86L21.66 8.73L19.66 5.27L16.74 6.1C16.14 5.62 15.47 5.23 14.74 4.96L14 2Z',
    usage: 'Configurações, penúltimo bloco da barra lateral',
    group: 'menu',
  },
  report: {
    figmaName: 'Icon/Report',
    figmaNode: '2:108',
    viewBox: '0 0 24 24',
    d: 'M13.18 4L13.42 5.2L13.58 6H14.4H19V13H13.82L13.58 11.8L13.42 11H12.6H6V4H13.18ZM14 3H5V21H6V12H12.6L13 14H20V5H14.4L14 3Z',
    usage: 'Denunciar histórico, penúltimo bloco da barra lateral',
    group: 'menu',
  },
  help: {
    figmaName: 'Icon/Help',
    figmaNode: '2:111',
    viewBox: '0 0 24 24',
    d: 'M15.36 9.96C15.36 11.05 14.69 11.63 14.05 12.2C13.52 12.67 13.02 13.1 12.89 13.8L12.85 14H11.1L11.13 13.72C11.27 12.55 11.93 11.96 12.6 11.45C13.12 11.05 13.61 10.68 13.61 9.96C13.61 9.45 13.38 8.99 12.98 8.67C12.58 8.36 12.06 8.25 11.56 8.38C10.97 8.53 10.51 9.05 10.37 9.72L10.32 10H8.57L8.63 9.58C8.83 8.18 9.78 7.05 11.05 6.71C12.1 6.42 13.19 6.63 14.03 7.28C14.88 7.92 15.36 8.9 15.36 9.96ZM12 18C12.55 18 13 17.55 13 17C13 16.45 12.55 16 12 16C11.45 16 11 16.45 11 17C11 17.55 11.45 18 12 18ZM12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2Z',
    usage: 'Ajuda, último bloco da barra lateral',
    group: 'menu',
  },
  feedback: {
    figmaName: 'Icon/Feedback',
    figmaNode: '2:110',
    viewBox: '0 0 24 24',
    d: 'M13 14H11V12H13V14ZM13 5H11V11H13V5ZM19 3H5V19.59L8.29 16.3L8.59 16H9H19V3ZM20 2V17H9L4 22V2H20Z',
    usage: 'Enviar feedback, último bloco da barra lateral',
    group: 'menu',
  },
  queue: {
    figmaName: 'Icon/Queue',
    figmaNode: '2:109',
    viewBox: '0 0 24 24',
    d: 'M22 7H2V8H22V7ZM13 12H2V11H13V12ZM13 16H2V15H13V16ZM15 19V11L22 15L15 19Z',
    usage: 'Fila de reprodução',
    group: 'menu',
  },
  play: {
    figmaName: 'Icon/Play',
    figmaNode: '19:1550',
    viewBox: '0 0 24 24',
    d: 'M6 4L18 12L6 20V4Z',
    usage: 'Botão "Play all" do cabeçalho da playlist',
    group: 'menu',
  },

  /* ----------------------------------------------------
   * Barra lateral, preenchidos — frame `sidebar-Icons-Fill` (7:186)
   *
   * O arquivo publica a versão preenchida de treze glifos. É a
   * forma como marca o item ativo da barra lateral — não há
   * mudança de cor entre ativo e inativo, apenas de peso.
   * ---------------------------------------------------- */
  homeFill: {
    figmaName: 'Icon/HomeFill',
    figmaNode: '2:94',
    viewBox: '0 0 24 24',
    d: 'M4 10V21H10V15H14V21H20V10L12 3L4 10Z',
    usage: 'Início, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'home',
  },
  exploreFill: {
    figmaName: 'Icon/ExploreFill',
    figmaNode: '3:172',
    viewBox: '0 0 24 24',
    d: 'M11.23 13.08C10.94 12.87 10.75 12.57 10.69 12.22C10.63 11.87 10.71 11.51 10.92 11.23C11.13 10.94 11.43 10.75 11.78 10.69C12.13 10.63 12.48 10.71 12.77 10.92C13.06 11.13 13.25 11.43 13.31 11.78C13.37 12.13 13.29 12.49 13.08 12.77C12.87 13.06 12.57 13.25 12.22 13.31C12.15 13.32 12.07 13.33 12 13.33C11.72 13.33 11.45 13.25 11.23 13.08ZM22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12ZM18.03 5.97L9.8 9.8L5.97 18.03L14.2 14.2L18.03 5.97Z',
    usage: 'Explorar, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'explore',
  },
  subscriptionsFill: {
    figmaName: 'Icon/SubscriptionsFill',
    figmaNode: '3:173',
    viewBox: '0 0 24 24',
    d: 'M20 7H4V6H20V7ZM22 9V21H2V9H22ZM15 15L10 12V18L15 15ZM17 3H7V4H17V3Z',
    usage: 'Inscrições, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'subscriptions',
  },
  libraryFill: {
    figmaName: 'Icon/LibraryFill',
    figmaNode: '3:174',
    viewBox: '0 0 24 24',
    d: 'M4 20H18V21H3V6H4V20ZM21 3V18H6V3H21ZM17 10.5L11 7V14L17 10.5Z',
    usage: 'Biblioteca, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'library',
  },
  historyFill: {
    figmaName: 'Icon/HistoryFill',
    figmaNode: '3:175',
    viewBox: '0 0 24 24',
    d: 'M14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM12 2C8.73 2 5.8 3.44 4 5.83V3.02H2V9H8V7H5.62C7.08 5.09 9.36 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12H2C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2Z',
    usage: 'Histórico, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'history',
  },
  watchLaterFill: {
    figmaName: 'Icon/WatchLaterFill',
    figmaNode: '3:176',
    viewBox: '0 0 24 24',
    d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95Z',
    usage: 'Assistir mais tarde, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'watchLater',
  },
  likedFill: {
    figmaName: 'Icon/LikedFill',
    figmaNode: '3:177',
    viewBox: '0 0 24 24',
    d: 'M3 11H6V21H3V11ZM18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11V21H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11Z',
    usage: 'Vídeos curtidos, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'likedOutline',
  },
  premiumFill: {
    figmaName: 'Icon/PremiumFill',
    figmaNode: '3:178',
    viewBox: '0 0 24 24',
    d: 'M21.58 7.19C21.4656 6.76589 21.242 6.37921 20.9314 6.06861C20.6208 5.75801 20.2341 5.53436 19.81 5.42C18.25 5 12 5 12 5C12 5 5.74997 5 4.18997 5.42C3.76586 5.53436 3.37919 5.75801 3.06858 6.06861C2.75798 6.37921 2.53433 6.76589 2.41997 7.19C2.13033 8.77673 1.98972 10.3871 1.99997 12C1.98972 13.6129 2.13033 15.2233 2.41997 16.81C2.53433 17.2341 2.75798 17.6208 3.06858 17.9314C3.37919 18.242 3.76586 18.4656 4.18997 18.58C5.74997 19 12 19 12 19C12 19 18.25 19 19.81 18.58C20.2341 18.4656 20.6208 18.242 20.9314 17.9314C21.242 17.6208 21.4656 17.2341 21.58 16.81C21.8696 15.2233 22.0102 13.6129 22 12C22.0102 10.3871 21.8696 8.77673 21.58 7.19ZM9.99997 14.65V9.35L15 12L9.99997 14.65Z',
    usage: 'Unitube Premium, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'premium',
  },
  gamingFill: {
    figmaName: 'Icon/GamingFill',
    figmaNode: '3:179',
    viewBox: '0 0 24 24',
    d: 'M16.97 4L11.98 6.8L6.99 4L2 6.8V14.4L11.98 20L21.96 14.4V6.8L16.97 4ZM10 12H8V14H6V12H4V10H6V8H8V10H10V12ZM15.5 14C14.67 14 14 13.33 14 12.5C14 11.67 14.67 11 15.5 11C16.33 11 17 11.67 17 12.5C17 13.33 16.33 14 15.5 14ZM18.5 11C17.67 11 17 10.33 17 9.5C17 8.67 17.67 8 18.5 8C19.33 8 20 8.67 20 9.5C20 10.33 19.33 11 18.5 11Z',
    usage: 'Jogos, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'gaming',
  },
  liveFill: {
    figmaName: 'Icon/LiveFill',
    figmaNode: '3:180',
    viewBox: '0 0 24 24',
    d: 'M14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10C13.1 10 14 10.9 14 12ZM6.36 6.33001L4.95 4.92001C3.13 6.73001 2 9.24001 2 12C2 14.76 3.13 17.27 4.95 19.08L6.36 17.67C4.9 16.22 4 14.21 4 12C4 9.79001 4.9 7.78001 6.36 6.33001ZM19.05 4.92001L17.64 6.33001C19.1 7.78001 20 9.79001 20 12C20 14.21 19.1 16.22 17.64 17.67L19.05 19.08C20.87 17.27 22 14.76 22 12C22 9.24001 20.87 6.73001 19.05 4.92001ZM9.19 9.16001L7.77 7.75001C6.68 8.83001 6 10.34 6 12C6 13.66 6.68 15.17 7.77 16.25L9.18 14.84C8.46 14.11 8 13.11 8 12C8 10.89 8.46 9.89001 9.19 9.16001ZM16.23 7.75001L14.82 9.16001C15.54 9.89001 16 10.89 16 12C16 13.11 15.54 14.11 14.81 14.84L16.22 16.25C17.32 15.17 18 13.66 18 12C18 10.34 17.32 8.83001 16.23 7.75001Z',
    usage: 'Ao vivo, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'live',
  },
  sportsFill: {
    figmaName: 'Icon/SportsFill',
    figmaNode: '3:182',
    viewBox: '0 0 24 24',
    d: 'M18 5V2H6V5H4V6V10V11H6.01C6.07 13.53 7.63 15.78 9.97 16.64C9.98 16.64 9.99 16.64 10 16.65V19H9V20H8V22H16V20H15V19H14V16.65C14.01 16.65 14.02 16.65 14.03 16.64C16.36 15.78 17.93 13.54 17.99 11H20V10V6V5H18ZM6 10H5V6H6V10ZM19 10H18V6H19V10Z',
    usage: 'Esportes, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'sports',
  },
  reportFill: {
    figmaName: 'Icon/ReportFill',
    figmaNode: '3:183',
    viewBox: '0 0 24 24',
    d: 'M14 3H5V21H6V12H12.6L13 14H20V5H14.4L14 3Z',
    usage: 'Denunciar histórico, estado ativo',
    group: 'menuPreenchido',
    outlineOf: 'report',
  },
  arrowTop: {
    figmaName: 'Icon/ArrowTop',
    figmaNode: '3:181',
    viewBox: '0 0 24 24',
    d: 'M18.4 14.6L12 8.29999L5.59998 14.6L6.39998 15.4L12 9.69999L17.6 15.4L18.4 14.6Z',
    usage: 'Recolher seção da barra lateral ("Show Less")',
    group: 'menuPreenchido',
    outlineOf: 'arrowBottom',
  },

  /* ----------------------------------------------------
   * Ações da tela de vídeo — nós soltos da página `Component`
   * ---------------------------------------------------- */
  liked: {
    figmaName: 'Icon/Liked',
    figmaNode: '20:2688',
    viewBox: '0 0 24 24',
    d: 'M18.77 11H14.54L16.06 6.06C16.38 5.03 15.54 4 14.38 4C13.8 4 13.24 4.24 12.86 4.65L7 11H3V21H7H8H17.43C18.49 21 19.41 20.33 19.62 19.39L20.96 13.39C21.23 12.15 20.18 11 18.77 11ZM7 20H4V12H7V20ZM19.98 13.17L18.64 19.17C18.54 19.65 18.03 20 17.43 20H8V11.39L13.6 5.33C13.79 5.12 14.08 5 14.38 5C14.64 5 14.88 5.11 15.01 5.3C15.08 5.4 15.16 5.56 15.1 5.77L13.58 10.71L13.18 12H14.53H18.76C19.17 12 19.56 12.17 19.79 12.46C19.92 12.61 20.05 12.86 19.98 13.17Z',
    usage: 'Curtir, na barra de ações do vídeo',
    group: 'acao',
  },
  disliked: {
    figmaName: 'Icon/Disliked',
    figmaNode: '20:2714',
    viewBox: '0 0 24 24',
    d: 'M17 4H16H6.57001C5.50001 4 4.59001 4.67 4.38001 5.61L3.04001 11.61C2.77001 12.85 3.82001 14 5.23001 14H9.46001L7.94001 18.94C7.62001 19.97 8.46001 21 9.62001 21C10.2 21 10.76 20.76 11.14 20.35L17 14H21V4H17ZM10.4 19.67C10.21 19.88 9.92001 20 9.62001 20C9.36001 20 9.12001 19.89 8.99001 19.7C8.92001 19.6 8.84001 19.44 8.90001 19.23L10.42 14.29L10.82 13H9.46001H5.23001C4.82001 13 4.43001 12.83 4.20001 12.54C4.08001 12.39 3.95001 12.14 4.02001 11.82L5.36001 5.82C5.46001 5.35 5.97001 5 6.57001 5H16V13.61L10.4 19.67ZM20 13H17V5H20V13Z',
    usage: 'Não curtir, na barra de ações do vídeo',
    group: 'acao',
  },
  share: {
    figmaName: 'Icon/Share',
    figmaNode: '20:2727',
    viewBox: '0 0 24 24',
    d: 'M15 5.63L20.66 12L15 18.37V15V14H14C10.04 14 6.86 15 4.25 17.09C6.09 13.02 9.36 10.69 14.14 9.99L15 9.86V9V5.63ZM14 3V9C6.22 10.13 3.11 15.33 2 21C4.78 17.03 8.44 15 14 15V21L22 12L14 3Z',
    usage: 'Compartilhar, na barra de ações do vídeo',
    group: 'acao',
  },
  save: {
    figmaName: 'Icon/Save',
    figmaNode: '20:2740',
    viewBox: '0 0 24 24',
    d: 'M22 13H18V17H16V13H12V11H16V7H18V11H22V13ZM14 7H2V8H14V7ZM2 12H10V11H2V12ZM2 16H10V15H2V16Z',
    usage: 'Salvar em playlist, na barra de ações do vídeo',
    group: 'acao',
  },
  more: {
    figmaName: 'Icon/More',
    figmaNode: '20:2753',
    viewBox: '0 0 24 24',
    d: 'M7.5 12C7.5 12.83 6.83 13.5 6 13.5C5.17 13.5 4.5 12.83 4.5 12C4.5 11.17 5.17 10.5 6 10.5C6.83 10.5 7.5 11.17 7.5 12ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM18 10.5C17.17 10.5 16.5 11.17 16.5 12C16.5 12.83 17.17 13.5 18 13.5C18.83 13.5 19.5 12.83 19.5 12C19.5 11.17 18.83 10.5 18 10.5Z',
    usage: 'Mais ações, na barra de ações do vídeo',
    group: 'acao',
  },
  dropdown: {
    figmaName: 'Icon/Dropdown',
    figmaNode: '23:2116',
    viewBox: '0 0 24 24',
    d: 'M21 6H3V5H21V6ZM15 11H3V12H15V11ZM9 17H3V18H9V17Z',
    usage: 'Ordenar comentários ("SORT BY")',
    group: 'acao',
  },
} as const satisfies Record<string, UniIconDefinition>;

/**
 * Nome de um glifo da biblioteca oficial.
 */
export type UniIconName = keyof typeof uniIconRegistry;

/**
 * Todos os nomes de glifo, na ordem de declaração do registro.
 */
export const uniIconNames = Object.keys(uniIconRegistry) as UniIconName[];

/**
 * O mesmo registro, com a assinatura larga da interface.
 *
 * `uniIconRegistry` é declarado com `as const` para que a documentação exiba os
 * valores literais de cada glifo, o que faz o TypeScript estreitar cada entrada
 * ao seu formato exato — e um glifo sem `outlineOf` passa a não ter a
 * propriedade. Use `uniIcons` quando precisar ler os campos opcionais
 * (`outlineOf`) de forma uniforme; use `uniIconRegistry` quando quiser os
 * literais.
 */
export const uniIcons: Record<UniIconName, UniIconDefinition> = uniIconRegistry;
