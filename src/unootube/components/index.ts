/**
 * Componentes do Design System Unootube.
 *
 * Reprodução em React de **dois** arquivos Figma:
 *
 * - "YouTube UI Clone Design (Community)" (fileKey `HcbrbLtDZ1rMEvSjoXpA5c`),
 *   origem dos 30 primeiros componentes. A ordem segue o inventário publicado
 *   na página `🎨 Design System` (`106:3229`).
 * - "Free YouTube Shorts Mockups (Community)" (fileKey
 *   `FlqnnoY0Mqdjic53twLAC1`), origem do Shorts, do cromo móvel e do tema
 *   claro.
 */

/* ----------------------------------------------------
 * Fundação
 * ---------------------------------------------------- */
export * from './Icon';
export * from './Logo';
export * from './Avatar';

/* ----------------------------------------------------
 * Navegação
 * ---------------------------------------------------- */
export * from './TopBar';
export * from './SearchBox';
export * from './ProfileCompact';
export * from './ProfileExpanded';
export * from './Sidebar';
export * from './SidebarMenuItem';
export * from './SidebarMenuTitle';
export * from './FooterItem';
export * from './TopMenuBar';
export * from './TopMenuItem';
export * from './TopMenuIcon';

/* ----------------------------------------------------
 * Mídia
 * ---------------------------------------------------- */
export * from './ThumbnailImage';
export * from './VideoCard';
export * from './VideoCardHorizontal';
export * from './VideoCardSmall';
export * from './VideoCardSidebar';
export * from './VideoPlayer';
export * from './VideoPlayerFull';
export * from './Playlist';

/* ----------------------------------------------------
 * Shorts (arquivo `FlqnnoY0Mqdjic53twLAC1`)
 * ---------------------------------------------------- */
export * from './ShortsLogo';
export * from './ShortsCard';
export * from './ShortsShelf';
export * from './ShortsActionRail';
export * from './ShortsPlayer';

/* ----------------------------------------------------
 * Cromo móvel (arquivo `FlqnnoY0Mqdjic53twLAC1`)
 * ---------------------------------------------------- */
export * from './MobileTopBar';
export * from './MobileTabBar';
export * from './MobileHeader';
export * from './MobileChannelHeader';

/* ----------------------------------------------------
 * Conteúdo
 * ---------------------------------------------------- */
export * from './ChannelHeader';
export * from './VideoDescription';
export * from './Comment';

/* ----------------------------------------------------
 * Ação
 * ---------------------------------------------------- */
export * from './Button';
export * from './SubscribeButton';

/* ----------------------------------------------------
 * Layout
 * ---------------------------------------------------- */
export * from './PrimaryColumn';
export * from './SecondaryColumn';

/* ----------------------------------------------------
 * Extensões
 *
 * NÃO SÃO PUBLICADAS POR NENHUM DOS DOIS ARQUIVOS DE ORIGEM. As seis telas que
 * eles desenham não abrem camada modal, não confirmam ação, não organizam
 * dados em grade e nunca estão vazias. Estes quatro existem porque produto
 * precisa deles, e a alternativa — compor com os equivalentes da Plataforma
 * Unooria — traria Open Sans e a paleta navy para dentro do Roboto e do
 * vermelho.
 *
 * Cada um deriva a forma de degraus que os arquivos DE FATO publicam (a
 * superfície elevada, os três degraus de `Elevation`, a régua da linha de
 * lista, a escala tipográfica de onze degraus). O único valor novo em todo o
 * grupo é `--uni-color-scrim`. Ver o registro de desvios da seção 10.6.
 * ---------------------------------------------------- */
export * from './Modal';
export * from './Snackbar';
export * from './Table';
export * from './EmptyState';

/* ----------------------------------------------------
 * Documentação
 *
 * `DesktopFrame` e `PhoneFrame` são contêineres de documentação, não de
 * produção.
 * ---------------------------------------------------- */
export * from './DesktopFrame';
export * from './PhoneFrame';
