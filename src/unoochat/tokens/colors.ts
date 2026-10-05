'use client';

/**
 * Tokens de Cores do Design System Unoochat.
 *
 * Espelho TypeScript de `colors.css`. Cada token traz o valor nos dois temas e
 * o nome do token da Plataforma Unooria de que o literal foi copiado.
 */

/**
 * Temas suportados pelo módulo.
 */
export type UncTheme = 'light' | 'dark';

/**
 * Valor de um token em um tema, com rastreabilidade até a Plataforma Unooria.
 */
export interface UncColorValue {
  /** Literal hexadecimal */
  value: string;
  /** Token de origem em `src/unooria/tokens/colors.css` */
  unooria: string;
}

/**
 * Descrição de um token de cor.
 */
export interface UncColorToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor no tema claro */
  light: UncColorValue;
  /** Valor no tema escuro */
  dark: UncColorValue;
  /** Uso do token no produto */
  usage: string;
}

/**
 * Superfícies do produto.
 */
export const uncSurfaceColors: Record<string, UncColorToken> = {
  base: {
    cssVar: '--unc-color-surface-base',
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
    usage: 'Fundo do documento, atrás das telas',
  },
  canvas: {
    cssVar: '--unc-color-surface-canvas',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    usage: 'Fundo das telas de listagem (Conversas, Status, Chamadas, Ajustes)',
  },
  appbar: {
    cssVar: '--unc-color-surface-appbar',
    light: { value: '#F7F6FA', unooria: '--unooria-color-brandpurple-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Barra superior, sub app bar e faixa de abas',
  },
  elevated: {
    cssVar: '--unc-color-surface-elevated',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    usage: 'Menu suspenso e FAB secundário',
  },
  dialog: {
    cssVar: '--unc-color-surface-dialog',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Caixa de diálogo modal',
  },
  sheet: {
    cssVar: '--unc-color-surface-sheet',
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Folha de anexos, campo do compositor e chips de filtro',
  },
  datechip: {
    cssVar: '--unc-color-surface-datechip',
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Etiqueta de data na conversa',
  },
  notice: {
    cssVar: '--unc-color-surface-notice',
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Aviso de criptografia ponta a ponta',
  },
  bubbleOut: {
    cssVar: '--unc-color-surface-bubble-out',
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    usage: 'Balão de mensagem enviada',
  },
  bubbleOutStrip: {
    cssVar: '--unc-color-surface-bubble-out-strip',
    light: { value: '#CCC9DE', unooria: '--unooria-color-brandpurple-300' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Faixa de documento dentro do balão enviado',
  },
  bubbleIn: {
    cssVar: '--unc-color-surface-bubble-in',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Balão de mensagem recebida',
  },
};

/**
 * Acento da marca — um único token, no lugar dos onze tons de origem.
 */
export const uncAccentColors: Record<string, UncColorToken> = {
  accent: {
    cssVar: '--unc-color-accent',
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
    usage: 'Aba ativa, FABs, selo de não lidas, ações de texto do diálogo, sublinhado do campo e controle selecionado',
  },
  accentCallOut: {
    cssVar: '--unc-color-accent-call-out',
    light: { value: '#00A369', unooria: '--unooria-color-success-600' },
    dark: { value: '#26E197', unooria: '--unooria-color-success-400' },
    usage: 'Seta de chamada efetuada',
  },
};

/**
 * Nome do remetente em conversa de grupo: oito tons, um por família da paleta
 * da Unooria, escolhidos para ficarem distintos entre si e acima de 4,5:1 sobre
 * `--unc-color-surface-bubble-in` em cada tema. Usados pela prop `senderTone`
 * do `MessageBubble` e do `TypingIndicator`.
 */
export const uncSenderColors: Record<string, UncColorToken> = {
  tone1: {
    cssVar: '--unc-color-sender-1',
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#AAA5C2', unooria: '--unooria-color-brandpurple-400' },
    usage: 'Remetente em conversa de grupo, tom 1 (roxo)',
  },
  tone2: {
    cssVar: '--unc-color-sender-2',
    light: { value: '#2F4F7F', unooria: '--unooria-color-brandnavy-900' },
    dark: { value: '#7FA5E2', unooria: '--unooria-color-brandnavy-600' },
    usage: 'Remetente em conversa de grupo, tom 2 (azul-marinho)',
  },
  tone3: {
    cssVar: '--unc-color-sender-3',
    light: { value: '#7A2614', unooria: '--unooria-color-brandorange-900' },
    dark: { value: '#FDD1AB', unooria: '--unooria-color-brandorange-200' },
    usage: 'Remetente em conversa de grupo, tom 3 (laranja)',
  },
  tone4: {
    cssVar: '--unc-color-sender-4',
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FFA1A1', unooria: '--unooria-color-danger-300' },
    usage: 'Remetente em conversa de grupo, tom 4 (vermelho)',
  },
  tone5: {
    cssVar: '--unc-color-sender-5',
    light: { value: '#006BFF', unooria: '--unooria-color-info-600' },
    dark: { value: '#26D4FF', unooria: '--unooria-color-info-300' },
    usage: 'Remetente em conversa de grupo, tom 5 (azul)',
  },
  tone6: {
    cssVar: '--unc-color-sender-6',
    light: { value: '#008257', unooria: '--unooria-color-success-700' },
    dark: { value: '#26E197', unooria: '--unooria-color-success-400' },
    usage: 'Remetente em conversa de grupo, tom 6 (verde)',
  },
  tone7: {
    cssVar: '--unc-color-sender-7',
    light: { value: '#B73506', unooria: '--unooria-color-warning-700' },
    dark: { value: '#FF9C20', unooria: '--unooria-color-warning-400' },
    usage: 'Remetente em conversa de grupo, tom 7 (âmbar)',
  },
  tone8: {
    cssVar: '--unc-color-sender-8',
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutral-300' },
    usage: 'Remetente em conversa de grupo, tom 8 (cinza)',
  },
};

/**
 * Severidades, chamada e bateria.
 */
export const uncStatusColors: Record<string, UncColorToken> = {
  dangerCallIn: {
    cssVar: '--unc-color-danger-call-in',
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#FF6A6A', unooria: '--unooria-color-danger-400' },
    usage: 'Seta de chamada recebida ou perdida',
  },
  dangerEndcall: {
    cssVar: '--unc-color-danger-endcall',
    light: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    dark: { value: '#E31A1A', unooria: '--unooria-color-danger-600' },
    usage: 'Botão de encerrar chamada',
  },
  warningBattery: {
    cssVar: '--unc-color-warning-battery',
    light: { value: '#F97607', unooria: '--unooria-color-warning-500' },
    dark: { value: '#F97607', unooria: '--unooria-color-warning-500' },
    usage: 'Bateria na barra de status',
  },
  callStatusbar: {
    cssVar: '--unc-color-call-statusbar',
    light: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    dark: { value: '#0E1039', unooria: '--unooria-color-brandpurple-900' },
    usage: 'Barra de status da tela de chamada',
  },
  callSurface: {
    cssVar: '--unc-color-call-surface',
    light: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Fundo da tela de chamada',
  },
  callTextEncrypted: {
    cssVar: '--unc-color-call-text-encrypted',
    light: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    usage: 'Aviso de criptografia na chamada',
  },
  callIcon: {
    cssVar: '--unc-color-call-icon',
    light: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    dark: { value: '#EFEEF5', unooria: '--unooria-color-brandpurple-100' },
    usage: 'Ícones dos controles da chamada',
  },
  callIconMuted: {
    cssVar: '--unc-color-call-icon-muted',
    light: { value: '#8B85AC', unooria: '--unooria-color-brandpurple-500' },
    dark: { value: '#8B85AC', unooria: '--unooria-color-brandpurple-500' },
    usage: 'Ícones dos controles da chamada, silenciados',
  },
};

/**
 * Texto.
 */
export const uncTextColors: Record<string, UncColorToken> = {
  primary: {
    cssVar: '--unc-color-text-primary',
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
    usage: 'Nomes, títulos, opções de diálogo e itens de menu',
  },
  secondary: {
    cssVar: '--unc-color-text-secondary',
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
    usage: 'Horários, metadados, descrições, abas inativas e rodapés',
  },
  placeholder: {
    cssVar: '--unc-color-text-placeholder',
    light: { value: '#536167', unooria: '--unooria-color-neutral-600' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
    usage: 'Placeholder do compositor e dos campos',
  },
  notice: {
    cssVar: '--unc-color-text-notice',
    light: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    usage: 'Texto do aviso de criptografia',
  },
  bubble: {
    cssVar: '--unc-color-text-bubble',
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
    usage: 'Texto dentro do balão de mensagem',
  },
  bubbleMeta: {
    cssVar: '--unc-color-text-bubble-meta',
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    usage: 'Metadados dentro do balão (tamanho, hora)',
  },
  onAccent: {
    cssVar: '--unc-color-text-on-accent',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
    usage: 'Numeral sobre o selo de acento',
  },
  inverse: {
    cssVar: '--unc-color-text-inverse',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    usage: 'Texto sobre a tela de chamada (invariante entre temas)',
  },
};

/**
 * Ícones e barra de status.
 */
export const uncIconColors: Record<string, UncColorToken> = {
  appbar: {
    cssVar: '--unc-color-icon-appbar',
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
    usage: 'Busca, menu e glifos principais da barra superior',
  },
  muted: {
    cssVar: '--unc-color-icon-muted',
    light: { value: '#475157', unooria: '--unooria-color-neutral-700' },
    dark: { value: '#CBD4D6', unooria: '--unooria-color-neutraldark-900' },
    usage: 'Câmera da barra de abas, voltar, glifos do compositor e das configurações, fixada',
  },
  onAccent: {
    cssVar: '--unc-color-icon-on-accent',
    light: { value: '#FFFFFF', unooria: '--unooria-color-neutral-50' },
    dark: { value: '#080922', unooria: '--unooria-color-brandpurple-950' },
    usage: 'Glifos sobre FAB e selos de acento',
  },
  tick: {
    cssVar: '--unc-color-icon-tick',
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    usage: 'Confirmação de leitura no balão',
  },
  star: {
    cssVar: '--unc-color-icon-star',
    light: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    dark: { value: '#DFDDEB', unooria: '--unooria-color-brandpurple-200' },
    usage: 'Estrela de mensagem favoritada',
  },
  statusbarFg: {
    cssVar: '--unc-color-statusbar-fg',
    light: { value: '#22272A', unooria: '--unooria-color-neutral-950' },
    dark: { value: '#F5F5F5', unooria: '--unooria-color-neutraldark-950' },
    usage: 'Relógio e glifos da barra de status',
  },
};

/**
 * Bordas, divisores e anéis.
 */
export const uncBorderColors: Record<string, UncColorToken> = {
  divider: {
    cssVar: '--unc-color-border-divider',
    light: { value: '#E4E8E9', unooria: '--unooria-color-neutral-150' },
    dark: { value: '#34375C', unooria: '--unooria-color-brandpurple-800' },
    usage: 'Divisor entre linhas de lista',
  },
  dialog: {
    cssVar: '--unc-color-border-dialog',
    light: { value: '#E4E8E9', unooria: '--unooria-color-neutral-150' },
    dark: { value: '#57547D', unooria: '--unooria-color-brandpurple-700' },
    usage: 'Contorno e divisor interno do diálogo',
  },
  control: {
    cssVar: '--unc-color-border-control',
    light: { value: '#617379', unooria: '--unooria-color-neutral-500' },
    dark: { value: '#A7B5B9', unooria: '--unooria-color-neutraldark-800' },
    usage: 'Contorno de caixa de seleção e de rádio',
  },
  statusRing: {
    cssVar: '--unc-color-border-status-ring',
    light: { value: '#A7B5B9', unooria: '--unooria-color-neutral-300' },
    dark: { value: '#7C8E94', unooria: '--unooria-color-neutraldark-700' },
    usage: 'Anel do avatar de status já visto',
  },
};

/**
 * Ações da folha de anexos (invariantes entre temas).
 */
export const uncAttachmentColors: Record<string, UncColorToken> = {
  document: {
    cssVar: '--unc-color-attach-document',
    light: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    dark: { value: '#716C98', unooria: '--unooria-color-brandpurple-600' },
    usage: 'Ação de documento da folha de anexos',
  },
  camera: {
    cssVar: '--unc-color-attach-camera',
    light: { value: '#F83B3B', unooria: '--unooria-color-danger-500' },
    dark: { value: '#F83B3B', unooria: '--unooria-color-danger-500' },
    usage: 'Ação de câmera da folha de anexos',
  },
  gallery: {
    cssVar: '--unc-color-attach-gallery',
    light: { value: '#6487C2', unooria: '--unooria-color-brandnavy-700' },
    dark: { value: '#6487C2', unooria: '--unooria-color-brandnavy-700' },
    usage: 'Ação de galeria da folha de anexos',
  },
  audio: {
    cssVar: '--unc-color-attach-audio',
    light: { value: '#DD5202', unooria: '--unooria-color-warning-600' },
    dark: { value: '#DD5202', unooria: '--unooria-color-warning-600' },
    usage: 'Ação de áudio da folha de anexos',
  },
  location: {
    cssVar: '--unc-color-attach-location',
    light: { value: '#00A369', unooria: '--unooria-color-success-600' },
    dark: { value: '#00A369', unooria: '--unooria-color-success-600' },
    usage: 'Ação de localização da folha de anexos',
  },
  contact: {
    cssVar: '--unc-color-attach-contact',
    light: { value: '#0086FF', unooria: '--unooria-color-info-500' },
    dark: { value: '#0086FF', unooria: '--unooria-color-info-500' },
    usage: 'Ação de contato da folha de anexos',
  },
};

/**
 * Objeto consolidado com todos os grupos de cor do Unoochat.
 */
export const uncColorTokens = {
  surface: uncSurfaceColors,
  accent: uncAccentColors,
  sender: uncSenderColors,
  status: uncStatusColors,
  text: uncTextColors,
  icon: uncIconColors,
  border: uncBorderColors,
  attachment: uncAttachmentColors,
};

export default uncColorTokens;
