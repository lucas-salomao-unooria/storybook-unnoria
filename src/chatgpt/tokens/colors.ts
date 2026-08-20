/**
 * Tokens de Cores do Design System ChatGPT.
 *
 * Espelho em TypeScript das coleções de variáveis do Figma
 * "ChatGPT UI Kit (AI Chat) (Community)" — `Primitives/Colors` (modo Default)
 * e `Semantic/Colors` (modos Light e Dark).
 */

/**
 * Temas suportados nativamente pelo Design System ChatGPT.
 */
export type GptTheme = 'light' | 'dark';

/**
 * Paleta primitiva (`Primitives/Colors`) — invariante entre temas.
 */
export const gptPrimitiveColors = {
  black: '#000000',
  white: '#FFFFFF',
  gray50: '#F9F9FA',
  gray100: '#F7F9FB',
  gray200: '#E0E0E0',
  gray400: '#9F9FFB',
  gray600: '#303030',
  gray800: '#1C1C1C',
  gray900: '#111111',
  purple400: '#ADADFB',
  purple500: '#9F9FF8',
  purple600: '#5856D6',
  purple700: '#9759FF',
  blue400: '#4C98FD',
  blue500: '#007AFF',
  blue600: '#3FA4FF',
  green500: '#34C759',
  green600: '#1AC69C',
  red500: '#FF4747',
  red600: '#E60019',
  orange400: '#FFAC60',
  orange500: '#FF5700',
  yellow500: '#FFDB56',
  pink400: '#C478FF',
  pink500: '#FF32C6',
} as const;

/**
 * Conjunto semântico (`Semantic/Colors`) que muda entre Light e Dark.
 */
export interface GptSemanticColors {
  /** Superfície principal da aplicação (bg/primary) */
  bgPrimary: string;
  /** Superfície de apoio — barra lateral e trilhos (bg/secondary) */
  bgSecondary: string;
  /** Superfície terciária — blocos sutis e código (bg/tertiary) */
  bgTertiary: string;
  /** Superfície invertida — botões sólidos e avatar do assistente (bg/inverse) */
  bgInverse: string;
  /** Superfície de marca (bg/brand) */
  bgBrand: string;
  /** Texto de alto contraste (text/primary) */
  textPrimary: string;
  /** Texto de apoio (text/secondary) */
  textSecondary: string;
  /** Texto terciário (text/tertiary) */
  textTertiary: string;
  /** Texto sobre superfície invertida (text/inverse) */
  textInverse: string;
  /** Texto de marca (text/brand) */
  textBrand: string;
  /** Texto de link (text/link) */
  textLink: string;
  /** Borda padrão de campos e cartões (border/default) */
  borderDefault: string;
  /** Borda de alto contraste (border/strong) */
  borderStrong: string;
  /** Borda de marca — campo em foco (border/brand) */
  borderBrand: string;
  /** Ação primária (interactive/primary) */
  interactivePrimary: string;
  /** Ação primária em hover (interactive/hover) */
  interactiveHover: string;
  /** Ação secundária (interactive/secondary) */
  interactiveSecondary: string;
  /** Estado de sucesso (status/success) */
  statusSuccess: string;
  /** Estado de erro (status/error) */
  statusError: string;
  /** Estado de atenção (status/warning) */
  statusWarning: string;
  /** Estado informativo (status/info) */
  statusInfo: string;
}

/**
 * Paleta semântica no modo Light.
 */
export const gptLightColors: GptSemanticColors = {
  bgPrimary: gptPrimitiveColors.white,
  bgSecondary: gptPrimitiveColors.gray50,
  bgTertiary: gptPrimitiveColors.gray100,
  bgInverse: gptPrimitiveColors.black,
  bgBrand: gptPrimitiveColors.purple600,
  textPrimary: gptPrimitiveColors.black,
  textSecondary: gptPrimitiveColors.gray600,
  textTertiary: gptPrimitiveColors.gray800,
  textInverse: gptPrimitiveColors.white,
  textBrand: gptPrimitiveColors.purple600,
  textLink: gptPrimitiveColors.blue500,
  borderDefault: gptPrimitiveColors.gray200,
  borderStrong: gptPrimitiveColors.black,
  borderBrand: gptPrimitiveColors.purple600,
  interactivePrimary: gptPrimitiveColors.purple600,
  interactiveHover: gptPrimitiveColors.purple700,
  interactiveSecondary: gptPrimitiveColors.blue500,
  statusSuccess: gptPrimitiveColors.green500,
  statusError: gptPrimitiveColors.red500,
  statusWarning: gptPrimitiveColors.orange500,
  statusInfo: gptPrimitiveColors.blue500,
};

/**
 * Paleta semântica no modo Dark.
 */
export const gptDarkColors: GptSemanticColors = {
  bgPrimary: gptPrimitiveColors.gray800,
  bgSecondary: gptPrimitiveColors.gray600,
  bgTertiary: gptPrimitiveColors.gray900,
  bgInverse: gptPrimitiveColors.white,
  bgBrand: gptPrimitiveColors.purple500,
  textPrimary: gptPrimitiveColors.white,
  textSecondary: gptPrimitiveColors.gray200,
  textTertiary: gptPrimitiveColors.purple400,
  textInverse: gptPrimitiveColors.black,
  textBrand: gptPrimitiveColors.purple500,
  textLink: gptPrimitiveColors.blue400,
  borderDefault: gptPrimitiveColors.gray600,
  borderStrong: gptPrimitiveColors.white,
  borderBrand: gptPrimitiveColors.purple500,
  interactivePrimary: gptPrimitiveColors.purple500,
  interactiveHover: gptPrimitiveColors.purple600,
  interactiveSecondary: gptPrimitiveColors.blue400,
  statusSuccess: gptPrimitiveColors.green500,
  statusError: gptPrimitiveColors.red500,
  statusWarning: gptPrimitiveColors.orange400,
  statusInfo: gptPrimitiveColors.blue400,
};

/**
 * Índice das paletas semânticas por tema.
 */
export const gptColorsByTheme: Record<GptTheme, GptSemanticColors> = {
  light: gptLightColors,
  dark: gptDarkColors,
};

/**
 * Overlays publicados como estilos de pintura `Overlay/*` — invariantes de tema.
 */
export const gptOverlays = {
  black4: 'rgba(0, 0, 0, 0.04)',
  black10: 'rgba(0, 0, 0, 0.1)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black40: 'rgba(0, 0, 0, 0.4)',
  black80: 'rgba(0, 0, 0, 0.8)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white40: 'rgba(255, 255, 255, 0.4)',
  white80: 'rgba(255, 255, 255, 0.8)',
} as const;

/**
 * Variável CSS correspondente a cada token semântico.
 */
export const gptSemanticCssVars: Record<keyof GptSemanticColors, string> = {
  bgPrimary: '--gpt-bg-primary',
  bgSecondary: '--gpt-bg-secondary',
  bgTertiary: '--gpt-bg-tertiary',
  bgInverse: '--gpt-bg-inverse',
  bgBrand: '--gpt-bg-brand',
  textPrimary: '--gpt-text-primary',
  textSecondary: '--gpt-text-secondary',
  textTertiary: '--gpt-text-tertiary',
  textInverse: '--gpt-text-inverse',
  textBrand: '--gpt-text-brand',
  textLink: '--gpt-text-link',
  borderDefault: '--gpt-border-default',
  borderStrong: '--gpt-border-strong',
  borderBrand: '--gpt-border-brand',
  interactivePrimary: '--gpt-interactive-primary',
  interactiveHover: '--gpt-interactive-hover',
  interactiveSecondary: '--gpt-interactive-secondary',
  statusSuccess: '--gpt-status-success',
  statusError: '--gpt-status-error',
  statusWarning: '--gpt-status-warning',
  statusInfo: '--gpt-status-info',
};

/**
 * Nome da variável no Figma (coleção `Semantic/Colors`) para cada token.
 */
export const gptSemanticFigmaNames: Record<keyof GptSemanticColors, string> = {
  bgPrimary: 'bg/primary',
  bgSecondary: 'bg/secondary',
  bgTertiary: 'bg/tertiary',
  bgInverse: 'bg/inverse',
  bgBrand: 'bg/brand',
  textPrimary: 'text/primary',
  textSecondary: 'text/secondary',
  textTertiary: 'text/tertiary',
  textInverse: 'text/inverse',
  textBrand: 'text/brand',
  textLink: 'text/link',
  borderDefault: 'border/default',
  borderStrong: 'border/strong',
  borderBrand: 'border/brand',
  interactivePrimary: 'interactive/primary',
  interactiveHover: 'interactive/hover',
  interactiveSecondary: 'interactive/secondary',
  statusSuccess: 'status/success',
  statusError: 'status/error',
  statusWarning: 'status/warning',
  statusInfo: 'status/info',
};

/**
 * Variável CSS de cada primitiva de `Primitives/Colors`.
 */
export const gptPrimitiveCssVars: Record<keyof typeof gptPrimitiveColors, string> = {
  black: '--gpt-color-black',
  white: '--gpt-color-white',
  gray50: '--gpt-color-gray-50',
  gray100: '--gpt-color-gray-100',
  gray200: '--gpt-color-gray-200',
  gray400: '--gpt-color-gray-400',
  gray600: '--gpt-color-gray-600',
  gray800: '--gpt-color-gray-800',
  gray900: '--gpt-color-gray-900',
  purple400: '--gpt-color-purple-400',
  purple500: '--gpt-color-purple-500',
  purple600: '--gpt-color-purple-600',
  purple700: '--gpt-color-purple-700',
  blue400: '--gpt-color-blue-400',
  blue500: '--gpt-color-blue-500',
  blue600: '--gpt-color-blue-600',
  green500: '--gpt-color-green-500',
  green600: '--gpt-color-green-600',
  red500: '--gpt-color-red-500',
  red600: '--gpt-color-red-600',
  orange400: '--gpt-color-orange-400',
  orange500: '--gpt-color-orange-500',
  yellow500: '--gpt-color-yellow-500',
  pink400: '--gpt-color-pink-400',
  pink500: '--gpt-color-pink-500',
};

/**
 * Nome da variável no Figma (coleção `Primitives/Colors`) para cada primitiva.
 */
export const gptPrimitiveFigmaNames: Record<keyof typeof gptPrimitiveColors, string> = {
  black: 'color/black',
  white: 'color/white',
  gray50: 'color/gray/50',
  gray100: 'color/gray/100',
  gray200: 'color/gray/200',
  gray400: 'color/gray/400',
  gray600: 'color/gray/600',
  gray800: 'color/gray/800',
  gray900: 'color/gray/900',
  purple400: 'color/purple/400',
  purple500: 'color/purple/500',
  purple600: 'color/purple/600',
  purple700: 'color/purple/700',
  blue400: 'color/blue/400',
  blue500: 'color/blue/500',
  blue600: 'color/blue/600',
  green500: 'color/green/500',
  green600: 'color/green/600',
  red500: 'color/red/500',
  red600: 'color/red/600',
  orange400: 'color/orange/400',
  orange500: 'color/orange/500',
  yellow500: 'color/yellow/500',
  pink400: 'color/pink/400',
  pink500: 'color/pink/500',
};

/**
 * Escadas translúcidas usadas pelos componentes, com o valor de cada tema.
 *
 * As superfícies (`fill-*`) e os textos (`text-soft-*`) aparecem no arquivo
 * de design como preenchimentos literais de preto com opacidade, sem vínculo
 * com variável. São espelhados em branco no modo Dark, seguindo a inversão
 * declarada em `Semantic/Colors`.
 */
export const gptTranslucentScale = [
  { cssVar: '--gpt-fill-2', light: 'rgba(0, 0, 0, 0.02)', dark: 'rgba(255, 255, 255, 0.02)', usage: 'NavItem em hover, hover de cartões' },
  { cssVar: '--gpt-fill-4', light: 'rgba(0, 0, 0, 0.04)', dark: 'rgba(255, 255, 255, 0.04)', usage: 'NavItem ativo, Badge default, Tag default, SearchInput, ChatBubble do usuário' },
  { cssVar: '--gpt-fill-8', light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.08)', usage: 'Contorno de GPTCard e FeatureCard' },
  { cssVar: '--gpt-fill-10', light: 'rgba(0, 0, 0, 0.1)', dark: 'rgba(255, 255, 255, 0.1)', usage: 'Divider, contorno do ChatInput' },
  { cssVar: '--gpt-text-soft-30', light: 'rgba(0, 0, 0, 0.3)', dark: 'rgba(255, 255, 255, 0.3)', usage: 'Texto do Input desabilitado' },
  { cssVar: '--gpt-text-soft-40', light: 'rgba(0, 0, 0, 0.4)', dark: 'rgba(255, 255, 255, 0.4)', usage: 'Placeholders e rótulo de seção da Sidebar' },
  { cssVar: '--gpt-text-soft-50', light: 'rgba(0, 0, 0, 0.5)', dark: 'rgba(255, 255, 255, 0.5)', usage: 'Descrições de cartão, valor de SettingsRow, fechar do Modal' },
  { cssVar: '--gpt-text-soft-60', light: 'rgba(0, 0, 0, 0.6)', dark: 'rgba(255, 255, 255, 0.6)', usage: 'NavItem em repouso' },
  { cssVar: '--gpt-text-soft-70', light: 'rgba(0, 0, 0, 0.7)', dark: 'rgba(255, 255, 255, 0.7)', usage: 'Corpo do Modal e itens de rodapé da Sidebar' },
  { cssVar: '--gpt-text-soft-80', light: 'rgba(0, 0, 0, 0.8)', dark: 'rgba(255, 255, 255, 0.8)', usage: 'NavItem em hover' },
] as const;
