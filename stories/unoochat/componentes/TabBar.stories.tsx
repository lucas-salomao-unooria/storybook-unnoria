import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
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
import { TabBar, TopBar } from '../../../src/unoochat';
import { uncTabs } from '../fixtures';

const BAR = '#716C98';

/**
 * Demonstração interativa com estado local de aba ativa.
 */
const InteractiveTabBar: React.FC = () => {
  const [activeId, setActiveId] = useState('chats');

  return (
    <div style={{ width: 411 }}>
      <TabBar
        items={uncTabs}
        activeId={activeId}
        onChange={setActiveId}
        panelId={(id) => `unc-tabpanel-${id}`}
      />
      <div
        style={{
          background: 'var(--unc-color-surface-canvas)',
          color: 'var(--unc-color-text-primary)',
          fontFamily: 'var(--unc-font-sans)',
          fontSize: 16,
          padding: '20px 19px',
        }}
        id={`unc-tabpanel-${activeId}`}
        role="tabpanel"
        aria-labelledby={`unc-tab-${activeId}`}
      >
        Painel de {activeId}
      </div>
    </div>
  );
};

/**
 * Página de documentação rica do componente TabBar.
 */
const TabBarDocumentationPage = () => (
  <UnooriaDocShell>
    <UnooriaDocHeader
      badgeBrand="Unoochat"
      category="Componentes • Navegação"
      title="TabBar"
      description="Navegação primária entre CONVERSAS, STATUS e CHAMADAS. É a faixa inferior da barra superior de 100px: atalho de câmera à esquerda, três abas separadas por 18px, selo de não lidas ao lado do rótulo ativo e indicador arredondado de 3px sob a aba selecionada, tudo em Open Sans e no acento do tema."
    />

    <UnooriaDocSectionHeader barColor={BAR} title="1. Visão geral e casos de uso" />
    <UncDocGrid>
      <UncDocCard icon="🧭" title="Três abas fixas">
        O produto tem exatamente três destinos primários. A prop <code>items</code> aceita qualquer
        conjunto, mas o desenho prevê CONVERSAS, STATUS e CHAMADAS nesta ordem.
      </UncDocCard>
      <UncDocCard icon="📸" title="Atalho de câmera">
        À esquerda das abas, ocupando uma calha de 28px. É uma ação, não uma aba: não participa da
        seleção nem recebe indicador.
      </UncDocCard>
      <UncDocCard icon="🎨" title="Um único acento">
        A aba ativa usa <code>--unc-color-accent</code> no rótulo e no indicador, nos dois temas
        (<code>#716C98</code> no claro e <code>#AAA5C2</code> no escuro). A prop <code>tone</code>{' '}
        só aceita <code>accent</code>.
      </UncDocCard>
      <UncDocCard icon="♿" title="Semântica de abas">
        A barra é um <code>tablist</code>; cada aba é um <code>tab</code> com{' '}
        <code>aria-selected</code>. Com <code>panelId</code>, o <code>aria-controls</code> aponta
        para o painel, e as setas, Home e End movem a seleção.
      </UncDocCard>
    </UncDocGrid>

    <UnooriaDocSectionHeader barColor={BAR} title="2. Especificações técnicas" />
    <UncDocSpecs
      component="TabBar"
      layout="Faixa · 31px"
      specs={[
        { label: 'Altura da faixa', value: '31 px' },
        { label: 'Espaço entre abas', value: '18 px' },
        { label: 'Indicador', value: '3 px arredondado' },
        { label: 'Rótulo', value: 'Open Sans 700 · 16px' },
        { label: 'Câmera', value: 'photo_camera · 20px · --unc-color-icon-muted' },
        { label: 'Superfície', value: '--unc-color-surface-appbar' },
      ]}
    />
    <UncDocDecisions
      items={[
        {
          subject: 'Acento único',
          detail:
            'todas as abas ativas usam --unc-color-accent (de --unooria-color-brandpurple-600 no claro e -400 no escuro). O módulo não mantém um segundo tom para uma aba específica.',
        },
        {
          subject: 'Rótulos centralizados',
          detail:
            'os três rótulos são centralizados em seus compartimentos, sem deslocamentos individuais.',
        },
        {
          subject: 'Atalho de câmera',
          detail:
            'usa a ligadura photo_camera do Material Symbols Rounded (peso 300), a biblioteca de ícones da Plataforma Unooria, a 20px.',
        },
        {
          subject: 'Rótulos em caixa alta',
          detail:
            'os rótulos vêm em caixa alta de uncTabs (CONVERSAS, STATUS, CHAMADAS); o componente não converte o texto.',
        },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="3. Anatomia do componente" />
    <UncDocAnatomy
      zones={[
        { name: 'Superfície', role: 'Compartilha o fundo da barra superior.', token: '--unc-color-surface-appbar' },
        { name: 'Atalho de câmera', role: 'Botão de ação na calha esquerda de 28px.', token: '--unc-color-icon-muted' },
        { name: 'Rótulo', role: 'Nome da aba em caixa alta.', token: '--unc-font-body-md-* · --unc-color-text-secondary' },
        { name: 'Selo', role: 'Contagem de não lidas ao lado do rótulo.', token: 'Badge variant="tab"' },
        { name: 'Indicador', role: 'Linha arredondada de 3px sob a aba ativa.', token: '--unc-tab-indicator-width · --unc-color-accent' },
      ]}
    />

    <UnooriaDocSectionHeader barColor={BAR} title="4. Matriz de variantes e estados" />
    <UncDocStage label="Tema claro" theme="light" surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="status" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="calls" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs.map((tab) => ({ ...tab, badge: undefined }))} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="chats" showCamera={false} />
      </div>
    </UncDocStage>
    <UncDocStage label="Tema escuro" theme="dark" surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="status" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="calls" />
      </div>
    </UncDocStage>

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="5. Demonstração interativa"
      description="Selecione uma aba: o indicador e o painel controlado acompanham."
    />
    <UncDocStage surface="canvas" padding={20}>
      <InteractiveTabBar />
    </UncDocStage>

    <UnooriaDocSectionHeader barColor={BAR} title="6. Boas práticas" />
    <UncDocPractices
      dos={[
        'Manter o TabBar dentro do footer do TopBar, na mesma superfície.',
        'Ligar aria-controls do tab ao id do painel correspondente, com panelId.',
        'Exibir o selo apenas quando houver mensagens não lidas.',
        'Usar rótulos curtos e em caixa alta, como em uncTabs.',
      ]}
      donts={[
        'Adicionar uma quarta aba: o compartimento deixa de caber em 411px.',
        'Tratar o atalho de câmera como aba selecionável.',
        'Repetir o indicador em mais de uma aba.',
        'Renderizar o TabBar sobre a superfície canvas em vez da app bar.',
      ]}
    />

    <UnooriaDocSectionHeader
      barColor={BAR}
      title="7. Suporte a temas"
      description="Alterne entre o tema claro e o escuro: superfície, rótulos, câmera e acento seguem os tokens."
    />
    <UncDocThemeSwitcher surface="canvas">
      {() => (
        <div style={{ width: 411 }}>
          <TabBar items={uncTabs} activeId="chats" />
        </div>
      )}
    </UncDocThemeSwitcher>

    <UnooriaDocSectionHeader barColor={BAR} title="8. Referência completa de props" />
    <UncDocPropsTable
      title="TabBar"
      rows={[
        { name: 'items', type: 'UncTabBarItem[]', description: 'Abas exibidas na barra. Obrigatório.' },
        { name: 'activeId', type: 'string', description: 'Identificador da aba ativa. Obrigatório.' },
        { name: 'onChange', type: '(id: string) => void', description: 'Callback disparado ao selecionar uma aba.' },
        { name: 'showCamera', type: 'boolean', default: 'true', description: 'Exibe o atalho de câmera à esquerda.' },
        { name: 'onCamera', type: '(event) => void', description: 'Callback do atalho de câmera.' },
        { name: 'tone', type: "'accent'", default: "'accent'", description: 'Tom do rótulo e do indicador da aba ativa.' },
        { name: 'panelId', type: '(id: string) => string', description: 'Resolve o id do painel controlado por cada aba, alimentando aria-controls.' },
        { name: 'className', type: 'string', description: 'Classe CSS adicional.' },
      ]}
    />
    <UncDocPropsTable
      title="UncTabBarItem"
      rows={[
        { name: 'id', type: 'string', description: 'Identificador único da aba.' },
        { name: 'label', type: 'string', description: 'Rótulo exibido em caixa alta.' },
        { name: 'badge', type: 'number', description: 'Quantidade de não lidas exibida em um selo.' },
      ]}
    />
  </UnooriaDocShell>
);

const meta: Meta<typeof TabBar> = {
  title: 'Unoochat/Componentes/TabBar',
  component: TabBar,
  parameters: { layout: 'padded' },
  argTypes: {
    items: { control: 'object', description: 'Abas exibidas na barra.' },
    activeId: { control: 'select', options: ['chats', 'status', 'calls'], description: 'Aba ativa.' },
    showCamera: { control: 'boolean', description: 'Exibe o atalho de câmera.' },
    tone: { control: 'radio', options: ['accent'], description: 'Tom da aba ativa.' },
  },
  args: { items: uncTabs, activeId: 'chats', showCamera: true, tone: 'accent' },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

/**
 * Documentação rica e completa do componente.
 */
export const Documentacao: Story = {
  name: '📄 Documentação Completa',
  render: () => <TabBarDocumentationPage />,
};

/**
 * Playground com 100% das props do TabBar expostas.
 */
export const Playground: Story = {
  name: '🕹️ 1. Playground do TabBar',
  render: (args) => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TabBar {...args} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Faixa de abas dentro da barra superior da tela de conversas.
 */
export const ExemploOficial: Story = {
  name: '🎨 Exemplo na Barra Superior',
  render: () => (
    <UncDocStage surface="canvas" padding={20}>
      <div style={{ width: 411 }}>
        <TopBar title="Unoochat" footer={<TabBar items={uncTabs} activeId="chats" />} />
      </div>
    </UncDocStage>
  ),
};

/**
 * Matriz completa de abas ativas.
 */
export const TodasVariantes: Story = {
  name: 'TodasVariantes',
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="status" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="calls" />
      </div>
    </UncDocStage>
  ),
};

/**
 * Estados de seleção, com e sem selo e sem o atalho de câmera.
 */
export const Estados: Story = {
  render: () => (
    <UncDocStage surface="canvas" direction="column" align="stretch" gap={16} padding={20}>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs.map((tab) => ({ ...tab, badge: undefined }))} activeId="chats" />
      </div>
      <div style={{ width: 411 }}>
        <TabBar items={uncTabs} activeId="chats" showCamera={false} />
      </div>
      <div style={{ width: 411 }}>
        <InteractiveTabBar />
      </div>
    </UncDocStage>
  ),
};
