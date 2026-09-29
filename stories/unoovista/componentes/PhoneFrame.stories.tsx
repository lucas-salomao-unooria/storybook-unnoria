import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PhoneFrame } from '../../../src/unoovista/components/PhoneFrame';
import { Logo } from '../../../src/unoovista/components/Logo';
import { Avatar } from '../../../src/unoovista/components/Avatar';
import { Badge } from '../../../src/unoovista/components/Badge';
import { Button } from '../../../src/unoovista/components/Button';
import { Chip } from '../../../src/unoovista/components/Chip';
import { Divider } from '../../../src/unoovista/components/Divider';
import { Icon } from '../../../src/unoovista/components/Icon';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UnvDocGrid,
  UnvDocCard,
  UnvDocSpecs,
  UnvDocDecisions,
  UnvDocAnatomy,
  UnvDocPractices,
  UnvDocPropsTable,
  UnvDocStage,
  UnvDocThemeSwitcher,
} from '../../../.storybook/components';
import { unvAvatars, unvPhotos } from '../fixtures';

const BAR = '#716C98';

const portraits = Object.values(unvAvatars) as string[];
const photos = Object.values(unvPhotos) as string[];

const TRAY = [
  { name: 'Você', ring: 'seen' as const, badge: 'add' as const },
  { name: 'Marina', ring: 'live' as const, badge: 'live' as const },
  { name: 'Caetano', ring: 'story' as const, badge: 'none' as const },
  { name: 'Iara', ring: 'story' as const, badge: 'none' as const },
  { name: 'Tomás', ring: 'seen' as const, badge: 'none' as const },
];

/**
 * Tela de demonstração do quadro, composta só de componentes do módulo:
 * cabeçalho com a marca, faixa de filtros, bandeja de histórias e um cartão.
 */
const DemoScreen = () => (
  <>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px 12px',
      }}
    >
      <Logo height={26} />
      <span style={{ position: 'relative', display: 'inline-flex' }}>
        <Icon name="heart" size="md" />
        <Badge variant="notification" dot style={{ position: 'absolute', top: 0, right: 0 }} />
      </span>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px', display: 'grid', gap: 16, alignContent: 'start' }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: 4, margin: -4 }}>
        <Chip selected>Para você</Chip>
        <Chip>Seguindo</Chip>
        <Chip leadingIcon={<Icon name="longVideo" size="sm" tone="inherit" />}>Vídeos</Chip>
      </div>
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', padding: '4px 4px 12px', margin: -4 }}>
        {TRAY.map((item, index) => (
          <Avatar
            key={item.name}
            src={portraits[index % portraits.length]}
            alt={item.name}
            ring={item.ring}
            badge={item.badge}
            style={{ '--unv-avatar-gap-color': 'var(--unv-color-background-secondary)' } as React.CSSProperties}
          />
        ))}
      </div>
      <div
        style={{
          background: 'var(--unv-color-background-primary)',
          borderRadius: 16,
          padding: 16,
          display: 'grid',
          gap: 12,
          fontFamily: 'var(--unv-font-sans)',
          color: 'var(--unv-color-text-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar src={portraits[2 % portraits.length]} alt="" size="md" />
          <div style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>Caetano Braga</div>
        </div>
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', height: 180 }}>
          <img
            src={photos[0]}
            alt="Cruzamento de avenidas ao entardecer"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Badge variant="counter" style={{ position: 'absolute', top: 10, right: 10 }}>
            1/3
          </Badge>
        </div>
        <Divider />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm">Seguir</Button>
          <Button size="sm" variant="secondary">
            Mensagem
          </Button>
        </div>
      </div>
    </div>
  </>
);

/**
 * Página de documentação rica do componente PhoneFrame.
 */
const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoovista"
      category="Componentes • Estrutura"
      title="PhoneFrame"
      description="Quadro de apresentação de 375 × 812px com um cromo de sistema genérico e próprio: barra de status de 44px (horário, sinal, conexão e bateria) e barra de gesto de 34px na base. É um contêiner de documentação para compor e validar telas inteiras — não um componente de produção, e não imita nenhum aparelho."
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="1. Visão geral e casos de uso"
      description="Um contêiner de composição, não um componente de produto."
    />
    <UnvDocGrid>
      <UnvDocCard icon="📱" title="Dimensão canônica">
        375 × 812px é a caixa em que toda composição de tela do módulo é validada, com as alturas de
        barra de status e de gesto tokenizadas (<code>--unv-statusbar-height</code>,{' '}
        <code>--unv-home-indicator-height</code>).
      </UnvDocCard>
      <UnvDocCard icon="🔋" title="Glifos do módulo">
        Sinal, conexão e bateria são ligaduras do Material Symbols Rounded, os mesmos do <code>Icon</code>{' '}
        — nada de vetor de aparelho. Cabem no registro como <code>signalCellular</code>, <code>wifi</code>{' '}
        e <code>battery</code>.
      </UnvDocCard>
      <UnvDocCard icon="🧱" title="Área útil calculada">
        O slot de conteúdo ocupa o espaço entre a barra de status e a base, com rolagem própria — o mesmo
        comportamento das telas reais.
      </UnvDocCard>
      <UnvDocCard icon="🖼️" title="Moldura opcional">
        <code>framed</code> arredonda os cantos e desenha um fio de 1px em volta, para exibição em
        galerias; desligue ao embutir o quadro em outra composição.
      </UnvDocCard>
    </UnvDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UnvDocSpecs
      component="PhoneFrame"
      layout="Quadro · 375 × 812px"
      specs={[
        { label: 'Dimensão', value: '375 × 812px' },
        { label: 'Barra de status', value: '44px · recuo lateral de 20px' },
        { label: 'Horário', value: 'title-md · 16px/600' },
        { label: 'Glifos de sistema', value: '18px · Material Symbols Rounded' },
        { label: 'Barra de gesto', value: '34px de zona · pílula de 128 × 4px' },
        { label: 'Moldura (framed)', value: 'raio 36px · fio de 1px em border-default' },
        { label: 'Fundo da tela', value: '--unv-color-background-secondary' },
      ]}
    />
    <UnvDecisionsBlock />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="3. Anatomia do componente"
      description="Barra de status, área de conteúdo e barra de gesto."
    />
    <UnvDocAnatomy
      zones={[
        {
          name: 'Barra de status',
          role: 'Horário à esquerda; sinal, conexão e bateria à direita, em texto primário.',
          token: '--unv-statusbar-height · --unv-color-text-primary',
        },
        {
          name: 'Área de conteúdo',
          role: 'Slot children, com flex e overflow oculto; cada tela decide onde rola.',
          token: '--unv-color-background-secondary',
        },
        {
          name: 'Barra de gesto',
          role: 'Pílula centralizada na base, decorativa e sem interação.',
          token: '--unv-home-indicator-height',
        },
        {
          name: 'Moldura',
          role: 'Raio de 36px e fio de 1px, só com framed.',
          token: '--unv-color-border-default',
        },
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="4. Matriz de variantes, tamanhos e estados"
      description="Quadro completo, sem barras de sistema e com barra de status personalizada."
    />
    <UnvDocStage label="Quadro completo, sem barras e em altura reduzida" align="flex-start" gap={32}>
      <PhoneFrame ariaLabel="Quadro completo" height={560}>
        <DemoScreen />
      </PhoneFrame>
      <PhoneFrame ariaLabel="Quadro sem barras" height={560} withStatusBar={false} withHomeIndicator={false}>
        <DemoScreen />
      </PhoneFrame>
      <PhoneFrame ariaLabel="Quadro com horário personalizado" height={560} time="18:30">
        <DemoScreen />
      </PhoneFrame>
    </UnvDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="5. Boas práticas" />
    <UnvDocPractices
      dos={[
        'Usar o quadro para validar composições de tela inteira em 375 × 812px.',
        'Desligar framed ao embutir o quadro dentro de outra moldura.',
        'Passar ariaLabel quando o quadro for o único rótulo da região.',
        'Deixar a rolagem para o conteúdo: o quadro só recorta.',
      ]}
      donts={[
        'Usar o PhoneFrame em produção: ele é um contêiner de documentação.',
        'Imitar a barra de status de um aparelho específico.',
        'Desenhar os glifos de sistema à mão: eles vêm do registro do Icon.',
        'Empilhar rolagens dentro do slot sem definir a altura de cada uma.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="6. Suporte a temas"
      description="Fundo, texto e fio acompanham os tokens do tema, e o cromo de sistema junto."
    />
    <UnvDocThemeSwitcher surface="secondary">
      {() => (
        <PhoneFrame ariaLabel="Quadro no tema ativo" height={560}>
          <DemoScreen />
        </PhoneFrame>
      )}
    </UnvDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="7. Referência completa de props" />
    <UnvDocPropsTable
      title="PhoneFrame"
      rows={[
        { name: 'time', type: 'string', default: "'9:41'", description: 'Horário exibido na barra de status.' },
        {
          name: 'withStatusBar',
          type: 'boolean',
          default: 'true',
          description: 'Exibe a barra de status no topo do quadro.',
        },
        {
          name: 'withHomeIndicator',
          type: 'boolean',
          default: 'true',
          description: 'Exibe a barra de gesto na base do quadro.',
        },
        {
          name: 'framed',
          type: 'boolean',
          default: 'true',
          description: 'Aplica cantos arredondados e o fio de contorno, para galerias.',
        },
        {
          name: 'statusBarBackground',
          type: 'string',
          description: 'Cor de fundo da barra de status. Por padrão acompanha a superfície da tela.',
        },
        { name: 'height', type: 'number', default: '812', description: 'Altura útil do quadro em pixels.' },
        { name: 'ariaLabel', type: 'string', description: 'Rótulo acessível do quadro (role="group").' },
        {
          name: 'theme',
          type: "'light' | 'dark'",
          description: 'Força o tema. Sem valor, herda o de data-unv-theme do contêiner.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Registro de decisões do PhoneFrame.
 */
const UnvDecisionsBlock = () => (
  <UnvDocDecisions
    items={[
      {
        subject: 'Cromo de sistema genérico',
        detail:
          'a barra de status e a barra de gesto são próprias do Unoovista: horário e três glifos do Icon (signalCellular, wifi, battery), sem entalhe nem forma de aparelho reconhecível. O contêiner é de documentação.',
      },
      {
        subject: 'Três glifos acrescentados ao registro',
        detail:
          'signal_cellular_4_bar, signal_wifi_4_bar e battery_full são ligaduras do quadro de ícones da Plataforma Unooria e entram em IconGlyphs.ts com o uso de cada uma.',
      },
      {
        subject: 'Tela em background-secondary',
        detail:
          'o fundo do quadro é a camada de tela (lavanda no claro, roxo profundo no escuro); os cartões de conteúdo, em background-primary, se destacam por camada.',
      },
      {
        subject: 'Moldura de 36px com fio',
        detail:
          'o raio é --unv-radius-xl + --unv-radius-m; o contorno é um fio de 1px em --unv-color-border-default. Sem sombra: nenhuma elevação além de --unv-elevation-overlay é usada no módulo.',
      },
      {
        subject: 'Medidas próprias da barra de gesto',
        detail:
          'a pílula de 128 × 4px é definida por custom properties locais (--unv-phone-frame-gesture-width e -height), sem token equivalente no módulo.',
      },
      {
        subject: 'API',
        detail:
          'as props não mudaram; theme deixou de ter valor padrão. Os glifos exportados (MobileSignalGlyph, WifiGlyph, BatteryGlyph) mantêm o nome, mas agora renderizam o Icon e aceitam size e className.',
      },
    ]}
  />
);

const meta: Meta<typeof PhoneFrame> = {
  title: 'Unoovista/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    time: { control: 'text', description: 'Horário exibido na barra de status.' },
    withStatusBar: { control: 'boolean', description: 'Exibe a barra de status.' },
    withHomeIndicator: { control: 'boolean', description: 'Exibe a barra de gesto.' },
    framed: { control: 'boolean', description: 'Aplica cantos arredondados e fio de contorno.' },
    statusBarBackground: { control: 'text', description: 'Cor de fundo da barra de status.' },
    height: {
      control: { type: 'range', min: 400, max: 900, step: 4 },
      description: 'Altura útil do quadro em pixels.',
    },
    ariaLabel: { control: 'text', description: 'Rótulo acessível do quadro.' },
    theme: { control: 'radio', options: ['light', 'dark'], description: 'Tema visual.' },
  },
  args: {
    time: '9:41',
    withStatusBar: true,
    withHomeIndicator: true,
    framed: true,
    statusBarBackground: '',
    height: 812,
    ariaLabel: 'Quadro de demonstração',
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<typeof PhoneFrame>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com todas as propriedades do PhoneFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: (args) => (
    <UnvDocStage theme={args.theme ?? 'light'} surface="tertiary" padding={32}>
      <PhoneFrame {...args} statusBarBackground={args.statusBarBackground || undefined}>
        <DemoScreen />
      </PhoneFrame>
    </UnvDocStage>
  ),
};

/**
 * Os dois temas lado a lado, com a mesma tela.
 */
export const ExemploDeComposicao: Story = {
  name: '🎨 Exemplo de Composição',
  render: () => (
    <UnvDocStage align="flex-start" gap={40} surface="tertiary" padding={32}>
      <PhoneFrame theme="light" ariaLabel="Tema claro">
        <DemoScreen />
      </PhoneFrame>
      <PhoneFrame theme="dark" ariaLabel="Tema escuro">
        <DemoScreen />
      </PhoneFrame>
    </UnvDocStage>
  ),
};
