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
import { CallListItem } from '../../../src/unoochat';
import { uncAvatars, uncCalls } from '../fixtures';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente CallListItem.
 */
const CallListItemDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Listas"
      title="CallListItem"
      description="Registro do histórico de chamadas. Combina avatar de 50px, nome em 20px, uma linha de metadados com seta de direção e contagem agrupada, e um botão de rediscagem à direita. A direção é dita pelo glifo (callOut ou callIn) e pela cor: o token de sucesso para efetuadas e o de perigo para recebidas ou perdidas."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="↗️" title="Direção por glifo e cor">
        A seta é o glifo <code>callOut</code> ou <code>callIn</code>, pintada com{' '}
        <code>--unc-color-accent-call-out</code> (efetuada) ou{' '}
        <code>--unc-color-danger-call-in</code> (recebida ou perdida). O glifo carrega a
        informação também para quem não distingue as cores.
      </UncDocCard>
      <UncDocCard icon="🔁" title="Contagem agrupada">
        Tentativas consecutivas aparecem entre parênteses antes do horário, como{' '}
        <code>(3) Ontem, 10:55</code>.
      </UncDocCard>
      <UncDocCard icon="📞" title="Ação de rediscagem">
        À direita, o glifo de telefone ou o de câmera, ambos em <code>--unc-color-accent</code>,
        conforme a modalidade do registro.
      </UncDocCard>
      <UncDocCard icon="♿" title="Duas ações independentes">
        A linha abre o detalhe da chamada; o botão à direita redisca. Ambos têm rótulos acessíveis
        próprios para não se confundirem.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="CallListItem"
      layout="Linha · 69px"
      specs={[
        { label: 'Altura mínima', value: '69 px' },
        { label: 'Avatar', value: '50 px' },
        { label: 'Nome', value: 'Open Sans 400 · 20/30px · --unc-color-text-primary' },
        { label: 'Metadado', value: 'Open Sans 400 · 14/20px · --unc-color-text-secondary' },
        { label: 'Seta', value: 'callOut / callIn · 16px' },
        { label: 'Ação', value: 'phone / videoCall · 22px · --unc-color-accent' },
        { label: 'Divisor', value: '1px · recuo de 71px' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Seta por ligadura, sem rotação',
          detail:
            'callOut e callIn são glifos distintos do Material Symbols Rounded (peso 300, por ligadura), e não um mesmo vetor girado. A cor da seta acompanha o tema: success-600 e danger-600 no claro, success-400 e danger-400 no escuro, para manter o contraste sobre a superfície.',
        },
        {
          subject: 'Modalidade só pelo glifo',
          detail:
            'voz e vídeo usam o mesmo acento (--unc-color-accent); o que distingue o botão é o glifo e o rótulo acessível ("Ligar para…" ou "Chamada de vídeo com…"). Um par de cores por modalidade esconderia a informação de quem não enxerga cor.',
        },
        {
          subject: 'Composição sobre o ListItem',
          detail:
            'a linha é um ListItem com densidade call (69px) e recuo de divisor de 71px, medidas próprias do módulo; a estrutura de linha não é duplicada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Avatar', role: 'Retrato de 50px sem anel.', token: 'Avatar size="lg"' },
        { name: 'Nome', role: 'Contato da chamada.', token: '--unc-font-title-lg-* · --unc-color-text-primary' },
        { name: 'Seta de direção', role: 'Glifo que indica efetuada ou recebida.', token: '--unc-color-accent-call-out · --unc-color-danger-call-in' },
        { name: 'Contagem e horário', role: 'Tentativas agrupadas e momento da chamada.', token: '--unc-color-text-secondary' },
        { name: 'Ação', role: 'Botão de rediscagem por voz ou vídeo.', token: '--unc-color-accent' },
        { name: 'Divisor', role: 'Linha inferior recuada em 71px.', token: '--unc-color-border-divider' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Amara Lima" timestamp="Ontem, 10:55" count={3} direction="outgoing" kind="voice" avatarSrc={uncAvatars[0]} />
        <CallListItem name="Amara Lima" timestamp="Ontem, 10:55" count={3} direction="incoming" kind="video" avatarSrc={uncAvatars[1]} />
        <CallListItem name="Bruno Reis" timestamp="Ontem, 10:55" direction="outgoing" kind="video" avatarSrc={uncAvatars[2]} />
        <CallListItem name="Bruno Reis" timestamp="Ontem, 10:55" count={12} direction="incoming" kind="voice" avatarSrc={uncAvatars[3]} />
        <CallListItem name="Sem avatar" timestamp="Hoje, 08:34" initials="SA" direction="outgoing" kind="voice" divider={false} />
      </ul>
    </UncDocStage>

    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Amara Lima" timestamp="Ontem, 10:55" count={3} direction="outgoing" kind="voice" avatarSrc={uncAvatars[0]} />
        <CallListItem name="Carla Nogueira" timestamp="Ontem, 10:55" count={3} direction="incoming" kind="video" avatarSrc={uncAvatars[2]} divider={false} />
      </ul>
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UncDocPractices
      dos={[
        'Usar direction="incoming" também para chamadas perdidas.',
        'Omitir count quando houver uma única tentativa.',
        'Escolher kind conforme a modalidade real do registro.',
        'Dar rótulos acessíveis distintos à linha e ao botão de rediscagem.',
      ]}
      donts={[
        'Introduzir uma terceira cor de seta para chamadas perdidas.',
        'Usar o botão de rediscagem para abrir o detalhe da chamada.',
        'Exibir "(1)": a contagem é omitida quando há uma única tentativa.',
        'Trocar o glifo por outra biblioteca de ícones ou por um desenho à mão.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Alterne entre claro e escuro: nomes, metadados, setas de direção e divisores acompanham os tokens do tema."
    />
    <UncDocThemeSwitcher surface="canvas" padding={0}>
      {() => (
        <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
          <CallListItem name="Amara Lima" timestamp="Ontem, 10:55" count={3} direction="outgoing" avatarSrc={uncAvatars[6]} />
          <CallListItem name="Bruno Reis" timestamp="Ontem, 10:55" direction="incoming" kind="video" avatarSrc={uncAvatars[7]} divider={false} />
        </ul>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UncDocPropsTable
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
  title: 'Unoochat/Componentes/CallListItem',
  component: CallListItem,
  parameters: { layout: 'padded' },
  argTypes: {
    name: { control: 'text', description: 'Nome do contato.' },
    timestamp: { control: 'text', description: 'Momento da chamada.' },
    count: { control: { type: 'number', min: 1, max: 99 }, description: 'Tentativas agrupadas.' },
    direction: { control: 'radio', options: ['outgoing', 'incoming'], description: 'Direção do registro.' },
    kind: { control: 'radio', options: ['voice', 'video'], description: 'Modalidade da chamada.' },
    avatarSrc: { control: 'select', options: uncAvatars, description: 'URL do avatar.' },
    initials: { control: 'text', description: 'Iniciais sem avatar.' },
    divider: { control: 'boolean', description: 'Desenha o divisor inferior.' },
  },
  args: {
    name: 'Amara Lima',
    timestamp: 'Ontem, 10:55',
    count: 3,
    direction: 'outgoing',
    kind: 'voice',
    avatarSrc: uncAvatars[0],
    initials: 'AL',
    divider: true,
  },
};

export default meta;

type Story = StoryObj<typeof CallListItem>;

/**
 * Documentação rica e completa do componente.
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
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem {...args} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Histórico de chamadas da aba Chamadas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        {uncCalls.map((call) => (
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
    </UncDocStage>
  ),
};

/**
 * Matriz completa de direções e modalidades.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Efetuada · voz" timestamp="Ontem, 10:55" direction="outgoing" kind="voice" avatarSrc={uncAvatars[0]} />
        <CallListItem name="Efetuada · vídeo" timestamp="Ontem, 10:55" direction="outgoing" kind="video" avatarSrc={uncAvatars[1]} />
        <CallListItem name="Recebida · voz" timestamp="Ontem, 10:55" direction="incoming" kind="voice" avatarSrc={uncAvatars[2]} />
        <CallListItem name="Recebida · vídeo" timestamp="Ontem, 10:55" direction="incoming" kind="video" avatarSrc={uncAvatars[3]} divider={false} />
      </ul>
    </UncDocStage>
  ),
};

/**
 * Estados de contagem agrupada.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch">
      <ul style={{ margin: 0, padding: 0, width: 411, listStyle: 'none' }}>
        <CallListItem name="Sem contagem" timestamp="Ontem, 10:55" direction="outgoing" avatarSrc={uncAvatars[4]} />
        <CallListItem name="Duas tentativas" timestamp="Ontem, 10:55" count={2} direction="incoming" avatarSrc={uncAvatars[5]} />
        <CallListItem name="Doze tentativas" timestamp="Ontem, 10:55" count={12} direction="incoming" avatarSrc={uncAvatars[6]} divider={false} />
      </ul>
    </UncDocStage>
  ),
};
