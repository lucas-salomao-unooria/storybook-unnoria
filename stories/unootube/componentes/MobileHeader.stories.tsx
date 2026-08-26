import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, MobileHeader } from '../../../src/unootube';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  UniDocAnatomy,
  UniDocCard,
  UniDocDeviations,
  UniDocFigmaSpecs,
  UniDocGrid,
  UniDocPractices,
  UniDocPropsTable,
  UniDocStage,
  UniDocThemeSwitcher,
} from '../../../.storybook/components';
import { shortsPlayerPoster } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof MobileHeader> = {
  title: 'Unootube/Componentes/MobileHeader',
  component: MobileHeader,
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    backLabel: { control: 'text' },
    hideBack: { control: 'boolean' },
    surface: { control: 'radio', options: ['chrome', 'page', 'transparent'] },
    className: { control: 'text' },
    onBack: { action: 'onBack' },
  },
  args: {
    title: '',
    backLabel: 'Voltar',
    hideBack: false,
    surface: 'chrome',
  },
};

export default meta;

type Story = StoryObj<typeof MobileHeader>;

const Phone: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ width: 390, maxWidth: '100%' }}>{children}</div>
);

const MobileHeaderDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="MobileHeader"
      description="Reprodução do cabeçalho das telas móveis internas do arquivo Free YouTube Shorts Mockups (Community): a barra do reprodutor de Shorts (3:245, com voltar e câmera) e a do cabeçalho de canal (16:1070, com voltar e reticências)."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Três superfícies, e o par de glifos que fez o registro de ícones aceitar traço."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="✏️" title="Os únicos glifos traçados">
        A seta e a câmera declaram <code>stroke-width: 2</code> com pontas arredondadas nos dois nós.
        São o único par assim em toda a biblioteca, e foram o motivo de o registro de ícones passar a
        aceitar caminhos com traço além de caminhos preenchidos.
      </UniDocCard>
      <UniDocCard icon="🎨" title="chrome — a tinta do Shorts">
        Preenchida com <code>#161722</code>, a tinta escura do arquivo. Não muda com o tema, e por
        isso os glifos são sempre brancos.
      </UniDocCard>
      <UniDocCard icon="🌗" title="page — acompanha o tema">
        A superfície do cabeçalho de canal, que é escura no tema escuro e clara no claro. Os glifos
        seguem o texto primário.
      </UniDocCard>
      <UniDocCard icon="🎬" title="transparent — sobre o vídeo">
        Sem preenchimento e posicionada de forma absoluta no topo do quadro, para quando o reprodutor
        ocupa a tela inteira.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="3:245"
      frameName="Frame 39"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'Reprodutor de Shorts', value: '390 × 47 · fundo #161722' },
        { label: 'Cabeçalho de canal', value: '360 × 43,46' },
        { label: 'Recuos', value: '12 vertical · 16 lateral' },
        { label: 'Alvos', value: '32px · traço de 2px, pontas arredondadas' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Título ausente no arquivo',
          detail:
            'as duas telas em que o arquivo desenha o cabeçalho deixam o centro vazio. A prop title existe para as telas do produto que precisarem dele, e usa o mesmo degrau Medium 16 dos rótulos móveis.',
        },
        {
          subject: 'Superfície `page`',
          detail:
            'o arquivo desenha o cabeçalho de canal com a superfície da página, que muda entre os quadros claro e escuro. A superfície do reprodutor de Shorts, ao contrário, é a tinta literal #161722 nos dois. As duas foram separadas em valores distintos da prop surface.',
        },
        {
          subject: 'Superfície `transparent`',
          detail:
            'não existe no arquivo, que sempre desenha a barra opaca acima do vídeo. Foi acrescentada porque o reprodutor de Shorts em tela cheia não deixa faixa para uma barra opaca.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover e foco foram acrescentados como redução de opacidade e anel de foco em tokens da própria marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Barra',
          role: 'Altura de 47px, com recuos de 12 e 16.',
          token: '--uni-mobile-header-height',
        },
        {
          name: 'Voltar',
          role: 'Alvo de 32px com a seta traçada de 2px.',
          token: 'arrowLeft · stroke 2',
        },
        {
          name: 'Título',
          role: 'Roboto Medium 16 entre os dois alvos. Ausente no arquivo.',
          token: '--uni-font-body-lg-*',
        },
        {
          name: 'Ação',
          role: 'Slot à direita: câmera no reprodutor, reticências no canal.',
          token: 'camera · moreVertical',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage
      label="chrome — a barra do reprodutor de Shorts, como no arquivo"
      surface="primary"
      align="stretch"
      padding={0}
    >
      <Phone>
        <MobileHeader action={<Icon name="camera" size={32} />} />
      </Phone>
    </UniDocStage>
    <UniDocStage
      label="page — a barra do cabeçalho de canal"
      surface="primary"
      align="stretch"
      padding={0}
    >
      <Phone>
        <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
      </Phone>
    </UniDocStage>
    <UniDocStage label="transparent — sobre o vídeo" surface="primary" align="stretch">
      <div
        style={{
          position: 'relative',
          width: 390,
          maxWidth: '100%',
          height: 260,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundImage: `url("${shortsPlayerPoster}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <MobileHeader surface="transparent" action={<Icon name="camera" size={32} />} />
      </div>
    </UniDocStage>
    <UniDocStage label="Com título e sem voltar" surface="primary" align="stretch" padding={0}>
      <Phone>
        <MobileHeader title="Shorts em alta" action={<Icon name="moreVertical" size={20} />} />
      </Phone>
      <Phone>
        <MobileHeader hideBack title="Sua biblioteca" surface="page" />
      </Phone>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use chrome no reprodutor de Shorts e page no cabeçalho de canal — são superfícies diferentes no arquivo.',
        'Use transparent quando o vídeo ocupar a tela inteira: a barra passa a flutuar sobre o quadro.',
        'Informe backLabel quando o destino de volta não for óbvio pelo contexto.',
        'Componha a ação da direita com Icon; o slot aceita qualquer nó.',
      ]}
      donts={[
        'Não use chrome sobre superfície clara: a tinta #161722 não acompanha o tema.',
        'Não redesenhe a seta nem a câmera: são caminhos traçados literais do arquivo.',
        'Não coloque mais de uma ação à direita — o arquivo publica só um alvo.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A superfície page acompanha o tema; a chrome é a tinta literal do arquivo e é invariante. As duas aparecem lado a lado no alternador."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <Phone>
            <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
          </Phone>
          <Phone>
            <MobileHeader surface="chrome" action={<Icon name="camera" size={32} />} />
          </Phone>
        </div>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="MobileHeader"
      rows={[
        {
          name: 'title',
          type: 'React.ReactNode',
          description:
            'Título entre os dois alvos. O arquivo deixa o centro vazio nas duas telas em que desenha o cabeçalho.',
        },
        { name: 'onBack', type: '() => void', description: 'Chamado ao acionar o alvo de voltar.' },
        {
          name: 'backLabel',
          type: 'string',
          default: "'Voltar'",
          description: 'Rótulo acessível do alvo de voltar.',
        },
        {
          name: 'hideBack',
          type: 'boolean',
          default: 'false',
          description: 'Oculta o alvo de voltar.',
        },
        {
          name: 'action',
          type: 'React.ReactNode',
          description:
            'Alvo à direita. No reprodutor é a câmera; no cabeçalho de canal, as reticências.',
        },
        {
          name: 'surface',
          type: "'chrome' | 'page' | 'transparent'",
          default: "'chrome'",
          description:
            'Tinta escura do arquivo, superfície de navegação do tema, ou sem preenchimento sobre o vídeo.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <header>.',
        },
      ]}
    />
  </UnooriaDocShell>
);

/**
 * Documentação rica e completa do componente baseada nas especificações do Figma.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <MobileHeaderDocumentationPage />,
};

/**
 * Playground com 100% das props do MobileHeader expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MobileHeader',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        position: 'relative',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Phone>
        <div style={{ position: 'relative', minHeight: 60 }}>
          <MobileHeader {...args} action={<Icon name="camera" size={32} />} />
        </div>
      </Phone>
    </div>
  ),
};

/**
 * Réplica visual dos nós `3:245` e `16:1070`.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <Phone>
        <MobileHeader action={<Icon name="camera" size={32} />} />
      </Phone>
      <div style={{ width: 360, maxWidth: '100%' }}>
        <MobileHeader surface="page" action={<Icon name="moreVertical" size={20} />} />
      </div>
    </div>
  ),
};

/**
 * As três superfícies suportadas.
 */
export const TodasVariantes: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['chrome', 'page'] as const).map((surface) => (
        <div key={surface}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {surface}
          </div>
          <Phone>
            <MobileHeader surface={surface} action={<Icon name="camera" size={32} />} />
          </Phone>
        </div>
      ))}
      <div>
        <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
          transparent
        </div>
        <div
          style={{
            position: 'relative',
            width: 390,
            maxWidth: '100%',
            height: 200,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundImage: `url("${shortsPlayerPoster}")`,
            backgroundSize: 'cover',
          }}
        >
          <MobileHeader surface="transparent" action={<Icon name="camera" size={32} />} />
        </div>
      </div>
    </div>
  ),
};
