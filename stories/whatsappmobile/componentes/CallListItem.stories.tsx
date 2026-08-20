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
import { CallListItem } from '../../../src/whatsappmobile';
import { waAvatars, waCalls } from '../fixtures';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente CallListItem.
 */
const CallListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Listas"
      title="CallListItem"
      description="Registro do histórico de chamadas. Combina avatar de 50px, nome em 21px, uma linha de metadados com seta de direção e contagem agrupada, e um botão de rediscagem à direita. A seta reaproveita o glifo bi:arrow-down girado -132,75°, exatamente como no arquivo: verde-água para efetuadas e rosa-avermelhado para recebidas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <WaDocGrid>
      <WaDocCard icon="↗️" title="Direção por cor e rotação">
        O arquivo usa um único vetor de seta, girado -132,75° e pintado de{' '}
        <code>#17B49F</code> (efetuada) ou <code>#DF788B</code> (recebida ou perdida).
      </WaDocCard>
      <WaDocCard icon="🔁" title="Contagem agrupada">
        Tentativas consecutivas aparecem entre parênteses antes do horário, como{' '}
        <code>(3) Yesterday, 10:55 am</code>.
      </WaDocCard>
      <WaDocCard icon="📞" title="Ação de rediscagem">
        À direita, o telefone em <code>--wa-color-accent-icon-call</code> ou a câmera em{' '}
        <code>--wa-color-accent-icon-video</code>, conforme a modalidade do registro.
      </WaDocCard>
      <WaDocCard icon="♿" title="Duas ações independentes">
        A linha abre o detalhe da chamada; o botão à direita redisca. Ambos têm rótulos acessíveis
        próprios para não se confundirem.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Figma e especificações técnicas" />
    <WaDocFigmaSpecs
      nodeId="1:402"
      frameName="Calls Main Page"
      specs={[
        { label: 'Passo vertical', value: '69 px' },
        { label: 'Avatar', value: '50 px' },
        { label: 'Nome', value: 'PT Sans 400 · 21px · #D3DAE0' },
        { label: 'Metadado', value: 'PT Sans 400 · 14,54px · #98A3A9' },
        { label: 'Seta', value: 'bi:arrow-down @ -132,75°' },
        { label: 'Ação', value: 'phone #02AD9B · video #00B29C' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'Vetor da seta',
          detail:
            'no frame Calls o nó bi:arrow-down foi exportado vazio. As duas setas foram lidas do nó equivalente do frame General settings (1:504), que exporta os mesmos vetores com as cores #17B49F e #DF788B.',
        },
        {
          subject: 'Ícone de telefone',
          detail:
            'o arquivo desenha apenas a parte superior do fone (20,0019 × 8,01259) girada -127,81°, e não um telefone completo. O componente reproduz esse vetor e essa rotação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <WaDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato de 50px sem anel.', token: 'Avatar size="lg"' },
        { name: 'Nome', role: 'Contato da chamada.', token: '--wa-font-title-lg-* · --wa-color-text-primary' },
        { name: 'Seta de direção', role: 'Glifo girado que indica efetuada ou recebida.', token: '--wa-color-accent-call-out · --wa-color-danger-call-in' },
        { name: 'Contagem e horário', role: 'Tentativas agrupadas e momento da chamada.', token: '--wa-color-text-meta' },
        { name: 'Ação', role: 'Botão de rediscagem por voz ou vídeo.', token: '--wa-color-accent-icon-call · --wa-color-accent-icon-video' },
        { name: 'Divisor', role: 'Linha inferior recuada em 71px.', token: '--wa-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Jane Doe" timestamp="Yesterday, 10:55 am" count={3} direction="outgoing" kind="voice" avatarSrc={waAvatars[0]} />
        <CallListItem name="Jane Doe" timestamp="Yesterday, 10:55 am" count={3} direction="incoming" kind="video" avatarSrc={waAvatars[1]} />
        <CallListItem name="John Doe" timestamp="Yesterday, 10:55 am" direction="outgoing" kind="video" avatarSrc={waAvatars[2]} />
        <CallListItem name="John Doe" timestamp="Yesterday, 10:55 am" count={12} direction="incoming" kind="voice" avatarSrc={waAvatars[3]} />
        <CallListItem name="Sem avatar" timestamp="Today, 08:34 am" initials="SA" direction="outgoing" kind="voice" divider={false} />
      </ul>
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <WaDocPractices
      dos={[
        'Usar direction="incoming" também para chamadas perdidas, como no arquivo.',
        'Omitir count quando houver uma única tentativa.',
        'Escolher kind conforme a modalidade real do registro.',
        'Dar rótulos acessíveis distintos à linha e ao botão de rediscagem.',
      ]}
      donts={[
        'Introduzir uma terceira cor de seta para chamadas perdidas.',
        'Usar o botão de rediscagem para abrir o detalhe da chamada.',
        'Exibir "(1)" — o arquivo omite a contagem quando é uma única tentativa.',
        'Trocar o vetor parcial do fone por um ícone de telefone completo.',
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
          <CallListItem name="Jane Doe" timestamp="Yesterday, 10:55 am" count={3} direction="outgoing" avatarSrc={waAvatars[6]} />
          <CallListItem name="John Doe" timestamp="Yesterday, 10:55 am" direction="incoming" kind="video" avatarSrc={waAvatars[7]} divider={false} />
        </ul>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <WaDocPropsTable
      title="CallListItem"
      rows={[
        { name: 'name', type: 'string', description: 'Nome do contato. Obrigatório.' },
        { name: 'timestamp', type: 'string', description: 'Momento da chamada. Obrigatório.' },
        { name: 'count', type: 'number', description: 'Tentativas agrupadas exibidas entre parênteses.' },
        { name: 'direction', type: "'outgoing' | 'incoming'", default: "'outgoing'", description: 'Direção do registro, que define a cor da seta.' },
        { name: 'kind', type: "'voice' | 'video'", default: "'voice'", description: 'Modalidade, que define o ícone de ação à direita.' },
        { name: 'avatarSrc', type: 'string', description: 'URL do avatar do contato.' },
        { name: 'initials', type: 'string', description: 'Iniciais usadas quando não há avatar.' },
        { name: 'onCall', type: '(event) => void', description: 'Callback do botão de rediscagem.' },
        { name: 'divider', type: 'boolean', default: 'true', description: 'Desenha o divisor inferior.' },
        { name: 'onClick', type: '(event) => void', description: 'Callback de abertura do registro.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof CallListItem> = {
  title: 'Whatsapp Mobile/Componentes/CallListItem',
  component: CallListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato.' },
    timestamp: { control: 'text', description: 'Momento da chamada.' },
    count: { control: { type: 'number', min: 1, max: 99 }, description: 'Tentativas agrupadas.' },
    direction: { control: 'radio', options: ['outgoing', 'incoming'], description: 'Direção do registro.' },
    kind: { control: 'radio', options: ['voice', 'video'], description: 'Modalidade da chamada.' },
    avatarSrc: { control: 'select', options: waAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Jane Doe',
    timestamp: 'Yesterday, 10:55 am',
    count: 3,
    direction: 'outgoing',
    kind: 'voice',
    avatarSrc: waAvatars[0],
    initials: 'JD',
    divider: true,
  },
};

export default meta;

type Story = StoryObj<typeof CallListItem>;

/**
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <CallListItemDocumentationPage />,
};

/**
 * Playground com 100% das props do CallListItem expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do CallListItem',
  render: (args) => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem {...args} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Réplica do histórico do frame "Calls Main Page".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {waCalls.map((call) => (
          <CallListItem
            key={call.id}
            name={call.name}
            timestamp={call.timestamp}
            count={call.count}
            direction={call.direction}
            kind={call.kind}
            avatarSrc={call.avatarSrc}
          />
        ))}
      </ul>
    </WaDocStage>
  ),
};

/**
 * Matriz completa de direções e modalidades.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Efetuada · voz" timestamp="Yesterday, 10:55 am" direction="outgoing" kind="voice" avatarSrc={waAvatars[0]} />
        <CallListItem name="Efetuada · vídeo" timestamp="Yesterday, 10:55 am" direction="outgoing" kind="video" avatarSrc={waAvatars[1]} />
        <CallListItem name="Recebida · voz" timestamp="Yesterday, 10:55 am" direction="incoming" kind="voice" avatarSrc={waAvatars[2]} />
        <CallListItem name="Recebida · vídeo" timestamp="Yesterday, 10:55 am" direction="incoming" kind="video" avatarSrc={waAvatars[3]} divider={false} />
      </ul>
    </WaDocStage>
  ),
};

/**
 * Estados de contagem agrupada.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Sem contagem" timestamp="Yesterday, 10:55 am" direction="outgoing" avatarSrc={waAvatars[4]} />
        <CallListItem name="Duas tentativas" timestamp="Yesterday, 10:55 am" count={2} direction="incoming" avatarSrc={waAvatars[5]} />
        <CallListItem name="Doze tentativas" timestamp="Yesterday, 10:55 am" count={12} direction="incoming" avatarSrc={waAvatars[6]} divider={false} />
      </ul>
    </WaDocStage>
  ),
};
