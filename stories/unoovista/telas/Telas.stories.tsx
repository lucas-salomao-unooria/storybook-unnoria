import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Chip,
  DirectThread,
  Divider,
  FloatingButton,
  GestureHint,
  Icon,
  InlineHint,
  ListItem,
  Logo,
  MediaGrid,
  MessageBubble,
  DmPoll,
  NotificationItem,
  PhoneFrame,
  PostCard,
  ProfileHeader,
  SearchField,
  SegmentedTabs,
  Snackbar,
  StoriesTray,
  StoryComposer,
  StoryViewer,
  TabBar,
  TextField,
  TopBar,
  unvDefaultTabs,
} from '../../../src/unoovista/components';
import type { UnvIconName } from '../../../src/unoovista/components';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocAnatomy,
  UnvDocCard,
  UnvDocDecisions,
  UnvDocGrid,
  UnvDocPractices,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  unvAvatars,
  unvConversations,
  unvGridItems,
  unvHighlightItems,
  unvPhotos,
  unvPickerItems,
  unvPollOptions,
  unvSearchCategories,
  unvStoryFrames,
  unvStoryItems,
  unvThreadContact,
  unvThreadMessages,
} from '../fixtures';

const BAR = '#716C98';

type Tema = 'light' | 'dark';

/* ==========================================================================
 * Andaimes de layout (restritos a `stories/`; não integram o pacote)
 * ========================================================================== */

/**
 * Estilo tipográfico de um degrau da escala do módulo, só com tokens.
 */
const tipo = (estilo: string): React.CSSProperties => ({
  fontSize: `var(--unv-font-${estilo}-size)`,
  fontWeight: `var(--unv-font-${estilo}-weight)`,
  lineHeight: `var(--unv-font-${estilo}-line)`,
  letterSpacing: `var(--unv-font-${estilo}-tracking)`,
});

/**
 * Abas da doca: o avatar da pessoa na quinta posição e o ponto de novidades
 * na atividade.
 */
const abas = unvDefaultTabs.map((aba) => {
  if (aba.id === 'profile') return { ...aba, avatarSrc: unvAvatars.lucasMar };
  if (aba.id === 'activity') return { ...aba, hasNotification: true };
  return aba;
});

/**
 * Esqueleto de toda tela: barra superior fixa, corpo rolável sobre a camada
 * lavanda e, quando há doca, a doca flutuando sobre o conteúdo (o corpo
 * reserva a folga inferior para ela).
 */
const Tela: React.FC<{
  topo?: React.ReactNode;
  children: React.ReactNode;
  doca?: string;
  onAba?: (id: string) => void;
  sobreposicao?: React.ReactNode;
}> = ({ topo, children, doca, onAba, sobreposicao }) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      minHeight: 0,
      backgroundColor: 'var(--unv-color-background-secondary)',
    }}
  >
    {topo}
    <div
      style={{
        display: 'grid',
        flex: 1,
        gridAutoRows: 'max-content',
        alignContent: 'start',
        gap: 'var(--unv-spacing-m)',
        minHeight: 0,
        padding: `var(--unv-spacing-3xs) var(--unv-gutter) ${
          doca ? 'calc(var(--unv-tabbar-height) + var(--unv-spacing-xxl))' : 'var(--unv-spacing-4xl)'
        }`,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
      }}
    >
      {children}
    </div>
    {doca && (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <TabBar
          items={abas}
          activeId={doca}
          onChange={onAba ? (id) => onAba(id) : undefined}
        />
      </div>
    )}
    {sobreposicao}
  </div>
);

/**
 * Cartão em camada: superfície primária, cantos de 16px, sem fio.
 */
const Cartao: React.FC<{
  titulo?: string;
  children: React.ReactNode;
  semRecuo?: boolean;
}> = ({ titulo, children, semRecuo = false }) => (
  <section
    aria-label={titulo}
    style={{
      flexShrink: 0,
      boxSizing: 'border-box',
      padding: semRecuo ? 'var(--unv-spacing-l) 0 var(--unv-spacing-xs)' : 'var(--unv-spacing-l)',
      borderRadius: 'var(--unv-radius-l)',
      backgroundColor: 'var(--unv-color-background-primary)',
      overflow: 'hidden',
    }}
  >
    {titulo && (
      <h2
        style={{
          margin: 0,
          padding: semRecuo ? '0 var(--unv-spacing-l) var(--unv-spacing-xs)' : '0 0 var(--unv-spacing-m)',
          color: 'var(--unv-color-text-primary)',
          ...tipo('title-md'),
        }}
      >
        {titulo}
      </h2>
    )}
    {children}
  </section>
);

/**
 * Rótulo de período sobre um grupo de cartões (o equivalente local do rótulo
 * de seção — o módulo não tem um componente para isso).
 */
const Periodo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2
    style={{
      margin: 0,
      padding: 'var(--unv-spacing-xs) var(--unv-spacing-3xs) 0',
      color: 'var(--unv-color-text-secondary)',
      ...tipo('title-sm'),
    }}
  >
    {children}
  </h2>
);

const pilha: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--unv-spacing-3xs)',
};

/* ==========================================================================
 * Telas
 * ========================================================================== */

/**
 * Feed: logotipo à esquerda, histórias num cartão, publicações com a pílula de
 * ações sobre a mídia e a doca flutuando sobre tudo.
 */
const FeedTela: React.FC<{ onAba?: (id: string) => void }> = ({ onAba }) => (
  <Tela
    doca="feed"
    onAba={onAba}
    topo={
      <TopBar
        withStatusBarInset={false}
        title={<Logo height={28} />}
        trailing={
          <>
            <TopBar.Action icon="camera" label="Criar história" />
            <TopBar.Action icon="share" label="Mensagens" hasNotification />
          </>
        }
      />
    }
  >
    <StoriesTray items={unvStoryItems} />
    <PostCard>
      <PostCard.Header
        username="caio_dev"
        location="Tóquio, Japão"
        avatarSrc={unvAvatars.caioDev}
        verified
        onMore={() => undefined}
      />
      <PostCard.Media
        src={unvPhotos.tokyo}
        alt="Cruzamento movimentado ao entardecer, com prédios iluminados"
        currentIndex={1}
        totalCount={3}
      />
      <PostCard.Actions liked currentIndex={1} totalCount={3} />
      <PostCard.Likes avatarSrc={unvAvatars.biaRaiz} username="bia.raiz" count={4686} />
      <PostCard.Caption username="caio_dev">
        Uma semana de viagem e mil fotos. Aqui vão as três favoritas.
      </PostCard.Caption>
      <PostCard.Timestamp>19 de setembro</PostCard.Timestamp>
    </PostCard>
    <PostCard>
      <PostCard.Header
        username="marina.luz"
        location="Lisboa, Portugal"
        avatarSrc={unvAvatars.marinaLuz}
        ring="story"
        onMore={() => undefined}
      />
      <PostCard.Media src={unvPhotos.coffee} alt="Café com desenho de coração e um croissant" />
      <PostCard.Actions saved />
      <PostCard.Caption username="marina.luz">Sábado devagar, com café e bom humor.</PostCard.Caption>
    </PostCard>
  </Tela>
);

/**
 * Explorar: busca em cápsula, categorias em rolagem horizontal e resultados
 * em cartões separados, cada um com o seu ritmo.
 */
const ExplorarTela: React.FC<{ onAba?: (id: string) => void }> = ({ onAba }) => {
  const [categoria, setCategoria] = useState(unvSearchCategories[0]);

  return (
    <Tela
      doca="search"
      onAba={onAba}
      topo={
        <TopBar
          withStatusBarInset={false}
          title="Explorar"
          trailing={<TopBar.Action icon="qrCode" label="Meu código" />}
        />
      }
    >
      <SearchField placeholder="Buscar pessoas, lugares e ideias" clearable />
      <div
        role="group"
        aria-label="Categorias"
        style={{
          display: 'flex',
          flexShrink: 0,
          gap: 'var(--unv-spacing-xs)',
          margin: '0 calc(var(--unv-gutter) * -1)',
          padding: '0 var(--unv-gutter)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {unvSearchCategories.map((nome) => (
          <Chip
            key={nome}
            selected={categoria === nome}
            onClick={() => setCategoria(nome)}
            leadingIcon={
              nome === 'Vídeos' ? <Icon name="longVideo" size="sm" tone="inherit" /> : undefined
            }
          >
            {nome}
          </Chip>
        ))}
      </div>
      <Cartao titulo="Em alta hoje">
        <MediaGrid items={unvGridItems.slice(0, 6)} ariaLabel="Em alta hoje" />
      </Cartao>
      <Cartao titulo="Pessoas para seguir" semRecuo>
        {[
          { id: 'theo.andrade', avatar: unvAvatars.theoAndrade },
          { id: 'paula.neves', avatar: unvAvatars.paulaNeves },
        ].map((pessoa, indice) => (
          <ListItem
            key={pessoa.id}
            leading={<Avatar src={pessoa.avatar} alt="" size={44} />}
            title={pessoa.id}
            subtitle="Sugestão para você"
            trailing={
              <Button size="sm" variant={indice === 0 ? 'primary' : 'secondary'}>
                {indice === 0 ? 'Seguir' : 'Seguindo'}
              </Button>
            }
          />
        ))}
      </Cartao>
      <Cartao titulo="Vídeos curtos">
        <MediaGrid
          columns={2}
          items={unvGridItems
            .slice(3, 7)
            .map((item, indice) => ({ ...item, id: `v${item.id}`, type: indice % 2 ? 'video' : 'image' }))}
          ariaLabel="Vídeos curtos"
        />
      </Cartao>
    </Tela>
  );
};

/**
 * Perfil: cabeçalho centralizado num cartão, destaques, e abas + grade com
 * respiro entre os blocos. O menu abre numa folha inferior.
 */
const PerfilTela: React.FC<{
  onAba?: (id: string) => void;
  menuInicialAberto?: boolean;
}> = ({ onAba, menuInicialAberto = false }) => {
  const [menu, setMenu] = useState(menuInicialAberto);
  const [aba, setAba] = useState('grid');

  const itensMenu: { icon: UnvIconName; label: string }[] = [
    { icon: 'archive', label: 'Arquivo' },
    { icon: 'activity', label: 'Sua atividade' },
    { icon: 'qrCode', label: 'Meu código' },
    { icon: 'closeFriends', label: 'Amigos próximos' },
    { icon: 'discover', label: 'Descobrir pessoas' },
    { icon: 'settings', label: 'Configurações' },
  ];

  return (
    <Tela
      doca="profile"
      onAba={onAba}
      topo={
        <TopBar
          withStatusBarInset={false}
          title={
            <>
              <Icon name="lock" size="sm" />
              lucas.mar
            </>
          }
          trailing={
            <>
              <TopBar.Action icon="add" label="Nova publicação" />
              <TopBar.Action icon="menu" label="Abrir o menu do perfil" onClick={() => setMenu(true)} />
            </>
          }
        />
      }
      sobreposicao={
        <BottomSheet open={menu} onOpenChange={setMenu} title="Menu">
          <div style={{ margin: '0 calc(var(--unv-gutter) * -1)' }}>
            {itensMenu.map((item) => (
              <ListItem
                key={item.label}
                size="sm"
                leading={<Icon name={item.icon} />}
                title={item.label}
                trailing={<Icon name="chevronDown" rotate={-90} tone="secondary" />}
                onClick={() => setMenu(false)}
              />
            ))}
          </div>
        </BottomSheet>
      }
    >
      <ProfileHeader
        avatarSrc={unvAvatars.lucasMar}
        avatarRing="story"
        name="Lucas Mar"
        verified
        bio={
          <>
            Designer de produtos digitais
            <br />
            Criando com a turma da{' '}
            <span style={{ color: 'var(--unv-color-text-link)' }}>@unooria</span>
          </>
        }
        stats={[
          { id: 'posts', value: '54', label: 'Publicações' },
          { id: 'followers', value: '834', label: 'Seguidores' },
          { id: 'following', value: '162', label: 'Seguindo' },
        ]}
        actions={
          <div style={{ display: 'flex', gap: 'var(--unv-spacing-xs)', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <Button block>Editar perfil</Button>
            </div>
            <div style={{ flex: 1 }}>
              <Button block variant="secondary">
                Compartilhar
              </Button>
            </div>
          </div>
        }
      />
      <Cartao titulo="Destaques">
        <StoriesTray items={unvHighlightItems} bordered={false} ariaLabel="Destaques" />
      </Cartao>
      <Cartao semRecuo>
        <SegmentedTabs
          variant="icon"
          ariaLabel="Seções do perfil"
          activeId={aba}
          onChange={setAba}
          items={[
            { id: 'grid', label: 'Publicações', icon: 'grid' },
            { id: 'video', label: 'Vídeos', icon: 'video' },
            { id: 'tagged', label: 'Marcadas', icon: 'tagged' },
          ]}
        />
        <div style={{ padding: 'var(--unv-spacing-xs)' }}>
          <MediaGrid items={unvGridItems} ariaLabel="Publicações de Lucas" />
        </div>
      </Cartao>
    </Tela>
  );
};

/**
 * Atividade: cada notificação é o seu próprio cartão, agrupadas por período
 * sob um rótulo.
 */
const GRUPOS_ATIVIDADE: {
  titulo: string;
  itens: {
    id: string;
    avatarSrc: string;
    avatarRing?: 'story';
    username: string;
    action: string;
    timestamp: string;
    thumbnailSrc?: string;
    thumbnailAlt?: string;
    unread?: boolean;
    seguir?: 'primary' | 'secondary';
  }[];
}[] = [
  {
    titulo: 'Novas',
    itens: [
      {
        id: 'marina.luz',
        avatarSrc: unvAvatars.marinaLuz,
        username: 'marina.luz',
        action: 'curtiu a sua publicação.',
        timestamp: '1 h',
        thumbnailSrc: unvPhotos.mountains,
        thumbnailAlt: 'Montanhas ao nascer do sol',
        unread: true,
      },
    ],
  },
  {
    titulo: 'Hoje',
    itens: [
      {
        id: 'davi.nogueira',
        avatarSrc: unvAvatars.daviNogueira,
        username: 'davi.nogueira, theo.andrade',
        action: 'e mais 26 pessoas curtiram a sua publicação.',
        timestamp: '3 h',
        thumbnailSrc: unvPhotos.forest,
        thumbnailAlt: 'Floresta de pinheiros',
      },
    ],
  },
  {
    titulo: 'Esta semana',
    itens: [
      {
        id: 'bia.raiz',
        avatarSrc: unvAvatars.biaRaiz,
        avatarRing: 'story',
        username: 'bia.raiz',
        action: 'mencionou você em um comentário.',
        timestamp: '2 d',
        thumbnailSrc: unvPhotos.city,
        thumbnailAlt: 'Cidade ao entardecer',
      },
      {
        id: 'rafa.rondon',
        avatarSrc: unvAvatars.rafaRondon,
        username: 'rafa.rondon',
        action: 'começou a seguir você.',
        timestamp: '3 d',
        seguir: 'secondary',
      },
      {
        id: 'paula.neves',
        avatarSrc: unvAvatars.paulaNeves,
        username: 'paula.neves',
        action: 'começou a seguir você.',
        timestamp: '3 d',
        seguir: 'primary',
      },
    ],
  },
];

const AtividadeTela: React.FC<{ onAba?: (id: string) => void }> = ({ onAba }) => {
  const [filtro, setFiltro] = useState('you');

  return (
    <Tela
      doca="activity"
      onAba={onAba}
      topo={
        <TopBar
          withStatusBarInset={false}
          title="Atividade"
          trailing={<TopBar.Action icon="settings" label="Preferências de aviso" />}
        />
      }
    >
      <SegmentedTabs
        ariaLabel="Filtro de atividade"
        activeId={filtro}
        onChange={setFiltro}
        items={[
          { id: 'you', label: 'Você' },
          { id: 'following', label: 'Seguindo' },
        ]}
      />
      {GRUPOS_ATIVIDADE.map((grupo) => (
        <React.Fragment key={grupo.titulo}>
          <Periodo>{grupo.titulo}</Periodo>
          <div style={pilha}>
            {grupo.itens.map((item) => (
              <NotificationItem
                key={item.id}
                avatarSrc={item.avatarSrc}
                avatarRing={item.avatarRing}
                username={item.username}
                action={item.action}
                timestamp={item.timestamp}
                thumbnailSrc={item.thumbnailSrc}
                thumbnailAlt={item.thumbnailAlt}
                unread={item.unread}
                trailing={
                  item.seguir ? (
                    <Button size="sm" variant={item.seguir}>
                      {item.seguir === 'primary' ? 'Seguir' : 'Mensagem'}
                    </Button>
                  ) : undefined
                }
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </Tela>
  );
};

/**
 * Mensagens: busca no topo, filtros em chips, conversas num cartão e o botão
 * flutuante de nova conversa.
 */
const NAO_LIDAS: Record<string, number> = { caio_dev: 2, 'marina.luz': 1 };

const MensagensTela: React.FC = () => {
  const [filtro, setFiltro] = useState('Todas');

  return (
    <Tela
      topo={
        <TopBar
          withStatusBarInset={false}
          leading={<TopBar.Action icon="back" label="Voltar" />}
          title="Mensagens"
          trailing={<TopBar.Action icon="more" label="Mais opções" />}
        />
      }
      sobreposicao={
        <FloatingButton icon="addChat" placement="bottom" offset={48}>
          Nova conversa
        </FloatingButton>
      }
    >
      <SearchField placeholder="Buscar conversas" />
      <div role="group" aria-label="Filtros" style={{ display: 'flex', gap: 'var(--unv-spacing-xs)', flexShrink: 0 }}>
        {['Todas', 'Não lidas', 'Grupos'].map((nome) => (
          <Chip key={nome} selected={filtro === nome} onClick={() => setFiltro(nome)}>
            {nome}
          </Chip>
        ))}
      </div>
      <Cartao semRecuo>
        {unvConversations.map((conversa, indice) => (
          <ListItem
            key={conversa.id}
            leading={<Avatar src={conversa.avatarSrc} alt="" size={56} ring={conversa.ring} />}
            title={conversa.username}
            subtitle={conversa.message}
            meta={conversa.time}
            trailing={
              NAO_LIDAS[conversa.id] ? (
                <Badge variant="counter" count={NAO_LIDAS[conversa.id]} />
              ) : undefined
            }
            bordered={indice < unvConversations.length - 1}
            onClick={() => undefined}
          />
        ))}
      </Cartao>
    </Tela>
  );
};

/**
 * Conversa aberta: cabeçalho em cartão, balões agrupados, enquete recebida e
 * compositor em cápsula.
 */
const ConversaTela: React.FC = () => (
  <DirectThread
    withStatusBarInset={false}
    username={unvThreadContact.username}
    avatarSrc={unvThreadContact.avatarSrc}
    subtitle={unvThreadContact.subtitle}
    onBack={() => undefined}
    footer={<TextField label="Mensagem" hideLabel placeholder="Escreva uma mensagem" />}
  >
    {unvThreadMessages.map((mensagem) => (
      <MessageBubble
        key={mensagem.id}
        direction={mensagem.direction}
        position={mensagem.position}
        avatarSrc={
          mensagem.direction === 'incoming' && mensagem.position === 'last'
            ? unvThreadContact.avatarSrc
            : undefined
        }
        senderLabel={mensagem.direction === 'incoming' ? 'Amara' : 'Você'}
      >
        {mensagem.text}
      </MessageBubble>
    ))}
    <MessageBubble
      direction="incoming"
      position="single"
      bare
      avatarSrc={unvThreadContact.avatarSrc}
      senderLabel="Amara"
    >
      <DmPoll question="O que mais pesou na sua escolha?" options={unvPollOptions} />
    </MessageBubble>
  </DirectThread>
);

/**
 * Visualizador de histórias: mídia em palco arredondado, progresso em
 * cápsulas, resposta na base e uma dica de gesto sobre a mídia.
 */
const HistoriaTela: React.FC = () => (
  <StoryViewer
    mediaSrc={unvStoryFrames.aurora}
    mediaAlt="Ilustração de uma aurora em tons de roxo"
    username="marina.luz"
    avatarSrc={unvAvatars.marinaLuz}
    timestamp="4 h"
    segments={5}
    currentSegment={3}
    segmentProgress={0.6}
    composerPlaceholder="Responder a marina.luz"
    onClose={() => undefined}
    onShare={() => undefined}
    onMore={() => undefined}
    onComposerClick={() => undefined}
  >
    <GestureHint gesture="swipe-up" />
  </StoryViewer>
);

/**
 * Compositor de história: prévia com as três publicações escolhidas e a
 * legenda num cartão com contador.
 */
const CompositorTela: React.FC = () => {
  const [legenda, setLegenda] = useState('');

  return (
    <StoryComposer
      value={legenda}
      onChange={(evento) => setLegenda(evento.target.value)}
      maxLength={120}
      minLength={10}
      placeholder="Por que essas três publicações?"
      avatarSrc={unvAvatars.lucasMar}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--unv-spacing-3xs)',
          height: '100%',
        }}
      >
        {unvGridItems.slice(0, 3).map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ))}
      </div>
    </StoryComposer>
  );
};

/**
 * Seleção de mídia: grade de quatro colunas com círculos numerados, faixa de
 * dica, aviso de limite no topo e botão flutuante de continuar.
 */
const LIMITE = 3;

const SelecaoTela: React.FC = () => {
  const [ids, setIds] = useState<string[]>(['3', '1']);
  const [aviso, setAviso] = useState(false);

  return (
    <Tela
      topo={
        <TopBar
          withStatusBarInset={false}
          leading={<TopBar.Action icon="close" label="Fechar" />}
          title="Nova história"
        />
      }
      sobreposicao={
        <>
          <FloatingButton placement="bottom" offset={48} disabled={ids.length === 0}>
            {`Continuar com ${ids.length}`}
          </FloatingButton>
          <Snackbar
            open={aviso}
            placement="top"
            offset={72}
            message={`Você já escolheu as ${LIMITE} publicações.`}
            onClose={() => setAviso(false)}
          />
        </>
      }
    >
      <InlineHint>{`Escolha até ${LIMITE} publicações, na ordem em que quer contar.`}</InlineHint>
      <Cartao>
        <MediaGrid
          columns={4}
          items={[
            ...unvPickerItems,
            ...unvPickerItems.map((item) => ({ ...item, id: `${item.id}-b` })),
          ]}
          ariaLabel="Recentes"
          selectable
          selectedIds={ids}
          onToggle={(item) =>
            setIds((atual) => {
              if (atual.includes(item.id)) return atual.filter((id) => id !== item.id);
              if (atual.length >= LIMITE) {
                setAviso(true);
                return atual;
              }
              return [...atual, item.id];
            })
          }
        />
      </Cartao>
    </Tela>
  );
};

/**
 * Entrada: logotipo grande alinhado à esquerda, campos num cartão e a
 * alternativa "outro serviço" abaixo de um divisor.
 */
const EntrarTela: React.FC = () => {
  const [usuario, setUsuario] = useState('lucas.mar');
  const [senha, setSenha] = useState('');

  return (
    <Tela>
      <div style={{ padding: 'var(--unv-spacing-xl) var(--unv-spacing-3xs) var(--unv-spacing-xs)' }}>
        <Logo height={40} />
        <h1
          style={{
            margin: 'var(--unv-spacing-xxl) 0 var(--unv-spacing-3xs)',
            color: 'var(--unv-color-text-primary)',
            ...tipo('heading-h3'),
          }}
        >
          Que bom te ver de novo
        </h1>
        <p style={{ margin: 0, color: 'var(--unv-color-text-secondary)', ...tipo('body-md') }}>
          Entre para ver o que a sua turma publicou.
        </p>
      </div>
      <Cartao>
        <form
          onSubmit={(evento) => evento.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--unv-spacing-m)' }}
        >
          <TextField
            label="Nome de usuário"
            placeholder="Nome de usuário"
            autoComplete="username"
            value={usuario}
            onChange={(evento) => setUsuario(evento.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            value={senha}
            onChange={(evento) => setSenha(evento.target.value)}
          />
          <Button type="submit" size="lg" block disabled={!usuario || !senha}>
            Entrar
          </Button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="button" variant="link">
              Esqueci a senha
            </Button>
          </div>
        </form>
      </Cartao>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--unv-spacing-m)' }}>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <Divider weight="solid" />
        </div>
        <span style={{ color: 'var(--unv-color-text-secondary)', ...tipo('label-md') }}>ou</span>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          <Divider weight="solid" />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="social"
          leadingIcon={<Icon name="external" size="sm" tone="inherit" />}
        >
          Continuar com outro serviço
        </Button>
      </div>
      <InlineHint>Nunca pedimos a sua senha por mensagem. Desconfie de quem pedir.</InlineHint>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--unv-spacing-3xs)',
          color: 'var(--unv-color-text-secondary)',
          ...tipo('body-md'),
        }}
      >
        Ainda não tem conta?
        <Button type="button" variant="link">
          Cadastre-se
        </Button>
      </div>
    </Tela>
  );
};

/* ==========================================================================
 * Catálogo
 * ========================================================================== */

interface TelaCatalogo {
  id: string;
  rotulo: string;
  composicao: string;
  render: () => React.ReactNode;
}

const TELAS: TelaCatalogo[] = [
  {
    id: 'feed',
    rotulo: 'Feed',
    composicao:
      'Logotipo à esquerda e ações circulares à direita, sem fio. As histórias vivem num cartão em camada, cada publicação é um cartão único com a pílula de ações sobre a base da mídia, e a doca flutua sobre a rolagem.',
    render: () => <FeedTela />,
  },
  {
    id: 'explorar',
    rotulo: 'Explorar',
    composicao:
      'Busca em cápsula, categorias em rolagem horizontal e resultados em cartões independentes: uma grade de três colunas, uma lista de pessoas e uma grade de duas colunas — cada bloco com o seu ritmo.',
    render: () => <ExplorarTela />,
  },
  {
    id: 'perfil',
    rotulo: 'Perfil',
    composicao:
      'Cabeçalho centralizado num cartão, com as estatísticas em três pílulas e as ações lado a lado em largura total. Destaques num cartão próprio; abas e grade com respiro entre os blocos.',
    render: () => <PerfilTela />,
  },
  {
    id: 'menu',
    rotulo: 'Menu do perfil',
    composicao:
      'O menu não é uma gaveta lateral: é uma folha inferior modal, com alça, título e seis linhas de ícone e rótulo. Na galeria ele começa fechado (o foco preso da folha rolaria a página); a estória "Menu do perfil" o abre.',
    render: () => <PerfilTela />,
  },
  {
    id: 'atividade',
    rotulo: 'Atividade',
    composicao:
      'Cada aviso é um cartão. Os cartões se agrupam por período sob um rótulo, e o que ainda não foi visto ganha um ponto e um nome acessível.',
    render: () => <AtividadeTela />,
  },
  {
    id: 'mensagens',
    rotulo: 'Mensagens',
    composicao:
      'Busca e filtros em chips no alto, conversas num cartão único com contador de não lidas, e um botão flutuante de nova conversa no lugar da barra inferior.',
    render: () => <MensagensTela />,
  },
  {
    id: 'conversa',
    rotulo: 'Conversa',
    composicao:
      'O cabeçalho é um cartão com voltar, avatar e estado; os balões se agrupam em sequência; a enquete chega como cartão da outra pessoa; o compositor é uma cápsula.',
    render: () => <ConversaTela />,
  },
  {
    id: 'historia',
    rotulo: 'Histórias',
    composicao:
      'A mídia ocupa um palco de cantos arredondados, o progresso são cápsulas, a resposta fica no chão da tela, sobre a camada lavanda, e a dica de gesto pulsa sobre a mídia.',
    render: () => <HistoriaTela />,
  },
  {
    id: 'compositor',
    rotulo: 'Compositor de história',
    composicao:
      'A prévia é um palco com as publicações escolhidas; a legenda mora num cartão com contador e a ação “Sua história” é uma cápsula de ação.',
    render: () => <CompositorTela />,
  },
  {
    id: 'selecao',
    rotulo: 'Seleção de mídia',
    composicao:
      'Grade de quatro colunas com círculos numerados, faixa de dica no alto, aviso passageiro de limite e o botão flutuante “Continuar” — sem barra de ação de largura total.',
    render: () => <SelecaoTela />,
  },
  {
    id: 'entrar',
    rotulo: 'Entrar',
    composicao:
      'Logotipo grande e alinhado à esquerda com uma saudação, campos num cartão, divisor “ou” e a alternativa de outro serviço em tom de link.',
    render: () => <EntrarTela />,
  },
];

const TEMAS: { id: Tema; rotulo: string }[] = [
  { id: 'light', rotulo: 'Tema claro' },
  { id: 'dark', rotulo: 'Tema escuro' },
];

/**
 * Um aparelho com legenda.
 */
const Aparelho: React.FC<{ tela: TelaCatalogo; tema: Tema; legenda?: string }> = ({
  tela,
  tema,
  legenda,
}) => (
  <figure style={{ margin: 0 }}>
    <PhoneFrame theme={tema} ariaLabel={`${tela.rotulo} · ${tema === 'light' ? 'tema claro' : 'tema escuro'}`}>
      {tela.render()}
    </PhoneFrame>
    <figcaption style={{ marginTop: 12, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
      {legenda ?? tela.rotulo}
    </figcaption>
  </figure>
);

/**
 * A tela nos dois temas, lado a lado, com a legenda da composição.
 */
const Par: React.FC<{ tela: TelaCatalogo }> = ({ tela }) => (
  <div style={{ display: 'grid', gap: 20, justifyItems: 'center' }}>
    <p style={{ margin: 0, maxWidth: 640, fontSize: 14, lineHeight: 1.6 }}>
      <strong>{tela.rotulo}.</strong> {tela.composicao}
    </p>
    <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      {TEMAS.map((tema) => (
        <Aparelho key={tema.id} tela={tela} tema={tema.id} legenda={tema.rotulo} />
      ))}
    </div>
  </div>
);

const porId = (id: string): TelaCatalogo => TELAS.find((tela) => tela.id === id) ?? TELAS[0];

/* ==========================================================================
 * Documentação
 * ========================================================================== */

const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Telas • Composição"
      title="Telas Compostas"
      description="Onze telas da rede social visual montadas só com os componentes reais de src/unoovista, nos temas claro e escuro. A composição é própria: camadas em vez de fios, cartões em vez de listas coladas, doca flutuante e folhas inferiores no lugar de barras e gavetas."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Para que servem as telas compostas dentro do design system."
    />
    <UnvDocGrid>
      <UnvDocCard icon="🧪" title="Teste de integração visual">
        Se um token muda, as onze telas mudam junto. Regressões de espaçamento, contraste ou de
        camada aparecem aqui antes de chegarem ao produto.
      </UnvDocCard>
      <UnvDocCard icon="🗂️" title="Composição em camadas">
        A tela é lavanda (claro) ou roxo profundo (escuro); o conteúdo vive em cartões de superfície
        primária; menus, folhas e a doca usam a superfície elevada.
      </UnvDocCard>
      <UnvDocCard icon="🌗" title="Prova dos dois temas">
        As mesmas composições rodam nos dois temas só pela troca de{' '}
        <code>data-unv-theme</code> no contêiner. Nenhum componente recebe <code>theme</code>.
      </UnvDocCard>
      <UnvDocCard icon="📚" title="Referência de montagem">
        Mostram como combinar barra superior, corpo rolável e doca dentro do PhoneFrame, com a folga
        inferior que a doca flutuante exige.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Escolhas de composição de cada tela, registradas como decisões."
    />
    <UnvDocDecisions
      items={[
        {
          subject: 'Esqueleto comum',
          detail:
            'Barra superior fixa, corpo rolável sobre background-secondary com recuo lateral de --unv-gutter e vão de --unv-spacing-m entre cartões, e a doca sobre a rolagem. O corpo reserva --unv-tabbar-height mais --unv-spacing-xxl embaixo para nenhum conteúdo ficar preso sob a doca. É um andaime local de stories/, não integra o pacote.',
        },
        {
          subject: 'Feed',
          detail:
            'Logotipo no lugar do título, à esquerda, e duas ações circulares à direita. As histórias moram num cartão (StoriesTray com bordas ligadas) e cada publicação é um cartão único, com a pílula de ações sobre a mídia. Sem faixa de largura total e sem fio.',
        },
        {
          subject: 'Explorar',
          detail:
            'A busca é uma cápsula com o código pessoal como ação circular na barra. As categorias rolam na horizontal, com a primeira selecionada, e vazam até a borda para sugerir continuidade. O resultado se divide em três cartões de ritmos distintos (grade de 3, lista de pessoas, grade de 2), em vez de uma grade única e colada.',
        },
        {
          subject: 'Perfil',
          detail:
            'Cabeçalho centralizado num cartão, com o anel de história no avatar (squircle), estatísticas em três pílulas e as duas ações em largura total. Destaques ganham um cartão próprio (StoriesTray sem bordas); abas de ícone e grade dividem outro, com respiro entre os blocos.',
        },
        {
          subject: 'Menu do perfil',
          detail:
            'Folha inferior modal em vez de gaveta lateral, aberta pela ação de menu da barra. Seis linhas com ícone e rótulo em pt-BR: Arquivo, Sua atividade, Meu código, Amigos próximos, Descobrir pessoas e Configurações. Na galeria a folha começa fechada, porque o foco preso da folha modal rola a página até ela.',
        },
        {
          subject: 'Atividade',
          detail:
            'Cada aviso é um cartão; os cartões se agrupam por período (Novas, Hoje, Esta semana) sob um rótulo local. O aviso não visto ganha o ponto e o nome acessível de unread. Duas abas de texto no alto filtram a lista.',
        },
        {
          subject: 'Mensagens',
          detail:
            'Busca e três chips de filtro no alto, conversas num cartão único com fio de 1px entre as linhas e contador de não lidas. A ação principal é o botão flutuante “Nova conversa”; a tela não tem doca, porque é um destino secundário com voltar na barra.',
        },
        {
          subject: 'Conversa',
          detail:
            'Cabeçalho num cartão (voltar, avatar, nome, estado), balões agrupados por sequência, enquete recebida como cartão da outra pessoa e compositor em cápsula. Nenhuma opção da enquete é “a certa”.',
        },
        {
          subject: 'Histórias e compositor',
          detail:
            'A mídia ocupa um palco de cantos inferiores arredondados e o progresso é uma fileira de cápsulas. A dica de gesto (deslizar para cima) é decorativa e se desliga com movimento reduzido. O compositor mostra as três publicações escolhidas como prévia e conta a legenda em caracteres.',
        },
        {
          subject: 'Seleção de mídia',
          detail:
            'Grade de quatro colunas com círculo numerado na ordem de escolha, faixa de dica no alto, botão flutuante “Continuar com n” e um aviso passageiro no topo quando a pessoa tenta passar do limite de três. Não há barra de ação de largura total.',
        },
        {
          subject: 'Entrar',
          detail:
            'Logotipo grande alinhado à esquerda com uma saudação, campos num cartão, divisor “ou” e a alternativa “Continuar com outro serviço” no tom de link, com o glifo à esquerda. O botão principal só habilita com usuário e senha preenchidos.',
        },
        {
          subject: 'Quem tem história é squircle',
          detail:
            'Avatares com anel e bolhas de história usam a forma de squircle; sem anel, o círculo. É uma pista não cromática para quem não distingue os gradientes de anel e de transmissão.',
        },
        {
          subject: 'Textos e dados',
          detail:
            'Tudo em pt-BR, com nomes fictícios e imagens SVG originais de public/unoovista/. Nenhuma tela usa cor, medida ou sombra fora dos tokens --unv-*.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de uma tela"
      description="As camadas que se repetem em todas as telas."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Camada de fundo',
          role: 'A superfície da tela: lavanda no claro, roxo profundo no escuro. Nada de fio de contorno.',
          token: '--unv-color-background-secondary',
        },
        {
          name: 'Barra superior',
          role: 'Título grande à esquerda (ou o logotipo) e ações circulares de 44px à direita; sem fio inferior.',
          token: 'TopBar · TopBar.Action',
        },
        {
          name: 'Cartões de conteúdo',
          role: 'Publicações, histórias, resultados, grupos de conversa e formulários, com cantos de 16px e vão de 12px entre si.',
          token: '--unv-color-background-primary · --unv-radius-l',
        },
        {
          name: 'Doca e folhas',
          role: 'A doca flutuante, o menu inferior, o botão flutuante e o aviso passageiro ficam sobre o conteúdo, na superfície elevada com a sombra de sobreposição.',
          token: '--unv-color-background-elevated · --unv-elevation-overlay',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Galeria completa"
      description="As onze telas em um tema por vez; alterne para conferir o outro."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {(tema) => (
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {TELAS.map((tela) => (
            <Aparelho key={tela.id} tela={tela} tema={tema} />
          ))}
        </div>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Boas práticas"
      description="Regras de composição de tela dentro do design system."
    />
    <UnvDocPractices
      dos={[
        'Montar as telas só com componentes de src/unoovista e andaimes de layout que usem tokens --unv-*.',
        'Herdar o tema do contêiner (data-unv-theme) em vez de passar theme a cada componente.',
        'Colocar a rolagem no corpo da tela e reservar a folga inferior para a doca flutuante.',
        'Agrupar conteúdo em cartões de superfície primária sobre a camada de fundo.',
        'Validar cada tela nos dois temas antes de considerá-la concluída.',
      ]}
      donts={[
        'Recriar um componente localmente para “ajustar” uma tela.',
        'Introduzir hexadecimais, sombras ou medidas fora dos tokens.',
        'Separar blocos com fios de largura total quando a mudança de superfície e o espaço bastam.',
        'Deixar o quadro inteiro rolar em vez do corpo, escondendo a barra superior e a doca.',
        'Abrir folhas modais em série numa galeria: o foco preso rola a página até a última.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="A tela de perfil, nos dois temas, ao vivo."
    />
    <UnvDocThemeSwitcher surface="secondary" padding={24}>
      {(tema) => (
        <PhoneFrame theme={tema} ariaLabel={`Perfil · ${tema === 'light' ? 'tema claro' : 'tema escuro'}`}>
          <PerfilTela />
        </PhoneFrame>
      )}
    </UnvDocThemeSwitcher>
  </UnooriaDocShell>
);

/* ==========================================================================
 * Estórias
 * ========================================================================== */

interface NavegadorArgs {
  tela: string;
  theme: Tema;
}

const meta: Meta<NavegadorArgs> = {
  title: 'Unoovista/Telas/Telas Compostas',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Onze telas do Unoovista montadas só com os componentes de produção, nos temas claro e escuro.',
      },
    },
  },
  argTypes: {
    tela: {
      control: 'select',
      options: TELAS.map((tela) => tela.id),
      description: 'Tela exibida no navegador.',
    },
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Tema aplicado ao aparelho (data-unv-theme).',
    },
  },
  args: { tela: 'feed', theme: 'light' },
};

export default meta;

type Story = StoryObj<NavegadorArgs>;

/**
 * Documentação rica e completa das telas compostas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * Navegador de telas: escolha a tela e o tema; a doca do feed, da busca, da
 * atividade e do perfil navega entre as quatro.
 */
const Navegador: React.FC<NavegadorArgs> = ({ tela, theme }) => {
  const [aba, setAba] = useState<string | null>(null);
  const [ultimaTela, setUltimaTela] = useState(tela);

  // Trocar a tela pelo controle descarta a navegação feita pela doca
  if (ultimaTela !== tela) {
    setUltimaTela(tela);
    setAba(null);
  }

  const destino: Record<string, string> = {
    feed: 'feed',
    search: 'explorar',
    activity: 'atividade',
    profile: 'perfil',
  };
  const idAtual = aba && destino[aba] ? destino[aba] : tela;
  const irPara = (id: string) => setAba(id);

  const conteudo = () => {
    switch (idAtual) {
      case 'feed':
        return <FeedTela onAba={irPara} />;
      case 'explorar':
        return <ExplorarTela onAba={irPara} />;
      case 'atividade':
        return <AtividadeTela onAba={irPara} />;
      case 'perfil':
        return <PerfilTela onAba={irPara} />;
      default:
        return porId(idAtual).render();
    }
  };

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <PhoneFrame key={idAtual} theme={theme} ariaLabel={porId(idAtual).rotulo}>
        {conteudo()}
      </PhoneFrame>
      <p style={{ margin: 0, maxWidth: 375, fontSize: 12, lineHeight: 1.5 }}>
        {porId(idAtual).composicao}
      </p>
    </div>
  );
};

export const NavegadorDeTelas: Story = {
  name: '🕹️ 1. Navegador de Telas',
  render: (args) => <Navegador {...args} />,
};

/**
 * Feed nos dois temas.
 */
export const Feed: Story = {
  name: '🎨 Feed',
  render: () => <Par tela={porId('feed')} />,
};

/**
 * Explorar nos dois temas.
 */
export const Explorar: Story = {
  name: '🎨 Explorar',
  render: () => <Par tela={porId('explorar')} />,
};

/**
 * Perfil nos dois temas.
 */
export const Perfil: Story = {
  name: '🎨 Perfil',
  render: () => <Par tela={porId('perfil')} />,
};

/**
 * O menu do perfil, aberto como folha inferior.
 */
export const MenuDoPerfil: Story = {
  name: '🎨 Menu do perfil',
  render: () => (
    <div style={{ display: 'grid', gap: 20, justifyItems: 'center' }}>
      <p style={{ margin: 0, maxWidth: 640, fontSize: 14, lineHeight: 1.6 }}>
        <strong>Menu do perfil.</strong> Folha inferior modal com
        alça, título e seis linhas de ícone e rótulo. O foco fica preso na folha; Esc ou o véu a
        fecham.
      </p>
      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
        {TEMAS.map((tema) => (
          <figure key={tema.id} style={{ margin: 0 }}>
            <PhoneFrame theme={tema.id} ariaLabel={`Menu do perfil · ${tema.rotulo.toLowerCase()}`}>
              <PerfilTela menuInicialAberto />
            </PhoneFrame>
            <figcaption style={{ marginTop: 12, fontSize: 12, fontWeight: 600, textAlign: 'center' }}>
              {tema.rotulo}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  ),
};

/**
 * Atividade nos dois temas.
 */
export const Atividade: Story = {
  name: '🎨 Atividade',
  render: () => <Par tela={porId('atividade')} />,
};

/**
 * Lista de conversas e conversa aberta.
 */
export const Mensagens: Story = {
  name: '🎨 Mensagens',
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <Par tela={porId('mensagens')} />
      <Par tela={porId('conversa')} />
    </div>
  ),
};

/**
 * Visualizador e compositor de histórias, e a seleção de mídia.
 */
export const Historias: Story = {
  name: '🎨 Histórias',
  render: () => (
    <div style={{ display: 'grid', gap: 48 }}>
      <Par tela={porId('historia')} />
      <Par tela={porId('compositor')} />
      <Par tela={porId('selecao')} />
    </div>
  ),
};

/**
 * Entrada nos dois temas.
 */
export const Entrar: Story = {
  name: '🎨 Entrar',
  render: () => <Par tela={porId('entrar')} />,
};
