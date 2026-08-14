/**
 * Tokens de Elevação e Sombras (Elevation Tokens)
 * Plataforma Unooria - Extraído do Figma (Node 6188:6091)
 */

export type ElevationCategory = 'Brand' | 'Semantic' | 'Neutral';

export interface ElevationTokenDetail {
  name: string;
  category: ElevationCategory;
  boxShadow: string;
  cssVar: string;
  backdropFilter?: string;
}

export const unooriaElevation: Record<string, ElevationTokenDetail> = {
  // Brand
  brandPrimary: {
    name: 'Shadow Primary',
    category: 'Brand',
    boxShadow: '0px 0px 10px 0px rgba(127, 165, 226, 0.3)',
    cssVar: '--unooria-elevation-brand-primary',
  },
  brandSecondary: {
    name: 'Shadow Secondary',
    category: 'Brand',
    boxShadow: '0px 0px 10px 0px rgba(14, 16, 57, 0.3)',
    cssVar: '--unooria-elevation-brand-secondary',
  },

  // Semantic
  semanticDanger: {
    name: 'Shadow Danger',
    category: 'Semantic',
    boxShadow: '0px 0px 10px 0px rgba(227, 26, 26, 0.3)',
    cssVar: '--unooria-elevation-semantic-danger',
  },
  semanticWarning: {
    name: 'Shadow Warning',
    category: 'Semantic',
    boxShadow: '0px 0px 10px 0px rgba(127, 165, 226, 0.3)',
    cssVar: '--unooria-elevation-semantic-warning',
  },
  semanticSuccess: {
    name: 'Shadow Success',
    category: 'Semantic',
    boxShadow: '0px 0px 10px 0px rgba(1, 181, 116, 0.3)',
    cssVar: '--unooria-elevation-semantic-success',
  },
  semanticInfo: {
    name: 'Shadow Info',
    category: 'Semantic',
    boxShadow: '0px 0px 10px 0px rgba(0, 134, 255, 0.3)',
    cssVar: '--unooria-elevation-semantic-info',
  },

  // Neutral
  neutral1: {
    name: 'Shadow Neutral 1',
    category: 'Neutral',
    boxShadow: '0px 0px 5px 1px rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(4px)',
    cssVar: '--unooria-elevation-neutral-1',
  },
  neutral2: {
    name: 'Shadow Neutral 2',
    category: 'Neutral',
    boxShadow: '0px 0px 8px 4px rgba(255, 255, 255, 0.1)',
    cssVar: '--unooria-elevation-neutral-2',
  },
  neutral3: {
    name: 'Shadow Neutral 3',
    category: 'Neutral',
    boxShadow: '0px 0px 8px 4px rgba(255, 255, 255, 0.2)',
    cssVar: '--unooria-elevation-neutral-3',
  },
  neutral4: {
    name: 'Shadow Neutral 4',
    category: 'Neutral',
    boxShadow: '0px 0px 8px 4px rgba(255, 255, 255, 0.3)',
    cssVar: '--unooria-elevation-neutral-4',
  },
  neutral5: {
    name: 'Shadow Neutral 5',
    category: 'Neutral',
    boxShadow: '0px 0px 8px 4px rgba(255, 255, 255, 0.4)',
    cssVar: '--unooria-elevation-neutral-5',
  },
  neutral6: {
    name: 'Shadow Neutral 6',
    category: 'Neutral',
    boxShadow: '0px 0px 8px 4px rgba(255, 255, 255, 0.5)',
    cssVar: '--unooria-elevation-neutral-6',
  },
} as const;

export const elevation = unooriaElevation;

export type UnooriaElevationKey = keyof typeof unooriaElevation;
export type UnooriaElevationTokens = typeof unooriaElevation;
export type UnooriaElevationValue = typeof unooriaElevation[UnooriaElevationKey];

export default unooriaElevation;
