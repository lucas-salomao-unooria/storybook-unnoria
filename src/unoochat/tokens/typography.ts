/**
 * Tokens de Tipografia do Design System Unoochat.
 *
 * Espelho TypeScript de `typography.css`. Família e escala vêm da Plataforma
 * Unooria: Open Sans, nos degraus 10, 12, 14, 16, 18, 20 e 24px.
 */

/**
 * Famílias tipográficas do módulo.
 */
export const uncFontFamilies = {
  sans: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  statusBar: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

/**
 * Descrição completa de um estilo tipográfico.
 */
export interface UncTypographyToken {
  /** Identificador do estilo */
  name: string;
  /** Prefixo das variáveis CSS correspondentes */
  cssVarPrefix: string;
  /** Família aplicada */
  family: keyof typeof uncFontFamilies;
  /** Tamanho em pixels */
  size: string;
  /** Peso da fonte */
  weight: number;
  /** Altura de linha */
  line: string;
  /** Uso do estilo no produto */
  usage: string;
  /** Token de tamanho da Plataforma Unooria de que o degrau vem */
  unooria: string;
}

/**
 * Escala tipográfica oficial, em ordem decrescente de tamanho.
 */
export const uncTypographyScale: UncTypographyToken[] = [
  {
    name: 'Display/Call',
    cssVarPrefix: '--unc-font-display',
    family: 'sans',
    size: '24px',
    weight: 400,
    line: '34px',
    usage: 'Nome do contato na tela de chamada',
    unooria: '--unooria-size-title-xl',
  },
  {
    name: 'Title/Large',
    cssVarPrefix: '--unc-font-title-lg',
    family: 'sans',
    size: '20px',
    weight: 400,
    line: '30px',
    usage: 'Nome de contato em listas e cabeçalho de conversa',
    unooria: '--unooria-size-title-l',
  },
  {
    name: 'Title/Medium',
    cssVarPrefix: '--unc-font-title-md',
    family: 'sans',
    size: '20px',
    weight: 600,
    line: '30px',
    usage: 'Título da marca e títulos de sub app bar',
    unooria: '--unooria-size-title-l',
  },
  {
    name: 'Subtitle/Call',
    cssVarPrefix: '--unc-font-subtitle',
    family: 'sans',
    size: '18px',
    weight: 400,
    line: '28px',
    usage: 'Estado da chamada ("Chamando")',
    unooria: '--unooria-size-body-m',
  },
  {
    name: 'Title/Small',
    cssVarPrefix: '--unc-font-title-sm',
    family: 'sans',
    size: '18px',
    weight: 600,
    line: '28px',
    usage: 'Status já visualizado e "Meu status"',
    unooria: '--unooria-size-body-m',
  },
  {
    name: 'Placeholder',
    cssVarPrefix: '--unc-font-placeholder',
    family: 'sans',
    size: '16px',
    weight: 400,
    line: '24px',
    usage: 'Texto de espaço reservado do compositor',
    unooria: '--unooria-size-body-s',
  },
  {
    name: 'Body/Large',
    cssVarPrefix: '--unc-font-body-lg',
    family: 'sans',
    size: '16px',
    weight: 400,
    line: '24px',
    usage: 'Título de linha de configuração',
    unooria: '--unooria-size-body-s',
  },
  {
    name: 'Body/Medium',
    cssVarPrefix: '--unc-font-body-md',
    family: 'sans',
    size: '16px',
    weight: 400,
    line: '24px',
    usage: 'Abas, texto de balão e nomes compactos',
    unooria: '--unooria-size-body-s',
  },
  {
    name: 'Section',
    cssVarPrefix: '--unc-font-section',
    family: 'sans',
    size: '14px',
    weight: 600,
    line: '20px',
    usage: 'Rótulos de seção ("Atualizações recentes")',
    unooria: '--unooria-size-body-xs',
  },
  {
    name: 'Body/Small',
    cssVarPrefix: '--unc-font-body-sm',
    family: 'sans',
    size: '14px',
    weight: 400,
    line: '20px',
    usage: 'Opções de diálogo e descrições curtas',
    unooria: '--unooria-size-body-xs',
  },
  {
    name: 'Label/Medium',
    cssVarPrefix: '--unc-font-label-md',
    family: 'sans',
    size: '14px',
    weight: 400,
    line: '20px',
    usage: 'Metadados de status e chamadas',
    unooria: '--unooria-size-body-xs',
  },
  {
    name: 'Label/Small',
    cssVarPrefix: '--unc-font-label-sm',
    family: 'sans',
    size: '12px',
    weight: 400,
    line: '18px',
    usage: 'Etiqueta de data e aviso de criptografia',
    unooria: '--unooria-size-body-xxs',
  },
  {
    name: 'Caption',
    cssVarPrefix: '--unc-font-caption',
    family: 'sans',
    size: '12px',
    weight: 400,
    line: '18px',
    usage: 'Metadados dentro do balão',
    unooria: '--unooria-size-body-xxs',
  },
  {
    name: 'Caption/Bold',
    cssVarPrefix: '--unc-font-caption-bold',
    family: 'sans',
    size: '12px',
    weight: 600,
    line: '18px',
    usage: 'Horário nas linhas de conversa',
    unooria: '--unooria-size-body-xxs',
  },
  {
    name: 'Badge',
    cssVarPrefix: '--unc-font-badge',
    family: 'sans',
    size: '10px',
    weight: 700,
    line: '14px',
    usage: 'Numeral dentro do selo de não lidas',
    unooria: '--unooria-size-caption-xxxs',
  },
  {
    name: 'Statusbar/Clock',
    cssVarPrefix: '--unc-font-statusbar-clock',
    family: 'statusBar',
    size: '14px',
    weight: 600,
    line: '20px',
    usage: 'Relógio da barra de status',
    unooria: '--unooria-size-body-xs',
  },
  {
    name: 'Statusbar/Network',
    cssVarPrefix: '--unc-font-statusbar-network',
    family: 'statusBar',
    size: '12px',
    weight: 600,
    line: '18px',
    usage: 'Rede da barra de status',
    unooria: '--unooria-size-body-xxs',
  },
  {
    name: 'Statusbar/Battery',
    cssVarPrefix: '--unc-font-statusbar-battery',
    family: 'statusBar',
    size: '12px',
    weight: 600,
    line: '18px',
    usage: 'Percentual de bateria da barra de status',
    unooria: '--unooria-size-body-xxs',
  },
];

/**
 * Objeto consolidado da tipografia do Unoochat.
 */
export const uncTypographyTokens = {
  families: uncFontFamilies,
  scale: uncTypographyScale,
};

export default uncTypographyTokens;
