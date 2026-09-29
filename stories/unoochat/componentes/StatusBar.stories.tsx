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
import { StatusBar } from '../../../src/unoochat';

const BAR = '#716C98';

/**
 * Página de documentação rica do componente StatusBar.
 */
const StatusBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Moldura de sistema"
      title="StatusBar"
      description="Barra de status de sistema presente no topo de todas as telas do aparelho. Reúne o relógio em Open Sans, os indicadores de alerta, modo silencioso e sistema, as quatro barras de sinal, o rótulo de tecnologia de rede, o glifo de bateria e o percentual. Adapta-se à superfície da tela: canvas nas listagens e o roxo profundo da tela de chamada, e acompanha o tema claro ou escuro."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando e como aplicar a moldura de sistema."
    />
    <UncDocGrid>
      <UncDocCard icon="📱" title="Moldura, não interface">
        Representa o sistema operacional ao redor do aplicativo. Não recebe interação nem participa
        da ordem de foco: é escondida da tecnologia assistiva com <code>aria-hidden=&quot;true&quot;</code>.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Três variantes de fundo">
        <code>app</code> usa <code>--unc-color-surface-canvas</code>, <code>call</code> usa{' '}
        <code>--unc-color-call-statusbar</code> (invariante entre temas) e <code>transparent</code>{' '}
        permite sobrepor mídia em tela cheia.
      </UncDocCard>
      <UncDocCard icon="🔢" title="Altura variável">
        O padrão é 21px, e a prop <code>height</code> acomoda aparelhos com barras de 22, 24, 25 ou
        27px.
      </UncDocCard>
      <UncDocCard icon="🔋" title="Bateria independente do rótulo">
        O preenchimento do glifo e o percentual em texto são props separadas (
        <code>batteryLevel</code> e <code>batteryLabel</code>), o que permite demonstrar cargas
        intermediárias sem recalcular o texto.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Especificações técnicas"
      description="Medidas, tipografia e decisões registradas."
    />
    <UncDocSpecs
      component="StatusBar"
      layout="Barra · 21px"
      specs={[
        { label: 'Altura padrão', value: '21px' },
        { label: 'Relógio', value: 'Open Sans 600 · 14px' },
        { label: 'Rede', value: 'Open Sans 600 · 12px' },
        { label: 'Bateria (texto)', value: 'Open Sans 600 · 12px' },
        { label: 'Cor dos glifos', value: '--unc-color-statusbar-fg' },
        { label: 'Preenchimento da bateria', value: '--unc-color-warning-battery' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Glifos de sistema',
          detail:
            'alerta, silencioso e Android usam as ligaduras error, notifications_off e android do Material Symbols Rounded (16px), a biblioteca de ícones da Plataforma Unooria. Nenhum glifo é desenhado à mão.',
        },
        {
          subject: 'Bateria e sinal em CSS',
          detail:
            'o glifo de bateria (cápsula vertical de 7×12,5px com nó superior) e as quatro barras de sinal são desenhados em CSS, porque a biblioteca de ícones não os publica.',
        },
        {
          subject: 'Cor da bateria invariante',
          detail:
            'o preenchimento usa --unc-color-warning-battery (#F97607, de --unooria-color-warning-500) nos dois temas: o laranja mede contraste suficiente sobre superfícies claras e escuras.',
        },
        {
          subject: 'Relógio no degrau de 14px',
          detail:
            'o relógio usa o degrau body-xs da escala Unooria (14px, peso 600), e a rede e o percentual, o degrau body-xxs (12px).',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Zonas de customização e tokens consumidos."
    />
    <UncDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'Fundo da barra, definido pela variante.',
          token: '--unc-color-surface-canvas · --unc-color-call-statusbar',
        },
        {
          name: 'Relógio',
          role: 'Horário alinhado à calha de 24px.',
          token: '--unc-font-statusbar-clock-* · --unc-color-statusbar-fg',
        },
        {
          name: 'Indicadores do sistema',
          role: 'Alerta, modo silencioso e Android, todos opcionais.',
          token: 'Icon sbAlert · sbSilent · sbAndroid',
        },
        {
          name: 'Barras de sinal',
          role: 'Quatro barras de 3,006px com alturas crescentes; as vazias usam opacidade 0,3.',
          token: '--unc-color-statusbar-fg',
        },
        {
          name: 'Rótulo de rede',
          role: 'Tecnologia de conexão exibida antes da bateria.',
          token: '--unc-font-statusbar-network-*',
        },
        {
          name: 'Bateria',
          role: 'Cápsula com nó superior e preenchimento proporcional.',
          token: '--unc-color-warning-battery',
        },
        {
          name: 'Percentual',
          role: 'Rótulo textual do nível de carga.',
          token: '--unc-font-statusbar-battery-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes e estados"
      description="Componentes reais renderizados a 411px de largura, nos dois temas."
    />
    <UncDocStage
      label="Tema claro"
      theme="light"
      surface="base"
      direction="column"
      align="stretch"
      gap={16}
      padding={20}
    >
      <div style={{ width: 411 }}>
        <StatusBar />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="call" height={27} />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="transparent" signalBars={4} network="5G" batteryLabel="100%" batteryLevel={1} />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar signalBars={1} network="3G" batteryLabel="7%" batteryLevel={0.07} showSilent={false} />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar showAlert={false} showSilent={false} showAndroid={false} />
      </div>
    </UncDocStage>
    <UncDocStage
      label="Tema escuro"
      theme="dark"
      surface="base"
      direction="column"
      align="stretch"
      gap={16}
      padding={20}
    >
      <div style={{ width: 411 }}>
        <StatusBar />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="call" height={27} />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="transparent" signalBars={4} network="5G" batteryLabel="100%" batteryLevel={1} />
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Barras de sinal"
      description="De zero a quatro barras preenchidas."
    />
    <UncDocStage surface="base" direction="column" align="stretch" gap={10} padding={20}>
      {[0, 1, 2, 3, 4].map((bars) => (
        <div key={bars} style={{ width: 411 }}>
          <StatusBar signalBars={bars} />
        </div>
      ))}
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Colocar a StatusBar como primeiro filho do PhoneFrame, antes de qualquer barra do aplicativo.',
        'Trocar para variant="call" nas telas de chamada, acompanhando a mudança de superfície.',
        'Ajustar height quando o aparelho de referência tiver barra de 22, 24, 25 ou 27px.',
        'Manter o componente fora da ordem de foco: ele representa o sistema, não a aplicação.',
      ]}
      donts={[
        'Tornar os indicadores clicáveis ou adicionar tooltips.',
        'Aplicar a variante app sobre a superfície roxa da chamada.',
        'Substituir os glifos de sistema por ícones de outra biblioteca.',
        'Ocultar o relógio: ele está presente em todas as telas do aparelho.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: relógio e glifos seguem --unc-color-statusbar-fg."
    />
    <UncDocThemeSwitcher surface="base">
      {() => (
        <div style={{ width: 411 }}>
          <StatusBar />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="StatusBar"
      rows={[
        { name: 'time', type: 'string', default: "'08:34'", description: 'Relógio exibido à esquerda.' },
        { name: 'network', type: 'string', default: "'4G'", description: 'Rótulo da tecnologia de rede.' },
        { name: 'signalBars', type: 'number', default: '3', description: 'Barras de sinal preenchidas, de 0 a 4.' },
        { name: 'batteryLabel', type: 'string', default: "'7%'", description: 'Percentual de bateria em texto.' },
        { name: 'batteryLevel', type: 'number', default: '0.54', description: 'Proporção preenchida do glifo de bateria, de 0 a 1.' },
        { name: 'showAlert', type: 'boolean', default: 'true', description: 'Exibe o alerta do sistema.' },
        { name: 'showSilent', type: 'boolean', default: 'true', description: 'Exibe o indicador de modo silencioso.' },
        { name: 'showAndroid', type: 'boolean', default: 'true', description: 'Exibe o indicador do sistema Android.' },
        { name: 'variant', type: "'app' | 'call' | 'transparent'", default: "'app'", description: 'Contexto visual aplicado ao fundo.' },
        { name: 'height', type: 'number', default: '21', description: 'Altura da barra em pixels.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof StatusBar> = {
  title: 'Unoochat/Componentes/StatusBar',
  component: StatusBar,
  parameters: { layout: 'padded' },
  argTypes: {
    time: { control: 'text', description: 'Relógio exibido à esquerda.' },
    network: { control: 'text', description: 'Rótulo da tecnologia de rede.' },
    signalBars: { control: { type: 'range', min: 0, max: 4, step: 1 }, description: 'Barras de sinal preenchidas.' },
    batteryLabel: { control: 'text', description: 'Percentual de bateria em texto.' },
    batteryLevel: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: 'Proporção preenchida do glifo de bateria.' },
    showAlert: { control: 'boolean', description: 'Exibe o alerta do sistema.' },
    showSilent: { control: 'boolean', description: 'Exibe o indicador de modo silencioso.' },
    showAndroid: { control: 'boolean', description: 'Exibe o indicador do sistema Android.' },
    variant: { control: 'radio', options: ['app', 'call', 'transparent'], description: 'Contexto visual aplicado ao fundo.' },
    height: { control: { type: 'range', min: 18, max: 40, step: 1 }, description: 'Altura da barra em pixels.' },
  },
  args: {
    time: '08:34',
    network: '4G',
    signalBars: 3,
    batteryLabel: '7%',
    batteryLevel: 0.54,
    showAlert: true,
    showSilent: true,
    showAndroid: true,
    variant: 'app',
    height: 21,
  },
};

export default meta;

type Story = StoryObj<typeof StatusBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <StatusBarDocumentationPage />,
};

/**
 * Playground com 100% das props do StatusBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do StatusBar',
  render: (args) => (
    <UncDocStage surface="base" padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Barra de status no topo de uma tela de listagem, sobre o canvas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo em Tela de Listagem',
  render: () => (
    <UncDocStage surface="canvas" padding={0} align="stretch" direction="column">
      <div style={{ width: 411 }}>
        <StatusBar />
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa das três variantes de superfície.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="base" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar variant="app" />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="call" />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="transparent" />
      </div>
    </UncDocStage>
  ),
};

/**
 * Estados de sinal e de bateria.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="base" direction="column" align="stretch" gap={12} padding={20}>
      {[
        { signalBars: 0, batteryLevel: 0.05, batteryLabel: '5%' },
        { signalBars: 2, batteryLevel: 0.35, batteryLabel: '35%' },
        { signalBars: 4, batteryLevel: 1, batteryLabel: '100%' },
      ].map((state) => (
        <div key={state.batteryLabel} style={{ width: 411 }}>
          <StatusBar {...state} />
        </div>
      ))}
    </UncDocStage>
  ),
};
