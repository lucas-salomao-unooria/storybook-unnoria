import React from 'react';

/**
 * Tokens de Cores do Design System WhatsApp UI / Conversa UI.
 * Extraídos diretamente do Figma (Conversa UI - AI Simulation System).
 * Suporta os modos semânticos Light e Dark.
 */
interface ColorTokens {
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
declare const lightColors: ColorTokens;
/**
 * Definição dos tokens para o modo escuro (Dark Mode)
 */
declare const darkColors: ColorTokens;
/**
 * Nomes semânticos do Figma correspondentes aos tokens
 */
declare const semanticColorNames: Record<keyof ColorTokens, string>;
/**
 * Mapeamento para as variáveis CSS correspondentes
 */
declare const cssVariableNames: Record<keyof ColorTokens, string>;
/**
 * Objeto consolidado exportando os tokens de cores
 */
declare const colorTokens: {
    light: ColorTokens;
    dark: ColorTokens;
    semanticNames: Record<keyof ColorTokens, string>;
    cssVariables: Record<keyof ColorTokens, string>;
};

/**
 * Tokens de Tipografia extraídos do Figma - WhatsApp UI / Conversa UI System
 */
declare const fontFamilies$1: {
    readonly sans: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
    readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
};
declare const fontWeights$1: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
};
declare const fontSizes$1: {
    readonly xs: "10px";
    readonly sm: "11px";
    readonly md: "12px";
    readonly base: "13px";
    readonly lg: "14px";
    readonly xl: "15px";
    readonly '2xl': "24px";
    readonly '3xl': "28px";
    readonly '4xl': "40px";
};
declare const lineHeights$1: {
    readonly xs: "14px";
    readonly sm: "15px";
    readonly md: "17px";
    readonly base: "18px";
    readonly lg: "20px";
    readonly xl: "21px";
    readonly '2xl': "34px";
    readonly '3xl': "39px";
    readonly '4xl': "56px";
};
declare const letterSpacings$1: {
    readonly tight: "-0.01em";
    readonly normal: "0px";
    readonly wide: "0.02em";
};
interface TypographyStyle {
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
declare const typographyStyles$1: Record<string, TypographyStyle>;
declare const typography$1: {
    readonly fontFamilies: {
        readonly sans: "Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    };
    readonly fontWeights: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
    };
    readonly fontSizes: {
        readonly xs: "10px";
        readonly sm: "11px";
        readonly md: "12px";
        readonly base: "13px";
        readonly lg: "14px";
        readonly xl: "15px";
        readonly '2xl': "24px";
        readonly '3xl': "28px";
        readonly '4xl': "40px";
    };
    readonly lineHeights: {
        readonly xs: "14px";
        readonly sm: "15px";
        readonly md: "17px";
        readonly base: "18px";
        readonly lg: "20px";
        readonly xl: "21px";
        readonly '2xl': "34px";
        readonly '3xl': "39px";
        readonly '4xl': "56px";
    };
    readonly letterSpacings: {
        readonly tight: "-0.01em";
        readonly normal: "0px";
        readonly wide: "0.02em";
    };
    readonly styles: Record<string, TypographyStyle>;
};

/**
 * Tokens de Espaçamento e Raio de Borda (Spacing & Radius Tokens)
 * Extraídos diretamente das definições do Figma do Sistema Conversa UI / WhatsApp.
 */
declare const spacing$1: {
    readonly '2xs': "0.25rem";
    readonly xs: "0.5rem";
    readonly sm: "0.75rem";
    readonly md: "1rem";
    readonly lg: "1.5rem";
    readonly xl: "2rem";
};
declare const spacingPx: {
    readonly '2xs': 4;
    readonly xs: 8;
    readonly sm: 12;
    readonly md: 16;
    readonly lg: 24;
    readonly xl: 32;
};
declare const spacingCssVars: {
    readonly '2xs': "var(--spacing-2xs)";
    readonly xs: "var(--spacing-xs)";
    readonly sm: "var(--spacing-sm)";
    readonly md: "var(--spacing-md)";
    readonly lg: "var(--spacing-lg)";
    readonly xl: "var(--spacing-xl)";
};
declare const radius: {
    readonly sm: "4px";
    readonly md: "8px";
    readonly lg: "12px";
    readonly bubble: "18px";
    readonly full: "9999px";
};
declare const radiusPx: {
    readonly sm: 4;
    readonly md: 8;
    readonly lg: 12;
    readonly bubble: 18;
    readonly full: 9999;
};
type SpacingToken = keyof typeof spacing$1;
type RadiusToken = keyof typeof radius;
declare const SPACING_BASE_PX = 4;

/**
 * Módulo Principal do Design System WhatsApp UI / Conversa UI
 */

type index$2_ColorTokens = ColorTokens;
type index$2_RadiusToken = RadiusToken;
declare const index$2_SPACING_BASE_PX: typeof SPACING_BASE_PX;
type index$2_SpacingToken = SpacingToken;
type index$2_TypographyStyle = TypographyStyle;
declare const index$2_colorTokens: typeof colorTokens;
declare const index$2_cssVariableNames: typeof cssVariableNames;
declare const index$2_darkColors: typeof darkColors;
declare const index$2_lightColors: typeof lightColors;
declare const index$2_radius: typeof radius;
declare const index$2_radiusPx: typeof radiusPx;
declare const index$2_semanticColorNames: typeof semanticColorNames;
declare const index$2_spacingCssVars: typeof spacingCssVars;
declare const index$2_spacingPx: typeof spacingPx;
declare namespace index$2 {
  export { type index$2_ColorTokens as ColorTokens, type index$2_RadiusToken as RadiusToken, index$2_SPACING_BASE_PX as SPACING_BASE_PX, type index$2_SpacingToken as SpacingToken, type index$2_TypographyStyle as TypographyStyle, index$2_colorTokens as colorTokens, index$2_cssVariableNames as cssVariableNames, index$2_darkColors as darkColors, fontFamilies$1 as fontFamilies, fontSizes$1 as fontSizes, fontWeights$1 as fontWeights, letterSpacings$1 as letterSpacings, index$2_lightColors as lightColors, lineHeights$1 as lineHeights, index$2_radius as radius, index$2_radiusPx as radiusPx, index$2_semanticColorNames as semanticColorNames, spacing$1 as spacing, index$2_spacingCssVars as spacingCssVars, index$2_spacingPx as spacingPx, typography$1 as typography, typographyStyles$1 as typographyStyles };
}

/**
 * Tokens de Cores - Design System Plataforma Unooria
 * Extraídos diretamente das especificações do Figma.
 */
/** Esquema de cores e temas suportados pela Plataforma Unooria */
type UnooriaTheme = 'light' | 'dark';
/** Cores Primárias - Brand Navy (Azul/Navy Institucional) / Primary Color */
declare const brandNavy: {
    readonly 50: "#F5F8FC";
    readonly 100: "#E8EFFA";
    readonly 200: "#D3E0F5";
    readonly 300: "#BDD0EF";
    readonly 400: "#A4BDE9";
    readonly 500: "#8FAFE5";
    readonly 600: "#7FA5E2";
    readonly 700: "#6487C2";
    readonly 800: "#49699F";
    readonly 900: "#2F4F7F";
    readonly 950: "#0E1039";
};
/** Overlays / Opacidade de Primary Color (Transparência baseada em #7FA5E2 / rgb(127, 165, 226)) */
declare const brandNavyOverlay: {
    readonly 50: "rgba(127, 165, 226, 0.05)";
    readonly 100: "rgba(127, 165, 226, 0.10)";
    readonly 200: "rgba(127, 165, 226, 0.20)";
    readonly 300: "rgba(127, 165, 226, 0.30)";
    readonly 400: "rgba(127, 165, 226, 0.40)";
    readonly 500: "rgba(127, 165, 226, 0.50)";
    readonly 600: "rgba(127, 165, 226, 0.60)";
    readonly 700: "rgba(127, 165, 226, 0.70)";
    readonly 800: "rgba(127, 165, 226, 0.80)";
    readonly 900: "rgba(127, 165, 226, 0.90)";
};
/** Aliases para retrocompatibilidade */
declare const brandBlue: {
    readonly 50: "#F5F8FC";
    readonly 100: "#E8EFFA";
    readonly 200: "#D3E0F5";
    readonly 300: "#BDD0EF";
    readonly 400: "#A4BDE9";
    readonly 500: "#8FAFE5";
    readonly 600: "#7FA5E2";
    readonly 700: "#6487C2";
    readonly 800: "#49699F";
    readonly 900: "#2F4F7F";
    readonly 950: "#0E1039";
};
declare const brandBlueOverlay: {
    readonly 50: "rgba(127, 165, 226, 0.05)";
    readonly 100: "rgba(127, 165, 226, 0.10)";
    readonly 200: "rgba(127, 165, 226, 0.20)";
    readonly 300: "rgba(127, 165, 226, 0.30)";
    readonly 400: "rgba(127, 165, 226, 0.40)";
    readonly 500: "rgba(127, 165, 226, 0.50)";
    readonly 600: "rgba(127, 165, 226, 0.60)";
    readonly 700: "rgba(127, 165, 226, 0.70)";
    readonly 800: "rgba(127, 165, 226, 0.80)";
    readonly 900: "rgba(127, 165, 226, 0.90)";
};
/** Cores Secundárias - Brand Purple (Roxo Institucional) / Secondary Color */
declare const brandPurple: {
    readonly 50: "#F7F6FA";
    readonly 100: "#EFEEF5";
    readonly 200: "#DFDDEB";
    readonly 300: "#CCC9DE";
    readonly 400: "#AAA5C2";
    readonly 500: "#8B85AC";
    readonly 600: "#716C98";
    readonly 700: "#57547D";
    readonly 800: "#34375C";
    readonly 900: "#0E1039";
    readonly 950: "#080922";
};
/** Overlays / Opacidade de Secondary Color (Transparência baseada em #0E1039) */
declare const brandPurpleOverlay: {
    readonly 50: "rgba(14, 16, 57, 0.05)";
    readonly 100: "rgba(14, 16, 57, 0.10)";
    readonly 200: "rgba(14, 16, 57, 0.20)";
    readonly 300: "rgba(14, 16, 57, 0.30)";
    readonly 400: "rgba(14, 16, 57, 0.40)";
    readonly 500: "rgba(14, 16, 57, 0.50)";
    readonly 600: "rgba(14, 16, 57, 0.60)";
    readonly 700: "rgba(14, 16, 57, 0.70)";
    readonly 800: "rgba(14, 16, 57, 0.80)";
    readonly 900: "rgba(14, 16, 57, 0.90)";
};
/** Cores Laranja / Brand Orange (Legado) */
declare const brandOrange: {
    readonly 50: "#FFF6ED";
    readonly 100: "#FEEAD6";
    readonly 200: "#FDD1AB";
    readonly 300: "#FBB076";
    readonly 400: "#F8833F";
    readonly 500: "#F5631A";
    readonly 600: "#E84910";
    readonly 700: "#BF340F";
    readonly 800: "#982B14";
    readonly 900: "#7A2614";
    readonly 950: "#421008";
};
declare const brandOrangeOverlay: {
    readonly 50: "rgba(232, 73, 16, 0.05)";
    readonly 100: "rgba(232, 73, 16, 0.10)";
    readonly 200: "rgba(232, 73, 16, 0.20)";
    readonly 300: "rgba(232, 73, 16, 0.30)";
    readonly 400: "rgba(232, 73, 16, 0.40)";
    readonly 500: "rgba(232, 73, 16, 0.50)";
    readonly 600: "rgba(232, 73, 16, 0.60)";
    readonly 700: "rgba(232, 73, 16, 0.70)";
    readonly 800: "rgba(232, 73, 16, 0.80)";
    readonly 900: "rgba(232, 73, 16, 0.90)";
};
/** Cores Neutras (Modo Claro / Light Mode Scale) */
declare const neutral: {
    readonly 50: "#FFFFFF";
    readonly 100: "#F5F5F5";
    readonly 150: "#E4E8E9";
    readonly 200: "#CBD4D6";
    readonly 300: "#A7B5B9";
    readonly 400: "#7C8E94";
    readonly 500: "#617379";
    readonly 600: "#536167";
    readonly 700: "#475157";
    readonly 800: "#3D4448";
    readonly 900: "#383E41";
    readonly 950: "#22272A";
};
/** Overlays Neutros Modo Claro (Light Overlay - Transparência baseada em #FFFFFF) */
declare const neutralLightOverlay: {
    readonly 50: "rgba(255, 255, 255, 0.05)";
    readonly 100: "rgba(255, 255, 255, 0.10)";
    readonly 200: "rgba(255, 255, 255, 0.20)";
    readonly 300: "rgba(255, 255, 255, 0.30)";
    readonly 400: "rgba(255, 255, 255, 0.40)";
    readonly 500: "rgba(255, 255, 255, 0.50)";
    readonly 600: "rgba(255, 255, 255, 0.60)";
    readonly 700: "rgba(255, 255, 255, 0.70)";
    readonly 800: "rgba(255, 255, 255, 0.80)";
    readonly 900: "rgba(255, 255, 255, 0.90)";
};
/** Cores Neutras (Modo Escuro / Dark Mode Scale) */
declare const neutralDark: {
    readonly 50: "#22272A";
    readonly 100: "#22272A";
    readonly 150: "#A7B5B9";
    readonly 200: "#3D4448";
    readonly 300: "#475157";
    readonly 400: "#536167";
    readonly 500: "#617379";
    readonly 600: "#536167";
    readonly 700: "#7C8E94";
    readonly 800: "#A7B5B9";
    readonly 900: "#CBD4D6";
    readonly 950: "#F5F5F5";
};
/** Overlays Neutros Modo Escuro (Dark Overlay - Transparência baseada em #22272A) */
declare const neutralDarkOverlay: {
    readonly 50: "rgba(34, 39, 42, 0.05)";
    readonly 100: "rgba(34, 39, 42, 0.10)";
    readonly 200: "rgba(34, 39, 42, 0.20)";
    readonly 300: "rgba(34, 39, 42, 0.30)";
    readonly 400: "rgba(34, 39, 42, 0.40)";
    readonly 500: "rgba(34, 39, 42, 0.50)";
    readonly 600: "rgba(34, 39, 42, 0.60)";
    readonly 700: "rgba(34, 39, 42, 0.70)";
    readonly 800: "rgba(34, 39, 42, 0.80)";
    readonly 900: "rgba(34, 39, 42, 0.90)";
};
/** Cores de Feedback - Danger / Perigo (Erros e Condições Críticas) */
declare const danger: {
    readonly 50: "#FFF1F1";
    readonly 100: "#FFE1E1";
    readonly 200: "#FFC7C7";
    readonly 300: "#FFA1A1";
    readonly 400: "#FF6A6A";
    readonly 500: "#F83B3B";
    readonly 600: "#E31A1A";
    readonly 700: "#C11414";
    readonly 800: "#9F1515";
    readonly 900: "#841818";
};
/** Overlays de Danger (Transparência baseada em #E31A1A) */
declare const dangerOverlay: {
    readonly 50: "rgba(227, 26, 26, 0.05)";
    readonly 100: "rgba(227, 26, 26, 0.10)";
    readonly 200: "rgba(227, 26, 26, 0.20)";
    readonly 300: "rgba(227, 26, 26, 0.30)";
    readonly 400: "rgba(227, 26, 26, 0.40)";
    readonly 500: "rgba(227, 26, 26, 0.50)";
    readonly 600: "rgba(227, 26, 26, 0.60)";
    readonly 700: "rgba(227, 26, 26, 0.70)";
    readonly 800: "rgba(227, 26, 26, 0.80)";
    readonly 900: "rgba(227, 26, 26, 0.90)";
};
/** Cores de Feedback - Success / Sucesso (Ações Concluídas) */
declare const success: {
    readonly 50: "#EBFEF4";
    readonly 100: "#CDFEE4";
    readonly 200: "#A0FACE";
    readonly 300: "#63F2B5";
    readonly 400: "#26E197";
    readonly 500: "#01B574";
    readonly 600: "#00A369";
    readonly 700: "#008257";
    readonly 800: "#006746";
    readonly 900: "#00543C";
};
/** Overlays de Success (Transparência baseada em #01B574) */
declare const successOverlay: {
    readonly 50: "rgba(1, 181, 116, 0.05)";
    readonly 100: "rgba(1, 181, 116, 0.10)";
    readonly 200: "rgba(1, 181, 116, 0.20)";
    readonly 300: "rgba(1, 181, 116, 0.30)";
    readonly 400: "rgba(1, 181, 116, 0.40)";
    readonly 500: "rgba(1, 181, 116, 0.50)";
    readonly 600: "rgba(1, 181, 116, 0.60)";
    readonly 700: "rgba(1, 181, 116, 0.70)";
    readonly 800: "rgba(1, 181, 116, 0.80)";
    readonly 900: "rgba(1, 181, 116, 0.90)";
};
/** Cores de Feedback - Warning / Aviso (Recomendações e Precauções) */
declare const warning: {
    readonly 50: "#FFF8EB";
    readonly 100: "#FFEBC6";
    readonly 200: "#FFD388";
    readonly 300: "#FFB74A";
    readonly 400: "#FF9C20";
    readonly 500: "#F97607";
    readonly 600: "#DD5202";
    readonly 700: "#B73506";
    readonly 800: "#94280C";
    readonly 900: "#7A230D";
};
/** Overlays de Warning (Transparência baseada em #F97607) */
declare const warningOverlay: {
    readonly 50: "rgba(249, 118, 7, 0.05)";
    readonly 100: "rgba(249, 118, 7, 0.10)";
    readonly 200: "rgba(249, 118, 7, 0.20)";
    readonly 300: "rgba(249, 118, 7, 0.30)";
    readonly 400: "rgba(249, 118, 7, 0.40)";
    readonly 500: "rgba(249, 118, 7, 0.50)";
    readonly 600: "rgba(249, 118, 7, 0.60)";
    readonly 700: "rgba(249, 118, 7, 0.70)";
    readonly 800: "rgba(249, 118, 7, 0.80)";
    readonly 900: "rgba(249, 118, 7, 0.90)";
};
/** Cores de Feedback - Info / Informação (Orientações e Status) */
declare const info: {
    readonly 50: "#E9FAFF";
    readonly 100: "#A7EEFF";
    readonly 200: "#6BE7FF";
    readonly 300: "#26D4FF";
    readonly 400: "#00B0FF";
    readonly 500: "#0086FF";
    readonly 600: "#006BFF";
    readonly 700: "#005CE6";
    readonly 800: "#0052B3";
    readonly 900: "#002752";
};
/** Overlays de Info (Transparência baseada em #0086FF) */
declare const infoOverlay: {
    readonly 50: "rgba(0, 134, 255, 0.05)";
    readonly 100: "rgba(0, 134, 255, 0.10)";
    readonly 200: "rgba(0, 134, 255, 0.20)";
    readonly 300: "rgba(0, 134, 255, 0.30)";
    readonly 400: "rgba(0, 134, 255, 0.40)";
    readonly 500: "rgba(0, 134, 255, 0.50)";
    readonly 600: "rgba(0, 134, 255, 0.60)";
    readonly 700: "rgba(0, 134, 255, 0.70)";
    readonly 800: "rgba(0, 134, 255, 0.80)";
    readonly 900: "rgba(0, 134, 255, 0.90)";
};
/** Gradientes do Design System */
declare const gradients: {
    readonly 1: "linear-gradient(225deg, rgba(87, 84, 125, 1) 0%, rgba(113, 108, 152, 1) 5%, rgba(127, 165, 226, 1) 54%, rgba(143, 175, 229, 1) 72%, rgba(164, 189, 233, 1) 89%, rgba(189, 208, 239, 1) 100%)";
    readonly 2: "linear-gradient(224deg, rgba(239, 238, 245, 1) 0%, rgba(170, 165, 194, 1) 35%, rgba(167, 181, 185, 1) 60%, rgba(189, 208, 239, 1) 84%)";
    readonly 3: "radial-gradient(circle at 50% 50%, rgba(0, 134, 255, 0.12) 0%, rgba(14, 16, 57, 0.02) 100%)";
    readonly 4: "radial-gradient(circle at 50% 50%, rgba(248, 59, 59, 0.12) 0%, rgba(227, 26, 26, 0.01) 100%)";
    readonly 5: "radial-gradient(circle at 50% 50%, rgba(127, 165, 226, 0.15) 0%, rgba(249, 118, 7, 0.02) 100%)";
    readonly 6: "radial-gradient(circle at 50% 50%, rgba(1, 181, 116, 0.12) 0%, rgba(1, 181, 116, 0.01) 100%)";
};
/** Coleção Completa dos Tokens de Cores Plataforma Unooria */
declare const unooriaColors: {
    readonly brandNavy: {
        readonly 50: "#F5F8FC";
        readonly 100: "#E8EFFA";
        readonly 200: "#D3E0F5";
        readonly 300: "#BDD0EF";
        readonly 400: "#A4BDE9";
        readonly 500: "#8FAFE5";
        readonly 600: "#7FA5E2";
        readonly 700: "#6487C2";
        readonly 800: "#49699F";
        readonly 900: "#2F4F7F";
        readonly 950: "#0E1039";
    };
    readonly brandNavyOverlay: {
        readonly 50: "rgba(127, 165, 226, 0.05)";
        readonly 100: "rgba(127, 165, 226, 0.10)";
        readonly 200: "rgba(127, 165, 226, 0.20)";
        readonly 300: "rgba(127, 165, 226, 0.30)";
        readonly 400: "rgba(127, 165, 226, 0.40)";
        readonly 500: "rgba(127, 165, 226, 0.50)";
        readonly 600: "rgba(127, 165, 226, 0.60)";
        readonly 700: "rgba(127, 165, 226, 0.70)";
        readonly 800: "rgba(127, 165, 226, 0.80)";
        readonly 900: "rgba(127, 165, 226, 0.90)";
    };
    readonly brandPurple: {
        readonly 50: "#F7F6FA";
        readonly 100: "#EFEEF5";
        readonly 200: "#DFDDEB";
        readonly 300: "#CCC9DE";
        readonly 400: "#AAA5C2";
        readonly 500: "#8B85AC";
        readonly 600: "#716C98";
        readonly 700: "#57547D";
        readonly 800: "#34375C";
        readonly 900: "#0E1039";
        readonly 950: "#080922";
    };
    readonly brandPurpleOverlay: {
        readonly 50: "rgba(14, 16, 57, 0.05)";
        readonly 100: "rgba(14, 16, 57, 0.10)";
        readonly 200: "rgba(14, 16, 57, 0.20)";
        readonly 300: "rgba(14, 16, 57, 0.30)";
        readonly 400: "rgba(14, 16, 57, 0.40)";
        readonly 500: "rgba(14, 16, 57, 0.50)";
        readonly 600: "rgba(14, 16, 57, 0.60)";
        readonly 700: "rgba(14, 16, 57, 0.70)";
        readonly 800: "rgba(14, 16, 57, 0.80)";
        readonly 900: "rgba(14, 16, 57, 0.90)";
    };
    readonly brandBlue: {
        readonly 50: "#F5F8FC";
        readonly 100: "#E8EFFA";
        readonly 200: "#D3E0F5";
        readonly 300: "#BDD0EF";
        readonly 400: "#A4BDE9";
        readonly 500: "#8FAFE5";
        readonly 600: "#7FA5E2";
        readonly 700: "#6487C2";
        readonly 800: "#49699F";
        readonly 900: "#2F4F7F";
        readonly 950: "#0E1039";
    };
    readonly brandBlueOverlay: {
        readonly 50: "rgba(127, 165, 226, 0.05)";
        readonly 100: "rgba(127, 165, 226, 0.10)";
        readonly 200: "rgba(127, 165, 226, 0.20)";
        readonly 300: "rgba(127, 165, 226, 0.30)";
        readonly 400: "rgba(127, 165, 226, 0.40)";
        readonly 500: "rgba(127, 165, 226, 0.50)";
        readonly 600: "rgba(127, 165, 226, 0.60)";
        readonly 700: "rgba(127, 165, 226, 0.70)";
        readonly 800: "rgba(127, 165, 226, 0.80)";
        readonly 900: "rgba(127, 165, 226, 0.90)";
    };
    readonly brandOrange: {
        readonly 50: "#FFF6ED";
        readonly 100: "#FEEAD6";
        readonly 200: "#FDD1AB";
        readonly 300: "#FBB076";
        readonly 400: "#F8833F";
        readonly 500: "#F5631A";
        readonly 600: "#E84910";
        readonly 700: "#BF340F";
        readonly 800: "#982B14";
        readonly 900: "#7A2614";
        readonly 950: "#421008";
    };
    readonly brandOrangeOverlay: {
        readonly 50: "rgba(232, 73, 16, 0.05)";
        readonly 100: "rgba(232, 73, 16, 0.10)";
        readonly 200: "rgba(232, 73, 16, 0.20)";
        readonly 300: "rgba(232, 73, 16, 0.30)";
        readonly 400: "rgba(232, 73, 16, 0.40)";
        readonly 500: "rgba(232, 73, 16, 0.50)";
        readonly 600: "rgba(232, 73, 16, 0.60)";
        readonly 700: "rgba(232, 73, 16, 0.70)";
        readonly 800: "rgba(232, 73, 16, 0.80)";
        readonly 900: "rgba(232, 73, 16, 0.90)";
    };
    readonly neutral: {
        readonly 50: "#FFFFFF";
        readonly 100: "#F5F5F5";
        readonly 150: "#E4E8E9";
        readonly 200: "#CBD4D6";
        readonly 300: "#A7B5B9";
        readonly 400: "#7C8E94";
        readonly 500: "#617379";
        readonly 600: "#536167";
        readonly 700: "#475157";
        readonly 800: "#3D4448";
        readonly 900: "#383E41";
        readonly 950: "#22272A";
    };
    readonly neutralLightOverlay: {
        readonly 50: "rgba(255, 255, 255, 0.05)";
        readonly 100: "rgba(255, 255, 255, 0.10)";
        readonly 200: "rgba(255, 255, 255, 0.20)";
        readonly 300: "rgba(255, 255, 255, 0.30)";
        readonly 400: "rgba(255, 255, 255, 0.40)";
        readonly 500: "rgba(255, 255, 255, 0.50)";
        readonly 600: "rgba(255, 255, 255, 0.60)";
        readonly 700: "rgba(255, 255, 255, 0.70)";
        readonly 800: "rgba(255, 255, 255, 0.80)";
        readonly 900: "rgba(255, 255, 255, 0.90)";
    };
    readonly neutralDark: {
        readonly 50: "#22272A";
        readonly 100: "#22272A";
        readonly 150: "#A7B5B9";
        readonly 200: "#3D4448";
        readonly 300: "#475157";
        readonly 400: "#536167";
        readonly 500: "#617379";
        readonly 600: "#536167";
        readonly 700: "#7C8E94";
        readonly 800: "#A7B5B9";
        readonly 900: "#CBD4D6";
        readonly 950: "#F5F5F5";
    };
    readonly neutralDarkOverlay: {
        readonly 50: "rgba(34, 39, 42, 0.05)";
        readonly 100: "rgba(34, 39, 42, 0.10)";
        readonly 200: "rgba(34, 39, 42, 0.20)";
        readonly 300: "rgba(34, 39, 42, 0.30)";
        readonly 400: "rgba(34, 39, 42, 0.40)";
        readonly 500: "rgba(34, 39, 42, 0.50)";
        readonly 600: "rgba(34, 39, 42, 0.60)";
        readonly 700: "rgba(34, 39, 42, 0.70)";
        readonly 800: "rgba(34, 39, 42, 0.80)";
        readonly 900: "rgba(34, 39, 42, 0.90)";
    };
    readonly danger: {
        readonly 50: "#FFF1F1";
        readonly 100: "#FFE1E1";
        readonly 200: "#FFC7C7";
        readonly 300: "#FFA1A1";
        readonly 400: "#FF6A6A";
        readonly 500: "#F83B3B";
        readonly 600: "#E31A1A";
        readonly 700: "#C11414";
        readonly 800: "#9F1515";
        readonly 900: "#841818";
    };
    readonly dangerOverlay: {
        readonly 50: "rgba(227, 26, 26, 0.05)";
        readonly 100: "rgba(227, 26, 26, 0.10)";
        readonly 200: "rgba(227, 26, 26, 0.20)";
        readonly 300: "rgba(227, 26, 26, 0.30)";
        readonly 400: "rgba(227, 26, 26, 0.40)";
        readonly 500: "rgba(227, 26, 26, 0.50)";
        readonly 600: "rgba(227, 26, 26, 0.60)";
        readonly 700: "rgba(227, 26, 26, 0.70)";
        readonly 800: "rgba(227, 26, 26, 0.80)";
        readonly 900: "rgba(227, 26, 26, 0.90)";
    };
    readonly success: {
        readonly 50: "#EBFEF4";
        readonly 100: "#CDFEE4";
        readonly 200: "#A0FACE";
        readonly 300: "#63F2B5";
        readonly 400: "#26E197";
        readonly 500: "#01B574";
        readonly 600: "#00A369";
        readonly 700: "#008257";
        readonly 800: "#006746";
        readonly 900: "#00543C";
    };
    readonly successOverlay: {
        readonly 50: "rgba(1, 181, 116, 0.05)";
        readonly 100: "rgba(1, 181, 116, 0.10)";
        readonly 200: "rgba(1, 181, 116, 0.20)";
        readonly 300: "rgba(1, 181, 116, 0.30)";
        readonly 400: "rgba(1, 181, 116, 0.40)";
        readonly 500: "rgba(1, 181, 116, 0.50)";
        readonly 600: "rgba(1, 181, 116, 0.60)";
        readonly 700: "rgba(1, 181, 116, 0.70)";
        readonly 800: "rgba(1, 181, 116, 0.80)";
        readonly 900: "rgba(1, 181, 116, 0.90)";
    };
    readonly warning: {
        readonly 50: "#FFF8EB";
        readonly 100: "#FFEBC6";
        readonly 200: "#FFD388";
        readonly 300: "#FFB74A";
        readonly 400: "#FF9C20";
        readonly 500: "#F97607";
        readonly 600: "#DD5202";
        readonly 700: "#B73506";
        readonly 800: "#94280C";
        readonly 900: "#7A230D";
    };
    readonly warningOverlay: {
        readonly 50: "rgba(249, 118, 7, 0.05)";
        readonly 100: "rgba(249, 118, 7, 0.10)";
        readonly 200: "rgba(249, 118, 7, 0.20)";
        readonly 300: "rgba(249, 118, 7, 0.30)";
        readonly 400: "rgba(249, 118, 7, 0.40)";
        readonly 500: "rgba(249, 118, 7, 0.50)";
        readonly 600: "rgba(249, 118, 7, 0.60)";
        readonly 700: "rgba(249, 118, 7, 0.70)";
        readonly 800: "rgba(249, 118, 7, 0.80)";
        readonly 900: "rgba(249, 118, 7, 0.90)";
    };
    readonly info: {
        readonly 50: "#E9FAFF";
        readonly 100: "#A7EEFF";
        readonly 200: "#6BE7FF";
        readonly 300: "#26D4FF";
        readonly 400: "#00B0FF";
        readonly 500: "#0086FF";
        readonly 600: "#006BFF";
        readonly 700: "#005CE6";
        readonly 800: "#0052B3";
        readonly 900: "#002752";
    };
    readonly infoOverlay: {
        readonly 50: "rgba(0, 134, 255, 0.05)";
        readonly 100: "rgba(0, 134, 255, 0.10)";
        readonly 200: "rgba(0, 134, 255, 0.20)";
        readonly 300: "rgba(0, 134, 255, 0.30)";
        readonly 400: "rgba(0, 134, 255, 0.40)";
        readonly 500: "rgba(0, 134, 255, 0.50)";
        readonly 600: "rgba(0, 134, 255, 0.60)";
        readonly 700: "rgba(0, 134, 255, 0.70)";
        readonly 800: "rgba(0, 134, 255, 0.80)";
        readonly 900: "rgba(0, 134, 255, 0.90)";
    };
    readonly gradients: {
        readonly 1: "linear-gradient(225deg, rgba(87, 84, 125, 1) 0%, rgba(113, 108, 152, 1) 5%, rgba(127, 165, 226, 1) 54%, rgba(143, 175, 229, 1) 72%, rgba(164, 189, 233, 1) 89%, rgba(189, 208, 239, 1) 100%)";
        readonly 2: "linear-gradient(224deg, rgba(239, 238, 245, 1) 0%, rgba(170, 165, 194, 1) 35%, rgba(167, 181, 185, 1) 60%, rgba(189, 208, 239, 1) 84%)";
        readonly 3: "radial-gradient(circle at 50% 50%, rgba(0, 134, 255, 0.12) 0%, rgba(14, 16, 57, 0.02) 100%)";
        readonly 4: "radial-gradient(circle at 50% 50%, rgba(248, 59, 59, 0.12) 0%, rgba(227, 26, 26, 0.01) 100%)";
        readonly 5: "radial-gradient(circle at 50% 50%, rgba(127, 165, 226, 0.15) 0%, rgba(249, 118, 7, 0.02) 100%)";
        readonly 6: "radial-gradient(circle at 50% 50%, rgba(1, 181, 116, 0.12) 0%, rgba(1, 181, 116, 0.01) 100%)";
    };
};
/** Alias simplificado */
declare const colors: {
    readonly brandNavy: {
        readonly 50: "#F5F8FC";
        readonly 100: "#E8EFFA";
        readonly 200: "#D3E0F5";
        readonly 300: "#BDD0EF";
        readonly 400: "#A4BDE9";
        readonly 500: "#8FAFE5";
        readonly 600: "#7FA5E2";
        readonly 700: "#6487C2";
        readonly 800: "#49699F";
        readonly 900: "#2F4F7F";
        readonly 950: "#0E1039";
    };
    readonly brandNavyOverlay: {
        readonly 50: "rgba(127, 165, 226, 0.05)";
        readonly 100: "rgba(127, 165, 226, 0.10)";
        readonly 200: "rgba(127, 165, 226, 0.20)";
        readonly 300: "rgba(127, 165, 226, 0.30)";
        readonly 400: "rgba(127, 165, 226, 0.40)";
        readonly 500: "rgba(127, 165, 226, 0.50)";
        readonly 600: "rgba(127, 165, 226, 0.60)";
        readonly 700: "rgba(127, 165, 226, 0.70)";
        readonly 800: "rgba(127, 165, 226, 0.80)";
        readonly 900: "rgba(127, 165, 226, 0.90)";
    };
    readonly brandPurple: {
        readonly 50: "#F7F6FA";
        readonly 100: "#EFEEF5";
        readonly 200: "#DFDDEB";
        readonly 300: "#CCC9DE";
        readonly 400: "#AAA5C2";
        readonly 500: "#8B85AC";
        readonly 600: "#716C98";
        readonly 700: "#57547D";
        readonly 800: "#34375C";
        readonly 900: "#0E1039";
        readonly 950: "#080922";
    };
    readonly brandPurpleOverlay: {
        readonly 50: "rgba(14, 16, 57, 0.05)";
        readonly 100: "rgba(14, 16, 57, 0.10)";
        readonly 200: "rgba(14, 16, 57, 0.20)";
        readonly 300: "rgba(14, 16, 57, 0.30)";
        readonly 400: "rgba(14, 16, 57, 0.40)";
        readonly 500: "rgba(14, 16, 57, 0.50)";
        readonly 600: "rgba(14, 16, 57, 0.60)";
        readonly 700: "rgba(14, 16, 57, 0.70)";
        readonly 800: "rgba(14, 16, 57, 0.80)";
        readonly 900: "rgba(14, 16, 57, 0.90)";
    };
    readonly brandBlue: {
        readonly 50: "#F5F8FC";
        readonly 100: "#E8EFFA";
        readonly 200: "#D3E0F5";
        readonly 300: "#BDD0EF";
        readonly 400: "#A4BDE9";
        readonly 500: "#8FAFE5";
        readonly 600: "#7FA5E2";
        readonly 700: "#6487C2";
        readonly 800: "#49699F";
        readonly 900: "#2F4F7F";
        readonly 950: "#0E1039";
    };
    readonly brandBlueOverlay: {
        readonly 50: "rgba(127, 165, 226, 0.05)";
        readonly 100: "rgba(127, 165, 226, 0.10)";
        readonly 200: "rgba(127, 165, 226, 0.20)";
        readonly 300: "rgba(127, 165, 226, 0.30)";
        readonly 400: "rgba(127, 165, 226, 0.40)";
        readonly 500: "rgba(127, 165, 226, 0.50)";
        readonly 600: "rgba(127, 165, 226, 0.60)";
        readonly 700: "rgba(127, 165, 226, 0.70)";
        readonly 800: "rgba(127, 165, 226, 0.80)";
        readonly 900: "rgba(127, 165, 226, 0.90)";
    };
    readonly brandOrange: {
        readonly 50: "#FFF6ED";
        readonly 100: "#FEEAD6";
        readonly 200: "#FDD1AB";
        readonly 300: "#FBB076";
        readonly 400: "#F8833F";
        readonly 500: "#F5631A";
        readonly 600: "#E84910";
        readonly 700: "#BF340F";
        readonly 800: "#982B14";
        readonly 900: "#7A2614";
        readonly 950: "#421008";
    };
    readonly brandOrangeOverlay: {
        readonly 50: "rgba(232, 73, 16, 0.05)";
        readonly 100: "rgba(232, 73, 16, 0.10)";
        readonly 200: "rgba(232, 73, 16, 0.20)";
        readonly 300: "rgba(232, 73, 16, 0.30)";
        readonly 400: "rgba(232, 73, 16, 0.40)";
        readonly 500: "rgba(232, 73, 16, 0.50)";
        readonly 600: "rgba(232, 73, 16, 0.60)";
        readonly 700: "rgba(232, 73, 16, 0.70)";
        readonly 800: "rgba(232, 73, 16, 0.80)";
        readonly 900: "rgba(232, 73, 16, 0.90)";
    };
    readonly neutral: {
        readonly 50: "#FFFFFF";
        readonly 100: "#F5F5F5";
        readonly 150: "#E4E8E9";
        readonly 200: "#CBD4D6";
        readonly 300: "#A7B5B9";
        readonly 400: "#7C8E94";
        readonly 500: "#617379";
        readonly 600: "#536167";
        readonly 700: "#475157";
        readonly 800: "#3D4448";
        readonly 900: "#383E41";
        readonly 950: "#22272A";
    };
    readonly neutralLightOverlay: {
        readonly 50: "rgba(255, 255, 255, 0.05)";
        readonly 100: "rgba(255, 255, 255, 0.10)";
        readonly 200: "rgba(255, 255, 255, 0.20)";
        readonly 300: "rgba(255, 255, 255, 0.30)";
        readonly 400: "rgba(255, 255, 255, 0.40)";
        readonly 500: "rgba(255, 255, 255, 0.50)";
        readonly 600: "rgba(255, 255, 255, 0.60)";
        readonly 700: "rgba(255, 255, 255, 0.70)";
        readonly 800: "rgba(255, 255, 255, 0.80)";
        readonly 900: "rgba(255, 255, 255, 0.90)";
    };
    readonly neutralDark: {
        readonly 50: "#22272A";
        readonly 100: "#22272A";
        readonly 150: "#A7B5B9";
        readonly 200: "#3D4448";
        readonly 300: "#475157";
        readonly 400: "#536167";
        readonly 500: "#617379";
        readonly 600: "#536167";
        readonly 700: "#7C8E94";
        readonly 800: "#A7B5B9";
        readonly 900: "#CBD4D6";
        readonly 950: "#F5F5F5";
    };
    readonly neutralDarkOverlay: {
        readonly 50: "rgba(34, 39, 42, 0.05)";
        readonly 100: "rgba(34, 39, 42, 0.10)";
        readonly 200: "rgba(34, 39, 42, 0.20)";
        readonly 300: "rgba(34, 39, 42, 0.30)";
        readonly 400: "rgba(34, 39, 42, 0.40)";
        readonly 500: "rgba(34, 39, 42, 0.50)";
        readonly 600: "rgba(34, 39, 42, 0.60)";
        readonly 700: "rgba(34, 39, 42, 0.70)";
        readonly 800: "rgba(34, 39, 42, 0.80)";
        readonly 900: "rgba(34, 39, 42, 0.90)";
    };
    readonly danger: {
        readonly 50: "#FFF1F1";
        readonly 100: "#FFE1E1";
        readonly 200: "#FFC7C7";
        readonly 300: "#FFA1A1";
        readonly 400: "#FF6A6A";
        readonly 500: "#F83B3B";
        readonly 600: "#E31A1A";
        readonly 700: "#C11414";
        readonly 800: "#9F1515";
        readonly 900: "#841818";
    };
    readonly dangerOverlay: {
        readonly 50: "rgba(227, 26, 26, 0.05)";
        readonly 100: "rgba(227, 26, 26, 0.10)";
        readonly 200: "rgba(227, 26, 26, 0.20)";
        readonly 300: "rgba(227, 26, 26, 0.30)";
        readonly 400: "rgba(227, 26, 26, 0.40)";
        readonly 500: "rgba(227, 26, 26, 0.50)";
        readonly 600: "rgba(227, 26, 26, 0.60)";
        readonly 700: "rgba(227, 26, 26, 0.70)";
        readonly 800: "rgba(227, 26, 26, 0.80)";
        readonly 900: "rgba(227, 26, 26, 0.90)";
    };
    readonly success: {
        readonly 50: "#EBFEF4";
        readonly 100: "#CDFEE4";
        readonly 200: "#A0FACE";
        readonly 300: "#63F2B5";
        readonly 400: "#26E197";
        readonly 500: "#01B574";
        readonly 600: "#00A369";
        readonly 700: "#008257";
        readonly 800: "#006746";
        readonly 900: "#00543C";
    };
    readonly successOverlay: {
        readonly 50: "rgba(1, 181, 116, 0.05)";
        readonly 100: "rgba(1, 181, 116, 0.10)";
        readonly 200: "rgba(1, 181, 116, 0.20)";
        readonly 300: "rgba(1, 181, 116, 0.30)";
        readonly 400: "rgba(1, 181, 116, 0.40)";
        readonly 500: "rgba(1, 181, 116, 0.50)";
        readonly 600: "rgba(1, 181, 116, 0.60)";
        readonly 700: "rgba(1, 181, 116, 0.70)";
        readonly 800: "rgba(1, 181, 116, 0.80)";
        readonly 900: "rgba(1, 181, 116, 0.90)";
    };
    readonly warning: {
        readonly 50: "#FFF8EB";
        readonly 100: "#FFEBC6";
        readonly 200: "#FFD388";
        readonly 300: "#FFB74A";
        readonly 400: "#FF9C20";
        readonly 500: "#F97607";
        readonly 600: "#DD5202";
        readonly 700: "#B73506";
        readonly 800: "#94280C";
        readonly 900: "#7A230D";
    };
    readonly warningOverlay: {
        readonly 50: "rgba(249, 118, 7, 0.05)";
        readonly 100: "rgba(249, 118, 7, 0.10)";
        readonly 200: "rgba(249, 118, 7, 0.20)";
        readonly 300: "rgba(249, 118, 7, 0.30)";
        readonly 400: "rgba(249, 118, 7, 0.40)";
        readonly 500: "rgba(249, 118, 7, 0.50)";
        readonly 600: "rgba(249, 118, 7, 0.60)";
        readonly 700: "rgba(249, 118, 7, 0.70)";
        readonly 800: "rgba(249, 118, 7, 0.80)";
        readonly 900: "rgba(249, 118, 7, 0.90)";
    };
    readonly info: {
        readonly 50: "#E9FAFF";
        readonly 100: "#A7EEFF";
        readonly 200: "#6BE7FF";
        readonly 300: "#26D4FF";
        readonly 400: "#00B0FF";
        readonly 500: "#0086FF";
        readonly 600: "#006BFF";
        readonly 700: "#005CE6";
        readonly 800: "#0052B3";
        readonly 900: "#002752";
    };
    readonly infoOverlay: {
        readonly 50: "rgba(0, 134, 255, 0.05)";
        readonly 100: "rgba(0, 134, 255, 0.10)";
        readonly 200: "rgba(0, 134, 255, 0.20)";
        readonly 300: "rgba(0, 134, 255, 0.30)";
        readonly 400: "rgba(0, 134, 255, 0.40)";
        readonly 500: "rgba(0, 134, 255, 0.50)";
        readonly 600: "rgba(0, 134, 255, 0.60)";
        readonly 700: "rgba(0, 134, 255, 0.70)";
        readonly 800: "rgba(0, 134, 255, 0.80)";
        readonly 900: "rgba(0, 134, 255, 0.90)";
    };
    readonly gradients: {
        readonly 1: "linear-gradient(225deg, rgba(87, 84, 125, 1) 0%, rgba(113, 108, 152, 1) 5%, rgba(127, 165, 226, 1) 54%, rgba(143, 175, 229, 1) 72%, rgba(164, 189, 233, 1) 89%, rgba(189, 208, 239, 1) 100%)";
        readonly 2: "linear-gradient(224deg, rgba(239, 238, 245, 1) 0%, rgba(170, 165, 194, 1) 35%, rgba(167, 181, 185, 1) 60%, rgba(189, 208, 239, 1) 84%)";
        readonly 3: "radial-gradient(circle at 50% 50%, rgba(0, 134, 255, 0.12) 0%, rgba(14, 16, 57, 0.02) 100%)";
        readonly 4: "radial-gradient(circle at 50% 50%, rgba(248, 59, 59, 0.12) 0%, rgba(227, 26, 26, 0.01) 100%)";
        readonly 5: "radial-gradient(circle at 50% 50%, rgba(127, 165, 226, 0.15) 0%, rgba(249, 118, 7, 0.02) 100%)";
        readonly 6: "radial-gradient(circle at 50% 50%, rgba(1, 181, 116, 0.12) 0%, rgba(1, 181, 116, 0.01) 100%)";
    };
};
/** Tipagens TypeScript dos Tokens de Cores */
type BrandNavyTokens = typeof brandNavy;
type BrandNavyOverlayTokens = typeof brandNavyOverlay;
type BrandPurpleTokens = typeof brandPurple;
type BrandPurpleOverlayTokens = typeof brandPurpleOverlay;
type BrandOrangeTokens = typeof brandOrange;
type BrandOrangeOverlayTokens = typeof brandOrangeOverlay;
type BrandBlueTokens = typeof brandBlue;
type BrandBlueOverlayTokens = typeof brandBlueOverlay;
type NeutralTokens = typeof neutral;
type NeutralLightOverlayTokens = typeof neutralLightOverlay;
type NeutralDarkTokens = typeof neutralDark;
type NeutralDarkOverlayTokens = typeof neutralDarkOverlay;
type DangerTokens = typeof danger;
type DangerOverlayTokens = typeof dangerOverlay;
type SuccessTokens = typeof success;
type SuccessOverlayTokens = typeof successOverlay;
type WarningTokens = typeof warning;
type WarningOverlayTokens = typeof warningOverlay;
type InfoTokens = typeof info;
type InfoOverlayTokens = typeof infoOverlay;
type GradientTokens = typeof gradients;
type UnooriaColorTokens = typeof unooriaColors;
/** Escalas numéricas e chaves derivadas */
type BrandNavyScale = keyof typeof brandNavy;
type BrandPurpleScale = keyof typeof brandPurple;
type BrandOrangeScale = keyof typeof brandOrange;
type BrandBlueScale = keyof typeof brandBlue;
type NeutralScale = keyof typeof neutral;
type NeutralDarkScale = keyof typeof neutralDark;
type DangerScale = keyof typeof danger;
type SuccessScale = keyof typeof success;
type WarningScale = keyof typeof warning;
type InfoScale = keyof typeof info;
type GradientKey = keyof typeof gradients;
type UnooriaColorGroup = keyof typeof unooriaColors;
/** Identificador completo de token de cor */
type UnooriaColorKey = `brandNavy.${BrandNavyScale}` | `brandPurple.${BrandPurpleScale}` | `brandOrange.${BrandOrangeScale}` | `neutral.${NeutralScale}` | `neutralDark.${NeutralDarkScale}` | `danger.${DangerScale}` | `success.${SuccessScale}` | `warning.${WarningScale}` | `info.${InfoScale}` | `gradients.${GradientKey}`;

/**
 * Tokens de Tipografia e Regras do Design System - Plataforma Unooria
 * Extraídos e sincronizados das especificações oficiais do Figma
 */
declare const fontFamilies: {
    readonly sans: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
    readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
};
declare const fontWeights: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
declare const desktopFontSizes: {
    readonly 'heading-4xl': "60px";
    readonly 'heading-xxxl': "48px";
    readonly 'heading-xxl': "34px";
    readonly 'title-xl': "24px";
    readonly 'title-l': "20px";
    readonly 'body-m': "18px";
    readonly 'body-s': "16px";
    readonly 'body-xs': "14px";
    readonly 'body-xxs': "12px";
    readonly 'caption-xxxs': "10px";
};
declare const desktopLineHeights: {
    readonly 'heading-4xl': "78px";
    readonly 'heading-xxxl': "64px";
    readonly 'heading-xxl': "48px";
    readonly 'title-xl': "34px";
    readonly 'title-l': "30px";
    readonly 'body-m': "28px";
    readonly 'body-s': "24px";
    readonly 'body-xs': "20px";
    readonly 'body-xxs': "18px";
    readonly 'caption-xxxs': "14px";
};
declare const mobileFontSizes: {
    readonly 'heading-4xl': "34px";
    readonly 'heading-xxxl': "34px";
    readonly 'heading-xxl': "24px";
    readonly 'title-xl': "20px";
    readonly 'title-l': "18px";
    readonly 'body-m': "16px";
    readonly 'body-s': "14px";
    readonly 'body-xs': "14px";
    readonly 'body-xxs': "10px";
    readonly 'caption-xxxs': "10px";
};
declare const mobileLineHeights: {
    readonly 'heading-4xl': "48px";
    readonly 'heading-xxxl': "48px";
    readonly 'heading-xxl': "34px";
    readonly 'title-xl': "30px";
    readonly 'title-l': "28px";
    readonly 'body-m': "24px";
    readonly 'body-s': "20px";
    readonly 'body-xs': "18px";
    readonly 'body-xxs': "14px";
    readonly 'caption-xxxs': "14px";
};
declare const fontSizes: {
    readonly 'heading-4xl': "60px";
    readonly 'heading-xxxl': "48px";
    readonly 'heading-xxl': "34px";
    readonly 'title-xl': "24px";
    readonly 'title-l': "20px";
    readonly 'body-m': "18px";
    readonly 'body-s': "16px";
    readonly 'body-xs': "14px";
    readonly 'body-xxs': "12px";
    readonly 'caption-xxxs': "10px";
};
declare const lineHeights: {
    readonly 'heading-4xl': "78px";
    readonly 'heading-xxxl': "64px";
    readonly 'heading-xxl': "48px";
    readonly 'title-xl': "34px";
    readonly 'title-l': "30px";
    readonly 'body-m': "28px";
    readonly 'body-s': "24px";
    readonly 'body-xs': "20px";
    readonly 'body-xxs': "18px";
    readonly 'caption-xxxs': "14px";
};
declare const letterSpacings: {
    readonly tight: "-0.01em";
    readonly normal: "0px";
    readonly wide: "0.02em";
};
interface RecommendedWeight {
    weight: number;
    weightName: string;
    context: string;
}
interface TypographyTokenStyle {
    id: string;
    name: string;
    category: 'heading' | 'title' | 'body' | 'caption';
    description: string;
    fontFamily: string;
    desktop: {
        fontSize: string;
        lineHeight: string;
    };
    mobile: {
        fontSize: string;
        lineHeight: string;
    };
    recommendedWeights: RecommendedWeight[];
    sampleText: string;
}
declare const typographyStyles: Record<string, TypographyTokenStyle>;
declare const typographyRules: {
    readonly title: "Regras da Tipografia da Plataforma Unooria";
    readonly sections: readonly [{
        readonly title: "1 - Fundamentos e Princípios";
        readonly content: "Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.";
        readonly weights: readonly [{
            readonly name: "Regular (400)";
            readonly usage: "Utilizado para blocos de leitura contínua e parágrafos.";
        }, {
            readonly name: "Medium (500)";
            readonly usage: "Aplicado em textos que necessitam de destaque sutil, como labels de formulários ou itens de listas.";
        }, {
            readonly name: "Semibold (600)";
            readonly usage: "Utilizado para sub-títulos, estados ativos de componentes e rótulos de botões.";
        }, {
            readonly name: "Bold (700)";
            readonly usage: "Reservado para títulos principais e informações que exigem atenção imediata.";
        }];
    }, {
        readonly title: "2 - Regras de Aplicação de Pesos por Contexto";
        readonly categories: readonly [{
            readonly name: "Títulos e Cabeçalhos";
            readonly rules: readonly ["Desktop: Use Bold (700) para tokens de 4XL a XL para garantir autoridade visual.", "Mobile: Para os tokens de 34px a 20px, pode-se alternar entre Bold (700) e Semibold (600) dependendo da densidade da tela."];
        }, {
            readonly name: "Corpo de Texto e Interface";
            readonly rules: readonly ["Leitura: O token M (18px) em Regular (400) é a base da interface.", "Destaque no Texto: Use Semibold (600) para destacar palavras importantes dentro de parágrafos.", "Componentes (Botões/Tabs): Utilize Semibold (600) para garantir legibilidade em tamanhos menores como S (16px) ou XS (14px).", "Formulários: Labels devem utilizar Medium (500) no tamanho XS (14px) para diferenciar o rótulo do conteúdo preenchido."];
        }];
    }, {
        readonly title: "3 - Diretrizes de Responsividade";
        readonly rules: readonly [{
            readonly topic: "Substituição Automática";
            readonly description: "Em dispositivos móveis, qualquer elemento marcado como 4XL ou XXXL deve renderizar automaticamente com o tamanho de 34px (XXL) e linha de 48px.";
        }, {
            readonly topic: "Fidelidade Técnica";
            readonly description: "\"Um design system é essencialmente uma coleção de regras, restrições e princípios implementados em design e código\". Não é permitida a criação de novos pesos ou tamanhos fora desta tabela oficial.";
        }];
    }];
};
declare const unooriaTypography: {
    readonly fontFamilies: {
        readonly sans: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    };
    readonly fontWeights: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly fontSizes: {
        readonly 'heading-4xl': "60px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "24px";
        readonly 'title-l': "20px";
        readonly 'body-m': "18px";
        readonly 'body-s': "16px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "12px";
        readonly 'caption-xxxs': "10px";
    };
    readonly lineHeights: {
        readonly 'heading-4xl': "78px";
        readonly 'heading-xxxl': "64px";
        readonly 'heading-xxl': "48px";
        readonly 'title-xl': "34px";
        readonly 'title-l': "30px";
        readonly 'body-m': "28px";
        readonly 'body-s': "24px";
        readonly 'body-xs': "20px";
        readonly 'body-xxs': "18px";
        readonly 'caption-xxxs': "14px";
    };
    readonly desktopFontSizes: {
        readonly 'heading-4xl': "60px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "24px";
        readonly 'title-l': "20px";
        readonly 'body-m': "18px";
        readonly 'body-s': "16px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "12px";
        readonly 'caption-xxxs': "10px";
    };
    readonly desktopLineHeights: {
        readonly 'heading-4xl': "78px";
        readonly 'heading-xxxl': "64px";
        readonly 'heading-xxl': "48px";
        readonly 'title-xl': "34px";
        readonly 'title-l': "30px";
        readonly 'body-m': "28px";
        readonly 'body-s': "24px";
        readonly 'body-xs': "20px";
        readonly 'body-xxs': "18px";
        readonly 'caption-xxxs': "14px";
    };
    readonly mobileFontSizes: {
        readonly 'heading-4xl': "34px";
        readonly 'heading-xxxl': "34px";
        readonly 'heading-xxl': "24px";
        readonly 'title-xl': "20px";
        readonly 'title-l': "18px";
        readonly 'body-m': "16px";
        readonly 'body-s': "14px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "10px";
        readonly 'caption-xxxs': "10px";
    };
    readonly mobileLineHeights: {
        readonly 'heading-4xl': "48px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "30px";
        readonly 'title-l': "28px";
        readonly 'body-m': "24px";
        readonly 'body-s': "20px";
        readonly 'body-xs': "18px";
        readonly 'body-xxs': "14px";
        readonly 'caption-xxxs': "14px";
    };
    readonly letterSpacings: {
        readonly tight: "-0.01em";
        readonly normal: "0px";
        readonly wide: "0.02em";
    };
    readonly styles: Record<string, TypographyTokenStyle>;
    readonly rules: {
        readonly title: "Regras da Tipografia da Plataforma Unooria";
        readonly sections: readonly [{
            readonly title: "1 - Fundamentos e Princípios";
            readonly content: "Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.";
            readonly weights: readonly [{
                readonly name: "Regular (400)";
                readonly usage: "Utilizado para blocos de leitura contínua e parágrafos.";
            }, {
                readonly name: "Medium (500)";
                readonly usage: "Aplicado em textos que necessitam de destaque sutil, como labels de formulários ou itens de listas.";
            }, {
                readonly name: "Semibold (600)";
                readonly usage: "Utilizado para sub-títulos, estados ativos de componentes e rótulos de botões.";
            }, {
                readonly name: "Bold (700)";
                readonly usage: "Reservado para títulos principais e informações que exigem atenção imediata.";
            }];
        }, {
            readonly title: "2 - Regras de Aplicação de Pesos por Contexto";
            readonly categories: readonly [{
                readonly name: "Títulos e Cabeçalhos";
                readonly rules: readonly ["Desktop: Use Bold (700) para tokens de 4XL a XL para garantir autoridade visual.", "Mobile: Para os tokens de 34px a 20px, pode-se alternar entre Bold (700) e Semibold (600) dependendo da densidade da tela."];
            }, {
                readonly name: "Corpo de Texto e Interface";
                readonly rules: readonly ["Leitura: O token M (18px) em Regular (400) é a base da interface.", "Destaque no Texto: Use Semibold (600) para destacar palavras importantes dentro de parágrafos.", "Componentes (Botões/Tabs): Utilize Semibold (600) para garantir legibilidade em tamanhos menores como S (16px) ou XS (14px).", "Formulários: Labels devem utilizar Medium (500) no tamanho XS (14px) para diferenciar o rótulo do conteúdo preenchido."];
            }];
        }, {
            readonly title: "3 - Diretrizes de Responsividade";
            readonly rules: readonly [{
                readonly topic: "Substituição Automática";
                readonly description: "Em dispositivos móveis, qualquer elemento marcado como 4XL ou XXXL deve renderizar automaticamente com o tamanho de 34px (XXL) e linha de 48px.";
            }, {
                readonly topic: "Fidelidade Técnica";
                readonly description: "\"Um design system é essencialmente uma coleção de regras, restrições e princípios implementados em design e código\". Não é permitida a criação de novos pesos ou tamanhos fora desta tabela oficial.";
            }];
        }];
    };
};
declare const typography: {
    readonly fontFamilies: {
        readonly sans: "\"Open Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif";
        readonly mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    };
    readonly fontWeights: {
        readonly regular: 400;
        readonly medium: 500;
        readonly semibold: 600;
        readonly bold: 700;
    };
    readonly fontSizes: {
        readonly 'heading-4xl': "60px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "24px";
        readonly 'title-l': "20px";
        readonly 'body-m': "18px";
        readonly 'body-s': "16px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "12px";
        readonly 'caption-xxxs': "10px";
    };
    readonly lineHeights: {
        readonly 'heading-4xl': "78px";
        readonly 'heading-xxxl': "64px";
        readonly 'heading-xxl': "48px";
        readonly 'title-xl': "34px";
        readonly 'title-l': "30px";
        readonly 'body-m': "28px";
        readonly 'body-s': "24px";
        readonly 'body-xs': "20px";
        readonly 'body-xxs': "18px";
        readonly 'caption-xxxs': "14px";
    };
    readonly desktopFontSizes: {
        readonly 'heading-4xl': "60px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "24px";
        readonly 'title-l': "20px";
        readonly 'body-m': "18px";
        readonly 'body-s': "16px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "12px";
        readonly 'caption-xxxs': "10px";
    };
    readonly desktopLineHeights: {
        readonly 'heading-4xl': "78px";
        readonly 'heading-xxxl': "64px";
        readonly 'heading-xxl': "48px";
        readonly 'title-xl': "34px";
        readonly 'title-l': "30px";
        readonly 'body-m': "28px";
        readonly 'body-s': "24px";
        readonly 'body-xs': "20px";
        readonly 'body-xxs': "18px";
        readonly 'caption-xxxs': "14px";
    };
    readonly mobileFontSizes: {
        readonly 'heading-4xl': "34px";
        readonly 'heading-xxxl': "34px";
        readonly 'heading-xxl': "24px";
        readonly 'title-xl': "20px";
        readonly 'title-l': "18px";
        readonly 'body-m': "16px";
        readonly 'body-s': "14px";
        readonly 'body-xs': "14px";
        readonly 'body-xxs': "10px";
        readonly 'caption-xxxs': "10px";
    };
    readonly mobileLineHeights: {
        readonly 'heading-4xl': "48px";
        readonly 'heading-xxxl': "48px";
        readonly 'heading-xxl': "34px";
        readonly 'title-xl': "30px";
        readonly 'title-l': "28px";
        readonly 'body-m': "24px";
        readonly 'body-s': "20px";
        readonly 'body-xs': "18px";
        readonly 'body-xxs': "14px";
        readonly 'caption-xxxs': "14px";
    };
    readonly letterSpacings: {
        readonly tight: "-0.01em";
        readonly normal: "0px";
        readonly wide: "0.02em";
    };
    readonly styles: Record<string, TypographyTokenStyle>;
    readonly rules: {
        readonly title: "Regras da Tipografia da Plataforma Unooria";
        readonly sections: readonly [{
            readonly title: "1 - Fundamentos e Princípios";
            readonly content: "Conforme definido nos fundamentos, este Design System é uma coleção de regras e princípios que devem ser seguidos fielmente para manter a consistência visual.";
            readonly weights: readonly [{
                readonly name: "Regular (400)";
                readonly usage: "Utilizado para blocos de leitura contínua e parágrafos.";
            }, {
                readonly name: "Medium (500)";
                readonly usage: "Aplicado em textos que necessitam de destaque sutil, como labels de formulários ou itens de listas.";
            }, {
                readonly name: "Semibold (600)";
                readonly usage: "Utilizado para sub-títulos, estados ativos de componentes e rótulos de botões.";
            }, {
                readonly name: "Bold (700)";
                readonly usage: "Reservado para títulos principais e informações que exigem atenção imediata.";
            }];
        }, {
            readonly title: "2 - Regras de Aplicação de Pesos por Contexto";
            readonly categories: readonly [{
                readonly name: "Títulos e Cabeçalhos";
                readonly rules: readonly ["Desktop: Use Bold (700) para tokens de 4XL a XL para garantir autoridade visual.", "Mobile: Para os tokens de 34px a 20px, pode-se alternar entre Bold (700) e Semibold (600) dependendo da densidade da tela."];
            }, {
                readonly name: "Corpo de Texto e Interface";
                readonly rules: readonly ["Leitura: O token M (18px) em Regular (400) é a base da interface.", "Destaque no Texto: Use Semibold (600) para destacar palavras importantes dentro de parágrafos.", "Componentes (Botões/Tabs): Utilize Semibold (600) para garantir legibilidade em tamanhos menores como S (16px) ou XS (14px).", "Formulários: Labels devem utilizar Medium (500) no tamanho XS (14px) para diferenciar o rótulo do conteúdo preenchido."];
            }];
        }, {
            readonly title: "3 - Diretrizes de Responsividade";
            readonly rules: readonly [{
                readonly topic: "Substituição Automática";
                readonly description: "Em dispositivos móveis, qualquer elemento marcado como 4XL ou XXXL deve renderizar automaticamente com o tamanho de 34px (XXL) e linha de 48px.";
            }, {
                readonly topic: "Fidelidade Técnica";
                readonly description: "\"Um design system é essencialmente uma coleção de regras, restrições e princípios implementados em design e código\". Não é permitida a criação de novos pesos ou tamanhos fora desta tabela oficial.";
            }];
        }];
    };
};
/** Tipos derivados de Tipografia */
type FontFamiliesTokens = typeof fontFamilies;
type UnooriaFontFamilyKey = keyof typeof fontFamilies;
type FontWeightsTokens = typeof fontWeights;
type UnooriaFontWeightKey = keyof typeof fontWeights;
type DesktopFontSizesTokens = typeof desktopFontSizes;
type UnooriaFontSizeKey = keyof typeof desktopFontSizes;
type DesktopLineHeightsTokens = typeof desktopLineHeights;
type UnooriaLineHeightKey = keyof typeof desktopLineHeights;
type MobileFontSizesTokens = typeof mobileFontSizes;
type MobileLineHeightsTokens = typeof mobileLineHeights;
type LetterSpacingsTokens = typeof letterSpacings;
type UnooriaLetterSpacingKey = keyof typeof letterSpacings;
type TypographyStylesTokens = typeof typographyStyles;
type UnooriaTypographyStyleKey = keyof typeof typographyStyles;
type UnooriaTypographyTokens = typeof unooriaTypography;

/**
 * Tokens de Espaçamento (Space Tokens)
 * Plataforma Unooria - Extraído do Figma (Node 6189:512)
 */
interface SpacingTokenDetail {
    name: string;
    key: string;
    px: number;
    rem: string;
    cssVar: string;
}
declare const unooriaSpacing: {
    readonly None: {
        readonly name: "None";
        readonly key: "None";
        readonly px: 0;
        readonly rem: "0rem";
        readonly cssVar: "--unooria-spacing-none";
    };
    readonly '4XS': {
        readonly name: "4XS";
        readonly key: "4XS";
        readonly px: 2;
        readonly rem: "0.125rem";
        readonly cssVar: "--unooria-spacing-4xs";
    };
    readonly XXXS: {
        readonly name: "XXXS";
        readonly key: "XXXS";
        readonly px: 4;
        readonly rem: "0.25rem";
        readonly cssVar: "--unooria-spacing-xxxs";
    };
    readonly XXS: {
        readonly name: "XXS";
        readonly key: "XXS";
        readonly px: 8;
        readonly rem: "0.5rem";
        readonly cssVar: "--unooria-spacing-xxs";
    };
    readonly XS: {
        readonly name: "XS";
        readonly key: "XS";
        readonly px: 12;
        readonly rem: "0.75rem";
        readonly cssVar: "--unooria-spacing-xs";
    };
    readonly S: {
        readonly name: "S";
        readonly key: "S";
        readonly px: 16;
        readonly rem: "1rem";
        readonly cssVar: "--unooria-spacing-s";
    };
    readonly M: {
        readonly name: "M";
        readonly key: "M";
        readonly px: 24;
        readonly rem: "1.5rem";
        readonly cssVar: "--unooria-spacing-m";
    };
    readonly L: {
        readonly name: "L";
        readonly key: "L";
        readonly px: 32;
        readonly rem: "2rem";
        readonly cssVar: "--unooria-spacing-l";
    };
    readonly XL: {
        readonly name: "XL";
        readonly key: "XL";
        readonly px: 48;
        readonly rem: "3rem";
        readonly cssVar: "--unooria-spacing-xl";
    };
    readonly XXL: {
        readonly name: "XXL";
        readonly key: "XXL";
        readonly px: 64;
        readonly rem: "4rem";
        readonly cssVar: "--unooria-spacing-xxl";
    };
    readonly XXXL: {
        readonly name: "XXXL";
        readonly key: "XXXL";
        readonly px: 80;
        readonly rem: "5rem";
        readonly cssVar: "--unooria-spacing-xxxl";
    };
    readonly '4XL': {
        readonly name: "4XL";
        readonly key: "4XL";
        readonly px: 96;
        readonly rem: "6rem";
        readonly cssVar: "--unooria-spacing-4xl";
    };
};
declare const spacing: {
    readonly None: {
        readonly name: "None";
        readonly key: "None";
        readonly px: 0;
        readonly rem: "0rem";
        readonly cssVar: "--unooria-spacing-none";
    };
    readonly '4XS': {
        readonly name: "4XS";
        readonly key: "4XS";
        readonly px: 2;
        readonly rem: "0.125rem";
        readonly cssVar: "--unooria-spacing-4xs";
    };
    readonly XXXS: {
        readonly name: "XXXS";
        readonly key: "XXXS";
        readonly px: 4;
        readonly rem: "0.25rem";
        readonly cssVar: "--unooria-spacing-xxxs";
    };
    readonly XXS: {
        readonly name: "XXS";
        readonly key: "XXS";
        readonly px: 8;
        readonly rem: "0.5rem";
        readonly cssVar: "--unooria-spacing-xxs";
    };
    readonly XS: {
        readonly name: "XS";
        readonly key: "XS";
        readonly px: 12;
        readonly rem: "0.75rem";
        readonly cssVar: "--unooria-spacing-xs";
    };
    readonly S: {
        readonly name: "S";
        readonly key: "S";
        readonly px: 16;
        readonly rem: "1rem";
        readonly cssVar: "--unooria-spacing-s";
    };
    readonly M: {
        readonly name: "M";
        readonly key: "M";
        readonly px: 24;
        readonly rem: "1.5rem";
        readonly cssVar: "--unooria-spacing-m";
    };
    readonly L: {
        readonly name: "L";
        readonly key: "L";
        readonly px: 32;
        readonly rem: "2rem";
        readonly cssVar: "--unooria-spacing-l";
    };
    readonly XL: {
        readonly name: "XL";
        readonly key: "XL";
        readonly px: 48;
        readonly rem: "3rem";
        readonly cssVar: "--unooria-spacing-xl";
    };
    readonly XXL: {
        readonly name: "XXL";
        readonly key: "XXL";
        readonly px: 64;
        readonly rem: "4rem";
        readonly cssVar: "--unooria-spacing-xxl";
    };
    readonly XXXL: {
        readonly name: "XXXL";
        readonly key: "XXXL";
        readonly px: 80;
        readonly rem: "5rem";
        readonly cssVar: "--unooria-spacing-xxxl";
    };
    readonly '4XL': {
        readonly name: "4XL";
        readonly key: "4XL";
        readonly px: 96;
        readonly rem: "6rem";
        readonly cssVar: "--unooria-spacing-4xl";
    };
};
type UnooriaSpacingKey = keyof typeof unooriaSpacing;
type UnooriaSpacingTokens = typeof unooriaSpacing;
type UnooriaSpacingValue = typeof unooriaSpacing[UnooriaSpacingKey];
declare const unooriaSpacingPx: Record<UnooriaSpacingKey, number>;
declare const unooriaSpacingRem: Record<UnooriaSpacingKey, string>;
type UnooriaSpacingPxTokens = typeof unooriaSpacingPx;
type UnooriaSpacingRemTokens = typeof unooriaSpacingRem;

/**
 * Tokens de Elevação e Sombras (Elevation Tokens)
 * Plataforma Unooria - Extraído do Figma (Node 6188:6091)
 */
type ElevationCategory = 'Brand' | 'Semantic' | 'Neutral';
interface ElevationTokenDetail {
    name: string;
    category: ElevationCategory;
    boxShadow: string;
    cssVar: string;
    backdropFilter?: string;
}
declare const unooriaElevation: Record<string, ElevationTokenDetail>;
declare const elevation: Record<string, ElevationTokenDetail>;
type UnooriaElevationKey = keyof typeof unooriaElevation;
type UnooriaElevationTokens = typeof unooriaElevation;
type UnooriaElevationValue = typeof unooriaElevation[UnooriaElevationKey];

/**
 * Tokens de Background Blur (Efeitos de Blur de Fundo e Glassmorphism)
 * Plataforma Unooria - Extraído do Figma (Node 6217:97)
 */
interface BlurToken {
    blur: string;
    blurPx: number;
    opacity: number;
    opacityPercent: string;
}
declare const backgroundBlur: {
    readonly 300: {
        readonly blur: "8px";
        readonly blurPx: 8;
        readonly opacity: 0.3;
        readonly opacityPercent: "30%";
    };
    readonly 400: {
        readonly blur: "16px";
        readonly blurPx: 16;
        readonly opacity: 0.4;
        readonly opacityPercent: "40%";
    };
    readonly 500: {
        readonly blur: "32px";
        readonly blurPx: 32;
        readonly opacity: 0.5;
        readonly opacityPercent: "50%";
    };
    readonly 700: {
        readonly blur: "48px";
        readonly blurPx: 48;
        readonly opacity: 0.7;
        readonly opacityPercent: "70%";
    };
    readonly 900: {
        readonly blur: "64px";
        readonly blurPx: 64;
        readonly opacity: 0.9;
        readonly opacityPercent: "90%";
    };
};
declare const blur: {
    readonly 300: {
        readonly blur: "8px";
        readonly blurPx: 8;
        readonly opacity: 0.3;
        readonly opacityPercent: "30%";
    };
    readonly 400: {
        readonly blur: "16px";
        readonly blurPx: 16;
        readonly opacity: 0.4;
        readonly opacityPercent: "40%";
    };
    readonly 500: {
        readonly blur: "32px";
        readonly blurPx: 32;
        readonly opacity: 0.5;
        readonly opacityPercent: "50%";
    };
    readonly 700: {
        readonly blur: "48px";
        readonly blurPx: 48;
        readonly opacity: 0.7;
        readonly opacityPercent: "70%";
    };
    readonly 900: {
        readonly blur: "64px";
        readonly blurPx: 64;
        readonly opacity: 0.9;
        readonly opacityPercent: "90%";
    };
};
type BackgroundBlurTokens = typeof backgroundBlur;
type BackgroundBlurLevel = keyof typeof backgroundBlur;
type UnooriaBlurKey = BackgroundBlurLevel;
type UnooriaBlurTokens = typeof backgroundBlur;
type UnooriaBlurValue = typeof backgroundBlur[BackgroundBlurLevel];

/**
 * Tokens de Grid & Layout do Design System 'Plataforma Unooria'
 * Extraídos das especificações do Figma.
 */
type GridBreakpointKey = 'mobile' | 'tablet' | 'notebook' | 'desktop';
interface GridBreakpointConfig {
    /** Nome identificador do dispositivo/breakpoint */
    name: string;
    /** Descrição de uso e aplicação do breakpoint */
    description: string;
    /** Largura mínima da viewport (em px) para acionamento das regras de media query */
    minWidthPx: number;
    /** Largura mínima formatada em string (ex: '0px', '768px', '1280px', '1920px') */
    minWidth: string;
    /** Largura de referência do canvas no Figma (em px) */
    canvasWidthPx: number;
    /** Número de colunas do grid */
    columns: number;
    /** Largura da coluna no canvas de referência (em px) */
    columnWidthPx: number;
    /** Espaçamento entre colunas (gutter / gap) em px */
    gutterPx: number;
    /** Espaçamento entre colunas (gutter / gap) formatado (ex: '12px' ou '24px') */
    gutter: string;
    /** Margem externa / padding nas extremidades (corners) em px */
    marginPx: number;
    /** Margem externa / padding nas extremidades formatado (ex: '12px', '24px', '48px') */
    margin: string;
    /** Largura máxima útil do container em px (colunas * largura_coluna + gutters) */
    maxContainerWidthPx: number;
    /** Largura máxima útil do container formatada */
    maxContainerWidth: string;
}
/** Configurações detalhadas dos breakpoints do sistema de grid da Plataforma Unooria */
declare const gridBreakpoints: {
    readonly mobile: {
        readonly name: "Mobile";
        readonly description: "Dispositivos móveis e telas pequenas (smartphones)";
        readonly minWidthPx: 0;
        readonly minWidth: "0px";
        readonly canvasWidthPx: 375;
        readonly columns: 4;
        readonly columnWidthPx: 75;
        readonly gutterPx: 12;
        readonly gutter: "12px";
        readonly marginPx: 12;
        readonly margin: "12px";
        readonly maxContainerWidthPx: 351;
        readonly maxContainerWidth: "351px";
    };
    readonly tablet: {
        readonly name: "Tablet";
        readonly description: "Tablets em orientação retrato/paisagem e telas intermediárias";
        readonly minWidthPx: 768;
        readonly minWidth: "768px";
        readonly canvasWidthPx: 1280;
        readonly columns: 8;
        readonly columnWidthPx: 133;
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly marginPx: 24;
        readonly margin: "24px";
        readonly maxContainerWidthPx: 1232;
        readonly maxContainerWidth: "1232px";
    };
    readonly notebook: {
        readonly name: "Notebook";
        readonly description: "Laptops, notebooks e monitores compactos";
        readonly minWidthPx: 1280;
        readonly minWidth: "1280px";
        readonly canvasWidthPx: 1440;
        readonly columns: 12;
        readonly columnWidthPx: 90;
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly marginPx: 48;
        readonly margin: "48px";
        readonly maxContainerWidthPx: 1344;
        readonly maxContainerWidth: "1344px";
    };
    readonly desktop: {
        readonly name: "Desktop";
        readonly description: "Monitores de alta resolução e monitores widescreen";
        readonly minWidthPx: 1920;
        readonly minWidth: "1920px";
        readonly canvasWidthPx: 1920;
        readonly columns: 12;
        readonly columnWidthPx: 130;
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly marginPx: 48;
        readonly margin: "48px";
        readonly maxContainerWidthPx: 1824;
        readonly maxContainerWidth: "1824px";
    };
};
/** Mapeamento de quantidade de colunas por breakpoint */
declare const gridColumns: {
    readonly mobile: 4;
    readonly tablet: 8;
    readonly notebook: 12;
    readonly desktop: 12;
};
/** Mapeamento de espaçamentos entre colunas (gutters) por breakpoint */
declare const gridGutters: {
    readonly mobile: "12px";
    readonly tablet: "24px";
    readonly notebook: "24px";
    readonly desktop: "24px";
};
/** Mapeamento de margens laterais externas por breakpoint */
declare const gridMargins: {
    readonly mobile: "12px";
    readonly tablet: "24px";
    readonly notebook: "48px";
    readonly desktop: "48px";
};
/** Mapeamento de larguras máximas de container por breakpoint */
declare const gridContainerWidths: {
    readonly mobile: "351px";
    readonly tablet: "1232px";
    readonly notebook: "1344px";
    readonly desktop: "1824px";
};
/** Mapeamento de pontos de interrupção (breakpoints de media query) */
declare const breakpoints: {
    readonly mobile: "0px";
    readonly tablet: "768px";
    readonly notebook: "1280px";
    readonly desktop: "1920px";
};
/**
 * ESPECIFICAÇÕES DE GRIDS WIDGETS
 * Extraídas diretamente do Figma (node 17777:3282 - Grids Widgets)
 */
type GridWidgetKey = 'mobile360' | 'mobile375' | 'tabletPortrait' | 'tabletLandscape' | 'notebook' | 'desktop';
interface WidgetLayoutItem {
    /** Nome ou rótulo da área do widget */
    label: string;
    /** Número de colunas ocupadas (span) */
    columnsSpan: number;
    /** Largura de referência no canvas em px */
    widthPx: number;
    /** Percentual de flexibilidade referente à largura do canvas */
    flexiblePercentage: string;
    /** Valor numérico do percentual */
    percentageValue: number;
}
interface GridWidgetSpec {
    /** Identificador legível */
    name: string;
    /** Categoria do dispositivo */
    deviceCategory: 'Mobile' | 'Tablet' | 'Notebook' | 'Desktop';
    /** Orientação ou nota */
    orientation?: string;
    /** Largura de referência do canvas no Figma */
    canvasWidthPx: number;
    /** Margem lateral / padding externo em px */
    marginPx: number;
    /** Margem lateral formatada */
    margin: string;
    /** Gutter / Gap entre widgets em px */
    gutterPx: number;
    /** Gutter formatado */
    gutter: string;
    /** Lista de widgets dispostos no layout de referência */
    widgets: readonly WidgetLayoutItem[];
}
/** Configuração detalhada dos layouts de Grids Widgets por breakpoint do Figma */
declare const gridWidgetsBreakpoints: {
    readonly mobile360: {
        readonly name: "Mobile 360px";
        readonly deviceCategory: "Mobile";
        readonly canvasWidthPx: 360;
        readonly marginPx: 16;
        readonly margin: "16px";
        readonly gutterPx: 0;
        readonly gutter: "0px";
        readonly widgets: readonly [{
            readonly label: "Widget Unico";
            readonly columnsSpan: 4;
            readonly widthPx: 328;
            readonly flexiblePercentage: "93,33%";
            readonly percentageValue: 93.33;
        }];
    };
    readonly mobile375: {
        readonly name: "Mobile 375px";
        readonly deviceCategory: "Mobile";
        readonly canvasWidthPx: 375;
        readonly marginPx: 16;
        readonly margin: "16px";
        readonly gutterPx: 0;
        readonly gutter: "0px";
        readonly widgets: readonly [{
            readonly label: "Widget Unico";
            readonly columnsSpan: 4;
            readonly widthPx: 343;
            readonly flexiblePercentage: "93,60%";
            readonly percentageValue: 93.6;
        }];
    };
    readonly tabletPortrait: {
        readonly name: "Tablet (Retrato)";
        readonly deviceCategory: "Tablet";
        readonly orientation: "Portrait";
        readonly canvasWidthPx: 800;
        readonly marginPx: 24;
        readonly margin: "24px";
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly widgets: readonly [{
            readonly label: "Widget Card 1";
            readonly columnsSpan: 4;
            readonly widthPx: 336;
            readonly flexiblePercentage: "42,00%";
            readonly percentageValue: 42;
        }, {
            readonly label: "Widget Card 2";
            readonly columnsSpan: 4;
            readonly widthPx: 336;
            readonly flexiblePercentage: "42,00%";
            readonly percentageValue: 42;
        }];
    };
    readonly tabletLandscape: {
        readonly name: "Tablet (Paisagem)";
        readonly deviceCategory: "Tablet";
        readonly orientation: "Landscape";
        readonly canvasWidthPx: 1280;
        readonly marginPx: 24;
        readonly margin: "24px";
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly widgets: readonly [{
            readonly label: "Widget Card";
            readonly columnsSpan: 2;
            readonly widthPx: 336;
            readonly flexiblePercentage: "26,25%";
            readonly percentageValue: 26.25;
        }, {
            readonly label: "Widget Card";
            readonly columnsSpan: 2;
            readonly widthPx: 336;
            readonly flexiblePercentage: "26,25%";
            readonly percentageValue: 26.25;
        }];
    };
    readonly notebook: {
        readonly name: "Notebook";
        readonly deviceCategory: "Notebook";
        readonly canvasWidthPx: 1440;
        readonly marginPx: 48;
        readonly margin: "48px";
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly widgets: readonly [{
            readonly label: "Widget Esquerda";
            readonly columnsSpan: 2;
            readonly widthPx: 204;
            readonly flexiblePercentage: "14,17%";
            readonly percentageValue: 14.17;
        }, {
            readonly label: "Widget Central";
            readonly columnsSpan: 6;
            readonly widthPx: 660;
            readonly flexiblePercentage: "45,83%";
            readonly percentageValue: 45.83;
        }, {
            readonly label: "Widget Direita";
            readonly columnsSpan: 2;
            readonly widthPx: 204;
            readonly flexiblePercentage: "14,17%";
            readonly percentageValue: 14.17;
        }];
    };
    readonly desktop: {
        readonly name: "Desktop";
        readonly deviceCategory: "Desktop";
        readonly canvasWidthPx: 1920;
        readonly marginPx: 48;
        readonly margin: "48px";
        readonly gutterPx: 24;
        readonly gutter: "24px";
        readonly widgets: readonly [{
            readonly label: "Widget Esquerda";
            readonly columnsSpan: 2;
            readonly widthPx: 284;
            readonly flexiblePercentage: "14,79%";
            readonly percentageValue: 14.79;
        }, {
            readonly label: "Widget Central";
            readonly columnsSpan: 6;
            readonly widthPx: 900;
            readonly flexiblePercentage: "46,88%";
            readonly percentageValue: 46.88;
        }, {
            readonly label: "Widget Direita";
            readonly columnsSpan: 2;
            readonly widthPx: 284;
            readonly flexiblePercentage: "14,79%";
            readonly percentageValue: 14.79;
        }];
    };
};
/** Coleção agregada de Grid Tokens */
declare const unooriaGrids: {
    readonly gridBreakpoints: {
        readonly mobile: {
            readonly name: "Mobile";
            readonly description: "Dispositivos móveis e telas pequenas (smartphones)";
            readonly minWidthPx: 0;
            readonly minWidth: "0px";
            readonly canvasWidthPx: 375;
            readonly columns: 4;
            readonly columnWidthPx: 75;
            readonly gutterPx: 12;
            readonly gutter: "12px";
            readonly marginPx: 12;
            readonly margin: "12px";
            readonly maxContainerWidthPx: 351;
            readonly maxContainerWidth: "351px";
        };
        readonly tablet: {
            readonly name: "Tablet";
            readonly description: "Tablets em orientação retrato/paisagem e telas intermediárias";
            readonly minWidthPx: 768;
            readonly minWidth: "768px";
            readonly canvasWidthPx: 1280;
            readonly columns: 8;
            readonly columnWidthPx: 133;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly maxContainerWidthPx: 1232;
            readonly maxContainerWidth: "1232px";
        };
        readonly notebook: {
            readonly name: "Notebook";
            readonly description: "Laptops, notebooks e monitores compactos";
            readonly minWidthPx: 1280;
            readonly minWidth: "1280px";
            readonly canvasWidthPx: 1440;
            readonly columns: 12;
            readonly columnWidthPx: 90;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly maxContainerWidthPx: 1344;
            readonly maxContainerWidth: "1344px";
        };
        readonly desktop: {
            readonly name: "Desktop";
            readonly description: "Monitores de alta resolução e monitores widescreen";
            readonly minWidthPx: 1920;
            readonly minWidth: "1920px";
            readonly canvasWidthPx: 1920;
            readonly columns: 12;
            readonly columnWidthPx: 130;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly maxContainerWidthPx: 1824;
            readonly maxContainerWidth: "1824px";
        };
    };
    readonly gridColumns: {
        readonly mobile: 4;
        readonly tablet: 8;
        readonly notebook: 12;
        readonly desktop: 12;
    };
    readonly gridGutters: {
        readonly mobile: "12px";
        readonly tablet: "24px";
        readonly notebook: "24px";
        readonly desktop: "24px";
    };
    readonly gridMargins: {
        readonly mobile: "12px";
        readonly tablet: "24px";
        readonly notebook: "48px";
        readonly desktop: "48px";
    };
    readonly gridContainerWidths: {
        readonly mobile: "351px";
        readonly tablet: "1232px";
        readonly notebook: "1344px";
        readonly desktop: "1824px";
    };
    readonly breakpoints: {
        readonly mobile: "0px";
        readonly tablet: "768px";
        readonly notebook: "1280px";
        readonly desktop: "1920px";
    };
    readonly gridWidgetsBreakpoints: {
        readonly mobile360: {
            readonly name: "Mobile 360px";
            readonly deviceCategory: "Mobile";
            readonly canvasWidthPx: 360;
            readonly marginPx: 16;
            readonly margin: "16px";
            readonly gutterPx: 0;
            readonly gutter: "0px";
            readonly widgets: readonly [{
                readonly label: "Widget Unico";
                readonly columnsSpan: 4;
                readonly widthPx: 328;
                readonly flexiblePercentage: "93,33%";
                readonly percentageValue: 93.33;
            }];
        };
        readonly mobile375: {
            readonly name: "Mobile 375px";
            readonly deviceCategory: "Mobile";
            readonly canvasWidthPx: 375;
            readonly marginPx: 16;
            readonly margin: "16px";
            readonly gutterPx: 0;
            readonly gutter: "0px";
            readonly widgets: readonly [{
                readonly label: "Widget Unico";
                readonly columnsSpan: 4;
                readonly widthPx: 343;
                readonly flexiblePercentage: "93,60%";
                readonly percentageValue: 93.6;
            }];
        };
        readonly tabletPortrait: {
            readonly name: "Tablet (Retrato)";
            readonly deviceCategory: "Tablet";
            readonly orientation: "Portrait";
            readonly canvasWidthPx: 800;
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Card 1";
                readonly columnsSpan: 4;
                readonly widthPx: 336;
                readonly flexiblePercentage: "42,00%";
                readonly percentageValue: 42;
            }, {
                readonly label: "Widget Card 2";
                readonly columnsSpan: 4;
                readonly widthPx: 336;
                readonly flexiblePercentage: "42,00%";
                readonly percentageValue: 42;
            }];
        };
        readonly tabletLandscape: {
            readonly name: "Tablet (Paisagem)";
            readonly deviceCategory: "Tablet";
            readonly orientation: "Landscape";
            readonly canvasWidthPx: 1280;
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Card";
                readonly columnsSpan: 2;
                readonly widthPx: 336;
                readonly flexiblePercentage: "26,25%";
                readonly percentageValue: 26.25;
            }, {
                readonly label: "Widget Card";
                readonly columnsSpan: 2;
                readonly widthPx: 336;
                readonly flexiblePercentage: "26,25%";
                readonly percentageValue: 26.25;
            }];
        };
        readonly notebook: {
            readonly name: "Notebook";
            readonly deviceCategory: "Notebook";
            readonly canvasWidthPx: 1440;
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Esquerda";
                readonly columnsSpan: 2;
                readonly widthPx: 204;
                readonly flexiblePercentage: "14,17%";
                readonly percentageValue: 14.17;
            }, {
                readonly label: "Widget Central";
                readonly columnsSpan: 6;
                readonly widthPx: 660;
                readonly flexiblePercentage: "45,83%";
                readonly percentageValue: 45.83;
            }, {
                readonly label: "Widget Direita";
                readonly columnsSpan: 2;
                readonly widthPx: 204;
                readonly flexiblePercentage: "14,17%";
                readonly percentageValue: 14.17;
            }];
        };
        readonly desktop: {
            readonly name: "Desktop";
            readonly deviceCategory: "Desktop";
            readonly canvasWidthPx: 1920;
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Esquerda";
                readonly columnsSpan: 2;
                readonly widthPx: 284;
                readonly flexiblePercentage: "14,79%";
                readonly percentageValue: 14.79;
            }, {
                readonly label: "Widget Central";
                readonly columnsSpan: 6;
                readonly widthPx: 900;
                readonly flexiblePercentage: "46,88%";
                readonly percentageValue: 46.88;
            }, {
                readonly label: "Widget Direita";
                readonly columnsSpan: 2;
                readonly widthPx: 284;
                readonly flexiblePercentage: "14,79%";
                readonly percentageValue: 14.79;
            }];
        };
    };
};
declare const grids: {
    readonly gridBreakpoints: {
        readonly mobile: {
            readonly name: "Mobile";
            readonly description: "Dispositivos móveis e telas pequenas (smartphones)";
            readonly minWidthPx: 0;
            readonly minWidth: "0px";
            readonly canvasWidthPx: 375;
            readonly columns: 4;
            readonly columnWidthPx: 75;
            readonly gutterPx: 12;
            readonly gutter: "12px";
            readonly marginPx: 12;
            readonly margin: "12px";
            readonly maxContainerWidthPx: 351;
            readonly maxContainerWidth: "351px";
        };
        readonly tablet: {
            readonly name: "Tablet";
            readonly description: "Tablets em orientação retrato/paisagem e telas intermediárias";
            readonly minWidthPx: 768;
            readonly minWidth: "768px";
            readonly canvasWidthPx: 1280;
            readonly columns: 8;
            readonly columnWidthPx: 133;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly maxContainerWidthPx: 1232;
            readonly maxContainerWidth: "1232px";
        };
        readonly notebook: {
            readonly name: "Notebook";
            readonly description: "Laptops, notebooks e monitores compactos";
            readonly minWidthPx: 1280;
            readonly minWidth: "1280px";
            readonly canvasWidthPx: 1440;
            readonly columns: 12;
            readonly columnWidthPx: 90;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly maxContainerWidthPx: 1344;
            readonly maxContainerWidth: "1344px";
        };
        readonly desktop: {
            readonly name: "Desktop";
            readonly description: "Monitores de alta resolução e monitores widescreen";
            readonly minWidthPx: 1920;
            readonly minWidth: "1920px";
            readonly canvasWidthPx: 1920;
            readonly columns: 12;
            readonly columnWidthPx: 130;
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly maxContainerWidthPx: 1824;
            readonly maxContainerWidth: "1824px";
        };
    };
    readonly gridColumns: {
        readonly mobile: 4;
        readonly tablet: 8;
        readonly notebook: 12;
        readonly desktop: 12;
    };
    readonly gridGutters: {
        readonly mobile: "12px";
        readonly tablet: "24px";
        readonly notebook: "24px";
        readonly desktop: "24px";
    };
    readonly gridMargins: {
        readonly mobile: "12px";
        readonly tablet: "24px";
        readonly notebook: "48px";
        readonly desktop: "48px";
    };
    readonly gridContainerWidths: {
        readonly mobile: "351px";
        readonly tablet: "1232px";
        readonly notebook: "1344px";
        readonly desktop: "1824px";
    };
    readonly breakpoints: {
        readonly mobile: "0px";
        readonly tablet: "768px";
        readonly notebook: "1280px";
        readonly desktop: "1920px";
    };
    readonly gridWidgetsBreakpoints: {
        readonly mobile360: {
            readonly name: "Mobile 360px";
            readonly deviceCategory: "Mobile";
            readonly canvasWidthPx: 360;
            readonly marginPx: 16;
            readonly margin: "16px";
            readonly gutterPx: 0;
            readonly gutter: "0px";
            readonly widgets: readonly [{
                readonly label: "Widget Unico";
                readonly columnsSpan: 4;
                readonly widthPx: 328;
                readonly flexiblePercentage: "93,33%";
                readonly percentageValue: 93.33;
            }];
        };
        readonly mobile375: {
            readonly name: "Mobile 375px";
            readonly deviceCategory: "Mobile";
            readonly canvasWidthPx: 375;
            readonly marginPx: 16;
            readonly margin: "16px";
            readonly gutterPx: 0;
            readonly gutter: "0px";
            readonly widgets: readonly [{
                readonly label: "Widget Unico";
                readonly columnsSpan: 4;
                readonly widthPx: 343;
                readonly flexiblePercentage: "93,60%";
                readonly percentageValue: 93.6;
            }];
        };
        readonly tabletPortrait: {
            readonly name: "Tablet (Retrato)";
            readonly deviceCategory: "Tablet";
            readonly orientation: "Portrait";
            readonly canvasWidthPx: 800;
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Card 1";
                readonly columnsSpan: 4;
                readonly widthPx: 336;
                readonly flexiblePercentage: "42,00%";
                readonly percentageValue: 42;
            }, {
                readonly label: "Widget Card 2";
                readonly columnsSpan: 4;
                readonly widthPx: 336;
                readonly flexiblePercentage: "42,00%";
                readonly percentageValue: 42;
            }];
        };
        readonly tabletLandscape: {
            readonly name: "Tablet (Paisagem)";
            readonly deviceCategory: "Tablet";
            readonly orientation: "Landscape";
            readonly canvasWidthPx: 1280;
            readonly marginPx: 24;
            readonly margin: "24px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Card";
                readonly columnsSpan: 2;
                readonly widthPx: 336;
                readonly flexiblePercentage: "26,25%";
                readonly percentageValue: 26.25;
            }, {
                readonly label: "Widget Card";
                readonly columnsSpan: 2;
                readonly widthPx: 336;
                readonly flexiblePercentage: "26,25%";
                readonly percentageValue: 26.25;
            }];
        };
        readonly notebook: {
            readonly name: "Notebook";
            readonly deviceCategory: "Notebook";
            readonly canvasWidthPx: 1440;
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Esquerda";
                readonly columnsSpan: 2;
                readonly widthPx: 204;
                readonly flexiblePercentage: "14,17%";
                readonly percentageValue: 14.17;
            }, {
                readonly label: "Widget Central";
                readonly columnsSpan: 6;
                readonly widthPx: 660;
                readonly flexiblePercentage: "45,83%";
                readonly percentageValue: 45.83;
            }, {
                readonly label: "Widget Direita";
                readonly columnsSpan: 2;
                readonly widthPx: 204;
                readonly flexiblePercentage: "14,17%";
                readonly percentageValue: 14.17;
            }];
        };
        readonly desktop: {
            readonly name: "Desktop";
            readonly deviceCategory: "Desktop";
            readonly canvasWidthPx: 1920;
            readonly marginPx: 48;
            readonly margin: "48px";
            readonly gutterPx: 24;
            readonly gutter: "24px";
            readonly widgets: readonly [{
                readonly label: "Widget Esquerda";
                readonly columnsSpan: 2;
                readonly widthPx: 284;
                readonly flexiblePercentage: "14,79%";
                readonly percentageValue: 14.79;
            }, {
                readonly label: "Widget Central";
                readonly columnsSpan: 6;
                readonly widthPx: 900;
                readonly flexiblePercentage: "46,88%";
                readonly percentageValue: 46.88;
            }, {
                readonly label: "Widget Direita";
                readonly columnsSpan: 2;
                readonly widthPx: 284;
                readonly flexiblePercentage: "14,79%";
                readonly percentageValue: 14.79;
            }];
        };
    };
};
/** Tipos derivados de Grid */
type UnooriaGridTokens = typeof gridBreakpoints;
type UnooriaGridWidgetTokens = typeof gridWidgetsBreakpoints;
type UnooriaGridsTokens = typeof unooriaGrids;

/**
 * Exportação de Tokens do Design System Plataforma Unooria
 * Padrão Ouro de Pacote NPM
 */

type index$1_BackgroundBlurLevel = BackgroundBlurLevel;
type index$1_BackgroundBlurTokens = BackgroundBlurTokens;
type index$1_BlurToken = BlurToken;
type index$1_BrandBlueOverlayTokens = BrandBlueOverlayTokens;
type index$1_BrandBlueScale = BrandBlueScale;
type index$1_BrandBlueTokens = BrandBlueTokens;
type index$1_BrandNavyOverlayTokens = BrandNavyOverlayTokens;
type index$1_BrandNavyScale = BrandNavyScale;
type index$1_BrandNavyTokens = BrandNavyTokens;
type index$1_BrandOrangeOverlayTokens = BrandOrangeOverlayTokens;
type index$1_BrandOrangeScale = BrandOrangeScale;
type index$1_BrandOrangeTokens = BrandOrangeTokens;
type index$1_BrandPurpleOverlayTokens = BrandPurpleOverlayTokens;
type index$1_BrandPurpleScale = BrandPurpleScale;
type index$1_BrandPurpleTokens = BrandPurpleTokens;
type index$1_DangerOverlayTokens = DangerOverlayTokens;
type index$1_DangerScale = DangerScale;
type index$1_DangerTokens = DangerTokens;
type index$1_DesktopFontSizesTokens = DesktopFontSizesTokens;
type index$1_DesktopLineHeightsTokens = DesktopLineHeightsTokens;
type index$1_ElevationCategory = ElevationCategory;
type index$1_ElevationTokenDetail = ElevationTokenDetail;
type index$1_FontFamiliesTokens = FontFamiliesTokens;
type index$1_FontWeightsTokens = FontWeightsTokens;
type index$1_GradientKey = GradientKey;
type index$1_GradientTokens = GradientTokens;
type index$1_GridBreakpointConfig = GridBreakpointConfig;
type index$1_GridBreakpointKey = GridBreakpointKey;
type index$1_GridWidgetKey = GridWidgetKey;
type index$1_GridWidgetSpec = GridWidgetSpec;
type index$1_InfoOverlayTokens = InfoOverlayTokens;
type index$1_InfoScale = InfoScale;
type index$1_InfoTokens = InfoTokens;
type index$1_LetterSpacingsTokens = LetterSpacingsTokens;
type index$1_MobileFontSizesTokens = MobileFontSizesTokens;
type index$1_MobileLineHeightsTokens = MobileLineHeightsTokens;
type index$1_NeutralDarkOverlayTokens = NeutralDarkOverlayTokens;
type index$1_NeutralDarkScale = NeutralDarkScale;
type index$1_NeutralDarkTokens = NeutralDarkTokens;
type index$1_NeutralLightOverlayTokens = NeutralLightOverlayTokens;
type index$1_NeutralScale = NeutralScale;
type index$1_NeutralTokens = NeutralTokens;
type index$1_RecommendedWeight = RecommendedWeight;
type index$1_SpacingTokenDetail = SpacingTokenDetail;
type index$1_SuccessOverlayTokens = SuccessOverlayTokens;
type index$1_SuccessScale = SuccessScale;
type index$1_SuccessTokens = SuccessTokens;
type index$1_TypographyStylesTokens = TypographyStylesTokens;
type index$1_TypographyTokenStyle = TypographyTokenStyle;
type index$1_UnooriaBlurKey = UnooriaBlurKey;
type index$1_UnooriaBlurTokens = UnooriaBlurTokens;
type index$1_UnooriaBlurValue = UnooriaBlurValue;
type index$1_UnooriaColorGroup = UnooriaColorGroup;
type index$1_UnooriaColorKey = UnooriaColorKey;
type index$1_UnooriaColorTokens = UnooriaColorTokens;
type index$1_UnooriaElevationKey = UnooriaElevationKey;
type index$1_UnooriaElevationTokens = UnooriaElevationTokens;
type index$1_UnooriaElevationValue = UnooriaElevationValue;
type index$1_UnooriaFontFamilyKey = UnooriaFontFamilyKey;
type index$1_UnooriaFontSizeKey = UnooriaFontSizeKey;
type index$1_UnooriaFontWeightKey = UnooriaFontWeightKey;
type index$1_UnooriaGridTokens = UnooriaGridTokens;
type index$1_UnooriaGridWidgetTokens = UnooriaGridWidgetTokens;
type index$1_UnooriaGridsTokens = UnooriaGridsTokens;
type index$1_UnooriaLetterSpacingKey = UnooriaLetterSpacingKey;
type index$1_UnooriaLineHeightKey = UnooriaLineHeightKey;
type index$1_UnooriaSpacingKey = UnooriaSpacingKey;
type index$1_UnooriaSpacingPxTokens = UnooriaSpacingPxTokens;
type index$1_UnooriaSpacingRemTokens = UnooriaSpacingRemTokens;
type index$1_UnooriaSpacingTokens = UnooriaSpacingTokens;
type index$1_UnooriaSpacingValue = UnooriaSpacingValue;
type index$1_UnooriaTheme = UnooriaTheme;
type index$1_UnooriaTypographyStyleKey = UnooriaTypographyStyleKey;
type index$1_UnooriaTypographyTokens = UnooriaTypographyTokens;
type index$1_WarningOverlayTokens = WarningOverlayTokens;
type index$1_WarningScale = WarningScale;
type index$1_WarningTokens = WarningTokens;
type index$1_WidgetLayoutItem = WidgetLayoutItem;
declare const index$1_backgroundBlur: typeof backgroundBlur;
declare const index$1_blur: typeof blur;
declare const index$1_brandBlue: typeof brandBlue;
declare const index$1_brandBlueOverlay: typeof brandBlueOverlay;
declare const index$1_brandNavy: typeof brandNavy;
declare const index$1_brandNavyOverlay: typeof brandNavyOverlay;
declare const index$1_brandOrange: typeof brandOrange;
declare const index$1_brandOrangeOverlay: typeof brandOrangeOverlay;
declare const index$1_brandPurple: typeof brandPurple;
declare const index$1_brandPurpleOverlay: typeof brandPurpleOverlay;
declare const index$1_breakpoints: typeof breakpoints;
declare const index$1_colors: typeof colors;
declare const index$1_danger: typeof danger;
declare const index$1_dangerOverlay: typeof dangerOverlay;
declare const index$1_desktopFontSizes: typeof desktopFontSizes;
declare const index$1_desktopLineHeights: typeof desktopLineHeights;
declare const index$1_elevation: typeof elevation;
declare const index$1_fontFamilies: typeof fontFamilies;
declare const index$1_fontSizes: typeof fontSizes;
declare const index$1_fontWeights: typeof fontWeights;
declare const index$1_gradients: typeof gradients;
declare const index$1_gridBreakpoints: typeof gridBreakpoints;
declare const index$1_gridColumns: typeof gridColumns;
declare const index$1_gridContainerWidths: typeof gridContainerWidths;
declare const index$1_gridGutters: typeof gridGutters;
declare const index$1_gridMargins: typeof gridMargins;
declare const index$1_gridWidgetsBreakpoints: typeof gridWidgetsBreakpoints;
declare const index$1_grids: typeof grids;
declare const index$1_info: typeof info;
declare const index$1_infoOverlay: typeof infoOverlay;
declare const index$1_letterSpacings: typeof letterSpacings;
declare const index$1_lineHeights: typeof lineHeights;
declare const index$1_mobileFontSizes: typeof mobileFontSizes;
declare const index$1_mobileLineHeights: typeof mobileLineHeights;
declare const index$1_neutral: typeof neutral;
declare const index$1_neutralDark: typeof neutralDark;
declare const index$1_neutralDarkOverlay: typeof neutralDarkOverlay;
declare const index$1_neutralLightOverlay: typeof neutralLightOverlay;
declare const index$1_spacing: typeof spacing;
declare const index$1_success: typeof success;
declare const index$1_successOverlay: typeof successOverlay;
declare const index$1_typography: typeof typography;
declare const index$1_typographyRules: typeof typographyRules;
declare const index$1_typographyStyles: typeof typographyStyles;
declare const index$1_unooriaColors: typeof unooriaColors;
declare const index$1_unooriaElevation: typeof unooriaElevation;
declare const index$1_unooriaGrids: typeof unooriaGrids;
declare const index$1_unooriaSpacing: typeof unooriaSpacing;
declare const index$1_unooriaSpacingPx: typeof unooriaSpacingPx;
declare const index$1_unooriaSpacingRem: typeof unooriaSpacingRem;
declare const index$1_unooriaTypography: typeof unooriaTypography;
declare const index$1_warning: typeof warning;
declare const index$1_warningOverlay: typeof warningOverlay;
declare namespace index$1 {
  export { type index$1_BackgroundBlurLevel as BackgroundBlurLevel, type index$1_BackgroundBlurTokens as BackgroundBlurTokens, type index$1_BlurToken as BlurToken, type index$1_BrandBlueOverlayTokens as BrandBlueOverlayTokens, type index$1_BrandBlueScale as BrandBlueScale, type index$1_BrandBlueTokens as BrandBlueTokens, type index$1_BrandNavyOverlayTokens as BrandNavyOverlayTokens, type index$1_BrandNavyScale as BrandNavyScale, type index$1_BrandNavyTokens as BrandNavyTokens, type index$1_BrandOrangeOverlayTokens as BrandOrangeOverlayTokens, type index$1_BrandOrangeScale as BrandOrangeScale, type index$1_BrandOrangeTokens as BrandOrangeTokens, type index$1_BrandPurpleOverlayTokens as BrandPurpleOverlayTokens, type index$1_BrandPurpleScale as BrandPurpleScale, type index$1_BrandPurpleTokens as BrandPurpleTokens, type index$1_DangerOverlayTokens as DangerOverlayTokens, type index$1_DangerScale as DangerScale, type index$1_DangerTokens as DangerTokens, type index$1_DesktopFontSizesTokens as DesktopFontSizesTokens, type index$1_DesktopLineHeightsTokens as DesktopLineHeightsTokens, type index$1_ElevationCategory as ElevationCategory, type index$1_ElevationTokenDetail as ElevationTokenDetail, type index$1_FontFamiliesTokens as FontFamiliesTokens, type index$1_FontWeightsTokens as FontWeightsTokens, type index$1_GradientKey as GradientKey, type index$1_GradientTokens as GradientTokens, type index$1_GridBreakpointConfig as GridBreakpointConfig, type index$1_GridBreakpointKey as GridBreakpointKey, type index$1_GridWidgetKey as GridWidgetKey, type index$1_GridWidgetSpec as GridWidgetSpec, type index$1_InfoOverlayTokens as InfoOverlayTokens, type index$1_InfoScale as InfoScale, type index$1_InfoTokens as InfoTokens, type index$1_LetterSpacingsTokens as LetterSpacingsTokens, type index$1_MobileFontSizesTokens as MobileFontSizesTokens, type index$1_MobileLineHeightsTokens as MobileLineHeightsTokens, type index$1_NeutralDarkOverlayTokens as NeutralDarkOverlayTokens, type index$1_NeutralDarkScale as NeutralDarkScale, type index$1_NeutralDarkTokens as NeutralDarkTokens, type index$1_NeutralLightOverlayTokens as NeutralLightOverlayTokens, type index$1_NeutralScale as NeutralScale, type index$1_NeutralTokens as NeutralTokens, type index$1_RecommendedWeight as RecommendedWeight, type index$1_SpacingTokenDetail as SpacingTokenDetail, type index$1_SuccessOverlayTokens as SuccessOverlayTokens, type index$1_SuccessScale as SuccessScale, type index$1_SuccessTokens as SuccessTokens, type index$1_TypographyStylesTokens as TypographyStylesTokens, type index$1_TypographyTokenStyle as TypographyTokenStyle, type index$1_UnooriaBlurKey as UnooriaBlurKey, type index$1_UnooriaBlurTokens as UnooriaBlurTokens, type index$1_UnooriaBlurValue as UnooriaBlurValue, type index$1_UnooriaColorGroup as UnooriaColorGroup, type index$1_UnooriaColorKey as UnooriaColorKey, type index$1_UnooriaColorTokens as UnooriaColorTokens, type index$1_UnooriaElevationKey as UnooriaElevationKey, type index$1_UnooriaElevationTokens as UnooriaElevationTokens, type index$1_UnooriaElevationValue as UnooriaElevationValue, type index$1_UnooriaFontFamilyKey as UnooriaFontFamilyKey, type index$1_UnooriaFontSizeKey as UnooriaFontSizeKey, type index$1_UnooriaFontWeightKey as UnooriaFontWeightKey, type index$1_UnooriaGridTokens as UnooriaGridTokens, type index$1_UnooriaGridWidgetTokens as UnooriaGridWidgetTokens, type index$1_UnooriaGridsTokens as UnooriaGridsTokens, type index$1_UnooriaLetterSpacingKey as UnooriaLetterSpacingKey, type index$1_UnooriaLineHeightKey as UnooriaLineHeightKey, type index$1_UnooriaSpacingKey as UnooriaSpacingKey, type index$1_UnooriaSpacingPxTokens as UnooriaSpacingPxTokens, type index$1_UnooriaSpacingRemTokens as UnooriaSpacingRemTokens, type index$1_UnooriaSpacingTokens as UnooriaSpacingTokens, type index$1_UnooriaSpacingValue as UnooriaSpacingValue, type index$1_UnooriaTheme as UnooriaTheme, type index$1_UnooriaTypographyStyleKey as UnooriaTypographyStyleKey, type index$1_UnooriaTypographyTokens as UnooriaTypographyTokens, type index$1_WarningOverlayTokens as WarningOverlayTokens, type index$1_WarningScale as WarningScale, type index$1_WarningTokens as WarningTokens, type index$1_WidgetLayoutItem as WidgetLayoutItem, index$1_backgroundBlur as backgroundBlur, index$1_blur as blur, index$1_brandBlue as brandBlue, index$1_brandBlueOverlay as brandBlueOverlay, index$1_brandNavy as brandNavy, index$1_brandNavyOverlay as brandNavyOverlay, index$1_brandOrange as brandOrange, index$1_brandOrangeOverlay as brandOrangeOverlay, index$1_brandPurple as brandPurple, index$1_brandPurpleOverlay as brandPurpleOverlay, index$1_breakpoints as breakpoints, index$1_colors as colors, index$1_danger as danger, index$1_dangerOverlay as dangerOverlay, index$1_desktopFontSizes as desktopFontSizes, index$1_desktopLineHeights as desktopLineHeights, index$1_elevation as elevation, index$1_fontFamilies as fontFamilies, index$1_fontSizes as fontSizes, index$1_fontWeights as fontWeights, index$1_gradients as gradients, index$1_gridBreakpoints as gridBreakpoints, index$1_gridColumns as gridColumns, index$1_gridContainerWidths as gridContainerWidths, index$1_gridGutters as gridGutters, index$1_gridMargins as gridMargins, index$1_gridWidgetsBreakpoints as gridWidgetsBreakpoints, index$1_grids as grids, index$1_info as info, index$1_infoOverlay as infoOverlay, index$1_letterSpacings as letterSpacings, index$1_lineHeights as lineHeights, index$1_mobileFontSizes as mobileFontSizes, index$1_mobileLineHeights as mobileLineHeights, index$1_neutral as neutral, index$1_neutralDark as neutralDark, index$1_neutralDarkOverlay as neutralDarkOverlay, index$1_neutralLightOverlay as neutralLightOverlay, index$1_spacing as spacing, index$1_success as success, index$1_successOverlay as successOverlay, index$1_typography as typography, index$1_typographyRules as typographyRules, index$1_typographyStyles as typographyStyles, index$1_unooriaColors as unooriaColors, index$1_unooriaElevation as unooriaElevation, index$1_unooriaGrids as unooriaGrids, index$1_unooriaSpacing as unooriaSpacing, index$1_unooriaSpacingPx as unooriaSpacingPx, index$1_unooriaSpacingRem as unooriaSpacingRem, index$1_unooriaTypography as unooriaTypography, index$1_warning as warning, index$1_warningOverlay as warningOverlay };
}

/**
 * Variantes de severidade suportadas pelo AlertBox
 */
type AlertBoxVariant = 'info' | 'success' | 'warning' | 'error';
/**
 * Temas visuais suportados pelo AlertBox
 */
type AlertBoxTheme = 'light' | 'dark';
/**
 * Propriedades do componente AlertBox
 */
interface AlertBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * Tipo / Severidade do alerta.
     * @default 'info'
     */
    variant?: AlertBoxVariant;
    /**
     * Título principal do alerta.
     */
    title?: React.ReactNode;
    /**
     * Descrição detalhada do alerta.
     */
    description?: React.ReactNode;
    /**
     * Conteúdo flexível do alerta (usado se description não for fornecido ou para conteúdo customizado).
     */
    children?: React.ReactNode;
    /**
     * Ícone a ser exibido no alerta.
     * - `true` (padrão): Exibe o ícone padrão correspondente à variante.
     * - `false`: Oculta o ícone.
     * - `React.ReactNode`: Renderiza um ícone customizado fornecido.
     * @default true
     */
    icon?: boolean | React.ReactNode;
    /**
     * Indica se o alerta pode ser dispensado/fechado pelo usuário.
     * @default false
     */
    isDismissible?: boolean;
    /**
     * Callback executado ao clicar no botão de fechar/dispensar.
     */
    onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Elemento ou botão de ação individual.
     */
    action?: React.ReactNode;
    /**
     * Elementos ou botões de ações complementares.
     */
    actions?: React.ReactNode;
    /**
     * Elemento de ação (mantido para retrocompatibilidade com action).
     */
    actionButton?: React.ReactNode;
    /**
     * Se verdadeiro, exibe borda externa de destaque no alerta.
     * @default true
     */
    bordered?: boolean;
    /**
     * Tema visual do componente ('light' | 'dark').
     * @default 'light'
     */
    theme?: AlertBoxTheme;
}

/**
 * Componente AlertBox - Design System Unooria
 *
 * Exibe mensagens informativas, de confirmação/sucesso, aviso preventivo ou falhas críticas
 * de forma acessível, responsiva e alinhada às diretrizes de design do Figma.
 */
declare const AlertBox: React.ForwardRefExoticComponent<AlertBoxProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Variantes de status/cor do componente Badge.
 */
type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';
/**
 * Tamanhos disponíveis para o Badge.
 */
type BadgeSize = 'sm' | 'md' | 'lg';
/**
 * Alias retrocompatível para UnooriaTheme.
 */
type BadgeTheme = UnooriaTheme;
/**
 * Posição do ícone em relação ao texto do Badge.
 */
type BadgeIconPosition = 'left' | 'right';
/**
 * Propriedades do componente Badge da Plataforma Unooria.
 */
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Variante visual / status de cor do Badge.
     * Suporta: 'default', 'primary', 'success', 'warning', 'error', 'neutral', 'info'.
     * @default 'default'
     */
    variant?: BadgeVariant;
    /**
     * Alias alternativo e amigável para `variant`.
     * Se ambos forem fornecidos, `variant` possui precedência.
     */
    status?: BadgeVariant;
    /**
     * Tamanho do Badge.
     * Suporta 'sm' (pequeno: 20px), 'md' (médio: 24px) e 'lg' (grande: 30px).
     * @default 'md'
     */
    size?: BadgeSize;
    /**
     * Tema visual do componente ('light' | 'dark').
     * @default 'light'
     */
    theme?: UnooriaTheme;
    /**
     * Exibe um ponto (dot) de status colorido antecedendo o texto.
     * @default false
     */
    dot?: boolean;
    /**
     * Define o formato em pílula (arredondamento máximo de 9999px).
     * Se `false`, o Badge adquire bordas suavemente arredondadas (4px).
     * @default true
     */
    pill?: boolean;
    /**
     * Indica se o Badge está desabilitado (reduz a opacidade e desativa eventos interativos).
     * @default false
     */
    disabled?: boolean;
    /**
     * Se verdadeiro, renderiza um botão de fechar/remover (X) acessível ao lado do texto.
     * @default false
     */
    dismissible?: boolean;
    /**
     * Callback acionado ao clicar no botão de fechamento (X).
     */
    onClose?: (e: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
    /**
     * Ícone opcional (ReactNode ou elemento SVG).
     */
    icon?: React.ReactNode;
    /**
     * Posição do ícone em relação ao conteúdo ('left' | 'right').
     * @default 'left'
     */
    iconPosition?: 'left' | 'right';
    /**
     * Elemento ou componente HTML customizado para renderização polimórfica (ex: 'span', 'a', 'button', Link).
     * @default 'span'
     */
    as?: React.ElementType;
    /**
     * Atributos arbitrários adicionais para renderização polimórfica flexível.
     */
    [key: string]: any;
}

/**
 * Componente Badge - Design System Plataforma Unooria
 *
 * Elemento compacto e semântico para exibição de status, contagens numéricas,
 * categorias e etiquetas. Totalmente acessível, com suporte a temas Claro e Escuro,
 * prop polimórfica `as`, variantes de cores do Figma e botão dispensável.
 */
declare const Badge: React.ForwardRefExoticComponent<Omit<BadgeProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;

/**
 * Tamanhos de exibição tipográfica e espaçamento suportados pelo Breadcrumb.
 */
type BreadcrumbSize = 'xs' | 's' | 'm';
/**
 * Interface que representa um item individual do Breadcrumb.
 */
interface BreadcrumbItem {
    /**
     * Rótulo ou conteúdo visual do item (texto, elemento React, etc.).
     */
    label: React.ReactNode;
    /**
     * URL de destino do item. Se omitido ou se `isCurrent` for true, o item é renderizado como texto/botão sem link ativo.
     */
    href?: string;
    /**
     * Ícone opcional exibido antes do rótulo do item.
     */
    icon?: React.ReactNode;
    /**
     * Indica se este item representa a página atual.
     * Quando `true`, recebe o atributo `aria-current="page"` e estilização de estado ativo.
     */
    isCurrent?: boolean;
    /**
     * Handler opcional para o evento de clique.
     */
    onClick?: (event: React.MouseEvent<any>) => void;
    /**
     * Componente customizado ou polimórfico para renderização do link (ex: Next.js Link, React Router Link).
     */
    as?: React.ElementType;
    /**
     * Classe CSS adicional para o item/link.
     */
    className?: string;
    /**
     * Estilos CSS inline customizados para o item/link.
     */
    style?: React.CSSProperties;
    /**
     * Rótulo acessível individual para o item (leitores de tela).
     */
    ariaLabel?: string;
    /**
     * Propriedades extras arbitrárias passadas ao elemento do item (ex: `to`, `target`, `rel`, `data-*`).
     */
    [key: string]: any;
}
/**
 * Propriedades do componente Breadcrumb da Plataforma Unooria.
 */
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Lista de itens do breadcrumb em ordem hierárquica.
     */
    items: BreadcrumbItem[];
    /**
     * Elemento ou ícone customizado para separação entre itens.
     * Se não for fornecido, um ícone de seta (ChevronRight) otimizado é utilizado por padrão.
     */
    separator?: React.ReactNode;
    /**
     * Tema visual para o componente: 'light' (claro) ou 'dark' (escuro).
     * @default 'light'
     */
    theme?: UnooriaTheme;
    /**
     * Rótulo acessível da navegação estrutural para leitores de tela.
     * @default 'Breadcrumb'
     */
    ariaLabel?: string;
    /**
     * Tamanho de exibição da tipografia e espaçamentos.
     * @default 's'
     */
    size?: BreadcrumbSize;
    /**
     * Número máximo de itens visíveis antes de colapsar os itens intermediários em "...".
     */
    maxItems?: number;
    /**
     * Quantidade de itens visíveis no início da trilha antes do botão de colapso.
     * @default 1
     */
    itemsBeforeCollapse?: number;
    /**
     * Quantidade de itens visíveis no final da trilha após o botão de colapso.
     * @default 1
     */
    itemsAfterCollapse?: number;
}

/**
 * Componente Breadcrumb - Plataforma Unooria
 *
 * Exibe a hierarquia de navegação da página atual, garantindo total
 * acessibilidade (WCAG), suporte a Light/Dark Mode, ícones, polimorfismo (`as`) e colapso de itens.
 */
declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;

/**
 * Variantes visuais disponíveis para o Button
 */
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
/**
 * Escala de tamanhos padronizada da Unooria
 * - sm: 36px de altura
 * - md: 44px de altura (padrão)
 * - lg: 52px de altura
 */
type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Estados interativos e de homologação visual suportados
 */
type ButtonState = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading';

type ButtonTheme = UnooriaTheme;
/**
 * Propriedades públicas do componente Button
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Variante visual e nível hierárquico da ação */
    variant?: ButtonVariant;
    /** Tamanho do botão e escala tipográfica */
    size?: ButtonSize;
    /** Tema de cor da interface (Light ou Dark) */
    theme?: UnooriaTheme;
    /** Força um estado isolado para testes visuais e documentação */
    state?: ButtonState;
    /** Força o estado de hover */
    isHovered?: boolean;
    /** Força o estado ativo / pressionado */
    isActive?: boolean;
    /** Força o estado de foco */
    isFocused?: boolean;
    /** Desabilita o botão aplicando estilos e bloqueando interações */
    isDisabled?: boolean;
    /** Exibe indicador de carregamento animado (spinner) e bloqueia ações */
    isLoading?: boolean;
    /** Texto alternativo a ser exibido durante o estado de carregamento */
    loadingText?: string;
    /** Elemento ou ícone renderizado à esquerda do texto */
    leftIcon?: React.ReactNode;
    /** Elemento ou ícone renderizado à direita do texto */
    rightIcon?: React.ReactNode;
    /** Expande o botão para ocupar 100% da largura do contêiner */
    fullWidth?: boolean;
    /** Permite renderizar o botão como outro elemento React ou tag HTML (ex: 'a') */
    as?: React.ElementType;
    /** URL de destino quando renderizado como link */
    href?: string;
    /** Alvo de abertura quando renderizado como link */
    target?: string;
    /** Relação do link quando renderizado como link */
    rel?: string;
    /** Conteúdo interno ou rótulo textual do botão */
    children?: React.ReactNode;
    /** Classe CSS customizada */
    className?: string;
    /** Estilos inline customizados */
    style?: React.CSSProperties;
    /** Atributos arbitrários adicionais para renderização polimórfica */
    [key: string]: any;
}

/**
 * Componente Button do Design System Plataforma Unooria (Padrão Ouro NPM)
 *
 * Elemento de controle principal para acionar ações do usuário, submeter formulários
 * e guiar a navegação. Suporta 5 variantes visuais, 3 tamanhos, modos Claro e Escuro,
 * renderização polimórfica (ex: como tag `<a>`), ícones direcionais, spinner de
 * carregamento acessível e tratamento completo de estados interativos.
 */
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

/**
 * Ponto de entrada do módulo Unooria da Plataforma
 */

declare const index_AlertBox: typeof AlertBox;
type index_AlertBoxProps = AlertBoxProps;
type index_AlertBoxTheme = AlertBoxTheme;
type index_AlertBoxVariant = AlertBoxVariant;
type index_BackgroundBlurLevel = BackgroundBlurLevel;
type index_BackgroundBlurTokens = BackgroundBlurTokens;
declare const index_Badge: typeof Badge;
type index_BadgeIconPosition = BadgeIconPosition;
type index_BadgeProps = BadgeProps;
type index_BadgeSize = BadgeSize;
type index_BadgeTheme = BadgeTheme;
type index_BadgeVariant = BadgeVariant;
type index_BlurToken = BlurToken;
type index_BrandBlueOverlayTokens = BrandBlueOverlayTokens;
type index_BrandBlueScale = BrandBlueScale;
type index_BrandBlueTokens = BrandBlueTokens;
type index_BrandNavyOverlayTokens = BrandNavyOverlayTokens;
type index_BrandNavyScale = BrandNavyScale;
type index_BrandNavyTokens = BrandNavyTokens;
type index_BrandOrangeOverlayTokens = BrandOrangeOverlayTokens;
type index_BrandOrangeScale = BrandOrangeScale;
type index_BrandOrangeTokens = BrandOrangeTokens;
type index_BrandPurpleOverlayTokens = BrandPurpleOverlayTokens;
type index_BrandPurpleScale = BrandPurpleScale;
type index_BrandPurpleTokens = BrandPurpleTokens;
declare const index_Breadcrumb: typeof Breadcrumb;
type index_BreadcrumbItem = BreadcrumbItem;
type index_BreadcrumbProps = BreadcrumbProps;
type index_BreadcrumbSize = BreadcrumbSize;
declare const index_Button: typeof Button;
type index_ButtonProps = ButtonProps;
type index_ButtonSize = ButtonSize;
type index_ButtonState = ButtonState;
type index_ButtonTheme = ButtonTheme;
type index_ButtonVariant = ButtonVariant;
type index_DangerOverlayTokens = DangerOverlayTokens;
type index_DangerScale = DangerScale;
type index_DangerTokens = DangerTokens;
type index_DesktopFontSizesTokens = DesktopFontSizesTokens;
type index_DesktopLineHeightsTokens = DesktopLineHeightsTokens;
type index_ElevationCategory = ElevationCategory;
type index_ElevationTokenDetail = ElevationTokenDetail;
type index_FontFamiliesTokens = FontFamiliesTokens;
type index_FontWeightsTokens = FontWeightsTokens;
type index_GradientKey = GradientKey;
type index_GradientTokens = GradientTokens;
type index_GridBreakpointConfig = GridBreakpointConfig;
type index_GridBreakpointKey = GridBreakpointKey;
type index_GridWidgetKey = GridWidgetKey;
type index_GridWidgetSpec = GridWidgetSpec;
type index_InfoOverlayTokens = InfoOverlayTokens;
type index_InfoScale = InfoScale;
type index_InfoTokens = InfoTokens;
type index_LetterSpacingsTokens = LetterSpacingsTokens;
type index_MobileFontSizesTokens = MobileFontSizesTokens;
type index_MobileLineHeightsTokens = MobileLineHeightsTokens;
type index_NeutralDarkOverlayTokens = NeutralDarkOverlayTokens;
type index_NeutralDarkScale = NeutralDarkScale;
type index_NeutralDarkTokens = NeutralDarkTokens;
type index_NeutralLightOverlayTokens = NeutralLightOverlayTokens;
type index_NeutralScale = NeutralScale;
type index_NeutralTokens = NeutralTokens;
type index_RecommendedWeight = RecommendedWeight;
type index_SpacingTokenDetail = SpacingTokenDetail;
type index_SuccessOverlayTokens = SuccessOverlayTokens;
type index_SuccessScale = SuccessScale;
type index_SuccessTokens = SuccessTokens;
type index_TypographyStylesTokens = TypographyStylesTokens;
type index_TypographyTokenStyle = TypographyTokenStyle;
type index_UnooriaBlurKey = UnooriaBlurKey;
type index_UnooriaBlurTokens = UnooriaBlurTokens;
type index_UnooriaBlurValue = UnooriaBlurValue;
type index_UnooriaColorGroup = UnooriaColorGroup;
type index_UnooriaColorKey = UnooriaColorKey;
type index_UnooriaColorTokens = UnooriaColorTokens;
type index_UnooriaElevationKey = UnooriaElevationKey;
type index_UnooriaElevationTokens = UnooriaElevationTokens;
type index_UnooriaElevationValue = UnooriaElevationValue;
type index_UnooriaFontFamilyKey = UnooriaFontFamilyKey;
type index_UnooriaFontSizeKey = UnooriaFontSizeKey;
type index_UnooriaFontWeightKey = UnooriaFontWeightKey;
type index_UnooriaGridTokens = UnooriaGridTokens;
type index_UnooriaGridWidgetTokens = UnooriaGridWidgetTokens;
type index_UnooriaGridsTokens = UnooriaGridsTokens;
type index_UnooriaLetterSpacingKey = UnooriaLetterSpacingKey;
type index_UnooriaLineHeightKey = UnooriaLineHeightKey;
type index_UnooriaSpacingKey = UnooriaSpacingKey;
type index_UnooriaSpacingPxTokens = UnooriaSpacingPxTokens;
type index_UnooriaSpacingRemTokens = UnooriaSpacingRemTokens;
type index_UnooriaSpacingTokens = UnooriaSpacingTokens;
type index_UnooriaSpacingValue = UnooriaSpacingValue;
type index_UnooriaTheme = UnooriaTheme;
type index_UnooriaTypographyStyleKey = UnooriaTypographyStyleKey;
type index_UnooriaTypographyTokens = UnooriaTypographyTokens;
type index_WarningOverlayTokens = WarningOverlayTokens;
type index_WarningScale = WarningScale;
type index_WarningTokens = WarningTokens;
type index_WidgetLayoutItem = WidgetLayoutItem;
declare const index_backgroundBlur: typeof backgroundBlur;
declare const index_blur: typeof blur;
declare const index_brandBlue: typeof brandBlue;
declare const index_brandBlueOverlay: typeof brandBlueOverlay;
declare const index_brandNavy: typeof brandNavy;
declare const index_brandNavyOverlay: typeof brandNavyOverlay;
declare const index_brandOrange: typeof brandOrange;
declare const index_brandOrangeOverlay: typeof brandOrangeOverlay;
declare const index_brandPurple: typeof brandPurple;
declare const index_brandPurpleOverlay: typeof brandPurpleOverlay;
declare const index_breakpoints: typeof breakpoints;
declare const index_colors: typeof colors;
declare const index_danger: typeof danger;
declare const index_dangerOverlay: typeof dangerOverlay;
declare const index_desktopFontSizes: typeof desktopFontSizes;
declare const index_desktopLineHeights: typeof desktopLineHeights;
declare const index_elevation: typeof elevation;
declare const index_fontFamilies: typeof fontFamilies;
declare const index_fontSizes: typeof fontSizes;
declare const index_fontWeights: typeof fontWeights;
declare const index_gradients: typeof gradients;
declare const index_gridBreakpoints: typeof gridBreakpoints;
declare const index_gridColumns: typeof gridColumns;
declare const index_gridContainerWidths: typeof gridContainerWidths;
declare const index_gridGutters: typeof gridGutters;
declare const index_gridMargins: typeof gridMargins;
declare const index_gridWidgetsBreakpoints: typeof gridWidgetsBreakpoints;
declare const index_grids: typeof grids;
declare const index_info: typeof info;
declare const index_infoOverlay: typeof infoOverlay;
declare const index_letterSpacings: typeof letterSpacings;
declare const index_lineHeights: typeof lineHeights;
declare const index_mobileFontSizes: typeof mobileFontSizes;
declare const index_mobileLineHeights: typeof mobileLineHeights;
declare const index_neutral: typeof neutral;
declare const index_neutralDark: typeof neutralDark;
declare const index_neutralDarkOverlay: typeof neutralDarkOverlay;
declare const index_neutralLightOverlay: typeof neutralLightOverlay;
declare const index_spacing: typeof spacing;
declare const index_success: typeof success;
declare const index_successOverlay: typeof successOverlay;
declare const index_typography: typeof typography;
declare const index_typographyRules: typeof typographyRules;
declare const index_typographyStyles: typeof typographyStyles;
declare const index_unooriaColors: typeof unooriaColors;
declare const index_unooriaElevation: typeof unooriaElevation;
declare const index_unooriaGrids: typeof unooriaGrids;
declare const index_unooriaSpacing: typeof unooriaSpacing;
declare const index_unooriaSpacingPx: typeof unooriaSpacingPx;
declare const index_unooriaSpacingRem: typeof unooriaSpacingRem;
declare const index_unooriaTypography: typeof unooriaTypography;
declare const index_warning: typeof warning;
declare const index_warningOverlay: typeof warningOverlay;
declare namespace index {
  export { index_AlertBox as AlertBox, type index_AlertBoxProps as AlertBoxProps, type index_AlertBoxTheme as AlertBoxTheme, type index_AlertBoxVariant as AlertBoxVariant, type index_BackgroundBlurLevel as BackgroundBlurLevel, type index_BackgroundBlurTokens as BackgroundBlurTokens, index_Badge as Badge, type index_BadgeIconPosition as BadgeIconPosition, type index_BadgeProps as BadgeProps, type index_BadgeSize as BadgeSize, type index_BadgeTheme as BadgeTheme, type index_BadgeVariant as BadgeVariant, type index_BlurToken as BlurToken, type index_BrandBlueOverlayTokens as BrandBlueOverlayTokens, type index_BrandBlueScale as BrandBlueScale, type index_BrandBlueTokens as BrandBlueTokens, type index_BrandNavyOverlayTokens as BrandNavyOverlayTokens, type index_BrandNavyScale as BrandNavyScale, type index_BrandNavyTokens as BrandNavyTokens, type index_BrandOrangeOverlayTokens as BrandOrangeOverlayTokens, type index_BrandOrangeScale as BrandOrangeScale, type index_BrandOrangeTokens as BrandOrangeTokens, type index_BrandPurpleOverlayTokens as BrandPurpleOverlayTokens, type index_BrandPurpleScale as BrandPurpleScale, type index_BrandPurpleTokens as BrandPurpleTokens, index_Breadcrumb as Breadcrumb, type index_BreadcrumbItem as BreadcrumbItem, type index_BreadcrumbProps as BreadcrumbProps, type index_BreadcrumbSize as BreadcrumbSize, index_Button as Button, type index_ButtonProps as ButtonProps, type index_ButtonSize as ButtonSize, type index_ButtonState as ButtonState, type index_ButtonTheme as ButtonTheme, type index_ButtonVariant as ButtonVariant, type index_DangerOverlayTokens as DangerOverlayTokens, type index_DangerScale as DangerScale, type index_DangerTokens as DangerTokens, type index_DesktopFontSizesTokens as DesktopFontSizesTokens, type index_DesktopLineHeightsTokens as DesktopLineHeightsTokens, type index_ElevationCategory as ElevationCategory, type index_ElevationTokenDetail as ElevationTokenDetail, type index_FontFamiliesTokens as FontFamiliesTokens, type index_FontWeightsTokens as FontWeightsTokens, type index_GradientKey as GradientKey, type index_GradientTokens as GradientTokens, type index_GridBreakpointConfig as GridBreakpointConfig, type index_GridBreakpointKey as GridBreakpointKey, type index_GridWidgetKey as GridWidgetKey, type index_GridWidgetSpec as GridWidgetSpec, type index_InfoOverlayTokens as InfoOverlayTokens, type index_InfoScale as InfoScale, type index_InfoTokens as InfoTokens, type index_LetterSpacingsTokens as LetterSpacingsTokens, type index_MobileFontSizesTokens as MobileFontSizesTokens, type index_MobileLineHeightsTokens as MobileLineHeightsTokens, type index_NeutralDarkOverlayTokens as NeutralDarkOverlayTokens, type index_NeutralDarkScale as NeutralDarkScale, type index_NeutralDarkTokens as NeutralDarkTokens, type index_NeutralLightOverlayTokens as NeutralLightOverlayTokens, type index_NeutralScale as NeutralScale, type index_NeutralTokens as NeutralTokens, type index_RecommendedWeight as RecommendedWeight, type index_SpacingTokenDetail as SpacingTokenDetail, type index_SuccessOverlayTokens as SuccessOverlayTokens, type index_SuccessScale as SuccessScale, type index_SuccessTokens as SuccessTokens, type index_TypographyStylesTokens as TypographyStylesTokens, type index_TypographyTokenStyle as TypographyTokenStyle, type index_UnooriaBlurKey as UnooriaBlurKey, type index_UnooriaBlurTokens as UnooriaBlurTokens, type index_UnooriaBlurValue as UnooriaBlurValue, type index_UnooriaColorGroup as UnooriaColorGroup, type index_UnooriaColorKey as UnooriaColorKey, type index_UnooriaColorTokens as UnooriaColorTokens, type index_UnooriaElevationKey as UnooriaElevationKey, type index_UnooriaElevationTokens as UnooriaElevationTokens, type index_UnooriaElevationValue as UnooriaElevationValue, type index_UnooriaFontFamilyKey as UnooriaFontFamilyKey, type index_UnooriaFontSizeKey as UnooriaFontSizeKey, type index_UnooriaFontWeightKey as UnooriaFontWeightKey, type index_UnooriaGridTokens as UnooriaGridTokens, type index_UnooriaGridWidgetTokens as UnooriaGridWidgetTokens, type index_UnooriaGridsTokens as UnooriaGridsTokens, type index_UnooriaLetterSpacingKey as UnooriaLetterSpacingKey, type index_UnooriaLineHeightKey as UnooriaLineHeightKey, type index_UnooriaSpacingKey as UnooriaSpacingKey, type index_UnooriaSpacingPxTokens as UnooriaSpacingPxTokens, type index_UnooriaSpacingRemTokens as UnooriaSpacingRemTokens, type index_UnooriaSpacingTokens as UnooriaSpacingTokens, type index_UnooriaSpacingValue as UnooriaSpacingValue, type index_UnooriaTheme as UnooriaTheme, type index_UnooriaTypographyStyleKey as UnooriaTypographyStyleKey, type index_UnooriaTypographyTokens as UnooriaTypographyTokens, type index_WarningOverlayTokens as WarningOverlayTokens, type index_WarningScale as WarningScale, type index_WarningTokens as WarningTokens, type index_WidgetLayoutItem as WidgetLayoutItem, index_backgroundBlur as backgroundBlur, index_blur as blur, index_brandBlue as brandBlue, index_brandBlueOverlay as brandBlueOverlay, index_brandNavy as brandNavy, index_brandNavyOverlay as brandNavyOverlay, index_brandOrange as brandOrange, index_brandOrangeOverlay as brandOrangeOverlay, index_brandPurple as brandPurple, index_brandPurpleOverlay as brandPurpleOverlay, index_breakpoints as breakpoints, index_colors as colors, index_danger as danger, index_dangerOverlay as dangerOverlay, index_desktopFontSizes as desktopFontSizes, index_desktopLineHeights as desktopLineHeights, index_elevation as elevation, index_fontFamilies as fontFamilies, index_fontSizes as fontSizes, index_fontWeights as fontWeights, index_gradients as gradients, index_gridBreakpoints as gridBreakpoints, index_gridColumns as gridColumns, index_gridContainerWidths as gridContainerWidths, index_gridGutters as gridGutters, index_gridMargins as gridMargins, index_gridWidgetsBreakpoints as gridWidgetsBreakpoints, index_grids as grids, index_info as info, index_infoOverlay as infoOverlay, index_letterSpacings as letterSpacings, index_lineHeights as lineHeights, index_mobileFontSizes as mobileFontSizes, index_mobileLineHeights as mobileLineHeights, index_neutral as neutral, index_neutralDark as neutralDark, index_neutralDarkOverlay as neutralDarkOverlay, index_neutralLightOverlay as neutralLightOverlay, index_spacing as spacing, index_success as success, index_successOverlay as successOverlay, index$1 as tokens, index_typography as typography, index_typographyRules as typographyRules, index_typographyStyles as typographyStyles, index_unooriaColors as unooriaColors, index_unooriaElevation as unooriaElevation, index_unooriaGrids as unooriaGrids, index_unooriaSpacing as unooriaSpacing, index_unooriaSpacingPx as unooriaSpacingPx, index_unooriaSpacingRem as unooriaSpacingRem, index_unooriaTypography as unooriaTypography, index_warning as warning, index_warningOverlay as warningOverlay };
}

export { AlertBox, type AlertBoxProps, type AlertBoxTheme, type AlertBoxVariant, type BackgroundBlurLevel, type BackgroundBlurTokens, Badge, type BadgeIconPosition, type BadgeProps, type BadgeSize, type BadgeTheme, type BadgeVariant, type BlurToken, type BrandBlueOverlayTokens, type BrandBlueScale, type BrandBlueTokens, type BrandNavyOverlayTokens, type BrandNavyScale, type BrandNavyTokens, type BrandOrangeOverlayTokens, type BrandOrangeScale, type BrandOrangeTokens, type BrandPurpleOverlayTokens, type BrandPurpleScale, type BrandPurpleTokens, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, type BreadcrumbSize, Button, type ButtonProps, type ButtonSize, type ButtonState, type ButtonTheme, type ButtonVariant, type DangerOverlayTokens, type DangerScale, type DangerTokens, type DesktopFontSizesTokens, type DesktopLineHeightsTokens, type ElevationCategory, type ElevationTokenDetail, type FontFamiliesTokens, type FontWeightsTokens, type GradientKey, type GradientTokens, type GridBreakpointConfig, type GridBreakpointKey, type GridWidgetKey, type GridWidgetSpec, type InfoOverlayTokens, type InfoScale, type InfoTokens, type LetterSpacingsTokens, type MobileFontSizesTokens, type MobileLineHeightsTokens, type NeutralDarkOverlayTokens, type NeutralDarkScale, type NeutralDarkTokens, type NeutralLightOverlayTokens, type NeutralScale, type NeutralTokens, type RecommendedWeight, type SpacingTokenDetail, type SuccessOverlayTokens, type SuccessScale, type SuccessTokens, type TypographyStylesTokens, type TypographyTokenStyle, type UnooriaBlurKey, type UnooriaBlurTokens, type UnooriaBlurValue, type UnooriaColorGroup, type UnooriaColorKey, type UnooriaColorTokens, type UnooriaElevationKey, type UnooriaElevationTokens, type UnooriaElevationValue, type UnooriaFontFamilyKey, type UnooriaFontSizeKey, type UnooriaFontWeightKey, type UnooriaGridTokens, type UnooriaGridWidgetTokens, type UnooriaGridsTokens, type UnooriaLetterSpacingKey, type UnooriaLineHeightKey, type UnooriaSpacingKey, type UnooriaSpacingPxTokens, type UnooriaSpacingRemTokens, type UnooriaSpacingTokens, type UnooriaSpacingValue, type UnooriaTheme, type UnooriaTypographyStyleKey, type UnooriaTypographyTokens, index as UnooriaUI, type WarningOverlayTokens, type WarningScale, type WarningTokens, index$2 as WhatsAppUI, type WidgetLayoutItem, backgroundBlur, blur, brandBlue, brandBlueOverlay, brandNavy, brandNavyOverlay, brandOrange, brandOrangeOverlay, brandPurple, brandPurpleOverlay, breakpoints, colors, danger, dangerOverlay, desktopFontSizes, desktopLineHeights, elevation, fontFamilies, fontSizes, fontWeights, gradients, gridBreakpoints, gridColumns, gridContainerWidths, gridGutters, gridMargins, gridWidgetsBreakpoints, grids, info, infoOverlay, letterSpacings, lineHeights, mobileFontSizes, mobileLineHeights, neutral, neutralDark, neutralDarkOverlay, neutralLightOverlay, spacing, success, successOverlay, index$1 as tokens, typography, typographyRules, typographyStyles, unooriaColors, unooriaElevation, unooriaGrids, unooriaSpacing, unooriaSpacingPx, unooriaSpacingRem, unooriaTypography, warning, warningOverlay };
