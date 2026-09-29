/**
 * Tokens de Cores do Design System UnooriaAI.
 *
 * Espelho TypeScript de `colors.css` (gerado da mesma tabela). Cada token traz o
 * valor nos dois temas e o nome do token da Plataforma Unooria de que o literal
 * foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UaiTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UaiColorValue {
  /** Literal copiado da Unooria */
  value: string;
  /** Token de origem em `src/unooria/tokens/` */
  unooria: string;
}

/**
 * Descrição de um token que muda entre os temas.
 */
export interface UaiColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Agrupamento usado na documentação */
  group: string;
  /** Onde o token é aplicado no produto */
  usage: string;
  light: UaiColorValue;
  dark: UaiColorValue;
}

/**
 * Descrição de um token invariante entre temas.
 */
export interface UaiInvariantColorToken extends UaiColorValue {
  cssVar: string;
  group: string;
  usage: string;
}

/**
 * Grupos de tokens, na ordem de exibição da documentação.
 */
export const uaiColorGroups = ["Superfícies","Texto","Bordas","Ações","Estados","Escada translúcida","Texto suave","Cliente web","Overlays"] as const;

/**
 * Tokens que variam entre os temas claro e escuro.
 */
export const uaiColorTokens = {
  bgPrimary: {
    cssVar: '--uai-bg-primary',
    group: "Superfícies",
    usage: "Área de conversa, cartões, campos e diálogos",
    light: { value: "#FFFFFF", unooria: '--unooria-color-neutral-50' },
    dark: { value: "#0E1039", unooria: '--unooria-color-brandpurple-900' },
  },
  bgSecondary: {
    cssVar: '--uai-bg-secondary',
    group: "Superfícies",
    usage: "Barra lateral, trilhos e o documento atrás das superfícies",
    light: { value: "#F7F6FA", unooria: '--unooria-color-brandpurple-50' },
    dark: { value: "#080922", unooria: '--unooria-color-brandpurple-950' },
  },
  bgTertiary: {
    cssVar: '--uai-bg-tertiary',
    group: "Superfícies",
    usage: "Blocos sutis, código e mídia ainda não carregada",
    light: { value: "#EFEEF5", unooria: '--unooria-color-brandpurple-100' },
    dark: { value: "#34375C", unooria: '--unooria-color-brandpurple-800' },
  },
  bgInverse: {
    cssVar: '--uai-bg-inverse',
    group: "Superfícies",
    usage: "Botão sólido, avatar do usuário, marcador ativo e botão de envio",
    light: { value: "#0E1039", unooria: '--unooria-color-brandpurple-900' },
    dark: { value: "#F7F6FA", unooria: '--unooria-color-brandpurple-50' },
  },
  bgInverseHover: {
    cssVar: '--uai-bg-inverse-hover',
    group: "Superfícies",
    usage: "Botão sólido sob o ponteiro",
    light: { value: "#34375C", unooria: '--unooria-color-brandpurple-800' },
    dark: { value: "#DFDDEB", unooria: '--unooria-color-brandpurple-200' },
  },
  bgBrand: {
    cssVar: '--uai-bg-brand',
    group: "Superfícies",
    usage: "Avatar do assistente e superfícies de marca",
    light: { value: "#716C98", unooria: '--unooria-color-brandpurple-600' },
    dark: { value: "#AAA5C2", unooria: '--unooria-color-brandpurple-400' },
  },
  textPrimary: {
    cssVar: '--uai-text-primary',
    group: "Texto",
    usage: "Títulos, mensagens e rótulos de alto contraste",
    light: { value: "#22272A", unooria: '--unooria-color-neutral-950' },
    dark: { value: "#F5F5F5", unooria: '--unooria-color-neutraldark-950' },
  },
  textSecondary: {
    cssVar: '--uai-text-secondary',
    group: "Texto",
    usage: "Metadados e texto de apoio",
    light: { value: "#475157", unooria: '--unooria-color-neutral-700' },
    dark: { value: "#CBD4D6", unooria: '--unooria-color-neutraldark-900' },
  },
  textTertiary: {
    cssVar: '--uai-text-tertiary',
    group: "Texto",
    usage: "Texto de menor ênfase (legendas e ajudas)",
    light: { value: "#536167", unooria: '--unooria-color-neutral-600' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  textInverse: {
    cssVar: '--uai-text-inverse',
    group: "Texto",
    usage: "Rótulo e glifo sobre superfície invertida, de marca, de ação e de erro",
    light: { value: "#FFFFFF", unooria: '--unooria-color-neutral-50' },
    dark: { value: "#080922", unooria: '--unooria-color-brandpurple-950' },
  },
  textBrand: {
    cssVar: '--uai-text-brand',
    group: "Texto",
    usage: "Texto de marca (selo primário)",
    light: { value: "#57547D", unooria: '--unooria-color-brandpurple-700' },
    dark: { value: "#CCC9DE", unooria: '--unooria-color-brandpurple-300' },
  },
  textLink: {
    cssVar: '--uai-text-link',
    group: "Texto",
    usage: "Links e ações de texto",
    light: { value: "#57547D", unooria: '--unooria-color-brandpurple-700' },
    dark: { value: "#CCC9DE", unooria: '--unooria-color-brandpurple-300' },
  },
  borderDefault: {
    cssVar: '--uai-border-default',
    group: "Bordas",
    usage: "Divisores e contornos decorativos",
    light: { value: "#CCC9DE", unooria: '--unooria-color-brandpurple-300' },
    dark: { value: "#57547D", unooria: '--unooria-color-brandpurple-700' },
  },
  borderStrong: {
    cssVar: '--uai-border-strong',
    group: "Bordas",
    usage: "Contorno de alto contraste",
    light: { value: "#0E1039", unooria: '--unooria-color-brandpurple-900' },
    dark: { value: "#F5F5F5", unooria: '--unooria-color-neutraldark-950' },
  },
  borderControl: {
    cssVar: '--uai-border-control',
    group: "Bordas",
    usage: "Contorno de campo, controle e trilho desligado (gráfico ≥ 3:1)",
    light: { value: "#617379", unooria: '--unooria-color-neutral-500' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  borderBrand: {
    cssVar: '--uai-border-brand',
    group: "Bordas",
    usage: "Anel de foco e campo focado (gráfico ≥ 3:1)",
    light: { value: "#716C98", unooria: '--unooria-color-brandpurple-600' },
    dark: { value: "#AAA5C2", unooria: '--unooria-color-brandpurple-400' },
  },
  interactivePrimary: {
    cssVar: '--uai-interactive-primary',
    group: "Ações",
    usage: "Botão primário, controle ligado e ação principal",
    light: { value: "#716C98", unooria: '--unooria-color-brandpurple-600' },
    dark: { value: "#AAA5C2", unooria: '--unooria-color-brandpurple-400' },
  },
  interactiveHover: {
    cssVar: '--uai-interactive-hover',
    group: "Ações",
    usage: "Ação primária sob o ponteiro",
    light: { value: "#57547D", unooria: '--unooria-color-brandpurple-700' },
    dark: { value: "#CCC9DE", unooria: '--unooria-color-brandpurple-300' },
  },
  interactiveSecondary: {
    cssVar: '--uai-interactive-secondary',
    group: "Ações",
    usage: "Ação secundária em azul da marca",
    light: { value: "#49699F", unooria: '--unooria-color-brandnavy-800' },
    dark: { value: "#7FA5E2", unooria: '--unooria-color-brandnavy-600' },
  },
  statusSuccess: {
    cssVar: '--uai-status-success',
    group: "Estados",
    usage: "Sucesso (texto ≥ 4,5:1 sobre a superfície e sobre o seu preenchimento)",
    light: { value: "#006746", unooria: '--unooria-color-success-800' },
    dark: { value: "#26E197", unooria: '--unooria-color-success-400' },
  },
  statusError: {
    cssVar: '--uai-status-error',
    group: "Estados",
    usage: "Erro e ação destrutiva",
    light: { value: "#C11414", unooria: '--unooria-color-danger-700' },
    dark: { value: "#FFA1A1", unooria: '--unooria-color-danger-300' },
  },
  statusErrorHover: {
    cssVar: '--uai-status-error-hover',
    group: "Estados",
    usage: "Ação destrutiva sob o ponteiro",
    light: { value: "#9F1515", unooria: '--unooria-color-danger-800' },
    dark: { value: "#FFC7C7", unooria: '--unooria-color-danger-200' },
  },
  statusWarning: {
    cssVar: '--uai-status-warning',
    group: "Estados",
    usage: "Atenção",
    light: { value: "#B73506", unooria: '--unooria-color-warning-700' },
    dark: { value: "#FF9C20", unooria: '--unooria-color-warning-400' },
  },
  statusInfo: {
    cssVar: '--uai-status-info',
    group: "Estados",
    usage: "Informação",
    light: { value: "#005CE6", unooria: '--unooria-color-info-700' },
    dark: { value: "#00B0FF", unooria: '--unooria-color-info-400' },
  },
  fillBrand: {
    cssVar: '--uai-fill-brand',
    group: "Estados",
    usage: "Preenchimento do selo primário",
    light: { value: "rgba(14, 16, 57, 0.10)", unooria: '--unooria-color-opacity-brandpurple-100' },
    dark: { value: "rgba(255, 255, 255, 0.10)", unooria: '--unooria-color-opacity-neutrallight-100' },
  },
  fillSuccess: {
    cssVar: '--uai-fill-success',
    group: "Estados",
    usage: "Preenchimento do selo de sucesso",
    light: { value: "rgba(1, 181, 116, 0.10)", unooria: '--unooria-color-opacity-success-100' },
    dark: { value: "rgba(1, 181, 116, 0.10)", unooria: '--unooria-color-opacity-success-100' },
  },
  fillError: {
    cssVar: '--uai-fill-error',
    group: "Estados",
    usage: "Preenchimento do selo de erro",
    light: { value: "rgba(227, 26, 26, 0.10)", unooria: '--unooria-color-opacity-danger-100' },
    dark: { value: "rgba(227, 26, 26, 0.10)", unooria: '--unooria-color-opacity-danger-100' },
  },
  fillWarning: {
    cssVar: '--uai-fill-warning',
    group: "Estados",
    usage: "Preenchimento do selo de atenção",
    light: { value: "rgba(249, 118, 7, 0.10)", unooria: '--unooria-color-opacity-warning-100' },
    dark: { value: "rgba(249, 118, 7, 0.10)", unooria: '--unooria-color-opacity-warning-100' },
  },
  fillInfo: {
    cssVar: '--uai-fill-info',
    group: "Estados",
    usage: "Preenchimento do selo de informação",
    light: { value: "rgba(0, 134, 255, 0.10)", unooria: '--unooria-color-opacity-info-100' },
    dark: { value: "rgba(0, 134, 255, 0.10)", unooria: '--unooria-color-opacity-info-100' },
  },
  fill2: {
    cssVar: '--uai-fill-2',
    group: "Escada translúcida",
    usage: "Item em hover (NavItem, cartões)",
    light: { value: "rgba(14, 16, 57, 0.05)", unooria: '--unooria-color-opacity-brandpurple-50' },
    dark: { value: "rgba(255, 255, 255, 0.05)", unooria: '--unooria-color-opacity-neutrallight-50' },
  },
  fill4: {
    cssVar: '--uai-fill-4',
    group: "Escada translúcida",
    usage: "Item ativo, selo padrão, etiqueta, campo de busca e balão do usuário",
    light: { value: "rgba(14, 16, 57, 0.10)", unooria: '--unooria-color-opacity-brandpurple-100' },
    dark: { value: "rgba(255, 255, 255, 0.10)", unooria: '--unooria-color-opacity-neutrallight-100' },
  },
  fill8: {
    cssVar: '--uai-fill-8',
    group: "Escada translúcida",
    usage: "Hover de sugestão, do compositor e da linha lateral",
    light: { value: "rgba(14, 16, 57, 0.20)", unooria: '--unooria-color-opacity-brandpurple-200' },
    dark: { value: "rgba(255, 255, 255, 0.20)", unooria: '--unooria-color-opacity-neutrallight-200' },
  },
  fill10: {
    cssVar: '--uai-fill-10',
    group: "Escada translúcida",
    usage: "Divisor, botão de ícone pressionado e etiqueta em hover",
    light: { value: "rgba(14, 16, 57, 0.30)", unooria: '--unooria-color-opacity-brandpurple-300' },
    dark: { value: "rgba(255, 255, 255, 0.30)", unooria: '--unooria-color-opacity-neutrallight-300' },
  },
  textSoft30: {
    cssVar: '--uai-text-soft-30',
    group: "Texto suave",
    usage: "Texto de campo desabilitado (isento de contraste)",
    light: { value: "#7C8E94", unooria: '--unooria-color-neutral-400' },
    dark: { value: "#7C8E94", unooria: '--unooria-color-neutraldark-700' },
  },
  textSoft40: {
    cssVar: '--uai-text-soft-40',
    group: "Texto suave",
    usage: "Espaço reservado, rótulo de seção e glifos de campo",
    light: { value: "#536167", unooria: '--unooria-color-neutral-600' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  textSoft50: {
    cssVar: '--uai-text-soft-50',
    group: "Texto suave",
    usage: "Descrição de cartão, valor de configuração e fechar do diálogo",
    light: { value: "#536167", unooria: '--unooria-color-neutral-600' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  textSoft60: {
    cssVar: '--uai-text-soft-60',
    group: "Texto suave",
    usage: "Item de navegação em repouso",
    light: { value: "#475157", unooria: '--unooria-color-neutral-700' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  textSoft70: {
    cssVar: '--uai-text-soft-70',
    group: "Texto suave",
    usage: "Corpo do diálogo e itens de rodapé da barra lateral",
    light: { value: "#3D4448", unooria: '--unooria-color-neutral-800' },
    dark: { value: "#CBD4D6", unooria: '--unooria-color-neutraldark-900' },
  },
  textSoft80: {
    cssVar: '--uai-text-soft-80',
    group: "Texto suave",
    usage: "Item de navegação em hover",
    light: { value: "#383E41", unooria: '--unooria-color-neutral-900' },
    dark: { value: "#CBD4D6", unooria: '--unooria-color-neutraldark-900' },
  },
  webCanvas: {
    cssVar: '--uai-web-canvas',
    group: "Cliente web",
    usage: "Fundo da área de conversa",
    light: { value: "#FFFFFF", unooria: '--unooria-color-neutral-50' },
    dark: { value: "#0E1039", unooria: '--unooria-color-brandpurple-900' },
  },
  webSuggestion: {
    cssVar: '--uai-web-suggestion',
    group: "Cliente web",
    usage: "Cartão de sugestão de prompt",
    light: { value: "#F7F6FA", unooria: '--unooria-color-brandpurple-50' },
    dark: { value: "rgba(255, 255, 255, 0.05)", unooria: '--unooria-color-opacity-neutrallight-50' },
  },
  webComposerFill: {
    cssVar: '--uai-web-composer-fill',
    group: "Cliente web",
    usage: "Preenchimento translúcido do compositor",
    light: { value: "rgba(255, 255, 255, 0.80)", unooria: '--unooria-color-opacity-neutrallight-800' },
    dark: { value: "rgba(255, 255, 255, 0.05)", unooria: '--unooria-color-opacity-neutrallight-50' },
  },
  webComposerBorder: {
    cssVar: '--uai-web-composer-border',
    group: "Cliente web",
    usage: "Contorno do compositor (gráfico ≥ 3:1)",
    light: { value: "#617379", unooria: '--unooria-color-neutral-500' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  webComposerPlaceholder: {
    cssVar: '--uai-web-composer-placeholder',
    group: "Cliente web",
    usage: "Espaço reservado do compositor",
    light: { value: "#536167", unooria: '--unooria-color-neutral-600' },
    dark: { value: "#A7B5B9", unooria: '--unooria-color-neutraldark-800' },
  },
  webVeil: {
    cssVar: '--uai-web-veil',
    group: "Cliente web",
    usage: "Véu com desfoque atrás da doca do compositor",
    light: { value: "rgba(255, 255, 255, 0.10)", unooria: '--unooria-color-opacity-neutrallight-100' },
    dark: { value: "rgba(14, 16, 57, 0.10)", unooria: '--unooria-color-opacity-brandpurple-100' },
  },
  webHairline: {
    cssVar: '--uai-web-hairline',
    group: "Cliente web",
    usage: "Fio que separa as seções da barra lateral",
    light: { value: "rgba(14, 16, 57, 0.20)", unooria: '--unooria-color-opacity-brandpurple-200' },
    dark: { value: "rgba(255, 255, 255, 0.20)", unooria: '--unooria-color-opacity-neutrallight-200' },
  },
  webAccent: {
    cssVar: '--uai-web-accent',
    group: "Cliente web",
    usage: "Botão de nova conversa",
    light: { value: "#0E1039", unooria: '--unooria-color-brandpurple-900' },
    dark: { value: "#AAA5C2", unooria: '--unooria-color-brandpurple-400' },
  },
  planTagFill: {
    cssVar: '--uai-color-plan-tag-fill',
    group: "Cliente web",
    usage: "Cápsula de plano",
    light: { value: "#716C98", unooria: '--unooria-color-brandpurple-600' },
    dark: { value: "#AAA5C2", unooria: '--unooria-color-brandpurple-400' },
  },
  planTagText: {
    cssVar: '--uai-color-plan-tag-text',
    group: "Cliente web",
    usage: "Rótulo da cápsula de plano",
    light: { value: "#FFFFFF", unooria: '--unooria-color-neutral-50' },
    dark: { value: "#080922", unooria: '--unooria-color-brandpurple-950' },
  },
  overlayScrim: {
    cssVar: '--uai-overlay-scrim',
    group: "Overlays",
    usage: "Véu atrás de diálogos",
    light: { value: "rgba(14, 16, 57, 0.50)", unooria: '--unooria-color-opacity-brandpurple-500' },
    dark: { value: "rgba(14, 16, 57, 0.50)", unooria: '--unooria-color-opacity-brandpurple-500' },
  },
} as const satisfies Record<string, UaiColorToken>;

/**
 * Chave semântica de um token de cor que varia com o tema.
 */
export type UaiColorKey = keyof typeof uaiColorTokens;

/**
 * Tokens invariantes entre temas.
 */
export const uaiInvariantColors = {

} as const satisfies Record<string, UaiInvariantColorToken>;

/**
 * Paleta de um tema como mapa chave → literal.
 */
export const uaiColorThemes: Record<UaiTheme, Record<UaiColorKey, string>> = {
  light: Object.fromEntries(
    Object.entries(uaiColorTokens).map(([key, token]) => [key, token.light.value])
  ) as Record<UaiColorKey, string>,
  dark: Object.fromEntries(
    Object.entries(uaiColorTokens).map(([key, token]) => [key, token.dark.value])
  ) as Record<UaiColorKey, string>,
};

/**
 * Nome da variável CSS de cada token que varia com o tema.
 */
export const uaiColorCssVars = Object.fromEntries(
  Object.entries(uaiColorTokens).map(([key, token]) => [key, token.cssVar])
) as Record<UaiColorKey, string>;

/* ------------------------------------------------------------------------
 * Conjunto semântico: superfícies, texto, bordas, ações e estados.
 * ------------------------------------------------------------------------ */

/**
 * Chaves do conjunto semântico consumido pelos componentes.
 */
export const uaiSemanticKeys = ["bgPrimary","bgSecondary","bgTertiary","bgInverse","bgInverseHover","bgBrand","textPrimary","textSecondary","textTertiary","textInverse","textBrand","textLink","borderDefault","borderStrong","borderControl","borderBrand","interactivePrimary","interactiveHover","interactiveSecondary","statusSuccess","statusError","statusErrorHover","statusWarning","statusInfo"] as const satisfies readonly UaiColorKey[];

/**
 * Chave de um token semântico.
 */
export type UaiSemanticKey = (typeof uaiSemanticKeys)[number];

/**
 * Conjunto semântico que muda entre claro e escuro.
 */
export type UaiSemanticColors = Record<UaiSemanticKey, string>;

const semantico = (tema: UaiTheme): UaiSemanticColors =>
  Object.fromEntries(uaiSemanticKeys.map((key) => [key, uaiColorThemes[tema][key]])) as UaiSemanticColors;

/**
 * Paleta semântica no tema claro.
 */
export const uaiLightColors: UaiSemanticColors = semantico('light');

/**
 * Paleta semântica no tema escuro.
 */
export const uaiDarkColors: UaiSemanticColors = semantico('dark');

/**
 * Índice das paletas semânticas por tema.
 */
export const uaiColorsByTheme: Record<UaiTheme, UaiSemanticColors> = {
  light: uaiLightColors,
  dark: uaiDarkColors,
};

/**
 * Variável CSS correspondente a cada token semântico.
 */
export const uaiSemanticCssVars = Object.fromEntries(
  uaiSemanticKeys.map((key) => [key, uaiColorTokens[key].cssVar])
) as Record<UaiSemanticKey, string>;

/**
 * Token da Unooria de origem de cada token semântico, por tema.
 */
export const uaiSemanticOrigins = Object.fromEntries(
  uaiSemanticKeys.map((key) => [
    key,
    { light: uaiColorTokens[key].light.unooria, dark: uaiColorTokens[key].dark.unooria },
  ])
) as Record<UaiSemanticKey, { light: string; dark: string }>;

/**
 * Véus de sobreposição — iguais nos dois temas.
 */
export const uaiOverlays = {
  scrim: uaiColorTokens.overlayScrim.light.value,
} as const;

/**
 * Escadas translúcidas usadas pelos componentes, com o valor de cada tema.
 *
 * As superfícies (`fill-*`) usam os tokens de opacidade da Unooria: tinta
 * `brandpurple` no claro e branco no escuro. Os textos (`text-soft-*`) são
 * degraus nomeados da escala neutra escolhidos por contraste medido.
 */
export const uaiTranslucentScale = [
  { cssVar: '--uai-fill-2', light: "rgba(14, 16, 57, 0.05)", dark: "rgba(255, 255, 255, 0.05)", unooria: ['--unooria-color-opacity-brandpurple-50', '--unooria-color-opacity-neutrallight-50'], usage: "Item em hover (NavItem, cartões)" },
  { cssVar: '--uai-fill-4', light: "rgba(14, 16, 57, 0.10)", dark: "rgba(255, 255, 255, 0.10)", unooria: ['--unooria-color-opacity-brandpurple-100', '--unooria-color-opacity-neutrallight-100'], usage: "Item ativo, selo padrão, etiqueta, campo de busca e balão do usuário" },
  { cssVar: '--uai-fill-8', light: "rgba(14, 16, 57, 0.20)", dark: "rgba(255, 255, 255, 0.20)", unooria: ['--unooria-color-opacity-brandpurple-200', '--unooria-color-opacity-neutrallight-200'], usage: "Hover de sugestão, do compositor e da linha lateral" },
  { cssVar: '--uai-fill-10', light: "rgba(14, 16, 57, 0.30)", dark: "rgba(255, 255, 255, 0.30)", unooria: ['--unooria-color-opacity-brandpurple-300', '--unooria-color-opacity-neutrallight-300'], usage: "Divisor, botão de ícone pressionado e etiqueta em hover" },
  { cssVar: '--uai-text-soft-30', light: "#7C8E94", dark: "#7C8E94", unooria: ['--unooria-color-neutral-400', '--unooria-color-neutraldark-700'], usage: "Texto de campo desabilitado (isento de contraste)" },
  { cssVar: '--uai-text-soft-40', light: "#536167", dark: "#A7B5B9", unooria: ['--unooria-color-neutral-600', '--unooria-color-neutraldark-800'], usage: "Espaço reservado, rótulo de seção e glifos de campo" },
  { cssVar: '--uai-text-soft-50', light: "#536167", dark: "#A7B5B9", unooria: ['--unooria-color-neutral-600', '--unooria-color-neutraldark-800'], usage: "Descrição de cartão, valor de configuração e fechar do diálogo" },
  { cssVar: '--uai-text-soft-60', light: "#475157", dark: "#A7B5B9", unooria: ['--unooria-color-neutral-700', '--unooria-color-neutraldark-800'], usage: "Item de navegação em repouso" },
  { cssVar: '--uai-text-soft-70', light: "#3D4448", dark: "#CBD4D6", unooria: ['--unooria-color-neutral-800', '--unooria-color-neutraldark-900'], usage: "Corpo do diálogo e itens de rodapé da barra lateral" },
  { cssVar: '--uai-text-soft-80', light: "#383E41", dark: "#CBD4D6", unooria: ['--unooria-color-neutral-900', '--unooria-color-neutraldark-900'], usage: "Item de navegação em hover" },
] as const;

/* ------------------------------------------------------------------------
 * Superfícies do cliente web.
 * ------------------------------------------------------------------------ */

/**
 * Superfícies do cliente web: área de conversa, compositor e barra lateral.
 */
export interface UaiWebClientColors {
  /** Fundo da área de conversa */
  canvas: string;
  /** Cartão de sugestão de prompt */
  suggestion: string;
  /** Preenchimento translúcido do compositor */
  composerFill: string;
  /** Contorno do compositor (gráfico ≥ 3:1) */
  composerBorder: string;
  /** Espaço reservado do compositor */
  composerPlaceholder: string;
  /** Véu com desfoque atrás da doca do compositor */
  veil: string;
  /** Fio que separa as seções da barra lateral */
  hairline: string;
  /** Botão de nova conversa */
  accent: string;
  /** Cápsula de plano */
  planTagFill: string;
  /** Rótulo da cápsula de plano */
  planTagText: string;
}

/** Superfícies do cliente web no tema claro. */
export const uaiWebClientLightColors: UaiWebClientColors = {
  canvas: uaiColorTokens.webCanvas.light.value,
  suggestion: uaiColorTokens.webSuggestion.light.value,
  composerFill: uaiColorTokens.webComposerFill.light.value,
  composerBorder: uaiColorTokens.webComposerBorder.light.value,
  composerPlaceholder: uaiColorTokens.webComposerPlaceholder.light.value,
  veil: uaiColorTokens.webVeil.light.value,
  hairline: uaiColorTokens.webHairline.light.value,
  accent: uaiColorTokens.webAccent.light.value,
  planTagFill: uaiColorTokens.planTagFill.light.value,
  planTagText: uaiColorTokens.planTagText.light.value,
};

/** Superfícies do cliente web no tema escuro. */
export const uaiWebClientDarkColors: UaiWebClientColors = {
  canvas: uaiColorTokens.webCanvas.dark.value,
  suggestion: uaiColorTokens.webSuggestion.dark.value,
  composerFill: uaiColorTokens.webComposerFill.dark.value,
  composerBorder: uaiColorTokens.webComposerBorder.dark.value,
  composerPlaceholder: uaiColorTokens.webComposerPlaceholder.dark.value,
  veil: uaiColorTokens.webVeil.dark.value,
  hairline: uaiColorTokens.webHairline.dark.value,
  accent: uaiColorTokens.webAccent.dark.value,
  planTagFill: uaiColorTokens.planTagFill.dark.value,
  planTagText: uaiColorTokens.planTagText.dark.value,
};

/** Índice das superfícies do cliente web por tema. */
export const uaiWebClientColorsByTheme: Record<UaiTheme, UaiWebClientColors> = {
  light: uaiWebClientLightColors,
  dark: uaiWebClientDarkColors,
};

/** Variável CSS correspondente a cada superfície do cliente web. */
export const uaiWebClientCssVars: Record<keyof UaiWebClientColors, string> = {
  canvas: '--uai-web-canvas',
  suggestion: '--uai-web-suggestion',
  composerFill: '--uai-web-composer-fill',
  composerBorder: '--uai-web-composer-border',
  composerPlaceholder: '--uai-web-composer-placeholder',
  veil: '--uai-web-veil',
  hairline: '--uai-web-hairline',
  accent: '--uai-web-accent',
  planTagFill: '--uai-color-plan-tag-fill',
  planTagText: '--uai-color-plan-tag-text',
};

/* ------------------------------------------------------------------------
 * Contraste medido.
 * ------------------------------------------------------------------------ */

/**
 * Par medido de contraste. `foreground` e `background` são chaves de
 * `uaiColorTokens` ou de `uaiInvariantColors`; `frente@fundo` indica um
 * preenchimento translúcido composto sobre a superfície.
 */
export interface UaiContrastPair {
  foreground: string;
  background: string;
  /** `text` exige 4,5:1; `graphic` (contorno, foco, controle) exige 3:1 */
  kind: 'text' | 'graphic';
  minimum: number;
  /** Razão medida no tema claro */
  light: number;
  /** Razão medida no tema escuro */
  dark: number;
  usage: string;
}

/**
 * Pares de uso real medidos nos dois temas (85 pares; razões WCAG 2.x,
 * preenchimentos translúcidos compostos sobre a superfície).
 *
 * Menor razão de texto: 4.62:1 no claro e 4.84:1 no escuro.
 * Menor razão gráfica: 4.02:1 no claro e 4.80:1 no escuro.
 * Nenhum par abaixo do mínimo. O texto de campo desabilitado (`text-soft-30`) é
 * isento pela WCAG 1.4.3 e por isso não aparece na tabela.
 */
export const uaiContrastPairs: readonly UaiContrastPair[] = [
  { foreground: 'textPrimary', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 15.09, dark: 16.72, usage: "Texto principal" },
  { foreground: 'textSecondary', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 8.13, dark: 12.09, usage: "Texto de apoio" },
  { foreground: 'textTertiary', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 6.42, dark: 8.64, usage: "Texto de menor ênfase" },
  { foreground: 'textBrand', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 7.07, dark: 11.27, usage: "Texto de marca" },
  { foreground: 'textLink', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 7.07, dark: 11.27, usage: "Link" },
  { foreground: 'textPrimary', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 14.02, dark: 17.96, usage: "Texto principal" },
  { foreground: 'textSecondary', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 7.56, dark: 12.99, usage: "Texto de apoio" },
  { foreground: 'textTertiary', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 5.96, dark: 9.28, usage: "Texto de menor ênfase" },
  { foreground: 'textBrand', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 6.57, dark: 12.1, usage: "Texto de marca" },
  { foreground: 'textLink', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 6.57, dark: 12.1, usage: "Link" },
  { foreground: 'textPrimary', background: 'bgTertiary', kind: 'text', minimum: 4.5, light: 13.09, dark: 10.43, usage: "Texto principal" },
  { foreground: 'textSecondary', background: 'bgTertiary', kind: 'text', minimum: 4.5, light: 7.05, dark: 7.54, usage: "Texto de apoio" },
  { foreground: 'textTertiary', background: 'bgTertiary', kind: 'text', minimum: 4.5, light: 5.57, dark: 5.39, usage: "Texto de menor ênfase" },
  { foreground: 'textBrand', background: 'bgTertiary', kind: 'text', minimum: 4.5, light: 6.14, dark: 7.03, usage: "Texto de marca" },
  { foreground: 'textLink', background: 'bgTertiary', kind: 'text', minimum: 4.5, light: 6.14, dark: 7.03, usage: "Link" },
  { foreground: 'textPrimary', background: 'webCanvas', kind: 'text', minimum: 4.5, light: 15.09, dark: 16.72, usage: "Texto principal" },
  { foreground: 'textSecondary', background: 'webCanvas', kind: 'text', minimum: 4.5, light: 8.13, dark: 12.09, usage: "Texto de apoio" },
  { foreground: 'textTertiary', background: 'webCanvas', kind: 'text', minimum: 4.5, light: 6.42, dark: 8.64, usage: "Texto de menor ênfase" },
  { foreground: 'textBrand', background: 'webCanvas', kind: 'text', minimum: 4.5, light: 7.07, dark: 11.27, usage: "Texto de marca" },
  { foreground: 'textLink', background: 'webCanvas', kind: 'text', minimum: 4.5, light: 7.07, dark: 11.27, usage: "Link" },
  { foreground: 'textPrimary', background: 'webSuggestion@webCanvas', kind: 'text', minimum: 4.5, light: 14.02, dark: 14.93, usage: "Texto no cartão de sugestão" },
  { foreground: 'textPrimary', background: 'webComposerFill@webCanvas', kind: 'text', minimum: 4.5, light: 15.09, dark: 14.93, usage: "Texto digitado no compositor" },
  { foreground: 'webComposerPlaceholder', background: 'webComposerFill@webCanvas', kind: 'text', minimum: 4.5, light: 6.42, dark: 7.71, usage: "Espaço reservado do compositor" },
  { foreground: 'textSoft40', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 6.42, dark: 8.64, usage: "Espaço reservado sobre a tela" },
  { foreground: 'textSoft40', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 5.96, dark: 9.28, usage: "Rótulo de seção na barra lateral" },
  { foreground: 'textSoft40', background: 'fill4@bgPrimary', kind: 'text', minimum: 4.5, light: 5.2, dark: 6.67, usage: "Espaço reservado do campo de busca" },
  { foreground: 'textSoft40', background: 'fill4@bgSecondary', kind: 'text', minimum: 4.5, light: 4.85, dark: 7.4, usage: "Espaço reservado do campo de busca sobre a barra" },
  { foreground: 'textSoft50', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 6.42, dark: 8.64, usage: "Descrição de cartão e valor de configuração" },
  { foreground: 'textSoft50', background: 'fill2@bgPrimary', kind: 'text', minimum: 4.5, light: 5.79, dark: 7.71, usage: "Descrição de cartão em hover" },
  { foreground: 'textSoft60', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 7.56, dark: 9.28, usage: "Navegação em repouso" },
  { foreground: 'textSoft60', background: 'fill2@bgSecondary', kind: 'text', minimum: 4.5, light: 6.83, dark: 8.45, usage: "Navegação sob hover" },
  { foreground: 'textSoft70', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 9.91, dark: 12.09, usage: "Corpo do diálogo" },
  { foreground: 'textSoft70', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 9.21, dark: 12.99, usage: "Rodapé da barra lateral" },
  { foreground: 'textSoft70', background: 'fill2@bgSecondary', kind: 'text', minimum: 4.5, light: 8.32, dark: 11.82, usage: "Rodapé da barra lateral em hover" },
  { foreground: 'textSoft80', background: 'fill2@bgSecondary', kind: 'text', minimum: 4.5, light: 9.12, dark: 11.82, usage: "Navegação em hover" },
  { foreground: 'textPrimary', background: 'fill2@bgPrimary', kind: 'text', minimum: 4.5, light: 13.62, dark: 14.93, usage: "Texto primário sobre fill2" },
  { foreground: 'textPrimary', background: 'fill2@bgSecondary', kind: 'text', minimum: 4.5, light: 12.67, dark: 16.35, usage: "Texto primário sobre fill2" },
  { foreground: 'textPrimary', background: 'fill4@bgPrimary', kind: 'text', minimum: 4.5, light: 12.24, dark: 12.91, usage: "Texto primário sobre fill4" },
  { foreground: 'textPrimary', background: 'fill4@bgSecondary', kind: 'text', minimum: 4.5, light: 11.4, dark: 14.32, usage: "Texto primário sobre fill4" },
  { foreground: 'textPrimary', background: 'fill8@bgPrimary', kind: 'text', minimum: 4.5, light: 9.76, dark: 9.15, usage: "Texto primário sobre fill8" },
  { foreground: 'textPrimary', background: 'fill8@bgSecondary', kind: 'text', minimum: 4.5, light: 9.11, dark: 10.16, usage: "Texto primário sobre fill8" },
  { foreground: 'textPrimary', background: 'fill10@bgPrimary', kind: 'text', minimum: 4.5, light: 7.62, dark: 6.34, usage: "Texto primário sobre fill10" },
  { foreground: 'textPrimary', background: 'fill10@bgSecondary', kind: 'text', minimum: 4.5, light: 7.13, dark: 6.94, usage: "Texto primário sobre fill10" },
  { foreground: 'textSecondary', background: 'fill4@bgPrimary', kind: 'text', minimum: 4.5, light: 6.6, dark: 9.34, usage: "Texto de apoio sobre o campo" },
  { foreground: 'textInverse', background: 'bgInverse', kind: 'text', minimum: 4.5, light: 18.23, dark: 18.2, usage: "Botão sólido, avatar e envio" },
  { foreground: 'textInverse', background: 'bgInverseHover', kind: 'text', minimum: 4.5, light: 11.37, dark: 14.62, usage: "Botão sólido em hover" },
  { foreground: 'textInverse', background: 'bgBrand', kind: 'text', minimum: 4.5, light: 4.88, dark: 8.27, usage: "Avatar do assistente" },
  { foreground: 'textInverse', background: 'interactivePrimary', kind: 'text', minimum: 4.5, light: 4.88, dark: 8.27, usage: "Botão primário" },
  { foreground: 'textInverse', background: 'interactiveHover', kind: 'text', minimum: 4.5, light: 7.07, dark: 12.1, usage: "Botão primário em hover" },
  { foreground: 'textInverse', background: 'statusError', kind: 'text', minimum: 4.5, light: 6.22, dark: 10.13, usage: "Botão destrutivo" },
  { foreground: 'textInverse', background: 'statusErrorHover', kind: 'text', minimum: 4.5, light: 8.1, dark: 13.28, usage: "Botão destrutivo em hover" },
  { foreground: 'textInverse', background: 'webAccent', kind: 'text', minimum: 4.5, light: 18.23, dark: 8.27, usage: "Botão de nova conversa" },
  { foreground: 'planTagText', background: 'planTagFill', kind: 'text', minimum: 4.5, light: 4.88, dark: 8.27, usage: "Cápsula de plano" },
  { foreground: 'planTagFill', background: 'bgPrimary', kind: 'graphic', minimum: 3, light: 4.88, dark: 7.7, usage: "Limite da cápsula de plano sobre a tela" },
  { foreground: 'planTagFill', background: 'bgSecondary', kind: 'graphic', minimum: 3, light: 4.54, dark: 8.27, usage: "Limite da cápsula de plano sobre a barra" },
  { foreground: 'statusSuccess', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 6.93, dark: 10.68, usage: "Texto de estado sobre a tela" },
  { foreground: 'statusSuccess', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 6.44, dark: 11.47, usage: "Texto de estado sobre a barra" },
  { foreground: 'statusError', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 6.22, dark: 9.43, usage: "Texto de estado sobre a tela" },
  { foreground: 'statusError', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 5.78, dark: 10.13, usage: "Texto de estado sobre a barra" },
  { foreground: 'statusWarning', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 5.96, dark: 8.71, usage: "Texto de estado sobre a tela" },
  { foreground: 'statusWarning', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 5.54, dark: 9.35, usage: "Texto de estado sobre a barra" },
  { foreground: 'statusInfo', background: 'bgPrimary', kind: 'text', minimum: 4.5, light: 5.72, dark: 7.51, usage: "Texto de estado sobre a tela" },
  { foreground: 'statusInfo', background: 'bgSecondary', kind: 'text', minimum: 4.5, light: 5.31, dark: 8.07, usage: "Texto de estado sobre a barra" },
  { foreground: 'textBrand', background: 'fillBrand@bgPrimary', kind: 'text', minimum: 4.5, light: 5.74, dark: 8.7, usage: "Selo primário" },
  { foreground: 'statusSuccess', background: 'fillSuccess@bgPrimary', kind: 'text', minimum: 4.5, light: 6.27, dark: 9.46, usage: "Selo de sucesso" },
  { foreground: 'statusError', background: 'fillError@bgPrimary', kind: 'text', minimum: 4.5, light: 5.29, dark: 9.01, usage: "Selo de erro" },
  { foreground: 'statusError', background: 'fillError@bgTertiary', kind: 'text', minimum: 4.5, light: 4.62, dark: 5.77, usage: "Selo de erro sobre bloco sutil" },
  { foreground: 'statusSuccess', background: 'fillSuccess@bgTertiary', kind: 'text', minimum: 4.5, light: 5.49, dark: 5.85, usage: "Selo de sucesso sobre bloco sutil" },
  { foreground: 'statusWarning', background: 'fillWarning@bgTertiary', kind: 'text', minimum: 4.5, light: 4.72, dark: 4.84, usage: "Selo de atenção sobre bloco sutil" },
  { foreground: 'statusWarning', background: 'fillWarning@bgPrimary', kind: 'text', minimum: 4.5, light: 5.39, dark: 7.84, usage: "Selo de atenção" },
  { foreground: 'statusInfo', background: 'fillInfo@bgPrimary', kind: 'text', minimum: 4.5, light: 5.06, dark: 6.72, usage: "Selo de informação" },
  { foreground: 'textPrimary', background: 'fill4@bgPrimary', kind: 'text', minimum: 4.5, light: 12.24, dark: 12.91, usage: "Selo padrão" },
  { foreground: 'borderControl', background: 'bgPrimary', kind: 'graphic', minimum: 3, light: 4.96, dark: 8.64, usage: "Contorno de campo" },
  { foreground: 'borderControl', background: 'bgSecondary', kind: 'graphic', minimum: 3, light: 4.61, dark: 9.28, usage: "Contorno de campo sobre a barra" },
  { foreground: 'borderControl', background: 'bgTertiary', kind: 'graphic', minimum: 3, light: 4.3, dark: 5.39, usage: "Contorno de controle sobre bloco sutil" },
  { foreground: 'webComposerBorder', background: 'webCanvas', kind: 'graphic', minimum: 3, light: 4.96, dark: 8.64, usage: "Contorno do compositor" },
  { foreground: 'borderBrand', background: 'bgPrimary', kind: 'graphic', minimum: 3, light: 4.88, dark: 7.7, usage: "Anel de foco e campo focado" },
  { foreground: 'borderBrand', background: 'bgSecondary', kind: 'graphic', minimum: 3, light: 4.54, dark: 8.27, usage: "Anel de foco sobre a barra" },
  { foreground: 'borderBrand', background: 'bgTertiary', kind: 'graphic', minimum: 3, light: 4.24, dark: 4.8, usage: "Anel de foco sobre bloco sutil" },
  { foreground: 'borderBrand', background: 'webCanvas', kind: 'graphic', minimum: 3, light: 4.88, dark: 7.7, usage: "Anel de foco sobre a área de conversa" },
  { foreground: 'statusError', background: 'bgPrimary', kind: 'graphic', minimum: 3, light: 6.22, dark: 9.43, usage: "Contorno do campo com erro" },
  { foreground: 'interactivePrimary', background: 'bgPrimary', kind: 'graphic', minimum: 3, light: 4.88, dark: 7.7, usage: "Controle ligado sobre a tela" },
  { foreground: 'textInverse', background: 'interactivePrimary', kind: 'graphic', minimum: 3, light: 4.88, dark: 8.27, usage: "Botão deslizante sobre o trilho ligado" },
  { foreground: 'textInverse', background: 'borderControl', kind: 'graphic', minimum: 3, light: 4.96, dark: 9.28, usage: "Botão deslizante sobre o trilho desligado" },
  { foreground: 'borderControl', background: 'fill4@bgPrimary', kind: 'graphic', minimum: 3, light: 4.02, dark: 6.67, usage: "Contorno de campo sobre preenchimento" },
];
