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
  MobileChannelHeader,
  MobileHeader,
  MobileTabBar,
  MobileTopBar,
  PhoneFrame,
  Playlist,
  PrimaryColumn,
  SecondaryColumn,
  ShortsCard,
  ShortsLogo,
  ShortsPlayer,
  ShortsShelf,
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
} from '../../../src/unootube';
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
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  avatars,
  categories,
  channelCover,
  channelTabs,
  comments,
  playerPoster,
  shorts,
  shortsChannelTabs,
  shortsPlayerPoster,
  soundCover,
  suggestions,
  videos,
} from '../fixtures';

const meta: Meta = {
  title: 'Unootube/Telas/Telas Compostas',
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
      <SidebarMenuTitle title="More from Unootube" />
      <SidebarMenuItem icon="premium" activeIcon="premiumFill" menuLabel="Unootube Premium" href="#" />
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
        {['Terms', 'Privacy', 'Policy & Safety', 'How Unootube works', 'Test new features'].map(
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
          poster={playerPoster}
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
          poster={playerPoster}
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


/* ----------------------------------------------------
 * As três telas do arquivo de Shorts (FlqnnoY0Mqdjic53twLAC1)
 *
 * O segundo arquivo de origem publica as mesmas três telas em seis quadros —
 * iPhone, Android e área de trabalho, cada um em tema claro e escuro. As
 * composições abaixo são as mesmas nos dois temas: quem troca é o atributo
 * `data-uni-theme` no ancestral, exatamente como em produto.
 * ---------------------------------------------------- */

/** Legenda do Short, com as hashtags em Bold dentro do parágrafo (3:203). */
const ShortsCaption = () => (
  <>
    Home video | Movements | Dancing in the rain <strong>#shorts</strong>{' '}
    <strong>#Shorts</strong> tiktok
  </>
);

/** Barra de abas móvel, com os cinco destinos do arquivo. */
const MobileTabs = ({ activeId = 'home' }: { activeId?: string }) => (
  <MobileTabBar>
    <MobileTabBar.Item
      icon={<Icon name="homeFill" size="lg" />}
      label="Home"
      active={activeId === 'home'}
    />
    <MobileTabBar.Item
      icon={<ShortsLogo variant="mono" size={26} />}
      label="Shorts"
      active={activeId === 'shorts'}
    />
    <MobileTabBar.CreateButton />
    <MobileTabBar.Item
      icon={<Icon name="subscriptions" size="xl" />}
      label="Subscription"
      active={activeId === 'subscription'}
    />
    <MobileTabBar.Item
      icon={<Icon name="library" size="xl" />}
      label="Library"
      active={activeId === 'library'}
    />
  </MobileTabBar>
);

/** Tela móvel `iPhone Shorts` — feed com a prateleira de Shorts (1:115). */
const MobileFeedScreen = () => (
  <PhoneFrame>
    <MobileTopBar avatarSrc={avatars.currentUser} />
    <div className="uni-phone-frame__scroll">
      <VideoCard
        thumbnailSrc={videos[0].thumbnailSrc}
        avatarSrc={videos[0].avatarSrc}
        videoTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        metadata="8.280.021 views Dec • 01. 2022"
      />
      <ShortsShelf>
        {shorts.slice(0, 6).map((short) => (
          <ShortsCard
            key={short.id}
            thumbnailSrc={short.thumbnailSrc}
            videoTitle={short.videoTitle}
            views={short.views}
          />
        ))}
      </ShortsShelf>
      <VideoCard
        thumbnailSrc={videos[5].thumbnailSrc}
        avatarSrc={videos[5].avatarSrc}
        videoTitle="The Beauty of Existence - Heart Touching Nasheed"
        metadata="19,210,251 views Jul • 1, 2016"
      />
    </div>
    <MobileTabs activeId="home" />
  </PhoneFrame>
);

/** Tela móvel `iPhone Shorts` — reprodutor em tela cheia (3:196). */
const MobileShortsScreen = () => (
  <PhoneFrame surface="immersive">
    <MobileHeader action={<Icon name="camera" size={32} />} />
    <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
      <ShortsPlayer
        poster={shortsPlayerPoster}
        caption={<ShortsCaption />}
        channelName="SADEK Tuts"
        avatarSrc={avatars.skylarDias}
        likeCount="245K"
        commentCount="952"
        soundSrc={soundCover}
        onMore={() => undefined}
        style={{ height: '100%' }}
      />
    </div>
  </PhoneFrame>
);

/** Tela móvel `Android Shorts` — canal com a grade de Shorts (16:1012). */
const MobileChannelScreen = () => (
  <PhoneFrame device="android">
    <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
    <div className="uni-phone-frame__scroll">
      <MobileChannelHeader
        avatarInitials="U"
        channelName="Username..."
        subscriberCount="420 thousand subscribers"
        sectionLabel="Short videos from this channel"
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}
      >
        {shorts.map((short) => (
          <ShortsCard
            key={short.id}
            variant="views"
            width="100%"
            thumbnailSrc={short.thumbnailSrc}
            views={short.views}
          />
        ))}
      </div>
    </div>
    <MobileTabs activeId="library" />
  </PhoneFrame>
);

/** Tela `Desktop Shorts` — feed com a prateleira de Shorts (1:385). */
const DesktopShortsFeedScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <FullSidebar />
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <TopMenuBar options={categories} activeId="all" />
        <div style={{ padding: 24 }}>
          <ShortsShelf layout="grid" bordered>
            {shorts.map((short) => (
              <ShortsCard
                key={short.id}
                variant="below"
                width="100%"
                thumbnailSrc={short.thumbnailSrc}
                videoTitle={short.videoTitle}
                views={short.views}
              />
            ))}
          </ShortsShelf>
        </div>
      </div>
    </div>
  </>
);

/** Tela `Desktop Shorts` — reprodutor em cartão (3:306). */
const DesktopShortsPlayerScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <FullSidebar />
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <ShortsPlayer
          variant="card"
          poster={shortsPlayerPoster}
          caption={<ShortsCaption />}
          channelName="SADEK Tuts"
          avatarSrc={avatars.skylarDias}
          likeCount="245K thousand"
          commentCount="952"
          soundSrc={soundCover}
          showPeek
          onMore={() => undefined}
        />
      </div>
    </div>
  </>
);

/** Tela `Desktop Shorts` — canal com a prateleira de Shorts (16:348). */
const DesktopShortsChannelScreen = () => (
  <>
    <TopBar avatarSrc={avatars.currentUser} />
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <FullSidebar />
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        <ChannelHeader
          coverSrc={channelCover}
          avatarInitials="U"
          channelName="Username..."
          channelHandle="@User-name25 · subscribers 25K · video 146"
          secondaryLine="No followers"
          tabs={shortsChannelTabs}
          activeTabId="home"
          showTabArrows
        />
        <div style={{ padding: 24 }}>
          <ShortsShelf layout="grid">
            {shorts.slice(0, 10).map((short) => (
              <ShortsCard
                key={short.id}
                variant="below"
                width="100%"
                thumbnailSrc={short.thumbnailSrc}
                videoTitle={short.videoTitle}
                views={short.views}
              />
            ))}
          </ShortsShelf>
        </div>
      </div>
    </div>
  </>
);

const ScreensDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Telas • Composições"
      title="Telas Compostas"
      description="Nove telas reconstruídas com os componentes reais de src/unootube: as três da página Screen (0:1) do arquivo original, de 1440×1024, e as seis do arquivo de Shorts (FlqnnoY0Mqdjic53twLAC1) — três móveis e três de área de trabalho. Todas são montadas exclusivamente a partir do repertório publicado; nenhum mockup paralelo foi criado."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="As nove telas e o que cada uma exercita."
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
      <UniDocCard icon="📱" title="Shorts móvel (1:115, 3:196, 16:1012)">
        Feed com a prateleira, reprodutor em tela cheia e canal com a grade. Exercita{' '}
        <code>MobileTopBar</code>, <code>MobileTabBar</code>, <code>MobileHeader</code>,{' '}
        <code>MobileChannelHeader</code>, <code>ShortsShelf</code>, <code>ShortsCard</code> e{' '}
        <code>ShortsPlayer</code>, todos dentro do <code>PhoneFrame</code>.
      </UniDocCard>
      <UniDocCard icon="🖥️" title="Shorts de trabalho (1:385, 3:306, 16:348)">
        As mesmas três telas em 1440px, com a barra lateral do arquivo original e a grade, o
        reprodutor em cartão e o canal com identificador — a linha que o{' '}
        <code>ChannelHeader</code> ganhou com o segundo arquivo.
      </UniDocCard>
      <UniDocCard icon="🌗" title="Os dois temas, medidos">
        As composições são idênticas nos dois temas: o que troca é o atributo{' '}
        <code>data-uni-theme</code> no ancestral, exatamente como em produto. É a demonstração de
        que o tema claro veio medido, e não derivado por inversão.
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
        { label: 'Telas do arquivo original', value: '3 — Home, Channel e Video' },
        { label: 'Telas do arquivo de Shorts', value: '6 — 3 móveis e 3 de área de trabalho' },
        { label: 'Dimensões', value: '1440 × 1024 · 390 × 844 · 360 × 800' },
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
        'Monte as telas exclusivamente com os componentes de src/unootube.',
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
              Composto com os componentes reais de src/unootube
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


/* ----------------------------------------------------
 * Telas do arquivo de Shorts
 * ---------------------------------------------------- */

/**
 * Réplica da tela móvel `iPhone Shorts` (1:115): feed com a prateleira de Shorts.
 */
export const TelaShortsFeedMovel: Story = {
  name: '📱 Tela Shorts — feed móvel',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <MobileFeedScreen />
    </div>
  ),
};

/**
 * Réplica da tela móvel `iPhone Shorts` (3:196): reprodutor em tela cheia.
 *
 * O quadro é a réplica estática do arquivo. Para ver a reprodução real, use a
 * estória "Reprodução real" do `ShortsPlayer`.
 */
export const TelaShortsReprodutorMovel: Story = {
  name: '📱 Tela Shorts — reprodutor móvel',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <MobileShortsScreen />
    </div>
  ),
};

/**
 * Réplica da tela móvel `Android Shorts` (16:1012): canal com a grade de Shorts.
 */
export const TelaShortsCanalMovel: Story = {
  name: '📱 Tela Shorts — canal móvel',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <MobileChannelScreen />
    </div>
  ),
};

/**
 * Réplica da tela `Desktop Shorts` (1:385): feed com a grade de Shorts.
 */
export const TelaShortsFeedDesktop: Story = {
  name: '🖥️ Tela Shorts — feed de trabalho',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DesktopShortsFeedScreen />
    </div>
  ),
};

/**
 * Réplica da tela `Desktop Shorts` (3:306): reprodutor em cartão.
 */
export const TelaShortsReprodutorDesktop: Story = {
  name: '🖥️ Tela Shorts — reprodutor de trabalho',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DesktopShortsPlayerScreen />
    </div>
  ),
};

/**
 * Réplica da tela `Desktop Shorts` (16:348): canal com a prateleira de Shorts.
 */
export const TelaShortsCanalDesktop: Story = {
  name: '🖥️ Tela Shorts — canal de trabalho',
  render: () => (
    <div data-uni-theme="dark" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DesktopShortsChannelScreen />
    </div>
  ),
};

/**
 * As três telas móveis do arquivo de Shorts, nos dois temas.
 *
 * É a demonstração de que o par claro/escuro é medido e não derivado: a mesma
 * composição, com o mesmo repertório, trocando apenas `data-uni-theme`.
 */
export const TelasShortsNosDoisTemas: Story = {
  name: '🌗 Telas de Shorts nos dois temas',
  render: () => (
    <div style={{ padding: 24 }}>
      <UniDocThemeSwitcher align="stretch" padding={32}>
        {() => (
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ transform: 'scale(0.62)', transformOrigin: 'top left', width: 242, height: 524 }}>
              <MobileFeedScreen />
            </div>
            <div style={{ transform: 'scale(0.62)', transformOrigin: 'top left', width: 242, height: 524 }}>
              <MobileShortsScreen />
            </div>
            <div style={{ transform: 'scale(0.62)', transformOrigin: 'top left', width: 224, height: 496 }}>
              <MobileChannelScreen />
            </div>
          </div>
        )}
      </UniDocThemeSwitcher>
    </div>
  ),
};
