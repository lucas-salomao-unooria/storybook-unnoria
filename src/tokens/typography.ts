/**
 * Tokens de Tipografia extraídos do Figma - Conversa UI System
 * Todos os nomes, descrições e comentários estão em Português Brasileiro.
 */

export const fontFamilies = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export const fontSizes = {
  xs: '10px',     // 0.625rem - Especificações técnicas e legendas pequenas
  sm: '11px',     // 0.6875rem - Metadados e timestamps
  md: '12px',     // 0.75rem - Rótulos, badges e tags
  base: '13px',   // 0.8125rem - Texto de corpo compacto
  lg: '14px',     // 0.875rem - Texto de corpo padrão
  xl: '15px',     // 0.9375rem - Títulos de conversas e usuários
  '2xl': '24px',  // 1.5rem - Cabeçalhos
  '3xl': '28px',  // 1.75rem - Título de seção
  '4xl': '40px',  // 2.5rem - Display principal
} as const;

export const lineHeights = {
  xs: '14px',
  sm: '15px',
  md: '17px',
  base: '18px',
  lg: '20px',
  xl: '21px',
  '2xl': '34px',
  '3xl': '39px',
  '4xl': '56px',
} as const;

export const letterSpacings = {
  tight: '-0.01em',
  normal: '0px',
  wide: '0.02em',
} as const;

export interface TypographyStyle {
  name: string;
  role: string;
  description: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  fontWeightName: string;
  fontFamily: string;
  sampleText: string;
}

export const typographyStyles: Record<string, TypographyStyle> = {
  display: {
    name: 'Display',
    role: 'display',
    description: 'Usado para títulos de alto impacto visual e capas',
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    fontWeight: fontWeights.semibold,
    fontWeightName: 'Semi Bold (600)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Conversa UI',
  },
  sectionTitle: {
    name: 'Section Title',
    role: 'sectionTitle',
    description: 'Usado para títulos de seções principais da aplicação',
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    fontWeight: fontWeights.semibold,
    fontWeightName: 'Semi Bold (600)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Typography',
  },
  heading: {
    name: 'Heading',
    role: 'heading',
    description: 'Usado para títulos de chats, grupos e cabeçalhos de visualização',
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    fontWeight: fontWeights.semibold,
    fontWeightName: 'Semi Bold (600)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Chats',
  },
  chatTitle: {
    name: 'Chat title',
    role: 'chatTitle',
    description: 'Usado para nomes de contatos e títulos da lista de conversas',
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.semibold,
    fontWeightName: 'Semi Bold (600)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Maya Chen',
  },
  body: {
    name: 'Body',
    role: 'body',
    description: 'Usado para o conteúdo principal de mensagens do chat',
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.regular,
    fontWeightName: 'Regular (400)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Perfect — see you at 12:30.',
  },
  bodyCompact: {
    name: 'Body compact',
    role: 'bodyCompact',
    description: 'Usado para prévias de mensagens e textos em listas densas',
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.regular,
    fontWeightName: 'Regular (400)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Final screens are up',
  },
  label: {
    name: 'Label',
    role: 'label',
    description: 'Usado para badges, status de não lidas e botões de ação',
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.medium,
    fontWeightName: 'Medium (500)',
    fontFamily: fontFamilies.sans,
    sampleText: 'UNREAD',
  },
  metadata: {
    name: 'Metadata',
    role: 'metadata',
    description: 'Usado para horários, timestamps e detalhes secundários',
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.regular,
    fontWeightName: 'Regular (400)',
    fontFamily: fontFamilies.sans,
    sampleText: 'Today at 09:41',
  },
  spec: {
    name: 'Spec / Caption',
    role: 'spec',
    description: 'Usado para especificações técnicas e legendas informativas',
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.regular,
    fontWeightName: 'Regular (400)',
    fontFamily: fontFamilies.sans,
    sampleText: '40px / 56px',
  },
} as const;

export const typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  styles: typographyStyles,
} as const;

export default typography;
