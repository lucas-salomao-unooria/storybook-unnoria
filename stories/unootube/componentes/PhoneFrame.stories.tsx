import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import {
  Icon,
  MobileTabBar,
  MobileTopBar,
  PhoneFrame,
  ShortsCard,
  ShortsLogo,
  ShortsShelf,
} from '../../../src/unootube';
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
import { avatars, shorts } from '../fixtures';

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof PhoneFrame> = {
  title: 'Unootube/Componentes/PhoneFrame',
  component: PhoneFrame,
  parameters: { layout: 'padded' },
  argTypes: {
    device: { control: 'radio', options: ['iphone', 'android'] },
    surface: { control: 'radio', options: ['primary', 'secondary', 'immersive'] },
    scale: { control: { type: 'range', min: 0.4, max: 1, step: 0.02 } },
    className: { control: 'text' },
  },
  args: {
    device: 'iphone',
    surface: 'primary',
    scale: 1,
  },
};

export default meta;

type Story = StoryObj<typeof PhoneFrame>;

/** Tela de demonstração montada só com componentes de produção. */
const DemoScreen = () => (
  <>
    <MobileTopBar avatarSrc={avatars.currentUser} />
    <div className="uni-phone-frame__scroll">
      <ShortsShelf>
        {shorts.slice(0, 6).map((short) => (
          <ShortsCard
            key={short.id}
            thumbnailSrc={short.thumbnailSrc}
            videoTitle={short.videoTitle}
            views={short.views}
          />
        ))}
      </ShortsShelf>
      <ShortsShelf label="Em alta">
        {shorts.slice(6).map((short) => (
          <ShortsCard
            key={short.id}
            thumbnailSrc={short.thumbnailSrc}
            videoTitle={short.videoTitle}
            views={short.views}
          />
        ))}
      </ShortsShelf>
    </div>
    <MobileTabBar>
      <MobileTabBar.Item icon={<Icon name="homeFill" size="lg" />} label="Home" active />
      <MobileTabBar.Item icon={<ShortsLogo variant="mono" size={26} />} label="Shorts" />
      <MobileTabBar.CreateButton />
      <MobileTabBar.Item icon={<Icon name="subscriptions" size="xl" />} label="Subscription" />
      <MobileTabBar.Item icon={<Icon name="library" size="xl" />} label="Library" />
    </MobileTabBar>
  </>
);

const PhoneFrameDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Documentação"
      title="PhoneFrame"
      description="Contêiner de documentação, não de produção. Reproduz o quadro de dispositivo em que o arquivo Free YouTube Shorts Mockups (Community) desenha as telas móveis — 390×844 no iPhone e 360×800 no Android — para que as estórias mostrem as composições na medida real. Cumpre no módulo móvel o mesmo papel que o DesktopFrame cumpre nas telas de 1440px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Por que existe, e por que nada de produção depende dele."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="📐" title="Medida real, não aproximada">
        Os dois quadros são literais do arquivo. Uma barra de abas avaliada em 390px se comporta
        diferente da mesma barra avaliada em 360px — e o arquivo publica as duas.
      </UniDocCard>
      <UniDocCard icon="📜" title="A tela rola de verdade">
        A classe utilitária <code>uni-phone-frame__scroll</code> marca a região que rola. O arquivo é
        um quadro estático com o conteúdo cortado na aresta inferior; sem rolagem, o que passa da
        borda ficaria inalcançável.
      </UniDocCard>
      <UniDocCard icon="🔍" title="Escala para caber no painel">
        <code>scale</code> reduz a moldura sem alterar a medida interna, para que várias telas caibam
        lado a lado na documentação.
      </UniDocCard>
      <UniDocCard icon="🚫" title="Fora do produto">
        Nenhum componente de produção depende dele. É o mesmo contrato do{' '}
        <code>DesktopFrame</code> e do <code>PhoneFrame</code> das outras marcas.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Quadros de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:115"
      frameName="iPhone Shorts Light theme"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'iPhone', value: '390 × 844' },
        { label: 'Android', value: '360 × 800' },
        { label: 'Superfícies', value: 'página, navegação e imersiva' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Raio de 24px',
          detail:
            'o arquivo desenha os quadros com cantos retos. O raio existe apenas para que a moldura leia como um dispositivo dentro do painel de documentação, e nenhum componente de produção depende dele.',
        },
        {
          subject: 'Rolagem real',
          detail:
            'as telas do arquivo são quadros estáticos com o conteúdo cortado na aresta. A região de rolagem é marcada por uma classe utilitária, e não imposta ao quadro inteiro, para que barras fixas continuem fixas.',
        },
        {
          subject: 'Ausência de barra de status',
          detail:
            'ao contrário do Instanooria, do WhatsApp Mobile e do Tik Tooria, este arquivo não desenha a barra de status do sistema em nenhuma das seis telas móveis: o conteúdo começa no topo do quadro. Nenhuma foi inventada.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Moldura',
          role: 'Quadro de 390×844 ou 360×800, com recorte.',
          token: '--uni-phone-width · --uni-phone-android-width',
        },
        {
          name: 'Superfície',
          role: 'Página, navegação ou imersiva — a última para o reprodutor de Shorts.',
          token: '--uni-color-background-primary · -secondary · --uni-color-shorts-cell',
        },
        {
          name: 'Região de rolagem',
          role: 'Marcada por uni-phone-frame__scroll, entre barras fixas.',
          token: '--uni-color-background-surface',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Os dois quadros de dispositivo" surface="primary" align="flex-start" gap={32}>
      <PhoneFrame device="iphone" scale={0.72} style={{ marginBottom: -236 }}>
        <DemoScreen />
      </PhoneFrame>
      <PhoneFrame device="android" scale={0.72} style={{ marginBottom: -224 }}>
        <DemoScreen />
      </PhoneFrame>
    </UniDocStage>
    <UniDocStage label="As três superfícies" surface="primary" align="flex-start" gap={24}>
      {(['primary', 'secondary', 'immersive'] as const).map((surface) => (
        <PhoneFrame
          key={surface}
          surface={surface}
          scale={0.42}
          style={{ marginBottom: -490, width: 390 }}
        >
          <div
            style={{
              padding: 24,
              color: 'var(--uni-color-text-primary)',
              fontFamily: 'var(--uni-font-sans)',
              fontSize: 24,
            }}
          >
            {surface}
          </div>
        </PhoneFrame>
      ))}
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Use PhoneFrame só em estórias e documentação; ele não integra composição de produto.',
        'Marque a região que rola com a classe uni-phone-frame__scroll, entre as barras fixas.',
        'Use surface="immersive" quando o conteúdo for o reprodutor de Shorts em tela cheia.',
        'Combine scale com margin negativa quando precisar de várias telas lado a lado.',
      ]}
      donts={[
        'Não desenhe barra de status: o arquivo não publica nenhuma nas telas móveis.',
        'Não use PhoneFrame como contêiner de layout no produto — use os componentes diretamente.',
        'Não altere as medidas do quadro: são as dos dispositivos que o arquivo publica.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A moldura acompanha o tema, como qualquer superfície da biblioteca."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher>
      {() => (
        <PhoneFrame scale={0.62} style={{ marginBottom: -320 }}>
          <DemoScreen />
        </PhoneFrame>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="PhoneFrame"
      rows={[
        {
          name: 'device',
          type: "'iphone' | 'android'",
          default: "'iphone'",
          description: '390×844 ou 360×800, as duas medidas literais do arquivo.',
        },
        {
          name: 'surface',
          type: "'primary' | 'secondary' | 'immersive'",
          default: "'primary'",
          description: 'Fundo do interior da moldura.',
        },
        {
          name: 'scale',
          type: 'number',
          default: '1',
          description: 'Escala aplicada à moldura, sem alterar a medida interna.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Conteúdo da tela.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLDivElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
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
  render: () => <PhoneFrameDocumentationPage />,
};

/**
 * Playground com 100% das props do PhoneFrame expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do PhoneFrame',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
      }}
    >
      <PhoneFrame {...args}>
        <DemoScreen />
      </PhoneFrame>
    </div>
  ),
};

/**
 * Os dois quadros de dispositivo publicados pelo arquivo.
 */
export const Tamanhos: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 32,
        flexWrap: 'wrap',
        padding: 32,
        background: 'var(--uni-color-background-primary)',
        fontFamily: 'var(--uni-font-sans)',
      }}
    >
      {(['iphone', 'android'] as const).map((device) => (
        <div key={device}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {device === 'iphone' ? '390 × 844' : '360 × 800'}
          </div>
          <PhoneFrame device={device}>
            <DemoScreen />
          </PhoneFrame>
        </div>
      ))}
    </div>
  ),
};
