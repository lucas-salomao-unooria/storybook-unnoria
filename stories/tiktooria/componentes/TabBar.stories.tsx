import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';

import { TabBar } from '../../../src/tiktooria';
import {
  UnooriaDocShell,
  UnooriaDocHeader,
  UnooriaDocSectionHeader,
  TikDocAnatomy,
  TikDocCard,
  TikDocDeviations,
  TikDocFigmaSpecs,
  TikDocGrid,
  TikDocPractices,
  TikDocPropsTable,
  TikDocStage,
  TikDocSurfaceSwitcher,
} from '../../../.storybook/components';

const meta: Meta<typeof TabBar> = {
  title: 'Tik Tooria/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    surface: { control: 'radio', options: ['chrome', 'immersive'] },
    className: { control: 'text' },
  },
  args: { surface: 'chrome' },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

const TABS = [
  { id: 'home', label: 'Home', icon: 'homeStroke' as const, activeIcon: 'homeSolid' as const },
  { id: 'discover', label: 'Discover', icon: 'search' as const },
  { id: 'inbox', label: 'Inbox', icon: 'messageStroke' as const, activeIcon: 'messageSolid' as const },
  { id: 'me', label: 'Me', icon: 'accountStroke' as const, activeIcon: 'accountSolid' as const },
];

const FullBar: React.FC<{
  surface?: 'chrome' | 'immersive';
  active?: string;
  onSelect?: (id: string) => void;
}> = ({ surface = 'chrome', active = 'home', onSelect }) => (
  <TabBar surface={surface}>
    {TABS.slice(0, 2).map((tab) => (
      <TabBar.Item
        key={tab.id}
        label={tab.label}
        icon={tab.icon}
        activeIcon={tab.activeIcon}
        active={active === tab.id}
        onClick={onSelect ? () => onSelect(tab.id) : undefined}
      />
    ))}
    <TabBar.CreateButton surface={surface} />
    {TABS.slice(2).map((tab) => (
      <TabBar.Item
        key={tab.id}
        label={tab.label}
        icon={tab.icon}
        activeIcon={tab.activeIcon}
        active={active === tab.id}
        onClick={onSelect ? () => onSelect(tab.id) : undefined}
      />
    ))}
  </TabBar>
);

const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Tik Tooria"
      category="Componentes • Navegação"
      title="TabBar"
      description="Barra de abas de 414×83 com cinco posições: Home, Discover, o botão de criação, Inbox e Me. Os 83px incluem os 35px do indicador de home, motivo pelo qual o conteúdo se alinha ao topo da barra. O fio superior é uma sombra de raio 0 — #D0D1D3 sobre cromo claro e #262626 sobre superfície imersiva."
    />

    <UnooriaDocSectionHeader title="1. Visão geral & casos de uso" barColor="#EA4359" />
    <TikDocGrid>
      <TikDocCard icon="🧭" title="Cinco posições fixas">
        A ordem do arquivo é imutável: Home, Discover, criação, Inbox, Me. O botão de criação ocupa a
        posição central.
      </TikDocCard>
      <TikDocCard icon="🔀" title="Pares de glifo">
        Home, Inbox e Me têm variante contorno/preenchida. Discover reaproveita o mesmo glifo de lupa
        nos dois estados, alterando apenas peso e opacidade do rótulo.
      </TikDocCard>
      <TikDocCard icon="🎨" title="Botão de criação invertido">
        Sobre cromo claro o miolo é escuro com glifo branco; sobre superfície imersiva é branco com
        glifo escuro. Os lóbulos ciano e rosa não mudam.
      </TikDocCard>
      <TikDocCard icon="📐" title="Altura com indicador">
        Os 83px já contemplam o indicador de home. Não empilhe um `HomeIndicator` sob a barra.
      </TikDocCard>
    </TikDocGrid>

    <UnooriaDocSectionHeader title="2. Figma & especificações técnicas" barColor="#E6436D" />
    <TikDocFigmaSpecs
      nodeId="4:1097"
      frameName="Tab Bar — TikTok Home (For You)"
      specs={[
        { label: 'Dimensões', value: '414 × 83' },
        { label: 'Rótulo', value: 'Proxima Nova 10 · +0,15px' },
        { label: 'Glifo', value: '≈20px de altura' },
        { label: 'Botão de criação', value: '43 × 28 · raio 8' },
      ]}
    />
    <TikDocDeviations
      items={[
        {
          subject: 'Rótulos posicionados por coordenada',
          detail:
            'o arquivo posiciona cada rótulo em x absoluto, com espaçamentos irregulares (27,5 / 104,5 / 277,5 / 363,5). O componente usa cinco colunas iguais, o que centraliza cada item e distribui o mesmo espaço — mudança de mecanismo com resultado visual equivalente.',
        },
        {
          subject: 'Opacidade de 80% no item inativo',
          detail:
            'o arquivo aplica 80% de opacidade ao glifo e ao rótulo inativos, além de já usar um cinza mais claro. Ambos foram preservados; o resultado é mais claro que o token isolado.',
        },
        {
          subject: 'Elipses de 1px no botão de criação',
          detail:
            'os três lóbulos são retângulos de 36×28 com raio 8 sobrepostos em x=0, x=4 e x=7. A largura total de 43px recorta o lóbulo rosa em 1px, que o componente reproduz por overflow do contêiner.',
        },
        {
          subject: 'Estados de foco',
          detail:
            'ausentes no arquivo. Foi acrescentado anel de 2px em --tik-color-brand-button nos itens e no botão de criação.',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="3. Anatomia do componente" barColor="#65D2E9" />
    <TikDocAnatomy
      zones={[
        {
          name: 'Barra',
          role: 'Grade de cinco colunas com 7px de padding superior e fio de 0,33px.',
          token: '--tik-tabbar-height · --tik-elevation-bar-top',
        },
        {
          name: 'Item',
          role: 'Glifo de ~20px sobre rótulo de 10px, com 4,5px de respiro.',
          token: '--tik-font-nav-* / --tik-font-nav-active-*',
        },
        {
          name: 'Lóbulo ciano',
          role: 'Retângulo de 36×28 em x=0.',
          token: '--tik-color-brand-cyan',
        },
        {
          name: 'Lóbulo rosa',
          role: 'Retângulo de 36×28 em x=7, recortado pela largura de 43px.',
          token: '--tik-color-brand-pink',
        },
        {
          name: 'Miolo do botão',
          role: 'Retângulo de 36×28 em x=4 com o glifo plus de 13px.',
          token: '--tik-color-brand-dark / --tik-color-surface-primary',
        },
      ]}
    />

    <UnooriaDocSectionHeader title="4. Matriz de variantes e estados" barColor="#161722" />
    <TikDocStage label="Cromo claro — aba Me ativa (“TikTok User”)" surface="chrome" align="stretch" width={414}>
      <FullBar surface="chrome" active="me" />
    </TikDocStage>
    <TikDocStage label="Imersivo — aba Home ativa (“Home For You”)" surface="immersive" align="stretch" width={414}>
      <FullBar surface="immersive" active="home" />
    </TikDocStage>
    <TikDocStage label="Cromo claro — aba Inbox ativa (“All activity”)" surface="chrome" align="stretch" width={414}>
      <FullBar surface="chrome" active="inbox" />
    </TikDocStage>

    <UnooriaDocSectionHeader title="5. Boas práticas" barColor="#EA4359" />
    <TikDocPractices
      dos={[
        'Mantenha as cinco posições e a ordem do arquivo.',
        'Informe activeIcon nas abas que têm par contorno/preenchido.',
        'Faça surface do CreateButton acompanhar surface da barra.',
        'Deixe a barra como último filho da tela — os 83px já incluem o indicador de home.',
      ]}
      donts={[
        'Não empilhe um HomeIndicator sob a TabBar.',
        'Não acrescente uma sexta aba nem remova o botão de criação.',
        'Não recolora os lóbulos ciano e rosa: eles não mudam entre contextos.',
        'Não use o fio claro sobre superfície imersiva.',
      ]}
    />

    <UnooriaDocSectionHeader title="6. Suporte a superfícies" barColor="#65D2E9" />
    <TikDocSurfaceSwitcher>
      {(surface) => (
        <div style={{ width: 414 }}>
          <FullBar surface={surface === 'immersive' ? 'immersive' : 'chrome'} active="home" />
        </div>
      )}
    </TikDocSurfaceSwitcher>

    <UnooriaDocSectionHeader title="7. Referência completa de props" barColor="#161722" />
    <TikDocPropsTable
      title="TabBar"
      rows={[
        {
          name: 'surface',
          type: "'chrome' | 'immersive'",
          default: "'chrome'",
          description: 'Contexto de superfície. Define o fundo e o tom do fio superior.',
        },
        { name: 'children', type: 'React.ReactNode', description: 'Itens e botão de criação.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: 'React.HTMLAttributes<HTMLElement>',
          description: 'Demais atributos HTML são repassados ao <nav>.',
        },
      ]}
    />
    <TikDocPropsTable
      title="TabBar.Item"
      rows={[
        { name: 'label', type: 'React.ReactNode', description: 'Rótulo em Proxima Nova 10.' },
        { name: 'icon', type: 'TikIconName', description: 'Glifo do estado inativo.' },
        {
          name: 'activeIcon',
          type: 'TikIconName',
          description:
            'Glifo do estado ativo. Quando omitido, o item usa icon nos dois estados, alterando apenas peso e cor do rótulo.',
        },
        {
          name: 'active',
          type: 'boolean',
          default: 'false',
          description: 'Estado selecionado. O rótulo passa a Semibold e perde a atenuação de 80%.',
        },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
        {
          name: '...rest',
          type: "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>",
          description: 'Demais atributos são repassados ao <button>, incluindo onClick.',
        },
      ]}
    />
    <TikDocPropsTable
      title="TabBar.CreateButton"
      rows={[
        {
          name: 'surface',
          type: "'chrome' | 'immersive'",
          default: "'chrome'",
          description:
            'Contexto de superfície. Sobre cromo claro o miolo é --tik-color-brand-dark com glifo branco; sobre imersivo é branco com glifo escuro.',
        },
        {
          name: 'label',
          type: 'string',
          default: "'Criar'",
          description: 'Rótulo acessível do botão.',
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
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com 100% das props da TabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground da TabBar',
  render: (args) => (
    <div style={{ width: 414 }}>
      <FullBar surface={args.surface} active="home" />
    </div>
  ),
};

/**
 * Playground do item, com todas as props expostas.
 */
export const PlaygroundItem: StoryObj<typeof TabBar.Item> = {
  name: '🕹️ 2. Playground do TabBar.Item',
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'select', options: ['homeStroke', 'search', 'messageStroke', 'accountStroke'] },
    activeIcon: {
      control: 'select',
      options: ['homeSolid', 'messageSolid', 'accountSolid', undefined],
    },
    active: { control: 'boolean' },
  },
  args: { label: 'Home', icon: 'homeStroke', activeIcon: 'homeSolid', active: true },
  render: (args) => (
    <div style={{ width: 414 }}>
      <TabBar surface="chrome">
        <TabBar.Item {...args} />
      </TabBar>
    </div>
  ),
};

/**
 * Playground do botão de criação, com todas as props expostas.
 */
export const PlaygroundCreateButton: StoryObj<typeof TabBar.CreateButton> = {
  name: '🕹️ 3. Playground do TabBar.CreateButton',
  argTypes: {
    surface: { control: 'radio', options: ['chrome', 'immersive'] },
    label: { control: 'text' },
  },
  args: { surface: 'chrome', label: 'Criar' },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 32,
        background:
          args.surface === 'immersive'
            ? 'var(--tik-color-surface-immersive)'
            : 'var(--tik-color-surface-primary)',
      }}
    >
      <TabBar.CreateButton {...args} />
    </div>
  ),
};

/**
 * Réplica visual dos dois frames oficiais de barra de abas do Figma.
 */
export const ExemploOficialDoFigma: Story = {
  name: '🎨 Exemplo Oficial do Figma',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 414 }}>
      <FullBar surface="immersive" active="home" />
      <FullBar surface="chrome" active="me" />
    </div>
  ),
};

/**
 * Cada aba no estado ativo, nos dois contextos.
 */
export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 414 }}>
      {(['chrome', 'immersive'] as const).map((surface) =>
        ['home', 'discover', 'inbox', 'me'].map((active) => (
          <FullBar key={`${surface}-${active}`} surface={surface} active={active} />
        ))
      )}
    </div>
  ),
};

/**
 * Composição modular com TabBar.Item e TabBar.CreateButton.
 */
export const ComposicaoModular: Story = {
  render: () => {
    const [active, setActive] = useState('home');

    return (
      <div style={{ width: 414 }}>
        <FullBar surface="chrome" active={active} onSelect={setActive} />
        <p
          style={{
            fontFamily: 'var(--tik-font-sans)',
            fontSize: 13,
            color: 'var(--tik-color-text-secondary)',
          }}
        >
          Aba ativa: <strong>{active}</strong>
        </p>
      </div>
    );
  },
};
