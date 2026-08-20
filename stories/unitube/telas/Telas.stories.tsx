import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import {
  Avatar,
  Button,
  ChannelHeader,
  Comment,
  DesktopFrame,
  FooterItem,
  Icon,
  Playlist,
  PrimaryColumn,
  SecondaryColumn,
  Sidebar,
  SidebarMenuItem,
  SidebarMenuTitle,
  TopBar,
  TopMenuBar,
  TopMenuItem,
  VideoCard,
  VideoCardHorizontal,
  VideoCardSidebar,
  VideoCardSmall,
  VideoDescription,
  VideoPlayerFull,
} from '../../../src/unitube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocSurfaceSwitcher,
} from '../../../.storybook/components';
import {
  avatars,
  categories,
  channelCover,
  channelTabs,
  comments,
  playerPoster,
  suggestions,
  videos,
} from '../fixtures';

const meta: Meta = {
  title: 'Unitube/Telas/Telas Compostas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/* ----------------------------------------------------
 * Andaimes de composição
 *
 * Restritos a `stories/`: são blocos que o arquivo desenha
 * como camadas soltas, sem componente publicado, e que por
 * isso não integram o pacote.
 * ---------------------------------------------------- */

/** Barra lateral completa, com os seis blocos do arquivo. */
const FullSidebar = () => (
  <Sidebar>
    <Sidebar.Section>
      <SidebarMenuItem icon="home" activeIcon="homeFill" menuLabel="Menu Item" active href="#" />
      <SidebarMenuItem icon="explore" activeIcon="exploreFill" menuLabel="Explore" href="#" />
      <SidebarMenuItem
        icon="subscriptions"
        activeIcon="subscriptionsFill"
        menuLabel="Subscriptions"
        href="#"
      />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuItem icon="library" activeIcon="libraryFill" menuLabel="Library" href="#" />
      <SidebarMenuItem icon="history" activeIcon="historyFill" menuLabel="History" href="#" />
      <SidebarMenuItem icon="yourVideos" menuLabel="Your Videos" href="#" />
      <SidebarMenuItem
        icon="watchLater"
        activeIcon="watchLaterFill"
        menuLabel="Watch Later"
        href="#"
      />
      <SidebarMenuItem
        icon="likedOutline"
        activeIcon="likedFill"
        menuLabel="Liked Videos"
        href="#"
      />
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show More" asButton />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuTitle title="Section title" />
      {['James Gouse', 'Alan Cooper', 'Marcus Levin', 'Alexis Sears', 'Jesica Lambert', 'Anna White', 'Skylar Dias'].map(
        (name) => (
          <SidebarMenuItem key={name} icon="likedOutline" menuLabel={name} href="#" />
        )
      )}
      <SidebarMenuItem icon="arrowBottom" menuLabel="Show 13 more" asButton />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuTitle title="More from Unitube" />
      <SidebarMenuItem icon="premium" activeIcon="premiumFill" menuLabel="Unitube Premium" href="#" />
      <SidebarMenuItem icon="gaming" activeIcon="gamingFill" menuLabel="Gaming" href="#" />
      <SidebarMenuItem icon="live" activeIcon="liveFill" menuLabel="Live" href="#" />
      <SidebarMenuItem icon="sports" activeIcon="sportsFill" menuLabel="Sports" href="#" />
    </Sidebar.Section>

    <Sidebar.Section>
      <SidebarMenuItem icon="settings" menuLabel="Settings" href="#" />
      <SidebarMenuItem icon="report" activeIcon="reportFill" menuLabel="Report History" href="#" />
      <SidebarMenuItem icon="help" menuLabel="Help" href="#" />
      <SidebarMenuItem icon="feedback" menuLabel="Send Feedback" href="#" />
    </Sidebar.Section>

    <Sidebar.Footer>
      <Sidebar.FooterRow>
        {['About', 'Press', 'Copyright', 'Contact us', 'Creators', 'Advertise', 'Developers'].map(
          (label) => (
            <FooterItem key={label} label={label} href="#" />
          )
        )}
      </Sidebar.FooterRow>
      <Sidebar.FooterRow>
        {['Terms', 'Privacy', 'Policy & Safety', 'How Unitube works', 'Test new features'].map(
          (label) => (
            <FooterItem key={label} label={label} href="#" />
          )
        )}
      </Sidebar.FooterRow>
      <Sidebar.FooterRow>
        <FooterItem label="© 2026 Unooria LLC" href="#" />
      </Sidebar.FooterRow>
    </Sidebar.Footer>
  </Sidebar>
);

/**
 * Cabeçalho da lista de comentários — contagem e controle de ordenação.
 *
 * Andaime: o arquivo desenha o frame "Short-By" com camadas de texto soltas,
 * sem componente publicado.
 */
const CommentsHeader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
      fontFamily: 'var(--uni-font-sans)',
    }}
  >
    <span
      style={{
        fontSize: 'var(--uni-font-heading-h4-size)',
        fontWeight: 'var(--uni-font-weight-regular)',
        color: 'var(--uni-color-text-primary)',
      }}
    >
      286 Comments
    </span>
    <Button icon="dropdown">SORT BY</Button>
  </div>
);

/**
 * Campo de novo comentário.
 *
 * Andaime: o arquivo desenha um avatar de 40px ao lado de uma camada de texto
 * "Add a public comment...", sem componente publicado.
 */
const CommentComposer = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '24px 0 32px',
      fontFamily: 'var(--uni-font-sans)',
    }}
  >
    <Avatar src={avatars.currentUser} alt="" size="lg" />
    <div
      style={{
        flex: 1,
        borderBottom: '1px solid var(--uni-color-border-subtle)',
        paddingBottom: 8,
        fontSize: 'var(--uni-font-body-md-size)',
        lineHeight: 'var(--uni-font-body-md-line)',
        color: 'var(--uni-color-text-secondary)',
      }}
    >
      Add a public comment...
    </div>
  </div>
);

/** Grade inicial de vídeos, em linhas de quatro. */
const VideoGrid = ({ rows = 3 }: { rows?: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '40px 16px',
      padding: 24,
    }}
  >
    {Array.from({ length: rows * 4 }, (_, index) => {
      const video = videos[index % videos.length];
      return (
        <VideoCard
          key={index}
          thumbnailSrc={video.thumbnailSrc}
          avatarSrc={video.avatarSrc}
          duration={video.duration}
          videoTitle={video.videoTitle}
          channelName={video.channelName}
          metadata={video.metadata}
        />
      );
    })}
  </div>
);

/* ----------------------------------------------------
 * As três telas do arquivo
 * ---------------------------------------------------- */

/** Tela `Home` (3:185). */
const HomeScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <FullSidebar />
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <TopMenuBar options={categories} activeId="all" />
        <VideoGrid rows={3} />
      </div>
    </div>
  </>
);

/** Tela `Channel` (15:913). */
const ChannelScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <FullSidebar />
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <ChannelHeader
          coverSrc={channelCover}
          avatarSrc={avatars.marcusLevin}
          channelName="Marcus Levin"
          subscriberCount="1.2M subscribers"
          tabs={channelTabs}
          activeTabId="home"
        />
        <VideoCardHorizontal
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · 3 weeks ago"
          description="Video description text"
        />
        {['Playlist Title', 'Uploads', 'Popular uploads', 'Created playlists'].map((title) => (
          <Playlist key={title} playlistTitle={title}>
            {videos.slice(0, 5).map((video) => (
              <VideoCardSmall
                key={video.id}
                thumbnailSrc={video.thumbnailSrc}
                duration={video.duration}
                videoTitle="Video Title"
                channelName={video.channelName}
                metadata="329K views · 1 month ago"
              />
            ))}
          </Playlist>
        ))}
      </div>
    </div>
  </>
);

/** Tela `Video` (19:1900). */
const VideoScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <PrimaryColumn>
        <VideoPlayerFull
          src={playerPoster}
          videoTitle="Video Title"
          metadata="576K views · Oct 8, 2021"
          actions={
            <>
              <Button icon="liked">1.7 K</Button>
              <Button icon="disliked">632</Button>
              <Button icon="share">SHARE</Button>
              <Button icon="save">SAVE</Button>
              <Button icon="more" aria-label="Mais ações" />
            </>
          }
        />
        <VideoDescription
          avatarSrc={avatars.marcusLevin}
          channelName="Marcus Levin"
          subscriberCount="1.2M subscribers"
          description="Video description text"
        />
        <CommentsHeader />
        <CommentComposer />
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            avatarSrc={comment.avatarSrc}
            authorName={comment.authorName}
            timestamp={comment.timestamp}
            commentText={comment.commentText}
            likeCount={comment.likeCount}
          />
        ))}
      </PrimaryColumn>

      <SecondaryColumn
        header={
          <>
            <TopMenuItem label="Item" active />
            <TopMenuItem label="From Marcus Levin" />
          </>
        }
      >
        {suggestions.map((suggestion) => (
          <VideoCardSidebar
            key={suggestion.id}
            thumbnailSrc={suggestion.thumbnailSrc}
            duration={suggestion.duration}
            videoTitle={suggestion.videoTitle}
            channelName={suggestion.channelName}
            metadata={suggestion.metadata}
          />
        ))}
      </SecondaryColumn>
    </div>
  </>
);

const ScreensDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unitube"
      category="Telas • Composições"
      title="Telas Compostas"
      description="As três telas da página Screen (0:1) do arquivo Figma, reconstruídas com os componentes reais de src/unitube. Cada tela mede 1440×1024 e é montada exclusivamente a partir do repertório publicado — nenhum mockup paralelo foi criado."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="As três telas e o que cada uma exercita."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🏠" title="Home (3:185)">
        Barra superior, barra lateral completa, faixa de filtros e grade de vídeos em linhas de
        quatro. Exercita <code>TopBar</code>, <code>Sidebar</code>, <code>TopMenuBar</code> e{' '}
        <code>VideoCard</code>.
      </UniDocCard>
      <UniDocCard icon="📺" title="Channel (15:913)">
        Cabeçalho de canal, destaque horizontal com reprodutor e quatro faixas de playlist. Exercita{' '}
        <code>ChannelHeader</code>, <code>VideoCardHorizontal</code>, <code>Playlist</code> e{' '}
        <code>VideoCardSmall</code>.
      </UniDocCard>
      <UniDocCard icon="▶️" title="Video (19:1900)">
        Duas colunas: reprodutor completo, descrição e comentários à esquerda; sugestões à direita.
        Exercita <code>PrimaryColumn</code>, <code>SecondaryColumn</code>,{' '}
        <code>VideoPlayerFull</code>, <code>VideoDescription</code>, <code>Comment</code> e{' '}
        <code>VideoCardSidebar</code>.
      </UniDocCard>
      <UniDocCard icon="🧩" title="Componentes reais, sempre">
        Nenhuma réplica artificial foi criada em <code>stories/</code>. Os únicos andaimes locais são
        o cabeçalho da lista de comentários e o campo de novo comentário, que o arquivo desenha como
        camadas soltas sem componente publicado.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="0:1"
      frameName="Screen — Home, Channel e Video"
      specs={[
        { label: 'Telas', value: '3' },
        { label: 'Dimensões', value: '1440 × 1024 cada' },
        { label: 'Área de conteúdo', value: '1200px' },
        { label: 'Barra lateral', value: '240px' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Andaimes locais',
          detail:
            'o cabeçalho da lista de comentários ("286 Comments" mais o controle de ordenação) e o campo de novo comentário são camadas de texto soltas no arquivo, sem componente publicado. São montados localmente nesta estória, com os tokens da marca, e não integram o pacote.',
        },
        {
          subject: 'Grade responsiva na tela inicial',
          detail:
            'o arquivo posiciona a grade em cinco linhas fixas de quatro cartões de 276px. A composição usa grade responsiva com colunas mínimas de 240px, para que a tela funcione em larguras reais de janela.',
        },
        {
          subject: 'Quadros de vídeo sintéticos',
          detail:
            'as miniaturas e a capa de canal do arquivo são logotipos de terceiros e fotografias, e não foram redistribuídas. As composições usam pôsteres sintéticos em SVG — ver o desvio registrado na estória do ThumbnailImage.',
        },
        {
          subject: 'Frames não reconstruídos',
          detail:
            'a página Screen do arquivo tem apenas as três telas, e todas foram reconstruídas. Não há frame descartado.',
        },
        {
          subject: 'Rolagem interna',
          detail:
            'as telas do arquivo são quadros estáticos com conteúdo cortado na aresta. As composições rolam de fato: a barra lateral e a área de conteúdo têm rolagem independente, como um produto real teria.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="3. Anatomia de uma tela"
      description="As quatro faixas que estruturam as três composições."
      barColor="#9EBFD0"
    />
    <UniDocAnatomy
      zones={[
        {
          name: 'Barra superior',
          role: 'Faixa fixa de 56px que atravessa as três telas, sobre a superfície de barra.',
          token: 'TopBar · --uni-topbar-height',
        },
        {
          name: 'Barra lateral',
          role: 'Coluna de 240px com rolagem própria, presente em Home e Channel.',
          token: 'Sidebar · --uni-sidebar-width',
        },
        {
          name: 'Área de conteúdo',
          role: 'Os 1200px restantes, com rolagem independente da barra lateral.',
          token: '--uni-desktop-width menos --uni-sidebar-width',
        },
        {
          name: 'Colunas da tela de vídeo',
          role: 'Principal de 664px e secundária de 426px, centradas na área de conteúdo.',
          token: '--uni-primary-column-width · --uni-secondary-column-width',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      title="4. Matriz de telas"
      description="As três composições no quadro de 1440×1024 do arquivo, reduzidas para caber na página."
      barColor="#EE1A26"
    />
    <UniDocStage label="Home (3:185) · Channel (15:913) · Video (19:1900)" surface="primary" align="flex-start" gap={24} padding={16}>
      <DesktopFrame label="Home — 3:185" height={1024} scale={0.28}>
        <HomeScreen />
      </DesktopFrame>
      <DesktopFrame label="Channel — 15:913" height={1024} scale={0.28}>
        <ChannelScreen />
      </DesktopFrame>
      <DesktopFrame label="Video — 19:1900" height={1024} scale={0.28}>
        <VideoScreen />
      </DesktopFrame>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas de composição" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Monte as telas exclusivamente com os componentes de src/unitube.',
        'Deixe a barra lateral e a área de conteúdo rolarem de forma independente.',
        'Use DesktopFrame para comparar a composição com o quadro do Figma.',
        'Mantenha a área de conteúdo em 1200px quando reproduzir a medida do arquivo.',
      ]}
      donts={[
        'Não crie réplicas de componentes dentro de stories/ — importe os reais.',
        'Não fixe a altura em 1024px em produto: o conteúdo real é mais alto.',
        'Não use o DesktopFrame em aplicação.',
        'Não embuta bitmaps no pacote: eles entram por prop.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a superfícies"
      description="O arquivo tem modo único; a tela inicial é demonstrada sobre as superfícies escuras oficiais."
      barColor="#9EBFD0"
    />
    <UniDocSurfaceSwitcher surfaces={['primary', 'deep']} padding={16}>
      {() => (
        <DesktopFrame label="Home — 3:185" height={800} scale={0.32}>
          <HomeScreen />
        </DesktopFrame>
      )}
    </UniDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      title="7. Referência de composição"
      description="Quais componentes cada tela exercita."
      barColor="#EE1A26"
    />
    <UniDocPropsTable
      title="Telas e componentes"
      rows={[
        {
          name: 'Home',
          type: '3:185',
          default: '1440 × 1024',
          description:
            'TopBar, Sidebar (+ SidebarMenuItem, SidebarMenuTitle, FooterItem), TopMenuBar (+ TopMenuItem, TopMenuIcon), VideoCard e ThumbnailImage.',
        },
        {
          name: 'Channel',
          type: '15:913',
          default: '1440 × 1024',
          description:
            'TopBar, Sidebar, ChannelHeader (+ Avatar, SubscribeButton, Icon), VideoCardHorizontal (+ VideoPlayer), Playlist e VideoCardSmall.',
        },
        {
          name: 'Video',
          type: '19:1900',
          default: '1440 × 1024',
          description:
            'TopBar, PrimaryColumn (+ VideoPlayerFull, VideoDescription, Button, Comment) e SecondaryColumn (+ TopMenuItem, VideoCardSidebar).',
        },
        {
          name: 'Andaimes locais',
          type: 'restritos a stories/',
          description:
            'Cabeçalho da lista de comentários e campo de novo comentário: camadas de texto soltas no arquivo, sem componente publicado. Não integram o pacote.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação das três telas compostas do arquivo de design.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ScreensDocumentationPage />,
};

/**
 * Réplica da tela `Home` (3:185), na medida literal de 1440×1024.
 */
export const TelaHome: Story = {
  name: '🏠 Tela Home',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HomeScreen />
    </div>
  ),
};

/**
 * Réplica da tela `Channel` (15:913).
 */
export const TelaChannel: Story = {
  name: '📺 Tela Channel',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChannelScreen />
    </div>
  ),
};

/**
 * Réplica da tela `Video` (19:1900).
 */
export const TelaVideo: Story = {
  name: '▶️ Tela Video',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <VideoScreen />
    </div>
  ),
};

/**
 * As três telas lado a lado na moldura de 1440×1024, reduzidas para caber na página.
 */
export const TodasAsTelas: Story = {
  name: '🎨 As três telas no quadro do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        gap: 32,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <DesktopFrame label="Home — 3:185" height={1024} scale={0.42}>
        <HomeScreen />
      </DesktopFrame>
      <DesktopFrame label="Channel — 15:913" height={1024} scale={0.42}>
        <ChannelScreen />
      </DesktopFrame>
      <DesktopFrame label="Video — 19:1900" height={1024} scale={0.42}>
        <VideoScreen />
      </DesktopFrame>
    </div>
  ),
};

/**
 * Navegação interativa entre as três telas.
 */
export const NavegacaoInterativa: Story = {
  name: '🕹️ Navegação entre telas',
  render: () => {
    const ScreenSwitcher = () => {
      const [screen, setScreen] = useState<'home' | 'channel' | 'video'>('home');

      return (
        <div
          data-uni-theme="dark"
          style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <div
            style={{
              display: 'flex',
              gap: 12,
              padding: 12,
              background: 'var(--uni-color-background-surface)',
            }}
          >
            <TopMenuItem label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
            <TopMenuItem
              label="Channel"
              active={screen === 'channel'}
              onClick={() => setScreen('channel')}
            />
            <TopMenuItem
              label="Video"
              active={screen === 'video'}
              onClick={() => setScreen('video')}
            />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginLeft: 'auto',
                color: 'var(--uni-color-text-secondary)',
                fontFamily: 'var(--uni-font-sans)',
                fontSize: 12,
              }}
            >
              <Icon name="leftBottom" size="sm" tone="secondary" />
              Composto com os componentes reais de src/unitube
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            {screen === 'home' && <HomeScreen />}
            {screen === 'channel' && <ChannelScreen />}
            {screen === 'video' && <VideoScreen />}
          </div>
        </div>
      );
    };
    return <ScreenSwitcher />;
  },
};
