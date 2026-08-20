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
import { ListItem, Avatar, Badge, Icon } from '../../../src/whatsappmobile';
import { waAvatars } from '../fixtures';

const BAR = '#0CA996';

const DENSITIES = [
  { density: 'chat' as const, label: 'chat · 70px', usage: 'Chats Main Page (1:2026)' },
  { density: 'status' as const, label: 'status · 68px', usage: 'Status Main Page (1:6)' },
  { density: 'call' as const, label: 'call · 69px', usage: 'Calls Main Page (1:406)' },
  { density: 'contact' as const, label: 'contact · 63px', usage: 'New group (1:1245)' },
  { density: 'settings' as const, label: 'settings · 72px', usage: 'Settings (1:2691)' },
];

/**
 * Página de documentação rica do componente ListItem.
 */
const ListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Estrutura"
      title="ListItem"
      description="Estrutura de linha compartilhada por todas as listas do produto. Reproduz a calha lateral de 19px, o recuo de 21px entre avatar e texto, a coluna direita de metadados e o divisor inferior recuado que começa alinhado ao título. As cinco densidades correspondem aos passos verticais medidos em cada frame do arquivo."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="🧱" title="Base das listas especializadas">
        <code>ChatListItem</code>, <code>StatusListItem</code> e <code>CallListItem</code> são
        composições sobre este componente. Use o ListItem diretamente para listas que o arquivo não
        especializa, como contatos.
      </WaDocCard>
      <WaDocCard icon="📏" title="Cinco densidades">
        O arquivo desenha passos verticais distintos por lista. A prop <code>density</code>{' '}
        preserva 70, 68, 69, 63 e 72px em vez de uniformizar.
      </WaDocCard>
      <WaDocCard icon="➖" title="Divisor recuado">
        O divisor não atravessa a linha inteira: começa após o avatar, alinhado ao título. A prop{' '}
        <code>dividerInset</code> ajusta o recuo por lista.
      </WaDocCard>
      <WaDocCard icon="⌨️" title="Semântica adaptativa">
        Sem <code>onClick</code> a linha é um <code>li</code>; com <code>onClick</code> vira{' '}
        <code>button</code> focalizável dentro da lista.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2026"
      frameName="Chats Main Page · contêiner de linhas"
      specs={[
        { label: 'Calha lateral', value: '19 px' },
        { label: 'Recuo do texto', value: '21 px' },
        { label: 'Passo de conversa', value: '70 px' },
        { label: 'Recuo do divisor', value: '71 px' },
        { label: 'Divisor', value: '1 px · #18252D' },
        { label: 'Título', value: 'PT Sans 400 · 21px' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Passo vertical',
          detail:
            'no arquivo o espaçamento entre linhas oscila 1 a 2px por deslize de posicionamento manual. Cada densidade adota o valor modal medido na respectiva lista.',
        },
        {
          subject: 'Recuo do divisor',
          detail:
            'as coordenadas dos divisores variam de 52 a 74px entre frames. O padrão adota 71px (Chats) e a prop dividerInset cobre os demais.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Slot leading', role: 'Avatar, ícone ou qualquer elemento à esquerda.', token: 'prop leading' },
        { name: 'Título', role: 'Nome do contato ou rótulo principal.', token: '--wa-font-title-lg-* · --wa-color-text-primary' },
        { name: 'Subtítulo', role: 'Linha secundária de metadados.', token: '--wa-font-label-md-* · --wa-color-text-meta-alt' },
        { name: 'Meta', role: 'Coluna direita superior, tipicamente o horário.', token: '--wa-font-caption-bold-* · --wa-color-text-secondary' },
        { name: 'Trailing', role: 'Coluna direita inferior: selos e ícones de estado.', token: 'prop trailing' },
        { name: 'Divisor', role: 'Linha inferior recuada e alinhada ao título.', token: '--wa-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de densidades" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={0} padding={0}>
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {DENSITIES.map((item, index) => (
          <ListItem
            key={item.density}
            density={item.density}
            leading={<Avatar size="lg" src={waAvatars[index]} alt="Contato" />}
            title="Jane Doe"
            subtitle={item.usage}
            meta="3:14 pm"
          />
        ))}
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Composição dos slots" />
    <WaDocStage surface="canvas" direction="column" align="stretch" gap={0} padding={0}>
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem title="Apenas título" leading={<Avatar size="lg" initials="JD" />} />
        <ListItem
          title="Título e subtítulo"
          subtitle="Hey there! I am using WhatsApp"
          leading={<Avatar size="lg" src={waAvatars[0]} alt="Contato" />}
        />
        <ListItem
          title="Com meta"
          meta="3:14 pm"
          leading={<Avatar size="lg" src={waAvatars[1]} alt="Contato" />}
        />
        <ListItem
          title="Com meta e trailing"
          meta="3:14 pm"
          trailing={<Badge count={4} variant="row" />}
          leading={<Avatar size="lg" src={waAvatars[2]} alt="Contato" />}
        />
        <ListItem
          title="Com ícone no leading"
          subtitle="Sem avatar"
          leading={<Icon name="settingsInvite" size={24} tone="settings" />}
          dividerInset={19}
        />
        <ListItem title="Sem divisor" divider={false} leading={<Avatar size="lg" initials="JS" />} />
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Envolver as linhas em um <ul> para preservar a semântica de lista.',
        'Escolher a densidade correspondente à lista que está sendo reproduzida.',
        'Ajustar dividerInset quando o slot leading mudar de largura.',
        'Ocultar o divisor da última linha de um agrupamento.',
      ]}
      donts={[
        'Uniformizar a altura de todas as listas em um único valor.',
        'Estender o divisor até a borda esquerda da tela.',
        'Colocar mais de uma ação focalizável dentro de uma linha já clicável.',
        'Usar o slot meta para conteúdo longo: ele não quebra linha.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'appbar']}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <ListItem
            leading={<Avatar size="lg" src={waAvatars[3]} alt="Contato" />}
            title="Jane Doe"
            meta="3:14 pm"
            trailing={<Badge count={4} variant="row" />}
          />
          <ListItem
            leading={<Avatar size="lg" src={waAvatars[4]} alt="Contato" />}
            title="John Doe"
            subtitle="Hey there! I am using WhatsApp"
            meta="3:14 pm"
          />
        </ul>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="ListItem"
      rows={[
        { name: 'leading', type: 'React.ReactNode', description: 'Conteúdo à esquerda, normalmente um Avatar ou Icon.' },
        { name: 'title', type: 'React.ReactNode', description: 'Título principal da linha. Obrigatório.' },
        { name: 'subtitle', type: 'React.ReactNode', description: 'Linha secundária exibida abaixo do título.' },
        { name: 'meta', type: 'React.ReactNode', description: 'Conteúdo no topo da coluna direita, como o horário.' },
        { name: 'trailing', type: 'React.ReactNode', description: 'Conteúdo na base da coluna direita: selos e ícones.' },
        { name: 'density', type: "'chat' | 'status' | 'call' | 'contact' | 'settings'", default: "'chat'", description: 'Densidade vertical da linha (70, 68, 69, 63 ou 72px).' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'dividerInset', type: 'number', default: '71', description: 'Recuo esquerdo do divisor em pixels.' },
        { name: 'onClick', type: '(event) => void', description: 'Quando informado, a linha passa a ser um button focalizável.' },
        { name: 'as', type: 'React.ElementType', default: "'li'", description: 'Elemento HTML raiz renderizado.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ListItem> = {
  title: 'Whatsapp Mobile/Componentes/ListItem',
  component: ListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text', description: 'Título principal da linha.' },
    subtitle: { control: 'text', description: 'Linha secundária.' },
    meta: { control: 'text', description: 'Conteúdo no topo da coluna direita.' },
    density: { control: 'select', options: ['chat', 'status', 'call', 'contact', 'settings'], description: 'Densidade vertical.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
    dividerInset: { control: { type: 'range', min: 0, max: 120, step: 1 }, description: 'Recuo esquerdo do divisor.' },
  },
  args: {
    title: 'Jane Doe',
    subtitle: '',
    meta: '3:14 pm',
    density: 'chat',
    divider: true,
    dividerInset: 71,
  },
};

export default meta;

type Story = StoryObj<typeof ListItem>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do ListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ListItem',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem {...args} leading={<Avatar size="lg" src={waAvatars[0]} alt="Contato" />} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Réplica das linhas do frame "Chats Main Page".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {waAvatars.slice(0, 6).map((src, index) => (
          <ListItem
            key={src}
            leading={<Avatar size="lg" src={src} alt="Contato" />}
            title={index % 2 === 0 ? 'Jane Doe' : 'John Doe'}
            meta="3:14 pm"
            trailing={index === 0 ? <Badge count={4} variant="row" /> : undefined}
          />
        ))}
      </ul>
    </WaDocStage>
  ),
};

/**
 * Comparação das cinco densidades do arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {DENSITIES.map((item, index) => (
          <ListItem
            key={item.density}
            density={item.density}
            leading={<Avatar size="lg" src={waAvatars[index]} alt="Contato" />}
            title={item.label}
            subtitle={item.usage}
          />
        ))}
      </ul>
    </WaDocStage>
  ),
};

/**
 * Composição modular dos cinco slots.
 */
export const ComposicaoModular: Story = {
  name: 'ComposicaoModular',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ListItem title="Apenas título" leading={<Avatar size="lg" initials="JD" />} />
        <ListItem
          title="Título e subtítulo"
          subtitle="Hey there! I am using WhatsApp"
          leading={<Avatar size="lg" src={waAvatars[1]} alt="Contato" />}
        />
        <ListItem
          title="Meta e trailing"
          meta="3:14 pm"
          trailing={<Badge count={12} variant="row" />}
          leading={<Avatar size="lg" src={waAvatars[2]} alt="Contato" />}
        />
        <ListItem
          title="Ícone no leading"
          leading={<Icon name="settingsInvite" size={24} tone="settings" />}
          dividerInset={19}
          divider={false}
        />
      </ul>
    </WaDocStage>
  ),
};
