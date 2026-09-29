import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UncDocGrid,
  UncDocCard,
  UncDocSpecs,
  UncDocDecisions,
  UncDocPractices,
  UncDocAnatomy,
  UncDocPropsTable,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import type { UncDocTheme } from '../../../.storybook/components';
import {
  AttachmentSheet,
  Avatar,
  CallListItem,
  CallScreen,
  ChatHeader,
  ChatListItem,
  ChatWallpaper,
  Checkbox,
  DateChip,
  Dialog,
  EncryptionNotice,
  Fab,
  FilterChip,
  Icon,
  ListItem,
  Menu,
  MessageBubble,
  MessageComposer,
  PhoneFrame,
  Radio,
  SearchField,
  SectionLabel,
  SettingsItem,
  StatusBar,
  StatusListItem,
  TabBar,
  TextButton,
  TopBar,
} from '../../../src/unoochat';
import {
  uncAttachmentActions,
  uncAvatarPrincipal,
  uncAvatars,
  uncCallPortrait,
  uncCalls,
  uncChats,
  uncMenuItems,
  uncSamplePhoto,
  uncSearchFilters,
  uncSettings,
  uncStatusRecent,
  uncStatusViewed,
  uncTabs,
  uncWallpaperFor,
} from '../fixtures';

const BAR = '#716C98';

const ENCRYPTION_TEXT =
  'As mensagens e as chamadas são protegidas com criptografia de ponta a ponta. Ninguém de fora desta conversa, nem mesmo a Unooria, pode lê-las ou ouvi-las. Toque para saber mais.';

const CONTACT = 'Amara Lima';

interface ScreenProps {
  /** Tema aplicado ao aparelho (`data-unc-theme` no contêiner do PhoneFrame) */
  theme: UncDocTheme;
}

const listStyle: React.CSSProperties = { margin: 0, padding: 0, listStyle: 'none' };

/**
 * Corpo do aparelho abaixo da barra de status.
 *
 * O véu do diálogo e o menu suspenso começam logo abaixo da barra de status —
 * nunca a cobrem. Este contêiner posicionado delimita essa área.
 */
const DeviceBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    {children}
  </div>
);

/**
 * Área de conteúdo dentro do aparelho, com recorte da primeira dobra.
 */
const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', flex: 1, overflow: 'hidden', background: 'var(--unc-color-surface-canvas)' }}>
    {children}
  </div>
);

/**
 * Abertura padrão de uma conversa: etiqueta de data e aviso de criptografia.
 */
const ConversationOpening: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
    <DateChip>HOJE</DateChip>
    <EncryptionNotice>{ENCRYPTION_TEXT}</EncryptionNotice>
  </div>
);

/**
 * Aba Conversas.
 */
const ChatsScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Conversas">
    <StatusBar />
    <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="chats" />} />
    <Screen>
      <ul style={listStyle}>
        {uncChats.map((chat) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            time={chat.time}
            avatarSrc={chat.avatarSrc}
            unread={chat.unread}
            muted={chat.muted}
            compact={chat.compact}
          />
        ))}
      </ul>
      <div style={{ position: 'absolute', right: 32, bottom: 26 }}>
        <Fab variant="chat" label="Nova conversa" />
      </div>
    </Screen>
  </PhoneFrame>
);

/**
 * Aba Status.
 */
const StatusScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Status">
    <StatusBar />
    <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="status" />} />
    <Screen>
      <ul style={listStyle}>
        <StatusListItem
          state="own"
          name="Meu status"
          timestamp="Ontem, 10:55"
          avatarSrc={uncAvatars[0]}
          showMenu
        />
      </ul>
      <SectionLabel>Atualizações recentes</SectionLabel>
      <ul style={listStyle}>
        {uncStatusRecent.map((item) => (
          <StatusListItem
            key={item.id}
            name={item.name}
            timestamp={item.timestamp}
            avatarSrc={item.avatarSrc}
          />
        ))}
      </ul>
      <SectionLabel>Atualizações vistas</SectionLabel>
      <ul style={listStyle}>
        {uncStatusViewed.map((item) => (
          <StatusListItem
            key={item.id}
            state="viewed"
            name={item.name}
            timestamp={item.timestamp}
            avatarSrc={item.avatarSrc}
          />
        ))}
      </ul>
      <div style={{ position: 'absolute', right: 35, bottom: 92 }}>
        <Fab variant="edit" label="Escrever status" />
      </div>
      <div style={{ position: 'absolute', right: 29, bottom: 25 }}>
        <Fab variant="camera" label="Novo status" />
      </div>
    </Screen>
  </PhoneFrame>
);

/**
 * Aba Chamadas.
 */
const CallsScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Chamadas">
    <StatusBar />
    <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="calls" />} />
    <Screen>
      <ul style={listStyle}>
        {[...uncCalls, ...uncCalls].slice(0, 9).map((call, index) => (
          <CallListItem
            key={`${call.id}-${index}`}
            name={call.name}
            timestamp={call.timestamp}
            count={call.count}
            direction={call.direction}
            kind={call.kind}
            avatarSrc={call.avatarSrc}
          />
        ))}
      </ul>
      <div style={{ position: 'absolute', right: 28, bottom: 25 }}>
        <Fab variant="call" label="Nova chamada" />
      </div>
    </Screen>
  </PhoneFrame>
);

/**
 * Lista de conversas com o menu de opções suspenso aberto.
 */
const MenuScreen: React.FC<ScreenProps> = ({ theme }) => {
  const [open, setOpen] = useState(true);

  return (
    <PhoneFrame data-unc-theme={theme} caption="Menu de opções">
      <StatusBar />
      <DeviceBody>
        <TopBar
          title="Unoochat"
          onMenu={() => setOpen((value) => !value)}
          footer={<TabBar items={uncTabs} activeId="chats" />}
        />
        <Screen>
          <ul style={listStyle}>
            {uncChats.slice(0, 9).map((chat) => (
              <ChatListItem
                key={chat.id}
                name={chat.name}
                time={chat.time}
                avatarSrc={chat.avatarSrc}
                unread={chat.unread}
                muted={chat.muted}
              />
            ))}
          </ul>
        </Screen>
        {open && (
          <div style={{ position: 'absolute', top: 4, right: 6 }}>
            <Menu items={uncMenuItems} onSelect={() => setOpen(false)} onClose={() => setOpen(false)} />
          </div>
        )}
      </DeviceBody>
    </PhoneFrame>
  );
};

/**
 * Conversa recém-aberta, com o teclado em foco.
 */
const ConversationScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Conversa aberta">
    <StatusBar height={22} />
    <ChatHeader name={CONTACT} presence="online" avatarSrc={uncAvatarPrincipal} />
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <ConversationOpening />
    </ChatWallpaper>
    <MessageComposer focused placeholder="Digite uma mensagem" />
  </PhoneFrame>
);

/**
 * Conversa com uma fotografia enviada e lida.
 */
const PictureSentScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Foto enviada">
    <StatusBar height={22} />
    <ChatHeader name={CONTACT} presence="online" avatarSrc={uncAvatarPrincipal} />
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <ConversationOpening />
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', padding: '0 14px 12px' }}>
        <MessageBubble direction="out" time="09:03" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" ratio="4 / 3" />
        </MessageBubble>
      </div>
    </ChatWallpaper>
    <MessageComposer focused placeholder="Digite uma mensagem" />
  </PhoneFrame>
);

/**
 * Conversa com a folha de anexos aberta.
 */
const AttachmentScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Folha de anexos">
    <StatusBar height={22} />
    <ChatHeader name={CONTACT} presence="online" avatarSrc={uncAvatarPrincipal} />
    <ChatWallpaper src={uncWallpaperFor(theme)}>
      <ConversationOpening />
      <div style={{ marginTop: 'auto', padding: '0 12px 8px' }}>
        <AttachmentSheet actions={uncAttachmentActions} />
      </div>
    </ChatWallpaper>
    <MessageComposer focused placeholder="Digite uma mensagem" />
  </PhoneFrame>
);

/**
 * Conversa com o diálogo modal de silenciar notificações aberto.
 */
const MuteScreen: React.FC<ScreenProps> = ({ theme }) => {
  const [open, setOpen] = useState(true);
  const [duration, setDuration] = useState('Sempre');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <PhoneFrame data-unc-theme={theme} caption="Silenciar notificações">
      <StatusBar height={22} />
      <DeviceBody>
        <ChatHeader name={CONTACT} presence="online" avatarSrc={uncAvatarPrincipal} />
        <ChatWallpaper src={uncWallpaperFor(theme)}>
          <ConversationOpening />
        </ChatWallpaper>
        <MessageComposer focused placeholder="Digite uma mensagem" />
        {open && (
          <Dialog
            title="Silenciar notificações por..."
            onClose={() => setOpen(false)}
            footer={
              <Dialog.Footer
                actions={
                  <>
                    <TextButton onClick={() => setOpen(false)}>CANCELAR</TextButton>
                    <TextButton onClick={() => setOpen(false)}>OK</TextButton>
                  </>
                }
              >
                <Checkbox
                  label="Mostrar notificações"
                  checked={showNotifications}
                  onChange={(event) => setShowNotifications(event.target.checked)}
                />
              </Dialog.Footer>
            }
          >
            <div role="radiogroup" aria-label="Silenciar notificações por" style={{ display: 'grid' }}>
              {['8 horas', '1 semana', 'Sempre'].map((option) => (
                <Radio
                  key={option}
                  name="unc-telas-silenciar"
                  label={option}
                  checked={duration === option}
                  onChange={() => setDuration(option)}
                />
              ))}
            </div>
          </Dialog>
        )}
      </DeviceBody>
    </PhoneFrame>
  );
};

/**
 * Busca nas conversas, com chips de filtro por tipo de conteúdo.
 */
const SearchScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Busca nas conversas">
    <StatusBar />
    <SearchField placeholder="Buscar..." />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: '12px 19px',
        background: 'var(--unc-color-surface-appbar)',
      }}
    >
      {uncSearchFilters.map((filter) => (
        <FilterChip key={filter.id} label={filter.label} />
      ))}
    </div>
    <Screen>
      <ul style={listStyle}>
        {uncChats.slice(0, 9).map((chat, index) => (
          <ChatListItem
            key={chat.id}
            name={chat.name}
            time={chat.time}
            avatarSrc={chat.avatarSrc}
            unread={chat.unread}
            muted={chat.muted}
            pinned={index < 2}
          />
        ))}
      </ul>
    </Screen>
  </PhoneFrame>
);

/**
 * Lista de mensagens favoritadas.
 */
const StarredScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Mensagens favoritadas">
    <StatusBar height={24} />
    <TopBar variant="page" title="Mensagens favoritadas" showSearch={false} showMenu={false} />
    <div style={{ flex: 1, background: 'var(--unc-color-surface-base)', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 8px 6px',
          fontFamily: 'var(--unc-font-sans)',
        }}
      >
        <Avatar size="xs" src={uncAvatars[7]} alt="Helena Vaz" />
        <span style={{ color: 'var(--unc-color-text-primary)', fontSize: 'var(--unc-font-body-md-size)', flex: 1 }}>
          Você ▸ Helena Vaz
        </span>
        <span style={{ color: 'var(--unc-color-text-secondary)', fontSize: 'var(--unc-font-caption-bold-size)' }}>
          16/02/2026
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px' }}>
        <MessageBubble direction="out" time="09:03" delivery="read" starred maxWidth={240} tail={false}>
          <MessageBubble.Media src={uncSamplePhoto} alt="Fotografia enviada" />
          <MessageBubble.Document name="Regulamento do grêmio" details={['12 páginas', 'PDF']} />
        </MessageBubble>
        <Icon name="forward" size="lg" tone="appbar" title="Encaminhar" />
      </div>
    </div>
  </PhoneFrame>
);

/**
 * Configurações da conta, com perfil e atalhos por área.
 */
const SettingsScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Configurações">
    <StatusBar height={22} />
    <TopBar variant="page" title="Configurações" showSearch={false} showMenu={false} />
    <Screen>
      <ul style={listStyle}>
        <ListItem
          density="settings"
          divider={false}
          leading={<Avatar size="md" src={uncAvatars[3]} alt="Marina Coelho" />}
          title={
            <span style={{ color: 'var(--unc-color-text-primary)', fontSize: 'var(--unc-font-body-lg-size)' }}>
              Marina Coelho
            </span>
          }
          subtitle={
            <span style={{ color: 'var(--unc-color-text-secondary)', fontSize: 'var(--unc-font-body-lg-size)' }}>
              Olá! Estou usando o Unoochat.
            </span>
          }
          trailing={<Icon name="qrCode" size="lg" tone="appbar" title="Meu código QR" />}
        />
        {uncSettings.map((item) => (
          <SettingsItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </ul>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          paddingTop: 20,
          fontFamily: 'var(--unc-font-sans)',
        }}
      >
        <span style={{ color: 'var(--unc-color-text-secondary)', fontSize: 'var(--unc-font-label-sm-size)' }}>
          da
        </span>
        <span
          style={{
            color: 'var(--unc-color-text-secondary)',
            fontSize: 'var(--unc-font-label-sm-size)',
            fontWeight: 700,
          }}
        >
          UNOORIA
        </span>
      </div>
    </Screen>
  </PhoneFrame>
);

/**
 * Chamada de voz.
 */
const VoiceCallScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Chamada de voz">
    <StatusBar variant="call" height={27} />
    <CallScreen
      name="Bruno Reis"
      state="Chamando"
      encryptionLabel="Criptografia de ponta a ponta"
      portraitSrc={uncCallPortrait}
    />
  </PhoneFrame>
);

/**
 * Chamada de vídeo em andamento.
 */
const VideoCallScreen: React.FC<ScreenProps> = ({ theme }) => (
  <PhoneFrame data-unc-theme={theme} caption="Chamada de vídeo">
    <StatusBar variant="call" height={27} />
    <CallScreen
      name="Bruno Reis"
      state="02:14"
      encryptionLabel="Criptografia de ponta a ponta"
      portraitSrc={uncCallPortrait}
      mode="video"
      speakerOn
    />
  </PhoneFrame>
);

interface ScreenDefinition {
  id: string;
  label: string;
  Component: React.FC<ScreenProps>;
}

const SCREENS: ScreenDefinition[] = [
  { id: 'chats', label: 'Conversas', Component: ChatsScreen },
  { id: 'status', label: 'Status', Component: StatusScreen },
  { id: 'calls', label: 'Chamadas', Component: CallsScreen },
  { id: 'menu', label: 'Menu de opções', Component: MenuScreen },
  { id: 'conversation', label: 'Conversa aberta', Component: ConversationScreen },
  { id: 'picture', label: 'Foto enviada', Component: PictureSentScreen },
  { id: 'attachment', label: 'Folha de anexos', Component: AttachmentScreen },
  { id: 'mute', label: 'Silenciar notificações', Component: MuteScreen },
  { id: 'search', label: 'Busca nas conversas', Component: SearchScreen },
  { id: 'starred', label: 'Mensagens favoritadas', Component: StarredScreen },
  { id: 'settings', label: 'Configurações', Component: SettingsScreen },
  { id: 'voice', label: 'Chamada de voz', Component: VoiceCallScreen },
  { id: 'video', label: 'Chamada de vídeo', Component: VideoCallScreen },
];

const renderScreens = (ids: string[], theme: UncDocTheme) =>
  ids.map((id) => {
    const definition = SCREENS.find((item) => item.id === id);
    return definition ? <definition.Component key={id} theme={theme} /> : null;
  });

/**
 * Galeria de telas lado a lado, com alternador claro/escuro.
 */
const ScreenGallery: React.FC<{ ids: string[]; initial?: UncDocTheme }> = ({ ids, initial }) => (
  <UncDocThemeSwitcher surface="base" initial={initial}>
    {(theme) => <>{renderScreens(ids, theme)}</>}
  </UncDocThemeSwitcher>
);

/**
 * Navegador de telas: escolha uma tela e alterne o tema.
 */
const ScreenBrowserContent: React.FC<{ theme: UncDocTheme }> = ({ theme }) => {
  const [active, setActive] = useState('chats');
  const screen = SCREENS.find((item) => item.id === active) ?? SCREENS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {SCREENS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            aria-pressed={active === item.id}
            style={{
              padding: '6px 14px',
              borderRadius: 999,
              border: `1px solid ${active === item.id ? '#22272A' : '#E4E8E9'}`,
              backgroundColor: active === item.id ? '#22272A' : '#FFFFFF',
              color: active === item.id ? '#FFFFFF' : '#475157',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <screen.Component theme={theme} />
    </div>
  );
};

const ScreenBrowser: React.FC = () => (
  <UncDocThemeSwitcher surface="base">
    {(theme) => <ScreenBrowserContent theme={theme} />}
  </UncDocThemeSwitcher>
);

const TABS = ['chats', 'status', 'calls'];
const CONVERSATION_FLOW = ['conversation', 'picture', 'attachment', 'mute'];
const SEARCH_AND_SETTINGS = ['search', 'starred', 'settings', 'menu'];
const CALLS = ['voice', 'video'];

/**
 * Página de documentação rica das telas compostas.
 */
const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Telas • Composições"
      title="Telas Compostas"
      description="Treze telas do cliente de mensagens da Unooria montadas exclusivamente com os componentes de produção de src/unoochat. Nenhum mockup paralelo foi criado: cada tela é uma composição de StatusBar, TopBar, TabBar, listas, conversas, diálogos e telas de chamada dentro do PhoneFrame, e todas podem ser vistas nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que estas composições demonstram."
    />
    <UncDocGrid>
      <UncDocCard icon="🧩" title="Somente componentes reais">
        Cada tela usa os componentes publicados no pacote. Se uma tela não pode ser montada sem
        código avulso, isso indica uma lacuna na biblioteca — e não uma exceção a ser mockada.
      </UncDocCard>
      <UncDocCard icon="🌗" title="Dois temas de verdade">
        O contêiner do aparelho recebe <code>data-unc-theme</code> e todos os tokens acompanham,
        inclusive a textura de fundo da conversa, que tem um ladrilho por tema.
      </UncDocCard>
      <UncDocCard icon="🕹️" title="Telas interativas">
        O menu suspenso, o diálogo de silenciar e a folha de anexos funcionam de verdade: são os
        mesmos componentes, com estado local.
      </UncDocCard>
      <UncDocCard icon="📱" title="Conteúdo em pt-BR">
        Nomes, prazos e textos vêm dos fixtures compartilhados de <code>stories/unoochat</code>, e as
        imagens são ilustrações geradas em <code>public/unoochat</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="PhoneFrame"
      layout="Aparelho · 411 × 823 px"
      specs={[
        { label: 'Telas montadas', value: String(SCREENS.length) },
        { label: 'Dimensão do aparelho', value: '411 × 823 px' },
        { label: 'Temas', value: 'claro · escuro' },
        { label: 'Atributo de tema', value: 'data-unc-theme' },
        { label: 'Componentes usados', value: '29' },
        { label: 'Mockups criados', value: '0' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Tema no aparelho',
          detail:
            'o PhoneFrame repassa atributos ao contêiner, então cada tela recebe data-unc-theme diretamente. O mesmo atributo vale para o palco ao redor, o que mantém a legenda legível nos dois temas.',
        },
        {
          subject: 'Fundo da conversa',
          detail:
            'o ChatWallpaper recebe o ladrilho do tema ativo (uncWallpaperFor), um SVG de 320px que se repete.',
        },
        {
          subject: 'Telas de chamada',
          detail:
            'a tela de chamada, a barra de status em variant="call" e o botão de encerrar não mudam entre os temas: são superfícies invariantes do módulo.',
        },
        {
          subject: 'Rolagem',
          detail:
            'as listas são mais longas que a altura do aparelho. As composições recortam o conteúdo com overflow: hidden e mostram a primeira dobra.',
        },
        {
          subject: 'Separador "Você ▸ Helena Vaz"',
          detail:
            'nas mensagens favoritadas o separador entre os nomes é o caractere ▸, em vez de um vetor desenhado à mão.',
        },
        {
          subject: 'Rodapé das configurações',
          detail: 'assinatura "da UNOORIA" em texto secundário, sem logotipo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de uma tela"
      description="Toda composição empilha as mesmas camadas, nesta ordem."
    />
    <UncDocAnatomy
      zones={[
        {
          name: 'PhoneFrame',
          role: 'Moldura de documentação de 411×823 que recorta a tela e recebe o atributo de tema.',
          token: '--unc-device-width · --unc-device-height',
        },
        {
          name: 'StatusBar',
          role: 'Moldura do sistema. Sempre o primeiro filho; nunca é coberta por véu ou menu.',
          token: '--unc-statusbar-height',
        },
        {
          name: 'Barra do aplicativo',
          role: 'TopBar (+ TabBar no rodapé), ChatHeader ou SearchField, conforme a tela.',
          token: '--unc-appbar-height · --unc-appbar-title-height · --unc-subappbar-height',
        },
        {
          name: 'Conteúdo',
          role: 'Lista, ChatWallpaper ou palco de chamada, ocupando o espaço restante com recorte.',
          token: '--unc-color-surface-canvas · --unc-color-surface-base',
        },
        {
          name: 'Rodapé',
          role: 'MessageComposer nas conversas e barra de controles nas chamadas.',
          token: '--unc-callbar-height',
        },
        {
          name: 'Sobreposições',
          role: 'Menu e Dialog, ancorados ao corpo abaixo da barra de status.',
          token: '--unc-color-surface-elevated · --unc-color-scrim',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Navegador de telas"
      description="Escolha uma tela e alterne entre os temas claro e escuro."
    />
    <ScreenBrowser />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Abas principais"
      description="Conversas, Status e Chamadas: as três abas da navegação primária, lado a lado."
    />
    <ScreenGallery ids={TABS} />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Fluxo de conversa"
      description="Da conversa vazia ao anexo enviado, incluindo folha de anexos e diálogo."
    />
    <ScreenGallery ids={CONVERSATION_FLOW} initial="dark" />

    <UnooriaDocSectionHeader barColor={BAR} title="7. Busca, favoritas e configurações" />
    <ScreenGallery ids={SEARCH_AND_SETTINGS} />

    <UnooriaDocSectionHeader barColor={BAR} title="8. Chamadas" />
    <ScreenGallery ids={CALLS} />

    <UnooriaDocSectionHeader barColor={BAR} title="9. Boas práticas" />
    <UncDocPractices
      dos={[
        'Montar telas apenas com os componentes publicados em src/unoochat.',
        'Aplicar data-unc-theme no contêiner do aparelho e passar o ladrilho do tema ao ChatWallpaper.',
        'Empilhar StatusBar, barra do aplicativo, conteúdo e rodapé nessa ordem.',
        'Tratar uma lacuna de composição como pedido de componente novo.',
      ]}
      donts={[
        'Criar réplicas artificiais em stories/ em vez de usar os componentes reais.',
        'Fixar cores de superfície na composição: elas precisam vir dos tokens --unc-*.',
        'Alterar as medidas de 411×823 para acomodar conteúdo.',
        'Misturar tokens de outra marca dentro das composições.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="10. Suporte a temas"
      description="A mesma tela nos dois temas: alterne para ver superfícies, texto, ícones e textura de fundo mudarem juntos."
    />
    <UncDocThemeSwitcher surface="base">
      {(theme) => <ChatsScreen theme={theme} />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="11. Referência completa das telas"
      description="Cada composição e os componentes que a montam."
    />
    <UncDocPropsTable
      title="Telas montadas"
      rows={[
        { name: 'Conversas', type: 'aba', default: '6 componentes', description: 'StatusBar · TopBar · TabBar · ChatListItem · Fab · PhoneFrame' },
        { name: 'Status', type: 'aba', default: '6 componentes', description: 'StatusBar · TopBar · TabBar · SectionLabel · StatusListItem · Fab' },
        { name: 'Chamadas', type: 'aba', default: '5 componentes', description: 'StatusBar · TopBar · TabBar · CallListItem · Fab' },
        { name: 'Menu de opções', type: 'sobreposição', default: '5 componentes', description: 'StatusBar · TopBar · TabBar · ChatListItem · Menu' },
        { name: 'Conversa aberta', type: 'conversa', default: '6 componentes', description: 'StatusBar · ChatHeader · ChatWallpaper · DateChip · EncryptionNotice · MessageComposer' },
        { name: 'Foto enviada', type: 'conversa', default: '7 componentes', description: 'os da conversa aberta + MessageBubble.Media' },
        { name: 'Folha de anexos', type: 'conversa', default: '7 componentes', description: 'os da conversa aberta + AttachmentSheet' },
        { name: 'Silenciar notificações', type: 'conversa', default: '10 componentes', description: 'os da conversa aberta + Dialog · Radio · Checkbox · TextButton' },
        { name: 'Busca nas conversas', type: 'busca', default: '4 componentes', description: 'StatusBar · SearchField · FilterChip · ChatListItem' },
        { name: 'Mensagens favoritadas', type: 'lista', default: '5 componentes', description: 'StatusBar · TopBar · Avatar · MessageBubble (Media + Document) · Icon' },
        { name: 'Configurações', type: 'lista', default: '5 componentes', description: 'StatusBar · TopBar · ListItem · SettingsItem · Icon' },
        { name: 'Chamada de voz', type: 'chamada', default: '2 componentes', description: 'StatusBar (variant="call") · CallScreen' },
        { name: 'Chamada de vídeo', type: 'chamada', default: '2 componentes', description: 'StatusBar (variant="call") · CallScreen (mode="video")' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Unoochat/Telas/Telas Compostas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das telas compostas.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * Navegador interativo de todas as telas, com alternador de tema.
 */
export const Navegador: Story = {
  name: '🕹️ Navegador de telas',
  render: () => (
    <UnooriaDocShell>
      <UnooriaDocSectionHeader barColor={BAR} title="Navegador de telas" />
      <ScreenBrowser />
    </UnooriaDocShell>
  ),
};

/**
 * As treze telas lado a lado, no tema escolhido.
 */
export const TodasAsTelas: Story = {
  name: '🎨 Todas as telas',
  render: () => <ScreenGallery ids={SCREENS.map((item) => item.id)} />,
};

const telaUnica = (id: string): Story => {
  const definition = SCREENS.find((item) => item.id === id);
  return {
    name: `🎨 ${definition?.label ?? id}`,
    render: () => <ScreenGallery ids={[id]} />,
  };
};

/** Aba Conversas, com alternador de tema. */
export const Conversas: Story = telaUnica('chats');

/** Aba Status, com alternador de tema. */
export const Status: Story = telaUnica('status');

/** Aba Chamadas, com alternador de tema. */
export const AbaChamadas: Story = telaUnica('calls');

/** Lista de conversas com o menu de opções aberto. */
export const MenuDeOpcoes: Story = telaUnica('menu');

/** Conversa recém-aberta. */
export const ConversaAberta: Story = telaUnica('conversation');

/** Conversa com fotografia enviada. */
export const FotoEnviada: Story = telaUnica('picture');

/** Conversa com a folha de anexos aberta. */
export const FolhaDeAnexos: Story = telaUnica('attachment');

/** Conversa com o diálogo de silenciar notificações. */
export const SilenciarNotificacoes: Story = telaUnica('mute');

/** Busca nas conversas com filtros. */
export const BuscaNasConversas: Story = telaUnica('search');

/** Mensagens favoritadas. */
export const MensagensFavoritadas: Story = telaUnica('starred');

/** Configurações da conta. */
export const Configuracoes: Story = telaUnica('settings');

/** Chamada de voz. */
export const ChamadaDeVoz: Story = telaUnica('voice');

/** Chamada de vídeo. */
export const ChamadaDeVideo: Story = telaUnica('video');
