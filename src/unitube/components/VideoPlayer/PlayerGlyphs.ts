/**
 * Glifos de controle do reprodutor — Design System Unitube.
 *
 * Ao contrário dos 45 ícones de `Icon/IconPaths.ts`, os controles do reprodutor
 * **não são componentes** no arquivo Figma: são nós `VECTOR`, `GROUP` e
 * `BOOLEAN_OPERATION` soltos dentro do quadro `Media/VideoPlayer` (`18:1295`).
 * Por isso vivem aqui, e não no registro de ícones.
 *
 * Os dados abaixo são a **geometria de preenchimento resolvida** de cada nó,
 * lida via Plugin API (`node.fillGeometry`) — ou seja, o resultado literal das
 * operações booleanas do arquivo, sem redesenho.
 *
 * Cada nó do arquivo carrega, além do preenchimento `#EAEAEA`, um traço de 1px
 * em preto a 10% de opacidade. Não é decoração arbitrária: é o que mantém o
 * glifo legível sobre quadros de vídeo claros. O traço é reproduzido.
 */

/**
 * Uma forma de um glifo de controle.
 */
export interface UniPlayerGlyphShape {
  /** Dado de caminho literal, de `fillGeometry` */
  d: string;
  /** Regra de preenchimento declarada pelo nó */
  evenOdd?: boolean;
  /** Cor fixa; quando ausente, herda `currentColor` */
  fill?: string;
  /** Deslocamento aplicado quando a forma vem de um filho de grupo */
  transform?: string;
}

/**
 * Um retângulo de um glifo de controle, quando o nó de origem é `RECTANGLE`.
 */
export interface UniPlayerGlyphRect {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  fill: string;
}

/**
 * Definição de um glifo de controle do reprodutor.
 */
export interface UniPlayerGlyphDefinition {
  /** Nome da camada no Figma */
  figmaName: string;
  /** Node do Figma de origem */
  figmaNode: string;
  /** Largura intrínseca medida no arquivo */
  width: number;
  /** Altura intrínseca medida no arquivo */
  height: number;
  /** Formas do glifo */
  shapes: UniPlayerGlyphShape[];
  /** Retângulos do glifo, quando houver */
  rects?: UniPlayerGlyphRect[];
  /** Uso do glifo no reprodutor */
  usage: string;
}

/**
 * Os nove glifos de controle do reprodutor.
 */
export const uniPlayerGlyphs = {
  play: {
    figmaName: 'ico-play',
    figmaNode: '18:1315',
    width: 13,
    height: 16,
    shapes: [{ d: 'M0 16 L0 0 L13 8 L0 16 Z' }],
    usage: 'Reproduzir, primeiro controle à esquerda',
  },
  next: {
    figmaName: 'ico-next',
    figmaNode: '18:1313',
    width: 12,
    height: 12,
    shapes: [{ d: 'M0 0 L8 6 L0 12 L0 0 Z M12 0 L10 0 L10 12 L12 12 L12 0 Z', evenOdd: true }],
    usage: 'Próximo vídeo',
  },
  sound: {
    figmaName: 'ico-sound',
    figmaNode: '18:1310',
    width: 13.25,
    height: 16,
    shapes: [
      {
        d: 'M0 5 L4 5 L9 0 L9 16 L4 11 L0 11 L0 5 Z M11 4 L11 12 L12.65 9.8 C13.45 8.73333 13.45 7.26667 12.65 6.2 L11 4 Z',
        evenOdd: true,
      },
    ],
    usage: 'Volume',
  },
  titles: {
    figmaName: 'ico-titles',
    figmaNode: '18:1309',
    width: 18,
    height: 14,
    shapes: [
      {
        d: 'M0 2 C0 0.895431 0.895431 0 2 0 L16 0 C17.1046 0 18 0.895431 18 2 L18 12 C18 13.1046 17.1046 14 16 14 L2 14 C0.89543 14 0 13.1046 0 12 L0 2 Z M12 4 L14 4 C14.5523 4 15 4.44772 15 5 C15 5.55228 14.5523 6 14 6 L13 6 C12.4477 6 12 6.44772 12 7 C12 7.55228 12.4477 8 13 8 L14 8 C14.5523 8 15 8.44772 15 9 C15 9.55228 14.5523 10 14 10 L12 10 C10.8954 10 10 9.10457 10 8 L10 6 C10 4.89543 10.8954 4 12 4 Z M7 4 L5 4 C3.89543 4 3 4.89543 3 6 L3 8 C3 9.10457 3.89543 10 5 10 L7 10 C7.55229 10 8 9.55228 8 9 C8 8.44772 7.55229 8 7 8 L6 8 C5.44772 8 5 7.55228 5 7 C5 6.44772 5.44772 6 6 6 L7 6 C7.55229 6 8 5.55228 8 5 C8 4.44772 7.55229 4 7 4 Z',
        evenOdd: true,
      },
    ],
    usage: 'Legendas',
  },
  quality: {
    figmaName: 'ico-hd',
    figmaNode: '18:1308',
    width: 20,
    height: 16,
    shapes: [
      {
        d: 'M5.30773 1 C5.30773 0.447715 5.75545 0 6.30773 0 L8.30773 0 C8.86002 0 9.30773 0.447715 9.30773 1 L9.30773 1.6342 C9.30773 2.05798 9.57885 2.42843 9.9589 2.61593 C10.039 2.65546 10.1181 2.69673 10.1962 2.73968 C10.5678 2.94416 11.0271 2.95399 11.3745 2.71072 L11.8946 2.34653 C12.3471 2.02975 12.9706 2.1397 13.2874 2.5921 L14.4345 4.2304 C14.7513 4.68281 14.6414 5.30636 14.1889 5.62313 L13.669 5.98717 C13.322 6.23016 13.174 6.66452 13.2382 7.08328 C13.284 7.38213 13.3077 7.68827 13.3077 8 C13.3077 8.31161 13.284 8.61771 13.2382 8.91655 C13.174 9.33527 13.322 9.76958 13.669 10.0125 L14.189 10.3766 C14.6414 10.6934 14.7514 11.3169 14.4346 11.7694 L13.2875 13.4076 C12.9707 13.86 12.3471 13.97 11.8947 13.6532 L11.3747 13.2891 C11.0273 13.0458 10.5679 13.0556 10.1964 13.2601 C10.1183 13.3031 10.0391 13.3444 9.9589 13.384 C9.57887 13.5716 9.30773 13.942 9.30773 14.3658 L9.30773 15 C9.30773 15.5523 8.86002 16 8.30773 16 L6.30773 16 C5.75545 16 5.30773 15.5523 5.30773 15 L5.30773 14.3658 C5.30773 13.942 5.0366 13.5716 4.65657 13.384 C4.57638 13.3444 4.49722 13.3031 4.41911 13.2601 C4.04754 13.0556 3.58817 13.0458 3.24074 13.2891 L2.72083 13.6532 C2.26843 13.97 1.64485 13.86 1.32806 13.4076 L0.180934 11.7693 C-0.135844 11.3169 -0.0258961 10.6934 0.42651 10.3766 L0.946465 10.0125 C1.29346 9.76958 1.44146 9.33527 1.37729 8.91656 C1.33149 8.61772 1.30773 8.31161 1.30773 8 C1.30773 7.68827 1.33151 7.38212 1.37733 7.08327 C1.44154 6.66452 1.29354 6.23016 0.946503 5.98717 L0.426591 5.62313 C-0.0258238 5.30636 -0.135778 4.68281 0.181004 4.2304 L1.32814 2.59211 C1.64492 2.1397 2.26848 2.02976 2.72088 2.34655 L3.24093 2.7107 C3.58835 2.95398 4.04772 2.94416 4.4193 2.73968 C4.49735 2.69673 4.57646 2.65546 4.65657 2.61593 C5.03662 2.42843 5.30773 2.05798 5.30773 1.6342 L5.30773 1 Z M7.30773 10 C8.4123 10 9.30773 9.10457 9.30773 8 C9.30773 6.89543 8.4123 6 7.30773 6 C6.20317 6 5.30773 6.89543 5.30773 8 C5.30773 9.10457 6.20317 10 7.30773 10 Z',
        evenOdd: true,
      },
      {
        d: 'M0 0 L1 0 L1 2 L3 2 L3 0 L4 0 L4 5 L3 5 L3 3 L1 3 L1 5 L0 5 L0 0 Z M5 0 L8 0 L8 1 L6 1 L6 4 L8 4 L8 5 L5 5 L5 0 Z M8 4 L8 1 L9 1 L9 4 L8 4 Z',
        fill: 'var(--uni-color-neutral-100)',
        transform: 'translate(9 2)',
      },
    ],
    /**
     * O selo HD é o único ponto do reprodutor pintado com o vermelho semântico
     * da marca — `#EE1A26`, e não o `#FC0D1C` da linha do tempo.
     */
    rects: [
      { x: 7, y: 0, width: 13, height: 9, rx: 1, fill: 'var(--uni-color-brand-primary)' },
    ],
    usage: 'Qualidade e configurações',
  },
  theater: {
    figmaName: 'ico-theater',
    figmaNode: '18:1305',
    width: 20,
    height: 14,
    shapes: [
      { d: 'M20 0 L0 0 L0 14 L20 14 L20 0 Z M18 2 L2 2 L2 12 L18 12 L18 2 Z', evenOdd: true },
    ],
    usage: 'Modo cinema',
  },
  tv: {
    figmaName: 'ico-tv',
    figmaNode: '18:1302',
    width: 22,
    height: 18,
    shapes: [
      {
        d: 'M1 0 C0.447693 0 0 0.447754 0 1 L0 4 C0 4.55228 0.447715 5 1 5 C1.55228 5 2 4.55228 2 4 L2 3 C2 2.44772 2.44772 2 3 2 L19 2 C19.5523 2 20 2.44772 20 3 L20 15 C20 15.5523 19.5523 16 19 16 L14 16 C13.4477 16 13 16.4477 13 17 C13 17.5523 13.4477 18 14 18 L21 18 C21.5523 18 22 17.5522 22 17 L22 1 C22 0.447754 21.5523 0 21 0 L1 0 Z M8.94525 17.0016 C9.00583 17.5506 9.44771 18 10 18 C10.5523 18 11.0048 17.5508 10.9552 17.0007 C10.48 11.723 6.277 7.52001 0.999256 7.04478 C0.449196 6.99524 0 7.44772 0 8 C0 8.55229 0.449446 8.99417 0.998398 9.05475 C5.17131 9.5153 8.4847 12.8288 8.94525 17.0016 Z M6 18 C6.55228 18 7.0075 17.5497 6.92953 17.003 C6.49202 13.9349 4.0651 11.508 0.997031 11.0705 C0.450278 10.9925 0 11.4477 0 12 C0 12.5523 0.452226 12.9896 0.993616 13.0987 C2.95791 13.4948 4.50523 15.0421 4.90128 17.0064 C5.01043 17.5478 5.44771 18 6 18 Z M0 16 C0 15.4477 0.460005 14.9837 0.981892 15.1644 C1.84887 15.4646 2.53544 16.1512 2.83561 17.0181 C3.01631 17.54 2.55228 18 2 18 L1 18 C0.447715 18 0 17.5523 0 17 L0 16 Z',
        evenOdd: true,
      },
    ],
    usage: 'Transmitir para a TV',
  },
  fullscreen: {
    figmaName: 'ico-fullscreen',
    figmaNode: '18:1301',
    width: 16,
    height: 16,
    shapes: [
      { d: 'M16 0 L10 0 L10 2 L14 2 L14 6 L16 6 L16 0 Z' },
      { d: 'M16 10 L14 10 L14 14 L10 14 L10 16 L16 16 L16 10 Z' },
      { d: 'M2 6 L2 2 L6 2 L6 0 L0 0 L0 6 L2 6 Z' },
      { d: 'M0 10 L0 16 L6 16 L6 14 L2 14 L2 10 L0 10 Z' },
    ],
    usage: 'Tela cheia',
  },
  info: {
    figmaName: 'ico-info',
    figmaNode: '18:1317',
    width: 20,
    height: 20,
    shapes: [
      {
        d: 'M20 10 C20 15.5228 15.5228 20 10 20 C4.47717 20 0 15.5228 0 10 C0 4.47717 4.47717 0 10 0 C15.5228 0 20 4.47717 20 10 Z M11 4 L11 6 L9 6 L9 4 L11 4 Z M11 16 L11 8 L9 8 L9 16 L11 16 Z',
        evenOdd: true,
      },
    ],
    usage: 'Informações do vídeo, no canto superior direito',
  },
} as const satisfies Record<string, UniPlayerGlyphDefinition>;

/**
 * Nome de um glifo de controle do reprodutor.
 */
export type UniPlayerGlyphName = keyof typeof uniPlayerGlyphs;

/**
 * Todos os nomes de glifo de controle, na ordem de declaração.
 */
export const uniPlayerGlyphNames = Object.keys(uniPlayerGlyphs) as UniPlayerGlyphName[];
