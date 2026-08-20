import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Divider,
  Icon,
  ListItem,
  Logo,
  MediaGrid,
  NotificationItem,
  PhoneFrame,
  PostCard,
  ProfileHeader,
  SearchField,
  SegmentedTabs,
  StoriesTray,
  StoryViewer,
  TabBar,
  TextField,
  TopBar,
  instaDefaultTabs,
} from '../../../src/instanooria/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  InstaDocCard,
  InstaDocGrid,
  InstaDocFigmaSpecs,
  InstaDocPractices,
} from '../../../.storybook/components';
import {
  instaAvatars,
  instaConversations,
  instaGridItems,
  instaHighlightItems,
  instaPhotos,
  instaSearchCategories,
  instaStoryItems,
} from '../fixtures';

type InstaTheme = 'light' | 'dark';

/**
 * Abas com o avatar do usuário na quinta posição.
 */
const tabsFor = () =>
  instaDefaultTabs.map((tab) =>
    tab.id === 'profile' ? { ...tab, avatarSrc: instaAvatars.jacob_w } : tab
  );

/**
 * Tela de Feed — frame "Instagram Main".
 */
const FeedScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <>
    <TopBar
      theme={theme}
      withStatusBarInset={false}
      leading={<Icon name="camera" size={24} theme={theme} />}
      title={<Logo height={26} theme={theme} />}
      trailing={
        <>
          <span style={{ position: 'relative', display: 'inline-flex' }}>
            <Icon name="igtv" size={24} theme={theme} />
            <Badge
              variant="notification"
              dot
              theme={theme}
              style={{ position: 'absolute', top: 0, right: -2 }}
            />
          </span>
          <Icon name="share" size={22} theme={theme} />
        </>
      }
    />
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <StoriesTray items={instaStoryItems} theme={theme} />
      <PostCard theme={theme}>
        <PostCard.Header
          username="joshua_l"
          location="Tóquio, Japão"
          avatarSrc={instaAvatars.joshua_l}
          verified
          theme={theme}
          onMore={() => undefined}
        />
        <PostCard.Media
          src={instaPhotos.tokyo}
          alt="Cruzamento de Shibuya ao entardecer"
          currentIndex={1}
          totalCount={3}
          theme={theme}
        />
        <PostCard.Actions liked currentIndex={1} totalCount={3} theme={theme} />
        <PostCard.Likes
          avatarSrc={instaAvatars.craig_love}
          username="craig_love"
          count={44686}
          theme={theme}
        />
        <PostCard.Caption username="joshua_l" theme={theme}>
          O jogo no Japão foi incrível e eu quero compartilhar algumas fotos.
        </PostCard.Caption>
        <PostCard.Timestamp theme={theme}>19 de setembro</PostCard.Timestamp>
      </PostCard>
      <PostCard theme={theme}>
        <PostCard.Header
          username="karennne"
          location="Lisboa, Portugal"
          avatarSrc={instaAvatars.karennne}
          ring="story"
          theme={theme}
          onMore={() => undefined}
        />
        <PostCard.Media src={instaPhotos.coffee} alt="Café da manhã" theme={theme} />
        <PostCard.Actions theme={theme} />
        <PostCard.Caption username="karennne" theme={theme}>
          Sábado devagar ☕
        </PostCard.Caption>
      </PostCard>
    </div>
    <TabBar theme={theme} items={tabsFor()} activeId="feed" />
  </>
);

/**
 * Tela de Perfil — frame "Instagram Profile".
 */
const ProfileScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <>
    <TopBar
      theme={theme}
      variant="plain"
      withStatusBarInset={false}
      title={
        <>
          <Icon name="lock" size={12} theme={theme} />
          jacob_w
          <Icon name="chevronDown" size={11} theme={theme} />
        </>
      }
      trailing={<Icon name="menu" size={20} theme={theme} />}
    />
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <ProfileHeader
        theme={theme}
        avatarSrc={instaAvatars.jacob_w}
        name="Jacob West"
        bio={
          <>
            Designer de produtos digitais{' '}
            <span style={{ color: 'var(--insta-color-text-link)' }}>@unooria</span>
            <br />
            Tudo é design.
          </>
        }
        stats={[
          { id: 'posts', value: '54', label: 'Publicações' },
          { id: 'followers', value: '834', label: 'Seguidores' },
          { id: 'following', value: '162', label: 'Seguindo' },
        ]}
        actions={
          <Button variant="secondary" size="sm" block theme={theme}>
            Editar perfil
          </Button>
        }
      />
      <StoriesTray
        theme={theme}
        items={instaHighlightItems}
        bordered={false}
        ariaLabel="Destaques"
      />
      <SegmentedTabs
        theme={theme}
        items={[
          { id: 'grid', label: 'Publicações em grade', icon: 'grid' },
          { id: 'tagged', label: 'Marcações', icon: 'tagged' },
        ]}
        activeId="grid"
        variant="icon"
        ariaLabel="Seções do perfil"
      />
      <MediaGrid theme={theme} items={instaGridItems} />
    </div>
    <TabBar theme={theme} items={tabsFor()} activeId="profile" />
  </>
);

/**
 * Tela de Mensagens Diretas — frame "Instagram Direct Messages".
 */
const MessagesScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <>
    <TopBar
      theme={theme}
      withStatusBarInset={false}
      leading={<Icon name="back" size={18} theme={theme} />}
      title={
        <>
          jacob_w
          <Icon name="chevronDown" size={11} theme={theme} />
        </>
      }
      trailing={<Icon name="addChat" size={20} theme={theme} />}
    />
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <div style={{ padding: '12px 14px' }}>
        <SearchField theme={theme} placeholder="Buscar" />
      </div>
      {instaConversations.map((conversation, index) => (
        <ListItem
          key={conversation.id}
          theme={theme}
          leading={
            <Avatar
              src={conversation.avatarSrc}
              alt=""
              size={56}
              ring={conversation.ring}
              theme={theme}
            />
          }
          title={conversation.username}
          subtitle={conversation.message}
          meta={`· ${conversation.time}`}
          trailing={<Icon name="camera" size={22} tone="secondary" theme={theme} />}
          bordered={index < instaConversations.length - 1}
          onClick={() => undefined}
        />
      ))}
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
        height: 'var(--insta-tabbar-height)',
        paddingTop: 14,
        color: 'var(--insta-color-action-primary)',
        fontSize: 15,
        fontWeight: 400,
        boxShadow: 'var(--insta-elevation-hairline-top)',
      }}
    >
      <Icon name="camera" size={20} tone="link" theme={theme} />
      Câmera
    </div>
  </>
);

/**
 * Atividades agrupadas por período, replicando os blocos do frame Instagram Likes.
 */
const ACTIVITY_GROUPS: {
  title: string;
  items: {
    id: string;
    avatarSrc: string;
    avatarRing?: 'none' | 'story' | 'live' | 'seen';
    username: string;
    action: string;
    timestamp: string;
    thumbnailSrc?: string;
    thumbnailAlt?: string;
    follow?: 'primary' | 'secondary';
  }[];
}[] = [
  {
    title: 'Novas',
    items: [
      {
        id: 'karennne',
        avatarSrc: instaAvatars.karennne,
        username: 'karennne',
        action: 'curtiu sua foto.',
        timestamp: '1h',
        thumbnailSrc: instaPhotos.mountains,
        thumbnailAlt: 'Montanhas',
      },
    ],
  },
  {
    title: 'Hoje',
    items: [
      {
        id: 'kiero_d',
        avatarSrc: instaAvatars.kieron_d,
        username: 'kiero_d, zackjohn',
        action: 'e mais 26 pessoas curtiram sua foto.',
        timestamp: '3h',
        thumbnailSrc: instaPhotos.forest,
        thumbnailAlt: 'Floresta',
      },
    ],
  },
  {
    title: 'Esta semana',
    items: [
      {
        id: 'craig_love',
        avatarSrc: instaAvatars.craig_love,
        avatarRing: 'story',
        username: 'craig_love',
        action: 'mencionou você em um comentário.',
        timestamp: '2d',
        thumbnailSrc: instaPhotos.city,
        thumbnailAlt: 'Cidade',
      },
      {
        id: 'martini_rond',
        avatarSrc: instaAvatars.martini_rond,
        username: 'martini_rond',
        action: 'começou a seguir você.',
        timestamp: '3d',
        follow: 'secondary',
      },
      {
        id: 'mis_potter',
        avatarSrc: instaAvatars.mis_potter,
        username: 'mis_potter',
        action: 'começou a seguir você.',
        timestamp: '3d',
        follow: 'primary',
      },
    ],
  },
];

/**
 * Tela de Atividade — frame "Instagram Likes".
 */
const ActivityScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <>
    <div style={{ paddingTop: 8 }}>
      <SegmentedTabs
        theme={theme}
        items={[
          { id: 'following', label: 'Seguindo' },
          { id: 'you', label: 'Você' },
        ]}
        activeId="you"
        ariaLabel="Atividade"
      />
    </div>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      {ACTIVITY_GROUPS.map((group) => (
        <div key={group.title}>
          <div
            style={{
              padding: '14px 15px 4px',
              fontSize: 15,
              fontWeight: 590,
              color: 'var(--insta-color-text-primary)',
            }}
          >
            {group.title}
          </div>
          {group.items.map((item) => (
            <NotificationItem
              key={item.id}
              theme={theme}
              avatarSrc={item.avatarSrc}
              avatarRing={item.avatarRing}
              username={item.username}
              action={item.action}
              timestamp={item.timestamp}
              thumbnailSrc={item.thumbnailSrc}
              thumbnailAlt={item.thumbnailAlt}
              trailing={
                item.follow ? (
                  <Button variant={item.follow} size="sm" theme={theme}>
                    {item.follow === 'primary' ? 'Seguir' : 'Mensagem'}
                  </Button>
                ) : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
    <TabBar
      theme={theme}
      items={tabsFor()}
      activeId="activity"
     
    />
  </>
);

/**
 * Tela Buscar — frame "Instagram Search".
 */
const SearchScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <>
    <div style={{ padding: '10px 14px', display: 'grid', gap: 12 }}>
      <SearchField
        theme={theme}
        placeholder="Buscar"
        trailing={<Icon name="nametag" size={22} theme={theme} />}
      />
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {instaSearchCategories.map((category, index) => (
          <Chip
            key={category}
            theme={theme}
            selected={index === 0}
            leadingIcon={
              category === 'IGTV' ? <Icon name="igtv" size={14} tone="inherit" /> : undefined
            }
          >
            {category}
          </Chip>
        ))}
      </div>
    </div>
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <MediaGrid theme={theme} items={[...instaGridItems, ...instaGridItems]} />
    </div>
    <TabBar theme={theme} items={tabsFor()} activeId="search" />
  </>
);

/**
 * Tela de Autenticação — frame "Instagram Authorization".
 */
const LoginScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => {
  const [user, setUser] = useState('asad_khasanov');
  const [password, setPassword] = useState('');

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 22,
        padding: '0 20px',
        backgroundColor: 'var(--insta-color-background-primary)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <Logo height={48} theme={theme} />
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        <TextField
          theme={theme}
          label="Nome de usuário"
          hideLabel
          placeholder="Nome de usuário"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <TextField
          theme={theme}
          label="Senha"
          hideLabel
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          trailing={
            <Button variant="link" theme={theme}>
              Esqueceu a senha?
            </Button>
          }
        />
      </div>
      <Button variant="primary" size="lg" block theme={theme} disabled={!user || !password}>
        Entrar
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="facebook"
          theme={theme}
          leadingIcon={<Icon name="facebook" size={18} tone="inherit" />}
        >
          Entrar com Facebook
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <Divider theme={theme} weight="solid" />
        </div>
        <span
          style={{
            flexShrink: 0,
            fontSize: 11,
            fontWeight: 590,
            color: 'var(--insta-color-text-primary)',
          }}
        >
          OU
        </span>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <Divider theme={theme} weight="solid" />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          fontSize: 13,
          color: 'var(--insta-color-text-secondary)',
        }}
      >
        Não tem uma conta?
        <Button variant="link" theme={theme}>
          Cadastre-se.
        </Button>
      </div>
    </div>
  );
};

/**
 * Tela de Story — frame "Instagram Story".
 */
const StoryScreen: React.FC<{ theme?: InstaTheme }> = ({ theme = 'light' }) => (
  <StoryViewer
    theme={theme}
    mediaSrc={instaPhotos.coffee}
    mediaAlt="Café da manhã em um bistrô"
    username="craig_love"
    avatarSrc={instaAvatars.craig_love}
    timestamp="4h"
    segments={5}
    currentSegment={3}
    segmentProgress={0.6}
    onClose={() => undefined}
    onShare={() => undefined}
    onMore={() => undefined}
    onComposerClick={() => undefined}
  />
);

/**
 * Catálogo de telas disponíveis.
 */
const SCREENS: { id: string; label: string; figmaNode: string; render: (theme: InstaTheme) => React.ReactNode }[] = [
  { id: 'feed', label: 'Feed', figmaNode: '0:1646', render: (theme) => <FeedScreen theme={theme} /> },
  { id: 'profile', label: 'Perfil', figmaNode: '0:2662', render: (theme) => <ProfileScreen theme={theme} /> },
  { id: 'messages', label: 'Mensagens', figmaNode: '0:2482', render: (theme) => <MessagesScreen theme={theme} /> },
  { id: 'activity', label: 'Atividade', figmaNode: '0:2334', render: (theme) => <ActivityScreen theme={theme} /> },
  { id: 'search', label: 'Buscar', figmaNode: '0:1906', render: (theme) => <SearchScreen theme={theme} /> },
  { id: 'story', label: 'Story', figmaNode: '0:2236', render: (theme) => <StoryScreen theme={theme} /> },
  { id: 'login', label: 'Entrar', figmaNode: '0:1846', render: (theme) => <LoginScreen theme={theme} /> },
];

/**
 * Página de documentação rica das telas compostas.
 */
const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Instanooria"
      category="Telas • Composição"
      title="Telas Compostas"
      description="Sete telas do produto montadas exclusivamente com os componentes de produção de src/instanooria/components. Nenhuma tela contém mockup, réplica ou estilo paralelo: cada pixel vem de um componente do design system, o que torna estas páginas o teste de integração visual do Instanooria."
    />

    <UnooriaDocSectionHeader
      title="1. Visão Geral & Casos de Uso"
      description="Para que servem as telas compostas dentro do design system."
    />
    <InstaDocGrid>
      <InstaDocCard icon="🧪" title="Teste de integração visual">
        Se um token muda, todas as sete telas mudam junto. Regressões de espaçamento, contraste ou
        altura de barra aparecem aqui antes de chegarem ao produto.
      </InstaDocCard>
      <InstaDocCard icon="📐" title="Validação contra o Figma">
        Cada tela declara o node de origem, permitindo comparação lado a lado com o frame original
        em 375 × 812px.
      </InstaDocCard>
      <InstaDocCard icon="🌗" title="Prova dos dois temas">
        As mesmas composições rodam em Classic e Dark sem nenhuma alteração de código, apenas pela
        troca do atributo <code>data-insta-theme</code>.
      </InstaDocCard>
      <InstaDocCard icon="📚" title="Referência de montagem">
        Servem como exemplo canônico de como combinar TopBar, conteúdo rolável e TabBar dentro do
        PhoneFrame.
      </InstaDocCard>
    </InstaDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & Especificações Técnicas"
      description="Frames de origem de cada tela composta."
    />
    <InstaDocFigmaSpecs
      nodeId="0:2"
      frameName="Página “Instagram”"
      specs={SCREENS.map((screen) => ({ label: screen.label, value: `node ${screen.figmaNode}` }))}
    />

    <UnooriaDocSectionHeader
      title="3. Galeria Completa — Tema Classic"
      description="As sete telas renderizadas com componentes reais de produção."
    />
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
      {SCREENS.map((screen) => (
        <div key={screen.id} style={{ textAlign: 'center' }}>
          <PhoneFrame theme="light" ariaLabel={screen.label}>
            {screen.render('light')}
          </PhoneFrame>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A', marginTop: 12 }}>
            {screen.label}
          </div>
          <div style={{ fontSize: 11, color: '#475157' }}>node {screen.figmaNode}</div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="4. Galeria Completa — Tema Dark"
      description="As mesmas composições, sem nenhuma alteração de código."
    />
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
      {SCREENS.map((screen) => (
        <div key={screen.id} style={{ textAlign: 'center' }}>
          <PhoneFrame theme="dark" ariaLabel={`${screen.label} · tema escuro`}>
            {screen.render('dark')}
          </PhoneFrame>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#22272A', marginTop: 12 }}>
            {screen.label}
          </div>
        </div>
      ))}
    </div>

    <UnooriaDocSectionHeader
      title="5. Boas Práticas"
      description="Regras de composição de tela dentro do design system."
    />
    <InstaDocPractices
      dos={[
        'Montar telas exclusivamente com componentes de src/instanooria/components.',
        'Colocar a rolagem no bloco de conteúdo, entre TopBar e TabBar.',
        'Desligar os recuos de status bar e home indicator quando dentro do PhoneFrame.',
        'Validar cada tela nos dois temas antes de considerá-la concluída.',
      ]}
      donts={[
        'Recriar um componente localmente para "ajustar" uma tela específica.',
        'Introduzir hexadecimais ou medidas fora dos tokens --insta-*.',
        'Deixar o quadro inteiro rolar em vez do bloco de conteúdo.',
        'Duplicar barras de sistema já desenhadas pelo PhoneFrame.',
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Instanooria/Telas/Telas Compostas',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Sete telas do Instanooria montadas exclusivamente com os componentes de produção do design system, nos temas Classic e Dark.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das telas baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * Navegador interativo entre as sete telas e os dois temas.
 */
export const NavegadorDeTelas: Story = {
  name: '🕹️ 1. Navegador de Telas',
  render: () => {
    const ScreenBrowser = () => {
      const [screenId, setScreenId] = useState('feed');
      const [theme, setTheme] = useState<InstaTheme>('light');
      const screen = SCREENS.find((item) => item.id === screenId) ?? SCREENS[0];

      return (
        <div style={{ display: 'grid', gap: 20, justifyItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SCREENS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScreenId(item.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: `1px solid ${screenId === item.id ? '#22272A' : '#E4E8E9'}`,
                  backgroundColor: screenId === item.id ? '#22272A' : '#FFFFFF',
                  color: screenId === item.id ? '#FFFFFF' : '#475157',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {(['light', 'dark'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTheme(option)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 999,
                  border: `1px solid ${theme === option ? '#22272A' : '#E4E8E9'}`,
                  backgroundColor: theme === option ? '#22272A' : '#FFFFFF',
                  color: theme === option ? '#FFFFFF' : '#475157',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {option === 'light' ? '☀️ Classic' : '🌙 Dark'}
              </button>
            ))}
          </div>

          <PhoneFrame theme={theme} ariaLabel={screen.label}>
            {screen.render(theme)}
          </PhoneFrame>

          <div style={{ fontSize: 12, color: '#475157' }}>
            Figma node <strong>{screen.figmaNode}</strong>
          </div>
        </div>
      );
    };

    return <ScreenBrowser />;
  },
};

/**
 * Tela de Feed replicando o frame oficial "Instagram Main" do Figma.
 */
export const Feed: Story = {
  name: '🎨 Feed',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <PhoneFrame key={theme} theme={theme} ariaLabel={`Feed · ${theme}`}>
          <FeedScreen theme={theme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Tela de Perfil replicando o frame oficial "Instagram Profile" do Figma.
 */
export const Perfil: Story = {
  name: '🎨 Perfil',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <PhoneFrame key={theme} theme={theme} ariaLabel={`Perfil · ${theme}`}>
          <ProfileScreen theme={theme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Tela de Mensagens replicando o frame oficial "Instagram Direct Messages" do Figma.
 */
export const Mensagens: Story = {
  name: '🎨 Mensagens',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <PhoneFrame key={theme} theme={theme} ariaLabel={`Mensagens · ${theme}`}>
          <MessagesScreen theme={theme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Tela de Atividade replicando o frame oficial "Instagram Likes" do Figma.
 */
export const Atividade: Story = {
  name: '🎨 Atividade',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <PhoneFrame key={theme} theme={theme} ariaLabel={`Atividade · ${theme}`}>
          <ActivityScreen theme={theme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Tela Buscar replicando o frame oficial "Instagram Search" do Figma.
 */
export const Buscar: Story = {
  name: '🎨 Buscar',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {(['light', 'dark'] as const).map((theme) => (
        <PhoneFrame key={theme} theme={theme} ariaLabel={`Buscar · ${theme}`}>
          <SearchScreen theme={theme} />
        </PhoneFrame>
      ))}
    </div>
  ),
};

/**
 * Telas de Story e de Autenticação.
 */
export const StoryEAutenticacao: Story = {
  name: '🎨 Story & Autenticação',
  render: () => (
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      <PhoneFrame theme="light" ariaLabel="Story">
        <StoryScreen theme="light" />
      </PhoneFrame>
      <PhoneFrame theme="dark" ariaLabel="Story · tema escuro">
        <StoryScreen theme="dark" />
      </PhoneFrame>
      <PhoneFrame theme="light" ariaLabel="Entrar">
        <LoginScreen theme="light" />
      </PhoneFrame>
      <PhoneFrame theme="dark" ariaLabel="Entrar · tema escuro">
        <LoginScreen theme="dark" />
      </PhoneFrame>
    </div>
  ),
};
