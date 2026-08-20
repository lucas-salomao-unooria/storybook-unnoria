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
import { StatusBar } from '../../../src/whatsappmobile';

const BAR = '#0CA996';

/**
 * Página de documentação rica do componente StatusBar.
 */
const StatusBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Whatsapp Mobile"
      category="Componentes • Moldura de sistema"
      title="StatusBar"
      description="Barra de status do Android presente em todos os setenta e cinco frames do arquivo. Reúne o relógio em SF Compact Display, os indicadores de alerta, modo silencioso e sistema, as quatro barras de sinal, o rótulo de tecnologia de rede, o glifo de bateria e o percentual. Adapta-se à superfície da tela: canvas nas listagens e verde escuro na tela de chamada."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Quando e como aplicar a moldura de sistema."
    />
    <WaDocGrid>
      <WaDocCard icon="📱" title="Moldura, não interface">
        Reproduz o sistema operacional desenhado no arquivo. Não recebe interação nem participa da
        ordem de foco; é anunciada como <code>role=&quot;presentation&quot;</code>.
      </WaDocCard>
      <WaDocCard icon="🎨" title="Três variantes de fundo">
        <code>app</code> usa <code>--wa-color-surface-canvas</code>, <code>call</code> usa{' '}
        <code>--wa-color-call-statusbar</code> (#04453D) e <code>transparent</code> permite
        sobrepor mídia em tela cheia.
      </WaDocCard>
      <WaDocCard icon="🔢" title="Altura variável">
        Os frames desenham 21, 22, 24, 25 e 27px conforme a tela. O padrão é 21px e a prop{' '}
        <code>height</code> reproduz os demais casos.
      </WaDocCard>
      <WaDocCard icon="🔋" title="Bateria independente do rótulo">
        O arquivo desenha o preenchimento em ~54% enquanto o rótulo diz 7%. As duas informações são
        props separadas (<code>batteryLevel</code> e <code>batteryLabel</code>), preservando a
        inconsistência original quando desejado.
      </WaDocCard>
    </WaDocGrid>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="2. Figma e especificações técnicas"
      description="Nós de referência e desvios registrados."
    />
    <WaDocFigmaSpecs
      nodeId="1:2133"
      frameName="Chats Main Page · barra de status"
      specs={[
        { label: 'Altura padrão', value: '21px' },
        { label: 'Relógio', value: 'SF Compact Display 600 · 16,544px' },
        { label: 'Rede', value: 'SF Compact Display 600 · 14,238px' },
        { label: 'Bateria (texto)', value: 'PT Sans 700 · 13,54px' },
        { label: 'Cor dos glifos', value: '#B5B5B5' },
        { label: 'Preenchimento da bateria', value: '#FDD015' },
      ]}
    />
    <WaDocDeviations
      items={[
        {
          subject: 'icomoon-free:magic-wand',
          detail:
            'o quarto indicador do grupo à esquerda foi exportado vazio pelo Figma. Como desenhá-lo à mão violaria a regra de iconografia, ele não é renderizado.',
        },
        {
          subject: 'Geometria da bateria',
          detail:
            'o arquivo desenha três retângulos girados -90°. O componente reconstrói o mesmo resultado visual como cápsula vertical de 7×12,5px com nó superior de 3,462px, mantendo cores e proporções.',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Zonas de customização e tokens consumidos."
    />
    <WaDocAnatomy
      zones={[
        {
          name: 'Superfície',
          role: 'Fundo da barra, definido pela variante.',
          token: '--wa-color-surface-canvas · --wa-color-call-statusbar',
        },
        {
          name: 'Relógio',
          role: 'Horário alinhado à calha de 24px.',
          token: '--wa-font-statusbar-clock-* · --wa-color-statusbar-fg',
        },
        {
          name: 'Indicadores do sistema',
          role: 'Alerta, modo silencioso e Android, todos opcionais.',
          token: 'Icon sbAlert · sbSilent · sbAndroid',
        },
        {
          name: 'Barras de sinal',
          role: 'Quatro barras de 3,006px com alturas crescentes; as vazias usam opacidade 0,3.',
          token: '--wa-color-statusbar-fg',
        },
        {
          name: 'Rótulo de rede',
          role: 'Tecnologia de conexão exibida antes da bateria.',
          token: '--wa-font-statusbar-network-*',
        },
        {
          name: 'Bateria',
          role: 'Cápsula com nó superior e preenchimento proporcional.',
          token: '--wa-color-warning-battery',
        },
        {
          name: 'Percentual',
          role: 'Rótulo textual do nível de carga.',
          token: '--wa-font-statusbar-battery-*',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes e estados"
      description="Componentes reais renderizados a 411px de largura."
    />
    <WaDocStage surface="base" direction="column" align="stretch" gap={16} padding={20}>
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
    </WaDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Barras de sinal"
      description="De zero a quatro barras preenchidas."
    />
    <WaDocStage surface="base" direction="column" align="stretch" gap={10} padding={20}>
      {[0, 1, 2, 3, 4].map((bars) => (
        <div key={bars} style={{ width: 411 }}>
          <StatusBar signalBars={bars} />
        </div>
      ))}
    </WaDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <WaDocPractices
      dos={[
        'Colocar a StatusBar como primeiro filho do PhoneFrame, antes de qualquer barra do aplicativo.',
        'Trocar para variant="call" nas telas de chamada, acompanhando a mudança de esquema.',
        'Ajustar height quando reproduzir um frame que desenha 22, 24, 25 ou 27px.',
        'Manter o componente fora da ordem de foco: ele representa o sistema, não a aplicação.',
      ]}
      donts={[
        'Tornar os indicadores clicáveis ou adicionar tooltips.',
        'Aplicar a variante app sobre a superfície verde da chamada.',
        'Substituir os glifos de sistema por ícones de outra biblioteca.',
        'Ocultar o relógio: ele está presente em todos os frames do arquivo.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Superfícies suportadas"
      description="O arquivo publica apenas o tema escuro; alterne entre as superfícies oficiais."
    />
    <WaDocSurfaceSwitcher surfaces={['canvas', 'base', 'call']} initial="canvas">
      {() => (
        <div style={{ width: 411 }}>
          <StatusBar variant="transparent" />
        </div>
      )}
    </WaDocSurfaceSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <WaDocPropsTable
      title="StatusBar"
      rows={[
        { name: 'time', type: 'string', default: "'08:34'", description: 'Relógio exibido à esquerda.' },
        { name: 'network', type: 'string', default: "'4G'", description: 'Rótulo da tecnologia de rede.' },
        { name: 'signalBars', type: 'number', default: '3', description: 'Barras de sinal preenchidas, de 0 a 4.' },
        { name: 'batteryLabel', type: 'string', default: "'7%'", description: 'Percentual de bateria em texto.' },
        { name: 'batteryLevel', type: 'number', default: '0.54', description: 'Proporção preenchida do glifo de bateria, de 0 a 1.' },
        { name: 'showAlert', type: 'boolean', default: 'true', description: 'Exibe o alerta triangular do sistema.' },
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
  title: 'Whatsapp Mobile/Componentes/StatusBar',
  component: StatusBar,
  parameters: { layout: 'padded' },
  argTypes: {
    time: { control: 'text', description: 'Relógio exibido à esquerda.' },
    network: { control: 'text', description: 'Rótulo da tecnologia de rede.' },
    signalBars: { control: { type: 'range', min: 0, max: 4, step: 1 }, description: 'Barras de sinal preenchidas.' },
    batteryLabel: { control: 'text', description: 'Percentual de bateria em texto.' },
    batteryLevel: { control: { type: 'range', min: 0, max: 1, step: 0.01 }, description: 'Proporção preenchida do glifo de bateria.' },
    showAlert: { control: 'boolean', description: 'Exibe o alerta triangular do sistema.' },
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
 * Documentação rica e completa do componente, baseada nas especificações do Figma.
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
    <WaDocStage surface="base" padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar {...args} />
      </div>
    </WaDocStage>
  ),
};

/**
 * Réplica visual da barra do frame "Chats Main Page".
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <WaDocStage surface="canvas" padding={0} align="stretch" direction="column">
      <div style={{ width: 411 }}>
        <StatusBar />
      </div>
    </WaDocStage>
  ),
};

/**
 * Matriz completa das três variantes de superfície.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <WaDocStage surface="base" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <StatusBar variant="app" />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="call" />
      </div>
      <div style={{ width: 411 }}>
        <StatusBar variant="transparent" />
      </div>
    </WaDocStage>
  ),
};

/**
 * Estados de sinal e de bateria.
 */
export const Estados: Story = {
  render: () => (
    <WaDocStage surface="base" direction="column" align="stretch" gap={12} padding={20}>
      {[
        { signalBars: 0, batteryLevel: 0.05, batteryLabel: '5%' },
        { signalBars: 2, batteryLevel: 0.35, batteryLabel: '35%' },
        { signalBars: 4, batteryLevel: 1, batteryLabel: '100%' },
      ].map((state) => (
        <div key={state.batteryLabel} style={{ width: 411 }}>
          <StatusBar {...state} />
        </div>
      ))}
    </WaDocStage>
  ),
};
