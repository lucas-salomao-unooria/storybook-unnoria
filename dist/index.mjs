var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/whatsapp/index.ts
var whatsapp_exports = {};
__export(whatsapp_exports, {
  SPACING_BASE_PX: () => SPACING_BASE_PX,
  colorTokens: () => colorTokens,
  cssVariableNames: () => cssVariableNames,
  darkColors: () => darkColors,
  fontFamilies: () => fontFamilies,
  fontSizes: () => fontSizes,
  fontWeights: () => fontWeights,
  letterSpacings: () => letterSpacings,
  lightColors: () => lightColors,
  lineHeights: () => lineHeights,
  radius: () => radius,
  radiusPx: () => radiusPx,
  semanticColorNames: () => semanticColorNames,
  spacing: () => spacing,
  spacingCssVars: () => spacingCssVars,
  spacingPx: () => spacingPx,
  typography: () => typography,
  typographyStyles: () => typographyStyles
});

// src/whatsapp/tokens/colors.ts
var lightColors = {
  bgCanvas: "#F3F5F2",
  bgSurface: "#FFFFFF",
  bgBrand: "#18A87A",
  bgChatSent: "#AFE3D4",
  textPrimary: "#17211E",
  textSecondary: "#697773",
  statusOnline: "#18A87A",
  border: "#DFE5E1"
};
var darkColors = {
  bgCanvas: "#101816",
  bgSurface: "#17211E",
  bgBrand: "#18A87A",
  bgChatSent: "#0B594D",
  textPrimary: "#FFFFFF",
  textSecondary: "#9BABA5",
  statusOnline: "#53D0AA",
  border: "#697773"
};
var semanticColorNames = {
  bgCanvas: "color/bg/canvas",
  bgSurface: "color/bg/surface",
  bgBrand: "color/bg/brand",
  bgChatSent: "color/bg/chat-sent",
  textPrimary: "color/text/primary",
  textSecondary: "color/text/secondary",
  statusOnline: "color/status/online",
  border: "color/border"
};
var cssVariableNames = {
  bgCanvas: "--color-bg-canvas",
  bgSurface: "--color-bg-surface",
  bgBrand: "--color-bg-brand",
  bgChatSent: "--color-bg-chat-sent",
  textPrimary: "--color-text-primary",
  textSecondary: "--color-text-secondary",
  statusOnline: "--color-status-online",
  border: "--color-border"
};
var colorTokens = {
  light: lightColors,
  dark: darkColors,
  semanticNames: semanticColorNames,
  cssVariables: cssVariableNames
};

// src/whatsapp/tokens/typography.ts
var fontFamilies = {
  sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
};
var fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600
};
var fontSizes = {
  xs: "10px",
  // 0.625rem - Especificações técnicas e legendas pequenas
  sm: "11px",
  // 0.6875rem - Metadados e timestamps
  md: "12px",
  // 0.75rem - Rótulos, badges e tags
  base: "13px",
  // 0.8125rem - Texto de corpo compacto
  lg: "14px",
  // 0.875rem - Texto de corpo padrão
  xl: "15px",
  // 0.9375rem - Títulos de conversas e usuários
  "2xl": "24px",
  // 1.5rem - Cabeçalhos
  "3xl": "28px",
  // 1.75rem - Título de seção
  "4xl": "40px"
  // 2.5rem - Display principal
};
var lineHeights = {
  xs: "14px",
  sm: "15px",
  md: "17px",
  base: "18px",
  lg: "20px",
  xl: "21px",
  "2xl": "34px",
  "3xl": "39px",
  "4xl": "56px"
};
var letterSpacings = {
  tight: "-0.01em",
  normal: "0px",
  wide: "0.02em"
};
var typographyStyles = {
  display: {
    name: "Display",
    role: "display",
    description: "Usado para t\xEDtulos de alto impacto visual e capas",
    fontSize: fontSizes["4xl"],
    lineHeight: lineHeights["4xl"],
    fontWeight: fontWeights.semibold,
    fontWeightName: "Semi Bold (600)",
    fontFamily: fontFamilies.sans,
    sampleText: "Conversa UI"
  },
  sectionTitle: {
    name: "Section Title",
    role: "sectionTitle",
    description: "Usado para t\xEDtulos de se\xE7\xF5es principais da aplica\xE7\xE3o",
    fontSize: fontSizes["3xl"],
    lineHeight: lineHeights["3xl"],
    fontWeight: fontWeights.semibold,
    fontWeightName: "Semi Bold (600)",
    fontFamily: fontFamilies.sans,
    sampleText: "Typography"
  },
  heading: {
    name: "Heading",
    role: "heading",
    description: "Usado para t\xEDtulos de chats, grupos e cabe\xE7alhos de visualiza\xE7\xE3o",
    fontSize: fontSizes["2xl"],
    lineHeight: lineHeights["2xl"],
    fontWeight: fontWeights.semibold,
    fontWeightName: "Semi Bold (600)",
    fontFamily: fontFamilies.sans,
    sampleText: "Chats"
  },
  chatTitle: {
    name: "Chat title",
    role: "chatTitle",
    description: "Usado para nomes de contatos e t\xEDtulos da lista de conversas",
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.semibold,
    fontWeightName: "Semi Bold (600)",
    fontFamily: fontFamilies.sans,
    sampleText: "Maya Chen"
  },
  body: {
    name: "Body",
    role: "body",
    description: "Usado para o conte\xFAdo principal de mensagens do chat",
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.regular,
    fontWeightName: "Regular (400)",
    fontFamily: fontFamilies.sans,
    sampleText: "Perfect \u2014 see you at 12:30."
  },
  bodyCompact: {
    name: "Body compact",
    role: "bodyCompact",
    description: "Usado para pr\xE9vias de mensagens e textos em listas densas",
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.regular,
    fontWeightName: "Regular (400)",
    fontFamily: fontFamilies.sans,
    sampleText: "Final screens are up"
  },
  label: {
    name: "Label",
    role: "label",
    description: "Usado para badges, status de n\xE3o lidas e bot\xF5es de a\xE7\xE3o",
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
    fontWeight: fontWeights.medium,
    fontWeightName: "Medium (500)",
    fontFamily: fontFamilies.sans,
    sampleText: "UNREAD"
  },
  metadata: {
    name: "Metadata",
    role: "metadata",
    description: "Usado para hor\xE1rios, timestamps e detalhes secund\xE1rios",
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.regular,
    fontWeightName: "Regular (400)",
    fontFamily: fontFamilies.sans,
    sampleText: "Today at 09:41"
  },
  spec: {
    name: "Spec / Caption",
    role: "spec",
    description: "Usado para especifica\xE7\xF5es t\xE9cnicas e legendas informativas",
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.regular,
    fontWeightName: "Regular (400)",
    fontFamily: fontFamilies.sans,
    sampleText: "40px / 56px"
  }
};
var typography = {
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  styles: typographyStyles
};

// src/whatsapp/tokens/spacing.ts
var spacing = {
  "2xs": "0.25rem",
  // 4px
  xs: "0.5rem",
  // 8px
  sm: "0.75rem",
  // 12px
  md: "1rem",
  // 16px
  lg: "1.5rem",
  // 24px
  xl: "2rem"
  // 32px
};
var spacingPx = {
  "2xs": 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32
};
var spacingCssVars = {
  "2xs": "var(--spacing-2xs)",
  xs: "var(--spacing-xs)",
  sm: "var(--spacing-sm)",
  md: "var(--spacing-md)",
  lg: "var(--spacing-lg)",
  xl: "var(--spacing-xl)"
};
var radius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  bubble: "18px",
  full: "9999px"
};
var radiusPx = {
  sm: 4,
  md: 8,
  lg: 12,
  bubble: 18,
  full: 9999
};
var SPACING_BASE_PX = 4;

// src/unooria/index.ts
var unooria_exports = {};
__export(unooria_exports, {
  AlertBox: () => AlertBox,
  Badge: () => Badge,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  backgroundBlur: () => backgroundBlur,
  blur: () => blur,
  brandBlue: () => brandBlue,
  brandBlueOverlay: () => brandBlueOverlay,
  brandNavy: () => brandNavy,
  brandNavyOverlay: () => brandNavyOverlay,
  brandOrange: () => brandOrange,
  brandOrangeOverlay: () => brandOrangeOverlay,
  brandPurple: () => brandPurple,
  brandPurpleOverlay: () => brandPurpleOverlay,
  breakpoints: () => breakpoints,
  colors: () => colors,
  danger: () => danger,
  dangerOverlay: () => dangerOverlay,
  desktopFontSizes: () => desktopFontSizes,
  desktopLineHeights: () => desktopLineHeights,
  elevation: () => elevation,
  fontFamilies: () => fontFamilies2,
  fontSizes: () => fontSizes2,
  fontWeights: () => fontWeights2,
  gradients: () => gradients,
  gridBreakpoints: () => gridBreakpoints,
  gridColumns: () => gridColumns,
  gridContainerWidths: () => gridContainerWidths,
  gridGutters: () => gridGutters,
  gridMargins: () => gridMargins,
  gridWidgetsBreakpoints: () => gridWidgetsBreakpoints,
  grids: () => grids,
  info: () => info,
  infoOverlay: () => infoOverlay,
  letterSpacings: () => letterSpacings2,
  lineHeights: () => lineHeights2,
  mobileFontSizes: () => mobileFontSizes,
  mobileLineHeights: () => mobileLineHeights,
  neutral: () => neutral,
  neutralDark: () => neutralDark,
  neutralDarkOverlay: () => neutralDarkOverlay,
  neutralLightOverlay: () => neutralLightOverlay,
  spacing: () => spacing2,
  success: () => success,
  successOverlay: () => successOverlay,
  tokens: () => tokens_exports,
  typography: () => typography2,
  typographyRules: () => typographyRules,
  typographyStyles: () => typographyStyles2,
  unooriaColors: () => unooriaColors,
  unooriaElevation: () => unooriaElevation,
  unooriaGrids: () => unooriaGrids,
  unooriaSpacing: () => unooriaSpacing,
  unooriaSpacingPx: () => unooriaSpacingPx,
  unooriaSpacingRem: () => unooriaSpacingRem,
  unooriaTypography: () => unooriaTypography,
  warning: () => warning,
  warningOverlay: () => warningOverlay
});

// src/unooria/tokens/index.ts
var tokens_exports = {};
__export(tokens_exports, {
  backgroundBlur: () => backgroundBlur,
  blur: () => blur,
  brandBlue: () => brandBlue,
  brandBlueOverlay: () => brandBlueOverlay,
  brandNavy: () => brandNavy,
  brandNavyOverlay: () => brandNavyOverlay,
  brandOrange: () => brandOrange,
  brandOrangeOverlay: () => brandOrangeOverlay,
  brandPurple: () => brandPurple,
  brandPurpleOverlay: () => brandPurpleOverlay,
  breakpoints: () => breakpoints,
  colors: () => colors,
  danger: () => danger,
  dangerOverlay: () => dangerOverlay,
  desktopFontSizes: () => desktopFontSizes,
  desktopLineHeights: () => desktopLineHeights,
  elevation: () => elevation,
  fontFamilies: () => fontFamilies2,
  fontSizes: () => fontSizes2,
  fontWeights: () => fontWeights2,
  gradients: () => gradients,
  gridBreakpoints: () => gridBreakpoints,
  gridColumns: () => gridColumns,
  gridContainerWidths: () => gridContainerWidths,
  gridGutters: () => gridGutters,
  gridMargins: () => gridMargins,
  gridWidgetsBreakpoints: () => gridWidgetsBreakpoints,
  grids: () => grids,
  info: () => info,
  infoOverlay: () => infoOverlay,
  letterSpacings: () => letterSpacings2,
  lineHeights: () => lineHeights2,
  mobileFontSizes: () => mobileFontSizes,
  mobileLineHeights: () => mobileLineHeights,
  neutral: () => neutral,
  neutralDark: () => neutralDark,
  neutralDarkOverlay: () => neutralDarkOverlay,
  neutralLightOverlay: () => neutralLightOverlay,
  spacing: () => spacing2,
  success: () => success,
  successOverlay: () => successOverlay,
  typography: () => typography2,
  typographyRules: () => typographyRules,
  typographyStyles: () => typographyStyles2,
  unooriaColors: () => unooriaColors,
  unooriaElevation: () => unooriaElevation,
  unooriaGrids: () => unooriaGrids,
  unooriaSpacing: () => unooriaSpacing,
  unooriaSpacingPx: () => unooriaSpacingPx,
  unooriaSpacingRem: () => unooriaSpacingRem,
  unooriaTypography: () => unooriaTypography,
  warning: () => warning,
  warningOverlay: () => warningOverlay
});

// src/unooria/tokens/colors.ts
var brandNavy = {
  50: "#F5F8FC",
  100: "#E8EFFA",
  200: "#D3E0F5",
  300: "#BDD0EF",
  400: "#A4BDE9",
  500: "#8FAFE5",
  600: "#7FA5E2",
  // Cor Base Primária (#7FA5E2)
  700: "#6487C2",
  800: "#49699F",
  900: "#2F4F7F",
  950: "#0E1039"
};
var brandNavyOverlay = {
  50: "rgba(127, 165, 226, 0.05)",
  100: "rgba(127, 165, 226, 0.10)",
  200: "rgba(127, 165, 226, 0.20)",
  300: "rgba(127, 165, 226, 0.30)",
  400: "rgba(127, 165, 226, 0.40)",
  500: "rgba(127, 165, 226, 0.50)",
  600: "rgba(127, 165, 226, 0.60)",
  700: "rgba(127, 165, 226, 0.70)",
  800: "rgba(127, 165, 226, 0.80)",
  900: "rgba(127, 165, 226, 0.90)"
};
var brandBlue = brandNavy;
var brandBlueOverlay = brandNavyOverlay;
var brandPurple = {
  50: "#F7F6FA",
  100: "#EFEEF5",
  200: "#DFDDEB",
  300: "#CCC9DE",
  400: "#AAA5C2",
  500: "#8B85AC",
  600: "#716C98",
  // Cor Base Secundária (#716C98)
  700: "#57547D",
  800: "#34375C",
  900: "#0E1039",
  950: "#080922"
};
var brandPurpleOverlay = {
  50: "rgba(14, 16, 57, 0.05)",
  100: "rgba(14, 16, 57, 0.10)",
  200: "rgba(14, 16, 57, 0.20)",
  300: "rgba(14, 16, 57, 0.30)",
  400: "rgba(14, 16, 57, 0.40)",
  500: "rgba(14, 16, 57, 0.50)",
  600: "rgba(14, 16, 57, 0.60)",
  700: "rgba(14, 16, 57, 0.70)",
  800: "rgba(14, 16, 57, 0.80)",
  900: "rgba(14, 16, 57, 0.90)"
};
var brandOrange = {
  50: "#FFF6ED",
  100: "#FEEAD6",
  200: "#FDD1AB",
  300: "#FBB076",
  400: "#F8833F",
  500: "#F5631A",
  600: "#E84910",
  700: "#BF340F",
  800: "#982B14",
  900: "#7A2614",
  950: "#421008"
};
var brandOrangeOverlay = {
  50: "rgba(232, 73, 16, 0.05)",
  100: "rgba(232, 73, 16, 0.10)",
  200: "rgba(232, 73, 16, 0.20)",
  300: "rgba(232, 73, 16, 0.30)",
  400: "rgba(232, 73, 16, 0.40)",
  500: "rgba(232, 73, 16, 0.50)",
  600: "rgba(232, 73, 16, 0.60)",
  700: "rgba(232, 73, 16, 0.70)",
  800: "rgba(232, 73, 16, 0.80)",
  900: "rgba(232, 73, 16, 0.90)"
};
var neutral = {
  50: "#FFFFFF",
  100: "#F5F5F5",
  150: "#E4E8E9",
  200: "#CBD4D6",
  300: "#A7B5B9",
  400: "#7C8E94",
  500: "#617379",
  600: "#536167",
  700: "#475157",
  800: "#3D4448",
  900: "#383E41",
  950: "#22272A"
};
var neutralLightOverlay = {
  50: "rgba(255, 255, 255, 0.05)",
  100: "rgba(255, 255, 255, 0.10)",
  200: "rgba(255, 255, 255, 0.20)",
  300: "rgba(255, 255, 255, 0.30)",
  400: "rgba(255, 255, 255, 0.40)",
  500: "rgba(255, 255, 255, 0.50)",
  600: "rgba(255, 255, 255, 0.60)",
  700: "rgba(255, 255, 255, 0.70)",
  800: "rgba(255, 255, 255, 0.80)",
  900: "rgba(255, 255, 255, 0.90)"
};
var neutralDark = {
  50: "#22272A",
  100: "#22272A",
  150: "#A7B5B9",
  200: "#3D4448",
  300: "#475157",
  400: "#536167",
  500: "#617379",
  600: "#536167",
  700: "#7C8E94",
  800: "#A7B5B9",
  900: "#CBD4D6",
  950: "#F5F5F5"
};
var neutralDarkOverlay = {
  50: "rgba(34, 39, 42, 0.05)",
  100: "rgba(34, 39, 42, 0.10)",
  200: "rgba(34, 39, 42, 0.20)",
  300: "rgba(34, 39, 42, 0.30)",
  400: "rgba(34, 39, 42, 0.40)",
  500: "rgba(34, 39, 42, 0.50)",
  600: "rgba(34, 39, 42, 0.60)",
  700: "rgba(34, 39, 42, 0.70)",
  800: "rgba(34, 39, 42, 0.80)",
  900: "rgba(34, 39, 42, 0.90)"
};
var danger = {
  50: "#FFF1F1",
  100: "#FFE1E1",
  200: "#FFC7C7",
  300: "#FFA1A1",
  400: "#FF6A6A",
  500: "#F83B3B",
  600: "#E31A1A",
  // Cor Base
  700: "#C11414",
  800: "#9F1515",
  900: "#841818"
};
var dangerOverlay = {
  50: "rgba(227, 26, 26, 0.05)",
  100: "rgba(227, 26, 26, 0.10)",
  200: "rgba(227, 26, 26, 0.20)",
  300: "rgba(227, 26, 26, 0.30)",
  400: "rgba(227, 26, 26, 0.40)",
  500: "rgba(227, 26, 26, 0.50)",
  600: "rgba(227, 26, 26, 0.60)",
  700: "rgba(227, 26, 26, 0.70)",
  800: "rgba(227, 26, 26, 0.80)",
  900: "rgba(227, 26, 26, 0.90)"
};
var success = {
  50: "#EBFEF4",
  100: "#CDFEE4",
  200: "#A0FACE",
  300: "#63F2B5",
  400: "#26E197",
  500: "#01B574",
  // Cor Base
  600: "#00A369",
  700: "#008257",
  800: "#006746",
  900: "#00543C"
};
var successOverlay = {
  50: "rgba(1, 181, 116, 0.05)",
  100: "rgba(1, 181, 116, 0.10)",
  200: "rgba(1, 181, 116, 0.20)",
  300: "rgba(1, 181, 116, 0.30)",
  400: "rgba(1, 181, 116, 0.40)",
  500: "rgba(1, 181, 116, 0.50)",
  600: "rgba(1, 181, 116, 0.60)",
  700: "rgba(1, 181, 116, 0.70)",
  800: "rgba(1, 181, 116, 0.80)",
  900: "rgba(1, 181, 116, 0.90)"
};
var warning = {
  50: "#FFF8EB",
  100: "#FFEBC6",
  200: "#FFD388",
  300: "#FFB74A",
  400: "#FF9C20",
  500: "#F97607",
  // Cor Base
  600: "#DD5202",
  700: "#B73506",
  800: "#94280C",
  900: "#7A230D"
};
var warningOverlay = {
  50: "rgba(249, 118, 7, 0.05)",
  100: "rgba(249, 118, 7, 0.10)",
  200: "rgba(249, 118, 7, 0.20)",
  300: "rgba(249, 118, 7, 0.30)",
  400: "rgba(249, 118, 7, 0.40)",
  500: "rgba(249, 118, 7, 0.50)",
  600: "rgba(249, 118, 7, 0.60)",
  700: "rgba(249, 118, 7, 0.70)",
  800: "rgba(249, 118, 7, 0.80)",
  900: "rgba(249, 118, 7, 0.90)"
};
var info = {
  50: "#E9FAFF",
  100: "#A7EEFF",
  200: "#6BE7FF",
  300: "#26D4FF",
  400: "#00B0FF",
  500: "#0086FF",
  // Cor Base
  600: "#006BFF",
  700: "#005CE6",
  800: "#0052B3",
  900: "#002752"
};
var infoOverlay = {
  50: "rgba(0, 134, 255, 0.05)",
  100: "rgba(0, 134, 255, 0.10)",
  200: "rgba(0, 134, 255, 0.20)",
  300: "rgba(0, 134, 255, 0.30)",
  400: "rgba(0, 134, 255, 0.40)",
  500: "rgba(0, 134, 255, 0.50)",
  600: "rgba(0, 134, 255, 0.60)",
  700: "rgba(0, 134, 255, 0.70)",
  800: "rgba(0, 134, 255, 0.80)",
  900: "rgba(0, 134, 255, 0.90)"
};
var gradients = {
  1: "linear-gradient(225deg, rgba(87, 84, 125, 1) 0%, rgba(113, 108, 152, 1) 5%, rgba(127, 165, 226, 1) 54%, rgba(143, 175, 229, 1) 72%, rgba(164, 189, 233, 1) 89%, rgba(189, 208, 239, 1) 100%)",
  2: "linear-gradient(224deg, rgba(239, 238, 245, 1) 0%, rgba(170, 165, 194, 1) 35%, rgba(167, 181, 185, 1) 60%, rgba(189, 208, 239, 1) 84%)",
  3: "radial-gradient(circle at 50% 50%, rgba(0, 134, 255, 0.12) 0%, rgba(14, 16, 57, 0.02) 100%)",
  4: "radial-gradient(circle at 50% 50%, rgba(248, 59, 59, 0.12) 0%, rgba(227, 26, 26, 0.01) 100%)",
  5: "radial-gradient(circle at 50% 50%, rgba(127, 165, 226, 0.15) 0%, rgba(249, 118, 7, 0.02) 100%)",
  6: "radial-gradient(circle at 50% 50%, rgba(1, 181, 116, 0.12) 0%, rgba(1, 181, 116, 0.01) 100%)"
};
var unooriaColors = {
  brandNavy,
  brandNavyOverlay,
  brandPurple,
  brandPurpleOverlay,
  brandBlue,
  brandBlueOverlay,
  brandOrange,
  brandOrangeOverlay,
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
  gradients
};
var colors = unooriaColors;

// src/unooria/tokens/typography.ts
var fontFamilies2 = {
  sans: '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
};
var fontWeights2 = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
};
var desktopFontSizes = {
  "heading-4xl": "60px",
  "heading-xxxl": "48px",
  "heading-xxl": "34px",
  "title-xl": "24px",
  "title-l": "20px",
  "body-m": "18px",
  "body-s": "16px",
  "body-xs": "14px",
  "body-xxs": "12px",
  "caption-xxxs": "10px"
};
var desktopLineHeights = {
  "heading-4xl": "78px",
  "heading-xxxl": "64px",
  "heading-xxl": "48px",
  "title-xl": "34px",
  "title-l": "30px",
  "body-m": "28px",
  "body-s": "24px",
  "body-xs": "20px",
  "body-xxs": "18px",
  "caption-xxxs": "14px"
};
var mobileFontSizes = {
  "heading-4xl": "34px",
  // Substituição automática em mobile para 34px
  "heading-xxxl": "34px",
  // Substituição automática em mobile para 34px
  "heading-xxl": "24px",
  "title-xl": "20px",
  "title-l": "18px",
  "body-m": "16px",
  "body-s": "14px",
  "body-xs": "14px",
  "body-xxs": "10px",
  "caption-xxxs": "10px"
};
var mobileLineHeights = {
  "heading-4xl": "48px",
  // Substituição automática em mobile para 48px
  "heading-xxxl": "48px",
  // Substituição automática em mobile para 48px
  "heading-xxl": "34px",
  "title-xl": "30px",
  "title-l": "28px",
  "body-m": "24px",
  "body-s": "20px",
  "body-xs": "18px",
  "body-xxs": "14px",
  "caption-xxxs": "14px"
};
var fontSizes2 = desktopFontSizes;
var lineHeights2 = desktopLineHeights;
var letterSpacings2 = {
  tight: "-0.01em",
  normal: "0px",
  wide: "0.02em"
};
var typographyStyles2 = {
  heading4XL: {
    id: "heading-4xl",
    name: "Heading 4XL",
    category: "heading",
    description: "T\xEDtulo principal de impacto para hero sections e capas no desktop. Substitu\xEDdo automaticamente por 34px em mobile.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "60px",
      lineHeight: "78px"
    },
    mobile: {
      fontSize: "34px",
      lineHeight: "48px"
    },
    recommendedWeights: [
      { weight: 700, weightName: "Bold (700)", context: "Desktop: Garante autoridade visual" },
      { weight: 600, weightName: "Semibold (600)", context: "Op\xE7\xE3o de menor contraste" },
      { weight: 400, weightName: "Regular (400)", context: "T\xEDtulos elegantes de grandes dimens\xF5es" }
    ],
    sampleText: "Plataforma Unooria Design System"
  },
  headingXXXL: {
    id: "heading-xxxl",
    name: "Heading XXXL",
    category: "heading",
    description: "T\xEDtulos de se\xE7\xF5es de alta hierarquia e banners. Substitu\xEDdo automaticamente por 34px em mobile.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "48px",
      lineHeight: "64px"
    },
    mobile: {
      fontSize: "34px",
      lineHeight: "48px"
    },
    recommendedWeights: [
      { weight: 700, weightName: "Bold (700)", context: "Desktop: Hierarquia principal" },
      { weight: 600, weightName: "Semibold (600)", context: "Subt\xEDtulos de destaque" },
      { weight: 400, weightName: "Regular (400)", context: "Varia\xE7\xE3o regular" }
    ],
    sampleText: "Conhe\xE7a nossos Fundamentos e Princ\xEDpios"
  },
  headingXXL: {
    id: "heading-xxl",
    name: "Heading XXL",
    category: "heading",
    description: "Cabe\xE7alho para se\xE7\xF5es e p\xE1ginas internas.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "34px",
      lineHeight: "48px"
    },
    mobile: {
      fontSize: "24px",
      lineHeight: "34px"
    },
    recommendedWeights: [
      { weight: 700, weightName: "Bold (700)", context: "Uso padr\xE3o para t\xEDtulos de se\xE7\xE3o" },
      { weight: 600, weightName: "Semibold (600)", context: "Densidade mobile moderada" },
      { weight: 400, weightName: "Regular (400)", context: "Estilo editorial" }
    ],
    sampleText: "1 - Fundamentos e Princ\xEDpios"
  },
  titleXL: {
    id: "title-xl",
    name: "Title XL",
    category: "title",
    description: "T\xEDtulos de cards grandes, modal headers e grupos de conte\xFAdo.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "24px",
      lineHeight: "34px"
    },
    mobile: {
      fontSize: "20px",
      lineHeight: "30px"
    },
    recommendedWeights: [
      { weight: 700, weightName: "Bold (700)", context: "T\xEDtulos e cabe\xE7alhos em destaque" },
      { weight: 600, weightName: "Semibold (600)", context: "Alternativa para alta densidade" },
      { weight: 400, weightName: "Regular (400)", context: "Sub-cabe\xE7alhos" }
    ],
    sampleText: "Integridade e Consist\xEAncia do Sistema"
  },
  titleL: {
    id: "title-l",
    name: "Title L",
    category: "title",
    description: "Subt\xEDtulos de componentes, tabelas e cabe\xE7alhos secund\xE1rios.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "20px",
      lineHeight: "30px"
    },
    mobile: {
      fontSize: "18px",
      lineHeight: "28px"
    },
    recommendedWeights: [
      { weight: 700, weightName: "Bold (700)", context: "Contraste elevado" },
      { weight: 600, weightName: "Semibold (600)", context: "Subt\xEDtulos e bot\xF5es proeminentes" },
      { weight: 400, weightName: "Regular (400)", context: "Textos em caixas de destaque" }
    ],
    sampleText: "Regras de Aplica\xE7\xE3o de Pesos por Contexto"
  },
  bodyM: {
    id: "body-m",
    name: "Body M",
    category: "body",
    description: "Base padr\xE3o de leitura da interface para par\xE1grafos e textos longos.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "18px",
      lineHeight: "28px"
    },
    mobile: {
      fontSize: "16px",
      lineHeight: "24px"
    },
    recommendedWeights: [
      { weight: 400, weightName: "Regular (400)", context: "Base de leitura cont\xEDnua e par\xE1grafos" },
      { weight: 600, weightName: "Semibold (600)", context: "Destaque de palavras importantes no par\xE1grafo" },
      { weight: 700, weightName: "Bold (700)", context: "Aten\xE7\xE3o imediata" }
    ],
    sampleText: "Conforme definido nos fundamentos, este Design System \xE9 uma cole\xE7\xE3o de regras e princ\xEDpios que devem ser seguidos fielmente para manter a consist\xEAncia visual."
  },
  bodyS: {
    id: "body-s",
    name: "Body S",
    category: "body",
    description: "Texto secund\xE1rio, cards compactos e descri\xE7\xE3o de campos de entrada.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "16px",
      lineHeight: "24px"
    },
    mobile: {
      fontSize: "14px",
      lineHeight: "20px"
    },
    recommendedWeights: [
      { weight: 400, weightName: "Regular (400)", context: "Leitura secund\xE1ria" },
      { weight: 600, weightName: "Semibold (600)", context: "Componentes como Bot\xF5es e Tabs" },
      { weight: 700, weightName: "Bold (700)", context: "\xCAnfase em textos menores" }
    ],
    sampleText: "Utilize Semibold (600) para garantir legibilidade em componentes menores."
  },
  bodyXS: {
    id: "body-xs",
    name: "Body XS",
    category: "body",
    description: "Labels de formul\xE1rios, ajudas de campos e descri\xE7\xF5es auxiliares.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "14px",
      lineHeight: "20px"
    },
    mobile: {
      fontSize: "14px",
      lineHeight: "18px"
    },
    recommendedWeights: [
      { weight: 500, weightName: "Medium (500)", context: "Formul\xE1rios: Labels para diferenciar do conte\xFAdo" },
      { weight: 600, weightName: "Semibold (600)", context: "Componentes compactos" },
      { weight: 400, weightName: "Regular (400)", context: "Mensagens de ajuda / Helper text" }
    ],
    sampleText: "Labels de formul\xE1rios devem utilizar Medium (500) para diferenciar o r\xF3tulo do valor inserido."
  },
  bodyXXS: {
    id: "body-xxs",
    name: "Body XXS",
    category: "body",
    description: "Rodap\xE9s, avisos legais, badges e metadados de sistema.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "12px",
      lineHeight: "18px"
    },
    mobile: {
      fontSize: "10px",
      lineHeight: "14px"
    },
    recommendedWeights: [
      { weight: 400, weightName: "Regular (400)", context: "Metadados e notas de rodap\xE9" },
      { weight: 600, weightName: "Semibold (600)", context: "Badges de status" },
      { weight: 700, weightName: "Bold (700)", context: "Indicadores de perigo / alerta" }
    ],
    sampleText: "Avisos de copyright, vers\xE3o do sistema e metadados de auditoria."
  },
  captionXXXS: {
    id: "caption-xxxs",
    name: "Caption XXXS",
    category: "caption",
    description: "Legendas m\xEDnimas, micro-copy, timestamps e marca\xE7\xF5es de sistema.",
    fontFamily: fontFamilies2.sans,
    desktop: {
      fontSize: "10px",
      lineHeight: "14px"
    },
    mobile: {
      fontSize: "10px",
      lineHeight: "14px"
    },
    recommendedWeights: [
      { weight: 400, weightName: "Regular (400)", context: "Timestamps e micro-detalhes" },
      { weight: 600, weightName: "Semibold (600)", context: "R\xF3tulos min\xFAsculos" },
      { weight: 700, weightName: "Bold (700)", context: "Contadores em relat\xF3rios" }
    ],
    sampleText: "DESIGN SYSTEM \u2022 PLATAFORMA UNOORIA"
  }
};
var typographyRules = {
  title: "Regras da Tipografia da Plataforma Unooria",
  sections: [
    {
      title: "1 - Fundamentos e Princ\xEDpios",
      content: "Conforme definido nos fundamentos, este Design System \xE9 uma cole\xE7\xE3o de regras e princ\xEDpios que devem ser seguidos fielmente para manter a consist\xEAncia visual.",
      weights: [
        {
          name: "Regular (400)",
          usage: "Utilizado para blocos de leitura cont\xEDnua e par\xE1grafos."
        },
        {
          name: "Medium (500)",
          usage: "Aplicado em textos que necessitam de destaque sutil, como labels de formul\xE1rios ou itens de listas."
        },
        {
          name: "Semibold (600)",
          usage: "Utilizado para sub-t\xEDtulos, estados ativos de componentes e r\xF3tulos de bot\xF5es."
        },
        {
          name: "Bold (700)",
          usage: "Reservado para t\xEDtulos principais e informa\xE7\xF5es que exigem aten\xE7\xE3o imediata."
        }
      ]
    },
    {
      title: "2 - Regras de Aplica\xE7\xE3o de Pesos por Contexto",
      categories: [
        {
          name: "T\xEDtulos e Cabe\xE7alhos",
          rules: [
            "Desktop: Use Bold (700) para tokens de 4XL a XL para garantir autoridade visual.",
            "Mobile: Para os tokens de 34px a 20px, pode-se alternar entre Bold (700) e Semibold (600) dependendo da densidade da tela."
          ]
        },
        {
          name: "Corpo de Texto e Interface",
          rules: [
            "Leitura: O token M (18px) em Regular (400) \xE9 a base da interface.",
            "Destaque no Texto: Use Semibold (600) para destacar palavras importantes dentro de par\xE1grafos.",
            "Componentes (Bot\xF5es/Tabs): Utilize Semibold (600) para garantir legibilidade em tamanhos menores como S (16px) ou XS (14px).",
            "Formul\xE1rios: Labels devem utilizar Medium (500) no tamanho XS (14px) para diferenciar o r\xF3tulo do conte\xFAdo preenchido."
          ]
        }
      ]
    },
    {
      title: "3 - Diretrizes de Responsividade",
      rules: [
        {
          topic: "Substitui\xE7\xE3o Autom\xE1tica",
          description: "Em dispositivos m\xF3veis, qualquer elemento marcado como 4XL ou XXXL deve renderizar automaticamente com o tamanho de 34px (XXL) e linha de 48px."
        },
        {
          topic: "Fidelidade T\xE9cnica",
          description: '"Um design system \xE9 essencialmente uma cole\xE7\xE3o de regras, restri\xE7\xF5es e princ\xEDpios implementados em design e c\xF3digo". N\xE3o \xE9 permitida a cria\xE7\xE3o de novos pesos ou tamanhos fora desta tabela oficial.'
        }
      ]
    }
  ]
};
var unooriaTypography = {
  fontFamilies: fontFamilies2,
  fontWeights: fontWeights2,
  fontSizes: fontSizes2,
  lineHeights: lineHeights2,
  desktopFontSizes,
  desktopLineHeights,
  mobileFontSizes,
  mobileLineHeights,
  letterSpacings: letterSpacings2,
  styles: typographyStyles2,
  rules: typographyRules
};
var typography2 = unooriaTypography;

// src/unooria/tokens/spacing.ts
var unooriaSpacing = {
  None: { name: "None", key: "None", px: 0, rem: "0rem", cssVar: "--unooria-spacing-none" },
  "4XS": { name: "4XS", key: "4XS", px: 2, rem: "0.125rem", cssVar: "--unooria-spacing-4xs" },
  XXXS: { name: "XXXS", key: "XXXS", px: 4, rem: "0.25rem", cssVar: "--unooria-spacing-xxxs" },
  XXS: { name: "XXS", key: "XXS", px: 8, rem: "0.5rem", cssVar: "--unooria-spacing-xxs" },
  XS: { name: "XS", key: "XS", px: 12, rem: "0.75rem", cssVar: "--unooria-spacing-xs" },
  S: { name: "S", key: "S", px: 16, rem: "1rem", cssVar: "--unooria-spacing-s" },
  M: { name: "M", key: "M", px: 24, rem: "1.5rem", cssVar: "--unooria-spacing-m" },
  L: { name: "L", key: "L", px: 32, rem: "2rem", cssVar: "--unooria-spacing-l" },
  XL: { name: "XL", key: "XL", px: 48, rem: "3rem", cssVar: "--unooria-spacing-xl" },
  XXL: { name: "XXL", key: "XXL", px: 64, rem: "4rem", cssVar: "--unooria-spacing-xxl" },
  XXXL: { name: "XXXL", key: "XXXL", px: 80, rem: "5rem", cssVar: "--unooria-spacing-xxxl" },
  "4XL": { name: "4XL", key: "4XL", px: 96, rem: "6rem", cssVar: "--unooria-spacing-4xl" }
};
var spacing2 = unooriaSpacing;
var unooriaSpacingPx = {
  None: 0,
  "4XS": 2,
  XXXS: 4,
  XXS: 8,
  XS: 12,
  S: 16,
  M: 24,
  L: 32,
  XL: 48,
  XXL: 64,
  XXXL: 80,
  "4XL": 96
};
var unooriaSpacingRem = {
  None: "0rem",
  "4XS": "0.125rem",
  XXXS: "0.25rem",
  XXS: "0.5rem",
  XS: "0.75rem",
  S: "1rem",
  M: "1.5rem",
  L: "2rem",
  XL: "3rem",
  XXL: "4rem",
  XXXL: "5rem",
  "4XL": "6rem"
};

// src/unooria/tokens/elevation.ts
var unooriaElevation = {
  // Brand
  brandPrimary: {
    name: "Shadow Primary",
    category: "Brand",
    boxShadow: "0px 0px 10px 0px rgba(127, 165, 226, 0.3)",
    cssVar: "--unooria-elevation-brand-primary"
  },
  brandSecondary: {
    name: "Shadow Secondary",
    category: "Brand",
    boxShadow: "0px 0px 10px 0px rgba(14, 16, 57, 0.3)",
    cssVar: "--unooria-elevation-brand-secondary"
  },
  // Semantic
  semanticDanger: {
    name: "Shadow Danger",
    category: "Semantic",
    boxShadow: "0px 0px 10px 0px rgba(227, 26, 26, 0.3)",
    cssVar: "--unooria-elevation-semantic-danger"
  },
  semanticWarning: {
    name: "Shadow Warning",
    category: "Semantic",
    boxShadow: "0px 0px 10px 0px rgba(127, 165, 226, 0.3)",
    cssVar: "--unooria-elevation-semantic-warning"
  },
  semanticSuccess: {
    name: "Shadow Success",
    category: "Semantic",
    boxShadow: "0px 0px 10px 0px rgba(1, 181, 116, 0.3)",
    cssVar: "--unooria-elevation-semantic-success"
  },
  semanticInfo: {
    name: "Shadow Info",
    category: "Semantic",
    boxShadow: "0px 0px 10px 0px rgba(0, 134, 255, 0.3)",
    cssVar: "--unooria-elevation-semantic-info"
  },
  // Neutral
  neutral1: {
    name: "Shadow Neutral 1",
    category: "Neutral",
    boxShadow: "0px 0px 5px 1px rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(4px)",
    cssVar: "--unooria-elevation-neutral-1"
  },
  neutral2: {
    name: "Shadow Neutral 2",
    category: "Neutral",
    boxShadow: "0px 0px 8px 4px rgba(255, 255, 255, 0.1)",
    cssVar: "--unooria-elevation-neutral-2"
  },
  neutral3: {
    name: "Shadow Neutral 3",
    category: "Neutral",
    boxShadow: "0px 0px 8px 4px rgba(255, 255, 255, 0.2)",
    cssVar: "--unooria-elevation-neutral-3"
  },
  neutral4: {
    name: "Shadow Neutral 4",
    category: "Neutral",
    boxShadow: "0px 0px 8px 4px rgba(255, 255, 255, 0.3)",
    cssVar: "--unooria-elevation-neutral-4"
  },
  neutral5: {
    name: "Shadow Neutral 5",
    category: "Neutral",
    boxShadow: "0px 0px 8px 4px rgba(255, 255, 255, 0.4)",
    cssVar: "--unooria-elevation-neutral-5"
  },
  neutral6: {
    name: "Shadow Neutral 6",
    category: "Neutral",
    boxShadow: "0px 0px 8px 4px rgba(255, 255, 255, 0.5)",
    cssVar: "--unooria-elevation-neutral-6"
  }
};
var elevation = unooriaElevation;

// src/unooria/tokens/blur.ts
var backgroundBlur = {
  300: {
    blur: "8px",
    blurPx: 8,
    opacity: 0.3,
    opacityPercent: "30%"
  },
  400: {
    blur: "16px",
    blurPx: 16,
    opacity: 0.4,
    opacityPercent: "40%"
  },
  500: {
    blur: "32px",
    blurPx: 32,
    opacity: 0.5,
    opacityPercent: "50%"
  },
  700: {
    blur: "48px",
    blurPx: 48,
    opacity: 0.7,
    opacityPercent: "70%"
  },
  900: {
    blur: "64px",
    blurPx: 64,
    opacity: 0.9,
    opacityPercent: "90%"
  }
};
var blur = backgroundBlur;

// src/unooria/tokens/grids.ts
var gridBreakpoints = {
  mobile: {
    name: "Mobile",
    description: "Dispositivos m\xF3veis e telas pequenas (smartphones)",
    minWidthPx: 0,
    minWidth: "0px",
    canvasWidthPx: 375,
    columns: 4,
    columnWidthPx: 75,
    gutterPx: 12,
    gutter: "12px",
    marginPx: 12,
    margin: "12px",
    maxContainerWidthPx: 351,
    maxContainerWidth: "351px"
  },
  tablet: {
    name: "Tablet",
    description: "Tablets em orienta\xE7\xE3o retrato/paisagem e telas intermedi\xE1rias",
    minWidthPx: 768,
    minWidth: "768px",
    canvasWidthPx: 1280,
    columns: 8,
    columnWidthPx: 133,
    gutterPx: 24,
    gutter: "24px",
    marginPx: 24,
    margin: "24px",
    maxContainerWidthPx: 1232,
    maxContainerWidth: "1232px"
  },
  notebook: {
    name: "Notebook",
    description: "Laptops, notebooks e monitores compactos",
    minWidthPx: 1280,
    minWidth: "1280px",
    canvasWidthPx: 1440,
    columns: 12,
    columnWidthPx: 90,
    gutterPx: 24,
    gutter: "24px",
    marginPx: 48,
    margin: "48px",
    maxContainerWidthPx: 1344,
    maxContainerWidth: "1344px"
  },
  desktop: {
    name: "Desktop",
    description: "Monitores de alta resolu\xE7\xE3o e monitores widescreen",
    minWidthPx: 1920,
    minWidth: "1920px",
    canvasWidthPx: 1920,
    columns: 12,
    columnWidthPx: 130,
    gutterPx: 24,
    gutter: "24px",
    marginPx: 48,
    margin: "48px",
    maxContainerWidthPx: 1824,
    maxContainerWidth: "1824px"
  }
};
var gridColumns = {
  mobile: gridBreakpoints.mobile.columns,
  tablet: gridBreakpoints.tablet.columns,
  notebook: gridBreakpoints.notebook.columns,
  desktop: gridBreakpoints.desktop.columns
};
var gridGutters = {
  mobile: gridBreakpoints.mobile.gutter,
  tablet: gridBreakpoints.tablet.gutter,
  notebook: gridBreakpoints.notebook.gutter,
  desktop: gridBreakpoints.desktop.gutter
};
var gridMargins = {
  mobile: gridBreakpoints.mobile.margin,
  tablet: gridBreakpoints.tablet.margin,
  notebook: gridBreakpoints.notebook.margin,
  desktop: gridBreakpoints.desktop.margin
};
var gridContainerWidths = {
  mobile: gridBreakpoints.mobile.maxContainerWidth,
  tablet: gridBreakpoints.tablet.maxContainerWidth,
  notebook: gridBreakpoints.notebook.maxContainerWidth,
  desktop: gridBreakpoints.desktop.maxContainerWidth
};
var breakpoints = {
  mobile: gridBreakpoints.mobile.minWidth,
  tablet: gridBreakpoints.tablet.minWidth,
  notebook: gridBreakpoints.notebook.minWidth,
  desktop: gridBreakpoints.desktop.minWidth
};
var gridWidgetsBreakpoints = {
  mobile360: {
    name: "Mobile 360px",
    deviceCategory: "Mobile",
    canvasWidthPx: 360,
    marginPx: 16,
    margin: "16px",
    gutterPx: 0,
    gutter: "0px",
    widgets: [
      {
        label: "Widget Unico",
        columnsSpan: 4,
        widthPx: 328,
        flexiblePercentage: "93,33%",
        percentageValue: 93.33
      }
    ]
  },
  mobile375: {
    name: "Mobile 375px",
    deviceCategory: "Mobile",
    canvasWidthPx: 375,
    marginPx: 16,
    margin: "16px",
    gutterPx: 0,
    gutter: "0px",
    widgets: [
      {
        label: "Widget Unico",
        columnsSpan: 4,
        widthPx: 343,
        flexiblePercentage: "93,60%",
        percentageValue: 93.6
      }
    ]
  },
  tabletPortrait: {
    name: "Tablet (Retrato)",
    deviceCategory: "Tablet",
    orientation: "Portrait",
    canvasWidthPx: 800,
    marginPx: 24,
    margin: "24px",
    gutterPx: 24,
    gutter: "24px",
    widgets: [
      {
        label: "Widget Card 1",
        columnsSpan: 4,
        widthPx: 336,
        flexiblePercentage: "42,00%",
        percentageValue: 42
      },
      {
        label: "Widget Card 2",
        columnsSpan: 4,
        widthPx: 336,
        flexiblePercentage: "42,00%",
        percentageValue: 42
      }
    ]
  },
  tabletLandscape: {
    name: "Tablet (Paisagem)",
    deviceCategory: "Tablet",
    orientation: "Landscape",
    canvasWidthPx: 1280,
    marginPx: 24,
    margin: "24px",
    gutterPx: 24,
    gutter: "24px",
    widgets: [
      {
        label: "Widget Card",
        columnsSpan: 2,
        widthPx: 336,
        flexiblePercentage: "26,25%",
        percentageValue: 26.25
      },
      {
        label: "Widget Card",
        columnsSpan: 2,
        widthPx: 336,
        flexiblePercentage: "26,25%",
        percentageValue: 26.25
      }
    ]
  },
  notebook: {
    name: "Notebook",
    deviceCategory: "Notebook",
    canvasWidthPx: 1440,
    marginPx: 48,
    margin: "48px",
    gutterPx: 24,
    gutter: "24px",
    widgets: [
      {
        label: "Widget Esquerda",
        columnsSpan: 2,
        widthPx: 204,
        flexiblePercentage: "14,17%",
        percentageValue: 14.17
      },
      {
        label: "Widget Central",
        columnsSpan: 6,
        widthPx: 660,
        flexiblePercentage: "45,83%",
        percentageValue: 45.83
      },
      {
        label: "Widget Direita",
        columnsSpan: 2,
        widthPx: 204,
        flexiblePercentage: "14,17%",
        percentageValue: 14.17
      }
    ]
  },
  desktop: {
    name: "Desktop",
    deviceCategory: "Desktop",
    canvasWidthPx: 1920,
    marginPx: 48,
    margin: "48px",
    gutterPx: 24,
    gutter: "24px",
    widgets: [
      {
        label: "Widget Esquerda",
        columnsSpan: 2,
        widthPx: 284,
        flexiblePercentage: "14,79%",
        percentageValue: 14.79
      },
      {
        label: "Widget Central",
        columnsSpan: 6,
        widthPx: 900,
        flexiblePercentage: "46,88%",
        percentageValue: 46.88
      },
      {
        label: "Widget Direita",
        columnsSpan: 2,
        widthPx: 284,
        flexiblePercentage: "14,79%",
        percentageValue: 14.79
      }
    ]
  }
};
var unooriaGrids = {
  gridBreakpoints,
  gridColumns,
  gridGutters,
  gridMargins,
  gridContainerWidths,
  breakpoints,
  gridWidgetsBreakpoints
};
var grids = unooriaGrids;

// src/unooria/components/AlertBox/AlertBox.tsx
import React, { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var InfoIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
    ]
  }
);
var SuccessIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }),
      /* @__PURE__ */ jsx("polyline", { points: "22 4 12 14.01 9 11.01" })
    ]
  }
);
var WarningIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
    ]
  }
);
var ErrorIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }),
      /* @__PURE__ */ jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })
    ]
  }
);
var CloseIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ]
  }
);
function getDefaultIcon(variant) {
  switch (variant) {
    case "success":
      return /* @__PURE__ */ jsx(SuccessIcon, {});
    case "warning":
      return /* @__PURE__ */ jsx(WarningIcon, {});
    case "error":
      return /* @__PURE__ */ jsx(ErrorIcon, {});
    case "info":
    default:
      return /* @__PURE__ */ jsx(InfoIcon, {});
  }
}
var AlertBox = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "info",
      title,
      description,
      children,
      icon = true,
      isDismissible = false,
      onClose,
      action,
      actions,
      actionButton,
      bordered = true,
      theme = "light",
      className = "",
      style,
      role,
      "aria-label": ariaLabel,
      "aria-live": ariaLive = "polite"
    } = _b, restProps = __objRest(_b, [
      "variant",
      "title",
      "description",
      "children",
      "icon",
      "isDismissible",
      "onClose",
      "action",
      "actions",
      "actionButton",
      "bordered",
      "theme",
      "className",
      "style",
      "role",
      "aria-label",
      "aria-live"
    ]);
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return null;
    }
    const handleClose = (e) => {
      setVisible(false);
      if (onClose) {
        onClose(e);
      }
    };
    let renderedIcon = null;
    if (icon === true) {
      renderedIcon = getDefaultIcon(variant);
    } else if (icon !== false && icon !== null && icon !== void 0) {
      renderedIcon = icon;
    }
    const hasBody = description || children;
    const actionContent = action || actions || actionButton;
    const computedRole = role || (variant === "error" || variant === "warning" ? "alert" : "status");
    const computedAriaLabel = ariaLabel || (typeof title === "string" ? title : `Alerta ${variant}`);
    const alertClasses = [
      "unooria-alertbox",
      `unooria-alertbox--${variant}`,
      `unooria-alertbox--${theme}`,
      bordered ? "unooria-alertbox--bordered" : "unooria-alertbox--borderless",
      className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref,
        role: computedRole,
        "aria-live": ariaLive,
        "aria-atomic": "true",
        "aria-label": computedAriaLabel,
        "data-theme": theme,
        className: alertClasses,
        style
      }, restProps), {
        children: [
          renderedIcon && /* @__PURE__ */ jsx("div", { className: "unooria-alertbox__icon", "aria-hidden": "true", children: renderedIcon }),
          /* @__PURE__ */ jsxs("div", { className: "unooria-alertbox__body", children: [
            title && /* @__PURE__ */ jsx("div", { className: "unooria-alertbox__title", children: title }),
            hasBody && /* @__PURE__ */ jsxs("div", { className: "unooria-alertbox__description", children: [
              description,
              children
            ] }),
            actionContent && /* @__PURE__ */ jsx("div", { className: "unooria-alertbox__actions", children: actionContent })
          ] }),
          isDismissible && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "unooria-alertbox__close-btn",
              onClick: handleClose,
              "aria-label": "Fechar alerta",
              children: /* @__PURE__ */ jsx(CloseIcon, {})
            }
          )
        ]
      })
    );
  }
);
AlertBox.displayName = "AlertBox";

// src/unooria/components/Badge/Badge.tsx
import React2 from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Badge = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      as: Component = "span",
      variant,
      status,
      size = "md",
      theme = "light",
      icon,
      iconPosition = "left",
      dot = false,
      pill = true,
      disabled = false,
      dismissible = false,
      onClose,
      children,
      className = "",
      style,
      onClick,
      onKeyDown
    } = _b, restProps = __objRest(_b, [
      "as",
      "variant",
      "status",
      "size",
      "theme",
      "icon",
      "iconPosition",
      "dot",
      "pill",
      "disabled",
      "dismissible",
      "onClose",
      "children",
      "className",
      "style",
      "onClick",
      "onKeyDown"
    ]);
    var _a2;
    const activeVariant = variant || status || "default";
    const isInteractive = Boolean(onClick) && !disabled;
    const badgeClasses = [
      "unooria-badge",
      `unooria-badge--size-${size}`,
      `unooria-badge--variant-${activeVariant}`,
      `unooria-badge--${theme}`,
      pill ? "unooria-badge--pill" : "unooria-badge--square",
      isInteractive ? "unooria-badge--interactive" : "",
      disabled ? "unooria-badge--disabled" : "",
      className
    ].filter(Boolean).join(" ");
    const handleClose = (e) => {
      e.stopPropagation();
      if (!disabled && onClose) {
        onClose(e);
      }
    };
    const handleKeyDown = (e) => {
      if (isInteractive && !disabled && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        }
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };
    return /* @__PURE__ */ jsxs2(
      Component,
      __spreadProps(__spreadValues({
        ref,
        "data-theme": theme,
        className: badgeClasses,
        style,
        onClick: disabled ? void 0 : onClick,
        onKeyDown: handleKeyDown,
        "aria-disabled": disabled ? true : void 0,
        role: isInteractive ? restProps.role || "button" : restProps.role,
        tabIndex: isInteractive && !disabled ? (_a2 = restProps.tabIndex) != null ? _a2 : 0 : restProps.tabIndex
      }, restProps), {
        children: [
          dot && /* @__PURE__ */ jsx2("span", { className: "unooria-badge__dot", "aria-hidden": "true" }),
          icon && iconPosition === "left" && /* @__PURE__ */ jsx2("span", { className: "unooria-badge__icon", "aria-hidden": "true", children: icon }),
          children && /* @__PURE__ */ jsx2("span", { className: "unooria-badge__content", children }),
          icon && iconPosition === "right" && /* @__PURE__ */ jsx2("span", { className: "unooria-badge__icon", "aria-hidden": "true", children: icon }),
          dismissible && /* @__PURE__ */ jsx2(
            "button",
            {
              type: "button",
              className: "unooria-badge__close-btn",
              onClick: handleClose,
              "aria-label": "Remover etiqueta",
              tabIndex: disabled ? -1 : 0,
              disabled,
              children: /* @__PURE__ */ jsx2(
                "svg",
                {
                  viewBox: "0 0 16 16",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx2("path", { d: "M4 4l8 8M12 4l-8 8" })
                }
              )
            }
          )
        ]
      })
    );
  }
);
Badge.displayName = "Badge";

// src/unooria/components/Breadcrumb/Breadcrumb.tsx
import React3, { useState as useState2 } from "react";
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DefaultSeparator = () => /* @__PURE__ */ jsx3(
  "svg",
  {
    width: "14",
    height: "14",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    style: { display: "inline-block", verticalAlign: "middle", flexShrink: 0 },
    children: /* @__PURE__ */ jsx3(
      "path",
      {
        d: "M6 12L10 8L6 4",
        stroke: "currentColor",
        strokeWidth: "1.75",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
var Breadcrumb = React3.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      items = [],
      separator = /* @__PURE__ */ jsx3(DefaultSeparator, {}),
      theme = "light",
      ariaLabel = "Breadcrumb",
      size = "s",
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      className = "",
      style
    } = _b, restProps = __objRest(_b, [
      "items",
      "separator",
      "theme",
      "ariaLabel",
      "size",
      "maxItems",
      "itemsBeforeCollapse",
      "itemsAfterCollapse",
      "className",
      "style"
    ]);
    const [isExpanded, setIsExpanded] = useState2(false);
    if (!items || items.length === 0) {
      return null;
    }
    const beforeCount = Math.max(1, itemsBeforeCollapse != null ? itemsBeforeCollapse : 1);
    const afterCount = Math.max(1, itemsAfterCollapse != null ? itemsAfterCollapse : 1);
    const shouldCollapse = Boolean(maxItems && maxItems > 0 && items.length > maxItems && !isExpanded);
    const canCollapse = shouldCollapse && beforeCount + afterCount < items.length;
    let visibleBefore = [];
    let visibleAfter = [];
    if (canCollapse) {
      visibleBefore = items.slice(0, beforeCount).map((item, idx) => ({
        item,
        originalIndex: idx
      }));
      visibleAfter = items.slice(items.length - afterCount).map((item, idx) => ({
        item,
        originalIndex: items.length - afterCount + idx
      }));
    } else {
      visibleBefore = items.map((item, index) => ({ item, originalIndex: index }));
    }
    const renderItemContent = (item, originalIndex) => {
      const _a2 = item, {
        label,
        href,
        icon,
        isCurrent: itemIsCurrent,
        onClick,
        as: ComponentAs,
        className: itemClassName = "",
        style: itemStyle,
        ariaLabel: itemAriaLabel
      } = _a2, itemRestProps = __objRest(_a2, [
        "label",
        "href",
        "icon",
        "isCurrent",
        "onClick",
        "as",
        "className",
        "style",
        "ariaLabel"
      ]);
      const isCurrent = itemIsCurrent != null ? itemIsCurrent : originalIndex === items.length - 1;
      const linkClasses = `unooria-breadcrumb__link unooria-breadcrumb-link ${isCurrent ? "unooria-breadcrumb__link--current unooria-breadcrumb-link--current" : ""} ${itemClassName}`.trim();
      const innerContent = /* @__PURE__ */ jsxs3(Fragment, { children: [
        icon && /* @__PURE__ */ jsx3("span", { className: "unooria-breadcrumb__icon unooria-breadcrumb-icon", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsx3("span", { children: label })
      ] });
      if (ComponentAs) {
        const Component = ComponentAs;
        return /* @__PURE__ */ jsx3(
          Component,
          __spreadProps(__spreadValues({
            href,
            onClick,
            "aria-label": itemAriaLabel,
            "aria-current": isCurrent ? "page" : void 0,
            className: linkClasses,
            style: itemStyle
          }, itemRestProps), {
            children: innerContent
          })
        );
      }
      if (isCurrent) {
        return /* @__PURE__ */ jsx3(
          "span",
          __spreadProps(__spreadValues({
            "aria-current": "page",
            "aria-label": itemAriaLabel,
            className: linkClasses,
            style: itemStyle
          }, itemRestProps), {
            children: innerContent
          })
        );
      }
      if (href) {
        return /* @__PURE__ */ jsx3(
          "a",
          __spreadProps(__spreadValues({
            href,
            onClick,
            "aria-label": itemAriaLabel,
            className: linkClasses,
            style: itemStyle
          }, itemRestProps), {
            children: innerContent
          })
        );
      }
      if (onClick) {
        return /* @__PURE__ */ jsx3(
          "button",
          __spreadProps(__spreadValues({
            type: "button",
            onClick,
            "aria-label": itemAriaLabel,
            className: linkClasses,
            style: itemStyle
          }, itemRestProps), {
            children: innerContent
          })
        );
      }
      return /* @__PURE__ */ jsx3(
        "span",
        __spreadProps(__spreadValues({
          "aria-label": itemAriaLabel,
          className: linkClasses,
          style: itemStyle
        }, itemRestProps), {
          children: innerContent
        })
      );
    };
    return /* @__PURE__ */ jsx3(
      "nav",
      __spreadProps(__spreadValues({
        ref,
        "aria-label": ariaLabel || "Breadcrumb",
        className: `unooria-breadcrumb unooria-breadcrumb--${theme} unooria-breadcrumb--size-${size} ${className}`.trim(),
        style
      }, restProps), {
        children: /* @__PURE__ */ jsx3("ol", { className: "unooria-breadcrumb__list unooria-breadcrumb-list", children: canCollapse ? /* @__PURE__ */ jsxs3(Fragment, { children: [
          visibleBefore.map(({ item, originalIndex }) => /* @__PURE__ */ jsxs3(React3.Fragment, { children: [
            /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__item unooria-breadcrumb-item", children: renderItemContent(item, originalIndex) }),
            /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__separator unooria-breadcrumb-separator", "aria-hidden": "true", children: separator })
          ] }, originalIndex)),
          /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__item unooria-breadcrumb-item", children: /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              className: "unooria-breadcrumb__ellipsis-btn unooria-breadcrumb-ellipsis-btn",
              onClick: () => setIsExpanded(true),
              "aria-label": "Mostrar mais n\xEDveis de navega\xE7\xE3o",
              title: "Expandir caminho",
              children: "..."
            }
          ) }),
          /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__separator unooria-breadcrumb-separator", "aria-hidden": "true", children: separator }),
          visibleAfter.map(({ item, originalIndex }, idx) => {
            const isLast = idx === visibleAfter.length - 1;
            return /* @__PURE__ */ jsxs3(React3.Fragment, { children: [
              /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__item unooria-breadcrumb-item", children: renderItemContent(item, originalIndex) }),
              !isLast && /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__separator unooria-breadcrumb-separator", "aria-hidden": "true", children: separator })
            ] }, originalIndex);
          })
        ] }) : (
          /* Renderização padrão sem colapso ativo */
          visibleBefore.map(({ item, originalIndex }, idx) => {
            const isLast = idx === visibleBefore.length - 1;
            return /* @__PURE__ */ jsxs3(React3.Fragment, { children: [
              /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__item unooria-breadcrumb-item", children: renderItemContent(item, originalIndex) }),
              !isLast && /* @__PURE__ */ jsx3("li", { className: "unooria-breadcrumb__separator unooria-breadcrumb-separator", "aria-hidden": "true", children: separator })
            ] }, originalIndex);
          })
        ) })
      })
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

// src/unooria/components/Button/Button.tsx
import React4, { useState as useState3 } from "react";
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var LoadingSpinner = ({ sizePx, className = "" }) => /* @__PURE__ */ jsxs4(
  "svg",
  {
    width: sizePx,
    height: sizePx,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: `unooria-button__spinner ${className}`.trim(),
    "aria-hidden": "true",
    role: "presentation",
    children: [
      /* @__PURE__ */ jsx4(
        "circle",
        {
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeOpacity: "0.25"
        }
      ),
      /* @__PURE__ */ jsx4(
        "path",
        {
          d: "M12 2C6.47715 2 2 6.47715 2 12C2 14.228 2.73031 16.2858 3.96324 17.95",
          stroke: "currentColor",
          strokeWidth: "3",
          strokeLinecap: "round"
        }
      )
    ]
  }
);
var getIconSize = (size) => {
  switch (size) {
    case "sm":
      return 16;
    case "lg":
      return 22;
    case "md":
    default:
      return 18;
  }
};
var Button = React4.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "primary",
      size = "md",
      theme = "light",
      state = "default",
      isHovered = false,
      isActive = false,
      isFocused = false,
      isDisabled = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      as,
      children,
      className = "",
      style,
      disabled,
      onClick,
      type = "button"
    } = _b, restProps = __objRest(_b, [
      "variant",
      "size",
      "theme",
      "state",
      "isHovered",
      "isActive",
      "isFocused",
      "isDisabled",
      "isLoading",
      "loadingText",
      "leftIcon",
      "rightIcon",
      "fullWidth",
      "as",
      "children",
      "className",
      "style",
      "disabled",
      "onClick",
      "type"
    ]);
    const [internalHover, setInternalHover] = useState3(false);
    const [internalActive, setInternalActive] = useState3(false);
    const [internalFocus, setInternalFocus] = useState3(false);
    const disabledResolved = Boolean(
      isDisabled || state === "disabled" || disabled
    );
    const loadingResolved = Boolean(isLoading || state === "loading");
    const hoverResolved = !disabledResolved && !loadingResolved && (isHovered || state === "hover" || internalHover);
    const activeResolved = !disabledResolved && !loadingResolved && (isActive || state === "active" || internalActive);
    const focusResolved = !disabledResolved && !loadingResolved && (isFocused || state === "focus" || internalFocus);
    const Component = as || ("href" in restProps && restProps.href ? "a" : "button");
    const isNativeButton = Component === "button";
    const buttonClasses = [
      "unooria-button",
      `unooria-button--variant-${variant}`,
      `unooria-button--size-${size}`,
      `unooria-button--${theme}`,
      fullWidth ? "unooria-button--full-width" : "",
      disabledResolved ? "unooria-button--disabled" : "",
      loadingResolved ? "unooria-button--loading" : "",
      hoverResolved ? "unooria-button--state-hover" : "",
      activeResolved ? "unooria-button--state-active" : "",
      focusResolved ? "unooria-button--state-focus" : "",
      state !== "default" ? `unooria-button--state-${state}` : "",
      className
    ].filter(Boolean).join(" ");
    const handleClick = (e) => {
      if (disabledResolved || loadingResolved) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };
    const iconDimension = getIconSize(size);
    return /* @__PURE__ */ jsx4(
      Component,
      __spreadProps(__spreadValues({
        ref,
        type: isNativeButton ? type : void 0,
        disabled: isNativeButton ? disabledResolved || loadingResolved : void 0,
        "aria-disabled": disabledResolved || loadingResolved,
        "aria-busy": loadingResolved,
        role: !isNativeButton ? "button" : void 0,
        tabIndex: disabledResolved || loadingResolved ? -1 : void 0,
        "data-theme": theme,
        "data-variant": variant,
        "data-size": size,
        "data-state": state,
        className: buttonClasses,
        style,
        onClick: handleClick,
        onMouseEnter: () => setInternalHover(true),
        onMouseLeave: () => {
          setInternalHover(false);
          setInternalActive(false);
        },
        onMouseDown: () => setInternalActive(true),
        onMouseUp: () => setInternalActive(false),
        onFocus: () => setInternalFocus(true),
        onBlur: () => setInternalFocus(false)
      }, restProps), {
        children: loadingResolved ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
          /* @__PURE__ */ jsx4(LoadingSpinner, { sizePx: iconDimension }),
          loadingText ? /* @__PURE__ */ jsx4("span", { className: "unooria-button__content", children: loadingText }) : children ? /* @__PURE__ */ jsx4("span", { className: "unooria-button__content", style: { opacity: 0.85 }, children }) : null
        ] }) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
          leftIcon && /* @__PURE__ */ jsx4(
            "span",
            {
              className: "unooria-button__icon unooria-button__icon--left",
              "aria-hidden": "true",
              children: leftIcon
            }
          ),
          children && /* @__PURE__ */ jsx4("span", { className: "unooria-button__content", children }),
          rightIcon && /* @__PURE__ */ jsx4(
            "span",
            {
              className: "unooria-button__icon unooria-button__icon--right",
              "aria-hidden": "true",
              children: rightIcon
            }
          )
        ] })
      })
    );
  }
);
Button.displayName = "Button";
export {
  AlertBox,
  Badge,
  Breadcrumb,
  Button,
  unooria_exports as UnooriaUI,
  whatsapp_exports as WhatsAppUI,
  backgroundBlur,
  blur,
  brandBlue,
  brandBlueOverlay,
  brandNavy,
  brandNavyOverlay,
  brandOrange,
  brandOrangeOverlay,
  brandPurple,
  brandPurpleOverlay,
  breakpoints,
  colors,
  danger,
  dangerOverlay,
  desktopFontSizes,
  desktopLineHeights,
  elevation,
  fontFamilies2 as fontFamilies,
  fontSizes2 as fontSizes,
  fontWeights2 as fontWeights,
  gradients,
  gridBreakpoints,
  gridColumns,
  gridContainerWidths,
  gridGutters,
  gridMargins,
  gridWidgetsBreakpoints,
  grids,
  info,
  infoOverlay,
  letterSpacings2 as letterSpacings,
  lineHeights2 as lineHeights,
  mobileFontSizes,
  mobileLineHeights,
  neutral,
  neutralDark,
  neutralDarkOverlay,
  neutralLightOverlay,
  spacing2 as spacing,
  success,
  successOverlay,
  tokens_exports as tokens,
  typography2 as typography,
  typographyRules,
  typographyStyles2 as typographyStyles,
  unooriaColors,
  unooriaElevation,
  unooriaGrids,
  unooriaSpacing,
  unooriaSpacingPx,
  unooriaSpacingRem,
  unooriaTypography,
  warning,
  warningOverlay
};
//# sourceMappingURL=index.mjs.map