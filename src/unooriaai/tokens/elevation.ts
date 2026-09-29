/**
 * Tokens de Elevação do Design System UnooriaAI.
 *
 * Espelho TypeScript de `elevation.css`. A superfície é plana; a sombra existe
 * só em sobreposição e muda por tema (`--unooria-elevation-*`).
 */
import type { UaiTheme } from './colors';

/**
 * Sombras de sobreposição por tema, prontas para `box-shadow`.
 */
export const uaiElevationThemes: Record<UaiTheme, { overlay: string; modal: string; knob: string }> = {
  light: {
    overlay: "0px 0px 10px 0px rgba(14, 16, 57, 0.3)",
    modal: "0px 0px 10px 0px rgba(14, 16, 57, 0.3)",
    knob: "0px 0px 10px 0px rgba(14, 16, 57, 0.3)",
  },
  dark: {
    overlay: "0px 0px 8px 4px rgba(255, 255, 255, 0.1)",
    modal: "0px 0px 8px 4px rgba(255, 255, 255, 0.1)",
    knob: "0px 0px 5px 1px rgba(255, 255, 255, 0.1)",
  },
};

/**
 * Sombras de sobreposição no tema claro.
 */
export const uaiElevation = uaiElevationThemes.light;

/**
 * Nome da variável CSS, uso e origem de cada sombra.
 */
export const uaiElevationTokens = {
  overlay: { cssVar: '--uai-elevation-overlay', usage: "Diálogos, menus e avisos", unooria: { light: '--unooria-elevation-brand-secondary', dark: '--unooria-elevation-neutral-2' } },
  modal: { cssVar: '--uai-elevation-modal', usage: "Superfície do diálogo", unooria: { light: '--unooria-elevation-brand-secondary', dark: '--unooria-elevation-neutral-2' } },
  knob: { cssVar: '--uai-elevation-knob', usage: "Botão deslizante do controle liga/desliga", unooria: { light: '--unooria-elevation-brand-secondary', dark: '--unooria-elevation-neutral-1' } },
} as const;
