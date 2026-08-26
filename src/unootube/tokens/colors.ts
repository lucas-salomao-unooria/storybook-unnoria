/**
 * Tokens de Cores do Design System Unootube.
 *
 * Espelho TypeScript de `colors.css`. Os valores foram extraídos do arquivo
 * Figma "YouTube UI Clone Design (Community)" (fileKey
 * `HcbrbLtDZ1rMEvSjoXpA5c`), página `🎨 Design System` (`104:3087`). As
 * primitivas e os nove tokens semânticos são declarados pelo próprio arquivo;
 * os demais foram lidos do preenchimento literal do nó indicado em `figmaNode`.
 */

/**
 * Modos de tema publicados pelo arquivo.
 *
 * O arquivo publica **apenas o escuro**: o quadro semântico se intitula
 * "SEMANTIC TOKENS (DARK MODE)" e o cabeçalho da página declara "Dark theme
 * first". Nenhum valor claro foi inventado — ver o registro de desvios na
 * estória de Cores.
 */
export type UniTheme = 'dark';

/**
 * Descrição de um token de cor com rastreabilidade até o Figma.
 */
export interface UniColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor hexadecimal ou funcional */
  value: string;
  /** Uso original no arquivo de design */
  usage: string;
  /** Node do Figma em que o valor foi lido */
  figmaNode?: string;
  /** Nome do token publicado no arquivo, quando houver */
  figmaToken?: string;
}

/**
 * Primitivas neutras (quadro `PRIMITIVES — NEUTRALS`, node `106:2957`).
 *
 * Nunca aplicadas diretamente em componente: servem de origem para os aliases
 * semânticos.
 */
export const uniNeutralColors: Record<string, UniColorToken> = {
  white: { cssVar: '--uni-color-white', value: '#FFFFFF', usage: 'Texto principal e pílula ativa', figmaNode: '106:2958', figmaToken: 'white' },
  black: { cssVar: '--uni-color-black', value: '#000000', usage: 'Cápsula de duração e botão de microfone', figmaNode: '106:2962', figmaToken: 'black' },
  neutral50: { cssVar: '--uni-color-neutral-50', value: '#F8F8F8', usage: 'Cor de espera da capa de canal', figmaNode: '106:2966', figmaToken: 'neutral/50' },
  neutral100: { cssVar: '--uni-color-neutral-100', value: '#F1F2F1', usage: 'Selo HD do reprodutor', figmaNode: '106:2970', figmaToken: 'neutral/100' },
  neutral200: { cssVar: '--uni-color-neutral-200', value: '#EAEAEA', usage: 'Contorno publicado e glifos do reprodutor', figmaNode: '106:2974', figmaToken: 'neutral/200' },
  neutral300: { cssVar: '--uni-color-neutral-300', value: '#C4C4C4', usage: 'Texto terciário', figmaNode: '106:2978', figmaToken: 'neutral/300' },
  neutral400: { cssVar: '--uni-color-neutral-400', value: '#AAAAAA', usage: 'Texto secundário e sublinhado de aba ativa', figmaNode: '106:2982', figmaToken: 'neutral/400' },
  neutral500: { cssVar: '--uni-color-neutral-500', value: '#303030', usage: 'Superfície interativa e divisores', figmaNode: '106:2986', figmaToken: 'neutral/500' },
  neutral600: { cssVar: '--uni-color-neutral-600', value: '#212121', usage: 'Barras de navegação', figmaNode: '106:2990', figmaToken: 'neutral/600' },
  neutral700: { cssVar: '--uni-color-neutral-700', value: '#181818', usage: 'Fundo principal da página', figmaNode: '106:2994', figmaToken: 'neutral/700' },
  neutral800: { cssVar: '--uni-color-neutral-800', value: '#121212', usage: 'Interior do campo de busca', figmaNode: '106:2998', figmaToken: 'neutral/800' },
  neutral900: { cssVar: '--uni-color-neutral-900', value: '#030303', usage: 'Rótulo sobre a pílula ativa', figmaNode: '106:3002', figmaToken: 'neutral/900' },
};

/**
 * Primitivas da marca (quadro `PRIMITIVES — RED (BRAND)`, node `106:3007`)
 * e de acento (`106:3025`).
 *
 * O arquivo publica **quatro vermelhos distintos** e os usa em contextos
 * diferentes. É proibido consolidá-los em um único token.
 */
export const uniBrandColors: Record<string, UniColorToken> = {
  red500: { cssVar: '--uni-color-red-500', value: '#EE1A26', usage: 'Vermelho semântico da marca, chamadas para ação', figmaNode: '106:3008', figmaToken: 'red/500' },
  red600: { cssVar: '--uni-color-red-600', value: '#FC0D1C', usage: 'Trecho reproduzido da linha do tempo', figmaNode: '106:3012', figmaToken: 'red/600' },
  red700: { cssVar: '--uni-color-red-700', value: '#CC0000', usage: 'Botão de inscrição', figmaNode: '106:3016', figmaToken: 'red/700' },
  red800: { cssVar: '--uni-color-red-800', value: '#FF0000', usage: 'Emblema do logotipo', figmaNode: '106:3020', figmaToken: 'red/800' },
  blue400: { cssVar: '--uni-color-blue-400', value: '#9EBFD0', usage: 'Cor de espera do quadro de vídeo', figmaNode: '106:3026', figmaToken: 'blue/400' },
};

/**
 * Tokens semânticos declarados pelo arquivo (`106:3031` a `106:3066`).
 *
 * Todo componente deve consumir **estes**, nunca as primitivas.
 */
export const uniSemanticColors: Record<string, UniColorToken> = {
  backgroundPrimary: { cssVar: '--uni-color-background-primary', value: '#181818', usage: 'Fundo principal da página', figmaNode: '106:3032', figmaToken: 'color/background/primary' },
  backgroundSecondary: { cssVar: '--uni-color-background-secondary', value: '#212121', usage: 'Cartões e superfícies elevadas', figmaNode: '106:3036', figmaToken: 'color/background/secondary' },
  backgroundSurface: { cssVar: '--uni-color-background-surface', value: '#303030', usage: 'Superfícies interativas e campos', figmaNode: '106:3040', figmaToken: 'color/background/surface' },
  textPrimary: { cssVar: '--uni-color-text-primary', value: '#FFFFFF', usage: 'Títulos e conteúdo principal', figmaNode: '106:3044', figmaToken: 'color/text/primary' },
  textSecondary: { cssVar: '--uni-color-text-secondary', value: '#AAAAAA', usage: 'Metadados e descrições', figmaNode: '106:3048', figmaToken: 'color/text/secondary' },
  textTertiary: { cssVar: '--uni-color-text-tertiary', value: '#C4C4C4', usage: 'Rótulos sutis', figmaNode: '106:3052', figmaToken: 'color/text/tertiary' },
  brandPrimary: { cssVar: '--uni-color-brand-primary', value: '#EE1A26', usage: 'Vermelho da marca, chamadas para ação', figmaNode: '106:3056', figmaToken: 'color/brand/primary' },
  borderDefault: { cssVar: '--uni-color-border-default', value: '#EAEAEA', usage: 'Contorno de cartão publicado', figmaNode: '106:3060', figmaToken: 'color/border/default' },
  borderSubtle: { cssVar: '--uni-color-border-subtle', value: '#303030', usage: 'Divisores e separadores', figmaNode: '106:3064', figmaToken: 'color/border/subtle' },
};

/**
 * Aliases derivados de preenchimento literal de nó.
 *
 * O arquivo usa estes valores em componente, mas não os declara na lista de
 * tokens semânticos. Foram tokenizados para que nenhum componente cite
 * primitiva diretamente.
 */
export const uniDerivedColors: Record<string, UniColorToken> = {
  backgroundField: { cssVar: '--uni-color-background-field', value: '#121212', usage: 'Interior do campo de busca', figmaNode: '7:49' },
  backgroundInverseDeep: { cssVar: '--uni-color-background-inverse-deep', value: '#000000', usage: 'Botão circular de microfone', figmaNode: '7:49' },
  surfaceInverse: { cssVar: '--uni-color-surface-inverse', value: '#FFFFFF', usage: 'Pílula ativa do menu superior', figmaNode: '10:545' },
  textInverse: { cssVar: '--uni-color-text-inverse', value: '#030303', usage: 'Rótulo sobre a pílula ativa', figmaNode: '10:545' },
  brandSubscribe: { cssVar: '--uni-color-brand-subscribe', value: '#CC0000', usage: 'Botão de inscrição', figmaNode: '17:2796' },
  brandProgress: { cssVar: '--uni-color-brand-progress', value: '#FC0D1C', usage: 'Trecho reproduzido da linha do tempo', figmaNode: '18:1295' },
  brandLogo: { cssVar: '--uni-color-brand-logo', value: '#FF0000', usage: 'Emblema do logotipo', figmaNode: '2:88' },
  playerChrome: { cssVar: '--uni-color-player-chrome', value: '#EAEAEA', usage: 'Glifos e relógio do reprodutor', figmaNode: '18:1295' },
  playerGlyphOutline: { cssVar: '--uni-color-player-glyph-outline', value: 'rgba(0, 0, 0, 0.1)', usage: 'Contorno de 1px dos glifos de controle do reprodutor', figmaNode: '18:1295' },
  playerTrack: { cssVar: '--uni-color-player-track', value: 'rgba(234, 234, 234, 0.2)', usage: 'Trilho não carregado da linha do tempo', figmaNode: '18:1295' },
  playerBuffer: { cssVar: '--uni-color-player-buffer', value: 'rgba(234, 234, 234, 0.5)', usage: 'Trecho carregado da linha do tempo', figmaNode: '18:1295' },
  overlayDuration: { cssVar: '--uni-color-overlay-duration', value: '#000000', usage: 'Cápsula de duração sobre a miniatura', figmaNode: '11:997' },
  posterPlaceholder: { cssVar: '--uni-color-poster-placeholder', value: '#9EBFD0', usage: 'Cor de espera do quadro de vídeo', figmaNode: '18:1295' },
  borderActive: { cssVar: '--uni-color-border-active', value: '#AAAAAA', usage: 'Sublinhado de aba ativa e contorno da pílula inativa', figmaNode: '17:2796' },
};

/**
 * Véus lineares do reprodutor (node `18:1295`, grupo `shadows`).
 *
 * São dois retângulos de 96px de altura com `GRADIENT_LINEAR` de preto para
 * transparente, um no topo e outro na base do quadro.
 */
export const uniPlayerGradients: Record<string, UniColorToken> = {
  playerTop: { cssVar: '--uni-gradient-player-top', value: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)', usage: 'Véu superior do reprodutor', figmaNode: '18:1295' },
  playerBottom: { cssVar: '--uni-gradient-player-bottom', value: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)', usage: 'Véu inferior do reprodutor', figmaNode: '18:1295' },
};

/**
 * Todos os tokens de cor da marca, em um único registro.
 */
export const uniColors = {
  ...uniNeutralColors,
  ...uniBrandColors,
  ...uniSemanticColors,
  ...uniDerivedColors,
  ...uniPlayerGradients,
};
