import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  WaDocGrid,
  WaDocCard,
  WaDocFigmaSpecs,
  WaDocDeviations,
  WaDocPractices,
  WaDocStage,
  WaDocAnatomy,
  WaDocPropsTable,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
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
} from '../../../src/whatsappmobile';
import {
  waAttachmentActions,
  waAvatarJane,
  waAvatars,
  waCallPortrait,
  waCalls,
  waChats,
  waMenuItems,
  waSamplePhoto,
  waSearchFilters,
  waSettings,
  waStatusRecent,
  waStatusViewed,
  waTabs,
  waWallpaper,
} from '../fixtures';

const BAR = '#0CA996';

/**
 * Corpo do aparelho abaixo da barra de status.
 *
 * No arquivo, o véu do diálogo e o menu suspenso começam logo abaixo da barra
 * de status — nunca a cobrem. Este contêiner posicionado delimita essa área.
 */
const DeviceBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
    {children}
  </div>
);

/**
 * Área rolável de conteúdo dentro do aparelho.
 */
const Screen: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', flex: 1, overflow: 'hidden', background: 'var(--wa-color-surface-canvas)' }}>
    {children}
  </div>
);

/**
 * Tela "Chats Main Page" (node 1:2024).
 */
const ChatsMainPage: React.FC = () => (
  <PhoneFrame caption="Chats Main Page · node 1:2024">
    <StatusBar />
    <TopBar title="WhatsApp" footer={<TabBar items={waTabs} activeId="chats" />} />
    <Screen>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {waChats.map((chat) => (
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
 * Tela "Status Main Page" (node 1:2).
 */
const StatusMainPage: React.FC = () => (
  <PhoneFrame caption="Status Main Page · node 1:2">
    <StatusBar />
    <TopBar
      title="WhatsApp"
      footer={<TabBar items={waTabs} activeId="status" tone="accentStatus" />}
    />
    <Screen>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <StatusListItem
          state="own"
          name="My status"
          timestamp="Yesterday, 10:55 am"
          avatarSrc={waAvatars[0]}
          showMenu
        />
      </ul>
      <SectionLabel>Recent updates</SectionLabel>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {waStatusRecent.map((item) => (
          <StatusListItem
            key={item.id}
            name={item.name}
            timestamp={item.timestamp}
            avatarSrc={item.avatarSrc}
          />
        ))}
      </ul>
      <SectionLabel>Viewed updates</SectionLabel>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {waStatusViewed.map((item) => (
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
 * Tela "Calls Main Page" (node 1:402).
 */
const CallsMainPage: React.FC = () => (
  <PhoneFrame caption="Calls Main Page · node 1:402">
    <StatusBar />
    <TopBar title="WhatsApp" footer={<TabBar items={waTabs} activeId="calls" />} />
    <Screen>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[...waCalls, ...waCalls].slice(0, 9).map((call, index) => (
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
 * Tela "Direct Message" (node 1:2974).
 */
const DirectMessageScreen: React.FC = () => (
  <PhoneFrame caption="Direct Message · node 1:2974">
    <StatusBar height={22} />
    <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
    <ChatWallpaper src={waWallpaper}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
        <DateChip>TODAY</DateChip>
        <EncryptionNotice />
      </div>
    </ChatWallpaper>
    <MessageComposer focused />
  </PhoneFrame>
);

/**
 * Tela "Picture sent" (node 1:4043).
 */
const PictureSentScreen: React.FC = () => (
  <PhoneFrame caption="Picture sent · node 1:4043">
    <StatusBar height={22} />
    <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
    <ChatWallpaper src={waWallpaper}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
        <DateChip>TODAY</DateChip>
        <EncryptionNotice />
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', padding: '0 14px 12px' }}>
        <MessageBubble direction="out" time="9:03 am" delivery="read" maxWidth={250}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" ratio="4 / 3" />
        </MessageBubble>
      </div>
    </ChatWallpaper>
    <MessageComposer focused />
  </PhoneFrame>
);

/**
 * Tela "General settings" com o menu suspenso aberto (node 1:2173).
 */
const MenuScreen: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <PhoneFrame caption="General settings · node 1:2173">
      <StatusBar />
      <DeviceBody>
        <TopBar
          title="WhatsApp"
          onMenu={() => setOpen((value) => !value)}
          footer={<TabBar items={waTabs} activeId="chats" />}
        />
        <Screen>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {waChats.slice(0, 9).map((chat) => (
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
            <Menu items={waMenuItems} onSelect={() => setOpen(false)} onClose={() => setOpen(false)} />
          </div>
        )}
      </DeviceBody>
    </PhoneFrame>
  );
};

/**
 * Tela "Settings" (node 1:2691).
 */
const SettingsScreen: React.FC = () => (
  <PhoneFrame caption="Settings · node 1:2691">
    <StatusBar height={22} />
    <TopBar variant="page" title="Settings" showSearch={false} showMenu={false} />
    <Screen>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        <ListItem
          density="settings"
          divider={false}
          leading={<Avatar size="md" src={waAvatars[3]} alt="Blah blah" />}
          title={
            <span style={{ color: 'var(--wa-color-text-settings)', fontSize: 'var(--wa-font-body-lg-size)' }}>
              Blah blah
            </span>
          }
          subtitle={
            <span style={{ color: 'var(--wa-color-text-profile-status)', fontSize: 'var(--wa-font-body-lg-size)' }}>
              Hey there! I am using WhatsApp
            </span>
          }
          trailing={<Icon name="qrCode" size={22} tone="settingsQr" title="Meu código QR" />}
        />
        {waSettings.map((item) => (
          <SettingsItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            iconRotate={item.iconRotate}
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
          fontFamily: 'var(--wa-font-sans)',
        }}
      >
        <span style={{ color: 'var(--wa-color-text-footnote)', fontSize: 'var(--wa-font-label-sm-size)' }}>
          from
        </span>
        <span
          style={{
            color: 'var(--wa-color-text-brand)',
            fontFamily: 'var(--wa-font-brand)',
            fontSize: 'var(--wa-font-label-sm-size)',
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          FACEBOOK
        </span>
      </div>
    </Screen>
  </PhoneFrame>
);

/**
 * Tela "Starred messages" (node 1:2919).
 */
const StarredScreen: React.FC = () => (
  <PhoneFrame caption="Starred messages · node 1:2919">
    <StatusBar height={24} />
    <TopBar variant="page" title="Starred messages" showSearch={false} showMenu={false} />
    <div style={{ flex: 1, background: 'var(--wa-color-surface-base)', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 8px 6px',
          fontFamily: 'var(--wa-font-sans)',
        }}
      >
        <Avatar size="xs" src={waAvatars[7]} alt="John Doe" />
        <span style={{ color: 'var(--wa-color-text-starred)', fontSize: 'var(--wa-font-body-md-size)', flex: 1 }}>
          You ▸ John Doe
        </span>
        <span style={{ color: 'var(--wa-color-text-starred-date)', fontSize: 'var(--wa-font-caption-bold-size)' }}>
          16/02/2021
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px' }}>
        <MessageBubble direction="out" time="9:03 am" delivery="read" starred maxWidth={240} tail={false}>
          <MessageBubble.Media src={waSamplePhoto} alt="Fotografia enviada" />
          <MessageBubble.Document name="Bleh blah blue" details={['1090 pages', 'PDF']} />
        </MessageBubble>
        <Icon name="forward" size={22} tone="forward" title="Encaminhar" />
      </div>
    </div>
  </PhoneFrame>
);

/**
 * Tela "Search in chats" com chips de filtro (node 1:1916).
 */
const SearchScreen: React.FC = () => (
  <PhoneFrame caption="Search in chats · node 1:1916">
    <StatusBar />
    <SearchField />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        padding: '12px 19px',
        background: 'var(--wa-color-surface-appbar)',
      }}
    >
      {waSearchFilters.map((filter) => (
        <FilterChip key={filter.id} label={filter.label} />
      ))}
    </div>
    <Screen>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {waChats.slice(0, 9).map((chat, index) => (
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
 * Tela "Mute notif" com o diálogo modal aberto (node 1:3446).
 */
const MuteScreen: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [duration, setDuration] = useState('Always');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <PhoneFrame caption="Mute notif · node 1:3446">
      <StatusBar height={22} />
      <DeviceBody>
        <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
        <ChatWallpaper src={waWallpaper}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
            <DateChip>TODAY</DateChip>
            <EncryptionNotice />
          </div>
        </ChatWallpaper>
        <MessageComposer focused />
        {open && (
          <Dialog
            title="Mute notifications for..."
            onClose={() => setOpen(false)}
            footer={
              <Dialog.Footer
                actions={
                  <>
                    <TextButton onClick={() => setOpen(false)}>CANCEL</TextButton>
                    <TextButton onClick={() => setOpen(false)}>OK</TextButton>
                  </>
                }
              >
                <Checkbox
                  label="Show notifications"
                  checked={showNotifications}
                  onChange={(event) => setShowNotifications(event.target.checked)}
                />
              </Dialog.Footer>
            }
          >
            <div role="radiogroup" aria-label="Mute notifications for" style={{ display: 'grid' }}>
              {['8 hours', '1 week', 'Always'].map((option) => (
                <Radio
                  key={option}
                  name="wa-telas-mute"
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
 * Tela "Pin option" com a folha de anexos aberta (node 1:3943).
 */
const AttachmentScreen: React.FC = () => (
  <PhoneFrame caption="Pin option · node 1:3943">
    <StatusBar height={22} />
    <ChatHeader name="Jane Doe" avatarSrc={waAvatarJane} />
    <ChatWallpaper src={waWallpaper}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 12 }}>
        <DateChip>TODAY</DateChip>
        <EncryptionNotice />
      </div>
      <div style={{ marginTop: 'auto', padding: '0 12px 8px' }}>
        <AttachmentSheet actions={waAttachmentActions} />
      </div>
    </ChatWallpaper>
    <MessageComposer focused />
  </PhoneFrame>
);

/**
 * Tela "Voice call" (node 1:4595).
 */
const VoiceCallScreen: React.FC = () => (
  <PhoneFrame caption="Voice call · node 1:4595">
    <StatusBar variant="call" height={27} />
    <CallScreen name="John Doe" state="Calling" portraitSrc={waCallPortrait} />
  </PhoneFrame>
);

/**
 * Tela "Video Call" (node 1:4550).
 */
const VideoCallScreen: React.FC = () => (
  <PhoneFrame caption="Video Call · node 1:4550">
    <StatusBar variant="call" height={27} />
    <CallScreen name="John Doe" state="02:14" portraitSrc={waCallPortrait} mode="video" speakerOn />
  </PhoneFrame>
);

const SCREENS: { id: string; label: string; element: React.ReactNode }[] = [
  { id: 'chats', label: 'Chats Main Page', element: <ChatsMainPage /> },
  { id: 'status', label: 'Status Main Page', element: <StatusMainPage /> },
  { id: 'calls', label: 'Calls Main Page', element: <CallsMainPage /> },
  { id: 'menu', label: 'General settings', element: <MenuScreen /> },
  { id: 'dm', label: 'Direct Message', element: <DirectMessageScreen /> },
  { id: 'picture', label: 'Picture sent', element: <PictureSentScreen /> },
  { id: 'attachment', label: 'Pin option', element: <AttachmentScreen /> },
  { id: 'mute', label: 'Mute notif', element: <MuteScreen /> },
  { id: 'search', label: 'Search in chats', element: <SearchScreen /> },
  { id: 'starred', label: 'Starred messages', element: <StarredScreen /> },
  { id: 'settings', label: 'Settings', element: <SettingsScreen /> },
  { id: 'voice', label: 'Voice call', element: <VoiceCallScreen /> },
  { id: 'video', label: 'Video Call', element: <VideoCallScreen /> },
];

/**
 * Navegador de telas compostas.
 */
const ScreenBrowser: React.FC = () => {
  const [active, setActive] = useState('chats');
  const screen = SCREENS.find((item) => item.id === active) ?? SCREENS[0];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {SCREENS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
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
      <WaDocStage surface="base" padding={24}>
        {screen.element}
      </WaDocStage>
    </div>
  );
};

/**
 * Página de documentação rica das telas compostas.
 */
const TelasDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Telas • Composições"
      title="Telas Compostas"
      description="Treze telas do arquivo Figma reconstruídas exclusivamente com os componentes de produção de src/whatsappmobile. Nenhum mockup paralelo foi criado: cada tela é uma composição de StatusBar, TopBar, TabBar, listas, conversas, diálogos e telas de chamada, montada dentro do PhoneFrame nas medidas exatas de 411×823."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="O que estas composições demonstram."
    />
    <WaDocGrid>
      <WaDocCard icon="🧩" title="Somente componentes reais">
        Cada tela usa os componentes publicados no pacote. Se uma tela não pode ser montada sem
        código avulso, isso indica uma lacuna na biblioteca — e não uma exceção a ser mockada.
      </WaDocCard>
      <WaDocCard icon="📐" title="Medidas do arquivo">
        Todas as composições vivem em um <code>PhoneFrame</code> de 411×823, o que permite comparar
        lado a lado com o Dev Mode do Figma.
      </WaDocCard>
      <WaDocCard icon="🕹️" title="Telas interativas">
        O menu suspenso, o diálogo de silenciar e os controles da chamada funcionam de verdade: são
        os mesmos componentes com estado local.
      </WaDocCard>
      <WaDocCard icon="🔍" title="Rastreabilidade">
        A legenda de cada aparelho registra o nome e o node do frame reproduzido.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="0:1"
      frameName="Página Design"
      specs={[
        { label: 'File key', value: 'MSEV2CgXr84WwOyMauIBy2' },
        { label: 'Frames no arquivo', value: '75' },
        { label: 'Telas reconstruídas', value: String(SCREENS.length) },
        { label: 'Dimensão', value: '411 × 823 px' },
        { label: 'Componentes usados', value: '29' },
        { label: 'Mockups criados', value: '0' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Telas não reconstruídas',
          detail:
            'os frames de teclado, de captura de câmera e de editor de imagem dependem de superfícies claras de sistema (teclado do iOS) e de fotografias em tela cheia, sem componentes de design system associados. Foram deixados fora do escopo em vez de aproximados.',
        },
        {
          subject: 'Rolagem',
          detail:
            'os frames do Figma desenham listas mais longas que a altura do aparelho, transbordando o quadro. As composições recortam o conteúdo em overflow: hidden, mostrando a mesma primeira dobra.',
        },
        {
          subject: 'Starred messages · separador "You ▸ John Doe"',
          detail:
            'o arquivo desenha um pequeno losango azul entre os nomes, exportado como bitmap achatado. A composição usa o caractere ▸ em vez de desenhar um vetor novo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia de uma tela"
      description="Toda composição empilha as mesmas camadas, nesta ordem."
    />
    <WaDocAnatomy
      zones={[
        {
          name: 'PhoneFrame',
          role: 'Moldura de documentação de 411×823 que recorta a tela e registra o node do Figma.',
          token: '--wa-device-width · --wa-device-height',
        },
        {
          name: 'StatusBar',
          role: 'Moldura do sistema. Sempre o primeiro filho; nunca é coberta por véu ou menu.',
          token: '--wa-statusbar-height',
        },
        {
          name: 'Barra do aplicativo',
          role: 'TopBar (+ TabBar no rodapé), ChatHeader ou SearchField, conforme a tela.',
          token: '--wa-appbar-height · --wa-appbar-title-height · --wa-subappbar-height',
        },
        {
          name: 'Conteúdo',
          role: 'Lista, ChatWallpaper ou palco de chamada, ocupando o espaço restante com recorte.',
          token: '--wa-color-surface-canvas · --wa-color-surface-base',
        },
        {
          name: 'Rodapé',
          role: 'MessageComposer nas conversas e barra de controles nas chamadas.',
          token: '--wa-callbar-height',
        },
        {
          name: 'Sobreposições',
          role: 'Menu e Dialog, ancorados ao corpo abaixo da barra de status — como no arquivo.',
          token: '--wa-color-surface-elevated · --wa-color-scrim',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Navegador de telas"
      description="Escolha uma tela para ver a composição completa."
    />
    <ScreenBrowser />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Abas principais"
      description="As três abas da barra de navegação primária, lado a lado."
    />
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <ChatsMainPage />
      <StatusMainPage />
      <CallsMainPage />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Fluxo de conversa"
      description="Da conversa vazia ao anexo enviado, incluindo folha de anexos e diálogo."
    />
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <DirectMessageScreen />
      <PictureSentScreen />
      <AttachmentScreen />
      <MuteScreen />
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Busca, favoritas e configurações"
    />
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <SearchScreen />
      <StarredScreen />
      <SettingsScreen />
      <MenuScreen />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Chamadas" />
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <VoiceCallScreen />
      <VideoCallScreen />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="9. Boas práticas" />
    <WaDocPractices
      dos={[
        'Montar telas apenas com os componentes publicados em src/whatsappmobile.',
        'Registrar o node do frame reproduzido na legenda do PhoneFrame.',
        'Empilhar StatusBar, barra do aplicativo, conteúdo e rodapé nessa ordem.',
        'Tratar uma lacuna de composição como pedido de componente novo.',
      ]}
      donts={[
        'Criar réplicas artificiais em stories/ em vez de usar os componentes reais.',
        'Aproximar frames que dependem de recursos ausentes no arquivo.',
        'Alterar as medidas de 411×823 para acomodar conteúdo.',
        'Misturar tokens de outra marca dentro das composições.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="10. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne a superfície sob o aparelho."
    />
    <WaDocSurfaceSwitcher surfaces={['base', 'canvas']} initial="base">
      {() => <PhoneFrame scale={0.45} caption="Chats Main Page · node 1:2024">{<ChatsMainPage />}</PhoneFrame>}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="11. Referência completa das telas"
      description="Cada composição, o frame que reproduz e os componentes que a montam."
    />
    <WaDocPropsTable
      title="Telas reconstruídas"
      rows={[
        { name: 'Chats Main Page', type: 'node 1:2024', default: '13 componentes', description: 'StatusBar · TopBar · TabBar · ChatListItem · Fab · PhoneFrame' },
        { name: 'Status Main Page', type: 'node 1:2', default: '6 componentes', description: 'StatusBar · TopBar · TabBar · SectionLabel · StatusListItem · Fab' },
        { name: 'Calls Main Page', type: 'node 1:402', default: '5 componentes', description: 'StatusBar · TopBar · TabBar · CallListItem · Fab' },
        { name: 'General settings', type: 'node 1:2173', default: '5 componentes', description: 'StatusBar · TopBar · TabBar · ChatListItem · Menu' },
        { name: 'Direct Message', type: 'node 1:2974', default: '6 componentes', description: 'StatusBar · ChatHeader · ChatWallpaper · DateChip · EncryptionNotice · MessageComposer' },
        { name: 'Picture sent', type: 'node 1:4043', default: '7 componentes', description: 'os de Direct Message + MessageBubble.Media' },
        { name: 'Pin option', type: 'node 1:3943', default: '7 componentes', description: 'os de Direct Message + AttachmentSheet' },
        { name: 'Mute notif', type: 'node 1:3446', default: '10 componentes', description: 'os de Direct Message + Dialog · Radio · Checkbox · TextButton' },
        { name: 'Search in chats', type: 'node 1:1916', default: '4 componentes', description: 'StatusBar · SearchField · FilterChip · ChatListItem' },
        { name: 'Starred messages', type: 'node 1:2919', default: '5 componentes', description: 'StatusBar · TopBar · Avatar · MessageBubble (Media + Document) · Icon' },
        { name: 'Settings', type: 'node 1:2691', default: '5 componentes', description: 'StatusBar · TopBar · ListItem · SettingsItem · Icon' },
        { name: 'Voice call', type: 'node 1:4595', default: '2 componentes', description: 'StatusBar (variant="call") · CallScreen' },
        { name: 'Video Call', type: 'node 1:4550', default: '2 componentes', description: 'StatusBar (variant="call") · CallScreen (mode="video")' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta = {
  title: 'Whatsapp Mobile/Telas/Telas Compostas',
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj;

/**
 * Documentação rica e completa das telas compostas, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TelasDocumentationPage />,
};

/**
 * Navegador interativo de todas as telas reconstruídas.
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
 * As três abas principais lado a lado.
 */
export const AbasPrincipais: Story = {
  name: '🎨 Abas principais',
  render: () => (
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <ChatsMainPage />
      <StatusMainPage />
      <CallsMainPage />
    </WaDocStage>
  ),
};

/**
 * Fluxo completo de conversa.
 */
export const FluxoDeConversa: Story = {
  name: '🎨 Fluxo de conversa',
  render: () => (
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <DirectMessageScreen />
      <PictureSentScreen />
      <AttachmentScreen />
      <MuteScreen />
    </WaDocStage>
  ),
};

/**
 * Telas de chamada de voz e de vídeo.
 */
export const Chamadas: Story = {
  name: '🎨 Chamadas',
  render: () => (
    <WaDocStage surface="base" padding={24} gap={24} align="flex-start">
      <VoiceCallScreen />
      <VideoCallScreen />
    </WaDocStage>
  ),
};
