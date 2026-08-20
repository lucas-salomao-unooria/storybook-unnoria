/**
 * Tokens de Cores do Design System Instanooria.
 * Extraídos diretamente das variáveis do Figma "Instagram UI Screens (Community)".
 * Suporta os modos semânticos Classic (Light) e Dark.
 */

/**
 * Temas suportados nativamente pelo Design System Instanooria.
 */
export type InstaTheme = 'light' | 'dark';

/**
 * Conjunto semântico de cores que muda entre os temas Light e Dark.
 */
export interface InstaColorTokens {
  /** Fundo principal da tela (color/background/primary) */
  backgroundPrimary: string;
  /** Fundo de barras de navegação e superfícies de apoio (color/background/secondary) */
  backgroundSecondary: string;
  /** Fundo de cápsulas, contadores e blocos sutis (color/background/tertiary) */
  backgroundTertiary: string;
  /** Fundo de camadas elevadas (menus, sheets) (color/background/elevated) */
  backgroundElevated: string;
  /** Texto de alto contraste (color/text/primary) */
  textPrimary: string;
  /** Texto de apoio, timestamps e legendas (color/text/secondary) */
  textSecondary: string;
  /** Texto de link, menções e hashtags (color/text/link) */
  textLink: string;
  /** Placeholder de campos de entrada */
  textPlaceholder: string;
  /** Ícone principal (color/icon/primary) */
  iconPrimary: string;
  /** Ícone secundário / inativo (color/icon/secondary) */
  iconSecondary: string;
  /** Borda padrão de campos e botões (color/border/default) */
  borderDefault: string;
  /** Divisor hairline entre linhas de lista (color/border/subtle) */
  borderSubtle: string;
  /** Borda de barras superiores e inferiores */
  borderBar: string;
  /** Cor de ação primária (color/action/primary) */
  actionPrimary: string;
  /** Cor de ação primária desabilitada (color/action/disabled) */
  actionDisabled: string;
  /** Borda de botões secundários */
  actionSecondaryBorder: string;
  /** Preenchimento translúcido de campos de busca */
  fillField: string;
  /** Scrim aplicado sobre mídia para leitura de texto */
  overlayScrim: string;
  /** Traço translúcido sobre mídia (composer de story) */
  overlayOnMedia: string;
}

/**
 * Paleta do tema Classic (Light Mode).
 */
export const instaLightColors: InstaColorTokens = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#FAFAFA',
  backgroundTertiary: '#F8F8F8',
  backgroundElevated: '#FFFFFF',
  textPrimary: '#262626',
  textSecondary: '#8E8E93',
  textLink: '#3897F0',
  textPlaceholder: 'rgba(60, 60, 67, 0.6)',
  iconPrimary: '#262626',
  iconSecondary: '#8E8E93',
  borderDefault: '#C7C7CC',
  borderSubtle: 'rgba(60, 60, 67, 0.29)',
  borderBar: '#A6A6AA',
  actionPrimary: '#3897F0',
  actionDisabled: '#9FC4F2',
  actionSecondaryBorder: '#DBDBDB',
  fillField: 'rgba(118, 118, 128, 0.12)',
  overlayScrim: 'rgba(0, 0, 0, 0.3)',
  overlayOnMedia: 'rgba(255, 255, 255, 0.4)',
};

/**
 * Paleta do tema Dark Mode.
 */
export const instaDarkColors: InstaColorTokens = {
  backgroundPrimary: '#000000',
  backgroundSecondary: '#060606',
  backgroundTertiary: '#121212',
  backgroundElevated: '#262626',
  textPrimary: '#F9F9F9',
  textSecondary: '#979797',
  textLink: '#3797EF',
  textPlaceholder: 'rgba(235, 235, 245, 0.6)',
  iconPrimary: '#F9F9F9',
  iconSecondary: '#979797',
  borderDefault: '#3C3C43',
  borderSubtle: '#48484A',
  borderBar: '#262626',
  actionPrimary: '#3797EF',
  actionDisabled: '#9FC4F2',
  actionSecondaryBorder: '#363636',
  fillField: 'rgba(118, 118, 128, 0.24)',
  overlayScrim: 'rgba(0, 0, 0, 0.3)',
  overlayOnMedia: 'rgba(255, 255, 255, 0.4)',
};

/**
 * Nome da variável CSS correspondente a cada token semântico.
 */
export const instaColorCssVars: Record<keyof InstaColorTokens, string> = {
  backgroundPrimary: '--insta-color-background-primary',
  backgroundSecondary: '--insta-color-background-secondary',
  backgroundTertiary: '--insta-color-background-tertiary',
  backgroundElevated: '--insta-color-background-elevated',
  textPrimary: '--insta-color-text-primary',
  textSecondary: '--insta-color-text-secondary',
  textLink: '--insta-color-text-link',
  textPlaceholder: '--insta-color-text-placeholder',
  iconPrimary: '--insta-color-icon-primary',
  iconSecondary: '--insta-color-icon-secondary',
  borderDefault: '--insta-color-border-default',
  borderSubtle: '--insta-color-border-subtle',
  borderBar: '--insta-color-border-bar',
  actionPrimary: '--insta-color-action-primary',
  actionDisabled: '--insta-color-action-disabled',
  actionSecondaryBorder: '--insta-color-action-secondary-border',
  fillField: '--insta-color-fill-field',
  overlayScrim: '--insta-color-overlay-scrim',
  overlayOnMedia: '--insta-color-overlay-onmedia',
};

/**
 * Nome semântico original de cada token no Figma.
 */
export const instaColorFigmaNames: Partial<Record<keyof InstaColorTokens, string>> = {
  backgroundPrimary: 'color/background/primary',
  backgroundSecondary: 'color/background/secondary',
  backgroundTertiary: 'color/background/tertiary',
  backgroundElevated: 'color/background/elevated',
  textPrimary: 'color/text/primary',
  textSecondary: 'color/text/secondary',
  textLink: 'color/text/link',
  iconPrimary: 'color/icon/primary',
  iconSecondary: 'color/icon/secondary',
  borderDefault: 'color/border/default',
  borderSubtle: 'color/border/subtle',
  actionPrimary: 'color/action/primary',
  actionDisabled: 'color/action/disabled',
};

/**
 * Cores de marca invariantes entre temas (feedback, selos e gradientes).
 */
export const instaBrandColors = {
  /** Vermelho do coração curtido e do indicador de notificação */
  like: '#ED4956',
  /** Azul do selo de conta oficial */
  verified: '#3897F0',
  /** Vermelho do badge de notificação */
  notification: '#ED4956',
  /** Anel neutro dos destaques (Highlights) */
  highlightRing: '#C7C7CC',
  /** Recorte branco interno dos anéis */
  ringInner: '#FEFEFE',
} as const;

/**
 * Paradas cromáticas dos gradientes oficiais do Instanooria.
 */
export const instaGradients = {
  /** Anel de story não visualizado */
  story: ['#FBAA47', '#D91A46', '#A60F93'] as const,
  /** Anel de transmissão ao vivo */
  live: ['#E20337', '#C60188', '#7700C3'] as const,
  /** Etiqueta LIVE */
  liveBadge: ['#C90083', '#D22463', '#E10038'] as const,
} as const;

/**
 * Mapa completo dos temas disponíveis.
 */
export const instaColorThemes: Record<InstaTheme, InstaColorTokens> = {
  light: instaLightColors,
  dark: instaDarkColors,
};
