/**
 * Tokens de Cores do Design System WhatsApp UI / Conversa UI.
 * Extraídos diretamente do Figma (Conversa UI - AI Simulation System).
 * Suporta os modos semânticos Light e Dark.
 */

export interface ColorTokens {
  /** Canvas / Fundo geral da página */
  bgCanvas: string;
  /** Superfície / Cards e containers */
  bgSurface: string;
  /** Cor de marca principal */
  bgBrand: string;
  /** Balão de mensagem enviada no chat */
  bgChatSent: string;
  /** Texto principal com alto contraste */
  textPrimary: string;
  /** Texto secundário de apoio */
  textSecondary: string;
  /** Indicador de status online */
  statusOnline: string;
  /** Bordas e divisores */
  border: string;
}

/**
 * Definição dos tokens para o modo claro (Light Mode)
 */
export const lightColors: ColorTokens = {
  bgCanvas: '#F3F5F2',
  bgSurface: '#FFFFFF',
  bgBrand: '#18A87A',
  bgChatSent: '#AFE3D4',
  textPrimary: '#17211E',
  textSecondary: '#697773',
  statusOnline: '#18A87A',
  border: '#DFE5E1',
};

/**
 * Definição dos tokens para o modo escuro (Dark Mode)
 */
export const darkColors: ColorTokens = {
  bgCanvas: '#101816',
  bgSurface: '#17211E',
  bgBrand: '#18A87A',
  bgChatSent: '#0B594D',
  textPrimary: '#FFFFFF',
  textSecondary: '#9BABA5',
  statusOnline: '#53D0AA',
  border: '#697773',
};

/**
 * Nomes semânticos do Figma correspondentes aos tokens
 */
export const semanticColorNames: Record<keyof ColorTokens, string> = {
  bgCanvas: 'color/bg/canvas',
  bgSurface: 'color/bg/surface',
  bgBrand: 'color/bg/brand',
  bgChatSent: 'color/bg/chat-sent',
  textPrimary: 'color/text/primary',
  textSecondary: 'color/text/secondary',
  statusOnline: 'color/status/online',
  border: 'color/border',
};

/**
 * Mapeamento para as variáveis CSS correspondentes
 */
export const cssVariableNames: Record<keyof ColorTokens, string> = {
  bgCanvas: '--color-bg-canvas',
  bgSurface: '--color-bg-surface',
  bgBrand: '--color-bg-brand',
  bgChatSent: '--color-bg-chat-sent',
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  statusOnline: '--color-status-online',
  border: '--color-border',
};

/**
 * Objeto consolidado exportando os tokens de cores
 */
export const colorTokens = {
  light: lightColors,
  dark: darkColors,
  semanticNames: semanticColorNames,
  cssVariables: cssVariableNames,
};

export default colorTokens;
