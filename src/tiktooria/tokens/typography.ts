/**
 * Tokens de Tipografia do Design System Tik Tooria.
 *
 * Espelho TypeScript de `typography.css`. A escala reproduz exatamente os 31
 * degraus de texto lidos via Plugin API do arquivo Figma "TikTok UI Screens
 * (Community) - cópia". Nenhum degrau foi consolidado, arredondado ou
 * inventado: o arquivo não declara `line-height` (todos são `normal`, exceto a
 * legenda do vídeo, que fixa 19,5px) e o tracking aparece somente nos degraus
 * abaixo assinalados.
 */

/**
 * Famílias tipográficas usadas pelo arquivo de design.
 */
export const tikFontFamilies = {
  /** Família de todo o produto */
  sans:
    "'Proxima Nova', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  /** Família dos elementos de sistema do iPhone X */
  system:
    "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
} as const;

/**
 * Descrição completa de um degrau tipográfico.
 */
export interface TikTypographyToken {
  /** Identificador do degrau */
  name: string;
  /** Prefixo das variáveis CSS correspondentes */
  cssVarPrefix: string;
  /** Família aplicada */
  family: keyof typeof tikFontFamilies;
  /** Tamanho em pixels */
  size: string;
  /** Peso da fonte */
  weight: number;
  /** Altura de linha */
  line: string;
  /** Tracking; `0` quando o arquivo não declara */
  tracking: string;
  /** Uso do degrau no produto */
  usage: string;
  /** Node do Figma de referência */
  figmaNode: string;
}

/**
 * Escala tipográfica oficial, em ordem decrescente de tamanho.
 */
export const tikTypographyScale: TikTypographyToken[] = [
  { name: 'Display', cssVarPrefix: '--tik-font-display', family: 'sans', size: '24px', weight: 700, line: 'normal', tracking: '0', usage: 'Título de álbum de fotos ("My 2020")', figmaNode: '4:635' },
  { name: 'Title LG', cssVarPrefix: '--tik-font-title-lg', family: 'sans', size: '20px', weight: 600, line: 'normal', tracking: '0', usage: 'Título da página de som', figmaNode: '4:810' },
  { name: 'Feed Tab Active', cssVarPrefix: '--tik-font-feedtab-active', family: 'sans', size: '18px', weight: 600, line: 'normal', tracking: '0.1px', usage: 'Aba ativa do cabeçalho do feed ("For You")', figmaNode: '4:1118' },
  { name: 'Heading', cssVarPrefix: '--tik-font-heading', family: 'sans', size: '17px', weight: 700, line: 'normal', tracking: '0', usage: 'Título da barra superior e valor de métrica do perfil', figmaNode: '4:224' },
  { name: 'Handle', cssVarPrefix: '--tik-font-handle', family: 'sans', size: '17px', weight: 600, line: 'normal', tracking: '0', usage: '@usuário e título de estado vazio', figmaNode: '4:482' },
  { name: 'Feed Tab Inactive', cssVarPrefix: '--tik-font-feedtab-inactive', family: 'sans', size: '16px', weight: 600, line: 'normal', tracking: '0', usage: 'Aba inativa do cabeçalho do feed ("Following")', figmaNode: '4:1117' },
  { name: 'Callout', cssVarPrefix: '--tik-font-callout', family: 'sans', size: '16px', weight: 700, line: 'normal', tracking: '0.5px', usage: 'Primeira linha da chamada "Tap to create"', figmaNode: '4:469' },
  { name: 'Pill', cssVarPrefix: '--tik-font-pill', family: 'sans', size: '16px', weight: 600, line: 'normal', tracking: '-0.25px', usage: 'Rótulo do botão flutuante "Use this sound"', figmaNode: '4:805' },
  { name: 'Body', cssVarPrefix: '--tik-font-body', family: 'sans', size: '15px', weight: 400, line: 'normal', tracking: '0', usage: 'Rótulo de linha, valor e campo de busca', figmaNode: '4:200' },
  { name: 'Body Strong', cssVarPrefix: '--tik-font-body-strong', family: 'sans', size: '15px', weight: 600, line: 'normal', tracking: '0', usage: 'Rótulo de botão contornado', figmaNode: '4:494' },
  { name: 'Body Bold', cssVarPrefix: '--tik-font-body-bold', family: 'sans', size: '15px', weight: 700, line: 'normal', tracking: '0', usage: 'Tira de modo da câmera e botão primário', figmaNode: '4:625' },
  { name: 'Body Wide', cssVarPrefix: '--tik-font-body-wide', family: 'sans', size: '15px', weight: 400, line: 'normal', tracking: '0.5px', usage: 'Segunda linha da chamada "a new video"', figmaNode: '4:470' },
  { name: 'Caption', cssVarPrefix: '--tik-font-caption', family: 'sans', size: '15px', weight: 400, line: '19.5px', tracking: '0', usage: 'Legenda do vídeo — único degrau com altura de linha declarada', figmaNode: '4:1065' },
  { name: 'Caption Strong', cssVarPrefix: '--tik-font-caption-strong', family: 'sans', size: '15px', weight: 600, line: '19.5px', tracking: '0', usage: 'Hashtags dentro da legenda do vídeo', figmaNode: '4:1065' },
  { name: 'Label', cssVarPrefix: '--tik-font-label', family: 'sans', size: '14px', weight: 400, line: 'normal', tracking: '0', usage: 'Bio, rótulo de mídia e descrição de estado vazio', figmaNode: '4:393' },
  { name: 'Label Strong', cssVarPrefix: '--tik-font-label-strong', family: 'sans', size: '14px', weight: 600, line: 'normal', tracking: '0', usage: 'Rótulo de chip contornado', figmaNode: '4:815' },
  { name: 'Meta', cssVarPrefix: '--tik-font-meta', family: 'sans', size: '13px', weight: 400, line: 'normal', tracking: '0', usage: 'Rótulo de métrica, tempo e dica do leitor de QR', figmaNode: '4:485' },
  { name: 'Meta Strong', cssVarPrefix: '--tik-font-meta-strong', family: 'sans', size: '13px', weight: 600, line: 'normal', tracking: '0', usage: 'Rótulo de seção, autor de comentário e contador da trilha', figmaNode: '4:254' },
  { name: 'Meta Bold', cssVarPrefix: '--tik-font-meta-bold', family: 'sans', size: '13px', weight: 700, line: 'normal', tracking: '0', usage: 'Rótulo "Sounds" da câmera', figmaNode: '4:693' },
  { name: 'Counter', cssVarPrefix: '--tik-font-counter', family: 'sans', size: '12px', weight: 700, line: 'normal', tracking: '0', usage: 'Contador de fotos e rótulo "My TikCode"', figmaNode: '4:630' },
  { name: 'Micro', cssVarPrefix: '--tik-font-micro', family: 'sans', size: '11px', weight: 400, line: 'normal', tracking: '0', usage: 'Rótulo de ação da folha de compartilhamento', figmaNode: '4:866' },
  { name: 'Micro Bold', cssVarPrefix: '--tik-font-micro-bold', family: 'sans', size: '11px', weight: 700, line: 'normal', tracking: '0', usage: 'Rótulos "Effects" e "Upload" da câmera', figmaNode: '4:706' },
  { name: 'Nav', cssVarPrefix: '--tik-font-nav', family: 'sans', size: '10px', weight: 400, line: 'normal', tracking: '0.15px', usage: 'Rótulo inativo da barra de abas — estilo publicado "Button 10"', figmaNode: '4:440' },
  { name: 'Nav Active', cssVarPrefix: '--tik-font-nav-active', family: 'sans', size: '10px', weight: 600, line: 'normal', tracking: '0.15px', usage: 'Rótulo ativo da barra de abas', figmaNode: '4:437' },
  { name: 'Tool', cssVarPrefix: '--tik-font-tool', family: 'sans', size: '10px', weight: 700, line: 'normal', tracking: '0', usage: 'Rótulos da coluna de ferramentas da câmera', figmaNode: '4:675' },
  { name: 'System Nav Title', cssVarPrefix: '--tik-font-system-title', family: 'system', size: '16px', weight: 600, line: 'normal', tracking: '-0.3px', usage: 'Título "Scan" do leitor de QR', figmaNode: '4:761' },
  { name: 'System Clock', cssVarPrefix: '--tik-font-system-clock', family: 'system', size: '15px', weight: 600, line: 'normal', tracking: '-0.3px', usage: 'Relógio da barra de status', figmaNode: '4:1143' },
  { name: 'System Body', cssVarPrefix: '--tik-font-system-body', family: 'system', size: '15px', weight: 400, line: 'normal', tracking: '-0.6px', usage: 'Subtítulo "Upload up to 8 photos"', figmaNode: '4:636' },
  { name: 'System Link', cssVarPrefix: '--tik-font-system-link', family: 'system', size: '14px', weight: 400, line: 'normal', tracking: '0', usage: 'Ação textual "Photos" do leitor de QR', figmaNode: '4:762' },
];
