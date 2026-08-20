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
import { ChatListItem } from '../../../src/whatsappmobile';
import { waAvatars, waChats } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente ChatListItem.
 */
const ChatListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Listas"
      title="ChatListItem"
      description="Linha da lista de conversas do frame Chats Main Page. Combina avatar de 50px, nome em PT Sans 21px, horário em PT Sans Bold 12px e os estados de não lidas, silenciada e fixada observados também no frame de busca em conversas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="💬" title="A linha mais frequente do produto">
        Compõe a aba CHATS inteira. O arquivo desenha dezenove linhas empilhadas com passo de 70px
        e divisor recuado de 71px.
      </WaDocCard>
      <WaDocCard icon="🔤" title="Duas escalas de nome">
        O arquivo alterna entre 21px Regular e 18,54px Bold entre linhas. A prop{' '}
        <code>compact</code> reproduz a segunda escala.
      </WaDocCard>
      <WaDocCard icon="🔕" title="Estados de linha">
        Não lidas (selo verde), silenciada (glifo riscado) e fixada (glifo em cápsula) aparecem no
        frame de busca em conversas e são cobertos por props booleanas.
      </WaDocCard>
      <WaDocCard icon="📝" title="Prévia opcional">
        O frame de conversas não exibe prévia de mensagem, mas os frames de contatos exibem
        &quot;Hey there! I am using WhatsApp&quot;. A prop <code>preview</code> atende esse caso.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:2024"
      frameName="Chats Main Page"
      specs={[
        { label: 'Passo vertical', value: '70 px' },
        { label: 'Avatar', value: '50 px' },
        { label: 'Nome', value: 'PT Sans 400 · 21px · #D3DAE0' },
        { label: 'Nome compacto', value: 'PT Sans 700 · 18,54px · #D4DCDF' },
        { label: 'Horário', value: 'PT Sans 700 · 12px · #868F94' },
        { label: 'Selo de não lidas', value: '19 px · #01A590' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Prévia de mensagem',
          detail:
            'o frame Chats Main Page não desenha prévia. A prop preview existe para as listas de contatos do próprio arquivo e usa PT Sans 16px em --wa-color-text-settings-sub.',
        },
        {
          subject: 'Glifo de conversa fixada',
          detail:
            'o arquivo desenha o alfinete como bitmap achatado, sem vetor exportável. O componente reaproveita o glifo `pencil` dentro da cápsula original — desvio deliberado para não desenhar um alfinete à mão.',
        },
        {
          subject: 'Glifo de silenciada',
          detail:
            'reaproveita `sbSilent` (o mesmo vetor do modo silencioso da barra de status), que é o glifo riscado usado pelo arquivo.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato de 50px sem anel.', token: 'Avatar size="lg"' },
        { name: 'Nome', role: 'Identificação do contato ou grupo.', token: '--wa-font-title-lg-* · --wa-color-text-primary' },
        { name: 'Prévia', role: 'Última mensagem, opcional.', token: '--wa-color-text-settings-sub' },
        { name: 'Horário', role: 'Momento da última mensagem.', token: '--wa-color-text-secondary' },
        { name: 'Estados', role: 'Fixada, silenciada e selo de não lidas.', token: '--wa-color-icon-pin · --wa-color-accent-badge' },
        { name: 'Divisor', role: 'Linha inferior recuada em 71px.', token: '--wa-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem name="Jane Doe" time="3:14 pm" avatarSrc={waAvatars[0]} />
        <ChatListItem name="John Doe" time="3:14 pm" avatarSrc={waAvatars[1]} unread={4} />
        <ChatListItem name="Jane Doe" time="3:14 pm" avatarSrc={waAvatars[2]} muted />
        <ChatListItem name="John Doe" time="3:14 pm" avatarSrc={waAvatars[3]} pinned />
        <ChatListItem name="Jane Doe" time="3:14 pm" avatarSrc={waAvatars[4]} pinned unread={12} />
        <ChatListItem name="John Doe" time="3:14 pm" avatarSrc={waAvatars[5]} compact />
        <ChatListItem
          name="Jane Doe"
          preview="Hey there! I am using WhatsApp"
          time="3:14 pm"
          avatarSrc={waAvatars[6]}
        />
        <ChatListItem name="John Doe" initials="JD" time="3:14 pm" />
        <ChatListItem name="Jane Doe" time="3:14 pm" avatarSrc={waAvatars[7]} divider={false} />
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Envolver as linhas em um <ul> e passar onClick para abrir a conversa.',
        'Ocultar o selo quando não houver mensagens não lidas.',
        'Combinar pinned e unread quando ambos se aplicarem, na ordem do arquivo.',
        'Remover o divisor da última linha da lista.',
      ]}
      donts={[
        'Exibir prévia na aba CHATS: o frame oficial não desenha essa linha.',
        'Usar compact aleatoriamente — é a segunda escala do arquivo, não um estado de densidade.',
        'Truncar o horário: ele deve caber inteiro na coluna direita.',
        'Aplicar o selo verde a conversas silenciadas sem mensagens novas.',
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
          <ChatListItem name="Jane Doe" time="3:14 pm" avatarSrc={waAvatars[8]} unread={4} />
          <ChatListItem name="John Doe" time="3:14 pm" avatarSrc={waAvatars[9]} muted />
        </ul>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="ChatListItem"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato ou do grupo. Obrigatório.' },
        { name: 'preview', type: 'string', description: 'Prévia da última mensagem.' },
        { name: 'time', type: 'string', description: 'Horário da última mensagem.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do contato.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'unread', type: 'number', default: '0', description: 'Quantidade de mensagens não lidas.' },
        { name: 'muted', type: 'boolean', default: 'false', description: 'Marca a conversa como silenciada.' },
        { name: 'pinned', type: 'boolean', default: 'false', description: 'Marca a conversa como fixada.' },
        { name: 'compact', type: 'boolean', default: 'false', description: 'Aplica a escala de 18,54px Bold do arquivo.' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de abertura da conversa.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatListItem> = {
  title: 'Whatsapp Mobile/Componentes/ChatListItem',
  component: ChatListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato ou do grupo.' },
    preview: { control: 'text', description: 'Prévia da última mensagem.' },
    time: { control: 'text', description: 'Horário da última mensagem.' },
    avatarSrc: { control: 'select', options: waAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    unread: { control: { type: 'range', min: 0, max: 150, step: 1 }, description: 'Mensagens não lidas.' },
    muted: { control: 'boolean', description: 'Conversa silenciada.' },
    pinned: { control: 'boolean', description: 'Conversa fixada.' },
    compact: { control: 'boolean', description: 'Escala compacta de 18,54px.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Jane Doe',
    preview: '',
    time: '3:14 pm',
    avatarSrc: waAvatars[0],
    initials: 'JD',
    unread: 4,
    muted: false,
    pinned: false,
    compact: false,
    divider: true,
  },
};

export default meta;

type Story = StoryObj<typeof ChatListItem>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <ChatListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do ChatListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do ChatListItem',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem {...args} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Réplica da lista completa do frame "Chats Main Page".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
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
    </WaDocStage>
  ),
};

/**
 * Matriz completa de estados de linha.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem name="Padrão" time="3:14 pm" avatarSrc={waAvatars[0]} />
        <ChatListItem name="Não lidas" time="3:14 pm" avatarSrc={waAvatars[1]} unread={4} />
        <ChatListItem name="Silenciada" time="3:14 pm" avatarSrc={waAvatars[2]} muted />
        <ChatListItem name="Fixada" time="3:14 pm" avatarSrc={waAvatars[3]} pinned />
        <ChatListItem name="Fixada e não lida" time="3:14 pm" avatarSrc={waAvatars[4]} pinned unread={99} />
        <ChatListItem name="Sem avatar" time="3:14 pm" initials="SA" divider={false} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Comparação entre a escala padrão e a compacta do arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem name="Padrão · 21px Regular" time="3:14 pm" avatarSrc={waAvatars[5]} />
        <ChatListItem name="Compacto · 18,54px Bold" time="3:14 pm" avatarSrc={waAvatars[6]} compact divider={false} />
      </ul>
    </WaDocStage>
  ),
};
