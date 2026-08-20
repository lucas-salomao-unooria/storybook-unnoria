/**
 * Tokens de Tipografia do Design System WhatsApp Mobile.
 *
 * Espelho TypeScript de `typography.css`. A escala reproduz exatamente os
 * estilos de texto do arquivo Figma "WhatsApp Clone - Dark mode (Community)".
 */

/**
 * Famílias tipográficas usadas pelo arquivo de design.
 */
export const waFontFamilies = {
  sans: "'PT Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  statusBar:
    "'SF Compact Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  brand: "'Poppins', 'PT Sans', sans-serif",
} as const;

/**
 * Descrição completa de um estilo tipográfico.
 */
export interface WaTypographyToken {
  /** Identificador do estilo */
  name: string;
  /** Prefixo das variáveis CSS correspondentes */
  cssVarPrefix: string;
  /** Família aplicada */
  family: keyof typeof waFontFamilies;
  /** Tamanho em pixels */
  size: string;
  /** Peso da fonte */
  weight: number;
  /** Altura de linha */
  line: string;
  /** Uso do estilo no produto */
  usage: string;
  /** Node do Figma de referência */
  figmaNode?: string;
}

/**
 * Escala tipográfica oficial, em ordem decrescente de tamanho.
 */
export const waTypographyScale: WaTypographyToken[] = [
  {
    name: 'Display/Call',
    cssVarPrefix: '--wa-font-display',
    family: 'sans',
    size: '30px',
    weight: 400,
    line: 'normal',
    usage: 'Nome do contato na tela de chamada',
    figmaNode: '1:4619',
  },
  {
    name: 'Title/Large',
    cssVarPrefix: '--wa-font-title-lg',
    family: 'sans',
    size: '21px',
    weight: 400,
    line: 'normal',
    usage: 'Nome de contato em listas e cabeçalho de conversa',
    figmaNode: '1:2070',
  },
  {
    name: 'Title/Medium',
    cssVarPrefix: '--wa-font-title-md',
    family: 'sans',
    size: '20px',
    weight: 700,
    line: 'normal',
    usage: 'Marca "WhatsApp" e títulos de sub app bar',
    figmaNode: '1:2137',
  },
  {
    name: 'Placeholder',
    cssVarPrefix: '--wa-font-placeholder',
    family: 'sans',
    size: '20px',
    weight: 400,
    line: 'normal',
    usage: 'Texto de espaço reservado do compositor',
    figmaNode: '1:3028',
  },
  {
    name: 'Subtitle/Call',
    cssVarPrefix: '--wa-font-subtitle',
    family: 'sans',
    size: '19px',
    weight: 400,
    line: 'normal',
    usage: 'Estado da chamada ("Calling")',
    figmaNode: '1:4620',
  },
  {
    name: 'Title/Small',
    cssVarPrefix: '--wa-font-title-sm',
    family: 'sans',
    size: '18.54px',
    weight: 700,
    line: 'normal',
    usage: 'Status já visualizado e "My status"',
    figmaNode: '1:91',
  },
  {
    name: 'Body/Large',
    cssVarPrefix: '--wa-font-body-lg',
    family: 'sans',
    size: '17px',
    weight: 400,
    line: 'normal',
    usage: 'Título de linha de configuração',
    figmaNode: '1:2726',
  },
  {
    name: 'Statusbar/Clock',
    cssVarPrefix: '--wa-font-statusbar-clock',
    family: 'statusBar',
    size: '16.544px',
    weight: 600,
    line: 'normal',
    usage: 'Relógio da barra de status do Android',
    figmaNode: '1:2157',
  },
  {
    name: 'Body/Medium',
    cssVarPrefix: '--wa-font-body-md',
    family: 'sans',
    size: '16px',
    weight: 400,
    line: 'normal',
    usage: 'Abas, texto de balão e nomes compactos',
    figmaNode: '1:2939',
  },
  {
    name: 'Section',
    cssVarPrefix: '--wa-font-section',
    family: 'sans',
    size: '15.54px',
    weight: 700,
    line: 'normal',
    usage: 'Rótulos "Recent updates" e "Viewed updates"',
    figmaNode: '1:13',
  },
  {
    name: 'Body/Small',
    cssVarPrefix: '--wa-font-body-sm',
    family: 'sans',
    size: '15px',
    weight: 400,
    line: 'normal',
    usage: 'Opções de diálogo e descrições de configuração',
    figmaNode: '1:3507',
  },
  {
    name: 'Label/Medium',
    cssVarPrefix: '--wa-font-label-md',
    family: 'sans',
    size: '14.54px',
    weight: 400,
    line: 'normal',
    usage: 'Metadados de status e de chamadas',
    figmaNode: '1:72',
  },
  {
    name: 'Statusbar/Network',
    cssVarPrefix: '--wa-font-statusbar-network',
    family: 'statusBar',
    size: '14.238px',
    weight: 600,
    line: 'normal',
    usage: 'Indicador de rede "4G"',
    figmaNode: '1:2147',
  },
  {
    name: 'Label/Small',
    cssVarPrefix: '--wa-font-label-sm',
    family: 'sans',
    size: '14px',
    weight: 400,
    line: 'normal',
    usage: 'Etiqueta de data e aviso de criptografia',
    figmaNode: '1:3012',
  },
  {
    name: 'Statusbar/Battery',
    cssVarPrefix: '--wa-font-statusbar-battery',
    family: 'sans',
    size: '13.54px',
    weight: 700,
    line: 'normal',
    usage: 'Percentual de bateria',
    figmaNode: '1:2158',
  },
  {
    name: 'Caption',
    cssVarPrefix: '--wa-font-caption',
    family: 'sans',
    size: '13px',
    weight: 400,
    line: 'normal',
    usage: 'Metadados dentro do balão de mensagem',
    figmaNode: '1:2940',
  },
  {
    name: 'Caption/Bold',
    cssVarPrefix: '--wa-font-caption-bold',
    family: 'sans',
    size: '12px',
    weight: 700,
    line: 'normal',
    usage: 'Horário nas linhas de conversa',
    figmaNode: '1:2106',
  },
  {
    name: 'Badge',
    cssVarPrefix: '--wa-font-badge',
    family: 'sans',
    size: '11px',
    weight: 700,
    line: 'normal',
    usage: 'Numeral dentro do selo de não lidas',
    figmaNode: '1:2126',
  },
];

/**
 * Objeto consolidado dos tokens tipográficos.
 */
export const waTypographyTokens = {
  families: waFontFamilies,
  scale: waTypographyScale,
};

export default waTypographyTokens;
