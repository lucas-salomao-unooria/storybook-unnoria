/**
 * Tokens de Espaçamento, Raios e Dimensões do Design System Tik Tooria.
 *
 * Espelho TypeScript de `spacing.css`. Todas as medidas foram lidas da
 * geometria dos frames de 414×896 do arquivo Figma "TikTok UI Screens
 * (Community) - cópia". Os degraus fracionários (0,33px dos fios e 0,83px da
 * calha de miniaturas) são preservados, não arredondados.
 */

/**
 * Descrição de uma medida com rastreabilidade até o Figma.
 */
export interface TikMeasureToken {
  cssVar: string;
  value: string;
  usage: string
  figmaNode?: string;
}

/**
 * Escala de espaçamento.
 */
export const tikSpacingScale: TikMeasureToken[] = [
  { cssVar: '--tik-spacing-4xs', value: '2px', usage: 'Respiro entre linhas de rótulo de duas linhas' },
  { cssVar: '--tik-spacing-3xs', value: '4px', usage: 'Folga interna mínima' },
  { cssVar: '--tik-spacing-xxs', value: '6px', usage: 'Altura da trilha de progresso da câmera', figmaNode: '4:719' },
  { cssVar: '--tik-spacing-xs', value: '8px', usage: 'Respiro entre glifo e rótulo' },
  { cssVar: '--tik-spacing-s', value: '10px', usage: 'Recuo do indicador de home a partir da base', figmaNode: '4:1122' },
  { cssVar: '--tik-spacing-m', value: '12px', usage: 'Recuo do ícone dentro do campo de busca', figmaNode: '4:220' },
  { cssVar: '--tik-spacing-l', value: '16px', usage: 'Calha lateral padrão' },
  { cssVar: '--tik-spacing-xl', value: '20px', usage: 'Recuo do rótulo do compositor de comentário', figmaNode: '4:961' },
  { cssVar: '--tik-spacing-xxl', value: '24px', usage: 'Respiro vertical entre seções de configuração' },
  { cssVar: '--tik-spacing-3xl', value: '32px', usage: 'Respiro entre bloco de métricas e botões do perfil' },
  { cssVar: '--tik-spacing-4xl', value: '48px', usage: 'Recuo do rótulo em linha com ícone', figmaNode: '4:257' },
];

/**
 * Raios de borda.
 */
export const tikRadiusScale: TikMeasureToken[] = [
  { cssVar: '--tik-radius-xs', value: '1px', usage: 'Detalhes da barra de status' },
  { cssVar: '--tik-radius-s', value: '2px', usage: 'Botão e chip contornados', figmaNode: '4:495' },
  { cssVar: '--tik-radius-m', value: '3px', usage: 'Trilha de progresso da câmera', figmaNode: '4:719' },
  { cssVar: '--tik-radius-l', value: '4px', usage: 'Campo de busca preenchido', figmaNode: '4:219' },
  { cssVar: '--tik-radius-xl', value: '6px', usage: 'Cartão de fotografia do seletor', figmaNode: '4:632' },
  { cssVar: '--tik-radius-xxl', value: '8px', usage: 'Topo das folhas e botão de criação', figmaNode: '4:965' },
  { cssVar: '--tik-radius-surface', value: '12px', usage: 'Superfície da câmera', figmaNode: '4:670' },
  { cssVar: '--tik-radius-full', value: '1000px', usage: 'Avatares, círculos de ação e indicador de home' },
];

/**
 * Dimensões estruturais das telas.
 */
export const tikDimensionTokens: TikMeasureToken[] = [
  { cssVar: '--tik-device-width', value: '414px', usage: 'Largura do dispositivo de referência (iPhone XR/11)' },
  { cssVar: '--tik-device-height', value: '896px', usage: 'Altura do dispositivo de referência' },
  { cssVar: '--tik-hairline', value: '0.33px', usage: 'Fio de separação das barras', figmaNode: '4:330' },
  { cssVar: '--tik-grid-hairline', value: '0.83px', usage: 'Calha branca entre miniaturas', figmaNode: '4:448' },
  { cssVar: '--tik-statusbar-height', value: '44px', usage: 'Barra de status do iPhone X', figmaNode: '4:1123' },
  { cssVar: '--tik-navbar-height', value: '88px', usage: 'Barra superior das telas de cromo', figmaNode: '4:222' },
  { cssVar: '--tik-feedheader-height', value: '44px', usage: 'Cabeçalho de abas do feed imersivo', figmaNode: '4:1116' },
  { cssVar: '--tik-tabbar-height', value: '83px', usage: 'Barra de abas inferior', figmaNode: '4:1097' },
  { cssVar: '--tik-homeindicator-height', value: '35px', usage: 'Faixa do indicador de home', figmaNode: '4:1120' },
  { cssVar: '--tik-row-height', value: '52px', usage: 'Linha de configuração e de edição de perfil', figmaNode: '4:255' },
  { cssVar: '--tik-social-row-height', value: '76px', usage: 'Linha social de "Find friends"', figmaNode: '4:198' },
  { cssVar: '--tik-field-height', value: '36px', usage: 'Campo de busca preenchido', figmaNode: '4:219' },
  { cssVar: '--tik-profileheader-height', value: '318px', usage: 'Cabeçalho do perfil', figmaNode: '4:477' },
  { cssVar: '--tik-profiletabs-height', value: '40px', usage: 'Faixa de abas do perfil', figmaNode: '4:471' },
  { cssVar: '--tik-soundheader-height', value: '265px', usage: 'Cabeçalho da página de som', figmaNode: '4:806' },
];

/**
 * Diâmetros de avatar — os seis do arquivo, preservados.
 */
export const tikAvatarTokens: TikMeasureToken[] = [
  { cssVar: '--tik-avatar-xs', value: '32px', usage: 'Comentário', figmaNode: '4:970' },
  { cssVar: '--tik-avatar-sm', value: '47px', usage: 'Autor do vídeo no feed', figmaNode: '4:1086' },
  { cssVar: '--tik-avatar-md', value: '49px', usage: 'Disco giratório de música', figmaNode: '4:1067' },
  { cssVar: '--tik-avatar-lg', value: '56px', usage: 'Linha social de "Find friends"', figmaNode: '4:202' },
  { cssVar: '--tik-avatar-xl', value: '90px', usage: 'Seletor de foto e vídeo do perfil', figmaNode: '4:391' },
  { cssVar: '--tik-avatar-xxl', value: '96px', usage: 'Cabeçalho do perfil', figmaNode: '4:481' },
];

/**
 * Alvos e superfícies de dimensão fixa.
 */
export const tikTargetTokens: TikMeasureToken[] = [
  { cssVar: '--tik-action-circle', value: '47px', usage: 'Círculo de ação da folha', figmaNode: '4:864' },
  { cssVar: '--tik-follow-button', value: '21px', usage: 'Botão de seguir sobre o avatar do feed', figmaNode: '4:1087' },
  { cssVar: '--tik-create-button-width', value: '43px', usage: 'Largura do botão de criação', figmaNode: '4:1099' },
  { cssVar: '--tik-create-button-height', value: '28px', usage: 'Altura do botão de criação', figmaNode: '4:1099' },
  { cssVar: '--tik-record-button', value: '80px', usage: 'Botão de gravação da câmera', figmaNode: '4:695' },
  { cssVar: '--tik-thumbnail-width', value: '137px', usage: 'Largura da miniatura da grade', figmaNode: '4:448' },
  { cssVar: '--tik-thumbnail-height', value: '182px', usage: 'Altura da miniatura da grade', figmaNode: '4:448' },
  { cssVar: '--tik-scanner-size', value: '250px', usage: 'Moldura do leitor de QR', figmaNode: '4:750' },
  { cssVar: '--tik-album-cover', value: '120px', usage: 'Capa do álbum na página de som', figmaNode: '4:818' },
  { cssVar: '--tik-outline-button-width', value: '164px', usage: 'Botão contornado de edição de perfil', figmaNode: '4:495' },
  { cssVar: '--tik-outline-button-height', value: '44px', usage: 'Altura do botão contornado', figmaNode: '4:495' },
  { cssVar: '--tik-chip-width', value: '152px', usage: 'Chip "Add to Favorites"', figmaNode: '4:816' },
  { cssVar: '--tik-chip-height', value: '28px', usage: 'Altura do chip contornado', figmaNode: '4:816' },
  { cssVar: '--tik-primary-button-width', value: '270px', usage: 'Botão primário "Select photos"', figmaNode: '4:622' },
  { cssVar: '--tik-primary-button-height', value: '44px', usage: 'Altura do botão primário', figmaNode: '4:622' },
  { cssVar: '--tik-floating-button-width', value: '178px', usage: 'Botão flutuante "Use this sound"', figmaNode: '4:803' },
  { cssVar: '--tik-floating-button-height', value: '52px', usage: 'Altura do botão flutuante', figmaNode: '4:803' },
  { cssVar: '--tik-indicator-width', value: '134px', usage: 'Linha do indicador de home', figmaNode: '4:1122' },
  { cssVar: '--tik-indicator-height', value: '5px', usage: 'Espessura do indicador de home', figmaNode: '4:1122' },
];

/**
 * Grade de tamanhos de ícone.
 */
export const tikIconSizeTokens: TikMeasureToken[] = [
  { cssVar: '--tik-icon-size-xs', value: '12px', usage: 'Nota musical da legenda', figmaNode: '4:1091' },
  { cssVar: '--tik-icon-size-sm', value: '16px', usage: 'Glifo de linha de configuração', figmaNode: '4:264' },
  { cssVar: '--tik-icon-size-md', value: '20px', usage: 'Glifo da barra de abas', figmaNode: '4:445' },
  { cssVar: '--tik-icon-size-lg', value: '24px', usage: 'Glifo da coluna da câmera', figmaNode: '4:677' },
  { cssVar: '--tik-icon-size-xl', value: '35px', usage: 'Glifo da trilha de ações do feed', figmaNode: '4:1082' },
];
