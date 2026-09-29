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
  UncDocAnatomy,
  UncDocPractices,
  UncDocPropsTable,
  UncDocStage,
  UncDocThemeSwitcher,
} from '../../../.storybook/components';
import {
  Menu,
  TopBar,
  TabBar,
  StatusBar,
  ChatListItem,
  PhoneFrame,
} from '../../../src/unoochat';
import { uncChats, uncMenuItems, uncTabs } from '../fixtures';

const BAR = '#716C98';

/**
 * Largura de demonstração. Com Open Sans em 18px, os rótulos em português (como
 * "Mensagens favoritadas") não cabem nos 190px padrão do componente.
 */
const MENU_WIDTH = 240;

/** Itens do menu de uma conversa aberta. */
const CONVERSA_ITEMS = [
  { id: 'a', label: 'Dados do contato' },
  { id: 'b', label: 'Mídia, links e documentos' },
  { id: 'c', label: 'Buscar' },
];

/** Itens com um estado desabilitado. */
const ACOES_ITEMS = [
  { id: 'a', label: 'Silenciar' },
  { id: 'b', label: 'Arquivar', disabled: true },
  { id: 'c', label: 'Apagar' },
];

/**
 * Menu aberto sobre a lista de conversas, ancorado ao canto superior direito.
 */
const MenuOverChats: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <PhoneFrame caption="Menu de opções da lista de conversas">
      <StatusBar />
      {/* O menu abre logo abaixo da barra de status e cobre parte da barra
          superior; este contêiner posicionado delimita a área. */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar
          title="Unoochat"
          onMenu={() => setOpen((value) => !value)}
          footer={<TabBar items={uncTabs} activeId="chats" />}
        />
        <div style={{ flex: 1, overflow: 'hidden', background: 'var(--unc-color-surface-canvas)' }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {uncChats.slice(0, 8).map((chat) => (
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
        </div>
        {open && (
          <div style={{ position: 'absolute', top: 4, right: 6 }}>
            <Menu
              width={MENU_WIDTH}
              items={uncMenuItems}
              onSelect={() => setOpen(false)}
              onClose={() => setOpen(false)}
            />
          </div>
        )}
      </div>
    </PhoneFrame>
  );
};

/**
 * Página de documentação rica do componente Menu.
 */
const MenuDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Sobreposição"
      title="Menu"
      description="Menu suspenso da barra superior: painel em --unc-color-surface-elevated com itens de 44px de passo, recuo esquerdo de 24px e texto de Open Sans 18px em --unc-color-text-primary. Cantos retos, com a elevação de sobreposição do tema (--unc-elevation-overlay) para comunicar que está acima da tela."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="📋" title="Seis destinos">
        A barra superior abre Novo grupo, Nova transmissão, Aparelhos conectados, Mensagens
        favoritadas, Ajuda e Configurações — seis itens de mesma hierarquia, sem ícones nem
        separadores. O conteúdo vem de <code>uncMenuItems</code>.
      </UncDocCard>
      <UncDocCard icon="⬛" title="Cantos retos">
        O painel não tem raio de borda: a separação da tela vem da superfície elevada e da
        elevação de sobreposição.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Superfície elevada">
        <code>--unc-color-surface-elevated</code> é <code>#FFFFFF</code> no claro e{' '}
        <code>#57547D</code> no escuro (<code>brandpurple-700</code>), um degrau acima da app bar.
      </UncDocCard>
      <UncDocCard icon="♿" title="Semântica de menu">
        O contêiner é <code>role=&quot;menu&quot;</code> e cada item é{' '}
        <code>role=&quot;menuitem&quot;</code>; ESC dispara <code>onClose</code>, e ↑ ↓ Home End
        percorrem os itens habilitados.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="Menu"
      layout="Painel · 190px de largura padrão"
      specs={[
        { label: 'Largura padrão', value: '190 px (prop width)' },
        { label: 'Passo dos itens', value: '44 px' },
        { label: 'Recuo esquerdo', value: '24 px (--unc-gutter-appbar)' },
        { label: 'Padding vertical', value: '12 px (--unc-spacing-m)' },
        { label: 'Superfície', value: '--unc-color-surface-elevated' },
        { label: 'Item', value: 'Open Sans 400 · 18px · --unc-color-text-primary' },
        { label: 'Elevação', value: '--unc-elevation-overlay' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Elevação de sobreposição',
          detail:
            'o painel usa `--unc-elevation-overlay`, o mesmo degrau de diálogos, folhas, avisos e FABs: halo roxo no claro (`0 0 10px rgba(14,16,57,.3)`) e brilho branco a 10% no escuro (`0 0 8px 4px`), porque sombra escura não se lê sobre fundo escuro.',
        },
        {
          subject: 'Largura dos rótulos em português',
          detail:
            'os 190px padrão vêm do desenho original do módulo, com texto menor. Em Open Sans 18px, rótulos como "Mensagens favoritadas" excedem essa largura e não quebram linha; as demonstrações usam `width={240}`.',
        },
        {
          subject: 'Altura do painel',
          detail:
            'seis itens de 44px mais 12px de padding em cima e embaixo somam 288px; a altura é consequência do conteúdo, não fixada.',
        },
        {
          subject: 'Item desabilitado',
          detail:
            'o item com `disabled` cai para 50% de opacidade e é pulado na navegação por setas, mantendo o mesmo tratamento do FAB e do rótulo dos demais controles.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Painel', role: 'Painel de 190px (largura ajustável) sem raio, com a elevação de sobreposição.', token: '--unc-color-surface-elevated · --unc-elevation-overlay' },
        { name: 'Item', role: 'Linha de 44px com recuo esquerdo de 24px.', token: '--unc-font-subtitle-* (18px) · --unc-color-text-primary' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--unc-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Menu em contexto"
      description="Menu aberto sobre a lista de conversas, nos dois temas; toque no ícone de opções para alternar."
    />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="base"
        padding={20}
      >
        <MenuOverChats />
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Variações de largura e estados" />
    <UncDocStage surface="canvas" padding={24} gap={24} align="flex-start">
      <Menu width={MENU_WIDTH} items={uncMenuItems} />
      <Menu width={280} items={CONVERSA_ITEMS} />
      <Menu width={160} items={ACOES_ITEMS} />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Ancorar o menu ao canto superior direito, alinhado ao ícone que o abriu.',
        'Passar onClose para habilitar o fechamento por ESC.',
        'Fechar o menu ao escolher um item.',
        'Manter os rótulos em uma linha e ajustar width ao rótulo mais longo.',
      ]}
      donts={[
        'Arredondar os cantos do painel.',
        'Adicionar ícones aos itens: o menu lista apenas texto.',
        'Inserir separadores entre grupos de itens.',
        'Trocar --unc-elevation-overlay por sombras avulsas sob o menu.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: superfície, texto e elevação acompanham."
    />
    <UncDocThemeSwitcher surface="canvas">
      {() => <Menu width={MENU_WIDTH} items={uncMenuItems.slice(0, 4)} />}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="Menu"
      rows={[
        { name: 'items', type: 'UncMenuItemData[]', description: 'Itens exibidos no menu. Obrigatório.' },
        { name: 'onSelect', type: '(id: string) => void', description: 'Callback disparado ao escolher um item.' },
        { name: 'onClose', type: '() => void', description: 'Callback de ESC.' },
        { name: 'width', type: 'number', default: '190', description: 'Largura do menu em pixels.' },
        { name: 'label', type: 'string', default: "'Mais opções'", description: 'Rótulo acessível do menu.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UncDocPropsTable
      title="UncMenuItemData"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do item.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido.' },
        { name: 'disabled', type: 'boolean', description: 'Desabilita o item.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Menu> = {
  title: 'Unoochat/Componentes/Menu',
  component: Menu,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Itens exibidos no menu.' },
    width: { control: { type: 'range', min: 140, max: 320, step: 1 }, description: 'Largura em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
  },
  args: { items: uncMenuItems, width: MENU_WIDTH, label: 'Mais opções' },
};

export default meta;

type Story = StoryObj<typeof Menu>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MenuDocumentationPage />,
};

/**
 * Playground com 100% das props do Menu expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do Menu',
  render: (args) => (
    <UncDocStage surface="canvas" padding={24} align="flex-start">
      <Menu {...args} />
    </UncDocStage>
  ),
};

/**
 * Menu aberto sobre a lista de conversas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial: menu da lista de conversas',
  render: () => (
    <UncDocStage surface="base" padding={20}>
      <MenuOverChats />
    </UncDocStage>
  ),
};

/**
 * Variações de largura e item desabilitado.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={24} gap={24} align="flex-start">
      <Menu width={MENU_WIDTH} items={uncMenuItems} />
      <Menu width={280} items={CONVERSA_ITEMS} />
      <Menu width={160} items={ACOES_ITEMS} />
    </UncDocStage>
  ),
};
