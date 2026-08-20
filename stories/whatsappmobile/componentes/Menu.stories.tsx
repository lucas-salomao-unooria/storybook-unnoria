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
  WaDocAnatomy,
  WaDocPractices,
  WaDocPropsTable,
  WaDocStage,
  WaDocSurfaceSwitcher,
} from '../../../.storybook/components';
import {
  Menu,
  TopBar,
  TabBar,
  StatusBar,
  ChatListItem,
  PhoneFrame,
} from '../../../src/whatsappmobile';
import { waChats, waMenuItems, waTabs } from '../fixtures';

const BAR = '#0CA996';

/**
 * Réplica do frame "General settings": menu aberto sobre a lista de conversas.
 */
const MenuOverChats: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <PhoneFrame caption="General settings · node 1:2277">
      <StatusBar />
      {/* No arquivo o menu abre logo abaixo da barra de status (y=25) e cobre
          parte da barra superior; este contêiner posicionado delimita a área. */}
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
          title="WhatsApp"
          onMenu={() => setOpen((value) => !value)}
          footer={<TabBar items={waTabs} activeId="chats" />}
        />
        <div style={{ flex: 1, overflow: 'hidden', background: 'var(--wa-color-surface-canvas)' }}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {waChats.slice(0, 8).map((chat) => (
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
            <Menu items={waMenuItems} onSelect={() => setOpen(false)} onClose={() => setOpen(false)} />
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
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Sobreposição"
      title="Menu"
      description="Menu suspenso da barra superior. Reproduz o retângulo de 190px em --wa-color-surface-elevated com itens de 44px de passo, recuo esquerdo de 24px e texto de PT Sans 19px em --wa-color-text-menu. Sem raio de borda e sem sombra, exatamente como no arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="📋" title="Seis destinos">
        O arquivo lista New group, New broadcast, WhatsApp Web, Starred messages, Payments e
        Settings — seis itens de mesma hierarquia, sem ícones nem separadores.
      </WaDocCard>
      <WaDocCard icon="⬛" title="Cantos retos">
        O retângulo do menu não tem raio no arquivo. Arredondá-lo seria um desvio visível.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Superfície elevada">
        <code>--wa-color-surface-elevated</code> (#313C42) é um degrau acima da app bar,
        comunicando sobreposição sem sombra.
      </WaDocCard>
      <WaDocCard icon="♿" title="Semântica de menu">
        O contêiner é <code>role=&quot;menu&quot;</code> e cada item é{' '}
        <code>role=&quot;menuitem&quot;</code>; ESC dispara <code>onClose</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2277"
      frameName="General settings · Group 228"
      specs={[
        { label: 'Largura', value: '190 px' },
        { label: 'Altura', value: '269 px' },
        { label: 'Superfície', value: '#313C42' },
        { label: 'Item', value: 'PT Sans 400 · 19px · #F9FFFF' },
        { label: 'Passo dos itens', value: '44 px' },
        { label: 'Recuo esquerdo', value: '24 px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Espaçamento vertical',
          detail:
            'o arquivo posiciona o primeiro item 11px abaixo do topo do retângulo. O componente usa 12px de padding vertical, o valor da escala mais próximo, mantendo os 269px de altura total para seis itens.',
        },
        {
          subject: 'Ausência de sombra',
          detail:
            'nenhuma sombra é desenhada sob o menu. Introduzir uma para reforçar a sobreposição seria um desvio; a separação vem da luminância.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Painel', role: 'Retângulo de 190px sem raio.', token: '--wa-color-surface-elevated' },
        { name: 'Item', role: 'Linha de 44px com recuo esquerdo de 24px.', token: '--wa-font-subtitle-* · --wa-color-text-menu' },
        { name: 'Anel de foco', role: 'Contorno visível na navegação por teclado.', token: '--wa-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Réplica do frame oficial"
      description="Menu aberto sobre a lista de conversas; toque no ícone de opções para alternar."
    />
    <WaDocStage surface="base" padding={20}>
      <MenuOverChats />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Variações de largura e estados" />
    <WaDocStage surface="canvas" padding={24} gap={24} align="flex-start">
      <Menu items={waMenuItems} />
      <Menu width={230} items={[{ id: 'a', label: 'Contact info' }, { id: 'b', label: 'Media, links, and docs' }, { id: 'c', label: 'Search' }]} />
      <Menu
        width={160}
        items={[
          { id: 'a', label: 'Mute' },
          { id: 'b', label: 'Archive', disabled: true },
          { id: 'c', label: 'Delete' },
        ]}
      />
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Ancorar o menu ao canto superior direito, alinhado ao ícone que o abriu.',
        'Passar onClose para habilitar o fechamento por ESC.',
        'Fechar o menu ao escolher um item.',
        'Manter os rótulos em uma linha, como no arquivo.',
      ]}
      donts={[
        'Arredondar os cantos do painel.',
        'Adicionar ícones aos itens: o arquivo lista apenas texto.',
        'Inserir separadores entre grupos de itens.',
        'Aplicar sombra sob o menu.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies sob o menu."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']}>
      {() => <Menu items={waMenuItems.slice(0, 4)} />}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="Menu"
      rows={[
        { name: 'items', type: 'WaMenuItemData[]', description: 'Itens exibidos no menu. Obrigatório.' },
        { name: 'onSelect', type: '(id: string) => void', description: 'Callback disparado ao escolher um item.' },
        { name: 'onClose', type: '() => void', description: 'Callback de ESC.' },
        { name: 'width', type: 'number', default: '190', description: 'Largura do menu em pixels.' },
        { name: 'label', type: 'string', default: "'Mais opções'", description: 'Rótulo acessível do menu.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <WaDocPropsTable
      title="WaMenuItemData"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único do item.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido.' },
        { name: 'disabled', type: 'boolean', description: 'Desabilita o item.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof Menu> = {
  title: 'Whatsapp Mobile/Componentes/Menu',
  component: Menu,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Itens exibidos no menu.' },
    width: { control: { type: 'range', min: 140, max: 320, step: 1 }, description: 'Largura em pixels.' },
    label: { control: 'text', description: 'Rótulo acessível.' },
  },
  args: { items: waMenuItems, width: 190, label: 'Mais opções' },
};

export default meta;

type Story = StoryObj<typeof Menu>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
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
    <WaDocStage surface="canvas" padding={24} align="flex-start">
      <Menu {...args} />
    </WaDocStage>
  ),
};

/**
 * Réplica do menu do frame "General settings".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="base" padding={20}>
      <MenuOverChats />
    </WaDocStage>
  ),
};

/**
 * Variações de largura e item desabilitado.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={24} gap={24} align="flex-start">
      <Menu items={waMenuItems} />
      <Menu
        width={230}
        items={[
          { id: 'a', label: 'Contact info' },
          { id: 'b', label: 'Media, links, and docs' },
          { id: 'c', label: 'Search' },
        ]}
      />
      <Menu
        width={160}
        items={[
          { id: 'a', label: 'Mute' },
          { id: 'b', label: 'Archive', disabled: true },
          { id: 'c', label: 'Delete' },
        ]}
      />
    </WaDocStage>
  ),
};
