/**
 * Tokens de Tipografia do Design System ChatGPT.
 *
 * Espelho em TypeScript dos 13 estilos de texto publicados no Figma.
 * Família única Inter; pesos 400 (Regular), 500 (Medium) e 600 (Semi Bold).
 */

/**
 * Nomes dos estilos de texto oficiais.
 */
export type GptTextStyleName =
  | 'displayXl'
  | 'displayLg'
  | 'headingH1'
  | 'headingH2'
  | 'headingH3'
  | 'bodyLg'
  | 'bodyMd'
  | 'bodySm'
  | 'bodyXs'
  | 'labelLg'
  | 'labelMd'
  | 'labelSm'
  | 'caption';

/**
 * Definição de um estilo de texto.
 */
export interface GptTextStyle {
  /** Nome do estilo no Figma */
  figmaName: string;
  /** Tamanho da fonte em px */
  fontSize: number;
  /** Altura de linha em px, ou `'auto'` quando o Figma usa altura automática */
  lineHeight: number | 'auto';
  /** Peso da fonte */
  fontWeight: 400 | 500 | 600;
}

/**
 * Família tipográfica oficial.
 */
export const gptFontFamily = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

/**
 * Escala tipográfica completa.
 */
export const gptTextStyles: Record<GptTextStyleName, GptTextStyle> = {
  displayXl: { figmaName: 'Display/XL', fontSize: 128, lineHeight: 'auto', fontWeight: 400 },
  displayLg: { figmaName: 'Display/LG', fontSize: 64, lineHeight: 72, fontWeight: 400 },
  headingH1: { figmaName: 'Heading/H1', fontSize: 48, lineHeight: 56, fontWeight: 600 },
  headingH2: { figmaName: 'Heading/H2', fontSize: 24, lineHeight: 32, fontWeight: 600 },
  headingH3: { figmaName: 'Heading/H3', fontSize: 18, lineHeight: 28, fontWeight: 600 },
  bodyLg: { figmaName: 'Body/LG', fontSize: 18, lineHeight: 28, fontWeight: 400 },
  bodyMd: { figmaName: 'Body/MD', fontSize: 16, lineHeight: 24, fontWeight: 400 },
  bodySm: { figmaName: 'Body/SM', fontSize: 14, lineHeight: 20, fontWeight: 400 },
  bodyXs: { figmaName: 'Body/XS', fontSize: 12, lineHeight: 16, fontWeight: 400 },
  labelLg: { figmaName: 'Label/LG', fontSize: 16, lineHeight: 24, fontWeight: 600 },
  labelMd: { figmaName: 'Label/MD', fontSize: 14, lineHeight: 20, fontWeight: 600 },
  labelSm: { figmaName: 'Label/SM', fontSize: 12, lineHeight: 16, fontWeight: 600 },
  caption: { figmaName: 'Caption', fontSize: 11, lineHeight: 14, fontWeight: 400 },
};
