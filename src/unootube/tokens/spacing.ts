/**
 * Tokens de Medida do Design System Unootube.
 *
 * Espelho TypeScript de `spacing.css`. A escala vem do quadro `Spacing`
 * (`106:3125`) e os raios do quadro `Radius` (`106:3179`); as dimensões
 * estruturais foram medidas nó a nó, já que o arquivo posiciona as telas em
 * coordenadas absolutas.
 */

/**
 * Descrição de um degrau de medida.
 */
export interface UniMeasureToken {
  /** Nome da variável CSS correspondente */
  cssVar: string;
  /** Valor em pixels */
  value: number;
  /** Uso no arquivo de design */
  usage: string;
  /** Node do Figma de origem, quando medido em componente */
  figmaNode?: string;
}

/**
 * Escala de espaçamento publicada pelo arquivo.
 *
 * A base declarada é 4px, mas a escala preserva os degraus finos de 1, 2, 6 e
 * 10 pixels: é proibido arredondá-los para a grade de 4px.
 */
export const uniSpacing: Record<string, UniMeasureToken> = {
  s0: { cssVar: '--uni-spacing-0', value: 0, usage: 'Ausência de espaço', figmaNode: '106:3128' },
  s1: { cssVar: '--uni-spacing-1', value: 1, usage: 'Fios e divisores', figmaNode: '106:3131' },
  s2: { cssVar: '--uni-spacing-2', value: 2, usage: 'Recuo mínimo do cabeçalho de comentário', figmaNode: '106:3135' },
  s4: { cssVar: '--uni-spacing-4', value: 4, usage: 'Recuo do cartão compacto', figmaNode: '106:3139' },
  s6: { cssVar: '--uni-spacing-6', value: 6, usage: 'Intervalo entre título e metadados do cartão', figmaNode: '106:3143' },
  s8: { cssVar: '--uni-spacing-8', value: 8, usage: 'Recuo vertical da linha de menu', figmaNode: '106:3147' },
  s10: { cssVar: '--uni-spacing-10', value: 10, usage: 'Recuo vertical do botão de inscrição', figmaNode: '106:3151' },
  s12: { cssVar: '--uni-spacing-12', value: 12, usage: 'Recuo da pílula de filtro', figmaNode: '106:3155' },
  s16: { cssVar: '--uni-spacing-16', value: 16, usage: 'Calha padrão de conteúdo', figmaNode: '106:3159' },
  s20: { cssVar: '--uni-spacing-20', value: 20, usage: 'Recuo do alvo de ícone do menu superior', figmaNode: '106:3163' },
  s24: { cssVar: '--uni-spacing-24', value: 24, usage: 'Recuo da barra lateral e intervalo entre glifo e rótulo', figmaNode: '106:3167' },
  s32: { cssVar: '--uni-spacing-32', value: 32, usage: 'Separação entre blocos de conteúdo', figmaNode: '106:3171' },
  s64: { cssVar: '--uni-spacing-64', value: 64, usage: 'Recuo da descrição sob o avatar do canal', figmaNode: '106:3175' },
};

/**
 * Raios de borda publicados pelo arquivo.
 *
 * `full` é literalmente 80px no arquivo, e não um valor arbitrariamente
 * grande: o quadro de raios rotula o degrau como "full · 80px".
 */
export const uniRadius: Record<string, UniMeasureToken> = {
  none: { cssVar: '--uni-radius-none', value: 0, usage: 'Miniaturas e quadros de vídeo', figmaNode: '106:3182' },
  xs: { cssVar: '--uni-radius-xs', value: 1, usage: 'Selo HD do reprodutor', figmaNode: '106:3186' },
  sm: { cssVar: '--uni-radius-sm', value: 2, usage: 'Campo de busca e botão de inscrição', figmaNode: '106:3190' },
  md: { cssVar: '--uni-radius-md', value: 8, usage: 'Cartões arredondados', figmaNode: '106:3194' },
  lg: { cssVar: '--uni-radius-lg', value: 24, usage: 'Superfícies flutuantes', figmaNode: '106:3198' },
  xl: { cssVar: '--uni-radius-xl', value: 32, usage: 'Pílula de filtro do menu superior', figmaNode: '106:3202' },
  xl2: { cssVar: '--uni-radius-2xl', value: 40, usage: 'Botão circular de ícone', figmaNode: '106:3206' },
  full: { cssVar: '--uni-radius-full', value: 80, usage: 'Avatares', figmaNode: '106:3210' },
};

/**
 * Dimensões estruturais medidas nos componentes e nas telas.
 */
export const uniDimensions: Record<string, UniMeasureToken> = {
  desktopWidth: { cssVar: '--uni-desktop-width', value: 1440, usage: 'Largura do quadro de tela', figmaNode: '3:185' },
  desktopHeight: { cssVar: '--uni-desktop-height', value: 1024, usage: 'Altura do quadro de tela', figmaNode: '3:185' },
  topbarHeight: { cssVar: '--uni-topbar-height', value: 56, usage: 'Altura da barra superior', figmaNode: '7:111' },
  sidebarWidth: { cssVar: '--uni-sidebar-width', value: 240, usage: 'Largura da barra lateral', figmaNode: '8:114' },
  sidebarItemWidth: { cssVar: '--uni-sidebar-item-width', value: 224, usage: 'Largura útil das linhas da barra lateral', figmaNode: '8:126' },
  sidebarItemHeight: { cssVar: '--uni-sidebar-item-height', value: 40, usage: 'Altura da linha de menu', figmaNode: '8:126' },
  sidebarTitleHeight: { cssVar: '--uni-sidebar-title-height', value: 32, usage: 'Altura do rótulo de seção', figmaNode: '9:1933' },
  topmenuHeight: { cssVar: '--uni-topmenu-height', value: 56, usage: 'Altura da barra de filtros', figmaNode: '13:1696' },
  topmenuPillHeight: { cssVar: '--uni-topmenu-pill-height', value: 32, usage: 'Altura da pílula de filtro', figmaNode: '10:545' },
  contentGutter: { cssVar: '--uni-content-gutter', value: 65, usage: 'Calha lateral do conteúdo em largura total', figmaNode: '19:1562' },
  primaryColumnWidth: { cssVar: '--uni-primary-column-width', value: 664, usage: 'Coluna principal da tela de vídeo', figmaNode: '20:2992' },
  secondaryColumnWidth: { cssVar: '--uni-secondary-column-width', value: 426, usage: 'Coluna secundária da tela de vídeo', figmaNode: '20:2996' },
  videocardWidth: { cssVar: '--uni-videocard-width', value: 276, usage: 'Cartão de vídeo da grade inicial', figmaNode: '12:593' },
  thumbnailHeight: { cssVar: '--uni-thumbnail-height', value: 155, usage: 'Miniatura do cartão de vídeo', figmaNode: '11:997' },
  videocardSmallWidth: { cssVar: '--uni-videocard-small-width', value: 214, usage: 'Cartão compacto da playlist', figmaNode: '19:1459' },
  videocardSidebarWidth: { cssVar: '--uni-videocard-sidebar-width', value: 402, usage: 'Cartão da coluna lateral', figmaNode: '25:3450' },
  playerWidth: { cssVar: '--uni-player-width', value: 640, usage: 'Largura do reprodutor completo', figmaNode: '20:2920' },
  channelCoverHeight: { cssVar: '--uni-channel-cover-height', value: 192, usage: 'Capa do canal', figmaNode: '17:2796' },
};


/**
 * Medidas do Shorts e do cromo móvel.
 *
 * Medidas nó a nó no arquivo "Free YouTube Shorts Mockups (Community)"
 * (fileKey `FlqnnoY0Mqdjic53twLAC1`, página `YouTube ` — `1:2`).
 */
export const uniShortsSizes: Record<string, UniMeasureToken> = {
  phoneWidth: { cssVar: '--uni-phone-width', value: 390, usage: 'Quadro do iPhone das telas móveis', figmaNode: '1:115' },
  phoneHeight: { cssVar: '--uni-phone-height', value: 844, usage: 'Altura do quadro do iPhone', figmaNode: '1:115' },
  phoneAndroidWidth: { cssVar: '--uni-phone-android-width', value: 360, usage: 'Quadro do Android das telas móveis', figmaNode: '16:1012' },
  phoneAndroidHeight: { cssVar: '--uni-phone-android-height', value: 800, usage: 'Altura do quadro do Android', figmaNode: '16:1012' },
  mobileTopbarHeight: { cssVar: '--uni-mobile-topbar-height', value: 50, usage: 'Barra superior móvel', figmaNode: '1:201' },
  mobileTabbarHeight: { cssVar: '--uni-mobile-tabbar-height', value: 58, usage: 'Barra de abas móvel', figmaNode: '1:235' },
  mobileHeaderHeight: { cssVar: '--uni-mobile-header-height', value: 47, usage: 'Barra de navegação do reprodutor de Shorts', figmaNode: '3:245' },
  shortsFrameWidth: { cssVar: '--uni-shorts-frame-width', value: 488, usage: 'Quadro do reprodutor de Shorts na área de trabalho', figmaNode: '3:481' },
  shortsPeekHeight: { cssVar: '--uni-shorts-peek-height', value: 44, usage: 'Faixa do próximo Short abaixo do quadro', figmaNode: '3:482' },
  shortsCardWidth: { cssVar: '--uni-shorts-card-width', value: 150, usage: 'Cartão da prateleira móvel', figmaNode: '1:136' },
  shortsCardHeight: { cssVar: '--uni-shorts-card-height', value: 266, usage: 'Altura do cartão da prateleira', figmaNode: '1:136' },
  shortsCellWidth: { cssVar: '--uni-shorts-cell-width', value: 119, usage: 'Célula da grade de Shorts do canal móvel', figmaNode: '16:1018' },
  shortsCellHeight: { cssVar: '--uni-shorts-cell-height', value: 200, usage: 'Altura da célula da grade de Shorts', figmaNode: '16:1018' },
  shortsRailWidth: { cssVar: '--uni-shorts-rail-width', value: 36, usage: 'Trilha de ações sobreposta ao vídeo', figmaNode: '3:210' },
  shortsRailGap: { cssVar: '--uni-shorts-rail-gap', value: 20, usage: 'Intervalo entre ações da trilha', figmaNode: '3:214' },
  shortsRailButton: { cssVar: '--uni-shorts-rail-button', value: 54, usage: 'Botão circular da trilha na área de trabalho', figmaNode: '3:460' },
  shortsSoundSize: { cssVar: '--uni-shorts-sound-size', value: 36, usage: 'Botão de som do reprodutor de Shorts', figmaNode: '3:237' },
};

/**
 * Os seis diâmetros de avatar publicados pelo arquivo.
 *
 * São todos literais e usados em contextos distintos — é proibido consolidá-los
 * em uma escala derivada por cálculo.
 */
export const uniAvatarSizes: Record<string, UniMeasureToken> = {
  xs: { cssVar: '--uni-avatar-xs', value: 24, usage: 'Componente base Avatar/UserAvatar', figmaNode: '7:58' },
  sm: { cssVar: '--uni-avatar-sm', value: 32, usage: 'Perfil compacto da barra superior', figmaNode: '7:87' },
  md: { cssVar: '--uni-avatar-md', value: 36, usage: 'Cartão de vídeo da grade inicial', figmaNode: '12:593' },
  lg: { cssVar: '--uni-avatar-lg', value: 40, usage: 'Comentário', figmaNode: '24:2191' },
  xl: { cssVar: '--uni-avatar-xl', value: 48, usage: 'Descrição do vídeo', figmaNode: '20:2989' },
  xl2: { cssVar: '--uni-avatar-2xl', value: 80, usage: 'Cabeçalho de canal', figmaNode: '17:2796' },
  /*
   * Os dois diâmetros que o arquivo de Shorts acrescenta. Não são degraus
   * nomeados do `Avatar` — são valores literais informados por `size={38}` e
   * `size={77}`, para que a escala nomeada continue refletindo só o arquivo
   * original.
   */
  shorts: { cssVar: '--uni-avatar-shorts', value: 38, usage: 'Linha de canal do reprodutor de Shorts', figmaNode: '3:487' },
  xl3: { cssVar: '--uni-avatar-3xl', value: 77, usage: 'Cabeçalho de canal móvel', figmaNode: '16:1082' },
};
