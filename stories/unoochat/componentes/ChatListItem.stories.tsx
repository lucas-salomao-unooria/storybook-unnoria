import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
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
import { ChatListItem } from '../../../src/unoochat';
import { uncAvatars, uncChats } from '../fixtures';

const BAR = '#716C98';
const RECADO = 'Olá! Estou usando o Unoochat.';

/**
 * Página de documentação rica do componente ChatListItem.
 */
const ChatListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Listas"
      title="ChatListItem"
      description="Linha da lista de conversas. Combina avatar de 50px, nome em Open Sans 20px, horário em Open Sans 12px semibold e os estados de não lidas, silenciada e fixada, nos temas claro e escuro."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="💬" title="A linha mais frequente do produto">
        Compõe a aba CONVERSAS inteira: linhas empilhadas com passo de 70px e divisor recuado de
        71px, alinhado ao início do nome.
      </UncDocCard>
      <UncDocCard icon="🔤" title="Duas escalas de nome">
        O nome usa 20px Regular por padrão. A prop <code>compact</code> aplica o degrau de 18px
        semibold, para listas mais densas.
      </UncDocCard>
      <UncDocCard icon="🔕" title="Estados de linha">
        Não lidas (selo em <code>--unc-color-accent</code>), silenciada (glifo{' '}
        <code>sbSilent</code>) e fixada (glifo <code>pin</code> em cápsula) são cobertos por props
        booleanas.
      </UncDocCard>
      <UncDocCard icon="📝" title="Prévia opcional">
        A prop <code>preview</code> acrescenta a última mensagem ou o recado do contato, como “
        {RECADO}”, em <code>--unc-color-text-secondary</code>.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="ChatListItem"
      layout="Linha · 70px"
      specs={[
        { label: 'Altura mínima', value: '70px' },
        { label: 'Avatar', value: '50px (--unc-avatar-lg)' },
        { label: 'Nome', value: 'Open Sans 400 · 20px / 30px · text-primary' },
        { label: 'Nome compacto', value: 'Open Sans 600 · 18px / 28px' },
        { label: 'Horário', value: 'Open Sans 600 · 12px / 18px · text-secondary' },
        { label: 'Prévia', value: 'Open Sans 400 · 16px · text-secondary' },
        { label: 'Selo de não lidas', value: 'Badge row · --unc-color-accent' },
        { label: 'Divisor', value: '1px · recuo de 71px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Cores por tema',
          detail:
            'nome em --unc-color-text-primary (#22272A no claro, #F5F5F5 no escuro); horário e prévia em --unc-color-text-secondary (#475157 / #CBD4D6). O selo usa o acento do tema (#716C98 / #AAA5C2) com o numeral em --unc-color-text-on-accent, escolhido por contraste.',
        },
        {
          subject: 'Glifo de conversa fixada',
          detail:
            'usa o glifo pin (ligadura keep do Material Symbols Rounded) dentro de uma cápsula de 19px em --unc-color-surface-sheet e cor --unc-color-icon-muted.',
        },
        {
          subject: 'Glifo de silenciada',
          detail:
            'usa sbSilent (notifications_off), o mesmo glifo do modo silencioso da barra de status, em vez de registrar um segundo ícone equivalente.',
        },
        {
          subject: 'Prévia de mensagem',
          detail:
            'a prévia é opcional e ocupa a segunda linha da linha de 70px; sem ela, o nome permanece centralizado ao lado do avatar.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato de 50px sem anel.', token: 'Avatar size="lg"' },
        { name: 'Nome', role: 'Identificação do contato ou grupo.', token: '--unc-font-title-lg-* · --unc-color-text-primary' },
        { name: 'Prévia', role: 'Última mensagem ou recado, opcional.', token: '--unc-color-text-secondary' },
        { name: 'Horário', role: 'Momento da última mensagem.', token: '--unc-font-caption-bold-* · --unc-color-text-secondary' },
        { name: 'Estados', role: 'Fixada, silenciada e selo de não lidas.', token: '--unc-color-icon-muted · --unc-color-accent' },
        { name: 'Divisor', role: 'Linha inferior recuada em 71px.', token: '--unc-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    {(['light', 'dark'] as const).map((theme) => (
      <UncDocStage
        key={theme}
        label={theme === 'light' ? 'Tema claro' : 'Tema escuro'}
        theme={theme}
        surface="canvas"
        padding={0}
        align="stretch"
      >
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <ChatListItem name="Amara Lima" time="15:14" avatarSrc={uncAvatars[0]} />
          <ChatListItem name="Bruno Reis" time="15:14" avatarSrc={uncAvatars[1]} unread={4} />
          <ChatListItem name="Carla Nogueira" time="15:14" avatarSrc={uncAvatars[2]} muted />
          <ChatListItem name="Davi Moraes" time="15:14" avatarSrc={uncAvatars[3]} pinned />
          <ChatListItem name="Elisa Prado" time="15:14" avatarSrc={uncAvatars[4]} pinned unread={12} />
          <ChatListItem name="Fábio Teixeira" time="15:14" avatarSrc={uncAvatars[5]} compact />
          <ChatListItem name="Gabi Duarte" preview={RECADO} time="15:14" avatarSrc={uncAvatars[6]} />
          <ChatListItem name="Helena Vaz" initials="HV" time="15:14" />
          <ChatListItem name="Ícaro Santos" time="15:14" avatarSrc={uncAvatars[8]} divider={false} />
        </ul>
      </UncDocStage>
    ))}

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Envolver as linhas em um <ul> e passar onClick para abrir a conversa.',
        'Ocultar o selo quando não houver mensagens não lidas.',
        'Combinar pinned e unread quando ambos se aplicarem.',
        'Remover o divisor da última linha da lista.',
      ]}
      donts={[
        'Usar compact aleatoriamente: é uma escala de densidade, não um estado.',
        'Truncar o horário: ele deve caber inteiro na coluna direita.',
        'Mostrar o selo de acento em conversas silenciadas sem mensagens novas.',
        'Escrever prévias longas: a linha tem 70px e a prévia é cortada em uma linha.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: nome, horário, selo e divisor acompanham data-unc-theme."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <ChatListItem name="Ícaro Santos" time="15:14" avatarSrc={uncAvatars[8]} unread={4} />
          <ChatListItem name="Júlia Ramos" time="15:14" avatarSrc={uncAvatars[9]} muted />
          <ChatListItem name="Amara Lima" preview={RECADO} time="15:14" avatarSrc={uncAvatars[0]} pinned />
        </ul>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
        { name: 'compact', type: 'boolean', default: 'false', description: 'Aplica a escala compacta do nome (18px semibold).' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de abertura da conversa.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof ChatListItem> = {
  title: 'Unoochat/Componentes/ChatListItem',
  component: ChatListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato ou do grupo.' },
    preview: { control: 'text', description: 'Prévia da última mensagem.' },
    time: { control: 'text', description: 'Horário da última mensagem.' },
    avatarSrc: { control: 'select', options: uncAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    unread: { control: { type: 'range', min: 0, max: 150, step: 1 }, description: 'Mensagens não lidas.' },
    muted: { control: 'boolean', description: 'Conversa silenciada.' },
    pinned: { control: 'boolean', description: 'Conversa fixada.' },
    compact: { control: 'boolean', description: 'Escala compacta do nome.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Amara Lima',
    preview: '',
    time: '15:14',
    avatarSrc: uncAvatars[0],
    initials: 'AL',
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
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem {...args} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Lista completa de conversas, como na aba CONVERSAS.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo de Lista Completa',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
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
    </UncDocStage>
  ),
};

/**
 * Matriz completa de estados de linha.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem name="Padrão" time="15:14" avatarSrc={uncAvatars[0]} />
        <ChatListItem name="Não lidas" time="15:14" avatarSrc={uncAvatars[1]} unread={4} />
        <ChatListItem name="Silenciada" time="15:14" avatarSrc={uncAvatars[2]} muted />
        <ChatListItem name="Fixada" time="15:14" avatarSrc={uncAvatars[3]} pinned />
        <ChatListItem name="Fixada e não lida" time="15:14" avatarSrc={uncAvatars[4]} pinned unread={99} />
        <ChatListItem name="Sem avatar" time="15:14" initials="SA" divider={false} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Comparação entre a escala padrão e a compacta do nome.
 */
export const Tamanhos: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <ChatListItem name="Padrão · 20px Regular" time="15:14" avatarSrc={uncAvatars[5]} />
        <ChatListItem name="Compacto · 18px semibold" time="15:14" avatarSrc={uncAvatars[6]} compact divider={false} />
      </ul>
    </UncDocStage>
  ),
};
