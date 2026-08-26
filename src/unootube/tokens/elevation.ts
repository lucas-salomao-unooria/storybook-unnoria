/**
 * Tokens de Elevação do Design System Unootube.
 *
 * Espelho TypeScript de `elevation.css`. Extraídos do quadro `Elevation`
 * (`106:3214`) da página `🎨 Design System`, que publica exatamente três
 * degraus e descreve o uso de cada um.
 */

/**
 * Descrição de um degrau de elevação.
 */
export interface UniElevationToken {
  /** Nome do estilo no arquivo de design */
  figmaName: string;
  /** Node do Figma em que a sombra foi medida */
  figmaNode: string;
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor de `box-shadow` */
  value: string;
  /** Uso declarado pelo arquivo */
  usage: string;
}

/**
 * Os três degraus publicados.
 *
 * A biblioteca é plana por padrão: nas telas reconstruídas nenhuma barra,
 * cartão ou lista carrega `box-shadow`. Os degraus existem para camadas
 * flutuantes, não para decorar superfícies planas.
 */
export const uniElevation: Record<string, UniElevationToken> = {
  low: {
    figmaName: 'Elevation/Low',
    figmaNode: '106:3218',
    cssVar: '--uni-elevation-low',
    value: '0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    usage: 'Elevação sutil: cartões e botões',
  },
  medium: {
    figmaName: 'Elevation/Medium',
    figmaNode: '106:3222',
    cssVar: '--uni-elevation-medium',
    value: '0px 4px 8px 0px rgba(0, 0, 0, 0.16)',
    usage: 'Flutuante: menus suspensos e popovers',
  },
  high: {
    figmaName: 'Elevation/High',
    figmaNode: '106:3226',
    cssVar: '--uni-elevation-high',
    value: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
    usage: 'Modal: diálogos e folhas',
  },
};
