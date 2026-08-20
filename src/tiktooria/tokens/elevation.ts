/**
 * Tokens de Elevação do Design System Tik Tooria.
 *
 * Espelho TypeScript de `elevation.css`. O arquivo Figma publica dois estilos
 * de efeito — "Action Button Shadow" e "Text Drop" — e todos os demais são
 * efeitos locais lidos do nó de origem. A biblioteca é plana por padrão:
 * barras e cartões se separam por fio de 0,33px, e desfoque existe apenas nos
 * alvos flutuantes.
 */

/**
 * Descrição de um efeito com rastreabilidade até o Figma.
 */
export interface TikElevationToken {
  cssVar: string;
  value: string;
  usage: string;
  figmaNode?: string;
  /** Nome do estilo de efeito publicado, quando houver */
  figmaStyle?: string;
}

/**
 * Efeitos oficiais da biblioteca.
 */
export const tikElevationTokens: TikElevationToken[] = [
  {
    cssVar: '--tik-elevation-action-button',
    value: '0 0.33px 4px rgba(0, 0, 0, 0.1)',
    usage: 'Alvos flutuantes sobre a câmera e o vídeo',
    figmaNode: '4:706',
    figmaStyle: 'Action Button Shadow',
  },
  {
    cssVar: '--tik-text-drop',
    value: '1px 1px 0 rgba(0, 0, 0, 0.3)',
    usage: 'Rótulos e contadores sobre o vídeo, para legibilidade',
    figmaNode: '4:847',
    figmaStyle: 'Text Drop',
  },
  {
    cssVar: '--tik-elevation-bar-bottom',
    value: '0 0.33px 0 #D0D1D3',
    usage: 'Fio inferior da barra superior de cromo claro',
    figmaNode: '4:330',
  },
  {
    cssVar: '--tik-elevation-bar-top',
    value: '0 -0.33px 0 #D0D1D3',
    usage: 'Fio superior da barra de abas de cromo claro',
    figmaNode: '4:429',
  },
  {
    cssVar: '--tik-elevation-bar-top-immersive',
    value: '0 -0.33px 0 #262626',
    usage: 'Fio superior da barra de abas imersiva',
    figmaNode: '4:1098',
  },
  {
    cssVar: '--tik-elevation-bar-bottom-outline',
    value: '0 0.33px 0 #E3E3E4',
    usage: 'Fio inferior do cabeçalho da página de som',
    figmaNode: '4:807',
  },
  {
    cssVar: '--tik-elevation-action-button-strong',
    value: '0 0.33px 4px rgba(0, 0, 0, 0.2)',
    usage: 'Contador de fotos do seletor de upload',
    figmaNode: '4:630',
  },
  {
    cssVar: '--tik-elevation-floating',
    value: '0 4px 8px rgba(0, 0, 0, 0.3)',
    usage: 'Botão flutuante "Use this sound"',
    figmaNode: '4:803',
  },
  {
    cssVar: '--tik-elevation-tooltip',
    value: '0 4px 10px rgba(0, 0, 0, 0.1)',
    usage: 'Chamada "Tap to create a new video"',
    figmaNode: '4:453',
  },
  {
    cssVar: '--tik-elevation-photo',
    value: '0 4px 4px rgba(0, 0, 0, 0.25)',
    usage: 'Cartão de fotografia do seletor de upload',
    figmaNode: '4:631',
  },
  {
    cssVar: '--tik-elevation-photo-rim',
    value: '0 2.5px 2px rgba(255, 255, 255, 0.1)',
    usage: 'Realce superior do cartão de fotografia',
    figmaNode: '4:631',
  },
  {
    cssVar: '--tik-elevation-logo',
    value: '0 0.33px 1px rgba(0, 0, 0, 0.05)',
    usage: 'Logotipo de SMS da folha de compartilhamento',
    figmaNode: '4:921',
  },
  {
    cssVar: '--tik-elevation-upload-frame',
    value: '0 0.33px 2px rgba(0, 0, 0, 0.2)',
    usage: 'Moldura do seletor de upload da câmera',
    figmaNode: '4:717',
  },
];
