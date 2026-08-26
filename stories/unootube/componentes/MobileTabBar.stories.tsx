import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

import { Icon, MobileTabBar, ShortsLogo } from '../../../src/unootube';
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

const SHORTS_FILE =
  'https://www.figma.com/design/FlqnnoY0Mqdjic53twLAC1/Free-YouTube-Shorts-Mockups--Community-';

const meta: Meta<typeof MobileTabBar> = {
  title: 'Unootube/Componentes/MobileTabBar',
  component: MobileTabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    className: { control: 'text' },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof MobileTabBar>;

/**
 * Os cinco destinos do arquivo, na ordem em que ele os desenha.
 *
 * `activeId` governa qual está marcado; os glifos são os do registro, incluindo
 * o raio monocromático do `ShortsLogo`.
 */
const Destinations: React.FC<{ activeId?: string }> = ({ activeId = 'home' }) => (
  <>
    <MobileTabBar.Item
      icon={<Icon name="homeFill" size="lg" />}
      label="Home"
      active={activeId === 'home'}
    />
    <MobileTabBar.Item
      icon={<ShortsLogo variant="mono" size={26} />}
      label="Shorts"
      active={activeId === 'shorts'}
    />
    <MobileTabBar.CreateButton />
    <MobileTabBar.Item
      icon={<Icon name="subscriptions" size="xl" />}
      label="Subscription"
      active={activeId === 'subscription'}
    />
    <MobileTabBar.Item
      icon={<Icon name="library" size="xl" />}
      label="Library"
      active={activeId === 'library'}
    />
  </>
);

const Phone: React.FC<{ children: React.ReactNode; width?: number }> = ({
  children,
  width = 390,
}) => <div style={{ width, maxWidth: '100%' }}>{children}</div>;

const MobileTabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unootube"
      category="Componentes • Navegação"
      title="MobileTabBar"
      description="Reprodução da barra de abas das telas móveis do arquivo Free YouTube Shorts Mockups (Community) (1:235 no iPhone, 16:1055 no Android): cinco destinos com o botão de criação no centro. É o par móvel da Sidebar de 1440px."
    />

    <UnooriaDocSectionHeader
      title="1. Visão geral & casos de uso"
      description="Cinco destinos, um alvo sem rótulo e a análise que evitou três glifos duplicados."
      barColor="#EE1A26"
    />
    <UniDocGrid>
      <UniDocCard icon="🧭" title="O par móvel da barra lateral">
        Home, Shorts, Criar, Subscription e Library. Na área de trabalho os mesmos destinos vivem na{' '}
        <code>Sidebar</code>; aqui viram alvos de 28px com rótulo em Roboto Regular 12.
      </UniDocCard>
      <UniDocCard icon="➕" title="Criar é outro alvo">
        É o único sem rótulo, com geometria própria: um círculo vazado de 42px com um mais dentro.
        Entrou no registro como <code>createCircle</code> porque o <code>create</code> do arquivo
        original desenha um retângulo de câmera.
      </UniDocCard>
      <UniDocCard icon="🔎" title="Três glifos conferidos, zero duplicados">
        A casa, a biblioteca e as inscrições do arquivo de Shorts são <code>homeFill</code>,{' '}
        <code>library</code> e <code>subscriptions</code> — os mesmos vetores, transladados ou
        escalados. Nenhum foi reexportado.
      </UniDocCard>
      <UniDocCard icon="⚡" title="Shorts usa o raio, não um ícone">
        O destino de Shorts é o <code>ShortsLogo</code> monocromático, que herda a cor do ancestral.
      </UniDocCard>
    </UniDocGrid>

    <UnooriaDocSectionHeader
      title="2. Figma & especificações técnicas"
      description="Nós de origem e desvios registrados."
      barColor="#FC0D1C"
    />
    <UniDocFigmaSpecs
      nodeId="1:235"
      frameName="Frame 11"
      fileUrl={SHORTS_FILE}
      specs={[
        { label: 'Dimensões', value: '390 × 58 (iPhone) · 360 × 56 (Android)' },
        { label: 'Recuos', value: '10 vertical · 12 lateral' },
        { label: 'Alvos', value: '24 a 28px · botão de criação 42px' },
        { label: 'Rótulo', value: 'Roboto Regular 12' },
      ]}
    />
    <UniDocDeviations
      items={[
        {
          subject: 'Espaçamento irregular do arquivo',
          detail:
            'o arquivo agrupa os três primeiros destinos com 34px entre eles e afasta os dois últimos com 24px — herança do posicionamento absoluto. A barra distribui os cinco alvos uniformemente, porque a régua do arquivo não sobrevive a uma janela de largura diferente da do quadro.',
        },
        {
          subject: 'Estado ativo',
          detail:
            'o arquivo pinta os cinco rótulos com a mesma tinta e não marca destino atual. O realce foi acrescentado apenas pelo peso da fonte, sem introduzir cor nova, e declara aria-current="page".',
        },
        {
          subject: 'Glifos de tamanhos diferentes',
          detail:
            'o arquivo desenha a casa e o raio em 24 a 26px e as inscrições e a biblioteca em 28px. As duas medidas foram preservadas em vez de uniformizadas — são as que o arquivo publica.',
        },
        {
          subject: 'Estados de interação',
          detail:
            'hover, foco e pressionado foram acrescentados com opacidade, anel de foco e redução de escala, todos em tokens da própria marca.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#9EBFD0" />
    <UniDocAnatomy
      zones={[
        {
          name: 'Barra',
          role: 'Superfície de navegação de 58px, com os cinco alvos distribuídos.',
          token: '--uni-mobile-tabbar-height',
        },
        {
          name: 'Alvo',
          role: 'Glifo de 24 a 28px com rótulo abaixo.',
          token: '--uni-spacing-2',
        },
        {
          name: 'Rótulo',
          role: 'Roboto Regular 12 em texto primário.',
          token: '--uni-font-caption-size',
        },
        {
          name: 'Botão de criação',
          role: 'Círculo vazado de 42px, sem rótulo, no centro.',
          token: 'createCircle · 35px de glifo',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#EE1A26" />
    <UniDocStage label="Como no arquivo: 390px" surface="secondary" align="stretch" padding={0}>
      <Phone>
        <MobileTabBar>
          <Destinations />
        </MobileTabBar>
      </Phone>
    </UniDocStage>
    <UniDocStage label="Cada destino ativo" surface="secondary" direction="column" align="stretch" padding={0} gap={12}>
      {['home', 'shorts', 'subscription', 'library'].map((id) => (
        <Phone key={id}>
          <MobileTabBar>
            <Destinations activeId={id} />
          </MobileTabBar>
        </Phone>
      ))}
    </UniDocStage>
    <UniDocStage label="Largura do Android: 360px" surface="secondary" align="stretch" padding={0}>
      <Phone width={360}>
        <MobileTabBar>
          <Destinations />
        </MobileTabBar>
      </Phone>
    </UniDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#FC0D1C" />
    <UniDocPractices
      dos={[
        'Mantenha o botão de criação no centro: é a posição que o arquivo publica nas duas telas.',
        'Use ShortsLogo variant="mono" no destino de Shorts, para que a cor venha do ancestral.',
        'Marque o destino atual com active — ele declara aria-current="page".',
        'Passe href quando a navegação for por link; o item vira <a> automaticamente.',
      ]}
      donts={[
        'Não registre outro glifo de casa, biblioteca ou inscrições: os existentes são os mesmos vetores.',
        'Não coloque rótulo no botão de criação — o arquivo não desenha nenhum.',
        'Não use esta barra em telas de 1440px; ali o cromo é a Sidebar.',
        'Não passe mais de cinco destinos: a 360px os rótulos começam a truncar.',
      ]}
    />

    <UnooriaDocSectionHeader
      title="6. Suporte a temas"
      description="A barra é superfície de navegação e muda inteira com o tema. Os valores claros foram medidos nos quadros claros do arquivo."
      barColor="#9EBFD0"
    />
    <UniDocThemeSwitcher align="stretch">
      {() => (
        <Phone>
          <MobileTabBar>
            <Destinations activeId="shorts" />
          </MobileTabBar>
        </Phone>
      )}
    </UniDocThemeSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#EE1A26" />
    <UniDocPropsTable
      title="MobileTabBar"
      rows={[
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Compõe com MobileTabBar.Item e MobileTabBar.CreateButton.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos são repassados ao <nav>.',
        },
      ]}
    />
    <UniDocPropsTable
      title="MobileTabBar.Item"
      rows={[
        {
          name: 'icon',
          type: 'React.ReactNode',
          description: 'Glifo do destino. Componha com Icon ou ShortsLogo.',
        },
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo exibido sob o glifo.' },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: 'Marca o destino como atual. Declara aria-current="page".',
        },
        {
          name: 'href',
          type: 'string',
          description: 'Com href, o item é um <a>; sem ele, um <button>.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao elemento raiz.',
        },
      ]}
    />
    <UniDocPropsTable
      title="MobileTabBar.CreateButton"
      rows={[
        {
          name: 'aria-label',
          type: 'string',
          default: "'Criar'",
          description: 'Rótulo acessível. O botão não tem rótulo visível no arquivo.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.ButtonHTMLAttributes<HTMLButtonElement>',
          description: 'Demais atributos são repassados ao <button>.',
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
  render: () => <MobileTabBarDocumentationPage />,
};

/**
 * Playground com 100% das props do MobileTabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do MobileTabBar',
  render: (args) => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileTabBar {...args}>
          <Destinations />
        </MobileTabBar>
      </Phone>
    </div>
  ),
};

/**
 * Réplica visual dos nós `1:235` (iPhone) e `16:1055` (Android).
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
        <MobileTabBar>
          <Destinations />
        </MobileTabBar>
      </Phone>
      <Phone width={360}>
        <MobileTabBar>
          <Destinations />
        </MobileTabBar>
      </Phone>
    </div>
  ),
};

/**
 * Cada destino em estado ativo.
 */
export const Estados: Story = {
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
      {['home', 'shorts', 'subscription', 'library'].map((id) => (
        <div key={id}>
          <div style={{ fontSize: 12, color: 'var(--uni-color-text-secondary)', marginBottom: 8 }}>
            {id}
          </div>
          <Phone>
            <MobileTabBar>
              <Destinations activeId={id} />
            </MobileTabBar>
          </Phone>
        </div>
      ))}
    </div>
  ),
};

/**
 * Composição com outro conjunto de destinos.
 */
export const ComposicaoModular: Story = {
  render: () => (
    <div
      data-uni-theme="dark"
      style={{ padding: 32, background: 'var(--uni-color-background-primary)' }}
    >
      <Phone>
        <MobileTabBar>
          <MobileTabBar.Item icon={<Icon name="homeFill" size="lg" />} label="Início" active />
          <MobileTabBar.Item icon={<ShortsLogo variant="mono" size={26} />} label="Shorts" />
          <MobileTabBar.Item icon={<Icon name="likedFill" size="xl" />} label="Curtidos" />
          <MobileTabBar.Item icon={<Icon name="historyFill" size="xl" />} label="Histórico" />
        </MobileTabBar>
      </Phone>
    </div>
  ),
};
