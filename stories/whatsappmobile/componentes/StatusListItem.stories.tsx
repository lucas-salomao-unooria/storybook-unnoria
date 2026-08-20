import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
import { StatusListItem, SectionLabel } from '../../../src/whatsappmobile';
import { waAvatars, waStatusRecent, waStatusViewed } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente StatusListItem.
 */
const StatusListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Listas"
      title="StatusListItem"
      description="Linha da aba Status. Reproduz os três estados do frame: a própria atualização (My status, sem anel e com menu de opções), as atualizações recentes (nome em 21px Regular) e as já visualizadas (nome em 18,54px Bold). Atualizações de terceiros usam o anel de 2,12px sobre recorte de 45px."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="⭕" title="Anel como marcador">
        Recentes e visualizadas usam o mesmo anel <code>#C4C4C4</code>; a distinção entre elas é
        feita pela tipografia do nome, não pela cor do anel.
      </WaDocCard>
      <WaDocCard icon="👤" title="My status é diferente">
        A primeira linha usa avatar sem anel, título em 18,54px Bold na cor{' '}
        <code>--wa-color-text-status-own</code> e um menu de opções à direita.
      </WaDocCard>
      <WaDocCard icon="🏷️" title="Agrupada por SectionLabel">
        O arquivo separa &quot;Recent updates&quot; de &quot;Viewed updates&quot; com o rótulo em
        PT Sans Bold 15,54px, coberto pelo componente <code>SectionLabel</code>.
      </WaDocCard>
      <WaDocCard icon="⏱️" title="Metadado temporal">
        O horário relativo (&quot;30 minutes ago&quot;) usa 14,54px em{' '}
        <code>--wa-color-text-meta-alt</code>; em My status, <code>--wa-color-text-meta</code>.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2"
      frameName="Status Main Page"
      specs={[
        { label: 'Passo vertical', value: '68 px' },
        { label: 'Anel', value: '56 px · 2,1165 px · #C4C4C4' },
        { label: 'Recorte', value: '45 px' },
        { label: 'Nome recente', value: 'PT Sans 400 · 21px · #D3DAE0' },
        { label: 'Nome visualizado', value: 'PT Sans 700 · 18,54px · #DCDDE2' },
        { label: 'Metadado', value: 'PT Sans 400 · 14,54px · #889397' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Anel de atualização recente',
          detail:
            'diferente do WhatsApp real, o arquivo comunitário não pinta o anel de verde para status não visto. A amostragem de pixel confirma #C4C4C4 nos dois grupos, e o valor foi preservado.',
        },
        {
          subject: 'Recuo do divisor',
          detail:
            'o arquivo posiciona o divisor entre 52 e 55px a partir da borda do contêiner de conteúdo. O componente adota 74px absolutos, que é a mesma linha visual após somar a calha de 19px.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Avatar com anel', role: 'Recorte de 45px dentro do anel de 56px.', token: 'Avatar size="md" ring="status"' },
        { name: 'Nome', role: 'Autor da atualização; a escala muda conforme o estado.', token: '--wa-color-text-primary | --wa-color-text-status-viewed' },
        { name: 'Metadado', role: 'Horário relativo da atualização.', token: '--wa-color-text-meta-alt' },
        { name: 'Menu', role: 'Ações da própria atualização, exclusivo do estado own.', token: '--wa-color-icon-appbar' },
        { name: 'Divisor', role: 'Linha inferior recuada em 74px.', token: '--wa-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de estados" />
    <WaDocStage surface="canvas" padding={0} align="stretch" direction="column" gap={0}>
      <div style={{ width: 411 }}>
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
          {waStatusViewed.map((item, index) => (
            <StatusListItem
              key={item.id}
              state="viewed"
              name={item.name}
              timestamp={item.timestamp}
              avatarSrc={item.avatarSrc}
              divider={index < waStatusViewed.length - 1}
            />
          ))}
        </ul>
      </div>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Colocar a linha own no topo, antes do primeiro SectionLabel.',
        'Agrupar recentes e visualizadas com SectionLabel, como no arquivo.',
        'Exibir o menu de opções apenas na linha own.',
        'Manter o anel em todas as atualizações de terceiros.',
      ]}
      donts={[
        'Pintar o anel de verde para atualizações não vistas: divergiria do arquivo.',
        'Aplicar o estado viewed às atualizações recentes só para reduzir contraste.',
        'Renderizar a linha own dentro de um dos agrupamentos.',
        'Substituir o horário relativo por um carimbo absoluto sem necessidade.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base']}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <StatusListItem name="Jane Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[4]} />
          <StatusListItem
            state="viewed"
            name="John Doe"
            timestamp="30 minutes ago"
            avatarSrc={waAvatars[5]}
            divider={false}
          />
        </ul>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="StatusListItem"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do autor da atualização. Obrigatório.' },
        { name: 'timestamp', type: 'string', description: 'Momento da atualização. Obrigatório.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do autor.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'state', type: "'own' | 'recent' | 'viewed'", default: "'recent'", description: 'Estado da atualização, que define anel e tipografia.' },
        { name: 'showMenu', type: 'boolean', default: 'false', description: 'Exibe o menu de opções à direita.' },
        { name: 'onMenu', type: '(event) => void', description: 'Callback do menu de opções.' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de abertura da atualização.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StatusListItem> = {
  title: 'Whatsapp Mobile/Componentes/StatusListItem',
  component: StatusListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do autor.' },
    timestamp: { control: 'text', description: 'Momento da atualização.' },
    avatarSrc: { control: 'select', options: waAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    state: { control: 'radio', options: ['own', 'recent', 'viewed'], description: 'Estado da atualização.' },
    showMenu: { control: 'boolean', description: 'Exibe o menu de opções.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Jane Doe',
    timestamp: '30 minutes ago',
    avatarSrc: waAvatars[4],
    initials: 'JD',
    state: 'recent',
    showMenu: false,
    divider: true,
  },
};

export default meta;

type Story = StoryObj<typeof StatusListItem>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StatusListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do StatusListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StatusListItem',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <StatusListItem {...args} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Réplica da aba Status do frame oficial, com agrupamentos.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <div style={{ width: 411 }}>
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
            <StatusListItem key={item.id} name={item.name} timestamp={item.timestamp} avatarSrc={item.avatarSrc} />
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
      </div>
    </WaDocStage>
  ),
};

/**
 * Matriz completa dos três estados.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <StatusListItem state="own" name="My status" timestamp="Yesterday, 10:55 am" avatarSrc={waAvatars[0]} showMenu />
        <StatusListItem state="recent" name="Jane Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[4]} />
        <StatusListItem state="viewed" name="John Doe" timestamp="30 minutes ago" avatarSrc={waAvatars[5]} divider={false} />
      </ul>
    </WaDocStage>
  ),
};
