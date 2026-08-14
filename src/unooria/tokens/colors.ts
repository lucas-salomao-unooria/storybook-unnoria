/**
 * Tokens de Cores - Design System Plataforma Unooria
 * Extraídos diretamente das especificações do Figma.
 */

/** Cores Primárias - Brand Navy (Azul/Navy Institucional) / Primary Color */
export const brandNavy = {
  50: '#F5F8FC',
  100: '#E8EFFA',
  200: '#D3E0F5',
  300: '#BDD0EF',
  400: '#A4BDE9',
  500: '#8FAFE5',
  600: '#7FA5E2', // Cor Base Primária (#7FA5E2)
  700: '#6487C2',
  800: '#49699F',
  900: '#2F4F7F',
  950: '#0e1039',
} as const;

/** Overlays / Opacidade de Primary Color (Transparência baseada em #7FA5E2 / rgb(127, 165, 226)) */
export const brandNavyOverlay = {
  50: 'rgba(127, 165, 226, 0.05)',
  100: 'rgba(127, 165, 226, 0.10)',
  200: 'rgba(127, 165, 226, 0.20)',
  300: 'rgba(127, 165, 226, 0.30)',
  400: 'rgba(127, 165, 226, 0.40)',
  500: 'rgba(127, 165, 226, 0.50)',
  600: 'rgba(127, 165, 226, 0.60)',
  700: 'rgba(127, 165, 226, 0.70)',
  800: 'rgba(127, 165, 226, 0.80)',
  900: 'rgba(127, 165, 226, 0.90)',
} as const;

/** Aliases para compatibilidade */
export const brandBlue = brandNavy;
export const brandBlueOverlay = brandNavyOverlay;

/** Cores Secundárias - Brand Purple (Roxo Institucional) / Secondary Color */
export const brandPurple = {
  50: '#F7F6FA',
  100: '#EFEEF5',
  200: '#DFDDEB',
  300: '#CCC9DE',
  400: '#AAA5C2',
  500: '#8B85AC',
  600: '#716C98', // Cor Base Secundária (#716C98)
  700: '#57547D',
  800: '#34375C',
  900: '#0E1039',
  950: '#080922',
} as const;

/** Overlays / Opacidade de Secondary Color (Transparência baseada em #0E1039) */
export const brandPurpleOverlay = {
  50: 'rgba(14, 16, 57, 0.05)',
  100: 'rgba(14, 16, 57, 0.10)',
  200: 'rgba(14, 16, 57, 0.20)',
  300: 'rgba(14, 16, 57, 0.30)',
  400: 'rgba(14, 16, 57, 0.40)',
  500: 'rgba(14, 16, 57, 0.50)',
  600: 'rgba(14, 16, 57, 0.60)',
  700: 'rgba(14, 16, 57, 0.70)',
  800: 'rgba(14, 16, 57, 0.80)',
  900: 'rgba(14, 16, 57, 0.90)',
} as const;

/** Cores Laranja / Brand Orange (Legado) */
export const brandOrange = {
  50: '#FFF6ED',
  100: '#FEEAD6',
  200: '#FDD1AB',
  300: '#FBB076',
  400: '#F8833F',
  500: '#F5631A',
  600: '#E84910',
  700: '#BF340F',
  800: '#982B14',
  900: '#7A2614',
  950: '#421008',
} as const;

export const brandOrangeOverlay = {
  50: 'rgba(232, 73, 16, 0.05)',
  100: 'rgba(232, 73, 16, 0.10)',
  200: 'rgba(232, 73, 16, 0.20)',
  300: 'rgba(232, 73, 16, 0.30)',
  400: 'rgba(232, 73, 16, 0.40)',
  500: 'rgba(232, 73, 16, 0.50)',
  600: 'rgba(232, 73, 16, 0.60)',
  700: 'rgba(232, 73, 16, 0.70)',
  800: 'rgba(232, 73, 16, 0.80)',
  900: 'rgba(232, 73, 16, 0.90)',
} as const;

/** Cores Neutras (Modo Claro / Light Mode Scale) */
export const neutral = {
  50: '#FFFFFF',
  100: '#F5F5F5',
  150: '#E4E8E9',
  200: '#CBD4D6',
  300: '#A7B5B9',
  400: '#7C8E94',
  500: '#617379',
  600: '#536167',
  700: '#475157',
  800: '#3D4448',
  900: '#383E41',
  950: '#22272A',
} as const;

/** Overlays Neutros Modo Claro (Light Overlay - Transparência baseada em #FFFFFF) */
export const neutralLightOverlay = {
  50: 'rgba(255, 255, 255, 0.05)',
  100: 'rgba(255, 255, 255, 0.10)',
  200: 'rgba(255, 255, 255, 0.20)',
  300: 'rgba(255, 255, 255, 0.30)',
  400: 'rgba(255, 255, 255, 0.40)',
  500: 'rgba(255, 255, 255, 0.50)',
  600: 'rgba(255, 255, 255, 0.60)',
  700: 'rgba(255, 255, 255, 0.70)',
  800: 'rgba(255, 255, 255, 0.80)',
  900: 'rgba(255, 255, 255, 0.90)',
} as const;

/** Cores Neutras (Modo Escuro / Dark Mode Scale) */
export const neutralDark = {
  50: '#22272A',
  100: '#22272A',
  150: '#A7B5B9',
  200: '#3D4448',
  300: '#475157',
  400: '#536167',
  500: '#617379',
  600: '#536167',
  700: '#7C8E94',
  800: '#A7B5B9',
  900: '#CBD4D6',
  950: '#F5F5F5',
} as const;

/** Overlays Neutros Modo Escuro (Dark Overlay - Transparência baseada em #22272A) */
export const neutralDarkOverlay = {
  50: 'rgba(34, 39, 42, 0.05)',
  100: 'rgba(34, 39, 42, 0.10)',
  200: 'rgba(34, 39, 42, 0.20)',
  300: 'rgba(34, 39, 42, 0.30)',
  400: 'rgba(34, 39, 42, 0.40)',
  500: 'rgba(34, 39, 42, 0.50)',
  600: 'rgba(34, 39, 42, 0.60)',
  700: 'rgba(34, 39, 42, 0.70)',
  800: 'rgba(34, 39, 42, 0.80)',
  900: 'rgba(34, 39, 42, 0.90)',
} as const;

/** Cores de Feedback - Danger / Perigo (Erros e Condições Críticas) */
export const danger = {
  50: '#FFF1F1',
  100: '#FFE1E1',
  200: '#FFC7C7',
  300: '#FFA1A1',
  400: '#FF6A6A',
  500: '#F83B3B',
  600: '#E31A1A', // Cor Base
  700: '#C11414',
  800: '#9F1515',
  900: '#841818',
} as const;

/** Overlays de Danger (Transparência baseada em #E31A1A) */
export const dangerOverlay = {
  50: 'rgba(227, 26, 26, 0.05)',
  100: 'rgba(227, 26, 26, 0.10)',
  200: 'rgba(227, 26, 26, 0.20)',
  300: 'rgba(227, 26, 26, 0.30)',
  400: 'rgba(227, 26, 26, 0.40)',
  500: 'rgba(227, 26, 26, 0.50)',
  600: 'rgba(227, 26, 26, 0.60)',
  700: 'rgba(227, 26, 26, 0.70)',
  800: 'rgba(227, 26, 26, 0.80)',
  900: 'rgba(227, 26, 26, 0.90)',
} as const;

/** Cores de Feedback - Success / Sucesso (Ações Concluídas) */
export const success = {
  50: '#EBFEF4',
  100: '#CDFEE4',
  200: '#A0FACE',
  300: '#63F2B5',
  400: '#26E197',
  500: '#01B574', // Cor Base
  600: '#00A369',
  700: '#008257',
  800: '#006746',
  900: '#00543C',
} as const;

/** Overlays de Success (Transparência baseada em #01B574) */
export const successOverlay = {
  50: 'rgba(1, 181, 116, 0.05)',
  100: 'rgba(1, 181, 116, 0.10)',
  200: 'rgba(1, 181, 116, 0.20)',
  300: 'rgba(1, 181, 116, 0.30)',
  400: 'rgba(1, 181, 116, 0.40)',
  500: 'rgba(1, 181, 116, 0.50)',
  600: 'rgba(1, 181, 116, 0.60)',
  700: 'rgba(1, 181, 116, 0.70)',
  800: 'rgba(1, 181, 116, 0.80)',
  900: 'rgba(1, 181, 116, 0.90)',
} as const;

/** Cores de Feedback - Warning / Aviso (Recomendações e Precauções) */
export const warning = {
  50: '#FFF8EB',
  100: '#FFEBC6',
  200: '#FFD388',
  300: '#FFB74A',
  400: '#FF9C20',
  500: '#F97607', // Cor Base
  600: '#DD5202',
  700: '#B73506',
  800: '#94280C',
  900: '#7A230D',
} as const;

/** Overlays de Warning (Transparência baseada em #F97607) */
export const warningOverlay = {
  50: 'rgba(249, 118, 7, 0.05)',
  100: 'rgba(249, 118, 7, 0.10)',
  200: 'rgba(249, 118, 7, 0.20)',
  300: 'rgba(249, 118, 7, 0.30)',
  400: 'rgba(249, 118, 7, 0.40)',
  500: 'rgba(249, 118, 7, 0.50)',
  600: 'rgba(249, 118, 7, 0.60)',
  700: 'rgba(249, 118, 7, 0.70)',
  800: 'rgba(249, 118, 7, 0.80)',
  900: 'rgba(249, 118, 7, 0.90)',
} as const;

/** Cores de Feedback - Info / Informação (Orientações e Status) */
export const info = {
  50: '#E9FAFF',
  100: '#A7EEFF',
  200: '#6BE7FF',
  300: '#26D4FF',
  400: '#00B0FF',
  500: '#0086FF', // Cor Base
  600: '#006BFF',
  700: '#005CE6',
  800: '#0052B3',
  900: '#002752',
} as const;

/** Overlays de Info (Transparência baseada em #0086FF) */
export const infoOverlay = {
  50: 'rgba(0, 134, 255, 0.05)',
  100: 'rgba(0, 134, 255, 0.10)',
  200: 'rgba(0, 134, 255, 0.20)',
  300: 'rgba(0, 134, 255, 0.30)',
  400: 'rgba(0, 134, 255, 0.40)',
  500: 'rgba(0, 134, 255, 0.50)',
  600: 'rgba(0, 134, 255, 0.60)',
  700: 'rgba(0, 134, 255, 0.70)',
  800: 'rgba(0, 134, 255, 0.80)',
  900: 'rgba(0, 134, 255, 0.90)',
} as const;

/** Gradientes do Design System */
export const gradients = {
  1: 'linear-gradient(225deg, rgba(87, 84, 125, 1) 0%, rgba(113, 108, 152, 1) 5%, rgba(127, 165, 226, 1) 54%, rgba(143, 175, 229, 1) 72%, rgba(164, 189, 233, 1) 89%, rgba(189, 208, 239, 1) 100%)',
  2: 'linear-gradient(224deg, rgba(239, 238, 245, 1) 0%, rgba(170, 165, 194, 1) 35%, rgba(167, 181, 185, 1) 60%, rgba(189, 208, 239, 1) 84%)',
  3: 'radial-gradient(circle at 50% 50%, rgba(0, 134, 255, 0.12) 0%, rgba(14, 16, 57, 0.02) 100%)',
  4: 'radial-gradient(circle at 50% 50%, rgba(248, 59, 59, 0.12) 0%, rgba(227, 26, 26, 0.01) 100%)',
  5: 'radial-gradient(circle at 50% 50%, rgba(127, 165, 226, 0.15) 0%, rgba(249, 118, 7, 0.02) 100%)',
  6: 'radial-gradient(circle at 50% 50%, rgba(1, 181, 116, 0.12) 0%, rgba(1, 181, 116, 0.01) 100%)',
} as const;

/** Coleção Completa dos Tokens de Cores Plataforma Unooria */
export const unooriaColors = {
  brandOrange,
  brandOrangeOverlay,
  brandBlue,
  brandBlueOverlay,
  neutral,
  neutralLightOverlay,
  neutralDark,
  neutralDarkOverlay,
  danger,
  dangerOverlay,
  success,
  successOverlay,
  warning,
  warningOverlay,
  info,
  infoOverlay,
  gradients,
} as const;

/** Tipagens TypeScript dos Tokens de Cores */
export type BrandOrangeTokens = typeof brandOrange;
export type BrandOrangeOverlayTokens = typeof brandOrangeOverlay;
export type BrandBlueTokens = typeof brandBlue;
export type BrandBlueOverlayTokens = typeof brandBlueOverlay;
export type NeutralTokens = typeof neutral;
export type NeutralLightOverlayTokens = typeof neutralLightOverlay;
export type NeutralDarkTokens = typeof neutralDark;
export type NeutralDarkOverlayTokens = typeof neutralDarkOverlay;
export type DangerTokens = typeof danger;
export type DangerOverlayTokens = typeof dangerOverlay;
export type SuccessTokens = typeof success;
export type SuccessOverlayTokens = typeof successOverlay;
export type WarningTokens = typeof warning;
export type WarningOverlayTokens = typeof warningOverlay;
export type InfoTokens = typeof info;
export type InfoOverlayTokens = typeof infoOverlay;
export type GradientTokens = typeof gradients;
export type UnooriaColorTokens = typeof unooriaColors;
